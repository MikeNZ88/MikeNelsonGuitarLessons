'use client';

import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { MdLoop } from 'react-icons/md';
import { GiMetronome } from 'react-icons/gi';
import { MdPlayArrow, MdPause, MdStop } from 'react-icons/md';
import { usePathname } from 'next/navigation';

interface Exercise {
  id: string;
  name: string;
  file: string;
}

interface AlphaTabPlayerCDNProps {
  containerId?: string;
}

// Grouped exercise arrays for dropdown
const sixteenthNotes = [
  {
    id: 'am-pentatonic-asc-desc-16ths',
    name: 'Ascending & Descending Pattern (16th Notes)',
    file: '/GP Files/Scale Exercises/BLOG TABS/Am Pentatonic Ascending:Descending 16th notes.gp'
  },
  {
    id: 'am-pentatonic-asc-desc-legato',
    name: 'Ascending & Descending Pattern (Partial Legato)',
    file: '/GP Files/Scale Exercises/BLOG TABS/Ascending & Descending partial legato.gp'
  },
  {
    id: 'am-pentatonic-asc-desc-pure-legato',
    name: 'Ascending & Descending Pattern (Pure Legato)',
    file: '/GP Files/Scale Exercises/BLOG TABS/Ascending & Descending legato.gp'
  },
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
    name: 'Ascending Pattern (Alternate Picking)',
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
  },
  {
    id: 'am-pentatonic-triplets',
    name: 'Descending Pattern (Partial Legato)',
    file: '/GP Files/Scale Exercises/BLOG TABS/Am Pentatonic descending eighth note triplets.gp'
  }
];

// Flat array for lookup and selection logic
const exercises: Exercise[] = [...sixteenthNotes, ...sixteenthTriplets];

// Arpeggio exercises for the arpeggios blog post
const arpeggioExercises = [
  {
    group: 'Three Octave Arpeggios',
    items: [
      { id: 'c-maj7', name: 'C Major 7 Arpeggio', file: '/GP Files/Scale Exercises/BLOG TABS/Arpeggios/C maj7 Arpeggio.gp' },
      { id: 'c-7', name: 'C7 Arpeggio', file: '/GP Files/Scale Exercises/BLOG TABS/Arpeggios/C 7 Arpeggio.gp' },
      { id: 'c-m7', name: 'C Minor 7 Arpeggio', file: '/GP Files/Scale Exercises/BLOG TABS/Arpeggios/C m7 Arpeggio.gp' },
      { id: 'c-m7b5', name: 'C Minor 7b5 Arpeggio', file: '/GP Files/Scale Exercises/BLOG TABS/Arpeggios/C m7b5 Arpeggio.gp' },
      { id: 'c-dimmaj7', name: 'C Diminished Major 7 Arpeggio', file: '/GP Files/Scale Exercises/BLOG TABS/Arpeggios/Cdimj7 Arpeggio.gp' },
      { id: 'cm-maj7', name: 'C Minor Major 7 Arpeggio', file: '/GP Files/Scale Exercises/BLOG TABS/Arpeggios/CmMaj7 Arpeggio.gp' }
    ]
  },
  {
    group: 'Two Octave Arpeggios',
    items: [
      { id: 'c-maj7-sweep', name: 'C Major 7 Arpeggio (Sweep with Legato & Tap)', file: '/GP Files/Scale Exercises/BLOG TABS/Arpeggios/Cmaj7 Arpeggio Sweep with Legato and Tap.gp' },
      { id: 'c-7-sweep', name: 'C7 Arpeggio (Sweep with Legato & Tap)', file: '/GP Files/Scale Exercises/BLOG TABS/Arpeggios/C7 Arpeggio Sweep with Legato and Tap.gp' },
      { id: 'c-m7-sweep', name: 'C Minor 7 Arpeggio (Sweep with Legato & Tap)', file: '/GP Files/Scale Exercises/BLOG TABS/Arpeggios/Cm7 Arpeggio Sweep with Legato and Tap.gp' },
      { id: 'c-m7b5-sweep', name: 'C Minor 7b5 Arpeggio (Sweep with Legato & Tap)', file: '/GP Files/Scale Exercises/BLOG TABS/Arpeggios/Cm7b5 Arpeggio Sweep with Legato and Tap.gp' }
    ]
  },
  {
    group: 'C Major Scale Arpeggio Sequence',
    items: [
      { id: 'c-major-scale-arp-asc', name: 'C Major Scale Arpeggios Ascending', file: '/GP Files/Scale Exercises/BLOG TABS/Arpeggios/C Major Scale Arpeggios Ascending.gp' },
      { id: 'c-major-scale-arp-desc', name: 'C Major Scale Arpeggios Descending', file: '/GP Files/Scale Exercises/BLOG TABS/Arpeggios/C Major Scale Arpeggios Descending.gp' }
    ]
  }
];

