'use client';
// @ts-nocheck

import React, { useState } from 'react';
import HorizontalTriadMap from '@/components/HorizontalTriadMap';
import ChordDiagram, { ChordData } from '@/components/ChordDiagram';
import { getDiminishedShapes } from '@/utils/triads/diminishedTriads';
import AUGMENTED_TRIADS_DATA from '@/utils/triads/augmentedTriads';
import { padTriadToSixStrings } from '../../../utils/triads/padTriadToSixStrings';

// Natural note keys
const MAJOR_KEYS = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const TRIAD_TYPES = ['Major', 'Minor', 'Diminished', 'Augmented'] as const;
type TriadType = typeof TRIAD_TYPES[number];

// Semitones from C for each key
const KEY_OFFSETS = {
  C: 0,
  D: 2,
  E: 4,
  F: 5,
  G: 7,
  A: 9,
  B: 11,
};

// Open string notes (E A D G B e)
const STRING_NOTES = ['E', 'A', 'D', 'G', 'B', 'E'];

// Add type for string sets
interface StringSetOption {
  label: string;
  value: string;
}
const STRING_SETS: StringSetOption[] = [
  { label: 'Strings 1–3', value: '1_3' },
  { label: 'Strings 2–4', value: '2_4' },
  { label: 'Strings 3–5', value: '3_5' },
  { label: 'Strings 4–6', value: '4_6' },
];

// Add inversion selector options
const INVERSION_LABELS = ['Root Position', '1st Inversion', '2nd Inversion'];
const STRING_SET_OFFSETS: Record<string, number> = { '1_3': 0, '2_4': 1, '3_5': 2, '4_6': 3 };

// Inversion rotation offsets for each string set
const INVERSION_ROTATION_OFFSETS: Record<string, number> = {
  '1_3': 0, // Root, 1st, 2nd
  '2_4': 2, // 2nd, Root, 1st
  '3_5': 1, // 1st, 2nd, Root
  '4_6': 0, // Root, 1st, 2nd
};

const INVERSION_LABELS_ROTATED: string[][] = [
  ['Root Position', '1st Inversion', '2nd Inversion'], // 1_3
  ['2nd Inversion', 'Root Position', '1st Inversion'], // 2_4
  ['1st Inversion', '2nd Inversion', 'Root Position'], // 3_5
  ['Root Position', '1st Inversion', '2nd Inversion'], // 4_6
];

// Inversion mapping table for each string set
const INVERSION_MAPPING: Record<string, number[]> = {
  '1_3': [0, 1, 2], // Root, 1st, 2nd
  '2_4': [2, 0, 1], // 2nd, Root, 1st
  '3_5': [1, 2, 0], // 1st, 2nd, Root
  '4_6': [0, 1, 2], // Root, 1st, 2nd
};

// Add a mapping from UI string set values to data keys
const STRING_SET_KEY_MAP: Record<string, string> = {
  '1_3': '1_2_3',
  '2_4': '2_3_4',
  '3_5': '3_4_5',
  '4_6': '4_5_6',
};

// Add mapping for triad string labels
const TRIAD_STRING_LABELS: Record<string, string[]> = {
  '1_3': ['G', 'B', 'E'],
  '2_4': ['D', 'G', 'B'],
  '3_5': ['A', 'D', 'G'],
  '4_6': ['E', 'A', 'D'],
};

// Helper: get fret for a note on a string
function getFretForNote(rootNote: string, targetNote: string, minFret: number = 0) {
  // All notes as semitones from C
  const chromatic = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const rootIdx = chromatic.indexOf(rootNote);
  const targetIdx = chromatic.indexOf(targetNote);
  let fret = (targetIdx - rootIdx + 12) % 12;
  while (fret < minFret) fret += 12;
  return fret;
}

// Helper: get note name n semitones above root (prefer flats for minor intervals)
function transposeNote(root: string, semitones: number, preferFlat: boolean = false) {
  const chromatic = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const chromaticFlats = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
  const scale = preferFlat ? chromaticFlats : chromatic;
  const idx = (chromatic.indexOf(root) + semitones) % 12;
  return scale[idx];
}

// Original C major triad data (our reference)
const C_MAJOR_REFERENCE = {
  // Shape 1: Root position (C on G string, 5th fret)
  shape1: {
    frets: [-1, -1, -1, 5, 5, 3],
    fingers: ['', '', '', '3', '4', '1'],
    startFret: 3,
    notes: ['C', 'E', 'G'],
    cagedShape: 'A',
  },
  // Shape 2: 1st inversion (E on G string, 9th fret)
  shape2: {
    frets: [-1, -1, -1, 9, 8, 8],
    fingers: ['', '', '', '2', '1', '1'],
    startFret: 8,
    notes: ['E', 'G', 'C'],
    cagedShape: 'E',
  },
  // Shape 3: 2nd inversion (G on G string, 12th fret)
  shape3: {
    frets: [-1, -1, -1, 12, 13, 12],
    fingers: ['', '', '', '1', '3', '2'],
    startFret: 12,
    notes: ['G', 'C', 'E'],
    cagedShape: 'D',
  },
};

// Original C minor triad data (flatten the 3rd)
const C_MINOR_REFERENCE = {
  // Shape 1: Root position (C on G string, 5th fret) - Am shape
  shape1: {
    frets: [-1, -1, -1, 5, 4, 3], // E A D G B e (B string moves down 1 fret)
    fingers: ['', '', '', '3', '2', '1'],
    startFret: 3,
    notes: ['C', 'Eb', 'G'], // G, B, E strings
    cagedShape: 'Am',
  },
  // Shape 2: 1st inversion (Eb on G string, 8th fret) - Em shape (barred)
  shape2: {
    frets: [-1, -1, -1, 8, 8, 8], // E A D G B e (all same fret - barred)
    fingers: ['', '', '', '1', '1', '1'],
    startFret: 8,
    notes: ['Eb', 'G', 'C'], // G, B, E strings
    cagedShape: 'Em',
  },
  // Shape 3: 2nd inversion (G on G string, 12th fret) - Dm shape
  shape3: {
    frets: [-1, -1, -1, 12, 13, 11], // E A D G B e (proper Dm shape: 12-13-11)
    fingers: ['', '', '', '2', '3', '1'],
    startFret: 11,
    notes: ['G', 'C', 'Eb'], // G, B, E strings
    cagedShape: 'Dm',
  },
};

