import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import ChromaticScale from '@/components/ChromaticScale';
import FretDisplay from '@/components/FretDisplay';
import QuickReferenceChromaticScale from '@/components/QuickReferenceChromaticScale';

export const metadata: Metadata = {
  title: "What is a Chord? Structure, Intervals, and Types",
  description: "Learn what guitar chords are, how they're built from intervals, and how major, minor and seventh chords work. Understand open vs moveable shapes with clear, beginner-friendly examples.",
  openGraph: {
    title: "What is a Chord? Structure, Intervals, and Types",
    description: "Learn what guitar chords are, how they're built from intervals, and how major, minor and seventh chords work. Understand open vs moveable shapes with clear, beginner-friendly examples.",
    type: 'article',
    images: [{
        url: 'https://mikenelsonguitarlessons.co.nz/mike-nelson-guitar-logo.jpg',
        width: 1200,
        height: 630,
        alt: 'Chord Puzzle Thumbnail'
      }]
  },
  // Add twitter card as well
  twitter: {
    card: 'summary_large_image',
    title: "What is a Chord? Structure, Intervals, and Types",
    description: "Learn what guitar chords are, how they're built from intervals, and how major, minor and seventh chords work. Understand open vs moveable shapes with clear, beginner-friendly examples.",
    images: ['https://mikenelsonguitarlessons.co.nz/mike-nelson-guitar-logo.jpg']
  },
  alternates: {
    canonical: 'https://mikenelsonguitarlessons.co.nz/blog/what-is-a-chord',
  }
};

