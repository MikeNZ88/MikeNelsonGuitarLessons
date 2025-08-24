'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ChordDiagram from '@/components/ChordDiagram';

const ROOT_NOTE = 'F';

const CHORD_CATEGORIES = ['Major', 'Minor', '7th Chords', 'Suspended', 'Extensions'] as const;
type ChordCategory = typeof CHORD_CATEGORIES[number];

// For 7th chords, we need sub-tabs
const SEVENTH_CHORD_TYPES = ['Dominant 7th', 'Major 7th', 'Minor 7th', 'Half-Diminished', 'Diminished 7th'] as const;
type SeventhChordType = typeof SEVENTH_CHORD_TYPES[number];

// For suspended chords, we need sub-tabs
const SUSPENDED_CHORD_TYPES = ['Sus2', 'Sus4', '7sus4'] as const;
type SuspendedChordType = typeof SUSPENDED_CHORD_TYPES[number];

// For extension chords, we need sub-tabs
const EXTENSION_CHORD_TYPES = ['9th Chords', '11th Chords', '13th Chords', 'Altered Chords'] as const;
type ExtensionChordType = typeof EXTENSION_CHORD_TYPES[number];

interface ChordShape {
  name: string;
  frets: number[];
  fingers: string[];
  startFret?: number;
  rootString: number; // 1-6, where 1 = high E, 6 = low E
  cagedShape?: string;
  description?: string;
  technique?: string;
  difficulty?: 'Essential' | 'Practical' | 'Moderate' | 'Advanced' | 'Rarely Used';
}

interface ChordTypeData {
  [key: string]: ChordShape[];
}

// For flattened extension chords (no string set tabs)
interface FlattenedExtensionChords {
  [key: string]: ChordShape[];
}

// MAJOR CHORDS - Only E and A shapes (barre chords)
const MAJOR_CHORDS: ChordTypeData = {
  'Essential Barre Chords': [
    {
      name: 'F (1st fret)',
      frets: [1, 3, 3, 2, 1, 1],
      fingers: ['1', '3', '4', '2', '1', '1'],
      rootString: 6,
      cagedShape: 'E',
      description: '6th string root - Full barre major',
      technique: 'Fundamental moveable shape',
      difficulty: 'Essential'
    },
    {
      name: 'F (8th fret)',
      frets: [-1, 8, 10, 10, 10, 8],
      fingers: ['', '1', '2', '3', '4', '1'],
      startFret: 8,
      rootString: 5,
      cagedShape: 'A',
      description: '5th string root - Partial barre major',
      technique: 'Essential moveable shape',
      difficulty: 'Essential'
    }
  ],
  'Other Shapes': [
    {
      name: 'F (8th fret)',
      frets: [-1, 8, 7, 5, 6, 5],
      fingers: ['', '4', '3', '1', '2', '1'],
      startFret: 5,
      rootString: 5,
      cagedShape: 'C',
      description: '5th string root - C shape major',
      technique: 'Advanced partial barre',
      difficulty: 'Advanced'
    },
    {
      name: 'F (3rd fret)',
      frets: [-1, -1, 3, 5, 6, 5],
      fingers: ['', '', '1', '3', '4', '2'],
      startFret: 3,
      rootString: 4,
      cagedShape: 'D',
      description: '4th string root - D shape major',
      technique: 'Advanced moveable shape',
      difficulty: 'Advanced'
    },
    {
      name: 'F (13th fret)',
      frets: [13, 12, 10, 10, 10, -1],
      fingers: ['4', '3', '1', '1', '1', ''],
      startFret: 10,
      rootString: 6,
      cagedShape: 'G',
      description: '6th string root - G shape major',
      technique: 'Advanced moveable shape',
      difficulty: 'Advanced'
    }
  ]
};

// Note: All of these shapes are CAGED shapes. For a complete guide to the CAGED system, see our CAGED System Guide.

// MINOR CHORDS - E, A, C, and G shapes
const MINOR_CHORDS: ChordTypeData = {
  'Essential Barre Chords': [
    {
      name: 'Fm (1st fret)',
      frets: [1, 3, 3, 1, 1, 1],
      fingers: ['1', '3', '4', '1', '1', '1'],
      rootString: 6,
      cagedShape: 'Em',
      description: '6th string root - Full barre minor',
      technique: 'Essential moveable minor shape',
      difficulty: 'Essential'
    },
    {
      name: 'Fm (8th fret)',
      frets: [-1, 8, 10, 10, 9, 8],
      fingers: ['', '1', '3', '4', '2', '1'],
      startFret: 8,
      rootString: 5,
      cagedShape: 'Am',
      description: '5th string root - Partial barre minor',
      technique: 'Essential moveable minor shape',
      difficulty: 'Essential'
    }
  ],
  'Other Shapes': [
    {
      name: 'Fm (8th fret)',
      frets: [-1, 8, 6, 5, 6, -1],
      fingers: ['', '4', '2', '1', '3', ''],
      startFret: 5,
      rootString: 5,
      cagedShape: 'Cm',
      description: '5th string root - C shape minor',
      technique: 'Advanced partial barre',
      difficulty: 'Advanced'
    },
    {
      name: 'Fm (3rd fret)',
      frets: [-1, -1, 3, 5, 6, 4],
      fingers: ['', '', '1', '3', '4', '2'],
      startFret: 3,
      rootString: 4,
      cagedShape: 'Dm',
      description: '4th string root - D shape minor',
      technique: 'Advanced moveable shape',
      difficulty: 'Advanced'
    },
    {
      name: 'Fm (13th fret)',
      frets: [13, 11, 10, 10, -1, -1],
      fingers: ['4', '2', '1', '1', '', ''],
      startFret: 10,
      rootString: 6,
      cagedShape: 'Gm',
      description: '6th string root - G shape minor',
      technique: 'Advanced moveable shape',
      difficulty: 'Advanced'
    }
  ]
};

// Note: All of these shapes are CAGED shapes. For a complete guide to the CAGED system, see our CAGED System Guide.

