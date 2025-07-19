'use client';

import React, { useState } from 'react';
import Link from 'next/link';


type KeyType = string;
type ChordType = string;

const majorKeys = [
  'C', 'G', 'D', 'A', 'E', 'B', 'F♯/G♭', 'D♭', 'A♭', 'E♭', 'B♭', 'F'
];

const keySignatures: Record<string, string> = {
  'C': '', 'G': '1♯', 'D': '2♯', 'A': '3♯', 'E': '4♯', 'B': '5♯',
  'F♯/G♭': '6♯/6♭', 'D♭': '5♭', 'A♭': '4♭', 'E♭': '3♭', 'B♭': '2♭', 'F': '1♭'
};

const getKeyPosition = (index: number, radius: number) => {
  const angle = (index * 30) - 90;
  const radian = (angle * Math.PI) / 180;
  const x = Math.round((225 + radius * Math.cos(radian)) * 100) / 100;
  const y = Math.round((225 + radius * Math.sin(radian)) * 100) / 100;
  return { x, y };
};

const SimpleCircleOfFifths = () => {
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  // Define which notes are sharp/flat for each key (for highlighting)
  const keyAccidentals: Record<string, string[]> = {
    'C': [],
    'G': ['F♯'],
    'D': ['F♯', 'C♯'],
    'A': ['F♯', 'C♯', 'G♯'],
    'E': ['F♯', 'C♯', 'G♯', 'D♯'],
    'B': ['F♯', 'C♯', 'G♯', 'D♯', 'A♯'],
    'F♯/G♭': ['F♯', 'C♯', 'G♯', 'D♯', 'A♯', 'E♯'],
    'D♭': ['B♭', 'E♭', 'A♭', 'D♭', 'G♭'],
    'A♭': ['B♭', 'E♭', 'A♭', 'D♭'],
    'E♭': ['B♭', 'E♭', 'A♭'],
    'B♭': ['B♭', 'E♭'],
    'F': ['B♭']
  };

  // Color for each key (matching the interactive version)
  const keyColors: Record<string, string> = {
    'C': '#EF4444',      // Red
    'G': '#F97316',      // Orange  
    'D': '#EAB308',      // Yellow
    'A': '#22C55E',      // Green
    'E': '#06B6D4',      // Cyan
    'B': '#3B82F6',      // Blue
    'F♯/G♭': '#8B5CF6',  // Purple
    'D♭': '#EC4899',     // Pink
    'A♭': '#84CC16',     // Lime
    'E♭': '#F59E0B',     // Amber
    'B♭': '#10B981',     // Emerald
    'F': '#6366F1'       // Indigo
  };

  // Define the sharps and flats for each key
  const keyNotes: Record<string, { sharps: string[], flats: string[] }> = {
    'C': { sharps: [], flats: [] },
    'G': { sharps: ['F♯'], flats: [] },
    'D': { sharps: ['F♯', 'C♯'], flats: [] },
    'A': { sharps: ['F♯', 'C♯', 'G♯'], flats: [] },
    'E': { sharps: ['F♯', 'C♯', 'G♯', 'D♯'], flats: [] },
    'B': { sharps: ['F♯', 'C♯', 'G♯', 'D♯', 'A♯'], flats: [] },
    'F♯/G♭': { sharps: ['F♯', 'C♯', 'G♯', 'D♯', 'A♯', 'E♯'], flats: ['B♭', 'E♭', 'A♭', 'D♭', 'G♭', 'C♭'] },
    'D♭': { sharps: [], flats: ['B♭', 'E♭', 'A♭', 'D♭', 'G♭'] },
    'A♭': { sharps: [], flats: ['B♭', 'E♭', 'A♭', 'D♭'] },
    'E♭': { sharps: [], flats: ['B♭', 'E♭', 'A♭'] },
    'B♭': { sharps: [], flats: ['B♭', 'E♭'] },
    'F': { sharps: [], flats: ['B♭'] }
  };

  // Full scales for each key
  const keyScales: Record<string, string[]> = {
    'C': ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
    'G': ['G', 'A', 'B', 'C', 'D', 'E', 'F♯'],
    'D': ['D', 'E', 'F♯', 'G', 'A', 'B', 'C♯'],
    'A': ['A', 'B', 'C♯', 'D', 'E', 'F♯', 'G♯'],
    'E': ['E', 'F♯', 'G♯', 'A', 'B', 'C♯', 'D♯'],
    'B': ['B', 'C♯', 'D♯', 'E', 'F♯', 'G♯', 'A♯'],
    'F♯/G♭': ['F♯', 'G♯', 'A♯', 'B', 'C♯', 'D♯', 'E♯'],
    'D♭': ['D♭', 'E♭', 'F', 'G♭', 'A♭', 'B♭', 'C'],
    'A♭': ['A♭', 'B♭', 'C', 'D♭', 'E♭', 'F', 'G'],
    'E♭': ['E♭', 'F', 'G', 'A♭', 'B♭', 'C', 'D'],
    'B♭': ['B♭', 'C', 'D', 'E♭', 'F', 'G', 'A'],
    'F': ['F', 'G', 'A', 'B♭', 'C', 'D', 'E']
  };

  // Alternative sharp spellings for flat keys
  const alternativeSharpSpellings: Record<string, { key: string, sharps: string[], scale: string[] }> = {
    'D♭': { 
      key: 'C♯', 
      sharps: ['C♯', 'D♯', 'E♯', 'F♯', 'G♯', 'A♯', 'B♯'], 
      scale: ['C♯', 'D♯', 'E♯', 'F♯', 'G♯', 'A♯', 'B♯']
    },
    'A♭': { 
      key: 'G♯', 
      sharps: ['G♯', 'A♯', 'B♯', 'C♯', 'D♯', 'E♯', 'F♯♯'], 
      scale: ['G♯', 'A♯', 'B♯', 'C♯', 'D♯', 'E♯', 'F♯♯']
    },
    'E♭': { 
      key: 'D♯', 
      sharps: ['D♯', 'E♯', 'F♯♯', 'G♯', 'A♯', 'B♯', 'C♯♯'], 
      scale: ['D♯', 'E♯', 'F♯♯', 'G♯', 'A♯', 'B♯', 'C♯♯']
    },
    'B♭': { 
      key: 'A♯', 
      sharps: ['A♯', 'B♯', 'C♯♯', 'D♯', 'E♯', 'F♯♯', 'G♯♯'], 
      scale: ['A♯', 'B♯', 'C♯♯', 'D♯', 'E♯', 'F♯♯', 'G♯♯']
    },
    'F': { 
      key: 'E♯', 
      sharps: ['E♯', 'F♯♯', 'G♯♯', 'A♯', 'B♯', 'C♯♯', 'D♯♯'], 
      scale: ['E♯', 'F♯♯', 'G♯♯', 'A♯', 'B♯', 'C♯♯', 'D♯♯']
    }
  };

  const handleKeyClick = (key: string) => {
    setSelectedKey(selectedKey === key ? null : key);
  };

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  // Function to get display text with dynamic enharmonic spelling
  const getDisplayText = (key: string): string => {
    return key;
  };

  // Remove accidentalToCircleKey helper and accidental highlighting logic

  return (
    <div className="flex flex-col items-center p-8 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-amber-800 mb-2">Circle of Fifths</h1>
        <p className="text-amber-700 max-w-md">
          Click any key to see its sharps and flats. The fundamental relationship between keys in Western music theory.
        </p>
      </div>
      <div className="relative mb-8">
        <svg width="450" height="450" className="drop-shadow-lg">
          {/* Background circle */}
          <circle
            cx="225"
            cy="225"
            r="200"
            fill="black"
            stroke="#E2E8F0"
            strokeWidth="2"
          />
          {/* Dividing lines */}
          {Array.from({ length: 12 }, (_, i) => {
            const angle = (i * 30) - 90;
            const radian = (angle * Math.PI) / 180;
            const x1 = Math.round((225 + 60 * Math.cos(radian)) * 100) / 100;
            const y1 = Math.round((225 + 60 * Math.sin(radian)) * 100) / 100;
            const x2 = Math.round((225 + 200 * Math.cos(radian)) * 100) / 100;
            const y2 = Math.round((225 + 200 * Math.sin(radian)) * 100) / 100;
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#E2E8F0"
                strokeWidth="1"
                opacity="0.5"
              />
            );
          })}
          {/* Major keys */}
          {majorKeys.map((key, index) => {
            const { x, y } = getKeyPosition(index, 160);
            const isSelected = selectedKey === key;
            return (
              <g key={key}>
                <circle
                  cx={x}
                  cy={y}
                  r="24"
                  fill={keyColors[key] || '#3B82F6'}
                  stroke={isSelected ? '#1E40AF' : '#E2E8F0'}
                  strokeWidth={isSelected ? '3' : '2'}
                  className="cursor-pointer transition-all hover:stroke-blue-400"
                  onClick={() => handleKeyClick(key)}
                />
                <text
                  x={x}
                  y={y + 6}
                  textAnchor="middle"
                  fill="white"
                  fontSize="18"
                  fontWeight="bold"
                  className="cursor-pointer select-none"
                  onClick={() => handleKeyClick(key)}
                >
                  {getDisplayText(key)}
                </text>
                {/* Key signature */}
                <text
                  x={x}
                  y={y + 35}
                  textAnchor="middle"
                  className="text-slate-600 font-medium text-sm cursor-pointer select-none"
                  onClick={() => handleKeyClick(key)}
                >
                  {keySignatures[key]}
                </text>
              </g>
            );
          })}
          {/* Center label */}
          <text
            x="225"
            y="225"
            textAnchor="middle"
            fill="white"
            fontSize="14"
            fontWeight="500"
          >
            Circle of
          </text>
          <text
            x="225"
            y="240"
            textAnchor="middle"
            fill="white"
            fontSize="14"
            fontWeight="500"
          >
            Fifths
          </text>
        </svg>
      </div>

      {/* Key information panel */}
      {selectedKey && (
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mb-6 border border-amber-100">
          <h3 className="text-2xl font-bold text-amber-800 mb-4">
            {selectedKey} Major Key
          </h3>
          
          <div className="space-y-4">
            <p className="text-amber-700">
              <span className="font-medium">Key Signature:</span> {keySignatures[selectedKey] || 'No sharps or flats'}
            </p>
            
            {/* Full Scale Section */}
            <div>
              <button
                onClick={() => toggleSection('scale')}
                className="flex items-center justify-between w-full text-left font-medium text-slate-700 mb-2 hover:text-slate-900"
              >
                <span>Full Scale</span>
                <span className="text-lg">
                  {expandedSections.has('scale') ? '−' : '+'}
                </span>
              </button>
              {expandedSections.has('scale') && (
                <div className="bg-amber-50 rounded-lg p-3">
                  <div className="flex flex-wrap gap-1">
                    {keyScales[selectedKey].map((note, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-white text-amber-700 rounded text-sm font-medium border border-amber-200"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Sharps/Flats reverted to previous style */}
            {keyNotes[selectedKey].sharps.length > 0 && (
              <div>
                <p className="font-medium text-slate-700 mb-2">Sharps:</p>
                <div className="flex flex-wrap gap-2">
                  {keyNotes[selectedKey].sharps.map((note, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {keyNotes[selectedKey].flats.length > 0 && (
              <div>
                <p className="font-medium text-slate-700 mb-2">Flats:</p>
                <div className="flex flex-wrap gap-2">
                  {keyNotes[selectedKey].flats.map((note, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                    >
                      {note}
                    </span>
                  ))}
                </div>
                
                {/* Why Flats Instead of Sharps Section */}
                {alternativeSharpSpellings[selectedKey] && (
                  <div className="mt-3">
                    <button
                      onClick={() => toggleSection('alternative')}
                      className="flex items-center justify-between w-full text-left font-medium text-slate-700 mb-2 hover:text-slate-900"
                    >
                      <span>Why Flats Instead of Sharps?</span>
                      <span className="text-lg">
                        {expandedSections.has('alternative') ? '−' : '+'}
                      </span>
                    </button>
                    {expandedSections.has('alternative') && (
                      <div className="bg-amber-50 rounded-lg p-3 space-y-3">
                        <p className="text-sm text-amber-700">
                          This key uses {keyNotes[selectedKey].flats.length} flats instead of {alternativeSharpSpellings[selectedKey].sharps.length} sharps for simplicity.
                        </p>
                        
                        <div>
                          <p className="text-sm font-medium text-amber-800 mb-2">Alternative Sharp Spelling ({alternativeSharpSpellings[selectedKey].key}):</p>
                          <div className="flex flex-wrap gap-1 mb-2">
                            {alternativeSharpSpellings[selectedKey].sharps.map((note, index) => (
                              <span 
                                key={index}
                                className="px-2 py-1 bg-red-50 text-red-700 rounded text-xs font-medium border border-red-200"
                              >
                                {note}
                              </span>
                            ))}
                          </div>
                          <p className="text-xs text-amber-600">
                            Scale: {alternativeSharpSpellings[selectedKey].scale.join(' - ')}
                          </p>
                        </div>
                        
                        <p className="text-xs text-amber-700">
                          <strong>Why flats are preferred:</strong> Fewer accidentals, easier to read.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
            
            {keyNotes[selectedKey].sharps.length === 0 && keyNotes[selectedKey].flats.length === 0 && (
              <p className="text-slate-600 italic">No sharps or flats in this key</p>
            )}
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full border border-amber-100">
        <h4 className="font-bold text-amber-800 mb-4">How to Read</h4>
        <div className="space-y-2 text-sm text-amber-700">
          <p>• <strong>Click any key</strong> to see its sharps and flats</p>
          <p>• <strong>Clockwise:</strong> Each key is a perfect fifth above the previous</p>
          <p>• <strong>Counterclockwise:</strong> Each key is a perfect fourth above the previous</p>
          <p>• <strong>Key signatures:</strong> Show the number of sharps or flats</p>
          <p>• <strong>Enharmonic names:</strong> Some keys have two names (e.g., F♯/G♭)</p>
        </div>
      </div>
    </div>
  );
};

const ChromaticScaleBetweenFifths = () => {
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [showChromatic, setShowChromatic] = useState(false);

  // Color for each key (matching the circle of fifths)
  const keyColors: Record<string, string> = {
    'C': '#EF4444',      // Red
    'G': '#F97316',      // Orange  
    'D': '#EAB308',      // Yellow
    'A': '#22C55E',      // Green
    'E': '#06B6D4',      // Cyan
    'B': '#3B82F6',      // Blue
    'F♯/G♭': '#8B5CF6',  // Purple
    'D♭': '#EC4899',     // Pink
    'A♭': '#84CC16',     // Lime
    'E♭': '#F59E0B',     // Amber
    'B♭': '#10B981',     // Emerald
    'F': '#6366F1'       // Indigo
  };

  // Define the chromatic scale between each key and its fifth
  // Using enharmonic choices that lead to 5 different letters
  const chromaticBetweenFifths: Record<string, string[]> = {
    'C': ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G'], // C to G
    'G': ['G', 'G♯', 'A', 'A♯', 'B', 'C', 'C♯', 'D'], // G to D
    'D': ['D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A'], // D to A
    'A': ['A', 'A♯', 'B', 'C', 'C♯', 'D', 'D♯', 'E'], // A to E
    'E': ['E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B'], // E to B
    'B': ['B', 'C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯'], // B to F♯
    'F♯/G♭': ['F♯', 'G', 'G♯', 'A', 'A♯', 'B', 'C', 'C♯'], // F♯ to C♯
    'D♭': ['D♭', 'D', 'E♭', 'E', 'F', 'G♭', 'G', 'A♭'], // D♭ to A♭
    'A♭': ['A♭', 'A', 'B♭', 'B', 'C', 'D♭', 'D', 'E♭'], // A♭ to E♭
    'E♭': ['E♭', 'E', 'F', 'G♭', 'G', 'A♭', 'A', 'B♭'], // E♭ to B♭
    'B♭': ['B♭', 'B', 'C', 'D♭', 'D', 'E♭', 'E', 'F'], // B♭ to F
    'F': ['F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B', 'C']  // F to C
  };

  // Define the flat version for F♯/G♭ key
  const chromaticBetweenFifthsFlat: Record<string, string[]> = {
    'F♯/G♭': ['G♭', 'G', 'A♭', 'A', 'B♭', 'B', 'C', 'D♭'], // G♭ to D♭
  };

  // Define which notes in the chromatic scale are diatonic (in the key)
  const diatonicNotesInChromatic: Record<string, number[]> = {
    'C': [0, 2, 4, 5, 7], // C, D, E, F, G (1, 2, 3, 4, 5)
    'G': [0, 2, 4, 5, 7], // G, A, B, C, D (1, 2, 3, 4, 5)
    'D': [0, 2, 4, 5, 7], // D, E, F♯, G, A (1, 2, 3, 4, 5)
    'A': [0, 2, 4, 5, 7], // A, B, C♯, D, E (1, 2, 3, 4, 5)
    'E': [0, 2, 4, 5, 7], // E, F♯, G♯, A, B (1, 2, 3, 4, 5)
    'B': [0, 2, 4, 5, 7], // B, C♯, D♯, E, F♯ (1, 2, 3, 4, 5)
    'F♯/G♭': [0, 2, 4, 5, 7], // F♯, G♯, A♯, B, C♯ (1, 2, 3, 4, 5)
    'D♭': [0, 2, 4, 5, 7], // G♭, A♭, B♭, C, D♭ (1, 2, 3, 4, 5)
    'A♭': [0, 2, 4, 5, 7], // A♭, B♭, C, D♭, E♭ (1, 2, 3, 4, 5)
    'E♭': [0, 2, 4, 5, 7], // E♭, F, G, A♭, B♭ (1, 2, 3, 4, 5)
    'B♭': [0, 2, 4, 5, 7], // B♭, C, D, E♭, F (1, 2, 3, 4, 5)
    'F': [0, 2, 4, 5, 7]  // F, G, A, B♭, C (1, 2, 3, 4, 5)
  };

  // Get the fifth for each key
  const getFifth = (key: string): string => {
    const fifths: Record<string, string> = {
      'C': 'G', 'G': 'D', 'D': 'A', 'A': 'E', 'E': 'B', 'B': 'F♯',
      'F♯/G♭': 'C♯/D♭', 'D♭': 'A♭', 'A♭': 'E♭', 'E♭': 'B♭', 'B♭': 'F', 'F': 'C'
    };
    return fifths[key] || '';
  };

  const handleKeyClick = (key: string) => {
    setSelectedKey(selectedKey === key ? null : key);
  };

  const getKeyPosition = (index: number, radius: number) => {
    const angle = (index * 30) - 90;
    const radian = (angle * Math.PI) / 180;
    const x = Math.round((225 + radius * Math.cos(radian)) * 100) / 100;
    const y = Math.round((225 + radius * Math.sin(radian)) * 100) / 100;
    return { x, y };
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-amber-800 mb-2">Chromatic Scale Between Fifths</h2>
        <p className="text-amber-700 max-w-md">
          Click any key to see the chromatic scale between that note and its fifth (7 semitones higher).
        </p>
      </div>

      <div className="relative mb-8">
        <svg width="450" height="450" className="drop-shadow-lg">
          {/* Background circle */}
          <circle
            cx="225"
            cy="225"
            r="200"
            fill="black"
            stroke="#E2E8F0"
            strokeWidth="2"
          />
          {/* Dividing lines */}
          {Array.from({ length: 12 }, (_, i) => {
            const angle = (i * 30) - 90;
            const radian = (angle * Math.PI) / 180;
            const x1 = Math.round((225 + 60 * Math.cos(radian)) * 100) / 100;
            const y1 = Math.round((225 + 60 * Math.sin(radian)) * 100) / 100;
            const x2 = Math.round((225 + 200 * Math.cos(radian)) * 100) / 100;
            const y2 = Math.round((225 + 200 * Math.sin(radian)) * 100) / 100;
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#E2E8F0"
                strokeWidth="1"
                opacity="0.5"
              />
            );
          })}
          {/* Major keys */}
          {majorKeys.map((key, index) => {
            const { x, y } = getKeyPosition(index, 160);
            const isSelected = selectedKey === key;
            return (
              <g key={key}>
                <circle
                  cx={x}
                  cy={y}
                  r="24"
                  fill={keyColors[key] || '#3B82F6'}
                  stroke={isSelected ? '#1E40AF' : '#E2E8F0'}
                  strokeWidth={isSelected ? '3' : '2'}
                  className="cursor-pointer transition-all hover:stroke-blue-400"
                  onClick={() => handleKeyClick(key)}
                />
                <text
                  x={x}
                  y={y + 6}
                  textAnchor="middle"
                  fill="white"
                  fontSize="18"
                  fontWeight="bold"
                  className="cursor-pointer select-none"
                  onClick={() => handleKeyClick(key)}
                >
                  {key}
                </text>
                {/* Key signature */}
                <text
                  x={x}
                  y={y + 35}
                  textAnchor="middle"
                  className="text-slate-600 font-medium text-sm cursor-pointer select-none"
                  onClick={() => handleKeyClick(key)}
                >
                  {keySignatures[key]}
                </text>
              </g>
            );
          })}
          {/* Center label */}
          <text
            x="225"
            y="225"
            textAnchor="middle"
            fill="white"
            fontSize="14"
            fontWeight="500"
          >
            Circle of
          </text>
          <text
            x="225"
            y="240"
            textAnchor="middle"
            fill="white"
            fontSize="14"
            fontWeight="500"
          >
            Fifths
          </text>
        </svg>
      </div>

      {/* Chromatic scale information panel */}
      {selectedKey && (
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full mb-6 border border-amber-100">
          <h3 className="text-2xl font-bold text-amber-800 mb-4">
            Chromatic Scale: {selectedKey} to {getFifth(selectedKey)}
          </h3>
          
          <div className="space-y-4">
            <p className="text-amber-700">
              <span className="font-medium">A fifth is always 7 semitones higher</span> using the chromatic scale.
            </p>
            
            {/* Show both sharp and flat spellings for F♯/G♭ */}
            {selectedKey === 'F♯/G♭' ? (
              <div className="space-y-6">
                {/* Sharp spelling */}
                <div>
                  <p className="font-medium text-amber-800 mb-3">Sharp Spelling: F♯ to C♯</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {chromaticBetweenFifths[selectedKey].map((note, index) => {
                      const isDiatonic = diatonicNotesInChromatic[selectedKey].includes(index);
                      const isStartOrEnd = index === 0 || index === 7;
                      
                      return (
                        <div 
                          key={index}
                          className="flex flex-col items-center"
                        >
                          <div 
                            className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm border-2"
                            style={{ 
                              backgroundColor: isStartOrEnd 
                                ? keyColors[selectedKey] 
                                : isDiatonic 
                                  ? '#10B981' // Emerald green for diatonic notes
                                  : '#6B7280', // Gray for chromatic notes
                              borderColor: isStartOrEnd 
                                ? keyColors[selectedKey] 
                                : isDiatonic 
                                  ? '#059669' 
                                  : '#4B5563',
                              color: isStartOrEnd 
                                ? 'white' 
                                : isDiatonic 
                                  ? 'white' 
                                  : 'white'
                            }}
                          >
                            {note}
                          </div>
                          <span className="text-xs text-amber-600 mt-1">
                            {index === 0 ? 'Start' : index === 7 ? 'Fifth' : `${index} semitones`}
                          </span>
                          {isDiatonic && !isStartOrEnd && (
                            <span className="text-xs text-amber-500 mt-1 font-medium">
                              In key
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Flat spelling */}
                <div>
                  <p className="font-medium text-amber-800 mb-3">Flat Spelling: G♭ to D♭</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {chromaticBetweenFifthsFlat[selectedKey].map((note, index) => {
                      const isDiatonic = diatonicNotesInChromatic[selectedKey].includes(index);
                      const isStartOrEnd = index === 0 || index === 7;
                      
                      return (
                        <div 
                          key={index}
                          className="flex flex-col items-center"
                        >
                          <div 
                            className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm border-2"
                            style={{ 
                              backgroundColor: isStartOrEnd 
                                ? keyColors[selectedKey] 
                                : isDiatonic 
                                  ? '#10B981' // Emerald green for diatonic notes
                                  : '#6B7280', // Gray for chromatic notes
                              borderColor: isStartOrEnd 
                                ? keyColors[selectedKey] 
                                : isDiatonic 
                                  ? '#059669' 
                                  : '#4B5563',
                              color: isStartOrEnd 
                                ? 'white' 
                                : isDiatonic 
                                  ? 'white' 
                                  : 'white'
                            }}
                          >
                            {note}
                          </div>
                          <span className="text-xs text-amber-600 mt-1">
                            {index === 0 ? 'Start' : index === 7 ? 'Fifth' : `${index} semitones`}
                          </span>
                          {isDiatonic && !isStartOrEnd && (
                            <span className="text-xs text-amber-500 mt-1 font-medium">
                              In key
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              /* Regular display for other keys */
              <div>
                <p className="font-medium text-amber-800 mb-3">Chromatic Scale (12 notes):</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {chromaticBetweenFifths[selectedKey].map((note, index) => {
                    const isDiatonic = diatonicNotesInChromatic[selectedKey].includes(index);
                    const isStartOrEnd = index === 0 || index === 7;
                    
                    return (
                      <div 
                        key={index}
                        className="flex flex-col items-center"
                      >
                        <div 
                          className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm border-2"
                          style={{ 
                            backgroundColor: isStartOrEnd 
                              ? keyColors[selectedKey] 
                              : isDiatonic 
                                ? '#10B981' // Emerald green for diatonic notes
                                : '#6B7280', // Gray for chromatic notes
                            borderColor: isStartOrEnd 
                              ? keyColors[selectedKey] 
                              : isDiatonic 
                                ? '#059669' 
                                : '#4B5563',
                            color: isStartOrEnd 
                              ? 'white' 
                              : isDiatonic 
                                ? 'white' 
                                : 'white'
                          }}
                        >
                          {note}
                        </div>
                        <span className="text-xs text-amber-600 mt-1">
                          {index === 0 ? 'Start' : index === 7 ? 'Fifth' : `${index} semitones`}
                        </span>
                        {isDiatonic && !isStartOrEnd && (
                          <span className="text-xs text-amber-500 mt-1 font-medium">
                            In key
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            
                         <div className="bg-amber-50 rounded-lg p-4">
               <p className="text-sm text-amber-700 mb-2">
                                 <strong>Note:</strong> The chromatic scale between any two notes a fifth apart always contains 8 notes total (including start and end). The full chromatic scale contains all 12 notes in Western music. 
                  <strong>Enharmonic spellings</strong> (notes that sound the same but are written differently, like F♯ and G♭) are chosen to avoid repeating the same letter name in the sequence.
               </p>
                               <p className="text-sm text-amber-700">
                  <strong>Highlighting:</strong> Green circles show notes that are in the key (diatonic). Gray circles show chromatic passing tones (not in the key).
                </p>
             </div>
          </div>
        </div>
      )}

             <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full border border-amber-100">
         <h4 className="font-bold text-amber-800 mb-4">How to Read</h4>
         <div className="space-y-2 text-sm text-amber-700">
           <p>• <strong>Click any key</strong> to see its chromatic scale to the fifth</p>
           
           <p>• <strong>Green circles:</strong> Notes that are in the key (diatonic)</p>
           <p>• <strong>Gray circles:</strong> Chromatic passing tones (not in the key)</p>
           <p>• <strong>7 semitones:</strong> Always the distance between a note and its fifth</p>
           <p>• <strong>8 notes total:</strong> Including start and end notes in the chromatic sequence</p>
         </div>
       </div>
    </div>
  );
};

const CircleOfFifths = () => {
  const [selectedKey, setSelectedKey] = useState<KeyType | null>(null);

  // Major keys in clockwise order starting from C (using hybrid spelling)
  const majorKeys: KeyType[] = [
    'C', 'G', 'D', 'A', 'E', 'B', 'F♯/G♭', 'D♭', 'A♭', 'E♭', 'B♭', 'F'
  ];

  // Minor keys (relative minors) - using hybrid spelling
  const minorKeys: KeyType[] = [
    'Am', 'Em', 'Bm', 'F♯m', 'C♯m', 'G♯m', 'D♯m/E♭m', 'B♭m', 'Fm', 'Cm', 'Gm', 'Dm'
  ];

  // Sharps and flats for each key
  const keySignatures: Record<KeyType, string> = {
    'C': '', 'G': '1♯', 'D': '2♯', 'A': '3♯', 'E': '4♯', 'B': '5♯', 'F♯/G♭': '6♯/6♭',
    'D♭': '5♭', 'A♭': '4♭', 'E♭': '3♭', 'B♭': '2♭', 'F': '1♭'
  };

  const minorKeySignatures: Record<KeyType, string> = {
    'Am': '', 'Em': '1♯', 'Bm': '2♯', 'F♯m': '3♯', 'C♯m': '4♯', 'G♯m': '5♯', 'D♯m/E♭m': '6♯/6♭',
    'B♭m': '5♭', 'Fm': '4♭', 'Cm': '3♭', 'Gm': '2♭', 'Dm': '1♭'
  };

  // Color for each major-minor pair
  const keyColors: Record<KeyType, string> = {
    'C': '#EF4444', 'Am': '#EF4444',      // Red
    'G': '#F97316', 'Em': '#F97316',      // Orange  
    'D': '#EAB308', 'Bm': '#EAB308',      // Yellow
    'A': '#22C55E', 'F♯m': '#22C55E',     // Green
    'E': '#06B6D4', 'C♯m': '#06B6D4',     // Cyan
    'B': '#3B82F6', 'G♯m': '#3B82F6',     // Blue
    'F♯/G♭': '#8B5CF6', 'D♯m/E♭m': '#8B5CF6',    // Purple
    'D♭': '#EC4899', 'B♭m': '#EC4899',    // Pink
    'A♭': '#84CC16', 'Fm': '#84CC16',     // Lime
    'E♭': '#F59E0B', 'Cm': '#F59E0B',     // Amber
    'B♭': '#10B981', 'Gm': '#10B981',     // Emerald
    'F': '#6366F1', 'Dm': '#6366F1'       // Indigo
  };

  // Get diatonic chords for a key
  const getDiatonicChords = (key: KeyType): ChordType[] => {
    // Define the diatonic chords for each major key with correct enharmonic spellings
    const majorDiatonicChords: Record<KeyType, ChordType[]> = {
      'C': ['C', 'Dm', 'Em', 'F', 'G', 'Am', 'Bdim'],
      'G': ['G', 'Am', 'Bm', 'C', 'D', 'Em', 'F♯dim'],
      'D': ['D', 'Em', 'F♯m', 'G', 'A', 'Bm', 'C♯dim'],
      'A': ['A', 'Bm', 'C♯m', 'D', 'E', 'F♯m', 'G♯dim'],
      'E': ['E', 'F♯m', 'G♯m', 'A', 'B', 'C♯m', 'D♯dim'],
      'B': ['B', 'C♯m', 'D♯m', 'E', 'F♯', 'G♯m', 'A♯dim'],
      'F♯/G♭': ['F♯', 'G♯m', 'A♯m', 'B', 'C♯', 'D♯m', 'E♯dim'],
      'D♭': ['D♭', 'E♭m', 'Fm', 'G♭', 'A♭', 'B♭m', 'Cdim'],
      'A♭': ['A♭', 'B♭m', 'Cm', 'D♭', 'E♭', 'Fm', 'Gdim'],
      'E♭': ['E♭', 'Fm', 'Gm', 'A♭', 'B♭', 'Cm', 'Ddim'],
      'B♭': ['B♭', 'Cm', 'Dm', 'E♭', 'F', 'Gm', 'Adim'],
      'F': ['F', 'Gm', 'Am', 'B♭', 'C', 'Dm', 'Edim']
    };

    // Define the diatonic chords for each minor key (natural minor scale)
    const minorDiatonicChords: Record<KeyType, ChordType[]> = {
      'Am': ['Am', 'Bdim', 'C', 'Dm', 'Em', 'F', 'G'],
      'Em': ['Em', 'F♯dim', 'G', 'Am', 'Bm', 'C', 'D'],
      'Bm': ['Bm', 'C♯dim', 'D', 'Em', 'F♯m', 'G', 'A'],
      'F♯m': ['F♯m', 'G♯dim', 'A', 'Bm', 'C♯m', 'D', 'E'],
      'C♯m': ['C♯m', 'D♯dim', 'E', 'F♯m', 'G♯m', 'A', 'B'],
      'G♯m': ['G♯m', 'A♯dim', 'B', 'C♯m', 'D♯m', 'E', 'F♯'],
      'D♯m/E♭m': ['D♯m', 'E♯dim', 'F♯', 'G♯m', 'A♯m', 'B', 'C♯'],
      'B♭m': ['B♭m', 'Cdim', 'D♭', 'E♭m', 'Fm', 'G♭', 'A♭'],
      'Fm': ['Fm', 'Gdim', 'A♭', 'B♭m', 'Cm', 'D♭', 'E♭'],
      'Cm': ['Cm', 'Ddim', 'E♭', 'Fm', 'Gm', 'A♭', 'B♭'],
      'Gm': ['Gm', 'Adim', 'B♭', 'Cm', 'Dm', 'E♭', 'F'],
      'Dm': ['Dm', 'Edim', 'F', 'Gm', 'Am', 'B♭', 'C']
    };

    // Get the base diatonic chords
    let diatonicChords: ChordType[] = [];
    if (key.includes('m')) {
      diatonicChords = minorDiatonicChords[key] || [];
    } else {
      diatonicChords = majorDiatonicChords[key] || [];
    }

    // For enharmonic keys, we need to return the correct spellings based on the key
    if (key === 'D♯m/E♭m') {
      // E♭m is relative to G♭ major, so it uses flat spellings
      // The diatonic chords for E♭m are: E♭m, Fdim, G♭, A♭m, B♭m, C♭, D♭
      diatonicChords = ['E♭m', 'Fdim', 'G♭', 'A♭m', 'B♭m', 'C♭', 'D♭'];
    }
    if (key === 'G♯m') {
      // G♯m is relative to B major, so it uses sharp spellings
      // The diatonic chords for G♯m are: G♯m, A♯dim, B, C♯m, D♯m, E, F♯
      diatonicChords = ['G♯m', 'A♯dim', 'B', 'C♯m', 'D♯m', 'E', 'F♯'];
    }
    if (key === 'F♯/G♭') {
      // F♯/G♭ can use either sharp or flat spellings
      // We'll use flat spellings to match the G♭ convention
      // The diatonic chords for G♭ are: G♭, A♭m, B♭m, C♭, D♭, E♭m, Fdim
      diatonicChords = ['G♭', 'A♭m', 'B♭m', 'C♭', 'D♭', 'E♭m', 'Fdim'];
    }
    if (key === 'B') {
      // B major uses sharp spellings
      // The diatonic chords for B major are: B, C♯m, D♯m, E, F♯, G♯m, A♯dim
      diatonicChords = ['B', 'C♯m', 'D♯m', 'E', 'F♯', 'G♯m', 'A♯dim'];
    }
    if (key === 'E♭') {
      // E♭ major uses flat spellings
      // The diatonic chords for E♭ major are: E♭, Fm, Gm, A♭, B♭, Cm, Ddim
      diatonicChords = ['E♭', 'Fm', 'Gm', 'A♭', 'B♭', 'Cm', 'Ddim'];
    }
    if (key === 'D♯') {
      // D♯ major uses sharp spellings (enharmonic to E♭)
      // The diatonic chords for D♯ major are: D♯, E♯m, F♯♯m, F♯, G♯, A♯m, B♯dim
      // But we'll use the more common enharmonic equivalents
      diatonicChords = ['D♯', 'E♯m', 'F♯♯m', 'F♯', 'G♯', 'A♯m', 'B♯dim'];
    }

    return diatonicChords;
  };

  // Function to get the correct enharmonic spelling for a chord based on the selected key
  const getCorrectChordSpelling = (chord: ChordType, selectedKey: KeyType): ChordType => {
    if (!selectedKey) return chord;
    
    // Define which keys use which enharmonic spellings
    const sharpKeys = ['C', 'G', 'D', 'A', 'E', 'B', 'F♯/G♭'];
    const flatKeys = ['D♭', 'A♭', 'E♭', 'B♭', 'F'];
    
    // Handle the special case of F♯/G♭ - use sharp spelling for sharp keys, flat for flat keys
    if (selectedKey === 'F♯/G♭') {
      // For F♯/G♭ itself, we'll use sharp spelling as default
      return chord;
    }
    
    // Convert enharmonic spellings based on the selected key
    if (sharpKeys.includes(selectedKey)) {
      // Use sharp spellings
      return chord
        .replace('G♭', 'F♯')
        .replace('E♭m', 'D♯m')
        .replace('A♭', 'G♯')
        .replace('D♭', 'C♯')
        .replace('B♭', 'A♯');
    } else if (flatKeys.includes(selectedKey)) {
      // Use flat spellings
      return chord
        .replace('F♯', 'G♭')
        .replace('D♯m', 'E♭m')
        .replace('G♯', 'A♭')
        .replace('C♯', 'D♭')
        .replace('A♯', 'B♭');
    }
    
    return chord;
  };

  const getKeyPosition = (index: number) => {
    const angle = (index * 30) - 90; // 30 degrees per key, starting at top
    const radian = (angle * Math.PI) / 180;
    const radius = 190; // Major keys in outer ring
    const x = Math.round((275 + radius * Math.cos(radian)) * 100) / 100;
    const y = Math.round((275 + radius * Math.sin(radian)) * 100) / 100;
    return { x, y, angle };
  };

  const getMinorKeyPosition = (index: number) => {
    const angle = (index * 30) - 90;
    const radian = (angle * Math.PI) / 180;
    const radius = 120; // Balanced radius - not too close to major keys, not too far in
    const x = Math.round((275 + radius * Math.cos(radian)) * 100) / 100;
    const y = Math.round((275 + radius * Math.sin(radian)) * 100) / 100;
    return { x, y };
  };

  const getKeyColor = (key: KeyType): string => {
    if (!selectedKey) {
      // Show default colors when nothing is selected
      return keyColors[key] || '#9CA3AF';
    }
    
    const diatonicChords = getDiatonicChords(selectedKey);
    
    if (key === selectedKey) {
      return keyColors[selectedKey] || '#3B82F6';
    }
    
    // Get the display text for this key (which will be the correct enharmonic spelling)
    const displayText = getDisplayText(key);
    
    // Check if the display text matches any of the diatonic chords
    const isDiatonic = diatonicChords.includes(displayText);
    
    // Also check if the original key name matches any diatonic chords
    // This handles cases where the key name itself is in the diatonic chords
    const isOriginalKeyDiatonic = diatonicChords.includes(key);
    
    if (isDiatonic || isOriginalKeyDiatonic) {
      return keyColors[selectedKey] || '#3B82F6';
    }
    
    return '#9CA3AF'; // Gray for non-diatonic chords
  };

  // Function to get the correct display text for each circle based on the selected key
  const getDisplayText = (key: KeyType): string => {
    if (!selectedKey) {
      return key;
    }
    
    // Determine if the selected key uses sharp or flat spellings
    const usesSharps = ['B', 'G♯m'].includes(selectedKey);
    const usesFlats = ['F♯/G♭', 'D♯m/E♭m', 'E♭', 'D♯'].includes(selectedKey);
    
    // Handle the special enharmonic keys first
    if (key === 'F♯/G♭') {
      return selectedKey === 'F♯/G♭' ? 'G♭' : (usesSharps ? 'F♯' : 'G♭');
    }
    
    if (key === 'D♯m/E♭m') {
      return selectedKey === 'D♯m/E♭m' ? 'E♭m' : (usesSharps ? 'D♯m' : 'E♭m');
    }
    
    // Apply consistent spelling based on selected key preference
    if (usesSharps) {
      // Convert all flat spellings to sharp spellings
      if (key === 'D♭') return 'C♯';
      if (key === 'A♭') return 'G♯';
      if (key === 'E♭') return 'D♯';
      if (key === 'B♭') return 'A♯';
      if (key === 'G♭') return 'F♯';
      if (key === 'C♭') return 'B';
      if (key === 'F♭') return 'E';
      // Handle minor keys
      if (key === 'A♭m') return 'G♯m';
      if (key === 'E♭m') return 'D♯m';
      if (key === 'B♭m') return 'A♯m';
    } else if (usesFlats) {
      // Convert all sharp spellings to flat spellings
      if (key === 'C♯') return 'D♭';
      if (key === 'G♯') return 'A♭';
      if (key === 'D♯') return 'E♭';
      if (key === 'A♯') return 'B♭';
      if (key === 'F♯') return 'G♭';
      if (key === 'B') return 'C♭';
      if (key === 'E') return 'F♭';
      // Handle minor keys
      if (key === 'G♯m') return 'A♭m';
      if (key === 'D♯m') return 'E♭m';
      if (key === 'A♯m') return 'B♭m';
    }
    
    return key;
  };

  const handleKeyClick = (key: KeyType) => {
    setSelectedKey(selectedKey === key ? null : key);
  };

  const getChordRomanNumeral = (key: KeyType, selectedKey: KeyType): string => {
    if (!selectedKey) return '';
    
    // Get the display text for the chord
    const displayText = getDisplayText(key);
    
    // Define Roman numerals for major keys
    const majorRomanNumerals: Record<KeyType, Record<ChordType, string>> = {
      'C': { 'C': 'I', 'Dm': 'ii', 'Em': 'iii', 'F': 'IV', 'G': 'V', 'Am': 'vi', 'Bdim': 'vii°' },
      'G': { 'G': 'I', 'Am': 'ii', 'Bm': 'iii', 'C': 'IV', 'D': 'V', 'Em': 'vi', 'F♯dim': 'vii°' },
      'D': { 'D': 'I', 'Em': 'ii', 'F♯m': 'iii', 'G': 'IV', 'A': 'V', 'Bm': 'vi', 'C♯dim': 'vii°' },
      'A': { 'A': 'I', 'Bm': 'ii', 'C♯m': 'iii', 'D': 'IV', 'E': 'V', 'F♯m': 'vi', 'G♯dim': 'vii°' },
      'E': { 'E': 'I', 'F♯m': 'ii', 'G♯m': 'iii', 'A': 'IV', 'B': 'V', 'C♯m': 'vi', 'D♯dim': 'vii°' },
      'B': { 'B': 'I', 'C♯m': 'ii', 'D♯m': 'iii', 'E': 'IV', 'F♯': 'V', 'G♯m': 'vi', 'A♯dim': 'vii°' },
      'F♯/G♭': { 
        // Sharp spellings
        'F♯': 'I', 'G♯m': 'ii', 'A♯m': 'iii', 'B': 'IV', 'C♯': 'V', 'D♯m': 'vi', 'E♯dim': 'vii°',
        // Flat spellings  
        'G♭': 'I', 'A♭m': 'ii', 'B♭m': 'iii', 'C♭': 'IV', 'D♭': 'V', 'E♭m': 'vi', 'Fdim': 'vii°'
      },
      'D♭': { 'D♭': 'I', 'E♭m': 'ii', 'Fm': 'iii', 'G♭': 'IV', 'A♭': 'V', 'B♭m': 'vi', 'Cdim': 'vii°' },
      'A♭': { 'A♭': 'I', 'B♭m': 'ii', 'Cm': 'iii', 'D♭': 'IV', 'E♭': 'V', 'Fm': 'vi', 'Gdim': 'vii°' },
      'E♭': { 'E♭': 'I', 'Fm': 'ii', 'Gm': 'iii', 'A♭': 'IV', 'B♭': 'V', 'Cm': 'vi', 'Ddim': 'vii°' },
      'B♭': { 'B♭': 'I', 'Cm': 'ii', 'Dm': 'iii', 'E♭': 'IV', 'F': 'V', 'Gm': 'vi', 'Adim': 'vii°' },
      'F': { 'F': 'I', 'Gm': 'ii', 'Am': 'iii', 'B♭': 'IV', 'C': 'V', 'Dm': 'vi', 'Edim': 'vii°' }
    };

    // Define Roman numerals for minor keys (natural minor scale)
    const minorRomanNumerals: Record<KeyType, Record<ChordType, string>> = {
      'Am': { 'Am': 'i', 'Bdim': 'ii°', 'C': '♭III', 'Dm': 'iv', 'Em': 'v', 'F': '♭VI', 'G': '♭VII' },
      'Em': { 'Em': 'i', 'F♯dim': 'ii°', 'G': '♭III', 'Am': 'iv', 'Bm': 'v', 'C': '♭VI', 'D': '♭VII' },
      'Bm': { 'Bm': 'i', 'C♯dim': 'ii°', 'D': '♭III', 'Em': 'iv', 'F♯m': 'v', 'G': '♭VI', 'A': '♭VII' },
      'F♯m': { 'F♯m': 'i', 'G♯dim': 'ii°', 'A': '♭III', 'Bm': 'iv', 'C♯m': 'v', 'D': '♭VI', 'E': '♭VII' },
      'C♯m': { 'C♯m': 'i', 'D♯dim': 'ii°', 'E': '♭III', 'F♯m': 'iv', 'G♯m': 'v', 'A': '♭VI', 'B': '♭VII' },
      'G♯m': { 'G♯m': 'i', 'A♯dim': 'ii°', 'B': '♭III', 'C♯m': 'iv', 'D♯m': 'v', 'E': '♭VI', 'F♯': '♭VII' },
      'D♯m/E♭m': { 
        // Sharp spellings
        'D♯m': 'i', 'E♯dim': 'ii°', 'F♯': '♭III', 'G♯m': 'iv', 'A♯m': 'v', 'B': '♭VI', 'C♯': '♭VII',
        // Flat spellings
        'E♭m': 'i', 'Fdim': 'ii°', 'G♭': '♭III', 'A♭m': 'iv', 'B♭m': 'v', 'C♭': '♭VI', 'D♭': '♭VII'
      },
      'B♭m': { 'B♭m': 'i', 'Cdim': 'ii°', 'D♭': '♭III', 'E♭m': 'iv', 'Fm': 'v', 'G♭': '♭VI', 'A♭': '♭VII' },
      'Fm': { 'Fm': 'i', 'Gdim': 'ii°', 'A♭': '♭III', 'B♭m': 'iv', 'Cm': 'v', 'D♭': '♭VI', 'E♭': '♭VII' },
      'Cm': { 'Cm': 'i', 'Ddim': 'ii°', 'E♭': '♭III', 'Fm': 'iv', 'Gm': 'v', 'A♭': '♭VI', 'B♭': '♭VII' },
      'Gm': { 'Gm': 'i', 'Adim': 'ii°', 'B♭': '♭III', 'Cm': 'iv', 'Dm': 'v', 'E♭': '♭VI', 'F': '♭VII' },
      'Dm': { 'Dm': 'i', 'Edim': 'ii°', 'F': '♭III', 'Gm': 'iv', 'Am': 'v', 'B♭': '♭VI', 'C': '♭VII' }
    };

    // Try to find Roman numeral using both display text and original key
    if (selectedKey.includes('m')) {
      return minorRomanNumerals[selectedKey]?.[displayText] || minorRomanNumerals[selectedKey]?.[key] || '';
    } else {
      return majorRomanNumerals[selectedKey]?.[displayText] || majorRomanNumerals[selectedKey]?.[key] || '';
    }
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-amber-800 mb-2">Circle of Fifths with Chords</h1>
        <p className="text-amber-700 max-w-md">
          Click any key to highlight its diatonic chords. Major keys (outer circle) and relative minor keys (inner circle) are shown together. 
          The relative minor is the circle underneath the major - e.g., Am is relative minor of C major, Bm is relative minor of D major. 
          Relative major and minor keys share the same notes.
        </p>
      </div>

      <div className="relative mb-8">
        <svg width="550" height="550" className="drop-shadow-lg">
          {/* Background circle */}
          <circle
            cx="275"
            cy="275"
            r="240"
            fill="white"
            stroke="#E2E8F0"
            strokeWidth="2"
          />
          
          {/* Inner circle for minor keys */}
          <circle
            cx="275"
            cy="275"
            r="140"
            fill="#F8FAFC"
            stroke="#E2E8F0"
            strokeWidth="1"
          />

          {/* Dividing lines */}
          {Array.from({ length: 12 }, (_, i) => {
            const angle = (i * 30) - 90;
            const radian = (angle * Math.PI) / 180;
            const x1 = Math.round((275 + 70 * Math.cos(radian)) * 100) / 100;
            const y1 = Math.round((275 + 70 * Math.sin(radian)) * 100) / 100;
            const x2 = Math.round((275 + 240 * Math.cos(radian)) * 100) / 100;
            const y2 = Math.round((275 + 240 * Math.sin(radian)) * 100) / 100;
            
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#E2E8F0"
                strokeWidth="1"
                opacity="0.5"
              />
            );
          })}

          {/* Major keys */}
          {majorKeys.map((key, index) => {
            const { x, y } = getKeyPosition(index);
            const keyColor = getKeyColor(key);
            const isSelected = selectedKey === key;
            const displayText = getDisplayText(key);
            const isDiatonic = selectedKey && (
              getDiatonicChords(selectedKey).includes(displayText) || 
              getDiatonicChords(selectedKey).includes(key)
            );
            
            return (
              <g key={key}>
                <circle
                  cx={x}
                  cy={y}
                  r="36"
                  fill={keyColor}
                  stroke={isSelected ? '#1E40AF' : isDiatonic ? '#374151' : '#E2E8F0'}
                  strokeWidth={isSelected ? '3' : isDiatonic ? '2' : '2'}
                  className="cursor-pointer transition-all hover:stroke-blue-400"
                  onClick={() => handleKeyClick(key)}
                />
                <text
                  x={x}
                  y={y + 6}
                  textAnchor="middle"
                  fill="white"
                  fontSize="18"
                  fontWeight="bold"
                  className="cursor-pointer select-none"
                  onClick={() => handleKeyClick(key)}
                >
                  {getDisplayText(key)}
                </text>
              </g>
            );
          })}

          {/* Minor keys */}
          {minorKeys.map((key, index) => {
            const { x, y } = getMinorKeyPosition(index);
            const keyColor = getKeyColor(key);
            const isSelected = selectedKey === key;
            const displayText = getDisplayText(key);
            const isDiatonic = selectedKey && (
              getDiatonicChords(selectedKey).includes(displayText) || 
              getDiatonicChords(selectedKey).includes(key)
            );
            
            return (
              <g key={key}>
                <circle
                  cx={x}
                  cy={y}
                  r="32"
                  fill={keyColor}
                  stroke={isSelected ? '#1E40AF' : isDiatonic ? '#374151' : '#E2E8F0'}
                  strokeWidth={isSelected ? '3' : isDiatonic ? '2' : '2'}
                  className="cursor-pointer transition-all hover:stroke-blue-400"
                  onClick={() => handleKeyClick(key)}
                />
                <text
                  x={x}
                  y={y + 4}
                  textAnchor="middle"
                  fill="white"
                  fontSize="14"
                  fontWeight="500"
                  className="cursor-pointer select-none"
                  onClick={() => handleKeyClick(key)}
                >
                  {getDisplayText(key)}
                </text>
              </g>
            );
          })}


        </svg>
      </div>

      {/* Key information panel */}
      {selectedKey && (
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
          <h3 className="text-2xl font-bold text-slate-800 mb-4">
            {selectedKey === 'F♯/G♭' ? 'G♭ Major Key' : 
             selectedKey === 'D♯m/E♭m' ? 'E♭m Minor Key' :
             `${selectedKey} ${selectedKey.includes('m') ? 'Minor' : 'Major'} Key`}
          </h3>
          
          <div className="space-y-3">
            <p className="text-slate-600">
              <span className="font-medium">Key Signature:</span> {
                selectedKey.includes('m') 
                  ? minorKeySignatures[selectedKey] 
                  : keySignatures[selectedKey]
              }
            </p>
            
            <div>
              <p className="font-medium text-slate-700 mb-2">Diatonic Chords:</p>
              
              {/* Show both spellings for enharmonic keys */}
              {(selectedKey === 'F♯/G♭' || selectedKey === 'D♯m/E♭m') && (
                <div className="mb-4 space-y-3">
                  {/* Flat spelling first */}
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-2">
                      {selectedKey === 'F♯/G♭' ? 'G♭ Major Key:' : 'E♭m Minor Key:'}
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {getDiatonicChords(selectedKey).map((chord) => {
                        const displayText = getDisplayText(chord);
                        return (
                          <div key={chord} className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: keyColors[selectedKey] }}></div>
                            <span>{displayText}</span>
                            <span className="text-slate-500">({getChordRomanNumeral(chord, selectedKey)})</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  {/* Sharp spelling second */}
                  <div>
                    <p className="text-sm font-medium text-slate-600 mb-2">
                      {selectedKey === 'F♯/G♭' ? 'F♯ Major Key:' : 'D♯m Minor Key:'}
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {selectedKey === 'F♯/G♭' 
                        ? ['F♯', 'G♯m', 'A♯m', 'B', 'C♯', 'D♯m', 'E♯dim'].map((chord) => (
                            <div key={chord} className="flex items-center gap-2">
                              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: keyColors[selectedKey] }}></div>
                              <span>{chord}</span>
                              <span className="text-slate-500">({getChordRomanNumeral(chord, selectedKey)})</span>
                            </div>
                          ))
                        : ['D♯m', 'E♯dim', 'F♯', 'G♯m', 'A♯m', 'B', 'C♯'].map((chord) => (
                            <div key={chord} className="flex items-center gap-2">
                              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: keyColors[selectedKey] }}></div>
                              <span>{chord}</span>
                              <span className="text-slate-500">({getChordRomanNumeral(chord, selectedKey)})</span>
                            </div>
                          ))
                      }
                    </div>
                  </div>
                </div>
              )}
              
                             {/* Regular display for non-enharmonic keys */}
               {selectedKey !== 'F♯/G♭' && selectedKey !== 'D♯m/E♭m' && (
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {getDiatonicChords(selectedKey).map((chord) => {
                    const correctSpelling = getCorrectChordSpelling(chord, selectedKey);
                    const displayText = getDisplayText(chord);
                    return (
                      <div 
                        key={chord}
                        className="flex items-center gap-2"
                      >
                        <div 
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: keyColors[selectedKey] }}
                        ></div>
                        <span>{displayText}</span>
                        <span className="text-slate-500">
                          ({getChordRomanNumeral(chord, selectedKey)})
                        </span>
                      </div>
                    );
                  })}
                </div>
               )}
              <p className="text-xs text-slate-500 mt-2 italic">
                Note: Minor keys also follow the circle of fifths pattern, with their relative major keys determining the chord structure.
              </p>
              
              {/* Diminished Chord Explanation */}
              <div className="mt-4 p-3 bg-amber-50 rounded border border-amber-200">
                <p className="text-sm font-medium text-amber-800 mb-2">Why Only 6 Chords?</p>
                <p className="text-xs text-amber-700 mb-2">
                  The circle of fifths omits one chord from each key because it has a diminished 5th interval (flat 5th).
                </p>
                <p className="text-xs text-amber-700">
                  <strong>Omitted chord for {selectedKey}:</strong> {
                    // Major keys
                    selectedKey === 'C' ? 'B diminished (Bdim)' :
                    selectedKey === 'G' ? 'F♯ diminished (F♯dim)' :
                    selectedKey === 'D' ? 'C♯ diminished (C♯dim)' :
                    selectedKey === 'A' ? 'G♯ diminished (G♯dim)' :
                    selectedKey === 'E' ? 'D♯ diminished (D♯dim)' :
                    selectedKey === 'B' ? 'A♯ diminished (A♯dim)' :
                    selectedKey === 'F♯/G♭' ? 'E♯ diminished (E♯dim) / F diminished (Fdim)' :
                    selectedKey === 'D♭' ? 'C♭ diminished (C♭dim)' :
                    selectedKey === 'A♭' ? 'G♭ diminished (G♭dim)' :
                    selectedKey === 'E♭' ? 'D♭ diminished (D♭dim)' :
                    selectedKey === 'B♭' ? 'A♭ diminished (A♭dim)' :
                    selectedKey === 'F' ? 'E diminished (Edim)' :
                    // Minor keys - the diminished chord (2nd chord) is omitted
                    selectedKey === 'Am' ? 'B diminished (Bdim)' :
                    selectedKey === 'Em' ? 'F♯ diminished (F♯dim)' :
                    selectedKey === 'Bm' ? 'C♯ diminished (C♯dim)' :
                    selectedKey === 'F♯m' ? 'G♯ diminished (G♯dim)' :
                    selectedKey === 'C♯m' ? 'D♯ diminished (D♯dim)' :
                    selectedKey === 'G♯m' ? 'A♯ diminished (A♯dim)' :
                    selectedKey === 'D♯m/E♭m' ? 'E♯ diminished (E♯dim) / F diminished (Fdim)' :
                    selectedKey === 'B♭m' ? 'C diminished (Cdim)' :
                    selectedKey === 'Fm' ? 'G diminished (Gdim)' :
                    selectedKey === 'Cm' ? 'D diminished (Ddim)' :
                    selectedKey === 'Gm' ? 'A diminished (Adim)' :
                    selectedKey === 'Dm' ? 'E diminished (Edim)' :
                    'Unknown'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      {!selectedKey && (
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
          <h4 className="font-bold text-slate-800 mb-4">How to Use</h4>
          <div className="space-y-2 text-sm text-slate-600">
            <p>• <strong>Click any key</strong> to see its diatonic chords highlighted</p>
            <p>• <strong>Outer circle:</strong> Major keys</p>
            <p>• <strong>Inner circle:</strong> Relative minor keys</p>
            <p>• <strong>Each key pair</strong> has its own unique color</p>
            <p>• <strong>Major keys</strong> show I, IV, V (major) and ii, iii, vi (minor)</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default function CircleOfFifthsPage() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-50">
      <div className="container-max section-padding">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-playfair text-amber-800 mb-6">
              The Circle of Fifths: A Complete Guide
            </h1>
            <p className="text-xl text-amber-700 max-w-3xl mx-auto leading-relaxed">
              Master the fundamental relationship between keys in Western music theory. 
              Learn how sharps and flats accumulate, understand key signatures, and discover 
              the patterns that connect all major and minor keys.
            </p>
          </div>

          {/* Navigation Menu */}
          <div className="card mb-12">
            <nav className="flex flex-wrap justify-center gap-4">
              <a href="#circle-of-fifths" className="px-4 py-2 bg-amber-100 text-amber-800 rounded-lg hover:bg-amber-200 transition-colors font-medium">
                Circle of Fifths
              </a>
              <a href="#chromatic-scale" className="px-4 py-2 bg-amber-100 text-amber-800 rounded-lg hover:bg-amber-200 transition-colors font-medium">
                Chromatic Scale Between Fifths
              </a>
              <a href="#circle-with-chords" className="px-4 py-2 bg-amber-100 text-amber-800 rounded-lg hover:bg-amber-200 transition-colors font-medium">
                Circle of Fifths with Chords
              </a>
              <a href="#key-signatures" className="px-4 py-2 bg-amber-100 text-amber-800 rounded-lg hover:bg-amber-200 transition-colors font-medium">
                Key Signatures
              </a>
              <a href="#enharmonic-equivalents" className="px-4 py-2 bg-amber-100 text-amber-800 rounded-lg hover:bg-amber-200 transition-colors font-medium">
                Enharmonic Equivalents
              </a>
              <a href="#practical-applications" className="px-4 py-2 bg-amber-100 text-amber-800 rounded-lg hover:bg-amber-200 transition-colors font-medium">
                Practical Applications
              </a>
              <a href="#quick-reference" className="px-4 py-2 bg-amber-100 text-amber-800 rounded-lg hover:bg-amber-200 transition-colors font-medium">
                Quick Reference
              </a>
            </nav>
          </div>

          {/* Notes Reference */}
          <div className="card mb-8">
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-amber-800 mb-3">
                New to Musical Notes?
              </h3>
              <p className="text-amber-700 mb-4">
                If you're not familiar with musical notes, sharps (♯), flats (♭), or basic music theory concepts, 
                I recommend starting with my comprehensive guide to notes on the guitar.
              </p>
              <a 
                href="/blog/beginners-guide-notes-guitar" 
                className="inline-flex items-center px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-medium"
              >
                Read: Beginner's Guide to Notes on the Guitar →
              </a>
            </div>
          </div>

          {/* Introduction */}
          <div className="card mb-12">
            <h2 className="text-3xl font-bold text-amber-800 mb-6 font-playfair">What is the Circle of Fifths?</h2>
            <div className="prose prose-amber max-w-none">
              <p className="text-lg text-amber-700 mb-4">
                The Circle of Fifths is one of the most important concepts in music theory. It's a visual representation 
                of the relationships between the 12 tones of the chromatic scale, their corresponding key signatures, 
                and the associated major and minor keys.
              </p>
              <p className="text-lg text-amber-700 mb-4">
                Moving clockwise around the circle, each key is a perfect fifth (7 semitones) above the previous key. 
                This creates a pattern where sharps are added one by one. Moving counterclockwise, each key is a perfect 
                fourth (5 semitones) above the previous key, adding flats one by one.
              </p>
            </div>
          </div>

          {/* Simple Circle of Fifths */}
          <div id="circle-of-fifths" className="card mb-12">
            <SimpleCircleOfFifths />
            
            {/* Order of Sharps and Flats Explanation */}
            <div className="mt-8 p-6 bg-amber-50 rounded-lg border border-amber-200">
              <h3 className="text-xl font-bold text-amber-800 mb-4">How Sharps and Flats Work on the Circle</h3>
              <div className="space-y-4 text-amber-700">
                <div>
                  <h4 className="font-bold text-amber-800 mb-2">Sharps (Clockwise from F):</h4>
                  <p className="mb-2">Sharps start from F and move clockwise around the circle, adding the sharp symbol (♯):</p>
                  <div className="bg-white p-3 rounded border border-amber-200">
                    <span className="font-mono text-lg">F♯ → C♯ → G♯ → D♯ → A♯ → E♯</span>
                  </div>
                  <p className="text-sm mt-2">Each key adds one more sharp in this order.</p>
                </div>
                
                <div>
                  <h4 className="font-bold text-amber-800 mb-2">Flats (Counterclockwise from B):</h4>
                  <p className="mb-2">Flats start from B and move counterclockwise around the circle, adding the flat symbol (♭):</p>
                  <div className="bg-white p-3 rounded border border-amber-200">
                    <span className="font-mono text-lg">B♭ → E♭ → A♭ → D♭ → G♭ → C♭</span>
                  </div>
                  <p className="text-sm mt-2">Each key adds one more flat in this order.</p>
                </div>
                
                <div className="bg-amber-100 p-4 rounded border border-amber-300">
                  <h4 className="font-bold text-amber-800 mb-2">Important Note About Enharmonic Spellings:</h4>
                  <p className="text-sm">
                    The keys F♯ and G♭ contain the notes E♯ and C♭ respectively. These are actually F and B, 
                    but because scale spelling requires each letter to be used only once, they get spelled this way. 
                    For example, if F♯ major wasn't spelled with E♯, it would be F♯ G♯ A♯ B C♯ D♯ F, which repeats F.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Chromatic Scale Between Fifths */}
          <div id="chromatic-scale" className="card mb-12">
            <ChromaticScaleBetweenFifths />
          </div>

          {/* Interactive Circle of Fifths */}
          <div id="circle-with-chords" className="card mb-12">
            <CircleOfFifths />
          </div>

          {/* Key Signatures Section */}
          <div id="key-signatures" className="card mb-12">
            <h2 className="text-3xl font-bold text-amber-800 mb-6 font-playfair">Understanding Key Signatures</h2>
            <div className="prose prose-amber max-w-none">
              <p className="text-lg text-amber-700 mb-4">
                Key signatures tell us which notes are sharp or flat throughout a piece of music. They appear at the 
                beginning of each staff and apply to every octave of the specified notes.
              </p>
              
              <h3 className="text-2xl font-bold text-amber-800 mt-8 mb-4">Sharp Keys</h3>
              <p className="text-lg text-amber-700 mb-4">
                Sharp keys are found on the right side of the circle. The order of sharps is: F♯, C♯, G♯, D♯, A♯, E♯, B♯. 
                You can remember this with the mnemonic: <strong>Father Charles Goes Down And Ends Battle</strong>.
              </p>
              
              <h3 className="text-2xl font-bold text-amber-800 mt-8 mb-4">Flat Keys</h3>
              <p className="text-lg text-amber-700 mb-4">
                Flat keys are found on the left side of the circle. The order of flats is: B♭, E♭, A♭, D♭, G♭, C♭, F♭. 
                You can remember this with the mnemonic: <strong>Battle Ends And Down Goes Charles' Father</strong>.
              </p>
              
              <h3 className="text-2xl font-bold text-amber-800 mt-8 mb-4">Enharmonic Keys</h3>
              <p className="text-lg text-amber-700 mb-4">
                Some keys have two names because they sound the same but are written differently. For example, F♯ major 
                and G♭ major are enharmonic equivalents. The choice between them often depends on the musical context 
                and which spelling makes the music easier to read.
              </p>
              <p className="text-lg text-amber-700 mb-4">
                In this guide, we choose the spelling that uses the least accidentals (sharps/flats). For example, 
                D♭ major (5 flats) is preferred over C♯ major (7 sharps) because it avoids the confusing B♯ (actually C) 
                and E♯ (actually F). However, I show F♯/G♭ and D♯/E♭ as enharmonic pairs because they have equal 
                amounts of accidentals (6 sharps vs 6 flats), making both theoretically just as difficult to remember and apply. 
                The choice is yours.
              </p>
            </div>
          </div>



          {/* Practical Applications */}
          <div id="practical-applications" className="card mb-12">
            <h2 className="text-3xl font-bold text-amber-800 mb-6 font-playfair">Practical Applications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-amber-800 mb-4">Songwriting</h3>
                <p className="text-amber-700">
                  Use the circle to find closely related keys for modulation, create chord progressions, 
                  and understand which keys work well together.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-amber-800 mb-4">Transposition</h3>
                <p className="text-amber-700">
                  Quickly transpose music by moving around the circle. Each step clockwise raises the key 
                  by a perfect fifth, each step counterclockwise lowers it by a perfect fourth.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-amber-800 mb-4">Key Signatures</h3>
                <p className="text-amber-700">
                  Memorize key signatures by understanding the pattern. The number of sharps or flats 
                  increases as you move around the circle.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-amber-800 mb-4">Chord Progressions</h3>
                <p className="text-amber-700">
                  The circle shows the most common chord progressions. Keys next to each other 
                  are closely related and work well together. For example, C major shares 4 chords 
                  with its neighbors F and G: F major shares F, C, Am, and Dm with C major, while 
                  G major shares C, G, Am, and Em with C major. This pattern works for every key 
                  on the circle.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Reference */}
          <div id="quick-reference" className="card mb-12">
            <h2 className="text-3xl font-bold text-amber-800 mb-6 font-playfair">Quick Reference</h2>
            
            <p className="text-amber-700 mb-6 text-lg">
              <strong>Color coding:</strong> Keys with the same color have the same notes but different spellings (sharps vs flats).
            </p>
            
            <div className="bg-amber-100 border border-amber-300 rounded-lg p-4 mb-6">
              <p className="text-amber-800 font-semibold text-lg mb-3">
                <strong>Important Rules:</strong>
              </p>
              <ul className="text-amber-800 space-y-2">
                <li><strong>1.</strong> All keys must use either sharps or flats consistently - never both.</li>
                <li><strong>2.</strong> Each letter must only be used once. For example, if you use F♯, then the note F would have to be written as E♯. If you use C, then C♯ can't be used and should be spelled as D♭ instead.</li>
                <li><strong>3.</strong> Choose the spelling that uses the fewest number of accidentals. For example, prefer B♭ major (2 flats) over A♯ major (10 sharps).</li>
              </ul>
            </div>
            
            {/* Sharps and Flats in Every Key */}
            <div id="sharps-and-flats-in-every-key" className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-bold text-amber-800 mb-4">Sharps and Flats in Every Key</h3>
              <div className="text-base text-amber-600 mb-4 space-y-2">
                <p className="italic">
                  <strong>Traditional Teaching Method:</strong> These mnemonics represent the complete theoretical order of sharps and flats. 
                  They're valuable for understanding the full circle of fifths and music theory principles.
                </p>
                <p className="italic">
                  <strong>Practical Considerations:</strong> In real music, composers and arrangers often choose keys that minimize accidentals. 
                  For example, why write in F♯ major (6 sharps) when G major (1 sharp) is much easier to read and play? F♯ major and G major are only 1 semitone apart, so our ear will hear them as being close to each other.
                </p>
                <p className="italic">
                  <strong>Important Note:</strong> Not all music is written with theoretical considerations in mind. 
                  Key choices may be based on vocal range, instrument tuning, historical conventions, or simply personal preference.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-amber-700 mb-2">Sharps: "Father Charles Goes Down And Ends Battle"</h4>
                  <p className="text-sm text-amber-600 mb-3">F♯, C♯, G♯, D♯, A♯, E♯, B♯</p>
                  <p className="text-base text-amber-600 italic">Note: B♯ (enharmonic to C) is used in <span className="text-pink-600">C♯ major</span> (7 sharps) but is theoretical and rarely used in practice. Instead, we use <span className="text-pink-600">D♭ major</span> (5 flats).</p>

                </div>
                <div>
                  <h4 className="font-semibold text-amber-700 mb-2">Flats: "Battle Ends And Down Goes Charles' Father"</h4>
                  <p className="text-sm text-amber-600 mb-3">B♭, E♭, A♭, D♭, G♭, C♭, F♭</p>
                  <p className="text-base text-amber-500 italic">Note: F♭ (enharmonic to E) is used in <span className="text-blue-600">C♭ major</span> (7 flats) but is theoretical and rarely used in practice. Instead, we use <span className="text-blue-600">B major</span> (5 sharps).</p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              {/* No Sharps or Flats */}
              <div>
                <h3 className="text-xl font-bold text-amber-800 mb-4">No Sharps or Flats</h3>
                <ul className="space-y-2 text-amber-700">
                  <li><strong>C major:</strong> No sharps or flats<br />
                    <span className="text-sm text-amber-600">Scale: (1) C, (2) D, (3) E, (4) F, (5) G, (6) A, (7) B</span></li>
                </ul>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-amber-800 mb-4">Sharp Keys</h3>
                  <ul className="space-y-2 text-amber-700">
                    <li><strong>G major:</strong> 1 sharp (<strong>F♯</strong>)<br />
                      <span className="text-sm text-amber-600">Scale: (1) G, (2) A, (3) B, (4) C, (5) D, (6) E, (7) <strong>F♯</strong></span></li>
                    <li><strong>D major:</strong> 2 sharps (<strong>F♯</strong>, <strong>C♯</strong>)<br />
                      <span className="text-sm text-amber-600">Scale: (1) D, (2) E, (3) <strong>F♯</strong>, (4) G, (5) A, (6) B, (7) <strong>C♯</strong></span></li>
                    <li><strong>A major:</strong> 3 sharps (<strong>F♯</strong>, <strong>C♯</strong>, <strong>G♯</strong>)<br />
                      <span className="text-sm text-amber-600">Scale: (1) A, (2) B, (3) <strong>C♯</strong>, (4) D, (5) E, (6) <strong>F♯</strong>, (7) <strong>G♯</strong></span></li>
                    <li><strong>E major:</strong> 4 sharps (<strong>F♯</strong>, <strong>C♯</strong>, <strong>G♯</strong>, <strong>D♯</strong>)<br />
                      <span className="text-sm text-amber-600">Scale: (1) E, (2) <strong>F♯</strong>, (3) <strong>G♯</strong>, (4) A, (5) B, (6) <strong>C♯</strong>, (7) <strong>D♯</strong></span></li>
                    <li><strong><span className="text-blue-600">B major</span>:</strong> 5 sharps (<strong>F♯</strong>, <strong>C♯</strong>, <strong>G♯</strong>, <strong>D♯</strong>, <strong>A♯</strong>)<br />
                      <span className="text-sm text-amber-600">Scale: (1) B, (2) <strong>C♯</strong>, (3) <strong>D♯</strong>, (4) E, (5) <strong>F♯</strong>, (6) <strong>G♯</strong>, (7) <strong>A♯</strong></span></li>
                    <li><strong><span className="text-purple-600">F♯ major</span>:</strong> 6 sharps (<strong>F♯</strong>, <strong>C♯</strong>, <strong>G♯</strong>, <strong>D♯</strong>, <strong>A♯</strong>, <strong>E♯</strong>)<br />
                      <span className="text-sm text-amber-600">Scale: (1) <strong>F♯</strong>, (2) <strong>G♯</strong>, (3) <strong>A♯</strong>, (4) B, (5) <strong>C♯</strong>, (6) <strong>D♯</strong>, (7) <strong>E♯</strong></span></li>
                    <li><strong><span className="text-pink-600">C♯ major</span>:</strong> 7 sharps (<strong>F♯</strong>, <strong>C♯</strong>, <strong>G♯</strong>, <strong>D♯</strong>, <strong>A♯</strong>, <strong>E♯</strong>, <strong>B♯</strong>) <span className="text-amber-500 italic text-sm">D♭ major has 5 flats so we use it instead</span><br />
                      <span className="text-sm text-amber-600">Scale: (1) <strong>C♯</strong>, (2) <strong>D♯</strong>, (3) <strong>E♯</strong>, (4) <strong>F♯</strong>, (5) <strong>G♯</strong>, (6) <strong>A♯</strong>, (7) <strong>B♯</strong></span></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-amber-800 mb-4">Flat Keys</h3>
                  <ul className="space-y-2 text-amber-700">
                    <li><strong>F major:</strong> 1 flat (<strong>B♭</strong>)<br />
                      <span className="text-sm text-amber-600">Scale: (1) F, (2) G, (3) A, (4) <strong>B♭</strong>, (5) C, (6) D, (7) E</span></li>
                    <li><strong>B♭ major:</strong> 2 flats (<strong>B♭</strong>, <strong>E♭</strong>)<br />
                      <span className="text-sm text-amber-600">Scale: (1) <strong>B♭</strong>, (2) C, (3) D, (4) <strong>E♭</strong>, (5) F, (6) G, (7) A</span></li>
                    <li><strong>E♭ major:</strong> 3 flats (<strong>B♭</strong>, <strong>E♭</strong>, <strong>A♭</strong>)<br />
                      <span className="text-sm text-amber-600">Scale: (1) <strong>E♭</strong>, (2) F, (3) G, (4) <strong>A♭</strong>, (5) <strong>B♭</strong>, (6) C, (7) D</span></li>
                    <li><strong>A♭ major:</strong> 4 flats (<strong>B♭</strong>, <strong>E♭</strong>, <strong>A♭</strong>, <strong>D♭</strong>)<br />
                      <span className="text-sm text-amber-600">Scale: (1) <strong>A♭</strong>, (2) <strong>B♭</strong>, (3) C, (4) <strong>D♭</strong>, (5) <strong>E♭</strong>, (6) F, (7) G</span></li>
                    <li><strong><span className="text-pink-600">D♭ major</span>:</strong> 5 flats (<strong>B♭</strong>, <strong>E♭</strong>, <strong>A♭</strong>, <strong>D♭</strong>, <strong>G♭</strong>)<br />
                      <span className="text-sm text-amber-600">Scale: (1) <strong>D♭</strong>, (2) <strong>E♭</strong>, (3) F, (4) <strong>G♭</strong>, (5) <strong>A♭</strong>, (6) <strong>B♭</strong>, (7) C</span></li>
                    <li><strong><span className="text-purple-600">G♭ major</span>:</strong> 6 flats (<strong>B♭</strong>, <strong>E♭</strong>, <strong>A♭</strong>, <strong>D♭</strong>, <strong>G♭</strong>, <strong>C♭</strong>)<br />
                      <span className="text-sm text-amber-600">Scale: (1) <strong>G♭</strong>, (2) <strong>A♭</strong>, (3) <strong>B♭</strong>, (4) <strong>C♭</strong>, (5) <strong>D♭</strong>, (6) <strong>E♭</strong>, (7) F</span></li>
                    <li><strong><span className="text-blue-600">C♭ major</span>:</strong> 7 flats (<strong>B♭</strong>, <strong>E♭</strong>, <strong>A♭</strong>, <strong>D♭</strong>, <strong>G♭</strong>, <strong>C♭</strong>, <strong>F♭</strong>) <span className="text-amber-500 italic text-sm">B major has 5 sharps so we use it instead</span><br />
                      <span className="text-sm text-amber-600">Scale: (1) <strong>C♭</strong>, (2) <strong>D♭</strong>, (3) <strong>E♭</strong>, (4) <strong>F♭</strong>, (5) <strong>G♭</strong>, (6) <strong>A♭</strong>, (7) <strong>B♭</strong></span></li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Why We Don't Use A♯, D♯, G♯ Major */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mt-8">
              <h3 className="text-lg font-bold text-amber-800 mb-4">Why Don't We Use A♯, D♯, G♯, C♯, or C♭ Major?</h3>
              <p className="text-amber-700 mb-4">
                These keys exist but are rarely used because they have too many sharps, making them impractical:
              </p>
              <ul className="space-y-2 text-amber-700">
                <li><strong>A♯ major:</strong> 10 sharps (F##, C##, G##, D♯, A♯, E♯, B♯) - enharmonic to B♭ major (2 flats)</li>
                <li><strong>D♯ major:</strong> 9 sharps (F##, C##, G♯, D♯, A♯, E♯, B♯) - enharmonic to E♭ major (3 flats)</li>
                <li><strong>G♯ major:</strong> 8 sharps (F##, C♯, G♯, D♯, A♯, E♯, B♯) - enharmonic to A♭ major (4 flats)</li>
                <li><strong>C♯ major:</strong> 7 sharps (F♯, C♯, G♯, D♯, A♯, E♯, B♯) - enharmonic to D♭ major (5 flats)</li>
                <li><strong>C♭ major:</strong> 7 flats (B♭, E♭, A♭, D♭, G♭, C♭, F♭) - enharmonic to B major (5 sharps)</li>
              </ul>
              <p className="text-amber-700 mb-4">
                <strong>Why this is so impractical:</strong>
              </p>
              <ul className="space-y-2 text-amber-700 mb-4">
                <li>
                  <strong>Double sharps (##):</strong>
                  <div className="ml-4 mt-2 space-y-2">
                    <p>These are the same notes as natural notes:</p>
                    <ul className="ml-4 space-y-1">
                      <li>• F## is actually G</li>
                      <li>• C## is actually D</li>
                      <li>• G## is actually A</li>
                    </ul>
                    <p>So why write F## when you could just write G?</p>
                    <p>This creates absurd situations like G♯ major having 8 sharps (6 single sharps + 1 double sharp F## = 6 + 2 = 8 total) for a 7-note scale!</p>
                    <p>That's why we use A♭ major (4 flats) instead.</p>
                  </div>
                </li>
                <li><strong>Confusing notation:</strong> Reading F## when you could just write G is unnecessarily complex</li>
                <li><strong>Performance difficulty:</strong> Musicians have to mentally translate double sharps while reading</li>
                <li><strong>Error-prone:</strong> More accidentals = more chances for mistakes in reading and writing</li>
              </ul>
              <p className="text-amber-600 text-sm mt-3 italic">
                Instead, we use their enharmonic equivalents with fewer accidentals, making the music much easier to read and play.
              </p>
              
              <div className="mt-6 p-4 bg-white rounded border border-amber-200">
                <h4 className="font-semibold text-amber-800 mb-3">What About Minor Keys?</h4>
                <p className="text-amber-700 mb-3">
                  Minor keys follow the same spelling rules as their relative major keys. For example, G♯ minor is not written as A♭ minor because its relative major is B major, and B major uses a sharp spelling.
                </p>
                <p className="text-amber-700 mb-3">
                  <strong>Important rule:</strong> All keys must use either sharps or flats consistently - never both. The choice depends on the relative major key's spelling.
                </p>
                <div className="text-sm text-amber-600 italic">
                  <p><strong>Example:</strong> G♯ minor uses sharps because its relative major (B major) uses sharps. If we called it A♭ minor instead, we'd have to call B as C♭, and we want to avoid that.</p>
                </div>
              </div>
            </div>

            {/* Enharmonic Equivalents Diagram */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mt-8">
              <h3 className="text-lg font-bold text-amber-800 mb-4">Enharmonic Equivalents</h3>
              <p className="text-amber-700 mb-4">
                These notes sound the same but are written differently depending on whether we're using sharp or flat spellings:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-amber-700 mb-3">Sharp Spellings</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center p-2 rounded border">
                      <div className="flex-1 bg-green-100 p-2 rounded-l border-r border-green-300">
                        <span className="font-medium text-green-600">C♯</span>
                      </div>
                      <div className="px-3 py-2 bg-gray-50">
                        <span className="text-amber-600">=</span>
                      </div>
                      <div className="flex-1 bg-green-100 p-2 rounded-r border-l border-green-300">
                        <span className="font-medium text-green-600">D♭</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded border">
                      <div className="flex-1 bg-green-100 p-2 rounded-l border-r border-green-300">
                        <span className="font-medium text-green-600">D♯</span>
                      </div>
                      <div className="px-3 py-2 bg-gray-50">
                        <span className="text-amber-600">=</span>
                      </div>
                      <div className="flex-1 bg-green-100 p-2 rounded-r border-l border-green-300">
                        <span className="font-medium text-green-600">E♭</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded border">
                      <div className="flex-1 bg-red-100 p-2 rounded-l border-r border-red-300">
                        <span className="font-medium text-red-600">E♯</span>
                      </div>
                      <div className="px-3 py-2 bg-gray-50">
                        <span className="text-amber-600">=</span>
                      </div>
                      <div className="flex-1 bg-green-100 p-2 rounded-r border-l border-green-300">
                        <span className="font-medium text-green-600">F</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded border">
                      <div className="flex-1 bg-green-100 p-2 rounded-l border-r border-green-300">
                        <span className="font-medium text-green-600">F♯</span>
                      </div>
                      <div className="px-3 py-2 bg-gray-50">
                        <span className="text-amber-600">=</span>
                      </div>
                      <div className="flex-1 bg-green-100 p-2 rounded-r border-l border-green-300">
                        <span className="font-medium text-green-600">G♭</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded border">
                      <div className="flex-1 bg-green-100 p-2 rounded-l border-r border-green-300">
                        <span className="font-medium text-green-600">G♯</span>
                      </div>
                      <div className="px-3 py-2 bg-gray-50">
                        <span className="text-amber-600">=</span>
                      </div>
                      <div className="flex-1 bg-green-100 p-2 rounded-r border-l border-green-300">
                        <span className="font-medium text-green-600">A♭</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded border">
                      <div className="flex-1 bg-green-100 p-2 rounded-l border-r border-green-300">
                        <span className="font-medium text-green-600">A♯</span>
                      </div>
                      <div className="px-3 py-2 bg-gray-50">
                        <span className="text-amber-600">=</span>
                      </div>
                      <div className="flex-1 bg-green-100 p-2 rounded-r border-l border-green-300">
                        <span className="font-medium text-green-600">B♭</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded border">
                      <div className="flex-1 bg-red-100 p-2 rounded-l border-r border-red-300">
                        <span className="font-medium text-red-600">B♯</span>
                      </div>
                      <div className="px-3 py-2 bg-gray-50">
                        <span className="text-amber-600">=</span>
                      </div>
                      <div className="flex-1 bg-green-100 p-2 rounded-r border-l border-green-300">
                        <span className="font-medium text-green-600">C</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-amber-700 mb-3">Flat Spellings</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center p-2 rounded border">
                      <div className="flex-1 bg-green-100 p-2 rounded-l border-r border-green-300">
                        <span className="font-medium text-green-600">D♭</span>
                      </div>
                      <div className="px-3 py-2 bg-gray-50">
                        <span className="text-amber-600">=</span>
                      </div>
                      <div className="flex-1 bg-green-100 p-2 rounded-r border-l border-green-300">
                        <span className="font-medium text-green-600">C♯</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded border">
                      <div className="flex-1 bg-green-100 p-2 rounded-l border-r border-green-300">
                        <span className="font-medium text-green-600">E♭</span>
                      </div>
                      <div className="px-3 py-2 bg-gray-50">
                        <span className="text-amber-600">=</span>
                      </div>
                      <div className="flex-1 bg-green-100 p-2 rounded-r border-l border-green-300">
                        <span className="font-medium text-green-600">D♯</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded border">
                      <div className="flex-1 bg-red-100 p-2 rounded-l border-r border-red-300">
                        <span className="font-medium text-red-600">F♭</span>
                      </div>
                      <div className="px-3 py-2 bg-gray-50">
                        <span className="text-amber-600">=</span>
                      </div>
                      <div className="flex-1 bg-green-100 p-2 rounded-r border-l border-green-300">
                        <span className="font-medium text-green-600">E</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded border">
                      <div className="flex-1 bg-green-100 p-2 rounded-l border-r border-green-300">
                        <span className="font-medium text-green-600">G♭</span>
                      </div>
                      <div className="px-3 py-2 bg-gray-50">
                        <span className="text-amber-600">=</span>
                      </div>
                      <div className="flex-1 bg-green-100 p-2 rounded-r border-l border-green-300">
                        <span className="font-medium text-green-600">F♯</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded border">
                      <div className="flex-1 bg-green-100 p-2 rounded-l border-r border-green-300">
                        <span className="font-medium text-green-600">A♭</span>
                      </div>
                      <div className="px-3 py-2 bg-gray-50">
                        <span className="text-amber-600">=</span>
                      </div>
                      <div className="flex-1 bg-green-100 p-2 rounded-r border-l border-green-300">
                        <span className="font-medium text-green-600">G♯</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded border">
                      <div className="flex-1 bg-green-100 p-2 rounded-l border-r border-green-300">
                        <span className="font-medium text-green-600">B♭</span>
                      </div>
                      <div className="px-3 py-2 bg-gray-50">
                        <span className="text-amber-600">=</span>
                      </div>
                      <div className="flex-1 bg-green-100 p-2 rounded-r border-l border-green-300">
                        <span className="font-medium text-green-600">A♯</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded border">
                      <div className="flex-1 bg-red-100 p-2 rounded-l border-r border-red-300">
                        <span className="font-medium text-red-600">C♭</span>
                      </div>
                      <div className="px-3 py-2 bg-gray-50">
                        <span className="text-amber-600">=</span>
                      </div>
                      <div className="flex-1 bg-green-100 p-2 rounded-r border-l border-green-300">
                        <span className="font-medium text-green-600">B</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-amber-600 text-sm mt-4 italic">
                <strong>Note:</strong> The choice between sharp and flat spellings depends on the key signature and musical context. 
                We generally choose the spelling that uses fewer accidentals and follows the key signature pattern.
              </p>
              <p className="text-red-600 text-sm mt-2 italic">
                <strong>Note:</strong> <span className="text-red-600">Red background</span> indicates spellings that are generally avoided as they create confusing notation (like E♯ instead of F, or C♭ instead of B). However, these problematic spellings still exist in music theory because they cannot always be avoided - for example, the key of F♯ major needs an E♯, or we would have to use the letter F twice (not allowed).
              </p>
            </div>
          </div>

          {/* Related Content */}
          <div className="card mb-12">
            <h2 className="text-3xl font-bold text-amber-800 mb-6 font-playfair">Continue Your Music Theory Journey</h2>
            <div className="bg-gradient-to-r from-amber-50 to-amber-100 p-6 rounded-lg border border-amber-200">
              <h3 className="text-xl font-bold text-amber-800 mb-3">Explore Chords in Every Key</h3>
              <p className="text-amber-700 mb-4">
                Now that you understand the Circle of Fifths, dive deeper into how chords work in different keys. 
                Learn about chord progressions, Roman numerals, and how to use this knowledge in your playing.
              </p>
              <a 
                href="/blog/key-chords-explorer" 
                className="inline-flex items-center px-6 py-3 bg-amber-600 text-white font-medium rounded-lg hover:bg-amber-700 transition-colors"
              >
                Explore Chords in Every Key →
              </a>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <div className="card bg-gradient-to-br from-amber-600 to-amber-700 text-white">
              <h2 className="text-3xl font-bold mb-4 font-playfair">Ready to Master Music Theory?</h2>
              <p className="text-xl mb-6 text-amber-100">
                Take your guitar playing to the next level with personalized lessons from Mike Nelson.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/contact" 
                  className="btn-primary bg-white text-amber-800 hover:bg-amber-50"
                >
                  Book Your First Lesson
                </a>
                <a 
                  href="/lessons" 
                  className="btn-secondary bg-transparent text-white border-white hover:bg-white hover:text-amber-800"
                >
                  View Lesson Options
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}