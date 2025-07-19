'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';

export default function MusicalTermsGuidePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentNavIndex, setCurrentNavIndex] = useState(0);

  // All terms data structure
  const allTerms = useMemo(() => [
    // A section
    { term: 'Accent', definition: 'Emphasis placed on a particular note or beat to make it stand out', section: 'A' },
    { term: 'Accidental', definition: 'A sharp (#), flat (♭), or natural (♮) sign that modifies a note\'s pitch. Sharp raises the pitch, flat lowers it, and natural cancels any previous sharp or flat.', section: 'A' },
    { term: 'Action', definition: 'The distance between the strings and the fretboard; affects playability', section: 'A' },
    { term: 'Alternate Picking', definition: 'Picking technique alternating between downstrokes and upstrokes', section: 'A' },
    { term: 'Arpeggio', definition: 'Playing the notes of a chord in succession rather than simultaneously', section: 'A' },
    { term: 'Articulation', definition: 'The manner in which notes are played (e.g., staccato, legato, accented)', section: 'A' },
    { term: 'Artificial Harmonics (Pinch)', definition: 'Harmonics created by picking a string while simultaneously touching it with the thumb at a specific fret distance', section: 'A' },
    { term: 'Augmented', definition: 'An interval or chord that is raised by a half-step from its major form', section: 'A' },
    { term: 'Augmented Fifth', definition: 'An interval of 8 semitones (e.g., C to G#)', section: 'A' },
    
    // B section
    { term: 'Bar', definition: 'Another term for measure; a segment of music containing a specific number of beats', section: 'B' },
    { term: 'Barre Chord', definition: 'A chord where one finger presses down multiple strings across the same fret', section: 'B' },
    { term: 'Beat', definition: 'The basic unit of time in music; the steady pulse you feel in a song', section: 'B' },
    { term: 'Bend', definition: 'A guitar technique where you push or pull a string to raise its pitch', section: 'B' },
    { term: 'Bend and Release', definition: 'A technique where you bend a string up to a target pitch, then release it back to the original pitch', section: 'B' },
    { term: 'Bridge', definition: 'A section of a song that connects verses and choruses; also the guitar part that holds strings', section: 'B' },
    
    // C section
    { term: 'Capo', definition: 'A device that clamps across the guitar neck to raise the pitch of all strings', section: 'C' },
    { term: 'Chord', definition: 'Three or more notes played simultaneously', section: 'C' },
    { term: 'Chord Tone', definition: 'A note that belongs to a chord (root, third, fifth, etc.)', section: 'C' },
    { term: 'Chromatic', definition: 'Using all twelve pitches within an octave, including sharps and flats', section: 'C' },
    { term: 'Circle of Fifths', definition: 'A visual representation of key signatures and their relationships', section: 'C' },
    { term: 'Comping', definition: 'Accompanying another musician using rhythmic chords', section: 'C' },
    
    // D section
    { term: 'Diatonic', definition: 'Notes or chords that belong to a specific key or scale', section: 'D' },
    { term: 'Diminished', definition: 'An interval or chord that is lowered by a half-step from its minor form', section: 'D' },
    { term: 'Dominant', definition: 'The fifth degree of the major scale; often refers to the V chord in a key', section: 'D' },
    { term: 'Dominant Chord', definition: 'A major chord built on the fifth degree of a scale (V chord), creating tension that resolves to the tonic', section: 'D' },
    { term: 'Dominant Seventh Chord', definition: 'A dominant chord with an added minor seventh (1-3-5-b7), creating strong tension that resolves to the tonic', section: 'D' },
    { term: 'Double Stop', definition: 'Playing two notes simultaneously', section: 'D' },
    { term: 'Drop D Tuning', definition: 'A tuning where the low E string is lowered to D (D-A-D-G-B-E), commonly used in rock, metal, and folk music for easier power chords', section: 'D' },
    { term: 'Drop Tuning', definition: 'Lowering one or more strings below standard pitch', section: 'D' },
    
    // E section
    { term: 'Eighth Note', definition: 'A note that receives half a beat in 4/4 time', section: 'E' },
    { term: 'Enharmonic', definition: 'Two notes that sound the same but are written differently (e.g., C# and Db)', section: 'E' },
    
    // F section
    { term: 'Fingerpicking', definition: 'Playing guitar strings with individual fingers instead of a pick', section: 'F' },
    { term: 'Flat', definition: 'A symbol (♭) that lowers a note by a half-step', section: 'F' },
    { term: 'Fret', definition: 'The metal strips on the guitar neck that divide it into semitones', section: 'F' },
    
    // G section
    { term: 'Gig', definition: 'A live performance or concert', section: 'G' },
    { term: 'Glissando', definition: 'Sliding from one note to another', section: 'G' },
    
    // H section
    { term: 'Half Step', definition: 'The smallest interval in Western music (e.g., C to C#)', section: 'H' },
    { term: 'Hammer-on', definition: 'A technique where you strike a string with a fretting finger to sound a note', section: 'H' },
    { term: 'Harmonic Minor Scale', definition: 'A natural minor scale with a raised 7th degree, creating a more dramatic, exotic sound', section: 'H' },
    { term: 'Harmony', definition: 'The combination of simultaneously sounded musical notes', section: 'H' },
    { term: 'Hybrid Picking', definition: 'Using a pick and fingers simultaneously to pluck notes', section: 'H' },
    
    // I section
    { term: 'Inversion', definition: 'Rearranging chord tones so a note other than the root is in the bass', section: 'I' },
    { term: 'Interval', definition: 'The distance between two notes', section: 'I' },
    { term: 'First Inversion', definition: 'A chord inversion where the third is in the bass instead of the root', section: 'I' },
    { term: 'Second Inversion', definition: 'A chord inversion where the fifth is in the bass instead of the root', section: 'I' },
    { term: 'Third Inversion', definition: 'A chord inversion where the seventh is in the bass instead of the root', section: 'I' },
    
    // J section
    { term: 'Jam', definition: 'An informal musical session where musicians play together', section: 'J' },
    
    // K section
    { term: 'Key', definition: 'The tonal center of a piece of music; determines which notes and chords are used', section: 'K' },
    { term: 'Key Signature', definition: 'Sharps or flats at the beginning of a staff that indicate the key', section: 'K' },
    
    // L section
    { term: 'Legato', definition: 'Playing notes smoothly and connected', section: 'L' },
    { term: 'Lick', definition: 'A short musical phrase or pattern, often used in solos, usually in the higher range of the instrument', section: 'L' },
    
    // M section
    { term: 'Major Chord', definition: 'A chord built with a root, major third, and perfect fifth, creating a bright, happy sound', section: 'M' },
    { term: 'Major Scale', definition: 'A seven-note scale with the pattern whole-whole-half-whole-whole-whole-half', section: 'M' },
    { term: 'Measure', definition: 'A segment of music containing a specific number of beats', section: 'M' },
    { term: 'Melodic Minor Scale', definition: 'The major scale with a minor 3rd (b3), or natural minor with raised 6th and 7th degrees', section: 'M' },
    { term: 'Minor Chord', definition: 'A chord built with a root, minor third, and perfect fifth, creating a darker, sadder sound', section: 'M' },
    { term: 'Mode', definition: 'A variation of a scale starting from a different note', section: 'M' },
    
    // N section
    { term: 'Natural', definition: 'A note that is neither sharp nor flat; also the symbol (♮) that cancels sharps/flats', section: 'N' },
    { term: 'Natural Harmonics', definition: 'Bell-like tones produced by lightly touching strings at specific points', section: 'N' },
    { term: 'Natural Minor Scale', definition: 'A seven-note scale with the pattern whole-half-whole-whole-half-whole-whole, also called the Aeolian mode', section: 'N' },
    
    // O section
    { term: 'Octave', definition: 'The interval between two notes with the same name, one higher than the other', section: 'O' },
    { term: 'Open Chord', definition: 'A chord that includes one or more open (unfretted) strings', section: 'O' },
    { term: 'Open Tunings', definition: 'Alternative tunings where the open strings form a chord', section: 'O' },
    
    // P section
    { term: 'Palm Muting', definition: 'A technique where you lightly rest your palm on the strings near the bridge to create a muted sound', section: 'P' },
    { term: 'Pedal Point', definition: 'A sustained note, usually in the bass, while harmonies change above it', section: 'P' },
    { term: 'Pentatonic', definition: 'A five-note scale commonly used in many styles of music', section: 'P' },
    { term: 'Perfect Fifth', definition: 'An interval of 7 semitones (e.g., C to G)', section: 'P' },
    { term: 'Perfect Fourth', definition: 'An interval of 5 semitones (e.g., C to F)', section: 'P' },
    { term: 'Pickup', definition: 'A device that converts string vibrations into electrical signals', section: 'P' },
    { term: 'Pitch', definition: 'How high or low a note sounds', section: 'P' },
    { term: 'Pre Bend', definition: 'A technique where you bend a string before picking it, then release it to the original pitch', section: 'P' },
    { term: 'Pull-off', definition: 'A technique where you pull a finger off a string to sound a lower note', section: 'P' },
    
    // Q section
    { term: 'Quarter Note', definition: 'A note that receives one beat in 4/4 time', section: 'Q' },
    
    // R section
    { term: 'Rhythm', definition: 'The pattern of beats and accents in music', section: 'R' },
    { term: 'Root', definition: 'The fundamental note of a chord or scale', section: 'R' },
    
    // S section
    { term: 'Scale', definition: 'A specific pattern of intervals that creates a musical framework, typically spanning an octave', section: 'S' },
    { term: 'Selective Picking', definition: 'A guitar technique that combines pick strokes with left-hand hammer-ons and pull-offs to create fluid phrases where only certain notes are actually picked while others are produced by fretting hand techniques', section: 'S' },
    { term: 'Sharp', definition: 'A symbol (#) that raises a note by a half-step', section: 'S' },
    { term: 'Slide', definition: 'A technique where you slide your finger from one fret to another', section: 'S' },
    { term: 'Standard Tuning', definition: 'The standard guitar tuning: E-A-D-G-B-E (low to high)', section: 'S' },
    { term: 'Staccato', definition: 'Playing notes short and detached', section: 'S' },
    { term: 'Sweep Picking', definition: 'A technique where you sweep the pick across multiple strings in one motion', section: 'S' },
    
    // T section
    { term: 'Tempo', definition: 'The speed of the music, measured in beats per minute (BPM)', section: 'T' },
    { term: 'Tone', definition: 'The quality or character of a sound', section: 'T' },
    { term: 'Tonic', definition: 'The first degree of a scale; the home note of a key', section: 'T' },
    { term: 'Tremolo', definition: 'Rapid repetition of a single note', section: 'T' },
    { term: 'Triad', definition: 'A three-note chord consisting of a root, third, and fifth', section: 'T' },
    { term: 'Tuning', definition: 'The pitch of each string on the guitar', section: 'T' },
    
    // U section
    { term: 'Unison', definition: 'Two or more notes of the same pitch played together', section: 'U' },
    
    // V section
    { term: 'Vibrato', definition: 'A slight variation in pitch created by moving the finger back and forth', section: 'V' },
    
    // W section
    { term: 'Whole Step', definition: 'An interval of two half steps (e.g., C to D)', section: 'W' },
  ], []);

  // Filter terms based on search
  const filteredTerms = useMemo(() => {
    if (!searchTerm.trim()) return allTerms;
    
    const searchLower = searchTerm.toLowerCase();
    return allTerms.filter(term => 
      term.term.toLowerCase().includes(searchLower) ||
      term.definition.toLowerCase().includes(searchLower)
    );
  }, [allTerms, searchTerm]);

  // Group filtered terms by section
  const groupedTerms = useMemo(() => {
    const grouped: { [key: string]: typeof allTerms } = {};
    filteredTerms.forEach(term => {
      if (!grouped[term.section]) {
        grouped[term.section] = [];
      }
      grouped[term.section].push(term);
    });
    return grouped;
  }, [filteredTerms]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-amber-800 mb-4">
            Musical Terms for Guitarists
          </h1>
          <p className="text-xl text-amber-700 max-w-3xl mx-auto">
            A comprehensive A-Z guide to essential musical terminology that every guitarist should know. 
            Master the language of music and enhance understanding of guitar playing.
          </p>
        </div>

        {/* Introduction */}
        <div className="bg-white rounded-xl p-8 mb-8 shadow-lg">
          <h2 className="text-2xl font-bold text-amber-800 mb-4">Why Learn Musical Terms?</h2>
          <p className="text-gray-700 mb-4">
            Understanding musical terminology is crucial for any guitarist who wants to communicate effectively 
            with other musicians, read music notation, and deepen their theoretical knowledge. This guide covers 
            essential terms from basic concepts to advanced theory, all explained in the context of guitar playing.
          </p>
          <p className="text-gray-700">
            Whether you're a beginner learning first chords or an advanced player exploring complex theory, 
            this reference will help you navigate the language of music with confidence.
          </p>
        </div>

        {/* Quick Navigation */}
        <div className="bg-white rounded-xl p-6 mb-8 shadow-lg">
          <h3 className="text-xl font-bold text-amber-800 mb-4">Quick Navigation</h3>
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={() => {
                const currentIndex = Math.floor((currentNavIndex - 1) / 4) * 4;
                setCurrentNavIndex(Math.max(0, currentIndex - 4));
              }}
              disabled={currentNavIndex <= 3}
              className="p-2 text-amber-600 hover:text-amber-800 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <div className="flex space-x-2">
              {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X'].slice(currentNavIndex, currentNavIndex + 4).map(letter => (
                <a
                  key={letter}
                  href={`#${letter}`}
                  className="text-center py-2 px-4 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-lg transition-colors font-semibold"
                >
                  {letter}
                </a>
              ))}
            </div>
            
            <button
              onClick={() => {
                const nextIndex = currentNavIndex + 4;
                if (nextIndex < 24) {
                  setCurrentNavIndex(nextIndex);
                }
              }}
              disabled={currentNavIndex >= 20}
              className="p-2 text-amber-600 hover:text-amber-800 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl p-6 mb-8 shadow-lg">
          <div className="max-w-2xl mx-auto">
            <label htmlFor="search" className="block text-lg font-semibold text-amber-800 mb-3">
              Search Terms
            </label>
            <input
              type="text"
              id="search"
              placeholder="Search by term name or definition..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-gray-700 placeholder-gray-500"
            />
            {searchTerm && (
              <p className="text-sm text-gray-600 mt-2">
                Found {filteredTerms.length} result{filteredTerms.length !== 1 ? 's' : ''}
              </p>
            )}
          </div>
        </div>

        {/* Terms Dictionary */}
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-amber-800 mb-8 text-center">
            {searchTerm ? 'Search Results' : 'Musical Terms Index'}
          </h2>

          {Object.keys(groupedTerms).length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No terms found matching "{searchTerm}"</p>
            </div>
          ) : (
            Object.keys(groupedTerms).sort().map(section => (
              <div key={section} id={section} className="mb-12">
                <h3 className="text-2xl font-bold text-amber-700 mb-4 border-b-2 border-amber-200 pb-2">
                  {section}
                </h3>
                
                <div className="space-y-4">
                  {groupedTerms[section].map((term: any, index: number) => (
                    <div key={`${section}-${index}`} className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-bold text-gray-800">{term.term}</h4>
                      <p className="text-gray-700">{term.definition}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>


      </div>
    </div>
  );
} 