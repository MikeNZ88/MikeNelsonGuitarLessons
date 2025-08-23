'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ChordDiagram from '@/components/ChordDiagram';

// Root string types
const ROOT_STRING_TYPES = ['E String Root', 'A String Root'] as const;
type RootStringType = typeof ROOT_STRING_TYPES[number];

// Chord types
const CHORD_TYPES = ['Major', 'Minor', 'Dominant 7', 'm7', 'Maj7', 'sus4', '7sus4'] as const;
type ChordType = typeof CHORD_TYPES[number];

// Notes for each root string type with sharp/flat variations
const E_SHAPE_NOTES = {
  sharps: [
    { note: 'F', fret: 1 }, { note: 'F#', fret: 2 }, { note: 'G', fret: 3 }, { note: 'G#', fret: 4 },
    { note: 'A', fret: 5 }, { note: 'A#', fret: 6 }, { note: 'B', fret: 7 }, { note: 'C', fret: 8 },
    { note: 'C#', fret: 9 }, { note: 'D', fret: 10 }, { note: 'D#', fret: 11 }, { note: 'E', fret: 12 }
  ],
  flats: [
    { note: 'F', fret: 1 }, { note: 'G♭', fret: 2 }, { note: 'G', fret: 3 }, { note: 'A♭', fret: 4 },
    { note: 'A', fret: 5 }, { note: 'B♭', fret: 6 }, { note: 'B', fret: 7 }, { note: 'C', fret: 8 },
    { note: 'D♭', fret: 9 }, { note: 'D', fret: 10 }, { note: 'E♭', fret: 11 }, { note: 'E', fret: 12 }
  ]
};

const A_SHAPE_NOTES = {
  sharps: [
    { note: 'A#', fret: 1 }, { note: 'B', fret: 2 }, { note: 'C', fret: 3 }, { note: 'C#', fret: 4 },
    { note: 'D', fret: 5 }, { note: 'D#', fret: 6 }, { note: 'E', fret: 7 }, { note: 'F', fret: 8 },
    { note: 'F#', fret: 9 }, { note: 'G', fret: 10 }, { note: 'G#', fret: 11 }, { note: 'A', fret: 12 }
  ],
  flats: [
    { note: 'B♭', fret: 1 }, { note: 'B', fret: 2 }, { note: 'C', fret: 3 }, { note: 'D♭', fret: 4 },
    { note: 'D', fret: 5 }, { note: 'E♭', fret: 6 }, { note: 'E', fret: 7 }, { note: 'F', fret: 8 },
    { note: 'G♭', fret: 9 }, { note: 'G', fret: 10 }, { note: 'A♭', fret: 11 }, { note: 'A', fret: 12 }
  ]
};

interface ChordData {
  frets: number[];
  fingers: string[];
  openChordName: string;
}

// Open chord patterns for comparison
const OPEN_CHORD_PATTERNS: Record<ChordType, { E: ChordData; A: ChordData }> = {
  'Major': {
    E: { frets: [0, 2, 2, 1, 0, 0], fingers: ['', '2', '3', '1', '', ''], openChordName: 'E Major' },
    A: { frets: [-1, 0, 2, 2, 2, 0], fingers: ['', '', '1', '2', '3', ''], openChordName: 'A Major' }
  },
  'Minor': {
    E: { frets: [0, 2, 2, 0, 0, 0], fingers: ['', '2', '3', '', '', ''], openChordName: 'E Minor' },
    A: { frets: [-1, 0, 2, 2, 1, 0], fingers: ['', '', '2', '3', '1', ''], openChordName: 'A Minor' }
  },
  'Dominant 7': {
    E: { frets: [0, 2, 0, 1, 0, 0], fingers: ['', '2', '', '1', '', ''], openChordName: 'E7' },
    A: { frets: [-1, 0, 2, 0, 2, 0], fingers: ['', '', '2', '', '3', ''], openChordName: 'A7' }
  },
  'm7': {
    E: { frets: [0, 2, 0, 0, 0, 0], fingers: ['', '2', '', '', '', ''], openChordName: 'Em7' },
    A: { frets: [-1, 0, 2, 0, 1, 0], fingers: ['', '', '2', '', '1', ''], openChordName: 'Am7' }
  },
  'Maj7': {
    E: { frets: [0, 2, 1, 1, 0, 0], fingers: ['', '3', '1', '2', '', ''], openChordName: 'EMaj7' },
    A: { frets: [-1, 0, 2, 1, 2, 0], fingers: ['', '', '2', '1', '3', ''], openChordName: 'AMaj7' }
  },
  'sus4': {
    E: { frets: [0, 2, 2, 2, 0, 0], fingers: ['', '2', '3', '4', '', ''], openChordName: 'Esus4' },
    A: { frets: [-1, 0, 2, 2, 3, 0], fingers: ['', '', '1', '2', '3', ''], openChordName: 'Asus4' }
  },
  '7sus4': {
    E: { frets: [0, 2, 0, 2, 0, 0], fingers: ['', '2', '', '3', '', ''], openChordName: 'E7sus4' },
    A: { frets: [-1, 0, 2, 0, 3, 0], fingers: ['', '', '2', '', '3', ''], openChordName: 'A7sus4' }
  }
};

