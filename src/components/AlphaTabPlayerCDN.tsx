'use client';

import React, { useEffect, useRef, useState } from 'react';
import { MdLoop } from 'react-icons/md';
import { GiMetronome } from 'react-icons/gi';
import { MdPlayArrow, MdPause, MdStop } from 'react-icons/md';

interface Exercise {
  id: string;
  name: string;
  file: string;
}

// Grouped exercise arrays for dropdown
const sixteenthNotes = [
  {
    id: 'am-pentatonic-ascending',
    name: 'Ascending Pattern (Alternate Picking)',
    file: '/GP Files/Scale Exercises/BLOG TABS/Am Pentatonicascending 16th notes Alternate  copy.gp'
  },
  {
    id: 'am-pentatonic-descending',
    name: 'Descending Pattern (Alternate Picking)',
    file: '/GP Files/Scale Exercises/BLOG TABS/Am Pentatonic descending 16th notes Alternate .gp'
  },
  {
    id: 'am-pentatonic-legato',
    name: 'Descending Pattern (Partial Legato)',
    file: '/GP Files/Scale Exercises/BLOG TABS/Am Pentatonic descending 16th notes Hammers ons Pulls offs.gp'
  }
];
const sixteenthTriplets = [
  {
    id: 'am-pentatonic-triplets-variation',
    name: 'Ascending Pattern',
    file: '/GP Files/Scale Exercises/BLOG TABS/Am pent triplet 16ths 3.gp'
  },
  {
    id: 'am-pentatonic-triplets-16ths',
    name: 'Descending Pattern (Alternate Picking)',
    file: '/GP Files/Scale Exercises/BLOG TABS/Am POent triplets 16ths.gp'
  },
  {
    id: 'am-pentatonic-triplets-legato',
    name: 'Descending Pattern (Partial Legato)',
    file: '/GP Files/Scale Exercises/BLOG TABS/Am Pentatonic 16th note triplets partial legato.gp'
  }
];
const eighthTriplets = [
  {
    id: 'am-pentatonic-triplets',
    name: 'Descending Pattern (Partial Legato)',
    file: '/GP Files/Scale Exercises/BLOG TABS/Am Pentatonic descending eighth note triplets.gp'
  }
];

// Flat array for lookup and selection logic
const exercises: Exercise[] = [...sixteenthNotes, ...sixteenthTriplets, ...eighthTriplets];

declare global {
  interface Window {
    alphaTab: any;
  }
}

