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
  tempo?: number;
}

interface AlphaTabPlayerCDNProps {
  containerId?: string;
  showTabInstructions?: boolean;
  showSlursAndSlides?: boolean;
  showSlides?: boolean;
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
    ]
  }
];

// Rhythm exercises for the different rhythms blog post
const rhythmExercises = [
  {
    group: 'Rhythm Patterns',
    items: [
      { id: 'dotted-8th-rhythm-riff', name: 'Dotted 8th Note Rhythm as a Riff', file: '/GP Files/Scale Exercises/BLOG TABS/Dotted 8th Note Rhythm as a Riff.gp', tempo: 70 },
      { id: 'dotted-quarter-rhythm-riff', name: 'Dotted Quarter Note Rhythm as a Riff', file: '/GP Files/Scale Exercises/BLOG TABS/Dotted Quarter Note Rhythm as a Riff.gp', tempo: 70 },
      { id: 'sixteenth-rhythm-riff', name: '16th Note Rhythm as a Riff', file: '/GP Files/Scale Exercises/BLOG TABS/16th note Rhythm as a riff.gp', tempo: 70 },
      { id: 'eighth-triplets-rhythm', name: '8th Note Triplets Rhythm as a Riff', file: '/GP Files/Scale Exercises/BLOG TABS/8th Note Triplets Rhythm.gp', tempo: 70 },
      { id: 'sixteenth-triplets-rhythm', name: '16th Note Triplets Rhythm as a Riff', file: '/GP Files/Scale Exercises/BLOG TABS/16th Note Triplets Rhythm.gp', tempo: 70 },
      { id: 'tied-notes-rhythm', name: 'Rhythm With Notes Tied Across Barline as a Riff', file: '/GP Files/Scale Exercises/BLOG TABS/Rhythm with notes tied across barline.gp', tempo: 70 },
      { id: 'syncopated-16th-rhythm', name: 'Syncopated 16th Note Rhythm as a Riff', file: '/GP Files/Scale Exercises/BLOG TABS/Syncopated 16th note Rhythm as a riff.gp', tempo: 70 },
      { id: 'syncopated-16th-notes-rhythm', name: '16th Notes Syncopated Rhythm as a Riff', file: '/GP Files/Scale Exercises/BLOG TABS/16th Notes Syncopated Rhythm as a riff.gp', tempo: 70 },
      { id: 'five-four-rhythm', name: 'Rhythm using 5/4 Time as a Riff', file: '/GP Files/Scale Exercises/BLOG TABS/Rhythm using 5:4 Time as a Riff.gp', tempo: 70 },
      { id: 'sixteenth-vs-eighth-triplets', name: '16th Notes Vs 8th Note Triplets as a Riff', file: '/GP Files/Scale Exercises/BLOG TABS/16th Notes vs 8th Note Tripets.gp', tempo: 70 },
      { id: 'dotted-8th-plus-16th', name: 'Dotted 8th + 16th Note Rhythm as a Riff', file: '/GP Files/Scale Exercises/BLOG TABS/Dotted 8th Note + 16th note Rhythm.gp', tempo: 70 }
    ]
  }
];

// Blues Licks exercises for the blues licks blog post
const bluesLicksExercises = [
  {
    id: 'b3-3-1-lick-3-chords',
    name: 'b3 - 3 - 1 lick, 3 chords',
    file: '/GP Files/Scale Exercises/BLOG TABS/12 Bar Blues in A.gp',
    tempo: 80
  },
  {
    id: 'b3-3-b7-lick-3-chords',
    name: 'b3 - 3 - b7 lick, 3 chords',
    file: '/GP Files/Scale Exercises/BLOG TABS/12 Bar Blues in A V7.gp',
    tempo: 80
  },
  {
    id: 'b3-3-1-lick-major-am', // This is V2
    name: 'Am Pentatonic', // Corrected label
    file: '/GP Files/Scale Exercises/BLOG TABS/12 Bar Blues in A V2.gp',
    tempo: 80
  },
  {
    id: 'b3-3-1-lick-am-em', // This is V3
    name: 'A Major Pentatonic over A7, Am Pentatonic over D7, A Major Pentatonic over E7', // Corrected label
    file: '/GP Files/Scale Exercises/BLOG TABS/12 Bar Blues in A V3.gp',
    tempo: 80
  },
  {
    id: 'b3-3-1-lick-major-am-blues-d-major', // This is V5 - now Exercise 4
    name: 'A Major Pentatonic over A7, D Major Pentatonic over D7, A Major Blues over E7', // Corrected label
    file: '/GP Files/Scale Exercises/BLOG TABS/12 Bar Blues in A V5.gp',
    tempo: 80
  },
  {
    id: 'b3-3-1-lick-e-major-em', // This is V4 - now Exercise 5A
    name: 'E Major Pentatonic over E7 (first bar), Em Pentatonic over E7 (last bar)',
    file: '/GP Files/Scale Exercises/BLOG TABS/12 Bar Blues in A V4.gp',
    tempo: 80
  },
  {
    id: 'b3-3-1-lick-hybrid-bbking-v6', // This is V6
    name: 'Hybrid blues Scales over A7, D Major Pentatonic over D7, A & E BB King Box over A7 & E7', // Updated to Hybrid blues Scales
    file: '/GP Files/Scale Exercises/BLOG TABS/12 Bar Blues in A V6.gp',
    tempo: 80
  },
];

