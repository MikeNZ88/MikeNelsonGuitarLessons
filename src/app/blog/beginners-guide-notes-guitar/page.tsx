'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import InstrumentRangeDiagram from '@/components/InstrumentRangeDiagram';

// --- Diagram stubs (replace with your actual components as needed) ---
const SingleStringNotes = ({ showSharps = true, highlightRepeat = false }) => (
  <div className="w-full overflow-x-auto">
    <div className="flex gap-2 justify-start my-4 min-w-max">
      {(showSharps
        ? ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A']
        : ['A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A']
      ).map((note, i) => {
        const isSharp = note.includes('#');
        const isFlat = note.includes('b');
        const isNatural = !isSharp && !isFlat;
        const isRepeat = highlightRepeat && i === 12;
        
        let bgColor = 'bg-gray-100';
        if (isRepeat) bgColor = 'bg-amber-200';
        else if (isSharp || isFlat) bgColor = 'bg-purple-200';
        else if (isNatural) bgColor = 'bg-blue-100';
        
        return (
          <span
            key={i}
            className={`px-2 py-1 rounded font-bold ${bgColor} ${isSharp || isFlat ? 'text-purple-800' : 'text-gray-700'}`}
          >
            {note}
          </span>
        );
      })}
    </div>
  </div>
);

const NOTE_SEQUENCE_SHARPS = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const NOTE_SEQUENCE_FLATS = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
const NOTE_TO_INDEX: { [key: string]: number } = { C: 0, 'C#': 1, Db: 1, D: 2, 'D#': 3, Eb: 3, E: 4, F: 5, 'F#': 6, Gb: 6, G: 7, 'G#': 8, Ab: 8, A: 9, 'A#': 10, Bb: 10, B: 11 };

const getNotesForString = (
  openNote: string,
  octave: number,
  startFret: number,
  endFret: number,
  useSharps: boolean
): { note: string; octave: number }[] => {
  const sequence = useSharps ? NOTE_SEQUENCE_SHARPS : NOTE_SEQUENCE_FLATS;
  let idx = NOTE_TO_INDEX[openNote];
  let oct = octave;
  const notes = [];
  for (let fret = startFret; fret <= endFret; fret++) {
    const note = sequence[idx];
    notes.push({ note, octave: oct });
    idx = (idx + 1) % 12;
    if (idx === 0) oct++;
  }
  return notes;
};

type FretboardDiagramProps = {
  startFret?: number;
  endFret?: number;
  openNote?: string;
  showSharps?: boolean;
  highlightOctave?: boolean;
  octave?: number;
  showOctaves?: boolean;
};

