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
  const [useKeySigNames, setUseKeySigNames] = useState(true);

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
      { id: 'opeth-drapery-falls', name: 'Opeth - The Drapery Falls (ver 2)', file: '/GP Files/Scale Exercises/BLOG TABS/Opeth - The Drapery Falls (ver 2).gp' }
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

      <div className="mb-4 flex items-center gap-4">
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
          <input type="checkbox" checked={hideNotation} onChange={(e) => setHideNotation(e.target.checked)} />
          Hide tab/notation
        </label>
        {currentAutoRoot && (
          <span className="text-xs bg-amber-50 border border-amber-200 text-amber-800 px-2 py-1 rounded">
            Auto Root: {currentAutoRoot} (bar {currentBar + 1})
          </span>
        )}
      </div>

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

      <AnimatedFretboardGP
        filePath={selectedFile}
        trackIndex={trackIndex}
        fretCount={15}
        useTabStringOrder={false}
        showIntervals={showIntervals}
        barToRoot={useBarRoots ? parsedBarToRoot : undefined}
        initialTempoPercent={tempoPercent}
        accidentalStyle="mixed"
        autoRootFromChordTrackIndex={1}
        onRootChange={(r, bar) => { setCurrentAutoRoot(r); setCurrentBar(bar); }}
        hideNotation={hideNotation}
        useKeySignatureForNames={useKeySigNames}
        onTracksDetected={(tracks) => {
          setAvailableTracks(tracks);
          // keep selection if valid; otherwise default to 0
          setTrackIndex((prev) => (tracks.some(t => t.index === prev) ? prev : 0));
        }}
      />
    </div>
  );
}


