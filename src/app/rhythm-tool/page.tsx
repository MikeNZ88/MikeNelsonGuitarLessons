'use client';

import React, { useState, useEffect, useRef } from 'react';
import NotationRenderer from '../../components/rhythm/NotationRenderer';
import { ToneManager } from '../../components/audio/ToneManager';
import { RhythmPattern, RhythmEngine } from '../../utils/audio/rhythmEngine';

interface RhythmExample {
  id: string;
  title: string;
  description: string;
  explanation: string;
  pattern: RhythmPattern;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  bars: number; // 1 or 2 bars
  isPlayable?: boolean; // Add property to control playability
}

const RHYTHM_EXAMPLES: RhythmExample[] = [
  // Time Signatures (Display Only - Not Playable)
  {
    id: 'time-4-4',
    title: '4/4 Time Signature',
    description: 'Four quarter note beats per bar',
    explanation: 'The most common time signature in music. The top number (4) tells us there are 4 beats per bar. The bottom number (4) tells us each beat is a quarter note. Count: 1-2-3-4.',
    pattern: {
      timeSignature: { beats: 4, beatType: 4, label: '4/4' },
      subdivision: { value: 4, name: 'Quarter Notes', unitsPerNote: 12, isTriplet: false },
      totalUnits: 48,
      notes: [
        { startPosition: 0, duration: 12, velocity: 1.0 },   // Beat 1
        { startPosition: 12, duration: 12, velocity: 1.0 },  // Beat 2
        { startPosition: 24, duration: 12, velocity: 1.0 },  // Beat 3
        { startPosition: 36, duration: 12, velocity: 1.0 }   // Beat 4
      ]
    },
    category: 'Time Signatures',
    difficulty: 'beginner',
    bars: 1,
    isPlayable: false
  },
  {
    id: 'time-3-4',
    title: '3/4 Time Signature',
    description: 'Three quarter note beats per bar (waltz time)',
    explanation: 'Common in waltzes and ballads. Three quarter note beats per bar with emphasis typically on beat 1. Count: 1-2-3, 1-2-3. Think of a waltz rhythm.',
    pattern: {
      timeSignature: { beats: 3, beatType: 4, label: '3/4' },
      subdivision: { value: 4, name: 'Quarter Notes', unitsPerNote: 16, isTriplet: false },
      totalUnits: 48,
      notes: [
        { startPosition: 0, duration: 16, velocity: 1.0 },   // Beat 1
        { startPosition: 16, duration: 16, velocity: 1.0 },  // Beat 2
        { startPosition: 32, duration: 16, velocity: 1.0 }   // Beat 3
      ]
    },
    category: 'Time Signatures',
    difficulty: 'beginner',
    bars: 1,
    isPlayable: false
  },
  {
    id: 'time-6-8',
    title: '6/8 Time Signature',
    description: 'Six eighth note beats per bar (compound time)',
    explanation: 'A compound time signature with 6 eighth note beats, typically felt in two groups of three (strong-weak-weak, strong-weak-weak). Common in ballads and folk music. Count: 1-2-3-4-5-6.',
    pattern: {
      timeSignature: { beats: 6, beatType: 8, label: '6/8' },
      subdivision: { value: 8, name: 'Eighth Notes', unitsPerNote: 8, isTriplet: false },
      totalUnits: 48,
      notes: [
        { startPosition: 0, duration: 8, velocity: 1.0 },   // Beat 1 (strong)
        { startPosition: 8, duration: 8, velocity: 1.0 },   // Beat 2
        { startPosition: 16, duration: 8, velocity: 1.0 },  // Beat 3
        { startPosition: 24, duration: 8, velocity: 1.0 },  // Beat 4 (strong)
        { startPosition: 32, duration: 8, velocity: 1.0 },  // Beat 5
        { startPosition: 40, duration: 8, velocity: 1.0 }   // Beat 6
      ]
    },
    category: 'Time Signatures',
    difficulty: 'intermediate',
    bars: 1,
    isPlayable: false
  },
  {
    id: 'time-5-4',
    title: '5/4 Time Signature',
    description: 'Five quarter note beats per bar',
    explanation: 'An unusual time signature with 5 beats per bar. Common in progressive rock and jazz. Often felt as 3+2 or 2+3. Count: 1-2-3-4-5.',
    pattern: {
      timeSignature: { beats: 5, beatType: 4, label: '5/4' },
      subdivision: { value: 4, name: 'Quarter Notes', unitsPerNote: 9.6, isTriplet: false },
      totalUnits: 48,
      notes: [
        { startPosition: 0, duration: 9.6, velocity: 1.0 },    // Beat 1
        { startPosition: 9.6, duration: 9.6, velocity: 1.0 },  // Beat 2
        { startPosition: 19.2, duration: 9.6, velocity: 1.0 }, // Beat 3
        { startPosition: 28.8, duration: 9.6, velocity: 1.0 }, // Beat 4
        { startPosition: 38.4, duration: 9.6, velocity: 1.0 }  // Beat 5
      ]
    },
    category: 'Time Signatures',
    difficulty: 'intermediate',
    bars: 1,
    isPlayable: false
  },
  {
    id: 'time-9-8',
    title: '9/8 Time Signature',
    description: 'Nine eighth note beats per bar (triple compound time)',
    explanation: '9/8 time has 9 eighth note beats per measure, typically felt as three groups of three (strong-weak-weak, strong-weak-weak, strong-weak-weak). Creates a flowing, lilting rhythm. Count: 1-2-3-4-5-6-7-8-9.',
    pattern: {
      timeSignature: { beats: 9, beatType: 8, label: '9/8' },
      subdivision: { value: 8, name: 'Eighth Notes', unitsPerNote: 8, isTriplet: false },
      totalUnits: 72, // 9 eighth notes * 8 units each
      notes: [
        { startPosition: 0, duration: 8, velocity: 1.0 },   // Beat 1 (strong - group 1)
        { startPosition: 8, duration: 8, velocity: 0.7 },   // Beat 2 (weak)
        { startPosition: 16, duration: 8, velocity: 0.7 },  // Beat 3 (weak)
        { startPosition: 24, duration: 8, velocity: 1.0 },  // Beat 4 (strong - group 2)
        { startPosition: 32, duration: 8, velocity: 0.7 },  // Beat 5 (weak)
        { startPosition: 40, duration: 8, velocity: 0.7 },  // Beat 6 (weak)
        { startPosition: 48, duration: 8, velocity: 1.0 },  // Beat 7 (strong - group 3)
        { startPosition: 56, duration: 8, velocity: 0.7 },  // Beat 8 (weak)
        { startPosition: 64, duration: 8, velocity: 0.7 }   // Beat 9 (weak)
      ]
    },
    category: 'Time Signatures',
    difficulty: 'advanced',
    bars: 1,
    isPlayable: false
  },

  // Note Types (Playable)
  {
    id: 'notes-quarter',
    title: 'Quarter Notes',
    description: 'Four quarter notes per bar. Count: 1 2 3 4',
    explanation: 'Quarter notes are the basic beat unit in 4/4 time. Each quarter note gets one beat. Count: 1-2-3-4. This is the foundation for all other subdivisions.',
    pattern: {
      timeSignature: { beats: 4, beatType: 4, label: '4/4' },
      subdivision: { value: 4, name: 'Quarter Notes', unitsPerNote: 12, isTriplet: false },
      totalUnits: 48,
      notes: [
        { startPosition: 0, duration: 12, velocity: 1.0 },   // Beat 1
        { startPosition: 12, duration: 12, velocity: 1.0 },  // Beat 2
        { startPosition: 24, duration: 12, velocity: 1.0 },  // Beat 3
        { startPosition: 36, duration: 12, velocity: 1.0 }   // Beat 4
      ]
    },
    category: 'Note Types',
    difficulty: 'beginner',
    bars: 1,
    isPlayable: true
  },
  {
    id: 'notes-eighth',
    title: 'Eighth Notes',
    description: 'Eight eighth notes per bar. Count: 1 & 2 & 3 & 4 &',
    explanation: 'Eighth notes divide each quarter note beat in half. In 4/4 time, this gives us 8 eighth notes per bar. Count: 1-&-2-&-3-&-4-&. Each "&" represents an eighth note subdivision.',
    pattern: {
      timeSignature: { beats: 4, beatType: 4, label: '4/4' },
      subdivision: { value: 8, name: 'Eighth Notes', unitsPerNote: 6, isTriplet: false },
      totalUnits: 48,
      notes: [
        { startPosition: 0, duration: 6, velocity: 1.0 },
        { startPosition: 6, duration: 6, velocity: 1.0 },
        { startPosition: 12, duration: 6, velocity: 1.0 },
        { startPosition: 18, duration: 6, velocity: 1.0 },
        { startPosition: 24, duration: 6, velocity: 1.0 },
        { startPosition: 30, duration: 6, velocity: 1.0 },
        { startPosition: 36, duration: 6, velocity: 1.0 },
        { startPosition: 42, duration: 6, velocity: 1.0 }
      ]
    },
    category: 'Note Types',
    difficulty: 'beginner',
    bars: 1,
    isPlayable: true
  },
  {
    id: 'notes-sixteenth',
    title: 'Sixteenth Notes',
    description: 'Sixteen sixteenth notes per bar. Count: 1 e & a 2 e & a 3 e & a 4 e & a',
    explanation: 'Sixteenth notes divide each quarter note into four parts. In 4/4 time, this gives us 16 sixteenth notes per bar. Count: 1-e-&-a-2-e-&-a-3-e-&-a-4-e-&-a.',
    pattern: {
      timeSignature: { beats: 4, beatType: 4, label: '4/4' },
      subdivision: { value: 16, name: 'Sixteenth Notes', unitsPerNote: 3, isTriplet: false },
      totalUnits: 48,
      notes: Array.from({ length: 16 }, (_, i) => ({
        startPosition: i * 3,
        duration: 3,
        velocity: 1.0
      }))
    },
    category: 'Note Types',
    difficulty: 'intermediate',
    bars: 1,
    isPlayable: true
  },
  {
    id: 'notes-half',
    title: 'Half Notes',
    description: 'Half notes and quarter notes. Count: 1 (2) 3 4',
    explanation: 'Half notes last for 2 beats each. This pattern combines half notes and quarter notes to show different note durations. The parentheses around (2) indicate that the note is still sustaining from beat 1 - you don\'t play a new note on beat 2.',
    pattern: {
      timeSignature: { beats: 4, beatType: 4, label: '4/4' },
      subdivision: { value: 4, name: 'Quarter Notes', unitsPerNote: 12, isTriplet: false },
      totalUnits: 48,
      notes: [
        { startPosition: 0, duration: 24, velocity: 1.0 },   // Half note (beats 1-2)
        { startPosition: 24, duration: 12, velocity: 1.0 },  // Quarter note (beat 3)
        { startPosition: 36, duration: 12, velocity: 1.0 }   // Quarter note (beat 4)
      ]
    },
    category: 'Note Types',
    difficulty: 'beginner',
    bars: 1,
    isPlayable: true
  },
  {
    id: 'notes-whole',
    title: 'Whole Note',
    description: 'Whole note spanning entire bar. Count: 1 (2) (3) (4)',
    explanation: 'A whole note lasts for 4 beats in 4/4 time - the entire bar. This is the longest standard note value. The parentheses around (2), (3), and (4) show that the note continues sustaining from beat 1 through the entire measure.',
    pattern: {
      timeSignature: { beats: 4, beatType: 4, label: '4/4' },
      subdivision: { value: 4, name: 'Quarter Notes', unitsPerNote: 12, isTriplet: false },
      totalUnits: 48,
      notes: [
        { startPosition: 0, duration: 48, velocity: 1.0 }   // Whole note (entire bar)
      ]
    },
    category: 'Note Types',
    difficulty: 'beginner',
    bars: 1,
    isPlayable: true
  },
  {
    id: 'notes-triplets',
    title: 'Eighth Note Triplets',
    description: 'Triplet subdivision of quarter notes. Count: 1-trip-let 2-trip-let 3-trip-let 4-trip-let',
    explanation: 'Triplets divide each quarter note into 3 equal parts instead of 2. Count: 1-trip-let-2-trip-let-3-trip-let-4-trip-let. Creates a rolling, flowing rhythm.',
    pattern: {
      timeSignature: { beats: 4, beatType: 4, label: '4/4' },
      subdivision: { value: 8, name: 'Eighth Note Triplets', unitsPerNote: 4, isTriplet: true },
      totalUnits: 48,
      notes: [
        // Beat 1 triplet
        { startPosition: 0, duration: 4, velocity: 1.0 },
        { startPosition: 4, duration: 4, velocity: 1.0 },
        { startPosition: 8, duration: 4, velocity: 1.0 },
        // Beat 2 triplet
        { startPosition: 12, duration: 4, velocity: 1.0 },
        { startPosition: 16, duration: 4, velocity: 1.0 },
        { startPosition: 20, duration: 4, velocity: 1.0 },
        // Beat 3 triplet
        { startPosition: 24, duration: 4, velocity: 1.0 },
        { startPosition: 28, duration: 4, velocity: 1.0 },
        { startPosition: 32, duration: 4, velocity: 1.0 },
        // Beat 4 triplet
        { startPosition: 36, duration: 4, velocity: 1.0 },
        { startPosition: 40, duration: 4, velocity: 1.0 },
        { startPosition: 44, duration: 4, velocity: 1.0 }
      ]
    },
    category: 'Note Types',
    difficulty: 'intermediate',
    bars: 1,
    isPlayable: true
  },
  {
    id: 'notes-sixteenth-triplets',
    title: 'Sixteenth Note Triplets',
    description: 'Triplet subdivision of eighth notes. Count: 1-trip-let-&-trip-let 2-trip-let-&-trip-let 3-trip-let-&-trip-let 4-trip-let-&-trip-let',
    explanation: 'Sixteenth note triplets divide each eighth note into 3 equal parts. This creates a very fast, flowing subdivision. Count: 1-trip-let-&-trip-let-2-trip-let-&-trip-let. Much faster than eighth note triplets.',
    pattern: {
      timeSignature: { beats: 4, beatType: 4, label: '4/4' },
      subdivision: { value: 16, name: 'Sixteenth Triplets', unitsPerNote: 2, isTriplet: true },
      totalUnits: 48,
      notes: [
        // Beat 1 - two groups of triplets (one for each eighth note)
        { startPosition: 0, duration: 2, velocity: 1.0 },
        { startPosition: 2, duration: 2, velocity: 1.0 },
        { startPosition: 4, duration: 2, velocity: 1.0 },
        { startPosition: 6, duration: 2, velocity: 1.0 },
        { startPosition: 8, duration: 2, velocity: 1.0 },
        { startPosition: 10, duration: 2, velocity: 1.0 },
        // Beat 2 - two groups of triplets
        { startPosition: 12, duration: 2, velocity: 1.0 },
        { startPosition: 14, duration: 2, velocity: 1.0 },
        { startPosition: 16, duration: 2, velocity: 1.0 },
        { startPosition: 18, duration: 2, velocity: 1.0 },
        { startPosition: 20, duration: 2, velocity: 1.0 },
        { startPosition: 22, duration: 2, velocity: 1.0 },
        // Beat 3 - two groups of triplets
        { startPosition: 24, duration: 2, velocity: 1.0 },
        { startPosition: 26, duration: 2, velocity: 1.0 },
        { startPosition: 28, duration: 2, velocity: 1.0 },
        { startPosition: 30, duration: 2, velocity: 1.0 },
        { startPosition: 32, duration: 2, velocity: 1.0 },
        { startPosition: 34, duration: 2, velocity: 1.0 },
        // Beat 4 - two groups of triplets
        { startPosition: 36, duration: 2, velocity: 1.0 },
        { startPosition: 38, duration: 2, velocity: 1.0 },
        { startPosition: 40, duration: 2, velocity: 1.0 },
        { startPosition: 42, duration: 2, velocity: 1.0 },
        { startPosition: 44, duration: 2, velocity: 1.0 },
        { startPosition: 46, duration: 2, velocity: 1.0 }
      ]
    },
    category: 'Note Types',
    difficulty: 'advanced',
    bars: 1,
    isPlayable: true
  },

  // Rhythm Patterns (Playable)
  {
    id: 'rhythm-quarter-eighth',
    title: 'Quarter + Eighth',
    description: 'Quarter notes on beats 1, 3, and 4, with two eighth notes on beat 2. Count: 1 2 & 3 4',
    explanation: 'Quarter notes on beats 1, 3, and 4, with two eighth notes on beat 2. Creates a simple mixed rhythm pattern.',
    pattern: {
      timeSignature: { beats: 4, beatType: 4, label: '4/4' },
      subdivision: { value: 8, name: 'Eighth Notes', unitsPerNote: 6, isTriplet: false },
      totalUnits: 48,
      notes: [
        { startPosition: 0, duration: 12, velocity: 1.0 },   // Quarter note (beat 1)
        { startPosition: 12, duration: 6, velocity: 1.0 },   // Eighth note
        { startPosition: 18, duration: 6, velocity: 1.0 },   // Eighth note
        { startPosition: 24, duration: 12, velocity: 1.0 },  // Quarter note (beat 3)
        { startPosition: 36, duration: 12, velocity: 1.0 }   // Quarter note (beat 4)
      ]
    },
    category: 'Rhythm Patterns',
    difficulty: 'beginner',
    bars: 1,
    isPlayable: true
  },

  {
    id: 'rhythm-quarter-triplet',
    title: 'Quarter + Eighth Triplet',
    description: 'Quarter note with eighth note triplet. Count: 1 2-trip-let 3 4',
    explanation: 'Quarter note on beat 1, three eighth note triplets on beat 2, then quarter notes on beats 3 and 4. Mixes straight and triplet feels.',
    pattern: {
      timeSignature: { beats: 4, beatType: 4, label: '4/4' },
      subdivision: { value: 8, name: 'Mixed', unitsPerNote: 4, isTriplet: false },
      totalUnits: 48,
      notes: [
        { startPosition: 0, duration: 12, velocity: 1.0 },   // Quarter note (beat 1)
        // Triplet on beat 2
        { startPosition: 12, duration: 4, velocity: 1.0 },
        { startPosition: 16, duration: 4, velocity: 1.0 },
        { startPosition: 20, duration: 4, velocity: 1.0 },
        { startPosition: 24, duration: 12, velocity: 1.0 },  // Quarter note (beat 3)
        { startPosition: 36, duration: 12, velocity: 1.0 }   // Quarter note (beat 4)
      ]
    },
    category: 'Rhythm Patterns',
    difficulty: 'intermediate',
    bars: 1,
    isPlayable: true
  },
  {
    id: 'rhythm-quarter-sixteenth',
    title: 'Quarter + Sixteenth Note Rhythm',
    description: 'Quarter notes with sixteenth note patterns. Count: 1 2 e & a 3 4',
    explanation: 'Quarter note on beat 1, four sixteenth notes on beat 2, then quarter notes on beats 3 and 4. Contrasts sustained and subdivided beats.',
    pattern: {
      timeSignature: { beats: 4, beatType: 4, label: '4/4' },
      subdivision: { value: 16, name: 'Sixteenth Notes', unitsPerNote: 3, isTriplet: false },
      totalUnits: 48,
      notes: [
        { startPosition: 0, duration: 12, velocity: 1.0 },   // Quarter note (beat 1)
        { startPosition: 12, duration: 3, velocity: 1.0 },   // Sixteenth note
        { startPosition: 15, duration: 3, velocity: 1.0 },   // Sixteenth note
        { startPosition: 18, duration: 3, velocity: 1.0 },   // Sixteenth note
        { startPosition: 21, duration: 3, velocity: 1.0 },   // Sixteenth note
        { startPosition: 24, duration: 12, velocity: 1.0 },  // Quarter note (beat 3)
        { startPosition: 36, duration: 12, velocity: 1.0 }   // Quarter note (beat 4)
      ]
    },
    category: 'Rhythm Patterns',
    difficulty: 'intermediate',
    bars: 1,
    isPlayable: true
  },
  {
    id: 'rhythm-mixed-complex',
    title: 'Quarter + Eighth + Sixteenth Mix',
    description: 'Mix of quarter, eighth, and sixteenth notes. Count: 1 2 & e a 3 & 4',
    explanation: 'Quarter note on beat 1, then eighth and two sixteenths on beat 2, two eighths on beat 3, quarter note on beat 4. Proper beat grouping for clear notation.',
    pattern: {
      timeSignature: { beats: 4, beatType: 4, label: '4/4' },
      subdivision: { value: 16, name: 'Mixed Notes', unitsPerNote: 3, isTriplet: false },
      totalUnits: 48,
      notes: [
        // Beat 1: Quarter note
        { startPosition: 0, duration: 12, velocity: 1.0 },   // Quarter note (beat 1)
        
        // Beat 2: Eighth + two sixteenths (properly grouped)
        { startPosition: 12, duration: 6, velocity: 1.0 },   // Eighth note (start of beat 2)
        { startPosition: 18, duration: 3, velocity: 1.0 },   // Sixteenth note
        { startPosition: 21, duration: 3, velocity: 1.0 },   // Sixteenth note
        
        // Beat 3: Two eighth notes (properly beamed)
        { startPosition: 24, duration: 6, velocity: 1.0 },   // Eighth note (beat 3)
        { startPosition: 30, duration: 6, velocity: 1.0 },   // Eighth note
        
        // Beat 4: Quarter note
        { startPosition: 36, duration: 12, velocity: 1.0 }   // Quarter note (beat 4)
      ]
    },
    category: 'Rhythm Patterns',
    difficulty: 'advanced',
    bars: 1,
    isPlayable: true
  },
  {
    id: 'rhythm-sixteenth-triplets-quarter',
    title: 'Sixteenth Triplets + Quarter',
    description: '6 sixteenth triplets followed by quarter note, repeated. Count: 1-trip-let-&-trip-let 2 3-trip-let-&-trip-let 4',
    explanation: 'Six sixteenth note triplets followed by a quarter note, pattern repeats twice per measure. Creates contrast between fast triplets and sustained notes.',
    pattern: {
      timeSignature: { beats: 4, beatType: 4, label: '4/4' },
      subdivision: { value: 16, name: 'Sixteenth Triplets', unitsPerNote: 2, isTriplet: true },
      totalUnits: 48,
      notes: [
        // First half: 6 sixteenth note triplets (2 beats worth)
        { startPosition: 0, duration: 2, velocity: 1.0 },   // 1st triplet
        { startPosition: 2, duration: 2, velocity: 1.0 },   // 2nd triplet
        { startPosition: 4, duration: 2, velocity: 1.0 },   // 3rd triplet
        { startPosition: 6, duration: 2, velocity: 1.0 },   // 4th triplet
        { startPosition: 8, duration: 2, velocity: 1.0 },   // 5th triplet
        { startPosition: 10, duration: 2, velocity: 1.0 },  // 6th triplet
        // Quarter note for contrast
        { startPosition: 12, duration: 12, velocity: 1.0 }, // Quarter note (beat 2)
        
        // Second half: repeat the pattern
        { startPosition: 24, duration: 2, velocity: 1.0 },  // 1st triplet
        { startPosition: 26, duration: 2, velocity: 1.0 },  // 2nd triplet
        { startPosition: 28, duration: 2, velocity: 1.0 },  // 3rd triplet
        { startPosition: 30, duration: 2, velocity: 1.0 },  // 4th triplet
        { startPosition: 32, duration: 2, velocity: 1.0 },  // 5th triplet
        { startPosition: 34, duration: 2, velocity: 1.0 },  // 6th triplet
        // Quarter note for contrast
        { startPosition: 36, duration: 12, velocity: 1.0 }  // Quarter note (beat 4)
      ]
    },
    category: 'Rhythm Patterns',
    difficulty: 'advanced',
    bars: 1,
    isPlayable: true
  }
];

