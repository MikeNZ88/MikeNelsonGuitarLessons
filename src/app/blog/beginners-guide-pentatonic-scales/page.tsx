'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

// Real Minor Pentatonic Box Patterns 
// Based on A minor pentatonic - these are the actual fret positions
const PENTATONIC_PATTERNS = {
  shape1: {
    name: 'Shape 1 (A minor Pentatonic)',
    description: '',
    pattern: [
      { string: 1, frets: [5, 8] },   // High E string: A, C
      { string: 2, frets: [5, 8] },   // B string: E, G
      { string: 3, frets: [5, 7] },   // G string: C, D
      { string: 4, frets: [5, 7] },   // D string: G, A
      { string: 5, frets: [5, 7] },   // A string: A, C
      { string: 6, frets: [5, 8] }    // Low E string: A, C
    ]
  },
  shape2: {
    name: 'Shape 2 (C major Pentatonic)',
    description: '',
    pattern: [
      { string: 1, frets: [8, 10] },  // High E string: 8, 10
      { string: 2, frets: [8, 10] },  // B string: 8, 10
      { string: 3, frets: [7, 9] },   // G string: 7, 9
      { string: 4, frets: [7, 10] },  // D string: 7, 10
      { string: 5, frets: [7, 10] },  // A string: 7, 10
      { string: 6, frets: [8, 10] }   // Low E string: 8, 10
    ]
  },
  shape3: {
    name: 'Shape 3',
    description: '',
    pattern: [
      { string: 1, frets: [10, 12] }, // High E string: 10, 12
      { string: 2, frets: [10, 13] }, // B string: 10, 13
      { string: 3, frets: [9, 12] },  // G string: 9, 12
      { string: 4, frets: [10, 12] }, // D string: 10, 12
      { string: 5, frets: [10, 12] }, // A string: 10, 12
      { string: 6, frets: [10, 12] }  // Low E string: 10, 12
    ]
  },
  shape4: {
    name: 'Shape 4',
    description: '',
    pattern: [
      { string: 1, frets: [12, 15] }, // High E string: 12, 15
      { string: 2, frets: [13, 15] }, // B string: 13, 15
      { string: 3, frets: [12, 14] }, // G string: 12, 14
      { string: 4, frets: [12, 14] }, // D string: 12, 14
      { string: 5, frets: [12, 15] }, // A string: 12, 15
      { string: 6, frets: [12, 15] }  // Low E string: 12, 15
    ]
  },
  shape5: {
    name: 'Shape 5',
    description: '',
    pattern: [
      { string: 1, frets: [15, 17] }, // High E string: G, A
      { string: 2, frets: [15, 17] }, // B string: D, E
      { string: 3, frets: [14, 17] }, // G string: A, C
      { string: 4, frets: [14, 17] }, // D string: G, A
      { string: 5, frets: [15, 17] }, // A string: A, C
      { string: 6, frets: [15, 17] }  // Low E string: G, A
    ]
  }
};

// Notes for each key ordered by fret position
const KEY_NOTES = [
  { note: 'F', fret: 1 }, { note: 'F#', fret: 2 }, { note: 'G', fret: 3 }, { note: 'G#', fret: 4 },
  { note: 'A', fret: 5 }, { note: 'B♭', fret: 6 }, { note: 'B', fret: 7 }, { note: 'C', fret: 8 }, 
  { note: 'C#', fret: 9 }, { note: 'D', fret: 10 }, { note: 'E♭', fret: 11 }, { note: 'E', fret: 12 }
];

// Scale shape order for learning
const SCALE_SHAPES = ['shape1', 'shape2', 'shape3', 'shape4', 'shape5'] as const;
type ScaleShape = typeof SCALE_SHAPES[number];

