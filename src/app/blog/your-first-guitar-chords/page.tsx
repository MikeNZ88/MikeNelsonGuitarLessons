import { Metadata } from 'next';
import Link from 'next/link';
import ChordDiagram from '@/components/ChordDiagram';

export const metadata: Metadata = {
  title: 'Your First Guitar Chords: A Complete Beginner Guide | Mike Nelson Guitar Lessons',
  description: 'Learn your first 8 essential guitar chords with interactive diagrams and smooth transition tips. Master A, E, G, D, C, Em, Am, and Dm chords.',
  keywords: 'guitar chords, beginner guitar, chord diagrams, chord transitions, open chords, guitar lessons',
  openGraph: {
    title: 'Your First Guitar Chords: A Complete Beginner Guide',
    description: 'Learn your first 8 essential guitar chords with interactive diagrams and smooth transition tips.',
    images: [
      {
        url: '/blog-thumbnail.svg',
        width: 1200,
        height: 630,
        alt: 'Your First Guitar Chords Guide',
      },
    ],
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Your First Guitar Chords: A Complete Beginner Guide',
    description: 'Learn your first 8 essential guitar chords with interactive diagrams and transition tips.',
    images: ['/blog-thumbnail.svg'],
  },
  alternates: {
    canonical: 'https://mikenelsonguitarlessons.co.nz/blog/your-first-guitar-chords',
  },
};

