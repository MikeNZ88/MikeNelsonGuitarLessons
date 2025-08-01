'use client';

import Link from 'next/link';
import { ArrowLeft, Music, Award, Clock, Target, Guitar, Zap } from 'lucide-react';
import { useState } from 'react';
import AlphaTabPlayerCDN from '@/components/AlphaTabPlayerCDN';

// Type definitions
interface ChordData {
  GBE: {
    E: number[];
    B: number[];
    G: number[];
  };
}

interface KeyData {
  key: string;
  root: string;
  boxes: {
    [chord: string]: ChordData;
  };
}

interface BBKingBoxData {
  [key: string]: KeyData;
}

// Function to get note name for a given string and fret
function getNoteName(stringName: string, fret: number): string {
  const openNotes: { [key: string]: string } = {
    'E': 'E', // High E
    'B': 'B',
    'G': 'G',
    'D': 'D',
    'A': 'A'
  };
  
  // Use flat naming for minor thirds and other common flat notes
  const noteNames = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];
  const openNote = openNotes[stringName] || 'E'; // Default to E for low E string
  const openNoteIndex = noteNames.indexOf(openNote);
  const noteIndex = (openNoteIndex + fret) % 12;
  return noteNames[noteIndex];
}

// BB King Box positions for different keys
const bbKingBoxData: BBKingBoxData = {
  A: {
    key: 'A',
    root: 'A',
    boxes: {
      A: { 
        GBE: { E: [10, 12], B: [10, 12, 13], G: [11] } // A root on B string fret 10
      }
    }
  },
  C: {
    key: 'C',
    root: 'C',
    boxes: {
      C: { 
        GBE: { E: [1, 3], B: [1, 3, 4], G: [2] } // C root on B string fret 1, minor third Eb on B string fret 4
      }
    }
  },
  D: {
    key: 'D',
    root: 'D',
    boxes: {
      D: { 
        GBE: { E: [3, 5], B: [3, 5, 6], G: [4] } // D root on B string fret 3, minor third F on B string fret 6
      }
    }
  },
  E: {
    key: 'E',
    root: 'E',
    boxes: {
      E: { 
        GBE: { E: [5, 7], B: [5, 7, 8], G: [6] } // E root on B string fret 5, minor third G on B string fret 8
      }
    }
  },
  G: {
    key: 'G',
    root: 'G',
    boxes: {
      G: { 
        GBE: { E: [8, 10], B: [8, 10, 11], G: [9] } // G root on B string fret 8, minor third Bb on B string fret 11
      }
    }
  }
};