export default function AlphaTabPlayerCDN() {
  const containerRef = useRef<HTMLDivElement>(null);
  const alphaTabRef = useRef<any>(null);
  const [selectedExercise, setSelectedExercise] = useState(exercises[0].id);
  const [status, setStatus] = useState('Loading AlphaTab...');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [playerState, setPlayerState] = useState('Stopped');
  const [tempo, setTempo] = useState<number | null>(null); // Will be set from loaded score
  const [version, setVersion] = useState(Date.now()); // Force reload
  const [isLooping, setIsLooping] = useState(false); // Loop playback state
  const [isMetronomeOn, setIsMetronomeOn] = useState(false); // Metronome state
  const isLoopingRef = useRef(false); // Ref to track loop state for event listeners
  const [minWidth, setMinWidth] = useState(800);
  const [zoom, setZoom] = useState(1.2);

  useEffect(() => {
    const checkScreen = () => {
      if (window.innerWidth < 768) {
        setMinWidth(600);
        setZoom(1.05);
      } else {
        setMinWidth(800);
        setZoom(1.2);
      }
    };
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  // Inject CSS for H/P markers
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      /* Force display of hammer-on and pull-off text markers */
      .at svg .at-technique-text,
      .at svg text.at-hammer,
      .at svg text.at-pull,
      .at svg text.at-slide,
      .at svg text.at-legato {
        font-weight: bold !important;
        font-size: 12px !important;
        fill: #000 !important;
        opacity: 1 !important;
        visibility: visible !important;
        display: block !important;
      }
      
      /* Ensure technique annotations are visible */
      .at svg .at-effects,
      .at svg .at-techniques {
        display: block !important;
        visibility: visible !important;
      }
      
      /* Style for hammer-on and pull-off indicators */
      .at svg .at-hammer-pull-text {
        font-family: Arial, sans-serif !important;
        font-size: 10px !important;
        font-weight: bold !important;
        fill: #333 !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  useEffect(() => {
    const loadAlphaTabCDN = () => {
      // Load AlphaTab CSS if not already loaded
      if (!document.querySelector('link[href*="alphaTab.css"]')) {
        const cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.href = 'https://cdn.jsdelivr.net/npm/@coderline/alphatab@latest/dist/alphaTab.css';
        document.head.appendChild(cssLink);
      }

      // Load AlphaTab JavaScript if not already loaded
      if (!document.querySelector('script[src*="alphaTab.js"]')) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@coderline/alphatab@latest/dist/alphaTab.js';
        script.onload = () => {
          console.log('AlphaTab CDN script loaded');
        };
        script.onerror = () => {
          setError('Failed to load AlphaTab from CDN');
          setStatus('CDN loading failed');
        };
        document.head.appendChild(script);
      }
    };

    loadAlphaTabCDN();

    const initializeAlphaTab = async () => {
      try {
        // Wait for AlphaTab CDN to load
        while (!window.alphaTab) {
          console.log('Waiting for AlphaTab CDN...');
          await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        console.log('AlphaTab CDN loaded successfully');
        setStatus('Initializing AlphaTab...');

        if (!containerRef.current) return;

        console.log('Initializing AlphaTab from CDN...');
        
        // Initialize AlphaTab with working audio configuration
        alphaTabRef.current = new window.alphaTab.AlphaTabApi(containerRef.current, {
          core: {
            enableLazyLoading: false, // Ensure all elements are rendered for better cursor visibility
            useWorkers: false // Disable workers for better debugging
          },
          player: {
            enablePlayer: true,
            enableCursor: true,
            enableUserInteraction: true,
            enableElementHighlighting: true,
            soundFont: 'https://cdn.jsdelivr.net/npm/@coderline/alphatab@latest/dist/soundfont/sonivox.sf2',
            scrollElement: containerRef.current,
            enableMetronome: true, // Enable metronome support
            cursorFollowMode: 'beat' // Follow cursor by beat for better visibility
          },
          display: {
            scale: 1.0,
            layoutMode: 'page',
            showTempo: false,
            showTitle: false,
            showSubtitle: false,
            showArtist: false,
            showAlbum: false,
            showWords: false,
            showMusic: true, // Enable music notation for cursor visibility
            showCopyright: false,
            showNotices: false,
            showInstructions: false,
            showAutomation: false,
            showTempoChanges: false,
            showMetronome: false,
            showBarNumbers: true, // Enable bar numbers for better navigation
            // Ensure all notation elements are shown
            showEffects: true,
            showFingering: true,
            showSlurs: true,
            showTiedNotes: true,
            showGraceNotes: true,
            showArpeggios: true,
            showTremolo: true,
            showVibrato: true,
            showBends: true,
            showSlides: true,
            showHammerOns: true,
            showPullOffs: true,
            showTaps: true,
            showPalmMute: true,
            showLetRing: true,
            showStaccato: true,
            showAccent: true,
            showMarcato: true,
            showHarmonics: true,
            showTrills: true,
            showMordents: true,
            showTurns: true,
            showDynamics: true,
            showLyrics: true,
            showChordNames: true,
            showChordDiagrams: true,
            showFretNumbers: true,
            showTuning: true,
            showRests: true,
            showDottedNotes: true,
            showTuplets: true,
            // Specific settings for H/P text display
            showTabNoteNames: true,
            showTabNoteNumbers: true,
            showPickStrokes: true,
            showPickUp: true,
            showPickDown: true,
            showTapping: true,
            showWhammy: true,
            showTrill: true,
            showLeftHandTapping: true,
            showRightHandTapping: true,
            showSlapping: true,
            showPopping: true,
            // Force display of technique annotations
            showTechniqueAnnotations: true,
            showLegatoSlides: true,
            showShiftSlides: true
          }
        });
        
        // Set up event listeners
        setupEventListeners(alphaTabRef.current);

        // Load the first exercise
        await loadExercise(exercises[0].file);

        console.log('AlphaTab initialized successfully with audio support!');
        
      } catch (err) {
        console.error('Failed to initialize AlphaTab:', err);
        setError(`Failed to initialize: ${err}`);
        setStatus('Initialization failed');
      }
    };

    initializeAlphaTab();
  }, []);

  // Reload exercise when selection changes
  useEffect(() => {
    if (alphaTabRef.current && isReady) {
      const selectedExerciseData = exercises.find(ex => ex.id === selectedExercise);
      if (selectedExerciseData) {
        loadExercise(selectedExerciseData.file);
      }
    }
  }, [selectedExercise, isReady]);

  const setupEventListeners = (api: any) => {
    api.renderStarted.on(() => {
      console.log('Rendering started');
      setStatus('Rendering tablature...');
    });

    api.renderFinished.on(() => {
      console.log('Render finished');
      setStatus('Ready to play!');
      setIsReady(true);
    });

    api.scoreLoaded.on((score: any) => {
      console.log('Score loaded successfully');
      console.log('Score keys:', Object.keys(score));
      
      // Log details about tracks and their notation
      if (score.tracks && score.tracks.length > 0) {
        console.log('Found', score.tracks.length, 'tracks');
        score.tracks.forEach((track: any, i: number) => {
          console.log(`Track ${i}:`, {
            name: track.name,
            channel: track.channel,
            hasStaves: track.staves?.length || 0,
            hasBeats: track.staves?.[0]?.bars?.[0]?.voices?.[0]?.beats?.length || 0
          });
          
          // Check for special effects in the first few beats
          if (track.staves?.[0]?.bars?.[0]?.voices?.[0]?.beats) {
            const beats = track.staves[0].bars[0].voices[0].beats.slice(0, 5);
            beats.forEach((beat: any, beatIndex: number) => {
              if (beat.notes) {
                beat.notes.forEach((note: any, noteIndex: number) => {
                  if (note.slideType || note.hammerPullOrigin || note.isSlideIntoNote || note.isSlideOutOfNote) {
                    console.log(`Beat ${beatIndex}, Note ${noteIndex} effects:`, {
                      slideType: note.slideType,
                      hammerPullOrigin: note.hammerPullOrigin,
                      isSlideIntoNote: note.isSlideIntoNote,
                      isSlideOutOfNote: note.isSlideOutOfNote,
                      isHammerPullOrigin: note.isHammerPullOrigin,
                      isHammerPullDestination: note.isHammerPullDestination,
                      // Log all note properties to see what's available
                      allProperties: Object.keys(note).filter(key => 
                        key.toLowerCase().includes('hammer') || 
                        key.toLowerCase().includes('pull') || 
                        key.toLowerCase().includes('legato') ||
                        key.toLowerCase().includes('slide') ||
                        key.toLowerCase().includes('slur')
                      )
                    });
                  }
                });
              }
            });
          }
        });
      }
      
      setStatus('Score loaded, initializing audio...');
      
      // Try multiple ways to get the tempo from the score
      let initialTempo = null;
      
      // Method 1: Check masterVolume.tempo
      if (score.masterVolume?.tempo) {
        initialTempo = score.masterVolume.tempo;
        console.log('Found tempo in masterVolume.tempo:', initialTempo);
      }
      // Method 2: Check tracks for tempo
      else if (score.tracks && score.tracks.length > 0) {
        console.log('Checking tracks for tempo, found', score.tracks.length, 'tracks');
        for (let i = 0; i < score.tracks.length; i++) {
          const track = score.tracks[i];
          if (track.tempo) {
            initialTempo = track.tempo;
            console.log(`Found tempo in track ${i}:`, initialTempo);
            break;
          }
        }
      }
      // Method 3: Check score metadata
      else if (score.tempo) {
        initialTempo = score.tempo;
        console.log('Found tempo in score.tempo:', initialTempo);
      }
      
      if (initialTempo) {
        console.log('Setting initial tempo from score:', initialTempo);
        setTempo(initialTempo);
        
        // Set playback speed to 1.0 (normal speed) since the file already has the correct tempo
        if (alphaTabRef.current && alphaTabRef.current.playbackSpeed !== undefined) {
          alphaTabRef.current.playbackSpeed = 1.0; // Play at normal speed
        }
      } else {
        console.log('No tempo found in score, using default 40 BPM for all exercises');
        setTempo(40);
        
        // All exercises are set to 40 BPM
        if (alphaTabRef.current && alphaTabRef.current.playbackSpeed !== undefined) {
          alphaTabRef.current.playbackSpeed = 1.0; // Play at normal speed
        }
      }
    });

    api.playerReady.on(() => {
      console.log('Player ready!');
      setStatus('Player ready!');
      setIsReady(true);
    });

    api.playerStateChanged.on((e: any) => {
      console.log('Player state changed:', e);
      const stateNames = ['Paused', 'Playing', 'Stopped'];
      setPlayerState(stateNames[e.state] || 'Unknown');
      setIsPlaying(e.state === 1); // 1 = playing
      
      // Handle looping when playback ends
      if (e.state === 2 && isLoopingRef.current) { // 2 = stopped
        console.log('Playback ended, looping enabled - restarting...');
        setTimeout(() => {
          if (alphaTabRef.current && isLoopingRef.current) {
            alphaTabRef.current.play();
          }
        }, 100); // Small delay to ensure proper restart
      }
    });

    // Add a more reliable loop event listener
    api.playerFinished.on(() => {
      console.log('Player finished event triggered, loop state:', isLoopingRef.current);
      if (isLoopingRef.current && alphaTabRef.current) {
        console.log('Looping enabled, restarting playback...');
        setTimeout(() => {
          if (alphaTabRef.current && isLoopingRef.current) {
            alphaTabRef.current.play();
          }
        }, 200);
      }
    });

    api.playerPositionChanged.on((e: any) => {
      // Log position for debugging
      console.log('Player position changed:', e);
      
      // Auto-scroll to cursor during playback
      if (api.scrollToCursor) {
        api.scrollToCursor();
      }
    });

    api.error.on((error: any) => {
      console.error('AlphaTab error:', error);
      
      // If soundfont fails, try to reinitialize without soundfont
      if (error.message && error.message.includes('Soundfont')) {
        console.log('Soundfont failed, trying without soundfont...');
        setStatus('Soundfont failed, using default synthesis...');
        
        try {
          // Reinitialize without soundfont
          const fallbackApi = new window.alphaTab.AlphaTabApi(containerRef.current, {
            player: {
              enablePlayer: true,
              enableCursor: true,
              enableUserInteraction: true,
              // No soundFont specified - use default synthesis
              scrollElement: containerRef.current
            },
            display: {
              scale: 1.0,
              layoutMode: 'page',
              showMusic: true, // Enable music notation for cursor visibility
              showBarNumbers: true, // Enable bar numbers for better navigation
              // Ensure all notation elements are shown
              showEffects: true,
              showFingering: true,
              showSlurs: true,
              showTiedNotes: true,
              showGraceNotes: true,
              showArpeggios: true,
              showTremolo: true,
              showVibrato: true,
              showBends: true,
              showSlides: true,
              showHammerOns: true,
              showPullOffs: true,
              showTaps: true,
              showPalmMute: true,
              showLetRing: true,
              showStaccato: true,
              showAccent: true,
              showMarcato: true,
              showHarmonics: true,
              showTrills: true,
              showMordents: true,
              showTurns: true,
              showDynamics: true,
              showLyrics: true,
              showChordNames: true,
              showChordDiagrams: true,
              showFretNumbers: true,
              showTuning: true,
              showRests: true,
              showDottedNotes: true,
              showTuplets: true,
              // Specific settings for H/P text display
              showTabNoteNames: true,
              showTabNoteNumbers: true,
              showPickStrokes: true,
              showPickUp: true,
              showPickDown: true,
              showTapping: true,
              showWhammy: true,
              showTrill: true,
              showLeftHandTapping: true,
              showRightHandTapping: true,
              showSlapping: true,
              showPopping: true,
              // Force display of technique annotations
              showTechniqueAnnotations: true,
              showLegatoSlides: true,
              showShiftSlides: true
            }
          });
          
          alphaTabRef.current = fallbackApi;
          setError(null);
          
          // Re-setup event listeners for the new instance
          setupEventListeners(fallbackApi);
          
          // Reload the current exercise
          loadExercise(exercises[0].file);
          
        } catch (fallbackError) {
          console.error('Fallback initialization failed:', fallbackError);
          setError(`Audio initialization failed: ${fallbackError}`);
        }
      } else {
        setError(`AlphaTab error: ${error.message || error}`);
        setStatus('Error occurred');
      }
    });
  };

  const loadExercise = async (filePath: string) => {
    try {
      setStatus('Loading exercise...');
      console.log('Loading exercise:', filePath);
      
      // Add cache-busting parameter to ensure we get the latest file
      const cacheBuster = Date.now();
      const urlWithCacheBuster = `${filePath}?t=${cacheBuster}&v=2`;
      
      const response = await fetch(urlWithCacheBuster);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} - File not found: ${filePath}`);
      }
      
      const arrayBuffer = await response.arrayBuffer();
      console.log('File loaded successfully, size:', arrayBuffer.byteLength);
      
      if (alphaTabRef.current) {
        console.log('Loading ArrayBuffer into AlphaTab...');
        alphaTabRef.current.load(arrayBuffer);
      }
      
    } catch (err) {
      console.error('Failed to load exercise:', err);
      setError(`Failed to load exercise: ${err}`);
      setStatus('Failed to load exercise');
    }
  };

  const handleExerciseChange = (exerciseId: string) => {
    setSelectedExercise(exerciseId);
    const exercise = exercises.find(ex => ex.id === exerciseId);
    if (exercise) {
      loadExercise(exercise.file);
    }
  };

  const handlePlay = async () => {
    if (alphaTabRef.current && isReady) {
      console.log('🎵 Playing/Pausing audio...');
      
      // Resume audio context if needed (browser requirement)
      try {
        if ((window as any).AudioContext || (window as any).webkitAudioContext) {
          const AudioContext = (window as any).AudioContext || (window as any).webkitAudioContext;
          if (!(window as any).audioContext) {
            (window as any).audioContext = new AudioContext();
          }
          
          if ((window as any).audioContext.state === 'suspended') {
            console.log('Resuming suspended audio context...');
            await (window as any).audioContext.resume();
          }
        }
      } catch (err) {
        console.error('Audio context error:', err);
      }
      
      try {
        alphaTabRef.current.playPause();
      } catch (err) {
        console.error('Error during playPause:', err);
        setError(`Playback error: ${err instanceof Error ? err.message : String(err)}`);
      }
    } else {
      console.log('❌ Player not ready yet - isReady:', isReady, 'alphaTabRef:', !!alphaTabRef.current);
    }
  };

  const handleStop = () => {
    if (alphaTabRef.current && isReady) {
      console.log('⏹️ Stopping audio...');
      alphaTabRef.current.stop();
    }
  };

  const handleLoopToggle = () => {
    const newLoopState = !isLooping;
    setIsLooping(newLoopState);
    isLoopingRef.current = newLoopState; // Update ref to match state
    console.log('🔄 Loop toggled:', newLoopState);
  };

  const handleMetronomeToggle = () => {
    setIsMetronomeOn(!isMetronomeOn);
    if (alphaTabRef.current) {
      alphaTabRef.current.metronomeVolume = !isMetronomeOn ? 0.3 : 0;
    }
    console.log('🥁 Metronome toggled:', !isMetronomeOn);
  };

  const handleTempoChange = (newTempo: number) => {
    setTempo(newTempo);
    if (alphaTabRef.current && alphaTabRef.current.playbackSpeed !== undefined) {
      // Calculate playback speed relative to the original file tempo
      const originalTempo = 40; // Your file is 40 BPM
      alphaTabRef.current.playbackSpeed = newTempo / originalTempo;
    }
  };

  const adjustTempo = (change: number) => {
    if (tempo === null) return; // Don't adjust if tempo hasn't loaded yet
    const newTempo = Math.max(20, Math.min(200, tempo + change));
    setTempo(newTempo);
    if (alphaTabRef.current && alphaTabRef.current.playbackSpeed !== undefined) {
      // Calculate playback speed relative to the original file tempo
      const originalTempo = 40; // Your files are 40 BPM
      alphaTabRef.current.playbackSpeed = newTempo / originalTempo;
    }
  };

  const selectedExerciseName = exercises.find(ex => ex.id === selectedExercise)?.name || 'Unknown Exercise';

  if (error) {
    return (
      <div className="p-4 border border-red-300 rounded-lg bg-red-50">
        <p className="text-red-700">Error loading tab player: {error}</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Exercise Selection */}
      <div className="mb-4">
        <label htmlFor="exercise-select" className="block text-sm font-medium text-gray-700 mb-2">
          Select Exercise:
        </label>
        <select
          id="exercise-select"
          value={selectedExercise}
          onChange={(e) => handleExerciseChange(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <optgroup label="16th Notes">
            {sixteenthNotes.map((exercise) => (
              <option key={exercise.id} value={exercise.id}>{exercise.name}</option>
            ))}
          </optgroup>
          <optgroup label="16th Note Triplets">
            {sixteenthTriplets.map((exercise) => (
              <option key={exercise.id} value={exercise.id}>{exercise.name}</option>
            ))}
          </optgroup>
          <optgroup label="Eighth Note Triplets">
            {eighthTriplets.map((exercise) => (
              <option key={exercise.id} value={exercise.id}>{exercise.name}</option>
            ))}
          </optgroup>
        </select>
      </div>

      {/* Tempo Control */}
      <div className="mb-4">
        <label htmlFor="tempo-control" className="block text-sm font-medium text-gray-700 mb-2">
          Tempo: {tempo || 'Loading...'} BPM
        </label>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => adjustTempo(-5)}
            disabled={tempo === null}
            className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-md font-medium transition-colors disabled:opacity-50"
          >
            -5
          </button>
          <input
            type="range"
            id="tempo-control"
            min="20"
            max="200"
            value={tempo || ''}
            onChange={(e) => handleTempoChange(Number(e.target.value))}
            className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <button
            onClick={() => adjustTempo(5)}
            disabled={tempo === null}
            className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-md font-medium transition-colors disabled:opacity-50"
          >
            +5
          </button>
        </div>
      </div>

      {/* Status and Controls */}
      {/* Remove the status and playback info section */}
      {/* Find and remove the following block:
      <div className="mb-4 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600">Status:</span>
          <span className={`text-sm px-2 py-1 rounded ${
            isReady ? 'bg-green-100 text-green-800' : 
            error ? 'bg-red-100 text-red-800' : 
            'bg-yellow-100 text-yellow-800'
          }`}>
            {status}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600">Playback:</span>
          <span className="text-sm text-gray-800">{playerState}</span>
        </div>

      </div> */}

      {/* Playback Controls */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <button
          onClick={handlePlay}
          disabled={!isReady}
          className={`w-28 h-12 flex items-center justify-center px-4 py-2 rounded-md font-semibold transition-colors text-base
            ${isReady
              ? isPlaying
                ? 'bg-amber-500 hover:bg-amber-600 text-white'
                : 'bg-green-600 hover:bg-green-700 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
          `}
        >
          {isPlaying ? (
            <><MdPause size={26} className="mr-2" /><span className="sr-only">Pause</span></>
          ) : (
            <><MdPlayArrow size={26} className="mr-2" /><span className="sr-only">Play</span></>
          )}
        </button>
        <button
          onClick={handleStop}
          disabled={!isReady}
          className={`w-28 h-12 flex items-center justify-center px-4 py-2 rounded-md font-semibold transition-colors text-base
            ${isReady
              ? 'bg-red-600 hover:bg-red-700 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
          `}
        >
          <MdStop size={26} className="mr-2" /><span className="sr-only">Stop</span>
        </button>
        <button
          onClick={handleLoopToggle}
          disabled={!isReady}
          className={`w-28 h-12 flex items-center justify-center px-4 py-2 rounded-md font-semibold transition-colors text-base
            ${isReady
              ? isLooping
                ? 'bg-amber-600 hover:bg-amber-700 text-white'
                : 'bg-amber-100 hover:bg-amber-200 text-amber-800 border border-amber-300'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
          `}
        >
          <MdLoop className="mr-2" size={22} />Loop
        </button>
        <button
          onClick={handleMetronomeToggle}
          disabled={!isReady}
          className={`w-28 h-12 flex items-center justify-center px-4 py-2 rounded-md font-semibold transition-colors text-base
            ${isReady
              ? isMetronomeOn
                ? 'bg-amber-600 hover:bg-amber-700 text-white'
                : 'bg-amber-100 hover:bg-amber-200 text-amber-800 border border-amber-300'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
          `}
        >
          <GiMetronome className="mr-2" size={22} />Metronome
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* AlphaTab Rendering Container */}
      <div className="w-full overflow-x-auto mb-4">
        <div ref={containerRef} className="alphatab-cdn-container border border-gray-200 rounded-lg" style={{ minWidth }}></div>
      </div>
      {/* How to Read the Tab Section */}
      <div className="bg-amber-50 border-l-4 border-amber-400 rounded p-4 mb-6 max-w-2xl mx-auto">
        <h3 className="text-lg font-semibold text-amber-800 mb-2">How to Read This Tab</h3>
        <ul className="list-disc pl-5 text-amber-900 space-y-1">
          <li><span className="font-bold text-amber-700">Standard Notation:</span> The top staff shows traditional music notation for rhythm and pitch.</li>
          <li><span className="font-bold text-amber-700">Tablature (TAB):</span> The lower staff shows fret numbers for each string—play the indicated fret on the matching string.</li>
          <li><span className="font-bold text-amber-700">Picking Symbols:</span> <span className="font-mono">⊓</span> = Downstroke, <span className="font-mono">∨</span> = Upstroke.</li>
          <li><span className="font-bold text-amber-700">Slurs:</span> Curved lines between notes indicate hammer-ons or pull-offs (pick the first note, then use your left hand for the next note without picking).</li>
          <li><span className="font-bold text-amber-700">Fingering:</span> Numbers above the staff suggest which left-hand finger to use (1 = index, 2 = middle, 3 = ring, 4 = pinky).</li>
        </ul>
      </div>
    </div>
  );
}