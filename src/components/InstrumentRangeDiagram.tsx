import React from 'react';

// Updated color legend
const legend = [
  { label: 'Music theory lowest', color: '#A0AEC0' },
  { label: 'Hip hop Sub-bass', color: '#E53E3E' }, // red
  { label: 'Piano', color: '#68D391' }, // green
  { label: 'Guitar', color: '#B7791F' }, // dark amber
  { label: '7-string guitar', color: '#9B59B6' }, // purple
  { label: 'Bass guitar', color: '#3182CE' }, // blue
];

// Markers with color keys and only essential descriptions
const markers = [
  { label: 'C0', freq: 16.35, legend: 'Music theory lowest', color: '#A0AEC0', desc: '', position: 'above' },
  { label: 'G0', freq: 24.5, legend: 'Hip hop Sub-bass', color: '#E53E3E', desc: '', position: 'below' },
  { label: 'A0', freq: 27.5, legend: 'Piano', color: '#68D391', desc: 'piano lowest', position: 'above' },
  { label: 'E1', freq: 41.2, legend: 'Bass guitar', color: '#3182CE', desc: 'bass lowest', position: 'below' },
  { label: 'B1', freq: 61.74, legend: '7-string guitar', color: '#9B59B6', desc: '7-string lowest', position: 'above' },
  { label: 'E2', freq: 82.4, legend: 'Guitar', color: '#B7791F', desc: 'guitar lowest', position: 'below' },
  { label: 'A2', freq: 110, legend: 'Guitar', color: '#B7791F', desc: '', position: 'above' },
  { label: 'D3', freq: 146.8, legend: 'Guitar', color: '#B7791F', desc: '', position: 'below' },
  { label: 'G3', freq: 196, legend: 'Guitar', color: '#B7791F', desc: '', position: 'above' },
  { label: 'B3', freq: 246.9, legend: 'Guitar', color: '#B7791F', desc: '', position: 'below' },
  { label: 'E4', freq: 329.6, legend: 'Guitar', color: '#B7791F', desc: '', position: 'above' },
  { label: 'E5', freq: 659.3, legend: 'Guitar', color: '#B7791F', desc: '', position: 'below' },
  { label: 'E6', freq: 1318.5, legend: 'Guitar', color: '#B7791F', desc: 'guitar highest', position: 'above' },
  { label: 'C8', freq: 4186, legend: 'Piano', color: '#68D391', desc: 'piano highest', position: 'below' },
];

const minFreq = 16.35; // C0
const maxFreq = 4186; // C8
const minX = 50;
const maxX = 750;
const svgWidth = 800;
const svgHeight = 250; // Increased height to accommodate two-row legend

function freqToX(freq: number) {
  const logMin = Math.log2(minFreq);
  const logMax = Math.log2(maxFreq);
  const logF = Math.log2(freq);
  return minX + ((logF - logMin) / (logMax - logMin)) * (maxX - minX);
}

const barY = 80; // main bar position
const markerLineY1 = 65;
const markerLineY2 = 105;
const markerLabelYAbove = 55; // for labels above the bar
const markerLabelYBelow = 125; // for labels below the bar
const descYAbove = 35; // for descriptions above (moved up more)
const descYBelow = 145; // for descriptions below (moved down more)
const legendY = 180; // legend below the diagram
const legendRectY = legendY + 10;
const legendTextY = legendRectY + 20;

const InstrumentRangeDiagram = () => (
  <div>
    <div className="w-full overflow-x-auto">
      <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="min-w-max">
        {/* Main range bar */}
        <rect x={minX} y={barY} width={maxX - minX} height={18} fill="#B7791F" rx={9} opacity={0.3} />
        {/* Markers and labels */}
        {markers.map((m, i) => {
          const x = freqToX(m.freq);
          const isAbove = m.position === 'above';
          const labelY = isAbove ? markerLabelYAbove : markerLabelYBelow;
          const descY = isAbove ? descYAbove : descYBelow;
          
          return (
            <g key={i}>
              <line x1={x} y1={markerLineY1} x2={x} y2={markerLineY2} stroke={m.color} strokeWidth={7} />
              {/* Angled label */}
              <text x={x} y={labelY} textAnchor="middle" fontSize={20} fontWeight="bold" transform={`rotate(-35,${x},${labelY})`} fill={m.color}>{m.label}</text>
              {/* Description */}
              {m.desc && (
                <text x={x} y={descY} textAnchor="middle" fontSize={14} fill="#444">{m.desc}</text>
              )}
            </g>
          );
        })}
        {/* Color legend below the diagram - two rows */}
        {legend.slice(0, 3).map((l, i) => (
          <g key={l.label}>
            <rect x={minX + i * 220} y={legendRectY} width={24} height={24} fill={l.color} rx={4} />
            <text x={minX + i * 220 + 30} y={legendTextY} fontSize={13} fill="#333">{l.label}</text>
          </g>
        ))}
        {legend.slice(3).map((l, i) => (
          <g key={l.label}>
            <rect x={minX + i * 220} y={legendRectY + 35} width={24} height={24} fill={l.color} rx={4} />
            <text x={minX + i * 220 + 30} y={legendTextY + 35} fontSize={13} fill="#333">{l.label}</text>
          </g>
        ))}
      </svg>
    </div>
    
    {/* Text description explaining the chart */}
    <div className="mt-2 text-gray-700 text-base leading-relaxed max-w-5xl mx-auto">
      <p className="mb-2">
        This diagram shows the frequency range of different musical instruments and sounds, from the lowest note in music theory (C0 at 16.35 Hz) to the highest piano note (C8 at 4186 Hz). The horizontal axis uses a logarithmic scale to show the vast range of frequencies clearly.
      </p>

      <p className="mb-2">
        <strong>Guitar strings</strong> are marked in amber, showing all six open strings: E2 (lowest), A2, D3, G3, B3, and E4 (highest). The guitar's range extends from E2 up to E6 (24th fret on the high E string).
      </p>
      <p className="mb-2">
        <strong>Piano</strong> (green) spans from A0 to C8, covering nearly the full range of human hearing. <strong>Bass guitar</strong> (blue) starts at E1, while <strong>hip hop sub-bass</strong> (red) typically uses frequencies around G0 for deep, powerful bass sounds.
      </p>
      <p className="mb-2">
        <strong>Extended range instruments:</strong> 7-string and 8-string guitars (mostly used in metal music) add even lower notes: the 7-string's low B string (B1) sits between the lowest note of a standard 6-string guitar and a 4-string bass, while the 8-string's low F# string (F#1) goes even lower. Similarly, a 5-string bass guitar adds a low B string (B0), which is higher than the lowest note on a piano but lower than the standard 4-string bass.
      </p>
      <p>
        Understanding these frequency ranges helps guitarists know where their instrument fits in the musical spectrum and how it relates to other instruments in ensemble playing.
      </p>
    </div>
  </div>
);

export default InstrumentRangeDiagram; 