'use client';
import React, { useState } from 'react';
import HorizontalTriadMap from './HorizontalTriadMap';
import { getDiminishedShapes } from '../../utils/triads/diminishedTriads';

interface MajorKeyTriadSequenceProps {
  keyName: string;
  stringSet: string; // Currently supports '1_3'
}

const MAJOR_KEY_TRIADS = [
  { degree: 'I', type: 'Major', color: '#ef4444' },     // Red
  { degree: 'ii', type: 'Minor', color: '#f97316' },    // Orange
  { degree: 'iii', type: 'Minor', color: '#eab308' },   // Yellow
  { degree: 'IV', type: 'Major', color: '#22c55e' },    // Green
  { degree: 'V', type: 'Major', color: '#3b82f6' },     // Blue
  { degree: 'vi', type: 'Minor', color: '#8b5cf6' },    // Purple
  { degree: 'vii°', type: 'Diminished', color: '#ec4899' }, // Pink
];

const INVERSION_OPTIONS = ['Root Position', '1st Inversion', '2nd Inversion'];

// Main Component
const MajorKeyTriadSequence: React.FC<MajorKeyTriadSequenceProps> = ({ keyName, stringSet }) => {
  const [selectedInversion, setSelectedInversion] = useState('Root Position');

  const allTriadNotes = generateMajorKeySequence(keyName, stringSet, selectedInversion);

  // Calculate dynamic fret range
  const playedFrets = allTriadNotes.map((n: any) => n.fret);
  let startFret = 0;
  let fretCount = 15; // Default size

  if (playedFrets.length > 0) {
    const minFret = Math.min(...playedFrets);
    const maxFret = Math.max(...playedFrets);

    // Add padding of 1 fret, but don't go below 0
    startFret = Math.max(0, minFret - 1);
    // Ensure at least 12 frets are shown, with 2 frets padding on the right
    fretCount = Math.max(12, maxFret - startFret + 2);
  }

  return (
    <div className="mb-16">
      <h3 className="text-xl font-bold text-amber-700 mb-6 text-center">
        {keyName} Major Key Triad Sequence ({selectedInversion})
      </h3>
      
      <div className="mb-6 text-center text-gray-600 max-w-4xl mx-auto">
        <p className="mb-4">All seven diatonic triads of the C major scale flowing horizontally across the fretboard on strings 1–3 (G, B, E). Each color represents a different degree of the major scale.</p>
        <p className="text-sm bg-amber-50 border border-amber-200 rounded-lg p-4 mx-auto">
          <strong>Transposition tip:</strong> You can use this exact sequence pattern for any major key! Simply move every fret position up or down by the same number of frets. For example, move everything up 2 frets for D major, up 4 frets for E major, up 5 frets for F major, etc. <strong>Remember:</strong> The same shapes can also be found ±12 frets (one octave higher or lower).
        </p>
      </div>

      <div className="flex justify-center gap-4 mb-6">
        {INVERSION_OPTIONS.map(option => (
          <button
            key={option}
            className={`px-4 py-2 rounded font-semibold transition-all duration-200 ${selectedInversion === option ? 'bg-amber-600 text-white' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'}`}
            onClick={() => setSelectedInversion(option)}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <HorizontalTriadMap 
          triadNotes={allTriadNotes} 
          labelModeDefault="note" 
          startFret={startFret}
          fretCount={fretCount}
          useStandardStringOrder={false}
          hideLegend={true}
          skipFingerMode={true}
        />
      </div>
      
      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-4 text-center">Diatonic Triad Sequence</h4>
        <div className="grid grid-cols-7 gap-4 max-w-4xl mx-auto">
          {MAJOR_KEY_TRIADS.map((triad, idx) => (
            <div key={triad.degree} className="text-center">
              <div 
                className="w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold text-sm"
                style={{ backgroundColor: triad.color }}
              >
                {triad.degree}
              </div>
              <div className="text-sm font-semibold text-gray-800">
                {getTriadNameForDegree(keyName, idx)} {triad.type === 'Diminished' ? '°' : ''}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Data Generation Logic ---

function generateMajorKeySequence(keyName: string, stringSet: string, inversion: string) {
  const allNotes: any[] = [];
  const inversionIndex = INVERSION_OPTIONS.indexOf(inversion);

  // --- Helper Functions inside the main generator ---

  const transposeNote = (root: string, semitones: number, preferFlat = false): string => {
    const chromatic = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const chromaticFlats = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
    const scale = preferFlat ? chromaticFlats : chromatic;
    const rootIdx = chromatic.indexOf(root);
    if (rootIdx === -1) return root;
    const transposedIdx = (rootIdx + semitones + 12) % 12;
    return scale[transposedIdx];
  };

  const getKeyOffset = (key: string): number => {
      const KEY_OFFSETS: Record<string, number> = { C: 0, 'C#': 1, Db: 1, D: 2, 'D#': 3, Eb: 3, E: 4, F: 5, 'F#': 6, Gb: 6, G: 7, 'G#': 8, Ab: 8, A: 9, 'A#': 10, Bb: 10, B: 11 };
      return KEY_OFFSETS[key] ?? 0;
  };

  // --- Correct C Major Reference Shapes (from working blog post) ---

  const C_MAJOR_REFERENCE = {
    'Root Position': { frets: [5, 5, 3] }, // G=5th, B=5th, E=3rd fret
    '1st Inversion': { frets: [9, 8, 8] }, // G=9th, B=8th, E=8th fret
    '2nd Inversion': { frets: [12, 13, 12] }, // G=12th, B=13th, E=12th fret
  };

  const C_MINOR_REFERENCE = {
    'Root Position': { frets: [5, 4, 3] }, // G=5th, B=4th, E=3rd fret
    '1st Inversion': { frets: [8, 8, 8] }, // G=8th, B=8th, E=8th fret
    '2nd Inversion': { frets: [12, 13, 11] }, // G=12th, B=13th, E=11th fret
  };

  // --- Triad Builders ---

  const buildMajorMinorTriad = (key: string, triadType: 'Major' | 'Minor') => {
    const offset = getKeyOffset(key);
    const reference = triadType === 'Major' ? C_MAJOR_REFERENCE : C_MINOR_REFERENCE;
    const shape = reference[inversion as keyof typeof reference];
    
    const notes: { string: number; fret: number; note: string; interval: '1' | '3' | '5' }[] = [];
    const stringNumbers = [3, 2, 1]; // G, B, E
    const stringTunings = { 3: 'G', 2: 'B', 1: 'E' };

    const root = key;
    const third = transposeNote(key, triadType === 'Major' ? 4 : 3, triadType === 'Minor');
    const fifth = transposeNote(key, 7);

    for (let i = 0; i < 3; i++) {
        const stringNum = stringNumbers[i] as 3 | 2 | 1;
        const transposedFret = shape.frets[i] + offset;
        const openNote = stringTunings[stringNum];
        const noteName = transposeNote(openNote, transposedFret);
        
        let interval: '1' | '3' | '5' = '1';
        if (noteName === root) interval = '1';
        else if (noteName === third) interval = '3';
        else if (noteName === fifth) interval = '5';
        
        notes.push({ string: stringNum, fret: transposedFret, note: noteName, interval });
    }
    return notes;
  };

  const buildDiminishedTriad = (key: string) => {
    const shapes = getDiminishedShapes(key, '1_2_3'); // Corresponds to string set G-B-E
    const shape = shapes.find(s => s.inversion === inversion);
    if (!shape) return [];

    const notes: { string: number; fret: number; note: string; interval: '1' | '3' | '5' }[] = [];
    // According to diminishedTriads.ts: 1_2_3 (E-B-G): [E, B, G] - frets array is [E_fret, B_fret, G_fret]
    const stringData = [
      { num: 1, open: 'E', fret: shape.frets[0] }, // High E string - frets[0]
      { num: 2, open: 'B', fret: shape.frets[1] }, // B string - frets[1] 
      { num: 3, open: 'G', fret: shape.frets[2] }, // G string - frets[2]
    ];

    const root = key;
    const third = transposeNote(key, 3, true);
    const fifth = transposeNote(key, 6, true);

    stringData.forEach(data => {
      const noteName = transposeNote(data.open, data.fret);
      
      let interval: '1' | '3' | '5' = '1';
      if (noteName === root) interval = '1';
      else if (noteName === third) interval = '3';
      else if (noteName === fifth) interval = '5';

      notes.push({ string: data.num, fret: data.fret, note: noteName, interval });
    });

    return notes;
  };

  // --- Main Loop ---

  MAJOR_KEY_TRIADS.forEach((triadInfo, triadIndex) => {
    const triadRootName = getTriadNameForDegree(keyName, triadIndex);
    let triadNotes: any[] = [];

    if (triadInfo.type === 'Major' || triadInfo.type === 'Minor') {
      triadNotes = buildMajorMinorTriad(triadRootName, triadInfo.type);
    } else if (triadInfo.type === 'Diminished') {
      triadNotes = buildDiminishedTriad(triadRootName);
    }

    // Add color to each note
    triadNotes.forEach(note => {
      note.color = triadInfo.color;
    });

    allNotes.push(...triadNotes);
  });

  return allNotes;
}

// Helper function to reorder triads so the tonic (I) comes first
function reorderTriadsForVisualSequence(notes: any[]) {
  // Group notes by color (each color represents a triad)
  const notesByColor: Record<string, any[]> = {};
  notes.forEach(note => {
    if (!notesByColor[note.color]) {
      notesByColor[note.color] = [];
    }
    notesByColor[note.color].push(note);
  });

  // Get the colors in the order they appear in MAJOR_KEY_TRIADS
  const colorOrder = MAJOR_KEY_TRIADS.map(triad => triad.color);
  
  // Reorder so that the first triad (I - red) comes first
  const reorderedNotes: any[] = [];
  colorOrder.forEach(color => {
    if (notesByColor[color]) {
      reorderedNotes.push(...notesByColor[color]);
    }
  });

  return reorderedNotes;
}

// Helper function to get triad name for a degree in a key
function getTriadNameForDegree(key: string, degreeIdx: number): string {
  const chromatic = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const majorScaleIntervals = [0, 2, 4, 5, 7, 9, 11]; // Major scale intervals
  
  const keyIdx = chromatic.indexOf(key);
  if (keyIdx === -1) return key;
  
  const degreeInterval = majorScaleIntervals[degreeIdx];
  const triadRootIdx = (keyIdx + degreeInterval) % 12;
  return chromatic[triadRootIdx];
}

export default MajorKeyTriadSequence; 