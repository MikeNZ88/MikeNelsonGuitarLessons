'use client';

import Link from 'next/link';
import { Music, Search, BookOpen, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Blog() {
  const [selectedTopicCategory, setSelectedTopicCategory] = useState('All Posts');
  const [selectedSkillLevel, setSelectedSkillLevel] = useState('All Levels');
  const [searchQuery, setSearchQuery] = useState('');
  const [isQuickRefOpen, setIsQuickRefOpen] = useState(false);
  const [quickRefSearch, setQuickRefSearch] = useState('');
  
  // Quick Reference Topic Index
  const topicIndex = [
    // A
    {
      topic: 'A Chord (Open)',
      description: 'Open A major chord',
      link: '/blog/your-first-guitar-chords#a-chord',
      category: 'Chords'
    },
    {
      topic: 'A Chord (Barre - E String Root)',
      description: 'A major barre chord (E string, fret 5)',
      link: '/blog/barre-chord-library?root=e-string&type=Major&fret=5',
      category: 'Chords'
    },
    {
      topic: 'A Chord (Barre - A String Root)',
      description: 'A major barre chord (A string, fret 12)',
      link: '/blog/barre-chord-library?root=a-string&type=Major&fret=12',
      category: 'Chords'
    },
    {
      topic: 'Am Chord (Open)',
      description: 'Open A minor chord',
      link: '/blog/your-first-guitar-chords#am-chord',
      category: 'Chords'
    },
    {
      topic: 'Am Chord (Barre - E String Root)',
      description: 'A minor barre chord (E string, fret 5)',
      link: '/blog/barre-chord-library?root=e-string&type=Minor&fret=5',
      category: 'Chords'
    },
    {
      topic: 'Am Chord (Barre - A String Root)',
      description: 'A minor barre chord (A string, fret 12)',
      link: '/blog/barre-chord-library?root=a-string&type=Minor&fret=12',
      category: 'Chords'
    },
    {
      topic: 'Alternate Picking',
      description: 'Picking technique fundamentals',
      link: '/blog/guitar-picking-technique-guide#alternate-picking',
      category: 'Technique'
        },
    {
      topic: 'A Major Pentatonic',
      description: 'A major pentatonic scale (5 shapes)',
      link: '/blog/beginners-guide-pentatonic-scales/?key=F%23&scroll=shapes',
      category: 'Scales and Fretboard'
    },
    {
      topic: 'A Minor Pentatonic',
      description: 'A minor pentatonic scale (5 shapes)',
      link: '/blog/beginners-guide-pentatonic-scales/?key=A&scroll=shapes',
      category: 'Scales and Fretboard'
    },
    {
      topic: 'Arpeggios',
      description: 'Chord notes played individually',
      link: '/blog/major-scale-guitar-guide#arpeggios',
      category: 'Scales and Fretboard'
    },
    {
      topic: 'Arpeggio Exercises',
      description: 'Interactive tab player with three and two octave arpeggios',
      link: '/blog/guitar-arpeggios-exercises',
      category: 'Technique'
    },
    {
      topic: 'Three Octave Arpeggios',
      description: 'Major 7, Dominant 7, Minor 7, and extended arpeggios',
      link: '/blog/guitar-arpeggios-exercises',
      category: 'Technique'
    },
    {
      topic: 'Two Octave Arpeggios',
      description: 'Advanced arpeggios with sweep picking and tapping',
      link: '/blog/guitar-arpeggios-exercises',
      category: 'Technique'
    },
    {
      topic: 'C Major Scale Arpeggios',
      description: 'Complete arpeggio sequence in C major',
      link: '/blog/guitar-arpeggios-exercises',
      category: 'Scales and Fretboard'
    },

    
    // B
    {
      topic: 'B Major Pentatonic',
      description: 'B major pentatonic scale (5 shapes)',
      link: '/blog/beginners-guide-pentatonic-scales/?key=G%23&scroll=shapes',
      category: 'Scales and Fretboard'
    },
    {
      topic: 'B Minor Pentatonic',
      description: 'B minor pentatonic scale (5 shapes)',
      link: '/blog/beginners-guide-pentatonic-scales/?key=B&scroll=shapes',
      category: 'Scales and Fretboard'
    },
    {
      topic: 'Barre Chords',
      description: 'Moveable chord shapes',
      link: '/blog/moveable-guitar-chord-shapes#barre-chords',
      category: 'Chords'
    },
    {
      topic: 'Barre Chords - Major (E String)',
      description: 'Major barre chords with root on low E string',
      link: '/blog/barre-chord-library?root=e-string&type=Major',
      category: 'Chords'
    },
    {
      topic: 'Barre Chords - Major (A String)',
      description: 'Major barre chords with root on A string',
      link: '/blog/barre-chord-library?root=a-string&type=Major',
      category: 'Chords'
    },
    {
      topic: 'Barre Chords - Minor (E String)',
      description: 'Minor barre chords with root on low E string',
      link: '/blog/barre-chord-library?root=e-string&type=Minor',
      category: 'Chords'
    },
    {
      topic: 'Barre Chords - Minor (A String)',
      description: 'Minor barre chords with root on A string',
      link: '/blog/barre-chord-library?root=a-string&type=Minor',
      category: 'Chords'
    },
    {
      topic: 'Barre Chords - Dominant 7 (E String)',
      description: 'Dominant 7 barre chords with root on low E string',
      link: '/blog/barre-chord-library?root=e-string&type=Dominant%207',
      category: 'Chords'
    },
    {
      topic: 'Barre Chords - Dominant 7 (A String)',
      description: 'Dominant 7 barre chords with root on A string',
      link: '/blog/barre-chord-library?root=a-string&type=Dominant%207',
      category: 'Chords'
    },
    {
      topic: 'Barre Chords - m7 (E String)',
      description: 'Minor 7 barre chords with root on low E string',
      link: '/blog/barre-chord-library?root=e-string&type=m7',
      category: 'Chords'
    },
    {
      topic: 'Barre Chords - m7 (A String)',
      description: 'Minor 7 barre chords with root on A string',
      link: '/blog/barre-chord-library?root=a-string&type=m7',
      category: 'Chords'
    },
    {
      topic: 'Barre Chords - Maj7 (E String)',
      description: 'Major 7 barre chords with root on low E string',
      link: '/blog/barre-chord-library?root=e-string&type=Maj7',
      category: 'Chords'
    },
    {
      topic: 'Barre Chords - Maj7 (A String)',
      description: 'Major 7 barre chords with root on A string',
      link: '/blog/barre-chord-library?root=a-string&type=Maj7',
      category: 'Chords'
    },
    {
      topic: 'Barre Chords - sus4 (E String)',
      description: 'Sus4 barre chords with root on low E string',
      link: '/blog/barre-chord-library?root=e-string&type=sus4',
      category: 'Chords'
    },
    {
      topic: 'Barre Chords - sus4 (A String)',
      description: 'Sus4 barre chords with root on A string',
      link: '/blog/barre-chord-library?root=a-string&type=sus4',
      category: 'Chords'
    },
    {
      topic: 'Barre Chords - 7sus4 (E String)',
      description: '7sus4 barre chords with root on low E string',
      link: '/blog/barre-chord-library?root=e-string&type=7sus4',
      category: 'Chords'
    },
    {
      topic: 'Barre Chords - 7sus4 (A String)',
      description: '7sus4 barre chords with root on A string',
      link: '/blog/barre-chord-library?root=a-string&type=7sus4',
      category: 'Chords'
    },
    {
      topic: 'Barre Chord Library',
      description: 'Interactive barre chord tool with E and A shapes',
      link: '/blog/barre-chord-library',
      category: 'Tools'
    },
    {
      topic: 'Barre Chord Theory',
      description: 'Understanding how barre chords work and relate to open chords',
      link: '/blog/barre-chord-library#how-barre-chords-work',
      category: 'Theory'
    },
    {
      topic: 'B Chord (Barre - E String Root)',
      description: 'B major barre chord (E string, fret 7)',
      link: '/blog/barre-chord-library?root=e-string&type=Major&fret=7',
      category: 'Chords'
    },
    {
      topic: 'B Chord (Barre - A String Root)',
      description: 'B major barre chord (A string, fret 2)',
      link: '/blog/barre-chord-library?root=a-string&type=Major&fret=2',
      category: 'Chords'
    },
    {
      topic: 'Bm Chord (Barre - E String Root)',
      description: 'B minor barre chord (E string, fret 7)',
      link: '/blog/barre-chord-library?root=e-string&type=Minor&fret=7',
      category: 'Chords'
    },
    {
      topic: 'Bm Chord (Barre - A String Root)',
      description: 'B minor barre chord (A string, fret 2)',
      link: '/blog/barre-chord-library?root=a-string&type=Minor&fret=2',
      category: 'Chords'
    },
    {
      topic: 'Beginner Chords',
      description: 'Your first 8 essential chords',
      link: '/blog/your-first-guitar-chords',
      category: 'Chords'
    },
    {
      topic: 'Buying Your First Guitar',
      description: 'Complete beginner guide to choosing a guitar',
      link: '/blog/complete-beginners-guide-guitar#buying-your-first-guitar',
      category: 'Getting Started'
    },
    {
      topic: 'Buying Your First Electric Guitar',
      description: 'Electric guitar guide for NZ',
      link: '/blog/electric-guitar-beginner-guide-nz',
      category: 'Getting Started'
    },
    
    // C
    {
      topic: 'C Major Pentatonic',
      description: 'C major pentatonic scale (5 shapes)',
      link: '/blog/beginners-guide-pentatonic-scales/?key=A&scroll=shapes',
      category: 'Scales and Fretboard'
    },
    {
      topic: 'C Minor Pentatonic',
      description: 'C minor pentatonic scale (5 shapes)',
      link: '/blog/beginners-guide-pentatonic-scales/?key=C&scroll=shapes',
      category: 'Scales and Fretboard'
    },
    {
      topic: 'C Chord (Open)',
      description: 'Open C major chord',
      link: '/blog/your-first-guitar-chords#c-chord',
      category: 'Chords'
    },
    {
      topic: 'C Chord (Barre - E String Root)',
      description: 'C major barre chord (E string, fret 8)',
      link: '/blog/barre-chord-library?root=e-string&type=Major&fret=8',
      category: 'Chords'
    },
    {
      topic: 'C Chord (Barre - A String Root)',
      description: 'C major barre chord (A string, fret 3)',
      link: '/blog/barre-chord-library?root=a-string&type=Major&fret=3',
      category: 'Chords'
    },
    {
      topic: 'Cm Chord (Barre - E String Root)',
      description: 'C minor barre chord (E string, fret 8)',
      link: '/blog/barre-chord-library?root=e-string&type=Minor&fret=8',
      category: 'Chords'
    },
    {
      topic: 'Cm Chord (Barre - A String Root)',
      description: 'C minor barre chord (A string, fret 3)',
      link: '/blog/barre-chord-library?root=a-string&type=Minor&fret=3',
      category: 'Chords'
    },
    {
      topic: 'CAGED System',
      description: 'Fretboard navigation method',
      link: '/blog/caged-system-guitar-guide',
      category: 'Chords'
    },
    {
      topic: 'Circle of Fifths',
      description: 'Interactive tool for understanding key relationships and diatonic chords',
      link: '/blog/circle-of-fifths',
      category: 'Theory'
    },
    {
      topic: 'Circle of Fifths - Key Signatures',
      description: 'Understanding sharps and flats in each key',
      link: '/blog/circle-of-fifths#key-signatures',
      category: 'Theory'
    },
    {
      topic: 'Circle of Fifths - Diatonic Chords',
      description: 'The chords that naturally occur in each key',
      link: '/blog/circle-of-fifths#circle-with-chords',
      category: 'Theory'
    },
    {
      topic: 'Sharps and Flats in Every Key',
      description: 'Complete reference guide with mnemonics for all key signatures',
      link: '/blog/circle-of-fifths#quick-reference',
      category: 'Theory'
    },
    {
      topic: 'Chord Changes',
      description: 'Smooth transitions between chords',
      link: '/blog/chord-transitions-common-fingers',
      category: 'Chords'
    },
    {
      topic: 'Chord Diagrams',
      description: 'How to read chord charts',
      link: '/blog/how-to-read-chord-diagrams',
      category: 'Chords'
    },
    {
      topic: 'Chord Theory',
      description: 'Understanding chord structure',
      link: '/blog/what-is-a-chord',
      category: 'Theory'
    },
    {
      topic: 'Chord Construction',
      description: 'How chords are built from intervals',
      link: '/blog/what-is-a-chord#chord-construction',
      category: 'Theory'
    },
    {
      topic: 'Chord Progressions',
      description: 'Interactive chord relationships and progressions',
      link: '/blog/open-chord-library/#progressions',
      category: 'Theory'
    },
    {
      topic: 'E 12-Bar Blues',
      description: 'Classic blues progression in E',
      link: '/blog/open-chord-library/?blues=E#progressions',
      category: 'Theory'
    },
    {
      topic: 'A 12-Bar Blues',
      description: 'Classic blues progression in A',
      link: '/blog/open-chord-library/?blues=A#progressions',
      category: 'Theory'
    },
    {
      topic: 'G 12-Bar Blues',
      description: 'Classic blues progression in G',
      link: '/blog/open-chord-library/?blues=G#progressions',
      category: 'Theory'
    },
    {
      topic: 'D 12-Bar Blues',
      description: 'Classic blues progression in D',
      link: '/blog/open-chord-library/?blues=D#progressions',
      category: 'Theory'
    },

    {
      topic: 'Common Fingers',
      description: 'Efficient chord transitions',
      link: '/blog/chord-transitions-common-fingers',
      category: 'Technique'
    },
    {
      topic: 'Chord Movement',
      description: 'Understanding how barre chords move across the fretboard',
      link: '/blog/barre-chord-library#equal-movement',
      category: 'Theory'
    },
    {
      topic: 'Chord Inversions (Triads)',
      description: 'Root position, 1st inversion, and 2nd inversion on 3-string sets',
      link: '/blog/triads-on-3-string-sets#chord-inversions-triads',
      category: 'Theory'
    },
    {
      topic: 'Chord Inversions (7th Chords)',
      description: 'Drop 2 voicings and inversions on strings 1-4, 2-5, and 3-6',
      link: '/blog/moveable-guitar-chord-shapes?category=7th-chords&stringSet=Inversions (Strings 1-4)#chord-inversions-7th-chords',
      category: 'Theory'
    },
    {
      topic: '9th Chords',
      description: 'Extended chords with added 9th intervals - major, minor, and dominant',
      link: '/blog/moveable-guitar-chord-shapes?category=extensions&stringSet=9th Chords',
      category: 'Theory'
    },
    {
      topic: '11th Chords',
      description: 'Extended chords with added 11th intervals - major, minor, and dominant',
      link: '/blog/moveable-guitar-chord-shapes?category=extensions&stringSet=11th Chords',
      category: 'Theory'
    },
    {
      topic: '13th Chords',
      description: 'Extended chords with added 13th intervals - major, minor, and dominant',
      link: '/blog/moveable-guitar-chord-shapes?category=extensions&stringSet=13th Chords',
      category: 'Theory'
    },
    {
      topic: 'Altered Chords',
      description: 'Chords with altered 5ths and 9ths - essential for jazz and advanced harmony',
      link: '/blog/moveable-guitar-chord-shapes?category=extensions&stringSet=Altered Chords',
      category: 'Theory'
    },

    
        // D
    {
      topic: 'D Major Pentatonic',
      description: 'D major pentatonic scale (5 shapes)',
      link: '/blog/beginners-guide-pentatonic-scales/?key=B&scroll=shapes',
      category: 'Scales and Fretboard'
    },
    {
      topic: 'D Minor Pentatonic',
      description: 'D minor pentatonic scale (5 shapes)',
      link: '/blog/beginners-guide-pentatonic-scales/?key=D&scroll=shapes',
      category: 'Scales and Fretboard'
    },
    {
      topic: 'D Chord (Open)',
      description: 'Open D major chord',
      link: '/blog/your-first-guitar-chords#d-chord',
      category: 'Chords'
    },
    {
      topic: 'D Chord (Barre - E String Root)',
      description: 'D major barre chord (E string, fret 10)',
      link: '/blog/barre-chord-library?root=e-string&type=Major&fret=10',
      category: 'Chords'
    },
    {
      topic: 'D Chord (Barre - A String Root)',
      description: 'D major barre chord (A string, fret 5)',
      link: '/blog/barre-chord-library?root=a-string&type=Major&fret=5',
      category: 'Chords'
    },
    {
      topic: 'Dm Chord (Open)',
      description: 'Open D minor chord',
      link: '/blog/your-first-guitar-chords#dm-chord',
      category: 'Chords'
    },
    {
      topic: 'Dm Chord (Barre - E String Root)',
      description: 'D minor barre chord (E string, fret 10)',
      link: '/blog/barre-chord-library?root=e-string&type=Minor&fret=10',
      category: 'Chords'
    },
    {
      topic: 'Dm Chord (Barre - A String Root)',
      description: 'D minor barre chord (A string, fret 5)',
      link: '/blog/barre-chord-library?root=a-string&type=Minor&fret=5',
      category: 'Chords'
    },
    
        // E
    {
      topic: 'E Major Pentatonic',
      description: 'E major pentatonic scale (5 shapes)',
      link: '/blog/beginners-guide-pentatonic-scales/?key=C%23&scroll=shapes',
      category: 'Scales and Fretboard'
    },
    {
      topic: 'E Minor Pentatonic',
      description: 'E minor pentatonic scale (5 shapes)',
      link: '/blog/beginners-guide-pentatonic-scales/?key=E&scroll=shapes',
      category: 'Scales and Fretboard'
    },
    {
      topic: 'E Chord (Open)',
      description: 'Open E major chord',
      link: '/blog/your-first-guitar-chords#e-chord',
      category: 'Chords'
    },
    {
      topic: 'E Chord (Barre - E String Root)',
      description: 'E major barre chord (E string, fret 12)',
      link: '/blog/barre-chord-library?root=e-string&type=Major&fret=12',
      category: 'Chords'
    },
    {
      topic: 'E Chord (Barre - A String Root)',
      description: 'E major barre chord (A string, fret 7)',
      link: '/blog/barre-chord-library?root=a-string&type=Major&fret=7',
      category: 'Chords'
    },
    {
      topic: 'Em Chord (Open)',
      description: 'Open E minor chord',
      link: '/blog/your-first-guitar-chords#em-chord',
      category: 'Chords'
    },
    {
      topic: 'Em Chord (Barre - E String Root)',
      description: 'E minor barre chord (E string, fret 12)',
      link: '/blog/barre-chord-library?root=e-string&type=Minor&fret=12',
      category: 'Chords'
    },
    {
      topic: 'Em Chord (Barre - A String Root)',
      description: 'E minor barre chord (A string, fret 7)',
      link: '/blog/barre-chord-library?root=a-string&type=Minor&fret=7',
      category: 'Chords'
    },
    {
      topic: 'Electric Guitar',
      description: 'Beginner electric guitar guide',
      link: '/blog/electric-guitar-beginner-guide-nz',
      category: 'Gear'
    },
    {
      topic: 'Enharmonic Equivalents',
      description: 'Notes that sound the same but are written differently (like F♯ and G♭)',
      link: '/blog/circle-of-fifths#enharmonic-equivalents',
      category: 'Theory'
    },


    
    // F
    {
      topic: 'F Major Pentatonic',
      description: 'F major pentatonic scale (5 shapes)',
      link: '/blog/beginners-guide-pentatonic-scales/?key=D&scroll=shapes',
      category: 'Scales and Fretboard'
    },
    {
      topic: 'F Minor Pentatonic',
      description: 'F minor pentatonic scale (5 shapes)',
      link: '/blog/beginners-guide-pentatonic-scales/?key=F&scroll=shapes',
      category: 'Scales and Fretboard'
    },
    {
      topic: 'F Chord (Barre - E String Root)',
      description: 'F major barre chord (E string, fret 1)',
      link: '/blog/barre-chord-library?root=e-string&type=Major&fret=1',
      category: 'Chords'
    },
    {
      topic: 'F Chord (Barre - A String Root)',
      description: 'F major barre chord (A string, fret 8)',
      link: '/blog/barre-chord-library?root=a-string&type=Major&fret=8',
      category: 'Chords'
    },
    {
      topic: 'Fm Chord (Barre - E String Root)',
      description: 'F minor barre chord (E string, fret 1)',
      link: '/blog/barre-chord-library?root=e-string&type=Minor&fret=1',
      category: 'Chords'
    },
    {
      topic: 'Fm Chord (Barre - A String Root)',
      description: 'F minor barre chord (A string, fret 8)',
      link: '/blog/barre-chord-library?root=a-string&type=Minor&fret=8',
      category: 'Chords'
    },
    {
      topic: 'Fretboard Navigation',
      description: 'Finding notes across strings',
      link: '/blog/guitar-fretboard-navigation',
      category: 'Scales and Fretboard'
    },
    {
      topic: 'Fretboard Understanding',
      description: 'Why strings are tuned this way',
      link: '/blog/understanding-guitar-fretboard',
      category: 'Theory'
    },

    
    // G
    {
      topic: 'G Major Pentatonic',
      description: 'G major pentatonic scale (5 shapes)',
      link: '/blog/beginners-guide-pentatonic-scales/?key=E&scroll=shapes',
      category: 'Scales and Fretboard'
    },
    {
      topic: 'G Minor Pentatonic',
      description: 'G minor pentatonic scale (5 shapes)',
      link: '/blog/beginners-guide-pentatonic-scales/?key=G&scroll=shapes',
      category: 'Scales and Fretboard'
    },
    {
      topic: 'G Chord (Open)',
      description: 'Open G major chord',
      link: '/blog/your-first-guitar-chords#g-chord',
      category: 'Chords'
    },
    {
      topic: 'G Chord (Barre - E String Root)',
      description: 'G major barre chord (E string, fret 3)',
      link: '/blog/barre-chord-library?root=e-string&type=Major&fret=3',
      category: 'Chords'
    },
    {
      topic: 'G Chord (Barre - A String Root)',
      description: 'G major barre chord (A string, fret 10)',
      link: '/blog/barre-chord-library?root=a-string&type=Major&fret=10',
      category: 'Chords'
    },
    {
      topic: 'Gm Chord (Barre - E String Root)',
      description: 'G minor barre chord (E string, fret 3)',
      link: '/blog/barre-chord-library?root=e-string&type=Minor&fret=3',
      category: 'Chords'
    },
    {
      topic: 'Gm Chord (Barre - A String Root)',
      description: 'G minor barre chord (A string, fret 10)',
      link: '/blog/barre-chord-library?root=a-string&type=Minor&fret=10',
      category: 'Chords'
    },
    {
      topic: 'Gear Reviews',
      description: 'Guitar and equipment reviews',
      link: '/blog/kiesel-a2-7-string-review',
      category: 'Gear'
    },
    
    // I
    {
      topic: 'Intervals',
      description: 'Musical distance between notes',
      link: '/blog/what-is-a-chord#intervals',
      category: 'Theory'
    },
    {
      topic: 'Instrument Frequency Ranges',
      description: 'How guitar fits in the musical spectrum with piano, bass, and extended range instruments',
      link: '/blog/beginners-guide-notes-guitar#instrument-range',
      category: 'Theory'
    },
    
    // K
    {
      topic: 'Key Chord Explorer',
      description: 'Interactive chord relationships',
      link: '/blog/key-chords-explorer',
      category: 'Tools'
    },
    {
      topic: 'Major Key Chord Sequence',
      description: 'The 6 main chords in any major key (I, ii, iii, IV, V, vi)',
      link: '/blog/key-chords-explorer#understanding-the-pattern',
      category: 'Theory'
    },
    {
      topic: 'Minor Key Chord Sequence',
      description: 'The 6 main chords in any minor key (i, ii°, III, iv, v, VI)',
      link: '/blog/key-chords-explorer#understanding-the-pattern',
      category: 'Theory'
    },
    
    // M
    {
      topic: 'Major Scale',
      description: 'Essential scale patterns',
      link: '/blog/major-scale-guitar-guide',
      category: 'Scales and Fretboard'
    },
    {
      topic: 'Minor Chords',
      description: 'Understanding minor chord structure',
      link: '/blog/your-first-guitar-chords#minor-chords',
      category: 'Chords'
    },
    {
      topic: 'Moveable Chords',
      description: 'Shapes that work across the fretboard',
      link: '/blog/moveable-guitar-chord-shapes',
      category: 'Chords'
    },
    {
      topic: 'Musical Terms',
      description: 'Complete A-Z guide to musical terminology for guitarists',
      link: '/blog/musical-terms-guitarists-guide',
      category: 'Theory'
    },
    {
      topic: 'Music Stores',
      description: 'Wellington music retail landscape',
      link: '/blog/wellington-music-stores',
      category: 'Gear'
    },
    
    // N
    {
      topic: 'Notes on Guitar',
      description: 'Finding every note on the fretboard',
      link: '/blog/beginners-guide-notes-guitar',
      category: 'Theory'
    },
    
    // O
    {
      topic: 'Open Chords',
      description: 'Essential beginner chord shapes',
      link: '/blog/open-chord-library',
      category: 'Chords'
    },

    
    // P
    {
      topic: 'Pentatonic Scales (Guide)',
      description: 'Complete guide to 5 essential scale shapes for rock and blues',
      link: '/blog/beginners-guide-pentatonic-scales',
      category: 'Scales and Fretboard'
    },
    {
      topic: 'Pentatonic Scales (Scale Explorer)',
      description: 'Interactive pentatonic scale visualization and practice tool',
      link: '/scale-explorer/index.html?scale=A&category=pentatonic&mode=minor-pentatonic',
      category: 'Tools'
    },
    {
      topic: 'Pentatonic Scale Exercises',
      description: 'Interactive tab player with 16th notes and triplets',
      link: '/blog/pentatonic-scale-exercises',
      category: 'Technique'
    },
    {
      topic: 'Picking and Finger Exercises',
      description: '8 chromatic exercises for finger independence and string navigation',
      link: '/blog/picking-finger-exercises',
      category: 'Technique'
    },
    {
      topic: '16th Note Exercises',
      description: 'Pentatonic scale patterns with alternate picking',
      link: '/blog/pentatonic-scale-exercises',
      category: 'Technique'
    },
    {
      topic: '16th Note Triplets',
      description: 'Advanced pentatonic patterns with triplets',
      link: '/blog/pentatonic-scale-exercises',
      category: 'Technique'
    },
    {
      topic: 'Picking Technique',
      description: 'Complete progressive guide',
      link: '/blog/guitar-picking-technique-guide',
      category: 'Technique'
    },
    {
      topic: 'How to Hold the Pick',
      description: 'Proper pick grip and hand positioning fundamentals',
      link: '/blog/guitar-picking-technique-guide#level-1',
      category: 'Technique'
    },
    {
      topic: 'Pick Slanting (DWPS/UWPS)',
      description: 'Downward and upward pick slanting techniques for string crossing',
      link: '/blog/guitar-picking-technique-guide#level-4',
      category: 'Technique'
    },
    {
      topic: 'Economy Picking',
      description: 'Alternative to strict alternate picking for efficiency',
      link: '/blog/guitar-picking-technique-guide#other-techniques',
      category: 'Technique'
    },
    {
      topic: 'Sweep Picking',
      description: 'Arpeggio technique with continuous pick motion',
      link: '/blog/guitar-picking-technique-guide#other-techniques',
      category: 'Technique'
    },
    {
      topic: 'Practice Tips',
      description: 'Essential practice techniques',
      link: '/blog/essential-practice-tips',
      category: 'Technique'
    },
    {
      topic: 'PracticeTrack',
      description: 'Musical journey companion tool',
      link: '/blog/introducing-practicetrack',
      category: 'Tools'
    },
    
    // R
    {
      topic: 'Rhythm Tool',
      description: 'Interactive rhythm learning',
      link: '/blog/rhythm-tool',
      category: 'Tools'
    },

    
    // S
    {
      topic: 'Scale Explorer',
      description: 'Interactive scale visualization',
      link: '/blog/scale-explorer-tool',
      category: 'Tools'
    },
    {
      topic: 'C Major Scale',
      description: 'Learn the C major scale pattern',
      link: '/scale-explorer/index.html?scale=C&category=major-modes&mode=major',
      category: 'Scales and Fretboard'
    },
    {
      topic: 'C Minor Scale',
      description: 'Learn the C natural minor scale',
      link: '/scale-explorer/index.html?scale=C&category=major-modes&mode=aeolian',
      category: 'Scales and Fretboard'
    },

    {
      topic: 'C Major Blues Scale',
      description: 'C major blues scale with blue notes',
      link: '/scale-explorer/index.html?scale=C&category=blues-scales&mode=blues-major',
      category: 'Scales and Fretboard'
    },
    {
      topic: 'A Harmonic Minor',
      description: 'A harmonic minor scale (exotic sound)',
      link: '/scale-explorer/index.html?scale=A&category=harmonic-minor-modes&mode=harmonic-minor',
      category: 'Scales and Fretboard'
    },
    {
      topic: 'E Harmonic Minor',
      description: 'E harmonic minor scale (dark, dramatic)',
      link: '/scale-explorer/index.html?scale=E&category=harmonic-minor-modes&mode=harmonic-minor',
      category: 'Scales and Fretboard'
    },
    {
      topic: 'A Melodic Minor',
      description: 'A melodic minor scale (jazz standard)',
      link: '/scale-explorer/index.html?scale=A&category=melodic-minor-modes&mode=melodic-minor',
      category: 'Scales and Fretboard'
    },
    {
      topic: 'C Diminished Scale (W-H)',
      description: 'C whole-half diminished scale (tension and jazz)',
      link: '/scale-explorer/index.html?scale=C&category=diminished-modes&mode=wh-diminished',
      category: 'Scales and Fretboard'
    },
    {
      topic: 'C Diminished Scale (H-W)',
      description: 'C half-whole diminished scale (jazz and classical)',
      link: '/scale-explorer/index.html?scale=C&category=diminished-modes&mode=hw-diminished',
      category: 'Scales and Fretboard'
    },
    {
      topic: 'C Augmented Scale',
      description: 'C augmented scale (unstable, modern)',
      link: '/scale-explorer/index.html?scale=C&category=whole-tone&mode=whole-tone-1',
      category: 'Scales and Fretboard'
    },
    {
      topic: 'G Blues Minor',
      description: 'G blues minor scale (blues foundation)',
      link: '/scale-explorer/index.html?scale=G&category=blues-scales&mode=blues-minor',
      category: 'Scales and Fretboard'
    },
    {
      topic: 'A Blues Minor',
      description: 'A blues minor scale (rock and blues staple)',
      link: '/scale-explorer/index.html?scale=A&category=blues-scales&mode=blues-minor',
      category: 'Scales and Fretboard'
    },
    {
      topic: 'E Blues Minor',
      description: 'E blues minor scale (classic blues)',
      link: '/scale-explorer/index.html?scale=E&category=blues-scales&mode=blues-minor',
      category: 'Scales and Fretboard'
    },
    {
      topic: 'D Dorian Mode',
      description: 'D Dorian mode (jazz and fusion)',
      link: '/scale-explorer/index.html?scale=D&category=major-modes&mode=dorian',
      category: 'Scales and Fretboard'
    },
    {
      topic: 'G Mixolydian Mode',
      description: 'G Mixolydian mode (blues and rock)',
      link: '/scale-explorer/index.html?scale=G&category=major-modes&mode=mixolydian',
      category: 'Scales and Fretboard'
    },
    {
      topic: 'F Lydian Mode',
      description: 'F Lydian mode (dreamy, floating)',
      link: '/scale-explorer/index.html?scale=F&category=major-modes&mode=lydian',
      category: 'Scales and Fretboard'
    },
    {
      topic: 'E Phrygian Mode',
      description: 'E Phrygian mode (Spanish, flamenco)',
      link: '/scale-explorer/index.html?scale=E&category=major-modes&mode=phrygian',
      category: 'Scales and Fretboard'
    },
    {
      topic: 'B Locrian Mode',
      description: 'B Locrian mode (diminished, unstable)',
      link: '/scale-explorer/index.html?scale=B&category=major-modes&mode=locrian',
      category: 'Scales and Fretboard'
    },
    {
      topic: 'C Dorian Mode',
      description: 'C Dorian mode (minor with major 6th)',
      link: '/scale-explorer/index.html?scale=C&category=major-modes&mode=dorian',
      category: 'Scales and Fretboard'
    },
    {
      topic: 'C Mixolydian Mode',
      description: 'C Mixolydian mode (major with minor 7th)',
      link: '/scale-explorer/index.html?scale=C&category=major-modes&mode=mixolydian',
      category: 'Scales and Fretboard'
    },
    {
      topic: 'C Lydian Mode',
      description: 'C Lydian mode (major with sharp 4th)',
      link: '/scale-explorer/index.html?scale=C&category=major-modes&mode=lydian',
      category: 'Scales and Fretboard'
    },
    {
      topic: 'C Phrygian Mode',
      description: 'C Phrygian mode (minor with flat 2nd)',
      link: '/scale-explorer/index.html?scale=C&category=major-modes&mode=phrygian',
      category: 'Scales and Fretboard'
    },
    {
      topic: 'C Locrian Mode',
      description: 'C Locrian mode (diminished with flat 5th)',
      link: '/scale-explorer/index.html?scale=C&category=major-modes&mode=locrian',
      category: 'Scales and Fretboard'
    },
    
    // Common scales in different keys
    {
      topic: 'G Major Scale',
      description: 'G major scale (common guitar key)',
      link: '/scale-explorer/index.html?scale=G&category=major-modes&mode=major',
      category: 'Scales and Fretboard'
    },
    {
      topic: 'D Major Scale',
      description: 'D major scale (bright, open sound)',
      link: '/scale-explorer/index.html?scale=D&category=major-modes&mode=major',
      category: 'Scales and Fretboard'
    },
    {
      topic: 'A Major Scale',
      description: 'A major scale (popular guitar key)',
      link: '/scale-explorer/index.html?scale=A&category=major-modes&mode=major',
      category: 'Scales and Fretboard'
    },
    {
      topic: 'E Major Scale',
      description: 'E major scale (powerful, bright)',
      link: '/scale-explorer/index.html?scale=E&category=major-modes&mode=major',
      category: 'Scales and Fretboard'
    },
    {
      topic: 'A Minor Scale',
      description: 'A natural minor scale (sad, melancholic)',
      link: '/scale-explorer/index.html?scale=A&category=major-modes&mode=aeolian',
      category: 'Scales and Fretboard'
    },
    {
      topic: 'E Minor Scale',
      description: 'E natural minor scale (dark, moody)',
      link: '/scale-explorer/index.html?scale=E&category=major-modes&mode=aeolian',
      category: 'Scales and Fretboard'
    },

    {
      topic: 'G Major Blues Scale',
      description: 'G major blues scale (blues and rock)',
      link: '/scale-explorer/index.html?scale=G&category=blues-scales&mode=blues-major',
      category: 'Scales and Fretboard'
    },
    {
      topic: 'A Major Blues Scale',
      description: 'A major blues scale (blues foundation)',
      link: '/scale-explorer/index.html?scale=A&category=blues-scales&mode=blues-major',
      category: 'Scales and Fretboard'
    },
    {
      topic: 'E Major Blues Scale',
      description: 'E major blues scale (classic blues)',
      link: '/scale-explorer/index.html?scale=E&category=blues-scales&mode=blues-major',
      category: 'Scales and Fretboard'
    },
    {
      topic: 'D Mixolydian Mode',
      description: 'D Mixolydian (country and folk)',
      link: '/scale-explorer/index.html?scale=D&category=major-modes&mode=mixolydian',
      category: 'Scales and Fretboard'
    },
    {
      topic: 'A Dorian Mode',
      description: 'A Dorian (jazz and fusion)',
      link: '/scale-explorer/index.html?scale=A&category=major-modes&mode=dorian',
      category: 'Scales and Fretboard'
    },
    {
      topic: 'E Dorian Mode',
      description: 'E Dorian (rock and fusion)',
      link: '/scale-explorer/index.html?scale=E&category=major-modes&mode=dorian',
      category: 'Scales and Fretboard'
    },
    {
      topic: 'Scales',
      description: 'Beginner guide to guitar scales',
      link: '/blog/beginners-guide-guitar-scales',
      category: 'Scales and Fretboard'
    },
    {
      topic: 'Strumming Patterns',
      description: 'Master rhythm and timing',
      link: '/blog/guitar-strumming-patterns',
      category: 'Rhythm'
    },
    
    // T
    {
      topic: 'Triads',
      description: 'Three-note chord building blocks',
      link: '/blog/triads-on-3-string-sets',
      category: 'Chords'
    },
    
    // W
    {
      topic: 'When to Start',
      description: 'Optimal age for learning guitar',
      link: '/blog/when-should-you-start-learning-guitar',
      category: 'Getting Started'
    },
    
    // Additional topics for better coverage
    {
      topic: 'Seven String Guitar',
      description: '7 string extended range guitar review',
      link: '/blog/kiesel-a2-7-string-review',
      category: 'Gear'
    },
    {
      topic: 'Beginner Guide',
      description: 'Complete beginner roadmap',
      link: '/blog/complete-beginners-guide-guitar',
      category: 'Getting Started'
    },
    {
      topic: 'Chord Library',
      description: 'Interactive chord reference',
      link: '/blog/open-chord-library',
      category: 'Tools'
    },

    {
      topic: 'Guitar Tuning',
      description: 'Understanding string tuning',
      link: '/blog/understanding-guitar-fretboard',
      category: 'Theory'
    },
    {
      topic: 'Why Guitar Strings Are Tuned E-A-D-G-B-E',
      description: 'Understanding the constraints and compromises that created the guitar tuning system',
      link: '/blog/understanding-guitar-fretboard',
      category: 'Theory'
    },
    {
      topic: 'Why Strings Are Tuned This Way 🎸',
      description: 'Answer for beginners: Why is the guitar tuned E-A-D-G-B-E?',
      link: '/blog/understanding-guitar-fretboard',
      category: 'Theory'
    },
    {
      topic: 'Music Theory',
      description: 'Fundamental music concepts',
      link: '/blog/what-is-a-chord',
      category: 'Theory'
    },
    {
      topic: 'Practice Routine',
      description: 'Effective practice strategies',
      link: '/blog/essential-practice-tips',
      category: 'Technique'
    },
    {
      topic: 'String Tuning',
      description: 'Why E-A-D-G-B-E tuning',
      link: '/blog/understanding-guitar-fretboard',
      category: 'Theory'
    }
  ];

  // Filter topics based on search
  const filteredTopics = quickRefSearch.trim() === '' 
    ? topicIndex 
    : topicIndex.filter(topic => {
        const searchTerm = quickRefSearch.toLowerCase().trim();
        return topic.topic?.toLowerCase().includes(searchTerm) ||
               topic.description?.toLowerCase().includes(searchTerm) ||
               topic.category?.toLowerCase().includes(searchTerm);
      });

  // Group topics by first letter
  const groupedTopics = filteredTopics.reduce((groups, topic) => {
    const firstLetter = topic.topic?.charAt(0).toUpperCase() || '';
    if (!groups[firstLetter]) {
      groups[firstLetter] = [];
    }
    groups[firstLetter].push(topic);
    return groups;
  }, {} as Record<string, typeof topicIndex>);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isQuickRefOpen) {
        setIsQuickRefOpen(false);
        setQuickRefSearch('');
      }
    };

    if (isQuickRefOpen) {
      document.addEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'unset';
    };
  }, [isQuickRefOpen]);

  const posts = [
    // GETTING STARTED
    {
      id: '8',
      title: 'The Complete Beginner\'s Guide to Learning Guitar',
      excerpt: 'A comprehensive roadmap for absolute beginners, covering everything from first chords to single notes and picking techniques. Your complete starting guide.',
      readTime: '35 min read',
      category: 'Beginner',
      primaryCategory: 'Getting Started',
      categories: ['Getting Started'],
      skillLevel: 'beginner',
      image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      slug: 'complete-beginners-guide-guitar',
      author: 'Mike Nelson',
      sortOrder: 1
    },
    {
      id: '7',
      title: 'When Should You Start Learning Guitar? What the Research Actually Says',
      excerpt: 'Discover the optimal age to start guitar based on neuroscience research. From children to seniors, learn the advantages and challenges at every life stage.',
      readTime: '12 min read',
      category: 'Beginner',
      primaryCategory: 'Getting Started',
      categories: ['Getting Started'],
      skillLevel: 'beginner',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      slug: 'when-should-you-start-learning-guitar',
      author: 'Mike Nelson',
      sortOrder: 2
    },
    {
      id: '9',
      title: 'Beginner Electric Guitar Guide - New Zealand 2025',
      excerpt: 'Complete guide to buying your first electric guitar in New Zealand. Top recommendations, amp choices, current pricing, and where to buy for beginners.',
      readTime: '6 min read',
      category: 'Beginner',
      primaryCategory: 'Getting Started',
      categories: ['Getting Started', 'Gear'],
      skillLevel: 'beginner',
      image: '/yamaha-pac112j.webp',
      slug: 'electric-guitar-beginner-guide-nz',
      author: 'Mike Nelson',
      sortOrder: 3
    },

    // CHORDS
    {
      id: '27',
      title: 'Your First Guitar Chords: A Complete Beginner Guide',
      excerpt: 'Learn your first 8 essential guitar chords with interactive diagrams and smooth transition tips. Master A, E, G, D, C, Em, Am, and Dm chords.',
      readTime: '8 min read',
      category: 'Beginner',
      primaryCategory: 'Chords',
      categories: ['Chords', 'Getting Started'],
      skillLevel: 'beginner',
      image: '/open-chord-library-thumbnail.svg',
      slug: 'your-first-guitar-chords',
      author: 'Mike Nelson',
      sortOrder: 4
    },
    {
      id: '28',
      title: 'Barre Chord Library',
      excerpt: 'Interactive barre chord library with E and A shape patterns. Select any chord type and fret position to see complete diagrams with finger positions.',
      readTime: 'Interactive Tool',
      category: 'Beginner - Intermediate',
      primaryCategory: 'Chords',
      categories: ['Chords', 'Tools'],
      skillLevel: 'beginner-intermediate',
      image: '/moveable-chord-shapes-thumbnail.svg',
      slug: 'barre-chord-library',
      author: 'Mike Nelson',
      sortOrder: 6
    },
    {
      id: '23',
      title: 'What is a Chord? Understanding Structure, Intervals, and Types',
      excerpt: 'Learn what guitar chords are, how they\'re built using intervals, and the difference between open chords and moveable shapes. Essential chord theory for beginners.',
      readTime: '25 min read',
      category: 'Beginner',
      primaryCategory: 'Chords',
      categories: ['Chords', 'Theory'],
      skillLevel: 'beginner',
      image: '/what-is-chord-thumbnail.svg',
      slug: 'what-is-a-chord',
      author: 'Mike Nelson',
      sortOrder: 7
    },
    {
      id: '16',
      title: 'How to Read Chord Diagrams',
      excerpt: 'Master the fundamentals of reading guitar chord diagrams with this comprehensive video tutorial. Learn to interpret chord charts and start playing songs faster.',
      readTime: '',
      category: 'Beginner',
      primaryCategory: 'Chords',
      categories: ['Chords'],
      skillLevel: 'beginner',
      image: '/youtube-logo.svg',
      slug: 'how-to-read-chord-diagrams',
      author: 'Mike Nelson',
      sortOrder: 2
    },
    {
      id: '18',
      title: 'Open Chord Library',
      excerpt: 'Master guitar chords with my comprehensive interactive reference tool featuring visual diagrams, fingering patterns, and chord variations. Perfect for beginners and advanced players.',
      readTime: '',
      category: 'Beginner - Intermediate',
      primaryCategory: 'Chords',
      categories: ['Chords', 'Tools'],
      skillLevel: 'beginner-intermediate',
      image: '/open-chord-library-thumbnail.svg',
      slug: 'open-chord-library',
      author: 'Mike Nelson',
      sortOrder: 5
    },
    {
      id: '17',
      title: 'Master Guitar Strumming Patterns',
      excerpt: 'Learn guitar strumming patterns with interactive audio examples. Master the secret to solid timing and rhythm with 11 progressive patterns from beginner to advanced, plus create custom patterns with our interactive builder.',
      readTime: '12 min read',
      category: 'Beginner - Intermediate',
      primaryCategory: 'Rhythm',
      categories: ['Rhythm', 'Chords', 'Technique'],
      skillLevel: 'beginner-intermediate',
      image: '/strumming-patterns-thumbnail.svg',
      slug: 'guitar-strumming-patterns',
      author: 'Mike Nelson',
      sortOrder: 5
    },
    {
      id: '20',
      title: 'Learn Rhythm with the Interactive Rhythm Tool',
      excerpt: 'Explore rhythm fundamentals, time signatures, and note values with interactive audio and notation. Try the free Rhythm Tool to improve your timing and understanding.',
      readTime: '3 min read',
      category: 'Beginner',
      primaryCategory: 'Rhythm',
      categories: ['Rhythm', 'Technique', 'Tools'],
      skillLevel: 'beginner',
      image: '/rhythm-tool-thumbnail.svg',
      slug: 'rhythm-tool',
      author: 'Mike Nelson',
      sortOrder: 19
    },
    {
      id: '29',
      title: 'Beginner\'s Guide to Pentatonic Scales',
      excerpt: 'Master the 5 essential pentatonic scale shapes with interactive fretboard diagrams. Learn how shapes connect across the fretboard and practice in any key.',
      readTime: 'Interactive Tool',
      category: 'Beginner - Intermediate',
      primaryCategory: 'Scales and Fretboard',
      categories: ['Scales and Fretboard', 'Theory', 'Tools'],
      skillLevel: 'beginner-intermediate',
      image: '/beginners-guide-pentatonic-scales-thumbnail.svg',
      slug: 'beginners-guide-pentatonic-scales',
      author: 'Mike Nelson',
      sortOrder: 9
    },
    {
      id: '4',
      title: 'Smoother Chord Changes: Identifying Common Fingers Between Chords',
      excerpt: 'Learn how to identify common fingers between chords for smoother transitions. Master chord changes with visual diagrams and essential fingering tips.',
      readTime: '7 min read',
      category: 'Beginner',
      primaryCategory: 'Chords',
      categories: ['Chords', 'Technique'],
      skillLevel: 'beginner',
      image: '/chord-transitions-thumbnail.svg',
      slug: 'chord-transitions-common-fingers',
      author: 'Mike Nelson',
      sortOrder: 4
    },
    {
      id: '25',
      title: 'Chords in Every Key: Interactive Key Chord Explorer',
      excerpt: 'Explore all the chords that naturally occur in any major or minor key. Interactive tool for learning chord relationships in every key.',
      readTime: 'Interactive Tool',
      category: 'All',
      primaryCategory: 'Chords',
      categories: ['Chords', 'Theory', 'Tools'],
      skillLevel: 'all',
      image: '/blog-key-chords-explorer-thumbnail.svg',
      slug: 'key-chords-explorer',
      author: 'Mike Nelson',
      sortOrder: 11
    },

    // SCALES AND FRETBOARD
    {
      id: '11',
      title: 'Beginner\'s Guide to Guitar Scales',
      excerpt: 'A simple introduction to guitar scales covering the basics of notes, intervals, and the C major scale. Perfect starting point for beginners.',
      readTime: '15 min read',
      category: 'Beginner',
      primaryCategory: 'Scales and Fretboard',
      categories: ['Scales and Fretboard', 'Theory'],
      skillLevel: 'beginner',
      image: '/beginners-guide-scales-thumbnail.svg',
      slug: 'beginners-guide-guitar-scales',
      author: 'Mike Nelson',
      sortOrder: 9
    },
    {
      id: '15',
      title: 'Major Scale Guitar Guide',
      excerpt: 'Master essential guitar shapes and patterns across the fretboard with this comprehensive guide to major scale modes and arpeggios. A different approach to scale learning.',
      readTime: 'PDF',
      category: 'Intermediate',
      primaryCategory: 'Scales and Fretboard',
      categories: ['Scales and Fretboard', 'Theory'],
      skillLevel: 'intermediate',
      image: '/major-scale-guide.png',
      slug: 'major-scale-guitar-guide',
      author: 'Mike Nelson',
      sortOrder: 22
    },
    {
      id: '13',
      title: 'Guitar Fretboard Navigation: Cross-String Interval Relationships (Part 2)',
      excerpt: 'Master practical techniques for finding notes and intervals across guitar strings. Complete with formulas, visual diagrams, and step-by-step examples. Contains beginner-friendly sections.',
      readTime: '15 min read',
      category: 'Intermediate',
      primaryCategory: 'Scales and Fretboard',
      categories: ['Scales and Fretboard', 'Theory'],
      skillLevel: 'intermediate',
      image: '/guitar-tuning-thumbnail.svg',
      slug: 'guitar-fretboard-navigation',
      author: 'Mike Nelson',
      sortOrder: 12
    },
    {
      id: '12',
      title: 'Understanding the Guitar Fretboard: Why Strings Are Tuned This Way (Part 1)',
      excerpt: 'Why are guitar strings tuned E-A-D-G-B-E instead of something more logical? Discover the fascinating constraints and compromises that created this system. Contains beginner-friendly explanations.',
      readTime: '20 min read',
      category: 'Advanced',
      primaryCategory: 'Scales and Fretboard',
      categories: ['Scales and Fretboard', 'Theory'],
      skillLevel: 'advanced',
      image: '/guitar-tuning-thumbnail.svg',
      slug: 'understanding-guitar-fretboard',
      author: 'Mike Nelson',
      sortOrder: 13
    },
    {
      id: '5',
      title: 'Master Guitar Scales with the Interactive Scale Explorer Tool',
      excerpt: 'Discover how to use the Scale Explorer tool to visualize guitar scales, learn fretboard patterns, and understand music theory through interactive features.',
      readTime: '5 min read',
      category: 'Intermediate',
      primaryCategory: 'Scales and Fretboard',
      categories: ['Scales and Fretboard', 'Theory', 'Tools'],
      skillLevel: 'intermediate',
      image: '/scale-explorer-thumbnail.svg',
      slug: 'scale-explorer-tool',
      author: 'Mike Nelson',
      sortOrder: 14
    },
    {
      id: '22',
      title: 'Triads on 3-String Sets',
      excerpt: 'Master the building blocks of guitar chords! Learn the three essential triad shapes on each string group with chord diagrams and fretboard maps.',
      readTime: '',
      category: 'Intermediate - Advanced',
      primaryCategory: 'Chords',
      categories: ['Chords', 'Scales and Fretboard', 'Theory', 'Tools'],
      skillLevel: 'intermediate-advanced',
      image: '/triads-thumbnail.svg',
      slug: 'triads-on-3-string-sets',
      author: 'Mike Nelson',
      sortOrder: 15
    },

    // TECHNIQUE
    {
      id: '19',
      title: 'Guitar Picking Technique: Complete Progressive Guide',
      excerpt: 'Master guitar picking from basic grip to advanced motion mechanics. Progressive guide covering pick slanting and escape techniques.',
      readTime: '30 min read',
      category: 'Beginner - Advanced',
      primaryCategory: 'Technique',
      categories: ['Technique'],
      skillLevel: 'all',
      image: '/artist-guitars.png',
      slug: 'guitar-picking-technique-guide',
      author: 'Mike Nelson',
      sortOrder: 8
    },
    {
      id: '32',
      title: 'Pentatonic Scale Exercises',
      excerpt: 'Unlock your picking technique with focused pentatonic scale exercises. Practice alternate picking, triplets, and legato patterns with interactive tabs and audio playback.',
      readTime: 'Interactive',
      category: 'Beginner - Advanced',
      primaryCategory: 'Technique',
      categories: ['Technique', 'Tools', 'Tabs'],
      skillLevel: 'all',
      image: '/Pentatonic Exercise Blog Post.png',
      slug: 'pentatonic-scale-exercises',
      author: 'Mike Nelson',
      sortOrder: 10
    },
    {
      id: '35',
      title: 'Picking and Finger Exercises',
      excerpt: 'Master finger independence, string navigation, and alternate picking with 8 focused chromatic exercises. Develop advanced guitar technique through non-sequential finger patterns and precise string work.',
      readTime: 'Interactive',
      category: 'Beginner - Advanced',
      primaryCategory: 'Technique',
      categories: ['Technique', 'Tools', 'Tabs'],
      skillLevel: 'all',
      image: '/Finger Exercise Blog Post.png',
      slug: 'picking-finger-exercises',
      author: 'Mike Nelson',
      sortOrder: 10
    },
    {
      id: '33',
      title: 'Blues Licks Exercises',
              excerpt: 'Master essential blues licks with my interactive tab player. Practice classic blues phrases, bends, slides, and vibrato techniques with professional notation and audio playback.',
      readTime: 'Interactive Tool',
      category: 'Beginner - Intermediate',
      primaryCategory: 'Technique',
      categories: ['Technique', 'Scales and Fretboard', 'Tools', 'Tabs'],
      skillLevel: 'beginner-intermediate',
      image: '/Blues Blog Post.png',
      slug: 'blues-licks-exercises',
      author: 'Mike Nelson',
      sortOrder: 11
    },
    {
      id: '36',
      title: '10 Easiest Beginner Guitar Riffs',
      excerpt: 'Learn 10 classic guitar riffs perfect for beginners. Master iconic melodies from Deep Purple, Black Sabbath, AC/DC and more with interactive tab player.',
      readTime: 'Interactive Tool',
      category: 'Beginner',
      primaryCategory: 'Technique',
      categories: ['Technique', 'Tools', 'Tabs'],
      skillLevel: 'beginner',
      image: '/guitar-riff-blog.png',
      slug: 'easiest-beginner-guitar-riffs',
      author: 'Mike Nelson',
      sortOrder: 6
    },
    {
      id: '1',
      title: '6 Essential Practice Tips for Guitar Students',
      excerpt: 'Discover proven practice techniques that will accelerate your guitar learning and help you make the most of your practice time.',
      readTime: '8 min read',
      category: 'All',
      primaryCategory: 'Technique',
      categories: ['Technique'],
      skillLevel: 'all',
      image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      slug: 'essential-practice-tips',
      author: 'Mike Nelson',
      sortOrder: 18
    },
    {
      id: '6',
      title: 'Introducing PracticeTrack: Your Musical Journey Companion',
      excerpt: 'Transform your practice sessions with deliberate tracking, goal setting, and analytics. A free tool to help you stay consistent and see your progress over time.',
      readTime: '6 min read',
      category: 'Beginner - Advanced',
      primaryCategory: 'Technique',
      categories: ['Technique', 'Tools'],
      skillLevel: 'beginner-advanced',
      image: '/practicetrack-thumbnail.svg',
      slug: 'introducing-practicetrack',
      author: 'Mike Nelson',
      sortOrder: 20
    },

    // GEAR
    {
      id: '10',
      title: 'My Kiesel A2 7-String',
      excerpt: 'In-depth review of the Kiesel A2 7-String guitar. From ordering process to playing experience, plus my complete studio setup for metal and extended range guitars.',
      date: 'June 25, 2025',
      readTime: '12 min read',
      category: 'All',
      primaryCategory: 'Gear',
      categories: ['Gear'],
      skillLevel: 'all',
      image: '/Kiesel logo.jpg',
      slug: 'kiesel-a2-7-string-review',
      author: 'Mike Nelson',
      sortOrder: 22
    },
    {
      id: '2',
      title: 'Wellington\'s Vanishing Instrument Stores',
      excerpt: 'Exploring the impact of Wellington\'s changing music retail landscape on guitar students and where to find the gear and support you need.',
      date: 'June 22, 2025',
      readTime: '6 min read',
      category: 'All',
      primaryCategory: 'Gear',
      categories: ['Gear'],
      skillLevel: 'all',
      image: 'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      slug: 'wellington-music-stores',
      author: 'Mike Nelson',
      sortOrder: 23
    },
    {
      id: '21',
      title: 'Moveable Guitar Chord Shapes',
      excerpt: 'A comprehensive guide to the most practical and playable moveable chord shapes for guitar. Covers major, minor, 7th chords, extended chords, and modern chord forms.',
      readTime: '',
      category: 'Intermediate - Advanced',
      primaryCategory: 'Chords',
      categories: ['Chords', 'Technique', 'Theory', 'Tools'],
      skillLevel: 'all',
      image: '/moveable-chord-shapes-thumbnail.svg',
      slug: 'moveable-guitar-chord-shapes',
      author: 'Mike Nelson',
      sortOrder: 16
    },
    {
      id: '24',
      title: 'The CAGED System: A Guitar Fretboard Guide',
      excerpt: 'Learn how five familiar chord shapes connect across the entire fretboard. Understand transposition, note relationships, and how to use CAGED for minor and seventh chords.',
      readTime: '15 min read',
      category: 'Intermediate',
      primaryCategory: 'Chords',
      categories: ['Chords', 'Scales and Fretboard', 'Theory'],
      skillLevel: 'intermediate',
      image: '/caged-system-thumbnail.svg',
      slug: 'caged-system-guitar-guide',
      author: 'Mike Nelson',
      sortOrder: 17
    },
    {
      id: '26',
      title: "Beginner's Guide to Notes on the Guitar",
      excerpt: 'A super-friendly introduction to the musical alphabet, sharps and flats, octaves, and how to find every note on your guitar fretboard. Includes interactive diagrams and comparisons to other instruments.',
      readTime: '20 min read',
      category: 'Beginner',
      primaryCategory: 'Theory',
      categories: ['Theory', 'Getting Started'],
      skillLevel: 'beginner',
      image: '/beginners-guide-scales-thumbnail.svg',
      slug: 'beginners-guide-notes-guitar',
      author: 'Mike Nelson',
      sortOrder: 5
    },
    {
      id: '30',
      title: 'The Circle of Fifths: A Complete Guide',
      excerpt: 'Master the fundamental relationship between keys, understand key signatures, and discover the diatonic chords that make up every major and minor key with our interactive tool.',
      readTime: 'Interactive Tool',
      category: 'Intermediate - Advanced',
      primaryCategory: 'Theory',
      categories: ['Theory', 'Tools'],
      skillLevel: 'intermediate-advanced',
      image: '/circle-of-fifths-thumbnail.svg',
      slug: 'circle-of-fifths',
      author: 'Mike Nelson',
      sortOrder: 21
    },
    {
      id: '31',
      title: 'Musical Terms for Guitarists: Complete A-Z Guide',
              excerpt: 'Master essential musical terminology with this comprehensive A-Z guide for guitarists. Learn key terms, definitions, and concepts to enhance your musical understanding.',
      readTime: '15 min read',
      category: 'All',
      primaryCategory: 'Theory',
      categories: ['Theory', 'Getting Started'],
      skillLevel: 'all',
      image: '/musical-terms-thumbnail.svg',
      slug: 'musical-terms-guitarists-guide',
      author: 'Mike Nelson',
      sortOrder: 20
    },
    {
      id: '34',
      title: 'Guitar Arpeggio Exercises',
      excerpt: 'Master arpeggios across the fretboard with focused exercises for major, minor, dominant, diminished, and more. Practice with interactive tabs, audio playback, and clear practice tips—perfect for building fretboard knowledge, finger independence, and musical fluency.',
      readTime: 'Interactive',
      category: 'Intermediate - Advanced',
      primaryCategory: 'Technique',
      categories: ['Technique', 'Tools', 'Tabs'],
      skillLevel: 'intermediate-advanced',
      image: '/Arpeggio Blog Post.png',
      slug: 'guitar-arpeggios-exercises',
      author: 'Mike Nelson',
      sortOrder: 18
    }
  ];

  console.log('POSTS LENGTH:', posts.length, posts.map(p => p.title));

  // Define new lesson topic categories
  const topicCategories = ['All Posts', 'Getting Started', 'Chords', 'Scales and Fretboard', 'Technique', 'Rhythm', 'Gear', 'Theory', 'Tools', 'Tabs'];
  const skillLevels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];

  // Smart display logic for categories
  const getDisplayCategory = (post: any, selectedFilter: string) => {
    if (selectedFilter === 'All Posts') {
      return post.primaryCategory;
    }
    return post.categories.includes(selectedFilter) ? selectedFilter : post.primaryCategory;
  };

  // Filter posts by topic category, skill level, and search query
  const filteredPosts = posts.filter(post => {
    const matchesTopicCategory = selectedTopicCategory === 'All Posts' || post.categories.includes(selectedTopicCategory);
    const matchesSkillLevel = selectedSkillLevel === 'All Levels' || 
                             post.skillLevel === selectedSkillLevel.toLowerCase() || 
                             post.skillLevel === 'all' ||
                             (post.skillLevel === 'intermediate' && selectedSkillLevel === 'Intermediate') ||
                             (post.skillLevel === 'beginner' && selectedSkillLevel === 'Beginner') ||
                             (post.skillLevel === 'advanced' && selectedSkillLevel === 'Advanced') ||
                             (post.skillLevel === 'beginner-intermediate' && (selectedSkillLevel === 'Beginner' || selectedSkillLevel === 'Intermediate')) ||
                             (post.skillLevel === 'beginner-advanced' && (selectedSkillLevel === 'Beginner' || selectedSkillLevel === 'Intermediate' || selectedSkillLevel === 'Advanced')) ||
                             (post.skillLevel === 'intermediate-advanced' && (selectedSkillLevel === 'Intermediate' || selectedSkillLevel === 'Advanced'));
    
    // Search functionality - search through title, excerpt, and categories
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.categories.some(category => category.toLowerCase().includes(searchQuery.toLowerCase())) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesTopicCategory && matchesSkillLevel && matchesSearch;
  });



  // Sort posts by sortOrder and skill level
  const sortedPosts = filteredPosts.sort((a, b) => {
    // First sort by sortOrder (lower numbers first)
    if ((a.sortOrder || 999) !== (b.sortOrder || 999)) {
      return (a.sortOrder || 999) - (b.sortOrder || 999);
    }
    // Then sort by skill level (beginner first)
    const skillOrder = { 'beginner': 1, 'beginner-intermediate': 2, 'intermediate': 3, 'intermediate-advanced': 4, 'advanced': 5, 'all': 6, 'beginner-advanced': 7 };
    return (skillOrder[a.skillLevel as keyof typeof skillOrder] || 999) - (skillOrder[b.skillLevel as keyof typeof skillOrder] || 999);
  });



  const getCategoryColor = (category: string) => {
    // Use different colors only for skill levels
    switch (category) {
      case 'Beginner':
        return 'bg-amber-100 text-amber-800';
      case 'Intermediate':
        return 'bg-orange-100 text-orange-800';
      case 'Advanced':
        return 'bg-amber-200 text-amber-900';
      case 'Beginner - Intermediate':
        return 'bg-gradient-to-r from-amber-100 to-orange-100 text-amber-900';
      case 'Beginner - Advanced':
        return 'bg-gradient-to-r from-amber-100 to-amber-200 text-amber-900';
      case 'Intermediate - Advanced':
        return 'bg-gradient-to-r from-orange-100 to-amber-200 text-amber-900';
      case 'All':
        return 'bg-orange-200 text-orange-900';
      default:
        // All topic categories use amber
        return 'bg-amber-100 text-amber-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-800 to-orange-700 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-3">Guitar Learning Blog</h1>
          <p className="text-lg text-amber-200 max-w-2xl mx-auto mb-4">
            Comprehensive guides and interactive tools for all guitarists
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <button
              onClick={() => setIsQuickRefOpen(true)}
              className="bg-white text-amber-800 px-4 py-2 rounded-lg font-medium hover:bg-amber-50 transition-colors flex items-center gap-2 text-sm"
            >
              <BookOpen className="h-4 w-4" />
              Quick Reference Index
            </button>
            <span className="text-amber-200 text-xs">
              Find specific topics instantly
            </span>
          </div>
        </div>
      </section>

      {/* Hierarchical Filters */}
      <section className="py-4 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-3">
            {/* Search Bar */}
            <div className="relative max-w-md flex items-center">
              <span className="absolute left-0 pl-3 flex items-center h-full pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </span>
              <input
                type="text"
                placeholder="Search blog posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full h-10 pl-10 pr-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors text-sm"
                style={{ boxSizing: 'border-box' }}
              />
              

            </div>

            {/* Topic Category Filter */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-gray-700 font-medium text-sm">Topic:</span>
              <div className="flex flex-wrap gap-1">
                {topicCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedTopicCategory(category)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      selectedTopicCategory === category
                        ? 'bg-amber-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-amber-100 hover:text-amber-700'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Skill Level Filter */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-gray-700 font-medium text-sm">Level:</span>
              <div className="flex flex-wrap gap-1">
                {skillLevels.map((level) => (
                  <button
                    key={level}
                    onClick={() => setSelectedSkillLevel(level)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      selectedSkillLevel === level
                        ? 'bg-orange-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-orange-100 hover:text-orange-700'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-3 text-gray-600 text-xs">
            Showing {sortedPosts.length} of {posts.length} posts
            {(selectedTopicCategory !== 'All Posts' || selectedSkillLevel !== 'All Levels' || searchQuery !== '') && (
              <span>
                {selectedTopicCategory !== 'All Posts' && ` in "${selectedTopicCategory}"`}
                {selectedSkillLevel !== 'All Levels' && ` for "${selectedSkillLevel}"`}
                {searchQuery !== '' && ` matching "${searchQuery}"`}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          {sortedPosts.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <Music className="w-16 h-16 mx-auto mb-4" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No posts found</h3>
              <p className="text-gray-500 mb-6">
                {searchQuery !== '' 
                  ? `No posts found matching "${searchQuery}". Try different search terms or reset filters.`
                  : 'Try selecting different filters or reset to see all posts.'
                }
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => {
                    setSelectedTopicCategory('All Posts');
                    setSelectedSkillLevel('All Levels');
                    setSearchQuery('');
                  }}
                  className="bg-amber-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-amber-700 transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedPosts.map((post) => {
                const displayCategory = getDisplayCategory(post, selectedTopicCategory);
                return (
                  <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                    <article className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                      <div className={`aspect-video relative overflow-hidden ${
                        post.image === '/major-scale-guide.png' 
                          ? 'bg-amber-800' 
                          : post.image.endsWith('.svg')
                          ? 'bg-amber-50'
                          : 'bg-gray-200'
                      }`}>
                        <img
                          src={post.image}
                          alt={post.title}
                          className={`w-full h-full transition-transform duration-300 ${
                            post.image === '/major-scale-guide.png' 
                              ? 'object-contain scale-110 group-hover:scale-115' 
                              : post.image.endsWith('.svg')
                              ? 'object-contain group-hover:scale-105'
                              : 'object-cover group-hover:scale-105'
                          }`}
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`text-xs font-medium px-3 py-1 rounded ${getCategoryColor(displayCategory)}`}>
                              {displayCategory}
                            </span>
                            <span className={`text-xs font-medium px-3 py-1 rounded ${getCategoryColor(post.category === 'All' ? 'All' : post.category)}`}>
                              {post.category === 'All' ? 'All Levels' : post.category}
                            </span>
                          </div>
                          {post.readTime && (
                            <span className="text-gray-500 text-sm flex-shrink-0">{post.readTime}</span>
                          )}
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-amber-600 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">By {post.author}</span>
                          <span className="text-amber-600 font-medium text-sm group-hover:text-amber-700">
                            Read More →
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-amber-800 to-orange-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to start your guitar journey?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/lessons" 
              className="bg-white text-amber-800 px-8 py-3 rounded-lg font-semibold hover:bg-amber-50 transition-colors"
            >
              View Lessons
            </Link>
            <Link 
              href="/contact" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-amber-800 transition-colors"
            >
              Book a Lesson
            </Link>
          </div>
        </div>
      </section>

             {/* Quick Reference Modal */}
       {isQuickRefOpen && (
         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
           <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
             {/* Modal Header */}
             <div className="flex justify-between items-center p-6 border-b">
               <div>
                 <h3 className="text-2xl font-bold text-gray-800">Quick Reference Index</h3>
                 <p className="text-gray-600 mt-1">Find specific topics and jump directly to relevant sections</p>
                 <p className="text-amber-700 text-sm mt-2 italic">Common scales and chords are included below, but many others are available throughout the blog in the chord libraries and Scale Explorer.</p>
               </div>
               <button 
                 onClick={() => {
                   setIsQuickRefOpen(false);
                   setQuickRefSearch('');
                 }} 
                 className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-lg transition-colors"
               >
                 <X className="h-6 w-6" />
               </button>
             </div>

             {/* Search Bar */}
             <div className="p-6 border-b bg-gray-50">
               <div className="relative max-w-md">
                 <span className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                   <Search className="h-5 w-5 text-gray-400" />
                 </span>
                 <input
                   type="text"
                   placeholder="Search topics, descriptions, or categories..."
                   value={quickRefSearch}
                   onChange={(e) => setQuickRefSearch(e.target.value)}
                   className="block w-full h-12 pl-10 pr-4 border border-gray-300 rounded-lg bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                   autoFocus
                 />
               </div>
               {quickRefSearch && (
                 <p className="text-sm text-gray-600 mt-2">
                   Found {filteredTopics.length} topic{filteredTopics.length !== 1 ? 's' : ''}
                 </p>
               )}
             </div>

             {/* Content */}
             <div className="p-6 overflow-y-auto max-h-[60vh]">
               {Object.keys(groupedTopics).length === 0 ? (
                 <div className="text-center py-8">
                   <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                   <p className="text-gray-500 text-lg">No topics found matching "{quickRefSearch}"</p>
                   <p className="text-gray-400 text-sm mt-2">Try different keywords or browse all topics</p>
                 </div>
               ) : (
                 <div key={`search-${quickRefSearch}`} className="grid md:grid-cols-2 gap-8">
                   {Object.entries(groupedTopics).map(([letter, topics]) => (
                     <div key={letter} className="space-y-3">
                       <h4 className="text-xl font-bold text-amber-800 border-b border-amber-200 pb-2">
                         {letter}
                       </h4>
                       <div className="space-y-2">
                         {topics.map((topic) => (
                           <div key={topic.topic} className="group">
                             <Link
                               href={topic.link || '#'}
                               className="block p-3 rounded-lg border border-gray-200 hover:border-amber-300 hover:bg-amber-50 transition-all duration-200"
                               onClick={() => {
                                 setIsQuickRefOpen(false);
                                 setQuickRefSearch('');
                               }}
                             >
                               <div className="flex justify-between items-start">
                                 <div className="flex-1">
                                   <h5 className="font-semibold text-gray-800 group-hover:text-amber-700 transition-colors">
                                     {topic.topic}
                                   </h5>
                                   <p className="text-sm text-gray-600 mt-1">
                                     {topic.description}
                                   </p>
                                 </div>
                                 <span className={`text-xs font-medium px-2 py-1 rounded-full ml-3 flex-shrink-0 ${getCategoryColor(topic.category)}`}>
                                   {topic.category}
                                 </span>
                               </div>
                             </Link>
                           </div>
                         ))}
                       </div>
                     </div>
                   ))}
                 </div>
               )}
             </div>

             {/* Footer */}
             <div className="p-6 border-t bg-gray-50">
               <div className="flex justify-between items-center text-sm text-gray-600">
                 <span>
                   {Object.keys(groupedTopics).length > 0 && (
                     `${Object.values(groupedTopics).flat().length} topics available`
                   )}
                 </span>
                 <span>Press ESC to close</span>
               </div>
             </div>
           </div>
         </div>
       )}
    </div>
  );
}