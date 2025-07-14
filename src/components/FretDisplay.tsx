'use client';

import React, { useState } from 'react';

export default function FretDisplay() {
  const [showFlats, setShowFlats] = useState(false);
  const [selectedString, setSelectedString] = useState('A'); // Default to A string

  // Define the 6 guitar strings with their open notes
  const guitarStrings = [
    { name: 'E', label: 'Low E', note: 'E', tuning: 6 },
    { name: 'A', label: 'A', note: 'A', tuning: 5 },
    { name: 'D', label: 'D', note: 'D', tuning: 4 },
    { name: 'G', label: 'G', note: 'G', tuning: 3 },
    { name: 'B', label: 'B', note: 'B', tuning: 2 },
    { name: 'E-high', label: 'High E', note: 'E', tuning: 1 }
  ];

  const chromaticScale = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];

  const getNoteName = (note: string) => {
    if (!showFlats) return note;
    const sharpToFlat: { [key: string]: string } = {
      'A#': 'Bb', 'C#': 'Db', 'D#': 'Eb', 'F#': 'Gb', 'G#': 'Ab'
    };
    return sharpToFlat[note] || note;
  };

  const getFretNotes = () => {
    const selectedStringData = guitarStrings.find(s => s.name === selectedString);
    if (!selectedStringData) return [];
    const startNoteIndex = chromaticScale.indexOf(selectedStringData.note);
    const fretNotes = [];
    for (let fret = 0; fret <= 12; fret++) {
      const noteIndex = (startNoteIndex + fret) % 12;
      fretNotes.push({ fret, note: chromaticScale[noteIndex] });
    }
    return fretNotes;
  };

  return (
    <div className="mb-8">
      {/* String selection buttons */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
        {guitarStrings.map((string) => (
          <button
            key={string.name}
            onClick={() => setSelectedString(string.name)}
            className={`px-2 py-1 text-xs rounded transition-colors ${
              selectedString === string.name
                ? 'bg-amber-600 text-white border border-amber-700'
                : 'bg-amber-100 hover:bg-amber-200 text-amber-800 border border-amber-300'
            }`}
          >
            {string.label}
          </button>
        ))}
      </div>
      <div className="flex items-center justify-center gap-4 mb-4">
        <button
          onClick={() => setShowFlats(!showFlats)}
          className="px-3 py-1 text-xs bg-amber-100 hover:bg-amber-200 text-amber-800 border border-amber-300 rounded transition-colors"
        >
          {showFlats ? 'Show Sharps' : 'Show Flats'}
        </button>
      </div>
      {/* Fret diagram with aligned labels */}
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <h4 className="text-sm font-semibold text-amber-800 mb-3 text-center">
          First 12 frets of the {guitarStrings.find(s => s.name === selectedString)?.label} string:
        </h4>
        <div className="space-y-2">
          {/* Fret number labels row */}
          <div className="grid gap-1 text-center" style={{ gridTemplateColumns: 'repeat(13, 1fr)' }}>
            {getFretNotes().map((fretNote) => (
              <div key={fretNote.fret + '-label'} className="text-xs font-medium text-gray-600">
                {fretNote.fret === 0 ? 'Open' : fretNote.fret}
              </div>
            ))}
          </div>
          {/* Note squares row */}
          <div className="grid gap-1 text-center" style={{ gridTemplateColumns: 'repeat(13, 1fr)' }}>
            {getFretNotes().map((fretNote) => (
              <div key={fretNote.fret} className="w-8 h-8 bg-amber-200 border border-amber-300 rounded flex items-center justify-center text-xs font-medium text-amber-800 mx-auto">
                {getNoteName(fretNote.note)}
              </div>
            ))}
          </div>
        </div>
      </div>
      <p className="text-xs text-gray-500 text-center mt-2">
        Click a string above to view its notes on the first 12 frets.
      </p>
    </div>
  );
} 