// Beginner Guitar Riffs exercises
const beginnerRiffsExercises = [
  {
    id: 'smoke-on-the-water',
    name: 'Smoke On The Water - Deep Purple (1972)',
    file: '/GP Files/Scale Exercises/BLOG TABS/Smoke On The Water Riff.gp',
    tempo: 120
  },
  {
    id: 'iron-man-main',
    name: 'Iron Man - Black Sabbath (1970)',
    file: '/GP Files/Scale Exercises/BLOG TABS/Iron Man Main Riff.gp',
    tempo: 140
  },
  {
    id: 'walk-this-way',
    name: 'Walk This Way - Aerosmith (1975)',
    file: '/GP Files/Scale Exercises/BLOG TABS/Walk This Way.gp',
    tempo: 110
  },
  {
    id: 'tnt-acdc',
    name: 'TNT - AC/DC (1975)',
    file: '/GP Files/Scale Exercises/BLOG TABS/TNT ACDC Riff.gp',
    tempo: 130
  },
  {
    id: 'man-in-the-box',
    name: 'Man In The Box - Alice In Chains (1990)',
    file: '/GP Files/Scale Exercises/BLOG TABS/AIC MAN IN THE BOX.gp',
    tempo: 110
  },
  {
    id: 'enter-sandman',
    name: 'Enter Sandman - Metallica (1991)',
    file: '/GP Files/Scale Exercises/BLOG TABS/Enter Sandman .gp',
    tempo: 135
  },
  {
    id: 'jeremy-pearl-jam',
    name: 'Jeremy - Pearl Jam (1991)',
    file: '/GP Files/Scale Exercises/BLOG TABS/Pearl Jam Jeremy.gp',
    tempo: 140
  },
  {
    id: 'otherside-rhcp',
    name: 'Otherside - Red Hot Chili Peppers (1999)',
    file: '/GP Files/Scale Exercises/BLOG TABS/Otherside RHCP.gp',
    tempo: 95
  },
  {
    id: 'come-as-you-are',
    name: 'Come As You Are - Nirvana (1991)',
    file: '/GP Files/Scale Exercises/BLOG TABS/Come As You Are .gp',
    tempo: 120
  },
  {
    id: 'louie-louie',
    name: 'Louie Louie - The Kingsmen (1963)',
    file: '/GP Files/Scale Exercises/BLOG TABS/Louie Louie.gp',
    tempo: 130
  }
];

declare global {
  interface Window {
    alphaTab: any;
  }
}

