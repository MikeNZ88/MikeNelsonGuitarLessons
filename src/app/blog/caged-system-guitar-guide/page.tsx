'use client';

import React, { useState } from 'react';
import { Music, Guitar, Target, BookOpen, Lightbulb, ArrowRight, Eye, EyeOff } from 'lucide-react';

// CAGED Fretboard Diagram Component
const CAGEDFretboardDiagram = () => {
  const [selectedShape, setSelectedShape] = useState('All Shapes');
  const [showNoteNames, setShowNoteNames] = useState(true);
  const [showMinor, setShowMinor] = useState(false);
  
  // String names from high e to low E (top to bottom)
  const stringNames = ['e', 'B', 'G', 'D', 'A', 'E'];
  
  // Type for note data
  type NoteData = [number, string] | [number, string, boolean] | [null, null] | [number, string][];
  
  // Type for shape data
  type ShapeData = {
    frets: number[];
    notes: NoteData[];
    color: string;
  };
  
  // Update color map for higher contrast
  const colorMap: Record<string, string> = {
    'amber-400': '#fbbf24', // yellow-orange for E
    'orange-700': '#c2410c', // deeper orange for D
    'purple-600': '#7c3aed', // purple for C
    'green-500': '#22c55e',
    'blue-500': '#3b82f6',
  };

  // F Major shapes
  const fMajorShapes: Record<string, ShapeData> = {
    'E': {
      frets: [1, 3],
      notes: [
        [1, 'F'], [1, 'C'], [2, 'A'], [3, 'F'], [3, 'C'], [1, 'F']
      ],
      color: 'bg-amber-400'
    },
    'D': {
      frets: [3, 6],
      notes: [
        [5, 'A'],   // e
        [6, 'F'],   // B
        [5, 'C'],   // G
        [3, 'F'],   // D
        [3, 'C'],   // A
        [5, 'A']    // E
      ],
      color: 'bg-orange-700'
    },
    'C': {
      frets: [5, 8],
      notes: [
        [5, 'A'], [6, 'F'], [5, 'C'], [7, 'A'], [8, 'F'], [8, 'C']
      ],
      color: 'bg-purple-600'
    },
    'A': {
      frets: [8, 10],
      notes: [
        [8, 'F'], [10, 'A'], [10, 'C'], [10, 'F'], [8, 'C'], [8, 'C'] // Added 8th fret C on low E
      ],
      color: 'bg-green-500'
    },
    'G': {
      frets: [10, 13],
      notes: [
        [13, 'F'],           // e
        [[10, 'A'], [13, 'C']], // B (both A and C)
        [10, 'F'],           // G
        [10, 'C'],           // D
        [12, 'A'],           // A
        [13, 'F']            // E
      ],
      color: 'bg-blue-500'
    }
  };

  // F Minor shapes (shifted down one semitone)
  const fMinorShapes: Record<string, ShapeData> = {
    'E': {
      frets: [1, 3],
      notes: [
        [1, 'F'], [1, 'C'], [1, 'Ab'], [3, 'F'], [3, 'C'], [1, 'F']
      ],
      color: 'bg-amber-400'
    },
    'D': {
      frets: [3, 6],
      notes: [
        [4, 'Ab'],   // e (5th becomes 4th)
        [6, 'F'],    // B
        [5, 'C'],    // G (stays at 5th fret - C note doesn't change)
        [3, 'F'],    // D
        [3, 'C'],    // A
        [4, 'Ab']    // E (5th becomes 4th)
      ],
      color: 'bg-orange-700'
    },
    'C': {
      frets: [5, 8],
      notes: [
        [4, 'Ab'], [6, 'F'], [5, 'C'], [6, 'Ab'], [8, 'F'], [8, 'C']
      ],
      color: 'bg-purple-600'
    },
    'A': {
      frets: [8, 10],
      notes: [
        [8, 'F'], [9, 'Ab'], [10, 'C'], [10, 'F'], [8, 'C'], [8, 'C']
      ],
      color: 'bg-green-500'
    },
    'G': {
      frets: [10, 13],
      notes: [
        [13, 'F'],           // e
        [[9, 'Ab'], [13, 'C']], // B (both Ab and C)
        [10, 'F'],           // G
        [10, 'C'],           // D
        [11, 'Ab'],          // A (12th becomes 11th)
        [13, 'F']            // E
      ],
      color: 'bg-blue-500'
    }
  };

  // Get the current chord shapes based on major/minor selection
  const getCurrentShapes = () => showMinor ? fMinorShapes : fMajorShapes;

  // Get shapes to display based on selection
  const getShapesToDisplay = (): [string, ShapeData][] => {
    const shapes = getCurrentShapes();
    if (selectedShape === 'All Shapes') {
      return Object.entries(shapes);
    }
    return Object.entries(shapes).filter(([name]) => name === selectedShape.split(' ')[0]);
  };

  const shapesToDisplay = getShapesToDisplay();

  // Check if a position has a note for any displayed shape
  const getNoteAtPosition = (stringIdx: number, fret: number): [string, ShapeData, NoteData] | null => {
    for (const [shapeName, shapeData] of shapesToDisplay) {
      const noteData = shapeData.notes[stringIdx];
      if (noteData && noteData[0] === fret) {
        return [shapeName, shapeData, noteData];
      }
    }
    return null;
  };

  // Helper: get all individual notes at a given string/fret position
  const getNotesAtPosition = (stringIdx: number, fret: number): Array<{shapeName: string, shapeData: ShapeData, note: string}> => {
    const notes: Array<{shapeName: string, shapeData: ShapeData, note: string}> = [];
    
    getShapesToDisplay().forEach(([shapeName, shapeData]) => {
      const noteData = shapeData.notes[stringIdx];
      
      if (!noteData) return;
      
      // Handle [null, null] case
      if (Array.isArray(noteData) && noteData[0] === null) return;
      
      // Handle array of notes (like G shape B string: [[10, 'A'], [13, 'C']])
      if (Array.isArray(noteData) && noteData.length > 0 && Array.isArray(noteData[0])) {
        (noteData as [number, string][]).forEach(([noteFret, noteName]) => {
          if (noteFret === fret) {
            notes.push({shapeName, shapeData, note: noteName});
          }
        });
      } 
      // Handle single note (like [1, 'F'] or [1, 'F', true])
      else if (Array.isArray(noteData) && typeof noteData[0] === 'number') {
        const [noteFret, noteName] = noteData as [number, string] | [number, string, boolean];
        if (noteFret === fret) {
          notes.push({shapeName, shapeData, note: noteName});
        }
      }
    });
    
    return notes;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-16">
      <h3 className="text-xl font-bold text-amber-800 mb-6">
        F {showMinor ? 'Minor' : 'Major'} CAGED Shapes Across the Fretboard
      </h3>
      
      {/* Control buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        {/* Shape selector buttons */}
        {['All Shapes', 'E Shape', 'D Shape', 'C Shape', 'A Shape', 'G Shape'].map(shape => (
          <button
            key={shape}
            onClick={() => setSelectedShape(shape)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors min-w-[110px] ${
              selectedShape === shape
                ? 'bg-amber-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {showMinor && shape !== 'All Shapes' ? shape.replace(' Shape', 'm Shape') : shape}
          </button>
        ))}
        
        {/* Note names toggle */}
        <button
          onClick={() => setShowNoteNames(!showNoteNames)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
            showNoteNames
              ? 'bg-gray-700 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {showNoteNames ? <EyeOff size={16} /> : <Eye size={16} />}
          {showNoteNames ? 'Hide Note Names' : 'Show Note Names'}
        </button>
      </div>

      {/* Fretboard diagram */}
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Fret numbers */}
          <div className="flex mb-2">
            <div className="w-8 text-center text-sm font-bold text-gray-600"></div>
            {Array.from({length: 13}, (_, i) => (
              <div key={i + 1} className="w-12 text-center text-sm font-bold text-gray-600">
                {i + 1}
              </div>
            ))}
          </div>

          {/* Strings and frets */}
          {stringNames.map((stringName, stringIdx) => (
            <div key={stringName} className="flex items-center mb-1">
              {/* String name */}
              <div className="w-8 text-center text-sm font-bold text-gray-700">
                {stringName}
              </div>
              
              {/* Frets */}
              {Array.from({length: 13}, (_, fretIdx) => {
                const fret = fretIdx + 1;
                const notesAtPosition = getNotesAtPosition(stringIdx, fret);
                return (
                  <div key={fret} className="w-12 h-8 relative flex items-center justify-center border-l border-gray-300">
                    {/* Fret wire */}
                    <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-400"></div>
                    
                    {/* String line */}
                    <div className="absolute left-0 right-0 h-px bg-gray-600"></div>
                    
                    {/* Note circle */}
                    {notesAtPosition.length > 0 && (() => {
                      // If only one shape, use its color
                      if (notesAtPosition.length === 1) {
                        const {shapeData, note} = notesAtPosition[0];
                        return (
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${shapeData.color} relative z-10`}>
                            {showNoteNames ? note : ''}
                          </div>
                        );
                      }
                      // If shared, use a split/multi gradient
                      const {note} = notesAtPosition[0];
                      const colors = notesAtPosition.map(({shapeData}) => shapeData.color.replace('bg-', ''));
                      const gradient = `linear-gradient(135deg, ${colors.map((c,i) => `${colorMap[c] || '#888'} ${(i/colors.length)*100}% ${(i+1)/colors.length*100}%`).join(', ')})`;
                      return (
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold border border-white relative z-10"
                          style={{ background: gradient }}
                        >
                          {showNoteNames ? note : ''}
                        </div>
                      );
                    })()}
                  </div>
                );
              })}
            </div>
          ))}

          {/* Shape labels - positioned to approximate actual chord positions */}
          <div className="flex mt-4">
            <div className="w-8"></div>
            <div className="flex relative w-full">
              {/* E Shape: around frets 1-3 */}
              <div className="absolute left-0 w-24 text-center">
                <div className="text-sm font-bold text-amber-600">
                  {showMinor ? 'Em Shape' : 'E Shape'}
                </div>
              </div>
              {/* D Shape: around frets 3-6 */}
              <div className="absolute left-24 w-36 text-center">
                <div className="text-sm font-bold text-orange-600">
                  {showMinor ? 'Dm Shape' : 'D Shape'}
                </div>
              </div>
              {/* C Shape: around frets 5-8 */}
              <div className="absolute left-60 w-36 text-center">
                <div className="text-sm font-bold text-purple-600">
                  {showMinor ? 'Cm Shape' : 'C Shape'}
                </div>
              </div>
              {/* A Shape: around frets 8-10 */}
              <div className="absolute left-96 w-24 text-center">
                <div className="text-sm font-bold text-green-600">
                  {showMinor ? 'Am Shape' : 'A Shape'}
                </div>
              </div>
              {/* G Shape: around frets 10-13 */}
              <div className="absolute" style={{left: '480px'}}>
                <div className="w-36 text-center">
                  <div className="text-sm font-bold text-blue-600">
                    {showMinor ? 'Gm Shape' : 'G Shape'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 text-sm text-gray-600">
        <p>Click on shape buttons to highlight individual CAGED shapes. All shapes show the same F {showMinor ? 'minor' : 'major'} chord ({showMinor ? 'F-Ab-C' : 'F-A-C'}) in different positions.</p>
        <div className="flex items-center mt-2">
          <div className="w-4 h-4 rounded-full border border-gray-400 mr-2" style={{background: 'linear-gradient(135deg, #ef4444 50%, #3b82f6 50%)'}}></div>
          <span>Split-color notes are shared between multiple shapes</span>
        </div>
      </div>

      {/* Minor toggle - separate section */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <button
          onClick={() => setShowMinor(!showMinor)}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            showMinor
              ? 'bg-red-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Show F {showMinor ? 'Major' : 'Minor'} Instead
        </button>
      </div>
    </div>
  );
};

export default function CAGEDSystemGuide() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-800 to-orange-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center bg-amber-900/30 px-4 py-2 rounded-full text-amber-200 text-sm font-medium mb-6">
              <Target className="w-4 h-4 mr-2" />
              Intermediate Guide
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              The CAGED System: A Guitar Fretboard Guide
            </h1>
            <p className="text-xl text-amber-200 mb-8 max-w-3xl mx-auto">
              Learn how five familiar chord shapes connect across the entire fretboard, creating a roadmap for chord changes and note navigation.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center">
                <BookOpen className="w-4 h-4 mr-1" />
                15 min read
              </div>
              <div className="flex items-center">
                <Music className="w-4 h-4 mr-1" />
                Intermediate Level
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <article className="max-w-4xl mx-auto px-4 py-8">
          {/* CAGED System Image - Hero Image */}
          <div className="flex justify-center mb-12">
            <img 
              src="/caged-system-thumbnail.svg" 
              alt="CAGED System Cycle" 
              className="w-64 h-64 md:w-80 md:h-80"
            />
          </div>

          {/* What is CAGED */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-amber-800 mb-6 flex items-center">
              <Guitar className="w-8 h-8 mr-3 text-amber-600" />
              What is the CAGED System?
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 mb-6">
                The CAGED system takes five basic open chord shapes—<strong>C, A, G, E, and D</strong>—and shows how they connect across the entire fretboard.
              </p>
              <p className="text-gray-700 mb-6">
                The name "CAGED" tells you the order that these shapes appear from left to right on the fretboard (low frets to high frets).
              </p>
              <p className="text-gray-700 mb-6">
                It's important to remember that when you move a CAGED shape up the neck, you're not just shifting your fingers—you're also replacing open strings with fretted notes. For example, when you play an "E shape" barre chord at the first fret, you're recreating the open E major chord one semitone higher, but now every string is fretted. This means you need to be aware of how the chord's structure changes as you move away from open strings.
              </p>
              <p className="text-gray-700 mb-6">
                Each shape in the CAGED system represents a different way to play the same chord. As you move these shapes up the fretboard, they follow a specific order: C shape connects to A shape, A shape connects to G shape, G shape connects to E shape, E shape connects to D shape, and D shape connects back to C shape. This cycle repeats every 12 frets (one octave).
              </p>
              <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-6">
                <p className="text-gray-700">
                  <strong>Important Note:</strong> The CAGED system is not a substitute for learning note names on the fretboard. However, it can be a useful starting point to understand relationships between chord shapes and help make sense of note positions as you explore the neck.
                </p>
              </div>
            </div>
          </section>

          {/* Interactive Fretboard Diagram */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-amber-800 mb-6">Interactive Fretboard Diagram</h2>
            
            <div className="prose prose-lg max-w-none mb-6">
              <p className="text-gray-700">
                The diagram below shows the possible shapes of an F major chord. Each one resembles a CAGED shape. The first available shape for F major on the fretboard happens to be the E shape. That's why the sequence of shapes is E shape, D shape, C shape... rather than starting from C shape. To play an F major chord, its "C shape" is found further up the fretboard.
              </p>
            </div>
            
            <CAGEDFretboardDiagram />
          </section>

          {/* Practical Example */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-amber-800 mb-6">Practical Example: F Major Using CAGED</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 mb-6">
                Let's use F major to demonstrate how CAGED works, since it avoids confusion with the shape names themselves.
              </p>
              
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-xl font-semibold text-amber-800 mb-4 flex items-center">
                  <ArrowRight className="w-5 h-5 mr-2 text-amber-600" />
                  E Shape (1st fret)
                </h3>
                <div className="flex items-center mb-4">
                  <div className="flex items-center space-x-2 mr-4">
                    <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center text-sm font-bold text-gray-400">C</div>
                    <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center text-sm font-bold text-gray-400">A</div>
                    <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center text-sm font-bold text-gray-400">G</div>
                    <div className="w-8 h-8 rounded-full border-2 border-orange-600 bg-orange-600 flex items-center justify-center text-sm font-bold text-white">E</div>
                    <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center text-sm font-bold text-gray-400">D</div>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  The first available shape is the barre chord across all six strings, referred to as the "E shape." Imagine the open E major chord and move everything up one fret (one semitone). That's F major using the "E shape" - the note F is one semitone higher than E.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-xl font-semibold text-amber-800 mb-4 flex items-center">
                  <ArrowRight className="w-5 h-5 mr-2 text-amber-600" />
                  Finding the Next Shape
                </h3>
                <p className="text-gray-700 mb-4">
                  Where is the next shape? Spell out CAGED and note where E appears: C-A-G-E-D. The letter after E is D, so the next shape will be the "D shape."
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-xl font-semibold text-amber-800 mb-4 flex items-center">
                  <ArrowRight className="w-5 h-5 mr-2 text-amber-600" />
                  D Shape (3rd-6th frets)
                </h3>
                <div className="flex items-center mb-4">
                  <div className="flex items-center space-x-2 mr-4">
                    <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center text-sm font-bold text-gray-400">C</div>
                    <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center text-sm font-bold text-gray-400">A</div>
                    <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center text-sm font-bold text-gray-400">G</div>
                    <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center text-sm font-bold text-gray-400">E</div>
                    <div className="w-8 h-8 rounded-full border-2 border-orange-600 bg-orange-600 flex items-center justify-center text-sm font-bold text-white">D</div>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  This D shape is found between frets 3 and 6. It's not a D chord - it's the open D shape transposed up to F. Since F is 3 semitones (3 frets) higher than D, we move the open D shape up 3 frets.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-xl font-semibold text-amber-800 mb-4 flex items-center">
                  <ArrowRight className="w-5 h-5 mr-2 text-amber-600" />
                  C Shape (5th-8th frets)
                </h3>
                <div className="flex items-center mb-4">
                  <div className="flex items-center space-x-2 mr-4">
                    <div className="w-8 h-8 rounded-full border-2 border-orange-600 bg-orange-600 flex items-center justify-center text-sm font-bold text-white">C</div>
                    <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center text-sm font-bold text-gray-400">A</div>
                    <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center text-sm font-bold text-gray-400">G</div>
                    <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center text-sm font-bold text-gray-400">E</div>
                    <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center text-sm font-bold text-gray-400">D</div>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  The CAGED sequence loops (CAGED-CAGED-etc.), so to find the next shape after D shape, we go to the start: C shape. The F major C shape is found between frets 5 and 8. F is 5 semitones (5 frets) higher than C, so we move the open C shape up 5 frets.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-xl font-semibold text-amber-800 mb-4 flex items-center">
                  <ArrowRight className="w-5 h-5 mr-2 text-amber-600" />
                  A Shape (8th-10th frets)
                </h3>
                <div className="flex items-center mb-4">
                  <div className="flex items-center space-x-2 mr-4">
                    <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center text-sm font-bold text-gray-400">C</div>
                    <div className="w-8 h-8 rounded-full border-2 border-orange-600 bg-orange-600 flex items-center justify-center text-sm font-bold text-white">A</div>
                    <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center text-sm font-bold text-gray-400">G</div>
                    <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center text-sm font-bold text-gray-400">E</div>
                    <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center text-sm font-bold text-gray-400">D</div>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  Following the sequence, A shape comes after C shape. The F major A shape appears around frets 8-10. F is 8 semitones (8 frets) higher than A, so we transpose the open A shape up 8 frets.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-xl font-semibold text-amber-800 mb-4 flex items-center">
                  <ArrowRight className="w-5 h-5 mr-2 text-amber-600" />
                  G Shape (10th-13th frets)
                </h3>
                <div className="flex items-center mb-4">
                  <div className="flex items-center space-x-2 mr-4">
                    <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center text-sm font-bold text-gray-400">C</div>
                    <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center text-sm font-bold text-gray-400">A</div>
                    <div className="w-8 h-8 rounded-full border-2 border-orange-600 bg-orange-600 flex items-center justify-center text-sm font-bold text-white">G</div>
                    <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center text-sm font-bold text-gray-400">E</div>
                    <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center text-sm font-bold text-gray-400">D</div>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  Finally, G shape comes after A shape in the sequence. The F major G shape is found between frets 10-13. F is 10 semitones (10 frets) higher than G, so we move the open G shape up 10 frets.
                </p>
                <p className="text-gray-700 text-sm italic">
                  This completes one full cycle of CAGED for F major, and the pattern repeats at the 12th fret.
                </p>
              </div>
            </div>
          </section>

          {/* Why the CAGED System Works */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-amber-800 mb-6">Why the CAGED System Works</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 mb-6">
                The CAGED shapes work because they're built from actual note relationships. An "E shape" F major chord plays F, A, and C - the same notes as any F major chord elsewhere on the neck. The shape is simply how these notes naturally fall under your fingers in that position.
              </p>
              <p className="text-gray-700 mb-6">
                Rather than memorizing abstract patterns, focus on learning where notes appear on the fretboard. When you know that F appears on the 1st fret of the low E string, the 8th fret of the A string, and the 6th fret of the B string, the chord shapes become logical consequences of note placement.
              </p>
            </div>
          </section>

          {/* Using CAGED to Strengthen Note Knowledge */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-amber-800 mb-6">Using CAGED to Strengthen Note Knowledge</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 mb-6">
                Here's where CAGED becomes valuable: it helps you see how the same notes connect in different fretboard areas. When you understand that moving from an "E shape" to a "D shape" means you're finding the same chord tones (F, A, C) in a new position, you're reinforcing your knowledge of where those notes live.
              </p>
              <p className="text-gray-700 mb-6">
                Use CAGED references like "E shape barre chord" as convenient shorthand, but always know which actual notes you're playing. This approach builds genuine fretboard knowledge while using the system's organizational benefits.
              </p>
            </div>
          </section>

          {/* Minor and Other Chord Types */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-amber-800 mb-6">What About Minor and Other Chord Types?</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 mb-6">
                The beauty of CAGED extends beyond major chords. You can think of minor chords, seventh chords, and other chord types as modifications to the basic CAGED shapes.
              </p>
              
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-xl font-semibold text-amber-800 mb-4">Minor Chords</h3>
                <p className="text-gray-700 mb-4">
                  For F minor, the CAGED shapes become: <strong>Cm, Am, Gm, Em, Dm</strong>. You're using the same fretboard positions, but with the minor versions of each shape. The F minor "E shape" at the 1st fret uses the Em chord shape, the F minor "D shape" uses the Dm chord shape, and so on.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-xl font-semibold text-amber-800 mb-4">Seventh Chords</h3>
                <p className="text-gray-700 mb-4">
                  For F7 (dominant seventh), you would use: <strong>C7, A7, G7, E7, D7</strong> shapes. Each position on the fretboard can accommodate the seventh chord version of that particular CAGED shape.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-xl font-semibold text-amber-800 mb-4">Extended Chords</h3>
                <p className="text-gray-700 mb-4">
                  This principle extends to other chord types: sus chords, add9 chords, and more complex extensions. The CAGED system provides the framework, and you modify the shapes according to the chord quality you need.
                </p>
              </div>
            </div>
          </section>

          {/* The Balanced Approach */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-amber-800 mb-6">The Balanced Approach</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 mb-6">
                As guitarists, the first chord shapes we learn become deeply ingrained in our muscle memory. The CAGED system provides useful references by building on these familiar patterns. Since you already know how to play C, A, G, E, and D chords in open position, CAGED helps you recognize these same fingering relationships in different areas of the fretboard.
              </p>
              <p className="text-gray-700 mb-6">
                The most effective approach combines note knowledge with pattern recognition. Understanding where notes are located on the fretboard gives you the foundation, while CAGED patterns help you see how those notes connect across different positions. This creates true fretboard fluency rather than pattern dependence.
              </p>
              <p className="text-gray-700 mb-6">
                Think of CAGED as a helpful map that shows you routes between destinations, but make sure you know the actual locations (notes) rather than just following the roads (shapes). This way, you develop both practical navigation skills and genuine musical understanding.
              </p>
            </div>
          </section>

          {/* Applications of the CAGED System */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-amber-800 mb-6">Applications of the CAGED System</h2>
            <div className="prose prose-lg max-w-none">
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-xl font-semibold text-amber-800 mb-4">1. Moving Chord Shapes Up the Neck</h3>
                <p className="text-gray-700 mb-4">
                  You are playing an <strong>A major chord</strong> using the "E Shape" barre chord (the one most people learn first). You want to play a higher variation of this chord. You know that the next shape will be a "D shape" and you find that shape by moving up a few frets (playing the highest strings G, B, E). Even if you're unsure exactly how many frets to move, your ear will guide you.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-xl font-semibold text-amber-800 mb-4">2. Connecting Arpeggios for Improvisation</h3>
                <p className="text-gray-700 mb-4">
                  You are improvising over a <strong>B minor chord</strong>. You use the "C minor shape" as an arpeggio and connect it with an "A minor shape" arpeggio. Knowing these two shapes are next to each other helps to map out notes you can play. The C minor shape can be found on the 14th fret starting on the A string, and the A minor shape is frets 14 - 16.
                </p>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-xl font-semibold text-amber-800 mb-4">3. Shape and Chord Name Alignment</h3>
                <p className="text-gray-700 mb-4">
                  You are playing an <strong>A shape A major chord</strong>. In this example, the shape and name of the chord are the same, but that is not always true as shown by the other examples above. You want to find where to add a bass note to the chord. You know the shape after A shape is G shape, and you locate the 4th fret of the A string. It gives the chord a richer sound.
                </p>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-12">
            <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-amber-800 mb-4">Key Takeaways</h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-amber-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span>CAGED connects five familiar chord shapes across the entire fretboard</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-amber-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span>Each shape transposes both the fingering pattern and the chord relationship</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-amber-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span>The system works for minor, seventh, and extended chords using modified shapes</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-amber-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span>Use CAGED as a helpful map, not a substitute for knowing where notes are</span>
                </li>
              </ul>
            </div>
          </section>

        </article>
      </div>
    </div>
  );
} 