// Major triad reference shapes for each string set (C as root)
const C_MAJOR_REFERENCE_1_3 = {
  // Shape 1: Root position (C on G string, 5th fret)
  shape1: {
    frets: [-1, -1, -1, 5, 5, 3],
    fingers: ['', '', '', '3', '4', '1'],
    startFret: 3,
    notes: ['C', 'E', 'G'],
    cagedShape: 'A',
  },
  // Shape 2: 1st inversion (E on G string, 9th fret)
  shape2: {
    frets: [-1, -1, -1, 9, 8, 8],
    fingers: ['', '', '', '2', '1', '1'],
    startFret: 8,
    notes: ['E', 'G', 'C'],
    cagedShape: 'E',
  },
  // Shape 3: 2nd inversion (G on G string, 12th fret)
  shape3: {
    frets: [-1, -1, -1, 12, 13, 12],
    fingers: ['', '', '', '1', '3', '2'],
    startFret: 12,
    notes: ['G', 'C', 'E'],
    cagedShape: 'D',
  },
};
const C_MAJOR_REFERENCE_2_4 = {
  // Shape 1: Root position (C on D string, 10th fret)
  shape1: {
    frets: [-1, -1, 10, 9, 8, -1],
    fingers: ['', '', '3', '2', '1', ''],
    startFret: 8,
    notes: ['C', 'E', 'G'],
    cagedShape: 'G',
  },
  // Shape 2: 1st inversion (E on D string, 14th fret)
  shape2: {
    frets: [-1, -1, 14, 12, 13, -1],
    fingers: ['', '', '3', '1', '2', ''],
    startFret: 12,
    notes: ['E', 'G', 'C'],
    cagedShape: 'E',
  },
  // Shape 3: 2nd inversion (G on D string, 5th fret)
  shape3: {
    frets: [-1, -1, 5, 5, 5, -1],
    fingers: ['', '', '1', '1', '1', ''],
    startFret: 5,
    notes: ['G', 'C', 'E'],
    cagedShape: 'C',
  },
};
const C_MAJOR_REFERENCE_3_5 = {
  // Shape 1: 2nd inversion (G on A string, 10th fret)
  shape1: {
    frets: [-1, 10, 10, 9, -1, -1],
    fingers: ['', '3', '2', '1', '', ''],
    startFret: 9,
    notes: ['G', 'C', 'E'],
    cagedShape: 'E',
  },
  // Shape 2: 1st inversion (E on A string, 7th fret)
  shape2: {
    frets: [-1, 7, 5, 5, -1, -1],
    fingers: ['', '3', '1', '1', '', ''],
    startFret: 5,
    notes: ['E', 'G', 'C'],
    cagedShape: 'G',
  },
  // Shape 3: Root position (C on A string, 15th fret)
  shape3: {
    frets: [-1, 15, 14, 12, -1, -1],
    fingers: ['', '4', '3', '1', '', ''],
    startFret: 12,
    notes: ['C', 'E', 'G'],
    cagedShape: 'A',
  },
};
const C_MAJOR_REFERENCE_4_6 = {
  // Root position: C (8th fret E), E (7th fret A), G (5th fret D)
  shape1: {
    frets: [8, 7, 5, -1, -1, -1], // E, A, D, G, B, e
    fingers: ['3', '2', '1', '', '', ''],
    startFret: 5,
    notes: ['C', 'E', 'G'],
    cagedShape: 'E',
  },
  // 1st inversion: E (12th fret E), G (10th fret A), C (10th fret D)
  shape2: {
    frets: [12, 10, 10, -1, -1, -1], // E, A, D, G, B, e
    fingers: ['3', '1', '1', '', '', ''],
    startFret: 10,
    notes: ['E', 'G', 'C'],
    cagedShape: 'C',
  },
  // 2nd inversion: G (3rd fret E), C (3rd fret A), E (2nd fret D)
  shape3: {
    frets: [3, 3, 2, -1, -1, -1], // E, A, D, G, B, e
    fingers: ['2', '3', '1', '', '', ''],
    startFret: 2,
    notes: ['G', 'C', 'E'],
    cagedShape: 'A',
  },
};

function getMajorReferenceForSet(set: string) {
  if (set === '1_3') return C_MAJOR_REFERENCE_1_3;
  if (set === '2_4') return C_MAJOR_REFERENCE_2_4;
  if (set === '3_5') return C_MAJOR_REFERENCE_3_5;
  if (set === '4_6') return C_MAJOR_REFERENCE_4_6;
  return C_MAJOR_REFERENCE_1_3;
}

function getMinorReferenceForSet(set: string) {
  if (set === '1_3') return C_MINOR_REFERENCE_1_3;
  if (set === '2_4') return C_MINOR_REFERENCE_2_4;
  if (set === '3_5') return C_MINOR_REFERENCE_3_5;
  if (set === '4_6') return C_MINOR_REFERENCE_4_6;
  return C_MINOR_REFERENCE_1_3;
}

function getAugmentedReferenceForSet(set: string) {
  if (set === '1_3') return C_AUGMENTED_REFERENCE_1_3;
  if (set === '2_4') return C_AUGMENTED_REFERENCE_2_4;
  if (set === '3_5') return C_AUGMENTED_REFERENCE_3_5;
  if (set === '4_6') return C_AUGMENTED_REFERENCE_4_6;
  return C_AUGMENTED_REFERENCE_1_3;
}

// Helper: map inversion index for each string set based on selected inversion for 1-3
function getMappedInversion(selectedInversion: number, stringSet: string): number {
  // Rotation logic:
  // 1-3: [root, 1st, 2nd]
  // 2-4: [2nd, root, 1st]
  // 3-5: [1st, 2nd, root]
  // 4-6: [root, 1st, 2nd]
  // For selectedInversion = 0 (root), 1 (1st), 2 (2nd)
  const mapping: Record<string, number[]> = {
    '1_3':    [0, 1, 2],
    '2_4':    [2, 0, 1],
    '3_5':    [1, 2, 0],
    '4_6':    [0, 1, 2],
  };
  return mapping[stringSet][selectedInversion];
}

// Map string set to correct string numbers (lowest to highest)
const STRING_SET_TO_STRINGS: Record<string, [number, number, number]> = {
  '1_3': [3, 2, 1],
  '2_4': [4, 3, 2],
  '3_5': [5, 4, 3],
  '4_6': [6, 5, 4],
};

// Helper to get inversion label based on lowest note in the shape
function getInversionLabelForShape(notes: string[], key: string): string {
  // notes: [lowest, middle, highest]
  if (!notes || notes.length < 1) return '';
  const root = key;
  const third = transposeNote(key, 4);
  const fifth = transposeNote(key, 7);
  if (notes[0] === root) return 'Root Position';
  if (notes[0] === third) return '1st Inversion';
  if (notes[0] === fifth) return '2nd Inversion';
  return '';
}

