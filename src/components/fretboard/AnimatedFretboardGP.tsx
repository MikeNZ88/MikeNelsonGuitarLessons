'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type BarToRootMap = Record<number, string>; // barIndex -> root (e.g., 'A', 'Bb', 'C#')

export interface AnimatedFretboardGPProps {
  filePath: string;
  trackIndex?: number; // AlphaTab track index to follow
  fretCount?: number; // number of frets to display (from 0)
  useTabStringOrder?: boolean; // true => high E at bottom (TAB style)
  showIntervals?: boolean;
  hideNotation?: boolean; // if true, hide the AlphaTab visual surface but keep audio/events
  useKeySignatureForNames?: boolean; // when showing note names, prefer flats/sharps based on key signature
  barToRoot?: BarToRootMap; // map bar index -> interval root
  // Optional finer-grain mapping: key as `${barIndex}:${beatIndex}` → root
  beatToRoot?: Record<string, string>;
  initialTempoPercent?: number; // 100 = normal
  accidentalStyle?: 'flat' | 'sharp' | 'mixed'; // how to display 6/8 semitone alterations
  autoRootFromChordTrackIndex?: number; // if set, derive roots from chord names on this track index
  onRootChange?: (root: string | null, barIndex: number) => void;
  onTracksDetected?: (tracks: { index: number; name: string }[]) => void;
}

interface ActiveNote {
  stringNumber: number; // 1..6 (AlphaTab numbering)
  fret: number; // 0..n
  bend?: {
    upSemitones: number;
    hasPrebend: boolean;
    hasRelease: boolean;
  };
}

const STANDARD_TUNING_FROM_HIGH_E = ['E', 'B', 'G', 'D', 'A', 'E'];
// AlphaTab observation: note.string appears to be 1 = low E, 6 = high E in our environment
// Set this flag to true to adapt mappings accordingly
const ALPHATAB_STRING1_IS_LOW_E = true;
const NOTE_NAMES_SHARP = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const NOTE_NAMES_FLAT  = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
const NOTE_TO_INDEX: Record<string, number> = {
  'C': 0, 'B#': 0,
  'C#': 1, 'Db': 1,
  'D': 2,
  'D#': 3, 'Eb': 3,
  'E': 4, 'Fb': 4,
  'F': 5, 'E#': 5,
  'F#': 6, 'Gb': 6,
  'G': 7,
  'G#': 8, 'Ab': 8,
  'A': 9,
  'A#': 10, 'Bb': 10,
  'B': 11, 'Cb': 11
};

function addSemitones(noteIndex: number, semitones: number): number {
  return (noteIndex + ((semitones % 12) + 12)) % 12;
}

function mapAlphaTabStringToHighEOrder(alphaTabStringNumber: number): number {
  // Convert AlphaTab string number to 1..6 in high-E-first order
  // If AlphaTab uses 1=lowE, 6=highE, then highEOrder = 7 - s
  return ALPHATAB_STRING1_IS_LOW_E ? (7 - alphaTabStringNumber) : alphaTabStringNumber;
}

function getOpenStringNoteIndex(alphaTabStringNumber: number): number {
  const highEOrderString = mapAlphaTabStringToHighEOrder(alphaTabStringNumber);
  const name = STANDARD_TUNING_FROM_HIGH_E[highEOrderString - 1];
  return NOTE_TO_INDEX[name];
}

function getNoteIndexForStringFret(alphaTabStringNumber: number, fret: number): number {
  const openIdx = getOpenStringNoteIndex(alphaTabStringNumber);
  return addSemitones(openIdx, fret);
}

type ChordQuality = 'major' | 'maj7' | 'minor' | 'min7' | 'dominant' | 'dim' | 'aug' | 'sus2' | 'sus4' | 'unknown';

