'use client';

import Link from 'next/link';
import { ExternalLink, BookOpen, Music, Timer, BarChart3, Target } from 'lucide-react';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Interactive Guitar Tools | Mike Nelson Guitar',
  description: 'Free interactive guitar tools including Scale Explorer, Rhythm Tool, and chord libraries. Learn guitar theory with visual fretboard diagrams and audio playback.',
  keywords: 'interactive guitar tools, scale explorer, rhythm tool, chord library, guitar learning tools, fretboard diagrams, guitar theory tools',
  openGraph: {
    title: 'Interactive Guitar Tools | Mike Nelson Guitar',
    description: 'Free interactive guitar tools including Scale Explorer, Rhythm Tool, and chord libraries. Learn guitar theory with visual fretboard diagrams.',
    type: 'website',
    images: [
      {
        url: '/Mike Photo.jpg',
        width: 1200,
        height: 630,
        alt: 'Interactive Guitar Tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Interactive Guitar Tools | Mike Nelson Guitar',
    description: 'Free interactive guitar tools including Scale Explorer, Rhythm Tool, and chord libraries. Learn guitar theory with visual fretboard diagrams.',
    images: ['/Mike Photo.jpg'],
  },
};

export default function Tools() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 120; // Offset to account for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-800 via-amber-700 to-amber-600 text-white section-padding">
        <div className="container-max text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-playfair mb-4">
            Guitar Tools
          </h1>
          <p className="text-xl text-amber-100 max-w-3xl mx-auto mb-8">
            Interactive tools to accelerate your guitar learning and practice
          </p>
          
          {/* Navigation Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <button
              onClick={() => scrollToSection('scale-explorer')}
              className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/30 transition-colors flex items-center gap-2"
            >
              <Music className="h-5 w-5" />
              Scale Explorer
            </button>
            <button
              onClick={() => scrollToSection('practicetrack')}
              className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/30 transition-colors flex items-center gap-2"
            >
              <Timer className="h-5 w-5" />
              PracticeTrack
            </button>
            <button
              onClick={() => scrollToSection('rhythm-tool')}
              className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/30 transition-colors flex items-center gap-2"
            >
              <BarChart3 className="h-5 w-5" />
              Rhythm Tool
            </button>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="max-w-6xl mx-auto space-y-12">

            {/* Scale Explorer */}
            <div id="scale-explorer" className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl p-8 shadow-lg">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-600 text-white rounded-full mb-4">
                    <Music className="h-8 w-8" />
                  </div>
                  <h2 className="text-3xl font-bold text-amber-800 mb-4">Scale Explorer</h2>
                  <div className="inline-block bg-green-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
                    FREE
                  </div>
                  <p className="text-lg text-amber-700 max-w-2xl mx-auto">
                    Interactive guitar fretboard tool to visualize scales, modes, and chord relationships. 
                    Perfect for understanding music theory and fretboard navigation.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 text-center">
                    <div className="text-3xl mb-3">🎯</div>
                    <h3 className="font-bold text-amber-800 mb-2">Comprehensive Scale Coverage</h3>
                    <p className="text-sm text-amber-700">Major, minor, pentatonic, blues, modes and more - all scales in one tool</p>
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 text-center">
                    <div className="text-3xl mb-3">🔗</div>
                    <h3 className="font-bold text-amber-800 mb-2">See Connections</h3>
                    <p className="text-sm text-amber-700">Understand how scales relate to chords and modes, not just memorize shapes</p>
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 text-center">
                    <div className="text-3xl mb-3">🌈</div>
                    <h3 className="font-bold text-amber-800 mb-2">Color-Coded Intervals</h3>
                    <p className="text-sm text-amber-700">See scale degrees and intervals with consistent color coding across all scales</p>
                  </div>
                </div>

                <div className="text-center mb-6">
                  <Link 
                    href="/blog/scale-explorer-tool"
                    className="text-amber-600 hover:text-amber-800 font-medium underline"
                  >
                    Learn more about Scale Explorer →
                  </Link>
                </div>

                <div className="text-center">
                  <a
                    href="/scale-explorer/index.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-amber-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors"
                  >
                    <Music className="h-5 w-5 mr-2" />
                    Launch Scale Explorer
                  </a>
                </div>
              </div>
            </div>

            {/* PracticeTrack */}
            <div id="practicetrack" className="bg-gradient-to-br from-orange-100 to-red-100 rounded-xl p-8 shadow-lg">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-600 text-white rounded-full mb-4">
                    <Timer className="h-8 w-8" />
                  </div>
                  <h2 className="text-3xl font-bold text-orange-800 mb-2">
                    Practice<span className="text-red-600">Track</span>
                  </h2>
                  <div className="inline-block bg-amber-800 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
                    FREE
                  </div>
                  <p className="text-lg text-orange-700 max-w-2xl mx-auto">
                    Comprehensive practice management app to organize, track, and optimize your guitar practice sessions. 
                    Perfect for musicians of all levels.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 text-center">
                    <div className="text-3xl mb-3">⏱️</div>
                    <h3 className="font-bold text-orange-800 mb-2">Practice Timer</h3>
                    <p className="text-sm text-orange-700">Track practice time with built-in timers and session management</p>
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 text-center">
                    <div className="text-3xl mb-3">🎯</div>
                    <h3 className="font-bold text-orange-800 mb-2">Goal Setting</h3>
                    <p className="text-sm text-orange-700">Set and achieve practice goals with progress tracking</p>
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 text-center">
                    <div className="text-3xl mb-3">📊</div>
                    <h3 className="font-bold text-orange-800 mb-2">Progress Analytics</h3>
                    <p className="text-sm text-orange-700">Visualize improvement with detailed practice statistics</p>
                  </div>
                </div>

                <div className="text-center">
                  <a
                    href="https://practicetrackapp.com/landing.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
                  >
                    <ExternalLink className="h-5 w-5 mr-2" />
                    Visit PracticeTrack
                  </a>
                </div>
              </div>
            </div>

            {/* Rhythm Tool - Now Active */}
            <div id="rhythm-tool" className="bg-gradient-to-br from-amber-100 to-brown-100 rounded-xl p-8 shadow-lg">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-600 text-white rounded-full mb-4">
                    <BarChart3 className="h-8 w-8" />
                  </div>
                  <h2 className="text-3xl font-bold text-amber-800 mb-2">Rhythm Education Tool</h2>
                  <div className="inline-block bg-green-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
                    FREE
                  </div>
                  <p className="text-lg text-amber-700 max-w-2xl mx-auto">
                    Learn rhythm fundamentals through interactive examples. Understand time signatures, note values, and rhythm patterns with audio playback.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 text-center">
                    <div className="text-3xl mb-3">🎼</div>
                    <h3 className="font-bold text-amber-800 mb-2">Musical Notation</h3>
                    <p className="text-sm text-amber-700">Visual rhythm notation and time signatures for learning standard music reading</p>
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 text-center">
                    <div className="text-3xl mb-3">🎵</div>
                    <h3 className="font-bold text-amber-800 mb-2">Audio Playback</h3>
                    <p className="text-sm text-amber-700">Hear rhythm patterns with adjustable tempo and looping</p>
                  </div>
                  <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 text-center">
                    <div className="text-3xl mb-3">📚</div>
                    <h3 className="font-bold text-amber-800 mb-2">Educational Guide</h3>
                    <p className="text-sm text-amber-700">Guide covering time signatures, note types, rests, and rhythm patterns</p>
                  </div>
                </div>

                <div className="text-center">
                  <Link
                    href="/rhythm-tool"
                    className="inline-flex items-center bg-amber-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors"
                  >
                    <BarChart3 className="h-5 w-5 mr-2" />
                    Launch Rhythm Tool
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding bg-amber-50">
        <div className="container-max">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-amber-800 mb-4">
              Ready to Accelerate Your Learning?
            </h2>
            <p className="text-lg text-amber-700 mb-8">
              Combine these tools with personalized guitar lessons for maximum progress.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/lessons"
                className="bg-amber-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors"
              >
                Book a Lesson
              </Link>
              <Link
                href="/blog"
                className="bg-white text-amber-600 px-8 py-3 rounded-lg font-semibold border-2 border-amber-600 hover:bg-amber-50 transition-colors"
              >
                Read Our Blog
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
} 
 