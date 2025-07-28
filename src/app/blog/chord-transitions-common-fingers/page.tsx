import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Music } from 'lucide-react'

export const metadata: Metadata = {
  title: "Smoother Chord Changes Guide | Mike Nelson",
  description: "Learn how to identify common fingers between chords for smoother transitions. Master chord changes with essential fingering tips and visual diagrams.",
  openGraph: {
    title: "Smoother Chord Changes: Common Fingers Between Guitar Chords",
    description: "Learn how to identify common fingers between chords for smoother transitions. Master chord changes with essential fingering tips and visual diagrams.",
    images: [{
      url: "https://mikenelsonguitarlessons.co.nz/mike_nelson_guitar_logo.jpg",
      width: 1000,
      height: 700,
      alt: "Guitar chord diagram showing common fingers between C Major and A minor chords"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Smoother Chord Changes: Common Fingers Between Guitar Chords",
    description: "Learn how to identify common fingers between chords for smoother transitions. Master chord changes with essential fingering tips and visual diagrams.",
          images: [{
        url: "/chord-transitions-thumbnail-social.jpg",
        width: 1200,
        height: 630,
        alt: "Guitar Chord Transitions Guide"
      }]
  },
  alternates: {
    canonical: 'https://mikenelsonguitarlessons.co.nz/blog/chord-transitions-common-fingers',
  }
}

export default function ChordTransitionsPost() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <Link 
            href="/blog" 
            className="inline-flex items-center text-orange-600 hover:text-orange-700 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-bold text-amber-600 mb-4">
            Smoother Chord Changes: Common Fingers Between Chords
          </h1>
          

        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-700 mb-8">
            Making clean, smooth chord transitions is all about finding <strong>common fingers</strong> — fingers that stay on the same fret and string as you move between chords. These anchor fingers help you minimize movement and improve your timing.
          </p>

          <div className="bg-orange-50 border-l-4 border-orange-400 p-6 mb-8">
            <h3 className="text-lg font-semibold text-orange-900 mb-3">Finger Numbering Guide</h3>
            <div className="grid grid-cols-2 gap-4 text-orange-800">
              <div><strong>1 = Index finger</strong> (pointing finger)</div>
              <div><strong>2 = Middle finger</strong></div>
              <div><strong>3 = Ring finger</strong></div>
              <div><strong>4 = Pinky finger</strong> (little finger)</div>
            </div>
          </div>

          <p>
            Here's a quick guide to some common open chord pairs, showing only the fingers that stay put during the transition.
          </p>

          <h2 className="text-3xl font-bold text-amber-600 mt-12 mb-6">What Are Common Fingers?</h2>

          <p>
            Common fingers are those that press the <strong>same fret on the same string</strong> across two chords. Using these as anchors reduces finger lifting and helps your hand flow naturally.
          </p>

          <h2 className="text-3xl font-bold text-amber-600 mt-12 mb-6">Common Fingers in Open Chord Transitions</h2>

          <h3 className="text-2xl font-bold text-amber-700 mt-10 mb-6">1. C → Am</h3>

          <p><strong>Common fingers:</strong></p>
          <ul className="list-disc list-inside space-y-2 mb-6">
            <li>Index finger: 1st fret, B string</li>
            <li>Middle finger: 2nd fret, D string</li>
          </ul>

          <div className="bg-gray-100 p-6 rounded-lg mb-6 font-mono text-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold mb-3 text-amber-700">C Major</h4>
                <div className="space-y-1">
                  <div className="flex items-center mb-2 font-semibold text-gray-700 text-xs">
                    <span className="w-8 text-center">String</span>
                    <span className="mx-3">|</span>
                    <span className="w-10 text-center">Fret</span>
                    <span className="mx-3">|</span>
                    <span className="w-16 text-center">Finger</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-8 text-gray-600 text-center">e</span>
                    <span className="mx-3">|</span>
                    <span className="w-10 text-center bg-orange-200 rounded px-1">0</span>
                    <span className="mx-3">|</span>
                    <span className="w-16 text-gray-500 text-xs text-center">open</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-8 text-gray-600 text-center">B</span>
                    <span className="mx-3">|</span>
                    <span className="w-10 text-center bg-green-300 rounded px-1 font-bold">1</span>
                    <span className="mx-3">|</span>
                    <span className="w-16 text-gray-500 text-xs text-center">index</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-8 text-gray-600 text-center">G</span>
                    <span className="mx-3">|</span>
                    <span className="w-10 text-center bg-orange-200 rounded px-1">0</span>
                    <span className="mx-3">|</span>
                    <span className="w-16 text-gray-500 text-xs text-center">open</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-8 text-gray-600 text-center">D</span>
                    <span className="mx-3">|</span>
                    <span className="w-10 text-center bg-green-300 rounded px-1 font-bold">2</span>
                    <span className="mx-3">|</span>
                    <span className="w-16 text-gray-500 text-xs text-center">middle</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-8 text-gray-600 text-center">A</span>
                    <span className="mx-3">|</span>
                    <span className="w-10 text-center bg-orange-200 rounded px-1">3</span>
                    <span className="mx-3">|</span>
                    <span className="w-16 text-gray-500 text-xs text-center">ring</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-8 text-gray-600 text-center">E</span>
                    <span className="mx-3">|</span>
                    <span className="w-10 text-center bg-gray-300 rounded px-1">x</span>
                    <span className="mx-3">|</span>
                    <span className="w-16 text-gray-500 text-xs text-center">muted</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-bold mb-3 text-amber-700">A minor</h4>
                <div className="space-y-1">
                  <div className="flex items-center mb-2 font-semibold text-gray-700 text-xs">
                    <span className="w-8 text-center">String</span>
                    <span className="mx-3">|</span>
                    <span className="w-10 text-center">Fret</span>
                    <span className="mx-3">|</span>
                    <span className="w-16 text-center">Finger</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-8 text-gray-600 text-center">e</span>
                    <span className="mx-3">|</span>
                    <span className="w-10 text-center bg-orange-200 rounded px-1">0</span>
                    <span className="mx-3">|</span>
                    <span className="w-16 text-gray-500 text-xs text-center">open</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-8 text-gray-600 text-center">B</span>
                    <span className="mx-3">|</span>
                    <span className="w-10 text-center bg-green-300 rounded px-1 font-bold">1</span>
                    <span className="mx-3">|</span>
                    <span className="w-16 text-gray-500 text-xs text-center">index</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-8 text-gray-600 text-center">G</span>
                    <span className="mx-3">|</span>
                    <span className="w-10 text-center bg-orange-200 rounded px-1">2</span>
                    <span className="mx-3">|</span>
                    <span className="w-16 text-gray-500 text-xs text-center">ring</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-8 text-gray-600 text-center">D</span>
                    <span className="mx-3">|</span>
                    <span className="w-10 text-center bg-green-300 rounded px-1 font-bold">2</span>
                    <span className="mx-3">|</span>
                    <span className="w-16 text-gray-500 text-xs text-center">middle</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-8 text-gray-600 text-center">A</span>
                    <span className="mx-3">|</span>
                    <span className="w-10 text-center bg-orange-200 rounded px-1">0</span>
                    <span className="mx-3">|</span>
                    <span className="w-16 text-gray-500 text-xs text-center">open</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-8 text-gray-600 text-center">E</span>
                    <span className="mx-3">|</span>
                    <span className="w-10 text-center bg-gray-300 rounded px-1">x</span>
                    <span className="mx-3">|</span>
                    <span className="w-16 text-gray-500 text-xs text-center">muted</span>
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-4 text-center text-gray-700 font-semibold">
              <span className="bg-green-300 px-2 py-1 rounded">Common Fingers</span>
            </p>
          </div>

          <h3 className="text-2xl font-bold text-amber-700 mt-10 mb-6">2. G → D</h3>

          <p><strong>Common finger:</strong></p>
          <ul className="list-disc list-inside space-y-2 mb-6">
            <li>Ring finger: 3rd fret, B string</li>
          </ul>

          <div className="bg-gray-100 p-6 rounded-lg mb-6 font-mono text-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold mb-3 text-amber-700">G Major</h4>
                <div className="space-y-1">
                  <div className="flex items-center mb-2 font-semibold text-gray-700 text-xs">
                    <span className="w-8 text-center">String</span>
                    <span className="mx-3">|</span>
                    <span className="w-10 text-center">Fret</span>
                    <span className="mx-3">|</span>
                    <span className="w-16 text-center">Finger</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-8 text-gray-600 text-center">e</span>
                    <span className="mx-3">|</span>
                    <span className="w-10 text-center bg-orange-200 rounded px-1">3</span>
                    <span className="mx-3">|</span>
                    <span className="w-16 text-gray-500 text-xs text-center">pinky</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-8 text-gray-600 text-center">B</span>
                    <span className="mx-3">|</span>
                    <span className="w-10 text-center bg-green-300 rounded px-1 font-bold">3</span>
                    <span className="mx-3">|</span>
                    <span className="w-16 text-gray-500 text-xs text-center">ring</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-8 text-gray-600 text-center">G</span>
                    <span className="mx-3">|</span>
                    <span className="w-10 text-center bg-orange-200 rounded px-1">0</span>
                    <span className="mx-3">|</span>
                    <span className="w-16 text-gray-500 text-xs text-center">open</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-8 text-gray-600 text-center">D</span>
                    <span className="mx-3">|</span>
                    <span className="w-10 text-center bg-orange-200 rounded px-1">0</span>
                    <span className="mx-3">|</span>
                    <span className="w-16 text-gray-500 text-xs text-center">open</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-8 text-gray-600 text-center">A</span>
                    <span className="mx-3">|</span>
                    <span className="w-10 text-center bg-orange-200 rounded px-1">2</span>
                    <span className="mx-3">|</span>
                    <span className="w-16 text-gray-500 text-xs text-center">middle</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-8 text-gray-600 text-center">E</span>
                    <span className="mx-3">|</span>
                    <span className="w-10 text-center bg-orange-200 rounded px-1">3</span>
                    <span className="mx-3">|</span>
                    <span className="w-16 text-gray-500 text-xs text-center">index</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-bold mb-3 text-amber-700">D Major</h4>
                <div className="space-y-1">
                  <div className="flex items-center mb-2 font-semibold text-gray-700 text-xs">
                    <span className="w-8 text-center">String</span>
                    <span className="mx-3">|</span>
                    <span className="w-10 text-center">Fret</span>
                    <span className="mx-3">|</span>
                    <span className="w-16 text-center">Finger</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-8 text-gray-600 text-center">e</span>
                    <span className="mx-3">|</span>
                    <span className="w-10 text-center bg-orange-200 rounded px-1">2</span>
                    <span className="mx-3">|</span>
                    <span className="w-16 text-gray-500 text-xs text-center">middle</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-8 text-gray-600 text-center">B</span>
                    <span className="mx-3">|</span>
                    <span className="w-10 text-center bg-green-300 rounded px-1 font-bold">3</span>
                    <span className="mx-3">|</span>
                    <span className="w-16 text-gray-500 text-xs text-center">ring</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-8 text-gray-600 text-center">G</span>
                    <span className="mx-3">|</span>
                    <span className="w-10 text-center bg-orange-200 rounded px-1">2</span>
                    <span className="mx-3">|</span>
                    <span className="w-16 text-gray-500 text-xs text-center">index</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-8 text-gray-600 text-center">D</span>
                    <span className="mx-3">|</span>
                    <span className="w-10 text-center bg-orange-200 rounded px-1">0</span>
                    <span className="mx-3">|</span>
                    <span className="w-16 text-gray-500 text-xs text-center">open</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-8 text-gray-600 text-center">A</span>
                    <span className="mx-3">|</span>
                    <span className="w-10 text-center bg-gray-300 rounded px-1">x</span>
                    <span className="mx-3">|</span>
                    <span className="w-16 text-gray-500 text-xs text-center">muted</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-8 text-gray-600 text-center">E</span>
                    <span className="mx-3">|</span>
                    <span className="w-10 text-center bg-gray-300 rounded px-1">x</span>
                    <span className="mx-3">|</span>
                    <span className="w-16 text-gray-500 text-xs text-center">muted</span>
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-4 text-center text-gray-700 font-semibold">
              <span className="bg-green-300 px-2 py-1 rounded">Common Fingers</span>
            </p>
          </div>

          <h3 className="text-2xl font-bold text-amber-700 mt-10 mb-6">3. Em → C</h3>

          <p><strong>Common finger:</strong></p>
          <ul className="list-disc list-inside space-y-2 mb-6">
            <li>Middle finger: 2nd fret, D string</li>
          </ul>

          <div className="bg-gray-100 p-6 rounded-lg mb-6 font-mono text-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold mb-3 text-amber-700">E minor</h4>
                <div className="space-y-1">
                  <div className="flex items-center mb-2 font-semibold text-gray-700 text-xs">
                    <span className="w-8 text-center">String</span>
                    <span className="mx-3">|</span>
                    <span className="w-10 text-center">Fret</span>
                    <span className="mx-3">|</span>
                    <span className="w-16 text-center">Finger</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-8 text-gray-600 text-center">e</span>
                    <span className="mx-3">|</span>
                    <span className="w-10 text-center bg-orange-200 rounded px-1">0</span>
                    <span className="mx-3">|</span>
                    <span className="w-16 text-gray-500 text-xs text-center">open</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-8 text-gray-600 text-center">B</span>
                    <span className="mx-3">|</span>
                    <span className="w-10 text-center bg-orange-200 rounded px-1">0</span>
                    <span className="mx-3">|</span>
                    <span className="w-16 text-gray-500 text-xs text-center">open</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-8 text-gray-600 text-center">G</span>
                    <span className="mx-3">|</span>
                    <span className="w-10 text-center bg-orange-200 rounded px-1">0</span>
                    <span className="mx-3">|</span>
                    <span className="w-16 text-gray-500 text-xs text-center">open</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-8 text-gray-600 text-center">D</span>
                    <span className="mx-3">|</span>
                    <span className="w-10 text-center bg-green-300 rounded px-1 font-bold">2</span>
                    <span className="mx-3">|</span>
                    <span className="w-16 text-gray-500 text-xs text-center">middle</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-8 text-gray-600 text-center">A</span>
                    <span className="mx-3">|</span>
                    <span className="w-10 text-center bg-orange-200 rounded px-1">2</span>
                    <span className="mx-3">|</span>
                    <span className="w-16 text-gray-500 text-xs text-center">index</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-8 text-gray-600 text-center">E</span>
                    <span className="mx-3">|</span>
                    <span className="w-10 text-center bg-orange-200 rounded px-1">0</span>
                    <span className="mx-3">|</span>
                    <span className="w-16 text-gray-500 text-xs text-center">open</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-bold mb-3 text-amber-700">C Major</h4>
                <div className="space-y-1">
                  <div className="flex items-center mb-2 font-semibold text-gray-700 text-xs">
                    <span className="w-8 text-center">String</span>
                    <span className="mx-3">|</span>
                    <span className="w-10 text-center">Fret</span>
                    <span className="mx-3">|</span>
                    <span className="w-16 text-center">Finger</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-8 text-gray-600 text-center">e</span>
                    <span className="mx-3">|</span>
                    <span className="w-10 text-center bg-orange-200 rounded px-1">0</span>
                    <span className="mx-3">|</span>
                    <span className="w-16 text-gray-500 text-xs text-center">open</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-8 text-gray-600 text-center">B</span>
                    <span className="mx-3">|</span>
                    <span className="w-10 text-center bg-orange-200 rounded px-1">1</span>
                    <span className="mx-3">|</span>
                    <span className="w-16 text-gray-500 text-xs text-center">index</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-8 text-gray-600 text-center">G</span>
                    <span className="mx-3">|</span>
                    <span className="w-10 text-center bg-orange-200 rounded px-1">0</span>
                    <span className="mx-3">|</span>
                    <span className="w-16 text-gray-500 text-xs text-center">open</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-8 text-gray-600 text-center">D</span>
                    <span className="mx-3">|</span>
                    <span className="w-10 text-center bg-green-300 rounded px-1 font-bold">2</span>
                    <span className="mx-3">|</span>
                    <span className="w-16 text-gray-500 text-xs text-center">middle</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-8 text-gray-600 text-center">A</span>
                    <span className="mx-3">|</span>
                    <span className="w-10 text-center bg-orange-200 rounded px-1">3</span>
                    <span className="mx-3">|</span>
                    <span className="w-16 text-gray-500 text-xs text-center">ring</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-8 text-gray-600 text-center">E</span>
                    <span className="mx-3">|</span>
                    <span className="w-10 text-center bg-gray-300 rounded px-1">x</span>
                    <span className="mx-3">|</span>
                    <span className="w-16 text-gray-500 text-xs text-center">muted</span>
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-4 text-center text-gray-700 font-semibold">
              <span className="bg-green-300 px-2 py-1 rounded">Common Fingers</span>
            </p>
          </div>

          <h3 className="text-2xl font-bold text-amber-700 mt-10 mb-6">4. G → Em</h3>

          <p><strong>Common finger:</strong></p>
          <ul className="list-disc list-inside space-y-2 mb-6">
            <li>Index finger: 2nd fret, A string</li>
          </ul>

          <div className="bg-gray-100 p-6 rounded-lg mb-6 font-mono text-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold mb-3 text-amber-700">G Major</h4>
                <div className="space-y-1">
                  <div className="flex items-center mb-2 font-semibold text-gray-700 text-xs">
                    <span className="w-8 text-center">String</span>
                    <span className="mx-3">|</span>
                    <span className="w-10 text-center">Fret</span>
                    <span className="mx-3">|</span>
                    <span className="w-16 text-center">Finger</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-8 text-gray-600 text-center">e</span>
                    <span className="mx-3">|</span>
                    <span className="w-10 text-center bg-orange-200 rounded px-1">3</span>
                    <span className="mx-3">|</span>
                    <span className="w-16 text-gray-500 text-xs text-center">pinky</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-8 text-gray-600 text-center">B</span>
                    <span className="mx-3">|</span>
                    <span className="w-10 text-center bg-orange-200 rounded px-1">3</span>
                    <span className="mx-3">|</span>
                    <span className="w-16 text-gray-500 text-xs text-center">ring</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-8 text-gray-600 text-center">G</span>
                    <span className="mx-3">|</span>
                    <span className="w-10 text-center bg-orange-200 rounded px-1">0</span>
                    <span className="mx-3">|</span>
                    <span className="w-16 text-gray-500 text-xs text-center">open</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-8 text-gray-600 text-center">D</span>
                    <span className="mx-3">|</span>
                    <span className="w-10 text-center bg-orange-200 rounded px-1">0</span>
                    <span className="mx-3">|</span>
                    <span className="w-16 text-gray-500 text-xs text-center">open</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-8 text-gray-600 text-center">A</span>
                    <span className="mx-3">|</span>
                    <span className="w-10 text-center bg-green-300 rounded px-1 font-bold">2</span>
                    <span className="mx-3">|</span>
                    <span className="w-16 text-gray-500 text-xs text-center">index</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-8 text-gray-600 text-center">E</span>
                    <span className="mx-3">|</span>
                    <span className="w-10 text-center bg-orange-200 rounded px-1">3</span>
                    <span className="mx-3">|</span>
                    <span className="w-16 text-gray-500 text-xs text-center">index</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-bold mb-3 text-amber-700">E minor</h4>
                <div className="space-y-1">
                  <div className="flex items-center mb-2 font-semibold text-gray-700 text-xs">
                    <span className="w-8 text-center">String</span>
                    <span className="mx-3">|</span>
                    <span className="w-10 text-center">Fret</span>
                    <span className="mx-3">|</span>
                    <span className="w-16 text-center">Finger</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-8 text-gray-600 text-center">e</span>
                    <span className="mx-3">|</span>
                    <span className="w-10 text-center bg-orange-200 rounded px-1">0</span>
                    <span className="mx-3">|</span>
                    <span className="w-16 text-gray-500 text-xs text-center">open</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-8 text-gray-600 text-center">B</span>
                    <span className="mx-3">|</span>
                    <span className="w-10 text-center bg-orange-200 rounded px-1">0</span>
                    <span className="mx-3">|</span>
                    <span className="w-16 text-gray-500 text-xs text-center">open</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-8 text-gray-600 text-center">G</span>
                    <span className="mx-3">|</span>
                    <span className="w-10 text-center bg-orange-200 rounded px-1">0</span>
                    <span className="mx-3">|</span>
                    <span className="w-16 text-gray-500 text-xs text-center">open</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-8 text-gray-600 text-center">D</span>
                    <span className="mx-3">|</span>
                    <span className="w-10 text-center bg-orange-200 rounded px-1">2</span>
                    <span className="mx-3">|</span>
                    <span className="w-16 text-gray-500 text-xs text-center">middle</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-8 text-gray-600 text-center">A</span>
                    <span className="mx-3">|</span>
                    <span className="w-10 text-center bg-green-300 rounded px-1 font-bold">2</span>
                    <span className="mx-3">|</span>
                    <span className="w-16 text-gray-500 text-xs text-center">index</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-8 text-gray-600 text-center">E</span>
                    <span className="mx-3">|</span>
                    <span className="w-10 text-center bg-orange-200 rounded px-1">0</span>
                    <span className="mx-3">|</span>
                    <span className="w-16 text-gray-500 text-xs text-center">open</span>
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-4 text-center text-gray-700 font-semibold">
              <span className="bg-green-300 px-2 py-1 rounded">Common Fingers</span>
            </p>
          </div>

          <h2 className="text-3xl font-bold text-amber-600 mt-12 mb-6">Final Tips</h2>

          <ul className="list-disc list-inside space-y-3 mb-6">
            <li><strong>Watch your anchor fingers</strong> during chord changes to keep them steady.</li>
            <li>Practice moving only the fingers that need to shift while keeping common fingers pressed down during transitions.</li>
            <li>Use a metronome to practice chord changes at different tempos.</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mt-8">
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
  )
}