export default function WhatIsChord() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm">
        <Link href="/" className="text-blue-600 hover:underline">Home</Link>
        <span className="mx-2 text-gray-500">›</span>
        <Link href="/blog" className="text-blue-600 hover:underline">Blog</Link>
        <span className="mx-2 text-gray-500">›</span>
        <span className="text-gray-700">What is a Chord?</span>
      </nav>

      <article className="prose prose-lg max-w-none">
        {/* Section Menu */}
        <nav className="mb-8 flex flex-wrap gap-2">
          <a href="#what-is-a-chord" className="px-3 py-1 rounded bg-amber-100 text-amber-800 font-semibold hover:bg-amber-200 transition">What is a Chord?</a>
          <a href="#structure-of-chords" className="px-3 py-1 rounded bg-amber-100 text-amber-800 font-semibold hover:bg-amber-200 transition">Structure of Chords</a>
          <a href="#chord-formulas" className="px-3 py-1 rounded bg-amber-100 text-amber-800 font-semibold hover:bg-amber-200 transition">Chord Formulas</a>
          <a href="#common-chord-types" className="px-3 py-1 rounded bg-amber-100 text-amber-800 font-semibold hover:bg-amber-200 transition">Common Chord Types</a>
          <a href="#types-by-technique" className="px-3 py-1 rounded bg-amber-100 text-amber-800 font-semibold hover:bg-amber-200 transition">Chord Shapes: Open and Moveable</a>
          <a href="#building-understanding" className="px-3 py-1 rounded bg-amber-100 text-amber-800 font-semibold hover:bg-amber-200 transition">Building Understanding</a>
          <a href="#open-chord-library" className="px-3 py-1 rounded bg-amber-100 text-amber-800 font-semibold hover:bg-amber-200 transition">Open Chord Library</a>
          <a href="#what-is-a-key" className="px-3 py-1 rounded bg-amber-100 text-amber-800 font-semibold hover:bg-amber-200 transition">What is a Key?</a>
        </nav>

        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4 text-amber-800">
            What is a Chord? Structure, Intervals, and Types
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Learn the fundamental structure of guitar chords and why they work the way they do
          </p>
        </header>

        {/* Section 1: What Is A Chord? */}
        <section id="what-is-a-chord" className="mb-12 scroll-mt-24">
          <h2 className="text-3xl font-bold mb-6 text-amber-600">What is a Chord?</h2>
          
          <p className="text-lg mb-6">
            <strong>A chord is three or more different musical notes played simultaneously.</strong> When you strum multiple strings on your guitar together, you're creating a chord.
          </p>

          <p className="mb-6">
            But here's the key insight: chords aren't random combinations of notes. They follow specific <strong>mathematical relationships</strong> called intervals that create harmony. (If you're not familiar with musical notes, check out my <a href="/blog/beginners-guide-notes-guitar" className="text-amber-600 hover:text-amber-800 underline">Beginner's Guide to Notes on the Guitar</a>.)
          </p>
        </section>

        {/* Section 2: The Structure of Chords */}
        <section id="structure-of-chords" className="mb-12 scroll-mt-24">
          <h2 className="text-3xl font-bold mb-6 text-amber-600">The Structure of Chords: It's All About Intervals</h2>

          <h3 className="text-xl font-semibold mb-4 text-amber-800">Understanding Intervals</h3>
          <p className="mb-6">
            An <strong>interval</strong> is the distance between two notes, measured in semitones. <strong>On guitar, one semitone equals one fret</strong> - so when we say "4 semitones," that's the same as "4 frets" on your guitar neck.
          </p>

          {/* Chromatic Scale Reference */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold mb-4 text-amber-800">Chromatic Scale Reference</h4>
            <p className="mb-4 text-sm text-gray-600">
              Below is a visual reference of the chromatic scale (one octave plus the next A). Use the fretboard diagram below to see how these notes appear on each guitar string.
            </p>
            <ChromaticScale />
          </div>

          {/* Fret Display */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold mb-4 text-amber-800">Guitar String Fretboard</h4>
            <p className="mb-4 text-sm text-gray-600">
              Click on a string button to see the notes on the first 12 frets of that string.
            </p>
            <FretDisplay />
          </div>

          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6">
            <p className="font-semibold mb-2 text-amber-800">Important Note:</p>
            <p className="text-amber-700">
              It's important to note that chords must be played with one note per string. While this may seem obvious, it's a key concept for beginners to understand. On guitar, chord notes are spread across multiple strings rather than being played in sequence on one string.
            </p>
            <p className="text-amber-700 mt-2">
              <strong>Octaves:</strong> Guitar chords often use the same notes in different octaves (higher or lower versions of the same note). For example, a C major chord might include a low C on the 5th string and a high C on the 2nd string - both are still "C" notes, just in different octaves. The 4-semitone relationship between C and E exists regardless of which octave each note is played in.
            </p>
          </div>

          <h3 className="text-xl font-semibold mb-4">Example: C Major Chord</h3>
          <ul className="list-disc list-inside mb-6 space-y-2">
            <li><strong>C</strong> (root note)</li>
            <li><strong>E</strong> (4 semitones above C)</li>
            <li><strong>G</strong> (3 semitones above E, 7 semitones above C)</li>
          </ul>

          <p className="mb-6">
            The distances between these notes (4 semitones, then 3 semitones) create the specific sound we recognize as a "major" chord.
          </p>
        </section>

        {/* Section 3: Chord Formulas */}
        <section id="chord-formulas" className="mb-12 scroll-mt-24">
          <h2 className="text-3xl font-bold mb-6 text-amber-600">Chord Formulas: The Universal Pattern</h2>

          <p className="text-lg mb-6">
            Here's where it gets interesting: <strong>all chords of the same type use identical interval patterns</strong>, regardless of which note you start on.
          </p>

          <h3 className="text-xl font-semibold mb-4">Major Chord Formula</h3>
          <div className="bg-amber-100 border-l-4 border-amber-500 p-4 rounded mb-6">
            <p className="font-semibold mb-2">Root + 4 semitones + 3 semitones</p>
          </div>

          <div className="mb-8">
            <h4 className="font-semibold mb-4">Examples:</h4>

            <div className="space-y-6">
              {/* C Major Table */}
              <div>
                <h5 className="font-medium mb-2">C Major Chord:</h5>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-300 px-3 py-2 text-sm">Note</th>
                        <th className="border border-gray-300 px-3 py-2 text-sm">C</th>
                        <th className="border border-gray-300 px-3 py-2 text-sm">C#</th>
                        <th className="border border-gray-300 px-3 py-2 text-sm">D</th>
                        <th className="border border-gray-300 px-3 py-2 text-sm">D#</th>
                        <th className="border border-gray-300 px-3 py-2 text-sm font-bold bg-amber-200">E</th>
                        <th className="border border-gray-300 px-3 py-2 text-sm">F</th>
                        <th className="border border-gray-300 px-3 py-2 text-sm">F#</th>
                        <th className="border border-gray-300 px-3 py-2 text-sm font-bold bg-amber-200">G</th>
                        <th className="border border-gray-300 px-3 py-2 text-sm">G#</th>
                        <th className="border border-gray-300 px-3 py-2 text-sm">A</th>
                        <th className="border border-gray-300 px-3 py-2 text-sm">A#</th>
                        <th className="border border-gray-300 px-3 py-2 text-sm">B</th>
                        <th className="border border-gray-300 px-3 py-2 text-sm">C</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-3 py-2 text-sm font-medium">Semitones from C</td>
                        <td className="border border-gray-300 px-3 py-2 text-sm text-center">0</td>
                        <td className="border border-gray-300 px-3 py-2 text-sm text-center">1</td>
                        <td className="border border-gray-300 px-3 py-2 text-sm text-center">2</td>
                        <td className="border border-gray-300 px-3 py-2 text-sm text-center">3</td>
                        <td className="border border-gray-300 px-3 py-2 text-sm text-center font-bold bg-amber-200">4</td>
                        <td className="border border-gray-300 px-3 py-2 text-sm text-center">5</td>
                        <td className="border border-gray-300 px-3 py-2 text-sm text-center">6</td>
                        <td className="border border-gray-300 px-3 py-2 text-sm text-center font-bold bg-amber-200">7</td>
                        <td className="border border-gray-300 px-3 py-2 text-sm text-center">8</td>
                        <td className="border border-gray-300 px-3 py-2 text-sm text-center">9</td>
                        <td className="border border-gray-300 px-3 py-2 text-sm text-center">10</td>
                        <td className="border border-gray-300 px-3 py-2 text-sm text-center">11</td>
                        <td className="border border-gray-300 px-3 py-2 text-sm text-center">12</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-gray-600 mt-2">Root: <strong>C</strong> (0), Major 3rd: <strong>E</strong> (4 semitones), Perfect 5th: <strong>G</strong> (7 semitones)</p>
              </div>

              {/* G Major Table */}
              <div>
                <h5 className="font-medium mb-2">G Major Chord:</h5>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-300 px-3 py-2 text-sm">Note</th>
                        <th className="border border-gray-300 px-3 py-2 text-sm">G</th>
                        <th className="border border-gray-300 px-3 py-2 text-sm">G#</th>
                        <th className="border border-gray-300 px-3 py-2 text-sm">A</th>
                        <th className="border border-gray-300 px-3 py-2 text-sm">A#</th>
                        <th className="border border-gray-300 px-3 py-2 text-sm font-bold bg-amber-200">B</th>
                        <th className="border border-gray-300 px-3 py-2 text-sm">C</th>
                        <th className="border border-gray-300 px-3 py-2 text-sm">C#</th>
                        <th className="border border-gray-300 px-3 py-2 text-sm font-bold bg-amber-200">D</th>
                        <th className="border border-gray-300 px-3 py-2 text-sm">D#</th>
                        <th className="border border-gray-300 px-3 py-2 text-sm">E</th>
                        <th className="border border-gray-300 px-3 py-2 text-sm">F</th>
                        <th className="border border-gray-300 px-3 py-2 text-sm">F#</th>
                        <th className="border border-gray-300 px-3 py-2 text-sm">G</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-3 py-2 text-sm font-medium">Semitones from G</td>
                        <td className="border border-gray-300 px-3 py-2 text-sm text-center">0</td>
                        <td className="border border-gray-300 px-3 py-2 text-sm text-center">1</td>
                        <td className="border border-gray-300 px-3 py-2 text-sm text-center">2</td>
                        <td className="border border-gray-300 px-3 py-2 text-sm text-center">3</td>
                        <td className="border border-gray-300 px-3 py-2 text-sm text-center font-bold bg-amber-200">4</td>
                        <td className="border border-gray-300 px-3 py-2 text-sm text-center">5</td>
                        <td className="border border-gray-300 px-3 py-2 text-sm text-center">6</td>
                        <td className="border border-gray-300 px-3 py-2 text-sm text-center font-bold bg-amber-200">7</td>
                        <td className="border border-gray-300 px-3 py-2 text-sm text-center">8</td>
                        <td className="border border-gray-300 px-3 py-2 text-sm text-center">9</td>
                        <td className="border border-gray-300 px-3 py-2 text-sm text-center">10</td>
                        <td className="border border-gray-300 px-3 py-2 text-sm text-center">11</td>
                        <td className="border border-gray-300 px-3 py-2 text-sm text-center">12</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-gray-600 mt-2">Root: <strong>G</strong> (0), Major 3rd: <strong>B</strong> (4 semitones), Perfect 5th: <strong>D</strong> (7 semitones)</p>
              </div>

              {/* A Major Table */}
              <div>
                <h5 className="font-medium mb-2">A Major Chord:</h5>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-300 px-3 py-2 text-sm">Note</th>
                        <th className="border border-gray-300 px-3 py-2 text-sm">A</th>
                        <th className="border border-gray-300 px-3 py-2 text-sm">A#</th>
                        <th className="border border-gray-300 px-3 py-2 text-sm">B</th>
                        <th className="border border-gray-300 px-3 py-2 text-sm">C</th>
                        <th className="border border-gray-300 px-3 py-2 text-sm font-bold bg-amber-200">C#</th>
                        <th className="border border-gray-300 px-3 py-2 text-sm">D</th>
                        <th className="border border-gray-300 px-3 py-2 text-sm">D#</th>
                        <th className="border border-gray-300 px-3 py-2 text-sm font-bold bg-amber-200">E</th>
                        <th className="border border-gray-300 px-3 py-2 text-sm">F</th>
                        <th className="border border-gray-300 px-3 py-2 text-sm">F#</th>
                        <th className="border border-gray-300 px-3 py-2 text-sm">G</th>
                        <th className="border border-gray-300 px-3 py-2 text-sm">G#</th>
                        <th className="border border-gray-300 px-3 py-2 text-sm">A</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-3 py-2 text-sm font-medium">Semitones from A</td>
                        <td className="border border-gray-300 px-3 py-2 text-sm text-center">0</td>
                        <td className="border border-gray-300 px-3 py-2 text-sm text-center">1</td>
                        <td className="border border-gray-300 px-3 py-2 text-sm text-center">2</td>
                        <td className="border border-gray-300 px-3 py-2 text-sm text-center">3</td>
                        <td className="border border-gray-300 px-3 py-2 text-sm text-center font-bold bg-amber-200">4</td>
                        <td className="border border-gray-300 px-3 py-2 text-sm text-center">5</td>
                        <td className="border border-gray-300 px-3 py-2 text-sm text-center">6</td>
                        <td className="border border-gray-300 px-3 py-2 text-sm text-center font-bold bg-amber-200">7</td>
                        <td className="border border-gray-300 px-3 py-2 text-sm text-center">8</td>
                        <td className="border border-gray-300 px-3 py-2 text-sm text-center">9</td>
                        <td className="border border-gray-300 px-3 py-2 text-sm text-center">10</td>
                        <td className="border border-gray-300 px-3 py-2 text-sm text-center">11</td>
                        <td className="border border-gray-300 px-3 py-2 text-sm text-center">12</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-gray-600 mt-2">Root: <strong>A</strong> (0), Major 3rd: <strong>C#</strong> (4 semitones), Perfect 5th: <strong>E</strong> (7 semitones)</p>
              </div>
            </div>

            <p className="mt-6">
              Every major chord follows this exact same pattern - only the starting note changes.
            </p>
          </div>

          <h3 className="text-xl font-semibold mb-4">Minor Chord Formula</h3>
          <div className="bg-red-50 p-4 rounded-lg mb-6">
            <p className="font-semibold mb-2">Root + 3 semitones + 4 semitones</p>
          </div>

          <div className="mb-8">
            <h4 className="font-semibold mb-4">C Major vs C Minor Comparison:</h4>

            <div className="space-y-6">
              {/* C Major Table */}
              <div>
                <h5 className="font-medium mb-2">C Major Chord:</h5>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-300 px-3 py-2 text-sm">Note</th>
                        <th className="border border-gray-300 px-3 py-2 text-sm">C</th>
                        <th className="border border-gray-300 px-3 py-2 text-sm">C#</th>
                        <th className="border border-gray-300 px-3 py-2 text-sm">D</th>
                        <th className="border border-gray-300 px-3 py-2 text-sm">D#</th>
                        <th className="border border-gray-300 px-3 py-2 text-sm font-bold bg-amber-200">E</th>
                        <th className="border border-gray-300 px-3 py-2 text-sm">F</th>
                        <th className="border border-gray-300 px-3 py-2 text-sm">F#</th>
                        <th className="border border-gray-300 px-3 py-2 text-sm font-bold bg-amber-200">G</th>
                        <th className="border border-gray-300 px-3 py-2 text-sm">G#</th>
                        <th className="border border-gray-300 px-3 py-2 text-sm">A</th>
                        <th className="border border-gray-300 px-3 py-2 text-sm">A#</th>
                        <th className="border border-gray-300 px-3 py-2 text-sm">B</th>
                        <th className="border border-gray-300 px-3 py-2 text-sm">C</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-3 py-2 text-sm font-medium">Semitones from C</td>
                        <td className="border border-gray-300 px-3 py-2 text-sm text-center">0</td>
                        <td className="border border-gray-300 px-3 py-2 text-sm text-center">1</td>
                        <td className="border border-gray-300 px-3 py-2 text-sm text-center">2</td>
                        <td className="border border-gray-300 px-3 py-2 text-sm text-center">3</td>
                        <td className="border border-gray-300 px-3 py-2 text-sm text-center font-bold bg-amber-200">4</td>
                        <td className="border border-gray-300 px-3 py-2 text-sm text-center">5</td>
                        <td className="border border-gray-300 px-3 py-2 text-sm text-center">6</td>
                        <td className="border border-gray-300 px-3 py-2 text-sm text-center font-bold bg-amber-200">7</td>
                        <td className="border border-gray-300 px-3 py-2 text-sm text-center">8</td>
                        <td className="border border-gray-300 px-3 py-2 text-sm text-center">9</td>
                        <td className="border border-gray-300 px-3 py-2 text-sm text-center">10</td>
                        <td className="border border-gray-300 px-3 py-2 text-sm text-center">11</td>
                        <td className="border border-gray-300 px-3 py-2 text-sm text-center">12</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-gray-600 mt-2">Root: <strong>C</strong> (0), Major 3rd: <strong>E</strong> (4 semitones), Perfect 5th: <strong>G</strong> (7 semitones)</p>
              </div>

              {/* C Minor Table */}
              <div>
                <h5 className="font-medium mb-2">C Minor Chord:</h5>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-300 px-3 py-2 text-sm">Note</th>
                        <th className="border border-gray-300 px-3 py-2 text-sm">C</th>
                        <th className="border border-gray-300 px-3 py-2 text-sm">C#</th>
                        <th className="border border-gray-300 px-3 py-2 text-sm">D</th>
                        <th className="border border-gray-300 px-3 py-2 text-sm font-bold bg-red-100">Eb</th>
                        <th className="border border-gray-300 px-3 py-2 text-sm">E</th>
                        <th className="border border-gray-300 px-3 py-2 text-sm">F</th>
                        <th className="border border-gray-300 px-3 py-2 text-sm">F#</th>
                        <th className="border border-gray-300 px-3 py-2 text-sm font-bold bg-red-100">G</th>
                        <th className="border border-gray-300 px-3 py-2 text-sm">G#</th>
                        <th className="border border-gray-300 px-3 py-2 text-sm">A</th>
                        <th className="border border-gray-300 px-3 py-2 text-sm">A#</th>
                        <th className="border border-gray-300 px-3 py-2 text-sm">B</th>
                        <th className="border border-gray-300 px-3 py-2 text-sm">C</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-3 py-2 text-sm font-medium">Semitones from C</td>
                        <td className="border border-gray-300 px-3 py-2 text-sm text-center">0</td>
                        <td className="border border-gray-300 px-3 py-2 text-sm text-center">1</td>
                        <td className="border border-gray-300 px-3 py-2 text-sm text-center">2</td>
                        <td className="border border-gray-300 px-3 py-2 text-sm text-center font-bold bg-red-100">3</td>
                        <td className="border border-gray-300 px-3 py-2 text-sm text-center">4</td>
                        <td className="border border-gray-300 px-3 py-2 text-sm text-center">5</td>
                        <td className="border border-gray-300 px-3 py-2 text-sm text-center">6</td>
                        <td className="border border-gray-300 px-3 py-2 text-sm text-center font-bold bg-red-100">7</td>
                        <td className="border border-gray-300 px-3 py-2 text-sm text-center">8</td>
                        <td className="border border-gray-300 px-3 py-2 text-sm text-center">9</td>
                        <td className="border border-gray-300 px-3 py-2 text-sm text-center">10</td>
                        <td className="border border-gray-300 px-3 py-2 text-sm text-center">11</td>
                        <td className="border border-gray-300 px-3 py-2 text-sm text-center">12</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-gray-600 mt-2">Root: <strong>C</strong> (0), Minor 3rd: <strong>Eb</strong> (3 semitones), Perfect 5th: <strong>G</strong> (7 semitones)</p>
              </div>
            </div>

            <p className="mt-6">
              Notice how minor chords flip the interval pattern compared to major chords (3+4 instead of 4+3).
            </p>
          </div>
        </section>

        {/* Section 4: Easy Way to Figure Out Notes */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-amber-600">Easy Way to Figure Out Notes in Any Chord</h2>

          <div className="space-y-6">
            {/* Step 1 */}
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
              <h3 className="text-lg font-semibold mb-3 text-amber-800">Step 1: Know the Chord Formula</h3>
              <p>
                For major chords, the formula is <strong>1 - 3 - 5</strong>. This means you need the 1st, 3rd, and 5th notes counting from your starting note.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
              <h3 className="text-lg font-semibold mb-3 text-amber-800">Step 2: Find the Root Note</h3>
              <p>The chord name tells you the starting note. For example:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li><strong>C major</strong> (or just "C") starts on the note C</li>
                <li><strong>G major</strong> (or just "G") starts on the note G</li>
                <li><strong>Convention</strong>: Major chords are written as just the letter (C, G, A) without the word "major"</li>
              </ul>
            </div>

            {/* Step 3 */}
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
              <h3 className="text-lg font-semibold mb-3 text-amber-800">Step 3: Count Using the Musical Alphabet</h3>
              <p className="mb-3">Label your starting note as "1" and count up using letters.</p>
              
              <div className="bg-white p-4 rounded border border-amber-200">
                <h4 className="font-semibold mb-2 text-amber-800">Example: C Major Chord</h4>
                <ul className="space-y-1">
                  <li><strong>(1)</strong> C</li>
                  <li><strong>(2)</strong> D</li>
                  <li><strong>(3)</strong> E ← This is your 3rd</li>
                  <li><strong>(4)</strong> F</li>
                  <li><strong>(5)</strong> G ← This is your 5th</li>
                </ul>
                <p className="mt-2 font-semibold text-amber-700">Result: C major chord = <strong>C, E, G</strong></p>
              </div>

              <div className="bg-white p-4 rounded border border-amber-200 mt-4">
                <h4 className="font-semibold mb-2 text-amber-800">Example: G Major Chord</h4>
                <ul className="space-y-1">
                  <li><strong>(1)</strong> G</li>
                  <li><strong>(2)</strong> A</li>
                  <li><strong>(3)</strong> B ← This is your 3rd</li>
                  <li><strong>(4)</strong> C</li>
                  <li><strong>(5)</strong> D ← This is your 5th</li>
                </ul>
                <p className="mt-2 font-semibold text-amber-700">Result: G major chord = <strong>G, B, D</strong></p>
              </div>

              <div className="bg-amber-100 border-l-4 border-amber-500 p-4 mt-4 rounded">
                <p className="text-sm text-amber-800"><strong>Important</strong>: The musical alphabet goes A-B-C-D-E-F-G, then repeats. If you count past G, continue with A, B, C, etc.</p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
              <h3 className="text-lg font-semibold mb-3 text-amber-800">When You Need Sharps or Flats</h3>
              <p className="mb-3">Sometimes counting by letters isn't enough, and you need to account for <strong>correct spelling</strong> of notes.</p>
              
              <div className="bg-white p-4 rounded border border-amber-200 mb-4">
                <h4 className="font-semibold mb-2 text-amber-800">Example: C Minor Chord</h4>
                <p className="mb-2">Using the 1-3-5 formula:</p>
                <ul className="space-y-1">
                  <li><strong>(1)</strong> C</li>
                  <li><strong>(2)</strong> D</li>
                  <li><strong>(3)</strong> E ← But minor chords use a "flattened 3rd"</li>
                </ul>
                <p className="mt-2">Since we counted to <strong>E</strong> for the 3rd, a flattened 3rd becomes <strong>Eb</strong> (not D#, even though they're the same pitch). We use <strong>Eb</strong> because it maintains the correct alphabetical spelling - we need some version of "E" for the 3rd note.</p>
              </div>

              <div className="bg-white p-4 rounded border border-amber-200">
                <h4 className="font-semibold mb-2 text-amber-800">Example: D Major</h4>
                <p className="mb-2">The chord <strong>D major</strong> needs the notes <strong>D, F#, A</strong> (not D, F, A - that would be D minor).</p>
                <p className="mb-2"><strong>Why F# instead of Gb?</strong> Count 4 semitones from D on the chromatic scale:</p>
                <p className="text-sm">D → D# → E → F → <strong>F#</strong> (4 semitones)</p>
                <p className="mt-2">We use <strong>F#</strong> (not Gb) because when counting 1-2-3 from D, we get D-E-F. The 3rd should be some version of "F," so we use F#.</p>
              </div>

              <div className="bg-amber-100 border-l-4 border-amber-500 p-4 mt-4 rounded">
                <p className="text-sm font-semibold text-amber-800 mb-2">Musical Spelling Rule:</p>
                <p className="text-sm text-amber-800">Use the letter name that corresponds to the chord formula position, then add sharps or flats as needed.</p>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-4 mt-8 text-amber-800">Quick Reference: Which Notes Have Sharps/Flats Between Them?</h3>
          <QuickReferenceChromaticScale />

          <div className="bg-amber-50 p-6 rounded-lg">
            <h4 className="font-semibold mb-3 text-amber-800">Remember these two pairs: B-C and E-F</h4>
            <ul className="list-disc list-inside mb-4 space-y-1">
              <li><strong>B and C</strong> are next to each other (no sharp/flat between)</li>
              <li><strong>E and F</strong> are next to each other (no sharp/flat between)</li>
              <li><strong>All other letter pairs</strong> have a sharp/flat between them</li>
            </ul>

            <h4 className="font-semibold mb-3 text-amber-800">Sharp vs Flat Naming:</h4>
            <p className="mb-2">The same pitch can have two names depending on context:</p>
            <ul className="list-disc list-inside mb-4 space-y-1">
              <li><strong>Sharp (#)</strong> uses the letter name <strong>before</strong> it: <strong>C#</strong> comes after C</li>
              <li><strong>Flat (b)</strong> uses the letter name <strong>above</strong> it: <strong>Db</strong> comes before D</li>
            </ul>

            <h4 className="font-semibold mb-2 text-amber-800">Examples:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>The note between C and D can be called <strong>C#</strong> (C-sharp) or <strong>Db</strong> (D-flat)</li>
              <li>The note between F and G can be called <strong>F#</strong> (F-sharp) or <strong>Gb</strong> (G-flat)</li>
              <li>The note between G and A can be called <strong>G#</strong> (G-sharp) or <strong>Ab</strong> (A-flat)</li>
            </ul>

            <p className="mt-4 text-sm text-amber-800"><strong>Which name to use?</strong> Follow the alphabetical spelling rule from the chord formula - use whichever version maintains the correct letter sequence for your chord.</p>
          </div>
        </section>

        {/* Section 5: Common Chord Types */}
        <section id="common-chord-types" className="mb-12 scroll-mt-24">
          <h2 className="text-3xl font-bold mb-6 text-amber-600">Common Chord Types and Their Formulas</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-amber-50 p-6 rounded-lg border-l-4 border-amber-500">
              <h3 className="text-xl font-semibold mb-3 text-amber-800">Major Chords</h3>
              <ul className="space-y-2">
                <li><strong>Formula:</strong> Root + 4 + 3 semitones</li>
                <li><strong>Sound:</strong> Bright, happy, stable</li>
                <li><strong>Examples:</strong> C, G, D, A, E, F</li>
              </ul>
            </div>

            <div className="bg-amber-50 p-6 rounded-lg border-l-4 border-amber-500">
              <h3 className="text-xl font-semibold mb-3 text-amber-800">Minor Chords</h3>
              <ul className="space-y-2">
                <li><strong>Formula:</strong> Root + 3 + 4 semitones</li>
                <li><strong>Sound:</strong> Sad, dark, emotional</li>
                <li><strong>Examples:</strong> Am, Em, Dm, Bm, Fm</li>
              </ul>
            </div>

            <div className="bg-amber-100 p-6 rounded-lg border-l-4 border-amber-500">
              <h3 className="text-xl font-semibold mb-3 text-amber-800">Dominant 7th Chords</h3>
              <ul className="space-y-2">
                <li><strong>Formula:</strong> Root + 4 + 3 + 3 semitones (adds a 7th)</li>
                <li><strong>Sound:</strong> Bluesy, unresolved, wanting to move</li>
                <li><strong>Examples:</strong> G7, C7, D7, A7</li>
              </ul>
            </div>

            <div className="bg-amber-100 p-6 rounded-lg border-l-4 border-amber-500">
              <h3 className="text-xl font-semibold mb-3 text-amber-800">Minor 7th Chords</h3>
              <ul className="space-y-2">
                <li><strong>Formula:</strong> Root + 3 + 4 + 3 semitones</li>
                <li><strong>Sound:</strong> Jazzy, smooth, sophisticated</li>
                <li><strong>Examples:</strong> Am7, Em7, Dm7</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 6: Types by Playing Technique */}
        <section id="types-by-technique" className="mb-12 scroll-mt-24">
          <h2 className="text-3xl font-bold mb-6 text-amber-600">Chord Shapes: Open and Moveable</h2>

          <p className="text-lg mb-6">
            Understanding chord structure is only half the story. How you play chords on the guitar depends on their <strong>ergonomic design</strong> - how they fit under your fingers.
          </p>

          <div className="space-y-6">
            <div className="bg-amber-50 p-6 rounded-lg border-l-4 border-amber-500">
              <h3 className="text-xl font-semibold mb-3 text-amber-800">Open Chords</h3>
              <p>Chords that use open (unfretted) strings mixed with fretted notes. Played in the first few frets with unique finger patterns that cannot be easily moved to different keys.</p>
            </div>

            <div className="bg-amber-100 p-6 rounded-lg border-l-4 border-amber-500">
              <h3 className="text-xl font-semibold mb-3 text-amber-800">Moveable Chord Shapes</h3>
              <p>Chord patterns with no open strings that can be moved up and down the neck to play different chords. The same fingering pattern works in any position, allowing you to play any chord with just a few learned shapes. Barre chords are the most common type of moveable chord shape.</p>
            </div>
          </div>
        </section>



        {/* Section 8: Building Your Understanding */}
        <section id="building-understanding" className="mb-12 scroll-mt-24">
          <h2 className="text-3xl font-bold mb-6 text-amber-600">Building Your Understanding</h2>

          <div className="space-y-6">
            <div className="bg-amber-100 border-l-4 border-amber-500 p-6 rounded">
              <h3 className="text-lg font-semibold mb-3 text-amber-800">Start with Recognition</h3>
              <p className="text-amber-700">Learn to hear the difference between major and minor chords - the interval changes create distinctly different emotional colors.</p>
            </div>

            <div className="bg-amber-100 border-l-4 border-amber-500 p-6 rounded">
              <h3 className="text-lg font-semibold mb-3 text-amber-800">Practice Transposition</h3>
              <p className="text-amber-700">Take a simple song in one key and move it to another using moveable chord shapes. The structure stays the same, only the starting pitches change.</p>
            </div>

            <div className="bg-amber-100 border-l-4 border-amber-500 p-6 rounded">
              <h3 className="text-lg font-semibold mb-3 text-amber-800">Connect Theory to Practice</h3>
              <p className="text-amber-700">When learning new chords, identify the root note and chord type. Understanding why a chord sounds the way it does helps memorization and musical development.</p>
            </div>
          </div>

          <div id="open-chord-library" className="bg-amber-50 p-6 rounded-lg border border-amber-200 mt-8 scroll-mt-24">
            <h4 className="text-lg font-semibold mb-3 text-amber-800">Open Chord Library</h4>
            <p className="mb-4 text-amber-700">
              Ready to see these chord structures in action? Check out my <Link href="/blog/open-chord-library" className="text-amber-600 hover:underline">Open Chord Library</Link> to visualize chord diagrams and see the interval patterns we've discussed.
            </p>
          </div>
        </section>

        {/* Related Articles */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <h3 className="text-xl font-semibold mb-6 text-amber-800">Related Articles</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/blog/how-to-read-chord-diagrams" className="block p-4 border rounded-lg hover:bg-amber-50 transition-colors">
              <h4 className="font-semibold text-amber-600">How to Read Chord Diagrams</h4>
              <p className="text-sm text-amber-700 mt-2">Learn how to read chord diagrams.</p>
            </Link>
            <Link href="/blog/caged-system-guitar-guide" className="block p-4 border rounded-lg hover:bg-amber-50 transition-colors">
              <h4 className="font-semibold text-amber-600">CAGED System Guitar Guide</h4>
              <p className="text-sm text-amber-700 mt-2">Master the CAGED system for moveable chord shapes across the fretboard.</p>
            </Link>
            <Link href="/blog/moveable-guitar-chord-shapes" className="block p-4 border rounded-lg hover:bg-amber-50 transition-colors">
              <h4 className="font-semibold text-amber-600">Moveable Guitar Chord Shapes</h4>
              <p className="text-sm text-amber-700 mt-2">Learn barre chords and other moveable shapes for any key.</p>
            </Link>
            <Link href="/blog/complete-beginners-guide-guitar" className="block p-4 border rounded-lg hover:bg-amber-50 transition-colors">
              <h4 className="font-semibold text-amber-600">Complete Beginners Guide to Guitar</h4>
              <p className="text-sm text-amber-700 mt-2">Start your guitar journey with this comprehensive beginner's guide.</p>
            </Link>
          </div>
        </div>

      <div id="what-is-a-key" className="bg-amber-50 p-6 rounded-lg border border-amber-200 mt-8 scroll-mt-24">
        <h4 className="text-lg font-semibold mb-3 text-amber-800">What is a Key?</h4>
        <p className="mb-4 text-amber-700">
          A musical key is a set of notes and chords that work together, centered around a "home" note (the tonic). Keys help organize music and make chord progressions sound natural. Understanding keys is essential for transposing songs, improvising, and writing music.
        </p>
        <Link href="/blog/key-chords-explorer" className="inline-block px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700 font-semibold transition">Explore Chords in Every Key</Link>
      </div>
    </article>
  </div>
);
}