// 7TH CHORDS - Organized by chord type with barre vs inversions
const SEVENTH_CHORDS: Record<SeventhChordType, ChordTypeData> = {
  'Dominant 7th': {
    'Barre Chord Shapes': [
      {
        name: 'F7 (1st fret)',
        frets: [1, 3, 1, 2, 1, 1],
        fingers: ['1', '3', '1', '2', '1', '1'],
        rootString: 6,
        cagedShape: 'E7',
        description: '6th string root - Full barre with ♭7',
        technique: 'Barre with lifted 3rd finger on 2nd string',
        difficulty: 'Essential'
      },
      {
        name: 'F7 (8th fret)',
        frets: [-1, 8, 10, 8, 10, 8],
        fingers: ['', '1', '3', '1', '4', '1'],
        startFret: 8,
        rootString: 5,
        cagedShape: 'A7',
        description: '5th string root - Partial barre with ♭7',
        technique: 'Partial barre with added 7th',
        difficulty: 'Essential'
      }
    ],
    'Inversions (Strings 1-4)': [
      {
        name: 'F7 Drop 2 Root Position (1-5-♭7-3) - Strings 1-4',
        frets: [-1, -1, 3, 5, 4, 5],
        fingers: ['', '', '1', '3', '2', '4'],
        startFret: 3,
        rootString: 4,
        description: 'Root position - F(1) C(5) E♭(♭7) A(3) on strings 1-4',
        technique: 'Drop 2 dominant 7th voicing',
        difficulty: 'Essential'
      },
      {
        name: 'F7 Drop 2 First Inversion (3-♭7-1-5) - Strings 1-4',
        frets: [-1, -1, 7, 8, 6, 8],
        fingers: ['', '', '2', '3', '1', '4'],
        startFret: 6,
        rootString: 4,
        description: 'First inversion - A(3) E♭(♭7) F(1) C(5) on strings 1-4',
        technique: 'Jazz standard voicing',
        difficulty: 'Essential'
      },
      {
        name: 'F7 Drop 2 Second Inversion (5-1-3-♭7) - Strings 1-4',
        frets: [-1, -1, 10, 10, 10, 11],
        fingers: ['', '', '1', '1', '1', '3'],
        startFret: 10,
        rootString: 4,
        description: 'Second inversion - C(5) F(1) A(3) E♭(♭7) on strings 1-4',
        technique: 'Smooth voice leading inversion',
        difficulty: 'Essential'
      },
      {
        name: 'F7 Drop 2 Third Inversion (♭7-3-5-1) - Strings 1-4',
        frets: [-1, -1, 1, 2, 1, 1],
        fingers: ['', '', '1', '2', '1', '1'],
        startFret: 1,
        rootString: 4,
        description: 'Third inversion - E♭(♭7) A(3) C(5) F(1) on strings 1-4',
        technique: 'Essential jazz voicing',
        difficulty: 'Essential'
      }
    ],
    'Inversions (Strings 2-5)': [
      {
        name: 'F7 Drop 2 Root Position (1-5-♭7-3) - Strings 2-5',
        frets: [-1, 8, 10, 8, 10, -1],
        fingers: ['', '1', '3', '2', '4', ''],
        startFret: 8,
        rootString: 5,
        description: 'Root position - F(1) C(5) E♭(♭7) A(3) on strings 2-5',
        technique: 'Essential jazz voicing on middle strings',
        difficulty: 'Essential'
      },
      {
        name: 'F7 Drop 2 First Inversion (3-♭7-1-5) - Strings 2-5',
        frets: [-1, 12, 13, 10, 13, -1],
        fingers: ['', '2', '3', '1', '4', ''],
        startFret: 10,
        rootString: 5,
        description: 'First inversion - A(3) E♭(♭7) F(1) C(5) on strings 2-5',
        technique: 'Jazz standard voicing on middle strings',
        difficulty: 'Essential'
      },
      {
        name: 'F7 Drop 2 Second Inversion (5-1-3-♭7) - Strings 2-5',
        frets: [-1, 3, 3, 2, 4, -1],
        fingers: ['', '2', '3', '1', '4', ''],
        startFret: 2,
        rootString: 5,
        description: 'Second inversion - C(5) F(1) A(3) E♭(♭7) on strings 2-5',
        technique: 'Drop 2 dominant 7th on middle strings',
        difficulty: 'Essential'
      },
      {
        name: 'F7 Drop 2 Third Inversion (♭7-3-5-1) - Strings 2-5',
        frets: [-1, 6, 7, 5, 6, -1],
        fingers: ['', '3', '4', '1', '2', ''],
        startFret: 5,
        rootString: 5,
        description: 'Third inversion - E♭(♭7) A(3) C(5) F(1) on strings 2-5',
        technique: 'Drop voicing - 7 in bass',
        difficulty: 'Essential'
      }
    ],
    'Inversions (Strings 3-6)': [
      {
        name: 'F7 Drop 2 Root Position (1-5-♭7-3) - Strings 3-6',
        frets: [1, 3, 1, 2, -1, -1],
        fingers: ['1', '3', '1', '2', '', ''],
        startFret: 1,
        rootString: 6,
        description: 'Root position - F(1) C(5) E♭(♭7) A(3) on strings 3-6',
        technique: 'Essential jazz voicing on lower strings',
        difficulty: 'Essential'
      },
      {
        name: 'F7 Drop 2 First Inversion (3-♭7-1-5) - Strings 3-6',
        frets: [5, 6, 3, 5, -1, -1],
        fingers: ['2', '4', '1', '3', '', ''],
        startFret: 3,
        rootString: 6,
        description: 'First inversion - A(3) E♭(♭7) F(1) C(5) on strings 3-6',
        technique: 'Jazz standard voicing on lower strings',
        difficulty: 'Essential'
      },
      {
        name: 'F7 Drop 2 Second Inversion (5-1-3-♭7) - Strings 3-6',
        frets: [8, 8, 7, 8, -1, -1],
        fingers: ['2', '3', '1', '4', '', ''],
        startFret: 7,
        rootString: 6,
        description: 'Second inversion - C(5) F(1) A(3) E♭(♭7) on strings 3-6',
        technique: 'Drop 2 dominant 7th on lower strings',
        difficulty: 'Essential'
      },
      {
        name: 'F7 Drop 2 Third Inversion (♭7-3-5-1) - Strings 3-6',
        frets: [11, 12, 10, 10, -1, -1],
        fingers: ['2', '3', '1', '1', '', ''],
        startFret: 10,
        rootString: 6,
        description: 'Third inversion - E♭(♭7) A(3) C(5) F(1) on strings 3-6',
        technique: 'Drop voicing - 7 in bass',
        difficulty: 'Essential'
      }
    ]
  },
  'Major 7th': {
    'Barre Chord Shapes': [
      {
        name: 'FMaj7 (1st fret)',
        frets: [1, 3, 2, 2, 1, -1],
        fingers: ['1', '4', '2', '3', '1', ''],
        rootString: 6,
        cagedShape: 'EMaj7',
        description: '6th string root - Major 7th interval',
        technique: 'Omit high E for cleaner sound',
        difficulty: 'Practical'
      },
      {
        name: 'FMaj7 (8th fret)',
        frets: [-1, 8, 10, 9, 10, 8],
        fingers: ['', '1', '3', '2', '4', '1'],
        startFret: 8,
        rootString: 5,
        cagedShape: 'AMaj7',
        description: '5th string root - Major 7th interval',
        technique: 'Partial barre with natural 7th',
        difficulty: 'Practical'
      }
    ],

    'Inversions (Strings 1-4)': [
      {
        name: 'FMaj7 Drop 2 Root Position (1-5-7-3) - Strings 1-4',
        frets: [-1, -1, 3, 5, 5, 5],
        fingers: ['', '', '1', '2', '3', '4'],
        startFret: 3,
        rootString: 4,
        description: 'Root position - F(1) C(5) E(7) A(3) on strings 1-4',
        technique: 'Drop 2 major 7th voicing',
        difficulty: 'Essential'
      },
      {
        name: 'FMaj7 Drop 2 First Inversion (3-7-1-5) - Strings 1-4',
        frets: [-1, -1, 7, 9, 6, 8],
        fingers: ['', '', '2', '4', '1', '3'],
        startFret: 6,
        rootString: 4,
        description: 'First inversion - A(3) E(7) F(1) C(5) on strings 1-4',
        technique: 'Sophisticated major 7th voicing',
        difficulty: 'Practical'
      },
      {
        name: 'FMaj7 Drop 2 Second Inversion (5-1-3-7) - Strings 1-4',
        frets: [-1, -1, 10, 10, 10, 12],
        fingers: ['', '', '1', '1', '2', '4'],
        startFret: 10,
        rootString: 4,
        description: 'Second inversion - C(5) F(1) A(3) E(7) on strings 1-4',
        technique: 'Upper register major 7th voicing',
        difficulty: 'Practical'
      },
      {
        name: 'FMaj7 Drop 2 Third Inversion (7-3-5-1) - Strings 1-4',
        frets: [-1, -1, 2, 2, 1, 1],
        fingers: ['', '', '2', '3', '1', '1'],
        startFret: 1,
        rootString: 4,
        description: 'Third inversion - E(7) A(3) C(5) F(1) on strings 1-4',
        technique: 'Simple major 7th voicing',
        difficulty: 'Essential'
      }
    ],
    'Inversions (Strings 2-5)': [
      {
        name: 'FMaj7 Root Position (1-5-7-3) - Strings 2-5',
        frets: [-1, 8, 10, 9, 10, -1],
        fingers: ['', '1', '3', '2', '4', ''],
        startFret: 8,
        rootString: 5,
        description: 'Root position - F(1) C(5) E(7) A(3) on strings 2-5',
        technique: 'Full, lush voicing ideal for jazz/fusion',
        difficulty: 'Practical'
      },
      {
        name: 'FMaj7 First Inversion (3-7-1-5) - Strings 2-5',
        frets: [-1, 12, 14, 10, 13, -1],
        fingers: ['', '2', '4', '1', '3', ''],
        startFret: 10,
        rootString: 5,
        description: 'First inversion - A(3) E(7) F(1) C(5) on strings 2-5',
        technique: 'Advanced middle register voicing',
        difficulty: 'Advanced'
      },
      {
        name: 'FMaj7 Second Inversion (5-1-3-7) - Strings 2-5',
        frets: [-1, 3, 3, 2, 5, -1],
        fingers: ['', '2', '3', '1', '4', ''],
        startFret: 2,
        rootString: 5,
        description: 'Second inversion - C(5) F(1) A(3) E(7) on strings 2-5',
        technique: 'Lower middle register voicing',
        difficulty: 'Practical'
      },
      {
        name: 'FMaj7 Third Inversion (7-3-5-1) - Strings 2-5',
        frets: [-1, 7, 7, 5, 6, -1],
        fingers: ['', '3', '4', '1', '2', ''],
        startFret: 5,
        rootString: 5,
        description: 'Third inversion - E(7) A(3) C(5) F(1) on strings 2-5',
        technique: 'Drop voicing - 7 in bass',
        difficulty: 'Practical'
      }
    ],
    'Inversions (Strings 3-6)': [
      {
        name: 'FMaj7 Root Position (1-5-7-3) - Strings 3-6',
        frets: [1, 3, 2, 2, -1, -1],
        fingers: ['1', '3', '2', '2', '', ''],
        startFret: 1,
        rootString: 6,
        description: 'Root position - F(1) C(5) E(7) A(3) on strings 3-6',
        technique: 'Compact, fully moveable with no open strings',
        difficulty: 'Practical'
      },
      {
        name: 'FMaj7 First Inversion (3-7-1-5) - Strings 3-6',
        frets: [5, 7, 3, 5, -1, -1],
        fingers: ['2', '4', '1', '3', '', ''],
        startFret: 3,
        rootString: 6,
        description: 'First inversion - A(3) E(7) F(1) C(5) on strings 3-6',
        technique: 'Use for tight comping or funk stabs',
        difficulty: 'Advanced'
      },
      {
        name: 'FMaj7 Second Inversion (5-1-3-7) - Strings 3-6',
        frets: [8, 8, 7, 9, -1, -1],
        fingers: ['2', '3', '1', '4', '', ''],
        startFret: 7,
        rootString: 6,
        description: 'Second inversion - C(5) F(1) A(3) E(7) on strings 3-6',
        technique: 'Often more compact than strings 2-5',
        difficulty: 'Practical'
      },
      {
        name: 'FMaj7 Third Inversion (7-3-5-1) - Strings 3-6',
        frets: [12, 12, 10, 10, -1, -1],
        fingers: ['3', '4', '1', '1', '', ''],
        startFret: 10,
        rootString: 6,
        description: 'Third inversion - E(7) A(3) C(5) F(1) on strings 3-6',
        technique: 'Drop voicing - 7 in bass',
        difficulty: 'Practical'
      }
    ]
  },
  'Minor 7th': {
    'Barre Chord Shapes': [
      {
        name: 'Fm7 (1st fret)',
        frets: [1, 3, 1, 1, 1, 1],
        fingers: ['1', '3', '1', '1', '1', '1'],
        rootString: 6,
        cagedShape: 'Em7',
        description: '6th string root - Minor with ♭7',
        technique: 'Full barre with minor 3rd',
        difficulty: 'Essential'
      },
      {
        name: 'Fm7 (8th fret)',
        frets: [-1, 8, 10, 8, 9, 8],
        fingers: ['', '1', '3', '1', '2', '1'],
        startFret: 8,
        rootString: 5,
        cagedShape: 'Am7',
        description: '5th string root - Minor with ♭7',
        technique: 'Partial barre with minor 3rd',
        difficulty: 'Essential'
      }
    ],
    'Inversions (Strings 1-4)': [
      {
        name: 'Fm7 Drop 2 Root Position (1-5-♭7-♭3) - Strings 1-4',
        frets: [-1, -1, 3, 5, 4, 4],
        fingers: ['', '', '1', '4', '2', '3'],
        startFret: 3,
        rootString: 4,
        description: 'Root position - F(1) C(5) E♭(♭7) A♭(♭3) on strings 1-4',
        technique: 'Drop 2 minor 7th voicing',
        difficulty: 'Essential'
      },
      {
        name: 'Fm7 Drop 2 First Inversion (♭3-♭7-1-5) - Strings 1-4',
        frets: [-1, -1, 6, 8, 6, 8],
        fingers: ['', '', '1', '3', '1', '4'],
        startFret: 6,
        rootString: 4,
        description: 'First inversion - A♭(♭3) E♭(♭7) F(1) C(5) on strings 1-4',
        technique: 'Minor 7th jazz voicing',
        difficulty: 'Essential'
      },
      {
        name: 'Fm7 Drop 2 Second Inversion (5-1-♭3-♭7) - Strings 1-4',
        frets: [-1, -1, 10, 10, 9, 11],
        fingers: ['', '', '2', '3', '1', '4'],
        startFret: 9,
        rootString: 4,
        description: 'Second inversion - C(5) F(1) A♭(♭3) E♭(♭7) on strings 1-4',
        technique: 'Upper register minor 7th',
        difficulty: 'Practical'
      },
      {
        name: 'Fm7 Drop 2 Third Inversion (♭7-♭3-5-1) - Strings 1-4',
        frets: [-1, -1, 1, 1, 1, 1],
        fingers: ['', '', '1', '1', '1', '1'],
        startFret: 1,
        rootString: 4,
        description: 'Third inversion - E♭(♭7) A♭(♭3) C(5) F(1) on strings 1-4',
        technique: 'Drop voicing - ♭7 in bass',
        difficulty: 'Essential'
      }
    ],
    'Inversions (Strings 2-5)': [
      {
        name: 'Fm7 Root Position (1-5-♭7-♭3) - Strings 2-5',
        frets: [-1, 8, 10, 8, 9, -1],
        fingers: ['', '1', '3', '1', '2', ''],
        startFret: 8,
        rootString: 5,
        description: 'Root position - F(1) C(5) E♭(♭7) A♭(♭3) on strings 2-5',
        technique: 'Simple barre minor 7th on middle strings',
        difficulty: 'Essential'
      },
      {
        name: 'Fm7 First Inversion (♭3-♭7-1-5) - Strings 2-5',
        frets: [-1, 11, 13, 10, 13, -1],
        fingers: ['', '2', '4', '1', '3', ''],
        startFret: 10,
        rootString: 5,
        description: 'First inversion - A♭(♭3) E♭(♭7) F(1) C(5) on strings 2-5',
        technique: 'Minor 7th jazz voicing on middle strings',
        difficulty: 'Essential'
      },
      {
        name: 'Fm7 Second Inversion (5-1-♭3-♭7) - Strings 2-5',
        frets: [-1, 3, 3, 1, 4, -1],
        fingers: ['', '2', '3', '1', '4', ''],
        startFret: 1,
        rootString: 5,
        description: 'Second inversion - C(5) F(1) A♭(♭3) E♭(♭7) on strings 2-5',
        technique: 'Drop 2 minor 7th on middle strings',
        difficulty: 'Essential'
      },
      {
        name: 'Fm7 Third Inversion (♭7-♭3-5-1) - Strings 2-5',
        frets: [-1, 6, 6, 5, 6, -1],
        fingers: ['', '2', '3', '1', '4', ''],
        startFret: 5,
        rootString: 5,
        description: 'Third inversion - E♭(♭7) A♭(♭3) C(5) F(1) on strings 2-5',
        technique: 'Drop voicing - ♭7 in bass',
        difficulty: 'Essential'
      }
    ],
    'Inversions (Strings 3-6)': [
      {
        name: 'Fm7 Root Position (1-5-♭7-♭3) - Strings 3-6',
        frets: [1, 3, 1, 1, -1, -1],
        fingers: ['1', '3', '1', '1', '', ''],
        startFret: 1,
        rootString: 6,
        description: 'Root position - F(1) C(5) E♭(♭7) A♭(♭3) on strings 3-6',
        technique: 'Simple barre minor 7th on lower strings',
        difficulty: 'Essential'
      },
      {
        name: 'Fm7 First Inversion (♭3-♭7-1-5) - Strings 3-6',
        frets: [4, 6, 3, 5, -1, -1],
        fingers: ['2', '4', '1', '3', '', ''],
        startFret: 3,
        rootString: 6,
        description: 'First inversion - A♭(♭3) E♭(♭7) F(1) C(5) on strings 3-6',
        technique: 'Minor 7th jazz voicing on lower strings',
        difficulty: 'Essential'
      },
      {
        name: 'Fm7 Second Inversion (5-1-♭3-♭7) - Strings 3-6',
        frets: [8, 8, 6, 8, -1, -1],
        fingers: ['2', '3', '1', '4', '', ''],
        startFret: 6,
        rootString: 6,
        description: 'Second inversion - C(5) F(1) A♭(♭3) E♭(♭7) on strings 3-6',
        technique: 'Drop 2 minor 7th on lower strings',
        difficulty: 'Essential'
      },
      {
        name: 'Fm7 Third Inversion (♭7-♭3-5-1) - Strings 3-6',
        frets: [11, 11, 10, 10, -1, -1],
        fingers: ['2', '3', '1', '1', '', ''],
        startFret: 10,
        rootString: 6,
        description: 'Third inversion - E♭(♭7) A♭(♭3) C(5) F(1) on strings 3-6',
        technique: 'Drop voicing - ♭7 in bass',
        difficulty: 'Practical'
      }
    ]
  },
  'Half-Diminished': {
    'Inversions (Strings 1-4)': [
      {
        name: 'Fm7♭5 Root Position (1-♭5-♭7-♭3) - Strings 1-4',
        frets: [-1, -1, 3, 4, 4, 4],
        fingers: ['', '', '1', '2', '3', '4'],
        startFret: 3,
        rootString: 4,
        description: 'Root position - F(1) B(♭5) E♭(♭7) A♭(♭3) on strings 1-4',
        technique: 'Drop 2 half-diminished voicing',
        difficulty: 'Practical'
      },
      {
        name: 'Fm7♭5 First Inversion (♭3-♭7-1-♭5) - Strings 1-4',
        frets: [-1, -1, 6, 8, 6, 7],
        fingers: ['', '', '1', '4', '1', '2'],
        startFret: 6,
        rootString: 4,
        description: 'First inversion - A♭(♭3) E♭(♭7) F(1) B(♭5) on strings 1-4',
        technique: 'Half-diminished jazz voicing',
        difficulty: 'Practical'
      },
      {
        name: 'Fm7♭5 Second Inversion (♭5-1-♭3-♭7) - Strings 1-4',
        frets: [-1, -1, 9, 10, 9, 11],
        fingers: ['', '', '1', '2', '1', '4'],
        startFret: 9,
        rootString: 4,
        description: 'Second inversion - B(♭5) F(1) A♭(♭3) E♭(♭7) on strings 1-4',
        technique: 'Upper register half-diminished',
        difficulty: 'Practical'
      },
      {
        name: 'Fm7♭5 Third Inversion (♭7-♭3-♭5-1) - Strings 1-4',
        frets: [-1, -1, 13, 13, 12, 13],
        fingers: ['', '', '2', '3', '1', '4'],
        startFret: 12,
        rootString: 4,
        description: 'Third inversion - E♭(♭7) A♭(♭3) B(♭5) F(1) on strings 1-4',
        technique: 'Half-diminished upper voicing',
        difficulty: 'Practical'
      }
    ],
    'Inversions (Strings 2-5)': [
      {
        name: 'Fm7♭5 Root Position (1-♭5-♭7-♭3) - Strings 2-5',
        frets: [-1, 8, 9, 8, 9, -1],
        fingers: ['', '1', '3', '2', '4', ''],
        startFret: 8,
        rootString: 5,
        description: 'Root position - F(1) B(♭5) E♭(♭7) A♭(♭3) on strings 2-5',
        technique: 'Half-diminished voicing on middle strings',
        difficulty: 'Practical'
      },
      {
        name: 'Fm7♭5 First Inversion (♭3-♭7-1-♭5) - Strings 2-5',
        frets: [-1, 11, 12, 10, 12, -1],
        fingers: ['', '2', '4', '1', '3', ''],
        startFret: 10,
        rootString: 5,
        description: 'First inversion - A♭(♭3) E♭(♭7) F(1) B(♭5) on strings 2-5',
        technique: 'Half-diminished jazz voicing on middle strings',
        difficulty: 'Practical'
      },
      {
        name: 'Fm7♭5 Second Inversion (♭5-1-♭3-♭7) - Strings 2-5',
        frets: [-1, 2, 3, 1, 4, -1],
        fingers: ['', '2', '3', '1', '4', ''],
        startFret: 1,
        rootString: 5,
        description: 'Second inversion - B(♭5) F(1) A♭(♭3) E♭(♭7) on strings 2-5',
        technique: 'Drop 2 half-diminished on middle strings',
        difficulty: 'Practical'
      },
      {
        name: 'Fm7♭5 Third Inversion (♭7-♭3-♭5-1) - Strings 2-5',
        frets: [-1, 6, 6, 4, 6, -1],
        fingers: ['', '2', '3', '1', '4', ''],
        startFret: 4,
        rootString: 5,
        description: 'Third inversion - E♭(♭7) A♭(♭3) B(♭5) F(1) on strings 2-5',
        technique: 'Drop voicing - ♭7 in bass',
        difficulty: 'Practical'
      }
    ],
    'Inversions (Strings 3-6)': [
      {
        name: 'Fm7♭5 Root Position (1-♭5-♭7-♭3) - Strings 3-6',
        frets: [1, 2, 1, 1, -1, -1],
        fingers: ['1', '2', '1', '1', '', ''],
        startFret: 1,
        rootString: 6,
        description: 'Root position - F(1) B(♭5) E♭(♭7) A♭(♭3) on strings 3-6',
        technique: 'Half-diminished voicing on lower strings',
        difficulty: 'Practical'
      },
      {
        name: 'Fm7♭5 First Inversion (♭3-♭7-1-♭5) - Strings 3-6',
        frets: [4, 6, 3, 4, -1, -1],
        fingers: ['2', '4', '1', '3', '', ''],
        startFret: 3,
        rootString: 6,
        description: 'First inversion - A♭(♭3) E♭(♭7) F(1) B(♭5) on strings 3-6',
        technique: 'Half-diminished jazz voicing on lower strings',
        difficulty: 'Practical'
      },
      {
        name: 'Fm7♭5 Second Inversion (♭5-1-♭3-♭7) - Strings 3-6',
        frets: [7, 8, 6, 8, -1, -1],
        fingers: ['2', '3', '1', '4', '', ''],
        startFret: 6,
        rootString: 6,
        description: 'Second inversion - B(♭5) F(1) A♭(♭3) E♭(♭7) on strings 3-6',
        technique: 'Drop 2 half-diminished on lower strings',
        difficulty: 'Practical'
      },
      {
        name: 'Fm7♭5 Third Inversion (♭7-♭3-♭5-1) - Strings 3-6',
        frets: [11, 11, 9, 10, -1, -1],
        fingers: ['3', '4', '1', '2', '', ''],
        startFret: 9,
        rootString: 6,
        description: 'Third inversion - E♭(♭7) A♭(♭3) B(♭5) F(1) on strings 3-6',
        technique: 'Drop voicing - ♭7 in bass',
        difficulty: 'Practical'
      }
    ]
  },
  'Diminished 7th': {
    'Inversions (Strings 1-4)': [
      {
        name: 'F°7 (1-♭5-6-♭3) - Strings 1-4',
        frets: [-1, -1, 3, 4, 3, 4],
        fingers: ['', '', '1', '3', '2', '4'],
        startFret: 3,
        rootString: 4,
        description: 'Symmetrical diminished 7th - F(1) B(♭5) D(6) A♭(♭3) on strings 1-4. Move this shape every 3 frets!',
        technique: 'Same shape every 3 frets - all inversions identical',
        difficulty: 'Practical'
      }
    ],
    'Inversions (Strings 2-5)': [
      {
        name: 'F°7 (1-♭5-6-♭3) - Strings 2-5',
        frets: [-1, 8, 9, 7, 9, -1],
        fingers: ['', '2', '3', '1', '4', ''],
        startFret: 7,
        rootString: 5,
        description: 'Symmetrical diminished 7th - F(1) B(♭5) D(6) A♭(♭3) on strings 2-5. Move this shape every 3 frets!',
        technique: 'Same shape every 3 frets - all inversions identical',
        difficulty: 'Practical'
      }
    ],
    'Inversions (Strings 3-6)': [
      {
        name: 'F°7 (1-♭5-6-♭3) - Strings 3-6',
        frets: [13, 14, 12, 13, -1, -1],
        fingers: ['2', '3', '1', '2', '', ''],
        startFret: 12,
        rootString: 6,
        description: 'Symmetrical diminished 7th - F(1) B(♭5) D(6) A♭(♭3) on strings 3-6. Move this shape every 3 frets!',
        technique: 'Same shape every 3 frets - all inversions identical',
        difficulty: 'Practical'
      }
    ]
  }
};