export default function AlphaTabPlayerCDN({ containerId = 'alphatab-container', showTabInstructions = true, showSlursAndSlides = true, showSlides = true }: AlphaTabPlayerCDNProps = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const alphaTabRef = useRef<any>(null);
  const pathname = usePathname();
  
  // Page detection logic - moved outside useMemo so it's available in component scope
  const pageDetection = {
    pathname: pathname || '',
    isBluesLicksPage: pathname?.includes('/blues-licks-exercises') || false,
    isArpeggioPage: pathname?.includes('/guitar-arpeggios-exercises') || false,
    isFingerExercisesPage: pathname?.includes('/picking-finger-exercises') || false,
    isBeginnerRiffsPage: pathname?.includes('/easiest-beginner-guitar-riffs') || false,
    isBBKingBoxPage: pathname?.includes('/bb-king-box-different-keys') || false,
    isStringBendingPage: pathname?.includes('/complete-guide-guitar-string-bending') || false,
    isDifferentRhythmsPage: pathname?.includes('/rhythm-library') || false
  };
  
  console.log('🔍 Page Detection:', pageDetection);
  
    const pathnameCheck = pageDetection.pathname.includes('/blues-licks-exercises') || 
                       pageDetection.pathname.includes('/guitar-arpeggios-exercises') || 
                       pageDetection.pathname.includes('/picking-finger-exercises') || 
                       pageDetection.pathname.includes('/easiest-beginner-guitar-riffs') || 
                       pageDetection.pathname.includes('/bb-king-box-different-keys') || 
                       pageDetection.pathname.includes('/complete-guide-guitar-string-bending') ||
                       pageDetection.pathname.includes('/rhythm-library');
  console.log('🔍 Pathname check:', pathnameCheck);
  
  // Memoize currentExercises to prevent unnecessary re-renders
  const currentExercises = useMemo(() => {
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
              file: '/GP Files/Scale Exercises/BLOG TABS/12 Bar Blues in A.gp',
              tempo: 80
            },
            {
              id: 'b3-3-b7-lick-3-chords',
              name: '1B. b3 - 3 - b7 lick over each of the 3 Chords: A7, D7, & E7',
              file: '/GP Files/Scale Exercises/BLOG TABS/12 Bar Blues in A V7.gp',
              tempo: 80
            },
            {
              id: 'b3-3-1-lick-major-am', // This is V2
              name: '2. Am Pentatonic', // Corrected label
              file: '/GP Files/Scale Exercises/BLOG TABS/12 Bar Blues in A V2.gp',
              tempo: 80
            },
            {
              id: 'b3-3-1-lick-am-em', // This is V3
              name: '3. A Major Pentatonic over A7, Am Pentatonic over D7, A Major Pentatonic over E7', // Corrected label
              file: '/GP Files/Scale Exercises/BLOG TABS/12 Bar Blues in A V3.gp',
              tempo: 80
            },
            {
              id: 'b3-3-1-lick-em-em',
              name: '4. A Major Pentatonic (over A7 and E7), Am Pentatonic & D Major Pentatonic (over D7)',
              file: '/GP Files/Scale Exercises/BLOG TABS/12 Bar Blues in A V4.gp',
              tempo: 80
            },
            {
              id: 'b3-3-1-lick-multi',
              name: '5A. E Major and Em Pentatonic over E7',
              file: '/GP Files/Scale Exercises/BLOG TABS/12 Bar Blues in A V5.gp',
              tempo: 80
            },
            {
              id: 'b3-3-1-lick-hybrid-bbking-v6',
              name: '5B. Hybrid Blues Scales',
              file: '/GP Files/Scale Exercises/BLOG TABS/12 Bar Blues in A V6.gp',
              tempo: 80
            },
          ]
        }
      ];
    }

    if (pageDetection.isArpeggioPage) {
      return [
        {
          group: 'Three Octave Arpeggios',
          items: [
            { id: 'c-maj7', name: 'C Major 7 Arpeggio', file: '/GP Files/Scale Exercises/BLOG TABS/Arpeggios/C maj7 Arpeggio.gp' },
            { id: 'c-7', name: 'C7 Arpeggio', file: '/GP Files/Scale Exercises/BLOG TABS/Arpeggios/C 7 Arpeggio.gp' },
            { id: 'c-m7', name: 'C Minor 7 Arpeggio', file: '/GP Files/Scale Exercises/BLOG TABS/Arpeggios/C m7 Arpeggio.gp' },
            { id: 'c-m7b5', name: 'C Minor 7♭5 Arpeggio', file: '/GP Files/Scale Exercises/BLOG TABS/Arpeggios/C m7b5 Arpeggio.gp' },
            { id: 'c-dimmaj7', name: 'C Diminished Major 7 Arpeggio', file: '/GP Files/Scale Exercises/BLOG TABS/Arpeggios/Cdimj7 Arpeggio.gp' },
            { id: 'cm-maj7', name: 'C Minor Major 7 Arpeggio', file: '/GP Files/Scale Exercises/BLOG TABS/Arpeggios/CmMaj7 Arpeggio.gp' }
          ]
        },
        {
          group: 'Two Octave Arpeggios (Sweep)',
          items: [
            { id: 'c-maj7-sweep', name: 'C Major 7 Arpeggio (Sweep with Legato & Tap)', file: '/GP Files/Scale Exercises/BLOG TABS/Arpeggios/Cmaj7 Arpeggio Sweep with Legato and Tap.gp' },
            { id: 'c-7-sweep', name: 'C7 Arpeggio (Sweep with Legato & Tap)', file: '/GP Files/Scale Exercises/BLOG TABS/Arpeggios/C7 Arpeggio Sweep with Legato and Tap.gp' },
            { id: 'c-m7-sweep', name: 'C Minor 7 Arpeggio (Sweep with Legato & Tap)', file: '/GP Files/Scale Exercises/BLOG TABS/Arpeggios/Cm7 Arpeggio Sweep with Legato and Tap.gp' },
            { id: 'c-m7b5-sweep', name: 'C Minor 7♭5 Arpeggio (Sweep with Legato & Tap)', file: '/GP Files/Scale Exercises/BLOG TABS/Arpeggios/Cm7b5 Arpeggio Sweep with Legato and Tap.gp' }
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
    }

    if (pageDetection.isFingerExercisesPage) {
      return [
        {
          group: 'Picking and Finger Exercises',
          items: [
            { id: 'chromatic-1', name: 'Exercise 1: Simple Pattern Ascending & Descending', file: '/GP Files/Scale Exercises/BLOG TABS/Chromatic Exercise 1.gp' },
            { id: 'chromatic-2', name: 'Exercise 2: 1 4 3 2 Finger Pattern', file: '/GP Files/Scale Exercises/BLOG TABS/Chromatic Exercise 2.gp' },
            { id: 'chromatic-3', name: 'Exercise 3: 1 2 1 2 4 3 4 3 Up & 1 2 4 3 1 2 4 3 Back', file: '/GP Files/Scale Exercises/BLOG TABS/Chromatic Exercise 10.gp' },
            { id: 'chromatic-4', name: 'Exercise 4: Fingers 1 2 4 3 & Up One String and Back', file: '/GP Files/Scale Exercises/BLOG TABS/Chromatic Exercise 3.gp' },
            { id: 'chromatic-5', name: 'Exercise 5: Switching Strings', file: '/GP Files/Scale Exercises/BLOG TABS/Chromatic Exercise 4.gp' },
            { id: 'chromatic-6', name: 'Exercise 6: 4 String Pattern', file: '/GP Files/Scale Exercises/BLOG TABS/Chromatic Exercise 5.gp' },
            { id: 'chromatic-7', name: 'Exercise 7: Changing Finger Pattern and String Skipping', file: '/GP Files/Scale Exercises/BLOG TABS/Chromatic Exercise 6.gp' },
            { id: 'chromatic-8', name: 'Exercise 8: Triplets', file: '/GP Files/Scale Exercises/BLOG TABS/Chromatic Exercise 7.gp' },
            { id: 'chromatic-9', name: 'Exercise 9: Triplets and Switching Strings', file: '/GP Files/Scale Exercises/BLOG TABS/Chromatic Exercise 8.gp' },
            { id: 'chromatic-10', name: 'Exercise 10: Triplets and String Skipping', file: '/GP Files/Scale Exercises/BLOG TABS/Chromatic Exercise 9.gp' }
          ]
        }
      ];
    }

    if (pageDetection.isBeginnerRiffsPage) {
      return [
        {
          group: 'Beginner Guitar Riffs',
          items: [
            { id: 'smoke-on-the-water', name: 'Smoke On The Water - Deep Purple', file: '/GP Files/Scale Exercises/BLOG TABS/Smoke On The Water Riff.gp', tempo: 120 },
            { id: 'tnt-acdc', name: 'TNT - AC/DC', file: '/GP Files/Scale Exercises/BLOG TABS/TNT ACDC Riff.gp', tempo: 130 },
            { id: 'otherside-rhcp', name: 'Otherside - Red Hot Chili Peppers', file: '/GP Files/Scale Exercises/BLOG TABS/Otherside RHCP.gp', tempo: 95 },
            { id: 'come-as-you-are', name: 'Come As You Are - Nirvana', file: '/GP Files/Scale Exercises/BLOG TABS/Come As You Are .gp', tempo: 120 },
            { id: 'jeremy-pearl-jam', name: 'Jeremy - Pearl Jam', file: '/GP Files/Scale Exercises/BLOG TABS/Pearl Jam Jeremy.gp', tempo: 140 },
            { id: 'man-in-the-box', name: 'Man In The Box - Alice In Chains', file: '/GP Files/Scale Exercises/BLOG TABS/AIC MAN IN THE BOX.gp', tempo: 110 },
            { id: 'louie-louie', name: 'Louie Louie - The Kingsmen', file: '/GP Files/Scale Exercises/BLOG TABS/Louie Louie.gp', tempo: 130 },
            { id: 'walk-this-way', name: 'Walk This Way - Aerosmith', file: '/GP Files/Scale Exercises/BLOG TABS/Walk This Way.gp', tempo: 110 },
            { id: 'iron-man-main', name: 'Iron Man - Black Sabbath', file: '/GP Files/Scale Exercises/BLOG TABS/Iron Man Main Riff.gp', tempo: 140 },
            { id: 'enter-sandman', name: 'Enter Sandman - Metallica', file: '/GP Files/Scale Exercises/BLOG TABS/Enter Sandman .gp', tempo: 135 }
          ]
        }
      ];
    }

    if (pageDetection.isBBKingBoxPage) {
      return [
        {
          group: 'BB King Box Exercises',
          items: [
            { id: 'bb-king-box-key-a-1', name: 'BB King Box Exercise 1 (Key of A)', file: '/GP Files/Scale Exercises/BLOG TABS/BB King Box Exercise (Key of A) 2.gp', tempo: 80 },
            { id: 'bb-king-box-key-a-2', name: 'BB King Box Exercise 2 (Key of A)', file: '/GP Files/Scale Exercises/BLOG TABS/BB King Box Exercise (Key of A).gp', tempo: 80 },
            { id: 'bb-king-box-key-e', name: 'BB King Box Exercise (Key of E)', file: '/GP Files/Scale Exercises/BLOG TABS/BB King Box Exercise (Key of E).gp', tempo: 80 },
            { id: 'bb-king-box-key-g', name: 'BB King Box Exercise (Key of G)', file: '/GP Files/Scale Exercises/BLOG TABS/BB King Box Exercise (Key of G).gp', tempo: 80 }
          ]
        }
      ];
    }

            if (pageDetection.isStringBendingPage) {
          return [
            {
              group: 'Basic Bends',
              items: [
                { id: 'full-bend-slow', name: '1. Full Bend Slow (The Higher Three Strings)', file: '/GP Files/Scale Exercises/BLOG TABS/STRING BENDING/STRING BENDING EXERCISE 1 .gp?v=10', tempo: 120 },
                { id: 'full-bend-fast', name: '2. Full Bend Fast (The Higher Three Strings)', file: '/GP Files/Scale Exercises/BLOG TABS/STRING BENDING/STRING BENDING EXERCISE 2.gp?v=10', tempo: 120 },
                { id: 'full-bend-downward', name: '3. Full Bend Downward (The Lower Three Strings)', file: '/GP Files/Scale Exercises/BLOG TABS/STRING BENDING/STRING BENDING EXERCISE 6.gp?v=10', tempo: 120 }
              ]
            },
            {
              group: 'Adding Vibrato',
              items: [
                { id: 'full-bend-vibrato', name: '4. Full Bend Vibrato (The Higher Three Strings)', file: '/GP Files/Scale Exercises/BLOG TABS/STRING BENDING/STRING BENDING EXERCISE 3.gp?v=10', tempo: 120 },
                { id: 'half-bend-vibrato', name: '5. Half Bend Vibrato (The Higher Three Strings)', file: '/GP Files/Scale Exercises/BLOG TABS/STRING BENDING/STRING BENDING EXERCISE 4.gp?v=10', tempo: 120 },
                { id: 'one-half-bend-vibrato', name: '6. 1½ Bend Vibrato (The Higher Three Strings)', file: '/GP Files/Scale Exercises/BLOG TABS/STRING BENDING/STRING BENDING EXERCISE 5.gp?v=10', tempo: 120 }
              ]
            },
            {
              group: 'Release Techniques',
              items: [
                { id: 'full-bend-and-release', name: '7. Full Bend and Release (The Higher Three Strings)', file: '/GP Files/Scale Exercises/BLOG TABS/STRING BENDING/STRING BENDING EXERCISE 7.gp?v=10', tempo: 120 },
                { id: 'full-prebend-and-release', name: '8. Full Prebend and Release (The Higher Three Strings)', file: '/GP Files/Scale Exercises/BLOG TABS/STRING BENDING/STRING BENDING EXERCISE 8.gp?v=10', tempo: 120 },
                { id: 'full-prebend', name: '9. Full Prebend (The Higher Three Strings)', file: '/GP Files/Scale Exercises/BLOG TABS/STRING BENDING/STRING BENDING EXERCISE 9.gp?v=10', tempo: 120 },
                { id: 'full-bends-with-added-note', name: '10. Full Bends with Added Note on Higher String', file: '/GP Files/Scale Exercises/BLOG TABS/STRING BENDING/STRING BENDING EXERCISE 10.gp?v=4', tempo: 120 },
                { id: 'quarter-bend-and-release', name: '11. ¼ Bend and Release with Vibrato', file: '/GP Files/Scale Exercises/BLOG TABS/STRING BENDING/STRING BENDING EXERCISE 16.gp?v=4', tempo: 120 }
              ]
            },
            {
              group: 'Playing Two Strings and Bending One',
              items: [
                { id: 'unison-bends', name: '12. Unison Bends', file: '/GP Files/Scale Exercises/BLOG TABS/STRING BENDING/STRING BENDING EXERCISE 11.gp?v=4', tempo: 120 },
                { id: 'double-stop-bends', name: '13. Double Stop Bends', file: '/GP Files/Scale Exercises/BLOG TABS/STRING BENDING/STRING BENDING EXERCISE 12.gp?v=4', tempo: 120 }
              ]
            },
            {
              group: 'Bending Two Strings at Once',
              items: [
                { id: 'full-bend-two-strings-vibrato', name: '14. Full Bend on Two Strings with Vibrato', file: '/GP Files/Scale Exercises/BLOG TABS/STRING BENDING/STRING BENDING EXERCISE 15.gp?v=4', tempo: 120 }
              ]
            },
            {
              group: 'Bending with Other Fingers',
              items: [
                { id: 'half-bend-vibrato-2nd-finger', name: '15. Half Bend and Vibrato Using 2nd Finger', file: '/GP Files/Scale Exercises/BLOG TABS/STRING BENDING/STRING BENDING EXERCISE 13.gp?v=4', tempo: 120 },
                { id: 'full-bend-release-1st-finger', name: '16. Full Bend and Release Using 1st Finger (Downward Bend)', file: '/GP Files/Scale Exercises/BLOG TABS/STRING BENDING/STRING BENDING EXERCISE 14.gp?v=4', tempo: 120 }
              ]
            }
          ];
        }

    if (pageDetection.isDifferentRhythmsPage) {
      return rhythmExercises;
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
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(100); // Playback speed as percentage (100 = normal speed)
  const [version, setVersion] = useState(Date.now()); // Force reload
  const [isMetronomeOn, setIsMetronomeOn] = useState(false); // Metronome state
  const [minWidth, setMinWidth] = useState(800);
  const [zoom, setZoom] = useState(1.2);
  // User controls (layout/notation toggles removed — fixed layout + standard notation enabled)
  const [selectedTrack, setSelectedTrack] = useState(1); // Default to 1 (rhythm) since that's what's showing
  const [availableTracks, setAvailableTracks] = useState<number>(1);
  const [mutedTracks, setMutedTracks] = useState<Set<number>>(new Set());
  const [soloedTracks, setSoloedTracks] = useState<Set<number>>(new Set());

  useEffect(() => {
    const checkScreen = () => {
      const w = window.innerWidth;
      if (w < 390) {
        // Very small phones
        setMinWidth(0);
        setZoom(0.55);
      } else if (w < 768) {
        // Mobile phones
        setMinWidth(0);
        setZoom(0.6);
      } else if (w < 1024) {
        // Small laptops/tablets
        setMinWidth(800);
        setZoom(0.95);
      } else {
        // Desktop
        setMinWidth(800);
        setZoom(1.0);
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
      
      /* (Reverted) Do not constrain AlphaTab width here */

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

      /* Hide AlphaTab title/metadata on mobile */
      @media (max-width: 767px) {
        .alphatab-cdn-container svg .at-title,
        .alphatab-cdn-container svg .at-subtitle,
        .alphatab-cdn-container svg .at-artist,
        .alphatab-cdn-container svg .at-album,
        .alphatab-cdn-container svg .at-header,
        .alphatab-cdn-container svg .at-score-info,
        .alphatab-cdn-container svg [class*="title"],
        .alphatab-cdn-container svg [class*="subtitle"],
        .alphatab-cdn-container svg [class*="header"],
        .alphatab-cdn-container svg [class*="score-info"] {
          display: none !important;
        }
      }

      /* Reduce common AlphaTab text sizes for better fit */
      .alphatab-cdn-container svg .at-bar-number,
      .alphatab-cdn-container svg .at-chord-name,
      .alphatab-cdn-container svg .at-lyrics,
      .alphatab-cdn-container svg .at-fingering,
      .alphatab-cdn-container svg .at-technique-text {
        font-size: 9px !important; /* desktop baseline (smaller) */
      }

      @media (max-width: 1024px) {
        .alphatab-cdn-container svg .at-bar-number,
        .alphatab-cdn-container svg .at-chord-name,
        .alphatab-cdn-container svg .at-lyrics,
        .alphatab-cdn-container svg .at-fingering,
        .alphatab-cdn-container svg .at-technique-text {
          font-size: 8px !important;
        }
      }

      @media (max-width: 767px) {
        /* Mobile: fallback, reduce all text nodes further */
        .alphatab-cdn-container svg text {
          font-size: 6px !important;
        }
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
            scrollSpeed: 300, // Scroll speed in pixels per second

          },
                  // For blues licks, always use track 0 (lead guitar)
        tracks: pathname?.includes('/blues-licks-exercises') ? [0] : undefined,
          display: {
            scale: zoom, // Use the responsive zoom value
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
    // Search across ALL groups, not just the first one
    for (const group of currentExercises) {
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


  // Update scale on zoom change
  useEffect(() => {
    const api = alphaTabRef.current;
    if (!api) return;
    try {
      if (api.settings?.updateSettings) {
        api.settings.updateSettings({ display: { scale: zoom } });
        api.render?.();
      }
    } catch (e) {
      console.warn('AlphaTab scale update failed:', e);
    }
  }, [zoom]);



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
      console.log('🎵 TRACK DEBUG - Score object:', score);
      console.log('🎵 TRACK DEBUG - score.tracks:', score.tracks);
      console.log('🎵 TRACK DEBUG - score.tracks type:', typeof score.tracks);
      console.log('🎵 TRACK DEBUG - score.tracks length:', score.tracks?.length);
      
      
      
            // Log details about tracks and their notation
      if (score.tracks && score.tracks.length > 0) {
        console.log('Found', score.tracks.length, 'tracks');
        
        // Update available tracks count
        setAvailableTracks(score.tracks.length);
        console.log('🎵 Setting available tracks:', score.tracks.length);
        
        // Clear any previous track settings when loading new score
        setMutedTracks(new Set());
        setSoloedTracks(new Set());
        
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
      
      // Try multiple ways to get the tempo - PRIORITY: Exercise tempo override first!
      let initialTempo = null;
      
      // Method 0 (HIGHEST PRIORITY): Check if the exercise has a custom tempo override
      // Find exercise by looking through all current exercises for tempo override
      let exerciseWithTempo = null;
      if (currentExercises.length > 0 && currentExercises[0].items.length > 0) {
        // Look for any exercise with tempo property (for blues licks, all should have tempo: 80)
        exerciseWithTempo = currentExercises[0].items.find(item => 'tempo' in item && (item as any).tempo);
        if (exerciseWithTempo) {
          initialTempo = (exerciseWithTempo as any).tempo;
          console.log('🎵 Using exercise tempo override:', initialTempo, 'from exercise:', exerciseWithTempo.name);
        }
      }
      // Method 1: Check masterVolume.tempo
      else if (score.masterVolume?.tempo) {
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
        // Set default tempo: 40 BPM for arpeggio page, 60 BPM for finger exercises, 20 BPM for pentatonic exercises
        const isArpeggioPage = pathname?.includes('/guitar-arpeggios-exercises');
        const isFingerExercisesPage = pathname?.includes('/picking-finger-exercises');
        const defaultTempo = isArpeggioPage ? 40 : isFingerExercisesPage ? 60 : 20;
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
      // When pausing, ensure the current bar stays in view
      if (e.state === 0 && api.scrollToCursor) {
        try {
          api.scrollToCursor();
        } catch (scrollError) {
          console.warn('Scroll to cursor on pause failed:', scrollError);
        }
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

  const loadExercise = async (filePath: string, exerciseTempo?: number) => {
    try {
      setStatus('Loading exercise...');
      console.log('Loading exercise:', filePath);
      
      // Add cache-busting parameter to ensure we get the latest file
      const cacheBuster = Date.now();
      const encodedPath = encodeURI(filePath).replace(/#/g, '%23');
      let urlWithCacheBuster = `${encodedPath}?t=${cacheBuster}`;
      
      // First attempt (no-store)
      let response = await fetch(new Request(urlWithCacheBuster, { cache: 'no-store' }));
      if (!response.ok) {
        console.warn('First fetch attempt failed:', response.status, response.statusText);
        // Fallback 1: try encoded path by segments
        const encodedBySegment = filePath
          .split('/')
          .map((seg) => (seg ? encodeURIComponent(seg) : ''))
          .join('/')
          .replace(/%2F/g, '/');
        urlWithCacheBuster = `${encodedBySegment}?t=${cacheBuster}`;
        response = await fetch(new Request(urlWithCacheBuster, { cache: 'no-store' }));
        if (!response.ok) {
          // Fallback 2: try without cache buster
          response = await fetch(new Request(encodedBySegment, { cache: 'no-store' }));
        }
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status} - File not found: ${filePath}`);
        }
      }
      
      const arrayBuffer = await response.arrayBuffer();
      console.log('File loaded successfully, size:', arrayBuffer.byteLength);
      
      if (alphaTabRef.current) {
        console.log('Loading ArrayBuffer into AlphaTab...');
        alphaTabRef.current.load(arrayBuffer);
        
        // Set the tempo if provided (for beginner riffs)
        if (exerciseTempo) {
          console.log('🎵 Setting exercise tempo to:', exerciseTempo);
          setTempo(exerciseTempo);
          setOriginalTempo(exerciseTempo);
        }
        
        // Reset playback speed to 100% for new exercises
        setPlaybackSpeed(100);
        if (alphaTabRef.current.playbackSpeed !== undefined) {
          alphaTabRef.current.playbackSpeed = 1;
        }
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
      console.log('🔄 Found exercise:', exercise);
    } else {
      // Find in pentatonic exercises
      exercise = sixteenthNotes.find(ex => ex.id === exerciseId) ||
                 sixteenthTriplets.find(ex => ex.id === exerciseId);
    }
    
    if (exercise) {
      console.log('🔄 Loading exercise file:', exercise.file);
      loadExercise(exercise.file, (exercise as any).tempo);
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

  // Spacebar to toggle play/pause (outside of text inputs)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const isSpace = e.code === 'Space' || e.key === ' ' || e.key === 'Spacebar';
      if (!isSpace) return;
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName?.toLowerCase();
      const isTyping = !!target && (target.isContentEditable || tag === 'input' || tag === 'textarea' || tag === 'select');
      if (isTyping) return; // don't hijack typing
      e.preventDefault(); // avoid page scrolling
      if (isReady) {
        // reuse the same logic as the Play button
        handlePlay();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isReady, handlePlay]);

  const handleStop = () => {
    if (alphaTabRef.current && isReady) {
      console.log('⏹️ Stopping audio...');
      alphaTabRef.current.stop();
    }
  };



  const handleMetronomeToggle = () => {
    setIsMetronomeOn(!isMetronomeOn);
    if (alphaTabRef.current) {
      alphaTabRef.current.metronomeVolume = !isMetronomeOn ? 0.3 : 0;
    }
    console.log('🥁 Metronome toggled:', !isMetronomeOn);
  };

  const handleSpeedChange = (newSpeed: number) => {
    setPlaybackSpeed(newSpeed);
    if (alphaTabRef.current && alphaTabRef.current.playbackSpeed !== undefined) {
      // Convert percentage to decimal (e.g., 100% = 1.0, 50% = 0.5)
      alphaTabRef.current.playbackSpeed = newSpeed / 100;
    }
  };

  const adjustSpeed = (change: number) => {
    const newSpeed = Math.max(25, Math.min(200, playbackSpeed + change));
    setPlaybackSpeed(newSpeed);
    if (alphaTabRef.current && alphaTabRef.current.playbackSpeed !== undefined) {
      alphaTabRef.current.playbackSpeed = newSpeed / 100;
    }
  };

  const handleTempoChange = (newTempo: number) => {
    setTempo(newTempo);
    if (alphaTabRef.current && alphaTabRef.current.playbackSpeed !== undefined && originalTempo) {
      // Calculate playback speed relative to the original file tempo
      alphaTabRef.current.playbackSpeed = newTempo / originalTempo;
    }
  };

  const handleTrackMute = (trackIndex: number) => {
    const newMutedTracks = new Set(mutedTracks);
    
    if (newMutedTracks.has(trackIndex)) {
      newMutedTracks.delete(trackIndex);
    } else {
      newMutedTracks.add(trackIndex);
      // If track is soloed and we're muting it, remove from solo
      if (soloedTracks.has(trackIndex)) {
        const newSoloedTracks = new Set(soloedTracks);
        newSoloedTracks.delete(trackIndex);
        setSoloedTracks(newSoloedTracks);
      }
    }
    
    setMutedTracks(newMutedTracks);
    applyTrackSettings(newMutedTracks, soloedTracks.has(trackIndex) ? new Set(Array.from(soloedTracks).filter(t => t !== trackIndex)) : soloedTracks);
  };

  const handleTrackSolo = (trackIndex: number) => {
    const newSoloedTracks = new Set(soloedTracks);
    
    if (newSoloedTracks.has(trackIndex)) {
      newSoloedTracks.delete(trackIndex);
    } else {
      newSoloedTracks.add(trackIndex);
      // If track is muted and we're soloing it, remove from mute
      if (mutedTracks.has(trackIndex)) {
        const newMutedTracks = new Set(mutedTracks);
        newMutedTracks.delete(trackIndex);
        setMutedTracks(newMutedTracks);
      }
    }
    
    setSoloedTracks(newSoloedTracks);
    applyTrackSettings(mutedTracks.has(trackIndex) ? new Set(Array.from(mutedTracks).filter(t => t !== trackIndex)) : mutedTracks, newSoloedTracks);
  };

  const applyTrackSettings = (muted: Set<number>, soloed: Set<number>) => {
    if (alphaTabRef.current && alphaTabRef.current.score) {
      console.log('🎵 Applying track settings - Muted:', Array.from(muted), 'Soloed:', Array.from(soloed));
      
      // Use AlphaTab's built-in track control API methods
      alphaTabRef.current.score.tracks.forEach((track: any, index: number) => {
        const shouldBeMuted = muted.has(index) || (soloed.size > 0 && !soloed.has(index));
        const shouldBeSoloed = soloed.has(index);
        
        try {
          // Use the official AlphaTab API methods
          if (alphaTabRef.current.changeTrackMute) {
            alphaTabRef.current.changeTrackMute([index], shouldBeMuted);
          }
          
          if (alphaTabRef.current.changeTrackSolo) {
            alphaTabRef.current.changeTrackSolo([index], shouldBeSoloed);
          }
          
          console.log(`🎵 Track ${index} (${track.name || 'Unknown'}) - Muted: ${shouldBeMuted}, Soloed: ${shouldBeSoloed}`);
        } catch (error) {
          console.log(`🎵 Error setting track ${index}:`, error);
        }
      });
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
          <label htmlFor="exercise-select" className="block text-sm font-medium text-gray-700 mb-2">
            {pathname?.includes('/blues-licks-exercises/') ? 'Select Blues Lick Exercise' : 
             pathname?.includes('/guitar-arpeggios-exercises/') ? 'Select Arpeggio Exercise' :
             pathname?.includes('/picking-finger-exercises/') ? 'Select Finger Exercise' :
             pathname?.includes('/easiest-beginner-guitar-riffs/') ? 'Select Beginner Riff' :
             pathname?.includes('/complete-guide-guitar-string-bending/') ? 'Select String Bending Exercise' :
             'Select Exercise'}
          </label>
          <select
            id="exercise-select"
            value={selectedExercise}
            onChange={(e) => handleExerciseChange(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            {currentExercises.map(group => (
              <optgroup key={group.group} label={group.group}>
                {group.items.map(ex => (
                  <option key={ex.id} value={ex.id}>{ex.name}</option>
                ))}
              </optgroup>
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

      {/* Repeat Information for specific blog posts */}
      {pageDetection.isBluesLicksPage && (
        <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
          <p className="text-sm text-amber-800">
            <strong>Note:</strong> Each progression repeats 4 times in the tab.
          </p>
        </div>
      )}
      
      {pageDetection.isFingerExercisesPage && (
        <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
          <p className="text-sm text-amber-800">
            <strong>Note:</strong> Each exercise repeats twice in the tab.
          </p>
        </div>
      )}
      
      {pathname?.includes('/pentatonic-scale-exercises') && (
        <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
          <p className="text-sm text-amber-800">
            <strong>Note:</strong> Each exercise repeats twice in the tab.
          </p>
        </div>
      )}

      {/* Speed/Tempo Control - Different for beginner riffs vs other exercises */}
      {pageDetection.isBeginnerRiffsPage ? (
        <div className="mb-4">
          <label htmlFor="speed-control" className="block text-sm font-medium text-gray-700 mb-2">
            Speed: {playbackSpeed}%
          </label>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => adjustSpeed(-10)}
              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-md font-medium transition-colors"
            >
              -10%
            </button>
            <input
              type="range"
              id="speed-control"
              min="25"
              max="100"
              value={playbackSpeed}
              onChange={(e) => handleSpeedChange(Number(e.target.value))}
              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      ) : (
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
      )}

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
      <div className="mb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        {/* Left: compact transport buttons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handlePlay}
            disabled={!isReady}
            className={`w-16 h-8 flex items-center justify-center px-2.5 py-1 rounded-md font-semibold transition-colors text-xs
              ${isReady
                ? isPlaying
                  ? 'bg-amber-500 hover:bg-amber-600 text-white'
                  : 'bg-amber-800 hover:bg-amber-900 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
              `}
          >
            {isPlaying ? (<MdPause size={16} />) : (<MdPlayArrow size={16} />)}
          </button>
          <button
            onClick={handleStop}
            disabled={!isReady}
            className={`w-16 h-8 flex items-center justify-center px-2.5 py-1 rounded-md font-semibold transition-colors text-xs
              ${isReady
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
              `}
          >
            <MdStop size={16} />
          </button>
          <button
            onClick={handleMetronomeToggle}
            disabled={!isReady}
            className={`h-8 flex items-center justify-center px-2.5 py-1 rounded-md font-semibold transition-colors text-xs
              ${isReady
                ? isMetronomeOn
                  ? 'bg-amber-600 hover:bg-amber-700 text-white'
                  : 'bg-amber-100 hover:bg-amber-200 text-amber-800 border border-amber-300'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
            `}
          >
            <GiMetronome size={14} />
            <span className="ml-1">Metronome</span>
          </button>
        </div>

        {/* Right: compact track controls (layout/notation toggles removed) */}

        {/* Right: compact track controls */}
        {availableTracks > 0 && (
          <div className="flex items-center flex-wrap gap-1.5">
            {Array.from({ length: availableTracks }, (_, i) => {
              const getTrackName = (trackIndex: number) => {
                if (pageDetection.isBluesLicksPage || pageDetection.isBBKingBoxPage) {
                  return trackIndex === 0 ? 'Lead' : 'Chords';
                }
                if (pageDetection.isDifferentRhythmsPage) {
                  return trackIndex === 0 ? 'Guitar' : 'Drums';
                }
                return 'Guitar';
              };
              const trackName = getTrackName(i);
              return (
                <div key={i} className="flex items-center space-x-1 bg-gray-50 rounded-md px-1 py-0.5">
                  <span className="text-[11px] font-medium text-gray-600 min-w-[3rem]">{trackName}</span>
                  <button
                    onClick={() => handleTrackMute(i)}
                    disabled={!isReady}
                    className={`px-1.5 py-0.5 text-[11px] font-medium rounded transition-colors
                      ${!isReady 
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : mutedTracks.has(i)
                          ? 'bg-red-500 hover:bg-red-600 text-white'
                          : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}
                    `}
                  >
                    {mutedTracks.has(i) ? 'Unmute' : 'Mute'}
                  </button>
                  {availableTracks > 1 && (
                    <button
                      onClick={() => handleTrackSolo(i)}
                      disabled={!isReady}
                      className={`px-1.5 py-0.5 text-[11px] font-medium rounded transition-colors
                        ${!isReady 
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : soloedTracks.has(i)
                            ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                            : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}
                      `}
                    >
                      {soloedTracks.has(i) ? 'Unsolo' : 'Solo'}
                    </button>
                  )}
                </div>
              );
            })}
            {(mutedTracks.size > 0 || soloedTracks.size > 0) && (
              <button
                onClick={() => {
                  setMutedTracks(new Set());
                  setSoloedTracks(new Set());
                  applyTrackSettings(new Set(), new Set());
                }}
                disabled={!isReady}
                className="px-1.5 py-0.5 text-[11px] font-medium rounded bg-blue-100 hover:bg-blue-200 text-blue-700 transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        )}
      </div>


      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* AlphaTab Rendering Container */}
      {/* Mobile rotation tip - appears before tab player */}
      <div className="mb-4 p-3 bg-amber-50 border-l-4 border-amber-400 rounded text-amber-900 text-sm">
        <strong>Tip:</strong> Rotate for better viewing on mobile device.
      </div>
      
      <div ref={containerRef} className="w-full overflow-x-auto mb-4" style={{ 
        maxHeight: '600px', 
        overflowY: 'auto' 
      }}>
        <div id={containerId} className="alphatab-cdn-container border border-gray-200 rounded-lg" style={{ minWidth }}></div>
      </div>
      {/* How to Read the Tab Section */}
      {showTabInstructions && (
        <div className="bg-amber-50 border-l-4 border-amber-400 rounded p-4 mb-6 max-w-2xl mx-auto">
          <h3 className="text-lg font-semibold text-amber-800 mb-2">How to Read This Tab</h3>
          <ul className="list-disc pl-5 text-amber-900 space-y-1">
            <li><span className="font-bold text-amber-700">Standard Notation:</span> The top staff shows traditional music notation for rhythm and pitch.</li>
            <li><span className="font-bold text-amber-700">Tablature (TAB):</span> The lower staff shows fret numbers for each string—play the indicated fret on the matching string.</li>
            {!pageDetection.isStringBendingPage && !pageDetection.isBBKingBoxPage && !pageDetection.isBluesLicksPage && !pageDetection.isDifferentRhythmsPage && (
              <li><span className="font-bold text-amber-700">Picking Symbols:</span> <span className="font-mono">⊓</span> = Downstroke, <span className="font-mono">∨</span> = Upstroke.</li>
            )}
            {pageDetection.isBeginnerRiffsPage && (
              <li><span className="font-bold text-amber-700">Brackets ( ):</span> Numbers in brackets are notes held from the previous bar.</li>
            )}
            {!pageDetection.isStringBendingPage && !pageDetection.isBBKingBoxPage && !pageDetection.isBluesLicksPage && !pageDetection.isDifferentRhythmsPage && showSlursAndSlides && (
              <li><span className="font-bold text-amber-700">Slurs:</span> Curved lines between notes indicate hammer-ons or pull-offs (pick the first note, then use your left hand for the next note without picking).</li>
            )}
            {!pageDetection.isStringBendingPage && !pageDetection.isBBKingBoxPage && !pageDetection.isBluesLicksPage && !pageDetection.isDifferentRhythmsPage && showSlides && (
              <li><span className="font-bold text-amber-700">Slides:</span> A diagonal line or "sl." between notes means slide your finger from the first note to the next without lifting.</li>
            )}
            {(pageDetection.isStringBendingPage || pageDetection.isBBKingBoxPage || pageDetection.isBluesLicksPage) && (
              <>
                <li><span className="font-bold text-amber-700">Bend Arrows:</span> Upward arrow (↗) shows bend, downward arrow (↘) shows release.</li>
                <li><span className="font-bold text-amber-700">Bend Amount:</span> Numbers like 1/4, 1/2, Full, or 1 1/2 show how much to bend the string.</li>
                <li><span className="font-bold text-amber-700">Vibrato:</span> Squiggly lines indicate vibrato on the note.</li>
              </>
            )}
            {!pageDetection.isDifferentRhythmsPage && (
              <li><span className="font-bold text-amber-700">Fingering:</span> Numbers above the top staff suggest which left-hand finger to use (1 = index, 2 = middle, 3 = ring, 4 = pinky).</li>
            )}
            {pageDetection.isDifferentRhythmsPage && (
              <li><span className="font-bold text-amber-700">Muted Notes (X):</span> The "X" symbol indicates a muted string. Lightly touch the string with your fretting hand and pick to create a percussive sound.</li>
            )}
          </ul>

        </div>
      )}
    </div>
  );
}