export default function RhythmTool() {
  const [selectedExample, setSelectedExample] = useState<RhythmExample>(RHYTHM_EXAMPLES[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [tempo, setTempo] = useState(90);
  const [isLooping, setIsLooping] = useState(false);
  const [showEducationalModal, setShowEducationalModal] = useState(false);
  const toneManagerRef = useRef<ToneManager | null>(null);

  // Helper function to determine if time signature is simple or complex
  const isSimpleTimeSignature = (timeSignature: string) => {
    return ['4/4', '3/4', '6/8'].includes(timeSignature);
  };

  useEffect(() => {
    const manager = new ToneManager();
    toneManagerRef.current = manager;
    
    return () => {
      manager.dispose();
    };
  }, []);

  useEffect(() => {
    if (toneManagerRef.current) {
      toneManagerRef.current.setLooping(isLooping);
    }
  }, [toneManagerRef, isLooping]);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && showEducationalModal) {
        setShowEducationalModal(false);
      }
    };

    if (showEducationalModal) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [showEducationalModal]);

  const handlePlay = async () => {
    if (!toneManagerRef.current) return;
    
    if (isPlaying) {
      toneManagerRef.current.stop();
      setIsPlaying(false);
    } else {
      await toneManagerRef.current.initialize();
      toneManagerRef.current.updatePattern(selectedExample.pattern);
      toneManagerRef.current.setBPM(tempo);
      toneManagerRef.current.setLooping(isLooping);
      toneManagerRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleStop = () => {
    if (toneManagerRef.current) {
      toneManagerRef.current.stop();
      setIsPlaying(false);
    }
  };

  const handleExampleChange = (example: RhythmExample) => {
    if (isPlaying) {
      handleStop();
    }
    setSelectedExample(example);
  };

  const categories = Array.from(new Set(RHYTHM_EXAMPLES.map(ex => ex.category)));

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Rhythm Education Tool
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
              Learn rhythm fundamentals through interactive examples. Click any example below to view its musical notation and play it back.
            </p>
            {/* Prominent Learn Button */}
            <button
              onClick={() => setShowEducationalModal(true)}
              className="px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold text-lg rounded-lg shadow-lg hover:from-amber-700 hover:to-orange-700 transition-all duration-200 border border-amber-700 mb-4"
            >
              CLICK HERE FOR GUIDE
            </button>
          </div>

          {/* Example Menu */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            {categories.map(category => {
              const examples = RHYTHM_EXAMPLES.filter(ex => ex.category === category);
              return (
                <div key={category} className="mb-4 last:mb-0">
                  <div className="flex justify-between items-center mb-2 border-b border-gray-200 pb-1">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {category}
                    </h3>
                    {/* Legend - only show on Time Signatures row */}
                    {category === 'Time Signatures' && (
                      <div className="bg-gray-50 rounded-lg p-2 border border-gray-200">
                        <h4 className="text-xs font-semibold text-gray-800 mb-1">Legend</h4>
                        <div className="flex gap-3">
                          <div className="flex items-center gap-1">
                            <div className="w-3 h-3 bg-amber-100 border border-amber-300 rounded"></div>
                            <span className="text-xs text-gray-600">Simple</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <div className="w-3 h-3 bg-purple-100 border border-purple-300 rounded"></div>
                            <span className="text-xs text-gray-600">Complex</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2">
                    {examples.map(example => (
                      <button
                        key={example.id}
                        onClick={() => handleExampleChange(example)}
                        className={`text-left p-2 rounded-lg transition-all duration-200 text-sm ${
                          selectedExample.id === example.id
                            ? isSimpleTimeSignature(example.pattern.timeSignature.label)
                              ? 'bg-amber-100 border-2 border-amber-500 shadow-md'     // Simple selected
                              : 'bg-purple-100 border-2 border-purple-500 shadow-md'  // Complex selected
                            : isSimpleTimeSignature(example.pattern.timeSignature.label)
                              ? 'bg-amber-50 hover:bg-amber-100 border-2 border-amber-200 hover:border-amber-300 hover:shadow-sm'  // Simple unselected
                              : 'bg-purple-50 hover:bg-purple-100 border-2 border-purple-200 hover:border-purple-300 hover:shadow-sm'  // Complex unselected
                        }`}
                      >
                        <div className="font-medium text-gray-900 mb-1">
                          {!isSimpleTimeSignature(example.pattern.timeSignature.label) && example.category !== 'Time Signatures' && (
                            <span className="inline-block px-1.5 py-0.5 bg-purple-200 text-purple-800 text-xs font-bold rounded mr-1">
                              {example.pattern.timeSignature.label}
                            </span>
                          )}
                          {example.title}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Example Display */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <div className="mb-4">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  {selectedExample.title}
                </h2>
                <p className="text-gray-600">
                  {selectedExample.explanation}
                </p>
              </div>

              <div className="flex justify-center mb-4">
                <NotationRenderer 
                  pattern={selectedExample.pattern} 
                  width={Math.max(500, selectedExample.pattern.subdivision.value === 16 ? 500 : 400)}
                />
              </div>

              {/* Counting Display */}
              {selectedExample.description && (
                <div className="text-center mb-6">
                  <div className="inline-block bg-amber-50 border-2 border-amber-200 rounded-lg px-4 py-2">
                    <p className="text-amber-800 font-mono text-lg font-semibold">
                      {selectedExample.description.includes('Count: ') 
                        ? selectedExample.description.split('Count: ')[1]
                        : selectedExample.description
                      }
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Transport Controls */}
            {selectedExample.isPlayable !== false ? (
              <div className="flex items-center justify-center gap-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-200">
                <div className="flex items-center gap-3">
                  <label className="text-sm font-medium text-amber-800">Tempo:</label>
                  <input
                    type="range"
                    min="60"
                    max="180"
                    value={tempo}
                    onChange={(e) => setTempo(Number(e.target.value))}
                    className="w-24 h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer slider-thumb"
                    style={{
                      background: `linear-gradient(to right, #d97706 0%, #d97706 ${((tempo - 60) / (180 - 60)) * 100}%, #fbbf24 ${((tempo - 60) / (180 - 60)) * 100}%, #fbbf24 100%)`
                    }}
                  />
                  <span className="text-sm font-bold text-amber-900 w-16 text-center">{tempo} BPM</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="loop"
                    checked={isLooping}
                    onChange={(e) => setIsLooping(e.target.checked)}
                    className="w-4 h-4 text-amber-600 bg-amber-100 border-amber-300 rounded focus:ring-amber-500 focus:ring-2"
                  />
                  <label htmlFor="loop" className="text-sm font-medium text-amber-800">Loop</label>
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={handlePlay}
                    className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 shadow-lg ${
                      isPlaying
                        ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-red-300'
                        : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-amber-300'
                    }`}
                  >
                    {isPlaying ? (
                      <>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        Pause
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                        Play
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={handleStop}
                    className="px-6 py-3 bg-gradient-to-r from-amber-700 to-orange-700 hover:from-amber-800 hover:to-orange-800 text-white rounded-lg font-medium transition-all duration-200 shadow-lg shadow-amber-400 flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
                    </svg>
                    Stop
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 text-center">
                <p className="text-gray-600 italic">
                  Time signatures are for visual reference only. Select a Note Type or Rhythm Pattern to hear audio playback.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Educational Modal */}
        {showEducationalModal && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowEducationalModal(false)}
          >
            <div 
              className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-3xl font-bold text-gray-900">Learn About Rhythm</h2>
                  <button
                    onClick={() => setShowEducationalModal(false)}
                    className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                  >
                    ×
                  </button>
                </div>

                <div className="space-y-8">
                  {/* Tool Purpose Section */}
                  <section className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                    <h3 className="text-2xl font-semibold text-amber-800 mb-4 border-b border-amber-200 pb-2">
                      About This Tool
                    </h3>
                    <div className="bg-amber-100 p-4 rounded-lg border border-amber-300">
                      <p className="text-amber-900 font-medium mb-3">
                        <strong>Important:</strong> These days a lot of guitarists just use online guitar tab software to understand the rhythm of a song. Understanding standard notation for rhythm at least (you can rely on the tablature for note positions) is important. It will help you to understand music from a rhythmic perspective. Having a sense of rhythm and understanding rhythm aren't always the same thing, and our intuition can only take us so far.
                      </p>
                      <p className="text-amber-800 mb-3">
                        This tool provides basic examples to help you become familiar with rhythmic notation and fundamental concepts. It doesn't cover everything in rhythm - there's much more to explore as you progress!
                      </p>
                      <p className="text-amber-800">
                        <strong>Audio Features:</strong> Each example is tuned to the same note as the open B string of your guitar. While all examples use the B string note, you can apply these rhythm patterns to any string on your guitar. You can slow down or speed up the examples, and loop them. See if you can play along!
                      </p>
                    </div>
                  </section>

                  {/* Time Signatures Section */}
                  <section>
                    <h3 className="text-2xl font-semibold text-amber-800 mb-4 border-b border-amber-200 pb-2">
                      Time Signatures
                    </h3>
                    <p className="text-gray-700 mb-4">
                      Time signatures tell us how to count time in music. They appear at the beginning of a piece as two numbers stacked on top of each other.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-amber-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-amber-900 mb-2">4/4 Time (Common Time)</h4>
                        <p className="text-gray-700 text-sm mb-2">
                          • Top number (4): 4 beats per measure<br/>
                          • Bottom number (4): Quarter note gets the beat<br/>
                          • Count: 1, 2, 3, 4<br/>
                          • Most common in popular music
                        </p>
                      </div>
                      
                      <div className="bg-amber-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-amber-900 mb-2">3/4 Time (Waltz Time)</h4>
                        <p className="text-gray-700 text-sm mb-2">
                          • Top number (3): 3 beats per measure<br/>
                          • Bottom number (4): Quarter note gets the beat<br/>
                          • Count: 1, 2, 3<br/>
                          • Common in waltzes and ballads
                        </p>
                      </div>
                      
                      <div className="bg-amber-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-amber-900 mb-2">6/8 Time (Compound Time)</h4>
                        <p className="text-gray-700 text-sm mb-2">
                          • Top number (6): 6 eighth notes per measure<br/>
                          • Bottom number (8): Eighth note gets the beat<br/>
                          • Count: 1-2-3-4-5-6 or 1-trip-let-2-trip-let<br/>
                          • Feels like two groups of three
                        </p>
                      </div>
                      
                      <div className="bg-amber-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-amber-900 mb-2">5/4 Time (Odd Time)</h4>
                        <p className="text-gray-700 text-sm mb-2">
                          • Top number (5): 5 beats per measure<br/>
                          • Bottom number (4): Quarter note gets the beat<br/>
                          • Count: 1, 2, 3, 4, 5<br/>
                          • Creates an uneven, interesting feel
                        </p>
                      </div>
                      
                      <div className="bg-amber-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-amber-900 mb-2">7/8 Time (Irregular Time)</h4>
                        <p className="text-gray-700 text-sm mb-2">
                          • Top number (7): 7 eighth notes per measure<br/>
                          • Bottom number (8): Eighth note gets the beat<br/>
                          • Count: 1-2-3-4-5-6-7 (often grouped as 3+2+2)<br/>
                          • Common in progressive rock and Balkan folk music
                        </p>
                      </div>
                      
                      <div className="bg-amber-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-amber-900 mb-2">9/8 Time (Triple Compound)</h4>
                        <p className="text-gray-700 text-sm mb-2">
                          • Top number (9): 9 eighth notes per measure<br/>
                          • Bottom number (8): Eighth note gets the beat<br/>
                          • Count: 1-2-3-4-5-6-7-8-9 (three groups of three)<br/>
                          • Creates a flowing, lilting rhythm
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* Note Types Section */}
                  <section>
                    <h3 className="text-2xl font-semibold text-amber-800 mb-4 border-b border-amber-200 pb-2">
                      Note Types & Values
                    </h3>
                    <p className="text-gray-700 mb-4">
                      Different note shapes represent different durations. Each note type lasts for a specific amount of time.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div className="bg-amber-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-amber-900 mb-2">Whole Note</h4>
                        <p className="text-gray-700 text-sm">
                          • Lasts 4 beats in 4/4 time (entire measure)<br/>
                          • Appears as a hollow oval with no stem<br/>
                          • Longest common note value in music<br/>
                          • Rarely used in popular music but common in ballads and classical music
                        </p>
                      </div>
                      
                      <div className="bg-amber-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-amber-900 mb-2">Half Note</h4>
                        <p className="text-gray-700 text-sm">
                          • Lasts 2 beats in 4/4 time (half a measure)<br/>
                          • Appears as a hollow oval with a stem<br/>
                          • Two half notes equal one whole note<br/>
                          • Common in slower songs and sustained chords
                        </p>
                      </div>
                      
                      <div className="bg-amber-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-amber-900 mb-2">Quarter Note</h4>
                        <p className="text-gray-700 text-sm">
                          • Lasts 1 beat in 4/4 time (the basic beat)<br/>
                          • Appears as a filled oval with a stem<br/>
                          • The fundamental unit of rhythm in most music<br/>
                          • Four quarter notes equal one whole note<br/>
                          • Most common note value in popular music
                        </p>
                      </div>
                      
                      <div className="bg-amber-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-amber-900 mb-2">Eighth Note</h4>
                        <p className="text-gray-700 text-sm">
                          • Lasts 1/2 beat in 4/4 time (half a quarter note)<br/>
                          • Appears as a filled oval with stem and one flag<br/>
                          • When grouped together: connected with horizontal beams instead of flags<br/>
                          • Creates subdivision of the beat<br/>
                          • Count: "1 & 2 & 3 & 4 &" (the "&" represents eighth notes)
                        </p>
                      </div>
                      
                      <div className="bg-amber-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-amber-900 mb-2">Sixteenth Note</h4>
                        <p className="text-gray-700 text-sm">
                          • Lasts 1/4 beat in 4/4 time (quarter of a quarter note)<br/>
                          • Appears as a filled oval with stem and two flags<br/>
                          • When grouped together: connected with double horizontal beams<br/>
                          • Creates fast subdivision of the beat<br/>
                          • Count: "1 e & a 2 e & a 3 e & a 4 e & a" (very fast counting)
                        </p>
                      </div>
                      
                      <div className="bg-amber-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-amber-900 mb-2">Dotted Notes</h4>
                        <p className="text-gray-700 text-sm">
                          • A dot after a note adds half of that note's value to its duration<br/>
                          • <strong>Dotted quarter note:</strong> 1 beat + 0.5 beat = 1.5 beats<br/>
                          • <strong>Dotted half note:</strong> 2 beats + 1 beat = 3 beats<br/>
                          • Creates syncopated, "off-beat" rhythms<br/>
                          • Very common in many musical styles
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-amber-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-amber-900 mb-2">Triplets</h4>
                        <p className="text-gray-700 text-sm">
                          • Triplets divide a beat into 3 equal parts instead of 2<br/>
                          • Marked with a "3" above or below the group with a bracket or slur<br/>
                          • <strong>Eighth Note Triplets:</strong> 3 eighth notes in the time of 2 (one beat)<br/>
                          • <strong>Sixteenth Note Triplets:</strong> 3 sixteenth notes in the time of 1 eighth note<br/>
                          • Count eighth triplets: "1-trip-let, 2-trip-let"<br/>
                          • Creates a rolling, flowing rhythm feel
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* Rests Section */}
                  <section>
                    <h3 className="text-2xl font-semibold text-amber-800 mb-4 border-b border-amber-200 pb-2">
                      Rests (Silence in Music)
                    </h3>
                    <p className="text-gray-700 mb-4">
                      Rests represent silence and are just as important as notes. Each rest type corresponds to a note type and lasts for the same duration.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div className="bg-amber-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-amber-900 mb-2">Whole Rest</h4>
                        <p className="text-gray-700 text-sm">
                          • Lasts 4 beats in 4/4 time (entire measure of silence)<br/>
                          • Appears as a filled rectangle hanging from the staff line<br/>
                          • Can also represent a full measure rest in any time signature<br/>
                          • Creates dramatic pauses in music
                        </p>
                      </div>
                      
                      <div className="bg-amber-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-amber-900 mb-2">Half Rest</h4>
                        <p className="text-gray-700 text-sm">
                          • Lasts 2 beats in 4/4 time (half a measure of silence)<br/>
                          • Appears as a filled rectangle sitting on the staff line<br/>
                          • Two half rests equal one whole rest<br/>
                          • Common in music with sustained passages
                        </p>
                      </div>
                      
                      <div className="bg-amber-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-amber-900 mb-2">Quarter Rest</h4>
                        <p className="text-gray-700 text-sm">
                          • Lasts 1 beat in 4/4 time (one beat of silence)<br/>
                          • Appears as a squiggly vertical symbol<br/>
                          • Most common rest in popular music<br/>
                          • Creates rhythmic breathing space between notes<br/>
                          • Four quarter rests equal one whole rest
                        </p>
                      </div>
                      
                      <div className="bg-amber-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-amber-900 mb-2">Eighth Rest</h4>
                        <p className="text-gray-700 text-sm">
                          • Lasts 1/2 beat in 4/4 time (half a quarter beat of silence)<br/>
                          • Appears as a diagonal flag-like symbol<br/>
                          • Creates syncopated rhythms and off-beat patterns<br/>
                          • Common in funk, jazz, and Latin music<br/>
                          • Count: place silence on the "&" beats
                        </p>
                      </div>
                      
                      <div className="bg-amber-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-amber-900 mb-2">Sixteenth Rest</h4>
                        <p className="text-gray-700 text-sm">
                          • Lasts 1/4 beat in 4/4 time (quarter of a quarter beat)<br/>
                          • Appears as a diagonal symbol with two flags<br/>
                          • Creates very precise rhythmic gaps<br/>
                          • Common in complex rhythms and fast passages<br/>
                          • Used for intricate syncopation and groove patterns
                        </p>
                      </div>
                      
                      <div className="bg-amber-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-amber-900 mb-2">Why Rests Matter</h4>
                        <p className="text-gray-700 text-sm">
                          • <strong>Rhythm Creation:</strong> Rests create the "groove" and "pocket" in music<br/>
                          • <strong>Musical Breathing:</strong> Give phrases space to breathe and be heard<br/>
                          • <strong>Syncopation:</strong> Off-beat rests create exciting rhythmic tension<br/>
                          • <strong>Dynamics:</strong> Silence makes the notes that follow more impactful<br/>
                          • <strong>Counting:</strong> Count through rests - don't skip them!
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* Beaming and Grouping Section */}
                  <section>
                    <h3 className="text-2xl font-semibold text-amber-800 mb-4 border-b border-amber-200 pb-2">
                      Beaming & Grouping
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-amber-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-amber-900 mb-2">Why Notes Are Beamed</h4>
                        <p className="text-gray-700 text-sm">
                          Eighth notes and sixteenth notes are connected with horizontal beams instead of individual flags when they appear in groups. This makes the music easier to read by showing beat patterns clearly.
                        </p>
                      </div>
                      
                      <div className="bg-amber-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-amber-900 mb-2">Beaming Rules</h4>
                        <p className="text-gray-700 text-sm">
                          • Eighth notes: Usually beamed in groups that show each beat<br/>
                          • Sixteenth notes: Beamed in groups within each beat<br/>
                          • Beams never cross bar lines<br/>
                          • Beaming helps musicians see the underlying beat structure
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* Getting Started Section */}
                  <section>
                    <h3 className="text-2xl font-semibold text-amber-800 mb-4 border-b border-amber-200 pb-2">
                      Getting Started Tips
                    </h3>
                    <div className="bg-amber-50 p-4 rounded-lg">
                      <ul className="text-gray-700 text-sm space-y-2">
                        <li>• <strong>Start with 4/4 time:</strong> Most familiar and easiest to count</li>
                        <li>• <strong>Master quarter notes first:</strong> They're the foundation</li>
                        <li>• <strong>Use a metronome:</strong> Helps develop steady timing</li>
                        <li>• <strong>Count out loud:</strong> "1, 2, 3, 4" or "1 & 2 & 3 & 4 &"</li>
                        <li>• <strong>Practice slowly:</strong> Speed comes naturally with accuracy</li>
                        <li>• <strong>Listen to the examples:</strong> Use the play button to hear each rhythm</li>
                      </ul>
                    </div>
                  </section>
                </div>

                <div className="mt-8 text-center">
                  <button
                    onClick={() => setShowEducationalModal(false)}
                    className="px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold rounded-lg shadow-md hover:from-amber-700 hover:to-orange-700 transition-all duration-200"
                  >
                    Start Practicing
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}