// SUSPENDED CHORDS - Fixed D-shape Sus2
const SUSPENDED_CHORDS: ChordTypeData = {
  'Sus2 Chords': [
    {
      name: 'Fsus2 (1st fret)',
      frets: [1, 3, 5, -1, -1, -1],
      fingers: ['1', '2', '4', '', '', ''],
      rootString: 6,
      cagedShape: 'Esus2',
      description: '6th string root - Replace 3rd with 2nd (no 3rd)',
      technique: 'Barre with 2nd, omits 3rd entirely',
      difficulty: 'Practical'
    },
    {
      name: 'Fsus2 (8th fret)',
      frets: [-1, 8, 10, 10, 8, -1],
      fingers: ['', '1', '3', '4', '1', ''],
      startFret: 8,
      rootString: 5,
      cagedShape: 'Asus2',
      description: '5th string root - Replace 3rd with 2nd (no 3rd)',
      technique: 'Partial barre with sus2 interval, omits 3rd',
      difficulty: 'Practical'
    },
    {
      name: 'Fsus2 (3rd fret)',
      frets: [-1, -1, 3, 5, 6, 3],
      fingers: ['', '', '1', '3', '4', '1'],
      startFret: 3,
      rootString: 4,
      cagedShape: 'Dsus2',
      description: '4th string root - Replace 3rd with 2nd (no 3rd)',
      technique: 'Clean sus2 voicing - F(1) C(5) G(2) C(5), no 3rd',
      difficulty: 'Practical'
    }
  ],
  'Sus4 Chords': [
    {
      name: 'Fsus4 (1st fret)',
      frets: [1, 3, 3, 3, 1, 1],
      fingers: ['1', '2', '3', '4', '1', '1'],
      rootString: 6,
      cagedShape: 'Esus4',
      description: '6th string root - Replace 3rd with 4th',
      technique: 'Barre with added 4th',
      difficulty: 'Practical'
    },
    {
      name: 'Fsus4 (8th fret)',
      frets: [-1, 8, 10, 10, 11, 8],
      fingers: ['', '1', '2', '3', '4', '1'],
      startFret: 8,
      rootString: 5,
      cagedShape: 'Asus4',
      description: '5th string root - Replace 3rd with 4th',
      technique: 'Partial barre with sus4 interval',
      difficulty: 'Practical'
    },
    {
      name: 'Fsus4 (3rd fret)',
      frets: [-1, -1, 3, 5, 6, 6],
      fingers: ['', '', '1', '2', '3', '4'],
      startFret: 3,
      rootString: 4,
      cagedShape: 'Dsus4',
      description: '4th string root - Replace 3rd with 4th',
      technique: 'Clean sus4 voicing',
      difficulty: 'Practical'
    }
  ]
};