// Update buildTriadDataForKey to accept stringSet and selectedInversion as parameters:
function buildTriadDataForKey(key: string, triadType: TriadType, subType?: 'Diminished' | 'Augmented', showFullFretboard?: boolean, stringSet: string = '1_3') {
  if (triadType === 'Diminished') {
    return { diagrams: [], triadNotes: [], reference: null };
  }
  const offset = KEY_OFFSETS[key as keyof typeof KEY_OFFSETS];
  let reference: any = null;
  let shapes: any[] | null = null;
  if (triadType === 'Major') {
    reference = getMajorReferenceForSet(stringSet);
    shapes = [reference.shape1, reference.shape2, reference.shape3];
  } else if (triadType === 'Minor') {
    reference = getMinorReferenceForSet(stringSet);
    shapes = [reference.shape1, reference.shape2, reference.shape3];
  } else if (triadType === 'Diminished') {
    const dataStringSet = STRING_SET_KEY_MAP[stringSet] || stringSet;
    reference = getDiminishedShapes(key, dataStringSet);
    if (!reference) return { diagrams: [], triadNotes: [], reference: null };
    shapes = [reference.shape1, reference.shape2, reference.shape3];
  } else if (triadType === 'Augmented') {
    reference = getAugmentedReferenceForSet(stringSet);
    shapes = [reference.shape1, reference.shape2, reference.shape3];
  }

  function transposeNote(rootNote: string, semitones: number, isMinor = false): string {
    const chromatic = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const rootIdx = chromatic.indexOf(rootNote);
    return chromatic[(rootIdx + semitones) % 12];
  }

  function adjustFingersForOctaveDown(frets: number[], originalFingers: string[]): string[] {
    const adjustedFingers = [...originalFingers];
    // Clear all finger assignments first
    for (let i = 0; i < adjustedFingers.length; i++) {
      adjustedFingers[i] = '';
    }
    // Find all played frets (ignore -1)
    const playedFrets = frets
      .map((fret, stringIdx) => ({ fret, stringIdx }))
      .filter(({ fret }) => fret >= 0);
    if (playedFrets.length === 0) return adjustedFingers;
    // Find the lowest non-zero fret (ignore open strings)
    const nonOpenFrets = playedFrets.filter(({ fret }) => fret > 0);
    if (nonOpenFrets.length === 0) {
      // All open strings, just mark as '0'
      for (const { fret, stringIdx } of playedFrets) {
        if (fret === 0) adjustedFingers[stringIdx] = '0';
      }
      return adjustedFingers;
    }
    const minFret = Math.min(...nonOpenFrets.map(({ fret }) => fret));
    // Assign fingers based on ergonomic rule
    for (const { fret, stringIdx } of playedFrets) {
      if (fret === 0) {
        adjustedFingers[stringIdx] = '0';
      } else {
        const fingerNum = Math.min(4, fret - minFret + 1); // 1 for minFret, 2 for minFret+1, etc.
        adjustedFingers[stringIdx] = fingerNum.toString();
      }
    }
    return adjustedFingers;
  }

  function adjustForHighFrets(frets: number[], originalStartFret: number) {
    const activeFrets = frets.filter(f => f >= 0);
    const maxFret = Math.max(...activeFrets);
    const minFret = Math.min(...activeFrets);
    let adjustedFrets = frets;
    let adjustedStartFret = originalStartFret;
    if (maxFret > 15) {
      adjustedFrets = frets.map(f => f > 0 ? f - 12 : f);
      const newActiveFrets = adjustedFrets.filter(f => f >= 0);
      const newMinFret = Math.min(...newActiveFrets);
      adjustedStartFret = newMinFret === 0 ? 0 : Math.max(1, newMinFret - 1);
    } else {
      adjustedStartFret = minFret === 0 ? 0 : Math.max(1, minFret - 1);
    }
    return { frets: adjustedFrets, startFret: adjustedStartFret };
  }

  // Add type guard for triadType (move outside component)
  function isMajorOrMinorTriadType(type: TriadType): type is 'Major' | 'Minor' {
    return type === 'Major' || type === 'Minor';
  }

  if (isMajorOrMinorTriadType(triadType) && !showFullFretboard) {
    if (!shapes) return { diagrams: [], triadNotes: [], reference: null };
    const inversionOffsets: Record<string, number> = {
      '1_3': 0,
      '2_4': 2,
      '3_5': 1,
      '4_6': 0,
    };
    const offsetIdx = inversionOffsets[stringSet];
    const diagrams = [0, 1, 2].map((i) => {
      const mappedInversion = (offsetIdx + i) % 3;
      const shape = shapes[mappedInversion];
      // Use the correct string mapping for each set
      const numberFrets = [...shape.frets];
      const fingers = [...shape.fingers];
      // Offset the frets for the selected key
      for (let j = 0; j < numberFrets.length; j++) {
        if (typeof numberFrets[j] === 'number' && numberFrets[j] >= 0) {
          numberFrets[j] = numberFrets[j] + offset;
        }
      }
      // Improved startFret logic: set to 0 if any open string, else to min played fret
      const playedFrets = numberFrets.filter(f => f >= 0);
      const minFret = playedFrets.length ? Math.min(...playedFrets) : 1;
      const startFret = minFret === 0 ? 0 : minFret;
      return {
        frets: numberFrets,
        fingers,
        startFret,
        cagedShape: shape.cagedShape,
        notes: shape.notes,
      };
    });
    // Apply octave-down rule to these diagrams too
    const octaveAdjustedDiagrams = diagrams.map((diagram, idx) => {
      const playedFrets = diagram.frets.filter((f): f is number => typeof f === 'number' && f >= 0);
      const minFret = playedFrets.length ? Math.min(...playedFrets) : 0;
      
      if (minFret >= 12) {
        const octaveDownFrets = diagram.frets.map((f: number) => f >= 0 ? f - 12 : f);
        const newPlayedFrets = octaveDownFrets.filter((f): f is number => typeof f === 'number' && f >= 0);
        const newMinFret = newPlayedFrets.length ? Math.min(...newPlayedFrets) : 0;
        const newStartFret = newMinFret === 0 ? 0 : Math.max(1, newMinFret - 1);
        
        // Adjust fingerings for octave-down shapes
        const adjustedFingers = adjustFingersForOctaveDown(octaveDownFrets, diagram.fingers);
        
        return {
          ...diagram,
          frets: octaveDownFrets,
          startFret: newStartFret,
          fingers: adjustedFingers
        };
      }
      
      return diagram;
    });

    // Sort diagrams by their final startFret and min played fret positions
    const sortedDiagrams = octaveAdjustedDiagrams.slice().sort((a, b) => {
      const sfA = a.startFret ?? 0;
      const sfB = b.startFret ?? 0;
      if (sfA !== sfB) return sfA - sfB;
      const playedA = a.frets.filter((f: number) => f >= 0);
      const playedB = b.frets.filter((f: number) => f >= 0);
      for (let i = 0; i < Math.max(playedA.length, playedB.length); i++) {
        if ((playedA[i] ?? 100) !== (playedB[i] ?? 100)) {
          return (playedA[i] ?? 100) - (playedB[i] ?? 100);
        }
      }
      return 0;
    });

    // For horizontal map, build triadNotes using the sorted octave-adjusted diagrams
    // Helper to get chromatic index for a note name (handles sharps/flats)
    function getChromaticIndex(note: string) {
      const chromatic = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
      const chromaticFlats = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
      let idx = chromatic.indexOf(note);
      if (idx === -1) idx = chromaticFlats.indexOf(note);
      return idx;
    }
    const triadNotes = sortedDiagrams.flatMap((diagram, idx) => {
      // Find the played strings for this diagram
      const playedStrings = diagram.frets
        .map((fret, stringIdx) => ({ fret, stringIdx }))
        .filter(({ fret }) => fret >= 0)
        .map(({ stringIdx }) => stringIdx);
      return playedStrings.map((stringIdx, noteIdx) => {
        const noteName = diagram.notes[noteIdx];
        let interval = '1';
        const root = key;
        const third = transposeNote(key, triadType === 'Major' ? 4 : 3, triadType === 'Minor');
        const thirdSharp = transposeNote(key, triadType === 'Major' ? 4 : 3, false);
        const thirdFlat = transposeNote(key, triadType === 'Major' ? 4 : 3, true);
        const fifth = transposeNote(key, 7);
        const noteIdxVal = getChromaticIndex(noteName);
        const rootIdx = getChromaticIndex(root);
        const thirdIdx = getChromaticIndex(third);
        const thirdSharpIdx = getChromaticIndex(thirdSharp);
        const thirdFlatIdx = getChromaticIndex(thirdFlat);
        const fifthIdx = getChromaticIndex(fifth);
        if (noteIdxVal === rootIdx) interval = '1';
        else if (noteIdxVal === thirdIdx || noteIdxVal === thirdSharpIdx || noteIdxVal === thirdFlatIdx) interval = '3';
        else if (noteIdxVal === fifthIdx) interval = '5';
        return {
          string: stringIdx + 1,
          fret: diagram.frets[stringIdx],
          note: noteName,
          interval,
          finger: diagram.fingers[stringIdx],
          shapeIndex: idx,
        };
      });
    });

    return { diagrams: sortedDiagrams, triadNotes, reference };
  }
  
  // Extrapolate all major triad shapes across the fretboard if showFullFretboard is true
  if (triadType === 'Major' && showFullFretboard) {
    const shapes = [reference.shape1, reference.shape2, reference.shape3];
    const triadNotes: any[] = [];
    const diagrams: any[] = [];
    // For each shape, try all possible positions from fret 0 to 24 (allow open strings)
    for (let shapeIdx = 0; shapeIdx < shapes.length; shapeIdx++) {
      const shape = shapes[shapeIdx];
      // Determine the required note for the lowest string for this inversion
      let requiredNote;
      if (shapeIdx === 0) requiredNote = key; // Root position: root
      else if (shapeIdx === 1) requiredNote = transposeNote(key, 4); // 1st inversion: major 3rd
      else if (shapeIdx === 2) requiredNote = transposeNote(key, 7); // 2nd inversion: 5th
      for (let baseFret = 0; baseFret <= 24; baseFret++) {
        // Calculate the frets for this shape at this position
        const frets = [-1, -1, -1,
          baseFret,
          baseFret + (shape.frets[4] - shape.frets[3]),
          baseFret + (shape.frets[5] - shape.frets[3])
        ];
        // Only include if all frets are within 0-24 (allow open strings)
        if ([frets[3], frets[4], frets[5]].every(f => f >= 0 && f <= 24)) {
          // Calculate note names
          const lowestNote = transposeNote(STRING_NOTES[6 - 3], frets[3]); // G string open + fret
          // Only add if the lowest note matches the required note for this inversion
          if (lowestNote === requiredNote) {
            const rootNote = transposeNote(key, baseFret - shape.frets[3]);
            const thirdNote = transposeNote(rootNote, 4); // Major 3rd
            const fifthNote = transposeNote(rootNote, 7); // Perfect 5th
            triadNotes.push(
              { string: 3, fret: frets[3], note: rootNote, interval: '1', finger: shape.fingers[3], shapeIndex: shapeIdx },
              { string: 2, fret: frets[4], note: thirdNote, interval: '3', finger: shape.fingers[4], shapeIndex: shapeIdx },
              { string: 1, fret: frets[5], note: fifthNote, interval: '5', finger: shape.fingers[5], shapeIndex: shapeIdx },
            );
          }
        }
      }
    }
    // For diagrams, just show the main three shapes as before
    for (let shapeIdx = 0; shapeIdx < shapes.length; shapeIdx++) {
      const shape = shapes[shapeIdx];
      const baseFrets = [-1, -1, -1,
        shape.frets[3] + offset,
        shape.frets[4] + offset,
        shape.frets[5] + offset
      ];
      const baseStartFret = shape.startFret + offset;
      const adjusted = adjustForHighFrets(baseFrets, baseStartFret);
      diagrams.push({
        frets: adjusted.frets,
        fingers: shape.fingers,
        startFret: adjusted.startFret,
      });
    }
    return { diagrams, triadNotes, reference };
  }
  
  // Transpose each shape
  const diagrams: ChordData[] = [
    // Shape 1
    (() => {
      const baseFrets = [-1, -1, -1, 
        reference.shape1.frets[3] + offset, 
        reference.shape1.frets[4] + offset, 
        reference.shape1.frets[5] + offset
      ];
      const baseStartFret = reference.shape1.startFret + offset;
      const adjusted = adjustForHighFrets(baseFrets, baseStartFret);
      return {
        frets: adjusted.frets,
        fingers: reference.shape1.fingers,
        startFret: adjusted.startFret,
      };
    })(),
    // Shape 2
    (() => {
      const baseFrets = [-1, -1, -1, 
        reference.shape2.frets[3] + offset, 
        reference.shape2.frets[4] + offset, 
        reference.shape2.frets[5] + offset
      ];
      const baseStartFret = reference.shape2.startFret + offset;
      const adjusted = adjustForHighFrets(baseFrets, baseStartFret);
      return {
        frets: adjusted.frets,
        fingers: reference.shape2.fingers,
        startFret: adjusted.startFret,
      };
    })(),
    // Shape 3
    (() => {
      const baseFrets = [-1, -1, -1, 
        reference.shape3.frets[3] + offset, 
        reference.shape3.frets[4] + offset, 
        reference.shape3.frets[5] + offset
      ];
      const baseStartFret = reference.shape3.startFret + offset;
      const adjusted = adjustForHighFrets(baseFrets, baseStartFret);
      return {
        frets: adjusted.frets,
        fingers: reference.shape3.fingers,
        startFret: adjusted.startFret,
      };
    })(),
  ];

  // Build triad notes for horizontal map (also adjust for high frets)
  const shape1Frets = [
    reference.shape1.frets[3] + offset,
    reference.shape1.frets[4] + offset,
    reference.shape1.frets[5] + offset
  ];
  const shape2Frets = [
    reference.shape2.frets[3] + offset,
    reference.shape2.frets[4] + offset,
    reference.shape2.frets[5] + offset
  ];
  const shape3Frets = [
    reference.shape3.frets[3] + offset,
    reference.shape3.frets[4] + offset,
    reference.shape3.frets[5] + offset
  ];

  // REMOVE: Do not adjust shapes if they go too high
  // const adjustedShape1 = Math.max(...shape1Frets) > 15 ? shape1Frets.map(f => f - 12) : shape1Frets;
  // const adjustedShape2 = Math.max(...shape2Frets) > 15 ? shape2Frets.map(f => f - 12) : shape2Frets;
  // const adjustedShape3 = Math.max(...shape3Frets) > 15 ? shape3Frets.map(f => f - 12) : shape3Frets;
  const adjustedShape1 = shape1Frets;
  const adjustedShape2 = shape2Frets;
  const adjustedShape3 = shape3Frets;

  // Calculate note names based on triad type
  let thirdInterval: number = 4, fifthInterval: number = 7, useFlats: boolean = false;
  
  // For Major and Minor triads only
    thirdInterval = triadType === 'Major' ? 4 : 3;
    fifthInterval = 7; // Perfect 5th
    useFlats = triadType === 'Minor';
  
  const stringNumbers = STRING_SET_TO_STRINGS[stringSet] || [3, 2, 1];

  // Group triad notes by shape for sorting
  const triadNotesByShape = [
    [
      { string: stringNumbers[0], fret: adjustedShape1[0] ?? 0, note: transposeNote(key, 0), interval: '1' as const, finger: (reference.shape1.fingers[3] ?? '').toString() },
      { string: stringNumbers[1], fret: adjustedShape1[1] ?? 0, note: transposeNote(key, thirdInterval, useFlats), interval: '3' as const, finger: (reference.shape1.fingers[4] ?? '').toString() },
      { string: stringNumbers[2], fret: adjustedShape1[2] ?? 0, note: transposeNote(key, fifthInterval, useFlats), interval: '5' as const, finger: (reference.shape1.fingers[5] ?? '').toString() },
    ],
    [
      { string: stringNumbers[0], fret: adjustedShape2[0] ?? 0, note: transposeNote(key, thirdInterval, useFlats), interval: '3' as const, finger: (reference.shape2.fingers[3] ?? '').toString() },
      { string: stringNumbers[1], fret: adjustedShape2[1] ?? 0, note: transposeNote(key, fifthInterval, useFlats), interval: '5' as const, finger: (reference.shape2.fingers[4] ?? '').toString() },
      { string: stringNumbers[2], fret: adjustedShape2[2] ?? 0, note: transposeNote(key, 0), interval: '1' as const, finger: (reference.shape2.fingers[5] ?? '').toString() },
    ],
    [
      { string: stringNumbers[0], fret: adjustedShape3[0] ?? 0, note: transposeNote(key, fifthInterval, useFlats), interval: '5' as const, finger: (reference.shape3.fingers[3] ?? '').toString() },
      { string: stringNumbers[1], fret: adjustedShape3[1] ?? 0, note: transposeNote(key, 0), interval: '1' as const, finger: (reference.shape3.fingers[4] ?? '').toString() },
      { string: stringNumbers[2], fret: adjustedShape3[2] ?? 0, note: transposeNote(key, thirdInterval, useFlats), interval: '3' as const, finger: (reference.shape3.fingers[5] ?? '').toString() },
    ],
  ];
  // Sort shapes by minimum fret (ignoring muted strings)
  triadNotesByShape.sort((a, b) => {
    const aFrets = a.map(n => n.fret).filter(f => f > 0);
    const bFrets = b.map(n => n.fret).filter(f => f > 0);
    const minA = Math.min(...(aFrets.length ? aFrets : [0]));
    const minB = Math.min(...(bFrets.length ? bFrets : [0]));
    return minA - minB;
  });
  // Flatten for the map
  const triadNotes = triadNotesByShape.flat();

  // Apply octave-down rule first: if lowest fret is 12+, move down an octave
  const octaveAdjustedDiagrams = diagrams.map((diagram, idx) => {
    const playedFrets = diagram.frets.filter((f: number) => f >= 0);
    const minFret = playedFrets.length ? Math.min(...playedFrets) : 0;
    
           if (minFret >= 12) {
         const octaveDownFrets = diagram.frets.map((f: number) => f >= 0 ? f - 12 : f);
         const newPlayedFrets = octaveDownFrets.filter((f: number) => f >= 0);
         const newMinFret = newPlayedFrets.length ? Math.min(...newPlayedFrets) : 0;
         const newStartFret = newMinFret === 0 ? 0 : Math.max(1, newMinFret - 1);
         
         // Adjust fingerings for octave-down shapes
         const adjustedFingers = adjustFingersForOctaveDown(octaveDownFrets, (diagram as any).fingers || []);
         
         return {
           ...diagram,
           frets: octaveDownFrets,
           startFret: newStartFret,
           fingers: adjustedFingers
         };
       }
    
    return diagram;
  });

  // Then sort diagrams by their final startFret and min played fret positions
  const sortedDiagrams = octaveAdjustedDiagrams.slice().sort((a, b) => {
    const sfA = a.startFret ?? 0;
    const sfB = b.startFret ?? 0;
    if (sfA !== sfB) return sfA - sfB;
    const playedA = a.frets.filter((f: number) => f >= 0);
    const playedB = b.frets.filter((f: number) => f >= 0);
    for (let i = 0; i < Math.max(playedA.length, playedB.length); i++) {
      if ((playedA[i] ?? 100) !== (playedB[i] ?? 100)) {
        return (playedA[i] ?? 100) - (playedB[i] ?? 100);
      }
    }
    return 0;
  });

  return { diagrams: sortedDiagrams, triadNotes, reference };
}

