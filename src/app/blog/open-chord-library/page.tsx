'use client';

import React, { useState, useRef, useEffect } from 'react';
import { GuitarStrumEngine } from '@/utils/audio/guitarStrumEngine';

const GuitarChordReference = () => {
  const [selectedSection, setSelectedSection] = useState('major-minor');
  const [activeProgressionKey, setActiveProgressionKey] = useState('A');
  const [activeBluesKey, setActiveBluesKey] = useState('E');
  const [progressionType, setProgressionType] = useState('standard'); // 'standard' or 'blues'
  const [swingCounting, setSwingCounting] = useState(true); // true for swing (1-2-3), false for straight (1&2&3&4&)
  const [isBluesPlaying, setIsBluesPlaying] = useState(false);
  const [currentBluesStroke, setCurrentBluesStroke] = useState(-1); // -1 = none, 0-7 = stroke index
  const [advancedSubTab, setAdvancedSubTab] = useState('diminished7'); // subtab for advanced chords
  
  const guitarEngineRef = useRef<GuitarStrumEngine | null>(null);
  const bluesTimeoutRefs = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    guitarEngineRef.current = new GuitarStrumEngine();
    
    return () => {
      // Clean up timeouts
      bluesTimeoutRefs.current.forEach(timeout => clearTimeout(timeout));
    };
  }, []);

  // Reorganized chord database with proper chord families
  const chordDatabase = {
    open: {
      major: {
        'A': { frets: [-1, 0, 2, 2, 2, 0], fingers: ['', '', '1', '2', '3', ''] },
        'C': { frets: [-1, 3, 2, 0, 1, 0], fingers: ['', '3', '2', '', '1', ''] },
        'D': { frets: [-1, -1, 0, 2, 3, 2], fingers: ['', '', '', '1', '3', '2'] },
        'E': { frets: [0, 2, 2, 1, 0, 0], fingers: ['', '2', '3', '1', '', ''] },
        'G': { frets: [3, 2, 0, 0, 0, 3], fingers: ['3', '2', '', '', '', '4'] },
        'G (4-finger)': { frets: [3, 2, 0, 0, 3, 3], fingers: ['2', '1', '', '', '3', '4'] }
      },
      minor: {
        'Am': { frets: [-1, 0, 2, 2, 1, 0], fingers: ['', '', '2', '3', '1', ''] },
        'Dm': { frets: [-1, -1, 0, 2, 3, 1], fingers: ['', '', '', '2', '3', '1'] },
        'Em': { frets: [0, 2, 2, 0, 0, 0], fingers: ['', '2', '3', '', '', ''] }
      },
      chordFamilies: {
        'A': {
          major: { frets: [-1, 0, 2, 2, 2, 0], fingers: ['', '', '1', '2', '3', ''] },
          maj7_lowered: { frets: [-1, 0, 2, 1, 2, 0], fingers: ['', '', '2', '1', '3', ''], changedFrets: [3], technique: 'Move finger down 1 fret (G# on 1st fret)' },
          maj7_added: { frets: [-1, 0, 2, 2, 2, 4], fingers: ['', '', '1', '2', '3', '4'], changedFrets: [5], technique: 'Add pinky on 4th fret' },
          dom7_lowered: { frets: [-1, 0, 2, 0, 2, 0], fingers: ['', '', '2', '', '3', ''], changedFrets: [3], technique: 'Remove finger' },
          dom7_added: { frets: [-1, 0, 2, 2, 2, 3], fingers: ['', '', '1', '2', '3', '4'], changedFrets: [5], technique: 'Add finger on 3rd fret' }
        },
        'C': {
          major: { frets: [-1, 3, 2, 0, 1, 0], fingers: ['', '3', '2', '', '1', ''] },
          maj7_only: { frets: [-1, 3, 2, 0, 0, 0], fingers: ['', '3', '2', '', '', ''], changedFrets: [4], technique: 'Remove finger (open B = maj7)' },
          dom7_only: { frets: [-1, 3, 2, 3, 1, 0], fingers: ['', '4', '2', '3', '1', ''], changedFrets: [3], technique: 'Add finger on 3rd fret (no open Bb)' }
        },
        'D': {
          major: { frets: [-1, -1, 0, 2, 3, 2], fingers: ['', '', '', '1', '3', '2'] },
          maj7_lowered: { frets: [-1, -1, 0, 2, 2, 2], fingers: ['', '', '', '1', '2', '3'], changedFrets: [4], technique: 'Move finger down 1 fret' },
          dom7_lowered: { frets: [-1, -1, 0, 2, 1, 2], fingers: ['', '', '', '2', '1', '3'], changedFrets: [4], technique: 'Move finger down 2 frets' }
        },
        'E': {
          major: { frets: [0, 2, 2, 1, 0, 0], fingers: ['', '2', '3', '1', '', ''] },
          maj7_only: { frets: [0, 2, 1, 1, 0, 0], fingers: ['', '3', '1', '2', '', ''], changedFrets: [2], technique: 'Lower D string to 1st fret (different fingering)' },
          dom7_lowered: { frets: [0, 2, 0, 1, 0, 0], fingers: ['', '2', '', '1', '', ''], changedFrets: [2], technique: 'Remove finger' },
          dom7_added: { frets: [0, 2, 2, 1, 3, 0], fingers: ['', '2', '3', '1', '4', ''], changedFrets: [4], technique: 'Add pinky on 3rd fret' }
        },
        'G': {
          major: { frets: [3, 2, 0, 0, 0, 3], fingers: ['3', '2', '', '', '', '4'] },
          maj7_lowered: { frets: [3, 2, 0, 0, 0, 2], fingers: ['3', '2', '', '', '', '1'], changedFrets: [5], technique: 'Move finger down 1 fret' },
          dom7_lowered: { frets: [3, 2, 0, 0, 0, 1], fingers: ['3', '2', '', '', '', '1'], changedFrets: [5], technique: 'Move finger down 2 frets' },
          dom7_added: { frets: [3, 2, 3, 0, 0, 3], fingers: ['2', '1', '3', '', '', '4'], changedFrets: [2], technique: 'Add finger on D string 3rd fret' }
        },
        'Am': {
          minor: { frets: [-1, 0, 2, 2, 1, 0], fingers: ['', '', '2', '3', '1', ''] },
          m7_lowered: { frets: [-1, 0, 2, 0, 1, 0], fingers: ['', '', '2', '', '1', ''], changedFrets: [3], technique: 'Remove finger' },
          mmaj7_lowered: { frets: [-1, 0, 2, 1, 1, 0], fingers: ['', '', '3', '1', '2', ''], changedFrets: [3], technique: 'Move finger down 1 fret' },
          m7_added: { frets: [-1, 0, 2, 2, 1, 3], fingers: ['', '', '2', '3', '1', '4'], changedFrets: [5], technique: 'Add pinky on 3rd fret' },
          mmaj7_added: { frets: [-1, 0, 2, 2, 1, 4], fingers: ['', '', '2', '3', '1', '4'], changedFrets: [5], technique: 'Add pinky on 4th fret' }
        },
        'Dm': {
          minor: { frets: [-1, -1, 0, 2, 3, 1], fingers: ['', '', '', '2', '3', '1'] },
          m7_lowered: { frets: [-1, -1, 0, 2, 1, 1], fingers: ['', '', '', '2', '1', '1'], changedFrets: [4], technique: 'Move finger down 2 frets' },
          mmaj7_lowered: { frets: [-1, -1, 0, 2, 2, 1], fingers: ['', '', '', '2', '3', '1'], changedFrets: [4], technique: 'Move finger down 1 fret' }
        },
        'Em': {
          minor: { frets: [0, 2, 2, 0, 0, 0], fingers: ['', '2', '3', '', '', ''] },
          m7_lowered: { frets: [0, 2, 0, 0, 0, 0], fingers: ['', '2', '', '', '', ''], changedFrets: [2], technique: 'Remove finger' },
          mmaj7_lowered: { frets: [0, 2, 1, 0, 0, 0], fingers: ['', '3', '1', '', '', ''], changedFrets: [2], technique: 'Move finger down 1 fret' },
          m7_added: { frets: [0, 2, 2, 0, 3, 0], fingers: ['', '2', '3', '', '4', ''], changedFrets: [4], technique: 'Add finger on 3rd fret' },
          mmaj7_added: { frets: [0, 2, 2, 0, 0, 4], fingers: ['', '2', '3', '', '', '4'], changedFrets: [0], technique: 'Add pinky on 4th fret' }
        }
      },
      seventh: {
        'A7': { frets: [-1, 0, 2, 0, 2, 0], fingers: ['', '', '2', '', '3', ''] },
        'Amaj7': { frets: [-1, 0, 2, 1, 2, 0], fingers: ['', '', '2', '1', '3', ''] },
        'Am7': { frets: [-1, 0, 2, 0, 1, 0], fingers: ['', '', '2', '', '1', ''] },
        'B7': { frets: [-1, 2, 1, 2, 0, 2], fingers: ['', '2', '1', '3', '', '4'] },
        'Bm7': { frets: [-1, 2, 0, 2, 0, 2], fingers: ['', '2', '', '3', '', '4'] },
        'C7': { frets: [-1, 3, 2, 3, 1, 0], fingers: ['', '4', '2', '3', '1', ''] },
        'Cmaj7': { frets: [-1, 3, 2, 0, 0, 0], fingers: ['', '3', '2', '', '', ''] },
        'D7': { frets: [-1, -1, 0, 2, 1, 2], fingers: ['', '', '', '2', '1', '3'] },
        'Dmaj7': { frets: [-1, -1, 0, 2, 2, 2], fingers: ['', '', '', '1', '2', '3'] },
        'Dm7': { frets: [-1, -1, 0, 2, 1, 1], fingers: ['', '', '', '2', '1', '1'] },
        'E7': { frets: [0, 2, 0, 1, 0, 0], fingers: ['', '2', '', '1', '', ''] },
        'Emaj7': { frets: [0, 2, 1, 1, 0, 0], fingers: ['', '3', '1', '2', '', ''] },
        'Em7': { frets: [0, 2, 2, 0, 3, 0], fingers: ['', '2', '3', '', '4', ''] },
        'Fmaj7': { frets: [-1, -1, 3, 2, 1, 0], fingers: ['', '', '3', '2', '1', ''] },
        'G7': { frets: [3, 2, 0, 0, 0, 1], fingers: ['3', '2', '', '', '', '1'] },
        'Gmaj7': { frets: [3, 2, 0, 0, 0, 2], fingers: ['3', '2', '', '', '', '1'] }
      },
      sus: {
        'Asus2': { frets: [-1, 0, 2, 2, 0, 0], fingers: ['', '', '1', '2', '', ''] },
        'Asus4': { frets: [-1, 0, 2, 2, 3, 0], fingers: ['', '', '1', '2', '3', ''] },
        'Csus2': { frets: [-1, 3, 0, 0, 1, 0], fingers: ['', '3', '', '', '1', ''] },
        'Csus4': { frets: [-1, 3, 3, 0, 1, 0], fingers: ['', '2', '3', '', '1', ''] },
        'Cadd9': { frets: [-1, 3, 2, 0, 3, 3], fingers: ['', '2', '1', '', '3', '4'] },
        'Dsus2': { frets: [-1, -1, 0, 2, 3, 0], fingers: ['', '', '', '1', '2', ''] },
        'Dsus4': { frets: [-1, -1, 0, 2, 3, 3], fingers: ['', '', '', '1', '2', '3'] },
        'Esus4': { frets: [0, 2, 2, 2, 0, 0], fingers: ['', '1', '2', '3', '', ''] },
        'Eadd9': { frets: [0, 2, 2, 1, 0, 2], fingers: ['', '2', '3', '1', '', '4'] },
        'Em add9': { frets: [0, 2, 2, 0, 0, 2], fingers: ['', '1', '2', '', '', '3'] },
        'Gsus4': { frets: [3, 3, 0, 0, 1, 3], fingers: ['2', '3', '', '', '1', '4'] },
        'Aadd9': { frets: [-1, 0, 2, 4, 2, 0], fingers: ['', '', '2', '4', '3', ''] },
        'Amadd9': { frets: [-1, 0, 2, 4, 1, 0], fingers: ['', '', '2', '4', '1', ''], technique: 'Stretch to 4th fret for add9 color' }
      },
      slash: {
        'Am/G': { frets: [3, 0, 2, 2, 1, 0], fingers: ['3', '', '2', '4', '1', ''] },
        'C/G': { frets: [3, 3, 2, 0, 1, 0], fingers: ['3', '4', '2', '', '1', ''] },
        'C/B': { frets: [-1, 2, 2, 0, 1, 0], fingers: ['', '2', '3', '', '1', ''] },
        'D/F#': { frets: [2, -1, 0, 2, 3, 2], fingers: ['T', '', '', '1', '3', '2'], technique: 'Use thumb (T) for bass note' },
        'D/A': { frets: [-1, 0, 0, 2, 3, 2], fingers: ['', '', '', '1', '3', '2'] },
        'Dm/A': { frets: [-1, 0, 0, 2, 3, 1], fingers: ['', '', '', '2', '3', '1'] },
        'Fmaj7/C': { frets: [-1, 3, 3, 2, 1, 0], fingers: ['', '3', '4', '2', '1', ''] },
        'Fmaj7/A': { frets: [-1, 0, 3, 2, 1, 0], fingers: ['', '', '3', '2', '1', ''] }
      },
      advanced: {
                diminished7: {
          'Bbdim7/E': { frets: [0, 1, 2, 0, 2, 0], fingers: ['', '1', '3', '', '4', ''], technique: 'Uses fingers 1, 3, and 4', worksWith: 'Works as passing chord in key of E major (moves to the E major chord)' },
          'Ddim7': { frets: [-1, -1, 0, 1, 0, 1], fingers: ['', '', '', '1', '', '2'], worksWith: 'Works in key of C major or Ab major as a passing chord. Note: Ab major key is not available with open chords.' },
          'Ebdim7/A': { frets: [-1, 0, 1, 2, 1, 2], fingers: ['', '', '1', '3', '2', '4'], worksWith: 'Works in key of A major or F# minor as a passing chord. Note: F# minor key is not available with open chords.' },
          'Edim7': { frets: [-1, -1, 2, 3, 2, 3], fingers: ['', '', '1', '2', '1', '3'], worksWith: 'Works in key of F major or Db major as a passing chord. Note: F major and Db major keys are not available with open chords.' }
        },
        halfDiminished: {
          'Bm7b5/E': { frets: [0, 2, 3, 2, 3, -1], fingers: ['', '1', '2', '3', '4', ''], worksWith: 'Works as a rootless and 3rdless E11 chord. Could be used in keys of A or Am. Could also be used as a substitute for an E7 chord in a blues (A, or E blues)' },
          'Bm7b5add11/E': { frets: [0, 2, 3, 2, 3, 0], fingers: ['', '1', '2', '3', '4', ''], worksWith: 'Works as a rootless and 3rdless E11 chord. Could be used in keys of A or Am. Could also be used as a substitute for an E7 chord in a blues (A, or E blues)' },
          'Dm7b5': { frets: [-1, -1, 0, 1, 1, 1], fingers: ['', '', '', '1', '1', '1'], technique: 'Barre 1st finger across G, B, E strings', worksWith: 'Works in key of C minor or Eb major. Note: C minor and Eb major keys are not available with open chords.' },
          'F#m7b5': { frets: [2, 0, 2, 2, 1, 0], fingers: ['2', '', '3', '4', '1', ''], worksWith: 'Works in key of G major or Em' }
        },
        augmented: {
          'Emaj7#5': { frets: [0, 3, 2, 1, 4, 0], fingers: ['', '3', '2', '1', '4', ''], worksWith: 'Works with Db minor key (implies the Db Harmonic minor scale). Note: Db minor key is not available with open chords.' },
          'Daug': { frets: [-1, -1, 0, 3, 2, 2], fingers: ['', '', '', '3', '2', '1'], worksWith: 'Can move to Bm, D major, or G major chords. These are just a few examples of where this chord works well.' }
        },

        extended11th: {
          'Bmadd11': { frets: [-1, 2, 4, 4, 3, 0], fingers: ['', '1', '3', '4', '2', ''], worksWith: 'Works in the key of G Major' },
          'Bmadd11/E': { frets: [0, 2, 4, 4, 3, 0], fingers: ['', '1', '3', '4', '2', ''], worksWith: 'Works in the key of G Major' },
          'Fmaj7add#11': { frets: [1, 3, 3, 2, 0, 0], fingers: ['1', '3', '4', '2', '', ''], technique: 'Open B string creates #11 interval', worksWith: 'Works in C major or it can create an exotic sound with an E major chord (implies the "Phrygian Dominant scale")' },
          'Bbmaj7add#11': { frets: [-1, 1, 3, 2, 3, 0], fingers: ['', '1', '3', '2', '4', ''], technique: 'Complex fingering - practice slowly', worksWith: 'Works in F major. Note: F major key is not available with open chords.' }
        }
      }
    },
    progressions: {
      'A': {
        name: 'A Major',
        simple: [
          { chord: 'A', bars: 1, roman: 'I' },
          { chord: 'D', bars: 1, roman: 'IV' },
          { chord: 'E', bars: 1, roman: 'V' },
          { chord: 'A', bars: 1, roman: 'I' }
        ],
        seventh: [
          { chord: 'Amaj7', bars: 1, roman: 'Imaj7' },
          { chord: 'Dmaj7', bars: 1, roman: 'IVmaj7' },
          { chord: 'E7', bars: 1, roman: 'V7' },
          { chord: 'Amaj7', bars: 1, roman: 'Imaj7' }
        ]
      },
      'Am': {
        name: 'A Minor',
        simple: [
          { chord: 'Am', bars: 1, roman: 'i' },
          { chord: 'Dm', bars: 1, roman: 'iv' },
          { chord: 'E', bars: 1, roman: 'V' },
          { chord: 'Am', bars: 1, roman: 'i' }
        ],
        seventh: [
          { chord: 'Am7', bars: 1, roman: 'im7' },
          { chord: 'Dm7', bars: 1, roman: 'ivm7' },
          { chord: 'E7', bars: 1, roman: 'V7' },
          { chord: 'Am7', bars: 1, roman: 'im7' }
        ]
      },
      'C': {
        name: 'C Major',
        simple: [
          { chord: 'C', bars: 1, roman: 'I' },
          { chord: 'Am', bars: 1, roman: 'vi' },
          { chord: 'Dm', bars: 1, roman: 'ii' },
          { chord: 'G', bars: 1, roman: 'V' }
        ],
        seventh: [
          { chord: 'Cmaj7', bars: 1, roman: 'Imaj7' },
          { chord: 'Am7', bars: 1, roman: 'vim7' },
          { chord: 'Dm7', bars: 1, roman: 'iim7' },
          { chord: 'G7', bars: 1, roman: 'V7' }
        ]
      },
      'D': {
        name: 'D Major',
        simple: [
          { chord: 'D', bars: 1, roman: 'I' },
          { chord: 'G', bars: 1, roman: 'IV' },
          { chord: 'A', bars: 1, roman: 'V' },
          { chord: 'D', bars: 1, roman: 'I' }
        ],
        seventh: [
          { chord: 'Dmaj7', bars: 1, roman: 'Imaj7' },
          { chord: 'Gmaj7', bars: 1, roman: 'IVmaj7' },
          { chord: 'A7', bars: 1, roman: 'V7' },
          { chord: 'Dmaj7', bars: 1, roman: 'Imaj7' }
        ]
      },
      'Dm': {
        name: 'D Minor',
        simple: [
          { chord: 'Dm', bars: 1, roman: 'i' },
          { chord: 'G', bars: 1, roman: 'IV' },
          { chord: 'C', bars: 1, roman: 'VII' },
          { chord: 'Dm', bars: 1, roman: 'i' }
        ],
        seventh: [
          { chord: 'Dm7', bars: 1, roman: 'im7' },
          { chord: 'G7', bars: 1, roman: 'IV7' },
          { chord: 'Cmaj7', bars: 1, roman: 'VIImaj7' },
          { chord: 'Dm7', bars: 1, roman: 'im7' }
        ]
      },
      'E': {
        name: 'E Major',
        simple: [
          { chord: 'E', bars: 1, roman: 'I' },
          { chord: 'A', bars: 1, roman: 'IV' },
          { chord: 'B7', bars: 1, roman: 'V7' },
          { chord: 'E', bars: 1, roman: 'I' }
        ],
        seventh: [
          { chord: 'Emaj7', bars: 1, roman: 'Imaj7' },
          { chord: 'Amaj7', bars: 1, roman: 'IVmaj7' },
          { chord: 'B7', bars: 1, roman: 'V7' },
          { chord: 'Emaj7', bars: 1, roman: 'Imaj7' }
        ]
      },
      'Em': {
        name: 'E Minor',
        simple: [
          { chord: 'Em', bars: 1, roman: 'i' },
          { chord: 'Am', bars: 1, roman: 'iv' },
          { chord: 'C', bars: 1, roman: 'VI' },
          { chord: 'D', bars: 1, roman: 'VII' }
        ],
        seventh: [
          { chord: 'Em7', bars: 1, roman: 'im7' },
          { chord: 'Am7', bars: 1, roman: 'ivm7' },
          { chord: 'Cmaj7', bars: 1, roman: 'VImaj7' },
          { chord: 'D7', bars: 1, roman: 'VII7' }
        ]
      },
      'G': {
        name: 'G Major',
        simple: [
          { chord: 'G', bars: 1, roman: 'I' },
          { chord: 'Em', bars: 1, roman: 'vi' },
          { chord: 'C', bars: 1, roman: 'IV' },
          { chord: 'D', bars: 1, roman: 'V' }
        ],
        seventh: [
          { chord: 'Gmaj7', bars: 1, roman: 'Imaj7' },
          { chord: 'Em7', bars: 1, roman: 'vim7' },
          { chord: 'Cmaj7', bars: 1, roman: 'IVmaj7' },
          { chord: 'D7', bars: 1, roman: 'V7' }
        ]
      }
    },
    blues: {
      'E': {
        name: 'E Blues',
        simple: [
          { chord: 'E', bars: 4, roman: 'I' },
          { chord: 'A', bars: 2, roman: 'IV' },
          { chord: 'E', bars: 2, roman: 'I' },
          { chord: 'B7', bars: 1, roman: 'V7' },
          { chord: 'A', bars: 1, roman: 'IV' },
          { chord: 'E', bars: 2, roman: 'I' }
        ],
        seventh: [
          { chord: 'E7', bars: 4, roman: 'I7' },
          { chord: 'A7', bars: 2, roman: 'IV7' },
          { chord: 'E7', bars: 2, roman: 'I7' },
          { chord: 'B7', bars: 1, roman: 'V7' },
          { chord: 'A7', bars: 1, roman: 'IV7' },
          { chord: 'E7', bars: 2, roman: 'I7' }
        ]
      },
      'A': {
        name: 'A Blues',
        simple: [
          { chord: 'A', bars: 4, roman: 'I' },
          { chord: 'D', bars: 2, roman: 'IV' },
          { chord: 'A', bars: 2, roman: 'I' },
          { chord: 'E7', bars: 1, roman: 'V7' },
          { chord: 'D', bars: 1, roman: 'IV' },
          { chord: 'A', bars: 2, roman: 'I' }
        ],
        seventh: [
          { chord: 'A7', bars: 4, roman: 'I7' },
          { chord: 'D7', bars: 2, roman: 'IV7' },
          { chord: 'A7', bars: 2, roman: 'I7' },
          { chord: 'E7', bars: 1, roman: 'V7' },
          { chord: 'D7', bars: 1, roman: 'IV7' },
          { chord: 'A7', bars: 2, roman: 'I7' }
        ]
      },
      'D': {
        name: 'D Blues',
        simple: [
          { chord: 'D', bars: 4, roman: 'I' },
          { chord: 'G', bars: 2, roman: 'IV' },
          { chord: 'D', bars: 2, roman: 'I' },
          { chord: 'A7', bars: 1, roman: 'V7' },
          { chord: 'G', bars: 1, roman: 'IV' },
          { chord: 'D', bars: 2, roman: 'I' }
        ],
        seventh: [
          { chord: 'D7', bars: 4, roman: 'I7' },
          { chord: 'G7', bars: 2, roman: 'IV7' },
          { chord: 'D7', bars: 2, roman: 'I7' },
          { chord: 'A7', bars: 1, roman: 'V7' },
          { chord: 'G7', bars: 1, roman: 'IV7' },
          { chord: 'D7', bars: 2, roman: 'I7' }
        ]
      },
      'G': {
        name: 'G Blues',
        simple: [
          { chord: 'G', bars: 4, roman: 'I' },
          { chord: 'C', bars: 2, roman: 'IV' },
          { chord: 'G', bars: 2, roman: 'I' },
          { chord: 'D7', bars: 1, roman: 'V7' },
          { chord: 'C', bars: 1, roman: 'IV' },
          { chord: 'G', bars: 2, roman: 'I' }
        ],
        seventh: [
          { chord: 'G7', bars: 4, roman: 'I7' },
          { chord: 'C7', bars: 2, roman: 'IV7' },
          { chord: 'G7', bars: 2, roman: 'I7' },
          { chord: 'D7', bars: 1, roman: 'V7' },
          { chord: 'C7', bars: 1, roman: 'IV7' },
          { chord: 'G7', bars: 2, roman: 'I7' }
        ]
      }
    }
  };

  const stringNames = ['E', 'A', 'D', 'G', 'B', 'E']; // Low E to High E, left to right

  // Blues pattern audio playback function
  const playBluesPattern = async () => {
    if (!guitarEngineRef.current || isBluesPlaying) return;

    try {
      await guitarEngineRef.current.ensureStarted();
      setIsBluesPlaying(true);

      // Clear any existing timeouts
      bluesTimeoutRefs.current.forEach(timeout => clearTimeout(timeout));
      bluesTimeoutRefs.current = [];

      // Blues pattern: triplet-based swing rhythm
      // Each beat is divided into triplets: first two tied, third played
      // Beat 1: down on beat, up on third triplet
      // Beat 2: down on beat, up on third triplet
      // Beat 3: down on beat, up on third triplet  
      // Beat 4: down on beat, up on third triplet
      
      const bpm = 80; // Slower blues tempo
      const beatDuration = (60 / bpm) * 1000; // Duration of one beat in milliseconds
      const tripletDuration = beatDuration / 3; // Duration of one triplet

      // Schedule the pattern for 4 beats
      for (let beat = 0; beat < 4; beat++) {
        const beatStart = beat * beatDuration;
        const downStrokeIndex = beat * 2; // Even indices for down strokes
        const upStrokeIndex = beat * 2 + 1; // Odd indices for up strokes
        
        // Down stroke on beat (1st triplet of each beat)
        const downTimeout = setTimeout(() => {
          guitarEngineRef.current?.playDownstroke();
          setCurrentBluesStroke(downStrokeIndex);
        }, beatStart);
        bluesTimeoutRefs.current.push(downTimeout);

        // Clear down stroke highlight
        const clearDownTimeout = setTimeout(() => {
          setCurrentBluesStroke(-1);
        }, beatStart + 150); // Keep highlight for 150ms
        bluesTimeoutRefs.current.push(clearDownTimeout);

        // Up stroke on 3rd triplet of each beat
        const upTimeout = setTimeout(() => {
          guitarEngineRef.current?.playUpstroke();
          setCurrentBluesStroke(upStrokeIndex);
        }, beatStart + (2 * tripletDuration));
        bluesTimeoutRefs.current.push(upTimeout);

        // Clear up stroke highlight
        const clearUpTimeout = setTimeout(() => {
          setCurrentBluesStroke(-1);
        }, beatStart + (2 * tripletDuration) + 150); // Keep highlight for 150ms
        bluesTimeoutRefs.current.push(clearUpTimeout);
      }

      // Reset playing state after pattern completes
      const resetTimeout = setTimeout(() => {
        setIsBluesPlaying(false);
        setCurrentBluesStroke(-1);
      }, 4 * beatDuration + 100); // Small buffer
      bluesTimeoutRefs.current.push(resetTimeout);

    } catch (error) {
      console.error('Failed to play blues pattern:', error);
      setIsBluesPlaying(false);
      setCurrentBluesStroke(-1); // Clear any highlighting on error
    }
  };

  interface ChordData {
    frets: number[];
    fingers: string[];
    rootString?: number;
    startFret?: number;
    changedFrets?: number[];
    technique?: string;
    worksWith?: string;
  }

  interface ChordDiagramProps {
    chordName: string;
    chordData: ChordData;
    isPowerChord?: boolean;
    showLabels?: boolean;
    showArrow?: boolean | null;
    changeText?: string | null;
    highlightChanges?: number[] | null;
  }

  interface ProgressionChord {
    chord: string;
    bars: number;
    roman: string;
  }

  interface KeyProgression {
    name: string;
    simple: ProgressionChord[];
    seventh: ProgressionChord[];
  }

  const ChordDiagram = ({ chordName, chordData, isPowerChord = false, showLabels = true, showArrow = null, changeText = null, highlightChanges = null }: ChordDiagramProps) => {
    if (!chordData) return null;

    const fretCount = 5; // Standard 5-fret chord diagram
    const startFret = chordData.startFret || 0;
    const actualHighlights = highlightChanges || chordData.changedFrets || [];

    return (
      <div className="flex flex-col items-center bg-white p-4 rounded-lg border border-gray-200 shadow-sm relative">
        {showArrow && (
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <div className="text-2xl text-orange-500">↓</div>
          </div>
        )}
        
        {changeText && (
          <div className="mb-2 text-sm font-medium text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
            {changeText}
          </div>
        )}
        
        <h3 className="text-lg font-bold text-gray-800 mb-2">{chordName}</h3>
        
        {startFret > 0 && (
          <div className="text-xs text-gray-600 mb-2">
            {startFret}fr
          </div>
        )}
        
        <svg width="140" height="140" className="bg-gray-50 rounded">
           {/* Frets */}
           {Array.from({ length: fretCount + 1 }, (_, i) => (
             <line
               key={`fret-${i}`}
               x1="20"
               y1={20 + i * 18}
               x2="120"
               y2={20 + i * 18}
               stroke={i === 0 ? "#1f2937" : "#9ca3af"}
               strokeWidth={i === 0 ? "3" : "1"}
             />
           ))}
           
           {/* Strings */}
           {stringNames.map((_, stringIndex) => (
             <line
               key={`string-${stringIndex}`}
               x1={20 + stringIndex * 20}
               y1="10"
               x2={20 + stringIndex * 20}
               y2={20 + fretCount * 18}
               stroke="#4b5563"
               strokeWidth="1"
             />
           ))}
           
           {/* String labels at bottom */}
           {showLabels && stringNames.map((stringName, index) => (
             <text
               key={`label-${index}`}
               x={20 + index * 20}
               y="130"
               textAnchor="middle"
               className="text-xs font-medium fill-gray-600"
             >
               {stringName}
             </text>
           ))}
          
           {/* Finger positions */}
           {chordData.frets.map((fret, stringIndex) => {
             const finger = chordData.fingers[stringIndex];
             const x = 20 + stringIndex * 20;
             const isHighlighted = actualHighlights.includes(stringIndex);
             
             if (fret === -1) {
               // Muted string (X) - above the nut
               return (
                 <g key={`muted-${stringIndex}`}>
                   <text
                     x={x}
                     y="8"
                     textAnchor="middle"
                     className="text-sm font-bold fill-red-600"
                   >
                     ×
                   </text>
                 </g>
               );
             } else if (fret === 0) {
               // Open string (O) - above the nut
               return (
                 <g key={`open-${stringIndex}`}>
                   <circle
                     cx={x}
                     cy="8"
                     r="3"
                     fill="none"
                     stroke={isHighlighted ? "#f97316" : "#16a34a"}
                     strokeWidth="2"
                   />
                 </g>
               );
             } else {
               // Fretted note - between frets
               const displayFret = startFret > 0 ? fret - startFret + 1 : fret;
               const y = 20 + (displayFret - 0.5) * 18;
               
               return (
                 <g key={`fret-${stringIndex}`}>
                   <circle
                     cx={x}
                     cy={y}
                     r="6"
                     fill={isHighlighted ? "#f97316" : "#1f2937"}
                     stroke={isHighlighted ? "#ea580c" : "#374151"}
                     strokeWidth="2"
                   />
                   {finger && (
                     <text
                       x={x}
                       y={y + 3}
                       textAnchor="middle"
                       className="text-xs font-bold fill-white"
                     >
                       {finger}
                     </text>
                   )}
                 </g>
               );
             }
           })}
          
           {/* Power chord root indicator */}
           {isPowerChord && chordData.rootString && (
             <text
               x={20 + (chordData.rootString - 1) * 20}
               y="122"
               textAnchor="middle"
               className="text-xs font-bold fill-orange-600"
             >
               R
             </text>
           )}
        </svg>
        
        {chordData.technique && (
          <div className="mt-2 text-xs text-gray-600 text-center max-w-32">
            {chordData.technique}
          </div>
        )}
        {chordData.worksWith && (
          <div className="mt-2 text-xs text-amber-700 text-center max-w-40 bg-amber-50 px-2 py-1 rounded border border-amber-200">
            <span className="font-semibold">Works with:</span> {chordData.worksWith}
          </div>
        )}
      </div>
    );
  };

  // New component for rendering chord families with proper educational structure
  const renderChordFamilies = () => {
    return (
      <div>
        {/* Chord Families - Major */}
        <div className="mb-16">
          <h3 className="text-xl font-bold text-gray-800 mb-8 text-center">Major Chord Families</h3>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl mb-8 max-w-6xl mx-auto border border-blue-100 shadow-sm">
            <h4 className="text-xl font-bold text-gray-800 mb-6 text-center">Understanding Chord Variations</h4>
            
            {/* Main explanation */}
            <div className="text-center mb-6">
              <p className="text-gray-700 text-lg mb-4">
                Each chord family shows you different ways to play 7th chords based on the basic major or minor chord shape.
              </p>
            </div>

            {/* Instructions grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white p-4 rounded-lg border border-blue-200">
                <h5 className="font-semibold text-gray-800 mb-3">Finger Instructions:</h5>
                <div className="space-y-2 text-sm text-gray-700">
                  <p><span className="font-medium text-blue-600">"Add finger":</span> Add a new finger while keeping the original chord shape</p>
                  <p><span className="font-medium text-green-600">"Lower finger":</span> Move a finger to a lower fret or lift it off completely</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-blue-200">
                <h5 className="font-semibold text-gray-800 mb-3">Important Notes:</h5>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>All changes start from the basic chord shown above each family</p>
                  <p>For 7th chord diagrams: fingers have been lowered by 2 frets for open strings</p>
                </div>
              </div>
            </div>

            {/* 7th chord theory section */}
            <div className="bg-white p-6 rounded-lg border border-indigo-200">
              <h5 className="font-semibold text-gray-800 mb-4 text-center">About 7th Chords</h5>
              <div className="text-sm text-gray-700 space-y-4">
                
                {/* Major Scale Explanation */}
                <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
                  <h6 className="font-semibold text-gray-800 mb-3">Where does the "7" come from?</h6>
                  <p className="mb-3">
                    The "7" comes from the "major scale" where it's the 7th and last note before that scale repeats. 
                    Guitar chords usually have 2 or sometimes 3 of the root note of the chord. The root note is the note the chord is named after. 
                    Because it's the "root" or starting point and because of how the concept also is derived from scale theory, we label the root note as 1.
                  </p>
                  
                  {/* C Major Scale Diagram */}
                  <div className="bg-white border border-gray-300 p-3 rounded">
                    <h6 className="text-xs font-semibold text-gray-600 mb-3 text-center">C Major Scale in Chromatic Context</h6>
                    <div className="flex justify-center mb-3">
                      <div className="flex gap-1 text-center text-xs">
                        <div className="bg-blue-100 border border-blue-300 px-2 py-1 rounded font-semibold">C<br/>1</div>
                        <div className="bg-gray-100 border border-gray-200 px-2 py-1 rounded text-gray-400">-</div>
                        <div className="bg-blue-100 border border-blue-300 px-2 py-1 rounded font-semibold">D<br/>2</div>
                        <div className="bg-gray-100 border border-gray-200 px-2 py-1 rounded text-gray-400">-</div>
                        <div className="bg-blue-100 border border-blue-300 px-2 py-1 rounded font-semibold">E<br/>3</div>
                        <div className="bg-blue-100 border border-blue-300 px-2 py-1 rounded font-semibold">F<br/>4</div>
                        <div className="bg-gray-100 border border-gray-200 px-2 py-1 rounded text-gray-400">-</div>
                        <div className="bg-blue-100 border border-blue-300 px-2 py-1 rounded font-semibold">G<br/>5</div>
                        <div className="bg-gray-100 border border-gray-200 px-2 py-1 rounded text-gray-400">-</div>
                        <div className="bg-blue-100 border border-blue-300 px-2 py-1 rounded font-semibold">A<br/>6</div>
                        <div className="bg-gray-100 border border-gray-200 px-2 py-1 rounded text-gray-400">-</div>
                        <div className="bg-orange-200 border border-orange-400 px-2 py-1 rounded font-bold">B<br/>7</div>
                        <div className="bg-blue-100 border border-blue-300 px-2 py-1 rounded font-semibold">C<br/>1</div>
                        <div className="bg-gray-100 border border-gray-200 px-2 py-1 rounded text-gray-400">-</div>
                        <div className="bg-blue-100 border border-blue-300 px-2 py-1 rounded font-semibold">D<br/>2</div>
                        <div className="bg-gray-100 border border-gray-200 px-2 py-1 rounded text-gray-400">-</div>
                        <div className="bg-blue-100 border border-blue-300 px-2 py-1 rounded font-semibold">E<br/>3</div>
                        <div className="bg-blue-100 border border-blue-300 px-2 py-1 rounded font-semibold">F<br/>4</div>
                        <div className="bg-gray-100 border border-gray-200 px-2 py-1 rounded text-gray-400">-</div>
                        <div className="bg-blue-100 border border-blue-300 px-2 py-1 rounded font-semibold">G<br/>5</div>
                        <div className="bg-gray-100 border border-gray-200 px-2 py-1 rounded text-gray-400">-</div>
                        <div className="bg-blue-100 border border-blue-300 px-2 py-1 rounded font-semibold">A<br/>6</div>
                        <div className="bg-gray-100 border border-gray-200 px-2 py-1 rounded text-gray-400">-</div>
                        <div className="bg-blue-100 border border-blue-300 px-2 py-1 rounded font-semibold">B<br/>7</div>
                        <div className="text-gray-500 px-2 py-1">...</div>
                      </div>
                    </div>
                                                              <p className="text-xs text-gray-600 text-center">Notice how 7 (B) comes right before 1 (C) repeats, and so on</p>
                   </div>
                   
                   {/* 7 vs b7 Comparison */}
                   <div className="bg-white border border-gray-300 p-3 rounded mt-4">
                     <h6 className="text-xs font-semibold text-gray-600 mb-3 text-center">Major 7 vs Flat 7 (b7) Comparison</h6>
                     <div className="flex justify-center mb-3">
                       <div className="flex gap-1 text-center text-xs">
                         <div className="bg-gray-100 border border-gray-200 px-2 py-1 rounded text-gray-400">-</div>
                         <div className="bg-red-200 border border-red-400 px-2 py-1 rounded font-bold">Bb<br/>b7</div>
                         <div className="bg-orange-200 border border-orange-400 px-2 py-1 rounded font-bold">B<br/>7</div>
                         <div className="bg-blue-100 border border-blue-300 px-2 py-1 rounded font-semibold">C<br/>1</div>
                       </div>
                     </div>
                     <p className="text-xs text-gray-600 text-center">b7 (Bb) is 2 semitones below root • 7 (B) is 1 semitone below root</p>
                   </div>
                 </div>

                <p className="text-center">
                  The note added or lowered is called a "7". There are different types based on how far below the "root" note it is:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                    <p className="font-medium text-green-800">Major 7</p>
                    <p className="text-green-700">1 semitone (fret) below the root</p>
                    <p className="text-xs text-green-600 mt-1">Examples: Amaj7, Cmaj7, Dmaj7</p>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <p className="font-medium text-orange-800">Dominant 7 (Flat 7)</p>
                    <p className="text-orange-700">2 semitones (frets) below the root</p>
                    <p className="text-xs text-orange-600 mt-1">Examples: A7, C7, D7, E7, G7</p>
                  </div>
                </div>
                
                <div className="text-center mt-4 p-3 bg-gray-50 rounded-lg">
                  <p>Minor 7 (m7) chords also have a flat 7. Dominant 7 chords (like A7) also have a flat 7. That's why A7 and Am7 can both use the open G string (moving down 2 from the root).</p>
                  <p className="text-xs text-gray-600 mt-2"><em>Minor 7th chord types are listed separately in the Minor Chord Families section below.</em></p>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-16">
            {Object.entries(chordDatabase.open.chordFamilies)
              .filter(([_, family]) => 'major' in family)
              .map(([rootName, family]) => {
                const majorFamily = family as any; // Type assertion for chord family with major
                return (
                  <div key={rootName} className="border-b border-gray-200 pb-12">
                    <h4 className="text-lg font-semibold text-gray-700 mb-8 text-center">{rootName} Family</h4>
                    
                    {/* Base major chord */}
                    <div className="flex flex-col items-center mb-8">
                      <ChordDiagram chordName={rootName} chordData={majorFamily.major} />
                    </div>
                    
                    {/* 7th chord variations - vertically stacked by type */}
                    <div className="flex justify-center gap-12 max-w-4xl mx-auto">
                      {/* Major 7th variations column */}
                      {(majorFamily.maj7_lowered || majorFamily.maj7_added || majorFamily.maj7_only) && (
                        <div className="flex flex-col items-center space-y-6">
                          <h5 className="text-sm font-medium text-gray-600 mb-2">{rootName}maj7 Variations</h5>
                          {majorFamily.maj7_lowered && (
                            <ChordDiagram 
                              chordName={`${rootName}maj7`} 
                              chordData={majorFamily.maj7_lowered}
                              showArrow={true}
                              changeText="Lower finger"
                              highlightChanges={majorFamily.maj7_lowered?.changedFrets}
                            />
                          )}
                          {majorFamily.maj7_added && (
                            <ChordDiagram 
                              chordName={`${rootName}maj7`} 
                              chordData={majorFamily.maj7_added}
                              changeText="Add finger"
                              highlightChanges={majorFamily.maj7_added?.changedFrets}
                            />
                          )}
                          {majorFamily.maj7_only && (
                            <ChordDiagram 
                              chordName={`${rootName}maj7`} 
                              chordData={majorFamily.maj7_only}
                              showArrow={true}
                              changeText="Lower finger"
                              highlightChanges={majorFamily.maj7_only?.changedFrets}
                            />
                          )}
                        </div>
                      )}

                      {/* Dominant 7th variations column */}
                      {(majorFamily.dom7_lowered || majorFamily.dom7_added || majorFamily.dom7_only) && (
                        <div className="flex flex-col items-center space-y-6">
                          <h5 className="text-sm font-medium text-gray-600 mb-2">{rootName}7 Variations</h5>
                          {majorFamily.dom7_lowered && (
                            <ChordDiagram 
                              chordName={`${rootName}7`} 
                              chordData={majorFamily.dom7_lowered}
                              showArrow={true}
                              changeText="Lower finger"
                              highlightChanges={majorFamily.dom7_lowered.changedFrets}
                            />
                          )}
                          {majorFamily.dom7_added && (
                            <ChordDiagram 
                              chordName={`${rootName}7`} 
                              chordData={majorFamily.dom7_added}
                              changeText="Add finger"
                              highlightChanges={majorFamily.dom7_added.changedFrets}
                            />
                          )}
                          {majorFamily.dom7_only && (
                            <ChordDiagram 
                              chordName={`${rootName}7`} 
                              chordData={majorFamily.dom7_only}
                              showArrow={true}
                              changeText="Add finger"
                              highlightChanges={majorFamily.dom7_only.changedFrets}
                            />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Chord Families - Minor */}
        <div className="mb-16">
          <h3 className="text-xl font-bold text-gray-800 mb-8 text-center">Minor Chord Families</h3>
          <div className="bg-amber-50 p-4 rounded-lg mb-8 max-w-4xl mx-auto">
            <p className="text-sm text-gray-700 text-center">
              <strong>Note about Minor Major 7 chords:</strong> These are shown below to give you the full set of 7th chord types. 
              However, they're not very common in popular music or beginner level songs. They are more often found in jazz or classical music.
            </p>
          </div>
          <div className="space-y-16">
            {Object.entries(chordDatabase.open.chordFamilies)
              .filter(([_, family]) => 'minor' in family)
              .map(([rootName, family]) => {
                const minorFamily = family as any; // Type assertion for chord family with minor
                return (
                  <div key={rootName} className="border-b border-gray-200 pb-12">
                    <h4 className="text-lg font-semibold text-gray-700 mb-8 text-center">{rootName} Family</h4>
                    
                    {/* Base minor chord */}
                    <div className="flex flex-col items-center mb-8">
                      <ChordDiagram chordName={rootName} chordData={minorFamily.minor} />
                    </div>
                    
                    {/* 7th chord variations - vertically stacked by type */}
                    <div className="flex justify-center gap-12 max-w-4xl mx-auto">
                      {/* Minor 7th variations column */}
                      {(minorFamily.m7_lowered || minorFamily.m7_added || minorFamily.m7_only) && (
                        <div className="flex flex-col items-center space-y-6">
                          <h5 className="text-sm font-medium text-gray-600 mb-2">{rootName}7 Variations</h5>
                          {minorFamily.m7_lowered && (
                            <ChordDiagram 
                              chordName={`${rootName}7`} 
                              chordData={minorFamily.m7_lowered}
                              showArrow={true}
                              changeText="Lower finger"
                              highlightChanges={minorFamily.m7_lowered.changedFrets}
                            />
                          )}
                          {minorFamily.m7_added && (
                            <ChordDiagram 
                              chordName={`${rootName}7`} 
                              chordData={minorFamily.m7_added}
                              changeText="Add finger"
                              highlightChanges={minorFamily.m7_added.changedFrets}
                            />
                          )}
                          {minorFamily.m7_only && (
                            <ChordDiagram 
                              chordName={`${rootName}7`} 
                              chordData={minorFamily.m7_only}
                              showArrow={true}
                              changeText="Remove finger"
                              highlightChanges={minorFamily.m7_only.changedFrets}
                            />
                          )}
                        </div>
                      )}

                      {/* Minor major 7th variations column */}
                      {(minorFamily.mmaj7_lowered || minorFamily.mmaj7_added || minorFamily.mmaj7_only) && (
                        <div className="flex flex-col items-center space-y-6">
                          <h5 className="text-sm font-medium text-gray-600 mb-2">{rootName}maj7 Variations</h5>
                          {minorFamily.mmaj7_lowered && (
                            <ChordDiagram 
                              chordName={`${rootName}maj7`} 
                              chordData={minorFamily.mmaj7_lowered}
                              showArrow={true}
                              changeText="Lower finger"
                              highlightChanges={minorFamily.mmaj7_lowered.changedFrets}
                            />
                          )}
                          {minorFamily.mmaj7_added && (
                            <ChordDiagram 
                              chordName={`${rootName}maj7`} 
                              chordData={minorFamily.mmaj7_added}
                              changeText="Add finger"
                              highlightChanges={minorFamily.mmaj7_added.changedFrets}
                            />
                          )}
                          {minorFamily.mmaj7_only && (
                            <ChordDiagram 
                              chordName={`${rootName}maj7`} 
                              chordData={minorFamily.mmaj7_only}
                              showArrow={true}
                              changeText="Lower finger"
                              highlightChanges={minorFamily.mmaj7_only.changedFrets}
                            />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>


      </div>
    );
  };

  const renderChordSection = () => {
    switch (selectedSection) {
      case 'major-minor':
        return (
          <div>
            <div className="text-center mb-8 relative">
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Major & Minor Chords</h2>
                              <p className="text-gray-600 max-w-2xl mx-auto">
                  Master these essential open chords first. They're the foundation of many songs. Open chords use unfretted (open) strings and are typically played in the first few frets, creating a rich, ringing sound that's perfect for beginners.
                </p>
              <div className="absolute top-0 right-0">
                <a 
                  href="/blog/how-to-read-chord-diagrams" 
                  className="text-sm text-blue-600 hover:text-blue-800 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  How to Read Chord Diagrams →
                </a>
              </div>
            </div>
            
            {/* Major and Minor Basic Chords */}
            <div className="mb-16">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">Major Chords</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
                {Object.entries(chordDatabase.open.major).map(([chordName, chordData]) => (
                  <ChordDiagram
                    key={chordName}
                    chordName={chordName}
                    chordData={chordData}
                  />
                ))}
              </div>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">Minor Chords</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {Object.entries(chordDatabase.open.minor).map(([chordName, chordData]) => (
                  <ChordDiagram
                    key={chordName}
                    chordName={chordName}
                    chordData={chordData}
                  />
                ))}
              </div>
            </div>
            
            {/* Major to Minor Comparison Section */}
            <div className="mb-16">
              <h3 className="text-xl font-bold text-gray-800 mb-8 text-center">Major to Minor Transformations</h3>
              <div className="bg-blue-50 p-6 rounded-lg mb-8 max-w-4xl mx-auto">
                <p className="text-sm text-gray-700 text-center">
                  <strong>Understanding the "3rd":</strong> This name may be confusing - don't confuse it with finger numbers or fret numbers. 
                  It's a name that comes from music theory. In music theory we can measure the distance between notes based on a scale. A major "3rd" is the 3rd note of the major scale, whereas a minor 3rd is the 3rd note of the minor scale. You can just think of them as the notes that make a chord major or minor. 
                  On the guitar you'll find that this results in the major and minor chord shapes having one fret position difference. 
                  Notice how the A major chord has a finger on the 2nd fret of the B string compared with the Am chord that has a finger on the 1st fret of that string. 
                  Apart from that, the chords are the same. Major and minor chords have 2/3 of the same notes. These 3 note chords are also referred to as "triads" in music theory.
                </p>
              </div>
              
              <div className="space-y-12">
                {/* A to Am */}
                <div className="flex justify-center items-center gap-8 flex-wrap">
                  <ChordDiagram 
                    chordName="A" 
                    chordData={chordDatabase.open.major.A} 
                  />
                  <div className="text-2xl text-gray-400">→</div>
                                     <ChordDiagram 
                     chordName="Am" 
                     chordData={chordDatabase.open.minor.Am}
                     changeText="Lower 3rd"
                     highlightChanges={[4]}
                   />
                  <div className="text-sm text-gray-600 max-w-xs">
                    <strong>A to Am:</strong> Remove finger from B string (2nd fret) to create 1st fret. The C# (major 3rd) becomes C (minor 3rd).
                  </div>
                </div>
                
                {/* E to Em */}
                <div className="flex justify-center items-center gap-8 flex-wrap">
                  <ChordDiagram 
                    chordName="E" 
                    chordData={chordDatabase.open.major.E} 
                  />
                  <div className="text-2xl text-gray-400">→</div>
                  <ChordDiagram 
                    chordName="Em" 
                    chordData={chordDatabase.open.minor.Em}
                    changeText="Lower 3rd"
                    highlightChanges={[3]}
                  />
                  <div className="text-sm text-gray-600 max-w-xs">
                    <strong>E to Em:</strong> Remove finger from G string (1st fret) to create open G. The G# (major 3rd) becomes G (minor 3rd).
                  </div>
                </div>
                
                {/* D to Dm */}
                <div className="flex justify-center items-center gap-8 flex-wrap">
                  <ChordDiagram 
                    chordName="D" 
                    chordData={chordDatabase.open.major.D} 
                  />
                  <div className="text-2xl text-gray-400">→</div>
                                     <ChordDiagram 
                     chordName="Dm" 
                     chordData={chordDatabase.open.minor.Dm}
                     changeText="Lower 3rd"
                     highlightChanges={[5]}
                   />
                  <div className="text-sm text-gray-600 max-w-xs">
                    <strong>D to Dm:</strong> Move finger on high E string from 2nd fret to 1st fret. The F# (major 3rd) becomes F (minor 3rd).
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">The Sound of Major & Minor Chords</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span><strong>Major chords:</strong> Sound bright, happy, and uplifting - built with root, major 3rd, and 5th</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span><strong>Minor chords:</strong> Sound sad, melancholy, or introspective - built with root, minor 3rd, and 5th</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span><strong>The difference:</strong> Only the 3rd interval changes - lowered by a semitone in minor chords</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span><strong>Musical context:</strong> Major chords often resolve tension, while minor chords create emotional depth</span>
                </li>
              </ul>
            </div>
          </div>
        );
        
      case 'sevenths':
        return (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-3">7th Chords</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                7th chords add sophistication and color to your playing. Learn these essential variations to expand your harmonic palette. For more information on chord construction, refer to <a href="/scale-explorer/index.html" className="text-orange-600 hover:text-orange-700 font-medium" target="_blank" rel="noopener noreferrer">Scale Explorer</a> - scroll down to the chords section and click on "Chord Theory" button.
              </p>
            </div>
            
            {/* All 7th chords in a grid first */}
                         <div className="mb-16">
               <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">All 7th Chords</h3>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                 {Object.entries(chordDatabase.open.seventh).map(([chordName, chordData]) => (
                   <ChordDiagram
                     key={chordName}
                     chordName={chordName}
                     chordData={chordData}
                   />
                 ))}
               </div>
             </div>
            
            {/* Then the chord families educational content */}
            {renderChordFamilies()}
          </div>
        );
        
      case 'sus':
        return (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Sus & Add9 Chords</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Suspended and add9 chords create beautiful color and tension. Sus chords replace the 3rd with either the 2nd or 4th, while add9 chords add the 9th note for extra richness. The 9 is the same as a 2, but it is usually an octave higher. For more information on chord construction, refer to <a href="/scale-explorer/index.html" className="text-orange-600 hover:text-orange-700 font-medium" target="_blank" rel="noopener noreferrer">Scale Explorer</a> - scroll down to the chords section and click on "Chord Theory" button.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
              {Object.entries(chordDatabase.open.sus).map(([chordName, chordData]) => (
                <ChordDiagram
                  key={chordName}
                  chordName={chordName}
                  chordData={chordData}
                />
              ))}
            </div>
            
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Sus & Add9 Chord Tips</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span><strong>Sus2 chords:</strong> Replace the 3rd with the 2nd - creates open, airy sound</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span><strong>Sus4 chords:</strong> Replace the 3rd with the 4th - creates tension that wants to resolve</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span><strong>Add9 chords:</strong> Keep the 3rd and add the 9th (same as 2nd, octave higher) for color</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span><strong>Common progression:</strong> Try C - Csus4 - C for a classic rock sound</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">•</span>
                  <span><strong>Strumming tip:</strong> These chords sound great with gentle, flowing strumming patterns</span>
                </li>
              </ul>
            </div>
          </div>
        );
        
      case 'slash':
        return (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Slash Chords</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Slash chords (or "chords over bass notes") put a different note in the bass than the root. They create smooth bass lines and interesting harmonic color in progressions.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {Object.entries(chordDatabase.open.slash).map(([chordName, chordData]) => (
                <ChordDiagram
                  key={chordName}
                  chordName={chordName}
                  chordData={chordData}
                />
              ))}
            </div>
            
            <div className="bg-indigo-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Slash Chord Tips</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-indigo-600 mr-2">•</span>
                  <span><strong>Bass note movement:</strong> Slash chords create smooth bass lines between chord changes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-600 mr-2">•</span>
                  <span><strong>Common progression:</strong> Try C - Am/G - Dm - G for a beautiful descending bass line</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-600 mr-2">•</span>
                  <span><strong>D/F# tip:</strong> This chord is essential for the key of G major - creates a strong leading tone</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-600 mr-2">•</span>
                  <span><strong>Fingering:</strong> Often easier than full barre chords but creates similar harmonic richness</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-600 mr-2">•</span>
                  <span><strong>Reading notation:</strong> C/G means "C chord with G in the bass"</span>
                </li>
              </ul>
            </div>
          </div>
        );
        
      case 'advanced':
        return (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Advanced Chords</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                These advanced chords add sophisticated color and harmonic complexity to your playing. 
                The challenge isn't just the finger placement - it's knowing when and how to use them effectively in your music.
              </p>
            </div>
            
            {/* Advanced chord type selector */}
            <div className="flex justify-center mb-8">
              <div className="bg-white rounded-lg shadow-md p-1 inline-flex flex-wrap">
                {[
                  { id: 'diminished7', label: 'Diminished 7th' },
                  { id: 'halfDiminished', label: 'Half Diminished' },
                  { id: 'augmented', label: 'Augmented' },
                  { id: 'extended11th', label: '11th Chords' }
                ].map((subTab) => (
                  <button
                    key={subTab.id}
                    onClick={() => setAdvancedSubTab(subTab.id)}
                    className={`px-4 py-2 rounded-md font-medium transition-all duration-200 m-1 text-sm ${
                      advancedSubTab === subTab.id
                        ? 'bg-orange-500 text-white shadow-md'
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                    }`}
                  >
                    {subTab.label}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Advanced chord content */}
            <div className="max-w-6xl mx-auto">
              {(() => {
                const chordType = (chordDatabase.open.advanced as any)[advancedSubTab];
                if (!chordType) return null;
                
                return (
                  <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                      {Object.entries(chordType).map(([chordName, chordData]) => (
                        <ChordDiagram
                          key={chordName}
                          chordName={chordName}
                          chordData={chordData as ChordData}
                        />
                      ))}
                    </div>
                    

                  </div>
                );
              })()}
            </div>
            

          </div>
        );
        
      case 'progressions':
        return (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Chord Progressions in Open Keys</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                These progressions use only open chords and work perfectly with 
                <a href="/blog/guitar-strumming-patterns" className="text-orange-600 hover:text-orange-700 mx-1 font-medium">strumming patterns</a>
                from my strumming guide. Each chord gets one bar (4 beats) in 4/4 time.
              </p>
            </div>
            
            {/* Progression type selector */}
            <div className="flex justify-center mb-6">
              <div className="bg-white rounded-lg shadow-md p-1 inline-flex">
                <button
                  onClick={() => setProgressionType('standard')}
                  className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
                    progressionType === 'standard'
                      ? 'bg-orange-500 text-white'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  Standard Progressions
                </button>
                <button
                  onClick={() => setProgressionType('blues')}
                  className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
                    progressionType === 'blues'
                      ? 'bg-orange-500 text-white'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  12-Bar Blues
                </button>
              </div>
            </div>
            
            {/* Key selector */}
            <div className="flex justify-center mb-8">
              <div className="bg-white rounded-lg shadow-md p-1 inline-flex flex-wrap">
                {progressionType === 'standard' 
                  ? Object.keys(chordDatabase.progressions).map((key) => (
                      <button
                        key={key}
                        onClick={() => setActiveProgressionKey(key)}
                        className={`px-4 py-2 rounded-md font-medium transition-all duration-200 m-1 ${
                          activeProgressionKey === key
                            ? 'bg-orange-500 text-white shadow-md'
                            : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                        }`}
                      >
                        {(chordDatabase.progressions as any)[key].name}
                      </button>
                    ))
                  : ['E', 'A', 'D', 'G'].map((key) => (
                      <button
                        key={key}
                        onClick={() => setActiveBluesKey(key)}
                        className={`px-4 py-2 rounded-md font-medium transition-all duration-200 m-1 ${
                          activeBluesKey === key
                            ? 'bg-orange-500 text-white shadow-md'
                            : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                        }`}
                      >
                        {(chordDatabase.blues as any)[key].name}
                      </button>
                    ))
                }
              </div>
            </div>
            
            {/* Note about chord limitations */}
            <div className={`p-4 rounded-lg mb-6 border ${
              progressionType === 'standard' 
                ? 'bg-yellow-50 border-yellow-200' 
                : 'bg-blue-50 border-blue-200'
            }`}>
              <p className="text-gray-700 text-sm">
                {progressionType === 'standard' ? (
                  <>
                    <strong>Note:</strong> Keys available with open chords are limited to a few. You won't find B major, for example, 
                    as there are no open chord shapes available for the chords it requires.
                  </>
                ) : (
                  <>
                    <strong>12-Bar Blues Structure:</strong> The classic blues follows a specific 12-bar pattern using I-IV-V chords. 
                    Each number represents bars, and the progression repeats every 12 bars.
                  </>
                )}
              </p>
            </div>
            
            {/* Selected key progressions */}
            <div className="max-w-4xl mx-auto">
              {progressionType === 'standard' ? (
                <>
                  <div className="bg-white rounded-lg p-6 shadow-md mb-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                      {(chordDatabase.progressions as any)[activeProgressionKey].name} - Simple Chords
                    </h3>
                    
                    {/* Simple progression */}
                    <div className="grid grid-cols-4 gap-4 mb-6">
                      {(chordDatabase.progressions as any)[activeProgressionKey].simple.map((item: ProgressionChord, index: number) => (
                        <div key={index} className="text-center">
                          <div className="text-sm text-gray-500 mb-1">Bar {index + 1}</div>
                          <div className="text-lg font-bold text-gray-800 mb-1">{item.chord}</div>
                          <div className="text-sm text-orange-600">{item.roman}</div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Chord diagrams for simple */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                      {(chordDatabase.progressions as any)[activeProgressionKey].simple.map((item: ProgressionChord, index: number) => {
                        const chordData = 
                          (chordDatabase.open.major as any)[item.chord] || 
                          (chordDatabase.open.minor as any)[item.chord] ||
                          (chordDatabase.open.seventh as any)[item.chord];
                       
                       return chordData ? (
                         <ChordDiagram
                           key={index}
                           chordName={item.chord}
                           chordData={chordData}
                         />
                       ) : null;
                     })}
                   </div>
                 </div>
                 
                 <div className="bg-white rounded-lg p-6 shadow-md">
                   <h3 className="text-xl font-semibold text-gray-800 mb-4">
                     {(chordDatabase.progressions as any)[activeProgressionKey].name} - 7th Chords
                   </h3>
                   
                   {/* 7th progression */}
                   <div className="grid grid-cols-4 gap-4 mb-6">
                     {(chordDatabase.progressions as any)[activeProgressionKey].seventh.map((item: ProgressionChord, index: number) => (
                       <div key={index} className="text-center">
                         <div className="text-sm text-gray-500 mb-1">Bar {index + 1}</div>
                         <div className="text-lg font-bold text-gray-800 mb-1">{item.chord}</div>
                         <div className="text-sm text-orange-600">{item.roman}</div>
                       </div>
                     ))}
                   </div>
                   
                   {/* Chord diagrams for 7ths */}
                   <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                     {(chordDatabase.progressions as any)[activeProgressionKey].seventh.map((item: ProgressionChord, index: number) => {
                       const chordData = 
                         (chordDatabase.open.major as any)[item.chord] || 
                         (chordDatabase.open.minor as any)[item.chord] ||
                         (chordDatabase.open.seventh as any)[item.chord];
                      
                      return chordData ? (
                        <ChordDiagram
                          key={index}
                          chordName={item.chord}
                          chordData={chordData}
                        />
                      ) : null;
                    })}
                  </div>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-lg mt-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">How to Use These Progressions</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span><strong>One bar per chord:</strong> Each chord gets 4 beats in 4/4 time</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span><strong>Strumming patterns:</strong> Use any pattern from my 
                        <a href="/blog/guitar-strumming-patterns" className="text-orange-600 hover:text-orange-700 mx-1 font-medium">strumming patterns guide</a>
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span><strong>Roman numerals:</strong> Show the chord's function in the key (I = tonic, V = dominant, etc.)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span><strong>7th chords:</strong> Add sophistication and jazz flavor to the same progressions</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span><strong>Practice tip:</strong> Master the simple version first, then try the 7th chords</span>
                    </li>
                  </ul>
                </div>
              </>
              ) : (
                <div className="space-y-8">
                  {/* Simple chords section */}
                  <div className="bg-white rounded-lg p-6 shadow-md">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                      {(chordDatabase.blues as any)[activeBluesKey].name} - Basic Chords
                    </h3>
                    
                    {/* Simple progression bars */}
                    <div className="grid grid-cols-6 gap-2 mb-6">
                      {(chordDatabase.blues as any)[activeBluesKey].simple.map((item: any, index: number) => {
                        const startBar = (chordDatabase.blues as any)[activeBluesKey].simple
                          .slice(0, index)
                          .reduce((sum: number, prev: any) => sum + prev.bars, 0) + 1;
                        const endBar = startBar + item.bars - 1;
                        
                        return (
                          <div 
                            key={index} 
                            className={`text-center p-2 rounded border-2`}
                            style={{ gridColumn: item.bars > 1 ? `span ${Math.min(item.bars, 4)}` : 'span 1' }}
                          >
                            <div className="text-xs text-gray-500 mb-1">
                              Bars {startBar}-{endBar}
                            </div>
                            <div className="text-lg font-bold text-gray-800 mb-1">{item.chord}</div>
                            <div className="text-sm text-blue-600">{item.roman}</div>
                          </div>
                        );
                      })}
                    </div>
                    
                    {/* Chord diagrams for simple */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                      {Array.from(new Set((chordDatabase.blues as any)[activeBluesKey].simple.map((item: any) => item.chord))).map((chordName: any) => {
                        const chordData = (chordDatabase.open.major as any)[chordName] || 
                                         (chordDatabase.open.minor as any)[chordName] || 
                                         (chordDatabase.open.seventh as any)[chordName];
                        return chordData ? (
                          <ChordDiagram
                            key={chordName}
                            chordName={chordName}
                            chordData={chordData}
                          />
                        ) : null;
                      })}
                    </div>
                  </div>
                  
                  {/* 7th chords section */}
                  <div className="bg-white rounded-lg p-6 shadow-md">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                      {(chordDatabase.blues as any)[activeBluesKey].name} - 7th Chords
                    </h3>
                    
                    {/* 7th progression bars */}
                    <div className="grid grid-cols-6 gap-2 mb-6">
                      {(chordDatabase.blues as any)[activeBluesKey].seventh.map((item: any, index: number) => {
                        const startBar = (chordDatabase.blues as any)[activeBluesKey].seventh
                          .slice(0, index)
                          .reduce((sum: number, prev: any) => sum + prev.bars, 0) + 1;
                        const endBar = startBar + item.bars - 1;
                        
                        return (
                          <div 
                            key={index} 
                            className={`text-center p-2 rounded border-2`}
                            style={{ gridColumn: item.bars > 1 ? `span ${Math.min(item.bars, 4)}` : 'span 1' }}
                          >
                            <div className="text-xs text-gray-500 mb-1">
                              Bars {startBar}-{endBar}
                            </div>
                            <div className="text-lg font-bold text-gray-800 mb-1">{item.chord}</div>
                            <div className="text-sm text-blue-600">{item.roman}</div>
                          </div>
                        );
                      })}
                    </div>
                    
                    {/* Chord diagrams for 7th */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                      {Array.from(new Set((chordDatabase.blues as any)[activeBluesKey].seventh.map((item: any) => item.chord))).map((chordName: any) => {
                        const chordData = (chordDatabase.open.seventh as any)[chordName] || 
                                         (chordDatabase.open.major as any)[chordName] || 
                                         (chordDatabase.open.minor as any)[chordName];
                        return chordData ? (
                          <ChordDiagram
                            key={chordName}
                            chordName={chordName}
                            chordData={chordData}
                          />
                        ) : null;
                      })}
                    </div>
                  </div>
                  
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">How to Play 12-Bar Blues</h3>
                    <ul className="space-y-2 text-gray-700 mb-6">
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span><strong>Tempo:</strong> Start slow (60-80 BPM) and gradually increase speed</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span><strong>Practice:</strong> Master the basic version before adding 7th chords</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span><strong>Progression:</strong> The pattern repeats every 12 bars - practice until it feels natural</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span><strong>7th chords:</strong> Add authentic blues flavor and that classic blues sound</span>
                      </li>
                                          </ul>
                      
                    <div className="bg-white p-4 rounded-lg border border-green-200">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                          <h4 className="font-semibold text-gray-800">Blues Strumming Pattern</h4>
                          <button
                            onClick={playBluesPattern}
                            disabled={isBluesPlaying}
                            className="px-3 py-1 text-xs bg-green-100 text-green-800 rounded-md hover:bg-green-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                          >
                            {isBluesPlaying ? (
                              <>
                                <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></span>
                                Playing...
                              </>
                            ) : (
                              <>
                                <span>▶</span>
                                Play
                              </>
                            )}
                          </button>
                        </div>
                        <button
                          onClick={() => setSwingCounting(!swingCounting)}
                          className="px-3 py-1 text-xs bg-orange-100 text-orange-800 rounded-md hover:bg-orange-200 transition-colors"
                        >
                          {swingCounting ? 'Show 1&2&3&4&' : 'Show 1-2-3'}
                        </button>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">
                        {swingCounting 
                          ? 'Count "1-2-3" for every beat. Play down on "1" and up on "3" (skip "2"). This creates a "swung" rhythm where the note between beats is closer to the beat that follows it, not evenly spaced.'
                          : 'Standard eighth note counting: "1 & 2 & 3 & 4 &". Play down strokes on beats (1,2,3,4) and up strokes on the "&" (and) counts.'
                        }
                      </p>
                      
                      {/* Grid Pattern Display */}
                      <div className="bg-gray-50 p-4 rounded-lg border mb-4">
                        <div className="flex items-start justify-center space-x-3">
                          {/* Count label */}
                          <div className="flex flex-col items-center space-y-1">
                            <div className="text-xs font-medium text-gray-600 h-4 flex items-center justify-center">Beat</div>
                            <div className="text-sm font-semibold text-gray-700 min-w-[40px] h-8 flex items-center justify-center">
                              
                            </div>
                            <div className="text-xs text-gray-500 h-4 flex items-center justify-center">Count</div>
                          </div>
                          
                          {swingCounting ? (
                            // Swing counting: 1-2-3 pattern
                            <>
                              {/* Beat 1 */}
                              <div className="flex flex-col items-center space-y-1">
                                <div className="text-xs font-medium text-gray-600 h-4 flex items-center justify-center">1</div>
                                <div className={`${currentBluesStroke === 0 ? 'bg-amber-300 text-amber-900 border-amber-400 shadow-lg transform scale-110' : 'bg-amber-100 text-amber-800 border-amber-200'} border rounded-lg font-bold text-sm min-w-[40px] h-8 flex items-center justify-center transition-all duration-150`}>
                                  D
                                </div>
                                <div className="text-xs text-gray-500 h-4 flex items-center justify-center">1</div>
                              </div>
                              
                              {/* Beat 1 - count 2 (silent) */}
                              <div className="flex flex-col items-center space-y-1">
                                <div className="text-xs font-medium text-gray-600 h-4 flex items-center justify-center"></div>
                                <div className="bg-white border border-gray-300 rounded-lg font-bold text-sm min-w-[40px] h-8 flex items-center justify-center text-gray-400">
                                  -
                                </div>
                                <div className="text-xs text-gray-500 h-4 flex items-center justify-center">2</div>
                              </div>
                              
                              {/* Beat 1 - count 3 */}
                              <div className="flex flex-col items-center space-y-1">
                                <div className="text-xs font-medium text-gray-600 h-4 flex items-center justify-center"></div>
                                <div className={`${currentBluesStroke === 1 ? 'bg-blue-300 text-blue-900 border-blue-400 shadow-lg transform scale-110' : 'bg-blue-100 text-blue-800 border-blue-200'} border rounded-lg font-bold text-sm min-w-[40px] h-8 flex items-center justify-center transition-all duration-150`}>
                                  U
                                </div>
                                <div className="text-xs text-gray-500 h-4 flex items-center justify-center">3</div>
                              </div>
                              
                              {/* Beat 2 */}
                              <div className="flex flex-col items-center space-y-1">
                                <div className="text-xs font-medium text-gray-600 h-4 flex items-center justify-center">2</div>
                                <div className={`${currentBluesStroke === 2 ? 'bg-amber-300 text-amber-900 border-amber-400 shadow-lg transform scale-110' : 'bg-amber-100 text-amber-800 border-amber-200'} border rounded-lg font-bold text-sm min-w-[40px] h-8 flex items-center justify-center transition-all duration-150`}>
                                  D
                                </div>
                                <div className="text-xs text-gray-500 h-4 flex items-center justify-center">1</div>
                              </div>
                              
                              {/* Beat 2 - count 2 (silent) */}
                              <div className="flex flex-col items-center space-y-1">
                                <div className="text-xs font-medium text-gray-600 h-4 flex items-center justify-center"></div>
                                <div className="bg-white border border-gray-300 rounded-lg font-bold text-sm min-w-[40px] h-8 flex items-center justify-center text-gray-400">
                                  -
                                </div>
                                <div className="text-xs text-gray-500 h-4 flex items-center justify-center">2</div>
                              </div>
                              
                              {/* Beat 2 - count 3 */}
                              <div className="flex flex-col items-center space-y-1">
                                <div className="text-xs font-medium text-gray-600 h-4 flex items-center justify-center"></div>
                                <div className={`${currentBluesStroke === 3 ? 'bg-blue-300 text-blue-900 border-blue-400 shadow-lg transform scale-110' : 'bg-blue-100 text-blue-800 border-blue-200'} border rounded-lg font-bold text-sm min-w-[40px] h-8 flex items-center justify-center transition-all duration-150`}>
                                  U
                                </div>
                                <div className="text-xs text-gray-500 h-4 flex items-center justify-center">3</div>
                              </div>
                              
                              {/* Beat 3 */}
                              <div className="flex flex-col items-center space-y-1">
                                <div className="text-xs font-medium text-gray-600 h-4 flex items-center justify-center">3</div>
                                <div className={`${currentBluesStroke === 4 ? 'bg-amber-300 text-amber-900 border-amber-400 shadow-lg transform scale-110' : 'bg-amber-100 text-amber-800 border-amber-200'} border rounded-lg font-bold text-sm min-w-[40px] h-8 flex items-center justify-center transition-all duration-150`}>
                                  D
                                </div>
                                <div className="text-xs text-gray-500 h-4 flex items-center justify-center">1</div>
                              </div>
                              
                              {/* Beat 3 - count 2 (silent) */}
                              <div className="flex flex-col items-center space-y-1">
                                <div className="text-xs font-medium text-gray-600 h-4 flex items-center justify-center"></div>
                                <div className="bg-white border border-gray-300 rounded-lg font-bold text-sm min-w-[40px] h-8 flex items-center justify-center text-gray-400">
                                  -
                                </div>
                                <div className="text-xs text-gray-500 h-4 flex items-center justify-center">2</div>
                              </div>
                              
                              {/* Beat 3 - count 3 */}
                              <div className="flex flex-col items-center space-y-1">
                                <div className="text-xs font-medium text-gray-600 h-4 flex items-center justify-center"></div>
                                <div className={`${currentBluesStroke === 5 ? 'bg-blue-300 text-blue-900 border-blue-400 shadow-lg transform scale-110' : 'bg-blue-100 text-blue-800 border-blue-200'} border rounded-lg font-bold text-sm min-w-[40px] h-8 flex items-center justify-center transition-all duration-150`}>
                                  U
                                </div>
                                <div className="text-xs text-gray-500 h-4 flex items-center justify-center">3</div>
                              </div>
                              
                              {/* Beat 4 */}
                              <div className="flex flex-col items-center space-y-1">
                                <div className="text-xs font-medium text-gray-600 h-4 flex items-center justify-center">4</div>
                                <div className={`${currentBluesStroke === 6 ? 'bg-amber-300 text-amber-900 border-amber-400 shadow-lg transform scale-110' : 'bg-amber-100 text-amber-800 border-amber-200'} border rounded-lg font-bold text-sm min-w-[40px] h-8 flex items-center justify-center transition-all duration-150`}>
                                  D
                                </div>
                                <div className="text-xs text-gray-500 h-4 flex items-center justify-center">1</div>
                              </div>
                              
                              {/* Beat 4 - count 2 (silent) */}
                              <div className="flex flex-col items-center space-y-1">
                                <div className="text-xs font-medium text-gray-600 h-4 flex items-center justify-center"></div>
                                <div className="bg-white border border-gray-300 rounded-lg font-bold text-sm min-w-[40px] h-8 flex items-center justify-center text-gray-400">
                                  -
                                </div>
                                <div className="text-xs text-gray-500 h-4 flex items-center justify-center">2</div>
                              </div>
                              
                              {/* Beat 4 - count 3 */}
                              <div className="flex flex-col items-center space-y-1">
                                <div className="text-xs font-medium text-gray-600 h-4 flex items-center justify-center"></div>
                                <div className={`${currentBluesStroke === 7 ? 'bg-blue-300 text-blue-900 border-blue-400 shadow-lg transform scale-110' : 'bg-blue-100 text-blue-800 border-blue-200'} border rounded-lg font-bold text-sm min-w-[40px] h-8 flex items-center justify-center transition-all duration-150`}>
                                  U
                                </div>
                                <div className="text-xs text-gray-500 h-4 flex items-center justify-center">3</div>
                              </div>
                            </>
                          ) : (
                            // Straight counting: 1 & 2 & 3 & 4 & pattern
                            <>
                              {/* Beat 1 */}
                              <div className="flex flex-col items-center space-y-1">
                                <div className="text-xs font-medium text-gray-600 h-4 flex items-center justify-center">1</div>
                                <div className={`${currentBluesStroke === 0 ? 'bg-amber-300 text-amber-900 border-amber-400 shadow-lg transform scale-110' : 'bg-amber-100 text-amber-800 border-amber-200'} border rounded-lg font-bold text-sm min-w-[40px] h-8 flex items-center justify-center transition-all duration-150`}>
                                  D
                                </div>
                                <div className="text-xs text-gray-500 h-4 flex items-center justify-center">1</div>
                              </div>
                              
                              {/* Beat 1 & */}
                              <div className="flex flex-col items-center space-y-1">
                                <div className="text-xs font-medium text-gray-600 h-4 flex items-center justify-center"></div>
                                <div className={`${currentBluesStroke === 1 ? 'bg-blue-300 text-blue-900 border-blue-400 shadow-lg transform scale-110' : 'bg-blue-100 text-blue-800 border-blue-200'} border rounded-lg font-bold text-sm min-w-[40px] h-8 flex items-center justify-center transition-all duration-150`}>
                                  U
                                </div>
                                <div className="text-xs text-gray-500 h-4 flex items-center justify-center">&</div>
                              </div>
                              
                              {/* Beat 2 */}
                              <div className="flex flex-col items-center space-y-1">
                                <div className="text-xs font-medium text-gray-600 h-4 flex items-center justify-center">2</div>
                                <div className={`${currentBluesStroke === 2 ? 'bg-amber-300 text-amber-900 border-amber-400 shadow-lg transform scale-110' : 'bg-amber-100 text-amber-800 border-amber-200'} border rounded-lg font-bold text-sm min-w-[40px] h-8 flex items-center justify-center transition-all duration-150`}>
                                  D
                                </div>
                                <div className="text-xs text-gray-500 h-4 flex items-center justify-center">2</div>
                              </div>
                              
                              {/* Beat 2 & */}
                              <div className="flex flex-col items-center space-y-1">
                                <div className="text-xs font-medium text-gray-600 h-4 flex items-center justify-center"></div>
                                <div className={`${currentBluesStroke === 3 ? 'bg-blue-300 text-blue-900 border-blue-400 shadow-lg transform scale-110' : 'bg-blue-100 text-blue-800 border-blue-200'} border rounded-lg font-bold text-sm min-w-[40px] h-8 flex items-center justify-center transition-all duration-150`}>
                                  U
                                </div>
                                <div className="text-xs text-gray-500 h-4 flex items-center justify-center">&</div>
                              </div>
                              
                              {/* Beat 3 */}
                              <div className="flex flex-col items-center space-y-1">
                                <div className="text-xs font-medium text-gray-600 h-4 flex items-center justify-center">3</div>
                                <div className={`${currentBluesStroke === 4 ? 'bg-amber-300 text-amber-900 border-amber-400 shadow-lg transform scale-110' : 'bg-amber-100 text-amber-800 border-amber-200'} border rounded-lg font-bold text-sm min-w-[40px] h-8 flex items-center justify-center transition-all duration-150`}>
                                  D
                                </div>
                                <div className="text-xs text-gray-500 h-4 flex items-center justify-center">3</div>
                              </div>
                              
                              {/* Beat 3 & */}
                              <div className="flex flex-col items-center space-y-1">
                                <div className="text-xs font-medium text-gray-600 h-4 flex items-center justify-center"></div>
                                <div className={`${currentBluesStroke === 5 ? 'bg-blue-300 text-blue-900 border-blue-400 shadow-lg transform scale-110' : 'bg-blue-100 text-blue-800 border-blue-200'} border rounded-lg font-bold text-sm min-w-[40px] h-8 flex items-center justify-center transition-all duration-150`}>
                                  U
                                </div>
                                <div className="text-xs text-gray-500 h-4 flex items-center justify-center">&</div>
                              </div>
                              
                              {/* Beat 4 */}
                              <div className="flex flex-col items-center space-y-1">
                                <div className="text-xs font-medium text-gray-600 h-4 flex items-center justify-center">4</div>
                                <div className={`${currentBluesStroke === 6 ? 'bg-amber-300 text-amber-900 border-amber-400 shadow-lg transform scale-110' : 'bg-amber-100 text-amber-800 border-amber-200'} border rounded-lg font-bold text-sm min-w-[40px] h-8 flex items-center justify-center transition-all duration-150`}>
                                  D
                                </div>
                                <div className="text-xs text-gray-500 h-4 flex items-center justify-center">4</div>
                              </div>
                              
                              {/* Beat 4 & */}
                              <div className="flex flex-col items-center space-y-1">
                                <div className="text-xs font-medium text-gray-600 h-4 flex items-center justify-center"></div>
                                <div className={`${currentBluesStroke === 7 ? 'bg-blue-300 text-blue-900 border-blue-400 shadow-lg transform scale-110' : 'bg-blue-100 text-blue-800 border-blue-200'} border rounded-lg font-bold text-sm min-w-[40px] h-8 flex items-center justify-center transition-all duration-150`}>
                                  U
                                </div>
                                <div className="text-xs text-gray-500 h-4 flex items-center justify-center">&</div>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                      
                      {/* Legend */}
                      <div className="flex items-center justify-center gap-6 text-xs mb-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-amber-100 border border-amber-300 rounded"></div>
                          <span className="text-gray-600">Down Stroke</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-blue-100 border border-blue-300 rounded"></div>
                          <span className="text-gray-600">Up Stroke</span>
                        </div>
                        {swingCounting && (
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-white border border-gray-300 rounded"></div>
                            <span className="text-gray-600">Silent Count (no strum)</span>
                          </div>
                        )}
                      </div>
                      
                      <p className="text-xs text-gray-600">
                        {swingCounting 
                          ? <><strong>Swing Feel:</strong> The "3" (up strum) comes closer to the next "1" than to the previous "1", creating the characteristic swing rhythm.</>
                          : <><strong>Alternative Counting:</strong> Can also be counted as 1 & 2 & 3 & 4 & but remember that the "&" (and) counts are "swung" not evenly spaced like regular straight rhythm.</>
                        }
                      </p>
                    </div>
 
                    </div>
                </div>
              )}
            </div>
          </div>
                );
        
      case 'tips':
        return (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Playing Tips & Technique</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Master these fundamental techniques to improve your chord playing and make smoother transitions.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Finger Placement</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Press just behind the fret wire, not on top of it</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Keep your thumb on the back of the neck for support</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Curve your fingers so they don't touch other strings</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">✓</span>
                    <span>Use fingertips, not the pads of your fingers</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-orange-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Chord Transitions</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">→</span>
                    <span>Look for common fingers between chords</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">→</span>
                    <span>Practice the change slowly, then speed up</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">→</span>
                    <span>Move all fingers as a unit when possible</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">→</span>
                    <span>Focus on accuracy over speed initially</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Common Problems</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">×</span>
                    <span><strong>Buzzing:</strong> Press harder and check finger placement</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">×</span>
                    <span><strong>Muted strings:</strong> Arch fingers more to avoid touching other strings</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">×</span>
                    <span><strong>Sore fingertips:</strong> Normal! Take breaks and build calluses gradually</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-600 mr-2">×</span>
                    <span><strong>Hand cramps:</strong> Relax your grip and practice in short sessions</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-purple-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Practice Routine</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">1.</span>
                    <span>Start with one chord shape, get it clean</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">2.</span>
                    <span>Practice chord changes between two chords</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">3.</span>
                    <span>Add strumming patterns once changes are smooth</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">4.</span>
                    <span>Practice with a metronome for timing</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 bg-gradient-to-r from-orange-50 to-yellow-50 p-6 rounded-lg border border-orange-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Remember: Quality Over Speed</h3>
              <p className="text-gray-700">
                It's better to play slowly and cleanly than quickly and sloppy. Every professional guitarist started exactly where you are now. 
                Focus on getting clear, ringing notes from each string, and speed will come naturally with practice.
              </p>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Open Chord Library
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Complete visual guide to essential open guitar chords with finger positions, variations, and playing techniques.
        </p>
      </div>
      
      {/* Navigation */}
      <div className="flex justify-center mb-8">
        <div className="bg-white rounded-lg shadow-md p-1 inline-flex">
          {[
            { id: 'major-minor', label: 'Major & Minor' },
            { id: 'sevenths', label: '7th Chords' },
            { id: 'sus', label: 'Sus & Add9' },
            { id: 'slash', label: 'Slash Chords' },
            { id: 'advanced', label: 'Advanced Chords' },
            { id: 'progressions', label: 'Chord Progressions' },
            { id: 'tips', label: 'Playing Tips' }
          ].map((section) => (
            <button
              key={section.id}
              onClick={() => setSelectedSection(section.id)}
              className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                selectedSection === section.id
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <span>{section.label}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Content */}
      <div className="bg-gray-50 rounded-lg p-8">
        {renderChordSection()}
      </div>
      
      {/* Footer */}
      <div className="mt-8 text-center text-gray-600">
        <p>Need help with your chord technique? <a href="/contact" className="text-orange-600 hover:text-orange-700 font-medium">Book a guitar lesson</a> for personalized guidance.</p>
      </div>
    </div>
  );
};

export default GuitarChordReference; 