import { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Guitar Fretboard Navigation: Cross-String Movement Formulas',
  description: 'Master practical techniques for finding notes and intervals across guitar strings. Learn mathematical relationships that make fretboard navigation easy.',
  openGraph: {
    title: 'Guitar Fretboard Navigation: Cross-String Movement Formulas',
    description: 'Master practical techniques for finding notes and intervals across guitar strings with mathematical formulas and visual examples.',
    type: 'article',
    images: [
      {
        url: '/guitar-tuning-thumbnail.svg',
        width: 1200,
        height: 630,
        alt: 'Guitar Fretboard Navigation Guide'
      }
    ]
  },
  alternates: {
    canonical: 'https://mikenelsonguitarlessons.co.nz/blog/guitar-fretboard-navigation/',
  }
};

export default function GuitarFretboardNavigation() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <div className="container mx-auto px-6 py-12">
        <article className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            {/* Breadcrumb */}
            <nav className="text-sm text-gray-600 mb-6">
              <Link href="/" className="hover:text-amber-600">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/blog" className="hover:text-amber-600">Blog</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900">Guitar Fretboard Navigation</span>
            </nav>

            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-amber-800 mb-6">
                Guitar Fretboard Navigation: Cross-String Movement Formulas
              </h1>
              
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Master practical techniques for finding notes and intervals across guitar strings using mathematical relationships
              </p>

              {/* Link back to Part 1 */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6 mb-8 shadow-sm">
                <p className="text-amber-800">
                  📖 <strong>Part 2 of 2:</strong> This builds on the theoretical foundation from{" "}
                  <Link href="/blog/understanding-guitar-fretboard" className="text-amber-600 hover:text-amber-800 underline">
                    Part 1: Why Strings Are Tuned This Way
                  </Link>. 
                  Start there if you want to understand the "why" behind these techniques.
                </p>
              </div>


            </div>

            <div className="prose prose-lg max-w-none">
              {/* Key Insight */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-100 p-6 rounded-lg mb-8 shadow-sm">
                <h3 className="text-xl font-semibold text-amber-700 mb-4">💡 The Guitar Secret: Finding Notes Across Strings</h3>
                <p className="text-gray-700 mb-4">
                  <strong>The basic idea:</strong> When you move up the fretboard on one string, you can find that same note by moving back on the next string.
                </p>
                
                <div className="bg-white p-4 rounded-lg border shadow-sm mb-4">
                  <h4 className="font-semibold mb-3 text-amber-800">🎯 How it works:</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• Guitar strings are tuned 5 frets apart (except G to B which is 4 frets)</li>
                    <li>• If you go up 2 frets on the low E string, the same note is 3 frets back on the A string</li>
                    <li>• If you go up 3 frets, the same note is 2 frets back</li>
                    <li>• They always add up to 5 (or 4 for G to B)</li>
                  </ul>
                  
                  <p className="text-sm text-gray-700 mt-3">
                    <strong>It works for going from higher to lower notes too.</strong> If you go down 2 frets on the high E string, the same note is 3 frets away (but forward rather than back).
                  </p>
                </div>

                <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-lg border border-amber-200">
                  <h4 className="font-semibold mb-2 text-amber-800">Why this helps:</h4>
                  <p className="text-sm text-gray-700">
                    This shows us two possible paths to find the same note. It's just another way of thinking about the fretboard.
                  </p>
                </div>
              </div>

              {/* Simple Visual Example */}
              <div className="bg-white border-2 border-amber-300 p-6 rounded-lg mb-8 shadow-sm">
                <h4 className="font-semibold mb-4 text-center text-amber-800">Example: A to C</h4>
                


                <div className="space-y-3 mb-4 relative">

                  
                  {/* A String - Higher String */}
                  <div className="flex items-center relative">
                    <div className="w-12 text-right pr-2 font-medium text-xs">A:</div>
                    {Array.from({length: 10}, (_, i) => {
                      const fret = i;
                      const isTargetC = fret === 3; // C on 3rd fret A string (cross-string target)
                      
                      return (
                        <div key={fret} className="relative">
                          <div 
                            className={`w-8 h-8 border-2 flex items-center justify-center text-xs font-bold
                              ${isTargetC
                                ? 'bg-amber-400 text-white border-amber-500'
                                : 'bg-gray-100 border-gray-300 text-gray-400'
                              }`}
                          >
                            {isTargetC ? 'C' : '•'}
                          </div>
                          <div className="text-xs text-center mt-1 text-gray-600">{fret}</div>

                        </div>
                      );
                    })}
                    
                    {/* 2 frets label positioned between fret 5 and fret 3 */}
                    <div className="absolute -top-6" style={{left: 'calc(4 * 2rem + 1.5rem + 0.75rem)'}}> {/* Position between fret 3 and 5 */}
                      <div className="flex items-center text-xs font-semibold text-orange-600">
                        <span>←</span>
                        <span className="ml-1">2 frets</span>
                      </div>
                    </div>
                  </div>

                  {/* E String - Lower String */}
                  <div className="flex items-center relative">
                    <div className="w-12 text-right pr-2 font-medium text-xs">E:</div>
                    {Array.from({length: 10}, (_, i) => {
                      const fret = i;
                      const isStartA = fret === 5; // A on 5th fret E string (root)
                      const isSameStringC = fret === 8; // C on 8th fret E string (same-string target)
                      
                      return (
                        <div key={fret} className="relative">
                          <div 
                            className={`w-8 h-8 border-2 flex items-center justify-center text-xs font-bold
                              ${isStartA
                                ? 'bg-blue-500 text-white border-blue-600'
                                : isSameStringC
                                ? 'bg-amber-200 text-amber-800 border-amber-400'
                                : 'bg-gray-100 border-gray-300 text-gray-400'
                              }`}
                          >
                            {isStartA ? 'A' : isSameStringC ? 'C' : '•'}
                          </div>
                          <div className="text-xs text-center mt-1 text-gray-600">{fret}</div>

                        </div>
                      );
                    })}
                    
                    {/* 3 frets label positioned between fret 5 and fret 8 */}
                    <div className="absolute -bottom-4" style={{left: 'calc(6.5 * 2rem + 1.5rem)'}}> {/* Position between fret 5 and 8 */}
                      <div className="flex items-center text-xs font-semibold text-orange-600">
                        <span className="mr-1">3 frets</span>
                        <span>→</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-3 rounded border border-amber-200">
                  <p className="text-sm text-gray-700 text-center">
                    Two paths to the same note C: 8th fret E string OR 3rd fret A string
                  </p>
                </div>
              </div>

              {/* Math Section */}
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-lg mb-8 shadow-sm">
                <h3 className="text-xl font-semibold text-amber-700 mb-4">🔢 Maths and More Examples</h3>
                <p className="text-amber-700 mb-4">
                  You don't have to understand the maths. Looking at the diagrams will be enough for most to understand this concept. 
                  Just look at how many frets away the note is on the same string from the note you want to start from and figure out 
                  the other puzzle piece that adds up to 5 (4 for G and B string pair). You'll see 2s pair with 3s, 1s pair with 4s and so on.
                </p>
              </div>

              {/* The Formula */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-amber-800 mb-6">🔥 The Two Formulas</h2>
                
                {/* Formula Introduction */}
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6 mb-6 shadow-sm">
                  <p className="text-amber-900 text-sm mb-4">
                    Here are the two simple formulas that let you find any note on any adjacent string pair:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg border shadow-sm text-center">
                      <h4 className="font-semibold text-orange-800 mb-2">Moving to Higher Notes</h4>
                      <span className="bg-orange-100 px-3 py-2 rounded-lg text-lg font-bold text-orange-900">C = M - S</span>
                      <p className="text-xs text-orange-700 mt-2">Cross-string position = Movement - String interval</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border shadow-sm text-center">
                      <h4 className="font-semibold text-amber-800 mb-2">Moving to Lower Notes</h4>
                      <span className="bg-amber-100 px-3 py-2 rounded-lg text-lg font-bold text-amber-900">C = M + S</span>
                      <p className="text-xs text-amber-700 mt-2">Cross-string position = Movement + String interval</p>
                    </div>
                  </div>
                  <div className="mt-4 text-xs text-amber-700">
                    <p><strong>Where:</strong> C = Cross-string fret position, M = Movement along string (in frets), S = String tuning interval (5 or 4 frets)</p>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-xl p-6 mb-6 shadow-sm">
                  <h3 className="font-semibold mb-3 text-amber-800">🔑 Key Insight</h3>
                  <p className="text-amber-900 text-sm mb-4">
                    The same note is always found in a predictable relative position on adjacent strings:
                  </p>
                  <div className="bg-white p-4 rounded-lg border shadow-sm">
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                      <div className="text-center">
                        <p><strong>Higher String (thinner):</strong></p>
                        <p>Same note is found <strong>BACK</strong></p>
                        <p className="text-orange-600 font-bold">Back = -S</p>
                      </div>
                      <div className="text-center">
                        <p><strong>Lower String (thicker):</strong></p>
                        <p>Same note is found <strong>FORWARD</strong></p>
                        <p className="text-amber-600 font-bold">Forward = +S</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Moving to Higher Notes */}
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-xl p-6 mb-6 shadow-sm">
                  <h3 className="font-semibold mb-3 text-orange-800">📈 Moving to Higher Notes (Ascending)</h3>
                  <p className="text-orange-900 text-sm mb-4">
                    When moving UP to a higher note on a thinner string, you typically move BACK on the fretboard.
                  </p>
                  
                  <div className="text-center mb-4">
                    <div className="bg-white p-4 rounded-lg border-2 border-orange-300 shadow-sm">
                      <h4 className="font-semibold text-orange-800 mb-2">Ascending Formula</h4>
                      <span className="bg-orange-100 px-4 py-2 rounded-lg text-xl font-bold text-orange-900">C = M - S</span>
                      <p className="text-sm text-orange-700 mt-2">Move back = negative = minus sign</p>
                    </div>
                  </div>

                  {/* Visual Example: E to A String */}
                  <div className="bg-white border-2 border-orange-300 p-6 rounded-lg mb-4 shadow-sm">
                    <h5 className="font-semibold mb-4 text-center text-orange-800">Example: Minor 3rd Up (E to A Strings)</h5>
                    


                    <div className="space-y-3 mb-4">
                      {/* Direction Arrow */}
                      <div className="flex items-center justify-center mb-2">
                        <div className="text-2xl text-orange-600">↑</div>
                        <span className="ml-2 text-xs text-gray-600">Ascending Movement</span>
                      </div>
                      
                      {/* A String - Higher String */}
                      <div className="flex items-center">
                        <div className="w-12 text-right pr-2 font-medium text-xs">A:</div>
                        {Array.from({length: 10}, (_, i) => {
                          const fret = i;
                          const isTargetC = fret === 3; // C on 3rd fret A string (cross-string target)
                          
                          return (
                            <div key={fret} className="relative">
                              <div 
                                className={`w-8 h-8 border-2 flex items-center justify-center text-xs font-bold
                                  ${isTargetC
                                    ? 'bg-orange-400 text-white border-orange-500'
                                    : 'bg-gray-100 border-gray-300 text-gray-400'
                                  }`}
                              >
                                {isTargetC ? 'C' : '•'}
                              </div>
                              <div className="text-xs text-center mt-1 text-gray-600">{fret}</div>

                            </div>
                          );
                        })}
                      </div>

                      {/* E String - Lower String */}
                      <div className="flex items-center">
                        <div className="w-12 text-right pr-2 font-medium text-xs">E:</div>
                        {Array.from({length: 10}, (_, i) => {
                          const fret = i;
                          const isStartA = fret === 5; // A on 5th fret E string (root)
                          const isSameStringC = fret === 8; // C on 8th fret E string (same-string target)
                          
                          return (
                            <div key={fret} className="relative">
                              <div 
                                className={`w-8 h-8 border-2 flex items-center justify-center text-xs font-bold
                                  ${isStartA
                                    ? 'bg-blue-500 text-white border-blue-600'
                                    : isSameStringC
                                    ? 'bg-orange-200 text-orange-800 border-orange-400'
                                    : 'bg-gray-100 border-gray-300 text-gray-400'
                                  }`}
                              >
                                {isStartA ? 'A' : isSameStringC ? 'C' : '•'}
                              </div>
                              <div className="text-xs text-center mt-1 text-gray-600">{fret}</div>

                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="bg-orange-50 p-3 rounded border">
                      <div className="text-xs space-y-1">
                        <p><strong>Movement (M):</strong> A to C = +3 semitones (minor 3rd up)</p>
                        <p><strong>Calculation:</strong> C = M - S = 3 - 5 = -2</p>
                        <p><strong>Result:</strong> Move back 2 frets: 5th - 2 = 3rd fret A string ✓</p>
                        <p><strong>Compare:</strong> Same-string C on 8th fret vs cross-string on 3rd fret</p>
                      </div>
                    </div>
                  </div>

                  {/* Visual Example: G to B String */}
                  <div className="bg-white border-2 border-orange-300 p-6 rounded-lg mb-4 shadow-sm">
                    <h5 className="font-semibold mb-4 text-center text-orange-800">Example: Major 3rd Up (G to B Strings)</h5>
                    


                    <div className="space-y-3 mb-4">
                      {/* Direction Arrow */}
                      <div className="flex items-center justify-center mb-2">
                        <div className="text-2xl text-orange-600">↑</div>
                        <span className="ml-2 text-xs text-gray-600">Ascending Movement</span>
                      </div>
                      
                      {/* B String - Higher String */}
                      <div className="flex items-center">
                        <div className="w-12 text-right pr-2 font-medium text-xs">B:</div>
                        {Array.from({length: 10}, (_, i) => {
                          const fret = i;
                          const isTargetE = fret === 5; // E on 5th fret B string (cross-string target)
                          
                          return (
                            <div key={fret} className="relative">
                              <div 
                                className={`w-8 h-8 border-2 flex items-center justify-center text-xs font-bold
                                  ${isTargetE
                                    ? 'bg-orange-400 text-white border-orange-500'
                                    : 'bg-gray-100 border-gray-300 text-gray-400'
                                  }`}
                              >
                                {isTargetE ? 'E' : '•'}
                              </div>
                              <div className="text-xs text-center mt-1 text-gray-600">{fret}</div>

                            </div>
                          );
                        })}
                      </div>

                      {/* G String - Lower String */}
                      <div className="flex items-center">
                        <div className="w-12 text-right pr-2 font-medium text-xs">G:</div>
                        {Array.from({length: 10}, (_, i) => {
                          const fret = i;
                          const isStartC = fret === 5; // C on 5th fret G string (root)
                          const isSameStringE = fret === 9; // E on 9th fret G string (same-string target)
                          
                          return (
                            <div key={fret} className="relative">
                              <div 
                                className={`w-8 h-8 border-2 flex items-center justify-center text-xs font-bold
                                  ${isStartC
                                    ? 'bg-blue-500 text-white border-blue-600'
                                    : isSameStringE
                                    ? 'bg-orange-200 text-orange-800 border-orange-400'
                                    : 'bg-gray-100 border-gray-300 text-gray-400'
                                  }`}
                              >
                                {isStartC ? 'C' : isSameStringE ? 'E' : '•'}
                              </div>
                              <div className="text-xs text-center mt-1 text-gray-600">{fret}</div>

                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="bg-orange-50 p-3 rounded border">
                      <div className="text-xs space-y-1">
                        <p><strong>Movement (M):</strong> C to E = +4 semitones (major 3rd up)</p>
                        <p><strong>Calculation:</strong> C = M - S = 4 - 4 = 0</p>
                        <p><strong>Result:</strong> Same fret: 5th fret B string ✓</p>
                        <p><strong>Compare:</strong> Same-string E on 9th fret vs cross-string on 5th fret</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg border shadow-sm">
                    <h5 className="font-semibold mb-2">More Examples:</h5>
                    <div className="space-y-2 text-sm">
                      <div className="bg-orange-50 p-2 rounded">
                        <p><strong>Major 3rd up (+4 frets):</strong> C = 4 - 5 = -1 → move back 1 fret</p>
                      </div>
                      <div className="bg-orange-50 p-2 rounded">
                        <p><strong>Perfect 5th up (+7 frets):</strong> C = 7 - 5 = +2 → move forward 2 frets</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Moving to Lower Notes */}
                <div className="bg-gradient-to-br from-amber-100 to-amber-200 border border-amber-300 rounded-xl p-6 mb-6 shadow-sm">
                  <h3 className="font-semibold mb-3 text-amber-800">📉 Moving to Lower Notes (Descending)</h3>
                  <p className="text-amber-900 text-sm mb-4">
                    When moving DOWN to a lower note on a thicker string, you typically move FORWARD on the fretboard.
                  </p>
                  
                  <div className="text-center mb-4">
                    <div className="bg-white p-4 rounded-lg border-2 border-amber-300 shadow-sm">
                      <h4 className="font-semibold text-amber-800 mb-2">Descending Formula</h4>
                      <span className="bg-amber-100 px-4 py-2 rounded-lg text-xl font-bold text-amber-900">C = M + S</span>
                      <p className="text-sm text-amber-700 mt-2">Move forward = positive = plus sign</p>
                    </div>
                  </div>

                  {/* Visual Example: A to E String */}
                  <div className="bg-white border-2 border-amber-400 p-6 rounded-lg mb-4 shadow-sm">
                    <h5 className="font-semibold mb-4 text-center text-amber-800">Example: Whole Step Down (A to E Strings)</h5>
                    


                    <div className="space-y-3 mb-4">
                      {/* Direction Arrow */}
                      <div className="flex items-center justify-center mb-2">
                        <div className="text-2xl text-amber-600">↓</div>
                        <span className="ml-2 text-xs text-gray-600">Descending Movement</span>
                      </div>
                      
                      {/* A String - Higher String */}
                      <div className="flex items-center">
                        <div className="w-12 text-right pr-2 font-medium text-xs">A:</div>
                        {Array.from({length: 10}, (_, i) => {
                          const fret = i;
                          const isStartingD = fret === 5; // D on 5th fret A string (root)
                          const isTargetC = fret === 3; // C on 3rd fret A string (same-string target)
                          
                          return (
                            <div key={fret} className="relative">
                              <div 
                                className={`w-8 h-8 border-2 flex items-center justify-center text-xs font-bold
                                  ${isStartingD
                                    ? 'bg-blue-500 text-white border-blue-600'
                                    : isTargetC
                                    ? 'bg-amber-400 text-white border-amber-500'
                                    : 'bg-gray-100 border-gray-300 text-gray-400'
                                  }`}
                              >
                                {isStartingD ? 'D' : isTargetC ? 'C' : '•'}
                              </div>
                              <div className="text-xs text-center mt-1 text-gray-600">{fret}</div>
                            </div>
                          );
                        })}
                      </div>

                      {/* E String - Lower String */}
                      <div className="flex items-center">
                        <div className="w-12 text-right pr-2 font-medium text-xs">E:</div>
                        {Array.from({length: 10}, (_, i) => {
                          const fret = i;
                          const isTargetC = fret === 8; // C on 8th fret E string (cross-string target)
                          
                          return (
                            <div key={fret} className="relative">
                              <div 
                                className={`w-8 h-8 border-2 flex items-center justify-center text-xs font-bold
                                  ${isTargetC
                                    ? 'bg-amber-500 text-white border-amber-600'
                                    : 'bg-gray-100 border-gray-300 text-gray-400'
                                  }`}
                              >
                                {isTargetC ? 'C' : '•'}
                              </div>
                              <div className="text-xs text-center mt-1 text-gray-600">{fret}</div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="bg-amber-50 p-3 rounded border">
                      <div className="text-xs space-y-1">
                        <p><strong>Movement (M):</strong> D to C = -2 semitones (whole step down)</p>
                        <p><strong>Calculation:</strong> C = M + S = (-2) + 5 = +3</p>
                        <p><strong>Result:</strong> Move forward 3 frets: 5th + 3 = 8th fret E string ✓</p>
                        <p><strong>Compare:</strong> Same-string C on 3rd fret vs cross-string on 8th fret</p>
                      </div>
                    </div>
                  </div>

                  {/* Visual Example: B to G String */}
                  <div className="bg-white border-2 border-amber-400 p-6 rounded-lg mb-4 shadow-sm">
                    <h5 className="font-semibold mb-4 text-center text-amber-800">Example: Minor 3rd Down (B to G Strings)</h5>
                    


                    <div className="space-y-3 mb-4">
                      {/* Direction Arrow */}
                      <div className="flex items-center justify-center mb-2">
                        <div className="text-2xl text-amber-600">↓</div>
                        <span className="ml-2 text-xs text-gray-600">Descending Movement</span>
                      </div>
                      
                      {/* B String - Higher String */}
                      <div className="flex items-center">
                        <div className="w-12 text-right pr-2 font-medium text-xs">B:</div>
                        {Array.from({length: 10}, (_, i) => {
                          const fret = i;
                          const isStartG = fret === 8; // G on 8th fret B string (root)
                          const isSameStringE = fret === 5; // E on 5th fret B string (same-string target)
                          
                          return (
                            <div key={fret} className="relative">
                              <div 
                                className={`w-8 h-8 border-2 flex items-center justify-center text-xs font-bold
                                  ${isStartG
                                    ? 'bg-blue-500 text-white border-blue-600'
                                    : isSameStringE
                                    ? 'bg-amber-200 text-amber-800 border-amber-400'
                                    : 'bg-gray-100 border-gray-300 text-gray-400'
                                  }`}
                              >
                                {isStartG ? 'G' : isSameStringE ? 'E' : '•'}
                              </div>
                              <div className="text-xs text-center mt-1 text-gray-600">{fret}</div>

                            </div>
                          );
                        })}
                      </div>

                      {/* G String - Lower String */}
                      <div className="flex items-center">
                        <div className="w-12 text-right pr-2 font-medium text-xs">G:</div>
                        {Array.from({length: 10}, (_, i) => {
                          const fret = i;
                          const isTargetE = fret === 9; // E on 9th fret G string (cross-string target)
                          
                          return (
                            <div key={fret} className="relative">
                              <div 
                                className={`w-8 h-8 border-2 flex items-center justify-center text-xs font-bold
                                  ${isTargetE
                                    ? 'bg-amber-500 text-white border-amber-600'
                                    : 'bg-gray-100 border-gray-300 text-gray-400'
                                  }`}
                              >
                                {isTargetE ? 'E' : '•'}
                              </div>
                              <div className="text-xs text-center mt-1 text-gray-600">{fret}</div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="bg-amber-50 p-3 rounded border">
                      <div className="text-xs space-y-1">
                        <p><strong>Movement (M):</strong> G to E = -3 semitones (minor 3rd down)</p>
                        <p><strong>Calculation:</strong> C = M + S = (-3) + 4 = +1</p>
                        <p><strong>Result:</strong> Move forward 1 fret: 8th + 1 = 9th fret G string ✓</p>
                        <p><strong>Compare:</strong> Same-string E on 5th fret vs cross-string on 9th fret</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-lg border shadow-sm">
                    <h5 className="font-semibold mb-2">More Examples:</h5>
                    <div className="space-y-2 text-sm">
                      <div className="bg-orange-50 p-2 rounded">
                        <p><strong>Whole step down (-2 frets):</strong> C = -2 + 5 = +3 → move forward 3 frets</p>
                      </div>
                      <div className="bg-orange-50 p-2 rounded">
                        <p><strong>Perfect 4th down (-5 frets):</strong> C = -5 + 5 = 0 → same fret</p>
                      </div>
                      <div className="bg-amber-50 p-2 rounded border border-amber-200">
                        <p><strong>High E to B string (-2 frets):</strong> C = -2 + 5 = +3 → move forward 3 frets on the B string</p>
                        <p className="text-xs text-gray-600 mt-1">This works for any note - go down 2 frets on high E, same note is 3 frets forward on B string!</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Memory Aid */}
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4 shadow-sm">
                  <h4 className="font-semibold text-amber-800 mb-2">🧠 Memory Aid</h4>
                  <div className="text-center text-sm text-amber-900">
                    <p className="font-bold">Move Forward = +S • Move Back = -S</p>
                    <p className="text-xs mt-1">The same note is found back on higher strings, forward on lower strings</p>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-white rounded-lg border shadow-sm">
                  <p className="text-sm"><strong>Where:</strong></p>
                  <ul className="text-sm space-y-1">
                    <li><strong>M</strong> = Movement along current string (+ascending, -descending)</li>
                    <li><strong>C</strong> = Cross-string movement (+forward, -backward)</li>
                    <li><strong>S</strong> = String tuning interval (5 or 4 frets)</li>
                  </ul>
                </div>
              </div>

              {/* Practical Applications */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-amber-800 mb-6">🎸 Practical Applications</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold mb-3">🎵 Power Chords (Perfect 5th)</h4>
                    <p className="text-sm mb-2"><strong>E-A strings:</strong> 7 - 5 = +2 → 2 frets forward</p>
                    <p className="text-sm mb-2"><strong>A-D strings:</strong> 7 - 5 = +2 → 2 frets forward</p>
                    <p className="text-sm mb-2"><strong>G-B strings:</strong> 7 - 4 = +3 → 3 frets forward</p>
                    <p className="text-xs text-gray-600">Classic power chord shape!</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold mb-3">🎵 Major 3rds</h4>
                    <p className="text-sm mb-2"><strong>E-A strings:</strong> 4 - 5 = -1 → 1 fret back</p>
                    <p className="text-sm mb-2"><strong>A-D strings:</strong> 4 - 5 = -1 → 1 fret back</p>
                    <p className="text-sm mb-2"><strong>G-B strings:</strong> 4 - 4 = 0 → Same fret</p>
                    <p className="text-xs text-gray-600">Essential for major chord shapes!</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold mb-3">🎵 Octaves</h4>
                    <p className="text-sm mb-2"><strong>E-A strings:</strong> 12 - 5 = +7 → 7 frets forward</p>
                    <p className="text-sm mb-2"><strong>A-D strings:</strong> 12 - 5 = +7 → 7 frets forward</p>
                    <p className="text-sm mb-2"><strong>G-B strings:</strong> 12 - 4 = +8 → 8 frets forward</p>
                    <p className="text-xs text-gray-600">Perfect for melodic doubling!</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg shadow-sm">
                    <h4 className="font-semibold mb-3">🎵 Perfect 4th</h4>
                    <p className="text-sm mb-2"><strong>E-A strings:</strong> 5 - 5 = 0 → Same fret</p>
                    <p className="text-sm mb-2"><strong>A-D strings:</strong> 5 - 5 = 0 → Same fret</p>
                    <p className="text-sm mb-2"><strong>G-B strings:</strong> 5 - 4 = +1 → 1 fret forward</p>
                    <p className="text-xs text-gray-600">Great for sus4 chords!</p>
                  </div>
                </div>
              </div>

              {/* Visual Example: Major 3rd Relationship */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-amber-800 mb-4">🎯 Visual Examples: Different String Pairs</h3>
                
                <div className="bg-white border-2 border-gray-300 p-6 rounded-lg mb-6 shadow-sm">
                  <h4 className="font-semibold mb-6 text-center">A-D String Pair: Cross-String Relationship</h4>
                  


                  <div className="space-y-4 mb-6">
                    {/* D String - Higher String (on top) */}
                    <div className="flex items-center">
                      <div className="w-16 text-right pr-4 font-medium">D:</div>
                      {Array.from({length: 13}, (_, i) => {
                        const fret = i;
                        const isTargetE = fret === 2; // E on 2nd fret D string (target)
                        
                        return (
                          <div key={fret} className="relative">
                            <div 
                              className={`w-10 h-10 border-2 flex items-center justify-center text-xs font-bold
                                ${isTargetE
                                  ? 'bg-orange-400 text-black border-orange-500'
                                  : 'bg-gray-100 border-gray-300 text-gray-400'
                                }`}
                            >
                              {isTargetE ? 'E' : '•'}
                            </div>
                            
                            <div className="text-xs text-center mt-1 text-gray-600">
                              {fret}
                            </div>
                            
                          </div>
                        );
                      })}
                    </div>

                    {/* A String - Lower String (on bottom) */}
                    <div className="flex items-center">
                      <div className="w-16 text-right pr-4 font-medium">A:</div>
                      {Array.from({length: 13}, (_, i) => {
                        const fret = i;
                        const isRoot = fret === 3; // C on 3rd fret A string (root)
                        const isSameStringMajor3rd = fret === 7; // E on 7th fret A string (same string target)
                        
                        return (
                          <div key={fret} className="relative">
                            <div 
                              className={`w-10 h-10 border-2 flex items-center justify-center text-xs font-bold
                                ${isRoot 
                                  ? 'bg-blue-500 text-white border-blue-600' 
                                  : isSameStringMajor3rd
                                  ? 'bg-orange-400 text-black border-orange-500'
                                  : 'bg-gray-100 border-gray-300 text-gray-400'
                                }`}
                            >
                              {isRoot ? 'C' : isSameStringMajor3rd ? 'E' : '•'}
                            </div>
                            
                            <div className="text-xs text-center mt-1 text-gray-600">
                              {fret}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-lg border">
                    <h5 className="font-semibold mb-2">A-D String Formula (5-Fret Interval):</h5>
                    <div className="text-sm space-y-1">
                      <p><strong>Movement along string (M):</strong> C to E = +4 frets (ascending)</p>
                      <p><strong>String interval (S):</strong> A to D = 5 frets</p>
                      <p><strong>Cross-string movement (C):</strong> C = M - S = 4 - 5 = -1</p>
                      <p><strong>Result:</strong> Move 1 fret back: 3rd - 1 = 2nd fret D string ✓</p>
                    </div>
                  </div>
                </div>

                {/* G-B String Pair Example */}
                <div className="bg-white border-2 border-gray-300 p-6 rounded-lg mb-6 shadow-sm">
                  <h4 className="font-semibold mb-6 text-center">G-B String Pair: Cross-String Relationship (4-Fret Interval)</h4>
                  


                  <div className="space-y-4 mb-6">
                    {/* B String - Higher String */}
                    <div className="flex items-center">
                      <div className="w-16 text-right pr-4 font-medium">B:</div>
                      {Array.from({length: 13}, (_, i) => {
                        const fret = i;
                        const isTargetE = fret === 5; // E on 5th fret B string (target)
                        
                        return (
                          <div key={fret} className="relative">
                            <div 
                              className={`w-10 h-10 border-2 flex items-center justify-center text-xs font-bold
                                ${isTargetE
                                  ? 'bg-orange-400 text-black border-orange-500'
                                  : 'bg-gray-100 border-gray-300 text-gray-400'
                                }`}
                            >
                              {isTargetE ? 'E' : '•'}
                            </div>
                            
                            <div className="text-xs text-center mt-1 text-gray-600">
                              {fret}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* G String - Lower String */}
                    <div className="flex items-center">
                      <div className="w-16 text-right pr-4 font-medium">G:</div>
                      {Array.from({length: 13}, (_, i) => {
                        const fret = i;
                        const isRoot = fret === 5; // C on 5th fret G string (root)
                        const isSameStringMajor3rd = fret === 9; // E on 9th fret G string (target)
                        
                        return (
                          <div key={fret} className="relative">
                            <div 
                              className={`w-10 h-10 border-2 flex items-center justify-center text-xs font-bold
                                ${isRoot 
                                  ? 'bg-blue-500 text-white border-blue-600' 
                                  : isSameStringMajor3rd
                                  ? 'bg-orange-400 text-black border-orange-500'
                                  : 'bg-gray-100 border-gray-300 text-gray-400'
                                }`}
                            >
                              {isRoot ? 'C' : isSameStringMajor3rd ? 'E' : '•'}
                            </div>
                            
                            <div className="text-xs text-center mt-1 text-gray-600">
                              {fret}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-lg border">
                    <h5 className="font-semibold mb-2">G-B String Formula (4-Fret Interval):</h5>
                    <div className="text-sm space-y-1">
                      <p><strong>Movement along string (M):</strong> C to E = +4 frets (ascending)</p>
                      <p><strong>String interval (S):</strong> G to B = 4 frets</p>
                      <p><strong>Cross-string movement (C):</strong> C = M - S = 4 - 4 = 0</p>
                      <p><strong>Result:</strong> E is on the same 5th fret B string ✓</p>
                    </div>
                  </div>
                </div>

                {/* Descending Examples */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* A to E Descending */}
                  <div className="bg-white border-2 border-gray-300 p-6 rounded-lg shadow-sm">
                    <h4 className="font-semibold mb-4 text-center">Descending: A to E Strings</h4>
                    
                    <div className="mb-4 text-center">
                      <div className="inline-flex items-center space-x-1 bg-gradient-to-r from-red-50 to-pink-50 px-3 py-2 rounded text-sm">
                        <span className="bg-blue-100 px-2 py-1 rounded font-bold">D→C</span>
                        <span className="text-gray-500">↓</span>
                      </div>
                    </div>

                    <div className="space-y-3 mb-4">
                      {/* Direction Arrow */}
                      <div className="flex items-center justify-center mb-2">
                        <div className="text-2xl text-amber-600">↓</div>
                        <span className="ml-2 text-xs text-gray-600">Descending Movement</span>
                      </div>
                      
                      {/* A String - Higher String (on top) */}
                      <div className="flex items-center">
                        <div className="w-12 text-right pr-2 font-medium text-xs">A:</div>
                        {Array.from({length: 10}, (_, i) => {
                          const fret = i;
                          const isStartingD = fret === 5; // D on 5th fret A string (root)
                          const isTargetC = fret === 3; // C on 3rd fret A string (target)
                          
                          return (
                            <div key={fret} className="relative">
                              <div 
                                className={`w-8 h-8 border-2 flex items-center justify-center text-xs font-bold
                                  ${isStartingD
                                    ? 'bg-blue-500 text-white border-blue-600'
                                    : isTargetC
                                    ? 'bg-amber-400 text-white border-amber-500'
                                    : 'bg-gray-100 border-gray-300 text-gray-400'
                                  }`}
                              >
                                {isStartingD ? 'D' : isTargetC ? 'C' : '•'}
                              </div>
                              <div className="text-xs text-center mt-1 text-gray-600">{fret}</div>

                            </div>
                          );
                        })}
                      </div>

                      {/* E String - Lower String (on bottom) */}
                      <div className="flex items-center">
                        <div className="w-12 text-right pr-2 font-medium text-xs">E:</div>
                        {Array.from({length: 10}, (_, i) => {
                          const fret = i;
                          const isTargetC = fret === 8; // C on 8th fret E string
                          
                          return (
                            <div key={fret} className="relative">
                              <div 
                                className={`w-8 h-8 border-2 flex items-center justify-center text-xs font-bold
                                  ${isTargetC
                                    ? 'bg-amber-400 text-white border-amber-500'
                                    : 'bg-gray-100 border-gray-300 text-gray-400'
                                  }`}
                              >
                                {isTargetC ? 'C' : '•'}
                              </div>
                              <div className="text-xs text-center mt-1 text-gray-600">{fret}</div>

                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="bg-amber-50 p-3 rounded border">
                      <div className="text-xs space-y-1">
                        <p><strong>Descending:</strong> D to C = -2 frets (descending)</p>
                        <p><strong>Formula:</strong> C = M + S = -2 + 5 = +3</p>
                        <p><strong>Result:</strong> 5 + 3 = 8th fret E ✓</p>
                      </div>
                    </div>
                  </div>

                  {/* B to G Descending */}
                  <div className="bg-white border-2 border-gray-300 p-6 rounded-lg shadow-sm">
                    <h4 className="font-semibold mb-4 text-center">Descending: B to G Strings</h4>
                    
                    <div className="mb-4 text-center">
                      <div className="inline-flex items-center space-x-1 bg-gradient-to-r from-red-50 to-pink-50 px-3 py-2 rounded text-sm">
                        <span className="bg-blue-100 px-2 py-1 rounded font-bold">F→E</span>
                        <span className="text-gray-500">↓</span>
                      </div>
                    </div>

                    <div className="space-y-3 mb-4">
                      {/* Direction Arrow */}
                      <div className="flex items-center justify-center mb-2">
                        <div className="text-2xl text-amber-600">↓</div>
                        <span className="ml-2 text-xs text-gray-600">Descending Movement</span>
                      </div>
                      
                      {/* B String - Higher String (on top) */}
                      <div className="flex items-center">
                        <div className="w-12 text-right pr-2 font-medium text-xs">B:</div>
                        {Array.from({length: 10}, (_, i) => {
                          const fret = i;
                          const isStartingF = fret === 6; // F on 6th fret B string (root)
                          const isTargetE = fret === 5; // E on 5th fret B string (target - same string movement)
                          
                          return (
                            <div key={fret} className="relative">
                              <div 
                                className={`w-8 h-8 border-2 flex items-center justify-center text-xs font-bold
                                  ${isStartingF
                                    ? 'bg-blue-500 text-white border-blue-600'
                                    : isTargetE
                                    ? 'bg-amber-400 text-white border-amber-500'
                                    : 'bg-gray-100 border-gray-300 text-gray-400'
                                  }`}
                              >
                                {isStartingF ? 'F' : isTargetE ? 'E' : '•'}
                              </div>
                              <div className="text-xs text-center mt-1 text-gray-600">{fret}</div>

                            </div>
                          );
                        })}
                      </div>

                      {/* G String - Lower String (on bottom) */}
                      <div className="flex items-center">
                        <div className="w-12 text-right pr-2 font-medium text-xs">G:</div>
                        {Array.from({length: 10}, (_, i) => {
                          const fret = i;
                          const isTargetE = fret === 9; // E on 9th fret G string (cross-string target)
                          
                          return (
                            <div key={fret} className="relative">
                              <div 
                                className={`w-8 h-8 border-2 flex items-center justify-center text-xs font-bold
                                  ${isTargetE
                                    ? 'bg-amber-500 text-white border-amber-600'
                                    : 'bg-gray-100 border-gray-300 text-gray-400'
                                  }`}
                              >
                                {isTargetE ? 'E' : '•'}
                              </div>
                              <div className="text-xs text-center mt-1 text-gray-600">{fret}</div>

                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="bg-amber-50 p-3 rounded border">
                      <div className="text-xs space-y-1">
                        <p><strong>Descending:</strong> F to E = -1 fret (descending)</p>
                        <p><strong>String interval:</strong> B to G = 4 frets</p>
                        <p><strong>Formula:</strong> C = M + S = -1 + 4 = +3</p>
                        <p><strong>Result:</strong> 6 + 3 = 9th fret G ✓</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Related Posts */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-lg mb-8 shadow-sm">
                <h3 className="text-xl font-semibold text-amber-700 mb-4">🔗 Related Articles</h3>
                <Link href="/blog/understanding-guitar-fretboard" className="block p-4 bg-white rounded-lg border hover:shadow-md transition-shadow">
                  <h4 className="font-semibold text-amber-800 mb-2">Part 1: Why Strings Are Tuned This Way</h4>
                  <p className="text-sm text-gray-600">The theoretical foundation behind guitar tuning and cross-string interval relationships</p>
                </Link>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
} 