const TRIAD_LABELS = [
  {
    label: 'Root Position',
    fingering: (triadType: TriadType, subType?: 'Diminished' | 'Augmented') => {
      if (triadType === 'Diminished') {
        return subType === 'Augmented' ? '2 (G), 3 (B), 1 (E)' : '4 (G), 3 (B), 1 (E)';
      }
      return triadType === 'Major' ? '3 (G), 4 (B), 1 (E)' : '3 (G), 2 (B), 1 (E)';
    },
    name: (key: string, triadType: TriadType, subType?: 'Diminished' | 'Augmented') => {
      if (triadType === 'Diminished' && subType === 'Augmented') {
        return `${key} Augmented Shape`;
      }
      if (triadType === 'Diminished') {
        return `${key} ${subType} (Root Position)`;
      }
      return `${key} ${triadType} (Root Position)`;
    },
    shapeColor: '#ef4444', // red
  },
  {
    label: '1st Inversion',
    fingering: (triadType: TriadType, subType?: 'Diminished' | 'Augmented') => {
      if (triadType === 'Diminished') {
        return subType === 'Augmented' ? '2 (G), 3 (B), 1 (E)' : '2 (G), 1 (B), 3 (E)';
      }
      return triadType === 'Major' ? '2 (G), 1 (B), 1 (E)' : '1 (G), 1 (B), 1 (E)';
    },
    name: (key: string, triadType: TriadType, subType?: 'Diminished' | 'Augmented') => {
      if (triadType === 'Diminished' && subType === 'Augmented') {
        return `${key} Augmented Shape`;
      }
      if (triadType === 'Diminished') {
        return `${key} ${subType} (1st Inversion)`;
      }
      return `${key} ${triadType} (1st Inversion)`;
    },
    shapeColor: '#3b82f6', // blue
  },
  {
    label: '2nd Inversion',
    fingering: (triadType: TriadType, subType?: 'Diminished' | 'Augmented') => {
      if (triadType === 'Diminished') {
        return subType === 'Augmented' ? '2 (G), 3 (B), 1 (E)' : '1 (G), 3 (B), 1 (E)';
      }
      return triadType === 'Major' ? '1 (G), 3 (B), 2 (E)' : '2 (G), 3 (B), 1 (E)';
    },
    name: (key: string, triadType: TriadType, subType?: 'Diminished' | 'Augmented') => {
      if (triadType === 'Diminished' && subType === 'Augmented') {
        return `${key} Augmented Shape`;
      }
      if (triadType === 'Diminished') {
        return `${key} ${subType} (2nd Inversion)`;
      }
      return `${key} ${triadType} (2nd Inversion)`;
    },
    shapeColor: '#10b981', // green
  },
];

