'use client';

import React, { useState, useEffect, useRef } from 'react';
import { GuitarStrumEngine, StrumPattern, SoundMode } from '@/utils/audio/guitarStrumEngine';

interface SongSection {
  name: string;
  measures: Array<{
    chord: string;
    pattern: StrumPattern;
    beats: number; // How many beats this measure lasts
    startBeat?: number; // Optional, default to 1
  }>;
}

interface SongStructurePlayerProps {
  songTitle: string;
  artist: string;
  sections: SongSection[];
  bpm: number; // This is the song's true BPM
  description?: string;
  forcePercussion?: boolean;
  hideSoundModeToggle?: boolean;
  initialTempo?: number; // optional starting slider value
}

export default function SongStructurePlayer({ 
  songTitle,
  artist,
  sections,
  bpm,
  description,
  forcePercussion,
  hideSoundModeToggle,
  initialTempo
}: SongStructurePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentMeasureIndex, setCurrentMeasureIndex] = useState(0);
  const [currentStrokeIndex, setCurrentStrokeIndex] = useState(-1);
  const [currentBpm, setCurrentBpm] = useState(
    initialTempo !== undefined ? initialTempo : Math.max(40, Math.round(bpm * 0.6))
  );
  const [soundMode, setSoundMode] = useState<SoundMode>('guitar');
  const [metronomeEnabled, setMetronomeEnabled] = useState(false);
  const engineRef = useRef<GuitarStrumEngine | null>(null);
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    engineRef.current = new GuitarStrumEngine();
    setSoundMode('percussion');
    engineRef.current.setSoundMode('percussion');
    return () => {
      timeoutRefs.current.forEach(timeout => clearTimeout(timeout));
    };
  }, []);

  useEffect(() => {
    if (forcePercussion && engineRef.current) {
      setSoundMode('percussion');
      engineRef.current.setSoundMode('percussion');
    }
  }, [forcePercussion]);

  const clearTimeouts = () => {
    timeoutRefs.current.forEach(timeout => clearTimeout(timeout));
    timeoutRefs.current = [];
  };

  const playStructure = async (sectionIndex: number) => {
    if (!engineRef.current) {
      console.error('Audio engine not initialized');
      return;
    }

    try {
      await engineRef.current.ensureStarted();
      if (forcePercussion) {
        setSoundMode('percussion');
        engineRef.current.setSoundMode('percussion');
      }
      setIsPlaying(true);
      setCurrentSectionIndex(sectionIndex);
      setCurrentMeasureIndex(0);
      setCurrentStrokeIndex(-1);

      const beatDuration = (60 / currentBpm) * 1000;
      let totalTime = 0;

      // Schedule all sections and measures
      sections.forEach((section, sectionIndex) => {
        section.measures.forEach((measure, measureIndex) => {
          const measureDuration = measure.beats * beatDuration;
          
          // Schedule section/measure change
          const sectionTimeout = setTimeout(() => {
            setCurrentSectionIndex(sectionIndex);
            setCurrentMeasureIndex(measureIndex);
          }, totalTime);
          timeoutRefs.current.push(sectionTimeout);

          // Schedule pattern playback for this measure
          const patternTimeout = setTimeout(() => {
            engineRef.current?.playPattern(measure.pattern, currentBpm, metronomeEnabled);
          }, totalTime);
          timeoutRefs.current.push(patternTimeout);

          // Schedule stroke highlighting for this measure
          measure.pattern.strokes.forEach((stroke, strokeIndex) => {
            const strokeTime = totalTime + (stroke.time * beatDuration);
            const strokeTimeout = setTimeout(() => {
              setCurrentStrokeIndex(strokeIndex);
            }, strokeTime);
            timeoutRefs.current.push(strokeTimeout);
          });

          totalTime += measureDuration;
        });
      });

      // Reset after complete structure
      const resetTimeout = setTimeout(() => {
        setCurrentStrokeIndex(-1);
        setCurrentSectionIndex(0);
        setCurrentMeasureIndex(0);
        if (isLooping) {
          playStructure(sectionIndex);
        } else {
          setIsPlaying(false);
        }
      }, totalTime);
      
      timeoutRefs.current.push(resetTimeout);
    } catch (error) {
      console.error('Failed to play structure:', error);
      setIsPlaying(false);
      setCurrentStrokeIndex(-1);
      setCurrentSectionIndex(0);
      setCurrentMeasureIndex(0);
    }
  };

  const stopStructure = () => {
    clearTimeouts();
    setIsPlaying(false);
    setIsLooping(false);
    setCurrentStrokeIndex(-1);
    setCurrentSectionIndex(0);
    setCurrentMeasureIndex(0);
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopStructure();
    } else {
      playStructure(currentSectionIndex);
    }
  };

  const toggleLoop = () => {
    setIsLooping(!isLooping);
  };

  const toggleSoundMode = () => {
    const newMode = soundMode === 'guitar' ? 'percussion' : 'guitar';
    setSoundMode(newMode);
    if (engineRef.current) {
      engineRef.current.setSoundMode(newMode);
    }
  };

  const toggleMetronome = () => {
    setMetronomeEnabled(!metronomeEnabled);
  };

  const getCurrentMeasure = () => {
    if (sections[currentSectionIndex] && sections[currentSectionIndex].measures[currentMeasureIndex]) {
      return sections[currentSectionIndex].measures[currentMeasureIndex];
    }
    return sections[0]?.measures[0];
  };

  const currentMeasure = getCurrentMeasure();

  return (
    <div className="bg-white rounded-lg border border-amber-200 p-4 sm:p-6 shadow-sm">
      {/* Song Header */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-amber-800 mb-1">{songTitle}</h4>
        <p className="text-sm text-amber-600 mb-2">by {artist}</p>
        {description && (
          <p className="text-sm text-amber-700 mb-3">{description}</p>
        )}
        {/* BPM Controls */}
        <div className="flex items-center gap-4 mt-2">
          <div className="flex flex-col">
            <label htmlFor="bpm-slider" className="text-xs font-medium text-amber-700 mb-1">Tempo (BPM):</label>
            <div className="flex items-center gap-2">
              <input
                id="bpm-slider"
                type="range"
                min={40}
                max={bpm}
                value={currentBpm}
                onChange={e => setCurrentBpm(Number(e.target.value))}
                className="accent-amber-500 w-32"
              />
              <input
                type="number"
                min={40}
                max={bpm}
                value={currentBpm}
                onChange={e => setCurrentBpm(Number(e.target.value))}
                className="w-16 px-2 py-1 border border-amber-200 rounded text-amber-800 bg-amber-50 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
          </div>
          <div className="text-xs text-amber-500 font-semibold ml-4">
            Song BPM: <span className="text-amber-700 font-bold">{bpm}</span>
          </div>
        </div>
      </div>

      {/* Song Structure Display */}
      <div className="mb-6">
        {/* Only show a heading if there are multiple sections or the section name is not 'Verse' */}
        {!(sections.length === 1 && sections[0].name.toLowerCase() === 'verse') && (
          <h5 className="text-sm font-medium text-amber-800 mb-3">Song Structure:</h5>
        )}
        <div className="space-y-4">
          {sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className={`border rounded-lg p-3 ${
              currentSectionIndex === sectionIndex && isPlaying
                ? 'border-amber-500 bg-amber-50'
                : 'border-amber-200 bg-amber-25'
            }`}>
              <h6 className="font-medium text-amber-800 mb-2">
                {(sections.length === 1 && section.name.toLowerCase() === 'verse') ? 'Whole Song' : section.name}
              </h6>
              <div className="flex flex-wrap gap-2">
                {section.measures.map((measure, measureIndex) => (
                  <div
                    key={measureIndex}
                    className={`px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                      currentSectionIndex === sectionIndex && 
                      currentMeasureIndex === measureIndex && 
                      isPlaying
                        ? 'bg-amber-600 text-white scale-105 shadow-lg'
                        : 'bg-amber-100 text-amber-800 border border-amber-200'
                    }`}
                  >
                    <div className="font-medium">{measure.chord}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Current Pattern Visualization */}
      {currentMeasure && (
        <div className="mb-6">
          <div className="bg-amber-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h5 className="text-sm font-medium text-amber-800">
                Current Chord: {currentMeasure.chord}
              </h5>
              <div className="text-xs text-amber-600">{currentBpm} BPM</div>
            </div>
            
            {(() => {
              const positions = [];
              for (let beat = 0; beat < 4; beat++) {
                positions.push({ time: beat, label: (beat + 1).toString() });
                positions.push({ time: beat + 0.5, label: '&' });
              }
              
              return (
                <div className="flex items-center justify-center space-x-2 sm:space-x-3">
                  {positions.map((position, index) => {
                    const strokeAtPosition = currentMeasure.pattern.strokes.find(stroke => 
                      Math.abs(stroke.time - position.time) < 0.001
                    );
                    const strokeIndex = strokeAtPosition ? currentMeasure.pattern.strokes.indexOf(strokeAtPosition) : -1;
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
      )}

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
            <span className="text-amber-600">Down Stroke</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-100 border border-blue-300 rounded"></div>
            <span className="text-amber-600">Up Stroke</span>
          </div>
        </div>
      </div>
    </div>
  );
} 