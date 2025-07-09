'use client';
import React, { useState } from 'react';

interface TriadNote {
  string: number; // 1 (high E) to 6 (low E)
  fret: number;
  note: string;
  interval: '1' | '3' | '5';
  finger?: string; // Optional finger number for this note
  shapeColor?: string; // Optional shape color for shape names mode
  color?: string; // Optional custom color for this note
}

interface HorizontalTriadMapProps {
  triadNotes: TriadNote[];
  startFret?: number;
  fretCount?: number;
  labelModeDefault?: 'none' | 'note' | 'finger';
  useStandardStringOrder?: boolean; // true = tab style (high E at bottom), false = inverted (high E at top)
  hideLegend?: boolean; // Hide the interval legend (Root, 3rd, 5th)
  skipFingerMode?: boolean; // Skip finger mode in button toggle (only show note names and hide all)
  triadType?: 'Major' | 'Minor' | 'Diminished' | 'Augmented'; // Triad type for proper interval labeling
}

const stringNames = ['E', 'B', 'G', 'D', 'A', 'E']; // 1 (high) to 6 (low)
const intervalColors = {
  '1': '#ef4444', // root - red
  '3': '#a855f7', // 3rd - purple
  '5': '#fbbf24', // 5th - amber
};
const intervalLabels = {
  '1': 'Root',
  '3': '3rd',
  '5': '5th',
};

export default function HorizontalTriadMap({
  triadNotes,
  startFret = 3,
  fretCount = 13,
  labelModeDefault = 'none',
  useStandardStringOrder = true, // Default to tab style (high E at bottom)
  hideLegend = false,
  skipFingerMode = false,
  triadType = 'Major',
}: HorizontalTriadMapProps) {
  // labelMode: 'none' | 'note' | 'finger'
  const [labelMode, setLabelMode] = useState<'none' | 'note' | 'finger'>(labelModeDefault);

  // SVG layout
  const fretWidth = 40;
  const stringSpacing = 32;
  const leftMargin = 60;
  const topMargin = 40;
  const svgWidth = leftMargin + fretCount * fretWidth + 20;
  const svgHeight = topMargin + (stringNames.length - 1) * stringSpacing + 60;

  // Helper: Find triad note for a given string/fret
  function getTriadNote(string: number, fret: number) {
    return triadNotes.find(n => n.string === string && n.fret === fret);
  }

  // Button label logic
  const nextLabelMode = skipFingerMode 
    ? (labelMode === 'none' ? 'note' : 'none')  // Skip finger mode: none -> note -> none
    : (labelMode === 'none' ? 'note' : labelMode === 'note' ? 'finger' : 'none'); // Normal: none -> note -> finger -> none
  
  const buttonText = skipFingerMode
    ? (labelMode === 'none' ? 'Show Note Names' : 'Hide All Labels')
    : (labelMode === 'none' ? 'Show Note Names' : labelMode === 'note' ? 'Show Finger Numbers' : 'Hide All Labels');

  // Get proper interval labels based on triad type
  const getIntervalLabel = (interval: string) => {
    if (interval === '1') return 'Root (1)';
    if (interval === '3') {
      if (triadType === 'Major') return 'Major 3rd (3)';
      if (triadType === 'Minor' || triadType === 'Diminished') return 'Minor 3rd (♭3)';
      return '3rd';
    }
    if (interval === '5') {
      if (triadType === 'Diminished') return 'Diminished 5th (♭5)';
      return 'Perfect 5th (5)';
    }
    return interval;
  };

  return (
    <div className="overflow-x-auto">
      {/* Color Legend - moved above fretboard */}
      {!hideLegend && (
        <div className="flex justify-center gap-6 mb-4 text-sm">
          <div className="flex items-center gap-2">
            <span style={{background: intervalColors['1'], width: 16, height: 16, borderRadius: 8, display: 'inline-block', border: '1px solid #aaa'}}></span> 
            {getIntervalLabel('1')}
          </div>
          <div className="flex items-center gap-2">
            <span style={{background: intervalColors['3'], width: 16, height: 16, borderRadius: 8, display: 'inline-block', border: '1px solid #aaa'}}></span> 
            {getIntervalLabel('3')}
          </div>
          <div className="flex items-center gap-2">
            <span style={{background: intervalColors['5'], width: 16, height: 16, borderRadius: 8, display: 'inline-block', border: '1px solid #aaa'}}></span> 
            {getIntervalLabel('5')}
          </div>
        </div>
      )}
      <svg
        width={svgWidth}
        height={svgHeight}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        className="bg-white rounded shadow mx-auto"
      >
        {/* Frets */}
        {[...Array(fretCount + 1)].map((_, fret) => {
          const x = leftMargin + fret * fretWidth;
          return (
            <g key={fret}>
              <line
                x1={x}
                y1={topMargin}
                x2={x}
                y2={topMargin + (stringNames.length - 1) * stringSpacing}
                stroke={fret === 0 ? '#1f2937' : '#d1d5db'}
                strokeWidth={fret === 0 ? 3 : 1}
              />
              {fret > 0 && (
                <text
                  x={x - fretWidth / 2}
                  y={topMargin - 28}
                  textAnchor="middle"
                  fontSize={12}
                  fill="#888"
                  fontWeight="bold"
                >
                  {startFret + fret - 1}
                </text>
              )}
            </g>
          );
        })}
        {/* Strings */}
        {stringNames.map((name, i) => {
          const y = topMargin + i * stringSpacing;
          return (
            <g key={`string-${i}`}>
              <line
                x1={leftMargin}
                y1={y}
                x2={leftMargin + fretCount * fretWidth}
                y2={y}
                stroke="#aaa"
                strokeWidth={2}
              />
              {/* String label */}
              <text
                x={leftMargin - 20}
                y={y + 4}
                textAnchor="end"
                fontSize={13}
                fill="#555"
                fontWeight="bold"
              >
                {name}
              </text>
            </g>
          );
        })}
        {/* Triad Notes */}
        {triadNotes.map((n, idx) => {
          // SVG string index calculation based on string order preference
          const stringIdx = useStandardStringOrder 
            ? stringNames.length - n.string  // Tab style: 1 (high E) = bottom, 6 (low E) = top
            : n.string - 1;                  // Inverted: 1 (high E) = top, 6 (low E) = bottom
          const y = topMargin + stringIdx * stringSpacing;
          const x = leftMargin + (n.fret - startFret + 1) * fretWidth - fretWidth / 2;
          const fillColor = n.color || intervalColors[n.interval];
          return (
            <g key={`triad-${n.string}-${n.fret}-${idx}`}>
              <circle
                cx={x}
                cy={y}
                r={13}
                fill={fillColor}
                stroke="#333"
                strokeWidth={2}
              />
              {labelMode === 'note' && (
                <text
                  x={x}
                  y={y + 5}
                  textAnchor="middle"
                  fontSize={13}
                  fill="#fff"
                  fontWeight="bold"
                >
                  {n.note}
                </text>
              )}
              {labelMode === 'finger' && n.finger && (
                <text
                  x={x}
                  y={y + 5}
                  textAnchor="middle"
                  fontSize={13}
                  fill="#fff"
                  fontWeight="bold"
                >
                  {n.finger}
                </text>
              )}
            </g>
          );
        })}
      </svg>
      <div className="flex justify-center gap-3 mt-4">
        <button
          className="px-3 py-1 rounded bg-amber-600 text-white text-sm font-medium"
          onClick={() => setLabelMode(nextLabelMode)}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
} 