'use client';

import React, { useState } from 'react';

export default function ChromaticScale() {
  const [showFlats, setShowFlats] = useState(false);

  // 12 notes plus octave repeat
  const chromaticScale = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A'];

  const getNoteName = (note: string) => {
    if (!showFlats) return note;
    const sharpToFlat: { [key: string]: string } = {
      'A#': 'Bb', 'C#': 'Db', 'D#': 'Eb', 'F#': 'Gb', 'G#': 'Ab'
    };
    return sharpToFlat[note] || note;
  };

  return (
    <div className="mb-8">
      <div className="flex min-w-max justify-center">
        {chromaticScale.map((note, index) => (
          <div
            key={index}
            className="w-12 h-12 sm:w-16 sm:h-16 border border-amber-300 flex items-center justify-center text-xs sm:text-sm font-medium transition-colors bg-amber-50 mx-0.5"
          >
            {getNoteName(note)}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-4 mt-4">
        <button
          onClick={() => setShowFlats(!showFlats)}
          className="px-3 py-1 text-xs bg-amber-100 hover:bg-amber-200 text-amber-800 border border-amber-300 rounded transition-colors"
        >
          {showFlats ? 'Show Sharps' : 'Show Flats'}
        </button>
      </div>
    </div>
  );
} 