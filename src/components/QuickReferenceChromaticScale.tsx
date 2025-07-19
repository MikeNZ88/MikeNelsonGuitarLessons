'use client';

import React, { useState } from 'react';

export default function QuickReferenceChromaticScale() {
  const [showFlats, setShowFlats] = useState(false);
  const scale = showFlats
    ? ['A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A']
    : ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A'];
  return (
    <div className="mb-4">
      <div className="flex items-center justify-center mb-2">
        <button
          onClick={() => setShowFlats(f => !f)}
          className="px-3 py-1 text-xs bg-amber-100 hover:bg-amber-200 text-amber-800 border border-amber-300 rounded transition-colors"
        >
          {showFlats ? 'Show Sharps' : 'Show Flats'}
        </button>
      </div>
      <div className="overflow-x-auto">
        <div className="flex min-w-max justify-center">
          {scale.map((note, idx) => {
            // Only highlight B, C, E, F
            const isHighlight = ['B', 'C', 'E', 'F'].includes(note);
            return (
              <div
                key={idx}
                className={`w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 border border-amber-300 flex items-center justify-center text-xs sm:text-sm font-medium transition-colors mx-0.5 flex-shrink-0 ${isHighlight ? 'bg-amber-300 text-amber-900 font-bold' : 'bg-amber-50'}`}
              >
                {note}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
} 