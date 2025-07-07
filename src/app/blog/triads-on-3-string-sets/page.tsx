'use client';
import React, { useState } from 'react';
import HorizontalTriadMap from '@/components/HorizontalTriadMap';
import ChordDiagram, { ChordData } from '@/components/ChordDiagram';

// Natural note keys
const MAJOR_KEYS = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const TRIAD_TYPES = ['Major', 'Minor', 'Diminished & Augmented'] as const;
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

// Add at the top of the component:
const STRING_SETS = [
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

// Original C diminished triad data (flatten the 3rd and 5th)
const C_DIMINISHED_REFERENCE = {
  // Shape 1: Root position (C on G string, 5th fret)
  shape1: {
    frets: [-1, -1, -1, 5, 4, 2], // E A D G B e (B string -1, E string -1 from major)
    fingers: ['', '', '', '4', '3', '1'],
    startFret: 2,
    notes: ['C', 'Eb', 'Gb'], // G, B, E strings
    cagedShape: 'Am',
  },
  // Shape 2: 1st inversion (Eb on G string, 8th fret) - B string one fret lower
  shape2: {
    frets: [-1, -1, -1, 8, 7, 8], // E A D G B e (B string -1 fret from barred pattern)
    fingers: ['', '', '', '2', '1', '3'],
    startFret: 7,
    notes: ['Eb', 'Gb', 'C'], // G, B, E strings
    cagedShape: 'Em',
  },
  // Shape 3: 2nd inversion (Gb on G string, 11th fret) - fix E string +1 fret
  shape3: {
    frets: [-1, -1, -1, 11, 13, 11], // E A D G B e (E string corrected +1 fret)
    fingers: ['', '', '', '1', '3', '1'],
    startFret: 11,
    notes: ['Gb', 'C', 'Eb'], // G, B, E strings
    cagedShape: 'Dm',
  },
};

// Original C augmented triad data (sharpen the 5th) - all same shape due to symmetry
const C_AUGMENTED_REFERENCE = {
  // Shape 1: Root position (C on G string, 5th fret)
  shape1: {
    frets: [-1, -1, -1, 5, 5, 4], // E A D G B e (E string +1 from major)
    fingers: ['', '', '', '2', '3', '1'],
    startFret: 3,
    notes: ['C', 'E', 'G#'], // G, B, E strings
    cagedShape: 'A',
  },
  // Shape 2: 1st inversion (E on G string, 9th fret) - same pattern as Shape 1
  shape2: {
    frets: [-1, -1, -1, 9, 9, 8], // E A D G B e (same pattern: +0, +0, -1)
    fingers: ['', '', '', '2', '3', '1'],
    startFret: 8,
    notes: ['E', 'G#', 'C'], // G, B, E strings
    cagedShape: 'E',
  },
  // Shape 3: 2nd inversion (G# on G string, 13th fret) - same pattern as Shape 1
  shape3: {
    frets: [-1, -1, -1, 13, 13, 12], // E A D G B e (same pattern: +0, +0, -1)
    fingers: ['', '', '', '2', '3', '1'],
    startFret: 12,
    notes: ['G#', 'C', 'E'], // G, B, E strings
    cagedShape: 'D',
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
    fingers: ['', '4', '2', '1', '', ''],
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

// Diminished triad reference shapes for each string set (C as root)
const C_DIMINISHED_REFERENCE_1_3 = C_DIMINISHED_REFERENCE;
const C_DIMINISHED_REFERENCE_2_4 = {
  shape1: {
    frets: [-1, -1, 10, 8, 7, -1],
    fingers: ['', '', '3', '1', '1', ''],
    startFret: 7,
    notes: ['C', 'Eb', 'Gb'],
    cagedShape: 'Gm',
  },
  shape2: {
    frets: [-1, -1, 1, 1, 0, -1],
    fingers: ['', '', '1', '1', '1', ''],
    startFret: 0,
    notes: ['Eb', 'Gb', 'C'],
    cagedShape: 'Em',
  },
  shape3: {
    frets: [-1, -1, 4, 4, 3, -1],
    fingers: ['', '', '2', '1', '1', ''],
    startFret: 3,
    notes: ['Gb', 'C', 'Eb'],
    cagedShape: 'Cm',
  },
};
const C_DIMINISHED_REFERENCE_3_5 = {
  shape1: {
    frets: [-1, 3, 1, -1, -1, -1],
    fingers: ['', '3', '1', '', '', ''],
    startFret: 1,
    notes: ['C', 'Eb', 'Gb'],
    cagedShape: 'Am',
  },
  shape2: {
    frets: [-1, 6, 4, 4, -1, -1],
    fingers: ['', '3', '1', '1', '', ''],
    startFret: 4,
    notes: ['Eb', 'Gb', 'C'],
    cagedShape: 'Gm',
  },
  shape3: {
    frets: [-1, 9, 7, 7, -1, -1],
    fingers: ['', '3', '1', '1', '', ''],
    startFret: 7,
    notes: ['Gb', 'C', 'Eb'],
    cagedShape: 'Em',
  },
};
const C_DIMINISHED_REFERENCE_4_6 = {
  shape1: {
    frets: [8, 9, 7, -1, -1, -1],
    fingers: ['2', '3', '1', '', '', ''],
    startFret: 7,
    notes: ['C', 'Eb', 'Gb'],
    cagedShape: 'Em',
  },
  shape2: {
    frets: [11, 9, 8, -1, -1, -1],
    fingers: ['3', '1', '2', '', '', ''],
    startFret: 8,
    notes: ['Eb', 'Gb', 'C'],
    cagedShape: 'Cm',
  },
  shape3: {
    frets: [2, 1, 0, -1, -1, -1],
    fingers: ['2', '1', '0', '', '', ''],
    startFret: 0,
    notes: ['Gb', 'C', 'Eb'],
    cagedShape: 'Am',
  },
};

// Augmented triad reference shapes for each string set (C as root)
const C_AUGMENTED_REFERENCE_1_3 = C_AUGMENTED_REFERENCE;
const C_AUGMENTED_REFERENCE_2_4 = {
  shape1: {
    frets: [-1, -1, 10, 9, 9, -1],
    fingers: ['', '', '2', '1', '1', ''],
    startFret: 9,
    notes: ['C', 'E', 'G#'],
    cagedShape: 'G',
  },
  shape2: {
    frets: [-1, -1, 3, 2, 1, -1],
    fingers: ['', '', '3', '2', '1', ''],
    startFret: 1,
    notes: ['E', 'G#', 'C'],
    cagedShape: 'E',
  },
  shape3: {
    frets: [-1, -1, 5, 5, 5, -1],
    fingers: ['', '', '1', '1', '1', ''],
    startFret: 5,
    notes: ['G#', 'C', 'E'],
    cagedShape: 'C',
  },
};
const C_AUGMENTED_REFERENCE_3_5 = {
  shape1: {
    frets: [-1, 3, 3, 1, -1, -1],
    fingers: ['', '3', '4', '1', '', ''],
    startFret: 1,
    notes: ['C', 'E', 'G#'],
    cagedShape: 'A',
  },
  shape2: {
    frets: [-1, 7, 5, 5, -1, -1],
    fingers: ['', '3', '1', '1', '', ''],
    startFret: 5,
    notes: ['E', 'G#', 'C'],
    cagedShape: 'G',
  },
  shape3: {
    frets: [-1, 11, 9, 9, -1, -1],
    fingers: ['', '4', '2', '1', '', ''],
    startFret: 9,
    notes: ['G#', 'C', 'E'],
    cagedShape: 'E',
  },
};
const C_AUGMENTED_REFERENCE_4_6 = {
  shape1: {
    frets: [8, 12, 12, -1, -1, -1],
    fingers: ['1', '3', '4', '', '', ''],
    startFret: 8,
    notes: ['C', 'E', 'G#'],
    cagedShape: 'E',
  },
  shape2: {
    frets: [12, 16, 16, -1, -1, -1],
    fingers: ['1', '3', '4', '', '', ''],
    startFret: 12,
    notes: ['E', 'G#', 'C'],
    cagedShape: 'C',
  },
  shape3: {
    frets: [4, 8, 8, -1, -1, -1],
    fingers: ['1', '3', '4', '', '', ''],
    startFret: 4,
    notes: ['G#', 'C', 'E'],
    cagedShape: 'A',
  },
};

function getDiminishedReferenceForSet(set: string) {
  if (set === '1_3') return C_DIMINISHED_REFERENCE_1_3;
  if (set === '2_4') return C_DIMINISHED_REFERENCE_2_4;
  if (set === '3_5') return C_DIMINISHED_REFERENCE_3_5;
  if (set === '4_6') return C_DIMINISHED_REFERENCE_4_6;
  return C_DIMINISHED_REFERENCE_1_3;
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
  const offset = KEY_OFFSETS[key as keyof typeof KEY_OFFSETS];
  let reference: any = null;
  let shapes: any[] | null = null;
  if (triadType === 'Major') {
    reference = getMajorReferenceForSet(stringSet);
    shapes = [reference.shape1, reference.shape2, reference.shape3];
  } else if (triadType === 'Minor') {
    reference = getMinorReferenceForSet(stringSet);
    shapes = [reference.shape1, reference.shape2, reference.shape3];
  } else if (triadType === 'Diminished & Augmented') {
    reference = subType === 'Augmented' ? getAugmentedReferenceForSet(stringSet) : getDiminishedReferenceForSet(stringSet);
    shapes = reference ? [reference.shape1, reference.shape2, reference.shape3] : null;
  }

  function adjustForHighFrets(frets: number[], originalStartFret: number) {
    const activeFrets = frets.filter(f => f > 0);
    const maxFret = Math.max(...activeFrets);
    const minFret = Math.min(...activeFrets);
    let adjustedFrets = frets;
    let adjustedStartFret = originalStartFret;
    if (maxFret > 15) {
      adjustedFrets = frets.map(f => f > 0 ? f - 12 : f);
      const newActiveFrets = adjustedFrets.filter(f => f > 0);
      const newMinFret = Math.min(...newActiveFrets);
      adjustedStartFret = Math.max(1, newMinFret - 1);
    } else {
      adjustedStartFret = Math.max(1, minFret - 1);
    }
    return { frets: adjustedFrets, startFret: adjustedStartFret };
  }

  if ((triadType === 'Major' || triadType === 'Minor') && !showFullFretboard) {
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
      const frets = [...shape.frets];
      const fingers = [...shape.fingers];
      // Offset the frets for the selected key
      for (let j = 0; j < frets.length; j++) {
        if (typeof frets[j] === 'number' && frets[j] > 0) {
          frets[j] = frets[j] + offset;
        }
      }
      // Improved startFret logic: set to 0 if any open string, else to min played fret
      const playedFrets = frets.filter(f => f >= 0);
      const minFret = playedFrets.length ? Math.min(...playedFrets) : 1;
      const startFret = minFret === 0 ? 0 : minFret;
      return {
        frets,
        fingers,
        startFret,
        cagedShape: shape.cagedShape,
        notes: shape.notes,
      };
    });
    // For horizontal map, build triadNotes for all three shapes
    // (use the correct string mapping for each set)
    const triadNotes = diagrams.flatMap((diagram, idx) => {
      // Find the played strings for this diagram
      const playedStrings = diagram.frets
        .map((fret, stringIdx) => ({ fret, stringIdx }))
        .filter(({ fret }) => fret >= 0)
        .map(({ stringIdx }) => stringIdx);
      return playedStrings.map((stringIdx, noteIdx) => ({
        string: stringIdx + 1,
        fret: diagram.frets[stringIdx],
        note: diagram.notes[noteIdx],
        interval: ['1', '3', '5'][noteIdx],
        finger: diagram.fingers[stringIdx],
        shapeIndex: idx,
      }));
    });
    return { diagrams, triadNotes, reference: diagrams };
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

  // Adjust shapes if they go too high
  const adjustedShape1 = Math.max(...shape1Frets) > 15 ? shape1Frets.map(f => f - 12) : shape1Frets;
  const adjustedShape2 = Math.max(...shape2Frets) > 15 ? shape2Frets.map(f => f - 12) : shape2Frets;
  const adjustedShape3 = Math.max(...shape3Frets) > 15 ? shape3Frets.map(f => f - 12) : shape3Frets;

  // Calculate note names based on triad type
  let thirdInterval, fifthInterval, useFlats;
  
  if (triadType === 'Diminished & Augmented') {
    if (subType === 'Augmented') {
      thirdInterval = 4; // Major 3rd
      fifthInterval = 8; // Augmented 5th
      useFlats = false;
    } else {
      thirdInterval = 3; // Minor 3rd
      fifthInterval = 6; // Diminished 5th
      useFlats = true;
    }
  } else {
    thirdInterval = triadType === 'Major' ? 4 : 3;
    fifthInterval = 7; // Perfect 5th
    useFlats = triadType === 'Minor';
  }
  
  const stringNumbers = STRING_SET_TO_STRINGS[stringSet] || [3, 2, 1];

  // Group triad notes by shape for sorting
  const triadNotesByShape = [
    [
      { string: stringNumbers[0], fret: adjustedShape1[0], note: transposeNote(key, 0), interval: '1' as const, finger: reference.shape1.fingers[3] },
      { string: stringNumbers[1], fret: adjustedShape1[1], note: transposeNote(key, thirdInterval, useFlats), interval: '3' as const, finger: reference.shape1.fingers[4] },
      { string: stringNumbers[2], fret: adjustedShape1[2], note: transposeNote(key, fifthInterval, useFlats), interval: '5' as const, finger: reference.shape1.fingers[5] },
    ],
    [
      { string: stringNumbers[0], fret: adjustedShape2[0], note: transposeNote(key, thirdInterval, useFlats), interval: '3' as const, finger: reference.shape2.fingers[3] },
      { string: stringNumbers[1], fret: adjustedShape2[1], note: transposeNote(key, fifthInterval, useFlats), interval: '5' as const, finger: reference.shape2.fingers[4] },
      { string: stringNumbers[2], fret: adjustedShape2[2], note: transposeNote(key, 0), interval: '1' as const, finger: reference.shape2.fingers[5] },
    ],
    [
      { string: stringNumbers[0], fret: adjustedShape3[0], note: transposeNote(key, fifthInterval, useFlats), interval: '5' as const, finger: reference.shape3.fingers[3] },
      { string: stringNumbers[1], fret: adjustedShape3[1], note: transposeNote(key, 0), interval: '1' as const, finger: reference.shape3.fingers[4] },
      { string: stringNumbers[2], fret: adjustedShape3[2], note: transposeNote(key, thirdInterval, useFlats), interval: '3' as const, finger: reference.shape3.fingers[5] },
    ],
  ];
  // Sort shapes by minimum fret (ignoring muted strings)
  triadNotesByShape.sort((a, b) => {
    const minA = Math.min(...a.map(n => n.fret).filter(f => f > 0));
    const minB = Math.min(...b.map(n => n.fret).filter(f => f > 0));
    return minA - minB;
  });
  // Flatten for the map
  const triadNotes = triadNotesByShape.flat();

  return { diagrams, triadNotes, reference };
}

const TRIAD_LABELS = [
  {
    label: 'Root Position',
    fingering: (triadType: TriadType, subType?: 'Diminished' | 'Augmented') => {
      if (triadType === 'Diminished & Augmented') {
        return subType === 'Augmented' ? '2 (G), 3 (B), 1 (E)' : '4 (G), 3 (B), 1 (E)';
      }
      return triadType === 'Major' ? '3 (G), 4 (B), 1 (E)' : '3 (G), 2 (B), 1 (E)';
    },
    name: (key: string, triadType: TriadType, subType?: 'Diminished' | 'Augmented') => {
      if (triadType === 'Diminished & Augmented' && subType === 'Augmented') {
        return `${key} Augmented Shape`;
      }
      if (triadType === 'Diminished & Augmented') {
        return `${key} ${subType} (Root Position)`;
      }
      return `${key} ${triadType} (Root Position)`;
    },
    shapeColor: '#ef4444', // red
  },
  {
    label: '1st Inversion',
    fingering: (triadType: TriadType, subType?: 'Diminished' | 'Augmented') => {
      if (triadType === 'Diminished & Augmented') {
        return subType === 'Augmented' ? '2 (G), 3 (B), 1 (E)' : '2 (G), 1 (B), 3 (E)';
      }
      return triadType === 'Major' ? '2 (G), 1 (B), 1 (E)' : '1 (G), 1 (B), 1 (E)';
    },
    name: (key: string, triadType: TriadType, subType?: 'Diminished' | 'Augmented') => {
      if (triadType === 'Diminished & Augmented' && subType === 'Augmented') {
        return `${key} Augmented Shape`;
      }
      if (triadType === 'Diminished & Augmented') {
        return `${key} ${subType} (1st Inversion)`;
      }
      return `${key} ${triadType} (1st Inversion)`;
    },
    shapeColor: '#3b82f6', // blue
  },
  {
    label: '2nd Inversion',
    fingering: (triadType: TriadType, subType?: 'Diminished' | 'Augmented') => {
      if (triadType === 'Diminished & Augmented') {
        return subType === 'Augmented' ? '2 (G), 3 (B), 1 (E)' : '1 (G), 3 (B), 1 (E)';
      }
      return triadType === 'Major' ? '1 (G), 3 (B), 2 (E)' : '2 (G), 3 (B), 1 (E)';
    },
    name: (key: string, triadType: TriadType, subType?: 'Diminished' | 'Augmented') => {
      if (triadType === 'Diminished & Augmented' && subType === 'Augmented') {
        return `${key} Augmented Shape`;
      }
      if (triadType === 'Diminished & Augmented') {
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
  // Root position: C (E string 8), Eb (A string 6), G (D string 5)
  shape1: {
    frets: [8, 6, 5, -1, -1, -1],
    fingers: ['3', '2', '1', '', '', ''],
    startFret: 5,
    notes: ['C', 'Eb', 'G'],
    cagedShape: 'Em',
  },
  // 1st inversion: Eb (E string 11), G (A string 10), C (D string 10)
  shape2: {
    frets: [11, 10, 10, -1, -1, -1],
    fingers: ['3', '2', '1', '', '', ''],
    startFret: 10,
    notes: ['Eb', 'G', 'C'],
    cagedShape: 'Cm',
  },
  // 2nd inversion: G (E string 3), C (A string 3), Eb (D string 1)
  shape3: {
    frets: [3, 3, 1, -1, -1, -1],
    fingers: ['3', '2', '1', '', '', ''],
    startFret: 1,
    notes: ['G', 'C', 'Eb'],
    cagedShape: 'Am',
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

export default function TriadsOn3StringSets() {
  const [selectedKey, setSelectedKey] = useState('C');
  const [selectedTriadType, setSelectedTriadType] = useState<TriadType>('Major');
  const [showFullFretboard, setShowFullFretboard] = useState(false);
  const [showShapeNames, setShowShapeNames] = useState(false);
  const [selectedStringSet, setSelectedStringSet] = useState('1_3');
  const [selectedInversion, setSelectedInversion] = useState(0);

  // Helper function to render a triad section
  const renderTriadSection = (triadType: TriadType, subType?: 'Diminished' | 'Augmented') => {
    const { diagrams, triadNotes, reference } = buildTriadDataForKey(selectedKey, triadType, subType, showFullFretboard, selectedStringSet);
    const displayType = subType || triadType;

    // Use the inversion mapping for this string set
    const mapping = INVERSION_MAPPING[selectedStringSet] || [0, 1, 2];
    // Build array of {diagram, label, fingering, chordName, cagedShape}
    let diagramData = mapping.map((i, idx) => {
      const shape = reference[`shape${i+1}`];
      let label = getInversionLabelForShape(shape?.notes, selectedKey);
      if (selectedStringSet === '2_4') label = INVERSION_LABELS_2_4[idx];
      if (selectedStringSet === '3_5') label = INVERSION_LABELS_3_5[idx];
      // PATCH: Swap Root and 2nd Inversion labels for C minor, strings 3-5 only
      if (selectedKey === 'C' && triadType === 'Minor' && selectedStringSet === '3_5') {
        // INVERSION_LABELS_3_5 = ['Root Position', '2nd Inversion', '1st Inversion']
        // idx: 0 = Root, 1 = 2nd, 2 = 1st (as currently assigned)
        if (idx === 0) label = '2nd Inversion';
        else if (idx === 1) label = '1st Inversion';
        else if (idx === 2) label = 'Root Position';
      }
      let chordName = TRIAD_LABELS[i].name(selectedKey, triadType, subType);
      if (selectedStringSet === '2_4' || selectedStringSet === '3_5') {
        chordName = `${selectedKey} ${displayType} (${label})`;
      }
      return {
        diagram: diagrams[i],
        label,
        fingering: TRIAD_LABELS[i].fingering(triadType, subType),
        chordName,
        cagedShape: shape?.cagedShape || '',
        triadIdx: i,
      };
    });
    // Always sort by inversion label order: Root, 1st, 2nd
    diagramData.sort((a, b) => INVERSION_LABEL_ORDER.indexOf(a.label) - INVERSION_LABEL_ORDER.indexOf(b.label));

    // Assign shapeIndex for partial mode (main three shapes)
    let triadNotesWithShape = triadNotes;
    if (!showFullFretboard && triadNotes.length === 9) {
      triadNotesWithShape = triadNotes.map((note, idx) => ({
        ...note,
        shapeIndex: Math.floor(idx / 3)
      }));
    }

    // Create colored triad notes for shape names mode
    const coloredTriadNotes = showShapeNames ? triadNotesWithShape.map((note) => ({
      ...note,
      shapeColor: (typeof note.shapeIndex === 'number' && TRIAD_LABELS[note.shapeIndex])
        ? TRIAD_LABELS[note.shapeIndex].shapeColor
        : undefined
    })) : triadNotesWithShape;
    
    // Calculate dynamic fret range for the horizontal map
    const playedFrets = triadNotesWithShape.map(n => n.fret).filter(f => f >= 0);
    const minFret = playedFrets.length ? Math.min(...playedFrets) : 0;
    const maxFret = playedFrets.length ? Math.max(...playedFrets) : 5;
    const dynamicStartFret = minFret === 0 ? 0 : Math.max(1, minFret - 1);
    const dynamicFretCount = Math.max(5, maxFret - dynamicStartFret + 1);

    // Find the label for the selected string set
    const selectedStringSetLabel = STRING_SETS.find(s => s.value === selectedStringSet)?.label || 'Strings 1–3';

    return (
      <div className="mb-16">
        <h3 className="text-xl font-bold text-amber-700 mb-6 text-center">{selectedKey} {displayType} Triads on {selectedStringSetLabel}</h3>
        {/* Shape Names Legend */}
        {showShapeNames && (
          <div className="flex justify-center gap-6 mb-6 text-sm">
            <div className="flex items-center gap-2">
              <span style={{backgroundColor: TRIAD_LABELS[0].shapeColor, width: 16, height: 16, borderRadius: 8, display: 'inline-block'}}></span>
              Root Position
            </div>
            <div className="flex items-center gap-2">
              <span style={{backgroundColor: TRIAD_LABELS[1].shapeColor, width: 16, height: 16, borderRadius: 8, display: 'inline-block'}}></span>
              1st Inversion
            </div>
            <div className="flex items-center gap-2">
              <span style={{backgroundColor: TRIAD_LABELS[2].shapeColor, width: 16, height: 16, borderRadius: 8, display: 'inline-block'}}></span>
              2nd Inversion
            </div>
          </div>
        )}
        {/* Chord Diagram View (vertical) */}
        <div className="flex flex-col md:flex-row justify-center gap-8 mb-8">
          {diagramData.map((data, idx) => (
            <div key={idx} className={`bg-white rounded-lg shadow p-4 flex-1 flex flex-col items-center ${showShapeNames ? 'border-4' : ''}`} 
                 style={showShapeNames ? {borderColor: TRIAD_LABELS[data.triadIdx].shapeColor} : {}}>
              <div className="mb-2 text-xs text-gray-500 text-center">Fingering: {data.fingering}</div>
              <ChordDiagram chordName={data.chordName} chordData={data.diagram} showLabels={true} />
              {data.cagedShape && (
                <div className="mt-2 text-xs text-gray-400 text-center">
                  The CAGED system calls this part of the "{data.cagedShape}" shape
                </div>
              )}
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
        <div className="text-xs text-gray-500 text-center mt-2 mb-4">
          Only complete triad shapes that fit within the fretboard range are shown. Open-position triads may not be displayed.
        </div>
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
      {selectedTriadType === 'Diminished & Augmented' ? (
        <div>
          {/* Diminished Section */}
          <div className="mb-12">
            <h3 className="text-xl font-bold text-amber-700 mb-4 text-center">Diminished Triads</h3>
            <div className="mb-6 text-center text-gray-600 max-w-2xl mx-auto">
              <p>Diminished triads have a minor 3rd and diminished 5th (flattened 5th). They occur naturally in the major scale on the 7th degree.</p>
            </div>
            {renderTriadSection('Diminished & Augmented', 'Diminished')}
          </div>
          {/* Augmented Section */}
          <div className="mb-12">
            <h3 className="text-xl font-bold text-amber-700 mb-4 text-center">Augmented Triads</h3>
            <div className="mb-6 text-center text-gray-600 max-w-2xl mx-auto">
              <p>Augmented triads have a major 3rd and augmented 5th (sharpened 5th). They don't occur naturally in the major scale but are common in jazz and classical music.</p>
            </div>
            {renderTriadSection('Diminished & Augmented', 'Augmented')}
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