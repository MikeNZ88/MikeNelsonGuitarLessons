'use client'

import React, { useState, useRef, useEffect } from 'react';
import {
  amberDarkTheme,
  plainLightTheme,
  cardAmberTheme,
  darkTheme,
} from '../../theme/chordRenderTheme';

// Utility: get note name for a given string index (0 = high E, 5 = low E)
// and absolute fret number (0 = open). Uses sharps by default.
const NOTE_NAMES_SHARP = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
// Open string semitone indices for standard tuning from high E to low E
const OPEN_STRING_SEMITONES = [4, 11, 7, 2, 9, 4]; // E, B, G, D, A, E
function getNoteNameForStringAndFret(stringIndex: number, fret: number): string {
  const open = OPEN_STRING_SEMITONES[stringIndex] ?? 0;
  const idx = (open + Math.max(0, fret)) % 12;
  return NOTE_NAMES_SHARP[idx];
}

interface ScaleData {
  name: string;
  rootFret: number;
  scaleNotes: Array<{ string: number; fret: number; isRoot: boolean; noteType: 'root' | 'scale' | 'blues'; color?: string }>;
  fretRange: [number, number]; // [startFret, endFret] - 5 fret range
  arrows?: Array<{ from: { string: number; fret: number }; to: { string: number; fret: number }; text?: string }>; // optional connections with text
  labels?: Array<{ notes: Array<{ string: number; fret: number }>; text: string }>; // grouped note labels
  caption?: string; // per-scale custom text
  arrowYOffset?: number; // perpendicular offset for arrows (px)
}

// Scale Editor Component Props
interface ScaleEditorProps {
  editingIndex: number | string | null;
  scales: (ScaleData | null)[];
  compareRows: Array<{ title: string; scales: (ScaleData | null)[] }>;
  compareMode: boolean;
  fretSpan: number; // 5 | 12 | 24
  includeOpenStrings: boolean;
  showNoteNames: boolean;
  onUpdateScale: (index: number, scale: ScaleData) => void;
  onUpdateCompareScale: (rowIndex: number, scaleIndex: number, scale: ScaleData) => void;
  onClose: () => void;
}

