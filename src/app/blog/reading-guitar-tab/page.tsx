import Link from 'next/link';
import { ArrowLeft, Clock, User, BookOpen } from 'lucide-react';

export default function ReadingGuitarTabPost() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-800 to-orange-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <Link href="/blog" className="inline-flex items-center text-amber-200 hover:text-white transition-colors mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
          <h1 className="text-4xl font-bold mb-2">Reading Guitar Tab</h1>
          <div className="flex items-center text-amber-200 space-x-4">
            <div className="flex items-center">
              <User className="w-4 h-4 mr-1" />
              Mike Nelson
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              8 min read
            </div>
            <div className="flex items-center">
              <BookOpen className="w-4 h-4 mr-1" />
              Guitar Basics
            </div>
            <span>March 20, 2024</span>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <img 
              src="/x-blank-tab.png" 
              alt="Guitar tablature notation showing fret numbers on six lines" 
              className="w-full h-64 object-contain rounded-lg mb-8"
            />
            
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-600 mb-8">
                Guitar tablature (or "tab") is a simple way to read music specifically written for guitar. Unlike traditional sheet music, tab shows you exactly where to place your fingers on the fretboard.
              </p>

              <h2 className="text-2xl font-bold text-gray-800 mb-4">Level 1: Basic Tab Reading</h2>
              <p className="mb-4">
                Tab consists of six horizontal lines representing the six strings of your guitar. The bottom line represents the low E string (6th string), and the top line represents the high E string (1st string). Numbers on the lines tell you which fret to press.
              </p>
              <ul className="mb-6">
                <li>0 = Open string (no fret pressed)</li>
                <li>1 = 1st fret</li>
                <li>2 = 2nd fret</li>
                <li>And so on...</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-800 mb-4">Level 2: Reading Chords in Tab</h2>
              <p className="mb-4">
                When numbers are stacked vertically, they represent a chord - play all the notes simultaneously. For example, a C major chord might look like numbers stacked on different strings at the same position in the tab.
              </p>

              <h2 className="text-2xl font-bold text-gray-800 mb-4">Level 3: Special Symbols</h2>
              <p className="mb-4">
                Tab uses various symbols to indicate different playing techniques:
              </p>
              <ul className="mb-6">
                <li><strong>h</strong> = Hammer-on</li>
                <li><strong>p</strong> = Pull-off</li>
                <li><strong>b</strong> = Bend</li>
                <li><strong>r</strong> = Release bend</li>
                <li><strong>/</strong> = Slide up</li>
                <li><strong>\</strong> = Slide down</li>
                <li><strong>~</strong> = Vibrato</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-800 mb-4">Level 4: Advanced Techniques</h2>
              <p className="mb-4">
                More advanced tab notation includes:
              </p>
              <ul className="mb-6">
                <li><strong>x</strong> = Muted string</li>
                <li><strong>PM</strong> = Palm muting</li>
                <li><strong>NH</strong> = Natural harmonic</li>
                <li><strong>AH</strong> = Artificial harmonic</li>
                <li><strong>T</strong> = Tapping</li>
              </ul>

              <div className="bg-amber-50 border-l-4 border-amber-400 p-6 my-8">
                <h3 className="text-lg font-semibold text-amber-800 mb-2">Pro Tip</h3>
                <p className="text-amber-700">
                  Learning common chord shapes will dramatically improve your tab reading efficiency. When you recognize that a series of fret numbers forms a familiar chord shape, you'll intuitively know which fingers to use and can play the passage much more smoothly. This makes learning tabs faster and helps you understand the musical structure behind the numbers.
                </p>
              </div>

              <p className="text-lg">
                Remember, tab is a tool to help you learn songs faster, but don't rely on it exclusively. Developing your ear and learning to read standard notation will make you a more complete musician.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 