// Blues Licks exercises for the blues licks blog post
const bluesLicksExercises = [
  {
    id: 'b3-3-1-lick-3-chords',
    name: 'b3 - 3 - 1 lick, 3 chords',
    file: '/GP Files/Scale Exercises/BLOG TABS/12 Bar Blues in A.gp'
  },
  {
    id: 'b3-3-b7-lick-3-chords',
    name: 'b3 - 3 - b7 lick, 3 chords',
    file: '/GP Files/Scale Exercises/BLOG TABS/12 Bar Blues in A V7.gp'
  },
  {
    id: 'b3-3-1-lick-major-am', // This is V2
    name: 'Am Pentatonic', // Corrected label
    file: '/GP Files/Scale Exercises/BLOG TABS/12 Bar Blues in A V2.gp'
  },
  {
    id: 'b3-3-1-lick-am-em', // This is V3
    name: 'A Major Pentatonic over A7, Am Pentatonic over D7, A Major Pentatonic over E7', // Corrected label
    file: '/GP Files/Scale Exercises/BLOG TABS/12 Bar Blues in A V3.gp'
  },
  {
    id: 'b3-3-1-lick-e-major-em', // This is V4
    name: 'E Major Pentatonic over E7 (first bar), Em Pentatonic over E7 (last bar)',
    file: '/GP Files/Scale Exercises/BLOG TABS/12 Bar Blues in A V4.gp'
  },
  {
    id: 'b3-3-1-lick-major-am-blues-d-major', // This is V5
    name: 'A Major Pentatonic over A7, D Major Pentatonic over D7, A Major Blues over E7', // Corrected label
    file: '/GP Files/Scale Exercises/BLOG TABS/12 Bar Blues in A V5.gp'
  },
  {
    id: 'b3-3-1-lick-hybrid-bbking-v6', // This is V6
    name: 'A Hybrid Blues over A7, D Major Pentatonic over D7, A & E BB King Box over A7 & E7', // Corrected label
    file: '/GP Files/Scale Exercises/BLOG TABS/12 Bar Blues in A V6.gp',
  },
];

declare global {
  interface Window {
    alphaTab: any;
  }
}