// Horizontal Scale Editor Component
const ScaleEditor: React.FC<ScaleEditorProps> = ({
  editingIndex,
  scales,
  compareRows,
  compareMode,
  fretSpan,
  includeOpenStrings,
  showNoteNames,
  onUpdateScale,
  onUpdateCompareScale,
  onClose
}) => {
  const [scaleName, setScaleName] = useState('');
  const [rootFret, setRootFret] = useState(3);
  const [scaleNotes, setScaleNotes] = useState<Array<{ string: number; fret: number; isRoot: boolean; noteType: 'root' | 'scale' | 'blues'; color?: string }>>([]);
  const [selectedNoteType, setSelectedNoteType] = useState<'root' | 'scale' | 'blues'>('scale');
  const [selectedColor, setSelectedColor] = useState<string>('#7C2D12'); // Default to dark amber
  const [arrowMode, setArrowMode] = useState<boolean>(false);
  const [pendingArrowStart, setPendingArrowStart] = useState<{ string: number; fret: number } | null>(null);
  const [arrows, setArrows] = useState<Array<{ from: { string: number; fret: number }; to: { string: number; fret: number }; text?: string }>>([]);
  const [labelMode, setLabelMode] = useState<boolean>(false);
  const [labels, setLabels] = useState<Array<{ notes: Array<{ string: number; fret: number }>; text: string }>>([]);
  const [labelSelection, setLabelSelection] = useState<Array<{ string: number; fret: number }>>([]);
  const [caption, setCaption] = useState<string>('');
  const [arrowYOffset, setArrowYOffset] = useState<number>(0);
  useEffect(() => {
    // Track colors used in diagrams so the legend editor can load them
    const collectColors = () => {
      const colors = new Set<string>();
      scales.forEach(scale => scale?.scaleNotes.forEach(n => n.color && colors.add(n.color)));
      try {
        localStorage.setItem('scaleDiagramUsedColors', JSON.stringify(Array.from(colors)));
      } catch {}
    };
    collectColors();
  }, [scales]);

  // Get current scale data
  const getCurrentScale = (): ScaleData | null => {
    if (typeof editingIndex === 'number') {
      return scales[editingIndex];
    } else if (typeof editingIndex === 'string') {
      const [rowIndex, scaleIndex] = editingIndex.split('-').map(Number);
      return compareRows[rowIndex]?.scales[scaleIndex] || null;
    }
    return null;
  };

  // Initialize editor with current scale data
  React.useEffect(() => {
    const currentScale = getCurrentScale();
    if (currentScale) {
      setScaleName(currentScale.name);
      setRootFret(currentScale.rootFret);
      setScaleNotes(currentScale.scaleNotes);
      setArrows(currentScale.arrows || []);
      setLabels(currentScale.labels || []);
      setLabelSelection([]);
      setCaption(currentScale.caption || '');
      setArrowYOffset(currentScale.arrowYOffset || 0);
    } else {
      setScaleName('Scale');
      setRootFret(3);
      setScaleNotes([]);
      setArrows([]);
      setLabels([]);
      setLabelSelection([]);
      setCaption('');
      setArrowYOffset(0);
    }
  }, [editingIndex]);

  // Calculate fret range based on root fret and selected span
  const startFretForRange = includeOpenStrings ? 0 : rootFret;
  const endFretForRange = includeOpenStrings
    ? startFretForRange + fretSpan // include 0..fretSpan (e.g., 0..12 or 0..24)
    : startFretForRange + (fretSpan - 1); // e.g., 1..12 or 1..24 length
  const fretRange: [number, number] = [startFretForRange, endFretForRange];

  // Handle fretboard click
  const handleFretboardClick = (string: number, fret: number) => {
    // Arrow tool: click tail then head on existing notes to toggle a connection
    if (arrowMode) {
      const clickedHasNote = scaleNotes.some(n => n.string === string && n.fret === fret);
      if (!clickedHasNote) return; // only operate on notes
      if (!pendingArrowStart) {
        setPendingArrowStart({ string, fret });
        return;
      }
      // Cancel if same as start
      if (pendingArrowStart.string === string && pendingArrowStart.fret === fret) {
        setPendingArrowStart(null);
        return;
      }
      // Toggle arrow existence between start and clicked
      const idx = arrows.findIndex(a =>
        (a.from.string === pendingArrowStart.string && a.from.fret === pendingArrowStart.fret && a.to.string === string && a.to.fret === fret) ||
        (a.to.string === pendingArrowStart.string && a.to.fret === pendingArrowStart.fret && a.from.string === string && a.from.fret === fret)
      );
      if (idx >= 0) {
        setArrows(prev => prev.filter((_, i) => i !== idx));
      } else {
        setArrows(prev => [...prev, { from: { ...pendingArrowStart }, to: { string, fret }, text: '' }]);
      }
      setPendingArrowStart(null);
      return;
    }
    // Label tool: toggle selection on existing notes only
    if (labelMode) {
      const clickedHasNote = scaleNotes.some(n => n.string === string && n.fret === fret);
      if (!clickedHasNote) return;
      const exists = labelSelection.some(n => n.string === string && n.fret === fret);
      if (exists) {
        setLabelSelection(prev => prev.filter(n => !(n.string === string && n.fret === fret)));
      } else {
        setLabelSelection(prev => [...prev, { string, fret }]);
      }
      return;
    }
    const noteIndex = scaleNotes.findIndex(note => note.string === string && note.fret === fret);
    
    if (noteIndex >= 0) {
      // Remove note if it exists
      setScaleNotes(scaleNotes.filter((_, index) => index !== noteIndex));
      // Remove any arrows attached to this note
      setArrows(prev => prev.filter(a => !(
        (a.from.string === string && a.from.fret === fret) ||
        (a.to.string === string && a.to.fret === fret)
      )));
      // Also remove from any labels
      setLabels(prev => prev.map(l => ({
        ...l,
        notes: l.notes.filter(n => !(n.string === string && n.fret === fret))
      })).filter(l => l.notes.length > 0));
      // If selected for label, unselect
      setLabelSelection(prev => prev.filter(n => !(n.string === string && n.fret === fret)));
    } else {
      // Add new note
      const newNote = {
        string,
        fret,
        isRoot: selectedNoteType === 'root',
        noteType: selectedNoteType,
        color: selectedColor
      };
      setScaleNotes([...scaleNotes, newNote]);
    }
  };

  // Save scale
  const saveScale = () => {
    const scaleData: ScaleData = {
      name: scaleName,
      rootFret,
      scaleNotes,
      fretRange,
      arrows,
      labels,
      caption,
      arrowYOffset
    };

    if (typeof editingIndex === 'number') {
      onUpdateScale(editingIndex, scaleData);
    } else if (typeof editingIndex === 'string') {
      const [rowIndex, scaleIndex] = editingIndex.split('-').map(Number);
      onUpdateCompareScale(rowIndex, scaleIndex, scaleData);
    }
    onClose();
  };

  // Clear all notes
  const clearAllNotes = () => {
    setScaleNotes([]);
    setArrows([]);
    setLabels([]);
    setLabelSelection([]);
    setCaption('');
  };

  // Render horizontal fretboard
  const renderHorizontalFretboard = () => {
    const strings = ['E', 'B', 'G', 'D', 'A', 'E']; // High E to Low E
    const startFret = includeOpenStrings ? 0 : rootFret;
    const totalColumns = fretSpan + (includeOpenStrings ? 1 : 0); // add 0 column if included
    const frets = Array.from({ length: totalColumns }, (_, i) => startFret + i);

    return (
      <div className="bg-gray-700 rounded-lg p-6 mb-6">
        <div className="relative">
          {/* String labels */}
          <div className="absolute left-0 top-0 flex flex-col justify-between h-full py-4">
            {strings.map((string, stringIndex) => (
              <div key={string} className="text-sm font-bold text-gray-300 w-6 text-center">
                {string}
              </div>
            ))}
          </div>

          {/* Fretboard */}
          <div className="ml-8 relative">
            {/* Fret numbers */}
            <div className="flex justify-between mb-2">
              {frets.map(fret => (
                <div key={fret} className="text-xs text-gray-400 text-center w-16">
                  {fret}
                </div>
              ))}
            </div>

            {/* Strings and frets */}
            <div className="space-y-4">
              {strings.map((string, stringIndex) => (
                <div key={string} className="flex items-center relative">
                  {/* String line */}
                  <div className="absolute inset-0 bg-gray-500 h-0.5 z-0"></div>
                  
                  {/* Fret positions */}
                  <div className="flex justify-between w-full relative z-10">
                    {frets.map((fret, fretIndex) => {
                      const hasNote = scaleNotes.find(note => 
                        note.string === stringIndex && note.fret === fret
                      );
                      const isPending = arrowMode && pendingArrowStart && pendingArrowStart.string === stringIndex && pendingArrowStart.fret === fret;
                      const isConnected = arrows.some(a => (
                        (a.from.string === stringIndex && a.from.fret === fret) ||
                        (a.to.string === stringIndex && a.to.fret === fret)
                      ));
                      const isSelectedForLabel = labelMode && labelSelection.some(n => n.string === stringIndex && n.fret === fret);
                      
                      return (
                        <div key={fret} className="relative">
                          <button
                            onClick={() => handleFretboardClick(stringIndex, fret)}
                            className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                              hasNote
                                ? 'border-gray-300 text-white'
                                : 'bg-gray-600 border-gray-500 hover:bg-gray-500'
                            } ${isPending ? 'ring-2 ring-blue-400' : ''} ${isConnected ? 'ring-2 ring-amber-400' : ''} ${isSelectedForLabel ? 'ring-2 ring-purple-400' : ''}`}
                            style={hasNote ? { backgroundColor: hasNote.color || '#7C2D12' } : {}}
                          >
                            {hasNote && (
                              <span className="text-[10px] font-bold">
                                {showNoteNames
                                  ? getNoteNameForStringAndFret(stringIndex, fret)
                                  : (hasNote.noteType === 'root' ? '●' : hasNote.noteType === 'blues' ? '♭' : '●')}
                              </span>
                            )}
                          </button>
                          
                          {/* Fret line */}
                          {fretIndex < frets.length - 1 && (
                            <div className="absolute left-8 top-0 w-8 h-8 border-r border-gray-600"></div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Arrow list for feedback and management */}
        {arrows.length > 0 && (
          <div className="mt-3 text-sm text-gray-200">
            <div className="font-semibold mb-1">Arrows</div>
            <ul className="space-y-1">
              {arrows.map((a, i) => (
                <li key={`${a.from.string}-${a.from.fret}-${a.to.string}-${a.to.fret}-${i}`} className="flex items-center gap-2">
                  <span>
                    {getNoteNameForStringAndFret(a.from.string, a.from.fret)} {a.from.string}/{a.from.fret} → {getNoteNameForStringAndFret(a.to.string, a.to.fret)} {a.to.string}/{a.to.fret}
                  </span>
                  <input
                    type="text"
                    value={a.text || ''}
                    onChange={(e) => {
                      const newArrows = [...arrows];
                      newArrows[i] = { ...newArrows[i], text: e.target.value };
                      setArrows(newArrows);
                    }}
                    placeholder="+ 3 frets"
                    className="px-2 py-0.5 text-xs bg-gray-700 border border-gray-600 rounded text-white w-24"
                  />
                  <button
                    onClick={() => setArrows(prev => prev.filter((_, idx) => idx !== i))}
                    className="px-2 py-0.5 text-xs bg-gray-700 hover:bg-gray-600 rounded"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Labels controls and list */}
        <div className="mt-6 text-sm text-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <button
              onClick={() => { setLabelMode(v => !v); if (!labelMode) setLabelSelection([]); }}
              className={`px-3 py-1.5 rounded ${labelMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-700 hover:bg-gray-600'} text-white`}
              title="Label tool: click multiple existing notes to select a group"
            >
              {labelMode ? 'Label Mode: ON' : 'Label Mode'}
            </button>
            <button
              onClick={() => setLabelSelection([])}
              className="px-3 py-1.5 rounded bg-gray-700 hover:bg-gray-600"
            >
              Clear Selection
            </button>
            <button
              onClick={() => {
                if (labelSelection.length === 0) return;
                // Deduplicate
                const key = (n: {string:number; fret:number}) => `${n.string}-${n.fret}`;
                const unique = Array.from(new Map(labelSelection.map(n => [key(n), n])).values());
                setLabels(prev => [...prev, { notes: unique, text: 'Label' }]);
                setLabelSelection([]);
              }}
              className="px-3 py-1.5 rounded bg-purple-700 hover:bg-purple-600 text-white"
            >
              Add Label
            </button>
          </div>
          {labels.length > 0 && (
            <div>
              <div className="font-semibold mb-1">Labels</div>
              <ul className="space-y-1">
                {labels.map((l, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-gray-400">{l.notes.length} notes</span>
                    <input
                      type="text"
                      value={l.text}
                      onChange={(e) => {
                        const newLabels = [...labels];
                        newLabels[i] = { ...newLabels[i], text: e.target.value };
                        setLabels(newLabels);
                      }}
                      className="px-2 py-0.5 text-xs bg-gray-700 border border-gray-600 rounded text-white w-40"
                      placeholder="Shape 1"
                    />
                    <button
                      onClick={() => setLabels(prev => prev.filter((_, idx) => idx !== i))}
                      className="px-2 py-0.5 text-xs bg-gray-700 hover:bg-gray-600 rounded"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Scale Controls */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Scale Name
          </label>
          <input
            type="text"
            value={scaleName}
            onChange={(e) => setScaleName(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
            placeholder="Enter scale name"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Root Fret (Start Position)
          </label>
          <select
            value={rootFret}
            onChange={(e) => setRootFret(Number(e.target.value))}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
          >
            {Array.from({ length: 20 }, (_, i) => i + 1).map(fret => (
              <option key={fret} value={fret}>Fret {fret}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Note Type
          </label>
          <select
            value={selectedNoteType}
            onChange={(e) => setSelectedNoteType(e.target.value as 'root' | 'scale' | 'blues')}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
          >
            <option value="root">Root Note</option>
            <option value="scale">Scale Note</option>
            <option value="blues">Blues Note</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Note Color
          </label>
          <div className="flex flex-wrap gap-2">
            {[
              // Ambers
              { color: '#7C2D12', name: 'Dark Amber' },
              { color: '#92400E', name: 'Amber 800' },
              { color: '#A16207', name: 'Amber 600' },
              { color: '#F59E0B', name: 'Amber 500' },
              // Reds/Pinks
              { color: '#DC2626', name: 'Red 600' },
              { color: '#EF4444', name: 'Red 500' },
              { color: '#DB2777', name: 'Pink 600' },
              { color: '#EC4899', name: 'Pink 500' },
              // Oranges/Yellows
              { color: '#EA580C', name: 'Orange 600' },
              { color: '#F97316', name: 'Orange 500' },
              { color: '#CA8A04', name: 'Yellow 600' },
              { color: '#EAB308', name: 'Yellow 500' },
              // Greens
              { color: '#16A34A', name: 'Green 600' },
              { color: '#22C55E', name: 'Green 500' },
              { color: '#059669', name: 'Emerald 600' },
              { color: '#10B981', name: 'Emerald 500' },
              // Blues/Teals
              { color: '#0EA5E9', name: 'Sky 500' },
              { color: '#06B6D4', name: 'Cyan 500' },
              { color: '#2563EB', name: 'Blue 600' },
              { color: '#3B82F6', name: 'Blue 500' },
              // Purples
              { color: '#7C3AED', name: 'Violet 600' },
              { color: '#8B5CF6', name: 'Violet 500' },
              { color: '#9333EA', name: 'Purple 600' },
              { color: '#A855F7', name: 'Purple 500' },
              // Neutrals (dark only for contrast with white labels)
              { color: '#111827', name: 'Gray 900' },
              { color: '#374151', name: 'Gray 700' },
            ].map(({ color, name }) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                  selectedColor === color 
                    ? 'border-white ring-2 ring-amber-400' 
                    : 'border-gray-400 hover:border-white'
                }`}
                style={{ backgroundColor: color }}
                title={name}
              />
            ))}
            <label className="ml-2 inline-flex items-center gap-2 text-xs text-gray-300">
              <span>Custom:</span>
              <input
                type="color"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="w-8 h-8 p-0 bg-transparent border border-gray-500 rounded"
                title="Pick any color"
              />
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Caption (per-scale)
          </label>
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="e.g., Shape 1 notes, or guidance"
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white"
          />
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4">
        <h3 className="text-blue-300 font-semibold mb-2">How to Use:</h3>
        <ul className="text-blue-200 text-sm space-y-1">
          <li>• Click on the fretboard to place/remove scale notes</li>
          <li>• Select note type and color before clicking to place notes</li>
          <li>• Use different colors to distinguish note functions (roots, chord tones, etc.)</li>
          <li>• The diagram covers a 5-fret range starting from your chosen root fret</li>
        </ul>
      </div>

      {/* Horizontal Fretboard */}
      {renderHorizontalFretboard()}

      {/* Action Buttons */}
      <div className="flex justify-between">
        <div className="space-x-3">
          <button
            onClick={clearAllNotes}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
          >
            Clear All Notes
          </button>
          <button
            onClick={() => setArrows([])}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded"
            title="Remove all arrows"
          >
            Clear Arrows
          </button>
          <div className="inline-flex items-center gap-2 ml-2">
            <span className="text-sm text-gray-300">Arrows Y offset:</span>
            <button onClick={() => setArrowYOffset(v => v - 5)} className="px-2 py-1 text-xs rounded bg-gray-700 hover:bg-gray-600">-</button>
            <span className="text-xs text-gray-400 w-10 text-center">{arrowYOffset}px</span>
            <button onClick={() => setArrowYOffset(v => v + 5)} className="px-2 py-1 text-xs rounded bg-gray-700 hover:bg-gray-600">+</button>
            <button onClick={() => setArrowYOffset(0)} className="px-2 py-1 text-xs rounded bg-gray-700 hover:bg-gray-600">Reset</button>
          </div>
        </div>
        
        <div className="space-x-3">
          <button
            onClick={() => { setArrowMode(v => !v); setPendingArrowStart(null); }}
            className={`px-4 py-2 rounded ${arrowMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 hover:bg-gray-700'} text-white`}
            title="Arrow tool: click tail note, then head note"
          >
            {arrowMode ? 'Arrow Mode: ON' : 'Arrow Mode'}
          </button>
          <button
            onClick={() => { setLabelMode(v => !v); if (!labelMode) setLabelSelection([]); }}
            className={`px-4 py-2 rounded ${labelMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-700 hover:bg-gray-600'} text-white`}
            title="Label tool: click multiple existing notes to select a group"
          >
            {labelMode ? 'Label Mode: ON' : 'Label Mode'}
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded"
          >
            Cancel
          </button>
          <button
            onClick={saveScale}
            className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded font-semibold"
          >
            Save Scale
          </button>
        </div>
      </div>
    </div>
  );
};

const ScaleDiagramBuilder: React.FC = () => {
  const [gridSize, setGridSize] = useState<number>(4);
  const [progressionTitle, setProgressionTitle] = useState<string>('My Scale Progression');
  const [scales, setScales] = useState<(ScaleData | null)[]>(Array(4).fill(null));
  const [editingIndex, setEditingIndex] = useState<number | string | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [compareMode, setCompareMode] = useState(false);
  const [compareRowSize, setCompareRowSize] = useState(4);
  const [customText, setCustomText] = useState('');
  const [compareSubtitle, setCompareSubtitle] = useState<string[]>(['', '', '', '']); // Subtitle with 4 scale slots
  const [compareRows, setCompareRows] = useState<Array<{
    title: string;
    scales: (ScaleData | null)[];
  }>>([
    { title: 'Position 1', scales: Array(4).fill(null) },
    { title: 'Position 2', scales: Array(4).fill(null) }
  ]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fretSpan, setFretSpan] = useState<number>(5); // 5, 12, 24
  const [includeOpenStrings, setIncludeOpenStrings] = useState<boolean>(false);
  const [showNoteNames, setShowNoteNames] = useState<boolean>(false);
  const [copiedScale, setCopiedScale] = useState<ScaleData | null>(null);
  const [stackedLayout, setStackedLayout] = useState<boolean>(false);
  const [squareExport, setSquareExport] = useState<boolean>(false);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  type ThemeKey = 'amber' | 'light' | 'cardAmber' | 'dark';
  const [theme, setTheme] = useState<ThemeKey>('amber');
  const THEME = (() => {
    switch (theme) {
      case 'light':
        return plainLightTheme;
      case 'cardAmber':
        return cardAmberTheme;
      case 'dark':
        return darkTheme;
      case 'amber':
      default:
        return amberDarkTheme;
    }
  })();
  
  // Global shrink/scale factor for all text (user-controlled)
  const [textScale, setTextScale] = useState<number>(1.0); // 1.0 = 100%
  const scaleSize = (size: number) => Math.max(8, Math.round(size * textScale));
  // User-controlled vertical offset for custom text (pixels)
  const [customTextYOffset, setCustomTextYOffset] = useState<number>(0);
  // Bold toggle for custom text
  const [customTextBold, setCustomTextBold] = useState<boolean>(false);
  // Horizontal offset for all grouped labels (px)
  const [labelsXOffset, setLabelsXOffset] = useState<number>(0);

  // Initialize empty scale
  const createEmptyScale = (): ScaleData => ({
    name: 'Scale',
    rootFret: 3,
    scaleNotes: [],
    fretRange: [3, 7] // Default 5-fret range starting at fret 3
  });

  // Handle grid size change
  const handleGridSizeChange = (newSize: number) => {
    setGridSize(newSize);
    const newScales = Array(newSize).fill(null);
    // Copy existing scales if they fit
    for (let i = 0; i < Math.min(scales.length, newSize); i++) {
      newScales[i] = scales[i];
    }
    setScales(newScales);
    setEditingIndex(null);
  };

  // Start editing a scale
  const startEditing = (index: number) => {
    if (!scales[index]) {
      const newScales = [...scales];
      newScales[index] = createEmptyScale();
      setScales(newScales);
    }
    setEditingIndex(index);
  };

  // Update scale data
  const updateScale = (index: number, scale: ScaleData) => {
    const newScales = [...scales];
    newScales[index] = scale;
    setScales(newScales);
  };

  // Copy/Paste helpers
  const cloneScale = (s: ScaleData): ScaleData => JSON.parse(JSON.stringify(s));
  const copyScale = (s: ScaleData | null) => {
    if (!s) return;
    setCopiedScale(cloneScale(s));
  };
  const pasteScale = (index: number) => {
    if (!copiedScale) return;
    updateScale(index, cloneScale(copiedScale));
  };
  const pasteCompareScale = (rowIndex: number, scaleIndex: number) => {
    if (!copiedScale) return;
    updateCompareRow(rowIndex, scaleIndex, cloneScale(copiedScale));
  };

  // Clear a scale
  const clearScale = (index: number) => {
    const newScales = [...scales];
    newScales[index] = null;
    setScales(newScales);
    setEditingIndex(null);
  };

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverIndex(index);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const newScales = [...scales];
    const draggedScale = newScales[draggedIndex];
    newScales[draggedIndex] = newScales[dropIndex];
    newScales[dropIndex] = draggedScale;
    
    setScales(newScales);
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  // Save/Load functionality
  const saveProgression = () => {
    const progressionData = {
      title: progressionTitle,
      gridSize,
      scales,
      compareMode,
      compareRowSize,
      compareRows,
      compareSubtitle,
      customText,
      // UI settings to persist
      includeOpenStrings,
      fretSpan,
      showNoteNames,
      stackedLayout,
      squareExport,
      theme,
      textScale,
      customTextYOffset,
      customTextBold,
      labelsXOffset,
      legend: (() => {
        try {
          const raw = localStorage.getItem('scaleLegend');
          if (raw) return JSON.parse(raw);
        } catch {}
        return [] as Array<{ id?: string; label: string; color: string }>;
      })(),
      savedAt: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(progressionData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const filename = `${progressionTitle.replace(/\s+/g, '_')}_scales.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', filename);
    linkElement.click();
  };

  const loadProgression = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const result = e.target?.result as string;
        const progressionData = JSON.parse(result);
        
        // Validate the data structure
        if (progressionData.title && progressionData.scales && progressionData.gridSize) {
          setProgressionTitle(progressionData.title);
          setGridSize(progressionData.gridSize);
          setScales(progressionData.scales);
          if (progressionData.compareMode !== undefined) {
            setCompareMode(progressionData.compareMode);
          }
          if (progressionData.compareRows) {
            setCompareRows(progressionData.compareRows);
          }
          if (progressionData.compareRowSize !== undefined) {
            setCompareRowSize(progressionData.compareRowSize);
          }
          if (progressionData.customText) {
            setCustomText(progressionData.customText);
          }
          // Restore UI settings when present
          if (typeof progressionData.includeOpenStrings === 'boolean') setIncludeOpenStrings(progressionData.includeOpenStrings);
          if (typeof progressionData.fretSpan === 'number') setFretSpan(progressionData.fretSpan);
          if (typeof progressionData.showNoteNames === 'boolean') setShowNoteNames(progressionData.showNoteNames);
          if (typeof progressionData.stackedLayout === 'boolean') setStackedLayout(progressionData.stackedLayout);
          if (typeof progressionData.squareExport === 'boolean') setSquareExport(progressionData.squareExport);
          if (typeof progressionData.theme === 'string') setTheme(progressionData.theme as ThemeKey);
          if (typeof progressionData.textScale === 'number') setTextScale(progressionData.textScale);
          if (typeof progressionData.customTextYOffset === 'number') setCustomTextYOffset(progressionData.customTextYOffset);
          if (typeof progressionData.customTextBold === 'boolean') setCustomTextBold(progressionData.customTextBold);
          if (typeof progressionData.labelsXOffset === 'number') setLabelsXOffset(progressionData.labelsXOffset);
          if (progressionData.compareSubtitle) {
            setCompareSubtitle(progressionData.compareSubtitle);
          }
          if (progressionData.legend) {
            try {
              localStorage.setItem('scaleLegend', JSON.stringify(progressionData.legend));
            } catch {}
          }
          
          // Update scale array size if needed
          const targetSize = compareMode ? compareRowSize : progressionData.gridSize;
          if (scales.length !== targetSize) {
            const newScales = Array(targetSize).fill(null);
            for (let i = 0; i < Math.min(progressionData.scales.length, targetSize); i++) {
              newScales[i] = progressionData.scales[i];
            }
            setScales(newScales);
          }
          
          setEditingIndex(null);
          
          // Clear the file input
          event.target.value = '';
        } else {
          alert('Invalid scale progression file format');
        }
      } catch (error) {
        alert('Error reading scale progression file');
        console.error('Error parsing JSON:', error);
      }
    };
    reader.readAsText(file);
  };

  const createNewProgression = () => {
    if (scales.some(scale => scale !== null) || (compareMode && compareRows.some(row => row.scales.some(scale => scale !== null)))) {
      const confirmed = confirm('This will clear your current progression. Continue?');
      if (!confirmed) return;
    }
    
    setProgressionTitle('My Scale Progression');
    setGridSize(4);
    setScales(Array(4).fill(null));
    setCompareRows([
      { title: 'Position 1', scales: Array(compareRowSize).fill(null) },
      { title: 'Position 2', scales: Array(compareRowSize).fill(null) }
    ]);
    setCustomText('');
    setCompareSubtitle(['', '', '', '']);
    // Reset UI settings
    setIncludeOpenStrings(false);
    setFretSpan(5);
    setShowNoteNames(false);
    setStackedLayout(false);
    setSquareExport(false);
    setTextScale(1.0);
    setCustomTextYOffset(0);
    setCustomTextBold(false);
    setEditingIndex(null);
  };

  // Compare mode functions
  const toggleCompareMode = () => {
    setCompareMode(!compareMode);
    setEditingIndex(null);
  };

  const updateCompareRow = (rowIndex: number, scaleIndex: number, scale: ScaleData) => {
    const newRows = [...compareRows];
    if (!newRows[rowIndex].scales[scaleIndex]) {
      newRows[rowIndex].scales[scaleIndex] = scale;
    } else {
      newRows[rowIndex].scales[scaleIndex] = scale;
    }
    setCompareRows(newRows);
  };

  const updateCompareRowTitle = (rowIndex: number, title: string) => {
    const newRows = [...compareRows];
    newRows[rowIndex].title = title;
    setCompareRows(newRows);
  };

  const addCompareRow = () => {
    setCompareRows([...compareRows, { 
      title: `Position ${compareRows.length + 1}`, 
      scales: Array(compareRowSize).fill(null) 
    }]);
  };

  const removeCompareRow = (rowIndex: number) => {
    if (compareRows.length > 1) {
      const newRows = compareRows.filter((_, index) => index !== rowIndex);
      setCompareRows(newRows);
    }
  };

  const clearCompareScale = (rowIndex: number, scaleIndex: number) => {
    const newRows = [...compareRows];
    newRows[rowIndex].scales[scaleIndex] = null;
    setCompareRows(newRows);
    setEditingIndex(null);
  };

  const updateCompareRowSize = (newSize: number) => {
    setCompareRowSize(newSize);
    const newRows = compareRows.map(row => {
      const newScales = Array(newSize).fill(null);
      for (let i = 0; i < Math.min(row.scales.length, newSize); i++) {
        newScales[i] = row.scales[i];
      }
      return { ...row, scales: newScales };
    });
    setCompareRows(newRows);
  };

  // Draw custom text with inline bold support using **bold** markers and whole-block bold toggle
  const drawCustomText = (
    ctx: CanvasRenderingContext2D,
    text: string,
    xCenter: number,
    yTop: number,
    maxWidth: number,
    lineHeight: number
  ) => {
    const normalizeSegments = (raw: string): Array<{ text: string; bold: boolean }> => {
      // Split on **...** while keeping delimiters
      const parts = raw.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
      const segments: Array<{ text: string; bold: boolean }> = [];
      for (const part of parts) {
        if (part.startsWith('**') && part.endsWith('**')) {
          const inner = part.slice(2, -2);
          segments.push({ text: inner, bold: true });
        } else {
          segments.push({ text: part, bold: false });
        }
      }
      return segments;
    };

    // Convert segments into tokens (words and spaces) carrying bold flag
    const toTokens = (segments: Array<{ text: string; bold: boolean }>) => {
      const tokens: Array<{ text: string; bold: boolean }> = [];
      for (const seg of segments) {
        const pieces = seg.text.split(/(\s+)/g).filter(s => s.length > 0);
        for (const p of pieces) tokens.push({ text: p, bold: customTextBold ? true : seg.bold });
      }
      return tokens;
    };

    const segments = normalizeSegments(text);
    const tokens = toTokens(segments);

    // Build lines by measuring token widths with appropriate font weight
    const lines: Array<Array<{ text: string; bold: boolean; width: number }>> = [];
    let currentLine: Array<{ text: string; bold: boolean; width: number }> = [];
    let currentWidth = 0;

    const measureToken = (tok: { text: string; bold: boolean }) => {
      const prevFont = ctx.font;
      // Apply bold if needed while keeping current font size/family
      const fontDeclaration = prevFont.replace(/^(bold\s+)?/, tok.bold ? 'bold ' : '');
      ctx.font = fontDeclaration;
      const w = ctx.measureText(tok.text).width;
      ctx.font = prevFont; // restore
      return w;
    };

    tokens.forEach((tok) => {
      const width = measureToken(tok);
      const isOnlySpace = /^\s+$/.test(tok.text);
      if (currentWidth + width > maxWidth && currentLine.length > 0 && !isOnlySpace) {
        lines.push(currentLine);
        currentLine = [{ text: tok.text, bold: tok.bold, width }];
        currentWidth = width;
      } else {
        currentLine.push({ text: tok.text, bold: tok.bold, width });
        currentWidth += width;
      }
    });
    if (currentLine.length > 0) lines.push(currentLine);

    // Draw centered: compute each line width to position from center
    let y = yTop;
    lines.forEach((line) => {
      const lineWidth = line.reduce((sum, t) => sum + t.width, 0);
      let cursorX = xCenter - lineWidth / 2;
      line.forEach((t) => {
        const prevFont = ctx.font;
        const fontDeclaration = prevFont.replace(/^(bold\s+)?/, t.bold ? 'bold ' : '');
        ctx.font = fontDeclaration;
        ctx.textAlign = 'left';
        ctx.fillText(t.text, cursorX, y);
        cursorX += t.width;
        ctx.font = prevFont;
      });
      y += lineHeight;
    });

    return lines.length * lineHeight + 20;
  };

  // Draw horizontal scale diagram
  const drawScaleDiagram = (ctx: CanvasRenderingContext2D, scale: ScaleData, x: number, y: number, width: number, height: number) => {
    const strings = ['E', 'B', 'G', 'D', 'A', 'E']; // High E to Low E
    const numColumns = fretSpan + (includeOpenStrings ? 1 : 0);
    const startFret = includeOpenStrings ? 0 : scale.rootFret;
    const frets = Array.from({ length: numColumns }, (_, i) => startFret + i);
    
    // Calculate dimensions with tighter fit
    const stringSpacing = height / 7; // 6 strings + minimal spacing
    const fretSpacing = width / (numColumns + 1); // columns + margins
    const startY = y + stringSpacing * 1.8; // More room for scale name
    const startX = x + fretSpacing * 0.2; // Less margin
    const diagramWidth = fretSpacing * (numColumns + 0.6); // Use more available width
    
    // Draw scale name closer to its own diagram to avoid overlapping the diagram above
    ctx.font = `bold italic ${scaleSize(24)}px "Poppins", "Nunito", "Circular", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`;
    ctx.fillStyle = THEME.colors.title;
    ctx.textAlign = 'center';
    ctx.fillText(scale.name, x + width / 2, y - 2);
    
    // Draw fret numbers
    ctx.font = `bold ${scaleSize(16)}px "Poppins", "Nunito", "Circular", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`;
    ctx.fillStyle = THEME.colors.title;
    ctx.textAlign = 'center';
    frets.forEach((fret, fretIndex) => {
      const fretX = startX + (fretIndex + 0.5) * (diagramWidth / numColumns); // Center in fret space
      ctx.fillText(fret.toString(), fretX, startY - 15); // Moved higher
    });
    
    // Draw string labels
    ctx.font = `bold ${scaleSize(16)}px "Poppins", "Nunito", "Circular", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`;
    ctx.fillStyle = THEME.colors.title;
    ctx.textAlign = 'center';
    strings.forEach((string, stringIndex) => {
      const stringY = startY + stringIndex * stringSpacing;
      ctx.fillText(string, startX - 20, stringY + 5);
    });
    
    // Draw strings (horizontal lines)
    ctx.strokeStyle = THEME.colors.gridStroke;
    ctx.lineWidth = 2;
    strings.forEach((_, stringIndex) => {
      const stringY = startY + stringIndex * stringSpacing;
      ctx.beginPath();
      // For open-string view, do not draw string lines through the 0-fret area.
      // Start lines at the first fret boundary (i = 1).
      const firstFretX = startX + (diagramWidth / numColumns);
      const lineStartX = includeOpenStrings ? firstFretX : startX;
      ctx.moveTo(lineStartX, stringY);
      ctx.lineTo(startX + diagramWidth, stringY);
      ctx.stroke();
    });
    
    // Draw frets (vertical lines)
    ctx.strokeStyle = THEME.colors.gridStroke;
    ctx.lineWidth = 1;
    for (let i = 0; i <= numColumns; i++) {
      const fretX = startX + i * (diagramWidth / numColumns);
      ctx.beginPath();
      // If showing open strings, do not draw a vertical line at the 0 position.
      // Instead, draw the nut as a horizontal thick line across string lines at the start.
      if (includeOpenStrings && i === 0) {
        // Skip drawing any line at the 0 fret position (no vertical or horizontal line)
        continue;
      }
      ctx.moveTo(fretX, startY);
      ctx.lineTo(fretX, startY + stringSpacing * 5);
      ctx.stroke();
    }
    
    // Draw scale notes
    scale.scaleNotes.forEach(note => {
      const stringY = startY + note.string * stringSpacing;
      // Position notes between fret lines (in the fret spaces)
      const fretX = startX + (note.fret - startFret + 0.5) * (diagramWidth / numColumns);
      
      // Set color - use custom color if specified, otherwise default based on note type
      if (note.color) {
        ctx.fillStyle = note.color; // Use custom color if provided
      } else if (note.noteType === 'blues') {
        ctx.fillStyle = THEME.colors.accentStroke;
      } else {
        ctx.fillStyle = THEME.colors.fingerFill;
      }
      
      // Draw note circle (bigger)
      ctx.beginPath();
      ctx.arc(fretX, stringY, 13, 0, 2 * Math.PI);
      ctx.fill();
      
      // Draw note symbol or name
      // Always draw note names/symbols in white for clarity
      ctx.fillStyle = '#FFFFFF';
      ctx.font = `bold ${scaleSize(12)}px "Poppins", "Nunito", "Circular", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`;
      ctx.textAlign = 'center';
      const label = showNoteNames
        ? getNoteNameForStringAndFret(note.string, note.fret)
        : (note.noteType === 'root' ? '●' : note.noteType === 'blues' ? '♭' : '●');
      ctx.fillText(label, fretX, stringY + 5);
    });

    // Draw arrows between notes if provided
    if (scale.arrows && scale.arrows.length > 0) {
      ctx.strokeStyle = THEME.colors.accentStroke;
      ctx.fillStyle = THEME.colors.accentStroke;
      ctx.lineWidth = 2;
      const radius = 13;
      scale.arrows.forEach(a => {
        const fromY = startY + a.from.string * stringSpacing;
        const fromX = startX + (a.from.fret - startFret + 0.5) * (diagramWidth / numColumns);
        const toY = startY + a.to.string * stringSpacing;
        const toX = startX + (a.to.fret - startFret + 0.5) * (diagramWidth / numColumns);
        const dx = toX - fromX;
        let dy = toY - fromY;
        const len = Math.hypot(dx, dy) || 1;
        const ux = dx / len;
        const uy = dy / len;
        // Per-scale perpendicular offset
        const off = scale.arrowYOffset || 0;
        const perpX = -uy;
        const perpY = ux;
        const offsetX = perpX * off;
        const offsetY = perpY * off;
        const startPX = fromX + ux * radius + offsetX;
        const startPY = fromY + uy * radius + offsetY;
        const endPX = toX - ux * radius + offsetX;
        const endPY = toY - uy * radius + offsetY;
        // line
        ctx.beginPath();
        ctx.moveTo(startPX, startPY);
        ctx.lineTo(endPX, endPY);
        ctx.stroke();
        // arrowhead
        const arrowSize = 10;
        const tipX = endPX;
        const tipY = endPY;
        const baseX = tipX - ux * arrowSize;
        const baseY = tipY - uy * arrowSize;
        const leftX = baseX + perpX * (arrowSize * 0.5);
        const leftY = baseY + perpY * (arrowSize * 0.5);
        const rightX = baseX - perpX * (arrowSize * 0.5);
        const rightY = baseY - perpY * (arrowSize * 0.5);
        ctx.beginPath();
        ctx.moveTo(tipX, tipY);
        ctx.lineTo(leftX, leftY);
        ctx.lineTo(rightX, rightY);
        ctx.closePath();
        ctx.fill();
        
        // Draw arrow text above the middle of the arrow
        if (a.text && a.text.trim()) {
          const midX = (startPX + endPX) / 2;
          const midY = (startPY + endPY) / 2;
          // Position text above the arrow line
          const textOffset = 15;
          const textX = midX + perpX * textOffset;
          const textY = midY + perpY * textOffset;
          
          ctx.font = `${scaleSize(16)}px "Poppins", "Nunito", "Circular", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`;
          ctx.fillStyle = THEME.colors.subtitle;
          ctx.textAlign = 'center';
          ctx.fillText(a.text.trim(), textX, textY);
        }
      });
    }

    // Draw labels under grouped notes if provided (with simple collision avoidance)
    if (scale.labels && scale.labels.length > 0) {
      ctx.textAlign = 'center';
      ctx.fillStyle = THEME.colors.subtitle;
      const fontDecl = `${scaleSize(16)}px "Poppins", "Nunito", "Circular", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`;
      ctx.font = fontDecl;
      const minGap = 8;
      const lineHeight = scaleSize(18);
      // Build label metrics
      const candidates = scale.labels
        .filter(l => l && l.notes && l.notes.length > 0 && l.text && l.text.trim())
        .map(l => {
          const minFret = Math.min(...l.notes.map(n => n.fret));
          const maxFret = Math.max(...l.notes.map(n => n.fret));
          const maxString = Math.max(...l.notes.map(n => n.string));
          const centerFret = (minFret + maxFret) / 2;
          const centerX = startX + (centerFret - startFret + 0.5) * (diagramWidth / numColumns) + labelsXOffset;
          const baseY = startY + maxString * stringSpacing;
          const text = l.text.trim();
          const width = ctx.measureText(text).width;
          return { centerX, baseY, text, width };
        })
        .sort((a, b) => a.centerX - b.centerX);

      // Place labels into rows, greedily avoiding horizontal overlaps
      const rowRight: number[] = []; // per-row rightmost x
      candidates.forEach(item => {
        let row = 0;
        const left = (x: number, w: number) => x - w / 2;
        const right = (x: number, w: number) => x + w / 2;
        while (true) {
          const rEdge = rowRight[row] ?? -Infinity;
          if (left(item.centerX, item.width) > rEdge + minGap) {
            // place here
            rowRight[row] = right(item.centerX, item.width);
            const y = item.baseY + 35 + row * lineHeight;
            ctx.fillText(item.text, item.centerX, y);
            break;
          }
          row += 1;
          // safety: cap rows to 3
          if (row > 2) {
            const y = item.baseY + 35 + 2 * lineHeight;
            ctx.fillText(item.text, item.centerX, y);
            break;
          }
        }
      });
    }

    // Draw per-scale caption under the diagram frame if provided
    if (scale.caption && scale.caption.trim()) {
      ctx.textAlign = 'center';
      ctx.fillStyle = THEME.colors.subtitle;
      ctx.font = `${scaleSize(16)}px "Poppins", "Nunito", "Circular", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`;
      const captionY = y + height - 8; // near bottom of diagram box
      ctx.fillText(scale.caption.trim(), x + width / 2, captionY);
    }
  };

  // Draw empty scale diagram placeholder
  const drawEmptyScaleDiagram = (ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, placeholder: string) => {
    // Draw border
    ctx.strokeStyle = THEME.colors.gridStroke;
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.strokeRect(x + 10, y + 10, width - 20, height - 20);
    ctx.setLineDash([]);
    
    // Draw placeholder text
    ctx.font = `italic ${scaleSize(20)}px "Poppins", "Nunito", "Circular", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`;
    ctx.fillStyle = THEME.colors.placeholderText;
    ctx.textAlign = 'center';
    ctx.fillText(placeholder, x + width / 2, y + height / 2);
  };

  // Export as image function
  const exportAsImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Estimate legend height so bottom content doesn't overlap branding
    let legendItemsCount = 0;
    try {
      const rawLegend = localStorage.getItem('scaleLegend');
      if (rawLegend) {
        const items: Array<{ label: string; color: string }> = JSON.parse(rawLegend);
        if (Array.isArray(items)) legendItemsCount = items.length;
      }
    } catch {}
    const legendEstimatedHeight = legendItemsCount > 0 ? legendItemsCount * (16 + 10) + 30 : 0;

    const maxCanvasWidth = 1080; // Optimal for Instagram/social media - same as chord builder
    // Make single-scale render use more space
    const isSingleScale = !compareMode && gridSize === 1;
    const isDoubleStack = !compareMode && stackedLayout && gridSize === 2;
    const isTripleStack = !compareMode && stackedLayout && gridSize === 3;
    const isQuadStack = !compareMode && stackedLayout && gridSize === 4;
    const isStacked = isDoubleStack || isTripleStack || isQuadStack;
    const diagramWidth = (isSingleScale || isDoubleStack || isTripleStack || isQuadStack) ? Math.floor(maxCanvasWidth * (isQuadStack ? 0.78 : isTripleStack ? 0.82 : 0.88)) : (compareMode ? 200 : 230);
    const diagramHeight = isSingleScale ? 330 : isDoubleStack ? 300 : isTripleStack ? 210 : isQuadStack ? 170 : (compareMode ? 140 : 160);
    const spacing = compareMode ? 12 : 18; // More spacing to prevent string label overlap
    const rowGap = (isQuadStack ? 22 : isTripleStack ? 30 : ((isSingleScale || isDoubleStack) ? 40 : 100));
    
    let canvasWidth: number;
    let canvasHeight: number;
    
    if (compareMode) {
      // Calculate required width for the largest row
      const maxRowScales = Math.max(...compareRows.map(row => row.scales.length));
      const requiredWidth = maxRowScales * diagramWidth + (maxRowScales - 1) * spacing + 80; // 80 for margins
      canvasWidth = Math.min(maxCanvasWidth, Math.max(800, requiredWidth)); // Minimum 800px
      
      // Dynamic height for compare mode based on number of rows
      const titleAreaHeight = 210; // Increased to accommodate subtitle
      const rowHeight = diagramHeight + 80; // Include space for row title
      const diagramsHeight = compareRows.length * rowHeight;
      const customTextHeight = customText.trim() ? 80 : 0; // Extra allowance
      const brandingHeight = 110;
      const paddingHeight = 80;
      canvasHeight = titleAreaHeight + diagramsHeight + customTextHeight + legendEstimatedHeight + brandingHeight + paddingHeight;
    } else {
      // Calculate required width for normal mode
      const rowLayouts = (() => {
        switch (gridSize) {
           case 1: return [1];
           case 2: return isDoubleStack ? [1, 1] : [2];
          case 3: return isTripleStack ? [1, 1, 1] : [3];
          case 4: return isQuadStack ? [1, 1, 1, 1] : [4];
          case 5: return [3, 2];
          case 6: return [3, 3];
          case 7: return [4, 3];
          case 8: return [4, 4];
          case 9: return [3, 3, 3];
          case 10: return [4, 3, 3];
          default: return [4];
        }
      })();
      const maxRowScales = Math.max(...rowLayouts);
      const requiredWidth = maxRowScales * diagramWidth + (maxRowScales - 1) * spacing + 80; // 80 for margins
      // For stacked, width should be based on single diagram
      const targetWidth = isStacked ? diagramWidth + 80 : requiredWidth;
      canvasWidth = Math.min(maxCanvasWidth, Math.max(800, targetWidth)); // Minimum 800px
      
      // Fixed dimensions for normal mode
       const titleAreaHeight = (isSingleScale || isStacked) ? 140 : 200;
      const maxRows = Math.max(1, rowLayouts.length);
       const diagramsHeight = maxRows * (diagramHeight + rowGap);
       const customTextHeight = customText.trim() ? 80 : 0; // Extra allowance
       const brandingHeight = 110;
       const paddingHeight = 80;
       canvasHeight = titleAreaHeight + diagramsHeight + customTextHeight + legendEstimatedHeight + brandingHeight + paddingHeight;
    }
    
    // Enforce aspect ratio
    if (squareExport) {
      const side = Math.max(canvasWidth, canvasHeight);
      canvasWidth = side;
      canvasHeight = side;
    } else {
      // Default behavior: avoid landscape by ensuring height >= width
    canvasHeight = Math.max(canvasHeight, canvasWidth);
    }
    
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    // Ensure CSS size matches intrinsic pixel size to avoid aspect skewing
    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;

    // Create gradient background - same as chord builder
    if (THEME.background.start === THEME.background.end) {
      ctx.fillStyle = THEME.background.start;
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    } else {
    const gradient = ctx.createLinearGradient(0, 0, 0, canvasHeight);
      gradient.addColorStop(0, THEME.background.start);
      gradient.addColorStop(1, THEME.background.end);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    }

    // Calculate positioning - same as chord builder
    const upOffset = 25; // previously 10; +15 more as requested
    const titleY = (compareMode ? 70 : 85) - upOffset;
    const subtitleY = titleY + 60; // New subtitle position for compare mode
    const progressionY = compareMode ? subtitleY + 60 : titleY + 70;
    const diagramsStartY = (compareMode ? 200 : (isQuadStack ? 140 : (isTripleStack ? 150 : ((isSingleScale || isDoubleStack) ? 185 : 260)))) - upOffset; // Adjusted for subtitle space

    // Draw title with dynamic sizing to prevent cut-off - same as chord builder
    ctx.textAlign = 'center';
    ctx.fillStyle = THEME.colors.title;
    
    // Start with base font size and reduce if text is too wide
    let titleFontSize = scaleSize(42);
    let titleFont = `bold italic ${titleFontSize}px "Poppins", "Nunito", "Circular", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`;
    ctx.font = titleFont;
    
    const maxTitleWidth = canvasWidth * 0.9; // Allow 90% of canvas width
    while (ctx.measureText(progressionTitle).width > maxTitleWidth && titleFontSize > scaleSize(24)) {
      titleFontSize -= 2;
      titleFont = `bold italic ${titleFontSize}px "Poppins", "Nunito", "Circular", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`;
      ctx.font = titleFont;
    }
    
    ctx.fillText(progressionTitle, canvasWidth / 2, titleY);

    // Draw subtitle for compare mode
    if (compareMode) {
      const filledSubtitle = compareSubtitle.filter(scale => scale.trim() !== '');
      if (filledSubtitle.length > 0) {
        ctx.font = `italic ${scaleSize(28)}px "Poppins", "Nunito", "Circular", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`;
        ctx.fillStyle = THEME.colors.subtitle;
        const subtitleText = filledSubtitle.join(' → ');
        ctx.fillText(subtitleText, canvasWidth / 2, subtitleY);
      }
    }

    if (compareMode) {
      // Compare mode: Draw rows with titles
      compareRows.forEach((row, rowIndex) => {
        const rowY = diagramsStartY + rowIndex * (diagramHeight + 80);
        
        // Draw row title
        ctx.font = `bold italic ${scaleSize(32)}px "Poppins", "Nunito", "Circular", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`;
        ctx.fillStyle = THEME.colors.subtitle;
        ctx.fillText(row.title, canvasWidth / 2, rowY - 20);
        
        // Draw scale diagrams in this row
        const rowWidth = compareRowSize * diagramWidth + (compareRowSize - 1) * spacing;
        const rowStartX = (canvasWidth - rowWidth) / 2;
        
        for (let scaleIndex = 0; scaleIndex < compareRowSize; scaleIndex++) {
          const scale = row.scales[scaleIndex];
          const x = rowStartX + scaleIndex * (diagramWidth + spacing);
          const y = rowY;
          
          if (scale) {
            drawScaleDiagram(ctx, scale, x, y, diagramWidth, diagramHeight);
          } else {
            drawEmptyScaleDiagram(ctx, x, y, diagramWidth, diagramHeight, `Scale ${scaleIndex + 1}`);
          }
        }
      });

      // Below-diagram Y baseline
        const textY = diagramsStartY + compareRows.length * (diagramHeight + 80) + 20;
      
      // Draw colour legend (key) on the left below the diagrams (no shading)
      try {
        const rawLegend = localStorage.getItem('scaleLegend');
        if (rawLegend) {
          const items: Array<{ label: string; color: string }> = JSON.parse(rawLegend);
          if (Array.isArray(items) && items.length > 0) {
            const swatchSize = 16;
            const gap = 10;
            const legendLabelMaxWidth = canvasWidth * 0.35;
            const legendBlockWidth = swatchSize + 10 + legendLabelMaxWidth;
            const xLeft = (canvasWidth - legendBlockWidth) / 2;
            // Position legend above custom text
            const legendY = textY - 20;
            let yCursor = legendY;
            ctx.textAlign = 'left';
            ctx.font = `${scaleSize(18)}px "Poppins", "Nunito", "Circular", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`;
            ctx.fillStyle = THEME.colors.title;
            items.forEach((it) => {
              // swatch
              ctx.fillStyle = it.color || '#FFFFFF';
              ctx.fillRect(xLeft, yCursor, swatchSize, swatchSize);
              // label
              ctx.fillStyle = THEME.colors.title;
              const labelX = xLeft + swatchSize + 10;
              const text = (it.label || '').toString();
              const maxWidth = legendLabelMaxWidth; // left column width
              let display = text;
              while (ctx.measureText(display).width > maxWidth && display.length > 3) {
                display = display.slice(0, -2);
              }
              if (display !== text) display += '…';
              ctx.fillText(display, labelX, yCursor + swatchSize - 4);
              yCursor += swatchSize + gap;
            });
          }
        }
      } catch {}
      
      // Draw custom text (centered) below legend
      if (customText.trim()) {
        const customTextY = textY + 120 + customTextYOffset; // Increased spacing + user offset
        ctx.font = `${customTextBold ? 'bold ' : ''}${scaleSize(18)}px "Poppins", "Nunito", "Circular", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`;
        ctx.fillStyle = THEME.colors.title;
        ctx.textAlign = 'center';
        drawCustomText(ctx, customText, canvasWidth / 2, customTextY, canvasWidth * 0.9, 24);
      }
    } else {
      // Normal mode: Scale progression text removed - not relevant for scale diagrams

      // Draw diagrams using grid layout
      const rowLayouts = (() => {
        switch (gridSize) {
          case 1: return [1];
           case 2: return isDoubleStack ? [1, 1] : [2];
           case 3: return isTripleStack ? [1, 1, 1] : [3];
           case 4: return isQuadStack ? [1, 1, 1, 1] : [4];
          case 5: return [3, 2];
          case 6: return [3, 3];
          case 7: return [4, 3];
          case 8: return [4, 4];
          case 9: return [3, 3, 3];
          case 10: return [4, 3, 3];
          default: return [4];
        }
      })();

      let currentIndex = 0;
      const totalSlots = Math.max(1, gridSize); // ensure at least one slot
      // Ensure we always have something to draw per slot
      const scalesToRender: (ScaleData | null)[] = Array.from({ length: totalSlots }, (_, i) =>
        (scales[i] as ScaleData | null) ?? createEmptyScale()
      );
      rowLayouts.forEach((rowCount, rowIndex) => {
        const rowWidth = rowCount * diagramWidth + (rowCount - 1) * spacing;
        const rowStartX = (canvasWidth - rowWidth) / 2;
        // Add extra intra-row spacer between the diagram and the next heading without changing canvas size
        const headingSpacer = 18; // extra space reserved between diagram bottom and next heading
        const rowY = diagramsStartY + rowIndex * (diagramHeight + rowGap + headingSpacer);
        
        for (let col = 0; col < rowCount && currentIndex < totalSlots; col++) {
          const scale = scalesToRender[currentIndex];
          const x = rowStartX + col * (diagramWidth + spacing);
          const y = rowY;

          drawScaleDiagram(ctx, scale || createEmptyScale(), x, y, diagramWidth, diagramHeight);
          currentIndex++;
        }
      });

      // Below-diagram Y baseline
      const headingSpacer = 18;
      const textY = diagramsStartY + rowLayouts.length * (diagramHeight + rowGap + headingSpacer) + 20;
      
      // Draw colour legend (key) on the left below the diagrams (no shading)
      try {
        const rawLegend = localStorage.getItem('scaleLegend');
        if (rawLegend) {
          const items: Array<{ label: string; color: string }> = JSON.parse(rawLegend);
          if (Array.isArray(items) && items.length > 0) {
            const swatchSize = 16;
            const gap = 10;
            const legendLabelMaxWidth = canvasWidth * 0.35;
            const legendBlockWidth = swatchSize + 10 + legendLabelMaxWidth;
            const xLeft = (canvasWidth - legendBlockWidth) / 2;
            // Position legend above custom text
            const legendY = textY - 20;
            let yCursor = legendY;
            ctx.textAlign = 'left';
            ctx.font = `${scaleSize(18)}px "Poppins", "Nunito", "Circular", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`;
            ctx.fillStyle = THEME.colors.title;
            items.forEach((it) => {
              ctx.fillStyle = it.color || '#FFFFFF';
              ctx.fillRect(xLeft, yCursor, swatchSize, swatchSize);
              ctx.fillStyle = THEME.colors.title;
              const labelX = xLeft + swatchSize + 10;
              const text = (it.label || '').toString();
              const maxWidth = legendLabelMaxWidth;
              let display = text;
              while (ctx.measureText(display).width > maxWidth && display.length > 3) {
                display = display.slice(0, -2);
              }
              if (display !== text) display += '…';
              ctx.fillText(display, labelX, yCursor + swatchSize - 4);
              yCursor += swatchSize + gap;
            });
          }
        }
      } catch {}
      
      // Draw custom text (centered) below legend
      if (customText.trim()) {
        const customTextY = textY + 120 + customTextYOffset; // Increased spacing + user offset
        ctx.font = `${customTextBold ? 'bold ' : ''}${scaleSize(18)}px "Poppins", "Nunito", "Circular", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`;
        ctx.fillStyle = THEME.colors.title;
        ctx.textAlign = 'center';
        drawCustomText(ctx, customText, canvasWidth / 2, customTextY, canvasWidth * 0.9, 24);
      }
    }

    // Draw branding footer - same as chord builder
    const footerY = canvasHeight - 50; // moved branding down additional 10px
    
    // Draw "Mike Nelson Guitar Lessons"
    ctx.font = `bold italic ${scaleSize(24)}px "Poppins", "Nunito", "Circular", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillStyle = THEME.colors.footerTitle;
    ctx.fillText('Mike Nelson Guitar Lessons', canvasWidth / 2, footerY);
    
    // Draw website URL
    ctx.font = `italic ${scaleSize(18)}px "Poppins", "Nunito", "Circular", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`;
    ctx.fillStyle = THEME.colors.footerSubtitle;
    ctx.fillText('mikenelsonguitarlessons.co.nz', canvasWidth / 2, footerY + 30);

    // (legend drawing moved into branches above; no shaded panel)

    // Convert to blob and download
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${progressionTitle.replace(/\s+/g, '_')}_scales.png`;
        link.click();
        URL.revokeObjectURL(url);
      }
    }, 'image/png');
  };

  // Live preview renderer (mirrors export rendering without downloading)
  useEffect(() => {
    const canvas = previewCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clone of export size logic with smaller target width
    const maxCanvasWidth = 560; // Preview target width
    const isSingleScale = !compareMode && gridSize === 1;
    const isDoubleStack = !compareMode && stackedLayout && gridSize === 2;
    const isTripleStack = !compareMode && stackedLayout && gridSize === 3;
    const isQuadStack = !compareMode && stackedLayout && gridSize === 4;
    const isStacked = isDoubleStack || isTripleStack || isQuadStack;
    const diagramWidth = (isSingleScale || isDoubleStack || isTripleStack || isQuadStack) ? Math.floor(maxCanvasWidth * (isQuadStack ? 0.78 : isTripleStack ? 0.82 : 0.88)) : (compareMode ? 200 : 230);
    const diagramHeight = isSingleScale ? 330 : isDoubleStack ? 300 : isTripleStack ? 210 : isQuadStack ? 170 : (compareMode ? 140 : 160);
    const spacing = compareMode ? 12 : 18;
    const rowGap = (isQuadStack ? 22 : isTripleStack ? 30 : ((isSingleScale || isDoubleStack) ? 40 : 100));

    let canvasWidth: number;
    let canvasHeight: number;

    if (compareMode) {
      const maxRowScales = Math.max(...compareRows.map(row => row.scales.length));
      const requiredWidth = maxRowScales * diagramWidth + (maxRowScales - 1) * spacing + 80;
      canvasWidth = Math.min(maxCanvasWidth, Math.max(400, requiredWidth));
      const titleAreaHeight = 210;
      const rowHeight = diagramHeight + 80;
      const diagramsHeight = compareRows.length * rowHeight;
      const customTextHeight = customText.trim() ? 80 : 0;
      const brandingHeight = 110;
      const paddingHeight = 80;
      // Estimate legend height from localStorage
      let legendItemsCount = 0;
      try {
        const rawLegend = localStorage.getItem('scaleLegend');
        if (rawLegend) {
          const items: Array<{ label: string; color: string }> = JSON.parse(rawLegend);
          if (Array.isArray(items)) legendItemsCount = items.length;
        }
      } catch {}
      const legendEstimatedHeight = legendItemsCount > 0 ? legendItemsCount * (16 + 10) + 30 : 0;
      canvasHeight = titleAreaHeight + diagramsHeight + customTextHeight + legendEstimatedHeight + brandingHeight + paddingHeight;
    } else {
      const rowLayouts = (() => {
        switch (gridSize) {
          case 1: return [1];
          case 2: return isDoubleStack ? [1, 1] : [2];
          case 3: return isTripleStack ? [1, 1, 1] : [3];
          case 4: return isQuadStack ? [1, 1, 1, 1] : [4];
          case 5: return [3, 2];
          case 6: return [3, 3];
          case 7: return [4, 3];
          case 8: return [4, 4];
          case 9: return [3, 3, 3];
          case 10: return [4, 3, 3];
          default: return [4];
        }
      })();
      const maxRowScales = Math.max(...rowLayouts);
      const requiredWidth = maxRowScales * diagramWidth + (maxRowScales - 1) * spacing + 80;
      const targetWidth = isStacked ? diagramWidth + 80 : requiredWidth;
      canvasWidth = Math.min(maxCanvasWidth, Math.max(400, targetWidth));
      const titleAreaHeight = (isSingleScale || isStacked) ? 140 : 200;
      const maxRows = Math.max(1, rowLayouts.length);
      const diagramsHeight = maxRows * (diagramHeight + rowGap);
      const customTextHeight = customText.trim() ? 80 : 0;
      const brandingHeight = 110;
      const paddingHeight = 80;
      // Estimate legend height from localStorage
      let legendItemsCount = 0;
      try {
        const rawLegend = localStorage.getItem('scaleLegend');
        if (rawLegend) {
          const items: Array<{ label: string; color: string }> = JSON.parse(rawLegend);
          if (Array.isArray(items)) legendItemsCount = items.length;
        }
      } catch {}
      const legendEstimatedHeight = legendItemsCount > 0 ? legendItemsCount * (16 + 10) + 30 : 0;
      canvasHeight = titleAreaHeight + diagramsHeight + customTextHeight + legendEstimatedHeight + brandingHeight + paddingHeight;
    }

    // Enforce aspect ratio
    const targetRatio = squareExport ? 1 : (3 / 2);
    canvasHeight = Math.round(canvasWidth * targetRatio);

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    // Ensure CSS size matches intrinsic pixel size to avoid aspect skewing
    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;

    // Background
    if (THEME.background.start === THEME.background.end) {
      ctx.fillStyle = THEME.background.start;
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    } else {
      const gradient = ctx.createLinearGradient(0, 0, 0, canvasHeight);
      gradient.addColorStop(0, THEME.background.start);
      gradient.addColorStop(1, THEME.background.end);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    }

    // Positioning
    const upOffset = 25;
    const titleY = (compareMode ? 70 : 85) - upOffset;
    const subtitleY = titleY + 60;
    const diagramsStartY = (compareMode ? 200 : (isQuadStack ? 140 : (isTripleStack ? 150 : ((isSingleScale || isDoubleStack) ? 185 : 260)))) - upOffset;

    // Title
    ctx.textAlign = 'center';
    ctx.fillStyle = THEME.colors.title;
    let titleFontSize = scaleSize(42);
    let titleFont = `bold italic ${titleFontSize}px "Poppins", "Nunito", "Circular", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`;
    ctx.font = titleFont;
    const maxTitleWidth = canvasWidth * 0.9;
    while (ctx.measureText(progressionTitle).width > maxTitleWidth && titleFontSize > scaleSize(24)) {
      titleFontSize -= 2;
      titleFont = `bold italic ${titleFontSize}px "Poppins", "Nunito", "Circular", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`;
      ctx.font = titleFont;
    }
    ctx.fillText(progressionTitle, canvasWidth / 2, titleY);

    // Subtitle in compare mode
    if (compareMode) {
      const filledSubtitle = compareSubtitle.filter(scale => scale.trim() !== '');
      if (filledSubtitle.length > 0) {
        ctx.font = `italic ${scaleSize(28)}px "Poppins", "Nunito", "Circular", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`;
        ctx.fillStyle = THEME.colors.subtitle;
        const subtitleText = filledSubtitle.join(' → ');
        ctx.fillText(subtitleText, canvasWidth / 2, subtitleY);
      }
    }

    if (compareMode) {
      compareRows.forEach((row, rowIndex) => {
        const rowY = diagramsStartY + rowIndex * (diagramHeight + 80);
        ctx.font = `bold italic ${scaleSize(32)}px "Poppins", "Nunito", "Circular", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`;
        ctx.fillStyle = THEME.colors.subtitle;
        ctx.fillText(row.title, canvasWidth / 2, rowY - 20);
        const rowWidth = compareRowSize * diagramWidth + (compareRowSize - 1) * spacing;
        const rowStartX = (canvasWidth - rowWidth) / 2;
        for (let scaleIndex = 0; scaleIndex < compareRowSize; scaleIndex++) {
          const scale = row.scales[scaleIndex];
          const x = rowStartX + scaleIndex * (diagramWidth + spacing);
          const y = rowY;
          if (scale) {
            drawScaleDiagram(ctx, scale, x, y, diagramWidth, diagramHeight);
          } else {
            drawEmptyScaleDiagram(ctx, x, y, diagramWidth, diagramHeight, `Scale ${scaleIndex + 1}`);
          }
        }
      });
      const textY = diagramsStartY + compareRows.length * (diagramHeight + 80) + 20;
      try {
        const rawLegend = localStorage.getItem('scaleLegend');
        if (rawLegend) {
          const items: Array<{ label: string; color: string }> = JSON.parse(rawLegend);
          if (Array.isArray(items) && items.length > 0) {
            const swatchSize = 16;
            const gap = 10;
            const legendLabelMaxWidth = canvasWidth * 0.35;
            const legendBlockWidth = swatchSize + 10 + legendLabelMaxWidth;
            const xLeft = (canvasWidth - legendBlockWidth) / 2;
            const legendY = textY - 20;
            let yCursor = legendY;
            ctx.textAlign = 'left';
            ctx.font = `${scaleSize(18)}px "Poppins", "Nunito", "Circular", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`;
            ctx.fillStyle = THEME.colors.title;
            items.forEach((it) => {
              ctx.fillStyle = it.color || '#FFFFFF';
              ctx.fillRect(xLeft, yCursor, swatchSize, swatchSize);
              ctx.fillStyle = THEME.colors.title;
              const labelX = xLeft + swatchSize + 10;
              const text = (it.label || '').toString();
              const maxWidth = legendLabelMaxWidth;
              let display = text;
              while (ctx.measureText(display).width > maxWidth && display.length > 3) {
                display = display.slice(0, -2);
              }
              if (display !== text) display += '…';
              ctx.fillText(display, labelX, yCursor + swatchSize - 4);
              yCursor += swatchSize + gap;
            });
          }
        }
      } catch {}

      if (customText.trim()) {
        const customTextY = textY + 120 + customTextYOffset;
        ctx.font = `${customTextBold ? 'bold ' : ''}${scaleSize(18)}px "Poppins", "Nunito", "Circular", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`;
        ctx.fillStyle = THEME.colors.title;
        ctx.textAlign = 'center';
        drawCustomText(ctx, customText, canvasWidth / 2, customTextY, canvasWidth * 0.9, 24);
      }
    } else {
      const rowLayouts = (() => {
        switch (gridSize) {
          case 1: return [1];
          case 2: return isDoubleStack ? [1, 1] : [2];
          case 3: return isTripleStack ? [1, 1, 1] : [3];
          case 4: return isQuadStack ? [1, 1, 1, 1] : [4];
          case 5: return [3, 2];
          case 6: return [3, 3];
          case 7: return [4, 3];
          case 8: return [4, 4];
          case 9: return [3, 3, 3];
          case 10: return [4, 3, 3];
          default: return [4];
        }
      })();
      let currentIndex = 0;
      const totalSlots = Math.max(1, gridSize);
      const scalesToRender: (ScaleData | null)[] = Array.from({ length: totalSlots }, (_, i) =>
        (scales[i] as ScaleData | null) ?? createEmptyScale()
      );
      rowLayouts.forEach((rowCount, rowIndex) => {
        const rowWidth = rowCount * diagramWidth + (rowCount - 1) * spacing;
        const rowStartX = (canvasWidth - rowWidth) / 2;
        const headingSpacer = 18;
        const rowY = diagramsStartY + rowIndex * (diagramHeight + rowGap + headingSpacer);
        for (let col = 0; col < rowCount && currentIndex < totalSlots; col++) {
          const scale = scalesToRender[currentIndex];
          const x = rowStartX + col * (diagramWidth + spacing);
          const y = rowY;
          drawScaleDiagram(ctx, scale || createEmptyScale(), x, y, diagramWidth, diagramHeight);
          currentIndex++;
        }
      });
      const headingSpacer = 18;
      const textY = diagramsStartY + rowLayouts.length * (diagramHeight + rowGap + headingSpacer) + 20;
      try {
        const rawLegend = localStorage.getItem('scaleLegend');
        if (rawLegend) {
          const items: Array<{ label: string; color: string }> = JSON.parse(rawLegend);
          if (Array.isArray(items) && items.length > 0) {
            const swatchSize = 16;
            const gap = 10;
            const legendLabelMaxWidth = canvasWidth * 0.35;
            const legendBlockWidth = swatchSize + 10 + legendLabelMaxWidth;
            const xLeft = (canvasWidth - legendBlockWidth) / 2;
            const legendY = textY - 20;
            let yCursor = legendY;
            ctx.textAlign = 'left';
            ctx.font = `${scaleSize(18)}px "Poppins", "Nunito", "Circular", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`;
            ctx.fillStyle = THEME.colors.title;
            items.forEach((it) => {
              ctx.fillStyle = it.color || '#FFFFFF';
              ctx.fillRect(xLeft, yCursor, swatchSize, swatchSize);
              ctx.fillStyle = THEME.colors.title;
              const labelX = xLeft + swatchSize + 10;
              const text = (it.label || '').toString();
              const maxWidth = legendLabelMaxWidth;
              let display = text;
              while (ctx.measureText(display).width > maxWidth && display.length > 3) {
                display = display.slice(0, -2);
              }
              if (display !== text) display += '…';
              ctx.fillText(display, labelX, yCursor + swatchSize - 4);
              yCursor += swatchSize + gap;
            });
          }
        }
      } catch {}

      if (customText.trim()) {
        const customTextY = textY + 120 + customTextYOffset;
        ctx.font = `${customTextBold ? 'bold ' : ''}${scaleSize(18)}px "Poppins", "Nunito", "Circular", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`;
        ctx.fillStyle = THEME.colors.title;
        ctx.textAlign = 'center';
        drawCustomText(ctx, customText, canvasWidth / 2, customTextY, canvasWidth * 0.9, 24);
      }
    }

    // Branding footer
    const footerY = canvasHeight - 50;
    ctx.font = `bold italic ${scaleSize(24)}px "Poppins", "Nunito", "Circular", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillStyle = THEME.colors.footerTitle;
    ctx.fillText('Mike Nelson Guitar Lessons', canvasWidth / 2, footerY);
    ctx.font = `italic ${scaleSize(18)}px "Poppins", "Nunito", "Circular", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`;
    ctx.fillStyle = THEME.colors.footerSubtitle;
    ctx.fillText('mikenelsonguitarlessons.co.nz', canvasWidth / 2, footerY + 30);
  }, [
    theme,
    compareMode,
    gridSize,
    scales,
    compareRows,
    compareRowSize,
    progressionTitle,
    compareSubtitle,
    includeOpenStrings,
    fretSpan,
    showNoteNames,
    stackedLayout,
    squareExport,
    textScale,
    customText,
    customTextYOffset,
    customTextBold,
    labelsXOffset,
  ]);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      {/* Live Preview Panel */}
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm text-gray-300">Live Preview</div>
          <div className="text-xs text-gray-500">{squareExport ? '1:1' : '2:3'} aspect</div>
        </div>
        <div className="flex justify-center">
          <canvas ref={previewCanvasRef} className="block" />
        </div>
      </div>
      
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Scale Progression Title
        </label>
        <input
          type="text"
          value={progressionTitle}
          onChange={(e) => setProgressionTitle(e.target.value)}
          className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-amber-500"
          placeholder="Enter progression title"
        />
      </div>

      {/* Custom Text */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Custom Description Text
        </label>
        <textarea
          value={customText}
          onChange={(e) => setCustomText(e.target.value)}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors resize-none"
          placeholder="Add descriptive text to your scale progression (e.g., 'Five positions of the G major pentatonic scale')"
          rows={3}
          maxLength={550}
        />
        <div className="flex justify-between items-center mt-1">
          <span className="text-xs text-gray-500">
            Appears below the scale diagrams in exported image
          </span>
          <span className={`text-xs ${customText.length > 530 ? 'text-amber-400' : 'text-gray-500'}`}>
            {customText.length}/550
          </span>
        </div>
        <div className="mt-2">
          <label className="inline-flex items-center gap-2 text-gray-200">
            <input
              type="checkbox"
              checked={customTextBold}
              onChange={(e) => setCustomTextBold(e.target.checked)}
            />
            <span>Bold custom text</span>
          </label>
        </div>
      </div>

      {/* Mode Toggle */}
      <div className="text-center">
        {/* Theme selector */}
        <div className="mb-4 flex items-center justify-center gap-2">
          <span className="text-sm text-gray-300">Theme:</span>
          <select
            className="bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white"
            value={theme}
            onChange={(e) => setTheme(e.target.value as ThemeKey)}
          >
            <option value="amber">Amber Gradient</option>
            <option value="light">Light</option>
            <option value="cardAmber">Card Amber</option>
            <option value="dark">Dark</option>
          </select>
        </div>
        <button
          onClick={toggleCompareMode}
          className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors"
        >
          {compareMode ? 'Switch to Normal Mode' : 'Switch to Compare Mode'}
        </button>
        <p className="text-sm text-gray-400 mt-2">
          {compareMode 
            ? 'Compare mode: Show multiple scale positions with custom row titles'
            : 'Normal mode: Create a single scale progression'
          }
        </p>
        {/* Global Options */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-6">
          <label className="inline-flex items-center gap-2 text-gray-200">
            <input
              type="checkbox"
              checked={includeOpenStrings}
              onChange={(e) => setIncludeOpenStrings(e.target.checked)}
            />
            <span>Include open strings</span>
          </label>
          <label className="inline-flex items-center gap-2 text-gray-200">
            <span>Fret span:</span>
            <select
              className="bg-gray-800 border border-gray-600 rounded px-2 py-1"
              value={fretSpan}
              onChange={(e) => setFretSpan(Number(e.target.value))}
            >
              <option value={5}>5</option>
              <option value={12}>12</option>
              <option value={24}>24</option>
            </select>
          </label>
          <label className="inline-flex items-center gap-2 text-gray-200">
            <input
              type="checkbox"
              checked={showNoteNames}
              onChange={(e) => setShowNoteNames(e.target.checked)}
            />
            <span>Show note names (on placed notes)</span>
          </label>
          {!compareMode && (
            <label className="inline-flex items-center gap-2 text-gray-200">
              <input
                type="checkbox"
                checked={stackedLayout}
                onChange={(e) => setStackedLayout(e.target.checked)}
              />
              <span>Stack diagrams vertically</span>
            </label>
          )}
          <label className="inline-flex items-center gap-2 text-gray-200">
            <input
              type="checkbox"
              checked={squareExport}
              onChange={(e) => setSquareExport(e.target.checked)}
            />
            <span>1:1 square export</span>
          </label>
        </div>
        
        {/* Text size controls */}
        <div className="mt-4 flex items-center justify-center gap-2">
          <span className="text-sm text-gray-300">Text size:</span>
          <button
            onClick={() => setTextScale(s => Math.max(0.6, parseFloat((s - 0.05).toFixed(2))))}
            className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600"
          >
            -
          </button>
          <span className="w-16 text-center text-gray-200">{Math.round(textScale * 100)}%</span>
          <button
            onClick={() => setTextScale(s => Math.min(1.4, parseFloat((s + 0.05).toFixed(2))))}
            className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600"
          >
            +
          </button>
          <button
            onClick={() => setTextScale(1.0)}
            className="ml-2 px-3 py-1 rounded bg-gray-700 hover:bg-gray-600"
          >
            Reset
          </button>
        </div>

        {/* Custom text vertical position controls */}
        <div className="mt-3 flex items-center justify-center gap-2">
          <span className="text-sm text-gray-300">Custom text position:</span>
          <button
            onClick={() => setCustomTextYOffset(v => v - 5)}
            className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600"
          >
            -
          </button>
          <span className="w-16 text-center text-gray-200">{customTextYOffset}px</span>
          <button
            onClick={() => setCustomTextYOffset(v => v + 5)}
            className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600"
          >
            +
          </button>
          <button
            onClick={() => setCustomTextYOffset(0)}
            className="ml-2 px-3 py-1 rounded bg-gray-700 hover:bg-gray-600"
          >
            Reset
          </button>
        </div>

        {/* Labels horizontal offset */}
        <div className="mt-3 flex items-center justify-center gap-2">
          <span className="text-sm text-gray-300">Labels X offset:</span>
          <button
            onClick={() => setLabelsXOffset(v => v - 5)}
            className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600"
          >
            -
          </button>
          <span className="w-16 text-center text-gray-200">{labelsXOffset}px</span>
          <button
            onClick={() => setLabelsXOffset(v => v + 5)}
            className="px-3 py-1 rounded bg-gray-700 hover:bg-gray-600"
          >
            +
          </button>
          <button
            onClick={() => setLabelsXOffset(0)}
            className="ml-2 px-3 py-1 rounded bg-gray-700 hover:bg-gray-600"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Normal Mode Controls */}
      {!compareMode && (
        <div className="flex flex-wrap gap-4 items-center">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Number of Scales
            </label>
            <select
              value={gridSize}
              onChange={(e) => handleGridSizeChange(Number(e.target.value))}
              className="px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(size => (
                <option key={size} value={size}>{size} scales</option>
              ))}
            </select>
          </div>
          {copiedScale && (
            <div className="text-xs text-gray-400">Copied: {copiedScale.name}</div>
          )}
        </div>
      )}

      {/* Compare Mode Controls */}
      {compareMode && (
        <div className="flex flex-wrap gap-4 items-center">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Scales per Row
            </label>
            <select
              value={compareRowSize}
              onChange={(e) => updateCompareRowSize(Number(e.target.value))}
              className="px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
            >
              {[1, 2, 3, 4].map(size => (
                <option key={size} value={size}>{size} scale{size > 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>
          <button
            onClick={addCompareRow}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
          >
            Add Row
          </button>
        </div>
      )}

      {/* Compare Mode UI */}
      {compareMode && (
        <div className="mb-8">
          {/* Subtitle Input for Compare Mode */}
          <div className="mb-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
            <h3 className="text-lg font-semibold text-amber-400 mb-3">Scale Progression Subtitle</h3>
            <p className="text-sm text-gray-400 mb-3">Add scale names or positions (e.g., G Major Pentatonic, Position 1, Position 2, Position 3)</p>
            <div className="grid grid-cols-4 gap-3">
              {compareSubtitle.map((scale, index) => (
                <div key={index} className="text-center">
                  <input
                    type="text"
                    value={scale}
                    onChange={(e) => {
                      const newSubtitle = [...compareSubtitle];
                      newSubtitle[index] = e.target.value;
                      setCompareSubtitle(newSubtitle);
                    }}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white text-center placeholder-gray-500"
                    placeholder={`Scale ${index + 1}`}
                  />
                  <div className="text-xs text-gray-500 mt-1">Position {index + 1}</div>
                </div>
              ))}
            </div>
          </div>

          {compareRows.map((row, rowIndex) => (
            <div key={rowIndex} className="mb-8 border border-gray-700 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-4">
                <input
                  type="text"
                  value={row.title}
                  onChange={(e) => updateCompareRowTitle(rowIndex, e.target.value)}
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white"
                  placeholder="Row title"
                />
                {compareRows.length > 1 && (
                  <button
                    onClick={() => removeCompareRow(rowIndex)}
                    className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
                  >
                    Remove
                  </button>
                )}
              </div>
              
              <div className={`grid gap-4`} style={{ gridTemplateColumns: `repeat(${compareRowSize}, 1fr)` }}>
                {Array.from({ length: compareRowSize }, (_, scaleIndex) => {
                  const scale = row.scales[scaleIndex];
                  const globalIndex = `${rowIndex}-${scaleIndex}`;
                  
                  return (
                    <div key={scaleIndex} className="text-center">
                      <div
                        className="bg-gray-800 border-2 border-gray-600 rounded-lg p-3 cursor-pointer hover:border-amber-500 transition-colors h-32 flex items-center justify-center"
                        onClick={() => setEditingIndex(globalIndex)}
                      >
                        {scale ? (
                          <div className="text-center">
                            <div className="font-semibold text-amber-400">{scale.name}</div>
                            <div className="text-xs text-gray-400 mt-1">Fret {scale.rootFret}</div>
                          </div>
                        ) : (
                          <div className="text-gray-500 text-sm">Scale {scaleIndex + 1}</div>
                        )}
                      </div>
                      <div className="mt-2 flex gap-2 justify-center">
                        <button
                          onClick={() => copyScale(scale || null)}
                          className="px-2 py-1 text-xs bg-gray-700 hover:bg-gray-600 rounded text-white"
                        >
                          Copy
                        </button>
                        <button
                          onClick={() => pasteCompareScale(rowIndex, scaleIndex)}
                          disabled={!copiedScale}
                          className={`px-2 py-1 text-xs rounded text-white ${copiedScale ? 'bg-green-700 hover:bg-green-600' : 'bg-gray-600 opacity-50 cursor-not-allowed'}`}
                        >
                          Paste
                        </button>
                      {scale && (
                        <button
                          onClick={() => clearCompareScale(rowIndex, scaleIndex)}
                            className="px-2 py-1 text-xs bg-red-600 hover:bg-red-700 rounded text-white"
                        >
                          Clear
                        </button>
                      )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Normal Mode UI */}
      {!compareMode && (
        <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${Math.min(gridSize, 4)}, 1fr)`, maxWidth: `${gridSize * 200}px`, margin: '0 auto' }}>
          {scales.map((scale, index) => (
            <div
              key={index}
              className={`text-center transition-all duration-200 ${
                dragOverIndex === index ? 'scale-105 bg-amber-900/20' : ''
              }`}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
            >
              <div
                className="bg-gray-800 border-2 border-gray-600 rounded-lg p-4 cursor-pointer hover:border-amber-500 transition-colors h-32 flex items-center justify-center"
                onClick={() => startEditing(index)}
              >
                {scale ? (
                  <div className="text-center">
                    <div className="font-semibold text-amber-400">{scale.name}</div>
                    <div className="text-xs text-gray-400 mt-1">Fret {scale.rootFret}</div>
                  </div>
                ) : (
                  <div className="text-gray-500">Scale {index + 1}</div>
                )}
              </div>
              <div className="mt-2 flex gap-2 justify-center">
                <button
                  onClick={() => copyScale(scale)}
                  className="px-2 py-1 text-xs bg-gray-700 hover:bg-gray-600 rounded text-white"
                >
                  Copy
                </button>
                <button
                  onClick={() => pasteScale(index)}
                  disabled={!copiedScale}
                  className={`px-2 py-1 text-xs rounded text-white ${copiedScale ? 'bg-green-700 hover:bg-green-700' : 'bg-gray-600 opacity-50 cursor-not-allowed'}`}
                >
                  Paste
                </button>
              {scale && (
                <button
                  onClick={() => clearScale(index)}
                    className="px-2 py-1 text-xs bg-red-600 hover:bg-red-700 rounded text-white"
                >
                  Clear
                </button>
              )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* File Operations */}
      <div className="flex flex-wrap gap-4 justify-center">
        <button
          onClick={createNewProgression}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
        >
          New Progression
        </button>
        <label className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded cursor-pointer">
          Load Progression
          <input
            type="file"
            accept=".json"
            onChange={loadProgression}
            className="hidden"
          />
        </label>
        <button
          onClick={saveProgression}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded"
        >
          Save Progression
        </button>
        <button
          onClick={exportAsImage}
          className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded font-semibold"
        >
          Export as Image
        </button>
      </div>

      {/* Scale Editor Modal (placeholder) */}
      {editingIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-amber-400">Edit Scale Diagram</h2>
              <button
                onClick={() => setEditingIndex(null)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>
            
            {/* Horizontal Scale Editor */}
            <ScaleEditor
              editingIndex={editingIndex}
              scales={scales}
              compareRows={compareRows}
              compareMode={compareMode}
              fretSpan={fretSpan}
              includeOpenStrings={includeOpenStrings}
              showNoteNames={showNoteNames}
              onUpdateScale={updateScale}
              onUpdateCompareScale={updateCompareRow}
              onClose={() => setEditingIndex(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ScaleDiagramBuilder; 