const C_MINOR_REFERENCE_1_3 = C_MINOR_REFERENCE;
const C_MINOR_REFERENCE_2_4 = {
  // Root position: C (D string 10), Eb (G string 8), G (B string 8)
  shape1: {
    frets: [-1, -1, 10, 8, 8, -1],
    fingers: ['', '', '3', '1', '1', ''],
    startFret: 8,
    notes: ['C', 'Eb', 'G'],
    cagedShape: 'Gm',
  },
  // 1st inversion: Eb (D string 13), G (G string 12), C (B string 13)
  shape2: {
    frets: [-1, -1, 13, 12, 13, -1],
    fingers: ['', '', '3', '1', '4', ''],
    startFret: 12,
    notes: ['Eb', 'G', 'C'],
    cagedShape: 'Em',
  },
  // 2nd inversion: G (D string 5), C (G string 5), Eb (B string 4)
  shape3: {
    frets: [-1, -1, 5, 5, 4, -1],
    fingers: ['', '', '2', '3', '1', ''],
    startFret: 4,
    notes: ['G', 'C', 'Eb'],
    cagedShape: 'Cm',
  },
};
const C_MINOR_REFERENCE_3_5 = {
  // Root position: C (A string 15), Eb (D string 13), G (G string 12)
  shape1: {
    frets: [-1, 15, 13, 12, -1, -1],
    fingers: ['', '4', '2', '1', '', ''],
    startFret: 12,
    notes: ['C', 'Eb', 'G'],
    cagedShape: 'Am',
  },
  // 1st inversion: Eb (A string 6), G (D string 5), C (G string 5)
  shape2: {
    frets: [-1, 6, 5, 5, -1, -1],
    fingers: ['', '3', '1', '1', '', ''],
    startFret: 5,
    notes: ['Eb', 'G', 'C'],
    cagedShape: 'Gm',
  },
  // 2nd inversion: G (A string 10), C (D string 10), Eb (G string 8)
  shape3: {
    frets: [-1, 10, 10, 8, -1, -1],
    fingers: ['', '3', '2', '1', '', ''],
    startFret: 8,
    notes: ['G', 'C', 'Eb'],
    cagedShape: 'Em',
  },
};
const C_MINOR_REFERENCE_4_6 = {
  // Root position: C (8th fret E), Eb (7th fret A), G (5th fret D)
  shape1: {
    frets: [8, 7, 5, -1, -1, -1], // E, A, D, G, B, e
    fingers: ['3', '2', '1', '', '', ''],
    startFret: 5,
    notes: ['C', 'Eb', 'G'],
    cagedShape: 'E',
  },
  // 1st inversion: Eb (11th fret E), G (10th fret A), C (10th fret D)
  shape2: {
    frets: [11, 10, 10, -1, -1, -1], // E, A, D, G, B, e
    fingers: ['2', '1', '1', '', '', ''],
    startFret: 10,
    notes: ['Eb', 'G', 'C'],
    cagedShape: 'C',
  },
  // 2nd inversion: G (3rd fret E), C (3rd fret A), Eb (1st fret D)
  shape3: {
    frets: [3, 3, 1, -1, -1, -1], // E, A, D, G, B, e
    fingers: ['2', '3', '1', '', '', ''],
    startFret: 1,
    notes: ['G', 'C', 'Eb'],
    cagedShape: 'A',
  },
};