function PentatonicScalesContent() {
  const searchParams = useSearchParams();
  
  const [selectedKey, setSelectedKey] = useState<string>('A');
  const [manualOctaveShift, setManualOctaveShift] = useState<number>(0);

  // Update state based on URL parameters
  useEffect(() => {
    const key = searchParams.get('key');
    
    if (key && KEY_NOTES.some(n => n.note === key)) {
      setSelectedKey(key);
      setManualOctaveShift(0); // Reset octave shift when key changes
    }
  }, [searchParams]);

  // Get the root fret for the selected key
  const getRootFret = () => {
    const currentNote = KEY_NOTES.find(n => n.note === selectedKey);
    return currentNote ? currentNote.fret : 5; // Default to A (5th fret)
  };

  // Get dynamic shape name based on selected key
  const getShapeName = (shape: ScaleShape, key: string) => {
    // Calculate the relative major key (3 semitones up from minor)
    // Use consistent flat spelling for relative major keys to avoid enharmonic confusion
    const minorToMajorMap: { [key: string]: string } = {
      // Natural notes
      'C': 'E♭', 'D': 'F', 'E': 'G', 'F': 'A♭', 'G': 'B♭', 'A': 'C', 'B': 'D',
      // Sharp keys
      'C#': 'E', 'D#': 'F#', 'F#': 'A', 'G#': 'B', 'A#': 'C#',
      // Flat keys (use flat spelling for consistency)
      'D♭': 'F♭', 'E♭': 'G♭', 'G♭': 'B♭♭', 'A♭': 'C♭', 'B♭': 'D♭'
    };
     
     // Get the relative major using the key directly
     let relativeMajor = minorToMajorMap[key];
    
     if (!relativeMajor) {
       // Fallback calculation using conventional note order
       const noteOrder = ['C', 'C#', 'D', 'E♭', 'E', 'F', 'F#', 'G', 'G#', 'A', 'B♭', 'B'];
       
       let keyIndex = noteOrder.findIndex(note => note === key);
       if (keyIndex === -1) keyIndex = 0; // Fallback to C
       
       const relativeMajorIndex = (keyIndex + 3) % 12;
       relativeMajor = noteOrder[relativeMajorIndex];
     }
    
    switch (shape) {
      case 'shape1':
        return `Shape 1 (${key} minor Pentatonic)`;
      case 'shape2':
        return `Shape 2 (${relativeMajor} major Pentatonic)`;
      case 'shape3':
        return 'Shape 3';
      case 'shape4':
        return 'Shape 4';
      case 'shape5':
        return 'Shape 5';
      default:
        return `Shape ${shape}`;
    }
  };



  // Calculate actual frets for the scale diagram with intelligent octave shifting
  const getActualFrets = (shape: ScaleShape) => {
    const pattern = PENTATONIC_PATTERNS[shape].pattern;
    const rootFret = getRootFret();
    
    // Basic transpose from A minor (5th fret reference)
    const basicTranspose = rootFret - 5;
    
    // Apply basic transposition
    let transposedPattern = pattern.map(string => ({
      ...string,
      frets: string.frets.map(fret => fret + basicTranspose)
    }));
    
    // Check if any frets are below 1st fret or above 24th fret
    let minFret = 24;
    let maxFret = 0;
    transposedPattern.forEach(string => {
      string.frets.forEach(fret => {
        if (fret < minFret) minFret = fret;
        if (fret > maxFret) maxFret = fret;
      });
    });
    
    // Apply octave shift if needed
    let octaveShift = 0;
    
    // If pattern goes below fret 1, shift up an octave (12 frets)
    if (minFret < 1) {
      octaveShift = 12;
    }
    // If pattern goes above fret 24, shift down an octave (12 frets)
    else if (maxFret > 24) {
      octaveShift = -12;
    }
    // For Shape 5, be more careful about octave shifting
    // Only shift down if it would still be playable (not below fret 1)
    else if (minFret > 20 && shape !== 'shape5') {
      // For shapes other than Shape 5, prefer lower octave if uncomfortably high
      octaveShift = -12;
    }
    // For Shape 5 specifically, handle differently
    else if (shape === 'shape5') {
      // If Shape 5 is in the very high range (above 22), allow it to stay there
      // The manual octave controls will let users move it down if needed
      if (minFret > 22) {
        octaveShift = -12;
      }
      // Otherwise, keep it in the current position
    }
    
         // Apply automatic octave shift if needed
     if (octaveShift !== 0) {
       transposedPattern = transposedPattern.map(string => ({
         ...string,
         frets: string.frets.map(fret => fret + octaveShift)
       }));
     }
     
     // Apply manual octave shift (12 frets per octave)
     const totalManualShift = manualOctaveShift * 12;
     if (totalManualShift !== 0) {
       transposedPattern = transposedPattern.map(string => ({
         ...string,
         frets: string.frets.map(fret => fret + totalManualShift)
       }));
     }
     
     // Check for invalid frets after all transpositions
     let hasInvalidFrets = false;
     transposedPattern.forEach(string => {
       string.frets.forEach(fret => {
         if (fret < 0 || fret > 24) hasInvalidFrets = true;
       });
     });
     
     // Return null if any frets are invalid (negative or above 24th fret)
     if (hasInvalidFrets) {
       return null;
     }
     
     return transposedPattern;
  };

  // Fretboard diagram component
  const FretboardDiagram = ({ shape, title, description }: { shape: ScaleShape; title: string; description: string }) => {
    const actualFrets = getActualFrets(shape);
    const rootFret = getRootFret();
    
    // Check if shape is available (no negative frets)
    if (!actualFrets) {
          return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 fretboard-diagram">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">{title}</h3>
          <p className="text-xs text-gray-600 mb-4 text-center">{description}</p>
          
          <div className="bg-gray-50 rounded-lg p-6 text-center">
            <div className="text-gray-500 text-lg font-medium">
              No shape available
            </div>
                         <p className="text-sm text-gray-400 mt-2">
               This shape is out of range (requires frets below 0 or above 24). 
               Try using the octave position controls to move to a playable range.
             </p>
          </div>
        </div>
      );
    }
    
    // Get the fret range for this shape's display window
    const getFretRange = (shape: ScaleShape) => {
      const actualFrets = getActualFrets(shape);
      if (!actualFrets) return { minFret: 0, maxFret: 0, span: 0 };
      
      let minFret = 24;
      let maxFret = 0;
      
      actualFrets.forEach(string => {
        string.frets.forEach(fret => {
          if (fret < minFret) minFret = fret;
          if (fret > maxFret) maxFret = fret;
        });
      });
      
      return { minFret, maxFret, span: maxFret - minFret };
    };
    
    const fretRange = getFretRange(shape);
    const startingFret = fretRange.minFret;
    const fretSpan = 4; // Use consistent 4-fret span for all diagrams
    
    // Get finger number based on proper pentatonic fingering patterns
    const getFingerNumber = (stringIndex: number, fret: number) => {
      // Shape 3 specific fingering patterns - dynamic based on actual fret positions
      if (shape === 'shape3') {
        // Get the actual frets for this string in Shape 3
        const stringData = actualFrets.find(s => s.string === stringIndex);
        if (stringData && stringData.frets.length >= 2) {
          const [firstFret, secondFret] = stringData.frets;
          
          // Determine finger based on relative position
          if (fret === firstFret) {
            return '1'; // Index finger for first note
          } else if (fret === secondFret) {
            // For the second note, use different fingers based on string
            if (stringIndex === 2) { // B string - wider stretch
              return '4'; // Pinky
            } else if (stringIndex === 3) { // G string - wider stretch
              return '4'; // Pinky
            } else {
              return '3'; // Ring finger for other strings
            }
          }
        }
        
        // Fallback to default fingering
        return '1';
      }
      
      // Default fingering for other shapes (relative to starting fret)
      const fretPosition = fret - startingFret;
      const fingerMap: { [key: number]: string } = {
        0: '1',  // Index finger
        1: '2',  // Middle finger
        2: '3',  // Ring finger
        3: '4',  // Pinky finger
        4: '4'   // Pinky finger (for wider spans)
      };
      
      return fingerMap[fretPosition] || '1';
    };
    
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 w-full">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">{title}</h3>
        <p className="text-xs text-gray-600 mb-4 text-center">{description}</p>
        
        <div className="bg-slate-50 rounded-lg p-2 sm:p-3 w-full min-h-[180px] sm:min-h-[200px] relative overflow-x-auto">
          {/* Continuous Fret lines */}
          <div className="absolute left-6 right-0 top-3" style={{ height: 'calc(6 * 1rem + 5 * 0.25rem)' }}>
            {Array.from({ length: fretSpan + 2 }, (_, i) => i).map((fret) => (
              <div
                key={fret}
                className="absolute h-full border-l-2 border-solid border-gray-600"
                style={{ left: `${(fret / (fretSpan + 1)) * 100}%` }}
              />
            ))}
          </div>
          
          {/* Fretboard */}
          <div className="space-y-1 relative z-10">
            {[1, 2, 3, 4, 5, 6].map((stringNum) => {
              const stringData = actualFrets.find(s => s.string === stringNum);
              const stringLabels = ['E', 'B', 'G', 'D', 'A', 'E']; // High E to Low E
              const stringLabel = stringLabels[stringNum - 1];
              return (
                <div key={stringNum} className="flex items-center">
                  {/* String letter */}
                  <div className="w-6 text-xs text-gray-500 text-center font-medium">
                    {stringLabel}
                  </div>
                  
                  {/* Fretboard */}
                  <div className="flex-1 flex relative h-4 min-w-[160px] sm:min-w-[180px]">
                    {/* String line */}
                    <div className="absolute top-1/2 left-0 right-0 border-t-2 border-solid border-gray-700 transform -translate-y-1/2"></div>
                    
                    {/* Notes */}
                    {stringData && stringData.frets.map((fret, index) => {
                      const fretPosition = fret - startingFret;
                      if (fretPosition >= 0 && fretPosition <= fretSpan) {
                        // Position the note in the center of the fret space (between fret lines)
                        // Each fret space is between two fret lines, so center is at 0.5, 1.5, 2.5, etc.
                        const totalFretSpaces = fretSpan + 1; // Total number of fret spaces
                        const fretSpaceCenter = `${((fretPosition + 0.5) / totalFretSpaces) * 100}%`;
                        
                        return (
                                                    <div
                            key={index}
                            className="absolute w-3 h-3 sm:w-4 sm:h-4 bg-orange-500 rounded-full border border-white sm:border-2 shadow-md flex items-center justify-center z-10"
                            style={{
                              left: fretSpaceCenter,
                              transform: 'translateX(-50%)',
                              top: '50%',
                              marginTop: '-6px'
                            }}
                          >
                            <span className="text-[10px] sm:text-xs text-white font-bold">
                              {getFingerNumber(stringNum, fret)}
                            </span>
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Fret numbers */}
          <div className="flex mt-2">
            <div className="w-6"></div>
            <div className="flex-1 flex">
              {Array.from({ length: fretSpan + 1 }, (_, i) => i).map((fret) => {
                const fretNumber = startingFret + fret;
                return (
                  <div
                    key={fret}
                    className="flex-1 text-center text-xs text-gray-500 font-medium"
                  >
                    {fretNumber === 25 ? '' : fretNumber}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Scale notes */}
        <div className="mt-3 text-center">
          <p className="text-xs text-gray-600">
{shape === 'shape1' ? (
              <span className="font-semibold text-amber-600">{selectedKey} Minor Pentatonic</span>
            ) : shape === 'shape2' ? (
              <span className="font-semibold text-amber-600">{(() => {
                const minorToMajorMap: { [key: string]: string } = {
                  'C': 'E♭', 'D': 'F', 'E': 'G', 'F': 'A♭', 'G': 'B♭', 'A': 'C', 'B': 'D',
                  'C#': 'E', 'D#': 'F#', 'F#': 'A', 'G#': 'B', 'A#': 'C#',
                  'D♭': 'F♭', 'E♭': 'G♭', 'G♭': 'B♭♭', 'A♭': 'C♭', 'B♭': 'D♭'
                };
                return minorToMajorMap[selectedKey] || 'C';
              })()} Major Pentatonic</span>
            ) : null}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-amber-800 mb-4">
          Beginner's Guide to Pentatonic Scales
        </h1>
        <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto mb-6">
          Master the 5 essential pentatonic scale shapes and learn how they connect across the fretboard. 
          Interactive diagrams show you exactly where to place your fingers in any key.
        </p>
        
        <div className="bg-amber-50 rounded-lg p-6 border border-amber-200 max-w-4xl mx-auto mb-8">
          <h2 className="text-lg font-semibold text-amber-800 mb-4">What Are Pentatonic Scales?</h2>
          <div className="text-sm text-gray-700 space-y-3">
            <p>
              <strong>Pentatonic scales</strong> are 5-note scales that sound great in almost any musical context. 
              They're called "penta" (five) + "tonic" (tones) because they use only 5 notes instead of the usual 7.
            </p>
            <p>
              <strong>Why learn pentatonic scales?</strong> They're the foundation of rock, blues, country, and pop guitar solos. 
              Because they only have 5 notes, they're easier to learn and harder to play "wrong" notes.
            </p>
            <p>
              <strong>The 5 shapes:</strong> Each shape shows the same scale pattern but in a different position on the fretboard. 
              Learning all 5 shapes lets you play the same scale anywhere on the neck.
            </p>
          </div>
        </div>
        
        <div className="bg-orange-50 rounded-lg p-6 border border-orange-200 max-w-4xl mx-auto mb-8">
          <h2 className="text-lg font-semibold text-orange-800 mb-4">Understanding Major vs Minor Pentatonic</h2>
          <div className="text-sm text-gray-700 space-y-3">
            <p>
              <strong>Key insight:</strong> Major and minor pentatonic scales use the exact same notes! The difference is which note you treat as "home base" in your playing. <em>Using A minor pentatonic as our example:</em>
            </p>
            <p>
              <strong className="text-orange-700">A Minor Pentatonic (Shape 1):</strong> When you emphasize the note A as your starting and ending point, these notes create a minor, bluesy sound. This is the most common scale for rock and blues solos.
            </p>
            <p>
              <strong className="text-orange-700">C Major Pentatonic (Shape 2):</strong> Using the same five notes but emphasizing C as your home base creates a brighter, more uplifting major sound. Perfect for country and pop music.
            </p>
            <p>
              <strong className="text-orange-700">The Other Shapes:</strong> Shapes 3, 4, and 5 give you the same notes in different fretboard positions. Master all five shapes and you can play pentatonic scales anywhere on the neck without having to shift hand positions.
            </p>
          </div>
        </div>
      </div>

      {/* Key Selection */}
      <div className="mb-8 key-selector">
        <h3 className="text-lg font-semibold text-center mb-4 text-gray-700">
          Select Minor Pentatonic Key
        </h3>
        <p className="text-sm text-gray-600 text-center mb-6 max-w-2xl mx-auto">
          Choose the root note for your minor pentatonic scale. The diagrams will show all 5 shapes for your selected key, 
          with the relative major pentatonic automatically calculated.
        </p>
        
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 max-w-4xl mx-auto">
          {/* Key selector */}
          <div className="grid grid-cols-12 gap-1 mb-4">
            {KEY_NOTES.map((noteData, index) => (
              <div key={index} className="text-center">
                <div className="text-xs text-gray-500 mb-1">
                  {noteData.fret}
                </div>
                <button
                  className={`w-full h-16 rounded-lg border-2 transition-all duration-200 flex flex-col items-center justify-center ${
                    selectedKey === noteData.note
                      ? 'bg-amber-600 text-white border-amber-600 shadow-md'
                      : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedKey(noteData.note)}
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
        </div>
      </div>

      {/* Octave Position Controls */}
      <div className="flex justify-center items-center gap-4 mb-8 octave-position-controls">
        <span className="text-sm text-gray-600">Fretboard Position:</span>
        <button
          className="px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium"
          onClick={() => setManualOctaveShift(prev => prev - 1)}
          disabled={manualOctaveShift <= -1}
        >
          ← Lower
        </button>
        <span className="text-sm font-medium text-gray-700 min-w-[80px] text-center">
          {manualOctaveShift === 0 ? 'Standard' : 
           manualOctaveShift > 0 ? `+${manualOctaveShift} Oct` : 
           `${manualOctaveShift} Oct`}
        </span>
        <button
          className="px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium"
          onClick={() => setManualOctaveShift(prev => prev + 1)}
          disabled={manualOctaveShift >= 1}
        >
          Higher →
        </button>
      </div>

      {/* All 5 Shapes */}
      <div className="mb-12 page-title-section">
        <h2 className="text-2xl font-bold text-amber-800 mb-6 text-center">
          All 5 shapes for {selectedKey} Minor/{(() => {
            const minorToMajorMap: { [key: string]: string } = {
              'C': 'E♭', 'D': 'F', 'E': 'G', 'F': 'A♭', 'G': 'B♭', 'A': 'C', 'B': 'D',
              'C#': 'E', 'D#': 'F#', 'F#': 'A', 'G#': 'B', 'A#': 'C#',
              'D♭': 'F♭', 'E♭': 'G♭', 'G♭': 'B♭♭', 'A♭': 'C♭', 'B♭': 'D♭'
            };
            return minorToMajorMap[selectedKey] || 'C';
          })()} Major Pentatonic
        </h2>
        <p className="text-gray-600 text-center mb-8 max-w-3xl mx-auto">
          These 5 shapes show the same {selectedKey} pentatonic scale in different positions. 
          Notice how each shape connects to the ones next to it - they share notes at the boundaries.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-6 shape-section">
          {SCALE_SHAPES.map((shape, index) => (
            <div key={shape} className="shape-section">
              <FretboardDiagram
                shape={shape}
                title={`Shape ${index + 1}`}
                description={PENTATONIC_PATTERNS[shape].description}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Educational Content */}
      <div className="space-y-8 max-w-4xl mx-auto blog-content">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 major-section">
          <h2 className="text-2xl font-bold text-amber-800 mb-4">How to Use These Shapes</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Recommended Learning Order</h3>
              <ol className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-amber-600 font-bold mr-2">1.</span>
                  <span><strong>Shape 1:</strong> Start here - it's the most common in rock and blues</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-600 font-bold mr-2">2.</span>
                  <span><strong>Shape 2:</strong> Learn next since it's neighboring to Shape 1 and it's the major pentatonic</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-600 font-bold mr-2">3.</span>
                  <span><strong>Shape 5:</strong> Also neighbors Shape 1, completing the core trio</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-600 font-bold mr-2">4.</span>
                  <span><strong>Shape 4:</strong> A commonly used shape worth learning fourth</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-600 font-bold mr-2">5.</span>
                  <span><strong>Shape 3:</strong> Finally, this connects Shapes 2 and 4</span>
                </li>
              </ol>
              <p className="text-sm text-gray-500 mt-3 italic">
                Of course, you can learn in whatever order makes most sense or is easiest for you.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Practice Tips</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">•</span>
                  <span>Learn one shape at a time, starting with Shape 1</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">•</span>
                  <span>Practice each shape in different keys to build flexibility</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">•</span>
                  <span>Notice how shapes connect - they share notes at the boundaries</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">•</span>
                  <span>Use these shapes as the foundation for your solos</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-600 mr-2">•</span>
                  <span><strong>Fingering note:</strong> Shapes 2 and 5 use fingers 2 and 4. If it's more comfortable, you can use fingers 1 and 3. However, be aware that the 2 and 4 fingering has the potential to be more efficient</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Shape Connection and Repetition */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 major-section">
          <h2 className="text-2xl font-bold text-amber-800 mb-4">How the Shapes Connect</h2>
          
          <div className="space-y-4 text-gray-600">
            <p className="text-lg leading-relaxed">
              The 5 pentatonic shapes form a <span className="text-amber-600 font-semibold">continuous pattern</span> that repeats across the entire fretboard. 
              Understanding this connection is key to unlocking the full potential of the pentatonic scale.
            </p>
            
            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">The Pattern Repeats</h3>
              <p className="mb-3">
                After Shape 5, the pattern starts over with Shape 1. This means the shapes cycle continuously: 
                <span className="font-mono text-amber-700 bg-amber-100 px-2 py-1 rounded mx-1">1 → 2 → 3 → 4 → 5 → 1 → 2...</span>
              </p>
              
              <p>
                <strong>Here's the magic:</strong> The <span className="text-amber-600 font-semibold">first notes</span> of Shape 1 
                                (the leftmost notes on each string) are played on the <span className="text-amber-600 font-semibold">exact same frets</span> as the <span className="text-amber-600 font-semibold">last notes</span> of Shape 5 (the rightmost notes on each string).
              </p>
            </div>
          </div>
        </div>

        {/* Scale Explorer Link */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg shadow-sm border border-amber-200 p-6 major-section">
          <h2 className="text-2xl font-bold text-amber-800 mb-4">Explore More Scales</h2>
          <p className="text-gray-600 mb-4 text-lg">
            For full fretboard diagrams of pentatonic scales and many more types of scales, check out our interactive Scale Explorer tool.
          </p>
          <a 
            href="/blog/scale-explorer-tool" 
            className="inline-flex items-center px-6 py-3 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            Explore Scale Explorer Tool
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>

      </div>
    </div>
  );
}

export default function PentatonicScalesGuide() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-8 text-center">Loading...</div>}>
      <PentatonicScalesContent />
    </Suspense>
  );
} 