// Component for the BB King Box fretboard diagram
function BBKingBoxDiagram({ keyData, selectedChord, showBentNotes = false }: { 
  keyData: KeyData, 
  selectedChord: string,
  showBentNotes?: boolean
}) {
  const chordData = keyData.boxes[selectedChord];
  
  // Get all fret positions used in this chord
  const allFrets = new Set<number>();
  chordData.GBE.E.forEach(fret => allFrets.add(fret));
  chordData.GBE.B.forEach(fret => allFrets.add(fret));
  chordData.GBE.G.forEach(fret => allFrets.add(fret));

  
  const fretNumbers = Array.from(allFrets).sort((a, b) => a - b);
  
  // Start at the root note fret (lowest B string fret) and show 4 frets
  const rootFret = Math.min(...chordData.GBE.B); // Root note is on B string
  const startFret = rootFret;
  const endFret = rootFret + 3; // Show 4 frets total
  
  const displayFrets: number[] = [];
  for (let i = startFret; i <= endFret; i++) {
    displayFrets.push(i);
  }
  
  const strings = ['E', 'B', 'G', 'D', 'A', 'E'];



  return (
    <div className="text-center">
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-amber-900">
          Key of {keyData.key} - {selectedChord} Box
        </h3>
        <p className="text-sm text-gray-600">
          BB King Box Pattern on G, B, E strings
        </p>
      </div>
      
      <div className="flex justify-center">
        <div className="fretboard-diagram">
          {/* Fret numbers */}
          <div className="flex text-xs text-gray-600 mb-1">
            <div className="w-16"></div>
            {displayFrets.map(fret => (
              <div key={fret} className="w-8 text-center font-medium">
                {fret}
              </div>
            ))}
          </div>
          
          {/* Strings - Display from low E to high E (bottom to top) */}
          {strings.map((stringName, stringIndex) => (
            <div key={stringIndex} className="flex">
              {/* String name */}
              <div className="w-16 h-8 border-r border-gray-300 flex items-center justify-center text-xs text-gray-500 font-medium">
                {stringName}
              </div>
              
              {/* Fret positions */}
              {displayFrets.map(fret => {
                const isHighlighted = 
                  (stringName === 'E' && stringIndex === 0 && chordData.GBE.E.includes(fret)) || // High E (index 0)
                  (stringName === 'B' && stringIndex === 1 && chordData.GBE.B.includes(fret)) || // B string (index 1)
                  (stringName === 'G' && stringIndex === 2 && chordData.GBE.G.includes(fret));   // G string (index 2)
                

                
                return (
                  <div 
                    key={fret} 
                    className={`w-8 h-8 border-r border-gray-300 flex items-center justify-center ${
                      isHighlighted 
                        ? 'bg-amber-100 rounded-full border-2 border-amber-400' 
                        : ''
                    }`}
                  >
                    {isHighlighted && (
                      <div className="w-4 h-4 bg-amber-500 rounded-full"></div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      
      {/* Legend */}
      <div className="flex justify-center gap-4 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-amber-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">R</span>
          </div>
          <span className="text-gray-700">Root</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-amber-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">3</span>
          </div>
          <span className="text-gray-700">Major 3rd</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-amber-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">5</span>
          </div>
          <span className="text-gray-700">Perfect 5th</span>
        </div>
      </div>
    </div>
  );
}

function BBKingBoxesDisplay({ keyData, showBentNotes = false, setShowBentNotes }: { keyData: KeyData, showBentNotes?: boolean, setShowBentNotes?: (value: boolean) => void }) {
  const chords = Object.keys(keyData.boxes);
  const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500'];
  
  return (
    <div className="space-y-8">
      {chords.map((chord, index) => {
        const chordData = keyData.boxes[chord];
        const color = colors[index];
        
        // Get all fret positions for this chord
        const allFrets = new Set<number>();
        chordData.GBE.E.forEach(fret => allFrets.add(fret));
        chordData.GBE.B.forEach(fret => allFrets.add(fret));
        chordData.GBE.G.forEach(fret => allFrets.add(fret));
        
        const fretNumbers = Array.from(allFrets).sort((a, b) => a - b);
        
        // Show a wider range of frets to include all patterns
        const minFret = Math.min(...fretNumbers);
        const maxFret = Math.max(...fretNumbers);
        const startFret = Math.max(0, minFret - 1);
        
        // Calculate bent notes to determine the maximum fret needed
        const getBentNotes = () => {
          // Calculate bent notes based on key and chord
          const keyOffset = {
            'A': 0,
            'C': -9,
            'D': -7,
            'E': -5,
            'G': -2
          }[keyData.key] || 0;
          
          if (chord === keyData.root) { // I chord
            return {
              E: [11 + keyOffset, 14 + keyOffset, 15 + keyOffset], // b5, 6, b7
              B: [14 + keyOffset], // 3
              G: [12 + keyOffset] // b7
            };
          } else if (chord === (keyData.key === 'A' ? 'D' : keyData.key === 'C' ? 'F' : keyData.key === 'D' ? 'G' : keyData.key === 'E' ? 'A' : 'C')) { // IV chord
            return {
              E: [13 + keyOffset, 14 + keyOffset], // b3, 3
              B: [15 + keyOffset], // 1
              G: [14 + keyOffset] // 5
            };
                                } else { // V chord - FIXED
            return {
              E: [], // No bent notes on E string
              B: [], // No bent notes on B string
              G: [12 + keyOffset, 13 + keyOffset] // b3, 3
            };
          }
        };
        
        const bentNotes = getBentNotes();
        
        // Calculate the maximum fret needed including bent notes
        const allBentFrets = [
          ...bentNotes.E,
          ...bentNotes.B,
          ...bentNotes.G
        ];
        const maxBentFret = allBentFrets.length > 0 ? Math.max(...allBentFrets) : maxFret;
        const endFret = Math.max(maxFret + 1, maxBentFret + 1);
        
        const displayFrets: number[] = [];
        for (let i = startFret; i <= endFret; i++) {
          displayFrets.push(i);
        }
        
        const strings = ['E', 'B', 'G', 'D', 'A', 'E'];
        


        return (
          <div key={chord} className="bg-white border border-gray-300 rounded-lg p-6 shadow-lg">
            <div className="text-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">
                {chord} BB Box
              </h3>
              <p className="text-sm text-gray-600">
                Root note on B string at fret {Math.min(...chordData.GBE.B)}
              </p>
            </div>
            
            <div className="flex justify-center">
              <div className="fretboard-diagram">
                {/* Fret numbers */}
                <div className="flex text-xs text-gray-600 mb-1">
                  <div className="w-16"></div>
                  {displayFrets.map(fret => (
                    <div key={fret} className="w-8 text-center font-medium">
                      {fret}
                    </div>
                  ))}
                </div>
                
                {/* Strings */}
                {strings.map((stringName, stringIndex) => (
                  <div key={stringIndex} className="flex">
                    {/* String name */}
                    <div className="w-16 h-8 border-r border-gray-300 flex items-center justify-center text-xs text-gray-500 font-medium">
                      {stringName}
                    </div>
                    
                    {/* Fret positions */}
                    {displayFrets.map(fret => {
                      const isHighlighted = 
                        (stringName === 'E' && stringIndex === 0 && chordData.GBE.E.includes(fret)) ||
                        (stringName === 'B' && stringIndex === 1 && chordData.GBE.B.includes(fret)) ||
                        (stringName === 'G' && stringIndex === 2 && chordData.GBE.G.includes(fret));
                      

                      
                      return (
                        <div 
                          key={fret} 
                          className={`w-8 h-8 border-r border-gray-300 flex items-center justify-center ${
                            isHighlighted 
                              ? 'bg-gray-100 rounded-full border-2 border-gray-400' 
                              : ''
                          }`}
                        >
                          {isHighlighted && (
                            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs font-bold">
                                {getNoteName(stringName, fret)}
                              </span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
            

            
            {/* Chord-Scale Relationship Diagrams */}
            <div className="mt-6 space-y-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-3 text-center">Chord-Scale Relationships</h4>
              <p className="text-gray-600 text-center mb-4">
                These diagrams show how each note in the BB King Box relates to the three chords in the key. 
                The numbers represent scale degrees relative to each chord, helping you understand which notes 
                work best over each chord in a blues progression. The notes in the Box have a different relationship to each chord - what sounds like a root note over the I chord becomes a different scale degree over the IV and V chords.
              </p>
              <p className="text-gray-600 text-center mb-4">
                The BB King Box is based on the I chord in the progression. To find each box, find the root note of the I chord on the B string. For example, for the key of A, find A on the 10th fret of the B string - that's where the BB King Box is for that key.
              </p>
              <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-500 mb-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <h5 className="font-semibold text-green-700 mb-1">Notes to emphasize:</h5>
                    <p className="text-gray-700">1, 3, 5, 6, ♭7</p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-orange-700 mb-1">Notes to use as passing tones:</h5>
                    <p className="text-gray-700">♭3, 4</p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-red-700 mb-1">Notes to avoid:</h5>
                    <p className="text-gray-700">♭6 (except when bending from ♭6)</p>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-center mb-4">
                When you click "Show Bent Notes" below, the orange circles with arrows indicate notes that can be reached by bending from the main box notes. These bent notes add expressive possibilities and are commonly used in blues playing to create tension and emotion.
              </p>
              
              {/* Show Bent Notes Button */}
              {setShowBentNotes && (
                <div className="flex justify-center mb-6">
                  <button
                    onClick={() => setShowBentNotes(!showBentNotes)}
                    className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                      showBentNotes
                        ? 'bg-amber-600 text-white'
                        : 'bg-amber-200 text-amber-800 hover:bg-amber-300'
                    }`}
                  >
                    {showBentNotes ? 'Hide Bent Notes' : 'Show Bent Notes'}
                  </button>
                </div>
              )}
              
                             {/* 1 Chord Diagram */}
               <div className="bg-white border border-gray-300 rounded-lg p-4">
                 <h5 className="font-bold text-blue-600 mb-3 text-center">{keyData.root} Chord (I)</h5>
                 <div className="flex justify-center">
                   <div className="fretboard-diagram">
                     {/* Fret numbers */}
                     <div className="flex text-xs text-gray-600 mb-1">
                       <div className="w-16"></div>
                       {displayFrets.map(fret => (
                         <div key={fret} className="w-8 text-center font-medium">
                           {fret}
                         </div>
                       ))}
                     </div>
                     
                     {/* Strings */}
                     {strings.map((stringName, stringIndex) => (
                       <div key={stringIndex} className="flex">
                         {/* String name */}
                         <div className="w-16 h-8 border-r border-gray-300 flex items-center justify-center text-xs text-gray-500 font-medium">
                           {stringName}
                         </div>
                         
                         {/* Fret positions */}
                         {displayFrets.map(fret => {
                           const isHighlighted = 
                             (stringName === 'E' && stringIndex === 0 && chordData.GBE.E.includes(fret)) ||
                             (stringName === 'B' && stringIndex === 1 && chordData.GBE.B.includes(fret)) ||
                             (stringName === 'G' && stringIndex === 2 && chordData.GBE.G.includes(fret));
                           
                           // Get scale degree for 1 chord
                           let scaleDegree = '';
                           if (isHighlighted) {
                             if (stringName === 'E' && stringIndex === 0) {
                               scaleDegree = fret === Math.min(...chordData.GBE.E) ? '4' : '5';
                             } else if (stringName === 'B' && stringIndex === 1) {
                               const bFrets = chordData.GBE.B.sort((a, b) => a - b);
                               if (fret === bFrets[0]) scaleDegree = '1';
                               else if (fret === bFrets[1]) scaleDegree = '2';
                               else scaleDegree = '♭3';
                             } else if (stringName === 'G' && stringIndex === 2) {
                               scaleDegree = '6';
                             }
                           }
                           
                           // Calculate bent notes for I chord
                           const keyOffset = {
                             'A': 0,
                             'C': -9,
                             'D': -7,
                             'E': -5,
                             'G': -2
                           }[keyData.key] || 0;
                           
                           const bentNotes = {
                             E: [14 + keyOffset, 15 + keyOffset], // 6, b7
                             B: [14 + keyOffset], // 3
                             G: [12 + keyOffset] // b7
                           };
                           
                           const isBentNote = showBentNotes && (
                             (stringName === 'E' && stringIndex === 0 && bentNotes.E.includes(fret)) ||
                             (stringName === 'B' && stringIndex === 1 && bentNotes.B.includes(fret)) ||
                             (stringName === 'G' && stringIndex === 2 && bentNotes.G.includes(fret))
                           );
                           
                           // Get scale degree for bent notes
                           let bentScaleDegree = '';
                           if (isBentNote) {
                             if (stringName === 'E' && stringIndex === 0) {
                               if (fret === 14 + keyOffset) bentScaleDegree = '6';
                               else if (fret === 15 + keyOffset) bentScaleDegree = '♭7';
                             } else if (stringName === 'B' && stringIndex === 1) {
                               bentScaleDegree = '3';
                             } else if (stringName === 'G' && stringIndex === 2) {
                               bentScaleDegree = '♭7';
                             }
                           }
                           
                           return (
                             <div 
                               key={fret} 
                               className={`w-8 h-8 border-r border-gray-300 flex items-center justify-center ${
                                 isHighlighted 
                                   ? 'bg-gray-100 rounded-full border-2 border-gray-400' 
                                   : isBentNote
                                   ? 'bg-orange-100 rounded-full border-2 border-orange-400'
                                   : ''
                               }`}
                             >
                               {isHighlighted && (
                                 <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                                   <span className="text-white text-xs font-bold">
                                     {scaleDegree}
                                   </span>
                                 </div>
                               )}
                               {isBentNote && (
                                 <div className="w-4 h-4 bg-orange-400 rounded-full flex items-center justify-center">
                                   <span className="text-white text-xs font-bold">
                                     {bentScaleDegree}
                                   </span>
                                 </div>
                               )}
                             </div>
                           );
                         })}
                       </div>
                     ))}
                   </div>
                 </div>
                 

               </div>
              
              {/* 4 Chord Diagram */}
              <div className="bg-white border border-gray-300 rounded-lg p-4">
                                 <h5 className="font-bold text-green-600 mb-3 text-center">{keyData.root === 'A' ? 'D' : keyData.root === 'C' ? 'F' : keyData.root === 'D' ? 'G' : keyData.root === 'E' ? 'A' : 'C'} Chord (IV)</h5>
                <div className="flex justify-center">
                  <div className="fretboard-diagram">
                    {/* Fret numbers */}
                    <div className="flex text-xs text-gray-600 mb-1">
                      <div className="w-16"></div>
                      {displayFrets.map(fret => (
                        <div key={fret} className="w-8 text-center font-medium">
                          {fret}
                        </div>
                      ))}
                    </div>
                    
                    {/* Strings */}
                    {strings.map((stringName, stringIndex) => (
                      <div key={stringIndex} className="flex">
                        {/* String name */}
                        <div className="w-16 h-8 border-r border-gray-300 flex items-center justify-center text-xs text-gray-500 font-medium">
                          {stringName}
                        </div>
                        
                        {/* Fret positions */}
                        {displayFrets.map(fret => {
                          const isHighlighted = 
                            (stringName === 'E' && stringIndex === 0 && chordData.GBE.E.includes(fret)) ||
                            (stringName === 'B' && stringIndex === 1 && chordData.GBE.B.includes(fret)) ||
                            (stringName === 'G' && stringIndex === 2 && chordData.GBE.G.includes(fret));
                          
                                                     // Get scale degree for 4 chord
                           let scaleDegree = '';
                           if (isHighlighted) {
                             if (stringName === 'E' && stringIndex === 0) {
                               scaleDegree = fret === Math.min(...chordData.GBE.E) ? '1' : '2';
                             } else if (stringName === 'B' && stringIndex === 1) {
                               const bFrets = chordData.GBE.B.sort((a, b) => a - b);
                               if (fret === bFrets[0]) scaleDegree = '5';
                               else if (fret === bFrets[1]) scaleDegree = '6';
                               else scaleDegree = '♭7';
                             } else if (stringName === 'G' && stringIndex === 2) {
                               scaleDegree = '3';
                             }
                           }
                           
                           // Calculate bent notes for IV chord
                           const keyOffset = {
                             'A': 0,
                             'C': -9,
                             'D': -7,
                             'E': -5,
                             'G': -2
                           }[keyData.key] || 0;
                           
                           const bentNotes = {
                             E: [13 + keyOffset, 14 + keyOffset], // b3, 3
                             B: [15 + keyOffset], // 1
                             G: [14 + keyOffset] // 5
                           };
                           
                           const isBentNote = showBentNotes && (
                             (stringName === 'E' && stringIndex === 0 && bentNotes.E.includes(fret)) ||
                             (stringName === 'B' && stringIndex === 1 && bentNotes.B.includes(fret)) ||
                             (stringName === 'G' && stringIndex === 2 && bentNotes.G.includes(fret))
                           );
                           
                           // Get scale degree for bent notes
                           let bentScaleDegree = '';
                           if (isBentNote) {
                             if (stringName === 'E' && stringIndex === 0) {
                               if (fret === 13 + keyOffset) bentScaleDegree = '♭3';
                               else if (fret === 14 + keyOffset) bentScaleDegree = '3';
                             } else if (stringName === 'B' && stringIndex === 1) {
                               bentScaleDegree = '1';
                             } else if (stringName === 'G' && stringIndex === 2) {
                               bentScaleDegree = '5';
                             }
                           }
                          
                          return (
                            <div 
                              key={fret} 
                              className={`w-8 h-8 border-r border-gray-300 flex items-center justify-center ${
                                isHighlighted 
                                  ? 'bg-gray-100 rounded-full border-2 border-gray-400' 
                                  : isBentNote
                                  ? 'bg-orange-100 rounded-full border-2 border-orange-400'
                                  : ''
                              }`}
                            >
                              {isHighlighted && (
                                <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                                  <span className="text-white text-xs font-bold">
                                    {scaleDegree}
                                  </span>
                                </div>
                              )}
                              {isBentNote && (
                                <div className="w-4 h-4 bg-orange-400 rounded-full flex items-center justify-center">
                                  <span className="text-white text-xs font-bold">
                                    {bentScaleDegree}
                                  </span>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
                

              </div>
              
              {/* 5 Chord Diagram */}
              <div className="bg-white border border-gray-300 rounded-lg p-4">
                <h5 className="font-bold text-purple-600 mb-3 text-center">{keyData.root === 'A' ? 'E' : keyData.root === 'C' ? 'G' : keyData.root === 'D' ? 'A' : keyData.root === 'E' ? 'B' : 'D'} Chord (V)</h5>
                <div className="flex justify-center">
                  <div className="fretboard-diagram">
                    {/* Fret numbers */}
                    <div className="flex text-xs text-gray-600 mb-1">
                      <div className="w-16"></div>
                      {displayFrets.map(fret => (
                        <div key={fret} className="w-8 text-center font-medium">
                          {fret}
                        </div>
                      ))}
                    </div>
                    
                    {/* Strings */}
                    {strings.map((stringName, stringIndex) => (
                      <div key={stringIndex} className="flex">
                        {/* String name */}
                        <div className="w-16 h-8 border-r border-gray-300 flex items-center justify-center text-xs text-gray-500 font-medium">
                          {stringName}
                        </div>
                        
                        {/* Fret positions */}
                        {displayFrets.map(fret => {
                          const isHighlighted = 
                            (stringName === 'E' && stringIndex === 0 && chordData.GBE.E.includes(fret)) ||
                            (stringName === 'B' && stringIndex === 1 && chordData.GBE.B.includes(fret)) ||
                            (stringName === 'G' && stringIndex === 2 && chordData.GBE.G.includes(fret));
                          
                                                     // Get scale degree for 5 chord
                           let scaleDegree = '';
                           if (isHighlighted) {
                             if (stringName === 'E' && stringIndex === 0) {
                               scaleDegree = fret === Math.min(...chordData.GBE.E) ? '♭7' : '1';
                             } else if (stringName === 'B' && stringIndex === 1) {
                               const bFrets = chordData.GBE.B.sort((a, b) => a - b);
                               if (fret === bFrets[0]) scaleDegree = '4';
                               else if (fret === bFrets[1]) scaleDegree = '5';
                               else scaleDegree = '♭6';
                             } else if (stringName === 'G' && stringIndex === 2) {
                               scaleDegree = '2';
                             }
                           }
                           
                           // Calculate bent notes for V chord
                           const keyOffset = {
                             'A': 0,
                             'C': -9,
                             'D': -7,
                             'E': -5,
                             'G': -2
                           }[keyData.key] || 0;
                           
                           const bentNotes = {
                             E: [14 + keyOffset, 15 + keyOffset], // 2, b3
                             B: [14 + keyOffset, 15 + keyOffset], // 6, b7
                             G: [12 + keyOffset, 13 + keyOffset] // b3, 3
                           };
                           
                           const isBentNote = showBentNotes && (
                             (stringName === 'E' && stringIndex === 0 && bentNotes.E.includes(fret)) ||
                             (stringName === 'B' && stringIndex === 1 && bentNotes.B.includes(fret)) ||
                             (stringName === 'G' && stringIndex === 2 && bentNotes.G.includes(fret))
                           );
                           
                           // Get scale degree for bent notes
                           let bentScaleDegree = '';
                           if (isBentNote) {
                             if (stringName === 'E' && stringIndex === 0) {
                               if (fret === 14 + keyOffset) bentScaleDegree = '2';
                               else if (fret === 15 + keyOffset) bentScaleDegree = '♭3';
                             } else if (stringName === 'B' && stringIndex === 1) {
                               if (fret === 14 + keyOffset) bentScaleDegree = '6';
                               else if (fret === 15 + keyOffset) bentScaleDegree = '♭7';
                             } else if (stringName === 'G' && stringIndex === 2) {
                               if (fret === 12 + keyOffset) bentScaleDegree = '♭3';
                               else if (fret === 13 + keyOffset) bentScaleDegree = '3';
                             }
                           }
                          
                          return (
                            <div 
                              key={fret} 
                              className={`w-8 h-8 border-r border-gray-300 flex items-center justify-center ${
                                isHighlighted 
                                  ? 'bg-gray-100 rounded-full border-2 border-gray-400' 
                                  : isBentNote
                                  ? 'bg-orange-100 rounded-full border-2 border-orange-400'
                                  : ''
                              }`}
                            >
                              {isHighlighted && (
                                <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                                  scaleDegree === '♭6' ? 'bg-red-500' : 'bg-purple-500'
                                }`}>
                                  <span className="text-white text-xs font-bold">
                                    {scaleDegree}
                                  </span>
                                </div>
                              )}
                              {isBentNote && (
                                <div className="w-4 h-4 bg-orange-400 rounded-full flex items-center justify-center">
                                  <span className="text-white text-xs font-bold">
                                    {bentScaleDegree}
                                  </span>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
                                 <div className="text-center mt-2">
                   <span className="text-red-500 text-xs">♭6 should be avoided on the 5 chord, but it can be bent to a 6 (½ bend) or a ♭7 (whole bend)</span>
                 </div>
                 

               </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function BBKingBoxDifferentKeys() {
  const [selectedKey, setSelectedKey] = useState('A');
  const [showBentNotes, setShowBentNotes] = useState(false);

  const currentKeyData = bbKingBoxData[selectedKey as keyof typeof bbKingBoxData];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      {/* Navigation */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Link 
            href="/blog" 
            className="inline-flex items-center text-amber-600 hover:text-amber-700 font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-800 to-orange-700 text-white py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-4">
              <div className="flex items-center">
                <Music className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-amber-200" />
                <span className="text-amber-200 font-medium text-sm sm:text-base">Intermediate</span>
              </div>
              <span className="text-amber-200 hidden sm:inline">•</span>
              <span className="text-amber-200 text-sm sm:text-base">15 min read</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              BB King Box in Different Keys: Complete Blues Guitar Guide
            </h1>
            <p className="text-lg sm:text-xl text-amber-200 mb-6 sm:mb-8 px-2">
              Master the iconic BB King box pattern in keys A, C, D, E, and G with interactive fretboard diagrams and tabs
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
              <div className="flex items-center bg-amber-600 px-3 py-1 rounded-full">
                <Target className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="text-xs sm:text-sm">Interactive</span>
              </div>
              <div className="flex items-center bg-orange-600 px-3 py-1 rounded-full">
                <Guitar className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="text-xs sm:text-sm">Blues Guitar</span>
              </div>
              <div className="flex items-center bg-amber-700 px-3 py-1 rounded-full">
                <Zap className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="text-xs sm:text-sm">Moveable Patterns</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            


            {/* Introduction Section */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What is the BB King Box?</h2>
              <div className="prose max-w-none text-gray-700 space-y-4">
                <p>
                  The BB King Box is one of the most iconic and versatile patterns in blues guitar. Named after the legendary B.B. King, this pattern focuses on the top three strings (G, B, E) and creates a compact, moveable shape that works beautifully over blues progressions.
                </p>
                <p>
                  <strong>Key Features:</strong>
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Compact Design:</strong> Uses only 6 notes across 3 strings, making it easy to navigate</li>
                  <li><strong>Moveable Pattern:</strong> The same shape works in any key - just move it to the appropriate fret</li>
                  <li><strong>Blues-Friendly:</strong> Contains the essential blues notes: root, 2nd, minor 3rd, major 3rd, 5th, and 6th</li>
                  <li><strong>Bend-Friendly:</strong> Perfect for classic blues bends and vibrato techniques</li>
                </ul>
                <p>
                  The pattern gets its name because B.B. King used this box extensively in his solos, particularly in the key of A. However, the beauty of this pattern is that it's completely moveable - you can use the same shape in any key by simply shifting it to the appropriate fret position.
                </p>
              </div>
            </div>

            {/* How to Use Section */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">How to Use the BB King Box</h2>
              <div className="prose max-w-none text-gray-700 space-y-4">
                <p>
                  BB King's signature approach was to use <strong>one box position throughout the entire 12-bar blues progression</strong>. 
                  This creates a cohesive, melodic sound that flows naturally across all chord changes.
                </p>
                <div className="bg-amber-50 p-6 rounded-lg border-l-4 border-amber-500">
                  <h3 className="font-bold text-amber-800 mb-3">The BB King Method</h3>
                  <p className="text-sm mb-3">
                    Rather than changing positions for each chord, BB King would stay in the same box and let the chord changes underneath 
                    create the harmonic movement. This approach makes the same notes take on different roles:
                  </p>
                  <ul className="text-sm space-y-1 ml-4">
                    <li>• The same notes take on different harmonic roles as the chords change underneath</li>
                    <li>• This creates natural tension and resolution throughout the progression</li>
                    <li>• The box provides a consistent melodic framework across all chord changes</li>
                  </ul>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg">
                  <h3 className="font-bold text-amber-800 mb-2">Alternative Approach</h3>
                  <p className="text-sm">
                    While you <em>can</em> use different box positions for each chord (I, IV, V), this isn't how BB King typically played. 
                    The single-box approach is what gives the BB King style its distinctive, flowing character and makes it easier to develop 
                    melodic phrases that span the entire progression.
                  </p>
                </div>
              </div>
            </div>

            {/* String Bending Technique Section */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">String Bending Technique</h2>
              <div className="prose max-w-none text-gray-700 space-y-4">
                <p>
                  String bending is essential to the BB King style. Mastering proper bending technique will bring your blues playing to life.
                </p>
                
                <div className="bg-amber-50 p-6 rounded-lg border-l-4 border-amber-500">
                  <h3 className="font-bold text-amber-800 mb-3">Understanding Bend Amounts</h3>
                  <div className="space-y-2 text-sm">
                    <p>• <strong>½ bend:</strong> Raises the pitch 1 fret higher</p>
                    <p>• <strong>Full bend:</strong> Raises the pitch 2 frets higher</p>
                    <p>• <strong>1½ bend:</strong> Raises the pitch 3 frets higher</p>
                  </div>
                  <p className="text-sm mt-3">
                    <strong>Example:</strong> Bending from a 5 to a 6 requires a full bend because there's a 2-fret difference between these scale degrees.
                  </p>
                </div>

                <div className="bg-amber-50 p-6 rounded-lg border-l-4 border-amber-500">
                  <h3 className="font-bold text-amber-800 mb-3">Practice Method</h3>
                  <div className="space-y-3 text-sm">
                    <p><strong>Step 1:</strong> Find and play the target note (where you want the bend to end up)</p>
                    <p><strong>Step 2:</strong> Move to the lower starting note (the note you'll bend from)</p>
                    <p><strong>Step 3:</strong> Bend the starting note until it sounds identical to the target note</p>
                    <p><strong>Step 4:</strong> Practice this repeatedly until you can hit the target pitch consistently</p>
                  </div>
                </div>

                <div className="bg-amber-50 p-6 rounded-lg border-l-4 border-amber-500">
                  <h3 className="font-bold text-amber-800 mb-3">Essential Blues Bends</h3>
                  <div className="space-y-2 text-sm">
                    <p>• <strong>2nd to minor 3rd (♭3):</strong> A classic ½ bend that adds bluesy character</p>
                    <p>• <strong>Minor 3rd (♭3) to major 3rd (3):</strong> Another essential ½ bend for blues expression</p>
                    <p>• <strong>5th to 6th:</strong> A full bend that adds sweetness and resolution</p>
                    <p>• <strong>6th to minor 7th (♭7):</strong> A ½ bend that creates tension and blues character</p>
                    <p>• <strong>5th to minor 7th (♭7):</strong> A 1½ bend that creates dramatic tension and blues character</p>
                  </div>
                  <p className="text-sm mt-3 italic">
                    These bends are the foundation of BB King's expressive style and should be practiced regularly.
                  </p>
                </div>
              </div>
            </div>



            {/* BB King Boxes Display */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Key of {selectedKey}
              </h2>
              
              {/* Key Selector */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Select a Key:</h3>
                <div className="flex flex-wrap gap-2">
                  {Object.keys(bbKingBoxData).map(key => (
                    <button
                      key={key}
                      onClick={() => setSelectedKey(key)}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        selectedKey === key
                          ? 'bg-amber-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      Key of {key}
                    </button>
                  ))}
                </div>
              </div>
              
              <BBKingBoxesDisplay keyData={currentKeyData} showBentNotes={showBentNotes} setShowBentNotes={setShowBentNotes} />
            </div>

            {/* Interactive Tab Player */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Practice with Interactive Tabs</h2>
              <p className="text-gray-700 mb-6">
                Use the interactive tab player below to practice BB King Box exercises. All exercises include the same licks using exclusively the BB King Box. There is an example for keys of A, E and G.
              </p>
              <p className="text-gray-600 text-sm italic mb-6">
                Note: These practice phrases use the BB King Box pattern but do not necessarily sound like BB King's playing style. They are designed to help you become comfortable with the box pattern and develop your own musical voice.
              </p>
              <AlphaTabPlayerCDN />
            </div>

            {/* Next Steps Section */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Next Steps in Your Blues Journey</h2>
              <div className="prose max-w-none text-gray-700 space-y-4">
                <p>
                  Now that you've learned the BB King Box in different keys, here are some ways to continue developing your blues guitar skills:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Link href="/blog/blues-licks-exercises" className="block p-4 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors">
                    <h3 className="font-bold text-amber-800 mb-2">Blues Licks Exercises</h3>
                    <p className="text-amber-900 text-sm">Master essential blues licks with interactive tab player and practice classic blues phrases.</p>
                  </Link>
                  <Link href="/blog/beginners-guide-pentatonic-scales" className="block p-4 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors">
                    <h3 className="font-bold text-amber-800 mb-2">Pentatonic Scales</h3>
                    <p className="text-amber-900 text-sm">Learn the foundation of blues soloing with pentatonic scales and their applications.</p>
                  </Link>
                  <Link href="/blog/guitar-picking-technique-guide" className="block p-4 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors">
                    <h3 className="font-bold text-amber-800 mb-2">Picking Technique</h3>
                    <p className="text-amber-900 text-sm">Develop essential picking skills for blues guitar playing.</p>
                  </Link>
                  <Link href="/blog/caged-system-guitar-guide" className="block p-4 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors">
                    <h3 className="font-bold text-amber-800 mb-2">CAGED System</h3>
                    <p className="text-amber-900 text-sm">Understand the CAGED system to connect scales and chords across the fretboard.</p>
                  </Link>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Ready to Master Blues Guitar?</h2>
              <p className="text-lg mb-6">
                Take your blues playing to the next level with personalized guitar lessons.
              </p>
              <Link 
                href="/contact" 
                className="inline-block bg-white text-amber-800 px-8 py-3 rounded-lg font-semibold hover:bg-amber-50 transition-colors"
              >
                Book a Lesson
              </Link>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
} 