function getInversionLabelsForSet(stringSet: string) {
  if (stringSet === '1_3') return ['Root Position', '1st Inversion', '2nd Inversion'];
  if (stringSet === '2_4') return ['Root Position', '1st Inversion', '2nd Inversion'].slice(2).concat(['Root Position', '1st Inversion']);
  if (stringSet === '3_5') return ['Root Position', '1st Inversion', '2nd Inversion'].slice(1).concat(['Root Position']);
  if (stringSet === '4_6') return ['Root Position', '1st Inversion', '2nd Inversion'];
  return ['Root Position', '1st Inversion', '2nd Inversion'];
}

const INVERSION_LABEL_ORDER = ['Root Position', '1st Inversion', '2nd Inversion'];
const INVERSION_LABELS_2_4 = ['1st Inversion', '2nd Inversion', 'Root Position'];
const INVERSION_LABELS_3_5 = ['Root Position', '2nd Inversion', '1st Inversion'];

// Augmented triad reference shapes for each string set (C+ as root)
const C_AUGMENTED_REFERENCE_1_3 = {
  // Shape 1: Root position - not in compact range for this set
  shape1: {
    frets: [-1, -1, -1, 5, 6, 5],
    fingers: ['', '', '', '1', '3', '2'],
    startFret: 5,
    notes: ['C', 'E', 'G#'],
    cagedShape: 'A',
  },
  // Shape 2: 1st inversion (E-G#-C)
  shape2: {
    frets: [-1, -1, -1, 9, 10, 9],
    fingers: ['', '', '', '1', '3', '2'],
    startFret: 9,
    notes: ['E', 'G#', 'C'],
    cagedShape: 'A',
  },
  // Shape 3: 2nd inversion (G#-C-E) - uses open E string
  shape3: {
    frets: [-1, -1, -1, 1, 2, 0],
    fingers: ['', '', '', '1', '2', ''],
    startFret: 0,
    notes: ['G#', 'C', 'E'],
    cagedShape: 'Open',
  },
};

const C_AUGMENTED_REFERENCE_2_4 = {
  // Shape 1: Root position (C-E-G#)
  shape1: {
    frets: [-1, -1, 10, 10, 11, -1],
    fingers: ['', '', '1', '1', '2', ''],
    startFret: 10,
    notes: ['C', 'E', 'G#'],
    cagedShape: 'C',
  },
  // Shape 2: 1st inversion (E-G#-C) - uses open strings
  shape2: {
    frets: [-1, -1, 2, 1, 1, -1],
    fingers: ['', '', '3', '1', '2', ''],
    startFret: 1,
    notes: ['E', 'G#', 'C'],
    cagedShape: 'Open',
  },
  // Shape 3: 2nd inversion (G#-C-E)
  shape3: {
    frets: [-1, -1, 6, 5, 5, -1],
    fingers: ['', '', '3', '1', '2', ''],
    startFret: 5,
    notes: ['G#', 'C', 'E'],
    cagedShape: 'C',
  },
};

const C_AUGMENTED_REFERENCE_3_5 = {
  // Shape 1: Root position (C-E-G#)
  shape1: {
    frets: [-1, 3, 2, 1, -1, -1],
    fingers: ['', '4', '3', '1', '', ''],
    startFret: 1,
    notes: ['C', 'E', 'G#'],
    cagedShape: 'A',
  },
  // Shape 2: 1st inversion (E-G#-C)
  shape2: {
    frets: [-1, 7, 6, 5, -1, -1],
    fingers: ['', '3', '2', '1', '', ''],
    startFret: 5,
    notes: ['E', 'G#', 'C'],
    cagedShape: 'A',
  },
  // Shape 3: 2nd inversion (G#-C-E)
  shape3: {
    frets: [-1, 11, 10, 9, -1, -1],
    fingers: ['', '3', '2', '1', '', ''],
    startFret: 9,
    notes: ['G#', 'C', 'E'],
    cagedShape: 'A',
  },
};

const C_AUGMENTED_REFERENCE_4_6 = {
  // Shape 1: Root position (C-E-G#)
  shape1: {
    frets: [8, 7, 6, -1, -1, -1],
    fingers: ['3', '2', '1', '', '', ''],
    startFret: 6,
    notes: ['C', 'E', 'G#'],
    cagedShape: 'E',
  },
  // Shape 2: 1st inversion (E-G#-C)
  shape2: {
    frets: [12, 11, 10, -1, -1, -1],
    fingers: ['3', '2', '1', '', '', ''],
    startFret: 10,
    notes: ['E', 'G#', 'C'],
    cagedShape: 'E',
  },
  // Shape 3: 2nd inversion (G#-C-E)
  shape3: {
    frets: [4, 3, 2, -1, -1, -1],
    fingers: ['3', '2', '1', '', '', ''],
    startFret: 2,
    notes: ['G#', 'C', 'E'],
    cagedShape: 'E',
  },
};

