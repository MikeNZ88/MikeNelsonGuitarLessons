import React from 'react';

export const stringNames = ['E', 'A', 'D', 'G', 'B', 'E'];

export interface ChordData {
  frets: number[];
  fingers: string[];
  rootString?: number;
  startFret?: number;
  changedFrets?: number[];
  technique?: string;
  worksWith?: string;
}

export interface ChordDiagramProps {
  chordName: string;
  chordData: ChordData;
  isPowerChord?: boolean;
  showLabels?: boolean;
  showArrow?: boolean | null;
  changeText?: string | null;
  highlightChanges?: number[] | null;
  shapeColor?: string; // Optional color for shape/inversion
}

const ChordDiagram: React.FC<ChordDiagramProps> = ({
  chordName,
  chordData,
  isPowerChord = false,
  showLabels = true,
  showArrow = null,
  changeText = null,
  highlightChanges = null,
  shapeColor,
}) => {
  if (!chordData) return null;

  const fretCount = 5; // Standard 5-fret chord diagram
  const startFret = chordData.startFret || 0;
  const actualHighlights = highlightChanges || chordData.changedFrets || [];

  return (
    <div className="flex flex-col items-center bg-white p-4 rounded-lg border border-gray-200 shadow-sm relative">
      {showArrow && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="text-2xl text-orange-500">↓</div>
        </div>
      )}
      {changeText && (
        <div className="mb-2 text-sm font-medium text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
          {changeText}
        </div>
      )}
      <h3 className="text-lg font-bold text-gray-800 mb-2">{chordName}</h3>
      {startFret > 0 && (
        <div className="text-xs text-gray-600 mb-2">{startFret}fr</div>
      )}
      <svg width="140" height="140" className="bg-gray-50 rounded">
        {/* Frets */}
        {Array.from({ length: fretCount + 1 }, (_, i) => (
          <line
            key={`fret-${i}`}
            x1="20"
            y1={20 + i * 18}
            x2={20 + (stringNames.length - 1) * 20}
            y2={20 + i * 18}
            stroke={i === 0 ? "#1f2937" : "#9ca3af"}
            strokeWidth={i === 0 ? "3" : "1"}
          />
        ))}
        {/* Strings */}
        {stringNames.map((_, stringIndex) => (
          <line
            key={`string-${stringIndex}`}
            x1={20 + stringIndex * 20}
            y1="10"
            x2={20 + stringIndex * 20}
            y2={20 + fretCount * 18}
            stroke="#4b5563"
            strokeWidth="1"
          />
        ))}
        {/* String labels at bottom */}
        {showLabels && stringNames.map((stringName, index) => (
          <text
            key={`label-${index}`}
            x={20 + index * 20}
            y="130"
            textAnchor="middle"
            className="text-xs font-medium fill-gray-600"
          >
            {stringName}
          </text>
        ))}
        {/* Finger positions */}
        {chordData.frets.map((fret, stringIndex) => {
          const finger = chordData.fingers[stringIndex];
          const x = 20 + stringIndex * 20;
          const isHighlighted = actualHighlights.includes(stringIndex);
          if (fret === -1) {
            // Muted string (X) - above the nut
            return (
              <g key={`muted-${stringIndex}`}>
                <text
                  x={x}
                  y="8"
                  textAnchor="middle"
                  className="text-sm font-bold fill-red-600"
                >
                  ×
                </text>
              </g>
            );
          } else if (fret === 0) {
            // Open string (O) - above the nut
            return (
              <g key={`open-${stringIndex}`}>
                <circle
                  cx={x}
                  cy="8"
                  r="3"
                  fill="none"
                  stroke={isHighlighted ? "#f97316" : "#16a34a"}
                  strokeWidth="2"
                />
              </g>
            );
          } else {
            // Fretted note - between frets
            const displayFret = startFret > 0 ? fret - startFret + 1 : fret;
            const y = 20 + (displayFret - 0.5) * 18;
            return (
              <g key={`fret-${stringIndex}`}>
                <circle
                  cx={x}
                  cy={y}
                  r="6"
                  fill={isHighlighted ? "#f97316" : (shapeColor || "#1f2937")}
                  stroke={isHighlighted ? "#ea580c" : "#374151"}
                  strokeWidth="2"
                />
                {finger && (
                  <text
                    x={x}
                    y={y + 3}
                    textAnchor="middle"
                    className="text-xs font-bold fill-white"
                  >
                    {finger}
                  </text>
                )}
              </g>
            );
          }
        })}
        {/* Power chord root indicator */}
        {isPowerChord && chordData.rootString && (
          <text
            x={20 + (chordData.rootString - 1) * 20}
            y="122"
            textAnchor="middle"
            className="text-xs font-bold fill-orange-600"
          >
            R
          </text>
        )}
      </svg>
      {chordData.technique && (
        <div className="mt-2 text-xs text-gray-600 text-center max-w-32">
          {chordData.technique}
        </div>
      )}
      {chordData.worksWith && (
        <div className="mt-2 text-xs text-amber-700 text-center max-w-40 bg-amber-50 px-2 py-1 rounded border border-amber-200">
          <span className="font-semibold">Works with:</span> {chordData.worksWith}
        </div>
      )}
    </div>
  );
};

export default ChordDiagram; 