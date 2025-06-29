'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function UnderstandingGuitarFretboard() {
  const [showMathModal, setShowMathModal] = useState(false);
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <div className="container mx-auto px-6 py-12">
        <article className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            <h1 className="text-4xl font-bold text-amber-800 mb-6">
              Understanding the Guitar Fretboard: Why Strings Are Tuned This Way
            </h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Ever wondered why the guitar is tuned to E-A-D-G-B-E? 
                This visual guide reveals the logic behind guitar tuning and helps you understand how notes 
                relate across the fretboard.
              </p>

              {/* Table of Contents */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6 mb-8 shadow-sm">
                <h2 className="text-2xl font-bold text-amber-800 mb-6 flex items-center">
                  <div className="w-8 h-8 bg-amber-600 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                  </div>
                  Table of Contents
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <a href="#beginners" className="group flex items-center p-3 bg-white rounded-lg shadow-sm hover:shadow-md hover:bg-amber-50 transition-all duration-200 border border-transparent hover:border-amber-200">
                      <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-amber-200 transition-colors">
                        <span className="text-amber-700 font-bold">🎸</span>
                      </div>
                      <div>
                        <div className="font-semibold text-amber-800 group-hover:text-amber-900">Answer for Beginners</div>
                        <div className="text-xs text-amber-600">Quick explanation for new players</div>
                      </div>
                    </a>
                    <a href="#fretboard-diagram" className="group flex items-center p-3 bg-white rounded-lg shadow-sm hover:shadow-md hover:bg-amber-50 transition-all duration-200 border border-transparent hover:border-amber-200">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-200 transition-colors">
                        <span className="text-blue-700 font-bold">🎵</span>
                      </div>
                      <div>
                        <div className="font-semibold text-amber-800 group-hover:text-amber-900">Visual Fretboard Diagram</div>
                        <div className="text-xs text-amber-600">Interactive pitch visualization</div>
                      </div>
                    </a>
                    <a href="#systematic-analysis" className="group flex items-center p-3 bg-white rounded-lg shadow-sm hover:shadow-md hover:bg-amber-50 transition-all duration-200 border border-transparent hover:border-amber-200">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-purple-200 transition-colors">
                        <span className="text-purple-700 font-bold">📚</span>
                      </div>
                      <div>
                        <div className="font-semibold text-amber-800 group-hover:text-amber-900">Historical Context</div>
                        <div className="text-xs text-amber-600">Systematic analysis and origins</div>
                      </div>
                    </a>
                    <a href="#core-constraints" className="group flex items-center p-3 bg-white rounded-lg shadow-sm hover:shadow-md hover:bg-amber-50 transition-all duration-200 border border-transparent hover:border-amber-200">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-gray-200 transition-colors">
                        <span className="text-gray-700 font-bold">⚙️</span>
                      </div>
                      <div>
                        <div className="font-semibold text-amber-800 group-hover:text-amber-900">Core Constraints</div>
                        <div className="text-xs text-amber-600">Fundamental design principles</div>
                      </div>
                    </a>
                  </div>
                  <div className="space-y-3">
                    <a href="#mental-constraint" className="group flex items-center p-3 bg-white rounded-lg shadow-sm hover:shadow-md hover:bg-amber-50 transition-all duration-200 border border-transparent hover:border-amber-200">
                      <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-pink-200 transition-colors">
                        <span className="text-pink-700 font-bold">🧠</span>
                      </div>
                      <div>
                        <div className="font-semibold text-amber-800 group-hover:text-amber-900">Mental Constraint</div>
                        <div className="text-xs text-amber-600">Cognitive considerations</div>
                      </div>
                    </a>
                    <a href="#physical-foundation" className="group flex items-center p-3 bg-white rounded-lg shadow-sm hover:shadow-md hover:bg-amber-50 transition-all duration-200 border border-transparent hover:border-amber-200">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-green-200 transition-colors">
                        <span className="text-green-700 font-bold">🤲</span>
                      </div>
                      <div>
                        <div className="font-semibold text-amber-800 group-hover:text-amber-900">Physical Constraint</div>
                        <div className="text-xs text-amber-600">Hand ergonomics</div>
                      </div>
                    </a>
                    <a href="#chordal-constraint" className="group flex items-center p-3 bg-white rounded-lg shadow-sm hover:shadow-md hover:bg-amber-50 transition-all duration-200 border border-transparent hover:border-amber-200">
                      <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-indigo-200 transition-colors">
                        <span className="text-indigo-700 font-bold">🎼</span>
                      </div>
                      <div>
                        <div className="font-semibold text-amber-800 group-hover:text-amber-900">Musical Constraint</div>
                        <div className="text-xs text-amber-600">Harmonic optimization</div>
                      </div>
                    </a>
                    
                    <a href="#alternative-tunings" className="group flex items-center p-3 bg-white rounded-lg shadow-sm hover:shadow-md hover:bg-amber-50 transition-all duration-200 border border-transparent hover:border-amber-200">
                      <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-teal-200 transition-colors">
                        <span className="text-teal-700 font-bold">🔄</span>
                      </div>
                      <div>
                        <div className="font-semibold text-amber-800 group-hover:text-amber-900">Alternative Tunings</div>
                        <div className="text-xs text-amber-600">Other approaches</div>
                      </div>
                    </a>
                    <a href="#conclusion" className="group flex items-center p-3 bg-white rounded-lg shadow-sm hover:shadow-md hover:bg-amber-50 transition-all duration-200 border border-transparent hover:border-amber-200">
                      <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-emerald-200 transition-colors">
                        <span className="text-emerald-700 font-bold">✅</span>
                      </div>
                      <div>
                        <div className="font-semibold text-amber-800 group-hover:text-amber-900">Conclusion</div>
                        <div className="text-xs text-amber-600">Key takeaways</div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>

              {/* Beginner-friendly callout */}
              <div id="beginners" className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg my-8">
                <h3 className="text-xl font-semibold text-amber-800 mb-4 flex items-center">
                  🎸 Answer for Beginners: Why Is the Guitar Tuned E-A-D-G-B-E?
                </h3>
                
                <p className="text-amber-900 font-medium mb-4">
                  <strong>The guitar is tuned this way to make it easier to play chords and scales with your fingers.</strong>
                </p>

                <p className="mb-4 text-amber-800">Here's the big idea:</p>

                <ul className="list-disc list-inside space-y-2 mb-4 text-amber-800">
                  <li>Most of the strings are <strong>5 notes apart</strong> (called "perfect fourths"), which makes patterns repeat in a way that's easy to remember.</li>
                  <li>One string (the B string) breaks the pattern a little — it's only <strong>4 notes apart</strong> — and that little change makes <strong>chord shapes easier</strong> to play and lets your fingers reach more musical sounds.</li>
                  <li>The <strong>top and bottom strings are both E</strong>, which helps you play big, full-sounding chords across all six strings.</li>
                </ul>

                <div className="bg-white p-4 rounded border mb-4">
                  <p className="text-amber-900 font-medium mb-2">🎵 <strong>Why "5 notes apart" is called a "fourth":</strong></p>
                  <div className="flex items-center justify-center mb-2">
                    <div className="text-sm text-amber-800">
                      <strong>E</strong> → F → F# → G → G# → <strong>A</strong>
                    </div>
                  </div>
                  <div className="flex items-center justify-center space-x-1 mb-2">
                    {['E', 'F', 'F#', 'G', 'G#', 'A'].map((note, index) => (
                      <div key={note} className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold
                          ${note === 'E' || note === 'A' ? 'bg-amber-600 text-white border-amber-700' : 'bg-gray-200 border-gray-400'}`}>
                          {note}
                        </div>
                        <div className="text-xs text-gray-600 mt-1">{index === 0 ? '0' : index}</div>
                      </div>
                    ))}
                  </div>
                  <p className="text-amber-800 text-sm">
                    You move through <strong>5 semitones</strong> (half-steps) to get from E to A, but it's called a "fourth" because 
                    in the major scale, A is the <strong>4th note</strong> when counting from E. The name comes from music theory, 
                    not the number of steps between them.
                  </p>
                </div>

                <div className="bg-amber-100 p-4 rounded mb-4">
                  <p className="text-amber-900 font-medium mb-2">💡 <strong>Why break the pattern?</strong></p>
                  <p className="text-amber-800 text-sm">
                    If you kept all strings 5 notes apart, the lowest and highest strings would be different notes (like E and F). 
                    E and F are right next to each other - just a half step apart - which creates a tense, uncomfortable sound when played together, even in different octaves. 
                    By making the B string only 4 notes from G, you get the same note (E) on both outer strings, which sounds smooth and harmonious.
                  </p>
                </div>

                <p className="mb-4 text-amber-800">So even though the tuning might seem random, it's actually a smart setup that:</p>

                <ul className="list-disc list-inside space-y-1 mb-4 text-amber-800">
                  <li>Fits the shape of your hand</li>
                  <li>Makes it easier to strum without skipping strings</li>
                  <li>Lets you move the same chord shapes around the neck</li>
                </ul>

                <div className="bg-amber-100 p-4 rounded border-l-4 border-amber-600">
                  <p className="text-amber-900 font-semibold">
                    🎯 <strong>Bottom line:</strong><br/>
                    The guitar is tuned this way because it gives you the <strong>best mix of comfort, logic, and musical power.</strong> It's a sweet spot that works for both your fingers and your ears.
                  </p>
                </div>

                {/* Link to scales after beginner section */}
                <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mt-6">
                  <h4 className="font-semibold text-amber-800 mb-2">🎵 Ready to See This in Action?</h4>
                  <p className="text-amber-800 text-sm mb-3">
                    Now that you understand why the guitar is tuned this way, see how these patterns work in practice with scales:
                  </p>
                  <Link 
                    href="/blog/beginners-guide-guitar-scales" 
                    className="inline-flex items-center bg-amber-600 text-white px-4 py-2 rounded text-sm hover:bg-amber-700 transition-colors"
                  >
                    Learn Guitar Scales →
                  </Link>
                </div>
              </div>

              {/* Advanced section marker - moved above the chart */}
              <div id="advanced-theory" className="bg-brown-50 border-l-4 border-brown-500 p-6 rounded-r-lg my-8">
                <h2 className="text-2xl font-semibold text-brown-800 mb-2">🎓 Advanced Theory Section</h2>
                <p className="text-brown-700">
                  Want to understand the deeper technical and historical reasons? The following section dives into the complete analysis of guitar tuning theory, constraints, and alternatives.
                </p>
              </div>

              {/* Optional Learning Approach */}
              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg mb-8">
                <h3 className="text-lg font-semibold text-green-800 mb-3">📚 Theory is Optional</h3>
                <p className="text-green-800 text-sm mb-3">
                  This theoretical analysis is <strong>entirely optional</strong>. Many excellent guitarists never think about these concepts and learn purely through practice and intuition.
                </p>
                <p className="text-green-800 text-sm mb-3">
                  Some players learn best through repetition and muscle memory, others through visual patterns, and others by understanding the mathematical relationships. All approaches are equally valid.
                </p>
                <p className="text-green-800 text-sm">
                  <strong>Remember:</strong> Understanding the "why" behind guitar tuning can make learning easier for some people, but it's not required to become a great player. Use what helps you and skip what doesn't.
                </p>
              </div>

              {/* Visual Fretboard Diagram */}
              <div id="fretboard-diagram" className="bg-blue-50 p-6 rounded-lg mb-8">
                <h2 className="text-2xl font-bold text-amber-800 mb-4">Guitar Fretboard Pitches - Multi-Octave View</h2>
                <p className="text-sm mb-4">Ever wonder why guitar strings seem "out of order"? This diagram shows why! Each string is positioned exactly where it sits in pitch space - notice how the A string's open note lines up directly under the 5th fret A on the low E string. This reveals the true pitch relationships that make guitar chord shapes and scale patterns work.</p>
                
                {/* Guitar strings aligned by pitch position */}
                <div className="space-y-1">
                  <h3 className="text-lg font-medium mb-3">Guitar Strings Aligned by Actual Pitch:</h3>
                  <p className="text-sm text-gray-600 mb-3">💡 <strong>Tip:</strong> Scroll horizontally to see the full fretboard diagram</p>
                  <p className="text-sm text-gray-600 mb-3"><strong>Numbers below each note = fret numbers</strong> (0 = open string, 1 = 1st fret, etc.)</p>
                  
                  <div className="overflow-x-auto mobile-scroll-hint">
                    <div className="min-w-max">
                      {/* String data with actual semitone offsets from low E */}
                      {[
                        { string: '1st (High E)', openSemitone: 24 }, // 2 octaves above low E
                        { string: '2nd (B)', openSemitone: 19 },       // 19 semitones above low E  
                        { string: '3rd (G)', openSemitone: 15 },       // 15 semitones above low E
                        { string: '4th (D)', openSemitone: 10 },       // 10 semitones above low E
                        { string: '5th (A)', openSemitone: 5 },        // 5 semitones above low E
                        { string: '6th (Low E)', openSemitone: 0 }     // Reference point
                      ].map((stringData, stringIndex) => (
                        <div key={stringIndex} className="flex mb-1">
                          <div className="w-20 text-xs text-right pr-2 py-2 font-medium">{stringData.string}:</div>
                          
                          {/* Create empty spaces before the string starts */}
                          {Array.from({length: stringData.openSemitone}, (_, i) => (
                            <div key={`empty-${i}`} className="w-8 h-8 border border-transparent"></div>
                          ))}
                          
                          {/* Show 13 frets (0-12) for each string */}
                          {Array.from({length: 13}, (_, fret) => {
                            const totalSemitones = stringData.openSemitone + fret;
                            const noteIndex = totalSemitones % 12;
                            const notes = ['E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#'];
                            const note = notes[noteIndex];
                            
                            // Color mapping for each note name
                            const noteColors: {[key: string]: string} = {
                              'E': 'bg-red-300', 'F': 'bg-orange-300', 'F#': 'bg-yellow-300', 
                              'G': 'bg-lime-300', 'G#': 'bg-green-300', 'A': 'bg-emerald-300',
                              'A#': 'bg-teal-300', 'B': 'bg-cyan-300', 'C': 'bg-sky-300',
                              'C#': 'bg-blue-300', 'D': 'bg-violet-300', 'D#': 'bg-purple-300'
                            };
                            
                            return (
                              <div key={fret} className="text-center relative">
                                <div 
                                  className={`w-8 h-8 text-xs flex items-center justify-center border border-gray-400 ${noteColors[note]}`}
                                  style={{
                                    fontWeight: note.includes('#') ? 'normal' : 'bold'
                                  }}
                                >
                                  {note}
                                </div>
                                {/* Show fret number for each string */}
                                <div className="text-xs text-gray-600 mt-1">
                                  {fret}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-400 pt-4 mt-4">
                  <h4 className="font-medium mb-2">What This Reveals:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• <strong>Notes directly underneath each other are the same note of the same pitch</strong> - e.g. 5th fret E string = 0 on A string</li>
                    <li>• <strong>The B string breaks the pattern</strong> - it's only 4 half steps above G (others are 5 apart)</li>
                    <li>• <strong>12th fret doubles the pitch</strong> - same note name but an octave higher</li>
                    <li>• <strong>This explains guitar chord shapes</strong> - why certain fingerings work across different strings</li>
                  </ul>
                </div>
              </div>

              <h2 id="systematic-analysis" className="text-3xl font-bold text-amber-800 mb-6">Why the Guitar is Tuned the Way It Is: A Systematic Analysis</h2>

              <h3 className="text-2xl font-semibold text-amber-800 mb-4">Historical Context</h3>

              <p className="mb-6">
                The exact origins of standard guitar tuning (E-A-D-G-B-E) are not definitively known, with the tuning likely emerging through centuries of evolution rather than deliberate design. Before standardization, guitars and similar stringed instruments used a wide variety of tunings, with efforts to standardize beginning in the 17th century during the Baroque period.
              </p>

              <p className="mb-6">
                The tuning evolved through various historical instruments: "From ancient Chitara, to six-course Renaissance Lute which seems to have been tuned E-A-D-F#-B-E quite often, to Vihuela tuned similarly, to the five-string Guitarra settling on A-D-G-B-E", with the six-string version emerging in the 18th century when "it was deemed sensible to add the low E to continue the layout of perfect fourths".
              </p>

              <p className="mb-8">
                The following analysis presents a logical framework for understanding why standard tuning works so effectively, rather than claiming to represent the historical reasoning behind its development. This systematic approach examines the constraints and principles that make standard tuning optimal for guitar playing, which may explain why it survived and became dominant among the many tuning systems that existed throughout history.
              </p>

              <h3 id="core-constraints" className="text-2xl font-semibold text-amber-800 mb-4">The Core Constraints That Drive Guitar Tuning</h3>

              <p className="mb-4">
                Guitar tuning (E-A-D-G-B-E) emerges from optimizing three fundamental constraints that often compete with each other:
              </p>

              <div className="bg-amber-50 p-4 rounded-lg mb-6 border-l-4 border-amber-400">
                <p className="text-sm text-gray-700">
                  <strong>Note:</strong> You could argue that these constraints are really three aspects of the same fundamental requirement - that the guitar must be learnable, physically playable, and musically functional. I've separated them here for clarity of analysis, but they're deeply interconnected and must be optimized together.
                </p>
              </div>

              <ol className="list-decimal list-inside mb-6 space-y-2">
                <li><strong>Mental Constraint</strong>: The need for learnable, repeatable patterns that the human brain can master</li>
                <li><strong>Physical Constraint</strong>: What human hands can actually accomplish within anatomical limitations</li>
                <li><strong>Musical Constraint</strong>: Creating harmonically useful chord voicings and musical functionality</li>
              </ol>

              <p className="mb-8">
                <strong>The key insight</strong>: Standard tuning isn't a perfect solution to any single constraint, but rather the optimal compromise that makes the guitar both learnable and musically powerful. Every aspect of the tuning serves this fundamental goal of balancing these often competing requirements.
              </p>

              <h3 id="mental-constraint" className="text-2xl font-semibold text-amber-800 mb-4">The Mental Constraint: Pattern Consistency</h3>

              <h4 className="text-xl font-semibold text-brown-600 mb-3">Why Consistent Intervals Matter</h4>

              <p className="mb-4">
                The human brain excels at recognizing and applying patterns. For a complex instrument like guitar, <strong>pattern consistency across the fretboard is essential for learnability</strong>:
              </p>

              <ul className="list-disc list-inside mb-6 space-y-2">
                <li><strong>Scale patterns should transfer</strong>: Learn a scale shape in one position, use it everywhere</li>
                <li><strong>Chord shapes should be moveable</strong>: Same fingering pattern works at different fret positions</li>
                <li><strong>Interval relationships should be predictable</strong>: Distance between notes should follow consistent rules</li>
                <li><strong>Muscle memory should apply broadly</strong>: Finger movements learned in one context should work in others</li>
              </ul>

              <h4 className="text-xl font-semibold text-brown-600 mb-3">The Fourth Interval Provides Maximum Consistency</h4>

              <p className="mb-4">
                Using <strong>perfect fourths (5 semitones) between most strings</strong> creates the most systematic fretboard patterns:
              </p>

              <ul className="list-disc list-inside mb-6 space-y-2">
                <li><strong>Identical string relationships</strong>: E-A, A-D, and D-G all follow the same intervallic pattern</li>
                <li><strong>Predictable note positions</strong>: Same fret shape gives you the same interval on 4 out of 6 string pairs</li>
                <li><strong>Transferrable finger patterns</strong>: Scale and chord shapes repeat systematically across the neck</li>
                <li><strong>Logical interval mapping</strong>: Consistent mathematics for finding notes across strings</li>
              </ul>

              <p className="mb-8">
                <strong>Key insight</strong>: The mental constraint drives the search for consistency, but the G-B major third represents a strategic exception that optimizes the system across all three constraints. This compromise is analyzed in detail in the "Major Third Compromise" section below.
              </p>

              <h3 id="physical-foundation" className="text-2xl font-semibold text-amber-800 mb-4">The Physical Constraint: Hand Limitations and Anatomy</h3>

              <h4 className="text-xl font-semibold text-brown-600 mb-3">The Fret Span Constraint</h4>

              <p className="mb-4">
                Before diving into specific techniques like barre chords, it's crucial to understand the fundamental limitation that shapes all guitar chord voicings:
              </p>

              <p className="mb-4">
                <strong>The 4-fret span limit</strong>: Human fingers can comfortably span about 4-5 frets maximum. This creates a "harmonic window" - you can only access notes within that span, so any chord shape must find the intervals it needs within this physical constraint.
              </p>

              <p className="mb-6">
                <strong>Why this matters for tuning</strong>: Guitar tuning isn't just optimized for barre chords - it's optimized so that <em>any chord shape</em> can find useful harmonic intervals within a 4-fret span, regardless of where you place your hand on the neck or which string serves as the root.
              </p>

              <h4 className="text-xl font-semibold text-brown-600 mb-3">The Barre-ability Constraint</h4>

              <p className="mb-4">
                The selection of fourths as the primary tuning interval is fundamentally constrained by human hand anatomy and basic mathematics:
              </p>

              <p className="mb-4">
                <strong>Mathematical necessity</strong>: With only four fingers available but six strings to fret, <strong>barring is mathematically required</strong> for full-string chord voicings. For six-string chords, one finger must cover at least three strings. For five-string chords, one finger must cover at least two strings.
              </p>

              <p className="mb-4">
                <strong>Why fourths are optimal for barring</strong>:
              </p>

              <ul className="list-disc list-inside mb-6 space-y-2">
                <li><strong>Comfortable span</strong>: A perfect fourth can be easily barred with one finger</li>
                <li><strong>Thirds too narrow</strong>: Compress chord tones too much, create awkward augmented intervals when barred</li>
                <li><strong>Fifths too wide</strong>: Difficult or impossible to barre comfortably</li>
                <li><strong>Fourths hit the sweet spot</strong>: Barreable while providing useful harmonic coverage</li>
              </ul>

              <p className="mb-8">
                This physical constraint is critical because it enables <strong>moveable chord shapes</strong> - the ability to play the same chord pattern at different fret positions across the neck.
              </p>

              <h4 className="text-xl font-semibold text-brown-600 mb-3">Why the First Finger is Optimal for Barring</h4>

              <p className="mb-4">
                The tuning system naturally leads to using the first finger as a foundation because of basic ergonomic logic:
              </p>

              <p className="mb-4">
                <strong>Why the first finger for barring</strong>: Barring with any other finger would render the fingers behind it unusable or awkward. If you barred with your second finger, your index finger would be wasted. The same problem occurs with third or fourth finger barres - you'd essentially be losing the utility of the fingers behind the barre.
              </p>

              <p className="mb-4">
                <strong>Consequences of first finger barring</strong>:
              </p>
              <ul className="list-disc list-inside mb-6 space-y-2">
                <li><strong>Maximum remaining finger availability</strong>: Leaves three fingers free for additional chord tones</li>
                <li><strong>Biomechanical efficiency</strong>: The first finger provides the strongest, most stable base for complex chord shapes</li>
                <li><strong>Optimal leverage</strong>: Creates the most comfortable and sustainable hand position</li>
                <li><strong>Reach optimization</strong>: Ensures most chord tones are within comfortable reach from any position</li>
                <li><strong>Interval accessibility</strong>: Common intervals remain easily accessible between adjacent strings</li>
              </ul>
              
              <p className="mb-6">
                This ergonomic optimization ensures that complex chords remain physically manageable within normal hand span.
              </p>

              <h3 id="chordal-constraint" className="text-2xl font-semibold text-amber-800 mb-4">The Musical Constraint: Harmonic Functionality</h3>

              <h4 className="text-xl font-semibold text-brown-600 mb-3">Harmonic Benefits of Fourths</h4>

              <p className="mb-4">
                The fourth interval provides excellent musical benefits that make it ideal for harmonic functionality:
              </p>

              <ul className="list-disc list-inside mb-6 space-y-2">
                <li><strong>The fifth relationship</strong>: The fifth of any chord appears on the adjacent higher string at the same fret</li>
                <li><strong>Inversion advantage</strong>: Fourths invert to fifths, giving access to the two most harmonically fundamental intervals (after the octave) through the same finger positions</li>
                <li><strong>Optimal chord tone access</strong>: Allows comfortable reach to most chord tones within a reasonable span</li>
              </ul>

              <p className="mb-8">
                <strong>Why this matters</strong>: While thirds invert to sixths (less harmonically essential), fourths provide direct access to both fourths and fifths - the building blocks of Western harmony.
              </p>

              <h4 className="text-xl font-semibold text-brown-600 mb-3">Why the Octave Relationship Matters</h4>

              <p className="mb-4">
                For effective chordal playing, having the lowest and highest strings tuned to the same note (E) is crucial:
              </p>

              <ul className="list-disc list-inside mb-6 space-y-2">
                <li><strong>Enables barring across all strings</strong>: The same finger position works for both outer strings, making six-string barre chords possible</li>
                <li><strong>Creates harmonically functional barres</strong>: The B string (perfect fifth from E) works harmonically with both E strings when barring, providing a stable chord foundation</li>
                <li><strong>Eliminates string avoidance</strong>: Allows use of all strings without needing to mute or avoid the outer strings</li>
              </ul>

              <h4 className="text-xl font-semibold text-brown-600 mb-3">The Problem with Pure Fourths</h4>

              <p className="mb-8">
                If you maintained strict fourths throughout (E-A-D-G-<strong>C</strong>-<strong>F</strong>), you would lose the octave relationship. For a chordal instrument, this octave relationship provides more musical value than the consistency of pure fourths.
              </p>

              <h3 id="major-third-compromise" className="text-2xl font-semibold text-amber-800 mb-4">The Major Third Compromise: G to B</h3>

              <h4 className="text-xl font-semibold text-brown-600 mb-3">Bridging Physical and Musical Constraints</h4>

              <p className="mb-4">
                The major third interval between G and B strings serves as an elegant solution to competing constraints:
              </p>

              <ol className="list-decimal list-inside mb-6 space-y-2">
                <li><strong>Maintains the octave relationship</strong> (E to E)</li>
                <li><strong>Preserves the fourths tuning</strong> for the lower strings (E-A-D-G)</li>
                <li><strong>Optimizes the upper register</strong> where frets become closer together</li>
                <li><strong>Creates practical chord fingerings</strong> within comfortable hand span</li>
              </ol>

              <h4 className="text-xl font-semibold text-brown-600 mb-3">Harmonic Analysis of the Final System</h4>

              <p className="mb-4">
                The tuning creates optimal intervals relative to both primary root positions <strong>when using a barred first finger</strong>:
              </p>

              <p className="mb-4">
                <strong>Relative to low E (barred first finger):</strong>
              </p>
              <ul className="list-disc list-inside mb-6 space-y-1">
                <li>A = 4th (barred) with access up to major 6th (enables 1st inversion chords with 3rd in bass)</li>
                <li>D = minor 7th (b7) (barred) with finger access to major 7th (7)</li>
                <li>G = minor 3rd (b3) (barred) with finger access to major 3rd (3) and 11th</li>
                <li>B = 5th (barred) with finger access up to minor 7th (b7) or major 7th (7)</li>
                <li>E = Octave (1) (barred) with finger access to 9ths</li>
              </ul>

              <p className="mb-4">
                <strong>Relative to A string (barred first finger):</strong>
              </p>
              <ul className="list-disc list-inside mb-6 space-y-1">
                <li>E (low) = 5th (barred) with finger access to 6th, minor 7th (b7), or major 7th (7)</li>
                <li>D = 4th (barred) with access up to major 6th (enables 1st inversion chords with 3rd in bass)</li>
                <li>G = minor 7th (b7) (barred) with finger access to major 7th (7)</li>
                <li>B = major 2nd/9th (barred) with finger access to higher extensions</li>
                <li>E (high) = 5th (barred) with finger access to 6th, minor 7th (b7), or major 7th (7)</li>
              </ul>

              <p className="mb-8">
                <strong>Key principle</strong>: The tuning defaults to minor/perfect intervals through barring, but provides easy finger access to major intervals and extensions, maximizing harmonic flexibility within comfortable hand span.
              </p>

              {/* Barre Chord Interval Diagrams */}
              <div className="bg-brown-50 p-6 rounded-lg mb-8 border-l-4 border-brown-500">
                <h4 className="text-xl font-semibold text-brown-800 mb-4">Barre Chord Interval Access: Visual Proof</h4>
                <p className="mb-6 text-brown-700">
                  These fretboard diagrams show what intervals you can access with a barred first finger plus three additional fingers within a 4-fret span. 
                  <strong>Dark amber</strong> = barred intervals, <strong>light amber</strong> = reachable by remaining fingers.
                </p>

                {/* E String Root Barre */}
                <div className="mb-8">
                  <h5 className="text-lg font-semibold text-amber-800 mb-3">E String Root</h5>
                  <p className="text-sm mb-4 text-gray-700">Barre position, root on low E string</p>
                  
                  <div className="overflow-x-auto mobile-scroll-hint">
                    <div className="inline-block border border-gray-400">
                      <div className="flex">
                        <div className="w-16 text-center bg-gray-100 border-r border-gray-400 py-1 text-xs font-bold">String</div>
                        <div className="w-12 text-center bg-gray-100 border-r border-gray-400 py-1 text-xs font-bold">Barre</div>
                        <div className="w-12 text-center bg-gray-100 border-r border-gray-400 py-1 text-xs font-bold">+1</div>
                        <div className="w-12 text-center bg-gray-100 border-r border-gray-400 py-1 text-xs font-bold">+2</div>
                        <div className="w-12 text-center bg-gray-100 py-1 text-xs font-bold">+3</div>
                      </div>
                      
                      {[
                        { string: 'High E', intervals: ['1', 'b2', '2', 'b3'] },
                        { string: 'B', intervals: ['5', 'b6', '6', 'b7'] },
                        { string: 'G', intervals: ['b3', '3', '4', 'b5'] },
                        { string: 'D', intervals: ['b7', '7', '1', 'b2'] },
                        { string: 'A', intervals: ['4', 'b5', '5', 'b6'] },
                        { string: 'Low E', intervals: ['1', 'b2', '2', 'b3'] }
                      ].map((stringData, index) => (
                        <div key={index} className="flex border-t border-gray-400">
                          <div className="w-16 text-center border-r border-gray-400 py-2 text-xs font-medium bg-gray-50">
                            {stringData.string}
                          </div>
                          {stringData.intervals.map((interval, fretIndex) => (
                            <div key={fretIndex} className={`w-12 text-center border-r border-gray-400 py-2 text-xs font-bold ${
                              fretIndex === 0 ? 'bg-amber-400 border-amber-600' : 'bg-amber-100'
                            } ${fretIndex === 3 ? 'border-r-0' : ''}`}>
                              {interval}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mt-3">
                    <strong>Barred intervals:</strong> 1, 4, b7, b3, 5, 1
                  </p>
                </div>

                {/* A String Root Barre */}
                <div className="mb-8">
                  <h5 className="text-lg font-semibold text-amber-800 mb-3">A String Root</h5>
                  <p className="text-sm mb-4 text-gray-700">Barre position, root on A string</p>
                  
                  <div className="overflow-x-auto mobile-scroll-hint">
                    <div className="inline-block border border-gray-400">
                      <div className="flex">
                        <div className="w-16 text-center bg-gray-100 border-r border-gray-400 py-1 text-xs font-bold">String</div>
                        <div className="w-12 text-center bg-gray-100 border-r border-gray-400 py-1 text-xs font-bold">Barre</div>
                        <div className="w-12 text-center bg-gray-100 border-r border-gray-400 py-1 text-xs font-bold">+1</div>
                        <div className="w-12 text-center bg-gray-100 border-r border-gray-400 py-1 text-xs font-bold">+2</div>
                        <div className="w-12 text-center bg-gray-100 py-1 text-xs font-bold">+3</div>
                      </div>
                      
                      {[
                        { string: 'High E', intervals: ['5', 'b6', '6', 'b7'] },
                        { string: 'B', intervals: ['2', 'b3', '3', '4'] },
                        { string: 'G', intervals: ['b7', '7', '1', 'b2'] },
                        { string: 'D', intervals: ['4', 'b5', '5', 'b6'] },
                        { string: 'A', intervals: ['1', 'b2', '2', 'b3'] },
                        { string: 'Low E', intervals: ['5', 'b6', '6', 'b7'] }
                      ].map((stringData, index) => (
                        <div key={index} className="flex border-t border-gray-400">
                          <div className="w-16 text-center border-r border-gray-400 py-2 text-xs font-medium bg-gray-50">
                            {stringData.string}
                          </div>
                          {stringData.intervals.map((interval, fretIndex) => (
                            <div key={fretIndex} className={`w-12 text-center border-r border-gray-400 py-2 text-xs font-bold ${
                              fretIndex === 0 ? 'bg-amber-400 border-amber-600' : 'bg-amber-100'
                            } ${fretIndex === 3 ? 'border-r-0' : ''}`}>
                              {interval}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mt-3">
                    <strong>Barred intervals:</strong> 5, 2, b7, 4, 1, 5
                  </p>
                </div>

                {/* D String Root Barre */}
                <div className="mb-6">
                  <h5 className="text-lg font-semibold text-amber-800 mb-3">D String Root</h5>
                  <p className="text-sm mb-4 text-gray-700">Barre position, root on D string, low E muted</p>
                  
                  <div className="overflow-x-auto mobile-scroll-hint">
                    <div className="inline-block border border-gray-400">
                      <div className="flex">
                        <div className="w-16 text-center bg-gray-100 border-r border-gray-400 py-1 text-xs font-bold">String</div>
                        <div className="w-12 text-center bg-gray-100 border-r border-gray-400 py-1 text-xs font-bold">Barre</div>
                        <div className="w-12 text-center bg-gray-100 border-r border-gray-400 py-1 text-xs font-bold">+1</div>
                        <div className="w-12 text-center bg-gray-100 border-r border-gray-400 py-1 text-xs font-bold">+2</div>
                        <div className="w-12 text-center bg-gray-100 py-1 text-xs font-bold">+3</div>
                      </div>
                      
                      {[
                        { string: 'High E', intervals: ['2', 'b3', '3', '4'], muted: false },
                        { string: 'B', intervals: ['6', 'b7', '7', '1'], muted: false },
                        { string: 'G', intervals: ['4', 'b5', '5', 'b6'], muted: false },
                        { string: 'D', intervals: ['1', 'b2', '2', 'b3'], muted: false },
                        { string: 'A', intervals: ['5', 'b6', '6', 'b7'], muted: false },
                        { string: 'Low E X', intervals: ['X', 'X', 'X', 'X'], muted: true }
                      ].map((stringData, index) => (
                        <div key={index} className="flex border-t border-gray-400">
                          <div className="w-16 text-center border-r border-gray-400 py-2 text-xs font-medium bg-gray-50">
                            {stringData.string}
                          </div>
                          {stringData.intervals.map((interval, fretIndex) => (
                            <div key={fretIndex} className={`w-12 text-center border-r border-gray-400 py-2 text-xs font-bold ${
                              stringData.muted ? 'bg-gray-300' : 
                              fretIndex === 0 ? 'bg-amber-400 border-amber-600' : 'bg-amber-100'
                            } ${fretIndex === 3 ? 'border-r-0' : ''}`}>
                              {interval}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mt-3">
                    <strong>Barred intervals:</strong> 2, 6, 4, 1, 5 | <strong>Low E muted (X)</strong>
                  </p>
                </div>

                <div className="bg-amber-100 p-4 rounded border-l-4 border-amber-500">
                  <p className="text-amber-900 text-sm">
                    <strong>Key insight:</strong> Each root position provides different barred intervals, but all give access to essential chord tones (1, 3, 5, 7) within a 4-fret span. This demonstrates why standard tuning optimizes harmonic accessibility within physical hand constraints.
                  </p>
                </div>

                <div className="bg-brown-50 p-4 rounded border-l-4 border-brown-400 mt-4">
                  <p className="text-brown-900 text-sm">
                    <strong>Note:</strong> Barre chords are just one way to maximize interval access - they're not the only chord forms available. Many chord shapes use individual fingers for the root and often skip certain chord tones (like the fifth) to create more ergonomic fingerings. However, barre chords are particularly valuable because they allow you to play all six strings while maintaining a completely moveable shape, making them ideal for demonstrating how standard tuning optimizes harmonic content within physical constraints.
                  </p>
                </div>
              </div>

              <h3 id="alternative-tunings" className="text-2xl font-semibold text-amber-800 mb-4">Why Alternative Tunings Fall Short</h3>

              <h4 className="text-xl font-semibold text-brown-600 mb-3">All Fourths (E-A-D-G-<strong>C</strong>-<strong>F</strong>)</h4>
              <ul className="list-disc list-inside mb-6 space-y-2">
                <li>✅ <strong>Mental</strong>: Perfect pattern consistency across the entire fretboard</li>
                <li>❌ <strong>Physical</strong>: Spreads upper register too wide, makes chord fingerings awkward</li>
                <li>❌ <strong>Musical</strong>: Loses octave relationship, reduces harmonic stability in barre chords</li>
                <li><strong>Used by some players</strong>: Jazz fusion guitarists like Tom Quayle use this for lead playing and complex scales</li>
              </ul>

              <h4 className="text-xl font-semibold text-brown-600 mb-3">Open G Tuning (D-G-D-G-B-D)</h4>
              <ul className="list-disc list-inside mb-6 space-y-2">
                <li>❌ <strong>Mental</strong>: Inconsistent interval patterns make learning difficult</li>
                <li>❌ <strong>Physical</strong>: Often creates awkward chord fingerings outside the open chord</li>
                <li>❌ <strong>Musical</strong>: Root displacement (low D instead of G) undermines bass-chord relationship</li>
                <li><strong>Keith Richards' solution</strong>: Removes the low string entirely to avoid the problematic bass note</li>
              </ul>

              <h4 className="text-xl font-semibold text-brown-600 mb-3">Other Interval Systems</h4>
              <ul className="list-disc list-inside mb-8 space-y-2">
                <li><strong>All Fifths</strong>: ❌ Impossible to barre; ❌ Chord tones too spread out</li>
                <li><strong>All Thirds</strong>: ❌ Too compressed; ❌ Limited harmonic range within comfortable span</li>
                <li><strong>Mixed Systems</strong>: ❌ Usually violate either physical constraints or musical utility</li>
              </ul>

              <h3 className="text-2xl font-semibold text-amber-800 mb-4">How It All Works Together</h3>

              <p className="mb-6">
                Standard guitar tuning represents a sophisticated optimization that:
              </p>

              <ol className="list-decimal list-inside mb-8 space-y-2">
                <li><strong>Respects physical limitations</strong>: Works within what human hands can actually accomplish</li>
                <li><strong>Maximizes musical utility</strong>: Provides rich harmonic possibilities for chordal playing</li>
                <li><strong>Creates systematic relationships</strong>: Enables learnable, consistent patterns across the fretboard</li>
                <li><strong>Balances competing constraints</strong>: Makes practical compromises where perfect solutions don't exist</li>
              </ol>

              <p className="mb-8">
                The tuning system establishes the physical and harmonic framework that makes guitar technique possible, rather than being designed around specific techniques. The playing methods associated with guitar emerged from exploring the possibilities this tuning system created.
              </p>

              <h3 id="conclusion" className="text-2xl font-semibold text-amber-800 mb-4">Conclusion</h3>

              <p className="mb-6">
                Standard guitar tuning (E-A-D-G-B-E) represents a sophisticated optimization that successfully balances three competing constraints. It's not a perfect solution to any single constraint, but rather the optimal compromise that makes the guitar both learnable and musically powerful.
              </p>

              <p className="mb-8">
                Every aspect of the tuning - from the predominant fourths to the G-B major third to the octave outer strings - serves the fundamental goal of creating an instrument that works within human limitations while providing maximum musical utility. The system succeeds because it finds the optimal balance point between mental learnability, physical playability, and musical functionality.
              </p>

              {/* Link to Part 2 */}
              <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg mb-8">
                <h4 className="text-xl font-semibold text-amber-800 mb-3">🎯 Ready to Put This Into Practice?</h4>
                <p className="text-amber-800 mb-4">
                  Now that you understand <em>why</em> the guitar is tuned this way, you might be wondering <em>how</em> to use this knowledge to navigate the fretboard and find notes across strings.
                </p>
                <p className="text-amber-800 mb-4">
                  Check out <strong>Part 2</strong> of this series for practical techniques, formulas, and exercises to master fretboard navigation:
                </p>
                <Link 
                  href="/blog/guitar-fretboard-navigation" 
                  className="inline-flex items-center bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors font-semibold"
                >
                  Master Fretboard Navigation →
                </Link>
              </div>


            </div>
          </div>
        </article>
      </div>

      {/* Math Modal */}
      {showMathModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-gray-800">📐 The Mathematical Relationship</h3>
                <button 
                  onClick={() => setShowMathModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">The Complete Formula</h4>
                  <p className="mb-2">If you define:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>R</strong> = Root note fret position</li>
                    <li><strong>S</strong> = Same-string interval (in frets)</li>
                    <li><strong>T</strong> = String tuning interval (in frets)</li>
                    <li><strong>C</strong> = Cross-string fret position</li>
                  </ul>
                  
                  <div className="mt-3 p-3 bg-white rounded border">
                    <p className="text-center font-bold text-lg">C = R + (S - T)</p>
                  </div>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Example: Major 3rd</h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>Given:</strong></p>
                    <ul className="list-disc list-inside ml-4">
                      <li>Root (R) = 8th fret E string</li>
                      <li>Same-string interval (S) = 4 frets (major 3rd)</li>
                      <li>String tuning interval (T) = 5 frets (E to A)</li>
                    </ul>
                    
                    <p className="mt-2"><strong>Solution:</strong></p>
                    <div className="bg-white p-2 rounded border font-mono">
                      <p>C = R + (S - T)</p>
                      <p>C = 8 + (4 - 5)</p>
                      <p>C = 8 + (-1)</p>
                      <p>C = 7th fret A string ✓</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Algebraic Rearrangements</h4>
                  <div className="space-y-2 text-sm">
                    <p>From <strong>C = R + S - T</strong>, you can solve for any variable:</p>
                    
                    <div className="grid md:grid-cols-2 gap-3 mt-2">
                      <div className="bg-white p-2 rounded border">
                        <p className="font-semibold">Movement from root:</p>
                        <p className="font-mono">S - T = C - R</p>
                      </div>
                      
                      <div className="bg-white p-2 rounded border">
                        <p className="font-semibold">Same-string interval:</p>
                        <p className="font-mono">S = C - R + T</p>
                      </div>
                      
                      <div className="bg-white p-2 rounded border">
                        <p className="font-semibold">String tuning interval:</p>
                        <p className="font-mono">T = S - (C - R)</p>
                      </div>
                      
                      <div className="bg-white p-2 rounded border">
                        <p className="font-semibold">Root position:</p>
                        <p className="font-mono">R = C - S + T</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Key Insight</h4>
                  <p className="text-sm">
                    The term <strong>(S - T)</strong> represents the <em>relative movement</em> from the root fret position, 
                    not an absolute fret number. This is why negative results mean "move back toward the nut" 
                    and positive results mean "move forward toward the bridge."
                  </p>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <button 
                  onClick={() => setShowMathModal(false)}
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 