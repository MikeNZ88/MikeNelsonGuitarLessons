'use client';

import React, { useState, useEffect, useRef } from 'react';
import { GuitarStrumEngine, StrumPattern, SoundMode } from '@/utils/audio/guitarStrumEngine';

interface StrummingPatternProps {
  pattern: StrumPattern;
  bpm?: number;
  autoPlay?: boolean;
  forcePercussion?: boolean;
  hideSoundModeToggle?: boolean;
}

export default function StrummingPattern({ 
  pattern, 
  bpm: initialBpm = 80,
  autoPlay = false,
  forcePercussion = false,
  hideSoundModeToggle = false
}: StrummingPatternProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [showHandMovement, setShowHandMovement] = useState(false);
  const [currentStrokeIndex, setCurrentStrokeIndex] = useState(-1);
  const [bpm, setBpm] = useState(initialBpm);
  const [soundMode, setSoundMode] = useState<SoundMode>('guitar');
  const [metronomeEnabled, setMetronomeEnabled] = useState(false);
  const engineRef = useRef<GuitarStrumEngine | null>(null);
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);
  const loopIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Determine if this is a 16th note pattern
  const is16th = pattern.id === 'sixteenth' || pattern.id === 'funk-sixteenth';

  // Always use percussive mode
  useEffect(() => {
    engineRef.current = new GuitarStrumEngine();
    setSoundMode('percussion');
    engineRef.current.setSoundMode('percussion');
    return () => {
      timeoutRefs.current.forEach(timeout => clearTimeout(timeout));
      if (loopIntervalRef.current) {
        clearTimeout(loopIntervalRef.current);
      }
    };
  }, [forcePercussion]);

  const clearTimeouts = () => {
    timeoutRefs.current.forEach(timeout => clearTimeout(timeout));
    timeoutRefs.current = [];
    if (loopIntervalRef.current) {
      clearTimeout(loopIntervalRef.current);
      loopIntervalRef.current = null;
    }
  };

  const playPattern = async () => {
    if (!engineRef.current) {
      console.error('Audio engine not initialized');
      return;
    }

    try {
      await engineRef.current.ensureStarted();
      console.log('Starting pattern playback');
      
      setIsPlaying(true);
      setCurrentStrokeIndex(-1);

      const beatDuration = (60 / bpm) * 1000; // Convert to milliseconds
      const patternDuration = pattern.beatsPerMeasure * beatDuration;

      // Schedule the audio
      engineRef.current.playPattern(pattern, bpm, metronomeEnabled);

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
      setCurrentStrokeIndex(-1);
    }
  };

  const stopPattern = () => {
    clearTimeouts();
    setIsPlaying(false);
    setIsLooping(false);
    setCurrentStrokeIndex(-1);
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopPattern();
    } else {
      playPattern();
    }
  };

  const toggleLoop = () => {
    setIsLooping(!isLooping);
  };

  const toggleHandMovement = () => {
    setShowHandMovement(!showHandMovement);
  };

  // Remove sound mode toggle button from controls

  const toggleMetronome = () => {
    setMetronomeEnabled(!metronomeEnabled);
  };

  // Check if pattern has ghost strums (positions without actual strokes)
  const hasGhostStrums = () => {
    const positions = [];
    const is16th = pattern.id === 'sixteenth' || pattern.id === 'funk-sixteenth';
    
    if (is16th) {
      for (let beat = 0; beat < pattern.beatsPerMeasure; beat++) {
        positions.push(beat, beat + 0.25, beat + 0.5, beat + 0.75);
      }
    } else {
      for (let beat = 0; beat < pattern.beatsPerMeasure; beat++) {
        positions.push(beat, beat + 0.5);
      }
    }
    
    // Check if any position doesn't have a stroke
    return positions.some(time => !pattern.strokes.some(stroke => stroke.time === time));
  };

  // Auto-play on mount if specified
  useEffect(() => {
    if (autoPlay && !isPlaying) {
      const timer = setTimeout(() => {
        playPattern();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [autoPlay]);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-8 shadow-sm">
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 16px;
          width: 16px;
          background: #d97706;
          border-radius: 50%;
          cursor: pointer;
        }
        .slider::-moz-range-thumb {
          height: 16px;
          width: 16px;
          background: #d97706;
          border-radius: 50%;
          cursor: pointer;
          border: none;
        }
        .slider::-webkit-slider-track {
          background: #f3f4f6;
          height: 8px;
          border-radius: 4px;
        }
        .slider::-moz-range-track {
          background: #f3f4f6;
          height: 8px;
          border-radius: 4px;
        }
      `}</style>
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div className="flex-1">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{pattern.name}</h3>
          <p className="text-sm text-gray-600 mt-1">{pattern.description}</p>
        </div>
        <div className="text-center sm:text-right">
          <div className="text-sm text-gray-500">Tempo</div>
          <div className="flex items-center space-x-2 sm:space-x-3">
            <input
              type="range"
              min="40"
              max="160"
              value={bpm}
              onChange={(e) => setBpm(parseInt(e.target.value))}
              className="w-16 sm:w-20 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              disabled={isPlaying}
            />
            <div className="text-base sm:text-lg font-mono font-bold text-gray-900 min-w-[55px] sm:min-w-[65px]">{bpm} BPM</div>
          </div>
        </div>
      </div>

      {/* Pattern Visualization */}
      <div className="mb-8">
        <div className="bg-gray-50 rounded-lg p-3 sm:p-6">
          {(() => {
            // Create a complete grid showing all possible strum positions
            const positions = [];
            
            // Check if this is a 16th note pattern
            const is16th = pattern.id === 'sixteenth' || pattern.id === 'funk-sixteenth';
            
            if (is16th) {
              // For 16th note pattern, show all 16 positions: 1 e & a 2 e & a 3 e & a 4 e & a
              for (let beat = 0; beat < pattern.beatsPerMeasure; beat++) {
                positions.push({ time: beat, label: (beat + 1).toString() });      // 1, 2, 3, 4
                positions.push({ time: beat + 0.25, label: 'e' });               // e
                positions.push({ time: beat + 0.5, label: '&' });                // &  
                positions.push({ time: beat + 0.75, label: 'a' });               // a
              }
            } else {
              // For other patterns, show 8th note positions: 1, 1&, 2, 2&, 3, 3&, 4, 4&
              for (let beat = 0; beat < pattern.beatsPerMeasure; beat++) {
                // On-beat position
                positions.push({ time: beat, label: (beat + 1).toString() });
                // Off-beat position (&)
                positions.push({ time: beat + 0.5, label: '&' });
              }
            }
            
            const renderPosition = (position: { time: number; label: string }, index: number) => {
              // Find if there's an actual stroke at this position (with small tolerance for floating point precision)
              const strokeAtPosition = pattern.strokes.find(stroke => Math.abs(stroke.time - position.time) < 0.001);
              const strokeIndex = strokeAtPosition ? pattern.strokes.indexOf(strokeAtPosition) : -1;
              const isActive = currentStrokeIndex === strokeIndex;
              
              // Determine hand movement direction based on alternating pattern
              // For 16th notes: every 0.25 alternates, for 8th notes: every 0.5 alternates
              const subdivision = is16th ? 0.25 : 0.5;
              const subdivisionIndex = Math.round(position.time / subdivision);
              const handDirection = subdivisionIndex % 2 === 0 ? 'down' : 'up';
              
              return (
                <div key={`${position.time}-${position.label}`} className={`flex flex-col items-center ${is16th ? 'space-y-0.5 sm:space-y-1' : 'space-y-1 sm:space-y-2'}`}>
                  <div
                    className={`rounded-lg font-bold transition-all duration-200 text-center flex items-center justify-center ${
                      is16th 
                        ? 'px-0.5 py-0.5 text-xs min-w-[28px] sm:min-w-[35px] h-6 sm:h-8' 
                        : 'px-1 py-1 text-xs sm:text-sm min-w-[32px] sm:min-w-[50px] h-7 sm:h-10'
                    } ${
                      strokeAtPosition
                        ? strokeAtPosition.type === 'down'
                          ? isActive
                            ? 'bg-amber-500 text-white scale-110 shadow-lg'
                            : 'bg-amber-100 text-amber-800 border border-amber-200'
                          : isActive
                          ? 'bg-blue-500 text-white scale-110 shadow-lg'
                          : 'bg-blue-100 text-blue-800 border border-blue-200'
                        : 'bg-white border border-gray-200 text-gray-400'
                    }`}
                  >
                    {strokeAtPosition 
                      ? (strokeAtPosition.type === 'down' ? 'D' : 'U')
                      : showHandMovement 
                      ? (handDirection === 'down' ? 'D' : 'U')
                      : ''
                    }
                  </div>
                  <div className={`font-medium text-gray-600 ${is16th ? 'text-xs' : 'text-xs'}`}>
                    {position.label}
                  </div>
                </div>
              );
            };
            
            if (is16th) {
              // On mobile: Split into two rows (beats 1-2, then 3-4)
              // On desktop: Single row
              const firstHalf = positions.slice(0, 8);   // Beats 1-2 (1 e & a 2 e & a)
              const secondHalf = positions.slice(8, 16); // Beats 3-4 (3 e & a 4 e & a)
              
              return (
                <>
                  {/* Mobile: Two rows */}
                  <div className="block sm:hidden">
                    <div className="flex items-center justify-center space-x-0.5 mb-4">
                      {firstHalf.map(renderPosition)}
                    </div>
                    <div className="flex items-center justify-center space-x-0.5">
                      {secondHalf.map(renderPosition)}
                    </div>
                  </div>
                  
                  {/* Desktop: Single row */}
                  <div className="hidden sm:flex items-center justify-center space-x-1 flex-nowrap overflow-x-auto pb-2">
                    {positions.map(renderPosition)}
                  </div>
                </>
              );
            } else {
              // 8th note patterns: Always single row
              return (
                <div className={`flex items-center justify-center space-x-1 sm:space-x-3 flex-nowrap overflow-x-auto pb-2`}>
                  {positions.map(renderPosition)}
                </div>
              );
            }
          })()}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
        <button
          onClick={togglePlay}
          className={`px-4 sm:px-6 py-2 rounded-lg font-semibold transition-colors duration-200 text-sm sm:text-base ${
            isPlaying
              ? 'bg-red-600 hover:bg-red-700 text-white'
              : 'bg-amber-600 hover:bg-amber-700 text-white'
          }`}
        >
          {isPlaying ? '⏸ Stop' : '▶ Play'}
        </button>

        <button
          onClick={toggleLoop}
          className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors duration-200 text-sm ${
            isLooping
              ? 'bg-amber-700 hover:bg-amber-800 text-white'
              : 'bg-amber-100 hover:bg-amber-200 text-amber-800 border border-amber-300'
          }`}
        >
          🔄 Loop
        </button>

        {hasGhostStrums() && (
          <button
            onClick={toggleHandMovement}
            className={`px-2 sm:px-4 py-2 rounded-lg font-medium transition-colors duration-200 text-xs sm:text-sm ${
              showHandMovement
                ? 'bg-amber-700 hover:bg-amber-800 text-white'
                : 'bg-amber-100 hover:bg-amber-200 text-amber-800 border border-amber-300'
            }`}
          >
            <span className="hidden sm:inline">👻 {showHandMovement ? 'Hide' : 'Show'} Ghost Strums</span>
            <span className="sm:hidden">👻 Ghost</span>
          </button>
        )}

        {/* Remove sound mode toggle button from controls */}

        <button
          onClick={toggleMetronome}
          className={`px-2 sm:px-4 py-2 rounded-lg font-medium transition-colors duration-200 text-xs sm:text-sm ${
            metronomeEnabled
              ? 'bg-amber-700 hover:bg-amber-800 text-white'
              : 'bg-amber-100 hover:bg-amber-200 text-amber-800 border border-amber-300'
          }`}
        >
          Metronome
        </button>
        
        {isPlaying && (
          <div className="flex items-center text-sm text-gray-600">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
            {isLooping ? 'Looping...' : 'Playing...'}
          </div>
        )}
      </div>

      {/* Stroke Legend */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm flex-wrap">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-amber-100 border border-amber-300 rounded"></div>
            <span className="text-gray-600">Down Stroke</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-100 border border-blue-300 rounded"></div>
            <span className="text-gray-600">Up Stroke</span>
          </div>
          {hasGhostStrums() && (
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-white border border-gray-300 rounded"></div>
              <span className="text-gray-600">Ghost Strum{showHandMovement ? ' (hand moves, no contact)' : ''}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 