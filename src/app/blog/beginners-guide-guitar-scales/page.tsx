import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Beginner's Guide to Guitar Scales - Start with One String | Mike Nelson Guitar Lessons",
  description: "Learn guitar scales the easy way - start by understanding scales along one string before moving to complex fretboard patterns. Simple, practical approach for beginners.",
  keywords: "guitar scales, beginner guitar theory, one string scales, C major scale, guitar notes, music theory, learn guitar scales",
  openGraph: {
    title: "Beginner's Guide to Guitar Scales - Start with One String",
    description: "Learn guitar scales the easy way - start by understanding scales along one string before moving to complex fretboard patterns. Perfect for beginners.",
    type: 'article',
    images: [
      {
        url: '/beginners-guide-scales-thumbnail.svg',
        width: 1200,
        height: 630,
        alt: 'Beginner Guitar Scales Guide'
      }
    ]
  }
};

export default function BeginnersGuideGuitarScales() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm">
        <Link href="/" className="text-blue-600 hover:underline">Home</Link>
        <span className="mx-2 text-gray-500">›</span>
        <Link href="/blog" className="text-blue-600 hover:underline">Blog</Link>
        <span className="mx-2 text-gray-500">›</span>
        <span className="text-gray-700">Beginner's Guide to Guitar Scales</span>
      </nav>

      <article className="prose prose-lg max-w-none">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4 text-amber-600">
            A Beginner's Guide to Guitar Scales: Start with One String
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Learn scales the simple way - start with one string and build from there
          </p>
        </header>

        {/* Introduction */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
          <p className="text-lg font-medium text-blue-900 mb-2">
            🎸 The Easiest Way to Learn Scales
          </p>
          <p className="text-blue-800">
            Forget complex fretboard patterns for now. The simplest way to understand scales on guitar is to learn them along one string first. Once you understand how scales work on a single string, everything else becomes much clearer.
          </p>
        </div>

        {/* Section 1: What Are Notes? */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-amber-600">1. The 12 Notes in Music</h2>
          
          <p className="text-lg mb-6">
            Music uses <strong>12 different notes</strong> that repeat over and over at different pitches. These are:
          </p>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-xl border-2 border-blue-200 mb-6">
            <h4 className="text-xl font-semibold text-center mb-6 text-amber-700">The Complete Chromatic Scale</h4>
            
            {/* Visual chromatic scale with colors - Starting from C */}
            <div className="mb-6 overflow-x-auto mobile-scroll-hint">
              <h5 className="text-center font-medium mb-3 text-gray-700">Starting from C:</h5>
              <div className="flex items-center gap-1 mb-2 min-w-max justify-center">
                {[
                  {note: 'C', color: 'bg-red-400', natural: true},
                  {note: 'C#', color: 'bg-red-300', natural: false},
                  {note: 'D', color: 'bg-orange-400', natural: true},
                  {note: 'D#', color: 'bg-orange-300', natural: false},
                  {note: 'E', color: 'bg-yellow-400', natural: true},
                  {note: 'F', color: 'bg-green-400', natural: true},
                  {note: 'F#', color: 'bg-green-300', natural: false},
                  {note: 'G', color: 'bg-blue-400', natural: true},
                  {note: 'G#', color: 'bg-blue-300', natural: false},
                  {note: 'A', color: 'bg-purple-400', natural: true},
                  {note: 'A#', color: 'bg-purple-300', natural: false},
                  {note: 'B', color: 'bg-pink-400', natural: true}
                ].map((noteObj, index) => (
                  <React.Fragment key={index}>
                    <div className="flex flex-col items-center">
                      <div 
                        className={`w-8 h-8 ${noteObj.color} rounded-full flex items-center justify-center text-white font-bold text-xs shadow-md border ${noteObj.natural ? 'border-gray-700' : 'border-gray-500'}`}
                      >
                        {noteObj.note}
                      </div>
                      <div className="text-xs mt-1 text-gray-500 font-medium">
                        {index}
                      </div>
                    </div>
                    {index < 11 && (
                      <div className="flex items-center">
                        <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    )}
                  </React.Fragment>
                ))}
                <div className="flex items-center ml-2">
                  <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <div className="flex flex-col items-center ml-1">
                  <div className="w-8 h-8 bg-red-400 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-md border border-gray-700">
                    C
                  </div>
                  <div className="text-xs mt-1 text-gray-500 font-medium">12</div>
                </div>
              </div>
            </div>

            {/* Visual chromatic scale - Starting from A */}
            <div className="mb-4 overflow-x-auto mobile-scroll-hint">
              <h5 className="text-center font-medium mb-3 text-gray-700">Starting from A (same pattern):</h5>
              <div className="flex items-center gap-1 mb-2 min-w-max justify-center">
                {[
                  {note: 'A', color: 'bg-purple-400', natural: true},
                  {note: 'A#', color: 'bg-purple-300', natural: false},
                  {note: 'B', color: 'bg-pink-400', natural: true},
                  {note: 'C', color: 'bg-red-400', natural: true},
                  {note: 'C#', color: 'bg-red-300', natural: false},
                  {note: 'D', color: 'bg-orange-400', natural: true},
                  {note: 'D#', color: 'bg-orange-300', natural: false},
                  {note: 'E', color: 'bg-yellow-400', natural: true},
                  {note: 'F', color: 'bg-green-400', natural: true},
                  {note: 'F#', color: 'bg-green-300', natural: false},
                  {note: 'G', color: 'bg-blue-400', natural: true},
                  {note: 'G#', color: 'bg-blue-300', natural: false}
                ].map((noteObj, index) => (
                  <React.Fragment key={index}>
                    <div className="flex flex-col items-center">
                      <div 
                        className={`w-8 h-8 ${noteObj.color} rounded-full flex items-center justify-center text-white font-bold text-xs shadow-md border ${noteObj.natural ? 'border-gray-700' : 'border-gray-500'}`}
                      >
                        {noteObj.note}
                      </div>
                      <div className="text-xs mt-1 text-gray-500 font-medium">
                        {index}
                      </div>
                    </div>
                    {index < 11 && (
                      <div className="flex items-center">
                        <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    )}
                  </React.Fragment>
                ))}
                <div className="flex items-center ml-2">
                  <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <div className="flex flex-col items-center ml-1">
                  <div className="w-8 h-8 bg-purple-400 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-md border border-gray-700">
                    A
                  </div>
                  <div className="text-xs mt-1 text-gray-500 font-medium">12</div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-lg font-semibold text-amber-700">
                1 fret = 1 half step (also called a semitone)
              </p>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
            <h4 className="font-semibold mb-2">🎯 Key Point: Natural Half-Steps</h4>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>B to C</strong> = 1 fret (no note between them)</li>
              <li><strong>E to F</strong> = 1 fret (no note between them)</li>
              <li>All other notes = 2 frets apart</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold mb-4">How This Works on Guitar</h3>
          <p className="mb-4">
            Each fret on your guitar represents one of these 12 notes. When you move up one fret, you move to the next note in the sequence. This is why learning scales on guitar becomes manageable - you're just following patterns of fret distances along the strings.
          </p>
          
          <p className="mb-6">
            The beauty of guitar is that once you learn a scale pattern on one string, you can move that same pattern to any other string to play the scale in a different key. This consistency makes guitar scales much easier to learn than you might think.
          </p>
        </section>

        {/* Section 2: What Is A Scale? */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-amber-600">2. What Is A Scale?</h2>
          
          <p className="text-lg mb-6">
            A <strong>scale</strong> is a selection of notes from the 12 available notes that work well together musically. Instead of using all 12 notes, we pick specific ones that create a particular sound or mood.
          </p>

          <h3 className="text-xl font-semibold mb-4">Scale Formulas</h3>
          <p className="mb-4">
            Scales are built using specific patterns of intervals (distances between notes). Each scale type has its own formula.
          </p>

          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h4 className="font-semibold mb-3">Major Scale Formula</h4>
            <p className="mb-2"><strong>Pattern:</strong> 2-2-1-2-2-2-1 (frets between each note)</p>
            <p className="text-sm text-gray-600">This means: whole step, whole step, half step, whole step, whole step, whole step, half step</p>
          </div>
        </section>

        {/* Section 3: Learn Scales on One String */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-amber-600">3. Learn Scales on One String First</h2>

          <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-8">
            <h3 className="text-xl font-semibold mb-3 text-green-900">🎯 Why Start with One String?</h3>
            <ul className="list-disc list-inside text-green-800 space-y-2">
              <li>No confusion about string-to-string relationships</li>
              <li>Easy to see the interval patterns</li>
              <li>Simple to visualize and remember</li>
              <li>Builds a solid foundation for understanding scales</li>
            </ul>
          </div>

          {/* C Major on Low E String */}
          <div className="mb-10">
            <h3 className="text-2xl font-semibold mb-4">C Major Scale on the A String</h3>
            <p className="mb-4">
              Let's learn the C Major scale starting from the 3rd fret of the A string (which is a C note).
            </p>

            {/* Visual diagram */}
            <div className="bg-white border-2 border-gray-300 p-6 rounded-lg mb-6 overflow-x-auto mobile-scroll-hint">
              <h4 className="font-semibold mb-8 text-center">C Major Scale - A String Visual</h4>
              
              <div className="min-w-max pt-2">
                {/* String representation */}
                <div className="flex items-center mb-4">
                  <div className="w-16 text-right pr-4 font-medium">A:</div>
                  
                                     {/* Frets 3-15 */}
                   {Array.from({length: 13}, (_, i) => {
                     const fret = i + 3;
                     const isScaleNote = [3, 5, 7, 8, 10, 12, 14, 15].includes(fret);
                     const noteNames: {[key: number]: string} = {3: 'C', 5: 'D', 7: 'E', 8: 'F', 10: 'G', 12: 'A', 14: 'B', 15: 'C'};
                     const intervals: {[key: number]: string} = {3: '1', 5: '2', 7: '3', 8: '4', 10: '5', 12: '6', 14: '7', 15: '1'};
                    
                    return (
                      <div key={fret} className="relative">
                        <div 
                          className={`w-12 h-12 border-2 flex items-center justify-center text-sm font-bold
                            ${isScaleNote 
                              ? 'bg-blue-200 border-blue-500 text-blue-900' 
                              : 'bg-gray-100 border-gray-300 text-gray-400'
                            }`}
                        >
                          {isScaleNote ? noteNames[fret] : '•'}
                        </div>
                        
                        {/* Fret numbers below */}
                        <div className="text-xs text-center mt-1 text-gray-600">
                          {fret}
                        </div>
                        
                        {                        /* Interval numbers above for scale notes */}
                      </div>
                    );
                  })}
                </div>

                {/* Pattern visualization */}
                <div className="mt-6 pt-4 border-t border-gray-300">
                  <h5 className="font-medium mb-3">Fret Distance Pattern:</h5>
                  <div className="flex items-center justify-center space-x-2 text-sm">
                    <span className="bg-blue-100 px-2 py-1 rounded">C</span>
                    <span className="text-gray-600">+2</span>
                    <span className="bg-blue-100 px-2 py-1 rounded">D</span>
                    <span className="text-gray-600">+2</span>
                    <span className="bg-blue-100 px-2 py-1 rounded">E</span>
                    <span className="text-gray-600">+1</span>
                    <span className="bg-blue-100 px-2 py-1 rounded">F</span>
                    <span className="text-gray-600">+2</span>
                    <span className="bg-blue-100 px-2 py-1 rounded">G</span>
                    <span className="text-gray-600">+2</span>
                    <span className="bg-blue-100 px-2 py-1 rounded">A</span>
                    <span className="text-gray-600">+2</span>
                    <span className="bg-blue-100 px-2 py-1 rounded">B</span>
                    <span className="text-gray-600">+1</span>
                    <span className="bg-blue-100 px-2 py-1 rounded">C</span>
                  </div>
                  <p className="text-center text-sm text-gray-600 mt-2">
                    Pattern: <strong>2-2-1-2-2-2-1</strong> (whole-whole-half-whole-whole-whole-half)
                  </p>
                </div>
              </div>
            </div>



            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <h4 className="font-semibold mb-2">🎵 Try This</h4>
              <p className="text-sm">
                Play each fret slowly and listen to how the scale sounds. Notice how it feels "complete" when you reach the C at the 15th fret - that's the octave.
              </p>
            </div>
          </div>

          {/* G Major on Low E String */}
          <div className="mb-10">
            <h3 className="text-2xl font-semibold mb-4">G Major Scale on the Low E String</h3>
            <p className="mb-4">
              Now let's try G Major using the same pattern, but starting from the 3rd fret (G note).
            </p>

            {/* Visual diagram */}
            <div className="bg-white border-2 border-gray-300 p-6 rounded-lg mb-6 overflow-x-auto mobile-scroll-hint">
              <h4 className="font-semibold mb-8 text-center">G Major Scale - Low E String Visual</h4>
              
              <div className="min-w-max pt-2">
                {/* String representation */}
                <div className="flex items-center mb-4">
                  <div className="w-16 text-right pr-4 font-medium">Low E:</div>
                  
                  {/* Frets 3-15 */}
                  {Array.from({length: 13}, (_, i) => {
                    const fret = i + 3;
                    const isScaleNote = [3, 5, 7, 8, 10, 12, 14, 15].includes(fret);
                    const noteNames: {[key: number]: string} = {3: 'G', 5: 'A', 7: 'B', 8: 'C', 10: 'D', 12: 'E', 14: 'F#', 15: 'G'};
                    const intervals: {[key: number]: string} = {3: '1', 5: '2', 7: '3', 8: '4', 10: '5', 12: '6', 14: '7', 15: '1'};
                    
                    return (
                      <div key={fret} className="relative">
                        <div 
                          className={`w-12 h-12 border-2 flex items-center justify-center text-sm font-bold
                            ${isScaleNote 
                              ? 'bg-green-200 border-green-500 text-green-900' 
                              : 'bg-gray-100 border-gray-300 text-gray-400'
                            }`}
                        >
                          {isScaleNote ? noteNames[fret] : '•'}
                        </div>
                        
                        {/* Fret numbers below */}
                        <div className="text-xs text-center mt-1 text-gray-600">
                          {fret}
                        </div>
                        
                        {                        /* Interval numbers above for scale notes */}
                      </div>
                    );
                  })}
                </div>

                {/* Pattern visualization */}
                <div className="mt-6 pt-4 border-t border-gray-300">
                  <h5 className="font-medium mb-3">Fret Distance Pattern:</h5>
                  <div className="flex items-center justify-center space-x-2 text-sm">
                    <span className="bg-green-100 px-2 py-1 rounded">G</span>
                    <span className="text-gray-600">+2</span>
                    <span className="bg-green-100 px-2 py-1 rounded">A</span>
                    <span className="text-gray-600">+2</span>
                    <span className="bg-green-100 px-2 py-1 rounded">B</span>
                    <span className="text-gray-600">+1</span>
                    <span className="bg-green-100 px-2 py-1 rounded">C</span>
                    <span className="text-gray-600">+2</span>
                    <span className="bg-green-100 px-2 py-1 rounded">D</span>
                    <span className="text-gray-600">+2</span>
                    <span className="bg-green-100 px-2 py-1 rounded">E</span>
                    <span className="text-gray-600">+2</span>
                    <span className="bg-green-100 px-2 py-1 rounded">F#</span>
                    <span className="text-gray-600">+1</span>
                    <span className="bg-green-100 px-2 py-1 rounded">G</span>
                  </div>
                  <p className="text-center text-sm text-gray-600 mt-2">
                    Same pattern: <strong>2-2-1-2-2-2-1</strong> (but notice F# instead of F)
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
              <h4 className="font-semibold mb-2">💡 Key Insight</h4>
              <p>
                Notice that G Major has one sharp (F#) while C Major has none. The pattern stays the same, but the actual notes change when you start from a different root note.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Essential Scales */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-amber-600">4. Pentatonic Scales</h2>

          {/* Pentatonic Scale */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-4">Major Pentatonic Scale</h3>
            <div className="bg-purple-50 p-4 rounded-lg mb-4">
              <p><strong>Formula:</strong> 2-2-3-2-3 (only 5 notes instead of 7)</p>
              <p><strong>Sound:</strong> Universal, safe, open</p>
              <p><strong>Use:</strong> Country, rock, world music</p>
              <p className="mt-2"><strong>Key insight:</strong> Pentatonic scales are simply major scales with two notes removed, making them easier to play and more versatile.</p>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6">
              <h4 className="font-semibold mb-2">🔗 Connection to Major Scale</h4>
              <p className="text-sm">
                C Major Pentatonic comes from the C Major scale by removing the 4th (F) and 7th (B) notes. This leaves you with: C-D-E-G-A-C. Compare the diagrams below to see which notes are skipped!
              </p>
            </div>

            {/* C Major Scale for comparison */}
            <div className="bg-white border-2 border-gray-300 p-6 rounded-lg mb-6 overflow-x-auto mobile-scroll-hint">
              <h4 className="font-semibold mb-8 text-center">C Major Scale (Complete) - Low E String</h4>
              
              <div className="min-w-max pt-2">
                {/* String representation */}
                <div className="flex items-center mb-4">
                  <div className="w-16 text-right pr-4 font-medium">Low E:</div>
                  
                  {/* Frets 8-20 */}
                  {Array.from({length: 13}, (_, i) => {
                    const fret = i + 8;
                    const isScaleNote = [8, 10, 12, 13, 15, 17, 19, 20].includes(fret);
                    const noteNames: {[key: number]: string} = {8: 'C', 10: 'D', 12: 'E', 13: 'F', 15: 'G', 17: 'A', 19: 'B', 20: 'C'};
                    const intervals: {[key: number]: string} = {8: '1', 10: '2', 12: '3', 13: '4', 15: '5', 17: '6', 19: '7', 20: '1'};
                    
                    return (
                      <div key={fret} className="relative">
                        <div 
                          className={`w-12 h-12 border-2 flex items-center justify-center text-sm font-bold
                            ${isScaleNote 
                              ? 'bg-blue-200 border-blue-500 text-blue-900' 
                              : 'bg-gray-100 border-gray-300 text-gray-400'
                            }`}
                        >
                          {isScaleNote ? noteNames[fret] : '•'}
                        </div>
                        
                        {/* Fret numbers below */}
                        <div className="text-xs text-center mt-1 text-gray-600">
                          {fret}
                        </div>
                        
                        {                        /* Interval numbers above for scale notes */}
                      </div>
                    );
                  })}
                </div>

                {/* Pattern visualization */}
                <div className="mt-6 pt-4 border-t border-gray-300">
                  <h5 className="font-medium mb-3">Complete C Major Scale:</h5>
                  <div className="flex items-center justify-center space-x-2 text-sm">
                    <span className="bg-blue-100 px-2 py-1 rounded">C</span>
                    <span className="text-gray-600">+2</span>
                    <span className="bg-blue-100 px-2 py-1 rounded">D</span>
                    <span className="text-gray-600">+2</span>
                    <span className="bg-blue-100 px-2 py-1 rounded">E</span>
                    <span className="text-gray-600">+1</span>
                    <span className="bg-red-100 px-2 py-1 rounded border-2 border-red-400">F</span>
                    <span className="text-gray-600">+2</span>
                    <span className="bg-blue-100 px-2 py-1 rounded">G</span>
                    <span className="text-gray-600">+2</span>
                    <span className="bg-blue-100 px-2 py-1 rounded">A</span>
                    <span className="text-gray-600">+2</span>
                    <span className="bg-red-100 px-2 py-1 rounded border-2 border-red-400">B</span>
                    <span className="text-gray-600">+1</span>
                    <span className="bg-blue-100 px-2 py-1 rounded">C</span>
                  </div>
                  <p className="text-center text-sm text-gray-600 mt-2">
                    All 7 notes: <strong>C-D-E-F-G-A-B-C</strong> (F and B highlighted in red will be removed for pentatonic)
                  </p>
                </div>
              </div>
            </div>

            {/* Visual diagram */}
            <div className="bg-white border-2 border-gray-300 p-6 rounded-lg mb-6 overflow-x-auto mobile-scroll-hint">
              <h4 className="font-semibold mb-8 text-center">C Major Pentatonic Scale (Simplified) - Low E String</h4>
              
              <div className="min-w-max pt-2">
                {/* String representation */}
                <div className="flex items-center mb-4">
                  <div className="w-16 text-right pr-4 font-medium">Low E:</div>
                  
                  {/* Frets 8-20 */}
                  {Array.from({length: 13}, (_, i) => {
                    const fret = i + 8;
                    const isScaleNote = [8, 10, 12, 15, 17, 20].includes(fret);
                    const noteNames: {[key: number]: string} = {8: 'C', 10: 'D', 12: 'E', 15: 'G', 17: 'A', 20: 'C'};
                    const intervals: {[key: number]: string} = {8: '1', 10: '2', 12: '3', 15: '5', 17: '6', 20: '1'};
                    
                    return (
                      <div key={fret} className="relative">
                        <div 
                          className={`w-12 h-12 border-2 flex items-center justify-center text-sm font-bold
                            ${isScaleNote 
                              ? 'bg-purple-200 border-purple-500 text-purple-900' 
                              : 'bg-gray-100 border-gray-300 text-gray-400'
                            }`}
                        >
                          {isScaleNote ? noteNames[fret] : '•'}
                        </div>
                        
                        {/* Fret numbers below */}
                        <div className="text-xs text-center mt-1 text-gray-600">
                          {fret}
                        </div>
                        
                        {                        /* Interval numbers above for scale notes */}
                      </div>
                    );
                  })}
                </div>

                {/* Pattern visualization */}
                <div className="mt-6 pt-4 border-t border-gray-300">
                  <h5 className="font-medium mb-3">Fret Distance Pattern:</h5>
                  <div className="flex items-center justify-center space-x-2 text-sm">
                    <span className="bg-purple-100 px-2 py-1 rounded">C</span>
                    <span className="text-gray-600">+2</span>
                    <span className="bg-purple-100 px-2 py-1 rounded">D</span>
                    <span className="text-gray-600">+2</span>
                    <span className="bg-purple-100 px-2 py-1 rounded">E</span>
                    <span className="text-gray-600">+3</span>
                    <span className="bg-purple-100 px-2 py-1 rounded">G</span>
                    <span className="text-gray-600">+2</span>
                    <span className="bg-purple-100 px-2 py-1 rounded">A</span>
                    <span className="text-gray-600">+3</span>
                    <span className="bg-purple-100 px-2 py-1 rounded">C</span>
                  </div>
                  <p className="text-center text-sm text-gray-600 mt-2">
                    Pentatonic pattern: <strong>2-2-3-2-3</strong> (5 notes - skips F and B)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Next Steps */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-amber-600">5. Building From One String</h2>

          <p className="text-lg mb-6">
            Once you're comfortable with scales on one string, you can start expanding to other strings and eventually learn full fretboard patterns.
          </p>

          <div className="space-y-6">
            <div className="bg-green-50 border-l-4 border-green-500 p-6">
              <h3 className="text-xl font-semibold mb-3 text-green-900">🎸 Next Steps</h3>
              <ol className="list-decimal list-inside text-green-800 space-y-2">
                <li>Master one scale on one string completely</li>
                <li>Learn the same scale on different strings</li>
                <li>Start connecting notes across strings</li>
                <li>Explore our Scale Explorer tool for visual patterns</li>
                <li>Practice improvising using just the notes you know</li>
              </ol>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <h4 className="font-semibold mb-2">🔍 Try the Scale Explorer</h4>
              <p className="text-sm">
                Ready to see these scales across the entire fretboard? Check out our <Link href="/scale-explorer/index.html" className="text-blue-600 hover:underline">Scale Explorer</Link> tool to visualize how the patterns connect across all strings.
              </p>
            </div>
          </div>
        </section>

        {/* Conclusion */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-amber-600">Remember: Start Simple</h2>

          <p className="text-lg mb-6">
            Learning scales doesn't have to be overwhelming. By starting with one string, you build a solid understanding of how scales work before tackling complex fretboard patterns.
          </p>

          <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 mb-8">
            <h4 className="text-lg font-semibold text-brown-700 mb-3">Ready to Explore More?</h4>
            <p className="mb-4">
              Want to understand why guitar strings are tuned the way they are? This knowledge will help you understand how scales connect across the fretboard.
            </p>
            <Link 
              href="/blog/understanding-guitar-fretboard" 
              className="inline-block bg-brown-600 text-white px-6 py-3 rounded-lg hover:bg-brown-700 transition-colors"
            >
              Learn About Guitar Tuning →
            </Link>
          </div>
        </section>
      </article>
    </div>
  );
} 