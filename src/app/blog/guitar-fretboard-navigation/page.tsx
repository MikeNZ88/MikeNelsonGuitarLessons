'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function GuitarFretboardNavigation() {
  const [showMathModal, setShowMathModal] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-amber-600">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/blog" className="hover:text-amber-600">Blog</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">Guitar Fretboard Navigation</span>
        </nav>

        <article className="prose prose-lg max-w-none">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-amber-800 mb-6">
              Guitar Fretboard Navigation: Cross-String Interval Relationships (Part 2)
            </h1>
            
            <p className="text-xl text-gray-600 mb-4">
              Master the practical techniques for finding notes and intervals across guitar strings
            </p>

            {/* Link back to Part 1 */}
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg mb-8">
              <p className="text-amber-800 text-sm">
                📖 <strong>Part 2 of 2:</strong> This builds on the theoretical foundation from{" "}
                <Link href="/blog/understanding-guitar-fretboard" className="text-amber-600 hover:text-amber-800 underline">
                  Part 1: Why Strings Are Tuned This Way
                </Link>. 
                Start there if you want to understand the "why" behind these techniques.
              </p>
            </div>

            <div className="text-sm text-gray-500">
              Published: June 27, 2025
            </div>
          </div>

          {/* Optional Learning Approach */}
          <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg mb-8">
            <h3 className="text-lg font-semibold text-green-800 mb-3">📚 Choose Your Learning Approach</h3>
            <p className="text-green-800 text-sm mb-3">
              The detailed mathematical analysis below is <strong>completely optional</strong>. Everyone makes fretboard connections differently, and it can take time for these relationships to click.
            </p>
            <p className="text-green-800 text-sm mb-3">
              Some players learn best through repetition and muscle memory, others through visual patterns, and others by understanding the mathematical relationships. All approaches are equally valid.
            </p>
            <p className="text-green-800 text-sm">
              <strong>Remember:</strong> The more you understand about how the fretboard works, the easier learning becomes - but you don't need to master everything at once. Take what helps you and leave the rest for later.
            </p>
          </div>

          {/* Beginner-friendly explanation */}
          <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-lg mb-8">
            <h2 className="text-2xl font-semibold text-amber-800 mb-4 flex items-center">
              🎸 For Beginners: Understanding Cross-String Relationships
            </h2>
            
            <p className="text-amber-900 font-medium mb-4">
              <strong>Here's the key insight:</strong> Apart from G to B strings, all other guitar strings are tuned exactly 5 half-steps apart.
            </p>

            <div className="bg-white p-4 rounded border mb-4">
              <h4 className="font-semibold mb-3 text-amber-800">🔍 Try This Exercise:</h4>
              <p className="mb-3 text-amber-800">
                Find the note <strong>A</strong> on the 5th fret of the low E string. Notice that the exact same note (sounds identical) 
                is found on the string below it, but 5 frets back at fret 0 (the open A string).
              </p>
            </div>

            <div className="bg-amber-100 p-4 rounded border-l-4 border-amber-600 mb-4">
              <h4 className="font-semibold mb-3 text-amber-900">💡 The Handy Tip:</h4>
              <p className="mb-3 text-amber-900">
                If you have a starting point (let's call it the <strong>root</strong>), and you move up to a note on a higher fret on that same string, 
                you can find that same note on the string below by using this simple calculation:
              </p>
              
              <div className="bg-white p-3 rounded border text-center">
                <p className="font-bold text-amber-900 text-lg">
                  String Tuning (5) - Frets Moved Up = Frets to Move Back
                </p>
              </div>
            </div>

            <div className="bg-white p-4 rounded border">
              <h4 className="font-semibold mb-3 text-amber-800">📝 Example:</h4>
              <ol className="list-decimal list-inside space-y-2 text-amber-800">
                <li>Start at the 5th fret on E string (note A)</li>
                <li>Move to the 7th fret on E string (note B) → we moved <strong>2 frets up</strong></li>
                <li>Calculate: 5 - 2 = <strong>3</strong></li>
                <li>Move back 3 frets from the 5th fret on A string: 5 - 3 = <strong>2nd fret</strong></li>
                <li>Result: Note B is found on the <strong>2nd fret of the A string</strong></li>
              </ol>
            </div>

            <div className="bg-amber-100 p-4 rounded mt-4">
              <p className="text-amber-900 text-sm">
                <strong>🎯 Why this works:</strong> This calculation automatically accounts for the 5-fret tuning difference between strings, 
                making it easy to find any note on adjacent strings without memorizing the entire fretboard.
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-amber-800 mb-6">Cross-String Interval Relationships</h2>

            <div className="bg-amber-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-semibold mb-4">🎯 Finding the Same Note on Adjacent Strings</h3>
              <p className="mb-4">
                <strong>The same note can be found 5 frets back on the next lower string (except G to B, which is 4 frets back).</strong>
              </p>
              
              <div className="bg-white p-4 rounded border mb-4">
                <h4 className="font-semibold mb-4 text-center">Example: Finding A on E and A Strings</h4>
                
                <div className="space-y-4">
                  {/* A String */}
                  <div className="flex items-center">
                    <div className="w-16 text-right pr-4 font-medium">A:</div>
                    {Array.from({length: 6}, (_, i) => {
                      const fret = i;
                      const isOpenA = fret === 0; // A on open A string
                      
                      return (
                        <div key={fret} className="relative">
                          <div 
                            className={`w-12 h-12 border-2 flex items-center justify-center text-sm font-bold
                              ${isOpenA
                                ? 'bg-amber-500 text-white border-amber-600'
                                : 'bg-gray-100 border-gray-300 text-gray-400'
                              }`}
                          >
                            {isOpenA ? 'A' : '•'}
                          </div>
                          
                          {/* Fret numbers below */}
                          <div className="text-xs text-center mt-1 text-gray-600">
                            {fret}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Low E String */}
                  <div className="flex items-center">
                    <div className="w-16 text-right pr-4 font-medium">E:</div>
                    {Array.from({length: 6}, (_, i) => {
                      const fret = i;
                      const isFifthFretA = fret === 5; // A on 5th fret E string
                      
                      return (
                        <div key={fret} className="relative">
                          <div 
                            className={`w-12 h-12 border-2 flex items-center justify-center text-sm font-bold
                              ${isFifthFretA
                                ? 'bg-amber-500 text-white border-amber-600'
                                : 'bg-gray-100 border-gray-300 text-gray-400'
                              }`}
                          >
                            {isFifthFretA ? 'A' : '•'}
                          </div>
                          
                          {/* Fret numbers below */}
                          <div className="text-xs text-center mt-1 text-gray-600">
                            {fret}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Simple explanation */}
                <div className="text-center mt-4 space-y-2">
                  <div className="bg-amber-100 p-3 rounded">
                    <p className="text-sm"><strong>A on 5th fret E string</strong> = <strong>A on open A string</strong></p>
                    <p className="text-lg font-bold text-amber-700 my-2">The open fret (0) is 5 frets back from the 5th fret</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded border mb-4">
                <h4 className="font-semibold mb-4 text-center">Example: Finding C on E and A Strings</h4>
                
                <div className="space-y-4">
                  {/* A String */}
                  <div className="flex items-center">
                    <div className="w-16 text-right pr-4 font-medium">A:</div>
                    {Array.from({length: 9}, (_, i) => {
                      const fret = i;
                      const isTargetC = fret === 3; // C on 3rd fret A string
                      
                      return (
                        <div key={fret} className="relative">
                          <div 
                            className={`w-12 h-12 border-2 flex items-center justify-center text-sm font-bold
                              ${isTargetC
                                ? 'bg-amber-500 text-white border-amber-600'
                                : 'bg-gray-100 border-gray-300 text-gray-400'
                              }`}
                          >
                            {isTargetC ? 'C' : '•'}
                          </div>
                          
                          {/* Fret numbers below */}
                          <div className="text-xs text-center mt-1 text-gray-600">
                            {fret}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Low E String */}
                  <div className="flex items-center">
                    <div className="w-16 text-right pr-4 font-medium">Low E:</div>
                    {Array.from({length: 9}, (_, i) => {
                      const fret = i;
                      const isTargetC = fret === 8; // C on 8th fret E string
                      
                      return (
                        <div key={fret} className="relative">
                          <div 
                            className={`w-12 h-12 border-2 flex items-center justify-center text-sm font-bold
                              ${isTargetC
                                ? 'bg-amber-500 text-white border-amber-600'
                                : 'bg-gray-100 border-gray-300 text-gray-400'
                              }`}
                          >
                            {isTargetC ? 'C' : '•'}
                          </div>
                          
                          {/* Fret numbers below */}
                          <div className="text-xs text-center mt-1 text-gray-600">
                            {fret}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Simple explanation */}
                <div className="text-center mt-4 space-y-2">
                  <div className="bg-amber-100 p-3 rounded">
                    <p className="text-sm"><strong>C on 8th fret E string</strong> = <strong>C on 3rd fret A string</strong></p>
                    <p className="text-lg font-bold text-amber-700 my-2">The 3rd fret is 5 frets back from the 8th fret</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg mb-6">
              <h3 className="text-xl font-semibold mb-4">🎯 The Cross-String Interval Formula</h3>
              <p className="mb-4">
                Now that you understand how to find the same note on adjacent strings, you can extend this to find <strong>any interval</strong>:
              </p>
              
              <div className="bg-white p-4 rounded border mb-4">
                <h4 className="font-semibold mb-4 text-center">Example: Major 3rd on E and A Strings</h4>
                
                <div className="space-y-4">
                  {/* A String */}
                  <div className="flex items-center">
                    <div className="w-16 text-right pr-4 font-medium">A:</div>
                    {Array.from({length: 13}, (_, i) => {
                      const fret = i;
                      const isCrossStringMajor3rd = fret === 7; // E on 7th fret A string (cross-string major 3rd)
                      
                      return (
                        <div key={fret} className="relative">
                          <div 
                            className={`w-12 h-12 border-2 flex items-center justify-center text-sm font-bold
                              ${isCrossStringMajor3rd
                                ? 'bg-amber-400 text-black border-amber-500'
                                : 'bg-gray-100 border-gray-300 text-gray-400'
                              }`}
                          >
                            {isCrossStringMajor3rd ? 'E' : '•'}
                          </div>
                          
                          {/* Fret numbers below */}
                          <div className="text-xs text-center mt-1 text-gray-600">
                            {fret}
                          </div>
                          
                          {/* Labels above */}
                          {isCrossStringMajor3rd && (
                            <div className="text-xs text-center absolute -top-4 left-1/2 transform -translate-x-1/2 bg-orange-600 text-white rounded px-1">
                              M3rd
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Low E String */}
                  <div className="flex items-center">
                    <div className="w-16 text-right pr-4 font-medium">Low E:</div>
                    {Array.from({length: 13}, (_, i) => {
                      const fret = i;
                      const isRoot = fret === 8; // C on 8th fret E string
                      const isSameStringMajor3rd = fret === 12; // E on 12th fret E string (same-string major 3rd)
                      
                      return (
                        <div key={fret} className="relative">
                          <div 
                            className={`w-12 h-12 border-2 flex items-center justify-center text-sm font-bold
                              ${isRoot 
                                ? 'bg-blue-500 text-white border-blue-600' 
                                : isSameStringMajor3rd
                                ? 'bg-amber-400 text-black border-amber-500'
                                : 'bg-gray-100 border-gray-300 text-gray-400'
                              }`}
                          >
                            {isRoot ? 'C' : isSameStringMajor3rd ? 'E' : '•'}
                          </div>
                          
                          {/* Fret numbers below */}
                          <div className="text-xs text-center mt-1 text-gray-600">
                            {fret}
                          </div>
                          
                          {/* Labels above */}
                          {isRoot && (
                            <div className="text-xs text-center absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white rounded px-1">
                              Root
                            </div>
                          )}
                          {isSameStringMajor3rd && (
                            <div className="text-xs text-center absolute -top-4 left-1/2 transform -translate-x-1/2 bg-orange-600 text-white rounded px-1">
                              M3rd
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Formula explanation */}
                <div className="text-center mt-4 space-y-2">
                  <p className="font-semibold">Major 3rd Cross-String Formula:</p>
                  <div className="bg-white p-3 rounded border">
                    <p className="text-sm"><strong>Root:</strong> C on 8th fret E string</p>
                    <p className="text-sm"><strong>Same string:</strong> Major 3rd (E) = 4 frets higher → 12th fret E string</p>
                    <p className="text-lg font-bold my-2">
                      <span className="bg-purple-100 px-2 py-1 rounded text-sm font-bold">4 (same string)</span>
                      <span className="mx-2">-</span>
                      <span className="bg-gray-100 px-2 py-1 rounded text-sm font-bold">5 (string tuning interval)</span>
                      <span className="mx-2">=</span>
                      <span className="bg-green-100 px-2 py-1 rounded text-sm font-bold">-1 → 1 fret back</span>
                    </p>
                    <p className="text-sm"><strong>Cross-string:</strong> E on 7th fret A string</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded border-l-4 border-amber-500 mb-4">
              <h4 className="font-semibold mb-3">🧮 How The Cross-String Formula Works</h4>
              
              <div className="bg-blue-50 p-3 rounded mb-4 border-l-4 border-blue-500">
                <p className="text-blue-900 text-sm mb-2">
                  <strong>📍 Note:</strong> This advanced formula is more comprehensive than the beginner calculation shown above. 
                  While the beginner method works great for finding notes when moving up from a reference point, 
                  this formula handles any interval relationship and any starting position on the fretboard.
                </p>
              </div>
              
              <p className="mb-3"><strong>The Formula:</strong></p>
              <div className="bg-amber-50 p-3 rounded mb-3">
                <p className="text-center font-bold">
                  <span className="bg-purple-100 px-2 py-1 rounded">Same-String Interval</span> - 
                  <span className="bg-gray-100 px-2 py-1 rounded">String Tuning Interval</span> = 
                  <span className="bg-green-100 px-2 py-1 rounded">Cross-String Position</span>
                </p>
                <p className="text-center text-sm text-gray-600 mt-1">(All intervals measured in semitones/half steps)</p>
              </div>
              
              <p className="mb-3"><strong>Step by step (Method 1 - Know the interval):</strong></p>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li><strong>Find your interval on the same string</strong> (e.g., major 3rd = 4 frets)</li>
                <li><strong>Know your string interval</strong> (E-A, A-D, D-G = 5 frets; G-B = 4 frets)</li>
                <li><strong>Subtract:</strong> 4 - 5 = -1 (negative means go back toward the nut)</li>
                <li><strong>Apply to your root note:</strong> If root is 8th fret, cross-string is 8 - 1 = 7th fret</li>
              </ol>
              
              <p className="mb-3 mt-4"><strong>Step by step (Method 2 - Use fret numbers):</strong></p>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li><strong>Find your root fret and interval fret</strong> (e.g., root = 8th fret, interval = 12th fret)</li>
                <li><strong>Calculate same-string interval:</strong> 12 - 8 = 4 frets</li>
                <li><strong>Know your string interval</strong> (E-A, A-D, D-G = 5 frets; G-B = 4 frets)</li>
                <li><strong>Subtract:</strong> 4 - 5 = -1 (negative means go back toward the nut)</li>
                <li><strong>Apply to your root note:</strong> 8th fret - 1 = 7th fret on adjacent string</li>
              </ol>
              
              <div className="mt-4 p-3 bg-gray-50 rounded">
                <p className="font-semibold text-sm mb-2">📝 Written Example:</p>
                <p className="text-sm mb-2">
                  <strong>Goal:</strong> Find the major 3rd of C (which is E) on the A string, when C is on the 8th fret E string.
                </p>
                <p className="text-sm mb-1">
                  <strong>Step 1:</strong> Major 3rd = 4 semitones (frets)
                </p>
                <p className="text-sm mb-1">
                  <strong>Step 2:</strong> E-A string interval = 5 semitones
                </p>
                <p className="text-sm mb-1">
                  <strong>Step 3:</strong> 4 - 5 = -1 (go back 1 fret toward nut)
                </p>
                <p className="text-sm">
                  <strong>Step 4:</strong> 8th fret - 1 = 7th fret → E is on 7th fret A string ✓
                </p>
              </div>
              
              <div className="mt-3 p-2 bg-yellow-50 rounded">
                <p className="text-xs"><strong>Remember:</strong> Positive result = move toward bridge, Negative result = move toward nut</p>
              </div>
              
              <div className="mt-4 text-center">
                <button 
                  onClick={() => setShowMathModal(true)}
                  className="text-blue-600 hover:text-blue-800 underline text-sm"
                >
                  📐 Show the Mathematical Relationship
                </button>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">🎸 Practical Applications</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-3">🎵 Perfect 5th (Power Chords)</h4>
                <p className="text-sm mb-2"><strong>E-A strings:</strong> <span className="bg-purple-100 px-1 rounded">7</span> - <span className="bg-gray-100 px-1 rounded">5</span> = <span className="bg-green-100 px-1 rounded">+2</span> → 2 frets forward</p>
                <p className="text-sm mb-2"><strong>A-D strings:</strong> <span className="bg-purple-100 px-1 rounded">7</span> - <span className="bg-gray-100 px-1 rounded">5</span> = <span className="bg-green-100 px-1 rounded">+2</span> → 2 frets forward</p>
                <p className="text-sm mb-2"><strong>G-B strings:</strong> <span className="bg-purple-100 px-1 rounded">7</span> - <span className="bg-gray-100 px-1 rounded">4</span> = <span className="bg-green-100 px-1 rounded">+3</span> → 3 frets forward</p>
                <p className="text-xs text-gray-600">This is the classic power chord shape!</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-3">🎵 Octaves</h4>
                <p className="text-sm mb-2"><strong>E-A strings:</strong> <span className="bg-purple-100 px-1 rounded">12</span> - <span className="bg-gray-100 px-1 rounded">5</span> = <span className="bg-green-100 px-1 rounded">+7</span> → 7 frets forward</p>
                <p className="text-sm mb-2"><strong>A-D strings:</strong> <span className="bg-purple-100 px-1 rounded">12</span> - <span className="bg-gray-100 px-1 rounded">5</span> = <span className="bg-green-100 px-1 rounded">+7</span> → 7 frets forward</p>
                <p className="text-sm mb-2"><strong>G-B strings:</strong> <span className="bg-purple-100 px-1 rounded">12</span> - <span className="bg-gray-100 px-1 rounded">4</span> = <span className="bg-green-100 px-1 rounded">+8</span> → 8 frets forward</p>
                <p className="text-xs text-gray-600">Perfect for melodic doubling!</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-3">🎵 Major 3rd</h4>
                <p className="text-sm mb-2"><strong>E-A strings:</strong> <span className="bg-purple-100 px-1 rounded">4</span> - <span className="bg-gray-100 px-1 rounded">5</span> = <span className="bg-green-100 px-1 rounded">-1</span> → 1 fret back</p>
                <p className="text-sm mb-2"><strong>A-D strings:</strong> <span className="bg-purple-100 px-1 rounded">4</span> - <span className="bg-gray-100 px-1 rounded">5</span> = <span className="bg-green-100 px-1 rounded">-1</span> → 1 fret back</p>
                <p className="text-sm mb-2"><strong>G-B strings:</strong> <span className="bg-purple-100 px-1 rounded">4</span> - <span className="bg-gray-100 px-1 rounded">4</span> = <span className="bg-green-100 px-1 rounded">0</span> → Same fret</p>
                <p className="text-xs text-gray-600">Essential for major chord shapes!</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-3">🎵 Perfect 4th</h4>
                <p className="text-sm mb-2"><strong>E-A strings:</strong> <span className="bg-purple-100 px-1 rounded">5</span> - <span className="bg-gray-100 px-1 rounded">5</span> = <span className="bg-green-100 px-1 rounded">0</span> → Same fret</p>
                <p className="text-sm mb-2"><strong>A-D strings:</strong> <span className="bg-purple-100 px-1 rounded">5</span> - <span className="bg-gray-100 px-1 rounded">5</span> = <span className="bg-green-100 px-1 rounded">0</span> → Same fret</p>
                <p className="text-sm mb-2"><strong>G-B strings:</strong> <span className="bg-purple-100 px-1 rounded">5</span> - <span className="bg-gray-100 px-1 rounded">4</span> = <span className="bg-green-100 px-1 rounded">+1</span> → 1 fret forward</p>
                <p className="text-xs text-gray-600">Perfect for sus4 chords and quartal harmony!</p>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-brown-600 mb-3">Visual Examples: Cross-String Intervals</h3>

          {/* A-D String Pair Example */}
          <div className="bg-white border-2 border-gray-300 p-6 rounded-lg mb-6 overflow-x-auto mobile-scroll-hint">
            <h4 className="font-semibold mb-8 text-center">A-D String Pair: Major 3rd Relationship</h4>
            
            <div className="min-w-max pt-2">
              {/* Clean breakdown above the diagram */}
              <div className="mb-6 text-center">
                <div className="inline-flex items-center space-x-2 bg-gray-50 px-4 py-2 rounded">
                  <span className="bg-green-100 px-2 py-1 rounded text-sm font-bold">1 fret back</span>
                  <span>+</span>
                  <span className="bg-purple-100 px-2 py-1 rounded text-sm font-bold">4 frets (Major 3rd)</span>
                  <span>=</span>
                  <span className="bg-gray-100 px-2 py-1 rounded text-sm font-bold">5 frets total</span>
                </div>
              </div>

              {/* String representation */}
              <div className="space-y-4">
                {/* D String */}
                <div className="flex items-center">
                  <div className="w-16 text-right pr-4 font-medium">D:</div>
                  {Array.from({length: 13}, (_, i) => {
                    const fret = i;
                    const isCrossStringMajor3rd = fret === 2; // E on 2nd fret D string (cross-string major 3rd)
                    
                    return (
                      <div key={fret} className="relative">
                        <div 
                          className={`w-12 h-12 border-2 flex items-center justify-center text-sm font-bold
                            ${isCrossStringMajor3rd
                              ? 'bg-orange-400 text-black border-orange-500'
                              : 'bg-gray-100 border-gray-300 text-gray-400'
                            }`}
                        >
                          {isCrossStringMajor3rd ? 'E' : '•'}
                        </div>
                        
                        {/* Fret numbers below */}
                        <div className="text-xs text-center mt-1 text-gray-600">
                          {fret}
                        </div>
                        
                        {/* Labels above */}
                        {isCrossStringMajor3rd && (
                          <div className="text-xs text-center absolute -top-4 left-1/2 transform -translate-x-1/2 bg-orange-600 text-white rounded px-1">
                            M3rd
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* A String */}
                <div className="flex items-center">
                  <div className="w-16 text-right pr-4 font-medium">A:</div>
                  {Array.from({length: 13}, (_, i) => {
                    const fret = i;
                    const isRoot = fret === 3; // C on 3rd fret A string
                    const isSameStringMajor3rd = fret === 7; // E on 7th fret A string (same-string major 3rd)
                    
                    return (
                      <div key={fret} className="relative">
                        <div 
                          className={`w-12 h-12 border-2 flex items-center justify-center text-sm font-bold
                            ${isRoot 
                              ? 'bg-blue-500 text-white border-blue-600' 
                              : isSameStringMajor3rd
                              ? 'bg-orange-400 text-black border-orange-500'
                              : 'bg-gray-100 border-gray-300 text-gray-400'
                            }`}
                        >
                          {isRoot ? 'C' : isSameStringMajor3rd ? 'E' : '•'}
                        </div>
                        
                        {/* Fret numbers below */}
                        <div className="text-xs text-center mt-1 text-gray-600">
                          {fret}
                        </div>
                        
                        {/* Labels above */}
                        {isRoot && (
                          <div className="text-xs text-center absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white rounded px-1">
                            Root
                          </div>
                        )}
                        {isSameStringMajor3rd && (
                          <div className="text-xs text-center absolute -top-4 left-1/2 transform -translate-x-1/2 bg-orange-600 text-white rounded px-1">
                            M3rd
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Formula explanation */}
              <div className="text-center mt-4 space-y-2">
                <p className="font-semibold">Major 3rd Cross-String Formula:</p>
                <div className="bg-white p-3 rounded border">
                  <p className="text-sm"><strong>Root:</strong> C on 3rd fret A string</p>
                  <p className="text-sm"><strong>Same string:</strong> Major 3rd (E) = 4 frets higher → 7th fret A string</p>
                  <p className="text-lg font-bold my-2">
                    <span className="bg-purple-100 px-2 py-1 rounded text-sm font-bold">4 (same string)</span>
                    <span className="mx-2">-</span>
                    <span className="bg-gray-100 px-2 py-1 rounded text-sm font-bold">5 (string tuning interval)</span>
                    <span className="mx-2">=</span>
                    <span className="bg-green-100 px-2 py-1 rounded text-sm font-bold">-1 → 1 fret back</span>
                  </p>
                  <p className="text-sm"><strong>Cross-string:</strong> E on 2nd fret D string</p>
                </div>
              </div>
            </div>
          </div>

          {/* G-B String Pair Example */}
          <div className="bg-white border-2 border-gray-300 p-6 rounded-lg mb-6 overflow-x-auto mobile-scroll-hint">
            <h4 className="font-semibold mb-8 text-center">G-B String Pair: Major 3rd Relationship</h4>
            
            <div className="min-w-max pt-2">
              {/* Clean breakdown above the diagram */}
              <div className="mb-6 text-center">
                <div className="inline-flex items-center space-x-2 bg-gray-50 px-4 py-2 rounded">
                  <span className="bg-green-100 px-2 py-1 rounded text-sm font-bold">0 fret back</span>
                  <span>+</span>
                  <span className="bg-purple-100 px-2 py-1 rounded text-sm font-bold">4 frets (Major 3rd)</span>
                  <span>=</span>
                  <span className="bg-gray-100 px-2 py-1 rounded text-sm font-bold">4 frets total</span>
                </div>
              </div>

              {/* String representation */}
              <div className="space-y-4">
                {/* B String */}
                <div className="flex items-center">
                  <div className="w-16 text-right pr-4 font-medium">B:</div>
                  {Array.from({length: 13}, (_, i) => {
                    const fret = i + 3;
                    const isMajorThirdOnB = fret === 5; // E on 5th fret B string
                    const noteNames: {[key: number]: string} = {5: 'E'};
                    
                    return (
                      <div key={fret} className="relative">
                        <div 
                          className={`w-12 h-12 border-2 flex items-center justify-center text-sm font-bold
                            ${isMajorThirdOnB
                              ? 'bg-orange-400 text-black border-orange-500'
                              : 'bg-gray-100 border-gray-300 text-gray-400'
                            }`}
                        >
                          {isMajorThirdOnB ? noteNames[fret] : '•'}
                        </div>
                        
                        {/* Fret numbers below */}
                        <div className="text-xs text-center mt-1 text-gray-600">
                          {fret}
                        </div>
                        
                        {/* Labels above */}
                        {isMajorThirdOnB && (
                          <div className="text-xs text-center absolute -top-4 left-1/2 transform -translate-x-1/2 bg-orange-600 text-white rounded px-1">
                            M3rd
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* G String */}
                <div className="flex items-center">
                  <div className="w-16 text-right pr-4 font-medium">G:</div>
                  {Array.from({length: 13}, (_, i) => {
                    const fret = i + 3;
                    const isRoot = fret === 5; // C on 5th fret G string
                    const isMajorThird = fret === 9; // E on 9th fret G string (4 frets higher)
                    const noteNames: {[key: number]: string} = {5: 'C', 9: 'E'};
                    
                    return (
                      <div key={fret} className="relative">
                        <div 
                          className={`w-12 h-12 border-2 flex items-center justify-center text-sm font-bold
                            ${isRoot 
                              ? 'bg-blue-500 text-white border-blue-600' 
                              : isMajorThird
                              ? 'bg-orange-400 text-black border-orange-500'
                              : 'bg-gray-100 border-gray-300 text-gray-400'
                            }`}
                        >
                          {isRoot || isMajorThird ? noteNames[fret] : '•'}
                        </div>
                        
                        {/* Fret numbers below */}
                        <div className="text-xs text-center mt-1 text-gray-600">
                          {fret}
                        </div>
                        
                        {/* Labels above */}
                        {isRoot && (
                          <div className="text-xs text-center absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white rounded px-1">
                            Root
                          </div>
                        )}
                        {isMajorThird && (
                          <div className="text-xs text-center absolute -top-4 left-1/2 transform -translate-x-1/2 bg-orange-600 text-white rounded px-1">
                            M3rd
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Formula explanation */}
              <div className="text-center mt-4 space-y-2">
                <p className="font-semibold">Major 3rd Cross-String Formula:</p>
                <div className="bg-white p-3 rounded border">
                  <p className="text-sm"><strong>Root:</strong> C on 5th fret G string</p>
                  <p className="text-sm"><strong>Same string:</strong> Major 3rd (E) = 4 frets higher → 9th fret G string</p>
                  <p className="text-lg font-bold my-2">
                    <span className="bg-purple-100 px-2 py-1 rounded text-sm font-bold">4 (same string)</span>
                    <span className="mx-2">-</span>
                    <span className="bg-gray-100 px-2 py-1 rounded text-sm font-bold">4 (string tuning)</span>
                    <span className="mx-2">=</span>
                    <span className="bg-green-100 px-2 py-1 rounded text-sm font-bold">0 → Same fret</span>
                  </p>
                  <p className="text-sm"><strong>Cross-string:</strong> E on 5th fret B string</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-8">
            <h4 className="font-semibold mb-2">💡 Why This Matters</h4>
            <p className="text-sm">
              These relationships help you understand practical ways of finding notes on adjacent strings. Start with the simple "5 frets back" rule for the same note, then use the interval formula when you need different intervals. Instead of memorizing every note position, you can calculate where notes and intervals appear across string pairs.
            </p>
          </div>

          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-8">
            <h4 className="font-semibold mb-2">🔗 How the Simple Examples Connect to the Formula</h4>
            <p className="text-sm mb-3">
              Notice that the initial "same note" examples actually follow the cross-string interval formula too! 
              When finding the <strong>same note</strong> on adjacent strings, the same-string interval is 0 frets:
            </p>
            
            <div className="space-y-2 text-sm">
              <div className="bg-white p-2 rounded">
                <p><strong>A on E and A strings:</strong></p>
                <p>Same-string interval = 0 frets (same note) | String interval = 5 frets</p>
                <p className="font-semibold text-amber-600">0 - 5 = -5 → Move 5 frets back ✓</p>
              </div>
              
              <div className="bg-white p-2 rounded">
                <p><strong>C on E and A strings:</strong></p>
                <p>Same-string interval = 0 frets (same note) | String interval = 5 frets</p>
                <p className="font-semibold text-amber-600">0 - 5 = -5 → Move 5 frets back ✓</p>
              </div>
            </div>
            
            <p className="text-sm mt-3">
              The formula works for everything - from finding the same note (interval = 0) to finding any musical interval!
            </p>
          </div>

          <p className="mb-8">
            These cross-string interval relationships are the foundation of moveable chord shapes and scale patterns. Once you understand how intervals translate across string pairs, you can transpose any musical idea to different positions on the neck.
          </p>

          {/* Related Posts */}
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">🔗 Related Articles</h3>
            <div className="grid md:grid-cols-1 gap-4">
              <Link href="/blog/understanding-guitar-fretboard" className="block p-4 bg-white rounded border hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-amber-800 mb-2">Part 1: Why Strings Are Tuned This Way</h4>
                <p className="text-sm text-gray-600">The theoretical foundation behind guitar tuning and cross-string interval relationships</p>
              </Link>
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