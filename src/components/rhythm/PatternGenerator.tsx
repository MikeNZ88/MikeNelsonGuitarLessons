'use client';

import React, { useState, useRef } from 'react';
import { GuitarStrumEngine, StrumPattern } from '@/utils/audio/guitarStrumEngine';

type GridType = '8th' | '16th';

interface GridPosition {
  time: number;
  label: string;
  beat: number;
  subdivision: number;
}

export default function PatternGenerator() {
  const [gridType, setGridType] = useState<GridType>('8th');
  const [activeStrokes, setActiveStrokes] = useState<Set<number>>(new Set());
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [showGhostStrums, setShowGhostStrums] = useState(false);
  const [currentStrokeIndex, setCurrentStrokeIndex] = useState(-1);
  const [bpm, setBpm] = useState(120);
  const [patternName, setPatternName] = useState('My Custom Pattern');
  const engineRef = useRef<GuitarStrumEngine | null>(null);
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);
  const loopIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Initialize audio engine
  React.useEffect(() => {
    engineRef.current = new GuitarStrumEngine();
    engineRef.current.setSoundMode('percussion');
    return () => {
      timeoutRefs.current.forEach(timeout => clearTimeout(timeout));
      if (loopIntervalRef.current) {
        clearTimeout(loopIntervalRef.current);
      }
    };
  }, []);

  const clearTimeouts = () => {
    timeoutRefs.current.forEach(timeout => clearTimeout(timeout));
    timeoutRefs.current = [];
    if (loopIntervalRef.current) {
      clearTimeout(loopIntervalRef.current);
      loopIntervalRef.current = null;
    }
  };

  // Generate grid positions based on grid type
  const generateGridPositions = (): GridPosition[] => {
    const positions: GridPosition[] = [];
    
    if (gridType === '8th') {
      // 8th note grid: 1, &, 2, &, 3, &, 4, &
      for (let beat = 0; beat < 4; beat++) {
        positions.push({
          time: beat,
          label: (beat + 1).toString(),
          beat: beat + 1,
          subdivision: 0
        });
        positions.push({
          time: beat + 0.5,
          label: '&',
          beat: beat + 1,
          subdivision: 1
        });
      }
    } else {
      // 16th note grid: 1, e, &, a, 2, e, &, a, 3, e, &, a, 4, e, &, a
      const subdivisionLabels = ['', 'e', '&', 'a'];
      for (let beat = 0; beat < 4; beat++) {
        for (let sub = 0; sub < 4; sub++) {
          positions.push({
            time: beat + (sub * 0.25),
            label: sub === 0 ? (beat + 1).toString() : subdivisionLabels[sub],
            beat: beat + 1,
            subdivision: sub
          });
        }
      }
    }
    
    return positions;
  };

  const gridPositions = generateGridPositions();

  // Determine stroke type based on traditional strumming rules
  const getStrokeType = (position: GridPosition): 'down' | 'up' => {
    if (gridType === '8th') {
      // 8th notes: Down on beats, Up on &
      return position.subdivision === 0 ? 'down' : 'up';
    } else {
      // 16th notes: Down on beats and &, Up on e and a
      return (position.subdivision === 0 || position.subdivision === 2) ? 'down' : 'up';
    }
  };

  // Toggle stroke at position
  const toggleStroke = (index: number) => {
    const newActiveStrokes = new Set(activeStrokes);
    if (newActiveStrokes.has(index)) {
      newActiveStrokes.delete(index);
    } else {
      newActiveStrokes.add(index);
    }
    setActiveStrokes(newActiveStrokes);
  };

  // Generate pattern from active strokes
  const generatePattern = (): StrumPattern => {
    const strokes = Array.from(activeStrokes)
      .map(index => {
        const position = gridPositions[index];
        return {
          type: getStrokeType(position),
          time: position.time,
          label: position.label
        };
      })
      .sort((a, b) => a.time - b.time);

    return {
      id: 'custom-pattern',
      name: patternName,
      beatsPerMeasure: 4,
      description: `Custom ${gridType} note pattern`,
      strokes
    };
  };

  // Play the generated pattern
  const playPattern = async () => {
    if (!engineRef.current) return;

    try {
      await engineRef.current.ensureStarted();
      setIsPlaying(true);
      setCurrentStrokeIndex(-1);

      const pattern = generatePattern();
      const beatDuration = (60 / bpm) * 1000;
      const patternDuration = 4 * beatDuration;

      // Schedule the audio
      engineRef.current.playPattern(pattern, bpm, false);

      // Schedule visual updates
      pattern.strokes.forEach((stroke, index) => {
        const delay = stroke.time * beatDuration;
        
        const timeout = setTimeout(() => {
          setCurrentStrokeIndex(index);
        }, delay);
        
        timeoutRefs.current.push(timeout);
      });

      // Reset or loop after pattern completes
      const resetTimeout = setTimeout(() => {
        setCurrentStrokeIndex(-1);
        if (isLooping) {
          // If looping, restart immediately for seamless playback
          playPattern();
        } else {
          setIsPlaying(false);
        }
      }, patternDuration);
      
      timeoutRefs.current.push(resetTimeout);
    } catch (error) {
      console.error('Failed to play pattern:', error);
      setIsPlaying(false);
    }
  };

  const stopPattern = () => {
    clearTimeouts();
    setIsPlaying(false);
    setCurrentStrokeIndex(-1);
  };

  // Clear all strokes
  const clearPattern = () => {
    setActiveStrokes(new Set());
  };

  // Export pattern as image
  const exportPattern = () => {
    // Create a canvas to draw the pattern
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const width = gridType === '8th' ? 800 : 1000;
    const height = 300;
    canvas.width = width;
    canvas.height = height;

    // Set background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    // Set font
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';

    // Draw title
    ctx.fillStyle = '#1f2937';
    ctx.font = 'bold 24px Arial';
    ctx.fillText(patternName, width / 2, 40);
    ctx.font = '16px Arial';
    ctx.fillText(`${gridType} Note Pattern - ${bpm} BPM`, width / 2, 65);

    // Draw grid - both 8th and 16th notes in one continuous row
    const numPositions = gridPositions.length;
    const boxWidth = gridType === '8th' ? 80 : 50; // Smaller boxes for 16th notes
    const boxHeight = 60;
    const totalWidth = numPositions * boxWidth;
    const startX = (width - totalWidth) / 2;
    const startY = 120;

    gridPositions.forEach((position, index) => {
      const x = startX + (index * boxWidth);
      const y = startY;
      const isActive = activeStrokes.has(index);
      const strokeType = getStrokeType(position);

      // Draw box
      ctx.fillStyle = isActive 
        ? (strokeType === 'down' ? '#f59e0b' : '#3b82f6')
        : '#f3f4f6';
      ctx.fillRect(x, y, boxWidth - 5, boxHeight);

      // Draw border
      ctx.strokeStyle = '#d1d5db';
      ctx.strokeRect(x, y, boxWidth - 5, boxHeight);

      // Draw stroke letter
      if (isActive) {
        ctx.fillStyle = '#ffffff';
        ctx.font = gridType === '8th' ? 'bold 24px Arial' : 'bold 18px Arial';
        ctx.fillText(strokeType === 'down' ? 'D' : 'U', x + (boxWidth - 5) / 2, y + 35);
      }

      // Draw beat label
      ctx.fillStyle = '#6b7280';
      ctx.font = gridType === '8th' ? '14px Arial' : '12px Arial';
      ctx.fillText(position.label, x + (boxWidth - 5) / 2, y + boxHeight + 20);
    });

    // Draw legend
    const legendY = height - 50;
    ctx.font = '14px Arial';
    
    // Down stroke legend
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(50, legendY, 20, 20);
    ctx.fillStyle = '#1f2937';
    ctx.textAlign = 'left';
    ctx.fillText('Down Stroke', 80, legendY + 15);

    // Up stroke legend
    ctx.fillStyle = '#3b82f6';
    ctx.fillRect(200, legendY, 20, 20);
    ctx.fillStyle = '#1f2937';
    ctx.fillText('Up Stroke', 230, legendY + 15);

    // Download the image
    const link = document.createElement('a');
    link.download = `${patternName.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_strumming_pattern.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="bg-white rounded-lg border border-amber-200 p-6 shadow-sm">
      <style jsx>{`
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #d97706;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
        .slider-thumb::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #d97706;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
      `}</style>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Strumming Pattern Generator</h2>
        <p className="text-gray-600">Use the interactive Pattern Generator to build custom strumming patterns. Just click on the grid squares and the down/up strokes are automatically assigned!</p>
      </div>

      {/* Controls */}
      <div className="mb-6 space-y-4">
        {/* Grid Type Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Grid Type</label>
          <div className="flex space-x-4">
            <button
              onClick={() => {setGridType('8th'); clearPattern();}}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                gridType === '8th' 
                  ? 'bg-amber-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              8th Notes (8 beats)
            </button>
            <button
              onClick={() => {setGridType('16th'); clearPattern();}}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                gridType === '16th' 
                  ? 'bg-amber-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              16th Notes (16 beats)
            </button>
          </div>
        </div>

        {/* Pattern Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Pattern Name</label>
          <input
            type="text"
            value={patternName}
            onChange={(e) => setPatternName(e.target.value)}
            className="w-full px-3 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            placeholder="Enter pattern name"
          />
        </div>

        {/* BPM Control */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tempo: {bpm} BPM
          </label>
          <input
            type="range"
            min="60"
            max="180"
            value={bpm}
            onChange={(e) => setBpm(parseInt(e.target.value))}
            className="w-full h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer slider-thumb"
            disabled={isPlaying}
          />
        </div>
      </div>

      {/* Pattern Grid */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Click squares to add strokes</h3>
        
        {/* Grid */}
        <div className="bg-gray-50 rounded-lg p-4 overflow-x-auto">
          <div className="flex justify-center gap-1 min-w-max">
            {gridPositions.map((position, index) => {
              const isActive = activeStrokes.has(index);
              const strokeType = getStrokeType(position);
              const isCurrentlyPlaying = isPlaying && currentStrokeIndex !== -1 && 
                generatePattern().strokes[currentStrokeIndex]?.time === position.time;
              
              return (
                <div key={index} className="text-center">
                  <button
                    onClick={() => toggleStroke(index)}
                    className={`w-10 h-10 rounded-md text-xs font-medium transition-colors border-2 ${
                      isCurrentlyPlaying
                        ? 'bg-yellow-400 text-black border-yellow-500 animate-pulse'
                        : isActive 
                          ? strokeType === 'down'
                            ? 'bg-amber-500 text-white border-amber-600'
                            : 'bg-blue-500 text-white border-blue-600'
                          : showGhostStrums
                            ? 'bg-gray-100 text-gray-300 border-gray-200 hover:border-gray-300'
                            : 'bg-white text-gray-400 border-gray-200 hover:border-gray-300 hover:text-gray-600'
                    }`}
                  >
                    {isActive ? (strokeType === 'down' ? 'D' : 'U') : 
                     showGhostStrums ? (strokeType === 'down' ? 'D' : 'U') : ''}
                  </button>
                  <div className="text-xs text-gray-500 mt-1">{position.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-4 flex items-center justify-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-amber-500 rounded"></div>
            <span>Down Stroke</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span>Up Stroke</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gray-200 border border-gray-300 rounded"></div>
            <span>No Stroke (Ghost)</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap justify-center gap-3 mb-4">
        <button
          onClick={isPlaying ? stopPattern : playPattern}
          disabled={activeStrokes.size === 0}
          className="px-6 py-3 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none"
        >
          {isPlaying ? 'Stop' : '▶ Play'}
        </button>
        
        <button
          onClick={() => setIsLooping(!isLooping)}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
            isLooping 
              ? 'bg-amber-600 text-white hover:bg-amber-700' 
              : 'bg-white text-amber-800 border-2 border-amber-600 hover:bg-amber-50 hover:border-amber-700'
          }`}
        >
          🔄 Loop
        </button>
        
        <button
          onClick={() => setShowGhostStrums(!showGhostStrums)}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
            showGhostStrums 
              ? 'bg-amber-600 text-white hover:bg-amber-700' 
              : 'bg-white text-amber-800 border-2 border-amber-600 hover:bg-amber-50 hover:border-amber-700'
          }`}
        >
          👻 Show Ghost Strums
        </button>
        
        <button
          onClick={exportPattern}
          disabled={activeStrokes.size === 0}
          className="px-6 py-3 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none"
        >
          📥 Export
        </button>
        
        <button
          onClick={clearPattern}
          className="px-6 py-3 bg-white text-amber-800 border-2 border-amber-600 rounded-lg font-semibold hover:bg-amber-50 hover:border-amber-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          Clear All
        </button>
      </div>
    </div>
  );
} 