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
  showTransport?: boolean; // if false, hide play/stop/status UI
  useKeySignatureForNames?: boolean; // when showing note names, prefer flats/sharps based on key signature
  syncId?: string; // synchronize transport with other diagrams having the same id
  isSilent?: boolean; // if true, mute audio output but keep events
  loadOnlySelectedTrack?: boolean; // if true, load only the selected track into this instance
  stepMode?: boolean; // if true, expose prev/next note stepping and hide transport
  onRegisterStepApi?: (api: { next: () => void; prev: () => void; goto: (idx: number) => void; getIndex: () => number; length: number; }) => void;
  barToRoot?: BarToRootMap; // map bar index -> interval root
  // Optional finer-grain mapping: key as `${barIndex}:${beatIndex}` → root
  beatToRoot?: Record<string, string>;
  initialTempoPercent?: number; // 100 = normal
  accidentalStyle?: 'flat' | 'sharp' | 'mixed'; // how to display 6/8 semitone alterations
  autoRootFromChordTrackIndex?: number; // if set, derive roots from chord names on this track index
  onRootChange?: (root: string | null, barIndex: number) => void;
  onTracksDetected?: (tracks: { index: number; name: string }[]) => void;
  onBarCountDetected?: (barCount: number) => void;
}

interface ActiveNote {
  stringNumber: number; // 1..6 (AlphaTab numbering)
  fret: number; // 0..n
  bend?: {
    upSemitones: number;
    hasPrebend: boolean;
    hasRelease: boolean;
  };
  slide?: {
    direction: 'up' | 'down' | 'bi';
  };
  hp?: 'H' | 'P';
}

const STANDARD_TUNING_FROM_HIGH_E = ['E', 'B', 'G', 'D', 'A', 'E'];
const STANDARD_4_STRING_BASS_FROM_HIGH_G = ['G', 'D', 'A', 'E'];
const STANDARD_5_STRING_BASS_HIGH_TO_LOW = ['G', 'D', 'A', 'E', 'B'];
const STANDARD_6_STRING_BASS_HIGH_TO_LOW = ['C', 'G', 'D', 'A', 'E', 'B'];
const STANDARD_7_STRING_GUITAR_HIGH_TO_LOW = ['E', 'B', 'G', 'D', 'A', 'E', 'B'];
const STANDARD_8_STRING_GUITAR_HIGH_TO_LOW = ['E', 'B', 'G', 'D', 'A', 'E', 'B', 'F#'];
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

function mapAlphaTabStringToHighOrder(alphaTabStringNumber: number, numStrings: number): number {
  // Convert AlphaTab string number to 1..numStrings in high-string-first order
  // If AlphaTab uses 1=lowest, then highOrder = (numStrings + 1) - s
  return ALPHATAB_STRING1_IS_LOW_E ? ((numStrings + 1) - alphaTabStringNumber) : alphaTabStringNumber;
}

function getOpenStringNoteIndexFrom(tuningHighToLow: string[], alphaTabStringNumber: number, numStrings: number): number {
  const highOrderString = mapAlphaTabStringToHighOrder(alphaTabStringNumber, numStrings);
  const name = tuningHighToLow[highOrderString - 1];
  return NOTE_TO_INDEX[name];
}

function getNoteIndexForStringFretFrom(tuningHighToLow: string[], alphaTabStringNumber: number, fret: number, numStrings: number): number {
  const openIdx = getOpenStringNoteIndexFrom(tuningHighToLow, alphaTabStringNumber, numStrings);
  return addSemitones(openIdx, fret);
}

