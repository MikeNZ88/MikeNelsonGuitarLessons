import type { Metadata } from 'next';
import Link from 'next/link';
import AlphaTabPlayerCDN from '@/components/AlphaTabPlayerCDN';

export const metadata: Metadata = {
  title: 'Blues Licks Exercises | Interactive Tab Player | Mike Nelson Guitar Lessons',
  description: 'Master essential blues licks with our interactive tab player. Practice classic blues phrases, bends, slides, and vibrato techniques with professional notation and audio playback.',
  keywords: 'blues licks, guitar licks, blues guitar, interactive tab, guitar exercises, blues phrases, guitar bends, slides, vibrato, guitar practice',
  openGraph: {
    title: 'Blues Licks Exercises | Interactive Tab Player',
    description: 'Master essential blues licks with our interactive tab player. Practice classic blues phrases, bends, slides, and vibrato techniques.',
    type: 'article',
    url: 'https://mikenelsonguitarlessons.co.nz/blog/blues-licks-exercises',
    images: [
      {
        url: '/GP Files/Scale Exercises/BLOG TABS/Screenshot 2025-07-23 at 2.54.14 PM.png',
        width: 1200,
        height: 630,
        alt: 'Blues Licks Exercises - Interactive Tab Player'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blues Licks Exercises | Interactive Tab Player',
    description: 'Master essential blues licks with our interactive tab player. Practice classic blues phrases, bends, slides, and vibrato techniques.',
    images: ['/GP Files/Scale Exercises/BLOG TABS/Screenshot 2025-07-23 at 2.54.14 PM.png']
  }
};

export default function BluesLicksExercises() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-amber-900 mb-4">Major 12 Bar Blues Scales and Licks</h1>
        <p className="text-lg text-gray-700 mb-4">
          Master essential blues licks with our interactive tab player. Practice classic blues phrases, bends, slides, and vibrato techniques.
        </p>
        <div className="inline-block mb-4 px-4 py-1 rounded-full bg-amber-100 text-amber-800 text-base font-semibold tracking-wide">
          Skill Level: Beginner – Intermediate
        </div>
      </div>

      {/* Blues Theory Intro */}
      <div className="mb-8 bg-amber-50 border-l-4 border-amber-400 rounded p-4">
        <h2 className="text-xl font-bold text-amber-900 mb-2">What is a 12-Bar Blues?</h2>
        <p className="text-amber-900 text-sm mb-2">
          The 12-bar blues is the most common form in blues music. It uses three chords: the I, IV, and V. In the key of A, these are <span className="font-bold text-amber-800">A7</span> (I), <span className="font-bold text-amber-800">D7</span> (IV), and <span className="font-bold text-amber-800">E7</span> (V).
        </p>
        <p className="text-amber-900 text-sm mb-2">
          Unlike a typical major key, where only the V chord is a dominant 7th, the blues uses dominant 7th chords for all three. In a standard major key, the I and IV would be major 7 chords (Amaj7, Dmaj7), but in blues, they are all dominant 7ths. This gives the blues its unique, “in-between” sound.
        </p>
        <p className="text-amber-900 text-sm mb-2">
          This is why the blues doesn’t fit neatly into a traditional major or minor key. It also explains why we can play the <span className="font-bold text-amber-800">minor pentatonic</span> scale over these “major” chords: blues melodies often use both the <span className="font-bold text-amber-800">minor 3rd (b3)</span> and the <span className="font-bold text-amber-800">major 3rd (3)</span> together, creating the classic blues tension and release.
        </p>
        <p className="text-amber-900 text-base flex items-start gap-2 mt-4">
          <span aria-label="info" className="mt-0.5">{/* Lightbulb SVG */}
            <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><circle cx="8" cy="8" r="7" fill="#F59E42" opacity="0.15"/><path d="M8 2.5a4.5 4.5 0 0 0-2.5 8.25V12a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-1.25A4.5 4.5 0 0 0 8 2.5Zm-1.5 9.5v-1.05a.5.5 0 0 0-.25-.43A3.5 3.5 0 1 1 12 8.52a.5.5 0 0 0-.25.43V12h-4Z" fill="#D97706"/></svg>
          </span>
          <span><span className="font-bold">Summary:</span> Blues is special because it blends major and minor sounds, and uses dominant 7th chords for all three main chords in the progression.</span>
        </p>
        <p className="text-amber-900 text-base flex items-start gap-2 mt-2">
          <span aria-label="info" className="mt-0.5">{/* Lightbulb SVG */}
            <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><circle cx="8" cy="8" r="7" fill="#F59E42" opacity="0.15"/><path d="M8 2.5a4.5 4.5 0 0 0-2.5 8.25V12a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-1.25A4.5 4.5 0 0 0 8 2.5Zm-1.5 9.5v-1.05a.5.5 0 0 0-.25-.43A3.5 3.5 0 1 1 12 8.52a.5.5 0 0 0-.25.43V12h-4Z" fill="#D97706"/></svg>
          </span>
          <span><span className="font-bold">Note:</span> Not all blues is based on dominant 7th ("major blues") progressions. <span className="font-bold text-amber-800">Minor blues</span> progressions use minor chords (e.g., Am, Dm, Em) and the minor pentatonic/blues scale throughout. The concepts on this page focus on the classic major/dominant 7th blues, but the minor blues sound is just as important!</span>
        </p>
      </div>

      {/* Blues Essentials */}
      <div className="mb-8">
        {/* b3 - 3 - 1 Lick (Foundation) */}
        <div className="bg-amber-50 border-l-4 border-amber-400 rounded p-4 mb-6">
          <h2 className="text-xl font-bold text-amber-900 mb-2">Foundation: The <span className="font-mono">♭3</span> - 3 - 1 Lick</h2>
          <p className="text-amber-900 text-sm mb-1">This classic blues lick is the backbone of countless solos:</p>
          <div className="bg-white border border-amber-200 rounded p-3 mb-2 flex items-center gap-2">
            <span aria-label="star" className="mt-0.5">{/* Star SVG */}
              <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path d="M8 2.5l1.76 3.57 3.94.57-2.85 2.78.67 3.93L8 11.27l-3.52 1.85.67-3.93-2.85-2.78 3.94-.57L8 2.5z" fill="#F59E42"/></svg>
            </span>
            <span className="font-mono text-amber-800">♭3 (C) → 3 (C#) → 1 (A)</span>
          </div>
          <div className="text-amber-700 text-xs mb-4">The 3 and 1 are chord tones, while the <span className="font-mono">♭3</span> is the added “blues spice” note.</div>

          {/* Table: Where to Find ♭3, 3, and 1 */}
          <div className="mb-8 flex flex-col items-center">
            <div className="w-full max-w-md bg-amber-50 border border-amber-300 rounded-xl shadow-md p-5">
              <div className="flex items-center mb-3">
                <span className="mr-2">{/* Note SVG */}
                  <svg width="22" height="22" fill="none" viewBox="0 0 22 22"><circle cx="11" cy="11" r="11" fill="#F59E42" opacity="0.18"/><path d="M15.5 6.5v7.25a2.25 2.25 0 1 1-1-1.85V8.5h-5v3.25a2.25 2.25 0 1 1-1-1.85V6.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 .5.5Z" fill="#D97706"/></svg>
                </span>
                <h3 className="text-lg font-bold text-amber-900">Where to Find <span className="font-mono">♭3</span>, 3, and 1 in These Licks</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-separate border-spacing-y-1 text-sm">
                  <thead>
                    <tr className="bg-amber-100 text-amber-800">
                      <th className="px-4 py-2 border-b-2 border-amber-300 text-left font-bold">Chord</th>
                      <th className="px-4 py-2 border-b-2 border-amber-300 text-left font-bold"><span className='font-mono'>♭3</span></th>
                      <th className="px-4 py-2 border-b-2 border-amber-300 text-left font-bold">3</th>
                      <th className="px-4 py-2 border-b-2 border-amber-300 text-left font-bold">1</th>
                    </tr>
                  </thead>
                  <tbody className="text-amber-900">
                    <tr className="even:bg-amber-100 hover:bg-amber-200 transition-colors">
                      <td className="px-4 py-3 font-bold text-lg">A</td>
                      <td className="px-4 py-3"><span className="font-mono">5<sup>th</sup> fret, <b>G string</b></span></td>
                      <td className="px-4 py-3"><span className="font-mono">6<sup>th</sup> fret, <b>G string</b></span></td>
                      <td className="px-4 py-3"><span className="font-mono">7<sup>th</sup> fret, <b>D string</b></span></td>
                    </tr>
                    <tr className="even:bg-amber-100 hover:bg-amber-200 transition-colors">
                      <td className="px-4 py-3 font-bold text-lg">D</td>
                      <td className="px-4 py-3"><span className="font-mono">6<sup>th</sup> fret, <b>B string</b></span></td>
                      <td className="px-4 py-3"><span className="font-mono">7<sup>th</sup> fret, <b>B string</b></span></td>
                      <td className="px-4 py-3"><span className="font-mono">7<sup>th</sup> fret, <b>G string</b></span></td>
                    </tr>
                    <tr className="even:bg-amber-100 hover:bg-amber-200 transition-colors">
                      <td className="px-4 py-3 font-bold text-lg">E</td>
                      <td className="px-4 py-3"><span className="font-mono">8<sup>th</sup> fret, <b>B string</b></span></td>
                      <td className="px-4 py-3"><span className="font-mono">9<sup>th</sup> fret, <b>B string</b></span></td>
                      <td className="px-4 py-3"><span className="font-mono">9<sup>th</sup> fret, <b>G string</b></span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="text-amber-700 text-xs mt-3 text-center">
                These notes are available in multiple places across the neck, but these are some starting positions that are mostly within the Am pentatonic “shape 1”.
                <div className="mt-2">
                  <span className="block">The 3 is always 1 fret above the <span className="font-mono">♭3</span>.</span>
                  <span className="block">The 1 is either on the string above and 1 fret higher, or directly above (if moving from the B string to the G string).</span>
                </div>
              </div>
            </div>
          </div>

        {/* Blues Scale Rules */}
        <div className="bg-amber-50 border-l-4 border-amber-400 rounded p-4 mb-6">
          <h2 className="text-xl font-bold text-amber-900 mb-2">Scale Rules for Major 12 Bar Blues</h2>
          <ul className="list-none pl-0 text-amber-900 space-y-2 text-sm">
            <li className="flex items-start gap-2"><span aria-label="check"><svg width="18" height="18" fill="none" viewBox="0 0 18 18"><circle cx="9" cy="9" r="9" fill="#F59E42" opacity="0.15"/><path d="M5 9.5l2.5 2.5L13 7.5" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span><span><span className="font-bold">Rule 1:</span> <span className="text-amber-800">A minor pentatonic (or A minor blues scale) works over the entire progression.</span></span></li>
            <li className="flex items-start gap-2"><span aria-label="check"><svg width="18" height="18" fill="none" viewBox="0 0 18 18"><circle cx="9" cy="9" r="9" fill="#F59E42" opacity="0.15"/><path d="M5 9.5l2.5 2.5L13 7.5" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span><span><span className="font-bold">Rule 2:</span> <span className="text-amber-800">Each chord works with its own major pentatonic or major blues scale:<br/>A7 → A major pentatonic/blues<br/>D7 → D major pentatonic/blues<br/>E7 → E major pentatonic/blues</span></span></li>
            <li className="flex items-start gap-2"><span aria-label="cross"><svg width="18" height="18" fill="none" viewBox="0 0 18 18"><circle cx="9" cy="9" r="9" fill="#F59E42" opacity="0.15"/><path d="M6 6l6 6M12 6l-6 6" stroke="#D97706" strokeWidth="2" strokeLinecap="round"/></svg></span><span><span className="font-bold">Rule 3:</span> <span className="text-amber-800">Avoid the minor pentatonic/blues scale of the IV chord (D7), but you can use the minor pentatonic or minor blues scale of the I and V chords:<br/><span className='inline-flex items-center gap-1'><svg width='14' height='14' fill='none' viewBox='0 0 14 14'><circle cx='7' cy='7' r='7' fill='#F59E42' opacity='0.15'/><path d='M4 7l2 2 4-4' stroke='#D97706' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'/></svg>A7 → A minor pentatonic/blues</span><br/><span className='inline-flex items-center gap-1'><svg width='14' height='14' fill='none' viewBox='0 0 14 14'><circle cx='7' cy='7' r='7' fill='#F59E42' opacity='0.15'/><path d='M4 4l6 6M10 4l-6 6' stroke='#D97706' strokeWidth='1.5' strokeLinecap='round'/></svg>D7 → D minor pentatonic/blues</span><br/><span className='inline-flex items-center gap-1'><svg width='14' height='14' fill='none' viewBox='0 0 14 14'><circle cx='7' cy='7' r='7' fill='#F59E42' opacity='0.15'/><path d='M4 7l2 2 4-4' stroke='#D97706' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'/></svg>E7 → E minor pentatonic/blues</span></span></span></li>
            <li className="flex items-start gap-2"><span aria-label="check"><svg width="18" height="18" fill="none" viewBox="0 0 18 18"><circle cx="9" cy="9" r="9" fill="#F59E42" opacity="0.15"/><path d="M5 9.5l2.5 2.5L13 7.5" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span><span><span className="font-bold">Rule 4:</span> <span className="text-amber-800">The major pentatonic/blues scale of the I chord (A) works well over the I and V chords, but not the IV chord:<br/><span className='inline-flex items-center gap-1'><svg width='14' height='14' fill='none' viewBox='0 0 14 14'><circle cx='7' cy='7' r='7' fill='#F59E42' opacity='0.15'/><path d='M4 7l2 2 4-4' stroke='#D97706' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'/></svg>A7, E7</span><br/><span className='inline-flex items-center gap-1'><svg width='14' height='14' fill='none' viewBox='0 0 14 14'><circle cx='7' cy='7' r='7' fill='#F59E42' opacity='0.15'/><path d='M4 4l6 6M10 4l-6 6' stroke='#D97706' strokeWidth='1.5' strokeLinecap='round'/></svg>D7</span></span></span></li>
            <li className="flex items-start gap-2"><span aria-label="check"><svg width="18" height="18" fill="none" viewBox="0 0 18 18"><circle cx="9" cy="9" r="9" fill="#F59E42" opacity="0.15"/><path d="M5 9.5l2.5 2.5L13 7.5" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span><span><span className="font-bold">Rule 5:</span> <span className="text-amber-800">The major pentatonic/blues scale of the IV chord (D) works well over the IV and V chords, but not the I chord:<br/><span className='inline-flex items-center gap-1'><svg width='14' height='14' fill='none' viewBox='0 0 14 14'><circle cx='7' cy='7' r='7' fill='#F59E42' opacity='0.15'/><path d='M4 7l2 2 4-4' stroke='#D97706' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round'/></svg>D7, E7</span><br/><span className='inline-flex items-center gap-1'><svg width='14' height='14' fill='none' viewBox='0 0 14 14'><circle cx='7' cy='7' r='7' fill='#F59E42' opacity='0.15'/><path d='M4 4l6 6M10 4l-6 6' stroke='#D97706' strokeWidth='1.5' strokeLinecap='round'/></svg>A7</span></span></span></li>
            <li className="flex items-start gap-2"><span aria-label="check"><svg width="18" height="18" fill="none" viewBox="0 0 18 18"><circle cx="9" cy="9" r="9" fill="#F59E42" opacity="0.15"/><path d="M5 9.5l2.5 2.5L13 7.5" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span><span><span className="font-bold">Rule 6:</span> <span className="text-amber-800">The Mixolydian mode of each chord outlines its sound fully and works naturally. <span className='block'>You can also use the <strong>hybrid blues scale</strong> (major + minor blues) for extra color.</span><br/>A7 → A Mixolydian<br/>D7 → D Mixolydian<br/>E7 → E Mixolydian</span></span></li>
          </ul>
        </div>

        {/* BB King Box Explanation */}
        <div className="bg-amber-50 border-l-4 border-amber-400 rounded p-4 mb-6">
          <h2 className="text-xl font-bold text-amber-900 mb-2">What is the BB King Box?</h2>
          <p className="text-amber-900 text-sm mb-3">
            The BB King Box is a specific pentatonic scale pattern that BB King used as his signature soloing position. It's a hybrid approach that blends major and minor pentatonic scales, giving you access to both the "sweet" major 3rd and the "bluesy" minor 3rd.
          </p>
          
          <h3 className="text-lg font-semibold text-amber-900 mb-2">A BB King Box Positions:</h3>
          <div className="bg-white border border-amber-200 rounded p-3 mb-3">
            <div className="text-amber-900 text-sm space-y-1">
              <div><span className="font-bold">1:</span> 10th fret B string</div>
              <div><span className="font-bold">2:</span> 12th fret B string</div>
              <div><span className="font-bold">4:</span> 10th fret high E string</div>
              <div><span className="font-bold">5:</span> 12th fret high E string</div>
              <div><span className="font-bold">6:</span> 11th fret G string</div>
            </div>
          </div>
          
          <h3 className="text-lg font-semibold text-amber-900 mb-2">When to Use Each BB King Box:</h3>
          <div className="bg-white border border-amber-200 rounded p-3 mb-3">
            <div className="text-amber-900 text-sm space-y-2">
              <div><span className="font-bold">A BB King Box:</span> Use over A7 (I chord)</div>
              <div><span className="font-bold">D BB King Box:</span> Use over D7 (IV chord)</div>
              <div><span className="font-bold">E BB King Box:</span> Use over E7 (V chord)</div>
            </div>
          </div>
          
          <h3 className="text-lg font-semibold text-amber-900 mb-2">Other BB King Box Starting Positions:</h3>
          <div className="bg-white border border-amber-200 rounded p-3 mb-3">
            <div className="text-amber-900 text-sm space-y-1">
              <div><span className="font-bold">D BB King Box:</span> Starts on D (3rd fret B string, or 15th fret B string)</div>
              <div><span className="font-bold">E BB King Box:</span> Starts on E (5th fret B string, or 17th fret B string)</div>
            </div>
            <div className="text-amber-700 text-xs mt-2">
              <span className="font-bold">Remember:</span> The first note of each BB King Box is the root note of the chord.
            </div>
          </div>
          
          <h3 className="text-lg font-semibold text-amber-900 mb-2">Key Features:</h3>
          <ul className="list-none pl-0 text-amber-900 space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span aria-label="check"><svg width="18" height="18" fill="none" viewBox="0 0 18 18"><circle cx="9" cy="9" r="9" fill="#F59E42" opacity="0.15"/><path d="M5 9.5l2.5 2.5L13 7.5" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
              <span><span className="font-bold">Bend from 2 to ♭3</span> (half-step bend) - creates the classic blues tension</span>
            </li>
            <li className="flex items-start gap-2">
              <span aria-label="check"><svg width="18" height="18" fill="none" viewBox="0 0 18 18"><circle cx="9" cy="9" r="9" fill="#F59E42" opacity="0.15"/><path d="M5 9.5l2.5 2.5L13 7.5" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
              <span><span className="font-bold">Bend from 2 to 3</span> (whole-step bend) - adds the major pentatonic sweetness</span>
            </li>
            <li className="flex items-start gap-2">
              <span aria-label="check"><svg width="18" height="18" fill="none" viewBox="0 0 18 18"><circle cx="9" cy="9" r="9" fill="#F59E42" opacity="0.15"/><path d="M5 9.5l2.5 2.5L13 7.5" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
              <span><span className="font-bold">Bend from 5 to ♭7</span> (1½-step bend) - creates the dominant 7th blues sound</span>
            </li>
            <li className="flex items-start gap-2">
              <span aria-label="check"><svg width="18" height="18" fill="none" viewBox="0 0 18 18"><circle cx="9" cy="9" r="9" fill="#F59E42" opacity="0.15"/><path d="M5 9.5l2.5 2.5L13 7.5" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
              <span><span className="font-bold">Bend from 5 to 6</span> (whole-step bend) - adds major scale color</span>
            </li>
            <li className="flex items-start gap-2">
              <span aria-label="check"><svg width="18" height="18" fill="none" viewBox="0 0 18 18"><circle cx="9" cy="9" r="9" fill="#F59E42" opacity="0.15"/><path d="M5 9.5l2.5 2.5L13 7.5" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
              <span><span className="font-bold">♭5 (blue note)</span> - available between the 2 frets used on high E string</span>
            </li>
          </ul>
          
          <p className="text-amber-900 text-sm mt-3">
            This pattern gives you the complete blues vocabulary in one position - you can play pure minor pentatonic, pure major pentatonic, or blend them together for that signature BB King sound.
          </p>
        </div>

        {/* Level System */}
        <div className="bg-amber-50 border-l-4 border-amber-400 rounded p-4 mb-6">
          <h2 className="text-xl font-bold text-amber-900 mb-2">Progressive Blues Levels</h2>
          <div className="space-y-3 text-sm">
            <div className="bg-white border border-amber-200 rounded p-3">
              <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs font-bold mr-2">Level 1: Foundation</span>
              <span className="text-amber-900">A minor pentatonic and <span className="font-mono">♭3</span> - 3 - 1 lick over all chords.</span>
            </div>
            <div className="bg-white border border-amber-200 rounded p-3">
              <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs font-bold mr-2">Level 2</span>
              <span className="text-amber-900">Add A major pentatonic (over A7 and E7), use A minor pentatonic on D7.</span>
            </div>
            <div className="bg-white border border-amber-200 rounded p-3">
              <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs font-bold mr-2">Level 3</span>
              <span className="text-amber-900">Add D major pentatonic over D7, and E major & E minor pentatonic over E7.</span>
            </div>
            <div className="bg-white border border-amber-200 rounded p-3">
              <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs font-bold mr-2">Level 4</span>
              <span className="text-amber-900">Use the blues scale, Mixolydian, and hybrid blues scales (major + minor blues).</span>
            </div>
            <div className="bg-white border border-amber-200 rounded p-3">
              <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs font-bold mr-2">Level 5</span>
              <span className="text-amber-900">Combine scales, arpeggios, and licks that suit each chord.</span>
            </div>
          </div>
        </div>

        {/* Chord Note Theory */}
        <div className="bg-amber-50 border-l-4 border-amber-400 rounded p-4">
          <h2 className="text-xl font-bold text-amber-900 mb-2">Chord Note Theory</h2>
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
        </div>
      </div>
      </div>

      {/* Tab Player */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-amber-900 mb-4">Interactive Blues Licks Tab Player</h2>
        <AlphaTabPlayerCDN key={Date.now()} containerId="blues-licks-alphatab-container" />
      </div>

      {/* How to Read the Tab */}
      <div className="bg-amber-50 border-l-4 border-amber-400 rounded p-4 mb-6 max-w-2xl mx-auto">
        <h3 className="text-lg font-semibold text-amber-800 mb-2">How to Read This Tab</h3>
        <ul className="list-disc pl-5 text-amber-900 space-y-1">
          <li><span className="font-bold text-amber-700">Standard Notation:</span> The top staff shows traditional music notation for rhythm and pitch.</li>
          <li><span className="font-bold text-amber-700">Tablature (TAB):</span> The lower staff shows fret numbers for each string—play the indicated fret on the matching string.</li>
          <li><span className="font-bold text-amber-700">Picking Symbols:</span> <span className="font-mono">⊓</span> = Downstroke, <span className="font-mono">∨</span> = Upstroke.</li>
          <li><span className="font-bold text-amber-700">Slurs:</span> Curved lines between notes indicate hammer-ons or pull-offs (pick the first note, then use your left hand for the next note without picking).</li>
          <li><span className="font-bold text-amber-700">Slides:</span> A diagonal line or "sl." between notes means slide your finger from the first note to the next without lifting.</li>
          <li><span className="font-bold text-amber-700">Vibrato:</span> Squiggly lines (~~~~) indicate vibrato—rapidly bend and release the string.</li>
          <li><span className="font-bold text-amber-700">Fingering:</span> Numbers above the staff suggest which left-hand finger to use (1 = index, 2 = middle, 3 = ring, 4 = pinky).</li>
        </ul>
      </div>

      {/* How to Practice */}
      <div className="mb-8">
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

      {/* Blues Techniques */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-amber-900 mb-4">Essential Blues Techniques</h2>
        
        <h3 className="text-xl font-bold text-amber-900 mb-3">Bending</h3>
        <p className="text-gray-700 mb-4">
          String bends are fundamental to blues guitar. Practice bending to pitch and controlling the bend release.
        </p>
        
        <h3 className="text-xl font-bold text-amber-900 mb-3">Slides</h3>
        <p className="text-gray-700 mb-4">
          Slides add smoothness and character to blues licks. Focus on clean slide execution.
        </p>
        
        <h3 className="text-xl font-bold text-amber-900 mb-3">Vibrato</h3>
        <p className="text-gray-700 mb-4">
          Vibrato adds expression and life to sustained notes. Practice consistent vibrato width and speed.
        </p>
        
        <h3 className="text-xl font-bold text-amber-900 mb-3">Hammer-ons and Pull-offs</h3>
        <p className="text-gray-700 mb-4">
          These legato techniques create smooth, flowing phrases essential for blues playing.
        </p>
      </div>

      {/* Practice Tips */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-amber-900 mb-4">Practice Tips</h2>
        
        <h3 className="text-xl font-bold text-amber-900 mb-3">Start Slow</h3>
        <p className="text-gray-700 mb-4">
          Begin at a comfortable tempo and gradually increase speed as you master each lick.
        </p>
        
        <h3 className="text-xl font-bold text-amber-900 mb-3">Use a Metronome</h3>
        <p className="text-gray-700 mb-4">
          Practice with the metronome to develop solid timing and rhythm.
        </p>
        
        <h3 className="text-xl font-bold text-amber-900 mb-3">Record Yourself</h3>
        <p className="text-gray-700 mb-4">
          Recording your practice helps identify areas for improvement.
        </p>
        
        <h3 className="text-xl font-bold text-amber-900 mb-3">Transpose to Different Keys</h3>
        <p className="text-gray-700 mb-4">
          Practice these licks in different keys to develop fretboard knowledge.
        </p>
      </div>

      {/* Next Steps */}
      <div className="mb-8">
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
      <div className="text-center bg-amber-50 p-6 rounded-lg">
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