// DIMINISHED CHORDS
const DIMINISHED_CHORDS: ChordTypeData = {
  'Diminished Triads': [
    {
      name: 'Fdim (1st fret)',
      frets: [1, -1, 4, 1, 3, -1],
      fingers: ['1', '', '4', '2', '3', ''],
      rootString: 6,
      cagedShape: 'E°',
      description: 'Symmetrical diminished triad - Note: Most players use diminished 7th chords instead',
      technique: 'Same shape every 3 frets - rarely used compared to dim7',
      difficulty: 'Rarely Used'
    },
    {
      name: 'Fdim (8th fret)',
      frets: [-1, 8, 9, 7, 8, -1],
      fingers: ['', '2', '3', '1', '2', ''],
      startFret: 7,
      rootString: 5,
      cagedShape: 'A°',
      description: 'Symmetrical diminished triad - Note: Most players use diminished 7th chords instead', 
      technique: 'Same shape every 3 frets - rarely used compared to dim7',
      difficulty: 'Rarely Used'
    }
  ]
};

// SUSPENDED CHORDS - Sus2, Sus4, and 7sus4 chords
const SUSPENDED_CHORDS_BY_TYPE = {
  'Sus2': SUSPENDED_CHORDS['Sus2 Chords'],
  'Sus4': SUSPENDED_CHORDS['Sus4 Chords'], 
  '7sus4': [
    {
      name: 'F7sus4 (1st fret)',
      frets: [1, 3, 1, 3, 1, 1],
      fingers: ['1', '3', '1', '4', '1', '1'],
      rootString: 6,
      cagedShape: 'E7sus4',
      description: '6th string root - Full barre with sus4 and ♭7',
      technique: 'Barre with 4th finger on sus4',
      difficulty: 'Essential' as const
    },
    {
      name: 'F7sus4 (8th fret)',
      frets: [-1, 8, 10, 8, 11, 8],
      fingers: ['', '1', '3', '1', '4', '1'],
      startFret: 8,
      rootString: 5,
      cagedShape: 'A7sus4',
      description: '5th string root - Partial barre with sus4 and ♭7',
      technique: 'Partial barre with sus4',
      difficulty: 'Essential' as const
    }
  ]
};

