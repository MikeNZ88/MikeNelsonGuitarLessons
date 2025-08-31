'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type BarToRootMap = Record<number, string>; // barIndex -> root (e.g., 'A', 'Bb', 'C#')

export interface AnimatedFretboardGPProps {
  filePath: string;
  trackIndex?: number; // AlphaTab track index to follow
  fretCount?: number; // number of frets to display (from 0)
  useTabStringOrder?: boolean; // true => high E at bottom (TAB style)
  showIntervals?: boolean;
  labelMode?: 'intervals' | 'notes' | 'fingering' | 'gpOrNotes' | 'alternateBar';
  hideLabels?: boolean; // if true, render blank circles (no text)
  showChordNames?: boolean; // if true, show chord names next to active notes
  trackChordNames?: Record<number, boolean>; // per-track chord name visibility
  hideNotation?: boolean; // if true, hide the AlphaTab visual surface but keep audio/events
  showTransport?: boolean; // if false, hide play/stop/status UI
  useKeySignatureForNames?: boolean; // when showing note names, prefer flats/sharps based on key signature
  preferGpFingerings?: boolean; // when in fingering mode, prefer GP-provided fingerings
  showExtensionsAboveOctave?: boolean; // map 1->8, 2->9, 4->11, 6->13 when above octave
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
  // Scale overlay
  overlayEnabled?: boolean;
  overlayMode?: 'notes' | 'intervals' | 'blank';
  overlayRoot?: string; // e.g., 'A', 'Bb', 'C#'
  overlayScale?: 'major' | 'naturalMinor' | 'dorian' | 'mixolydian' | 'majorPentatonic' | 'minorPentatonic' | 'bluesMinor' | 'harmonicMinor' | 'melodicMinor' | 'custom';
  overlayCustomIntervals?: number[]; // semitones from root for custom overlays
  overlayName?: string; // optional display name for the overlay
  // Note footprint overlay
  footprintEnabled?: boolean;
  footprintMode?: 'notes' | 'intervals' | 'blank';
  footprintName?: string; // optional display name for footprint
  // GP text labels (e.g., "Shape 1")
  showTextLabels?: boolean;
  textLabelTrackIndex?: number; // defaults to selected track
  // Segmented overlays & fret-range controls
  overlayModeType?: 'global' | 'segments';
  overlaySegments?: Array<{
    startBar: number;
    endBar: number;
    name?: string;
    root: string;
    scale: 'major' | 'naturalMinor' | 'dorian' | 'mixolydian' | 'majorPentatonic' | 'minorPentatonic' | 'bluesMinor' | 'harmonicMinor' | 'melodicMinor' | 'custom';
    customIntervals?: number[];
    mode?: 'notes' | 'intervals' | 'blank';
    fretStart?: number;
    fretEnd?: number;
    diagramFretStart?: number;
    diagramFretEnd?: number;
    useSharp5?: boolean; // b6 vs #5 for this segment
    useSharp4?: boolean; // b5 vs #4 for this segment
  }>;
  diagramGlobalFretStart?: number;
  diagramGlobalFretEnd?: number;
  overlayGlobalFretStart?: number;
  overlayGlobalFretEnd?: number;
  // Interval color overlay (Scale Explorer palette)
  intervalColorEnabled?: boolean;
  // Chord overlay (independent of scale overlay)
  chordOverlayEnabled?: boolean;
  chordOverlayMode?: 'notes' | 'intervals' | 'blank';
  chordOverlayRoot?: string; // for intervals mode
  chordOverlayName?: string;
  chordOverlayNotesGlobal?: string[]; // e.g., ['A','C#','E','G']
  chordOverlayModeType?: 'global' | 'segments';
  chordOverlayGlobalFretStart?: number;
  chordOverlayGlobalFretEnd?: number;
  chordOverlaySegments?: Array<{
    startBar: number;
    endBar: number;
    name?: string;
    notes: string[];
    mode?: 'notes' | 'intervals' | 'blank';
    fretStart?: number;
    fretEnd?: number;
    diagramFretStart?: number;
    diagramFretEnd?: number;
    useSharp5?: boolean;
    useSharp4?: boolean;
  }>;
  // Note color overlay (per-bar, per-note pitch class)
  noteColorEnabled?: boolean;
  noteColorSegments?: Array<{
    startBar: number;
    endBar: number;
    notes: string[]; // e.g., ['A','C#']
    color: string;   // CSS color/hex
    target?: 'active' | 'overlay' | 'both';
  }>;
  // Enharmonic toggles
  useSharp5?: boolean; // b6 vs #5
  useSharp4?: boolean; // b5 vs #4
  // Overlay root highlight
  highlightOverlayRoot?: boolean;
  // Custom text overlays (user-defined)
  textOverlayEnabled?: boolean;
  textOverlaySegments?: Array<{
    startBar: number;
    endBar: number;
    text: string;
    dx?: number;
    dy?: number;
    fontSize?: number;
    anchor?: 'start' | 'middle' | 'end';
    vPos?: 'top' | 'middle' | 'bottom';
    imgW?: number;
    imgH?: number;
  }>;
}