// E Shape chord patterns (6th string root)
const E_SHAPE_PATTERNS: Record<ChordType, ChordData> = {
  'Major': {
    frets: [0, 2, 2, 1, 0, 0], // Relative to barre fret
    fingers: ['1', '3', '4', '2', '1', '1'],
    openChordName: 'E Major'
  },
  'Minor': {
    frets: [0, 2, 2, 0, 0, 0],
    fingers: ['1', '3', '4', '1', '1', '1'],
    openChordName: 'E Minor'
  },
  'Dominant 7': {
    frets: [0, 2, 0, 1, 0, 0],
    fingers: ['1', '3', '1', '2', '1', '1'],
    openChordName: 'E7'
  },
  'm7': {
    frets: [0, 2, 0, 0, 0, 0],
    fingers: ['1', '3', '1', '1', '1', '1'],
    openChordName: 'Em7'
  },
  'Maj7': {
    frets: [0, 2, 1, 1, 0, 0],
    fingers: ['1', '4', '2', '3', '1', '1'],
    openChordName: 'EMaj7'
  },
  'sus4': {
    frets: [0, 2, 2, 2, 0, 0],
    fingers: ['1', '2', '3', '4', '1', '1'],
    openChordName: 'Esus4'
  },
  '7sus4': {
    frets: [0, 2, 0, 2, 0, 0],
    fingers: ['1', '3', '1', '4', '1', '1'],
    openChordName: 'E7sus4'
  }
};

// A Shape chord patterns (5th string root)
const A_SHAPE_PATTERNS: Record<ChordType, ChordData> = {
  'Major': {
    frets: [-1, 0, 2, 2, 2, 0],
    fingers: ['', '1', '2', '3', '4', '1'],
    openChordName: 'A Major'
  },
  'Minor': {
    frets: [-1, 0, 2, 2, 1, 0],
    fingers: ['', '1', '3', '4', '2', '1'],
    openChordName: 'A Minor'
  },
  'Dominant 7': {
    frets: [-1, 0, 2, 0, 2, 0],
    fingers: ['', '1', '3', '1', '4', '1'],
    openChordName: 'A7'
  },
  'm7': {
    frets: [-1, 0, 2, 0, 1, 0],
    fingers: ['', '1', '3', '1', '2', '1'],
    openChordName: 'Am7'
  },
  'Maj7': {
    frets: [-1, 0, 2, 1, 2, 0],
    fingers: ['', '1', '3', '2', '4', '1'],
    openChordName: 'AMaj7'
  },
  'sus4': {
    frets: [-1, 0, 2, 2, 3, 0],
    fingers: ['', '1', '2', '3', '4', '1'],
    openChordName: 'Asus4'
  },
  '7sus4': {
    frets: [-1, 0, 2, 0, 3, 0],
    fingers: ['', '1', '3', '1', '4', '1'],
    openChordName: 'A7sus4'
  }
};