// EXTENSION CHORDS - CORRECTED theory and voicings with proper organization
const EXTENSION_CHORDS: Record<ExtensionChordType, ChordShape[]> = {
  '9th Chords': [
    {
      name: 'F9 A String Root (4 strings)',
      frets: [-1, 8, 7, 8, 8, -1],
      fingers: ['', '2', '1', '3', '4', ''],
      startFret: 7,
      rootString: 5,
      description: 'F9 - F(1) A(3) E♭(♭7) G(9), 5th omitted',
      technique: 'A string root dominant 9th',
      difficulty: 'Practical'
    },
    {
      name: 'FMaj9 A String Root (4 strings)',
      frets: [-1, 8, 7, 9, 8, -1],
      fingers: ['', '2', '1', '4', '3', ''],
      startFret: 7,
      rootString: 5,
      description: 'FMaj9 - F(1) A(3) E(7) G(9), 5th omitted',
      technique: 'A string root major 9th',
      difficulty: 'Practical'
    },
    {
      name: 'Fm9 A String Root (4 strings)',
      frets: [-1, 8, 6, 8, 8, -1],
      fingers: ['', '2', '1', '3', '4', ''],
      startFret: 6,
      rootString: 5,
      description: 'Fm9 - F(1) A♭(♭3) E♭(♭7) G(9), 5th omitted',
      technique: 'A string root minor 9th',
      difficulty: 'Practical'
    }
  ],
  '11th Chords': [
    {
      name: 'Fm11 Full Barre (1st fret)',
      frets: [1, 1, 1, 1, 1, 1],
      fingers: ['1', '1', '1', '1', '1', '1'],
      startFret: 1,
      rootString: 6,
      description: 'Fm11 - Full barre F(1) A♭(♭3) E♭(♭7) G(9) B♭(11) C(5)',
      technique: 'Complete F minor 11th barre chord',
      difficulty: 'Practical'
    },
    {
      name: 'FMaj9#11 (NO ROOT) A String Root (4 strings)',
      frets: [-1, 12, 10, 12, 12, 12],
      fingers: ['', '2', '1', '3', '4', '4'],
      startFret: 10,
      rootString: 5,
      description: 'FMaj9#11 (rootless) - A(3) C(5) G(9) B(#11) E(7), NO ROOT',
      technique: 'Rootless major 9#11 - barre 4th finger on B & E strings',
      difficulty: 'Practical'
    },
    {
      name: 'Fm11 (NO ROOT) A String Root (4 strings)',
      frets: [-1, 11, 10, 12, 11, 11],
      fingers: ['', '2', '1', '4', '3', '3'],
      startFret: 10,
      rootString: 5,
      description: 'Fm11 (rootless) - A♭(♭3) C(5) G(9) B♭(11) E♭(♭7), NO ROOT',
      technique: 'Rootless minor 11th - barre 3rd finger on B & E strings',
      difficulty: 'Practical'
    }
  ],
  '13th Chords': [
    {
      name: 'F13 (No 5 or 11)',
      frets: [1, -1, 1, 2, 3, 3],
      fingers: ['1', '', '1', '2', '3', '4'],
      startFret: 1,
      rootString: 6,
      description: 'F13 - F(1) A(3) E♭(♭7) G(9) D(13), 5th and 11th omitted',
      technique: 'E string root with 1st finger on bass',
      difficulty: 'Advanced'
    },
    {
      name: 'FMaj13 (No 5 or 11)',
      frets: [1, -1, 2, 2, 3, 3],
      fingers: ['1', '', '2', '3', '4', '4'],
      startFret: 1,
      rootString: 6,
      description: 'FMaj13 - F(1) A(3) E(7) G(9) D(13), 5th and 11th omitted',
      technique: 'E string root with 1st finger on bass',
      difficulty: 'Advanced'
    },
    {
      name: 'Fm13 (No 5 or 11)',
      frets: [1, -1, 1, 1, 3, 3],
      fingers: ['1', '', '1', '1', '3', '4'],
      startFret: 1,
      rootString: 6,
      description: 'Fm13 - F(1) A♭(♭3) E♭(♭7) G(9) D(13), 5th and 11th omitted',
      technique: 'E string root with 1st finger on bass',
      difficulty: 'Advanced'
    }
  ],
  'Altered Chords': [
    {
      name: 'F7♭9 A String Root (4 strings)',
      frets: [-1, 8, 7, 8, 7, -1],
      fingers: ['', '2', '1', '3', '1', ''],
      startFret: 7,
      rootString: 5,
      description: 'F7♭9 - F(1) A(3) E♭(♭7) G♭(♭9), 5th omitted',
      technique: 'A string root dominant ♭9',
      difficulty: 'Advanced'
    },
    {
      name: 'F7#9 "Hendrix" A String Root (4 strings)',
      frets: [-1, 8, 7, 8, 9, -1],
      fingers: ['', '2', '1', '3', '4', ''],
      startFret: 7,
      rootString: 5,
      description: 'F7#9 - F(1) A(3) E♭(♭7) G#(#9), 5th omitted',
      technique: 'A string root dominant #9 "Hendrix chord"',
      difficulty: 'Advanced'
    },
    {
      name: 'F7#5♭9 Upper String Voicing (4 strings)',
      frets: [-1, -1, 1, 2, 2, 2],
      fingers: ['', '', '1', '3', '3', '3'],
      startFret: 1,
      rootString: 4,
      description: 'F7#5♭9 - F(1) A(3) C#(#5) E♭(♭7) G♭(♭9)',
      technique: 'Altered dominant with #5 and ♭9',
      difficulty: 'Advanced'
    },
    {
      name: 'F9#5 Upper String Voicing (4 strings)',
      frets: [-1, -1, 1, 2, 2, 3],
      fingers: ['', '', '1', '2', '3', '4'],
      startFret: 1,
      rootString: 4,
      description: 'F9#5 - F(1) A(3) C#(#5) E♭(♭7) G(9)',
      technique: 'Dominant 9th with #5',
      difficulty: 'Advanced'
    }
  ]
};

