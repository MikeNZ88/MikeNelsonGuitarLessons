'use client';

import Link from 'next/link';
import AlphaTabPlayerCDN from '@/components/AlphaTabPlayerCDN';
import { useState } from 'react';

// Collapsible component
function CollapsibleSection({ title, children, isOpen, onToggle }: { 
  title: string; 
  children: React.ReactNode; 
  isOpen: boolean; 
  onToggle: () => void; 
}) {
  return (
    <div className="bg-amber-50 border-l-4 border-amber-400 rounded p-4 mb-6">
      <button
        onClick={onToggle}
        className="w-full text-left flex items-center justify-between text-xl font-bold text-amber-900 mb-2 hover:text-amber-800 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span>{title}</span>
        </div>
        <svg
          className={`w-6 h-6 transform transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="mt-4">
          {children}
        </div>
      )}
    </div>
  );
}

export default function BluesLicksExercises() {

  const [isChordTheoryOpen, setIsChordTheoryOpen] = useState(true);

  const [isScaleRulesOpen, setIsScaleRulesOpen] = useState(true);
  const [isProgressiveLevelsOpen, setIsProgressiveLevelsOpen] = useState(true);
  const [isLevels3To5Open, setIsLevels3To5Open] = useState(true);

  const handleMenuClick = (sectionId: string, setOpenState?: (open: boolean) => void) => {
    // Open the section if it has a state setter
    if (setOpenState) {
      setOpenState(true);
    }
    
    // Scroll to the section
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-amber-900 mb-4">Major 12 Bar Blues Scales and Licks</h1>
        <p className="text-lg text-gray-700 mb-4">
          Master essential blues licks with my interactive tab player. Practice classic blues phrases, bends, slides, and vibrato techniques.
        </p>
        <div className="inline-block mb-4 px-4 py-1 rounded-full bg-amber-100 text-amber-800 text-base font-semibold tracking-wide">
          Skill Level: Beginner – Advanced
        </div>
      </div>

      {/* Table of Contents */}
      <div className="mb-8 bg-amber-50 border border-amber-200 rounded-lg p-6">
                    <h2 className="text-xl font-bold text-amber-900 mb-4">Blues Licks Guide Contents</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div>
              <h3 className="font-semibold text-amber-800 mb-2">Theory & Foundation</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#blues-theory" className="text-amber-700 hover:text-amber-900 underline cursor-pointer" onClick={(e) => { e.preventDefault(); handleMenuClick('blues-theory'); }}>What is a 12-Bar Blues?</a></li>
                <li><a href="#foundation-lick" className="text-amber-700 hover:text-amber-900 underline cursor-pointer" onClick={(e) => { e.preventDefault(); handleMenuClick('foundation-lick'); }}>Foundation: The ♭3 - 3 - 1 and ♭3 - 3 - ♭7 Licks</a></li>
                <li><a href="#fretboard-diagrams" className="text-amber-700 hover:text-amber-900 underline cursor-pointer" onClick={(e) => { e.preventDefault(); handleMenuClick('fretboard-diagrams'); }}>Fretboard Diagrams: ♭3 - 3 - 1 and ♭3 - 3 - ♭7 Licks</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-amber-800 mb-2">Practice Exercises</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#progressive-levels" className="text-amber-700 hover:text-amber-900 underline cursor-pointer" onClick={(e) => { e.preventDefault(); handleMenuClick('progressive-levels', setIsProgressiveLevelsOpen); }}>Progressive Practice Levels</a></li>
                <li><a href="#interactive-tabs" className="text-amber-700 hover:text-amber-900 underline cursor-pointer" onClick={(e) => { e.preventDefault(); handleMenuClick('interactive-tabs'); }}>Interactive Blues Licks Tab Player</a></li>
                <li><a href="#practice-guide" className="text-amber-700 hover:text-amber-900 underline cursor-pointer" onClick={(e) => { e.preventDefault(); handleMenuClick('practice-guide'); }}>How to Practice</a></li>
              </ul>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <h3 className="font-semibold text-amber-800 mb-2">Advanced Concepts</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#scale-rules" className="text-amber-700 hover:text-amber-900 underline cursor-pointer" onClick={(e) => { e.preventDefault(); handleMenuClick('scale-rules', setIsScaleRulesOpen); }}>Scale Rules for Major 12 Bar Blues</a></li>

                <li><a href="#chord-theory" className="text-amber-700 hover:text-amber-900 underline cursor-pointer" onClick={(e) => { e.preventDefault(); handleMenuClick('chord-theory', setIsChordTheoryOpen); }}>Chord Note Theory</a></li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* Blues Theory Intro */}
      <div id="blues-theory" className="mb-8 bg-amber-50 border-l-4 border-amber-400 rounded p-4">
        <h2 className="text-xl font-bold text-amber-900 mb-2">What is a 12-Bar Blues?</h2>
        <p className="text-amber-900 text-sm mb-2">
          The 12-bar blues is the most common form in blues music. It uses three chords: the I, IV, and V. In the key of A, these are <span className="font-bold text-amber-800">A7</span> (I), <span className="font-bold text-amber-800">D7</span> (IV), and <span className="font-bold text-amber-800">E7</span> (V).
        </p>
        <p className="text-amber-900 text-sm mb-2">
          Unlike a typical major key, where only the V chord is a dominant 7th, the blues uses dominant 7th chords for all three. In a standard major key, the I and IV would be major 7 chords (Amaj7, Dmaj7), but in blues, they are all dominant 7ths. This gives the blues its unique, "in-between" sound.
        </p>
        <p className="text-amber-900 text-sm mb-2">
          This is why the blues doesn't fit neatly into a traditional major or minor key. It also explains why we can play the <span className="font-bold text-amber-800">minor pentatonic</span> scale over these "major" chords: blues melodies often use both the <span className="font-bold text-amber-800">minor 3rd (b3)</span> and the <span className="font-bold text-amber-800">major 3rd (3)</span> together, creating the classic blues tension and release.
        </p>
        <p className="text-amber-900 text-sm flex items-start gap-2 mt-4">
          <span aria-label="info" className="mt-0.5">{/* Lightbulb SVG */}
            <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><circle cx="8" cy="8" r="7" fill="#F59E42" opacity="0.15"/><path d="M8 2.5a4.5 4.5 0 0 0-2.5 8.25V12a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-1.25A4.5 4.5 0 0 0 8 2.5Zm-1.5 9.5v-1.05a.5.5 0 0 0-.25-.43A3.5 3.5 0 1 1 12 8.52a.5.5 0 0 0-.25.43V12h-4Z" fill="#D97706"/></svg>
          </span>
          <span><span className="font-bold">Summary:</span> Blues is special because it blends major and minor sounds, and uses dominant 7th chords for all three main chords in the progression.</span>
        </p>
        <p className="text-amber-900 text-sm flex items-start gap-2 mt-2">
          <span aria-label="info" className="mt-0.5">{/* Lightbulb SVG */}
            <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><circle cx="8" cy="8" r="7" fill="#F59E42" opacity="0.15"/><path d="M8 2.5a4.5 4.5 0 0 0-2.5 8.25V12a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-1.25A4.5 4.5 0 0 0 8 2.5Zm-1.5 9.5v-1.05a.5.5 0 0 0-.25-.43A3.5 3.5 0 1 1 12 8.52a.5.5 0 0 0-.25.43V12h-4Z" fill="#D97706"/></svg>
          </span>
          <span><span className="font-bold">Note:</span> Not all blues is based on dominant 7th ("major blues") progressions. <span className="font-bold text-amber-800">Minor blues</span> progressions use minor chords (e.g., Am, Dm, Em) and the minor pentatonic/blues scale throughout. The concepts on this page focus on the classic major/dominant 7th blues, but the minor blues sound is just as important!</span>
        </p>
        <p className="text-amber-900 text-sm flex items-start gap-2 mt-2">
          <span aria-label="info" className="mt-0.5">{/* Lightbulb SVG */}
            <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><circle cx="8" cy="8" r="7" fill="#F59E42" opacity="0.15"/><path d="M8 2.5a4.5 4.5 0 0 0-2.5 8.25V12a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-1.25A4.5 4.5 0 0 0 8 2.5Zm-1.5 9.5v-1.05a.5.5 0 0 0-.25-.43A3.5 3.5 0 1 1 12 8.52a.5.5 0 0 0-.25.43V12h-4Z" fill="#D97706"/></svg>
          </span>
          <span><span className="font-bold">Most importantly:</span> Study great blues players, their approach and their licks. The theory provides the foundation, but the real learning comes from listening to and transcribing the masters like B.B. King, Albert King, Freddie King, Eric Clapton, Stevie Ray Vaughan, and many others.</span>
        </p>
      </div>

      {/* 12-Bar Blues Progression Diagram */}
      <div className="mb-8 bg-white border border-amber-300 rounded-lg p-6">
        <h3 className="text-lg font-bold text-amber-900 mb-4 text-center">A Major 12-Bar Blues Progression</h3>
        <div className="grid grid-cols-4 gap-2 max-w-2xl mx-auto">
          {/* Bar 1-4 */}
          <div className="text-center p-3 bg-blue-50 border border-blue-200 rounded">
            <div className="text-xs text-gray-600 mb-1">Bar 1</div>
            <div className="text-lg font-bold text-blue-800">A7</div>
            <div className="text-xs text-gray-500">I7</div>
          </div>
          <div className="text-center p-3 bg-blue-50 border border-blue-200 rounded">
            <div className="text-xs text-gray-600 mb-1">Bar 2</div>
            <div className="text-lg font-bold text-blue-800">A7</div>
            <div className="text-xs text-gray-500">I7</div>
          </div>
          <div className="text-center p-3 bg-blue-50 border border-blue-200 rounded">
            <div className="text-xs text-gray-600 mb-1">Bar 3</div>
            <div className="text-lg font-bold text-blue-800">A7</div>
            <div className="text-xs text-gray-500">I7</div>
          </div>
          <div className="text-center p-3 bg-blue-50 border border-blue-200 rounded">
            <div className="text-xs text-gray-600 mb-1">Bar 4</div>
            <div className="text-lg font-bold text-blue-800">A7</div>
            <div className="text-xs text-gray-500">I7</div>
          </div>
          
          {/* Bar 5-8 */}
          <div className="text-center p-3 bg-green-50 border border-green-200 rounded">
            <div className="text-xs text-gray-600 mb-1">Bar 5</div>
            <div className="text-lg font-bold text-green-800">D7</div>
            <div className="text-xs text-gray-500">IV7</div>
          </div>
          <div className="text-center p-3 bg-green-50 border border-green-200 rounded">
            <div className="text-xs text-gray-600 mb-1">Bar 6</div>
            <div className="text-lg font-bold text-green-800">D7</div>
            <div className="text-xs text-gray-500">IV7</div>
          </div>
          <div className="text-center p-3 bg-blue-50 border border-blue-200 rounded">
            <div className="text-xs text-gray-600 mb-1">Bar 7</div>
            <div className="text-lg font-bold text-blue-800">A7</div>
            <div className="text-xs text-gray-500">I7</div>
          </div>
          <div className="text-center p-3 bg-blue-50 border border-blue-200 rounded">
            <div className="text-xs text-gray-600 mb-1">Bar 8</div>
            <div className="text-lg font-bold text-blue-800">A7</div>
            <div className="text-xs text-gray-500">I7</div>
          </div>
          
          {/* Bar 9-12 */}
          <div className="text-center p-3 bg-red-50 border border-red-200 rounded">
            <div className="text-xs text-gray-600 mb-1">Bar 9</div>
            <div className="text-lg font-bold text-red-800">E7</div>
            <div className="text-xs text-gray-500">V7</div>
          </div>
          <div className="text-center p-3 bg-green-50 border border-green-200 rounded">
            <div className="text-xs text-gray-600 mb-1">Bar 10</div>
            <div className="text-lg font-bold text-green-800">D7</div>
            <div className="text-xs text-gray-500">IV7</div>
          </div>
          <div className="text-center p-3 bg-blue-50 border border-blue-200 rounded">
            <div className="text-xs text-gray-600 mb-1">Bar 11</div>
            <div className="text-lg font-bold text-blue-800">A7</div>
            <div className="text-xs text-gray-500">I7</div>
          </div>
          <div className="text-center p-3 bg-red-50 border border-red-200 rounded">
            <div className="text-xs text-gray-600 mb-1">Bar 12</div>
            <div className="text-lg font-bold text-red-800">E7</div>
            <div className="text-xs text-gray-500">V7</div>
          </div>
        </div>
        
                 {/* Legend */}
         <div className="flex justify-center gap-6 mt-4 text-sm">
           <div className="flex items-center gap-2">
             <div className="w-4 h-4 bg-blue-100 border border-blue-200 rounded"></div>
             <span className="text-gray-700">A7 - The one chord</span>
           </div>
           <div className="flex items-center gap-2">
             <div className="w-4 h-4 bg-green-100 border border-green-200 rounded"></div>
             <span className="text-gray-700">D7 - The four chord</span>
           </div>
           <div className="flex items-center gap-2">
             <div className="w-4 h-4 bg-red-100 border border-red-200 rounded"></div>
             <span className="text-gray-700">E7 - The five chord</span>
           </div>
         </div>
        
                 <div className="text-center mt-4 text-sm text-gray-600">
           <p>This progression repeats continuously. Bars 9-12 are called the "turnaround" - they create tension and lead back to Bar 1. Bar 12 is sometimes played with the 1 chord (A7), but we are using the 5 chord (E7) for a stronger resolution.</p>
         </div>
      </div>

      {/* Tab Player - Now placed after the blues theory intro */}
      <div id="interactive-tabs" className="mb-8">
        <h2 className="text-2xl font-bold text-amber-900 mb-4">Interactive Blues Licks Tab Player</h2>
        <div className="bg-amber-50 border-l-4 border-amber-400 rounded p-4 mb-6">
          <p className="text-amber-900 text-sm mb-3">
            Each example uses the Major 12 bar blues chord progression. You will hear the chords but we are only showing the lead part in the tab. The tab shows where these chord changes occur. Exercise 1A uses the b3 - 3 - 1 lick almost exclusively, while Exercise 1B uses the b3 - 3 - b7 lick. The other exercises all use the lick at least once but they also contain licks made from specific scales. You will see the scale name above the relevant bar that it is used. The b3 - 3 - 1 licks are all labelled.
          </p>
          <p className="text-amber-900 text-sm mb-4">The final exercise uses a hybrid blues scale, which adds the notes together of the <Link href="/scale-explorer/index.html?scale=A&category=blues-scales&mode=blues-major" className="text-amber-700 hover:text-amber-800 underline">A major blues</Link> and <Link href="/scale-explorer/index.html?scale=A&category=blues-scales&mode=blues-minor" className="text-amber-700 hover:text-amber-800 underline">Am blues</Link> scales.</p>
          <p className="text-amber-900 text-sm font-semibold">
            📖 Additional theory details, fretboard diagrams, and advanced concepts can be found below the tab player.
          </p>
        </div>
        <AlphaTabPlayerCDN key={Date.now()} containerId="blues-licks-alphatab-container" />
      </div>

      {/* Additional Theory Sections */}

      {/* Blues Essentials */}
      <div className="mb-8">
        {/* b3 - 3 - 1 Lick (Foundation) */}
        <div id="foundation-lick" className="bg-amber-50 border-l-4 border-amber-400 rounded p-4 mb-6">
          <h2 className="text-xl font-bold text-amber-900 mb-2">Foundation: The <span className="font-mono">♭3</span> - 3 - 1 and <span className="font-mono">♭3</span> - 3 - <span className="font-mono">♭7</span> Licks</h2>
          <p className="text-amber-900 text-sm mb-1">These classic blues licks are the backbone of countless solos:</p>

                      <div className="text-amber-900 text-sm mb-4">The 3 and 1 are chord tones (notes that make up the chord), while the <span className="font-mono">♭3</span> is the added "blues spice" note.</div>

          {/* Table: Where to Find ♭3, 3, and 1 */}

            <div className="mb-8 flex flex-col items-center">
              <div className="w-full max-w-md bg-amber-50 border border-amber-300 rounded-xl shadow-md p-5">
                <div className="text-amber-700 text-xs text-center">
                  <span className="font-bold">Tip:</span> Notice how the <span className="font-mono">♭3</span>, 3, and 1 are always 2 frets apart on the same string. This relationship holds true across all keys!
                </div>
              </div>

              {/* Fretboard Diagrams */}
              <div className="w-full max-w-6xl space-y-6 mt-6">
                <h4 id="fretboard-diagrams" className="text-lg font-bold text-amber-900 text-center mb-4">Fretboard Diagrams: ♭3 - 3 - 1 and ♭3 - 3 - ♭7 Licks</h4>
                
                {/* A7 Fretboard - Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* A7 - b3 - 3 - 1 */}
                  <div className="bg-white border border-amber-300 rounded-lg p-4">
                    <h5 className="text-md font-bold mb-3 text-center">
                      <span className="text-amber-800">A7 - </span>
                      <span className="text-red-600 font-bold">♭3</span>
                      <span className="text-amber-800"> - </span>
                      <span className="text-green-800">3</span>
                      <span className="text-amber-800"> - </span>
                      <span className="text-blue-800">1</span>
                    </h5>
                    <div className="flex justify-center">
                      <div className="fretboard-diagram">
                        {/* Fret numbers */}
                        <div className="flex text-xs text-gray-600 mb-1">
                          <div className="w-12"></div>
                          <div className="w-8 text-center">5</div>
                          <div className="w-8 text-center">6</div>
                          <div className="w-8 text-center">7</div>
                          <div className="w-8 text-center">8</div>
                          <div className="w-8 text-center">9</div>
                        </div>
                        {/* Strings */}
                        <div className="space-y-1">
                          {/* High E string */}
                          <div className="flex">
                            <div className="w-12 h-6 border-r border-gray-300 flex items-center justify-center text-xs text-gray-500">E string</div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 flex items-center justify-center"></div>
                          </div>
                          {/* B string */}
                          <div className="flex">
                            <div className="w-12 h-6 border-r border-gray-300 flex items-center justify-center text-xs text-gray-500">B string</div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 flex items-center justify-center"></div>
                          </div>
                          {/* G string */}
                          <div className="flex">
                            <div className="w-12 h-6 border-r border-gray-300 flex items-center justify-center text-xs text-gray-500">G string</div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center bg-red-100 rounded-full text-xs font-bold text-red-800">C</div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center bg-green-100 rounded-full text-xs font-bold text-green-800">C♯</div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 flex items-center justify-center"></div>
                          </div>
                          {/* D string */}
                          <div className="flex">
                            <div className="w-12 h-6 border-r border-gray-300 flex items-center justify-center text-xs text-gray-500">D string</div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center bg-blue-100 rounded-full text-xs font-bold text-blue-800">A</div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 flex items-center justify-center"></div>
                          </div>
                        </div>
                        <div className="flex justify-center mt-2 text-xs text-gray-600">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-red-100 rounded-full border border-red-300"></div>
                            <span>♭3 (C)</span>
                          </div>
                          <div className="flex items-center gap-2 ml-4">
                            <div className="w-3 h-3 bg-green-100 rounded-full border border-green-300"></div>
                            <span>3 (C♯)</span>
                          </div>
                          <div className="flex items-center gap-2 ml-4">
                            <div className="w-3 h-3 bg-blue-100 rounded-full border border-blue-300"></div>
                            <span>1 (A)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* A7 - b3 - 3 - b7 */}
                  <div className="bg-white border border-amber-300 rounded-lg p-4">
                    <h5 className="text-md font-bold mb-3 text-center">
                      <span className="text-amber-800">A7 - </span>
                      <span className="text-red-600 font-bold">♭3</span>
                      <span className="text-amber-800"> - </span>
                      <span className="text-green-800">3</span>
                      <span className="text-amber-800"> - </span>
                      <span className="text-purple-800">♭7</span>
                    </h5>
                    <div className="flex justify-center">
                      <div className="fretboard-diagram">
                        {/* Fret numbers */}
                        <div className="flex text-xs text-gray-600 mb-1">
                          <div className="w-12"></div>
                          <div className="w-8 text-center">5</div>
                          <div className="w-8 text-center">6</div>
                          <div className="w-8 text-center">7</div>
                          <div className="w-8 text-center">8</div>
                          <div className="w-8 text-center">9</div>
                        </div>
                        {/* Strings */}
                        <div className="space-y-1">
                          {/* High E string */}
                          <div className="flex">
                            <div className="w-12 h-6 border-r border-gray-300 flex items-center justify-center text-xs text-gray-500">E string</div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 flex items-center justify-center"></div>
                          </div>
                          {/* B string */}
                          <div className="flex">
                            <div className="w-12 h-6 border-r border-gray-300 flex items-center justify-center text-xs text-gray-500">B string</div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center bg-purple-100 rounded-full text-xs font-bold text-purple-800">G</div>
                            <div className="w-8 h-6 flex items-center justify-center"></div>
                          </div>
                          {/* G string */}
                          <div className="flex">
                            <div className="w-12 h-6 border-r border-gray-300 flex items-center justify-center text-xs text-gray-500">G string</div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center bg-red-100 rounded-full text-xs font-bold text-red-800">C</div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center bg-green-100 rounded-full text-xs font-bold text-green-800">C♯</div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 flex items-center justify-center"></div>
                          </div>
                          {/* D string */}
                          <div className="flex">
                            <div className="w-12 h-6 border-r border-gray-300 flex items-center justify-center text-xs text-gray-500">D string</div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 flex items-center justify-center"></div>
                          </div>
                        </div>
                        <div className="flex justify-center mt-2 text-xs text-gray-600">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-red-100 rounded-full border border-red-300"></div>
                            <span>♭3 (C)</span>
                          </div>
                          <div className="flex items-center gap-2 ml-4">
                            <div className="w-3 h-3 bg-green-100 rounded-full border border-green-300"></div>
                            <span>3 (C♯)</span>
                          </div>
                          <div className="flex items-center gap-2 ml-4">
                            <div className="w-3 h-3 bg-purple-100 rounded-full border border-purple-300"></div>
                            <span>♭7 (G)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* D7 Fretboard - Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* D7 - b3 - 3 - 1 */}
                  <div className="bg-white border border-amber-300 rounded-lg p-4">
                    <h5 className="text-md font-bold mb-3 text-center">
                      <span className="text-amber-800">D7 - </span>
                      <span className="text-red-600 font-bold">♭3</span>
                      <span className="text-amber-800"> - </span>
                      <span className="text-green-800">3</span>
                      <span className="text-amber-800"> - </span>
                      <span className="text-blue-800">1</span>
                    </h5>
                    <div className="flex justify-center">
                      <div className="fretboard-diagram">
                        {/* Fret numbers */}
                        <div className="flex text-xs text-gray-600 mb-1">
                          <div className="w-12"></div>
                          <div className="w-8 text-center">5</div>
                          <div className="w-8 text-center">6</div>
                          <div className="w-8 text-center">7</div>
                          <div className="w-8 text-center">8</div>
                          <div className="w-8 text-center">9</div>
                        </div>
                        {/* Strings */}
                        <div className="space-y-1">
                          {/* High E string */}
                          <div className="flex">
                            <div className="w-12 h-6 border-r border-gray-300 flex items-center justify-center text-xs text-gray-500">E string</div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 flex items-center justify-center"></div>
                          </div>
                          {/* B string */}
                          <div className="flex">
                            <div className="w-12 h-6 border-r border-gray-300 flex items-center justify-center text-xs text-gray-500">B string</div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center bg-red-100 rounded-full text-xs font-bold text-red-800">F</div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center bg-green-100 rounded-full text-xs font-bold text-green-800">F♯</div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 flex items-center justify-center"></div>
                          </div>
                          {/* G string */}
                          <div className="flex">
                            <div className="w-12 h-6 border-r border-gray-300 flex items-center justify-center text-xs text-gray-500">G string</div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center bg-blue-100 rounded-full text-xs font-bold text-blue-800">D</div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 flex items-center justify-center"></div>
                          </div>
                          {/* D string */}
                          <div className="flex">
                            <div className="w-12 h-6 border-r border-gray-300 flex items-center justify-center text-xs text-gray-500">D string</div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 flex items-center justify-center"></div>
                          </div>
                        </div>
                        <div className="flex justify-center mt-2 text-xs text-gray-600">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-red-100 rounded-full border border-red-300"></div>
                            <span>♭3 (F)</span>
                          </div>
                          <div className="flex items-center gap-2 ml-4">
                            <div className="w-3 h-3 bg-green-100 rounded-full border border-green-300"></div>
                            <span>3 (F♯)</span>
                          </div>
                          <div className="flex items-center gap-2 ml-4">
                            <div className="w-3 h-3 bg-blue-100 rounded-full border border-blue-300"></div>
                            <span>1 (D)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* D7 - b3 - 3 - b7 */}
                  <div className="bg-white border border-amber-300 rounded-lg p-4">
                    <h5 className="text-md font-bold mb-3 text-center">
                      <span className="text-amber-800">D7 - </span>
                      <span className="text-red-600 font-bold">♭3</span>
                      <span className="text-amber-800"> - </span>
                      <span className="text-green-800">3</span>
                      <span className="text-amber-800"> - </span>
                      <span className="text-purple-800">♭7</span>
                    </h5>
                    <div className="flex justify-center">
                      <div className="fretboard-diagram">
                        {/* Fret numbers */}
                        <div className="flex text-xs text-gray-600 mb-1">
                          <div className="w-12"></div>
                          <div className="w-8 text-center">5</div>
                          <div className="w-8 text-center">6</div>
                          <div className="w-8 text-center">7</div>
                          <div className="w-8 text-center">8</div>
                          <div className="w-8 text-center">9</div>
                          <div className="w-8 text-center">10</div>
                        </div>
                        {/* Strings */}
                        <div className="space-y-1">
                          {/* High E string */}
                          <div className="flex">
                            <div className="w-12 h-6 border-r border-gray-300 flex items-center justify-center text-xs text-gray-500">E string</div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center bg-purple-100 rounded-full text-xs font-bold text-purple-800">C</div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 flex items-center justify-center"></div>
                          </div>
                          {/* B string */}
                          <div className="flex">
                            <div className="w-12 h-6 border-r border-gray-300 flex items-center justify-center text-xs text-gray-500">B string</div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center bg-red-100 rounded-full text-xs font-bold text-red-800">F</div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center bg-green-100 rounded-full text-xs font-bold text-green-800">F♯</div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 flex items-center justify-center"></div>
                          </div>
                          {/* G string */}
                          <div className="flex">
                            <div className="w-12 h-6 border-r border-gray-300 flex items-center justify-center text-xs text-gray-500">G string</div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 flex items-center justify-center"></div>
                          </div>
                          {/* D string */}
                          <div className="flex">
                            <div className="w-12 h-6 border-r border-gray-300 flex items-center justify-center text-xs text-gray-500">D string</div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 flex items-center justify-center"></div>
                          </div>
                        </div>
                        <div className="flex justify-center mt-2 text-xs text-gray-600">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-red-100 rounded-full border border-red-300"></div>
                            <span>♭3 (F)</span>
                          </div>
                          <div className="flex items-center gap-2 ml-4">
                            <div className="w-3 h-3 bg-green-100 rounded-full border border-green-300"></div>
                            <span>3 (F♯)</span>
                          </div>
                          <div className="flex items-center gap-2 ml-4">
                            <div className="w-3 h-3 bg-purple-100 rounded-full border border-purple-300"></div>
                            <span>♭7 (C)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* E7 Fretboard - Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* E7 - b3 - 3 - 1 */}
                  <div className="bg-white border border-amber-300 rounded-lg p-4">
                    <h5 className="text-md font-bold mb-3 text-center">
                      <span className="text-amber-800">E7 - </span>
                      <span className="text-red-600 font-bold">♭3</span>
                      <span className="text-amber-800"> - </span>
                      <span className="text-green-800">3</span>
                      <span className="text-amber-800"> - </span>
                      <span className="text-blue-800">1</span>
                    </h5>
                    <div className="flex justify-center">
                      <div className="fretboard-diagram">
                        {/* Fret numbers */}
                        <div className="flex text-xs text-gray-600 mb-1">
                          <div className="w-12"></div>
                          <div className="w-8 text-center">5</div>
                          <div className="w-8 text-center">6</div>
                          <div className="w-8 text-center">7</div>
                          <div className="w-8 text-center">8</div>
                          <div className="w-8 text-center">9</div>
                        </div>
                        {/* Strings */}
                        <div className="space-y-1">
                          {/* High E string */}
                          <div className="flex">
                            <div className="w-12 h-6 border-r border-gray-300 flex items-center justify-center text-xs text-gray-500">E string</div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 flex items-center justify-center"></div>
                          </div>
                          {/* B string */}
                          <div className="flex">
                            <div className="w-12 h-6 border-r border-gray-300 flex items-center justify-center text-xs text-gray-500">B string</div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center bg-red-100 rounded-full text-xs font-bold text-red-800">G</div>
                            <div className="w-8 h-6 flex items-center justify-center bg-green-100 rounded-full text-xs font-bold text-green-800">G♯</div>
                          </div>
                          {/* G string */}
                          <div className="flex">
                            <div className="w-12 h-6 border-r border-gray-300 flex items-center justify-center text-xs text-gray-500">G string</div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 flex items-center justify-center bg-blue-100 rounded-full text-xs font-bold text-blue-800">E</div>
                          </div>
                          {/* D string */}
                          <div className="flex">
                            <div className="w-12 h-6 border-r border-gray-300 flex items-center justify-center text-xs text-gray-500">D string</div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 flex items-center justify-center"></div>
                          </div>
                        </div>
                        <div className="flex justify-center mt-2 text-xs text-gray-600">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-red-100 rounded-full border border-red-300"></div>
                            <span>♭3 (G)</span>
                          </div>
                          <div className="flex items-center gap-2 ml-4">
                            <div className="w-3 h-3 bg-green-100 rounded-full border border-green-300"></div>
                            <span>3 (G♯)</span>
                          </div>
                          <div className="flex items-center gap-2 ml-4">
                            <div className="w-3 h-3 bg-blue-100 rounded-full border border-blue-300"></div>
                            <span>1 (E)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* E7 - b3 - 3 - b7 */}
                  <div className="bg-white border border-amber-300 rounded-lg p-4">
                    <h5 className="text-md font-bold mb-3 text-center">
                      <span className="text-amber-800">E7 - </span>
                      <span className="text-red-600 font-bold">♭3</span>
                      <span className="text-amber-800"> - </span>
                      <span className="text-green-800">3</span>
                      <span className="text-amber-800"> - </span>
                      <span className="text-purple-800">♭7</span>
                    </h5>
                    <div className="flex justify-center">
                      <div className="fretboard-diagram">
                        {/* Fret numbers */}
                        <div className="flex text-xs text-gray-600 mb-1">
                          <div className="w-12"></div>
                          <div className="w-8 text-center">5</div>
                          <div className="w-8 text-center">6</div>
                          <div className="w-8 text-center">7</div>
                          <div className="w-8 text-center">8</div>
                          <div className="w-8 text-center">9</div>
                          <div className="w-8 text-center">10</div>
                        </div>
                        {/* Strings */}
                        <div className="space-y-1">
                          {/* High E string */}
                          <div className="flex">
                            <div className="w-12 h-6 border-r border-gray-300 flex items-center justify-center text-xs text-gray-500">E string</div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 flex items-center justify-center bg-purple-100 rounded-full text-xs font-bold text-purple-800">D</div>
                          </div>
                          {/* B string */}
                          <div className="flex">
                            <div className="w-12 h-6 border-r border-gray-300 flex items-center justify-center text-xs text-gray-500">B string</div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center bg-red-100 rounded-full text-xs font-bold text-red-800">G</div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center bg-green-100 rounded-full text-xs font-bold text-green-800">G♯</div>
                            <div className="w-8 h-6 flex items-center justify-center"></div>
                          </div>
                          {/* G string */}
                          <div className="flex">
                            <div className="w-12 h-6 border-r border-gray-300 flex items-center justify-center text-xs text-gray-500">G string</div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 flex items-center justify-center"></div>
                          </div>
                          {/* D string */}
                          <div className="flex">
                            <div className="w-12 h-6 border-r border-gray-300 flex items-center justify-center text-xs text-gray-500">D string</div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 border-r border-gray-300 flex items-center justify-center"></div>
                            <div className="w-8 h-6 flex items-center justify-center"></div>
                          </div>
                        </div>
                        <div className="flex justify-center mt-2 text-xs text-gray-600">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-red-100 rounded-full border border-red-300"></div>
                            <span>♭3 (G)</span>
                          </div>
                          <div className="flex items-center gap-2 ml-4">
                            <div className="w-3 h-3 bg-green-100 rounded-full border border-green-300"></div>
                            <span>3 (G♯)</span>
                          </div>
                          <div className="flex items-center gap-2 ml-4">
                            <div className="w-3 h-3 bg-purple-100 rounded-full border border-purple-300"></div>
                            <span>♭7 (D)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-amber-700 text-sm mt-4 text-center italic">
                These are just examples but these notes are available on many different places on the fretboard. These positions have been chosen because, with the exception of the 9th fret, they are all located inside the A Minor Pentatonic Shape 1 (where beginners start).
              </div>
              
              {/* Example showing different octaves of the b3 - 3 - 1 lick */}
              <div className="mt-6 text-center">
                <img 
                  src="/b3 3 1 .png" 
                  alt="Examples of ♭3 - 3 - 1 lick showing both lower octave (A on 7th fret D string) and higher octave (A on 10th fret B string)" 
                  className="mx-auto max-w-full h-auto rounded-lg shadow-md border-4 border-amber-300"
                />
                <div className="text-amber-700 text-sm mt-2 italic">
                  This example shows the ♭3 - 3 - 1 lick for A with two different octaves: lower 1 (A on 7th fret D string) and higher 1 (A on 10th fret B string).
                </div>
              </div>
            </div>

        </div>

        {/* Chord Note Theory */}
        <div id="chord-theory">
          <CollapsibleSection 
            title="Chord Note Theory" 
            isOpen={isChordTheoryOpen} 
            onToggle={() => setIsChordTheoryOpen(!isChordTheoryOpen)} 
          >
          <p className="text-amber-900 text-sm mb-2">Understanding the notes in each chord helps you target the best scale and licks:</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white border border-amber-200 rounded p-3">
              <span className="font-bold text-amber-800">A7:</span>
              <div className="text-amber-900">A, C#, E, G</div>
              <div className="text-xs text-amber-700 mt-1">Root, major 3rd, 5th, flat 7th</div>
            </div>
            <div className="bg-white border border-amber-200 rounded p-3">
              <span className="font-bold text-amber-800">D7:</span>
              <div className="text-amber-900">D, F#, A, C</div>
              <div className="text-xs text-amber-700 mt-1">Root, major 3rd, 5th, flat 7th</div>
            </div>
            <div className="bg-white border border-amber-200 rounded p-3">
              <span className="font-bold text-amber-800">E7:</span>
              <div className="text-amber-900">E, G#, B, D</div>
              <div className="text-xs text-amber-700 mt-1">Root, major 3rd, 5th, flat 7th</div>
            </div>
          </div>
          <div className="mt-3 text-amber-900 text-xs">
            <span className="font-bold">Tip:</span> The 3rd and 7th of each chord are the most important for targeting with your licks and scale choices.
          </div>
        </CollapsibleSection>
        </div>

        {/* Blues Scale Rules */}
        <div id="scale-rules">
          <CollapsibleSection 
            title="Scale Rules for Major 12 Bar Blues" 
            isOpen={isScaleRulesOpen} 
            onToggle={() => setIsScaleRulesOpen(!isScaleRulesOpen)} 
          >
          <ul className="list-none pl-0 text-amber-900 space-y-2 text-sm">
            <li className="mb-3"><span className="text-amber-900"><span className="font-bold text-amber-800">Rule 1:</span> <span className="text-amber-800"><span className="text-blue-600 font-semibold">I</span> chord (<span className="text-blue-600 font-semibold">A</span><span className="text-blue-600 font-semibold">7</span> <span className="text-purple-600 font-semibold">minor pentatonic</span> or <span className="text-blue-600 font-semibold">A</span> <span className="text-purple-600 font-semibold">minor blues*</span> scale) works over the entire progression.</span></span></li>
            <li className="mb-3"><span className="text-amber-900"><span className="font-bold text-amber-800">Rule 2:</span> <span className="text-amber-800">Each chord can be approached with its own <span className="text-green-600 font-semibold">major pentatonic</span> or <span className="text-green-600 font-semibold">major blues*</span> scale:<br/><span className="text-blue-600 font-semibold">I</span> (<span className="text-blue-600 font-semibold">A</span><span className="text-blue-600 font-semibold">7</span>) → <span className="text-blue-600 font-semibold">A</span> <span className="text-green-600 font-semibold">major pentatonic</span>/<span className="text-green-600 font-semibold">major blues*</span><br/><span className="text-orange-600 font-semibold">IV</span> (<span className="text-orange-600 font-semibold">D</span><span className="text-orange-600 font-semibold">7</span>) → <span className="text-orange-600 font-semibold">D</span> <span className="text-green-600 font-semibold">major pentatonic</span>/<span className="text-green-600 font-semibold">major blues*</span><br/><span className="text-pink-600 font-semibold">V</span> (<span className="text-pink-600 font-semibold">E</span><span className="text-pink-600 font-semibold">7</span>) → <span className="text-pink-600 font-semibold">E</span> <span className="text-green-600 font-semibold">major pentatonic</span>/<span className="text-green-600 font-semibold">major blues*</span></span></span></li>
            <li className="mb-3"><span className="text-amber-900"><span className="font-bold text-amber-800">Rule 3:</span> <span className="text-amber-800">You can use the <span className="text-purple-600 font-semibold">minor pentatonic</span> or <span className="text-purple-600 font-semibold">minor blues*</span> scale of the <span className="text-blue-600 font-semibold">I</span> and <span className="text-pink-600 font-semibold">V</span> chords, but avoid the <span className="text-purple-600 font-semibold">minor pentatonic</span>/<span className="text-purple-600 font-semibold">blues</span> scale of the <span className="text-orange-600 font-semibold">IV</span> chord (<span className="text-orange-600 font-semibold">D</span><span className="text-orange-600 font-semibold">7</span>):<br/><span className='inline-flex items-center gap-1'><svg width='14' height='14' fill='none' viewBox='0 0 14 14'><circle cx='7' cy='7' r='7' fill='#F59E42' opacity='0.15'/><path d='M4 7l2 2 4-4' stroke='#D97706' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'/></svg><span className="text-blue-600 font-semibold">I</span> (<span className="text-blue-600 font-semibold">A</span><span className="text-blue-600 font-semibold">7</span>) → <span className="text-blue-600 font-semibold">A</span> <span className="text-purple-600 font-semibold">minor pentatonic</span>/<span className="text-purple-600 font-semibold">minor blues*</span></span><br/><span className='inline-flex items-center gap-1 text-red-600 line-through'><svg width='14' height='14' fill='none' viewBox='0 0 14 14'><circle cx='7' cy='7' r='7' fill='#DC2626' opacity='0.15'/><path d='M4 4l6 6M10 4l-6 6' stroke='#DC2626' strokeWidth='1.5' strokeLinecap='round'/></svg><span className="text-orange-600 font-semibold">IV</span> (<span className="text-orange-600 font-semibold">D</span><span className="text-orange-600 font-semibold">7</span>) → <span className="text-orange-600 font-semibold">D</span> <span className="text-purple-600 font-semibold">minor pentatonic</span>/<span className="text-purple-600 font-semibold">minor blues*</span> (avoid)</span><br/><span className='inline-flex items-center gap-1'><svg width='14' height='14' fill='none' viewBox='0 0 14 14'><circle cx='7' cy='7' r='7' fill='#F59E42' opacity='0.15'/><path d='M4 7l2 2 4-4' stroke='#D97706' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'/></svg><span className="text-pink-600 font-semibold">V</span> (<span className="text-pink-600 font-semibold">E</span><span className="text-pink-600 font-semibold">7</span>) → <span className="text-pink-600 font-semibold">E</span> <span className="text-purple-600 font-semibold">minor pentatonic</span>/<span className="text-purple-600 font-semibold">minor blues*</span></span></span></span></li>
            <li className="mb-3"><span className="text-amber-900"><span className="font-bold text-amber-800">Rule 4:</span> <span className="text-amber-800">The <span className="text-green-600 font-semibold">major pentatonic</span>/<span className="text-green-600 font-semibold">major blues*</span> scale of the <span className="text-blue-600 font-semibold">I</span> chord (<span className="text-blue-600 font-semibold">A</span><span className="text-blue-600 font-semibold">7</span>) works well over the <span className="text-blue-600 font-semibold">I</span> and <span className="text-pink-600 font-semibold">V</span> chords, but not the <span className="text-orange-600 font-semibold">IV</span> chord:<br/><span className='inline-flex items-center gap-1'><svg width='14' height='14' fill='none' viewBox='0 0 14 14'><circle cx='7' cy='7' r='7' fill='#F59E42' opacity='0.15'/><path d='M4 7l2 2 4-4' stroke='#D97706' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'/></svg><span className="text-blue-600 font-semibold">I</span> (<span className="text-blue-600 font-semibold">A</span><span className="text-blue-600 font-semibold">7</span>) → <span className="text-blue-600 font-semibold">A</span> <span className="text-green-600 font-semibold">major pentatonic</span>/<span className="text-green-600 font-semibold">major blues*</span></span><br/><span className='inline-flex items-center gap-1 text-red-600 line-through'><svg width='14' height='14' fill='none' viewBox='0 0 14 14'><circle cx='7' cy='7' r='7' fill='#DC2626' opacity='0.15'/><path d='M4 4l6 6M10 4l-6 6' stroke='#DC2626' strokeWidth='1.5' strokeLinecap='round'/></svg><span className="text-orange-600 font-semibold">IV</span> (<span className="text-orange-600 font-semibold">D</span><span className="text-orange-600 font-semibold">7</span>) → <span className="text-blue-600 font-semibold">A</span> <span className="text-green-600 font-semibold">major pentatonic</span>/<span className="text-green-600 font-semibold">major blues*</span> (avoid)</span><br/><span className='inline-flex items-center gap-1'><svg width='14' height='14' fill='none' viewBox='0 0 14 14'><circle cx='7' cy='7' r='7' fill='#F59E42' opacity='0.15'/><path d='M4 7l2 2 4-4' stroke='#D97706' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'/></svg><span className="text-pink-600 font-semibold">V</span> (<span className="text-pink-600 font-semibold">E</span><span className="text-pink-600 font-semibold">7</span>) → <span className="text-blue-600 font-semibold">A</span> <span className="text-green-600 font-semibold">major pentatonic</span>/<span className="text-green-600 font-semibold">major blues*</span></span></span></span></li>
            <li className="mb-3"><span className="text-amber-900"><span className="font-bold text-amber-800">Rule 5:</span> <span className="text-amber-800">The <span className="text-green-600 font-semibold">major pentatonic</span>/<span className="text-green-600 font-semibold">major blues*</span> scale of the <span className="text-orange-600 font-semibold">IV</span> chord (<span className="text-orange-600 font-semibold">D</span><span className="text-orange-600 font-semibold">7</span>) works well over the <span className="text-orange-600 font-semibold">IV</span> and <span className="text-pink-600 font-semibold">V</span> chords, but not the <span className="text-blue-600 font-semibold">I</span> chord:<br/><span className='inline-flex items-center gap-1 text-red-600 line-through'><svg width='14' height='14' fill='none' viewBox='0 0 14 14'><circle cx='7' cy='7' r='7' fill='#DC2626' opacity='0.15'/><path d='M4 4l6 6M10 4l-6 6' stroke='#DC2626' strokeWidth='1.5' strokeLinecap='round'/></svg><span className="text-blue-600 font-semibold">I</span> (<span className="text-blue-600 font-semibold">A</span><span className="text-blue-600 font-semibold">7</span>) → <span className="text-orange-600 font-semibold">D</span> <span className="text-green-600 font-semibold">major pentatonic</span>/<span className="text-green-600 font-semibold">major blues*</span> (avoid)</span><br/><span className='inline-flex items-center gap-1'><svg width='14' height='14' fill='none' viewBox='0 0 14 14'><circle cx='7' cy='7' r='7' fill='#F59E42' opacity='0.15'/><path d='M4 7l2 2 4-4' stroke='#D97706' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'/></svg><span className="text-orange-600 font-semibold">IV</span> (<span className="text-orange-600 font-semibold">D</span><span className="text-orange-600 font-semibold">7</span>) → <span className="text-orange-600 font-semibold">D</span> <span className="text-green-600 font-semibold">major pentatonic</span>/<span className="text-green-600 font-semibold">major blues*</span></span><br/><span className='inline-flex items-center gap-1'><svg width='14' height='14' fill='none' viewBox='0 0 14 14'><circle cx='7' cy='7' r='7' fill='#F59E42' opacity='0.15'/><path d='M4 7l2 2 4-4' stroke='#D97706' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'/></svg><span className="text-pink-600 font-semibold">V</span> (<span className="text-pink-600 font-semibold">E</span><span className="text-pink-600 font-semibold">7</span>) → <span className="text-orange-600 font-semibold">D</span> <span className="text-green-600 font-semibold">major pentatonic</span>/<span className="text-green-600 font-semibold">major blues*</span></span></span></span></li>
            <li className="mb-3"><span className="text-amber-900"><span className="font-bold text-amber-800">Rule 6:</span> <span className="text-amber-800">The <span className="text-green-600 font-semibold">major pentatonic</span> scales from Rule 2 can be transformed into the Mixolydian mode or hybrid blues scale by adding a few notes. This is really an alteration of Rule 2:<br/><span className="text-blue-600 font-semibold">I</span> (<span className="text-blue-600 font-semibold">A</span><span className="text-blue-600 font-semibold">7</span>) → <span className="text-blue-600 font-semibold">A</span> Mixolydian, <span className="text-blue-600 font-semibold">A</span> hybrid blues<br/><span className="text-orange-600 font-semibold">IV</span> (<span className="text-orange-600 font-semibold">D</span><span className="text-orange-600 font-semibold">7</span>) → <span className="text-orange-600 font-semibold">D</span> Mixolydian, <span className="text-orange-600 font-semibold">D</span> hybrid blues<br/><span className="text-pink-600 font-semibold">V</span> (<span className="text-pink-600 font-semibold">E</span><span className="text-pink-600 font-semibold">7</span>) → <span className="text-pink-600 font-semibold">E</span> Mixolydian, <span className="text-pink-600 font-semibold">E</span> hybrid blues</span></span></li>
          </ul>
          <p className="text-amber-900 text-sm mt-4 italic">
            <span className="font-bold">Important:</span> These "rules" aren't meant to be strictly followed. Use your ear as the source of truth. These scales just give you options and help to visualize the notes on the fretboard.
          </p>
          <p className="text-amber-900 text-sm mt-2">
            <span className="font-bold">Note*:</span> The minor pentatonic is transformed into the minor blues scale by adding the ♭5 (blue note), and the major pentatonic is transformed into the major blues scale by adding the ♭3 (blue note).
          </p>
        </CollapsibleSection>
        </div>



        {/* Progressive Application Levels */}
        <div id="progressive-levels" className="mb-8">
          <h2 className="text-2xl font-bold text-amber-900 mb-4">Progressive Application Levels</h2>
          <p className="text-amber-900 text-sm mb-4 italic">
            <span className="font-bold">Note:</span> These levels represent a logical learning progression rather than strict difficulty ordering. Each level builds upon the previous concepts to develop a complete understanding of blues soloing.
          </p>
          
          <CollapsibleSection 
            title="Level 1 & 2: Foundation Exercises" 
            isOpen={isProgressiveLevelsOpen} 
            onToggle={() => setIsProgressiveLevelsOpen(!isProgressiveLevelsOpen)} 
          >
            <div className="space-y-4">
              <div className="bg-amber-50 border-l-4 border-amber-400 rounded p-4">
                <h3 className="text-lg font-bold text-amber-900 mb-2">Level 1: Foundation Licks (Exercise 1A & 1B)</h3>
                <p className="text-amber-900 text-sm mb-2"><strong>1A:</strong> Master the fundamental blues lick using the b3 - 3 - 1 pattern over all chords.</p>
                <p className="text-amber-900 text-sm mb-2"><strong>1B:</strong> Master the fundamental blues lick using the b3 - 3 - b7 pattern over all chords.</p>
                <div className="flex items-center gap-2">
                  <span aria-label="check"><svg width="18" height="18" fill="none" viewBox="0 0 18 18"><circle cx="9" cy="9" r="9" fill="#F59E42" opacity="0.15"/><path d="M5 9.5l2.5 2.5L13 7.5" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                  <span className="text-amber-900 text-sm">Foundation of blues soloing</span>
                </div>
              </div>

              <div className="bg-amber-50 border-l-4 border-amber-400 rounded p-4">
                <h3 className="text-lg font-bold text-amber-900 mb-2">Level 2: Am Pentatonic Focus (Exercise 2)</h3>
                <p className="text-amber-900 text-sm mb-2">Apply the b3 - 3 - 1 lick and the <Link href="/blog/beginners-guide-pentatonic-scales/?key=A&scroll=shapes" className="text-amber-700 hover:text-amber-800 underline">Am pentatonic scale</Link> over all chords.</p>
                <div className="flex items-center gap-2">
                  <span aria-label="check"><svg width="18" height="18" fill="none" viewBox="0 0 18 18"><circle cx="9" cy="9" r="9" fill="#F59E42" opacity="0.15"/><path d="M5 9.5l2.5 2.5L13 7.5" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                  <span className="text-amber-900 text-sm">Use <Link href="/blog/beginners-guide-pentatonic-scales/?key=A&scroll=shapes" className="text-amber-700 hover:text-amber-800 underline">Am pentatonic</Link> over A7, D7, and E7</span>
                </div>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection 
            title="Levels 3 - 5: Using Multiple Scales" 
            isOpen={isLevels3To5Open} 
            onToggle={() => setIsLevels3To5Open(!isLevels3To5Open)} 
          >
            <div className="space-y-4">
              <div className="bg-amber-50 border-l-4 border-amber-400 rounded p-4">
                <h3 className="text-lg font-bold text-amber-900 mb-2">Level 3: A Major Pentatonic & Am Pentatonic (Exercise 3)</h3>
                <p className="text-amber-900 text-sm mb-2">Use the b3 - 3 - 1 lick and <Link href="/blog/beginners-guide-pentatonic-scales/?key=F%23&scroll=shapes" className="text-amber-700 hover:text-amber-800 underline">A Major pentatonic</Link> over A7, <Link href="/blog/beginners-guide-pentatonic-scales/?key=A&scroll=shapes" className="text-amber-700 hover:text-amber-800 underline">Am pentatonic</Link> over D7, and <Link href="/blog/beginners-guide-pentatonic-scales/?key=F%23&scroll=shapes" className="text-amber-700 hover:text-amber-800 underline">A Major pentatonic</Link> over E7.</p>
                <div className="flex items-center gap-2">
                  <span aria-label="check"><svg width="18" height="18" fill="none" viewBox="0 0 18 18"><circle cx="9" cy="9" r="9" fill="#F59E42" opacity="0.15"/><path d="M5 9.5l2.5 2.5L13 7.5" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                  <span className="text-amber-900 text-sm">Mix major and minor sounds for authentic blues</span>
                </div>
              </div>

              <div className="bg-amber-50 border-l-4 border-amber-400 rounded p-4">
                <h3 className="text-lg font-bold text-amber-900 mb-2">Level 4: E Major Pentatonic & Em Pentatonic (Exercise 4)</h3>
                <p className="text-amber-900 text-sm mb-2">Use the b3 - 3 - 1 lick and <Link href="/blog/beginners-guide-pentatonic-scales/?key=C%23&scroll=shapes" className="text-amber-700 hover:text-amber-800 underline">E Major pentatonic</Link> over E7 (first bar) and <Link href="/blog/beginners-guide-pentatonic-scales/?key=E&scroll=shapes" className="text-amber-700 hover:text-amber-800 underline">Em pentatonic</Link> over E7 (last bar).</p>
                <div className="flex items-center gap-2">
                  <span aria-label="check"><svg width="18" height="18" fill="none" viewBox="0 0 18 18"><circle cx="9" cy="9" r="9" fill="#F59E42" opacity="0.15"/><path d="M5 9.5l2.5 2.5L13 7.5" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                  <span className="text-amber-900 text-sm">Mix major and minor sounds over the V chord</span>
                </div>
              </div>

              <div className="bg-amber-50 border-l-4 border-amber-400 rounded p-4">
                <h3 className="text-lg font-bold text-amber-900 mb-2">Level 5: Multiple Scales (Exercise 5A & 5B)</h3>
                <p className="text-amber-900 text-sm mb-2"><strong>5A:</strong> Use the b3 - 3 - 1 lick and <Link href="/blog/beginners-guide-pentatonic-scales/?key=F%23&scroll=shapes" className="text-amber-700 hover:text-amber-800 underline">A Major pentatonic</Link> over A7, <Link href="/blog/beginners-guide-pentatonic-scales/?key=B&scroll=shapes" className="text-amber-700 hover:text-amber-800 underline">D Major pentatonic</Link> over D7, and <Link href="/scale-explorer/index.html?scale=A&category=blues-scales&mode=blues-major" className="text-amber-700 hover:text-amber-800 underline">A Major blues</Link> over E7.</p>
                <p className="text-amber-900 text-sm mb-2"><strong>5B:</strong> Use the b3 - 3 - 1 lick and <Link href="/scale-explorer/index.html?scale=A&category=blues-scales&mode=blues-major" className="text-amber-700 hover:text-amber-800 underline">A Hybrid blues</Link> over A7, <Link href="/blog/beginners-guide-pentatonic-scales/?key=B&scroll=shapes" className="text-amber-700 hover:text-amber-800 underline">D Major pentatonic</Link> over D7, and <Link href="/scale-explorer/index.html?scale=E&category=blues-scales&mode=blues-major" className="text-amber-700 hover:text-amber-800 underline">E Major blues</Link> over E7.</p>
                <div className="flex items-center gap-2">
                  <span aria-label="check"><svg width="18" height="18" fill="none" viewBox="0 0 18 18"><circle cx="9" cy="9" r="9" fill="#F59E42" opacity="0.15"/><path d="M5 9.5l2.5 2.5L13 7.5" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                  <span className="text-amber-900 text-sm">Master the complete blues vocabulary</span>
                </div>
              </div>
            </div>
          </CollapsibleSection>
        </div>


      </div>


      {/* How to Practice */}
      <div id="practice-guide" className="mb-8">
        <h2 className="text-2xl font-bold text-amber-900 mb-4">How to Practice</h2>
        <p className="text-gray-700 mb-4">
          Start slow and focus on clean execution. These blues licks build essential techniques for blues guitar playing.
        </p>
        
        <h3 className="text-xl font-bold text-amber-900 mb-3">Tempo Reference Guide</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-amber-50 p-4 rounded-lg">
            <h4 className="font-bold text-amber-800 mb-2">Beginner (40-60 BPM)</h4>
            <p className="text-amber-900 text-sm">Focus on clean notes and proper technique</p>
          </div>
          <div className="bg-amber-50 p-4 rounded-lg">
            <h4 className="font-bold text-amber-800 mb-2">Intermediate (60-80 BPM)</h4>
            <p className="text-amber-900 text-sm">Add expression and dynamics</p>
          </div>
          <div className="bg-amber-50 p-4 rounded-lg">
            <h4 className="font-bold text-amber-800 mb-2">Advanced (80-100 BPM)</h4>
            <p className="text-amber-900 text-sm">Master the blues feel and timing</p>
          </div>
          <div className="bg-amber-50 p-4 rounded-lg">
            <h4 className="font-bold text-amber-800 mb-2">Performance (100+ BPM)</h4>
            <p className="text-amber-900 text-sm">Ready for live playing and improvisation</p>
          </div>
        </div>
      </div>



      {/* Next Steps */}
      <div id="next-steps" className="mb-8">
        <h2 className="text-2xl font-bold text-amber-900 mb-4">Next Steps in Your Blues Journey</h2>
        
        <h3 className="text-xl font-bold text-amber-900 mb-3">Explore More Blues Resources</h3>
        <p className="text-gray-700 mb-4">
          Continue your blues education with these related resources.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/blog/beginners-guide-pentatonic-scales" className="block p-4 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors">
            <h4 className="font-bold text-amber-800 mb-2">Pentatonic Scales</h4>
            <p className="text-amber-900 text-sm">Master the foundation of blues soloing</p>
          </Link>
          <Link href="/blog/guitar-picking-technique-guide" className="block p-4 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors">
            <h4 className="font-bold text-amber-800 mb-2">Picking Technique</h4>
            <p className="text-amber-900 text-sm">Develop essential picking skills</p>
          </Link>
        </div>
      </div>

      {/* Call to Action */}
      <div id="book-lesson" className="text-center bg-amber-50 p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-amber-900 mb-4">Ready to Master Blues Guitar?</h2>
        <p className="text-gray-700 mb-4">
          Take your blues playing to the next level with personalized guitar lessons.
        </p>
        <Link href="/contact" className="inline-block bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors">
          Book a Lesson
        </Link>
      </div>
    </div>
  );
} 