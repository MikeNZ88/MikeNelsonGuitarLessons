'use client';

import React, { useMemo, useState, useEffect } from 'react';
import AnimatedFretboardGP from '@/components/fretboard/AnimatedFretboardGP';

export default function AnimatedFretboardGPPage() {
  const [tempoPercent, setTempoPercent] = useState(100);
  const [selectedId, setSelectedId] = useState('seventh-chord-inversions');
  const [showIntervals, setShowIntervals] = useState(true);
  const [currentAutoRoot, setCurrentAutoRoot] = useState<string | null>(null);
  const [currentBar, setCurrentBar] = useState<number>(0);
  const [hideNotation, setHideNotation] = useState(false);
  const [availableTracks, setAvailableTracks] = useState<{ index: number; name: string }[]>([]);
  const [trackIndex, setTrackIndex] = useState<number>(0);
  const [diagramCount, setDiagramCount] = useState<number>(1);
  const [secondaryTracks, setSecondaryTracks] = useState<number[]>([1,2]);
  const [useKeySigNames, setUseKeySigNames] = useState(true);
  const [labelMode, setLabelMode] = useState<'intervals'|'notes'|'fingering'|'gpOrNotes'|'alternateBar'>('intervals');
  const [preferGpFingerings, setPreferGpFingerings] = useState<boolean>(true);
  const [showExtensionsAboveOctave, setShowExtensionsAboveOctave] = useState<boolean>(false);
  const [perStringExtensionBaseline, setPerStringExtensionBaseline] = useState<boolean>(false);
  const trackNameByIndex = (idx: number) => availableTracks.find(t => t.index === idx)?.name ?? `Track ${idx}`;
  const [framePreset, setFramePreset] = useState<'none' | 'square' | 'reel'>('none');
  const [showControls, setShowControls] = useState(false);
  const [videoSpaceMode, setVideoSpaceMode] = useState(false);
  const [seekBar, setSeekBar] = useState<number>(0);
  const [fretCount, setFretCount] = useState<number>(15);
  const [barCount, setBarCount] = useState<number>(0);
  const [blankCircles, setBlankCircles] = useState<boolean>(false);
  const [showChordNames, setShowChordNames] = useState<boolean>(false);
  const [trackChordNames, setTrackChordNames] = useState<Record<number, boolean>>({});
  // Scale overlay
  const [overlayEnabled, setOverlayEnabled] = useState<boolean>(false);
  const [overlayMode, setOverlayMode] = useState<'notes' | 'intervals' | 'blank'>('intervals');
  const [overlayRoot, setOverlayRoot] = useState<string>('A');
  const [overlayScale, setOverlayScale] = useState<'major' | 'naturalMinor' | 'dorian' | 'mixolydian' | 'majorPentatonic' | 'minorPentatonic' | 'bluesMinor' | 'harmonicMinor' | 'melodicMinor' | 'custom'>('minorPentatonic');
  const [overlayCustom, setOverlayCustom] = useState<string>('0,3,5,7,10');
  const [overlayName, setOverlayName] = useState<string>('');
  // Enharmonic toggles
  const [useSharp5, setUseSharp5] = useState<boolean>(false); // b6 vs #5
  const [useSharp4, setUseSharp4] = useState<boolean>(false); // b5 vs #4
  // Note footprint overlay
  const [footprintEnabled, setFootprintEnabled] = useState<boolean>(false);
  const [footprintMode, setFootprintMode] = useState<'notes' | 'intervals' | 'blank'>('intervals');
  const [footprintName, setFootprintName] = useState<string>('Footprint');
  const [highlightOverlayRoot, setHighlightOverlayRoot] = useState<boolean>(false);
  // Text labels from GP (e.g. Shape 1)
  const [showTextLabels, setShowTextLabels] = useState<boolean>(true);
  // Chord overlay (independent from scale overlay)
  const [chordOverlayEnabled, setChordOverlayEnabled] = useState<boolean>(false);
  const [chordOverlayModeType, setChordOverlayModeType] = useState<'global'|'segments'>('global');
  const [chordOverlayMode, setChordOverlayMode] = useState<'notes'|'intervals'|'blank'>('notes');
  const [chordOverlayRoot, setChordOverlayRoot] = useState<string>('A');
  const [chordOverlayName, setChordOverlayName] = useState<string>('');
  const [chordOverlayNotesGlobal, setChordOverlayNotesGlobal] = useState<string>('A,C#,E,G');
  const [chordOverlayGlobalFretStart, setChordOverlayGlobalFretStart] = useState<number>(0);
  const [chordOverlayGlobalFretEnd, setChordOverlayGlobalFretEnd] = useState<number>(fretCount);
  const [chordOverlaySegments, setChordOverlaySegments] = useState<Array<{ startBar: number; endBar: number; name?: string; notes: string[]; mode?: 'notes'|'intervals'|'blank'; fretStart?: number; fretEnd?: number; diagramFretStart?: number; diagramFretEnd?: number; }>>([]);
  // Text overlay (segment-based)
  const [textOverlayEnabled, setTextOverlayEnabled] = useState<boolean>(false);
  const [textOverlaySegments, setTextOverlaySegments] = useState<Array<{ startBar: number; endBar: number; text: string; dx?: number; dy?: number; fontSize?: number; anchor?: 'start'|'middle'|'end'; }>>([]);
  const [selectedTextSegIdx, setSelectedTextSegIdx] = useState<number>(-1);
  // Note color overlay (per-bar pitch color)
  const [noteColorEnabled, setNoteColorEnabled] = useState<boolean>(false);
  const [noteColorSegments, setNoteColorSegments] = useState<Array<{ startBar: number; endBar: number; notes: string[]; color: string; target?: 'active'|'overlay'|'both'; }>>([]);
  // Interval color overlay (Scale Explorer palette)
  const [intervalColorsEnabled, setIntervalColorsEnabled] = useState<boolean>(false);
  // Segmented overlay controls
  const [overlayModeType, setOverlayModeType] = useState<'global'|'segments'>('global');
  const [overlayGlobalFretStart, setOverlayGlobalFretStart] = useState<number>(0);
  const [overlayGlobalFretEnd, setOverlayGlobalFretEnd] = useState<number>(fretCount);
  const [overlaySegments, setOverlaySegments] = useState<Array<{
    startBar: number; endBar: number; root: string;
    scale: 'major'|'naturalMinor'|'dorian'|'mixolydian'|'majorPentatonic'|'minorPentatonic'|'bluesMinor'|'harmonicMinor'|'melodicMinor'|'custom';
    customIntervals?: number[]; mode: 'notes'|'intervals'|'blank'; fretStart?: number; fretEnd?: number;
    name?: string; diagramFretStart?: number; diagramFretEnd?: number;
  }>>([]);
  const [diagramGlobalFretStart, setDiagramGlobalFretStart] = useState<number>(0);
  const [diagramGlobalFretEnd, setDiagramGlobalFretEnd] = useState<number>(fretCount);
  const [useCustomFretRange, setUseCustomFretRange] = useState<boolean>(false);
  // Presets (localStorage)
  const [presetName, setPresetName] = useState<string>('');
  const [selectedPresetIdx, setSelectedPresetIdx] = useState<number>(-1);
  const [savedPresets, setSavedPresets] = useState<Array<{ name: string; data: any }>>(() => {
    try {
      const raw = typeof window !== 'undefined' ? window.localStorage.getItem('af_scale_overlay_presets') : null;
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  
  // Update diagram range when preset fretCount changes (unless custom range is enabled)
  useEffect(() => {
    if (!useCustomFretRange) {
      setDiagramGlobalFretStart(0);
      setDiagramGlobalFretEnd(fretCount);
    }
  }, [fretCount, useCustomFretRange]);

  // Effective fret count to pass to diagrams. When using a custom diagram range,
  // ensure the underlying fretboard has enough frets (0..end) so diagram end isn't clipped.
  const effectiveFretCount = useMemo(() => {
    const end = Math.max(diagramGlobalFretStart, diagramGlobalFretEnd);
    return useCustomFretRange ? Math.max(1, end) : fretCount;
  }, [useCustomFretRange, diagramGlobalFretStart, diagramGlobalFretEnd, fretCount]);
  
  const persistPresets = (items: Array<{name:string; data:any}>) => {
    setSavedPresets(items);
    try { window.localStorage.setItem('af_scale_overlay_presets', JSON.stringify(items)); } catch {}
  };

  // Keyboard nudging for text overlay segments (arrow keys, Shift = 5px)
  useEffect(() => {
    function isEditingTarget(t: EventTarget | null): boolean {
      const el = t as HTMLElement | null;
      if (!el) return false;
      const tag = (el.tagName || '').toUpperCase();
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true;
      if ((el as any).isContentEditable) return true;
      return false;
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') { setSelectedTextSegIdx(-1); return; }
      if (!textOverlayEnabled) return;
      if (selectedTextSegIdx < 0) return;
      if (isEditingTarget(e.target)) return;
      if (!['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)) return;
      e.preventDefault();
      const delta = e.shiftKey ? 5 : 2;
      setTextOverlaySegments(prev => prev.map((seg, i) => {
        if (i !== selectedTextSegIdx) return seg;
        const dx = seg.dx || 0;
        const dy = seg.dy || 0;
        if (e.key === 'ArrowUp') return { ...seg, dy: dy - delta };
        if (e.key === 'ArrowDown') return { ...seg, dy: dy + delta };
        if (e.key === 'ArrowLeft') return { ...seg, dx: dx - delta };
        if (e.key === 'ArrowRight') return { ...seg, dx: dx + delta };
        return seg;
      }));
    }
    window.addEventListener('keydown', onKey as any);
    return () => window.removeEventListener('keydown', onKey as any);
  }, [textOverlayEnabled, selectedTextSegIdx]);

  // Helpers for quick note color presets
  const NOTE_NAMES_SHARP = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
  const noteToIndex = (n: string) => {
    const up = (n||'').toUpperCase().replace('B#','C').replace('E#','F').replace('DB','C#').replace('EB','D#').replace('GB','F#').replace('AB','G#').replace('BB','A#');
    return NOTE_NAMES_SHARP.indexOf(up);
  };
  const transpose = (root: string, semitones: number) => {
    const i = noteToIndex(root);
    if (i < 0) return root || 'A';
    const idx = (i + ((semitones%12)+12)) % 12;
    return NOTE_NAMES_SHARP[idx];
  };
  const COLOR_PALETTE: string[] = [
    '#ef4444', // red-500
    '#f59e0b', // amber-500
    '#d97706', // amber-600
    '#10b981', // emerald-500
    '#3b82f6', // blue-500
    '#8b5cf6', // violet-500
    '#f43f5e', // rose-500
    '#22c55e', // green-500
    '#eab308', // yellow-500
    '#14b8a6', // teal-500
    '#7c2d12', // brand deep brown
    '#92400e', // brand amber text
  ];

  const pentatonicExercises = useMemo(
    () => [
      { id: 'am-asc-desc-16ths', name: 'Am Pentatonic Asc/Desc (16ths)', file: '/GP Files/Scale Exercises/BLOG TABS/Am Pentatonic Ascending:Descending 16th notes.gp' },
      { id: 'am-asc-alt', name: 'Am Pentatonic Asc (Alternate)', file: '/GP Files/Scale Exercises/BLOG TABS/Am Pentatonicascending 16th notes Alternate  copy.gp' },
      { id: 'am-desc-alt', name: 'Am Pentatonic Desc (Alternate)', file: '/GP Files/Scale Exercises/BLOG TABS/Am Pentatonic descending 16th notes Alternate .gp' },
      { id: 'am-desc-legato', name: 'Am Pentatonic Desc (Partial Legato)', file: '/GP Files/Scale Exercises/BLOG TABS/Am Pentatonic descending 16th notes Hammers ons Pulls offs.gp' },
      { id: 'triplets-16ths', name: 'Am Triplet 16ths', file: '/GP Files/Scale Exercises/BLOG TABS/Am pent triplet 16ths 3.gp' },
      { id: 'triplets-legato', name: 'Am 16th Triplets (Partial Legato)', file: '/GP Files/Scale Exercises/BLOG TABS/Am Pentatonic 16th note triplets partial legato.gp' },
      { id: 'triplets-8ths', name: 'Am Desc 8th Triplets', file: '/GP Files/Scale Exercises/BLOG TABS/Am Pentatonic descending eighth note triplets.gp' }
    ],
    []
  );

  const bluesExercises = useMemo(
    () => [
      { id: 'blues-base', name: '12 Bar Blues in A (Base)', file: '/GP Files/Scale Exercises/BLOG TABS/12 Bar Blues in A.gp' },
      { id: 'blues-v2', name: '12 Bar Blues in A V2', file: '/GP Files/Scale Exercises/BLOG TABS/12 Bar Blues in A V2.gp' },
      { id: 'blues-v3', name: '12 Bar Blues in A V3', file: '/GP Files/Scale Exercises/BLOG TABS/12 Bar Blues in A V3.gp' },
      { id: 'blues-v4', name: '12 Bar Blues in A V4', file: '/GP Files/Scale Exercises/BLOG TABS/12 Bar Blues in A V4.gp' },
      { id: 'blues-v5', name: '12 Bar Blues in A V5', file: '/GP Files/Scale Exercises/BLOG TABS/12 Bar Blues in A V5.gp' },
      { id: 'blues-v6', name: '12 Bar Blues in A V6', file: '/GP Files/Scale Exercises/BLOG TABS/12 Bar Blues in A V6.gp' },
      { id: 'blues-v7', name: '12 Bar Blues in A V7', file: '/GP Files/Scale Exercises/BLOG TABS/12 Bar Blues in A V7.gp' }
    ],
    []
  );

  const miscSongs = useMemo(
    () => [
      { id: 'seventh-chord-inversions', name: '7th Chord Inversions', file: '/GP Files/Scale Exercises/BLOG TABS/7th Chord Inversions .gp' },
      { id: 'seventh-chord-inversions-2', name: '7th Chord Inversions 2', file: '/GP Files/Scale Exercises/BLOG TABS/7th Chord Inversions 2.gp' },
      { id: 'g-major-scale', name: 'G Major Scale', file: '/GP Files/Scale Exercises/BLOG TABS/G Major Scale.gp' },
      { id: 'string-notes', name: 'String Notes', file: '/GP Files/Scale Exercises/BLOG TABS/String Notes.gp' },
      { id: 'intervals', name: 'Intervals', file: '/GP Files/Scale Exercises/BLOG TABS/Intervals.gp' },
      { id: 'opeth-drapery-falls', name: 'Opeth - The Drapery Falls (ver 2)', file: '/GP Files/Scale Exercises/BLOG TABS/Opeth - The Drapery Falls (ver 2).gp' },
      { id: 'bends-ex1', name: 'String Bending Exercise 1', file: '/GP Files/Scale Exercises/BLOG TABS/STRING BENDING/STRING BENDING EXERCISE 1 .gp' },
      { id: 'meshuggah-dancers', name: 'Meshuggah - Dancers To A Discordant System (ver 3)', file: '/GP Files/Scale Exercises/BLOG TABS/Meshuggah - Dancers To A Discordant System (ver 3 by Stuart XIV).gp' },
      { id: 'morbid-angel-god-emptiness', name: 'Morbid Angel - God of Emptiness', file: '/GP Files/Scale Exercises/BLOG TABS/Morbid Angel - God Of Emptiness.gp3' },
      { id: 'am-pent-shapes', name: 'Am Pentatonic Shapes', file: '/GP Files/Scale Exercises/BLOG TABS/Am Pentatonic Shapes.gp' }
    ],
    []
  );

  const arpeggioExercises = useMemo(
    () => [
      { id: 'c7-arpeggio', name: 'C7 Arpeggio', file: '/GP Files/Scale Exercises/BLOG TABS/Arpeggios/C 7 Arpeggio.gp' },
      { id: 'cm7-arpeggio', name: 'Cm7 Arpeggio', file: '/GP Files/Scale Exercises/BLOG TABS/Arpeggios/C m7 Arpeggio.gp' },
      { id: 'cmaj7-arpeggio', name: 'Cmaj7 Arpeggio', file: '/GP Files/Scale Exercises/BLOG TABS/Arpeggios/C maj7 Arpeggio.gp' },
      { id: 'cm7b5-arpeggio', name: 'Cm7b5 Arpeggio', file: '/GP Files/Scale Exercises/BLOG TABS/Arpeggios/C m7b5 Arpeggio.gp' },
      { id: 'cdimj7-arpeggio', name: 'Cdimj7 Arpeggio', file: '/GP Files/Scale Exercises/BLOG TABS/Arpeggios/Cdimj7 Arpeggio.gp' },
      { id: 'cmmaj7-arpeggio', name: 'CmMaj7 Arpeggio', file: '/GP Files/Scale Exercises/BLOG TABS/Arpeggios/CmMaj7 Arpeggio.gp' },
      { id: 'c7-sweep-legato-tap', name: 'C7 Arpeggio Sweep with Legato and Tap', file: '/GP Files/Scale Exercises/BLOG TABS/Arpeggios/C7 Arpeggio Sweep with Legato and Tap.gp' },
      { id: 'cm7-sweep-legato-tap', name: 'Cm7 Arpeggio Sweep with Legato and Tap', file: '/GP Files/Scale Exercises/BLOG TABS/Arpeggios/Cm7 Arpeggio Sweep with Legato and Tap.gp' },
      { id: 'cmaj7-sweep-legato-tap', name: 'Cmaj7 Arpeggio Sweep with Legato and Tap', file: '/GP Files/Scale Exercises/BLOG TABS/Arpeggios/Cmaj7 Arpeggio Sweep with Legato and Tap.gp' },
      { id: 'cm7b5-sweep-legato-tap', name: 'Cm7b5 Arpeggio Sweep with Legato and Tap', file: '/GP Files/Scale Exercises/BLOG TABS/Arpeggios/Cm7b5 Arpeggio Sweep with Legato and Tap.gp' },
      { id: 'c-major-scale-arpeggios-asc', name: 'C Major Scale Arpeggios Ascending', file: '/GP Files/Scale Exercises/BLOG TABS/Arpeggios/C Major Scale Arpeggios Ascending.gp' },
      { id: 'c-major-scale-arpeggios-desc', name: 'C Major Scale Arpeggios Descending', file: '/GP Files/Scale Exercises/BLOG TABS/Arpeggios/C Major Scale Arpeggios Descending.gp' }
    ],
    []
  );

  const selectedFile = useMemo(() => {
    const p = pentatonicExercises.find(e => e.id === selectedId)?.file;
    const b = bluesExercises.find(e => e.id === selectedId)?.file;
    const m = miscSongs.find(e => e.id === selectedId)?.file;
    const a = arpeggioExercises.find(e => e.id === selectedId)?.file;
    return a || m || b || p || bluesExercises[0].file;
  }, [pentatonicExercises, bluesExercises, miscSongs, arpeggioExercises, selectedId]);

  // Example: 12 Bar Blues in A with per-bar roots
  // Map bar index -> root for interval calculation
  const barToRoot = useMemo(() => {
    const map: Record<number, string> = {};
    // Simple 12-bar: A7 (bars 0-3), D7 (4-5), A7 (6-7), E7 (8), D7 (9), A7 (10), E7 (11)
    for (let i = 0; i < 4; i++) map[i] = 'A';
    map[4] = 'D';
    map[5] = 'D';
    map[6] = 'A';
    map[7] = 'A';
    map[8] = 'E';
    map[9] = 'D';
    map[10] = 'A';
    map[11] = 'E';
    return map;
  }, []);

  // Simple UI to set bar-level and beat-level roots
  const [barRootInput, setBarRootInput] = useState('');
  const [rangeRootInput, setRangeRootInput] = useState(''); // e.g. 0-3:A,4-5:D
  const [useBarRoots, setUseBarRoots] = useState(false);

  const parsedBarToRoot = useMemo(() => {
    const map: Record<number, string> = {};
    const applyPair = (pair: string) => {
      const [bars, root] = pair.split(':').map(s => s.trim());
      if (!bars || !root) return;
      if (bars.includes('-')) {
        const [start, end] = bars.split('-').map(n => parseInt(n.trim(), 10));
        if (!isNaN(start) && !isNaN(end)) {
          for (let i = start; i <= end; i++) map[i] = root;
        }
      } else {
        const idx = parseInt(bars, 10);
        if (!isNaN(idx)) map[idx] = root;
      }
    };
    barRootInput.split(',').map(s => s.trim()).filter(Boolean).forEach(applyPair);
    rangeRootInput.split(',').map(s => s.trim()).filter(Boolean).forEach(applyPair);
    return map;
  }, [barToRoot, barRootInput, rangeRootInput]);

  // Backing track (external audio)
  const backingAudioRef = React.useRef<HTMLAudioElement | null>(null);
  const [backingEnabled, setBackingEnabled] = useState<boolean>(false);
  const [backingVolume, setBackingVolume] = useState<number>(0.8);
  const [backingUrl, setBackingUrl] = useState<string>('');
  const [backingFileName, setBackingFileName] = useState<string>('');
  const [muteAlphaTab, setMuteAlphaTab] = useState<boolean>(false);

  // Keep audio element in sync with controls
  useEffect(() => {
    if (!backingAudioRef.current) return;
    backingAudioRef.current.volume = Math.min(1, Math.max(0, backingVolume));
  }, [backingVolume]);

  // Listen to global transport events to control backing audio
  useEffect(() => {
    function onTransport(e: any) {
      if (!backingEnabled || !backingAudioRef.current) return;
      const playing = !!e?.detail?.playing;
      try {
        if (playing) {
          void backingAudioRef.current.play();
        } else {
          backingAudioRef.current.pause();
        }
      } catch {}
    }
    function onStop() {
      if (!backingEnabled || !backingAudioRef.current) return;
      try {
        backingAudioRef.current.pause();
        backingAudioRef.current.currentTime = 0;
      } catch {}
    }
    function onSeek(e: any) {
      if (!backingEnabled || !backingAudioRef.current) return;
      // For now, we simply restart from 0 on seek to avoid drift; precise bar-time mapping can be added later
      try {
        backingAudioRef.current.currentTime = 0;
        void backingAudioRef.current.play();
      } catch {}
    }
    window.addEventListener('af-sync-transport' as any, onTransport);
    window.addEventListener('af-sync-stop' as any, onStop);
    window.addEventListener('af-sync-seek' as any, onSeek);
    return () => {
      window.removeEventListener('af-sync-transport' as any, onTransport);
      window.removeEventListener('af-sync-stop' as any, onStop);
      window.removeEventListener('af-sync-seek' as any, onSeek);
    };
  }, [backingEnabled]);

  // Cleanup object URLs
  useEffect(() => {
    return () => {
      if (backingUrl?.startsWith('blob:')) {
        try { URL.revokeObjectURL(backingUrl); } catch {}
      }
    };
  }, [backingUrl]);

  // Helper to render framed diagram area at top
  const renderDiagrams = () => {
    const bg = '#92400E';
    const style: React.CSSProperties = framePreset === 'square'
      ? { aspectRatio: '1 / 1', background: bg }
      : framePreset === 'reel'
      ? { aspectRatio: '2 / 3', background: bg }
      : { background: 'transparent' };
    const frameClass = framePreset === 'none' ? '' : 'max-w-[900px] mx-auto rounded-lg p-4 flex flex-col';
    return (
      <div className={frameClass} style={style}>
        {videoSpaceMode && diagramCount === 1 ? (
          <div className="flex-1 flex flex-col">
            <div className="flex-1 flex items-center justify-center">
              <div className="w-full">
                <div className="text-lg text-amber-100 mb-2 text-center font-semibold">{trackNameByIndex(trackIndex)}</div>
                <AnimatedFretboardGP
                  filePath={selectedFile}
                  trackIndex={trackIndex}
                  fretCount={fretCount}
                  useTabStringOrder={false}
                  showIntervals={showIntervals}
                  labelMode={labelMode}
                  hideLabels={blankCircles}
                  showChordNames={showChordNames}
                  textOverlayEnabled={textOverlayEnabled}
                  textOverlaySegments={textOverlaySegments}
                  noteColorEnabled={noteColorEnabled}
                  noteColorSegments={noteColorSegments}
                  intervalColorEnabled={intervalColorsEnabled}
                  preferGpFingerings={preferGpFingerings}
                  showExtensionsAboveOctave={showExtensionsAboveOctave}
                  perStringExtensionBaseline={perStringExtensionBaseline}
                  overlayEnabled={overlayEnabled}
                  overlayMode={overlayMode}
                  overlayRoot={overlayRoot}
                  overlayScale={overlayScale}
                  overlayCustomIntervals={overlayCustom.split(',').map(s=>parseInt(s.trim(),10)).filter(n=>!isNaN(n))}
                  overlayModeType={overlayModeType}
                  overlayGlobalFretStart={overlayGlobalFretStart}
                  overlayGlobalFretEnd={overlayGlobalFretEnd}
                  diagramGlobalFretStart={diagramGlobalFretStart}
                  diagramGlobalFretEnd={diagramGlobalFretEnd}
                  overlaySegments={overlaySegments}
                  chordOverlayEnabled={chordOverlayEnabled}
                  chordOverlayMode={chordOverlayMode}
                  chordOverlayRoot={chordOverlayRoot}
                  chordOverlayName={chordOverlayName}
                  chordOverlayNotesGlobal={chordOverlayNotesGlobal.split(',').map(s=>s.trim()).filter(Boolean)}
                  chordOverlayModeType={chordOverlayModeType}
                  chordOverlayGlobalFretStart={chordOverlayGlobalFretStart}
                  chordOverlayGlobalFretEnd={chordOverlayGlobalFretEnd}
                  chordOverlaySegments={chordOverlaySegments}
                  footprintEnabled={footprintEnabled}
                  footprintMode={footprintMode}
                  footprintName={footprintName}
                  useSharp5={useSharp5}
                  useSharp4={useSharp4}
                  barToRoot={useBarRoots ? parsedBarToRoot : undefined}
                  initialTempoPercent={tempoPercent}
                  accidentalStyle="mixed"
                  autoRootFromChordTrackIndex={1}
                  onRootChange={(r, bar) => { setCurrentAutoRoot(r); setCurrentBar(bar); }}
                  hideNotation={hideNotation}
                  showTransport={false}
                  useKeySignatureForNames={useKeySigNames}
                  isSilent={muteAlphaTab}
                  highlightOverlayRoot={highlightOverlayRoot}
                  onTracksDetected={(tracks) => {
                    setAvailableTracks(tracks);
                    setTrackIndex((prev) => (tracks.some(t => t.index === prev) ? prev : 0));
                    setSecondaryTracks((prev) => [prev[0] ?? 1, prev[1] ?? 2]);
                  }}
                  onBarCountDetected={(count) => setBarCount(count)}
                  showTextLabels={showTextLabels}
                />
              </div>
            </div>
            <div className="flex-1" />
          </div>
        ) : (
          <>
            <div className="text-lg text-amber-100 mb-2 text-center font-semibold">{trackNameByIndex(trackIndex)}</div>
            <AnimatedFretboardGP
              filePath={selectedFile}
              trackIndex={trackIndex}
              fretCount={effectiveFretCount}
              useTabStringOrder={false}
              showIntervals={showIntervals}
              labelMode={labelMode}
              hideLabels={blankCircles}
              showChordNames={showChordNames}
              trackChordNames={trackChordNames}
              overlayEnabled={overlayEnabled}
              overlayMode={overlayMode}
              overlayRoot={overlayRoot}
              overlayScale={overlayScale}
              overlayCustomIntervals={overlayCustom.split(',').map(s=>parseInt(s.trim(),10)).filter(n=>!isNaN(n))}
              overlayModeType={overlayModeType}
              overlayGlobalFretStart={overlayGlobalFretStart}
              overlayGlobalFretEnd={overlayGlobalFretEnd}
              diagramGlobalFretStart={diagramGlobalFretStart}
              diagramGlobalFretEnd={diagramGlobalFretEnd}
              overlaySegments={overlaySegments}
              noteColorEnabled={noteColorEnabled}
              noteColorSegments={noteColorSegments}
              textOverlayEnabled={textOverlayEnabled}
              textOverlaySegments={textOverlaySegments}
              preferGpFingerings={preferGpFingerings}
              showExtensionsAboveOctave={showExtensionsAboveOctave}
              perStringExtensionBaseline={perStringExtensionBaseline}
              chordOverlayEnabled={chordOverlayEnabled}
              chordOverlayMode={chordOverlayMode}
              chordOverlayRoot={chordOverlayRoot}
              chordOverlayName={chordOverlayName}
              chordOverlayNotesGlobal={chordOverlayNotesGlobal.split(',').map(s=>s.trim()).filter(Boolean)}
              chordOverlayModeType={chordOverlayModeType}
              chordOverlayGlobalFretStart={chordOverlayGlobalFretStart}
              chordOverlayGlobalFretEnd={chordOverlayGlobalFretEnd}
              chordOverlaySegments={chordOverlaySegments}
              footprintEnabled={footprintEnabled}
              footprintMode={footprintMode}
              footprintName={footprintName}
              useSharp5={useSharp5}
              useSharp4={useSharp4}
              barToRoot={useBarRoots ? parsedBarToRoot : undefined}
              initialTempoPercent={tempoPercent}
              accidentalStyle="mixed"
              autoRootFromChordTrackIndex={1}
              onRootChange={(r, bar) => { setCurrentAutoRoot(r); setCurrentBar(bar); }}
              hideNotation={hideNotation || diagramCount > 1}
              showTransport={false}
              useKeySignatureForNames={useKeySigNames}
              isSilent={muteAlphaTab}
              highlightOverlayRoot={highlightOverlayRoot}
              onTracksDetected={(tracks) => {
                setAvailableTracks(tracks);
                setTrackIndex((prev) => (tracks.some(t => t.index === prev) ? prev : 0));
                setSecondaryTracks((prev) => [prev[0] ?? 1, prev[1] ?? 2]);
              }}
              onBarCountDetected={(count) => setBarCount(count)}
              showTextLabels={showTextLabels}
            />

            {diagramCount > 1 && (
              <div className="mt-4">
                <div className="text-lg text-amber-100 mb-2 text-center font-semibold">{trackNameByIndex(secondaryTracks[0] ?? 1)}</div>
                <AnimatedFretboardGP
                  filePath={selectedFile}
                  trackIndex={secondaryTracks[0] ?? 1}
                  fretCount={effectiveFretCount}
                  useTabStringOrder={false}
                  showIntervals={showIntervals}
                  labelMode={labelMode}
                  hideLabels={blankCircles}
                  showChordNames={showChordNames}
                  trackChordNames={trackChordNames}
                  overlayEnabled={overlayEnabled}
                  overlayMode={overlayMode}
                  overlayRoot={overlayRoot}
                  overlayScale={overlayScale}
                  overlayCustomIntervals={overlayCustom.split(',').map(s=>parseInt(s.trim(),10)).filter(n=>!isNaN(n))}
                  overlayModeType={overlayModeType}
                  overlayGlobalFretStart={overlayGlobalFretStart}
                  overlayGlobalFretEnd={overlayGlobalFretEnd}
                  diagramGlobalFretStart={diagramGlobalFretStart}
                  diagramGlobalFretEnd={diagramGlobalFretEnd}
                  overlaySegments={overlaySegments}
                  noteColorEnabled={noteColorEnabled}
                  noteColorSegments={noteColorSegments}
                  intervalColorEnabled={intervalColorsEnabled}
                  textOverlayEnabled={textOverlayEnabled}
                  textOverlaySegments={textOverlaySegments}
                  preferGpFingerings={preferGpFingerings}
                  showExtensionsAboveOctave={showExtensionsAboveOctave}
                  perStringExtensionBaseline={perStringExtensionBaseline}
                  chordOverlayEnabled={chordOverlayEnabled}
                  chordOverlayMode={chordOverlayMode}
                  chordOverlayRoot={chordOverlayRoot}
                  chordOverlayName={chordOverlayName}
                  chordOverlayNotesGlobal={chordOverlayNotesGlobal.split(',').map(s=>s.trim()).filter(Boolean)}
                  chordOverlayModeType={chordOverlayModeType}
                  chordOverlayGlobalFretStart={chordOverlayGlobalFretStart}
                  chordOverlayGlobalFretEnd={chordOverlayGlobalFretEnd}
                  chordOverlaySegments={chordOverlaySegments}
                  footprintEnabled={footprintEnabled}
                  footprintMode={footprintMode}
                  footprintName={footprintName}
                  useSharp5={useSharp5}
                  useSharp4={useSharp4}
                  barToRoot={useBarRoots ? parsedBarToRoot : undefined}
                  initialTempoPercent={tempoPercent}
                  accidentalStyle="mixed"
                  autoRootFromChordTrackIndex={1}
                  hideNotation={true}
                  showTransport={false}
                  isSilent={true}
                  loadOnlySelectedTrack={true}
                  useKeySignatureForNames={useKeySigNames}
                  onBarCountDetected={(count) => setBarCount(count)}
                  showTextLabels={showTextLabels}
                  highlightOverlayRoot={highlightOverlayRoot}
                />
              </div>
            )}

            {diagramCount > 2 && (
              <div className="mt-4">
                <div className="text-lg text-amber-100 mb-2 text-center font-semibold">{trackNameByIndex(secondaryTracks[1] ?? 2)}</div>
                <AnimatedFretboardGP
                  filePath={selectedFile}
                  trackIndex={secondaryTracks[1] ?? 2}
                  fretCount={effectiveFretCount}
                  useTabStringOrder={false}
                  showIntervals={showIntervals}
                  labelMode={labelMode}
                  hideLabels={blankCircles}
                  showChordNames={showChordNames}
                  trackChordNames={trackChordNames}
                  overlayEnabled={overlayEnabled}
                  overlayMode={overlayMode}
                  overlayRoot={overlayRoot}
                  overlayScale={overlayScale}
                  overlayCustomIntervals={overlayCustom.split(',').map(s=>parseInt(s.trim(),10)).filter(n=>!isNaN(n))}
                  overlayModeType={overlayModeType}
                  overlayGlobalFretStart={overlayGlobalFretStart}
                  overlayGlobalFretEnd={overlayGlobalFretEnd}
                  diagramGlobalFretStart={diagramGlobalFretStart}
                  diagramGlobalFretEnd={diagramGlobalFretEnd}
                  overlaySegments={overlaySegments}
                  noteColorEnabled={noteColorEnabled}
                  noteColorSegments={noteColorSegments}
                  intervalColorEnabled={intervalColorsEnabled}
                  textOverlayEnabled={textOverlayEnabled}
                  textOverlaySegments={textOverlaySegments}
                  preferGpFingerings={preferGpFingerings}
                  showExtensionsAboveOctave={showExtensionsAboveOctave}
                  perStringExtensionBaseline={perStringExtensionBaseline}
                  chordOverlayEnabled={chordOverlayEnabled}
                  chordOverlayMode={chordOverlayMode}
                  chordOverlayRoot={chordOverlayRoot}
                  chordOverlayName={chordOverlayName}
                  chordOverlayNotesGlobal={chordOverlayNotesGlobal.split(',').map(s=>s.trim()).filter(Boolean)}
                  chordOverlayModeType={chordOverlayModeType}
                  chordOverlayGlobalFretStart={chordOverlayGlobalFretStart}
                  chordOverlayGlobalFretEnd={chordOverlayGlobalFretEnd}
                  chordOverlaySegments={chordOverlaySegments}
                  footprintEnabled={footprintEnabled}
                  footprintMode={footprintMode}
                  footprintName={footprintName}
                  useSharp5={useSharp5}
                  useSharp4={useSharp4}
                  barToRoot={useBarRoots ? parsedBarToRoot : undefined}
                  initialTempoPercent={tempoPercent}
                  accidentalStyle="mixed"
                  autoRootFromChordTrackIndex={1}
                  hideNotation={true}
                  showTransport={false}
                  isSilent={true}
                  loadOnlySelectedTrack={true}
                  useKeySignatureForNames={useKeySigNames}
                  onBarCountDetected={(count) => setBarCount(count)}
                  showTextLabels={showTextLabels}
                  highlightOverlayRoot={highlightOverlayRoot}
                />
              </div>
            )}
          </>
        )}
        {/* Footer logo inside the frame */}
        <div className="mt-3 text-center text-amber-100 text-sm opacity-90">Mike Nelson Guitar Lessons</div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2 text-gray-800">Animated Fretboard (Guitar Pro Driven)</h1>
      <p className="text-gray-700 mb-4">
        Loads a Guitar Pro file with AlphaTab, plays it back, and lights up a synchronized fretboard. Interval labels
        change per bar based on a configurable root map.
      </p>

      {/* Diagrams first */}
      <div className="mb-6">
        {renderDiagrams()}
      </div>

      {/* Controls below */}
      <div className="mb-4 flex items-center gap-3">
        <label className="text-sm text-gray-700">Tempo</label>
        <input
          type="range"
          min={50}
          max={150}
          value={tempoPercent}
          onChange={(e) => setTempoPercent(Number(e.target.value))}
          className="flex-1"
        />
        <div className="text-sm text-gray-700 w-12 text-right">{tempoPercent}%</div>
      </div>

      {/* Global transport and position controls ABOVE the framed area */}
      <div className="mb-4 grid grid-cols-1 md:grid-cols-4 gap-3 items-center">
        <div className="flex items-center gap-2">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('af-sync-transport', { detail: { id: 'global', playing: true } }))}
            className="px-3 py-1.5 rounded-md text-white text-sm bg-amber-700 hover:bg-amber-800"
          >Play</button>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('af-sync-transport', { detail: { id: 'global', playing: false } }))}
            className="px-3 py-1.5 rounded-md text-white text-sm bg-amber-500 hover:bg-amber-600"
          >Pause</button>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('af-sync-stop', { detail: { id: 'global' } }))}
            className="px-3 py-1.5 rounded-md text-white text-sm bg-red-600 hover:bg-red-700"
          >Stop</button>
        </div>
        <div className="md:col-span-2 flex items-center gap-3 select-none">
          <label className="text-sm text-gray-700 whitespace-nowrap">Bar</label>
          <input
            type="range"
            min={0}
            max={Math.max(0, (barCount || 12) - 1)}
            value={seekBar}
            onChange={(e) => {
              const b = Number(e.target.value);
              setSeekBar(b);
              window.dispatchEvent(new CustomEvent('af-sync-seek', { detail: { id: 'global', bar: b, beat: 0, autoplay: true } }));
            }}
            className="flex-1"
          />
          <div className="text-sm text-gray-700 w-16 text-right">{seekBar + 1} / {Math.max(1, barCount || 12)}</div>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-700">Frets</label>
          <select value={fretCount} onChange={(e) => setFretCount(parseInt(e.target.value, 10))} className="border border-gray-300 rounded-md px-2 py-1 text-sm" disabled={useCustomFretRange}>
            <option value={12}>12</option>
            <option value={15}>15</option>
            <option value={24}>24</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" checked={useCustomFretRange} onChange={(e)=>setUseCustomFretRange(e.target.checked)} />
            Custom range
          </label>
          <span className="text-sm text-gray-700">Start</span>
          <input type="number" className="border border-gray-300 rounded-md px-2 py-1 text-sm w-20" value={diagramGlobalFretStart} onChange={(e)=>setDiagramGlobalFretStart(Math.max(0, parseInt(e.target.value||'0',10)))} disabled={!useCustomFretRange} />
          <span className="text-sm text-gray-700">End</span>
          <input type="number" className="border border-gray-300 rounded-md px-2 py-1 text-sm w-20" value={diagramGlobalFretEnd} onChange={(e)=>setDiagramGlobalFretEnd(Math.max(0, parseInt(e.target.value||`${fretCount}`,10)))} disabled={!useCustomFretRange} />
        </div>
      </div>

      <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input type="checkbox" checked={showIntervals} onChange={(e) => setShowIntervals(e.target.checked)} />
          Show intervals (off = note names)
        </label>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700">Labels</span>
          <select value={labelMode} onChange={(e)=>setLabelMode(e.target.value as any)} className="border border-gray-300 rounded-md px-2 py-1 text-sm">
            <option value="intervals">Intervals</option>
            <option value="notes">Note names</option>
            <option value="fingering">Fingering</option>
            <option value="gpOrNotes">GP fingering or Note names</option>
            <option value="alternateBar">Alternate per bar (Notes/Intervals)</option>
          </select>
          {labelMode === 'fingering' && (
            <label className="flex items-center gap-2 text-sm text-gray-700 ml-2">
              <input type="checkbox" checked={preferGpFingerings} onChange={(e)=>setPreferGpFingerings(e.target.checked)} />
              Prefer GP fingerings
            </label>
          )}
        </div>
        {!showIntervals && (
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" checked={useKeySigNames} onChange={(e) => setUseKeySigNames(e.target.checked)} />
            Use key signature for note names
          </label>
        )}
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input type="checkbox" checked={blankCircles} onChange={(e) => setBlankCircles(e.target.checked)} />
          Blank circles (no labels)
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input type="checkbox" checked={showChordNames} onChange={(e) => setShowChordNames(e.target.checked)} />
          Show chord names next to notes
        </label>
        {showChordNames && (
          <div className="ml-4 space-y-1">
            <div className="text-xs text-gray-600 mb-1">Per-track chord names:</div>
            {availableTracks.map((track) => (
              <label key={track.index} className="flex items-center gap-2 text-xs text-gray-700">
                <input 
                  type="checkbox" 
                  checked={trackChordNames[track.index] ?? true} 
                  onChange={(e) => setTrackChordNames(prev => ({ ...prev, [track.index]: e.target.checked }))} 
                />
                Track {track.index}: {track.name}
              </label>
            ))}
          </div>
        )}
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input type="checkbox" checked={showTextLabels} onChange={(e)=>setShowTextLabels(e.target.checked)} />
          Show GP text labels (e.g., Shape 1)
        </label>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" checked={hideNotation} onChange={(e) => setHideNotation(e.target.checked)} />
            Hide tab/notation
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" checked={showControls} onChange={(e) => setShowControls(e.target.checked)} />
            Show play controls
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" checked={intervalColorsEnabled} onChange={(e) => setIntervalColorsEnabled(e.target.checked)} />
            Interval colors (Scale Explorer palette)
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" checked={showExtensionsAboveOctave} onChange={(e) => setShowExtensionsAboveOctave(e.target.checked)} />
            Show extensions above octave (1→8, 2→9, 4→11, 6→13)
          </label>
          {showExtensionsAboveOctave && (
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input type="checkbox" checked={perStringExtensionBaseline} onChange={(e)=>setPerStringExtensionBaseline(e.target.checked)} />
              Per-string baseline (prefer lowest root on same string)
            </label>
          )}
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-700">Frame</label>
          <select value={framePreset} onChange={(e) => setFramePreset(e.target.value as any)} className="border border-gray-300 rounded-md px-2 py-1 text-sm">
            <option value="none">None (responsive)</option>
            <option value="square">1:1 (Square)</option>
            <option value="reel">2:3 (Portrait)</option>
          </select>
        </div>
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input type="checkbox" checked={videoSpaceMode} onChange={(e) => setVideoSpaceMode(e.target.checked)} />
          Video space mode (1 diagram: top half diagram, lower half blank)
        </label>
        {currentAutoRoot && (
          <span className="text-xs bg-amber-50 border border-amber-200 text-amber-800 px-2 py-1 rounded">
            Auto Root: {currentAutoRoot} (bar {currentBar + 1})
          </span>
        )}
        {/* Scale Overlay Controls */}
        <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-5 gap-2 items-center p-2 rounded border border-amber-200 bg-amber-50/40">
          <label className="flex items-center gap-2 text-sm text-gray-800">
            <input type="checkbox" checked={overlayEnabled} onChange={(e) => setOverlayEnabled(e.target.checked)} />
            Enable scale overlay
          </label>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700">Type</span>
            <select className="border rounded px-2 py-1 text-sm" value={overlayModeType} onChange={(e)=>setOverlayModeType(e.target.value as any)}>
              <option value="global">Global</option>
              <option value="segments">Segments</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700">Mode</span>
            <select className="border rounded px-2 py-1 text-sm" value={overlayMode} onChange={(e)=>setOverlayMode(e.target.value as any)}>
              <option value="intervals">Intervals</option>
              <option value="notes">Note names</option>
              <option value="blank">Blank circles</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700">Root</span>
            <input className="border rounded px-2 py-1 text-sm w-16" value={overlayRoot} onChange={(e)=>setOverlayRoot(e.target.value)} />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700">Name</span>
            <input className="border rounded px-2 py-1 text-sm w-40" value={overlayName} onChange={(e)=>setOverlayName(e.target.value)} placeholder="e.g. Am Pent Shape 1" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700">Scale</span>
            <select className="border rounded px-2 py-1 text-sm" value={overlayScale} onChange={(e)=>setOverlayScale(e.target.value as any)}>
              <option value="major">Major</option>
              <option value="naturalMinor">Natural Minor</option>
              <option value="dorian">Dorian</option>
              <option value="mixolydian">Mixolydian</option>
              <option value="majorPentatonic">Major Pentatonic</option>
              <option value="minorPentatonic">Minor Pentatonic</option>
              <option value="bluesMinor">Blues (Minor)</option>
              <option value="harmonicMinor">Harmonic Minor</option>
              <option value="melodicMinor">Melodic Minor</option>
              <option value="custom">Custom</option>
            </select>
          </div>
          {overlayScale === 'custom' && (
            <div className="flex items-center gap-2 md:col-span-2">
              <span className="text-sm text-gray-700">Intervals (semitones)</span>
              <input className="border rounded px-2 py-1 text-sm flex-1" value={overlayCustom} onChange={(e)=>setOverlayCustom(e.target.value)} placeholder="e.g. 0,2,3,5,7,8,10" />
            </div>
          )}
          {overlayModeType === 'global' && (
            <div className="md:col-span-5 grid grid-cols-2 md:grid-cols-4 gap-2 items-center">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-700">Fret start</span>
                <input type="number" className="border rounded px-2 py-1 text-sm w-20" value={overlayGlobalFretStart}
                  onChange={(e)=>setOverlayGlobalFretStart(Math.max(0, parseInt(e.target.value||'0',10)))} />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-700">Fret end</span>
                <input type="number" className="border rounded px-2 py-1 text-sm w-20" value={overlayGlobalFretEnd}
                  onChange={(e)=>setOverlayGlobalFretEnd(Math.max(0, parseInt(e.target.value||`${fretCount}`,10)))} />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-700">Diagram start</span>
                <input type="number" className="border rounded px-2 py-1 text-sm w-20" value={diagramGlobalFretStart}
                  onChange={(e)=>setDiagramGlobalFretStart(Math.max(0, parseInt(e.target.value||'0',10)))} />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-700">Diagram end</span>
                <input type="number" className="border rounded px-2 py-1 text-sm w-20" value={diagramGlobalFretEnd}
                  onChange={(e)=>setDiagramGlobalFretEnd(Math.max(0, parseInt(e.target.value||`${fretCount}`,10)))} />
              </div>
            </div>
          )}
          {overlayModeType === 'segments' && (
            <div className="md:col-span-5">
              <div className="text-sm font-medium text-gray-800 mb-1">Overlay segments</div>
              <div className="space-y-2">
                {overlaySegments.map((seg, idx) => (
                  <div key={idx} className="grid grid-cols-2 md:grid-cols-12 gap-2 items-center border border-amber-200 rounded p-2 bg-white">
                    <div className="col-span-1 md:col-span-2 flex items-center gap-1">
                      <span className="text-xs text-gray-600">Bars</span>
                      <input type="number" className="border rounded px-1 py-0.5 text-xs w-14" value={seg.startBar}
                        onChange={(e)=>{
                          const v = parseInt(e.target.value||'0',10); setOverlaySegments(prev=>prev.map((s,i)=>i===idx?{...s,startBar:Math.max(0,v)}:s));
                        }} />
                      <span className="text-xs">-</span>
                      <input type="number" className="border rounded px-1 py-0.5 text-xs w-14" value={seg.endBar}
                        onChange={(e)=>{
                          const v = parseInt(e.target.value||'0',10); setOverlaySegments(prev=>prev.map((s,i)=>i===idx?{...s,endBar:Math.max(0,v)}:s));
                        }} />
                    </div>
                    <div className="col-span-1 md:col-span-3 flex items-center gap-1">
                      <span className="text-xs text-gray-600">Name</span>
                      <input className="border rounded px-1 py-0.5 text-xs w-full" value={(seg as any).name || ''}
                        onChange={(e)=>setOverlaySegments(prev=>prev.map((s,i)=>i===idx?{...s, name: e.target.value}:s))} />
                    </div>
                    <div className="col-span-1 md:col-span-2 flex items-center gap-1">
                      <span className="text-xs text-gray-600">Root</span>
                      <input className="border rounded px-1 py-0.5 text-xs w-14" value={seg.root}
                        onChange={(e)=>setOverlaySegments(prev=>prev.map((s,i)=>i===idx?{...s,root:e.target.value}:s))} />
                    </div>
                    <div className="col-span-1 md:col-span-2 flex items-center gap-1">
                      <span className="text-xs text-gray-600">Scale</span>
                      <select className="border rounded px-1 py-0.5 text-xs" value={seg.scale}
                        onChange={(e)=>setOverlaySegments(prev=>prev.map((s,i)=>i===idx?{...s,scale:e.target.value as any}:s))}>
                        <option value="major">Major</option>
                        <option value="naturalMinor">Natural Minor</option>
                        <option value="dorian">Dorian</option>
                        <option value="mixolydian">Mixolydian</option>
                        <option value="majorPentatonic">Major Pentatonic</option>
                        <option value="minorPentatonic">Minor Pentatonic</option>
                        <option value="bluesMinor">Blues (Minor)</option>
                        <option value="harmonicMinor">Harmonic Minor</option>
                        <option value="melodicMinor">Melodic Minor</option>
                        <option value="custom">Custom</option>
                      </select>
                    </div>
                    {seg.scale === 'custom' && (
                      <div className="col-span-1 md:col-span-2 flex items-center gap-1">
                        <span className="text-xs text-gray-600">Intervals</span>
                        <input className="border rounded px-1 py-0.5 text-xs w-32" value={(seg.customIntervals||[]).join(',')}
                          onChange={(e)=>{
                            const vals = e.target.value.split(',').map(s=>parseInt(s.trim(),10)).filter(n=>!isNaN(n));
                            setOverlaySegments(prev=>prev.map((s,i)=>i===idx?{...s,customIntervals:vals}:s));
                          }} />
                      </div>
                    )}
                    <div className="col-span-1 md:col-span-2 flex items-center gap-1">
                      <span className="text-xs text-gray-600">Mode</span>
                      <select className="border rounded px-1 py-0.5 text-xs" value={seg.mode}
                        onChange={(e)=>setOverlaySegments(prev=>prev.map((s,i)=>i===idx?{...s,mode:e.target.value as any}:s))}>
                        <option value="intervals">Intervals</option>
                        <option value="notes">Notes</option>
                        <option value="blank">Blank</option>
                      </select>
                    </div>
                    <div className="col-span-1 md:col-span-2 flex items-center gap-1">
                      <span className="text-xs text-gray-600">Frets</span>
                      <input type="number" className="border rounded px-1 py-0.5 text-xs w-14" value={seg.fretStart ?? 0}
                        onChange={(e)=>{
                          const v = parseInt(e.target.value||'0',10); setOverlaySegments(prev=>prev.map((s,i)=>i===idx?{...s,fretStart:Math.max(0,v)}:s));
                        }} />
                      <span className="text-xs">-</span>
                      <input type="number" className="border rounded px-1 py-0.5 text-xs w-14" value={seg.fretEnd ?? fretCount}
                        onChange={(e)=>{
                          const v = parseInt(e.target.value||`${fretCount}`,10); setOverlaySegments(prev=>prev.map((s,i)=>i===idx?{...s,fretEnd:Math.max(0,v)}:s));
                        }} />
                    </div>
                    <div className="col-span-1 md:col-span-2 flex items-center gap-1">
                      <span className="text-xs text-gray-600">Diagram</span>
                      <input type="number" className="border rounded px-1 py-0.5 text-xs w-14" value={seg.diagramFretStart ?? 0}
                        onChange={(e)=>{
                          const v = parseInt(e.target.value||'0',10); setOverlaySegments(prev=>prev.map((s,i)=>i===idx?{...s,diagramFretStart:Math.max(0,v)}:s));
                        }} />
                      <span className="text-xs">-</span>
                      <input type="number" className="border rounded px-1 py-0.5 text-xs w-14" value={seg.diagramFretEnd ?? fretCount}
                        onChange={(e)=>{
                          const v = parseInt(e.target.value||`${fretCount}`,10); setOverlaySegments(prev=>prev.map((s,i)=>i===idx?{...s,diagramFretEnd:Math.max(0,v)}:s));
                        }} />
                    </div>
                    <div className="col-span-1 md:col-span-2 flex justify-end">
                      <button className="text-xs px-2 py-1 bg-red-600 text-white rounded" onClick={()=>setOverlaySegments(prev=>prev.filter((_,i)=>i!==idx))}>Remove</button>
                    </div>
                  </div>
                ))}
                <button className="text-xs px-2 py-1 bg-amber-700 text-white rounded"
                  onClick={()=>setOverlaySegments(prev=>[...prev, { startBar: 0, endBar: 3, root: overlayRoot, scale: overlayScale, customIntervals: overlayCustom.split(',').map(s=>parseInt(s.trim(),10)).filter(n=>!isNaN(n)), mode: overlayMode, fretStart: 0, fretEnd: fretCount, name: overlayName }])}
                >Add segment</button>
              </div>
            </div>
          )}
          {/* Preset export/import + local save/load */}
          <div className="md:col-span-5 grid grid-cols-1 md:grid-cols-5 gap-2 items-center">
            <button
              className="text-xs px-2 py-1 bg-amber-800 text-white rounded"
              onClick={() => {
                const preset = {
                  gpFile: selectedFile,
                  // diagram sizing
                  fretCount,
                  useCustomFretRange,
                  labelMode,
                  preferGpFingerings,
                  showExtensionsAboveOctave,
                  perStringExtensionBaseline,
                  overlayEnabled,
                  overlayMode,
                  overlayRoot,
                  overlayScale,
                  overlayCustom,
                  overlayName,
                  overlayModeType,
                  overlayGlobalFretStart,
                  overlayGlobalFretEnd,
                  diagramGlobalFretStart,
                  diagramGlobalFretEnd,
                  overlaySegments,
                  footprintEnabled,
                  footprintMode,
                  footprintName,
                  useSharp5,
                  useSharp4,
                  intervalColorsEnabled,
                  // chord overlay
                  chordOverlayEnabled,
                  chordOverlayMode,
                  chordOverlayRoot,
                  chordOverlayName,
                  chordOverlayNotesGlobal,
                  chordOverlayModeType,
                  chordOverlayGlobalFretStart,
                  chordOverlayGlobalFretEnd,
                  chordOverlaySegments,
                  // text overlay
                  textOverlayEnabled,
                  textOverlaySegments,
                  // note color overlay
                  noteColorEnabled,
                  noteColorSegments,
                };
                const blob = new Blob([JSON.stringify(preset, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'scale-overlay-preset.json';
                a.click();
                URL.revokeObjectURL(url);
              }}
            >Export preset</button>
            <label className="text-xs px-2 py-1 bg-amber-600 text-white rounded cursor-pointer">
              Load preset
              <input type="file" accept="application/json" className="hidden" onChange={async (e) => {
                try {
                  const f = e.target.files?.[0];
                  if (!f) return;
                  const txt = await f.text();
                  const data = JSON.parse(txt || '{}');
                  if (typeof data.fretCount === 'number') setFretCount(data.fretCount);
                  if (typeof data.useCustomFretRange === 'boolean') setUseCustomFretRange(data.useCustomFretRange);
                  if (typeof data.labelMode === 'string') setLabelMode(data.labelMode);
                  if (typeof data.preferGpFingerings === 'boolean') setPreferGpFingerings(data.preferGpFingerings);
                  if (typeof data.showExtensionsAboveOctave === 'boolean') setShowExtensionsAboveOctave(data.showExtensionsAboveOctave);
                  if (typeof data.perStringExtensionBaseline === 'boolean') setPerStringExtensionBaseline(data.perStringExtensionBaseline);
                  if (typeof data.overlayEnabled === 'boolean') setOverlayEnabled(data.overlayEnabled);
                  if (typeof data.overlayMode === 'string') setOverlayMode(data.overlayMode);
                  if (typeof data.overlayRoot === 'string') setOverlayRoot(data.overlayRoot);
                  if (typeof data.overlayScale === 'string') setOverlayScale(data.overlayScale);
                  if (typeof data.overlayCustom === 'string') setOverlayCustom(data.overlayCustom);
                  if (typeof data.overlayName === 'string') setOverlayName(data.overlayName);
                  if (typeof data.overlayModeType === 'string') setOverlayModeType(data.overlayModeType);
                  if (typeof data.overlayGlobalFretStart === 'number') setOverlayGlobalFretStart(data.overlayGlobalFretStart);
                  if (typeof data.overlayGlobalFretEnd === 'number') setOverlayGlobalFretEnd(data.overlayGlobalFretEnd);
                  if (typeof data.diagramGlobalFretStart === 'number') setDiagramGlobalFretStart(data.diagramGlobalFretStart);
                  if (typeof data.diagramGlobalFretEnd === 'number') setDiagramGlobalFretEnd(data.diagramGlobalFretEnd);
                  if (Array.isArray(data.overlaySegments)) setOverlaySegments(data.overlaySegments);
                  if (typeof data.footprintEnabled === 'boolean') setFootprintEnabled(data.footprintEnabled);
                  if (typeof data.footprintMode === 'string') setFootprintMode(data.footprintMode);
                  if (typeof data.footprintName === 'string') setFootprintName(data.footprintName);
                  if (typeof data.useSharp5 === 'boolean') setUseSharp5(data.useSharp5);
                  if (typeof data.useSharp4 === 'boolean') setUseSharp4(data.useSharp4);
                  if (typeof data.intervalColorsEnabled === 'boolean') setIntervalColorsEnabled(data.intervalColorsEnabled);
                  // chord overlay
                  if (typeof data.chordOverlayEnabled === 'boolean') setChordOverlayEnabled(data.chordOverlayEnabled);
                  if (typeof data.chordOverlayMode === 'string') setChordOverlayMode(data.chordOverlayMode);
                  if (typeof data.chordOverlayRoot === 'string') setChordOverlayRoot(data.chordOverlayRoot);
                  if (typeof data.chordOverlayName === 'string') setChordOverlayName(data.chordOverlayName);
                  if (typeof data.chordOverlayNotesGlobal === 'string') setChordOverlayNotesGlobal(data.chordOverlayNotesGlobal);
                  if (typeof data.chordOverlayModeType === 'string') setChordOverlayModeType(data.chordOverlayModeType);
                  if (typeof data.chordOverlayGlobalFretStart === 'number') setChordOverlayGlobalFretStart(data.chordOverlayGlobalFretStart);
                  if (typeof data.chordOverlayGlobalFretEnd === 'number') setChordOverlayGlobalFretEnd(data.chordOverlayGlobalFretEnd);
                  if (Array.isArray(data.chordOverlaySegments)) setChordOverlaySegments(data.chordOverlaySegments);
                  // text overlay
                  if (typeof data.textOverlayEnabled === 'boolean') setTextOverlayEnabled(data.textOverlayEnabled);
                  if (Array.isArray(data.textOverlaySegments)) setTextOverlaySegments(data.textOverlaySegments);
                  // note color overlay
                  if (typeof data.noteColorEnabled === 'boolean') setNoteColorEnabled(data.noteColorEnabled);
                  if (Array.isArray(data.noteColorSegments)) setNoteColorSegments(data.noteColorSegments);
                  if (typeof data.gpFile === 'string') {
                    const all = [...pentatonicExercises, ...bluesExercises, ...miscSongs, ...arpeggioExercises];
                    const found = all.find(x => x.file === data.gpFile);
                    if (found) setSelectedId(found.id);
                  }
                } catch {}
                if (e.currentTarget) e.currentTarget.value = '';
              }} />
            </label>
            <div className="flex items-center gap-2">
              <input className="border rounded px-2 py-1 text-xs w-40" placeholder="Preset name" value={presetName} onChange={(e)=>setPresetName(e.target.value)} />
              <button className="text-xs px-2 py-1 bg-emerald-600 text-white rounded" onClick={() => {
                if (!presetName.trim()) return;
                const data = {
                  gpFile: selectedFile,
                  fretCount,
                  useCustomFretRange,
                  labelMode,
                  preferGpFingerings,
                  showExtensionsAboveOctave,
                  perStringExtensionBaseline,
                  overlayEnabled,
                  overlayMode,
                  overlayRoot,
                  overlayScale,
                  overlayCustom,
                  overlayName,
                  overlayModeType,
                  overlayGlobalFretStart,
                  overlayGlobalFretEnd,
                  diagramGlobalFretStart,
                  diagramGlobalFretEnd,
                  overlaySegments,
                  footprintEnabled,
                  footprintMode,
                  footprintName,
                  useSharp5,
                  useSharp4,
                  intervalColorsEnabled,
                  chordOverlayEnabled,
                  chordOverlayMode,
                  chordOverlayRoot,
                  chordOverlayName,
                  chordOverlayNotesGlobal,
                  chordOverlayModeType,
                  chordOverlayGlobalFretStart,
                  chordOverlayGlobalFretEnd,
                  chordOverlaySegments,
                  textOverlayEnabled,
                  textOverlaySegments,
                  noteColorEnabled,
                  noteColorSegments,
                };
                const items = savedPresets.filter(p => p.name !== presetName.trim());
                items.push({ name: presetName.trim(), data });
                persistPresets(items);
              }}>Save</button>
            </div>
            <div className="flex items-center gap-2 md:col-span-2">
              <select className="border rounded px-2 py-1 text-xs flex-1" value={selectedPresetIdx}
                onChange={(e)=>setSelectedPresetIdx(parseInt(e.target.value,10))}>
                <option value={-1}>Select saved preset…</option>
                {savedPresets.map((p, i) => (
                  <option key={i} value={i}>{p.name}</option>
                ))}
              </select>
              <button className="text-xs px-2 py-1 bg-blue-600 text-white rounded" disabled={selectedPresetIdx<0}
                onClick={()=>{
                  const p = savedPresets[selectedPresetIdx];
                  if (!p) return;
                  const data = p.data || {};
                  if (typeof data.fretCount === 'number') setFretCount(data.fretCount);
                  if (typeof data.useCustomFretRange === 'boolean') setUseCustomFretRange(data.useCustomFretRange);
                  if (typeof data.labelMode === 'string') setLabelMode(data.labelMode);
                  if (typeof data.preferGpFingerings === 'boolean') setPreferGpFingerings(data.preferGpFingerings);
                  if (typeof data.showExtensionsAboveOctave === 'boolean') setShowExtensionsAboveOctave(data.showExtensionsAboveOctave);
                  if (typeof data.perStringExtensionBaseline === 'boolean') setPerStringExtensionBaseline(data.perStringExtensionBaseline);
                  if (typeof data.overlayEnabled === 'boolean') setOverlayEnabled(data.overlayEnabled);
                  if (typeof data.overlayMode === 'string') setOverlayMode(data.overlayMode);
                  if (typeof data.overlayRoot === 'string') setOverlayRoot(data.overlayRoot);
                  if (typeof data.overlayScale === 'string') setOverlayScale(data.overlayScale);
                  if (typeof data.overlayCustom === 'string') setOverlayCustom(data.overlayCustom);
                  if (typeof data.overlayName === 'string') setOverlayName(data.overlayName);
                  if (typeof data.overlayModeType === 'string') setOverlayModeType(data.overlayModeType);
                  if (typeof data.overlayGlobalFretStart === 'number') setOverlayGlobalFretStart(data.overlayGlobalFretStart);
                  if (typeof data.overlayGlobalFretEnd === 'number') setOverlayGlobalFretEnd(data.overlayGlobalFretEnd);
                  if (typeof data.diagramGlobalFretStart === 'number') setDiagramGlobalFretStart(data.diagramGlobalFretStart);
                  if (typeof data.diagramGlobalFretEnd === 'number') setDiagramGlobalFretEnd(data.diagramGlobalFretEnd);
                  if (Array.isArray(data.overlaySegments)) setOverlaySegments(data.overlaySegments);
                  if (typeof data.footprintEnabled === 'boolean') setFootprintEnabled(data.footprintEnabled);
                  if (typeof data.footprintMode === 'string') setFootprintMode(data.footprintMode);
                  if (typeof data.footprintName === 'string') setFootprintName(data.footprintName);
                  if (typeof data.useSharp5 === 'boolean') setUseSharp5(data.useSharp5);
                  if (typeof data.useSharp4 === 'boolean') setUseSharp4(data.useSharp4);
                  if (typeof data.chordOverlayEnabled === 'boolean') setChordOverlayEnabled(data.chordOverlayEnabled);
                  if (typeof data.chordOverlayMode === 'string') setChordOverlayMode(data.chordOverlayMode);
                  if (typeof data.chordOverlayRoot === 'string') setChordOverlayRoot(data.chordOverlayRoot);
                  if (typeof data.chordOverlayName === 'string') setChordOverlayName(data.chordOverlayName);
                  if (typeof data.chordOverlayNotesGlobal === 'string') setChordOverlayNotesGlobal(data.chordOverlayNotesGlobal);
                  if (typeof data.chordOverlayModeType === 'string') setChordOverlayModeType(data.chordOverlayModeType);
                  if (typeof data.chordOverlayGlobalFretStart === 'number') setChordOverlayGlobalFretStart(data.chordOverlayGlobalFretStart);
                  if (typeof data.chordOverlayGlobalFretEnd === 'number') setChordOverlayGlobalFretEnd(data.chordOverlayGlobalFretEnd);
                  if (Array.isArray(data.chordOverlaySegments)) setChordOverlaySegments(data.chordOverlaySegments);
                  if (typeof data.textOverlayEnabled === 'boolean') setTextOverlayEnabled(data.textOverlayEnabled);
                  if (Array.isArray(data.textOverlaySegments)) setTextOverlaySegments(data.textOverlaySegments);
                  if (typeof data.noteColorEnabled === 'boolean') setNoteColorEnabled(data.noteColorEnabled);
                  if (Array.isArray(data.noteColorSegments)) setNoteColorSegments(data.noteColorSegments);
                  if (typeof data.gpFile === 'string') {
                    const all = [...pentatonicExercises, ...bluesExercises, ...miscSongs, ...arpeggioExercises];
                    const found = all.find(x => x.file === data.gpFile);
                    if (found) setSelectedId(found.id);
                  }
                }}>Load</button>
              <button className="text-xs px-2 py-1 bg-red-600 text-white rounded" disabled={selectedPresetIdx<0}
                onClick={()=>{
                  const items = savedPresets.filter((_,i)=>i!==selectedPresetIdx);
                  persistPresets(items);
                  setSelectedPresetIdx(-1);
                }}>Delete</button>
            </div>
          </div>
        </div>
        
        {/* Enharmonic Toggle Controls */}
        <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-2 items-center p-2 rounded border border-blue-200 bg-blue-50/40">
          <label className="flex items-center gap-2 text-sm text-gray-800">
            <input type="checkbox" checked={useSharp5} onChange={(e) => setUseSharp5(e.target.checked)} />
            Use b6 instead of #5
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-800">
            <input type="checkbox" checked={useSharp4} onChange={(e) => setUseSharp4(e.target.checked)} />
            Use b5 instead of #4
          </label>
        </div>
        
        {/* Note Footprint Overlay Controls */}
        <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-2 items-center p-2 rounded border border-amber-200 bg-amber-50/40">
          <label className="flex items-center gap-2 text-sm text-gray-800">
            <input type="checkbox" checked={footprintEnabled} onChange={(e) => setFootprintEnabled(e.target.checked)} />
            Enable note footprint overlay
          </label>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700">Mode</span>
            <select className="border rounded px-2 py-1 text-sm" value={footprintMode} onChange={(e) => setFootprintMode(e.target.value as any)}>
              <option value="intervals">Intervals</option>
              <option value="notes">Note names</option>
              <option value="blank">Blank circles</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700">Name</span>
            <input className="border rounded px-2 py-1 text-sm w-32" value={footprintName} onChange={(e) => setFootprintName(e.target.value)} placeholder="e.g. Footprint" />
          </div>
        </div>
      </div>

      {/* Chord Overlay Controls */}
      <div className="mb-4 col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-5 gap-2 items-center p-2 rounded border border-rose-200 bg-rose-50/60">
        <label className="flex items-center gap-2 text-sm text-gray-800">
          <input type="checkbox" checked={chordOverlayEnabled} onChange={(e)=>setChordOverlayEnabled(e.target.checked)} />
          Enable chord overlay
        </label>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700">Type</span>
          <select className="border rounded px-2 py-1 text-sm" value={chordOverlayModeType} onChange={(e)=>setChordOverlayModeType(e.target.value as any)}>
            <option value="global">Global</option>
            <option value="segments">Segments</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700">Mode</span>
          <select className="border rounded px-2 py-1 text-sm" value={chordOverlayMode} onChange={(e)=>setChordOverlayMode(e.target.value as any)}>
            <option value="notes">Note names</option>
            <option value="intervals">Intervals</option>
            <option value="blank">Blank</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700">Root</span>
          <input className="border rounded px-2 py-1 text-sm w-16" value={chordOverlayRoot} onChange={(e)=>setChordOverlayRoot(e.target.value)} />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700">Name</span>
          <input className="border rounded px-2 py-1 text-sm w-40" value={chordOverlayName} onChange={(e)=>setChordOverlayName(e.target.value)} placeholder="e.g. A7" />
        </div>
        {chordOverlayModeType === 'global' && (
          <>
            <div className="flex items-center gap-2 md:col-span-2">
              <span className="text-sm text-gray-700">Chord notes (comma)</span>
              <input className="border rounded px-2 py-1 text-sm flex-1" value={chordOverlayNotesGlobal} onChange={(e)=>setChordOverlayNotesGlobal(e.target.value)} placeholder="e.g. A,C#,E,G" />
            </div>
            <div className="md:col-span-5 grid grid-cols-2 md:grid-cols-4 gap-2 items-center">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-700">Fret start</span>
                <input type="number" className="border rounded px-2 py-1 text-sm w-20" value={chordOverlayGlobalFretStart}
                  onChange={(e)=>setChordOverlayGlobalFretStart(Math.max(0, parseInt(e.target.value||'0',10)))} />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-700">Fret end</span>
                <input type="number" className="border rounded px-2 py-1 text-sm w-20" value={chordOverlayGlobalFretEnd}
                  onChange={(e)=>setChordOverlayGlobalFretEnd(Math.max(0, parseInt(e.target.value||`${fretCount}`,10)))} />
              </div>
            </div>
          </>
        )}
        {chordOverlayModeType === 'segments' && (
          <div className="md:col-span-5">
            <div className="text-sm font-medium text-gray-800 mb-1">Chord overlay segments</div>
            <div className="space-y-2">
              {chordOverlaySegments.map((seg, idx) => (
                <div key={idx} className="grid grid-cols-2 md:grid-cols-12 gap-2 items-center border border-rose-200 rounded p-2 bg-white">
                  <div className="col-span-1 md:col-span-2 flex items-center gap-1">
                    <span className="text-xs text-gray-600">Bars</span>
                    <input type="number" className="border rounded px-1 py-0.5 text-xs w-14" value={seg.startBar}
                      onChange={(e)=>{ const v = parseInt(e.target.value||'0',10); setChordOverlaySegments(prev=>prev.map((s,i)=>i===idx?{...s,startBar:Math.max(0,v)}:s)); }} />
                    <span className="text-xs">-</span>
                    <input type="number" className="border rounded px-1 py-0.5 text-xs w-14" value={seg.endBar}
                      onChange={(e)=>{ const v = parseInt(e.target.value||'0',10); setChordOverlaySegments(prev=>prev.map((s,i)=>i===idx?{...s,endBar:Math.max(0,v)}:s)); }} />
                  </div>
                  <div className="col-span-1 md:col-span-3 flex items-center gap-1">
                    <span className="text-xs text-gray-600">Name</span>
                    <input className="border rounded px-1 py-0.5 text-xs w-full" value={seg.name || ''}
                      onChange={(e)=>setChordOverlaySegments(prev=>prev.map((s,i)=>i===idx?{...s, name: e.target.value}:s))} />
                  </div>
                  <div className="col-span-1 md:col-span-3 flex items-center gap-1">
                    <span className="text-xs text-gray-600">Notes</span>
                    <input className="border rounded px-1 py-0.5 text-xs w-full" value={(seg.notes||[]).join(',')}
                      onChange={(e)=>{
                        const vals = e.target.value.split(',').map(s=>s.trim()).filter(Boolean);
                        setChordOverlaySegments(prev=>prev.map((s,i)=>i===idx?{...s,notes:vals}:s));
                      }} />
                  </div>
                  <div className="col-span-1 md:col-span-2 flex items-center gap-1">
                    <span className="text-xs text-gray-600">Mode</span>
                    <select className="border rounded px-1 py-0.5 text-xs" value={seg.mode || 'notes'}
                      onChange={(e)=>setChordOverlaySegments(prev=>prev.map((s,i)=>i===idx?{...s,mode:e.target.value as any}:s))}>
                      <option value="notes">Notes</option>
                      <option value="intervals">Intervals</option>
                      <option value="blank">Blank</option>
                    </select>
                  </div>
                  <div className="col-span-1 md:col-span-2 flex items-center gap-1">
                    <span className="text-xs text-gray-600">Frets</span>
                    <input type="number" className="border rounded px-1 py-0.5 text-xs w-14" value={seg.fretStart ?? 0}
                      onChange={(e)=>{ const v = parseInt(e.target.value||'0',10); setChordOverlaySegments(prev=>prev.map((s,i)=>i===idx?{...s,fretStart:Math.max(0,v)}:s)); }} />
                    <span className="text-xs">-</span>
                    <input type="number" className="border rounded px-1 py-0.5 text-xs w-14" value={seg.fretEnd ?? fretCount}
                      onChange={(e)=>{ const v = parseInt(e.target.value||`${fretCount}`,10); setChordOverlaySegments(prev=>prev.map((s,i)=>i===idx?{...s,fretEnd:Math.max(0,v)}:s)); }} />
                  </div>
                  <div className="col-span-1 md:col-span-2 flex items-center gap-1">
                    <span className="text-xs text-gray-600">Diagram</span>
                    <input type="number" className="border rounded px-1 py-0.5 text-xs w-14" value={seg.diagramFretStart ?? 0}
                      onChange={(e)=>{ const v = parseInt(e.target.value||'0',10); setChordOverlaySegments(prev=>prev.map((s,i)=>i===idx?{...s,diagramFretStart:Math.max(0,v)}:s)); }} />
                    <span className="text-xs">-</span>
                    <input type="number" className="border rounded px-1 py-0.5 text-xs w-14" value={seg.diagramFretEnd ?? fretCount}
                      onChange={(e)=>{ const v = parseInt(e.target.value||`${fretCount}`,10); setChordOverlaySegments(prev=>prev.map((s,i)=>i===idx?{...s,diagramFretEnd:Math.max(0,v)}:s)); }} />
                  </div>
                  <div className="col-span-1 md:col-span-2 flex justify-end">
                    <button className="text-xs px-2 py-1 bg-red-600 text-white rounded" onClick={()=>setChordOverlaySegments(prev=>prev.filter((_,i)=>i!==idx))}>Remove</button>
                  </div>
                </div>
              ))}
              <button className="text-xs px-2 py-1 bg-rose-700 text-white rounded"
                onClick={()=>setChordOverlaySegments(prev=>[...prev, { startBar: 0, endBar: 3, name: chordOverlayName, notes: chordOverlayNotesGlobal.split(',').map(s=>s.trim()).filter(Boolean), mode: chordOverlayMode, fretStart: 0, fretEnd: fretCount }])}
              >Add chord segment</button>
            </div>
          </div>
        )}
      </div>

      {/* Text Overlay Controls */}
      <div className="mb-4 col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-5 gap-2 items-center p-2 rounded border border-slate-200 bg-slate-50">
        <label className="flex items-center gap-2 text-sm text-gray-800">
          <input type="checkbox" checked={textOverlayEnabled} onChange={(e)=>setTextOverlayEnabled(e.target.checked)} />
          Enable text overlay (segments)
        </label>
        <div className="md:col-span-5">
          <div className="text-sm font-medium text-gray-800 mb-1">Text overlay segments</div>
          <div className="space-y-2">
            {textOverlaySegments.map((seg, idx) => (
              <div key={idx} className={`grid grid-cols-2 md:grid-cols-12 gap-2 items-center border rounded p-2 ${selectedTextSegIdx===idx? 'border-slate-400 bg-slate-50' : 'border-slate-200 bg-white'}`}>
                <div className="col-span-1 md:col-span-2 flex items-center gap-1">
                  <span className="text-xs text-gray-600">Bars</span>
                  <input type="number" className="border rounded px-1 py-0.5 text-xs w-14" value={seg.startBar}
                    onChange={(e)=>{ const v = parseInt(e.target.value||'0',10); setTextOverlaySegments(prev=>prev.map((s,i)=>i===idx?{...s,startBar:Math.max(0,v)}:s)); }} />
                  <span className="text-xs">-</span>
                  <input type="number" className="border rounded px-1 py-0.5 text-xs w-14" value={seg.endBar}
                    onChange={(e)=>{ const v = parseInt(e.target.value||'0',10); setTextOverlaySegments(prev=>prev.map((s,i)=>i===idx?{...s,endBar:Math.max(0,v)}:s)); }} />
                </div>
                <div className="col-span-1 md:col-span-4 flex items-center gap-1">
                  <span className="text-xs text-gray-600">Text</span>
                  <input className="border rounded px-1 py-0.5 text-xs w-full" value={seg.text}
                    onChange={(e)=>setTextOverlaySegments(prev=>prev.map((s,i)=>i===idx?{...s,text:e.target.value}:s))} placeholder="Plain text or @facebook-cover-universal.png" />
                </div>
                <div className="col-span-1 md:col-span-2 flex items-center gap-1">
                  <span className="text-xs text-gray-600">dx</span>
                  <input type="number" className="border rounded px-1 py-0.5 text-xs w-16" value={seg.dx ?? 0}
                    onChange={(e)=>{ const v = parseInt(e.target.value||'0',10); setTextOverlaySegments(prev=>prev.map((s,i)=>i===idx?{...s,dx:v}:s)); }} />
                  <span className="text-xs text-gray-600">dy</span>
                  <input type="number" className="border rounded px-1 py-0.5 text-xs w-16" value={seg.dy ?? 0}
                    onChange={(e)=>{ const v = parseInt(e.target.value||'0',10); setTextOverlaySegments(prev=>prev.map((s,i)=>i===idx?{...s,dy:v}:s)); }} />
                </div>
                <div className="col-span-1 md:col-span-2 flex items-center gap-1">
                  <span className="text-xs text-gray-600">Font</span>
                  <input type="number" className="border rounded px-1 py-0.5 text-xs w-16" value={seg.fontSize ?? 16}
                    onChange={(e)=>{ const v = parseInt(e.target.value||'16',10); setTextOverlaySegments(prev=>prev.map((s,i)=>i===idx?{...s,fontSize:v}:s)); }} />
                  <span className="text-xs text-gray-600">Anchor</span>
                  <select className="border rounded px-1 py-0.5 text-xs" value={seg.anchor || 'middle'}
                    onChange={(e)=>setTextOverlaySegments(prev=>prev.map((s,i)=>i===idx?{...s,anchor:e.target.value as any}:s))}>
                    <option value="start">Start</option>
                    <option value="middle">Middle</option>
                    <option value="end">End</option>
                  </select>
                  <span className="text-xs text-gray-600">V pos</span>
                  <select className="border rounded px-1 py-0.5 text-xs" value={(seg as any).vPos || 'middle'}
                    onChange={(e)=>setTextOverlaySegments(prev=>prev.map((s,i)=>i===idx?{...s,vPos:e.target.value as any}:s))}>
                    <option value="top">Top</option>
                    <option value="middle">Middle</option>
                    <option value="bottom">Bottom</option>
                  </select>
                </div>
                <div className="col-span-1 md:col-span-2 flex justify-end gap-2">
                  <button className={`text-xs px-2 py-1 rounded ${selectedTextSegIdx===idx?'bg-slate-700 text-white':'bg-slate-200 text-slate-700'}`} onClick={()=>setSelectedTextSegIdx(selectedTextSegIdx===idx?-1:idx)}>{selectedTextSegIdx===idx?'Unselect':'Select'}</button>
                  <button className="text-xs px-2 py-1 bg-red-600 text-white rounded" onClick={()=>setTextOverlaySegments(prev=>prev.filter((_,i)=>i!==idx))}>Remove</button>
                </div>
              </div>
            ))}
            <button className="text-xs px-2 py-1 bg-slate-700 text-white rounded"
              onClick={()=>setTextOverlaySegments(prev=>[...prev, { startBar: 0, endBar: 0, text: 'Your text', dx: 0, dy: 0, fontSize: 16, anchor: 'middle' }])}
            >Add text segment</button>
          </div>
        </div>
      </div>

      {/* Note Color Controls */}
      <div className="mb-4 col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-5 gap-2 items-center p-2 rounded border border-emerald-200 bg-emerald-50/60">
        <label className="flex items-center gap-2 text-sm text-gray-800">
          <input type="checkbox" checked={noteColorEnabled} onChange={(e)=>setNoteColorEnabled(e.target.checked)} />
          Enable note color overlay
        </label>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700">Quick presets</span>
          <button className="text-xs px-2 py-1 bg-emerald-700 text-white rounded"
            onClick={() => {
              // Color overlay root note in current overlayRoot for bars 0-3
              const root = overlayRoot || 'A';
              setNoteColorSegments(prev => [...prev, { startBar: 0, endBar: 3, notes: [root], color: '#ef4444', target: 'both' }]);
            }}>Root</button>
          <button className="text-xs px-2 py-1 bg-emerald-600 text-white rounded"
            onClick={() => {
              // Minor pentatonic from overlayRoot (0,3,5,7,10)
              const r = overlayRoot || 'A';
              const pent = [0,3,5,7,10].map(s => transpose(r, s));
              setNoteColorSegments(prev => [...prev, { startBar: 0, endBar: 3, notes: pent, color: '#f59e0b', target: 'overlay' }]);
            }}>Minor Pent from Root</button>
          <button className="text-xs px-2 py-1 bg-emerald-500 text-white rounded"
            onClick={() => {
              // Chord overlay notes if present
              const notes = (chordOverlayNotesGlobal || '').split(',').map(s=>s.trim()).filter(Boolean);
              if (notes.length === 0) return;
              setNoteColorSegments(prev => [...prev, { startBar: 0, endBar: 3, notes, color: '#10b981', target: 'active' }]);
            }}>Chord notes</button>
        </div>
        <div className="md:col-span-5">
          <div className="text-sm font-medium text-gray-800 mb-1">Note color segments</div>
          <div className="space-y-2">
            {noteColorSegments.map((seg, idx) => (
              <div key={idx} className="grid grid-cols-2 md:grid-cols-12 gap-2 items-center border border-emerald-200 rounded p-2 bg-white">
                <div className="col-span-1 md:col-span-2 flex items-center gap-1">
                  <span className="text-xs text-gray-600">Bars</span>
                  <input type="number" className="border rounded px-1 py-0.5 text-xs w-14" value={seg.startBar}
                    onChange={(e)=>{ const v = parseInt(e.target.value||'0',10); setNoteColorSegments(prev=>prev.map((s,i)=>i===idx?{...s,startBar:Math.max(0,v)}:s)); }} />
                  <span className="text-xs">-</span>
                  <input type="number" className="border rounded px-1 py-0.5 text-xs w-14" value={seg.endBar}
                    onChange={(e)=>{ const v = parseInt(e.target.value||'0',10); setNoteColorSegments(prev=>prev.map((s,i)=>i===idx?{...s,endBar:Math.max(0,v)}:s)); }} />
                </div>
                <div className="col-span-1 md:col-span-4 flex items-center gap-1">
                  <span className="text-xs text-gray-600">Notes</span>
                  <input className="border rounded px-1 py-0.5 text-xs w-full" value={(seg.notes||[]).join(',')}
                    onChange={(e)=>{ const vals = e.target.value.split(',').map(s=>s.trim()).filter(Boolean); setNoteColorSegments(prev=>prev.map((s,i)=>i===idx?{...s,notes:vals}:s)); }} />
                </div>
                <div className="col-span-1 md:col-span-2 flex items-center gap-1">
                  <span className="text-xs text-gray-600">Color</span>
                  <input type="color" className="w-6 h-6 p-0 border border-slate-300 rounded cursor-pointer"
                    value={/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(seg.color || '') ? seg.color : '#ef4444'}
                    onChange={(e)=>setNoteColorSegments(prev=>prev.map((s,i)=>i===idx?{...s,color:e.target.value}:s))}
                    title="Pick color" />
                  <input className="border rounded px-1 py-0.5 text-xs w-28" value={seg.color}
                    onChange={(e)=>setNoteColorSegments(prev=>prev.map((s,i)=>i===idx?{...s,color:e.target.value}:s))} placeholder="#ef4444" />
                  <div className="flex gap-1 ml-1 overflow-x-auto whitespace-nowrap">
                    {COLOR_PALETTE.map(c => (
                      <button key={c}
                        className="w-5 h-5 rounded border border-slate-300 shrink-0"
                        style={{ backgroundColor: c }}
                        title={c}
                        onClick={()=>setNoteColorSegments(prev=>prev.map((s,i)=>i===idx?{...s,color:c}:s))}
                      />
                    ))}
                  </div>
                </div>
                <div className="col-span-1 md:col-span-2 flex items-center gap-1">
                  <span className="text-xs text-gray-600">Target</span>
                  <select className="border rounded px-1 py-0.5 text-xs" value={seg.target || 'both'}
                    onChange={(e)=>setNoteColorSegments(prev=>prev.map((s,i)=>i===idx?{...s,target:e.target.value as any}:s))}>
                    <option value="active">Active</option>
                    <option value="overlay">Overlay</option>
                    <option value="both">Both</option>
                  </select>
                </div>
                <div className="col-span-1 md:col-span-2 flex justify-end">
                  <button className="text-xs px-2 py-1 bg-red-600 text-white rounded" onClick={()=>setNoteColorSegments(prev=>prev.filter((_,i)=>i!==idx))}>Remove</button>
                </div>
              </div>
            ))}
            <button className="text-xs px-2 py-1 bg-emerald-700 text-white rounded"
              onClick={()=>setNoteColorSegments(prev=>[...prev, { startBar: 0, endBar: 0, notes: ['A'], color: '#ef4444', target: 'both' }])}
            >Add note color segment</button>
          </div>
        </div>
      </div>

      {/* Backing track controls */}
      <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-3 items-center p-3 rounded border border-slate-200 bg-slate-50">
        <label className="flex items-center gap-2 text-sm text-gray-800">
          <input type="checkbox" checked={backingEnabled} onChange={(e) => setBackingEnabled(e.target.checked)} />
          Enable backing track (WAV/MP3) and mute AlphaTab audio
        </label>
        <div className="flex items-center gap-2">
          <input
            type="file"
            accept="audio/*"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (!f) return;
              const url = URL.createObjectURL(f);
              setBackingUrl((prev) => { try { if (prev?.startsWith('blob:')) URL.revokeObjectURL(prev); } catch {} return url; });
              setBackingFileName(f.name);
            }}
          />
          {backingFileName && (
            <span className="text-xs text-gray-600">Loaded: {backingFileName}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700">Backing volume</span>
          <input type="range" min={0} max={1} step={0.01} value={backingVolume} onChange={(e)=>setBackingVolume(parseFloat(e.target.value))} className="flex-1" />
          <span className="text-sm text-gray-700 w-10 text-right">{Math.round(backingVolume*100)}%</span>
        </div>
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 text-sm text-gray-800">
            <input type="checkbox" checked={muteAlphaTab} onChange={(e)=>setMuteAlphaTab(e.target.checked)} />
            Mute AlphaTab playback
          </label>
        </div>
      </div>

      {/* Hidden audio element for backing track */}
      <audio ref={backingAudioRef} src={backingEnabled ? backingUrl : undefined} preload="auto" />

      {availableTracks.length > 0 && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Track</label>
          <select
            value={trackIndex}
            onChange={(e) => setTrackIndex(parseInt(e.target.value, 10))}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            {availableTracks.map(t => (
              <option key={t.index} value={t.index}>{t.index}: {t.name}</option>
            ))}
          </select>
        </div>
      )}

      {/* Multi-diagram controls */}
      {availableTracks.length > 0 && (
        <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Number of diagrams</label>
            <select
              value={diagramCount}
              onChange={(e) => setDiagramCount(parseInt(e.target.value, 10))}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </select>
          </div>
          {diagramCount > 1 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Diagram 2 Track</label>
              <select
                value={secondaryTracks[0] ?? 1}
                onChange={(e) => setSecondaryTracks([parseInt(e.target.value, 10), secondaryTracks[1] ?? 2])}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                {availableTracks.map(t => (
                  <option key={t.index} value={t.index}>{t.index}: {t.name}</option>
                ))}
              </select>
            </div>
          )}
          {diagramCount > 2 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Diagram 3 Track</label>
              <select
                value={secondaryTracks[1] ?? 2}
                onChange={(e) => setSecondaryTracks([secondaryTracks[0] ?? 1, parseInt(e.target.value, 10)])}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                {availableTracks.map(t => (
                  <option key={t.index} value={t.index}>{t.index}: {t.name}</option>
                ))}
              </select>
            </div>
          )}
        </div>
      )}

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Exercise</label>
        <select
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
        >
          <optgroup label="Blues (A)">
            {bluesExercises.map(ex => (
              <option key={ex.id} value={ex.id}>{ex.name}</option>
            ))}
          </optgroup>
          <optgroup label="Songs">
            {miscSongs.map(ex => (
              <option key={ex.id} value={ex.id}>{ex.name}</option>
            ))}
          </optgroup>
          <optgroup label="Pentatonic (Am)">
            {pentatonicExercises.map(ex => (
              <option key={ex.id} value={ex.id}>{ex.name}</option>
            ))}
          </optgroup>
          <optgroup label="Arpeggios">
            {arpeggioExercises.map(ex => (
              <option key={ex.id} value={ex.id}>{ex.name}</option>
            ))}
          </optgroup>
        </select>
      </div>

      {/* Bar/Range root setters */}
      <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bar Roots (index:Root, comma-separated)</label>
          <input
            value={barRootInput}
            onChange={(e) => setBarRootInput(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          <label className="mt-2 inline-flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" checked={useBarRoots} onChange={(e) => setUseBarRoots(e.target.checked)} />
            Apply bar roots (otherwise chord track drives roots)
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Range Roots (start-end:Root, comma-separated)</label>
          <input
            value={rangeRootInput}
            onChange={(e) => setRangeRootInput(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
            placeholder="e.g. 0-3:A,4-5:D"
          />
        </div>
      </div>

      
    </div>
  );
}