interface ActiveNote {
  stringNumber: number; // 1..6 (AlphaTab numbering)
  fret: number; // 0..n
  gpFinger?: number; // 0..4 if present in GP
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

function normalizeNoteName(input: string): string {
  try {
    let t = (input || '').trim();
    if (!t) return '';
    // Normalize unicode accidentals
    t = t.replace(/♭/g, 'b').replace(/♯/g, '#');
    // Capitalize letter only, keep accidental case
    t = t.length > 1 ? t[0].toUpperCase() + t.slice(1) : t.toUpperCase();
    // Common enharmonic normalizations
    if (t === 'B#') return 'C';
    if (t === 'E#') return 'F';
    if (t === 'Cb') return 'B';
    if (t === 'Fb') return 'E';
    return t;
  } catch {
    return '';
  }
}

const SCALE_INTERVALS: Record<string, number[]> = {
  major: [0,2,4,5,7,9,11],
  naturalMinor: [0,2,3,5,7,8,10],
  dorian: [0,2,3,5,7,9,10],
  mixolydian: [0,2,4,5,7,9,10],
  majorPentatonic: [0,2,4,7,9],
  minorPentatonic: [0,3,5,7,10],
  bluesMinor: [0,3,5,6,7,10],
  harmonicMinor: [0,2,3,5,7,8,11],
  melodicMinor: [0,2,3,5,7,9,11],
};

// Interval color palette from Scale Explorer
const INTERVAL_COLOR_MAP: Record<string, string> = {
  // Stable
  '1': '#000000',
  'P1': '#FFFFFF',
  'P8': '#FFFFFF',
  '3': '#F4D03F',
  '5': '#5DADE2',
  // Mild tension
  '2': '#E67E22',
  'b2': '#D35400',
  '6': '#58D68D',
  'b6': '#85929E',
  // Strong tension
  '4': '#E74C3C',
  '7': '#C0392B',
  'b7': '#CD6155',
  'b3': '#8E44AD',
  // Extreme tension / enharmonics
  '#4': '#922B21',
  'b5': '#922B21',
  '#5': '#85929E',
  '#1': '#D35400',
  'bb7': '#58D68D',
  'b4': '#F4D03F',
  'bb4': '#F4D03F',
  '#7': '#FFF5E6',
  '#2': '#8E44AD',
  'bb3': '#E67E22',
  '#6': '#CD6155',
};

function getIntervalColorFromMap(interval: string): string | null {
  return INTERVAL_COLOR_MAP[interval] || null;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  try {
    const h = hex.replace('#','').trim();
    if (h.length === 3) {
      const r = parseInt(h[0] + h[0], 16);
      const g = parseInt(h[1] + h[1], 16);
      const b = parseInt(h[2] + h[2], 16);
      return { r, g, b };
    }
    if (h.length === 6) {
      const r = parseInt(h.slice(0,2), 16);
      const g = parseInt(h.slice(2,4), 16);
      const b = parseInt(h.slice(4,6), 16);
      return { r, g, b };
    }
  } catch {}
  return null;
}

function getContrastingTextColor(bgHex: string): string {
  const rgb = hexToRgb(bgHex);
  if (!rgb) return '#0f172a';
  // Relative luminance (sRGB)
  const srgb = [rgb.r/255, rgb.g/255, rgb.b/255].map(v => {
    return v <= 0.03928 ? v/12.92 : Math.pow((v+0.055)/1.055, 2.4);
  });
  const L = 0.2126 * (srgb[0] as number) + 0.7152 * (srgb[1] as number) + 0.0722 * (srgb[2] as number);
  return L > 0.6 ? '#0b1020' : '#ffffff';
}

function isLightColor(bgHex: string): boolean {
  const rgb = hexToRgb(bgHex);
  if (!rgb) return false;
  const srgb = [rgb.r/255, rgb.g/255, rgb.b/255].map(v => v <= 0.03928 ? v/12.92 : Math.pow((v+0.055)/1.055, 2.4));
  const L = 0.2126 * (srgb[0] as number) + 0.7152 * (srgb[1] as number) + 0.0722 * (srgb[2] as number);
  return L > 0.7;
}

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

function computeIntervalLabel(rootNote: string, noteIndex: number, style: 'flat' | 'sharp' | 'mixed' = 'flat', chordQuality: ChordQuality = 'unknown', useSharp5: boolean = false, useSharp4: boolean = false): string {
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
    case 6: return useSharp4 ? 'b5' : '#4';
    case 7: return '5';
    case 8: return useSharp5 ? 'b6' : '#5';
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
  labelMode,
  hideLabels = false,
  showChordNames = false,
  trackChordNames = {},
  hideNotation = false,
  showTransport = true,
  syncId = 'global',
  isSilent = false,
  loadOnlySelectedTrack = false,
  stepMode = false,
  onRegisterStepApi,
  useKeySignatureForNames = false,
  preferGpFingerings = true,
  showExtensionsAboveOctave = false,
  barToRoot,
  beatToRoot,
  initialTempoPercent = 100,
  accidentalStyle = 'flat',
  autoRootFromChordTrackIndex,
  onRootChange,
  onTracksDetected,
  onBarCountDetected,
  overlayEnabled = false,
  overlayMode = 'intervals',
  overlayRoot = 'A',
  overlayScale = 'minorPentatonic',
  overlayCustomIntervals,
  overlayName,
  showTextLabels = true,
  textLabelTrackIndex,
  overlayModeType = 'global',
  overlaySegments,
  diagramGlobalFretStart,
  diagramGlobalFretEnd,
  overlayGlobalFretStart,
  overlayGlobalFretEnd,
  intervalColorEnabled,
  chordOverlayEnabled = false,
  chordOverlayMode = 'intervals',
  chordOverlayRoot = 'A',
  chordOverlayName,
  chordOverlayNotesGlobal,
  chordOverlayModeType = 'global',
  chordOverlayGlobalFretStart,
  chordOverlayGlobalFretEnd,
  chordOverlaySegments,
  noteColorEnabled,
  noteColorSegments,
  footprintEnabled,
  footprintMode,
  footprintName,
  useSharp5,
  useSharp4,
  // Overlay root highlight
  highlightOverlayRoot,
  textOverlayEnabled,
  textOverlaySegments
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
  const fileBaseName = useMemo(() => {
    try {
      const parts = (filePath || '').split('/');
      return parts[parts.length - 1] || '';
    } catch { return ''; }
  }, [filePath]);
  const debugPrintCountRef = useRef<number>(0);
  const clearNotesTimerRef = useRef<number | null>(null);
  const stepBeatsRef = useRef<Array<{ bar: number; beat: number; tick: number }>>([]);
  const stepIndexRef = useRef<number>(0);
  const autoBarToRootRef = useRef<Record<number, string> | null>(null);
  const autoBarToQualityRef = useRef<Record<number, ChordQuality> | null>(null);
  const autoBarToChordNameRef = useRef<Record<number, string> | null>(null);
  const autoBarToTextLabelRef = useRef<Record<number, string> | null>(null);
  const [currentQuality, setCurrentQuality] = useState<ChordQuality>('unknown');
  const [currentChordName, setCurrentChordName] = useState<string>('');
  const [currentTextLabel, setCurrentTextLabel] = useState<string>('');
  const minRootAbsInBarRef = useRef<number | null>(null);
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

  // Sync listeners defined outside useEffect for cleanup access
  const onSyncTransport = useCallback((evt: any) => {
    try {
      if (evt?.detail?.id !== syncId) return;
      const shouldPlay = !!evt?.detail?.playing;
      if (shouldPlay) (apiRef.current as any)?.play?.();
      else (apiRef.current as any)?.pause?.();
    } catch {}
  }, [syncId]);

  const onSyncStop = useCallback((evt: any) => {
    try {
      if (evt?.detail?.id !== syncId) return;
      (apiRef.current as any)?.stop?.();
      setActiveNotes([]);
    } catch {}
  }, [syncId]);

  const onSyncSeek = useCallback(async (evt: any) => {
    try {
      if (evt?.detail?.id !== syncId) return;
      const apiAny = apiRef.current as any;
      if (!apiAny) return;
      const d = evt.detail || {};

      if (typeof d.bar === 'number') {
        // Stop current playback before seeking
        try { apiAny.stop?.(); } catch {}

        // Prefer seeking by tick at the start of the requested bar for reliable playback
        const bt = barFirstTickRef.current[d.bar];
        if (typeof bt === 'number' && apiAny?.seek) {
          apiAny.seek(Math.max(0, Math.floor(bt)));
        } else if (apiAny?.cursor?.moveTo) {
          apiAny.cursor.moveTo(d.bar, d.beat ?? 0);
        }

        if (d.autoplay) {
          try {
            const AC: any = (window as any).AudioContext || (window as any).webkitAudioContext;
            if (AC) {
              if (!(window as any)._sharedAudioCtx) (window as any)._sharedAudioCtx = new AC();
              if ((window as any)._sharedAudioCtx.state === 'suspended') await (window as any)._sharedAudioCtx.resume();
            }
            const internalCtx = apiAny?.audio?.context || apiAny?._audioContext;
            if (internalCtx && internalCtx.state === 'suspended') await internalCtx.resume();
          } catch {}
          try { apiAny.play?.(); } catch {}
        }
        return;
      }

      if (typeof d.tick === 'number') {
        const targetTick = Math.max(0, Math.floor(d.tick));
        // Try all known ways to reposition before playing
        try { apiAny.cursor?.moveTo?.(d.bar ?? 0, d.beat ?? 0); } catch {}
        try { apiAny.seekTick?.(targetTick); } catch {}
        try { apiAny.seek?.(targetTick); } catch {}
        if (d.autoplay) {
          try {
            const AC: any = (window as any).AudioContext || (window as any).webkitAudioContext;
            if (AC) {
              if (!(window as any)._sharedAudioCtx) (window as any)._sharedAudioCtx = new AC();
              if ((window as any)._sharedAudioCtx.state === 'suspended') await (window as any)._sharedAudioCtx.resume();
            }
            const internalCtx = apiAny?.audio?.context || apiAny?._audioContext;
            if (internalCtx && internalCtx.state === 'suspended') await internalCtx.resume();
          } catch {}
          try { apiAny.play?.(); } catch {}
        }
        return;
      }
      if (typeof d.percent === 'number') {
        const total = totalTicksRef.current || 0;
        if (total > 0 && apiAny.seek) {
          const tick = Math.max(0, Math.min(total, Math.floor(total * d.percent)));
          apiAny.seek(tick);
          if (d.autoplay) {
            try { apiAny.play?.(); } catch {}
          }
        }
      }
    } catch {}
  }, [syncId]);

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

        // Add event listeners for sync
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
                    const barStartCandidate = (bar?.masterBar?.startTick ?? bar?.masterBar?.start ?? tick) as number;
                    const firstTick = typeof barStartCandidate === 'number' ? barStartCandidate : tick;
                    if (!(barIdx in barTick)) barTick[barIdx] = firstTick;
                    else barTick[barIdx] = Math.min(barTick[barIdx], firstTick);
                  }
                }
              }
            }
            totalTicksRef.current = maxTick;
            barFirstTickRef.current = barTick;
          } catch {}
          // compute bar count for parent (use masterBars as a robust fallback)
          try {
            const tracks = score?.tracks || [];
            const tSel = tracks[trackIndex] || tracks[0];
            const barsA = tSel?.staves?.[0]?.bars || [];
            const masterBars = (score as any)?.masterBars || (score as any)?.bars || [];
            const countA = Array.isArray(barsA) ? barsA.length : 0;
            const countB = Array.isArray(masterBars) ? masterBars.length : 0;
            totalBarsRef.current = Math.max(countA, countB);
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
          autoBarToChordNameRef.current = null;
          autoBarToTextLabelRef.current = null;
          keySigPrefRef.current = {};
          if (typeof autoRootFromChordTrackIndex === 'number' && score?.tracks?.[autoRootFromChordTrackIndex]) {
            try {
              const chordTrack = score.tracks[autoRootFromChordTrackIndex];
              const staves = chordTrack?.staves || [];
              const bars = staves[0]?.bars || [];
              const map: Record<number, string> = {};
              const qmap: Record<number, ChordQuality> = {};
              const chordNameMap: Record<number, string> = {};
              const textMap: Record<number, string> = {};
              for (let b = 0; b < bars.length; b++) {
                const bar = bars[b];
                const voices = bar?.voices || [];
                for (const v of voices) {
                  const beats = v?.beats || [];
                  for (const beat of beats) {
                    const chord = beat?.chord || beat?.Chord || beat?.harmony || null;
                    // capture arbitrary text labels per bar (e.g., "Shape 1")
                    if (beat?.text && typeof beat.text === 'string' && !textMap[b]) {
                      const txt = beat.text.trim();
                      if (txt) textMap[b] = txt;
                    }
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
                        chordNameMap[b] = name.trim(); // Store full chord name
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
              // Forward-fill: make bars without explicit chords/text inherit the previous values
              try {
                const barCount = bars.length;
                for (let b = 1; b < barCount; b++) {
                  if (!map[b] && map[b - 1]) map[b] = map[b - 1];
                  if (!qmap[b] && qmap[b - 1]) qmap[b] = qmap[b - 1];
                  if (!chordNameMap[b] && chordNameMap[b - 1]) chordNameMap[b] = chordNameMap[b - 1];
                  if (!textMap[b] && textMap[b - 1]) textMap[b] = textMap[b - 1];
                }
              } catch {}

              if (Object.keys(map).length > 0) {
                autoBarToRootRef.current = map;
                autoBarToQualityRef.current = qmap;
                autoBarToChordNameRef.current = chordNameMap;
                autoBarToTextLabelRef.current = textMap;
                // eslint-disable-next-line no-console
                console.log('[AnimatedFretboardGP] auto roots from chord track', map, qmap, chordNameMap, textMap);
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
          // Re-emit bar count after render as a fallback
          try {
            const score = lastScoreRef.current;
            const tracks = score?.tracks || [];
            const tSel = tracks[trackIndex] || tracks[0];
            const barsA = tSel?.staves?.[0]?.bars || [];
            const masterBars = (score as any)?.masterBars || (score as any)?.bars || [];
            const countA = Array.isArray(barsA) ? barsA.length : 0;
            const countB = Array.isArray(masterBars) ? masterBars.length : 0;
            totalBarsRef.current = Math.max(countA, countB);
            if (typeof onBarCountDetected === 'function') onBarCountDetected(totalBarsRef.current);
          } catch {}
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
              const barIndex = beat?.voice?.bar?.index ?? beat?.bar?.index ?? currentBarIndex;
              setCurrentBarIndex(typeof barIndex === 'number' ? barIndex : 0);
              const beatIndex = typeof beat?.index === 'number' ? beat.index : currentBeatInBar;
              setCurrentBeatInBar(beatIndex);

              const bn = beat?.notes || [];
              const notes: ActiveNote[] = [];
              for (const n of bn) {
                const s = (typeof n?.string === 'number') ? n.string : (typeof n?.stringIndex === 'number' ? (n.stringIndex + 1) : undefined);
                const f = n?.fret;
                const gpFinger = extractLeftHandFinger(n);
                const bend = extractBendFromNote(n);
                const slide = extractSlideFromNote(n);
                const hp = extractHPFromNote(n);
                if (typeof s === 'number' && typeof f === 'number') notes.push({ stringNumber: s, fret: f, gpFinger, bend, slide, hp });
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
            if (autoBarToChordNameRef.current && typeof barIndex === 'number') {
              setCurrentChordName(autoBarToChordNameRef.current[barIndex] || '');
            }
            if (autoBarToTextLabelRef.current && typeof barIndex === 'number') {
              setCurrentTextLabel(autoBarToTextLabelRef.current[barIndex] || '');
            }
            if (typeof barIndex === 'number' && keySigPrefRef.current[barIndex]) {
              setCurrentKeyPref(keySigPrefRef.current[barIndex]);
            }
            // Update active notes directly for this beat
            const bn = beat?.notes || [];
            const notes: ActiveNote[] = [];
            // Recompute min root for current bar before mapping labels
            if (showExtensionsAboveOctave && typeof barIndex === 'number') {
              recomputeMinRootAbsForBar(barIndex);
            }
            // Track the lowest root absolute pitch for this bar when extensions are enabled
            if (showExtensionsAboveOctave) {
              try {
                if (bn.length > 0) {
                  const effRoot = getCurrentRoot() || chordOverlayRoot || overlayRoot || 'A';
                  const rootIdx = NOTE_TO_INDEX[effRoot] ?? 9;
                  for (const n of bn) {
                    const sTmp = (typeof n?.string === 'number') ? n.string : (typeof n?.stringIndex === 'number' ? n.stringIndex : undefined);
                    const fTmp = n?.fret;
                    if (typeof sTmp === 'number' && typeof fTmp === 'number') {
                      const idx = getNoteIndexForStringFretFrom(tuningHighToLow, sTmp, fTmp, numStrings);
                      if (idx === rootIdx) {
                        const abs = getAbsoluteRelativePitch(sTmp, fTmp);
                        if (minRootAbsInBarRef.current == null || abs < minRootAbsInBarRef.current) {
                          minRootAbsInBarRef.current = abs;
                        }
                      }
                    }
                  }
                }
              } catch {}
            }
            for (const n of bn) {
              const s = (typeof n?.string === 'number') ? n.string : (typeof n?.stringIndex === 'number' ? n.stringIndex : undefined);
              const f = n?.fret;
              const gpFinger = extractLeftHandFinger(n);
              const bend = extractBendFromNote(n);
              const slide = extractSlideFromNote(n);
              const hp = extractHPFromNote(n);
              if (typeof s === 'number' && typeof f === 'number') notes.push({ stringNumber: s, fret: f, gpFinger, bend, slide, hp });
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
                const gpFinger = extractLeftHandFinger(n);
                const bend = extractBendFromNote(n);
                const slide = extractSlideFromNote(n);
                const hp = extractHPFromNote(n);
                if (typeof s === 'number' && typeof f === 'number') {
                  notes.push({ stringNumber: s, fret: f, gpFinger, bend, slide, hp });
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
          setStatus(`Loaded: ${fileBaseName}`);
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

  // Compute an absolute-relative pitch number sufficient for ordering within a bar across strings
  function getAbsoluteRelativePitch(stringNumber: number, fret: number): number {
    // Ensure different strings are far apart so ordering is stable across strings
    // Higher stringNumber (closer to high E) should be higher pitch baseline
    const stringRank = (numStrings - stringNumber); // 0 for highest string row
    return stringRank * 100 + fret; // 1 unit per fret
  }

  function mapIntervalToExtensionIfAboveOctave(label: string, absPitch: number, minRootAbs: number | null): string {
    if (minRootAbs == null) return label;
    if (absPitch < (minRootAbs + 12)) return label;
    // Above (or at) an octave from the lowest root in this bar
    // Root
    if (label === '1') return '8';
    // 2-family -> 9
    if (label.endsWith('2')) return label.replace('2', '9'); // keeps b/#
    // 4-family -> 11
    if (label.includes('4')) return label.replace('4', '11');
    // 6-family -> 13
    if (label.includes('6')) return label.replace('6', '13');
    return label;
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

  function extractLeftHandFinger(n: any): number | undefined {
    try {
      const f = n?.leftHandFinger ?? n?.finger ?? n?.fingering?.left ?? n?.fingering?.leftHand ?? n?.fingering?.leftHandFinger;
      if (typeof f === 'number') {
        // AlphaTab/GP often use -1 for "no finger". Treat only 1..4 as valid for fingering labels.
        if (f >= 1 && f <= 4) return f;
        return undefined;
      }
      if (typeof f === 'string') {
        const t = f.trim();
        const num = parseInt(t, 10);
        if (!isNaN(num) && num >= 1 && num <= 4) return num;
      }
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

  // Heuristic fingering: anchor on minimum fret across the active chord; map frets to 1..4
  function heuristicFingerFor(active: ActiveNote[], current: ActiveNote): number {
    try {
      if (!active || active.length === 0) return current.fret === 0 ? 0 : Math.min(4, Math.max(1, current.fret));
      const frets = active.map(a => a.fret).filter(f => typeof f === 'number');
      const minFret = Math.min(...frets);
      const span = Math.max(...frets) - minFret;
      const pos = Math.max(1, minFret);
      if (current.fret === 0) return 0;
      // compress to 4-fret box from pos..pos+3
      const rel = current.fret - pos;
      if (rel <= 0) return 1;
      if (rel === 1) return 2;
      if (rel === 2) return 3;
      if (rel >= 3) return 4;
      return Math.min(4, Math.max(1, rel + 1));
    } catch {
      return current.fret === 0 ? 0 : 1;
    }
  }

  function recomputeMinRootAbsForBar(barIdx: number): void {
    if (!showExtensionsAboveOctave) { minRootAbsInBarRef.current = null; return; }
    try {
      const score = lastScoreRef.current;
      const tracks = score?.tracks || [];
      const tSel = tracks[trackIndex] || tracks[0];
      const bars = tSel?.staves?.[0]?.bars || [];
      const bar = bars?.[barIdx];
      if (!bar) { minRootAbsInBarRef.current = null; return; }
      const effRoot = getCurrentRoot() || chordOverlayRoot || overlayRoot || 'A';
      const rootIdx = NOTE_TO_INDEX[effRoot] ?? 9;
      let minAbs: number | null = null;
      const voices = bar?.voices || [];
      for (const v of voices) {
        const beats = v?.beats || [];
        for (const b of beats) {
          const bn = b?.notes || [];
          for (const n of bn) {
            const s = (typeof n?.string === 'number') ? n.string : (typeof n?.stringIndex === 'number' ? n.stringIndex : undefined);
            const f = n?.fret;
            if (typeof s === 'number' && typeof f === 'number') {
              const idx = getNoteIndexForStringFretFrom(tuningHighToLow, s, f, numStrings);
              if (idx === rootIdx) {
                const abs = getAbsoluteRelativePitch(s, f);
                if (minAbs == null || abs < minAbs) minAbs = abs;
              }
            }
          }
        }
      }
      minRootAbsInBarRef.current = minAbs;
    } catch { minRootAbsInBarRef.current = null; }
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
    // Determine visible fret window for diagram (clips full fretboard display)
    let visibleStartFret = 0;
    let visibleEndFret = numFrets; // inclusive end for frets rendering
    try {
      // Diagram range is independent of overlay scale range
      if (overlayModeType === 'segments' && Array.isArray(overlaySegments) && overlaySegments.length > 0) {
        const seg = overlaySegments.find(sg => currentBarIndex >= sg.startBar && currentBarIndex <= sg.endBar);
        if (seg) {
          // Segment diagram range completely overrides global diagram range
          if (typeof seg.diagramFretStart === 'number') visibleStartFret = Math.max(0, seg.diagramFretStart);
          if (typeof seg.diagramFretEnd === 'number') visibleEndFret = Math.max(visibleStartFret, seg.diagramFretEnd);
        } else {
          // No active segment, use global diagram range
          if (typeof diagramGlobalFretStart === 'number') visibleStartFret = Math.max(0, Math.min(numFrets, diagramGlobalFretStart));
          if (typeof diagramGlobalFretEnd === 'number') visibleEndFret = Math.max(visibleStartFret, Math.min(numFrets, diagramGlobalFretEnd));
        }
      } else {
        // Global mode, use global diagram range
        if (typeof diagramGlobalFretStart === 'number') visibleStartFret = Math.max(0, Math.min(numFrets, diagramGlobalFretStart));
        if (typeof diagramGlobalFretEnd === 'number') visibleEndFret = Math.max(visibleStartFret, Math.min(numFrets, diagramGlobalFretEnd));
      }
    } catch {}
    const visibleFretSpan = Math.max(1, (visibleEndFret - visibleStartFret));
    // When the diagram starts above fret 0, the rightmost note centers are at +0.5 cell from the last fret line.
    // Extend the width (and strings) by half a cell in that case to avoid clipping the last fret's circles.
    const extraCellsOnRight = visibleStartFret > 0 ? 0.5 : 0;
    const width = leftPadding + (visibleFretSpan + extraCellsOnRight) * cellWidth + 16;
    const height = topPadding + (nStrings - 1) * stringGap + 16;

    // Enforce standard orientation: top = high E (row 0), bottom = low E (row 5)
    // Translate AlphaTab string numbering if needed
    const stringNumberToRow = (alphaTabStringNumber: number) => mapAlphaTabStringToHighOrder(alphaTabStringNumber, nStrings) - 1;

    const circles = activeNotes.map((n, idx) => {
      const row = stringNumberToRow(n.stringNumber);
      if (row < 0 || row > (nStrings - 1)) return null;
      if (typeof n.fret !== 'number') return null;
      // clip to visible fret window
      if (n.fret < visibleStartFret || n.fret > visibleEndFret) return null;
      const localCenter = (visibleStartFret === 0)
        ? (n.fret === 0 ? -0.5 : (n.fret - 0.5))
        : ((n.fret - visibleStartFret) + 0.5);
      const cx = leftPadding + (localCenter * cellWidth);
      const cy = topPadding + row * stringGap;
      const noteIndex = getNoteIndexForStringFretFrom(tuningHighToLow, n.stringNumber, n.fret, nStrings);
      let label: string = '';
      if (!hideLabels) {
        const useMode = labelMode || (showIntervals ? 'intervals' : 'notes');
        if (useMode === 'intervals' || (useMode === 'alternateBar' && (currentBarIndex % 2 === 1))) {
          // Fallback root selection if auto root is unavailable
          const effectiveRoot = currentRoot || chordOverlayRoot || overlayRoot || 'A';
          label = computeIntervalLabel(effectiveRoot, noteIndex, accidentalStyle, currentQuality, useSharp5, useSharp4);
          if (showExtensionsAboveOctave) {
            try {
              const abs = getAbsoluteRelativePitch(n.stringNumber, n.fret);
              label = mapIntervalToExtensionIfAboveOctave(label, abs, minRootAbsInBarRef.current);
            } catch {}
          }
        } else if (useMode === 'notes' || (useMode === 'alternateBar' && (currentBarIndex % 2 === 0))) {
          // Note names: choose flats/sharps by key signature if enabled
          if (useKeySignatureForNames) {
            label = (currentKeyPref === 'flat' ? NOTE_NAMES_FLAT : NOTE_NAMES_SHARP)[noteIndex];
          } else {
            label = (accidentalStyle === 'flat' ? NOTE_NAMES_FLAT : NOTE_NAMES_SHARP)[noteIndex];
          }
        } else if (useMode === 'fingering') {
          const gp = preferGpFingerings ? (typeof (n as any).gpFinger === 'number' ? (n as any).gpFinger : n.gpFinger) : undefined;
          if (typeof gp === 'number') label = String(gp);
          else label = '';
        } else if (useMode === 'gpOrNotes') {
          const gp = typeof (n as any).gpFinger === 'number' ? (n as any).gpFinger : n.gpFinger;
          if (typeof gp === 'number') {
            label = String(gp);
          } else {
            if (useKeySignatureForNames) label = (currentKeyPref === 'flat' ? NOTE_NAMES_FLAT : NOTE_NAMES_SHARP)[noteIndex];
            else label = (accidentalStyle === 'flat' ? NOTE_NAMES_FLAT : NOTE_NAMES_SHARP)[noteIndex];
          }
        }
      }
      // Interval color for active notes (independent of overlay), gated by toggle
      let intervalActiveFill: string | null = null;
      if (intervalColorEnabled) {
        try {
          const effRoot = currentRoot || chordOverlayRoot || overlayRoot || 'A';
          const intervalLabel = computeIntervalLabel(effRoot, noteIndex, accidentalStyle, currentQuality, useSharp5, useSharp4);
          let c = getIntervalColorFromMap(intervalLabel || '');
          if (intervalLabel === '3') c = '#E3B917';
          if (c) intervalActiveFill = c;
        } catch {}
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
      // Per-note color segments (active notes)
      let fillOverride: string | null = null;
      try {
        if (noteColorEnabled && Array.isArray(noteColorSegments) && noteColorSegments.length > 0) {
          const noteIdxPc = noteIndex; // already 0..11
          for (const seg of noteColorSegments) {
            if (currentBarIndex >= seg.startBar && currentBarIndex <= seg.endBar) {
              const match = (seg.notes || []).some(nn => NOTE_TO_INDEX[normalizeNoteName(nn)] === noteIdxPc);
              const targetsActive = (seg.target || 'both') === 'active' || (seg.target || 'both') === 'both';
              if (match && targetsActive && typeof seg.color === 'string' && seg.color) {
                fillOverride = seg.color;
                break;
              }
            }
          }
        }
      } catch {}
      return (
        <g key={`note-${idx}`}>
          {(() => {
            const fill = fillOverride || (intervalColorEnabled ? intervalActiveFill : null) || "#d97706";
            const stroke = intervalColorEnabled ? (intervalActiveFill && isLightColor(intervalActiveFill) ? "#0b1020" : "#0f172a") : "#fbbf24";
            const textFill = intervalColorEnabled && intervalActiveFill ? getContrastingTextColor(intervalActiveFill) : '#ffffff';
            return (
              <>
                <circle cx={cx} cy={cy} r={9} fill={fill} stroke={stroke} strokeWidth={2} />
                {label && (
                  <text x={cx} y={cy + 3} textAnchor="middle" fontSize={10} fill={textFill} fontWeight={700}>
                    {label}
                  </text>
                )}
              </>
            );
          })()}
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

    // Scale overlay computation
    const overlayElements: React.ReactElement[] = [];
    let overlayNamePosition: { x: number; y: number; anchor: 'start' | 'end'; text: string } | null = null;
    if (overlayEnabled) {
      // Determine active overlay config (global vs segments)
      let activeRoot = overlayRoot;
      let activeScale = overlayScale;
      let activeCustom = overlayCustomIntervals;
      let activeMode = overlayMode;
      let fretStart = overlayGlobalFretStart ?? 0;
      let fretEnd = overlayGlobalFretEnd ?? numFrets;
      let activeName = overlayName || '';
      // Default to global enharmonic toggles
      let segmentUseSharp5 = useSharp5;
      let segmentUseSharp4 = useSharp4;

      if (overlayModeType === 'segments' && Array.isArray(overlaySegments) && overlaySegments.length > 0) {
        const seg = overlaySegments.find(sg => currentBarIndex >= sg.startBar && currentBarIndex <= sg.endBar);
        if (seg) {
          activeRoot = seg.root || activeRoot;
          activeScale = seg.scale || activeScale;
          activeCustom = seg.customIntervals || activeCustom;
          activeMode = seg.mode || activeMode;
          fretStart = typeof seg.fretStart === 'number' ? seg.fretStart : fretStart;
          fretEnd = typeof seg.fretEnd === 'number' ? seg.fretEnd : fretEnd;
          activeName = seg.name || activeName;
          // Use segment-specific enharmonic toggles if available, otherwise fall back to global
          segmentUseSharp5 = typeof seg.useSharp5 === 'boolean' ? seg.useSharp5 : useSharp5;
          segmentUseSharp4 = typeof seg.useSharp4 === 'boolean' ? seg.useSharp4 : useSharp4;
        }
      }

      const rootIdx = NOTE_TO_INDEX[activeRoot] ?? 9; // default A
      const allowed: number[] = (activeScale === 'custom' ? (activeCustom || [0,3,5,7,10]) : SCALE_INTERVALS[activeScale] || SCALE_INTERVALS.minorPentatonic).map(i => ((i % 12) + 12) % 12);
      for (let s = 1; s <= nStrings; s++) {
        const row = stringNumberToRow(s);
        const cy = topPadding + row * stringGap;
        for (let f = Math.max(0, fretStart); f <= Math.min(numFrets, fretEnd); f++) {
          let cx: number;
          if (visibleStartFret === 0) {
            cx = leftPadding + ((f === 0 ? -0.5 : (f - 0.5)) * cellWidth);
          } else {
            cx = leftPadding + (((f - visibleStartFret) + 0.5) * cellWidth);
          }
          const noteIdx = getNoteIndexForStringFretFrom(tuningHighToLow, s, f, nStrings);
          const interval = (noteIdx - rootIdx + 12) % 12;
          if (allowed.includes(interval)) {
            const radius = 7;
            // Per-note color segments (overlay dots)
            let overlayFill: string | null = null;
            try {
              if (noteColorEnabled && Array.isArray(noteColorSegments) && noteColorSegments.length > 0) {
                const noteIdxPc = noteIdx;
                for (const seg of noteColorSegments) {
                  if (currentBarIndex >= seg.startBar && currentBarIndex <= seg.endBar) {
                    const match = (seg.notes || []).some(nn => NOTE_TO_INDEX[normalizeNoteName(nn)] === noteIdxPc);
                    const targetsOverlay = (seg.target || 'both') === 'overlay' || (seg.target || 'both') === 'both';
                    if (match && targetsOverlay && typeof seg.color === 'string' && seg.color) {
                      overlayFill = seg.color;
                      break;
                    }
                  }
                }
              }
            } catch {}
            let text = '';
            if (activeMode === 'intervals') {
              // Fallback to activeRoot or overlay root if no current auto root
              const eff = activeRoot || overlayRoot || 'A';
              text = computeIntervalLabel(eff, noteIdx, accidentalStyle, 'unknown', segmentUseSharp5, segmentUseSharp4);
              if (showExtensionsAboveOctave) {
                try {
                  const abs = getAbsoluteRelativePitch(s, f);
                  text = mapIntervalToExtensionIfAboveOctave(text, abs, minRootAbsInBarRef.current);
                } catch {}
              }
            } else if (activeMode === 'notes') {
              text = (accidentalStyle === 'flat' ? NOTE_NAMES_FLAT : NOTE_NAMES_SHARP)[noteIdx];
            }
            const isRoot = interval === 0;
            overlayElements.push(
              <g key={`ov-${s}-${f}`}>
                {/* Check if this note is currently active */}
                {(() => {
                  const isActive = activeNotes.some(n => 
                    stringNumberToRow(n.stringNumber) === row && n.fret === f
                  );
                  // Apply interval color if enabled and in intervals mode
                  let intervalFill: string | null = null;
                  if (intervalColorEnabled && activeMode !== 'blank') {
                    const effRoot = activeRoot || overlayRoot || 'A';
                    const intervalLabel = computeIntervalLabel(effRoot, noteIdx, accidentalStyle, 'unknown', segmentUseSharp5, segmentUseSharp4);
                    const c = getIntervalColorFromMap(intervalLabel || '');
                    if (c) intervalFill = c;
                  }
                  const fillColorBase = intervalFill || (isActive ? (isRoot && highlightOverlayRoot ? "#ef4444" : "#fbbf24") : (isRoot && highlightOverlayRoot ? "#ef4444" : "white"));
                  const fillColor = overlayFill || fillColorBase;
                  const strokeColor = intervalColorEnabled ? (intervalFill && isLightColor(intervalFill) ? "#0b1020" : "#0f172a") : (isRoot && highlightOverlayRoot ? "#991b1b" : "#d97706");
                  const textColor = intervalFill ? getContrastingTextColor(intervalFill) : (isActive ? (isRoot && highlightOverlayRoot ? "#fee2e2" : "#7c2d12") : (isRoot && highlightOverlayRoot ? "#fee2e2" : "#92400e"));
                  return (
                    <>
                      <circle cx={cx} cy={cy} r={radius} fill={fillColor} opacity={0.95} stroke={strokeColor} strokeWidth={2} />
                      {activeMode !== 'blank' && (
                        <text x={cx} y={cy + 3} textAnchor="middle" fontSize={9} fill={textColor} fontWeight={700}>{text}</text>
                      )}
                    </>
                  );
                })()}
              </g>
            );
          }
        }
      }
      // Overlay name positioned OUTSIDE the active fret range, left or right depending on available space
      if (activeName) {
        // Calculate the actual scale overlay range (not the diagram range)
        const scaleStart = Math.max(0, fretStart);
        const scaleEnd = Math.min(numFrets, fretEnd);
        
        const xFretLine = (f: number) => leftPadding + ((f - visibleStartFret) * cellWidth);
        let anchor: 'start' | 'end' = 'start';
        let cxName: number;
        
        // If scale uses frets 9 or above, place name to the left; otherwise to the right
        if (scaleStart >= 9) {
          // Place to the left of the scale overlay
          anchor = 'end';
          cxName = xFretLine(scaleStart) - cellWidth; // exactly one fret distance to the left
        } else {
          // Place to the right of the scale overlay
          anchor = 'start';
          cxName = xFretLine(scaleEnd) + cellWidth; // exactly one fret distance to the right
        }
        
        // Clamp within SVG bounds
        const minX = leftPadding - 8;
        const maxX = leftPadding + (visibleFretSpan * cellWidth) + 8;
        cxName = Math.max(minX, Math.min(maxX, cxName));
        const cyName = topPadding + ((nStrings - 1) * stringGap) / 2;
        // Store name position for separate rendering (outside the overlay elements group)
        overlayNamePosition = { x: cxName, y: cyName, anchor, text: activeName };
      }
    }

    // Chord overlay computation (independent layer)
    const chordOverlayElements: React.ReactElement[] = [];
    let chordOverlayNamePosition: { x: number; y: number; anchor: 'start' | 'end'; text: string } | null = null;
    if (chordOverlayEnabled) {
      let activeNotes: string[] = (chordOverlayNotesGlobal || []).slice();
      let mode = chordOverlayMode;
      let fretStart = chordOverlayGlobalFretStart ?? 0;
      let fretEnd = chordOverlayGlobalFretEnd ?? numFrets;
      let name = chordOverlayName || '';
      let segUseSharp5 = useSharp5;
      let segUseSharp4 = useSharp4;
      let chordVisibleStart = typeof diagramGlobalFretStart === 'number' ? Math.max(0, Math.min(numFrets, diagramGlobalFretStart)) : visibleStartFret;
      let chordVisibleEnd = typeof diagramGlobalFretEnd === 'number' ? Math.max(chordVisibleStart, Math.min(numFrets, diagramGlobalFretEnd)) : visibleEndFret;
      if (chordOverlayModeType === 'segments' && Array.isArray(chordOverlaySegments) && chordOverlaySegments.length > 0) {
        const seg = chordOverlaySegments.find(sg => currentBarIndex >= sg.startBar && currentBarIndex <= sg.endBar);
        if (seg) {
          activeNotes = Array.isArray(seg.notes) ? seg.notes.slice() : activeNotes;
          mode = seg.mode || mode;
          fretStart = typeof seg.fretStart === 'number' ? seg.fretStart : fretStart;
          fretEnd = typeof seg.fretEnd === 'number' ? seg.fretEnd : fretEnd;
          name = seg.name || name;
          segUseSharp5 = typeof seg.useSharp5 === 'boolean' ? seg.useSharp5 : segUseSharp5;
          segUseSharp4 = typeof seg.useSharp4 === 'boolean' ? seg.useSharp4 : segUseSharp4;
          // Segment can override diagram window for chord overlay too (local to overlay)
          if (typeof seg.diagramFretStart === 'number') chordVisibleStart = Math.max(0, Math.min(numFrets, seg.diagramFretStart));
          if (typeof seg.diagramFretEnd === 'number') chordVisibleEnd = Math.max(chordVisibleStart, Math.min(numFrets, seg.diagramFretEnd));
        }
      }
      // Convert active note names to semitone indices
      const activeIdx = activeNotes
        .map(n => NOTE_TO_INDEX[(n || '').toUpperCase().replace('B#','C').replace('E#','F')])
        .filter(v => typeof v === 'number') as number[];
      const chordRootIdx = NOTE_TO_INDEX[chordOverlayRoot] ?? 9;
      for (let s = 1; s <= nStrings; s++) {
        const row = stringNumberToRow(s);
        const cy = topPadding + row * stringGap;
        for (let f = Math.max(0, fretStart); f <= Math.min(numFrets, fretEnd); f++) {
          let cx: number;
          if (chordVisibleStart === 0) {
            cx = leftPadding + ((f === 0 ? -0.5 : (f - 0.5)) * cellWidth);
          } else {
            cx = leftPadding + (((f - chordVisibleStart) + 0.5) * cellWidth);
          }
          const noteIdx = getNoteIndexForStringFretFrom(tuningHighToLow, s, f, nStrings);
          if (activeIdx.includes(noteIdx)) {
            const radius = 7;
            let text = '';
            if (mode === 'intervals') {
              text = computeIntervalLabel(chordOverlayRoot, noteIdx, accidentalStyle, 'unknown', segUseSharp5, segUseSharp4);
            } else if (mode === 'notes') {
              text = (accidentalStyle === 'flat' ? NOTE_NAMES_FLAT : NOTE_NAMES_SHARP)[noteIdx];
            }
            const isRoot = noteIdx === chordRootIdx;
            chordOverlayElements.push(
              <g key={`cov-${s}-${f}`}>
                {(() => {
                  // Apply Scale Explorer interval palette to chord overlay if enabled
                  let baseFill = isRoot ? '#ef4444' : 'white';
                  let baseStroke = isRoot ? '#991b1b' : '#d97706';
                  if (intervalColorEnabled) {
                    const c = getIntervalColorFromMap(text || '');
                    if (c) {
                      baseFill = c;
                      baseStroke = '#d97706';
                    }
                  }
                  return <circle cx={cx} cy={cy} r={radius} fill={baseFill} opacity={0.9} stroke={baseStroke} strokeWidth={2} />;
                })()}
                {mode !== 'blank' && (
                  <text x={cx} y={cy + 3} textAnchor="middle" fontSize={9} fill={isRoot ? '#fee2e2' : '#92400e'} fontWeight={700}>{text}</text>
                )}
              </g>
            );
          }
        }
      }
      if (name) {
        // Place chord overlay name similar to scale overlay
        const xFretLine = (f: number) => leftPadding + ((f - chordVisibleStart) * cellWidth);
        const start = Math.max(0, fretStart);
        const end = Math.min(numFrets, fretEnd);
        let anchor: 'start' | 'end' = 'start';
        let cxName: number;
        if (start >= 9) {
          anchor = 'end';
          cxName = xFretLine(start) - cellWidth;
        } else {
          anchor = 'start';
          cxName = xFretLine(end) + cellWidth;
        }
        const minX = leftPadding - 8;
        const maxX = leftPadding + (visibleFretSpan * cellWidth) + 8;
        cxName = Math.max(minX, Math.min(maxX, cxName));
        const cyName = topPadding + ((nStrings - 1) * stringGap) / 2 + 22;
        chordOverlayNamePosition = { x: cxName, y: cyName, anchor, text: name };
      }
    }
    // Note footprint overlay computation
    const footprintElements: React.ReactElement[] = [];
    let footprintNamePosition: { x: number; y: number; anchor: 'start' | 'end'; text: string } | null = null;
    if (footprintEnabled) {
      try {
        // Show notes from the current bar as footprints (visual memory of what was played)
        const score = lastScoreRef.current;
        if (score?.tracks?.[trackIndex]) {
          const track = score.tracks[trackIndex];
          const staves = track?.staves || [];
          const bars = staves[0]?.bars || [];
          
          if (currentBarIndex < bars.length) {
            const currentBar = bars[currentBarIndex];
            const voices = currentBar?.voices || [];
            for (const v of voices) {
              const beats = v?.beats || [];
              for (const b of beats) {
                const bn = b?.notes || [];
                for (const n of bn) {
                  const s = (typeof n?.string === 'number') ? n.string : (typeof n?.stringIndex === 'number' ? (n.stringIndex + 1) : undefined);
                  const f = n?.fret;
                  if (typeof s === 'number' && typeof f === 'number') {
                    const noteIdx = getNoteIndexForStringFretFrom(tuningHighToLow, s, f, nStrings);
                    
                    const row = stringNumberToRow(s);
                    if (row < 0 || row > (nStrings - 1)) continue;
                    
                    // Only show notes within the visible diagram range
                    if (f < visibleStartFret || f > visibleEndFret) continue;
                    
                    let cx: number;
                    if (visibleStartFret === 0) {
                      cx = leftPadding + ((f === 0 ? -0.5 : (f - 0.5)) * cellWidth);
                    } else {
                      cx = leftPadding + (((f - visibleStartFret) + 0.5) * cellWidth);
                    }
                    const cy = topPadding + row * stringGap;
                    
                    const radius = 8;
                    let text = '';
                    // Apply Note Color Overlay to footprint when targeted at overlay/both
                    let footprintFill: string | null = null;
                    try {
                      if (noteColorEnabled && Array.isArray(noteColorSegments) && noteColorSegments.length > 0) {
                        const noteIdxPc = noteIdx;
                        for (const seg of noteColorSegments) {
                          if (currentBarIndex >= seg.startBar && currentBarIndex <= seg.endBar) {
                            const match = (seg.notes || []).some(nn => NOTE_TO_INDEX[normalizeNoteName(nn)] === noteIdxPc);
                            const targetsOverlay = (seg.target || 'both') === 'overlay' || (seg.target || 'both') === 'both';
                            if (match && targetsOverlay && typeof seg.color === 'string' && seg.color) {
                              footprintFill = seg.color;
                              break;
                            }
                          }
                        }
                      }
                    } catch {}
                    // Interval palette color for footprint (when Scale Explorer palette is enabled)
                    let footprintIntervalFill: string | null = null;
                    if (intervalColorEnabled) {
                      try {
                        const eff = getCurrentRoot() || chordOverlayRoot || overlayRoot || 'A';
                        const ival = computeIntervalLabel(eff, noteIdx, accidentalStyle, 'unknown', useSharp5, useSharp4);
                        let c = getIntervalColorFromMap(ival || '');
                        if (ival === '3') c = '#E3B917';
                        if (c) footprintIntervalFill = c;
                      } catch {}
                    }
                    if (footprintMode !== 'blank') {
                      if (labelMode === 'alternateBar') {
                        const useNotes = (currentBarIndex % 2 === 0);
                        if (useNotes) {
                          const pref = keySigPrefRef.current?.[currentBarIndex] || currentKeyPref;
                          text = (pref === 'flat' ? NOTE_NAMES_FLAT : NOTE_NAMES_SHARP)[noteIdx];
                        } else {
                          const eff = getCurrentRoot() || chordOverlayRoot || overlayRoot || 'A';
                          text = computeIntervalLabel(eff, noteIdx, accidentalStyle, 'unknown', useSharp5, useSharp4);
                        }
                      } else if (footprintMode === 'intervals') {
                        // Use same fallback logic as active notes so intervals never go blank
                        const eff = getCurrentRoot() || chordOverlayRoot || overlayRoot || 'A';
                        text = computeIntervalLabel(eff, noteIdx, accidentalStyle, 'unknown', useSharp5, useSharp4);
                      } else if (footprintMode === 'notes') {
                        // Prefer key signature from the GP file (per-bar) when choosing flats vs sharps
                        const pref = keySigPrefRef.current?.[currentBarIndex] || currentKeyPref;
                        text = (pref === 'flat' ? NOTE_NAMES_FLAT : NOTE_NAMES_SHARP)[noteIdx];
                      }
                    }
                    
                    // Always render the footprint - let the main note system handle active notes
                    footprintElements.push(
                      <g key={`footprint-${s}-${f}`}>
                        {(() => {
                          const fill = footprintFill || footprintIntervalFill || 'white';
                          const stroke = (intervalColorEnabled && footprintIntervalFill) ? (isLightColor(footprintIntervalFill) ? '#0b1020' : '#0f172a') : '#d97706';
                          const textColor = (intervalColorEnabled && footprintIntervalFill) ? getContrastingTextColor(footprintIntervalFill) : '#92400e';
                          return (
                            <>
                              <circle cx={cx} cy={cy} r={radius} fill={fill} opacity={0.95} stroke={stroke} strokeWidth={2} />
                              {footprintMode !== 'blank' && (
                                <text x={cx} y={cy + 3} textAnchor="middle" fontSize={9} fill={textColor} fontWeight={700}>{text}</text>
                              )}
                            </>
                          );
                        })()}
                      </g>
                    );
                  }
                }
              }
            }
          }
          
          // Footprint name positioning
          if (footprintName) {
            const xFretLine = (f: number) => leftPadding + ((f - visibleStartFret) * cellWidth);
            let anchor: 'start' | 'end' = 'start';
            let cxName: number;
            
            // Position to the right by default, or left if no room
            const rightPosition = leftPadding + (visibleFretSpan * cellWidth) + cellWidth;
            const hasRoomOnRight = rightPosition <= (leftPadding + (visibleFretSpan * cellWidth) + 8);
            
            if (hasRoomOnRight) {
              anchor = 'start';
              cxName = rightPosition;
            } else {
              anchor = 'end';
              cxName = leftPadding - cellWidth;
            }
            
            // Clamp within SVG bounds
            const minX = leftPadding - 8;
            const maxX = leftPadding + (visibleFretSpan * cellWidth) + 8;
            cxName = Math.max(minX, Math.min(maxX, cxName));
            const cyName = topPadding + ((nStrings - 1) * stringGap) / 2;
            footprintNamePosition = { x: cxName, y: cyName, anchor, text: footprintName };
          }
        }
      } catch (err) {
        console.warn('[AnimatedFretboardGP] Footprint overlay failed:', err);
      }
    }

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
              x2={leftPadding + (visibleFretSpan + extraCellsOnRight) * cellWidth}
              y2={y}
              stroke="#475569"
              strokeWidth={w}
              strokeLinecap="round"
              opacity="0.98"
            />
          );
        })}
        {/* Frets (high contrast) */}
        {Array.from({ length: (visibleEndFret - visibleStartFret) + 1 }, (_, idx) => {
          const f = visibleStartFret + idx;
          const x = leftPadding + (idx * cellWidth);
          return (
            <g key={`fret-${f}`}>
              {f === 0 && visibleStartFret === 0 ? (
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
              {(() => {
                // For diagrams starting at 0, place labels centered in the space immediately to the right of the fret line
                // i.e., for f=1 it's between 0 and 1 (x - cellWidth/2).
                // For non-zero starts, center in the visible space (idx + 0.5)
                const labelX = (visibleStartFret === 0)
                  ? (x - cellWidth / 2)
                  : (leftPadding + ((f - visibleStartFret) + 0.5) * cellWidth);
                return (
                  <text x={labelX} y={topPadding + fretNumberYOffset} textAnchor="middle" fontSize={10} fill="#374151">{f}</text>
                );
              })()}
            </g>
          );
        })}
        {/* Inlay markers */}
        {Array.from({ length: (visibleEndFret - visibleStartFret) + 1 }, (_, idx) => {
          const f = visibleStartFret + idx;
          if (!inlays.has(f)) return null;
          // Inlays sit centered between fret lines f and f+1
          const x = leftPadding + (idx + 0.5) * cellWidth;
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

        {/* Render footprints UNDER overlays and active notes */}
        <g filter="url(#noteGlow)">{footprintElements}</g>

        <g filter="url(#noteGlow)">{overlayElements}</g>
        <g filter="url(#noteGlow)">{chordOverlayElements}</g>
        <g filter="url(#noteGlow)">{circles}</g>
        
        {/* Scale overlay name - rendered separately without glow filter */}
        {overlayNamePosition && (
          <text 
            key="ov-name" 
            x={overlayNamePosition.x} 
            y={overlayNamePosition.y} 
            textAnchor={overlayNamePosition.anchor} 
            fontSize={16} 
            fontWeight={700} 
            fill="#92400e" 
            style={{ filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.4))' }}
          >
            {overlayNamePosition.text}
          </text>
        )}
        {/* Chord overlay name - rendered separately without glow filter */}
        {chordOverlayNamePosition && (
          <text 
            key="cov-name" 
            x={chordOverlayNamePosition.x} 
            y={chordOverlayNamePosition.y} 
            textAnchor={chordOverlayNamePosition.anchor} 
            fontSize={16} 
            fontWeight={700} 
            fill="#0f172a" 
            style={{ filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.4))' }}
          >
            {chordOverlayNamePosition.text}
          </text>
        )}
        
        {/* Note footprint overlay name - rendered separately without glow filter */}
        {footprintNamePosition && (
          <text 
            key="footprint-name" 
            x={footprintNamePosition.x} 
            y={footprintNamePosition.y} 
            textAnchor={footprintNamePosition.anchor} 
            fontSize={14} 
            fontWeight={700} 
            fill="#92400e" 
            style={{ filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.4))' }}
          >
            {footprintNamePosition.text}
          </text>
        )}
        
        {/* Chord name - rendered once per chord, positioned in the middle of the diagram to persist throughout chord duration */}
        {showChordNames && currentChordName && (trackChordNames[trackIndex] ?? true) && (
          <text 
            x={leftPadding + (numFrets * cellWidth) / 2} 
            y={topPadding + ((nStrings - 1) * stringGap) / 2} 
            textAnchor="middle" 
            fontSize={18} 
            fill="#92400e" 
            fontWeight={700}
            style={{ filter: 'drop-shadow(2px 2px 3px rgba(0,0,0,0.5))' }}
          >
            {currentChordName}
          </text>
        )}
        {/* User text overlay segments (nudgeable) */}
        {textOverlayEnabled && Array.isArray(textOverlaySegments) && textOverlaySegments.length > 0 && (
          (() => {
            const cxCenter = leftPadding + (visibleFretSpan * cellWidth) / 2;
            const cyCenter = topPadding + ((nStrings - 1) * stringGap) / 2;
            return (
              <g key="custom-text-overlays">
                {textOverlaySegments.filter(seg => currentBarIndex >= seg.startBar && currentBarIndex <= seg.endBar).map((seg, i) => {
                  const dx = typeof seg.dx === 'number' ? seg.dx : 0;
                  const dy = typeof seg.dy === 'number' ? seg.dy : 0;
                  const fs = Math.max(8, Math.min(64, typeof seg.fontSize === 'number' ? seg.fontSize : 16));
                  const anchor = seg.anchor || 'middle';
                  const vPos = seg.vPos || 'middle';
                  const yBase = vPos === 'top'
                    ? (topPadding + 0)
                    : (vPos === 'bottom' ? (topPadding + (nStrings - 1) * stringGap) : cyCenter);
                  // Image support: text beginning with '@' renders an image from public/social
                  if (seg.text && seg.text.startsWith('@')) {
                    const file = seg.text.slice(1).trim();
                    const w = seg.imgW || 240;
                    const h = seg.imgH || 80;
                    const xImg = (cxCenter + dx) - (anchor === 'middle' ? w/2 : anchor === 'end' ? w : 0);
                    const yImg = (yBase + dy) - h/2;
                    return (
                      <image key={`img-${i}`} href={`/social/${file}`} x={xImg} y={yImg} width={w} height={h} preserveAspectRatio="xMidYMid meet" />
                    );
                  }
                  return (
                    <text
                      key={`txt-${i}`}
                      x={cxCenter + dx}
                      y={yBase + dy}
                      textAnchor={anchor as any}
                      fontSize={fs}
                      fontWeight={700}
                      fill="#0f172a"
                      style={{ filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.4))' }}
                    >
                      {seg.text}
                    </text>
                  );
                })}
              </g>
            );
          })()
        )}
        {/* GP Text label (e.g., Shape 1) – centered slightly below chord label */}
        {showTextLabels && currentTextLabel && (
          <text 
            x={leftPadding + (numFrets * cellWidth) / 2} 
            y={topPadding + ((nStrings - 1) * stringGap) / 2 + 18} 
            textAnchor="middle" 
            fontSize={14} 
            fill="#1f2937" 
            fontWeight={700}
            style={{ filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.3))' }}
          >
            {currentTextLabel}
          </text>
        )}
      </svg>
    );
  };

  useEffect(() => {
    // Reactively apply mute/unmute when isSilent changes
    try {
      const api: any = apiRef.current;
      if (!api) return;
      const desired = isSilent ? 0 : 1;
      // Master volume variants
      try { if (typeof api.masterVolume !== 'undefined') api.masterVolume = desired; } catch {}
      try { if (api.audio && typeof api.audio.masterVolume !== 'undefined') api.audio.masterVolume = desired; } catch {}
      try { if (api.audio && api.audio.masterGain && api.audio.masterGain.gain && typeof api.audio.masterGain.gain.value === 'number') api.audio.masterGain.gain.value = desired; } catch {}
      // Per-track mute fallback
      try {
        const score = (api as any).score;
        const tracks = score?.tracks || [];
        for (let i = 0; i < tracks.length; i++) {
          const t = tracks[i];
          if (t && t.playbackInfo) {
            t.playbackInfo.isMute = !!isSilent;
          }
        }
        // Some builds require an explicit refresh
        if (typeof api.updatePlayerState === 'function') api.updatePlayerState();
      } catch {}
    } catch {}
  }, [isSilent]);

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