const FretboardDiagram = ({ startFret = 0, endFret = 12, openNote = 'E', showSharps = true, highlightOctave }: FretboardDiagramProps) => {
  const notes = useMemo(() => getNotesForString(openNote, 2, startFret, endFret, showSharps), [openNote, startFret, endFret, showSharps]);
  return (
    <div className="flex flex-col items-center my-4">
      <div className="w-full overflow-x-auto">
        <div className="flex gap-2 justify-start min-w-max">
          {notes.map((n, i) => (
            <span
              key={i}
              className={`px-2 py-1 rounded ${highlightOctave && (i === 0 || i === notes.length - 1) ? 'bg-amber-200 font-bold' : 'bg-gray-100'}`}
            >
              {n.note}
            </span>
          ))}
        </div>
      </div>
      <div className="w-full overflow-x-auto">
        <div className="flex gap-2 justify-start mt-1 text-xs text-gray-500 min-w-max">
          {notes.map((_, i) => (
            <span key={i} className="w-8 text-center">{i === 0 ? 'open' : (i === 12 ? '12 (octave)' : i)}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

const StringIntervalDiagram = () => {
  // Define the chromatic scale
  const chromaticScale = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  
  // Helper function to get notes between two notes with proper octave handling
  const getNotesBetween = (startNote: string, endNote: string, startOctave: number) => {
    const notes = [];
    let currentIndex = chromaticScale.indexOf(startNote);
    const endIndex = chromaticScale.indexOf(endNote);
    let currentOctave = startOctave;
    
    // Go through the chromatic scale until we reach the end note
    while (currentIndex !== endIndex) {
      currentIndex = (currentIndex + 1) % 12;
      const note = chromaticScale[currentIndex];
      
      // Check if we need to increment octave (when we pass C)
      if (currentIndex === 0 && note === 'C') {
        currentOctave++;
      }
      
      notes.push({ note, octave: currentOctave });
    }
    
    return notes;
  };
  
  // Get notes for each interval
  const eToA = getNotesBetween('E', 'A', 2); // E2 to A2
  const aToD = getNotesBetween('A', 'D', 2); // A2 to D3
  const dToG = getNotesBetween('D', 'G', 3); // D3 to G3
  const gToB = getNotesBetween('G', 'B', 3); // G3 to B3
  const bToE = getNotesBetween('B', 'E', 3); // B3 to E4
  
  return (
    <div className="flex flex-col items-center my-6">
      <div className="w-full overflow-x-auto">
        <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 items-center min-w-max">
          {/* Low E - A string row */}
          <div className="text-sm font-bold text-gray-700">Low E - A:</div>
          <div className="flex gap-2">
            <span className="px-2 py-1 rounded font-bold bg-amber-200 text-amber-900">E2</span>
            {eToA.slice(0, -1).map((n, i) => (
              <span key={`e-a-${i}`} className="px-2 py-1 rounded font-bold bg-gray-100 text-gray-700">
                {n.note}{n.octave}
              </span>
            ))}
            <span className="px-2 py-1 rounded font-bold bg-amber-200 text-amber-900">A2</span>
          </div>
          
          {/* A - D string row */}
          <div className="text-sm font-bold text-gray-700">A - D:</div>
          <div className="flex gap-2">
            <span className="px-2 py-1 rounded font-bold bg-amber-200 text-amber-900">A2</span>
            {aToD.slice(0, -1).map((n, i) => (
              <span key={`a-d-${i}`} className="px-2 py-1 rounded font-bold bg-gray-100 text-gray-700">
                {n.note}{n.octave}
              </span>
            ))}
            <span className="px-2 py-1 rounded font-bold bg-amber-200 text-amber-900">D3</span>
          </div>
          
          {/* D - G string row */}
          <div className="text-sm font-bold text-gray-700">D - G:</div>
          <div className="flex gap-2">
            <span className="px-2 py-1 rounded font-bold bg-amber-200 text-amber-900">D3</span>
            {dToG.slice(0, -1).map((n, i) => (
              <span key={`d-g-${i}`} className="px-2 py-1 rounded font-bold bg-gray-100 text-gray-700">
                {n.note}{n.octave}
              </span>
            ))}
            <span className="px-2 py-1 rounded font-bold bg-amber-200 text-amber-900">G3</span>
          </div>
          
          {/* G - B string row */}
          <div className="text-sm font-bold text-gray-700">G - B:</div>
          <div className="flex gap-2">
            <span className="px-2 py-1 rounded font-bold bg-amber-200 text-amber-900">G3</span>
            {gToB.slice(0, -1).map((n, i) => (
              <span key={`g-b-${i}`} className="px-2 py-1 rounded font-bold bg-gray-100 text-gray-700">
                {n.note}{n.octave}
              </span>
            ))}
            <span className="px-2 py-1 rounded font-bold bg-amber-200 text-amber-900">B3</span>
          </div>
          
          {/* B - High E string row */}
          <div className="text-sm font-bold text-gray-700">B - High E:</div>
          <div className="flex gap-2">
            <span className="px-2 py-1 rounded font-bold bg-amber-200 text-amber-900">B3</span>
            {bToE.slice(0, -1).map((n, i) => (
              <span key={`b-e-${i}`} className="px-2 py-1 rounded font-bold bg-gray-100 text-gray-700">
                {n.note}{n.octave}
              </span>
            ))}
            <span className="px-2 py-1 rounded font-bold bg-amber-200 text-amber-900">E4</span>
          </div>
        </div>
      </div>
      
      <div className="mt-2 text-xs text-gray-500">Shows the notes between each string</div>
    </div>
  );
};

const C0ToE2Diagram = () => {
  // Build the note sequence from C0 to E2
  const notes = [];
  const NOTE_SEQUENCE = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  let octave = 0;
  let noteIdx = 0;
  while (!(notes.length > 0 && notes[notes.length - 1].note === 'E' && notes[notes.length - 1].octave === 2)) {
    notes.push({ note: NOTE_SEQUENCE[noteIdx], octave });
    noteIdx++;
    if (noteIdx === 12) {
      noteIdx = 0;
      octave++;
    }
  }
  // Add E2 at the end if not already
  if (!(notes[notes.length - 1].note === 'E' && notes[notes.length - 1].octave === 2)) {
    notes.push({ note: 'E', octave: 2 });
  }
  
  // Split notes into three rows
  const row1 = notes.slice(0, 12); // C0 to B0
  const row2 = notes.slice(12, 24); // C1 to B1  
  const row3 = notes.slice(24); // C2 to E2
  
  return (
    <div className="flex flex-col items-center my-6">
      <div className="w-full overflow-x-auto">
        <div className="flex flex-col gap-2 min-w-max">
          {/* Row 1: C0 to B0 */}
          <div className="flex gap-2 justify-start items-center">
            {row1.map((n, i) => {
              const isC = n.note === 'C';
              return (
                <span
                  key={i}
                  className={`px-2 py-1 rounded font-bold ${isC ? 'bg-amber-200 text-amber-900' : 'bg-gray-100 text-gray-700'}`}
                >
                  {n.note}
                  <span className="ml-1 text-xs text-gray-500">{n.octave}</span>
                </span>
              );
            })}
            <span className="text-2xl text-gray-400 mx-2">→</span>
          </div>
          
          {/* Row 2: C1 to B1 */}
          <div className="flex gap-2 justify-start items-center">
            <span className="text-2xl text-gray-400 mx-2">→</span>
            {row2.map((n, i) => {
              const isC = n.note === 'C';
              return (
                <span
                  key={i + 12}
                  className={`px-2 py-1 rounded font-bold ${isC ? 'bg-amber-200 text-amber-900' : 'bg-gray-100 text-gray-700'}`}
                >
                  {n.note}
                  <span className="ml-1 text-xs text-gray-500">{n.octave}</span>
                </span>
              );
            })}
            <span className="text-2xl text-gray-400 mx-2">→</span>
          </div>
          
          {/* Row 3: C2 to E2 */}
          <div className="flex gap-2 justify-start items-center">
            <span className="text-2xl text-gray-400 mx-2">→</span>
            {row3.map((n, i) => {
              const isC = n.note === 'C';
              const isE2 = n.note === 'E' && n.octave === 2;
              return (
                <span
                  key={i + 24}
                  className={`px-2 py-1 rounded font-bold ${isC ? 'bg-amber-200 text-amber-900' : isE2 ? 'bg-green-300 text-green-900' : 'bg-gray-100 text-gray-700'}`}
                >
                  {n.note}
                  <span className="ml-1 text-xs text-gray-500">{n.octave}</span>
                </span>
              );
            })}
          </div>
        </div>
      </div>
      <div className="mt-2 text-xs text-gray-600 text-center max-w-xl">
        <span className="font-bold text-amber-700">C</span> notes mark the start of each octave. <span className="font-bold text-green-700">E2</span> is the lowest note on a standard guitar.
      </div>
    </div>
  );
};

export default function BeginnersGuideToNotes() {
  const [showSharps, setShowSharps] = useState(true);

  // Helper for highlighting A's in diagrams
  const highlightA = (notes: string[]) => notes.map((note, i) => (note === 'A' ? 'highlight' : '')); // for simple diagrams

  return (
    <div className="max-w-4xl mx-auto px-4 py-8" style={{ scrollBehavior: 'smooth' }}>
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm">
        <Link href="/" className="text-blue-600 hover:underline">Home</Link>
        <span className="mx-2 text-gray-500">›</span>
        <Link href="/blog" className="text-blue-600 hover:underline">Blog</Link>
        <span className="mx-2 text-gray-500">›</span>
        <span className="text-gray-700">Beginner's Guide to Notes on the Guitar</span>
      </nav>

      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4 text-amber-600">
          Beginner’s Guide to Notes on the Guitar
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          Learn how notes work on the guitar, how the musical alphabet repeats, and how to find every note on your fretboard.
        </p>
      </header>

      {/* Table of Contents */}
      <nav className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Table of Contents</h3>
        
        <div className="mb-6">
          <h4 className="font-semibold text-amber-700 mb-3">The Musical Alphabet</h4>
          <ul className="space-y-2 ml-4">
            <li>
              <a href="#the-natural-notes" className="text-amber-600 hover:text-amber-800 hover:underline">
                The Natural Notes
              </a>
            </li>
            <li>
              <a href="#sharps-and-flats" className="text-amber-600 hover:text-amber-800 hover:underline">
                Sharps and Flats: The Notes In Between
              </a>
            </li>
            <li>
              <a href="#octaves-pattern-repeats" className="text-amber-600 hover:text-amber-800 hover:underline">
                Octaves: The Pattern Repeats
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-amber-700 mb-3">The Guitar</h4>
          <ul className="space-y-2 ml-4">
            <li>
              <a href="#guitar-fretboard" className="text-amber-600 hover:text-amber-800 hover:underline">
                The Guitar Fretboard: Notes on Each String
              </a>
            </li>
            <li>
              <a href="#octaves-on-guitar" className="text-amber-600 hover:text-amber-800 hover:underline">
                Octaves on the Guitar
              </a>
            </li>
            <li>
              <a href="#how-strings-relate" className="text-amber-600 hover:text-amber-800 hover:underline">
                How Strings Relate to Each Other
              </a>
            </li>
            <li>
              <a href="#instrument-range" className="text-amber-600 hover:text-amber-800 hover:underline">
                Instrument Range
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* The Musical Alphabet Section */}
      <section className="mb-16">
        <h2 className="text-4xl font-bold mb-8 text-amber-600 border-b-2 border-amber-200 pb-4">The Musical Alphabet</h2>
        
        {/* 1. The Natural Notes */}
        <section className="mb-12" id="the-natural-notes" style={{ scrollMarginTop: '2rem' }}>
          <h3 className="text-3xl font-bold mb-6 text-amber-600">The Natural Notes</h3>
        <p className="mb-4">
          Music uses just 7 letters: <strong>A, B, C, D, E, F, G</strong>. After G, the sequence starts again at A. It’s a loop, not a line!
        </p>
        <div className="w-full overflow-x-auto">
          <div className="flex gap-2 justify-start my-4 min-w-max">
            {["A", "B", "C", "D", "E", "F", "G", "A", "B", "C", "...and so on"].map((note, i) => (
              <span key={i} className={`px-2 py-1 rounded ${note === 'A' && (i === 0 || i === 7) ? 'bg-amber-200 font-bold' : 'bg-gray-100'}`}>{note}</span>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Sharps and Flats: The Notes In Between */}
      <section className="mb-12" id="sharps-and-flats" style={{ scrollMarginTop: '2rem' }}>
        <h3 className="text-3xl font-bold mb-6 text-amber-600">Sharps and Flats: The Notes In Between</h3>
        <p className="mb-4">
          Between most letters, there's a sharp (<strong>#</strong>) or flat (<strong>b</strong>). These are the "in-between" notes. There's no sharp/flat between <strong>B–C</strong> and <strong>E–F</strong>.
        </p>
        <p className="mb-4">
          <strong>Important:</strong> The first step in learning sharps and flats is to know that there are no sharps or flats between B and C, and between E and F. These pairs of notes are only one fret apart on the guitar.
        </p>
        <p className="mb-4">
          <strong>Sharps and flats are different ways of naming the same note</strong> - they're based on whether you're thinking of the note above or below. For example, the same note can be called C# (C sharp) or Db (D flat) depending on context. Click the buttons below to see both spellings.
        </p>
        <div className="mb-4">
          <button
            className={`px-4 py-2 rounded-l ${showSharps ? 'bg-amber-500 text-white' : 'bg-white text-amber-800 border'}`}
            onClick={() => setShowSharps(true)}
          >
            Show Sharps
          </button>
          <button
            className={`px-4 py-2 rounded-r ${!showSharps ? 'bg-amber-500 text-white' : 'bg-white text-amber-800 border'}`}
            onClick={() => setShowSharps(false)}
          >
            Show Flats
          </button>
        </div>
        <SingleStringNotes showSharps={showSharps} />
        <p className="mt-4">There are 5 sharps/flats, so with the 7 natural notes, there are 12 notes in total in the chromatic scale. That's the name given to the 12 notes.</p>
      </section>

      {/* 3. Octaves: The Pattern Repeats */}
      <section className="mb-12" id="octaves-pattern-repeats" style={{ scrollMarginTop: '2rem' }}>
        <h3 className="text-3xl font-bold mb-6 text-amber-600">Octaves: The Pattern Repeats</h3>
        <p className="mb-4">
          After 12 notes, the pattern repeats—this is called an <strong>octave</strong>. For example, from A to the next A is 12 notes apart.
        </p>
        <div className="w-full overflow-x-auto">
          <div className="flex gap-2 justify-start my-4 min-w-max">
            {["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "...and so on"].map((note, i) => (
              <span key={i} className={`px-2 py-1 rounded ${note === 'A' && (i === 0 || i === 12) ? 'bg-amber-200 font-bold' : 'bg-gray-100'}`}>{note}</span>
            ))}
          </div>
        </div>
      </section>
      </section>

      {/* The Guitar Section */}
      <section className="mb-16">
        <h2 className="text-4xl font-bold mb-8 text-amber-600 border-b-2 border-amber-200 pb-4">The Guitar</h2>

      {/* 4. The Guitar Fretboard: Notes on Each String */}
      <section className="mb-12" id="guitar-fretboard" style={{ scrollMarginTop: '2rem' }}>
        <h3 className="text-3xl font-bold mb-6 text-amber-600">The Guitar Fretboard: Notes on Each String</h3>
        <p className="mb-4">
          Each fret is one note higher. The 12th fret is the same note as the open string, one octave up. Below, see each string from open to 12th fret. Open and 12th fret notes are highlighted.
        </p>
        <p className="mb-4 text-sm text-gray-600">
          <strong>Note:</strong> We've ordered the strings from lowest to highest (Low E at top). Most fretboard diagrams show strings from highest to lowest (High E at top), but this ordering makes it easier to see how the guitar's range progresses from lowest to highest.
        </p>
        <div className="flex gap-4 mb-4">
          <button
            className={`px-4 py-2 rounded ${showSharps ? 'bg-amber-500 text-white' : 'bg-white text-amber-800 border'}`}
            onClick={() => setShowSharps((v) => !v)}
          >
            {showSharps ? 'Show Flats' : 'Show Sharps'}
          </button>
        </div>
        
        {/* Guitar Fretboard Table */}
        <div className="w-full overflow-x-auto">
          <table className="min-w-max border-collapse">
            <thead>
              <tr>
                <th className="px-2 py-1 text-left font-semibold text-gray-700">String</th>
                <th className="px-2 py-1 text-center font-semibold text-gray-700">Open</th>
                {Array.from({ length: 12 }, (_, i) => (
                  <th key={i + 1} className="px-2 py-1 text-center font-semibold text-gray-700 w-12">
                    {i + 1}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { note: 'E', octave: 2, label: 'Low E' },
                { note: 'A', octave: 2, label: 'A' },
                { note: 'D', octave: 3, label: 'D' },
                { note: 'G', octave: 3, label: 'G' },
                { note: 'B', octave: 3, label: 'B' },
                { note: 'E', octave: 4, label: 'High E' },
              ].map((string, stringIdx) => {
                const notes = getNotesForString(string.note, string.octave, 0, 12, showSharps);
                return (
                  <tr key={string.note + string.octave} className="border-b border-gray-200">
                    <td className="px-2 py-2 font-semibold text-gray-700">{string.label}</td>
                    <td className="px-2 py-2 text-center">
                      <span className="px-2 py-1 rounded font-bold bg-amber-200 text-amber-900">
                        {notes[0].note}
                      </span>
                    </td>
                    {notes.slice(1, -1).map((note, fretIdx) => (
                      <td key={fretIdx + 1} className="px-2 py-2 text-center">
                        <span className="px-2 py-1 rounded font-bold bg-gray-100 text-gray-700">
                          {note.note}
                        </span>
                      </td>
                    ))}
                    <td className="px-2 py-2 text-center">
                      <span className="px-2 py-1 rounded font-bold bg-amber-200 text-amber-900">
                        {notes[notes.length - 1].note}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        <p className="mt-4 text-sm text-gray-600">
          Open and 12th fret notes are highlighted. The 12th fret is the same note as the open string, one octave higher.
        </p>
      </section>

      {/* Octaves on the Guitar (moved and rewritten) */}
      <section className="mb-12" id="octaves-on-guitar" style={{ scrollMarginTop: '2rem' }}>
        <h3 className="text-3xl font-bold mb-6 text-amber-600">Octaves on the Guitar</h3>
        <p className="mb-4">
          In music theory, octaves are written with numbers. For example, E2 and E4 are both the note E, but E4 (with the higher number) is a higher-pitched note. E3 is higher than E2, but lower than E4.
        </p>
        <p className="mb-4">
          The guitar’s range covers about four octaves, from the lowest open E string (E2) up to the highest fret on the high E string. Not all guitars have 24 frets—some have 18, 21, or 22—so the highest note is usually somewhere between C6 and E6, depending on the instrument. The open high E string is E4, the 12th fret on that string is E5, and the highest frets (18th–24th) reach up to C6–E6.
        </p>
        <p>
          Notice that the difference between the lowest and highest E strings is two octaves (E2 to E4), and the 12th fret on any string is always one octave above the open string. Since an octave is 12 notes, two octaves is 24 notes—matching the 24 frets on some guitars. The tuning intervals between strings (E–A–D–G–B–E) add up to 24 semitones, or two octaves, from the lowest to the highest open string.
        </p>
        <h3 className="text-lg font-semibold mt-8 mb-2">Why Do Octave Numbers Change at C?</h3>
        <p className="mb-2">
          If you're wondering why the octave numbers change at certain points, it's because octaves in music theory technically start from the note <strong>C</strong> and go up to <strong>B</strong>—not from A to G as you might expect. This can be confusing at first, since the musical alphabet starts with A, but octave numbering follows a different system.
        </p>
        <p className="mb-2">
          All you need to know for guitar is that the lowest note is an E2, or even just that it's an E. Also, don't be confused into thinking all octaves start and finish with C and B—this is just the octave numbering system. For example, an octave of E (E2 to E3) has E2, F2, F#2, G2, G#2, A2, A#2, B2, C3, C#3, D3, D#3, E3. Notice we have numbers 2 and 3 in the same octave, unless the starting note is C.
        </p>
        <C0ToE2Diagram />
        <div className="flex flex-col items-center my-6">
          <div className="w-full overflow-x-auto">
            <div className="flex gap-2 justify-start items-center min-w-max">
              <span className="text-2xl text-gray-400 mx-2">→</span>
              {['E2', 'F2', 'F#2', 'G2', 'G#2', 'A2', 'A#2', 'B2', 'C3', 'C#3', 'D3', 'D#3', 'E3'].map((note, i) => {
                const isE = note.startsWith('E');
                return (
                  <span
                    key={i}
                    className={`px-2 py-1 rounded font-bold ${isE ? 'bg-green-300 text-green-900' : 'bg-gray-100 text-gray-700'}`}
                  >
                    {note}
                  </span>
                );
              })}
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-600 text-center max-w-xl">
            An E octave: <span className="font-bold text-green-700">E2</span> to <span className="font-bold text-green-700">E3</span>. Notice the number changes from 2 to 3 at <span className="font-bold text-amber-700">C3</span>, not at E3.
          </div>
        </div>
        
        <h3 className="text-lg font-semibold mt-8 mb-2">Do I Need to Know the Octave Numbers?</h3>
        <p className="mb-2">
          <strong>No.</strong> Knowing the specific octave numbers doesn't help your playing. You don't need to memorize that the low E string is E2 or that the 12th fret on the high E string is E5, etc.
        </p>
        <p className="mb-2">
          However, understanding how octaves work can help you:
        </p>
        <ul className="list-disc list-inside mb-4 ml-4 space-y-1">
          <li>Recognize when notes are the same but in different octaves</li>
          <li>Understand why the 12th fret sounds like the open string</li>
          <li>See patterns across the fretboard more clearly</li>
        </ul>
        <p>
          Focus on learning the note names and their relationships on the fretboard. The octave numbers are just a way to organize the vast range of frequencies in music.
        </p>
      </section>

      {/* How Strings Relate to Each Other (moved to end) */}
      <section className="mb-12" id="how-strings-relate" style={{ scrollMarginTop: '2rem' }}>
        <h3 className="text-3xl font-bold mb-6 text-amber-600">How Strings Relate to Each Other</h3>
        <p className="mb-4">
          Each string is tuned a certain number of notes (semitones) apart:
          <br />
          <strong>E → A = 5 notes, A → D = 5, D → G = 5, G → B = 4, B → E = 5</strong>.
        </p>
        <StringIntervalDiagram />
        <p className="mt-4">
          The open strings span two octaves (E2 to E4). The 12th fret on high E is E5, and the highest fret is usually between C6 and E6 depending on the guitar. The guitar covers about 4 octaves of E.
        </p>
        <p className="mt-4 text-base text-amber-700">
          For more diagrams and information on string tuning, see <a href="/blog/why-is-guitar-tuned-the-way-it-is" className="underline hover:text-amber-900">Why is the guitar tuned the way it is?</a>
        </p>
      </section>

      {/* 7. Instrument Range */}
      <section className="mb-12" id="instrument-range" style={{ scrollMarginTop: '2rem' }}>
        <h3 className="text-3xl font-bold mb-6 text-amber-600">Instrument Range</h3>
        <p className="mb-4">
          Bass guitar is an octave lower (E1). Piano goes from A0 to C8.
        </p>
        <InstrumentRangeDiagram />
      </section>
      </section>
    </div>
  );
} 