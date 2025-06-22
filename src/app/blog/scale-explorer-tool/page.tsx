import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Guitar, Music } from 'lucide-react';

export const metadata: Metadata = {
  title: "Scale Explorer - Interactive Guitar Learning Tool | Mike Nelson Guitar Lessons",
  description: "Learn guitar scales the right way with our free interactive Scale Explorer. Start with the major scale and understand how all other scales relate to it.",
  keywords: "guitar scales, scale explorer, fretboard visualization, music theory, guitar learning, interactive scales, major scale",
};

export default function ScaleExplorerTool() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Back to Blog */}
        <Link 
          href="/blog" 
          className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Link>

        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Scale Explorer: Learn Guitar Scales The Right Way
          </h1>
          <div className="text-gray-600 mb-8">
            <time>Published: January 2025</time>
          </div>
          <p className="text-xl text-gray-700 leading-relaxed">
            Most guitarists learn scales as isolated fretboard shapes. Scale Explorer teaches you to understand the connections between scales, chords, and music theory - starting with the major scale as your foundation.
          </p>
        </header>

        {/* What is Scale Explorer */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">What is Scale Explorer?</h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 mb-6">
              Scale Explorer is a free, interactive tool that helps you understand guitar scales through visual learning and music theory connections. Instead of memorizing dozens of isolated fretboard patterns, you learn one universal reference - the major scale - and see how everything else relates to it.
            </p>
            
            <p className="text-gray-700 mb-6">
              The tool uses color-coded intervals to show you the relationships between notes, making it easy to understand why certain scales and chords work together. This visual approach helps you move beyond pattern memorization to actual musical understanding.
            </p>
          </div>
        </section>

        {/* How It Helps */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">How Scale Explorer Helps You</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-orange-200">
              <h3 className="text-xl font-semibold text-orange-800 mb-4 flex items-center">
                <Guitar className="w-5 h-5 mr-2" />
                Learn Connections, Not Just Shapes
              </h3>
              <p className="text-gray-700">
                See how the natural minor scale is just the major scale with three notes lowered (♭3, ♭6, ♭7). Understand why a C major chord and an A minor chord work together - they're from the same scale family.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-orange-200">
              <h3 className="text-xl font-semibold text-orange-800 mb-4 flex items-center">
                <Music className="w-5 h-5 mr-2" />
                Build on One Foundation
              </h3>
              <p className="text-gray-700">
                Master the major scale across the fretboard and you've learned the foundation for understanding all other scales. Every mode, every chord progression, every key signature makes sense when you have this reference point.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-orange-200">
              <h3 className="text-xl font-semibold text-orange-800 mb-4">
                Visual Learning
              </h3>
              <p className="text-gray-700">
                Each interval has its own color, making patterns instantly recognizable. See how scales relate to each other and understand chord construction through visual connections rather than memorization.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-orange-200">
              <h3 className="text-xl font-semibold text-orange-800 mb-4">
                Interactive Exploration
              </h3>
              <p className="text-gray-700">
                Change keys, compare scales side by side, and hear how each scale sounds. The interactive fretboard lets you explore patterns and discover connections at your own pace.
              </p>
            </div>
          </div>
        </section>

        {/* Interval Colors */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding Intervals Through Color</h2>
          
          <div className="bg-white rounded-xl p-8 shadow-lg border border-orange-200">
            <p className="text-gray-700 mb-8">
              Scale Explorer uses a consistent color system to help you recognize intervals instantly. Each scale degree has its own color, making it easy to see patterns and relationships across different scales.
            </p>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Major Scale Intervals (1-7)</h3>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-white border-4 border-gray-800 flex items-center justify-center font-bold text-black text-lg">
                  1
                </div>
                <div className="text-sm text-gray-600 mt-2">Root</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center font-bold text-white text-lg">
                  2
                </div>
                <div className="text-sm text-gray-600 mt-2">2nd</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center font-bold text-black text-lg">
                  3
                </div>
                <div className="text-sm text-gray-600 mt-2">3rd</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center font-bold text-white text-lg">
                  4
                </div>
                <div className="text-sm text-gray-600 mt-2">4th</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-blue-400 flex items-center justify-center font-bold text-black text-lg">
                  5
                </div>
                <div className="text-sm text-gray-600 mt-2">5th</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-green-400 flex items-center justify-center font-bold text-black text-lg">
                  6
                </div>
                <div className="text-sm text-gray-600 mt-2">6th</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center font-bold text-white text-lg">
                  7
                </div>
                <div className="text-sm text-gray-600 mt-2">7th</div>
              </div>
            </div>
            
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
              <h4 className="font-semibold text-amber-800 mb-3">Example: C Major Scale</h4>
              <div className="flex flex-wrap justify-center gap-3 mb-4">
                <span className="px-3 py-1 bg-white border-2 border-gray-800 rounded-full font-semibold">C</span>
                <span className="px-3 py-1 bg-orange-500 text-white rounded-full font-semibold">D</span>
                <span className="px-3 py-1 bg-yellow-400 text-black rounded-full font-semibold">E</span>
                <span className="px-3 py-1 bg-red-500 text-white rounded-full font-semibold">F</span>
                <span className="px-3 py-1 bg-blue-400 text-black rounded-full font-semibold">G</span>
                <span className="px-3 py-1 bg-green-400 text-black rounded-full font-semibold">A</span>
                <span className="px-3 py-1 bg-red-600 text-white rounded-full font-semibold">B</span>
              </div>
              <p className="text-amber-700 text-sm">
                Once you know these colors, you can instantly recognize this pattern in any key and see how other scales modify it.
              </p>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Key Features</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 border border-orange-200">
              <h3 className="text-lg font-semibold text-orange-800 mb-3">🎸 Interactive Fretboard</h3>
              <p className="text-gray-700">
                See scales displayed on a real guitar fretboard. Toggle between 12 and 24 frets, show note names or intervals, and compare different scales side by side.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 border border-orange-200">
              <h3 className="text-lg font-semibold text-orange-800 mb-3">🎵 Chord Integration</h3>
              <p className="text-gray-700">
                See which chords belong to each scale. Understand why certain chord progressions work and discover new harmonic possibilities.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 border border-orange-200">
              <h3 className="text-lg font-semibold text-orange-800 mb-3">🔊 Audio Playback</h3>
              <p className="text-gray-700">
                Hear how each scale sounds. Listen to scales and chords to develop your ear and understand their musical character.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 border border-orange-200">
              <h3 className="text-lg font-semibold text-orange-800 mb-3">📚 Comprehensive Library</h3>
              <p className="text-gray-700">
                Access major scales, modes, harmonic minor, melodic minor, pentatonic scales, blues scales, and more - all organized and connected.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 border border-orange-200">
              <h3 className="text-lg font-semibold text-orange-800 mb-3">🔗 Scale Relationships</h3>
              <p className="text-gray-700">
                See how scales relate to each other. Understand modes as different starting points of the same scale family.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 border border-orange-200">
              <h3 className="text-lg font-semibold text-orange-800 mb-3">⚖️ Scale Comparison</h3>
              <p className="text-gray-700">
                Overlay different scales to see their similarities and differences. Perfect for understanding how to transition between scales in improvisation.
              </p>
            </div>
          </div>
        </section>

        {/* Why Start with Major Scale */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Start with the Major Scale?</h2>
          
          <div className="bg-orange-50 rounded-xl p-8 border border-orange-200">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 mb-6">
                The major scale isn't just another scale to learn - it's the foundation of Western music theory. When you truly understand the major scale, you have a reference point for understanding everything else:
              </p>
              
              <ul className="space-y-3 text-gray-700 mb-6">
                <li><strong>Natural Minor</strong> = Major scale with ♭3, ♭6, ♭7</li>
                <li><strong>Dorian Mode</strong> = Major scale starting from the 2nd degree</li>
                <li><strong>Mixolydian Mode</strong> = Major scale with ♭7</li>
                <li><strong>Major Pentatonic</strong> = Major scale without the 4th and 7th</li>
              </ul>
              
              <p className="text-gray-700">
                Scale Explorer makes these connections visual and interactive, so you can see and hear how everything relates to your major scale foundation.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center py-12 bg-gradient-to-r from-orange-100 to-amber-100 rounded-xl border border-orange-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Start Learning?</h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Stop memorizing isolated shapes. Start understanding the connections that make music work.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
                         <a 
               href="/scale-explorer/index.html" 
               className="inline-flex items-center bg-orange-600 text-white px-8 py-4 rounded-lg hover:bg-orange-700 transition-colors font-semibold"
               target="_blank"
               rel="noopener noreferrer"
             >
               <Guitar className="w-5 h-5 mr-2" />
               Try Scale Explorer (Free)
             </a>
            <Link 
              href="/contact" 
              className="inline-flex items-center bg-white text-orange-600 border-2 border-orange-600 px-8 py-4 rounded-lg hover:bg-orange-50 transition-colors font-semibold"
            >
              <Music className="w-5 h-5 mr-2" />
              Book a Lesson
            </Link>
          </div>
        </section>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mt-12 pt-8 border-t border-orange-200">
          <Link 
            href="/blog" 
            className="inline-flex items-center text-orange-600 hover:text-orange-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
          
          <Link 
            href="/lessons" 
            className="inline-flex items-center bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors"
          >
            <Music className="w-4 h-4 mr-2" />
            View Lessons
          </Link>
        </div>

        <div className="mt-8 text-center text-gray-600 text-sm italic">
          <p>Mike Nelson teaches guitar lessons in Pukerua Bay, Plimmerton, Cambourne, Mana, Paremata, Papakowhai, and Whitby.</p>
        </div>
      </div>
    </div>
  );
} 