function BarreChordLibraryContent() {
  const searchParams = useSearchParams();
  
  const [selectedRootString, setSelectedRootString] = useState<RootStringType>('E String Root');
  const [selectedChordType, setSelectedChordType] = useState<ChordType>('Major');
  const [selectedFret, setSelectedFret] = useState<number>(1);
  const [useFlats, setUseFlats] = useState<boolean>(false);

  // Update state based on URL parameters
  useEffect(() => {
    const root = searchParams.get('root');
    const type = searchParams.get('type');
    const fret = searchParams.get('fret');
    
    if (root === 'a-string') {
      setSelectedRootString('A String Root');
    } else if (root === 'e-string') {
      setSelectedRootString('E String Root');
    }
    
    if (type && CHORD_TYPES.includes(type as ChordType)) {
      setSelectedChordType(type as ChordType);
    }
    
    if (fret) {
      const fretNumber = parseInt(fret);
      if (fretNumber >= 1 && fretNumber <= 12) {
        setSelectedFret(fretNumber);
      }
    }
  }, [searchParams]);

  // Get current note data based on root string selection and sharp/flat preference
  const getCurrentNotes = () => {
    const noteSet = selectedRootString === 'E String Root' ? E_SHAPE_NOTES : A_SHAPE_NOTES;
    return useFlats ? noteSet.flats : noteSet.sharps;
  };

  // Get current chord pattern based on selections
  const getCurrentChordPattern = () => {
    return selectedRootString === 'E String Root' 
      ? E_SHAPE_PATTERNS[selectedChordType]
      : A_SHAPE_PATTERNS[selectedChordType];
  };

  // Calculate actual frets for the chord diagram
  const getActualFrets = () => {
    const pattern = getCurrentChordPattern();
    return pattern.frets.map(fret => fret === -1 ? -1 : fret + selectedFret);
  };

  // Get chord name for current selection
  const getChordName = () => {
    const currentNote = getCurrentNotes().find(n => n.fret === selectedFret);
    return currentNote ? `${currentNote.note}${selectedChordType === 'Major' ? '' : ` ${selectedChordType}`}` : '';
  };

  // Get root string number (1-6, where 1 = high E, 6 = low E)
  const getRootString = () => {
    return selectedRootString === 'E String Root' ? 6 : 5;
  };

  // Get current open chord pattern
  const getCurrentOpenChord = () => {
    const shapeKey = selectedRootString === 'E String Root' ? 'E' : 'A';
    return OPEN_CHORD_PATTERNS[selectedChordType][shapeKey];
  };

  // Transformation diagram component with color-coded notes
  const ChordTransformationDiagram = () => {
    const openChord = getCurrentOpenChord();
    const barreChord = getCurrentChordPattern();
    const actualBarreFrets = getActualFrets();
    
    // Color scheme: Green for open strings & barre notes, Dark amber for other notes
    const GREEN = "#22c55e";
    const DARK_AMBER = "#d97706";
    
    // Create color arrays for each diagram
    const openColors: string[] = [];
    const barreColors: string[] = [];
    
    // Color the open chord: green for open strings (0), dark amber for fretted
    openChord.frets.forEach((fret) => {
      if (fret === 0) {
        openColors.push(GREEN); // Open strings = green
      } else if (fret > 0) {
        openColors.push(DARK_AMBER); // Other fretted notes = dark amber
      } else {
        openColors.push("transparent"); // Muted strings
      }
    });
    
    // Color the barre chord: green for barre notes, dark amber for others
    actualBarreFrets.forEach((fret) => {
      if (fret === selectedFret) {
        barreColors.push(GREEN); // Barre notes = green
      } else if (fret > selectedFret) {
        barreColors.push(DARK_AMBER); // Other notes = dark amber
      } else {
        barreColors.push("transparent"); // Muted strings
      }
    });
    
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-6 text-center">
          How {selectedChordType} Chords Transform
        </h3>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          {/* Open Chord */}
          <div className="text-center">
            <h4 className="font-medium text-gray-700 mb-4">Open {openChord.openChordName}</h4>
            <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
              <ChordDiagram
                chordName={openChord.openChordName}
                chordData={{
                  frets: openChord.frets,
                  fingers: openChord.fingers,
                  rootString: getRootString(),
                  customNoteColors: openColors
                }}
                showNotes={false}
              />
            </div>
          </div>

          {/* Arrow */}
          <div className="flex items-center">
            <div className="text-3xl text-amber-600">→</div>
          </div>

          {/* Barre Chord */}
          <div className="text-center">
            <h4 className="font-medium text-gray-700 mb-4">Barre {getChordName()}</h4>
            <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
              <ChordDiagram
                chordName={getChordName()}
                chordData={{
                  frets: actualBarreFrets,
                  fingers: barreChord.fingers,
                  startFret: selectedFret,
                  rootString: getRootString(),
                  customNoteColors: barreColors
                }}
                showNotes={false}
              />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-sm text-gray-600 text-center mb-6">
            The open {openChord.openChordName} chord pattern is moved up {selectedFret} fret{selectedFret !== 1 ? 's' : ''} with a barre across fret {selectedFret}
          </p>
          
          {/* Theoretical explanation with table */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-800 mb-3 text-center">
              Why Barre Chords Work: Equal Movement
            </h4>
            <p className="text-sm text-gray-600 mb-4 text-center">
              Barre chords work because <strong>every note moves by exactly the same number of frets</strong> (+{selectedFret}). 
              This maintains the chord's interval relationships.
            </p>
            
            <div className="bg-amber-50 rounded-lg p-4 mb-4 border border-amber-200">
              <h5 className="font-semibold text-gray-800 mb-2">Shape Pattern Preservation</h5>

              <p className="text-sm text-gray-600">
                <strong>Important:</strong> While the finger numbers change (2nd→3rd, 3rd→4th, etc.) to accommodate the 1st finger barre, 
                the <em>physical shape and relative distances</em> between all the chord tones remain exactly the same.
              </p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-2 text-left">Chord Type</th>
                    <th className="border border-gray-300 p-2 text-center">6th (Low E)</th>
                    <th className="border border-gray-300 p-2 text-center">5th (A)</th>
                    <th className="border border-gray-300 p-2 text-center">4th (D)</th>
                    <th className="border border-gray-300 p-2 text-center">3rd (G)</th>
                    <th className="border border-gray-300 p-2 text-center">2nd (B)</th>
                    <th className="border border-gray-300 p-2 text-center">1st (High E)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-2 font-medium bg-gray-50">Open Chord</td>
                    {[0, 1, 2, 3, 4, 5].map((stringIndex) => {
                      const openFret = openChord.frets[stringIndex];
                      return (
                        <td key={stringIndex} className="border border-gray-300 p-2 text-center">
                          {openFret === -1 ? (
                            <span className="text-gray-400">X</span>
                          ) : (
                            <span>
                              {openFret} {openFret === 0 ? '(Open)' : ''}
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                  <tr className="bg-amber-50">
                    <td className="border border-gray-300 p-2 font-medium">Movement</td>
                    {[0, 1, 2, 3, 4, 5].map((stringIndex) => {
                      const openFret = openChord.frets[stringIndex];
                      return (
                        <td key={stringIndex} className="border border-gray-300 p-2 text-center font-bold text-green-600">
                          {openFret === -1 ? '—' : `+${selectedFret}`}
                        </td>
                      );
                    })}
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2 font-medium bg-gray-50">Barre Chord</td>
                    {[0, 1, 2, 3, 4, 5].map((stringIndex) => {
                      const barreFret = actualBarreFrets[stringIndex];
                      return (
                        <td key={stringIndex} className="border border-gray-300 p-2 text-center">
                          {barreFret === -1 ? (
                            <span className="text-gray-400">X</span>
                          ) : (
                            <span>{barreFret}</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero */}
      <section className="bg-gradient-to-br from-amber-800 via-amber-700 to-amber-600 text-white py-8 sm:py-10 mb-6 rounded-xl">
        <div className="max-w-6xl mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold font-playfair mb-2">Barre Chord Library</h1>
            <p className="text-base sm:text-lg text-amber-100 mb-3 leading-relaxed">Explore E- and A‑shape barre chords by root note and chord type. See how shapes transform up the neck.</p>
            <div className="flex items-center justify-center gap-3 text-amber-200 text-sm">
              <span>Intermediate Level</span>
            </div>
          </div>
        </div>
      </section>

      <div className="text-center mb-8">
        <div className="bg-amber-50 rounded-lg p-6 border border-amber-200 max-w-4xl mx-auto mb-8">
          <h2 className="text-lg font-semibold text-amber-800 mb-4">How to Find Any Barre Chord</h2>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-700">
                         <div>
               <h3 className="font-semibold text-amber-700 mb-2">E String Root (Low E)</h3>
               <p className="mb-2">
                 The <strong>root note</strong> (the note the chord is named after) is located on the low E string (6th string). 
                 For example, to play a G major chord, find the note G on the low E string (3rd fret), 
                 place your 1st finger there to form a barre, then complete the chord pattern with your other fingers.
               </p>
                                <p className="text-amber-600 font-medium">
                  Root on low E string → Barre at that fret → Add rest of chord shape
                 </p>
               </div>
                              <div>
                <h3 className="font-semibold text-amber-700 mb-2">A String Root</h3>
                 <p className="mb-2">
                   The <strong>root note</strong> (the note the chord is named after) is located on the A string (5th string). 
                   For example, to play a C major chord, find the note C on the A string (3rd fret), 
                   place your 1st finger there to form a partial barre (strings 1-5), then complete the chord shape with your other fingers.
                 </p>
                 <p className="text-amber-600 font-medium">
                   Root on A string → Barre at that fret → Add rest of chord shape
                 </p>
               </div>
          </div>
        </div>
      </div>

      {/* Root String Selection */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {ROOT_STRING_TYPES.map(rootType => (
          <button
            key={rootType}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              selectedRootString === rootType
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
            onClick={() => setSelectedRootString(rootType)}
          >
            {rootType}
          </button>
        ))}
      </div>

      {/* Chord Type Selection */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {CHORD_TYPES.map(chordType => (
          <button
            key={chordType}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              selectedChordType === chordType
                ? 'bg-amber-600 text-white shadow-md'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
            onClick={() => setSelectedChordType(chordType)}
          >
            {chordType}
          </button>
        ))}
      </div>

      {/* Sharp/Flat Toggle */}
      <div className="flex justify-center mb-8">
        <button
          onClick={() => setUseFlats(!useFlats)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            useFlats
              ? 'bg-amber-600 text-white shadow-md'
              : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
          }`}
        >
{useFlats ? 'Show Sharps' : 'Show Flats'}
        </button>
      </div>

      {/* Horizontal Fretboard Selector */}
      <div className="mb-12">
        <h3 className="text-lg font-semibold text-center mb-6 text-gray-700">
          Select Fret Position on {selectedRootString}
        </h3>
        
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 max-w-4xl mx-auto">
          {/* Fret markers */}
          <div className="grid grid-cols-12 gap-1 mb-4">
            {getCurrentNotes().map((noteData, index) => (
              <div key={index} className="text-center">
                <div className="text-xs text-gray-500 mb-1">
                  {noteData.fret}
                </div>
                <button
                  className={`w-full h-16 rounded-lg border-2 transition-all duration-200 flex flex-col items-center justify-center ${
                    selectedFret === noteData.fret
                      ? 'bg-amber-600 text-white border-amber-600 shadow-md'
                      : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedFret(noteData.fret)}
                >
                  <div className="font-semibold text-sm">
                    {noteData.note}
                  </div>
                </button>
              </div>
            ))}
          </div>
          
          {/* Fretboard representation */}
          <div className="relative">
            <div className="h-2 bg-amber-800 rounded-full"></div>
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-700 to-amber-900 rounded-full opacity-60"></div>
          </div>
          
          {/* Higher frets note */}
          <div className="mt-4 bg-amber-50 rounded-lg p-3 border border-amber-200">
            <p className="text-sm text-amber-800">
              <strong>💡 Higher Frets:</strong> Beyond the 12th fret, the notes repeat the same pattern. 
              For example, the 13th fret has the same notes as the 1st fret, the 14th fret matches the 2nd fret, and so on. 
              This means you can play the same barre chord shapes at higher positions for the same chords in a higher octave.
            </p>
          </div>
        </div>
      </div>

      {/* Current Selection Display */}
      <div className="text-center mb-8">
        <div className="bg-amber-50 rounded-lg p-6 border border-amber-200 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-amber-800 mb-2">
            {getChordName()}
          </h2>
          <p className="text-gray-600">
                            <strong>Root:</strong> {selectedRootString} • <strong>Type:</strong> {selectedChordType} • <strong>Barred finger: Fret</strong> {selectedFret}
          </p>
        </div>
      </div>

      {/* Chord Diagram */}
      <div className="flex justify-center mb-8">
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
          <ChordDiagram
            chordName={getChordName()}
            chordData={{
              frets: getActualFrets(),
              fingers: getCurrentChordPattern().fingers,
              startFret: selectedFret,
              rootString: getRootString()
            }}
            showNotes={false}
          />
        </div>
      </div>

      {/* Open Chord Reference */}
      <div className="text-center mb-12">
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 max-w-xl mx-auto">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Based on Open Chord Shape
          </h3>
          <p className="text-amber-600 font-medium text-lg">
            {getCurrentChordPattern().openChordName}
          </p>
          <p className="text-sm text-gray-600 mt-2">
            This barre chord uses the same finger pattern as the open {getCurrentChordPattern().openChordName} chord, 
            but moved up the fretboard with a barre across fret {selectedFret}.
          </p>
        </div>
      </div>

      {/* Educational Content */}
      <div className="space-y-8 max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-amber-800 mb-4">How Barre Chords Work</h2>
          
          {/* Transformation Diagram */}
          <div className="mb-8">
            <ChordTransformationDiagram />
          </div>
          

        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-amber-800 mb-4">Practice Tips</h2>
          <div className="text-gray-600 space-y-3">
            <p>
              <strong>Start with easier frets:</strong> Begin practicing barre chords around the 5th-7th frets where string tension is lower.
            </p>
            <p>
              <strong>Barre technique:</strong> Use the side of your index finger, not the fleshy pad. Roll your finger slightly toward the headstock.
            </p>
            <p>
              <strong>Build strength gradually:</strong> Practice holding the barre for 30 seconds at a time to build finger strength.
            </p>
            <p>
              <strong>Check each string:</strong> Play each string individually to ensure all notes ring clearly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BarreChordLibrary() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-8 text-center">Loading...</div>}>
      <BarreChordLibraryContent />
    </Suspense>
  );
} 