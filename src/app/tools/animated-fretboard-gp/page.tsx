'use client';

import React, { useMemo, useState } from 'react';
import AnimatedFretboardGP from '@/components/fretboard/AnimatedFretboardGP';

export default function AnimatedFretboardGPPage() {
  const [tempoPercent, setTempoPercent] = useState(100);
  const [selectedId, setSelectedId] = useState('blues-v2');
  const [showIntervals, setShowIntervals] = useState(true);
  const [currentAutoRoot, setCurrentAutoRoot] = useState<string | null>(null);
  const [currentBar, setCurrentBar] = useState<number>(0);
  const [hideNotation, setHideNotation] = useState(false);
  const [availableTracks, setAvailableTracks] = useState<{ index: number; name: string }[]>([]);
  const [trackIndex, setTrackIndex] = useState<number>(0);
  const [diagramCount, setDiagramCount] = useState<number>(1);
  const [secondaryTracks, setSecondaryTracks] = useState<number[]>([1,2]);
  const [useKeySigNames, setUseKeySigNames] = useState(true);
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
  // Text labels from GP (e.g. Shape 1)
  const [showTextLabels, setShowTextLabels] = useState<boolean>(true);
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
  const persistPresets = (items: Array<{name:string; data:any}>) => {
    setSavedPresets(items);
    try { window.localStorage.setItem('af_scale_overlay_presets', JSON.stringify(items)); } catch {}
  };

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
      { id: 'opeth-drapery-falls', name: 'Opeth - The Drapery Falls (ver 2)', file: '/GP Files/Scale Exercises/BLOG TABS/Opeth - The Drapery Falls (ver 2).gp' },
      { id: 'bends-ex1', name: 'String Bending Exercise 1', file: '/GP Files/Scale Exercises/BLOG TABS/STRING BENDING/STRING BENDING EXERCISE 1 .gp' },
      { id: 'meshuggah-dancers', name: 'Meshuggah - Dancers To A Discordant System (ver 3)', file: '/GP Files/Scale Exercises/BLOG TABS/Meshuggah - Dancers To A Discordant System (ver 3 by Stuart XIV).gp' },
      { id: 'morbid-angel-god-emptiness', name: 'Morbid Angel - God of Emptiness', file: '/GP Files/Scale Exercises/BLOG TABS/Morbid Angel - God Of Emptiness.gp3' },
      { id: 'am-pent-shapes', name: 'Am Pentatonic Shapes', file: '/GP Files/Scale Exercises/BLOG TABS/Am Pentatonic Shapes.gp' }
    ],
    []
  );

  const selectedFile = useMemo(() => {
    const p = pentatonicExercises.find(e => e.id === selectedId)?.file;
    const b = bluesExercises.find(e => e.id === selectedId)?.file;
    const m = miscSongs.find(e => e.id === selectedId)?.file;
    return m || b || p || bluesExercises[0].file;
  }, [pentatonicExercises, bluesExercises, miscSongs, selectedId]);

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

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2 text-gray-800">Animated Fretboard (Guitar Pro Driven)</h1>
      <p className="text-gray-700 mb-4">
        Loads a Guitar Pro file with AlphaTab, plays it back, and lights up a synchronized fretboard. Interval labels
        change per bar based on a configurable root map.
      </p>

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
          <select value={fretCount} onChange={(e) => setFretCount(parseInt(e.target.value, 10))} className="border border-gray-300 rounded-md px-2 py-1 text-sm">
            <option value={12}>12</option>
            <option value={15}>15</option>
            <option value={24}>24</option>
          </select>
        </div>
      </div>

      <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input type="checkbox" checked={showIntervals} onChange={(e) => setShowIntervals(e.target.checked)} />
          Show intervals (off = note names)
        </label>
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
                  if (typeof data.gpFile === 'string') {
                    const all = [...pentatonicExercises, ...bluesExercises, ...miscSongs];
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
                  if (typeof data.overlayEnabled === 'boolean') setOverlayEnabled(data.overlayEnabled);
                  if (typeof data.overlayMode === 'string') setOverlayMode(data.overlayMode);
                  if (typeof data.overlayRoot === 'string') setOverlayRoot(data.overlayRoot);
                  if (typeof data.overlayScale === 'string') setOverlayScale(data.overlayScale);
                  if (typeof data.overlayCustom === 'string') setOverlayCustom(data.overlayCustom);
                  if (typeof data.overlayName === 'string') setOverlayName(data.overlayName);
                  if (typeof data.overlayModeType === 'string') setOverlayModeType(data.overlayModeType);
                  if (typeof data.overlayGlobalFretStart === 'number') setOverlayGlobalFretStart(data.overlayGlobalFretStart);
                  if (typeof data.overlayGlobalFretEnd === 'number') setOverlayGlobalFretEnd(data.overlayGlobalFretEnd);
                  if (Array.isArray(data.overlaySegments)) setOverlaySegments(data.overlaySegments);
                  if (Array.isArray(data.overlaySegments)) setOverlaySegments(data.overlaySegments);
                  if (typeof data.gpFile === 'string') {
                    const all = [...pentatonicExercises, ...bluesExercises, ...miscSongs];
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
      </div>

      {(() => {
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
                    <div className="text-sm text-amber-100 mb-1">Diagram 1 — {trackIndex}: {trackNameByIndex(trackIndex)}</div>
                    <AnimatedFretboardGP
                      filePath={selectedFile}
                      trackIndex={trackIndex}
                      fretCount={fretCount}
                      useTabStringOrder={false}
                      showIntervals={showIntervals}
                      hideLabels={blankCircles}
                      showChordNames={showChordNames}
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
                      barToRoot={useBarRoots ? parsedBarToRoot : undefined}
                      initialTempoPercent={tempoPercent}
                      accidentalStyle="mixed"
                      autoRootFromChordTrackIndex={1}
                      onRootChange={(r, bar) => { setCurrentAutoRoot(r); setCurrentBar(bar); }}
                      hideNotation={hideNotation}
                      showTransport={false}
                      useKeySignatureForNames={useKeySigNames}
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
                <div className="text-sm text-amber-100 mb-1">Diagram 1 — {trackIndex}: {trackNameByIndex(trackIndex)}</div>
                <AnimatedFretboardGP
                  filePath={selectedFile}
                  trackIndex={trackIndex}
                  fretCount={fretCount}
                  useTabStringOrder={false}
                  showIntervals={showIntervals}
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
                  barToRoot={useBarRoots ? parsedBarToRoot : undefined}
                  initialTempoPercent={tempoPercent}
                  accidentalStyle="mixed"
                  autoRootFromChordTrackIndex={1}
                  onRootChange={(r, bar) => { setCurrentAutoRoot(r); setCurrentBar(bar); }}
                  hideNotation={hideNotation || diagramCount > 1}
                  showTransport={false}
                  useKeySignatureForNames={useKeySigNames}
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
                    <div className="text-sm text-amber-100 mb-1">Diagram 2 — {secondaryTracks[0] ?? 1}: {trackNameByIndex(secondaryTracks[0] ?? 1)}</div>
                    <AnimatedFretboardGP
                      filePath={selectedFile}
                      trackIndex={secondaryTracks[0] ?? 1}
                      fretCount={fretCount}
                      useTabStringOrder={false}
                      showIntervals={showIntervals}
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
                    />
                  </div>
                )}

                {diagramCount > 2 && (
                  <div className="mt-4">
                    <div className="text-sm text-amber-100 mb-1">Diagram 3 — {secondaryTracks[1] ?? 2}: {trackNameByIndex(secondaryTracks[1] ?? 2)}</div>
                    <AnimatedFretboardGP
                      filePath={selectedFile}
                      trackIndex={secondaryTracks[1] ?? 2}
                      fretCount={fretCount}
                      useTabStringOrder={false}
                      showIntervals={showIntervals}
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
                    />
                  </div>
                )}
              </>
            )}
            {/* Footer logo inside the frame */}
            <div className="mt-3 text-center text-amber-100 text-sm opacity-90">Mike Nelson Guitar Lessons</div>
          </div>
        );
      })()}

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