function deriveStringsAndTuningFromName(trackNameRaw: string): { numStrings?: number; tuningHighToLow?: string[] } {
  const name = (trackNameRaw || '').toLowerCase();
  const m = name.match(/(\d+)\s*string/);
  const n = m ? parseInt(m[1], 10) : undefined;
  if (name.includes('bass')) {
    if (n === 5) return { numStrings: 5, tuningHighToLow: STANDARD_5_STRING_BASS_HIGH_TO_LOW };
    if (n === 6) return { numStrings: 6, tuningHighToLow: STANDARD_6_STRING_BASS_HIGH_TO_LOW };
    // default 4-string bass
    return { numStrings: 4, tuningHighToLow: STANDARD_4_STRING_BASS_FROM_HIGH_G };
  }
  if (name.includes('guitar')) {
    if (n === 7) return { numStrings: 7, tuningHighToLow: STANDARD_7_STRING_GUITAR_HIGH_TO_LOW };
    if (n === 8) return { numStrings: 8, tuningHighToLow: STANDARD_8_STRING_GUITAR_HIGH_TO_LOW };
  }
  return {};
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
  showTransport = true,
  syncId = 'global',
  isSilent = false,
  loadOnlySelectedTrack = false,
  stepMode = false,
  onRegisterStepApi,
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
  const stepBeatsRef = useRef<Array<{ bar: number; beat: number; tick: number }>>([]);
  const stepIndexRef = useRef<number>(0);
  const autoBarToRootRef = useRef<Record<number, string> | null>(null);
  const autoBarToQualityRef = useRef<Record<number, ChordQuality> | null>(null);
  const [currentQuality, setCurrentQuality] = useState<ChordQuality>('unknown');
  const keySigPrefRef = useRef<Record<number, 'flat' | 'sharp'>>({});
  const [currentKeyPref, setCurrentKeyPref] = useState<'flat' | 'sharp'>('sharp');
  const [numStrings, setNumStrings] = useState<number>(6);
  const [tuningHighToLow, setTuningHighToLow] = useState<string[]>(STANDARD_TUNING_FROM_HIGH_E);
  const lastScoreRef = useRef<any>(null);
  const tuningLockedRef = useRef<boolean>(false);
  const appliedTrackRef = useRef<number | null>(null);
  const totalTicksRef = useRef<number>(0);
  const barFirstTickRef = useRef<Record<number, number>>({});
  const totalBarsRef = useRef<number>(0);

  const displayedStrings = useMemo(() => {
    const stringsHighToLow = STANDARD_TUNING_FROM_HIGH_E.slice();
    // When TAB order is requested, show Low E at top → High E at bottom
    return useTabStringOrder ? stringsHighToLow.slice().reverse() : stringsHighToLow;
  }, [useTabStringOrder]);

  const lastKnownRootRef = useRef<string | null>(null);

  const getCurrentRoot = useCallback((): string | null => {
    // Beat-level mapping has priority if provided
    const apiRootFromBeat = (beatToRootKey?: string) =>
      beatToRootKey ? (beatToRootKey in (beatToRoot || {}) ? (beatToRoot as any)[beatToRootKey] : null) : null;

    // Try beat map first
    const beatKey = `${currentBarIndex}:${currentBeatInBar}`;
    const beatRoot = apiRootFromBeat(beatKey);
    if (beatRoot) {
      lastKnownRootRef.current = beatRoot;
      return lastKnownRootRef.current;
    }

    // Next prefer automatic chord-track derived map
    if (autoBarToRootRef.current) {
      const root = autoBarToRootRef.current[currentBarIndex];
      if (root) {
        lastKnownRootRef.current = root;
        return lastKnownRootRef.current;
      }
    }
    // Finally, fallback to manual bar map
    if (barToRoot) {
      const root = barToRoot[currentBarIndex];
      if (root) {
        lastKnownRootRef.current = root;
        return lastKnownRootRef.current;
      }
    }
    return lastKnownRootRef.current;
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
          // do not reference score here (not available yet)
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
          // Register step API once player is ready
          try {
            if (stepMode && onRegisterStepApi) {
              onRegisterStepApi({
                next: () => {
                  const steps = stepBeatsRef.current;
                  const apiAny = apiRef.current as any;
                  if (!apiAny || steps.length === 0) return;
                  stepIndexRef.current = Math.min(steps.length - 1, stepIndexRef.current + 1);
                  const s = steps[stepIndexRef.current];
                  if (apiAny?.cursor?.moveTo) apiAny.cursor.moveTo(s.bar, s.beat);
                  else if (apiAny?.seek) apiAny.seek(s.tick ?? 0);
                  else {
                    try { apiAny.pause?.(); apiAny.stop?.(); } catch {}
                  }
                },
                prev: () => {
                  const steps = stepBeatsRef.current;
                  const apiAny = apiRef.current as any;
                  if (!apiAny || steps.length === 0) return;
                  stepIndexRef.current = Math.max(0, stepIndexRef.current - 1);
                  const s = steps[stepIndexRef.current];
                  if (apiAny?.cursor?.moveTo) apiAny.cursor.moveTo(s.bar, s.beat);
                  else if (apiAny?.seek) apiAny.seek(s.tick ?? 0);
                  else {
                    try { apiAny.pause?.(); apiAny.stop?.(); } catch {}
                  }
                },
                goto: (idx: number) => {
                  const steps = stepBeatsRef.current;
                  const apiAny = apiRef.current as any;
                  if (!apiAny || steps.length === 0) return;
                  stepIndexRef.current = Math.max(0, Math.min(steps.length - 1, idx));
                  const s = steps[stepIndexRef.current];
                  if (apiAny?.cursor?.moveTo) apiAny.cursor.moveTo(s.bar, s.beat);
                  else if (apiAny?.seek) apiAny.seek(s.tick ?? 0);
                  else {
                    try { apiAny.pause?.(); apiAny.stop?.(); } catch {}
                  }
                },
                getIndex: () => stepIndexRef.current,
                length: stepBeatsRef.current.length,
              });
            }
          } catch {}
        });

        // Sync listeners
        const onSyncTransport = (evt: any) => {
          try {
            if (evt?.detail?.id !== syncId) return;
            const shouldPlay = !!evt?.detail?.playing;
            if (shouldPlay) (apiRef.current as any)?.play?.();
            else (apiRef.current as any)?.pause?.();
          } catch {}
        };
        const onSyncStop = (evt: any) => {
          try {
            if (evt?.detail?.id !== syncId) return;
            (apiRef.current as any)?.stop?.();
            setActiveNotes([]);
          } catch {}
        };
        const onSyncSeek = (evt: any) => {
          try {
            if (evt?.detail?.id !== syncId) return;
            const apiAny = apiRef.current as any;
            if (!apiAny) return;
            const d = evt.detail || {};
            if (typeof d.tick === 'number') {
              apiAny.seek?.(Math.max(0, Math.floor(d.tick)));
              return;
            }
            if (typeof d.bar === 'number') {
              // Prefer seeking by tick at the start of the requested bar for reliable playback
              const bt = barFirstTickRef.current[d.bar];
              if (typeof bt === 'number' && apiAny?.seek) {
                apiAny.seek(Math.max(0, Math.floor(bt)));
              } else if (apiAny?.cursor?.moveTo) {
                apiAny.cursor.moveTo(d.bar, d.beat ?? 0);
              }
              return;
            }
            if (typeof d.percent === 'number') {
              const total = totalTicksRef.current || 0;
              if (total > 0 && apiAny.seek) {
                const tick = Math.max(0, Math.min(total, Math.floor(total * d.percent)));
                apiAny.seek(tick);
              }
            }
          } catch {}
        };
        window.addEventListener('af-sync-transport' as any, onSyncTransport);
        window.addEventListener('af-sync-stop' as any, onSyncStop);
        window.addEventListener('af-sync-seek' as any, onSyncSeek);

        api.error.on((e: any) => {
          console.error('[AnimatedFretboardGP] AlphaTab error:', e);
          setStatus('AlphaTab error (see console)');
        });


        api.scoreLoaded.on((score: any) => {
          setStatus('Score loaded');
          setIsReady(true);
          lastScoreRef.current = score;
          // try to compute total ticks for seeking
          try {
            let maxTick = 0;
            const tracks = score?.tracks || [];
            const t = tracks[trackIndex] || tracks[0];
            const staves = t?.staves || [];
            const bars = staves[0]?.bars || [];
            const barTick: Record<number, number> = {};
            for (const bar of bars) {
              const voices = bar?.voices || [];
              for (const v of voices) {
                const beats = v?.beats || [];
                for (const b of beats) {
                  const tick = b?.start ?? b?.startTick ?? 0;
                  if (typeof tick === 'number') maxTick = Math.max(maxTick, tick);
                  const barIdx = bar?.index ?? 0;
                  if (typeof barIdx === 'number') {
                    if (!(barIdx in barTick)) barTick[barIdx] = tick;
                    else barTick[barIdx] = Math.min(barTick[barIdx], tick);
                  }
                }
              }
            }
            totalTicksRef.current = maxTick;
            barFirstTickRef.current = barTick;
          } catch {}
          // compute bar count for parent
          try {
            const tracks = score?.tracks || [];
            const tSel = tracks[trackIndex] || tracks[0];
            const bars = tSel?.staves?.[0]?.bars || [];
            totalBarsRef.current = Array.isArray(bars) ? bars.length : 0;
            if (typeof onBarCountDetected === 'function') onBarCountDetected(totalBarsRef.current);
          } catch {}
          // Build step list (bar, beat, tick) for step mode
          try {
            const steps: Array<{ bar: number; beat: number; tick: number }> = [];
            const tracks = score?.tracks || [];
            const t = tracks[trackIndex] || tracks[0];
            const staves = t?.staves || [];
            const bars = staves[0]?.bars || [];
            for (const bar of bars) {
              const barIdx = bar?.index ?? steps.length;
              const voices = bar?.voices || [];
              for (const v of voices) {
                const beats = v?.beats || [];
                for (const b of beats) {
                  const beatIdx = b?.index ?? 0;
                  const tick = b?.start ?? b?.startTick ?? 0;
                  steps.push({ bar: barIdx, beat: beatIdx, tick });
                }
              }
            }
            stepBeatsRef.current = steps;
            stepIndexRef.current = 0;
          } catch {}
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
              (score?.tracks?.[trackIndex] || score?.tracks?.[0]) &&
              appliedTrackRef.current !== trackIndex
            ) {
              if (!loadOnlySelectedTrack) {
                setStatus('Selecting track...');
                appliedTrackRef.current = trackIndex;
                apiRef.current?.renderTracks?.([trackIndex]);
              }
              // Update string count / tuning based on track detection
              try {
                const t = score.tracks?.[trackIndex] ?? score.tracks?.[0];
                const trackName: string = (t?.name || '').toString();
                const fromName = deriveStringsAndTuningFromName(trackName);
                if (!tuningLockedRef.current && fromName.numStrings && fromName.tuningHighToLow) {
                  setNumStrings(fromName.numStrings);
                  setTuningHighToLow(fromName.tuningHighToLow);
                  tuningLockedRef.current = true;
                } else {
                  const strings = t?.staves?.[0]?.strings || t?.strings || t?.stringTunings || [];
                  if (!tuningLockedRef.current && Array.isArray(strings) && strings.length > 0) {
                    setNumStrings(strings.length);
                    if (strings.length === 4) setTuningHighToLow(STANDARD_4_STRING_BASS_FROM_HIGH_G);
                    else if (strings.length === 5) setTuningHighToLow(STANDARD_5_STRING_BASS_HIGH_TO_LOW);
                    else if (strings.length === 7) setTuningHighToLow(STANDARD_7_STRING_GUITAR_HIGH_TO_LOW);
                    else if (strings.length === 8) setTuningHighToLow(STANDARD_8_STRING_GUITAR_HIGH_TO_LOW);
                    else setTuningHighToLow(STANDARD_TUNING_FROM_HIGH_E);
                    tuningLockedRef.current = true;
                  }
                }
              } catch {}
            }
          } catch (e) {
            console.warn('Track select failed, staying on default track', e);
          }
        });

        api.renderFinished.on(() => {
          setStatus('Rendered');
          // eslint-disable-next-line no-console
          console.log('[AnimatedFretboardGP] renderFinished');
          // Safety: ensure string count reflects selected track even for first diagram
          try {
            const score = lastScoreRef.current;
            const t = score?.tracks?.[trackIndex];
            if (t) {
              const trackName: string = (t?.name || '').toString();
              const fromName = deriveStringsAndTuningFromName(trackName);
              const strings = t?.staves?.[0]?.strings || t?.strings || t?.stringTunings || [];
              if (fromName.numStrings && fromName.tuningHighToLow) {
                setNumStrings(fromName.numStrings);
                setTuningHighToLow(fromName.tuningHighToLow);
              } else if (Array.isArray(strings) && strings.length > 0) {
                setNumStrings(strings.length);
                if (strings.length === 4) setTuningHighToLow(STANDARD_4_STRING_BASS_FROM_HIGH_G);
                else if (strings.length === 5) setTuningHighToLow(STANDARD_5_STRING_BASS_HIGH_TO_LOW);
                else if (strings.length === 7) setTuningHighToLow(STANDARD_7_STRING_GUITAR_HIGH_TO_LOW);
                else if (strings.length === 8) setTuningHighToLow(STANDARD_8_STRING_GUITAR_HIGH_TO_LOW);
                else setTuningHighToLow(STANDARD_TUNING_FROM_HIGH_E);
              }
            }
          } catch {}
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
              // Infer tuning/strings if not yet locked from first observed note events
              if (!tuningLockedRef.current) {
                try {
                  const bn = beat?.notes || [];
                  let maxString = 0;
                  for (const n of bn) {
                    if (typeof n?.string === 'number') maxString = Math.max(maxString, n.string);
                  }
                  if (maxString > 0) {
                    if (maxString <= 4) {
                      setNumStrings(4);
                      setTuningHighToLow(STANDARD_4_STRING_BASS_FROM_HIGH_G);
                    } else {
                      setNumStrings(6);
                      setTuningHighToLow(STANDARD_TUNING_FROM_HIGH_E);
                    }
                    tuningLockedRef.current = true;
                  }
                } catch {}
              }
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
                const slide = extractSlideFromNote(n);
                const hp = extractHPFromNote(n);
                if (typeof s === 'number' && typeof f === 'number') notes.push({ stringNumber: s, fret: f, bend, slide, hp });
              }
              setActiveNotes(notes);
              if (notes.some(nn => !!nn.bend)) {
                try { console.log('[AnimatedFretboardGP] bend detected', notes.filter(nn => !!nn.bend)); } catch {}
              }
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
              const slide = extractSlideFromNote(n);
              const hp = extractHPFromNote(n);
              if (typeof s === 'number' && typeof f === 'number') notes.push({ stringNumber: s, fret: f, bend, slide, hp });
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
                const s = (typeof n?.string === 'number') ? n.string : (typeof n?.stringIndex === 'number') ? n.stringIndex : undefined; // AlphaTab: 1..6 (1 = high E)
                const f = n?.fret;
                const bend = extractBendFromNote(n);
                const slide = extractSlideFromNote(n);
                const hp = extractHPFromNote(n);
                if (typeof s === 'number' && typeof f === 'number') {
                  notes.push({ stringNumber: s, fret: f, bend, slide, hp });
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
          if (loadOnlySelectedTrack && typeof trackIndex === 'number') {
            api.load(buffer, [trackIndex]);
          } else {
            api.load(buffer);
          }
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
            // Mute if silent diagram
            if (apiRef.current && isSilent) {
              try {
                (apiRef.current as any).masterVolume = 0;
                const audio = (apiRef.current as any).audio;
                if (audio && typeof audio.masterVolume !== 'undefined') audio.masterVolume = 0;
              } catch {}
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
      // remove using the same references
      try {
        window.removeEventListener('af-sync-transport' as any, onSyncTransport as any);
        window.removeEventListener('af-sync-stop' as any, onSyncStop as any);
        window.removeEventListener('af-sync-seek' as any, onSyncSeek as any);
      } catch {}
    };
  }, [filePath, trackIndex, initialTempoPercent]);

  // Switch tracks without reloading the score (avoid recursion)
  useEffect(() => {
    try {
      if (apiRef.current && typeof trackIndex === 'number' && Number.isInteger(trackIndex)) {
        // Reset tuning lock when track changes so we can re-detect string count/tuning
        tuningLockedRef.current = false;
        apiRef.current.renderTracks?.([trackIndex]);
        // Update tuning/strings for current track
        try {
          const score = lastScoreRef.current;
          const t = score?.tracks?.[trackIndex];
          if (t && !tuningLockedRef.current) {
            const trackName: string = (t?.name || '').toString();
            const fromName = deriveStringsAndTuningFromName(trackName);
            const strings = t?.staves?.[0]?.strings || t?.strings || t?.stringTunings || [];
            if (fromName.numStrings && fromName.tuningHighToLow) {
              setNumStrings(fromName.numStrings);
              setTuningHighToLow(fromName.tuningHighToLow);
              tuningLockedRef.current = true;
            } else if (Array.isArray(strings) && strings.length > 0) {
              setNumStrings(strings.length);
              if (strings.length === 4) setTuningHighToLow(STANDARD_4_STRING_BASS_FROM_HIGH_G);
              else if (strings.length === 5) setTuningHighToLow(STANDARD_5_STRING_BASS_HIGH_TO_LOW);
              else if (strings.length === 7) setTuningHighToLow(STANDARD_7_STRING_GUITAR_HIGH_TO_LOW);
              else if (strings.length === 8) setTuningHighToLow(STANDARD_8_STRING_GUITAR_HIGH_TO_LOW);
              else setTuningHighToLow(STANDARD_TUNING_FROM_HIGH_E);
              tuningLockedRef.current = true;
            }
          }
        } catch {}
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
      // Broadcast to synced peers
      window.dispatchEvent(new CustomEvent('af-sync-transport', { detail: { id: syncId, playing: !playing } }));
    } catch {}
  }, []);

  const handleStop = useCallback(() => {
    const api = apiRef.current;
    if (!api) return;
    try {
      api.stop();
      setActiveNotes([]);
      window.dispatchEvent(new CustomEvent('af-sync-stop', { detail: { id: syncId } }));
    } catch {
      // ignore
    }
  }, []);

  // Map AlphaTab stringNumber (1-based) to display row index
  const mapStringToDisplayRow = useCallback((stringNumber: number): number => {
    // Display rows: 0..(n-1) from top to bottom
    const idxFromTop = (numStrings - stringNumber);
    return useTabStringOrder ? idxFromTop : (stringNumber - 1);
  }, [useTabStringOrder, numStrings]);

  const currentRoot = getCurrentRoot();

  function extractBendFromNote(n: any): ActiveNote['bend'] | undefined {
    try {
      const points = n?.bendPoints || n?.bend?.points || n?.bend?.bendPoints || null;
      if (Array.isArray(points) && points.length > 0) {
        const raw = points.map((p: any) => (typeof p?.value === 'number' ? p.value : (typeof p?.y === 'number' ? p.y : 0)));
        const rawStart = raw[0] || 0;
        const rawEnd = raw[raw.length - 1] || 0;
        const rawMax = Math.max(...raw);
        // AlphaTab/GP files may encode bend values in quarter-steps (4 = full step) or semitones (2 = full step).
        // If we see values > 2.1, assume quarter-steps and scale by 0.5 to semitones.
        const unitScale = rawMax > 2.1 ? 0.5 : 1;
        const start = rawStart * unitScale;
        const end = rawEnd * unitScale;
        const maxVal = rawMax * unitScale;
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

  function extractSlideFromNote(n: any): ActiveNote['slide'] | undefined {
    try {
      const slideAny = n?.slide ?? n?.Slide ?? null;
      const isSlide = !!(n?.isSlide || n?.isSlideOut || n?.isSlideIn || slideAny);
      const slideType = n?.slideType ?? n?.slideOutType ?? n?.slideInType ?? (slideAny ? (slideAny.type ?? slideAny.slideType) : undefined);
      if (!isSlide && (slideType == null || slideType === 0)) return undefined;
      let dir: 'up' | 'down' | 'bi' = 'bi';
      const typeStr = typeof slideType === 'string' ? slideType.toLowerCase() : '';
      if (typeStr.includes('up')) dir = 'up';
      else if (typeStr.includes('down')) dir = 'down';
      else if (typeof slideType === 'number') {
        if (slideType === 1 || slideType === 3 || slideType === 5) dir = 'up';
        if (slideType === 2 || slideType === 4 || slideType === 6) dir = 'down';
      }
      return { direction: dir };
    } catch {}
    return undefined;
  }

  function extractHPFromNote(n: any): ActiveNote['hp'] | undefined {
    try {
      if (n?.isHammerOn || n?.hammerOn) return 'H';
      if (n?.isPullOff || n?.pullOff) return 'P';
      if (n?.isLegato && !n?.isSlide && !n?.slide && !n?.bend) return 'H';
    } catch {}
    return undefined;
  }

  function formatBendAmount(semitones: number): string {
    // Convert semitones to steps (whole steps) and round to nearest 0.5
    const steps = Math.round((semitones / 2) * 2) / 2;
    if (Math.abs(steps - 0.25) < 0.01) return '1/4';
    if (Math.abs(steps - 0.5) < 0.01) return '1/2';
    if (Math.abs(steps - 1.0) < 0.01) return 'Full';
    if (Math.abs(steps - 1.5) < 0.01) return '1 1/2';
    if (steps > 1.5) return `${steps} st`;
    return steps > 0 ? `${steps} st` : '';
  }

  // SVG-based fretboard for stable layout
  const renderSvgFretboard = () => {
    const nStrings = numStrings;
    const numFrets = Math.max(1, fretCount);
    const cellWidth = 34;
    const stringGap = 26;
    const leftPadding = 44;
    const topPadding = 18;
    const fretNumberYOffset = -8; // nudge fret numbers up a bit for clarity
    const width = leftPadding + numFrets * cellWidth + 16;
    const height = topPadding + (nStrings - 1) * stringGap + 16;

    // Enforce standard orientation: top = high E (row 0), bottom = low E (row 5)
    // Translate AlphaTab string numbering if needed
    const stringNumberToRow = (alphaTabStringNumber: number) => mapAlphaTabStringToHighOrder(alphaTabStringNumber, nStrings) - 1;

    const circles = activeNotes.map((n, idx) => {
      const row = stringNumberToRow(n.stringNumber);
      if (row < 0 || row > (nStrings - 1)) return null;
      const cx = leftPadding + ((n.fret === 0 ? -0.5 : (n.fret - 0.5)) * cellWidth);
      const cy = topPadding + row * stringGap;
      const noteIndex = getNoteIndexForStringFretFrom(tuningHighToLow, n.stringNumber, n.fret, nStrings);
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
      const bend = n.bend;
      const bendLen = bend ? Math.min(26, 8 + (bend.upSemitones || 0) * 8) : 0;
      const bendLabel = bend ? formatBendAmount(bend.upSemitones || 0) : '';
      // Decide arrow direction per string count and tuning
      const stringName = tuningHighToLow[row];
      let bendUp: boolean;
      if (nStrings >= 6) {
        // Guitar (6+): top three strings (E,B,G) up; lower three (D,A,E) down
        bendUp = row <= 2;
      } else if (nStrings === 4 || nStrings === 5) {
        // Bass (4/5): only top G goes up; others down
        bendUp = stringName === 'G';
      } else {
        // Fallback heuristic
        bendUp = row <= Math.min(2, nStrings - 1);
      }
      // Invert per user request: make arrows point opposite to current mapping
      bendUp = !bendUp;
      const bendY1 = bendUp ? (cy - 12) : (cy + 12);
      const bendY2 = bendUp ? (bendY1 - bendLen) : (bendY1 + bendLen);
      return (
        <g key={`note-${idx}`}>
          <circle cx={cx} cy={cy} r={9} fill="#d97706" stroke="#fbbf24" strokeWidth={2} />
          {label && (
            <text x={cx} y={cy + 3} textAnchor="middle" fontSize={10} fill="#ffffff" fontWeight={700}>
              {label}
            </text>
          )}
          {n.hp && (
            <text x={cx + 12} y={cy - 10} textAnchor="middle" fontSize={10} fill="#0f172a" fontWeight={700}>{n.hp}</text>
          )}
          {/* Slide arrows */}
          {n.slide && (
            n.slide.direction === 'up' ? (
              <g>
                <line x1={cx + 10} y1={cy} x2={cx + 30} y2={cy} stroke="#0f172a" strokeWidth={1.6} />
                <polygon points={`${cx+30},${cy} ${cx+24},${cy-4} ${cx+24},${cy+4}`} fill="#0f172a" />
              </g>
            ) : n.slide.direction === 'down' ? (
              <g>
                <line x1={cx - 10} y1={cy} x2={cx - 30} y2={cy} stroke="#0f172a" strokeWidth={1.6} />
                <polygon points={`${cx-30},${cy} ${cx-24},${cy-4} ${cx-24},${cy+4}`} fill="#0f172a" />
              </g>
            ) : (
              <g>
                <line x1={cx + 10} y1={cy} x2={cx + 30} y2={cy} stroke="#0f172a" strokeWidth={1.6} />
                <polygon points={`${cx+30},${cy} ${cx+24},${cy-4} ${cx+24},${cy+4}`} fill="#0f172a" />
                <line x1={cx - 10} y1={cy} x2={cx - 30} y2={cy} stroke="#0f172a" strokeWidth={1.6} />
                <polygon points={`${cx-30},${cy} ${cx-24},${cy-4} ${cx-24},${cy+4}`} fill="#0f172a" />
              </g>
            )
          )}
          {bend && (
            <g>
              <line
                x1={cx}
                y1={bendY1}
                x2={cx}
                y2={bendY2}
                stroke="#1f2937"
                strokeWidth={1.6}
                strokeDasharray={bend.hasRelease ? '4 3' : undefined}
              />
              {bendUp ? (
                <>
                  <polygon points={`${cx-4},${bendY2} ${cx+4},${bendY2} ${cx},${bendY2-6}`} fill="#1f2937" />
                  {bendLabel && (
                    <text x={cx} y={bendY2 - 8} textAnchor="middle" fontSize={9} fill="#374151" fontWeight={600}>
                      {bendLabel}
                    </text>
                  )}
                </>
              ) : (
                <>
                  <polygon points={`${cx-4},${bendY2} ${cx+4},${bendY2} ${cx},${bendY2+6}`} fill="#1f2937" />
                  {bendLabel && (
                    <text x={cx} y={bendY2 + 14} textAnchor="middle" fontSize={9} fill="#374151" fontWeight={600}>
                      {bendLabel}
                    </text>
                  )}
                </>
              )}
              {/* Show release with a small opposite arrow from the tip */}
              {bend.hasRelease && (
                bendUp ? (
                  <>
                    <line x1={cx} y1={bendY2} x2={cx} y2={bendY2 + Math.min(16, bendLen)} stroke="#64748b" strokeWidth={1.2} strokeDasharray="3 3" />
                    <polygon points={`${cx-3},${bendY2 + Math.min(16, bendLen)} ${cx+3},${bendY2 + Math.min(16, bendLen)} ${cx},${bendY2 + Math.min(16, bendLen) + 5}`} fill="#64748b" />
                  </>
                ) : (
                  <>
                    <line x1={cx} y1={bendY2} x2={cx} y2={bendY2 - Math.min(16, bendLen)} stroke="#64748b" strokeWidth={1.2} strokeDasharray="3 3" />
                    <polygon points={`${cx-3},${bendY2 - Math.min(16, bendLen)} ${cx+3},${bendY2 - Math.min(16, bendLen)} ${cx},${bendY2 - Math.min(16, bendLen) - 5}`} fill="#64748b" />
                  </>
                )
              )}
            </g>
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
        {Array.from({ length: nStrings }, (_, i) => {
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
                  y2={topPadding + (nStrings - 1) * stringGap + 4}
                  stroke="#334155"
                  strokeWidth={4}
                />
              ) : (
                <line x1={x} y1={topPadding} x2={x} y2={topPadding + (nStrings - 1) * stringGap} stroke="#6b7280" strokeWidth={2} />
              )}
              <text x={x - cellWidth / 2} y={topPadding + fretNumberYOffset} textAnchor="middle" fontSize={10} fill="#374151">{f}</text>
            </g>
          );
        })}
        {/* Inlay markers */}
        {Array.from({ length: numFrets + 1 }, (_, f) => {
          if (!inlays.has(f)) return null;
          const x = leftPadding + (f - 0.5) * cellWidth;
          const midY = topPadding + ((nStrings - 1) * stringGap) / 2;
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
        {Array.from({ length: nStrings }, (_, row) => {
          const label = tuningHighToLow[row];
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
      {showTransport && (
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
      )}

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