// Combine all chord data
const ALL_CHORD_DATA: Record<ChordCategory, ChordTypeData> = {
  'Major': MAJOR_CHORDS,
  'Minor': MINOR_CHORDS,
  '7th Chords': {}, // Will be handled separately with sub-tabs
  'Suspended': SUSPENDED_CHORDS,
  'Extensions': {} // Will be handled separately with sub-tabs
};

function MoveableGuitarChordShapes() {
  const searchParams = useSearchParams();
  
  // Initialize state based on URL parameters
  const getInitialCategory = (): ChordCategory => {
    const category = searchParams.get('category');
    if (category === '7th-chords') return '7th Chords';
    if (category && category.toLowerCase() === 'extensions') return 'Extensions';
    return 'Major';
  };
  
  const getInitialStringSet = (): string => {
    const stringSet = searchParams.get('stringSet');
    return stringSet ? decodeURIComponent(stringSet) : 'Barre Chord Shapes';
  };
  
  const getInitialExtensionType = (): ExtensionChordType => {
    const stringSet = searchParams.get('stringSet');
    if (stringSet) {
      const decodedStringSet = decodeURIComponent(stringSet);
      if (decodedStringSet === '9th Chords') return '9th Chords';
      if (decodedStringSet === '11th Chords') return '11th Chords';
      if (decodedStringSet === '13th Chords') return '13th Chords';
      if (decodedStringSet === 'Altered Chords') return 'Altered Chords';
    }
    return '9th Chords';
  };
  
  const [selectedCategory, setSelectedCategory] = useState<ChordCategory>(getInitialCategory());
  const [selectedSeventhType, setSelectedSeventhType] = useState<SeventhChordType>('Dominant 7th');
  const [selectedSuspendedType, setSelectedSuspendedType] = useState<SuspendedChordType>('Sus2');
  const [selectedExtensionType, setSelectedExtensionType] = useState<ExtensionChordType>(getInitialExtensionType());
  const [selectedStringSet, setSelectedStringSet] = useState<string>(getInitialStringSet());
  const [showTheoryModal, setShowTheoryModal] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [expandedChords, setExpandedChords] = useState<Set<string>>(new Set());

  // Handle URL parameters for automatic tab selection (for navigation changes)
  useEffect(() => {
    const category = searchParams.get('category');
    const stringSet = searchParams.get('stringSet');
    
    if (category === '7th-chords') {
      setSelectedCategory('7th Chords');
      if (stringSet) {
        setSelectedStringSet(decodeURIComponent(stringSet));
      }
    } else if (category && category.toLowerCase() === 'extensions') {
      setSelectedCategory('Extensions');
      if (stringSet) {
        const decodedStringSet = decodeURIComponent(stringSet);
        setSelectedStringSet(decodedStringSet);
        
        // Also set the extension type based on the stringSet
        if (decodedStringSet === '9th Chords') {
          setSelectedExtensionType('9th Chords');
        } else if (decodedStringSet === '11th Chords') {
          setSelectedExtensionType('11th Chords');
        } else if (decodedStringSet === '13th Chords') {
          setSelectedExtensionType('13th Chords');
        } else if (decodedStringSet === 'Altered Chords') {
          setSelectedExtensionType('Altered Chords');
        }
      }
    }
  }, [searchParams]);

  // Ensure valid string set is selected when category or chord type changes
  React.useEffect(() => {
    if (selectedCategory === '7th Chords') {
      const chordData = SEVENTH_CHORDS[selectedSeventhType];
      const availableStringSets = Object.keys(chordData);
      if (availableStringSets.length > 0 && !availableStringSets.includes(selectedStringSet)) {
        // Only set default if no URL parameter was provided
        const urlStringSet = searchParams.get('stringSet');
        if (!urlStringSet) {
          setSelectedStringSet(availableStringSets[0]);
        } else {
          // If URL parameter exists but is invalid, use the decoded value if it's valid
          const decodedStringSet = decodeURIComponent(urlStringSet);
          if (availableStringSets.includes(decodedStringSet)) {
            setSelectedStringSet(decodedStringSet);
          } else {
            setSelectedStringSet(availableStringSets[0]);
          }
        }
      }
    } else if (selectedCategory === 'Extensions') {
      // For extensions, we don't need string set validation since it's a flat array
      // Just ensure we have a valid extension type
      if (!EXTENSION_CHORD_TYPES.includes(selectedExtensionType)) {
        setSelectedExtensionType('9th Chords');
      }
    } else {
      // For other categories, default to 'Barre Chord Shapes' if not already selected
      if (selectedStringSet !== 'Barre Chord Shapes') {
        setSelectedStringSet('Barre Chord Shapes');
      }
    }
  }, [selectedCategory, selectedSeventhType, selectedExtensionType, selectedStringSet, searchParams]);

  const toggleChordExpansion = (chordId: string) => {
    const newExpanded = new Set(expandedChords);
    if (newExpanded.has(chordId)) {
      newExpanded.delete(chordId);
    } else {
      newExpanded.add(chordId);
    }
    setExpandedChords(newExpanded);
  };

  const getSimplifiedChordName = (shape: ChordShape): string => {
    const chordName = getChordName(shape);
    
    // Extract formula from the name if it exists
    const formulaMatch = shape.name.match(/\(([^)]+)\)/);
    if (formulaMatch && formulaMatch[1].includes('-') && !formulaMatch[1].includes('fret')) {
      // This is a formula like (1-5-♭7-3) - keep the dashes
      const formula = formulaMatch[1];
      return `${chordName} (${formula})`;
    }
    
    // For non-inversion chords, just return the chord name
    return chordName;
  };

  const renderChordSection = (category: ChordCategory) => {
    switch (category) {
      case 'Major':
        return renderMajorChordsSection();
      case 'Minor':
        return renderMinorChordsSection();
      case '7th Chords':
        return renderSeventhChordsSection();
      case 'Suspended':
        return renderSuspendedChordsSection();
      case 'Extensions':
        return renderExtensionChordsSection();
      default:
        return null;
    }
  };

  const renderMajorChordsSection = () => {
    return (
      <div className="space-y-12">
        {Object.entries(MAJOR_CHORDS).map(([sectionName, shapes]) => (
          <div key={sectionName} className="mb-12">
            <h3 className="text-xl font-bold text-amber-700 mb-6 text-center">{sectionName}</h3>
            {renderChordGrid(shapes)}
            {sectionName === 'Essential Barre Chords' && (
              <div className="text-sm text-gray-700 bg-amber-50 border border-amber-200 rounded p-3 max-w-3xl mx-auto mt-4">
                <span className="font-semibold text-amber-800">Alternative fingering:</span> bar the 3rd finger instead of using fingers 2, 3, and 4.
              </div>
            )}
          </div>
        ))}
        
        {/* CAGED System Link */}
        <div className="text-center mt-12 p-6 bg-amber-50 rounded-lg border border-amber-200">
          <p className="text-gray-700 mb-3">
            <strong>Note:</strong> All of these shapes are CAGED shapes. Want to understand how these moveable shapes connect across the fretboard?
          </p>
          <a 
            href="/blog/caged-system-guitar-guide" 
            className="inline-flex items-center px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-medium"
          >
            Learn the CAGED System →
          </a>
        </div>
      </div>
    );
  };

  const renderMinorChordsSection = () => {
    return (
      <div className="space-y-12">
        {Object.entries(MINOR_CHORDS).map(([sectionName, shapes]) => (
          <div key={sectionName} className="mb-12">
            <h3 className="text-xl font-bold text-amber-700 mb-6 text-center">{sectionName}</h3>
            {renderChordGrid(shapes)}
          </div>
        ))}
        
        {/* CAGED System Link */}
        <div className="text-center mt-12 p-6 bg-amber-50 rounded-lg border border-amber-200">
          <p className="text-gray-700 mb-3">
            <strong>Note:</strong> All of these shapes are CAGED shapes. Want to understand how these moveable shapes connect across the fretboard?
          </p>
          <a 
            href="/blog/caged-system-guitar-guide" 
            className="inline-flex items-center px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-medium"
          >
            Learn the CAGED System →
          </a>
        </div>
      </div>
    );
  };

  const renderSuspendedChordsSection = () => {
    const chordShapes = SUSPENDED_CHORDS_BY_TYPE[selectedSuspendedType];
    
    return (
      <div className="space-y-8">
        {/* Sub-tabs for suspended chord types */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {SUSPENDED_CHORD_TYPES.map(type => (
            <button
              key={type}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                selectedSuspendedType === type
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
              onClick={() => setSelectedSuspendedType(type)}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Render selected suspended chord type */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-amber-700 mb-6 text-center">{selectedSuspendedType} Chords</h3>
          {renderChordGrid(chordShapes)}
        </div>
      </div>
    );
  };

  const renderSeventhChordsSection = () => {
    const chordData = SEVENTH_CHORDS[selectedSeventhType];
    const allStringSetOptions = ['Barre Chord Shapes', 'Inversions (Strings 1-4)', 'Inversions (Strings 2-5)', 'Inversions (Strings 3-6)'];
    const stringSetOptions = (selectedSeventhType === 'Half-Diminished' || selectedSeventhType === 'Diminished 7th')
      ? allStringSetOptions.filter(option => option !== 'Barre Chord Shapes')
      : allStringSetOptions;
    
    return (
      <div className="space-y-8">
        {/* Sub-tabs for 7th chord types */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {SEVENTH_CHORD_TYPES.map(type => (
            <button
              key={type}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                selectedSeventhType === type
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
              onClick={() => {
                setSelectedSeventhType(type);
                // Set default string set based on chord type
                const chordData = SEVENTH_CHORDS[type];
                const availableStringSets = Object.keys(chordData);
                if (availableStringSets.length > 0) {
                  // For Half-Diminished and Diminished 7th, default to first available (which should be Inversions)
                  setSelectedStringSet(availableStringSets[0]);
                }
              }}
            >
              {type}
            </button>
          ))}
        </div>

        {/* String Set tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {stringSetOptions.map(stringSet => (
            <button
              key={stringSet}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedStringSet === stringSet
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
              onClick={() => setSelectedStringSet(stringSet)}
            >
              {stringSet === 'Barre Chord Shapes' ? 'Barre Chords' : 
               stringSet === 'Inversions (Strings 1-4)' ? 'Strings 1-4' :
               stringSet === 'Inversions (Strings 2-5)' ? 'Strings 2-5' :
               'Strings 3-6'}
            </button>
          ))}
        </div>

        {/* Render selected string set */}
        {chordData[selectedStringSet] && (
          <div className="mb-12">
            <h3 className="text-xl font-bold text-amber-700 mb-6 text-center">{selectedStringSet}</h3>
            
            {renderChordGrid(chordData[selectedStringSet])}
            {selectedStringSet === 'Barre Chord Shapes' && (
              <div className="text-sm text-gray-700 bg-amber-50 border border-amber-200 rounded p-3 max-w-3xl mx-auto mt-4">
                <span className="font-semibold text-amber-800">Alternative fingering:</span> bar the 3rd finger instead of using fingers 2, 3, and 4.
              </div>
            )}
          </div>
        )}

        {/* No data message */}
        {!chordData[selectedStringSet] && (
          <div className="text-center text-gray-500 py-8">
            <p>No chord shapes available for {selectedStringSet} in {selectedSeventhType}</p>
          </div>
        )}
      </div>
    );
  };

  const renderExtensionChordsSection = () => {
    const chordData = EXTENSION_CHORDS[selectedExtensionType];
    
    return (
      <div className="space-y-8">
        {/* Sub-tabs for extension chord types */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {EXTENSION_CHORD_TYPES.map(type => (
            <button
              key={type}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                selectedExtensionType === type
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
              onClick={() => setSelectedExtensionType(type)}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Render chord grid directly since there are no string set tabs */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-amber-700 mb-6 text-center">{selectedExtensionType}</h3>
          {renderChordGrid(chordData)}
        </div>
      </div>
    );
  };

  const renderChordGrid = (shapes: ChordShape[]) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {shapes.map((shape, idx) => {
        const chordName = getChordName(shape);
        const simplifiedName = getSimplifiedChordName(shape);
        const chordId = `${shape.name}-${idx}`;
        const isExpanded = expandedChords.has(chordId);
        const hasDetailedDescription = shape.description && (shape.description.includes('position') || shape.description.includes('inversion'));
        
        return (
          <div key={chordId} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            {/* Chord Diagram */}
            <div className="mb-4">
              <ChordDiagram
                chordName={chordName}
                chordData={{
                  frets: shape.frets,
                  fingers: shape.fingers,
                  startFret: shape.startFret,
                  rootString: shape.rootString,
                  technique: shape.technique
                }}
                showNotes={showNotes}
              />
            </div>
            
            {/* Chord Info */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">{simplifiedName}</h4>
              
              {shape.cagedShape && (
                <p className="text-xs text-amber-600 font-medium">
                  CAGED: {shape.cagedShape} Shape
                </p>
              )}
              {shape.name === 'F (8th fret)' && shape.cagedShape?.startsWith('A') && (
                <p className="text-xs mt-2 text-gray-600">
                  <span className="font-semibold text-amber-700">Alternative fingering:</span> bar the 3rd finger instead of using fingers 2, 3, and 4.
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );

  const getChordName = (shape: ChordShape): string => {
    // Handle specific transposed chords first
    if (shape.name.includes('Am9')) return 'Am9';
    if (shape.name.includes('A♭Maj9')) return 'A♭Maj9';
    
    // Handle specific chord names that should be preserved exactly
    if (shape.name.includes('(NO ROOT)')) return shape.name.split(' A String Root')[0];
    
    // Handle extension chords with more specific patterns first
    if (shape.name.includes('Maj9#11')) return ROOT_NOTE + 'Maj9#11';
    if (shape.name.includes('9#5')) return ROOT_NOTE + '9#5';
    if (shape.name.includes('7#5♭9')) return ROOT_NOTE + '7#5♭9';
    if (shape.name.includes('7♭9')) return ROOT_NOTE + '7♭9';
    if (shape.name.includes('7#9')) return ROOT_NOTE + '7#9';
    if (shape.name.includes('Maj13')) return ROOT_NOTE + 'Maj13';
    if (shape.name.includes('m13') && !shape.name.includes('13th fret')) return ROOT_NOTE + 'm13';
    if (shape.name.includes('13#11')) return ROOT_NOTE + '13#11';
    if (shape.name.includes('13') && !shape.name.includes('13th fret')) return ROOT_NOTE + '13';
    if (shape.name.includes('m11')) return ROOT_NOTE + 'm11';
    if (shape.name.includes('11')) return ROOT_NOTE + '11';
    if (shape.name.includes('Maj9')) return ROOT_NOTE + 'Maj9';
    if (shape.name.includes('m9')) return ROOT_NOTE + 'm9';
    if (shape.name.includes('9')) return ROOT_NOTE + '9';
    if (shape.name.includes('Maj7')) return ROOT_NOTE + 'Maj7';
    if (shape.name.includes('m7♭5')) return ROOT_NOTE + 'm7♭5';
    if (shape.name.includes('m7')) return ROOT_NOTE + 'm7';
    if (shape.name.includes('°7')) return ROOT_NOTE + '°7';
    if (shape.name.includes('dim') || shape.name.includes('°')) return ROOT_NOTE + 'dim';
    if (shape.name.includes('add9')) return ROOT_NOTE + 'add9';
    if (shape.name.includes('7')) return ROOT_NOTE + '7';
    if (shape.name.includes('sus4')) return ROOT_NOTE + 'sus4';
    if (shape.name.includes('sus2')) return ROOT_NOTE + 'sus2';
    if (shape.name.includes('m')) return ROOT_NOTE + 'm';
    return ROOT_NOTE;
  };

  const getCategoryDescription = (category: ChordCategory): string => {
    switch (category) {
      case 'Major':
        return 'Essential major chord shapes including barre chords and advanced moveable shapes covering the entire fretboard.';
      case 'Minor':
        return 'Essential minor chord shapes including barre chords and advanced moveable shapes.';
      case '7th Chords':
        return 'Comprehensive 7th chord collection organized by chord type with both barre chord shapes and upper string inversions.';
      case 'Suspended':
        return 'Sus2 and sus4 chords that replace the 3rd with the 2nd or 4th interval.';
              case 'Extensions':
          return 'Extended harmony including 9th chords (9, ♭9, #9), 11th chords (11, #11), and 13th chords with proper voicings and omissions.';
      default:
        return '';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8" id="chord-inversions-7th-chords">

      <h2 className="text-2xl font-bold text-amber-700 mb-6 text-center">Moveable Chord Shapes Types</h2>

      {/* Category Navigation */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {CHORD_CATEGORIES.map(category => (
          <button
            key={category}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              selectedCategory === category
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Note Display Toggle */}
      <div className="text-center mb-6">
        <button
          onClick={() => setShowNotes(!showNotes)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            showNotes
              ? 'bg-amber-600 text-white shadow-md'
              : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          {showNotes ? '🎵 Hide Notes' : '🎵 Show Notes'}
        </button>
      </div>

      {/* Category Description */}
      <div className="text-center mb-8">
        <p className="text-gray-600 max-w-3xl mx-auto">
          {getCategoryDescription(selectedCategory)}
        </p>
      </div>

      {/* Render selected category */}
      {renderChordSection(selectedCategory)}

      {/* Theory Modal Button - Only show for 7th Chords */}
      {selectedCategory === '7th Chords' && (
        <div className="text-center mt-12">
          <button
            onClick={() => setShowTheoryModal(true)}
            className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors"
          >
            📚 Understanding Chord Inversions
          </button>
        </div>
      )}

      {/* Theory Modal */}
      {showTheoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Understanding Chord Inversions</h2>
                <button
                  onClick={() => setShowTheoryModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-6 text-gray-700">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-amber-700">What are Chord Inversions?</h3>
                  <p className="mb-2">
                    Chord inversions are different arrangements of the same chord tones. For a 7th chord, we have four possible positions:
                  </p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><strong>Root Position (1-3-5-7):</strong> The root note is in the bass</li>
                    <li><strong>First Inversion (3-5-7-1):</strong> The third is in the bass</li>
                    <li><strong>Second Inversion (5-7-1-3):</strong> The fifth is in the bass</li>
                    <li><strong>Third Inversion (7-1-3-5):</strong> The seventh is in the bass</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-amber-700">Drop 2 Voicings</h3>
                  <p className="mb-4">
                    <strong>Many of the voicings on guitar are drop voicings to make the chords playable.</strong> All of the 7th chord inversions shown in this guide are drop 2 voicings.
                  </p>
                  <p className="mb-2">
                    Drop 2 voicings are created by taking a close position chord and dropping the second highest note down an octave. They're popular because:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 mb-4">
                    <li><strong>Playability:</strong> They fit comfortably under the fingers on guitar</li>
                    <li><strong>Sound:</strong> They create a rich, open sound with good voice separation</li>
                    <li><strong>Voice Leading:</strong> They allow for smooth movement between chords</li>
                    <li><strong>Versatility:</strong> They work well on different string sets (1-4, 2-5, 3-6)</li>
                  </ul>
                  
                  {/* Drop 2 Voicing Derivation Table */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-md font-semibold mb-3 text-center">🎵 Drop 2 Voicing Derivation Table</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm border-collapse">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border border-gray-300 p-2 text-left">Close Voicing Name</th>
                            <th className="border border-gray-300 p-2 text-left">Close Voicing Formula</th>
                            <th className="border border-gray-300 p-2 text-left">2nd Highest Note</th>
                            <th className="border border-gray-300 p-2 text-left">Drop 2 Voicing Name</th>
                            <th className="border border-gray-300 p-2 text-left">Drop 2 Voicing Formula</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-gray-300 p-2">Root Position</td>
                            <td className="border border-gray-300 p-2">1 – 3 – 5 – 7</td>
                            <td className="border border-gray-300 p-2 bg-orange-200 font-bold">5</td>
                            <td className="border border-gray-300 p-2">Drop 2 Root Position</td>
                            <td className="border border-gray-300 p-2"><span className="bg-orange-200 font-bold">5</span> – 1 – 3 – 7</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 p-2">1st Inversion</td>
                            <td className="border border-gray-300 p-2">3 – 5 – 7 – 1</td>
                            <td className="border border-gray-300 p-2 bg-orange-200 font-bold">7</td>
                            <td className="border border-gray-300 p-2">Drop 2 1st Inversion</td>
                            <td className="border border-gray-300 p-2"><span className="bg-orange-200 font-bold">7</span> – 3 – 5 – 1</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 p-2">2nd Inversion</td>
                            <td className="border border-gray-300 p-2">5 – 7 – 1 – 3</td>
                            <td className="border border-gray-300 p-2 bg-orange-200 font-bold">1</td>
                            <td className="border border-gray-300 p-2">Drop 2 2nd Inversion</td>
                            <td className="border border-gray-300 p-2"><span className="bg-orange-200 font-bold">1</span> – 5 – 7 – 3</td>
                          </tr>
                          <tr>
                            <td className="border border-gray-300 p-2">3rd Inversion</td>
                            <td className="border border-gray-300 p-2">7 – 1 – 3 – 5</td>
                            <td className="border border-gray-300 p-2 bg-orange-200 font-bold">3</td>
                            <td className="border border-gray-300 p-2">Drop 2 3rd Inversion</td>
                            <td className="border border-gray-300 p-2"><span className="bg-orange-200 font-bold">3</span> – 7 – 1 – 5</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <p className="text-xs text-gray-600 mt-2 text-center">
                      The <span className="bg-orange-200 font-bold px-1">highlighted note</span> shows which note is dropped down an octave to create the drop 2 voicing.
                    </p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-amber-700">Using Inversions in Practice</h3>
                  <ol className="list-decimal pl-6 space-y-1">
                    <li>Start with root position shapes on strings 1-4</li>
                    <li>Practice moving between inversions on the same string set</li>
                    <li>Use inversions to create smooth voice leading in progressions</li>
                    <li>Learn the same inversion across different string sets</li>
                    <li>Combine inversions with barre chord shapes for full arrangements</li>
                  </ol>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2 text-amber-700">Common Applications</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><strong>Jazz Comping:</strong> Using inversions to create interesting accompaniment patterns</li>
                    <li><strong>Chord Melody:</strong> Playing melody notes as the highest note of different inversions</li>
                    <li><strong>Bass Lines:</strong> Creating walking bass lines by using different inversions</li>
                    <li><strong>Voice Leading:</strong> Moving between chords with minimal movement and maximum smoothness</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Wrapper component to handle Suspense boundary for useSearchParams
function MoveableGuitarChordShapesContent() {
  return <MoveableGuitarChordShapes />;
}

export default function MoveableGuitarChordShapesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-amber-800 via-amber-700 to-amber-600 text-white py-8 sm:py-10 mb-6">
        <div className="max-w-6xl mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold font-playfair mb-2">Moveable Guitar Chord Shapes</h1>
            <p className="text-base sm:text-lg text-amber-100 mb-3 leading-relaxed">Learn E- and A‑shape barre chords, inversions, and extended voicings across the neck.</p>
            <div className="flex items-center justify-center gap-3 text-amber-200 text-sm">
              <span>Intermediate Level</span>
            </div>
          </div>
        </div>
      </section>
      <Suspense fallback={<div className="flex justify-center items-center min-h-screen">Loading...</div>}>
        <MoveableGuitarChordShapesContent />
      </Suspense>
    </>
  );
}