function renderTriadDisplay({diagrams, triadNotes, reference, displayType, selectedKey, showFullFretboard, showShapeNames, selectedStringSet, setShowFullFretboard, setShowShapeNames}: any) {
    // Assign inversion labels dynamically based on bass note (lowest played string)
      const stringNames = ['E', 'A', 'D', 'G', 'B', 'E'];
      const chromatic = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const labeledDiagrams = diagrams.map((diagram: any, idx: number) => {
      // Find the lowest string index that has a fret >= 0
      let bassStringIdx = -1;
      let bassFret = -1;
      for (let i = 0; i < diagram.frets.length; i++) {
        if (diagram.frets[i] >= 0) {
          bassStringIdx = i;
          bassFret = diagram.frets[i];
          break;
        }
      }
      let inversionLabel = 'Root Position'; // default
      if (bassStringIdx >= 0) {
        const openNote = stringNames[bassStringIdx];
        const openIdx = chromatic.indexOf(openNote);
        const bassNote = chromatic[(openIdx + bassFret) % 12];
      // Use C major intervals for inversion
        const root = selectedKey;
      const third = transposeNote(selectedKey, displayType === 'Minor' ? 3 : 4, displayType === 'Minor');
      const fifth = transposeNote(selectedKey, displayType === 'Augmented' ? 8 : 7);
        if (bassNote === root) inversionLabel = 'Root Position';
        else if (bassNote === third) inversionLabel = '1st Inversion';
        else if (bassNote === fifth) inversionLabel = '2nd Inversion';
      }
    return { ...diagram, inversionLabel };
    });
    // Assign shapeIndex for partial mode (main three shapes)
    let triadNotesWithShape = triadNotes;
  if (!showFullFretboard && triadNotes.length === 9) {
    triadNotesWithShape = triadNotes.map((note: any, idx: number) => ({
        ...note,
        shapeIndex: Math.floor(idx / 3)
      }));
    }
  // Map inversion names to specific colors
  const inversionColorMap: Record<string, string> = {
    'Root Position': '#ef4444', // red
    '1st Inversion': '#3b82f6',  // blue
    '2nd Inversion': '#10b981'   // green
  };
  // Map interval names to specific colors for fretboard diagram
  const intervalColorMap: Record<string, string> = {
    '1': '#ef4444', // root - red
    '3': '#a855f7', // 3rd - purple
    '5': '#f59e42', // 5th - orange
  };
  // Always color notes by interval, not shape/inversion
  const coloredTriadNotes = triadNotesWithShape.map((note: any) => ({
    ...note,
    shapeColor: intervalColorMap[note.interval] || '#000000',
  }));
    // Calculate dynamic fret range for the horizontal map
  const playedFrets = triadNotesWithShape.map((n: any) => n.fret).filter((f: any) => f >= 0);
    const minFret = playedFrets.length ? Math.min(...playedFrets) : 0;
    const maxFret = playedFrets.length ? Math.max(...playedFrets) : 5;
    const dynamicStartFret = minFret === 0 ? 0 : Math.max(1, minFret - 1);
    const dynamicFretCount = Math.max(5, maxFret - dynamicStartFret + 1);
    const selectedStringSetLabel = STRING_SETS.find(s => s.value === selectedStringSet)?.label || 'Strings 1–3';
    return (
      <div className="mb-16">
        <h3 className="text-xl font-bold text-amber-700 mb-6 text-center">{selectedKey} {displayType} Triads on {selectedStringSetLabel}</h3>
        {/* Shape Names Legend */}
        {showShapeNames && (
          <div className="flex justify-center gap-6 mb-6 text-sm">
            <div className="flex items-center gap-2">
            <span style={{backgroundColor: inversionColorMap['Root Position'], width: 16, height: 16, borderRadius: 8, display: 'inline-block'}}></span>
              Root Position
            </div>
            <div className="flex items-center gap-2">
            <span style={{backgroundColor: inversionColorMap['1st Inversion'], width: 16, height: 16, borderRadius: 8, display: 'inline-block'}}></span>
              1st Inversion
            </div>
            <div className="flex items-center gap-2">
            <span style={{backgroundColor: inversionColorMap['2nd Inversion'], width: 16, height: 16, borderRadius: 8, display: 'inline-block'}}></span>
              2nd Inversion
            </div>
          </div>
        )}
        {/* Chord Diagram View (vertical) */}
        <div className="flex flex-col md:flex-row justify-center gap-8 mb-8">
        {labeledDiagrams.map((data: any, idx: number) => (
            <div key={idx} className={`bg-white rounded-lg shadow p-4 flex-1 flex flex-col items-center ${showShapeNames ? 'border-4' : ''}`} 
               style={showShapeNames ? {borderColor: (data.inversionLabel && inversionColorMap[data.inversionLabel]) || TRIAD_LABELS[idx]?.shapeColor} : {}}>
              <div className="mb-2 text-xs font-semibold text-amber-700 text-center">{data.inversionLabel}</div>
              <ChordDiagram chordName={data.chordName} chordData={data} showLabels={true} />
            </div>
          ))}
        </div>
        {/* Horizontal Fretboard View */}
        <div className="bg-gray-50 rounded-lg p-8 mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">{selectedKey} {displayType} Triads on {selectedStringSetLabel}: Fretboard Map</h3>
          <HorizontalTriadMap 
            triadNotes={coloredTriadNotes} 
            startFret={dynamicStartFret} 
            fretCount={dynamicFretCount} 
            labelModeDefault="none"
            showShapeNames={showShapeNames}
          showFullFretboard={showFullFretboard}
          onToggleFullFretboard={() => setShowFullFretboard(!showFullFretboard)}
            onToggleShapeNames={() => setShowShapeNames(!showShapeNames)}
          />
        </div>
      </div>
    );
}