export default function YourFirstGuitarChords() {
  return (
    <div className="min-h-screen bg-amber-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <nav className="mb-8">
          <Link href="/blog" className="text-amber-600 hover:text-amber-800">
            ← Back to Blog
          </Link>
        </nav>

        <article className="bg-white rounded-lg shadow-lg p-8">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-amber-900 mb-4">
              Your First Guitar Chords: A Complete Beginner Guide
            </h1>
            <p className="text-xl text-amber-700 mb-4">
              Master the 8 essential open chords that form the foundation of thousands of songs
            </p>
            <div className="flex items-center text-amber-600 text-sm">
              <span>8 minute read</span>
              <span className="mx-2">•</span>
              <span>Beginner Level</span>
            </div>
          </header>

          <div className="prose prose-amber max-w-none">

            {/* Table of Contents Menu */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold text-amber-900 mb-4">Table of Contents</h2>
              <nav className="space-y-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium text-amber-800 mb-2">Essential Chord Pairs</h3>
                    <ul className="space-y-1 text-amber-700">
                      <li><a href="#a-e-pair" className="hover:text-amber-600 underline">A and E Major Chords</a></li>
                      <li><a href="#g-d-pair" className="hover:text-amber-600 underline">G and D Major Chords</a></li>
                      <li><a href="#c-em-pair" className="hover:text-amber-600 underline">C Major and E Minor</a></li>
                      <li><a href="#am-dm-pair" className="hover:text-amber-600 underline">A Minor and D Minor</a></li>
                    </ul>
                  </div>
                                  <div>
                  <h3 className="font-medium text-amber-800 mb-2">Practice & Tips</h3>
                  <ul className="space-y-1 text-amber-700">
                    <li><a href="#practice-songs" className="hover:text-amber-600 underline">Practice Songs</a></li>
                  </ul>
                </div>
                </div>
              </nav>
            </div>

            <p className="text-lg text-amber-700 mb-6">
              Learning your first guitar chords is an exciting milestone in your guitar journey. These 8 essential open chords - A, E, G, D, C, Em, Am, and Dm - will unlock hundreds of songs and give you a solid foundation for more advanced playing.
            </p>

            <p className="text-lg text-amber-700 mb-8">
              In this guide, we'll learn these chords in pairs, focusing on smooth transitions between related shapes. This approach will help you develop muscle memory and make chord changes feel natural and effortless.
            </p>

            <h2 className="text-3xl font-bold text-amber-900 mt-12 mb-6">
              The 8 Essential Chords
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <ChordDiagram 
                chordName="A"
                chordData={{
                  frets: [-1, 0, 2, 2, 2, 0],
                  fingers: ['', '', '1', '2', '3', '']
                }}
              />
              <ChordDiagram 
                chordName="E"
                chordData={{
                  frets: [0, 2, 2, 1, 0, 0],
                  fingers: ['', '2', '3', '1', '', '']
                }}
              />
              <ChordDiagram 
                chordName="G"
                chordData={{
                  frets: [3, 2, 0, 0, 3, 3],
                  fingers: ['4', '2', '', '', '3', '1']
                }}
              />
              <ChordDiagram 
                chordName="D"
                chordData={{
                  frets: [-1, -1, 0, 2, 3, 2],
                  fingers: ['', '', '', '1', '3', '2']
                }}
              />
              <ChordDiagram 
                chordName="C"
                chordData={{
                  frets: [-1, 3, 2, 0, 1, 0],
                  fingers: ['', '3', '2', '', '1', '']
                }}
              />
              <ChordDiagram 
                chordName="Em"
                chordData={{
                  frets: [0, 2, 2, 0, 0, 0],
                  fingers: ['', '1', '2', '', '', '']
                }}
              />
              <ChordDiagram 
                chordName="Am"
                chordData={{
                  frets: [-1, 0, 2, 2, 1, 0],
                  fingers: ['', '', '3', '2', '1', '']
                }}
              />
              <ChordDiagram 
                chordName="Dm"
                chordData={{
                  frets: [-1, -1, 0, 2, 3, 1],
                  fingers: ['', '', '', '2', '3', '1']
                }}
              />
            </div>

            <h2 className="text-3xl font-bold text-amber-900 mt-12 mb-6">
              Learning in Pairs: Smart Chord Transitions
            </h2>

            <p className="text-lg text-amber-700 mb-8">
              Instead of learning chords in isolation, we'll group them by similar fingerings and transition patterns. This approach will help you develop smooth chord changes from the very beginning.
            </p>

            <h3 id="a-e-pair" className="text-2xl font-bold text-amber-900 mt-8 mb-4">
              Pair 1: A and E Major Chords
            </h3>

            <div className="bg-amber-50 border-l-4 border-amber-400 p-6 mb-6">
              <p className="text-lg text-amber-700 mb-4">
                <strong>Why start here?</strong> A and E are two of the easiest chords to learn and they share a logical finger movement pattern.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="text-xl font-semibold mb-4">A Major Chord</h4>
                <ChordDiagram 
                  chordName="A"
                  chordData={{
                    frets: [-1, 0, 2, 2, 2, 0],
                    fingers: ['', '', '1', '2', '3', '']
                  }}
                />
                <ul className="list-disc list-inside text-amber-700 space-y-2">
                  <li>Place your 2nd finger on the 2nd fret of the D string</li>
                  <li>Place your 3rd finger on the 2nd fret of the G string</li>
                  <li>Place your 1st finger on the 2nd fret of the B string</li>
                  <li>Strum from the A string down</li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-4">E Major Chord</h4>
                <ChordDiagram 
                  chordName="E"
                  chordData={{
                    frets: [0, 2, 2, 1, 0, 0],
                    fingers: ['', '2', '3', '1', '', '']
                  }}
                />
                <ul className="list-disc list-inside text-amber-700 space-y-2">
                  <li>Place your 1st finger on the 1st fret of the G string</li>
                  <li>Place your 2nd finger on the 2nd fret of the A string</li>
                  <li>Place your 3rd finger on the 2nd fret of the D string</li>
                  <li>Strum all six strings</li>
                </ul>
              </div>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-400 p-6 mb-8">
              <h4 className="font-semibold text-amber-800 mb-2">Transition Tip: A to E</h4>
              <p className="text-amber-700">
                Notice how your 2nd and 3rd fingers just move up one string each from A to E? Your 1st finger simply moves under to the G string. This creates a smooth, logical transition pattern.
              </p>
            </div>

            <h3 id="g-d-pair" className="text-2xl font-bold text-amber-900 mt-12 mb-4">
              Pair 2: G and D Major Chords
            </h3>

            <div className="bg-amber-50 border-l-4 border-amber-400 p-6 mb-6">
              <p className="text-lg text-amber-700 mb-4">
                <strong>Why this pair?</strong> G and D share a common finger position that makes transitioning between them feel natural.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="text-xl font-semibold mb-4">G Major Chord (4-finger version)</h4>
                <ChordDiagram 
                  chordName="G"
                  chordData={{
                    frets: [3, 2, 0, 0, 3, 3],
                    fingers: ['4', '2', '', '', '3', '1']
                  }}
                />
                <ul className="list-disc list-inside text-amber-700 space-y-2">
                  <li>Place your 2nd finger on the 2nd fret of the A string</li>
                  <li>Place your 1st finger on the 1st fret of the E string</li>
                  <li>Place your 3rd finger on the 3rd fret of the B string</li>
                  <li>Place your 4th finger on the 3rd fret of the high E string</li>
                  <li>Strum all six strings</li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-4">D Major Chord</h4>
                <ChordDiagram 
                  chordName="D"
                  chordData={{
                    frets: [-1, -1, 0, 2, 3, 2],
                    fingers: ['', '', '', '1', '3', '2']
                  }}
                />
                <ul className="list-disc list-inside text-amber-700 space-y-2">
                  <li>Place your 1st finger on the 2nd fret of the G string</li>
                  <li>Place your 3rd finger on the 3rd fret of the B string</li>
                  <li>Place your 2nd finger on the 2nd fret of the high E string</li>
                  <li>Strum from the D string down (4 strings)</li>
                  <li><em>Note:</em> If you accidentally hit the open A string, it won't necessarily sound bad, but the chord has a clearer sound without it</li>
                </ul>
              </div>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-400 p-6 mb-8">
              <h4 className="font-semibold text-amber-800 mb-2">Transition Tip: G to D</h4>
              <p className="text-amber-700">
                Your 3rd finger stays on the 3rd fret of the B string for both chords! This anchor finger makes the transition much easier. Just move your other fingers to their new positions while keeping that 3rd finger in place.
              </p>
            </div>

            <h3 id="c-em-pair" className="text-2xl font-bold text-amber-900 mt-12 mb-4">
              Pair 3: C and Em Chords
            </h3>

            <div className="bg-amber-50 border-l-4 border-amber-400 p-6 mb-6">
              <p className="text-lg text-amber-700 mb-4">
                <strong>Why this pair?</strong> C is often the trickiest shape for beginners, but pairing it with Em makes it easier to learn and practice.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="text-xl font-semibold mb-4">C Major Chord</h4>
                <ChordDiagram 
                  chordName="C"
                  chordData={{
                    frets: [-1, 3, 2, 0, 1, 0],
                    fingers: ['', '3', '2', '', '1', '']
                  }}
                />
                <ul className="list-disc list-inside text-amber-700 space-y-2">
                  <li>Place your 1st finger on the 1st fret of the B string</li>
                  <li>Place your 2nd finger on the 2nd fret of the D string</li>
                  <li>Place your 3rd finger on the 3rd fret of the A string</li>
                  <li>Strum from the A string down (5 strings)</li>
                  <li><strong>Important:</strong> Keep your fingers arched to avoid muting open strings</li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-4">Em Minor Chord</h4>
                <ChordDiagram 
                  chordName="Em"
                  chordData={{
                    frets: [0, 2, 2, 0, 0, 0],
                    fingers: ['', '1', '2', '', '', '']
                  }}
                />
                <ul className="list-disc list-inside text-amber-700 space-y-2">
                  <li>Place your 1st finger on the 2nd fret of the A string</li>
                  <li>Place your 2nd finger on the 2nd fret of the D string</li>
                  <li>Strum all six strings</li>
                </ul>
              </div>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-400 p-6 mb-8">
              <h4 className="font-semibold text-amber-800 mb-2">Transition Tip: C to Em</h4>
              <p className="text-amber-700">
                Your 2nd finger stays on the 2nd fret of the D string for both chords! This common finger position creates a natural pivot point for smooth transitions between C and Em.
              </p>
            </div>

            <h3 id="am-dm-pair" className="text-2xl font-bold text-amber-900 mt-12 mb-4">
              Pair 4: Am and Dm Minor Chords
            </h3>

            <div className="bg-amber-50 border-l-4 border-amber-400 p-6 mb-6">
              <p className="text-lg text-amber-700 mb-4">
                <strong>Why this pair?</strong> Am and Dm share similar shapes and finger movements, making them perfect practice partners.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="text-xl font-semibold mb-4">Am Minor Chord</h4>
                <ChordDiagram 
                  chordName="Am"
                  chordData={{
                    frets: [-1, 0, 2, 2, 1, 0],
                    fingers: ['', '', '3', '2', '1', '']
                  }}
                />
                <ul className="list-disc list-inside text-amber-700 space-y-2">
                  <li>Place your 1st finger on the 1st fret of the B string</li>
                  <li>Place your 2nd finger on the 2nd fret of the D string</li>
                  <li>Place your 3rd finger on the 2nd fret of the G string</li>
                  <li>Strum from the A string down (5 strings)</li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-4">Dm Minor Chord</h4>
                <ChordDiagram 
                  chordName="Dm"
                  chordData={{
                    frets: [-1, -1, 0, 2, 3, 1],
                    fingers: ['', '', '', '2', '3', '1']
                  }}
                />
                <ul className="list-disc list-inside text-amber-700 space-y-2">
                  <li>Place your 1st finger on the 1st fret of the high E string</li>
                  <li>Place your 2nd finger on the 2nd fret of the G string</li>
                  <li>Place your 3rd finger on the 3rd fret of the B string</li>
                  <li>Strum from the D string down (4 strings)</li>
                  <li><em>Note:</em> If you accidentally hit the open A string, it won't necessarily sound bad, but the chord has a clearer sound without it</li>
                </ul>
              </div>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-400 p-6 mb-8">
              <h4 className="font-semibold text-amber-800 mb-2">Transition Tip: Am to Dm</h4>
              <p className="text-amber-700">
                Am and Dm share a similar shape! Your 1st and 2nd fingers move to the string above or below, while your 3rd finger just moves one fret higher. Most of the movement is just shifting to adjacent strings.
              </p>
            </div>

            <h2 id="practice-songs" className="text-3xl font-bold text-amber-900 mt-12 mb-6">
              Practice Songs with These Chords
            </h2>

            <p className="text-lg text-amber-700 mb-6">
              The best way to practice these chords is by playing actual songs! In my{' '}
              <Link href="/blog/complete-beginners-guide-guitar#chord-resources" className="text-amber-600 hover:text-amber-800 underline">
                Complete Beginner's Guide to Guitar
              </Link>
              , I've included three songs that progressively introduce these chords with interactive strumming patterns:
            </p>

            <div className="bg-amber-50 border-l-4 border-amber-400 p-6 mb-8">
              <h3 className="font-semibold text-amber-800 mb-3">Progressive Song Learning</h3>
              <ol className="list-decimal list-inside text-amber-700 space-y-2">
                <li><strong>Achy Breaky Heart</strong> - Uses A and E chords with simple strumming</li>
                <li><strong>Bad Moon Rising</strong> - Adds G and D chords with more complex patterns</li>
                <li><strong>Brown Eyed Girl</strong> - Incorporates C and Em for four-chord progressions</li>
              </ol>
            </div>



            <div className="bg-amber-50 border-l-4 border-amber-400 p-6 mb-8">
              <h3 className="font-semibold text-amber-800 mb-3">Ready to Start?</h3>
              <p className="text-amber-700 mb-4">
                These 8 chords will open up hundreds of songs for you to play. Remember, consistency is key - 
                practice these chords daily, even if just for 10-15 minutes.
              </p>
              <p className="text-amber-700 mb-4">
                Want to explore more chords? Check out our{' '}
                <Link href="/blog/open-chord-library" className="text-amber-600 hover:text-amber-800 underline">
                  Open Chord Library
                </Link>
                {' '}for a comprehensive collection of open chord shapes and variations.
              </p>
              <p className="text-amber-700">
                If you're in the Wellington area and would like personalized guidance, I offer guitar lessons 
                in Pukerua Bay and can travel to surrounding areas. Contact me to start your guitar journey!
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
} 