function computeIntervalLabel(rootNote: string, noteIndex: number, style: 'flat' | 'sharp' | 'mixed' = 'flat', chordQuality: ChordQuality = 'unknown'): string {
  const rootIdx = NOTE_TO_INDEX[rootNote];
  if (rootIdx == null) return '';
  const diff = (noteIndex - rootIdx + 12) % 12;
  const preferSharp = (labelSharp: string, labelFlat: string) => {
    if (style === 'sharp') return labelSharp;
    if (style === 'flat') return labelFlat;
    // mixed: choose per quality common practice
    return labelSharp;
  };

  // Keep intervals within one octave (1..7 with accidentals)
  switch (diff) {
    case 0: return '1';
    case 1: return 'b2';
    case 2: return '2';
    case 3: return 'b3';
    case 4: return '3';
    case 5: return '4';
    case 6: return preferSharp('#4', 'b5');
    case 7: return '5';
    case 8: return preferSharp('#5', 'b6');
    case 9: return '6';
    case 10: return 'b7';
    case 11: return chordQuality === 'dominant' ? '7' : '7';
    default: return '';
  }
}

export default function AnimatedFretboardGP({
  filePath,
  trackIndex = 0,
  fretCount = 15,
  useTabStringOrder = true,
  showIntervals = true,
  hideNotation = false,
  useKeySignatureForNames = false,
  barToRoot,
  beatToRoot,
  initialTempoPercent = 100,
  accidentalStyle = 'flat',
  autoRootFromChordTrackIndex,
  onRootChange,
  onTracksDetected
}: AnimatedFretboardGPProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const apiRef = useRef<any>(null);
  const lastBufferRef = useRef<ArrayBuffer | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeNotes, setActiveNotes] = useState<ActiveNote[]>([]);
  const [currentBarIndex, setCurrentBarIndex] = useState<number>(0);
  const [currentBeatInBar, setCurrentBeatInBar] = useState<number>(0);
  const [status, setStatus] = useState<string>('Loading...');
  const debugPrintCountRef = useRef<number>(0);
  const clearNotesTimerRef = useRef<number | null>(null);
  const autoBarToRootRef = useRef<Record<number, string> | null>(null);
  const autoBarToQualityRef = useRef<Record<number, ChordQuality> | null>(null);
  const [currentQuality, setCurrentQuality] = useState<ChordQuality>('unknown');
  const keySigPrefRef = useRef<Record<number, 'flat' | 'sharp'>>({});
  const [currentKeyPref, setCurrentKeyPref] = useState<'flat' | 'sharp'>('sharp');
  const appliedTrackRef = useRef<number | null>(null);

  const displayedStrings = useMemo(() => {
    const stringsHighToLow = STANDARD_TUNING_FROM_HIGH_E.slice();
    // When TAB order is requested, show Low E at top → High E at bottom
    return useTabStringOrder ? stringsHighToLow.slice().reverse() : stringsHighToLow;
  }, [useTabStringOrder]);

  const getCurrentRoot = useCallback((): string | null => {
    // Beat-level mapping has priority if provided
    const apiRootFromBeat = (beatToRootKey?: string) =>
      beatToRootKey ? (beatToRootKey in (beatToRoot || {}) ? (beatToRoot as any)[beatToRootKey] : null) : null;

    // Try beat map first
    const beatKey = `${currentBarIndex}:${currentBeatInBar}`;
    const beatRoot = apiRootFromBeat(beatKey);
    if (beatRoot) return beatRoot;

    // Next prefer automatic chord-track derived map
    if (autoBarToRootRef.current) {
      const root = autoBarToRootRef.current[currentBarIndex];
      if (root) return root;
    }
    // Finally, fallback to manual bar map
    if (barToRoot) {
      const root = barToRoot[currentBarIndex];
      if (root) return root;
    }
    return null;
  }, [barToRoot, beatToRoot, currentBarIndex, currentBeatInBar]);

  useEffect(() => {
    let disposed = false;
    async function init() {
      try {
        setStatus('Initializing...');
        // Ensure AlphaTab CSS is present
        if (!document.querySelector('link[href*="alphaTab.css"]')) {
          const cssLink = document.createElement('link');
          cssLink.rel = 'stylesheet';
          cssLink.href = 'https://cdn.jsdelivr.net/npm/@coderline/alphatab@latest/dist/alphaTab.css';
          document.head.appendChild(cssLink);
        }

        async function loadAlphaTab() {
          // Always use CDN UMD build to avoid file:// worker URL resolution from ESM
          if (!document.querySelector('script[src*="alphaTab.js"]')) {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/@coderline/alphatab@latest/dist/alphaTab.js';
            document.head.appendChild(script);
          }
          let tries = 0;
          while (!(window as any).alphaTab && tries < 200) {
            await new Promise(r => setTimeout(r, 50));
            tries++;
          }
          if (!(window as any).alphaTab) throw new Error('AlphaTab failed to load');
          return (window as any).alphaTab;
        }

        const alphaTab = await loadAlphaTab();
        if (disposed) return;

        if (!containerRef.current) return;
        containerRef.current.innerHTML = '';
        const inner = document.createElement('div');
        inner.setAttribute('data-enable-worker', 'false');
        // Explicitly set CDN font directory to avoid local 404s
        inner.setAttribute('data-font-directory', 'https://cdn.jsdelivr.net/npm/@coderline/alphatab@latest/dist/font/');
        containerRef.current.appendChild(inner);

        const api = new alphaTab.AlphaTabApi(inner, {
          core: {
            enableLazyLoading: false,
            useWorkers: false
          },
          player: {
            enablePlayer: true,
            enableCursor: true,
            enableUserInteraction: true,
            enableElementHighlighting: true,
            soundFont: 'https://cdn.jsdelivr.net/npm/@coderline/alphatab@latest/dist/soundfont/sonivox.sf2',
            scrollElement: containerRef.current
          },
          display: hideNotation
            ? { scale: 1.0, showMusic: false, showTablature: false, showBarNumbers: false }
            : { scale: 1.0, showMusic: true, showBarNumbers: true }
        });
        apiRef.current = api;
        ;(window as any)._afApi = api; // expose for debugging
        // eslint-disable-next-line no-console
        console.log('[AnimatedFretboardGP] AlphaTabApi initialized');
        api.playerReady.on(() => {
          setStatus('Ready');
          setIsReady(true);
        });

        api.error.on((e: any) => {
          console.error('[AnimatedFretboardGP] AlphaTab error:', e);
          setStatus('AlphaTab error (see console)');
        });


        api.scoreLoaded.on((score: any) => {
          setStatus('Score loaded');
          setIsReady(true);
          // eslint-disable-next-line no-console
          if (debugPrintCountRef.current < 10) {
            debugPrintCountRef.current++;
            console.log('[AnimatedFretboardGP] scoreLoaded', { tracks: score?.tracks?.length });
          }

          // Expose track list to parent for UI selection
          try {
            if (onTracksDetected && Array.isArray(score?.tracks)) {
              const list = score.tracks.map((t: any, i: number) => ({ index: i, name: t?.name || `Track ${i + 1}` }));
              onTracksDetected(list);
            }
          } catch {}

          // Build auto root & quality map from chord track if requested
          autoBarToRootRef.current = null;
          autoBarToQualityRef.current = null;
          keySigPrefRef.current = {};
          if (typeof autoRootFromChordTrackIndex === 'number' && score?.tracks?.[autoRootFromChordTrackIndex]) {
            try {
              const chordTrack = score.tracks[autoRootFromChordTrackIndex];
              const staves = chordTrack?.staves || [];
              const bars = staves[0]?.bars || [];
              const map: Record<number, string> = {};
              const qmap: Record<number, ChordQuality> = {};
              for (let b = 0; b < bars.length; b++) {
                const bar = bars[b];
                const voices = bar?.voices || [];
                for (const v of voices) {
                  const beats = v?.beats || [];
                  for (const beat of beats) {
                    const chord = beat?.chord || beat?.Chord || beat?.harmony || null;
                    let name: string | null = null;
                    if (chord) {
                      name = chord.name || chord.displayName || chord.text || null;
                    } else if (beat?.text && typeof beat.text === 'string') {
                      name = beat.text;
                    }
                    if (typeof name === 'string') {
                      const m = name.trim().match(/^([A-G](?:#|b)?)(.*)$/i);
                      if (m && m[1]) {
                        const root = m[1].toUpperCase().replace('B#', 'C').replace('E#', 'F');
                        map[b] = root;
                        const qualRaw = (m[2] || '').toLowerCase();
                        let quality: ChordQuality = 'unknown';
                        if (/maj7|Δ7|maj/.test(qualRaw)) quality = 'maj7';
                        else if (/m7|min7/.test(qualRaw)) quality = 'min7';
                        else if (/m(?!aj)/.test(qualRaw)) quality = 'minor';
                        else if (/dim|o/.test(qualRaw)) quality = 'dim';
                        else if (/aug|\+/.test(qualRaw)) quality = 'aug';
                        else if (/sus2/.test(qualRaw)) quality = 'sus2';
                        else if (/sus4|sus/.test(qualRaw)) quality = 'sus4';
                        else if (/7/.test(qualRaw)) quality = 'dominant';
                        else if (/maj/.test(qualRaw)) quality = 'major';
                        qmap[b] = quality;
                        break;
                      }
                    }
                  }
                  if (map[b]) break;
                }
              }
              if (Object.keys(map).length > 0) {
                autoBarToRootRef.current = map;
                autoBarToQualityRef.current = qmap;
                // eslint-disable-next-line no-console
                console.log('[AnimatedFretboardGP] auto roots from chord track', map, qmap);
              }
            } catch (err) {
              console.warn('[AnimatedFretboardGP] chord-root extraction failed', err);
            }
          }

          // Extract key signature preference (flat/sharp) per bar if available
          try {
            const anyTrack = score?.tracks?.[0];
            const bars = anyTrack?.staves?.[0]?.bars || [];
            const pref: Record<number, 'flat' | 'sharp'> = {};
            for (let b = 0; b < bars.length; b++) {
              const bar = bars[b];
              const ks = (bar?.masterBar?.keySignature ?? bar?.keySignature ?? score?.keySignature);
              // Expect -7..+7 (negative = flats)
              if (typeof ks === 'number') {
                pref[b] = ks < 0 ? 'flat' : (ks > 0 ? 'sharp' : 'sharp');
              } else if (typeof ks === 'string') {
                // Heuristic by key name
                const flatKeys = ['F','Bb','Eb','Ab','Db','Gb','Cb'];
                const root = ks.replace('m','').replace('min','').trim();
                pref[b] = flatKeys.includes(root) ? 'flat' : 'sharp';
              }
            }
            keySigPrefRef.current = pref;
          } catch {}

          // Apply selected track after score loads without re-loading the score (avoid recursion)
          try {
            if (
              typeof trackIndex === 'number' &&
              score?.tracks?.[trackIndex] &&
              appliedTrackRef.current !== trackIndex
            ) {
              setStatus('Selecting track...');
              appliedTrackRef.current = trackIndex;
              apiRef.current?.renderTracks?.([trackIndex]);
            }
          } catch (e) {
            console.warn('Track select failed, staying on default track', e);
          }
        });

        api.renderFinished.on(() => {
          setStatus('Rendered');
          // eslint-disable-next-line no-console
          console.log('[AnimatedFretboardGP] renderFinished');
        });

        api.playerStateChanged.on((e: any) => {
          setIsPlaying(e.state === 1);
          // eslint-disable-next-line no-console
          console.log('[AnimatedFretboardGP] playerStateChanged', e);
        });

        api.playerPositionChanged.on((e: any) => {
          // Pull current beat from cursor as a reliable source
          try {
            const cursor = apiRef.current?.cursor || (api as any).cursor;
            const beat = cursor?.beat;
            if (beat) {
              const barIndex = beat?.voice?.bar?.index ?? currentBarIndex;
              setCurrentBarIndex(typeof barIndex === 'number' ? barIndex : 0);
              const beatIndex = typeof beat?.index === 'number' ? beat.index : currentBeatInBar;
              setCurrentBeatInBar(beatIndex);

              const bn = beat?.notes || [];
              const notes: ActiveNote[] = [];
              for (const n of bn) {
                const s = (typeof n?.string === 'number') ? n.string : (typeof n?.stringIndex === 'number' ? (n.stringIndex + 1) : undefined);
                const f = n?.fret;
                const bend = extractBendFromNote(n);
                if (typeof s === 'number' && typeof f === 'number') notes.push({ stringNumber: s, fret: f, bend });
              }
              setActiveNotes(notes);
              if (debugPrintCountRef.current < 20) {
                debugPrintCountRef.current++;
                // eslint-disable-next-line no-console
                console.log('[AnimatedFretboardGP] playerPositionChanged', { time: e?.currentTime, tick: e?.currentTick, notesCount: notes.length });
              }
            }
          } catch (err) {
            // eslint-disable-next-line no-console
            console.warn('[AnimatedFretboardGP] cursor read failed', err);
          }
        });

        // Beat change: track current bar and active notes
        api.playedBeatChanged.on((e: any) => {
          try {
            // Try to find bar index on the event
            const beat = (e && e.beat) ? e.beat : e;
            const barIndex = beat?.voice?.bar?.index ?? currentBarIndex;
            setCurrentBarIndex(typeof barIndex === 'number' ? barIndex : 0);
            const beatIndex = typeof beat?.index === 'number' ? beat.index : 0;
            setCurrentBeatInBar(beatIndex);
            // Update current quality/root display for external UI if desired
            if (onRootChange) {
              const r = getCurrentRoot();
              onRootChange(r, typeof barIndex === 'number' ? barIndex : 0);
            }
            if (autoBarToQualityRef.current && typeof barIndex === 'number') {
              setCurrentQuality(autoBarToQualityRef.current[barIndex] || 'unknown');
            }
            if (typeof barIndex === 'number' && keySigPrefRef.current[barIndex]) {
              setCurrentKeyPref(keySigPrefRef.current[barIndex]);
            }
            // Update active notes directly for this beat
            const bn = beat?.notes || [];
            const notes: ActiveNote[] = [];
            for (const n of bn) {
              const s = (typeof n?.string === 'number') ? n.string : (typeof n?.stringIndex === 'number' ? n.stringIndex : undefined);
              const f = n?.fret;
              const bend = extractBendFromNote(n);
              if (typeof s === 'number' && typeof f === 'number') notes.push({ stringNumber: s, fret: f, bend });
            }
            setActiveNotes(notes);
            if (debugPrintCountRef.current < 20) {
              debugPrintCountRef.current++;
              // eslint-disable-next-line no-console
              console.log('[AnimatedFretboardGP] playedBeatChanged', { barIndex, beatIndex, notes });
            }
          } catch {
            // ignore
          }
        });

        api.activeBeatsChanged.on((evt: any) => {
          try {
            const beats: any[] = Array.isArray(evt) ? evt : (evt?.beats || []);
            const notes: ActiveNote[] = [];
            for (const b of beats) {
              const barIdx = b?.voice?.bar?.index;
              if (typeof barIdx === 'number') setCurrentBarIndex(barIdx);
              const beatIndex = typeof b?.index === 'number' ? b.index : undefined;
              if (typeof beatIndex === 'number') setCurrentBeatInBar(beatIndex);
              const bn = b?.notes || [];
              for (const n of bn) {
                const s = (typeof n?.string === 'number') ? n.string : (typeof n?.stringIndex === 'number' ? n.stringIndex : undefined); // AlphaTab: 1..6 (1 = high E)
                const f = n?.fret;
                const bend = extractBendFromNote(n);
                if (typeof s === 'number' && typeof f === 'number') {
                  notes.push({ stringNumber: s, fret: f, bend });
                }
              }
            }
            if (notes.length > 0) {
              setActiveNotes(notes);
              if (clearNotesTimerRef.current) {
                window.clearTimeout(clearNotesTimerRef.current);
                clearNotesTimerRef.current = null;
              }
              // Briefly keep notes visible; clear slightly after beat
              clearNotesTimerRef.current = window.setTimeout(() => {
                setActiveNotes([]);
                clearNotesTimerRef.current = null;
              }, 140);
            }
            if (debugPrintCountRef.current < 20) {
              debugPrintCountRef.current++;
              // eslint-disable-next-line no-console
              console.log('[AnimatedFretboardGP] activeBeatsChanged', { notes });
            }
          } catch {
            // ignore
          }
        });

        // Robustly fetch GP file and load as ArrayBuffer (handles spaces/#/colons)
        const fetchArrayBuffer = async (path: string): Promise<ArrayBuffer> => {
          const cacheBuster = Date.now();
          const tryFetch = async (url: string) => {
            const res = await fetch(new Request(url, { cache: 'no-store' }));
            if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
            return res.arrayBuffer();
          };
          // Attempt 1: encodeURI (and fix #)
          const encoded1 = encodeURI(path).replace(/#/g, '%23');
          try {
            return await tryFetch(`${encoded1}?t=${cacheBuster}`);
          } catch {
            // Attempt 2: encode segments
            const encodedSegments = path
              .split('/')
              .map(seg => (seg ? encodeURIComponent(seg) : ''))
              .join('/')
              .replace(/%2F/g, '/');
            try {
              return await tryFetch(`${encodedSegments}?t=${cacheBuster}`);
            } catch {
              // Attempt 3: raw path without cache buster
              return await tryFetch(encodedSegments);
            }
          }
        };

        try {
          setStatus('Loading file...');
          const buffer = await fetchArrayBuffer(filePath);
          lastBufferRef.current = buffer;
          // Always load without preselecting tracks first to avoid silent failures
          api.load(buffer);
          setStatus('File loaded, parsing...');
        } catch (loadErr) {
          setStatus(`Failed to load file: ${String(loadErr)}`);
        }

        // Apply initial tempo percentage after ready
        const applyTempo = () => {
          try {
            if (apiRef.current && typeof apiRef.current.playbackSpeed !== 'undefined') {
              apiRef.current.playbackSpeed = (initialTempoPercent || 100) / 100;
            }
          } catch {
            // ignore
          }
        };
        const t = window.setTimeout(applyTempo, 500);
        return () => window.clearTimeout(t);
      } catch (err) {
        setStatus(`Failed to initialize: ${String(err)}`);
      }
    }
    init();
    return () => {
      disposed = true;
      try {
        apiRef.current?.destroy?.();
      } catch {
        // ignore
      }
    };
  }, [filePath, trackIndex, initialTempoPercent]);

  // Switch tracks without reloading the score (avoid recursion)
  useEffect(() => {
    try {
      if (apiRef.current && typeof trackIndex === 'number' && Number.isInteger(trackIndex)) {
        apiRef.current.renderTracks?.([trackIndex]);
      }
    } catch {}
  }, [trackIndex]);

  const handlePlayPause = useCallback(async () => {
    const api = apiRef.current;
    if (!api) return;
    try {
      // eslint-disable-next-line no-console
      console.log('[AnimatedFretboardGP] Play/Pause clicked');
      const AC: any = (window as any).AudioContext || (window as any).webkitAudioContext;
      if (AC) {
        if (!(window as any)._sharedAudioCtx) {
          (window as any)._sharedAudioCtx = new AC();
        }
        if ((window as any)._sharedAudioCtx.state === 'suspended') {
          await (window as any)._sharedAudioCtx.resume();
        }
      }
      // Try to resume AlphaTab internal context if present
      try {
        const internalCtx = (api as any)?.audio?.context || (api as any)?._audioContext;
        if (internalCtx && internalCtx.state === 'suspended') {
          await internalCtx.resume();
        }
      } catch {}
    } catch {}
    try {
      // Prefer explicit play/pause to handle unknown initial state
      const playing = (api as any).isPlaying ?? isPlaying;
      if (playing) (api as any).pause?.();
      else (api as any).play?.();
    } catch {}
  }, []);

  const handleStop = useCallback(() => {
    const api = apiRef.current;
    if (!api) return;
    try {
      api.stop();
      setActiveNotes([]);
    } catch {
      // ignore
    }
  }, []);

  // Map AlphaTab stringNumber (1 = high E) to display row index
  const mapStringToDisplayRow = useCallback((stringNumber: number): number => {
    // Display rows: 0..5 from top to bottom
    const alphaTabIndexFromTopWhenTabOrder = 6 - stringNumber; // 0..5
    return useTabStringOrder ? alphaTabIndexFromTopWhenTabOrder : stringNumber - 1;
  }, [useTabStringOrder]);

  const currentRoot = getCurrentRoot();

  function extractBendFromNote(n: any): ActiveNote['bend'] | undefined {
    try {
      const points = n?.bendPoints || n?.bend?.points || n?.bend?.bendPoints || null;
      if (Array.isArray(points) && points.length > 0) {
        const values = points.map((p: any) => (typeof p?.value === 'number' ? p.value : (typeof p?.y === 'number' ? p.y : 0)));
        const start = values[0] || 0;
        const end = values[values.length - 1] || 0;
        const maxVal = Math.max(...values);
        const hasPrebend = start > 0.01;
        const hasRelease = maxVal > 0.01 && end < maxVal - 0.01;
        const upSemitones = Math.max(0, end - start, maxVal - start);
        if (upSemitones > 0.01 || hasPrebend || hasRelease) {
          return { upSemitones, hasPrebend, hasRelease };
        }
      }
      if (n?.isBend || n?.isBendDestination || n?.isBendOrigin) {
        return { upSemitones: 1, hasPrebend: !!n?.isPrebend, hasRelease: !!n?.isBendRelease };
      }
    } catch {}
    return undefined;
  }

  function formatBendAmount(amount: number): string {
    const a = Math.round(amount * 2) / 2;
    if (Math.abs(a - 0.5) < 0.01) return '1/4';
    if (Math.abs(a - 1) < 0.01) return '1/2';
    if (Math.abs(a - 1.5) < 0.01) return '1 1/2';
    if (Math.abs(a - 2) < 0.01) return 'Full';
    if (a > 2) return `${a} st`;
    return a > 0 ? `${a} st` : '';
  }

  // SVG-based fretboard for stable layout
  const renderSvgFretboard = () => {
    const numStrings = 6;
    const numFrets = Math.max(1, fretCount);
    const cellWidth = 34;
    const stringGap = 26;
    const leftPadding = 44;
    const topPadding = 18;
    const fretNumberYOffset = -8; // nudge fret numbers up a bit for clarity
    const width = leftPadding + numFrets * cellWidth + 16;
    const height = topPadding + (numStrings - 1) * stringGap + 16;

    // Enforce standard orientation: top = high E (row 0), bottom = low E (row 5)
    // Translate AlphaTab string numbering if needed
    const stringNumberToRow = (alphaTabStringNumber: number) => mapAlphaTabStringToHighEOrder(alphaTabStringNumber) - 1;

    const circles = activeNotes.map((n, idx) => {
      const row = stringNumberToRow(n.stringNumber);
      if (row < 0 || row > 5) return null;
      const cx = leftPadding + ((n.fret === 0 ? -0.5 : (n.fret - 0.5)) * cellWidth);
      const cy = topPadding + row * stringGap;
      const noteIndex = getNoteIndexForStringFret(n.stringNumber, n.fret);
      let label: string;
      if (showIntervals && currentRoot) {
        label = computeIntervalLabel(currentRoot, noteIndex, accidentalStyle, currentQuality);
      } else {
        // Note names: choose flats/sharps by key signature if enabled
        if (useKeySignatureForNames) {
          label = (currentKeyPref === 'flat' ? NOTE_NAMES_FLAT : NOTE_NAMES_SHARP)[noteIndex];
        } else {
          label = (accidentalStyle === 'flat' ? NOTE_NAMES_FLAT : NOTE_NAMES_SHARP)[noteIndex];
        }
      }
      return (
        <g key={`note-${idx}`}>
          <circle cx={cx} cy={cy} r={9} fill="#d97706" stroke="#fbbf24" strokeWidth={2} />
          {label && (
            <text x={cx} y={cy + 3} textAnchor="middle" fontSize={10} fill="#ffffff" fontWeight={700}>
              {label}
            </text>
          )}
        </g>
      );
    });

    // Inlays
    const inlays = new Set([3,5,7,9,12,15,17,19,21]);
    return (
      <svg width="100%" viewBox={`0 0 ${width} ${height}`} className="w-full max-w-full">
        <defs>
          <linearGradient id="fretboardGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#fef3c7" />
            <stop offset="100%" stopColor="#fde68a" />
          </linearGradient>
          <linearGradient id="stringGrad" x1="0" x2="1">
            <stop offset="0%" stopColor="#cbd5e1" />
            <stop offset="100%" stopColor="#94a3b8" />
          </linearGradient>
          <linearGradient id="fretGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#e5e7eb" />
            <stop offset="100%" stopColor="#d1d5db" />
          </linearGradient>
          <filter id="noteGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect x="0" y="0" width={width} height={height} rx="8" ry="8" fill="url(#fretboardGrad)" stroke="#f59e0b" strokeWidth="1" />

        {/* Strings (high contrast) */}
        {Array.from({ length: numStrings }, (_, i) => {
          const y = topPadding + i * stringGap;
          const w = i === 0 ? 1.6 : i === 1 ? 1.8 : i === 2 ? 2 : i === 3 ? 2.3 : i === 4 ? 2.6 : 2.9;
          return (
            <line
              key={`str-${i}`}
              x1={leftPadding}
              y1={y}
              x2={leftPadding + numFrets * cellWidth}
              y2={y}
              stroke="#475569"
              strokeWidth={w}
              strokeLinecap="round"
              opacity="0.98"
            />
          );
        })}
        {/* Frets (high contrast) */}
        {Array.from({ length: numFrets + 1 }, (_, f) => {
          const x = leftPadding + f * cellWidth;
          return (
            <g key={`fret-${f}`}>
              {f === 0 ? (
                // Nut
                <line
                  x1={x}
                  y1={topPadding - 4}
                  x2={x}
                  y2={topPadding + (numStrings - 1) * stringGap + 4}
                  stroke="#334155"
                  strokeWidth={4}
                />
              ) : (
                <line x1={x} y1={topPadding} x2={x} y2={topPadding + (numStrings - 1) * stringGap} stroke="#6b7280" strokeWidth={2} />
              )}
              <text x={x - cellWidth / 2} y={topPadding + fretNumberYOffset} textAnchor="middle" fontSize={10} fill="#374151">{f}</text>
            </g>
          );
        })}
        {/* Inlay markers */}
        {Array.from({ length: numFrets + 1 }, (_, f) => {
          if (!inlays.has(f)) return null;
          const x = leftPadding + (f - 0.5) * cellWidth;
          const midY = topPadding + ((numStrings - 1) * stringGap) / 2;
          if (f === 12) {
            return (
              <g key={`inlay-${f}`} opacity="0.35">
                <circle cx={x} cy={midY - 8} r={4} fill="#78350f" />
                <circle cx={x} cy={midY + 8} r={4} fill="#78350f" />
              </g>
            );
          }
          return <circle key={`inlay-${f}`} cx={x} cy={midY} r={4} fill="#78350f" opacity="0.35" />;
        })}

        {/* Labels */}
        {Array.from({ length: numStrings }, (_, row) => {
          const label = STANDARD_TUNING_FROM_HIGH_E[row];
          return (
            <text key={`lab-${row}`} x={leftPadding - 14} y={topPadding + row * stringGap + 4} textAnchor="end" fontSize={11} fill="#92400e" fontWeight={600}>{label}</text>
          );
        })}

        <g filter="url(#noteGlow)">{circles}</g>
      </svg>
    );
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-3">
        <button
          disabled={!isReady}
          onClick={handlePlayPause}
          className={`px-3 py-1.5 rounded-md text-white text-sm ${isReady ? (isPlaying ? 'bg-amber-500 hover:bg-amber-600' : 'bg-amber-800 hover:bg-amber-900') : 'bg-gray-300 cursor-not-allowed'}`}
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button
          disabled={!isReady}
          onClick={handleStop}
          className={`px-3 py-1.5 rounded-md text-white text-sm ${isReady ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-300 cursor-not-allowed'}`}
        >
          Stop
        </button>
        <div className="text-xs text-gray-600">{status}</div>
        {currentRoot && (
          <div className="ml-auto text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded px-2 py-1">
            Root: {currentRoot} (bar {currentBarIndex + 1})
          </div>
        )}
      </div>

      {/* Fretboard visualization (SVG for stable geometry) */}
      <div className="rounded-lg border border-amber-200 p-3 shadow-sm bg-white mb-4">
        {renderSvgFretboard()}
      </div>

      {/* AlphaTab surface (notation) */}
      <div className="w-full overflow-x-auto" style={hideNotation ? { height: 0, padding: 0, margin: 0, visibility: 'hidden' } : undefined}>
        <div ref={containerRef} className="border border-gray-200 rounded" style={hideNotation ? { minWidth: 600, height: 0, overflow: 'hidden', opacity: 0 } : { minWidth: 600 }} />
      </div>
    </div>
  );
}