export default function AlphaTabPlayerCDN({ containerId = 'alphatab-container' }: AlphaTabPlayerCDNProps = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const alphaTabRef = useRef<any>(null);
  const pathname = usePathname();
  
  // Memoize currentExercises to prevent unnecessary re-renders
  const currentExercises = useMemo(() => {
    const pageDetection = {
      pathname: pathname || '',
      isBluesLicksPage: pathname?.includes('/blues-licks-exercises/') || false,
      isArpeggioPage: pathname?.includes('/arpeggio-exercises/') || false
    };
    
    console.log('🔍 Page Detection:', pageDetection);
    
    const pathnameCheck = pageDetection.pathname.includes('/blues-licks-exercises/') || 
                         pageDetection.pathname.includes('/arpeggio-exercises/');
    console.log('🔍 Pathname check:', pathnameCheck);

    if (!pathnameCheck) {
      return [];
    }

    if (pageDetection.isBluesLicksPage) {
      return [
        {
          group: 'Blues Licks',
          items: [
            {
              id: 'b3-3-1-lick-3-chords',
              name: '1A. b3 - 3 - 1 lick over each of the 3 Chords: A7, D7, & E7',
              file: '/GP Files/Scale Exercises/BLOG TABS/12 Bar Blues in A.gp'
            },
            {
              id: 'b3-3-b7-lick-3-chords',
              name: '1B. b3 - 3 - b7 lick over each of the 3 Chords: A7, D7, & E7',
              file: '/GP Files/Scale Exercises/BLOG TABS/12 Bar Blues in A V7.gp'
            },
            {
              id: 'b3-3-1-lick-major-am', // This is V2
              name: '2. Am Pentatonic', // Corrected label
              file: '/GP Files/Scale Exercises/BLOG TABS/12 Bar Blues in A V2.gp'
            },
            {
              id: 'b3-3-1-lick-am-em', // This is V3
              name: '3. A Major Pentatonic over A7, Am Pentatonic over D7, A Major Pentatonic over E7', // Corrected label
              file: '/GP Files/Scale Exercises/BLOG TABS/12 Bar Blues in A V3.gp'
            },
            {
              id: 'b3-3-1-lick-multi',
              name: '4. E Major Pentatonic over E7 (first bar), Em Pentatonic over E7 (last bar)',
              file: '/GP Files/Scale Exercises/BLOG TABS/12 Bar Blues in A V4.gp'
            },
            {
              id: 'b3-3-1-lick-em-em',
              name: '5A. A Major Pentatonic over A7, D Major Pentatonic over D7, A Major Blues over E7',
              file: '/GP Files/Scale Exercises/BLOG TABS/12 Bar Blues in A V5.gp'
            },
            {
              id: 'b3-3-1-lick-hybrid-bbking-v6',
              name: '5B. A Hybrid Blues over A7, D Major Pentatonic over D7, A & E BB King Box over A7 & E7',
              file: '/GP Files/Scale Exercises/BLOG TABS/12 Bar Blues in A V6.gp',
            },
          ]
        }
      ];
    }

    if (pageDetection.isArpeggioPage) {
      return [
        {
          group: 'Basic Arpeggios',
          items: [
            { id: 'c-major-arpeggio', name: 'C Major Arpeggio', file: '/GP Files/Arpeggios/C Major Arpeggio.gp' },
            { id: 'a-minor-arpeggio', name: 'A Minor Arpeggio', file: '/GP Files/Arpeggios/A Minor Arpeggio.gp' },
            { id: 'g-major-arpeggio', name: 'G Major Arpeggio', file: '/GP Files/Arpeggios/G Major Arpeggio.gp' },
            { id: 'e-minor-arpeggio', name: 'E Minor Arpeggio', file: '/GP Files/Arpeggios/E Minor Arpeggio.gp' },
            { id: 'd-major-arpeggio', name: 'D Major Arpeggio', file: '/GP Files/Arpeggios/D Major Arpeggio.gp' }
          ]
        },
        {
          group: '7th Arpeggios',
          items: [
            { id: 'cmaj7-arpeggio', name: 'Cmaj7 Arpeggio', file: '/GP Files/Arpeggios/C m7 Arpeggio.gp' },
            { id: 'am7-arpeggio', name: 'Am7 Arpeggio', file: '/GP Files/Arpeggios/C m7 Arpeggio.gp' },
            { id: 'g7-arpeggio', name: 'G7 Arpeggio', file: '/GP Files/Arpeggios/C 7 Arpeggio.gp' },
            { id: 'dm7-arpeggio', name: 'Dm7 Arpeggio', file: '/GP Files/Arpeggios/C m7 Arpeggio.gp' },
            { id: 'em7-arpeggio', name: 'Em7 Arpeggio', file: '/GP Files/Arpeggios/C m7 Arpeggio.gp' }
          ]
        }
      ];
    }

    return [];
  }, [pathname]);

  // Use a stable reference for the initial exercise
  const getInitialExercise = useCallback(() => {
    if (currentExercises.length > 0 && currentExercises[0].items.length > 0) {
      return currentExercises[0].items[0].id;
    }
    return '';
  }, [currentExercises]);

  const [selectedExercise, setSelectedExercise] = useState('');

  // Initialize selectedExercise only once when currentExercises changes
  useEffect(() => {
    const initialExercise = getInitialExercise();
    if (initialExercise && !selectedExercise) {
      console.log('🎯 Initial Exercise:', initialExercise);
      setSelectedExercise(initialExercise);
    }
  }, [getInitialExercise]);
  
  const [status, setStatus] = useState('Loading AlphaTab...');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [playerState, setPlayerState] = useState('Stopped');
  const [tempo, setTempo] = useState<number | null>(null); // Will be set from loaded score
  const [originalTempo, setOriginalTempo] = useState<number | null>(null); // Store the original tempo from the file
  const [version, setVersion] = useState(Date.now()); // Force reload
  const [isLooping, setIsLooping] = useState(false); // Loop playback state
  const [isMetronomeOn, setIsMetronomeOn] = useState(false); // Metronome state
  const isLoopingRef = useRef(false); // Ref to track loop state for event listeners
 
  // Ensure loop state is properly initialized
  useEffect(() => {
    isLoopingRef.current = isLooping;
  }, [isLooping]);
  const [minWidth, setMinWidth] = useState(800);
  const [zoom, setZoom] = useState(1.2);
  const [selectedTrack, setSelectedTrack] = useState(1); // Default to 1 (rhythm) since that's what's showing
  const [availableTracks, setAvailableTracks] = useState<number>(1);

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

      /* Enhanced AlphaTab cursor styling for better visibility */
      .at .at-cursor-beat {
        fill: none !important;
        stroke: red !important;
        stroke-width: 2.5px !important;
        stroke-dasharray: 4,2 !important;
        pointer-events: none !important;
      }
      
      .at .at-cursor-bar {
        fill: none !important;
        stroke: orange !important;
        stroke-width: 2px !important;
        stroke-dasharray: 6,3 !important;
        pointer-events: none !important;
      }
      
      .at .at-highlight {
        fill: rgba(255, 255, 0, 0.4) !important;
        stroke: orange !important;
        stroke-width: 1px !important;
      }
      
      /* Ensure cursor elements are above other content */
      .at .at-cursor,
      .at .at-cursor-beat,
      .at .at-cursor-bar {
        z-index: 1000 !important;
        pointer-events: none !important;
      }
      
      /* Make sure SVG allows cursor overlay */
      .at svg {
        overflow: visible !important;
      }

      /* Strongest override for all cursor elements */
      .at .at-cursor *,
      .at .at-cursor-beat *,
      .at .at-cursor-bar *,
      .at .at-cursor,
      .at .at-cursor-beat,
      .at .at-cursor-bar {
        fill: none !important;
        stroke: red !important;
        stroke-width: 2.5px !important;
        stroke-dasharray: 4,2 !important;
        pointer-events: none !important;
      }

      .at .at-cursor-bar,
      .at .at-cursor-bar * {
        stroke: orange !important;
        stroke-width: 2px !important;
        stroke-dasharray: 6,3 !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);

  // Remove fill from all cursor elements using MutationObserver
  useEffect(() => {
    function removeCursorFill() {
      const svg = containerRef.current?.querySelector('svg');
      if (!svg) return;
      svg.querySelectorAll('.at-cursor, .at-cursor-beat, .at-cursor-bar').forEach(cursorGroup => {
        cursorGroup.querySelectorAll('rect, path, polygon, ellipse, circle').forEach(el => {
          el.setAttribute('fill', 'none');
          (el as SVGElement).style.fill = 'none';
        });
      });
    }
    // Observe changes to the SVG and apply the fix
    const svg = containerRef.current?.querySelector('svg');
    let observer: MutationObserver | null = null;
    if (svg) {
      observer = new MutationObserver(removeCursorFill);
      observer.observe(svg, { childList: true, subtree: true, attributes: true });
    }
    // Also run once on mount and on every playback event
    removeCursorFill();
    return () => {
      if (observer) observer.disconnect();
    };
  }, [containerRef, version]);

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
            cursorFollowMode: 'beat', // Follow cursor by beat for better visibility
            scrollMode: 'offscreen', // Enable offscreen scrolling
            scrollSpeed: 300 // Scroll speed in pixels per second
          },
          // For blues licks, always use track 0 (lead guitar)
          tracks: pathname?.includes('/blues-licks-exercises/') ? [0] : undefined,
          display: {
            scale: zoom, // Use the responsive zoom value
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

        // Load the first exercise based on page type
        let initialExerciseFile = '';
        if (currentExercises.length > 0 && currentExercises[0].items.length > 0) {
          initialExerciseFile = currentExercises[0].items[0].file;
        } else {
          initialExerciseFile = exercises[0].file;
        }
        console.log('🎯 Loading initial exercise file:', initialExerciseFile);
        await loadExercise(initialExerciseFile);

        console.log('AlphaTab initialized successfully with audio support!');
        
      } catch (err) {
        console.error('Failed to initialize AlphaTab:', err);
        setError(`Failed to initialize: ${err}`);
        setStatus('Initialization failed');
      }
    };

    initializeAlphaTab();
  }, []);

  // Helper function to get current exercise data
  const getCurrentExerciseData = () => {
    if (currentExercises.length > 0 && currentExercises[0].items.length > 0) {
      const group = currentExercises[0];
      const found = group.items.find(item => item.id === selectedExercise);
      if (found) return found;
    }
    return null;
  };

  const handleTrackChange = async (trackIndex: number) => {
    console.log('🎵 Changing track to:', trackIndex);
    setSelectedTrack(trackIndex);
    
    // Immediately destroy and reinitialize AlphaTab with new track
    if (alphaTabRef.current && containerRef.current) {
      try {
        console.log('🎵 Destroying current AlphaTab instance...');
        alphaTabRef.current.destroy();
        alphaTabRef.current = null;
      } catch (error) {
        console.log('🎵 Destroy failed:', error);
      }
      
      // Clear the container
      containerRef.current.innerHTML = '';
      
      // Wait a moment then reinitialize
      setTimeout(async () => {
        if (containerRef.current && window.alphaTab) {
          console.log('🎵 Reinitializing AlphaTab with track:', trackIndex);
          
          // Create new AlphaTab instance with the selected track
          alphaTabRef.current = new window.alphaTab.AlphaTabApi(containerRef.current, {
            core: {
              enableLazyLoading: false,
              useWorkers: false
            },
            player: {
              enablePlayer: true,
              enableCursor: true,
              enableUserInteraction: true,
              enableElementHighlighting: true,
              soundFont: 'https://cdn.jsdelivr.net/npm/@coderline/alphatab@latest/dist/soundfont/sonivox.sf2',
              scrollElement: containerRef.current,
              enableMetronome: true,
              cursorFollowMode: 'beat',
              scrollMode: 'offscreen',
              scrollSpeed: 300
            },
            tracks: [trackIndex], // Use the selected track
            display: {
              scale: zoom,
              layoutMode: 'page',
              showTempo: false,
              showTitle: false,
              showSubtitle: false,
              showArtist: false,
              showAlbum: false,
              showWords: false,
              showMusic: true,
              showCopyright: false,
              showNotices: false,
              showInstructions: false,
              showAutomation: false,
              showTempoChanges: false,
              showMetronome: false,
              showBarNumbers: true
            }
          });
          
          // Set up event listeners
          setupEventListeners(alphaTabRef.current);
          
          // Load the current exercise
          const currentExercise = getCurrentExerciseData();
          if (currentExercise) {
            console.log('🎵 Loading exercise for new track:', currentExercise.file);
            await loadExercise(currentExercise.file);
          }
        }
      }, 200);
    }
  };

  // Reload exercise when selection changes
  useEffect(() => {
    if (alphaTabRef.current && isReady) {
      const selectedExerciseData = getCurrentExerciseData();
      if (selectedExerciseData) {
        loadExercise(selectedExerciseData.file);
      }
    }
  }, [selectedExercise, isReady, currentExercises]);



  const setupEventListeners = (api: any) => {
    api.renderStarted.on(() => {
      console.log('Rendering started');
      setStatus('Rendering tablature...');
    });

    api.renderFinished.on(() => {
      console.log('Render finished');
      setStatus('Ready to play!');
      setIsReady(true);
      
      // Enable all tracks for blues licks after render is complete
      if (currentExercises.length > 0 && currentExercises[0].items.length > 1) {
        console.log('🎵 Enabling all tracks after render for blues licks');
        console.log('🎵 Number of tracks:', currentExercises[0].items.length);
        
        // Try to use AlphaTab's settings to show all tracks
        try {
          if (api.settings) {
            console.log('🎵 Using AlphaTab settings to show all tracks');
            api.settings.tracks.showAllTracks = true;
            api.settings.tracks.showTracks = [0, 1];
          }
        } catch (error) {
          console.log('🎵 Settings approach failed:', error);
        }
        
        // Also try direct track manipulation
        api.tracks.forEach((track: any, index: number) => {
          console.log(`🎵 Setting track ${index} visible after render`);
          track.isVisible = true;
          track.isMuted = false;
          track.isSolo = false;
        });
        
        // Force a re-render to show all tracks
        setTimeout(() => {
          try {
            api.render();
            console.log('🎵 Re-render after render finished completed');
          } catch (error) {
            console.log('🎵 Re-render after render finished failed:', error);
          }
        }, 100);
      }
    });

    api.scoreLoaded.on((score: any) => {
      console.log('Score loaded successfully');
      console.log('Score keys:', Object.keys(score));
      
            // Log details about tracks and their notation
      if (score.tracks && score.tracks.length > 0) {
        console.log('Found', score.tracks.length, 'tracks');
        
        // Update available tracks count
        setAvailableTracks(score.tracks.length);
        console.log('🎵 Setting available tracks:', score.tracks.length);
        
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
        setOriginalTempo(initialTempo); // Store the original tempo
        // Set playback speed to 1.0 (normal speed) since the file already has the correct tempo
        if (alphaTabRef.current && alphaTabRef.current.playbackSpeed !== undefined) {
          alphaTabRef.current.playbackSpeed = 1.0; // Play at normal speed
        }
      } else {
        // Set default tempo: 40 BPM for arpeggio page, 80 BPM otherwise
        const isArpeggioPage = pathname?.includes('/arpeggio-exercises/');
        const defaultTempo = isArpeggioPage ? 40 : 80;
        console.log(`No tempo found in score, using default ${defaultTempo} BPM for this page`);
        setTempo(defaultTempo);
        setOriginalTempo(defaultTempo); // Store the default as original tempo
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

    // Enhanced cursor tracking events
    api.playedBeatChanged.on((e: any) => {
      console.log('Beat changed:', e);
      // This fires when each beat is played - provides more granular tracking
      if (isPlaying && api.scrollToCursor) {
        try {
          console.log('Calling scrollToCursor...');
          api.scrollToCursor();
          console.log('scrollToCursor called successfully');
        } catch (error) {
          console.warn('Beat scrolling failed:', error);
        }
      }
    });

    api.playerPositionChanged.on((e: any) => {
      // Enhanced position tracking with debugging
      console.log('Player position changed - Time:', e.currentTime, 'Tick:', e.currentTick);
      
      // Ensure cursor follows playback smoothly
      if (isPlaying && api.scrollToCursor) {
        try {
          console.log('Calling scrollToCursor from position changed...');
          api.scrollToCursor();
          console.log('scrollToCursor from position changed called successfully');
        } catch (scrollError) {
          console.warn('Scroll to cursor failed:', scrollError);
        }
      }
    });

    // Add activeBeatsChanged for real-time beat highlighting
    api.activeBeatsChanged.on((e: any) => {
      console.log('Active beats changed:', e);
      // This provides information about which beats are currently being played
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
            core: {
              enableLazyLoading: false,
              useWorkers: false
            },
            player: {
              enablePlayer: true,
              enableCursor: true,
              enableUserInteraction: true,
              enableElementHighlighting: true,
              // No soundFont specified - use default synthesis
              scrollElement: containerRef.current,
              enableMetronome: true,
              scrollMode: 'offscreen',
              scrollSpeed: 300,
              scrollOffsetY: 100
            },
            display: {
              scale: zoom, // Use the responsive zoom value
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
    console.log('🔄 handleExerciseChange called with exerciseId:', exerciseId);
    console.log('🔄 isBluesLicksPage:', currentExercises.length > 0 && currentExercises[0].items.length > 0, 'isArpeggioPage:', pathname?.includes('/arpeggio-exercises/'));
    
    setSelectedExercise(exerciseId);
    
    // Find exercise data for the new exerciseId
    let exercise = null;
    if (currentExercises.length > 0 && currentExercises[0].items.length > 0) {
      const group = currentExercises[0];
      exercise = group.items.find(item => item.id === exerciseId);
      console.log('🔄 Found blues exercise:', exercise);
    } else {
      // Find in pentatonic exercises
      exercise = sixteenthNotes.find(ex => ex.id === exerciseId) ||
                 sixteenthTriplets.find(ex => ex.id === exerciseId);
    }
    
    if (exercise) {
      console.log('🔄 Loading exercise file:', exercise.file);
      loadExercise(exercise.file);
    } else {
      console.log('❌ No exercise found for ID:', exerciseId);
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
    if (alphaTabRef.current && alphaTabRef.current.playbackSpeed !== undefined && originalTempo) {
      // Calculate playback speed relative to the original file tempo
      alphaTabRef.current.playbackSpeed = newTempo / originalTempo;
    }
  };

  const adjustTempo = (change: number) => {
    if (tempo === null) return; // Don't adjust if tempo hasn't loaded yet
    const newTempo = Math.max(20, Math.min(200, tempo + change));
    setTempo(newTempo);
    if (alphaTabRef.current && alphaTabRef.current.playbackSpeed !== undefined && originalTempo) {
      // Calculate playback speed relative to the original file tempo
      alphaTabRef.current.playbackSpeed = newTempo / originalTempo;
    }
  };

  const selectedExerciseName = currentExercises.length > 0 && currentExercises[0].items.length > 0 
    ? currentExercises[0].items.find(ex => ex.id === selectedExercise)?.name || 'Unknown Exercise'
    : exercises.find(ex => ex.id === selectedExercise)?.name || 'Unknown Exercise';

  if (error) {
    return (
      <div className="p-4 border border-red-300 rounded-lg bg-red-50">
        <p className="text-red-700">Error loading tab player: {error}</p>
      </div>
    );
  }

  return (
    <div className="w-full">
            {/* Exercise Dropdown */}
      {(() => {
        console.log('🎯 Dropdown rendering - isBluesLicksPage:', currentExercises.length > 0 && currentExercises[0].items.length > 0, 'isArpeggioPage:', pathname?.includes('/arpeggio-exercises/'));
        return null;
      })()}
      {currentExercises.length > 0 && currentExercises[0].items.length > 0 ? (
        <div className="mb-4">
          <label htmlFor="blues-licks-exercise-select" className="block text-sm font-medium text-gray-700 mb-2">
            Select Blues Lick Exercise
          </label>
          <select
            id="blues-licks-exercise-select"
            value={selectedExercise}
            onChange={(e) => handleExerciseChange(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            {currentExercises[0].items.map(ex => (
              <option key={ex.id} value={ex.id}>{ex.name}</option>
            ))}
          </select>
          

        </div>
      ) : (
        <>
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
            </select>
          </div>
        </>
      )}

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
            min="10"
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
                : 'bg-amber-800 hover:bg-amber-900 text-white'
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
      <div ref={containerRef} className="w-full overflow-x-auto mb-4" style={{ 
        maxHeight: isPlaying ? '600px' : 'none', 
        overflowY: isPlaying ? 'auto' : 'visible' 
      }}>
        <div id={containerId} className="alphatab-cdn-container border border-gray-200 rounded-lg" style={{ minWidth }}></div>
      </div>
      {/* How to Read the Tab Section */}
      <div className="bg-amber-50 border-l-4 border-amber-400 rounded p-4 mb-6 max-w-2xl mx-auto">
        <h3 className="text-lg font-semibold text-amber-800 mb-2">How to Read This Tab</h3>
        <ul className="list-disc pl-5 text-amber-900 space-y-1">
          <li><span className="font-bold text-amber-700">Standard Notation:</span> The top staff shows traditional music notation for rhythm and pitch.</li>
          <li><span className="font-bold text-amber-700">Tablature (TAB):</span> The lower staff shows fret numbers for each string—play the indicated fret on the matching string.</li>
          <li><span className="font-bold text-amber-700">Picking Symbols:</span> <span className="font-mono">⊓</span> = Downstroke, <span className="font-mono">∨</span> = Upstroke.</li>
          <li><span className="font-bold text-amber-700">Slurs:</span> Curved lines between notes indicate hammer-ons or pull-offs (pick the first note, then use your left hand for the next note without picking).</li>
          <li><span className="font-bold text-amber-700">Slides:</span> A diagonal line or "sl." between notes means slide your finger from the first note to the next without lifting.</li>
          <li><span className="font-bold text-amber-700">Fingering:</span> Numbers above the staff suggest which left-hand finger to use (1 = index, 2 = middle, 3 = ring, 4 = pinky).</li>
        </ul>
        <div className="mt-4 p-3 bg-amber-100 border-l-4 border-amber-400 rounded text-amber-900 text-sm">
          <strong>Note on Picking & Fingering:</strong> The picking symbols shown are one possible approach. For the three-octave arpeggios, some sweep picking (continuous raking across strings) and hammer-ons are used for efficiency. You may choose to use strict alternate picking, different left-hand fingerings, or other techniques—experiment to find what works best for you!
        </div>
      </div>
    </div>
  );
}