'use client';

import React, { useState, useEffect, useRef } from 'react';
import { GuitarStrumEngine, StrumPattern, SoundMode } from '@/utils/audio/guitarStrumEngine';

interface SongStrummingPatternProps {
  songTitle: string;
  artist: string;
  chords: string[];
  pattern: StrumPattern;
  bpm: number;
  description?: string;
  autoPlay?: boolean;
}

export default function SongStrummingPattern({ 
  songTitle,
  artist,
  chords,
  pattern, 
  bpm: initialBpm,
  description,
  autoPlay = false 
}: SongStrummingPatternProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [currentStrokeIndex, setCurrentStrokeIndex] = useState(-1);
  const [currentChordIndex, setCurrentChordIndex] = useState(0);
  const [bpm, setBpm] = useState(initialBpm);
  const [soundMode, setSoundMode] = useState<SoundMode>('guitar');
  const [metronomeEnabled, setMetronomeEnabled] = useState(false);
  const engineRef = useRef<GuitarStrumEngine | null>(null);
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);

  // Always use percussive mode
  useEffect(() => {
    engineRef.current = new GuitarStrumEngine();
    setSoundMode('percussion');
    engineRef.current.setSoundMode('percussion');
    return () => {
      timeoutRefs.current.forEach(timeout => clearTimeout(timeout));
    };
  }, []);

  const clearTimeouts = () => {
    timeoutRefs.current.forEach(timeout => clearTimeout(timeout));
    timeoutRefs.current = [];
  };

  const playPattern = async () => {
    if (!engineRef.current) {
      console.error('Audio engine not initialized');
      return;
    }

    try {
      await engineRef.current.ensureStarted();
      
      setIsPlaying(true);
      setCurrentStrokeIndex(-1);
      setCurrentChordIndex(0);

      const beatDuration = (60 / bpm) * 1000;
      const patternDuration = pattern.beatsPerMeasure * beatDuration;

      // Schedule the audio
      engineRef.current.playPattern(pattern, bpm, metronomeEnabled);

      // Schedule visual updates for strokes
      pattern.strokes.forEach((stroke, index) => {
        const delay = stroke.time * beatDuration;
        
        const timeout = setTimeout(() => {
          setCurrentStrokeIndex(index);
        }, delay);
        
        timeoutRefs.current.push(timeout);
      });

      // Schedule chord changes (assuming one chord per measure for simplicity)
      if (chords.length > 1) {
        for (let i = 0; i < chords.length; i++) {
          const chordChangeTime = i * patternDuration;
          const timeout = setTimeout(() => {
            setCurrentChordIndex(i % chords.length);
          }, chordChangeTime);
          timeoutRefs.current.push(timeout);
        }
      }

      // Reset after pattern completes
      const resetTimeout = setTimeout(() => {
        setCurrentStrokeIndex(-1);
        if (isLooping) {
          playPattern();
        } else {
          setIsPlaying(false);
          setCurrentChordIndex(0);
        }
      }, patternDuration);
      
      timeoutRefs.current.push(resetTimeout);
    } catch (error) {
      console.error('Failed to play pattern:', error);
      setIsPlaying(false);
      setCurrentStrokeIndex(-1);
      setCurrentChordIndex(0);
    }
  };

  const stopPattern = () => {
    clearTimeouts();
    setIsPlaying(false);
    setIsLooping(false);
    setCurrentStrokeIndex(-1);
    setCurrentChordIndex(0);
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

  const toggleMetronome = () => {
    setMetronomeEnabled(!metronomeEnabled);
  };

  return (
    <div className="bg-white rounded-lg border border-amber-200 p-4 sm:p-6 shadow-sm">
      {/* Song Header */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-amber-800 mb-1">{songTitle}</h4>
        <p className="text-sm text-amber-600 mb-2">by {artist}</p>
        {description && (
          <p className="text-sm text-amber-700 mb-3">{description}</p>
        )}
        
        {/* Chord Display */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm font-medium text-amber-800">Chords:</span>
          <div className="flex gap-2">
            {chords.map((chord, index) => (
              <div
                key={index}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${
                  currentChordIndex === index && isPlaying
                    ? 'bg-amber-600 text-white scale-105'
                    : 'bg-amber-100 text-amber-800 border border-amber-200'
                }`}
              >
                {chord}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pattern Visualization */}
      <div className="mb-6">
        <div className="bg-amber-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h5 className="text-sm font-medium text-amber-800">Strumming Pattern: {pattern.name}</h5>
            <div className="text-xs text-amber-600">{bpm} BPM</div>
          </div>
          
          {(() => {
            const positions = [];
            
            // Create 8th note positions: 1, 1&, 2, 2&, 3, 3&, 4, 4&
            for (let beat = 0; beat < pattern.beatsPerMeasure; beat++) {
              positions.push({ time: beat, label: (beat + 1).toString() });
              positions.push({ time: beat + 0.5, label: '&' });
            }
            
            return (
              <div className="flex items-center justify-center space-x-2 sm:space-x-3">
                {positions.map((position, index) => {
                  const strokeAtPosition = pattern.strokes.find(stroke => 
                    Math.abs(stroke.time - position.time) < 0.001
                  );
                  const strokeIndex = strokeAtPosition ? pattern.strokes.indexOf(strokeAtPosition) : -1;
                  const isActive = currentStrokeIndex === strokeIndex;
                  
                  return (
                    <div key={`${position.time}-${position.label}`} className="flex flex-col items-center space-y-1">
                      <div
                        className={`rounded-lg font-bold transition-all duration-200 text-center flex items-center justify-center px-1 py-1 text-xs min-w-[32px] h-7 ${
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
                          : ''
                        }
                      </div>
                      <div className="text-xs font-medium text-gray-600">
                        {position.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })()}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
        <button
          onClick={togglePlay}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-200 text-sm ${
            isPlaying
              ? 'bg-red-600 hover:bg-red-700 text-white'
              : 'bg-amber-600 hover:bg-amber-700 text-white'
          }`}
        >
          {isPlaying ? '⏸ Stop' : '▶ Play'}
        </button>

        <button
          onClick={toggleLoop}
          className={`px-3 py-2 rounded-lg font-medium transition-colors duration-200 text-sm ${
            isLooping
              ? 'bg-amber-700 hover:bg-amber-800 text-white'
              : 'bg-amber-100 hover:bg-amber-200 text-amber-800 border border-amber-300'
          }`}
        >
          🔄 Loop
        </button>

        {/* Remove sound mode toggle button from controls */}

        <button
          onClick={toggleMetronome}
          className={`px-3 py-2 rounded-lg font-medium transition-colors duration-200 text-sm ${
            metronomeEnabled
              ? 'bg-amber-700 hover:bg-amber-800 text-white'
              : 'bg-amber-100 hover:bg-amber-200 text-amber-800 border border-amber-300'
          }`}
        >
          Metronome
        </button>
        
        {isPlaying && (
          <div className="flex items-center text-sm text-amber-600">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
            {isLooping ? 'Looping...' : 'Playing...'}
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="mt-4 pt-4 border-t border-amber-200">
        <div className="flex items-center justify-center gap-4 text-xs flex-wrap">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-amber-100 border border-amber-300 rounded"></div>
            <span className="text-amber-600">Kick Drum</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-100 border border-blue-300 rounded"></div>
            <span className="text-amber-600">Snare Drum</span>
          </div>
        </div>
      </div>
    </div>
  );
} 