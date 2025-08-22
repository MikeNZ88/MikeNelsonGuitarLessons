import { Metadata } from 'next';
import Link from 'next/link';
import { Download, BookOpen, Music, Target, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Major Scale Guitar Guide',
  description: 'Master essential guitar shapes and patterns with comprehensive major scale guide. Learn one-octave shapes, modes, and arpeggios.',
  openGraph: {
    title: 'Major Scale Guitar Guide',
    description: 'Master essential guitar shapes and patterns with comprehensive major scale guide.',
    images: [
      {
        url: '/blog-thumbnail.svg',
        width: 1200,
        height: 630,
        alt: 'Major Scale Guitar Guide',
      },
    ],
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Major Scale Guitar Guide',
    description: 'Master essential guitar shapes and patterns with comprehensive major scale guide.',
    images: ['/blog-thumbnail.svg'],
  },
  alternates: {
    canonical: 'https://mikenelsonguitarlessons.co.nz/blog/major-scale-guitar-guide',
  },
};

export default function MajorScaleGuitarGuide() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-amber-800 mb-4">
              Major Scale Guitar Guide
            </h1>
            <p className="text-xl text-amber-700 max-w-3xl mx-auto">
              Master essential guitar shapes and patterns across the fretboard with this comprehensive guide to major scale modes and arpeggios.
            </p>
            <div className="mt-6 text-sm text-amber-600">
              Reading time: 6 minutes
            </div>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            
            {/* Introduction */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-amber-800 mb-6">
                A Different Approach to Scale Learning
              </h2>
              
              <div className="bg-amber-50 border-l-4 border-amber-500 p-6 mb-8">
                <p className="text-amber-800 mb-4">
                  I've created this comprehensive guide to help you master essential guitar shapes and patterns across the fretboard. 
                  By building a solid foundation in guitar fundamentals and music theory, and by equipping you with transposition techniques, 
                  this guide will empower you to confidently explore and learn additional scales.
                </p>
                <p className="text-amber-800 font-semibold">
                  This opens up a world of musical possibilities for your guitar playing.
                </p>
              </div>

              {/* Download CTA */}
              <div className="text-center mb-8">
                <a
                  href="https://mikenelsonguitar.gumroad.com/l/fxzquj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-amber-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-amber-700 transition-colors text-lg"
                >
                  <Download className="h-6 w-6 mr-3" />
                  Download the Complete Guide
                </a>
                <p className="text-amber-600 text-sm mt-2">Available for NZ$20 at Gumroad.com</p>
              </div>
            </div>

            {/* What You'll Learn */}
            <section className="mb-12">
              <h3 className="text-2xl font-semibold text-amber-800 mb-6 flex items-center">
                <BookOpen className="h-7 w-7 mr-3" />
                What You'll Discover
              </h3>
              
              <div className="space-y-6">
                <div className="bg-amber-50 p-6 rounded-lg border-l-4 border-amber-500">
                  <h4 className="font-bold text-amber-800 mb-3">🎯 A Different Approach to Scale Learning</h4>
                  <p className="text-amber-800 text-sm">
                    Master one‑octave shapes and their core intervals—a departure from traditional methods that cover all six strings and multiple octaves. 
                    The guide shows how these shapes vary with different string sets, making them easier to visualize, transpose, and incorporate into your playing. 
                    You'll also see how these smaller building blocks combine to form larger shapes.
                  </p>
                </div>
                
                <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-500">
                  <h4 className="font-bold text-orange-800 mb-3">🎼 Scale Fundamentals and Shapes</h4>
                  <p className="text-orange-800 text-sm">
                    Dive into the C Major scale as the foundation of Western music theory, and explore detailed one‑ and two‑octave, 
                    as well as 3 note‑per‑string shapes for both C Major and its relative, A Minor.
                  </p>
                </div>
                
                <div className="bg-brown-50 p-6 rounded-lg border-l-4 border-brown-500">
                  <h4 className="font-bold text-brown-800 mb-3">🎸 Fretboard Mastery</h4>
                  <p className="text-brown-800 text-sm">
                    Gain practical insights into fret and string relationships, efficient left‑hand fingerings, and shifting techniques. 
                    Mastering these elements not only improves your technique but also makes it effortless to move familiar shapes across the fretboard.
                  </p>
                </div>
                
                <div className="bg-amber-50 p-6 rounded-lg border-l-4 border-amber-500">
                  <h4 className="font-bold text-amber-800 mb-3">🎵 Modes, Chords, and Arpeggios</h4>
                  <p className="text-amber-800 text-sm">
                    Explore the seven modes derived from the Major scale and understand that shifting the tonal centre creates the unique sound of each mode. 
                    This guide also covers chord construction with clear diagrams for Major, Minor, Diminished, and 7th chords, as well as arpeggio shapes. 
                    It further explains the essential Major and Minor Pentatonic Scales and their relationship with the Major and Minor.
                  </p>
                </div>
              </div>
            </section>

            {/* Why This Approach Works */}
            <section className="mb-12">
              <h3 className="text-2xl font-semibold text-amber-800 mb-6 flex items-center">
                <Target className="h-7 w-7 mr-3" />
                Why This Approach Works
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-orange-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-orange-800 mb-3">✅ Easier to Visualize</h4>
                  <p className="text-orange-800 text-sm">
                    One-octave shapes are simpler to memorize and understand than complex six-string patterns.
                  </p>
                </div>
                
                <div className="bg-amber-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-amber-800 mb-3">✅ Better Transposition</h4>
                  <p className="text-amber-800 text-sm">
                    Moving smaller shapes to different keys and positions becomes much more manageable.
                  </p>
                </div>
                
                <div className="bg-brown-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-brown-800 mb-3">✅ Practical Application</h4>
                  <p className="text-brown-800 text-sm">
                    Learn how building blocks combine to create the larger patterns you'll use in real playing situations.
                  </p>
                </div>
                
                <div className="bg-orange-50 p-6 rounded-lg">
                  <h4 className="font-semibent text-orange-800 mb-3">✅ Solid Foundation</h4>
                  <p className="text-orange-800 text-sm">
                    Understanding the core intervals helps you learn other scales and modes much faster.
                  </p>
                </div>
              </div>
            </section>

            {/* For Students */}
            <section className="mb-12">
              <h3 className="text-2xl font-semibold text-amber-800 mb-6">
                Perfect for Guitar Students
              </h3>
              
              <div className="bg-amber-100 p-6 rounded-lg">
                <p className="text-amber-800 mb-4">
                  <strong>This guide is designed for students who:</strong>
                </p>
                <ul className="space-y-2 text-amber-800">
                  <li>• Want to understand <em>why</em> scales work, not just memorize patterns</li>
                  <li>• Are ready to move beyond basic chord progressions</li>
                  <li>• Want to improve their fretboard knowledge systematically</li>
                  <li>• Are interested in improvisation and songwriting</li>
                  <li>• Want to learn music theory in a practical, guitar-focused way</li>
                </ul>
              </div>
            </section>

            {/* Call to Action */}
            <section className="bg-gradient-to-r from-amber-100 to-orange-100 p-8 rounded-lg text-center">
              <h3 className="text-2xl font-semibold text-amber-800 mb-4">
                Ready to Master the Fretboard?
              </h3>
              <p className="text-amber-800 mb-6 max-w-2xl mx-auto">
                Get instant access to this comprehensive 100-page guide and start building your foundation for advanced guitar playing.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://mikenelsonguitar.gumroad.com/l/fxzquj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-amber-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors flex items-center justify-center"
                >
                  <Download className="h-5 w-5 mr-2" />
                  Download Now - NZ$20
                </a>
                <Link 
                  href="/lessons" 
                  className="bg-white text-amber-600 px-8 py-3 rounded-lg font-semibold border-2 border-amber-600 hover:bg-amber-50 transition-colors"
                >
                  Learn with Personal Lessons
                </Link>
              </div>
            </section>

          </div>

          {/* Related Articles */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-amber-800 mb-4">Related Articles</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link 
                href="/blog/beginners-guide-guitar-scales" 
                className="block p-4 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors"
              >
                <h4 className="font-semibold text-amber-800 mb-2">Beginner's Guide to Guitar Scales</h4>
                <p className="text-amber-700 text-sm">Start your journey with systematic scale learning</p>
              </Link>
              
              <Link 
                href="/blog/understanding-guitar-fretboard" 
                className="block p-4 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors"
              >
                <h4 className="font-semibold text-amber-800 mb-2">Understanding Guitar Fretboard</h4>
                <p className="text-amber-700 text-sm">Deep dive into fretboard theory and navigation</p>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
} 
 