export default function TriadsOn3StringSets() {
  const [selectedKey, setSelectedKey] = useState('C');
  const [selectedTriadType, setSelectedTriadType] = useState<TriadType>('Major');
  const [showFullFretboard, setShowFullFretboard] = useState(false);
  const [showShapeNames, setShowShapeNames] = useState(false);
  const [selectedStringSet, setSelectedStringSet] = useState<string>('1_3');
  const [selectedInversion, setSelectedInversion] = useState(0);
  const [showOpenShapes, setShowOpenShapes] = useState(false);

  const renderTriadSection = (triadType: TriadType, subType?: 'Diminished' | 'Augmented') => {
    switch (triadType) {
      case 'Diminished': {
        // Get the three authoritative shapes for the selected key and string set
        const shapes = getDiminishedShapes(selectedKey, STRING_SET_KEY_MAP[selectedStringSet] || selectedStringSet);
        
        // Define interval colors (for note coloring)
        const intervalColors: Record<string, string> = {
          '1': '#ef4444', // root - red
          '3': '#a855f7', // 3rd - purple
          '5': '#f59e42', // 5th - orange
        };
        
        // Map each shape's frets to the correct 6-string array for the horizontal map
        const triadNotes: any[] = [];
        let allFrets: number[] = [];
        
        shapes.forEach((shape, shapeIdx) => {
          // Map 3-string frets to 6-string array
          const { sixFrets } = padTriadToSixStrings(shape.frets, shape.fingers, selectedStringSet);
          
          // Determine interval assignment based on inversion
          let intervalMapping: string[];
          if (shape.inversion === 'Root Position') {
            intervalMapping = ['1', '3', '5']; // root, 3rd, 5th from lowest to highest string
          } else if (shape.inversion === '1st Inversion') {
            intervalMapping = ['3', '5', '1']; // 3rd, 5th, root from lowest to highest string  
          } else { // 2nd Inversion
            intervalMapping = ['5', '1', '3']; // 5th, root, 3rd from lowest to highest string
          }
          
          // Determine which strings are played for this shape (in order from lowest to highest)
          const playedStrings: number[] = [];
          sixFrets.forEach((fret, stringIdx) => {
            if (fret >= 0) {
              playedStrings.push(stringIdx);
            }
          });
          
          // Sort played strings from lowest to highest (bass to treble)
          playedStrings.sort((a, b) => a - b);
          
          // For each played string, add a triad note for the map with correct interval
          playedStrings.forEach((stringIdx, intervalIdx) => {
            const fret = sixFrets[stringIdx];
            const interval = intervalMapping[intervalIdx] || '1';
            
            // Calculate note name based on string tuning and fret
            const stringNames = ['E', 'A', 'D', 'G', 'B', 'E']; // Low E to High E (0-indexed)
            const chromatic = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
            const chromaticFlats = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
            const openNote = stringNames[stringIdx];
            const openIdx = chromatic.indexOf(openNote);
            const noteName = chromaticFlats[(openIdx + fret) % 12]; // Use flats for diminished triads
            
            // Get finger number from the original shape data
            const { sixFingers } = padTriadToSixStrings(shape.frets, shape.fingers, selectedStringSet);
            const fingerNumber = sixFingers[stringIdx];
            
            triadNotes.push({
              string: stringIdx + 1,
              fret,
              note: noteName,
              interval,
              finger: fingerNumber,
              shapeIndex: shapeIdx,
              shapeColor: showShapeNames 
                ? TRIAD_LABELS[shapeIdx]?.shapeColor 
                : (intervalColors[interval] || '#000000'),
            });
            allFrets.push(fret);
          });
        });
        
        // Calculate dynamic fret range based on only the frets used in the three shapes
        const validFrets = allFrets.filter(f => typeof f === 'number' && !isNaN(f));
        const minFret = validFrets.length ? Math.min(...validFrets) : 0;
        const maxFret = validFrets.length ? Math.max(...validFrets) : 5;
        const dynamicStartFret = minFret === 0 ? 0 : Math.max(1, minFret - 1);
        const dynamicFretCount = Math.max(3, maxFret - dynamicStartFret + 2); // +2 for padding
        
        return (
          <div className="mb-16">
            <h3 className="text-xl font-bold text-amber-700 mb-6 text-center">Diminished Triads on {STRING_SETS.find(s => s.value === selectedStringSet)?.label}</h3>
            
            <div className="flex flex-col md:flex-row justify-center gap-8 mb-8">
              {shapes.map((shape, idx) => {
                const { sixFrets, sixFingers } = padTriadToSixStrings(shape.frets, shape.fingers, selectedStringSet);
                return (
                  <div 
                    key={idx} 
                    className={`bg-white rounded-lg shadow p-4 flex-1 flex flex-col items-center ${showShapeNames ? 'border-4' : ''}`}
                    style={showShapeNames ? {borderColor: TRIAD_LABELS[idx]?.shapeColor} : {}}
                  >
                    <div className="mb-2 text-xs font-semibold text-amber-700 text-center">{shape.inversion}</div>
                    <ChordDiagram chordName={shape.inversion} chordData={{
                      frets: sixFrets,
                      fingers: sixFingers,
                      startFret: Math.min(...sixFrets.filter(f => f > 0)) || 0,
                    }} showLabels={true} />
                  </div>
                );
              })}
            </div>
            
            {/* Horizontal Fretboard View for Diminished */}
            <div className="bg-gray-50 rounded-lg p-8 mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">{selectedKey} Diminished Triads: Fretboard Map</h3>
              <HorizontalTriadMap
                triadNotes={triadNotes}
                startFret={dynamicStartFret}
                fretCount={dynamicFretCount}
                labelModeDefault="none"
                showShapeNames={showShapeNames}
                onToggleShapeNames={() => setShowShapeNames(!showShapeNames)}
              />
            </div>
            
            <div className="text-xs text-gray-500 text-center mt-2 mb-4">
              Only the notes and frets used in the three chord diagrams above are shown on the map.
            </div>
          </div>
        );
        break;
      }
      case 'Major':
      case 'Minor':
      default: {
        const { diagrams, triadNotes, reference } = buildTriadDataForKey(selectedKey, triadType, subType, showFullFretboard, selectedStringSet);
        return renderTriadDisplay({diagrams, triadNotes, reference, displayType: triadType, selectedKey, showFullFretboard, showShapeNames, selectedStringSet, setShowFullFretboard, setShowShapeNames});
      }
    }
  };

  const renderAugmentedTriads = () => {
    const triadData = AUGMENTED_TRIADS_DATA[selectedKey][selectedStringSet];
    return (
      <div className="mb-16">
        <h3 className="text-xl font-bold text-amber-700 mb-6 text-center">{selectedKey} Augmented Triads on Strings {selectedStringSet.replace('_', '–')}</h3>
        
        {/* Add explanation about augmented triad names */}
        <div className="text-center text-gray-600 max-w-2xl mx-auto mb-4">
          <p>Due to the symmetrical nature of augmented triads, each shape repeats every four frets. Any shape can be moved up or down by four frets to get the same chord with a different root. This makes augmented triads unique among triad types.</p>
        </div>
        
        <div className="flex flex-col md:flex-row justify-center gap-8 mb-8">
          {triadData.map((shape: AugShape, idx: number) => shape ? (
            <div key={idx} className="bg-white rounded-lg shadow p-4 flex-1 flex flex-col items-center border-4" style={{borderColor: ['#ef4444', '#3b82f6', '#10b981'][idx]}}>
              <div className="mb-2 text-xs font-semibold text-amber-700 text-center">{shape.label}</div>
              <div className="text-xs text-gray-600 mb-2">
                {idx === 0 ? '' :
                 `Also known as ${idx === 1 ? transposeNote(selectedKey, 4) : transposeNote(selectedKey, 8)} Augmented`}
              </div>
              {(() => {
                const { sixFrets, sixFingers } = padTriadToSixStrings(shape.frets, shape.fingers || [], selectedStringSet);
                const playedFrets = sixFrets.filter(f => f >= 0);
                const startFret = playedFrets.length > 0 ? Math.min(...playedFrets) : 1;
                
                return (
                  <ChordDiagram
                    chordName={`${selectedKey} Aug`}
                    chordData={{
                      frets: sixFrets,
                      fingers: sixFingers,
                      startFret: startFret === 0 ? 0 : startFret,
                    }}
                    showLabels={true}
                  />
                );
              })()}
            </div>
          ) : (
            <div key={idx} className="bg-white rounded-lg shadow p-4 flex-1 flex flex-col items-center border-4 border-gray-300 opacity-60 justify-center">
              <div className="mb-2 text-xs font-semibold text-amber-700 text-center">No shape available</div>
            </div>
          ))}
        </div>
        {/* Removed horizontal fretboard map for augmented triads */}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Triads on 3-String Sets
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We often play chords on guitar using all strings. The major and minor chord shapes you already know are made of these triad building blocks. <br/>
          This guide shows you the three essential triad shapes for each triad type (e.g. major triad) and for each string group, in both classic chord diagram and horizontal fretboard views. You'll see how inversions connect and move along the neck, making it easy to visualize and play triads in any key.
        </p>
      </div>

      {/* Triad Type Selector */}
      <div className="flex justify-center mb-6">
        <div className="bg-white rounded-lg shadow-md p-1 inline-flex">
          {TRIAD_TYPES.map((type) => (
            <button
              key={type}
              className={`px-8 py-3 rounded-md font-semibold transition-all duration-200 ${selectedTriadType === type ? 'bg-amber-600 text-white' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'}`}
              onClick={() => setSelectedTriadType(type)}
            >
              {type} Triads
            </button>
          ))}
        </div>
      </div>

      {/* Key Selector */}
      <div className="flex justify-center mb-8">
        <div className="bg-white rounded-lg shadow-md p-1 inline-flex">
          {MAJOR_KEYS.map((key) => (
            <button
              key={key}
              className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${selectedKey === key ? 'bg-amber-200 text-amber-900' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'}`}
              onClick={() => setSelectedKey(key)}
            >
              {key}
            </button>
          ))}
        </div>
      </div>

      {/* String Set Selector */}
      <div className="flex justify-center mb-8">
        <div className="bg-white rounded-lg shadow-md p-1 inline-flex">
          {STRING_SETS.map((set) => (
            <button
              key={set.value}
              className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${selectedStringSet === set.value ? 'bg-amber-100 text-amber-900' : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'}`}
              onClick={() => setSelectedStringSet(set.value)}
            >
              {set.label}
            </button>
          ))}
        </div>
      </div>

      {/* Only render the dynamic triad section for the selected string set */}
      {selectedTriadType === 'Diminished' ? (
        <div>
          {/* Diminished Section */}
          <div className="mb-12">
            <h3 className="text-xl font-bold text-amber-700 mb-4 text-center">Diminished Triads</h3>
            <div className="mb-6 text-center text-gray-600 max-w-2xl mx-auto">
              <p>Diminished triads have a minor 3rd and diminished 5th (flattened 5th). They occur naturally in the major scale on the 7th degree.</p>
            </div>
            {renderTriadSection('Diminished')}
          </div>
        </div>
      ) : selectedTriadType === 'Augmented' ? (
        <div>
          {/* Augmented Section */}
          <div className="mb-12">
            <h3 className="text-xl font-bold text-amber-700 mb-4 text-center">Augmented Triads</h3>
            <div className="mb-6 text-center text-gray-600 max-w-2xl mx-auto">
              <p>Augmented triads have a major 3rd and augmented 5th (sharpened 5th). They don't occur naturally in the major scale but are common in jazz and classical music.</p>
            </div>
            {renderAugmentedTriads()}
          </div>
        </div>
      ) : (
        <div>
          {renderTriadSection(selectedTriadType)}
        </div>
      )}
    </div>
  );
} 