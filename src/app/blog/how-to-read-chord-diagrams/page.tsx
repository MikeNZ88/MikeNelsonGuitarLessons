import { Metadata } from 'next';
import Link from 'next/link';
import { Youtube, BookOpen, Music, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'How to Read Guitar Chord Diagrams - Video Tutorial | Mike Nelson Guitar Lessons',
  description: 'Learn to read guitar chord diagrams with this comprehensive video tutorial. Master finger placement, muted strings, and open strings for perfect chord formation.',
  keywords: 'guitar chord diagrams, how to read chords, guitar chord charts, chord symbols, guitar finger placement, guitar tutorial, learn guitar chords',
  openGraph: {
    title: 'How to Read Guitar Chord Diagrams - Video Tutorial',
    description: 'Master guitar chord diagrams with this comprehensive video tutorial covering finger placement, muted strings, and chord notation.',
    images: [
      {
        url: '/youtube-logo.svg',
        width: 1200,
        height: 630,
        alt: 'How to Read Guitar Chord Diagrams Tutorial',
      },
    ],
    type: 'article',

  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Read Guitar Chord Diagrams - Video Tutorial',
    description: 'Master guitar chord diagrams with this comprehensive video tutorial covering finger placement, muted strings, and chord notation.',
    images: ['/youtube-logo.svg'],
  },
};

export default function HowToReadChordDiagrams() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-amber-800 mb-4">
              How to Read Chord Diagrams
            </h1>
            <p className="text-xl text-amber-700 max-w-3xl mx-auto">
              Learn the fundamentals of reading guitar chord diagrams with this comprehensive video tutorial.
            </p>
            <div className="mt-6 text-sm text-amber-600">
              Reading time: 3 minutes
            </div>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            
            {/* Introduction */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-amber-800 mb-6">
                Master Chord Diagrams in Minutes
              </h2>
              
              <div className="bg-amber-50 border-l-4 border-amber-500 p-6 mb-6">
                <p className="text-amber-800">
                  Chord diagrams are the foundation of guitar learning. Once you understand how to read them, 
                  you'll be able to learn thousands of songs and expand your playing dramatically. This video 
                  breaks down everything you need to know in a clear, easy-to-follow format.
                </p>
              </div>
            </div>

            {/* Video Section */}
            <section className="mb-12">
              <h3 className="text-2xl font-semibold text-amber-800 mb-6 flex items-center">
                <Youtube className="h-7 w-7 mr-3 text-red-600" />
                Video Tutorial
              </h3>
              
              <div className="bg-gray-100 rounded-lg p-6 mb-6">
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.youtube.com/embed/TuMh30hSxwA"
                    title="How to Read Chord Diagrams"
                    className="w-full h-full"
                    frameBorder="0"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              </div>
              
              <div className="text-center">
                <a
                  href="https://www.youtube.com/watch?v=TuMh30hSxwA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-amber-600 hover:text-amber-800 font-semibold"
                >
                  <ExternalLink className="h-5 w-5 mr-2" />
                  Watch on YouTube
                </a>
              </div>
            </section>



            {/* Why This Matters */}
            <section className="mb-12">
              <h3 className="text-2xl font-semibold text-amber-800 mb-6">
                Why This Knowledge Is Essential
              </h3>
              
              <div className="bg-amber-100 p-6 rounded-lg">
                <p className="text-amber-800 mb-4">
                  <strong>Chord diagrams are everywhere in guitar learning:</strong>
                </p>
                <ul className="space-y-2 text-amber-800">
                  <li>• Songbooks and sheet music use them extensively</li>
                  <li>• Online guitar tabs and tutorials rely on diagram notation</li>
                  <li>• Guitar apps and learning platforms use this standard format</li>
                  <li>• Understanding diagrams accelerates your ability to learn new songs</li>
                  <li>• They're the universal language for communicating chord shapes</li>
                </ul>
              </div>
            </section>



            {/* Call to Action */}
            <section className="bg-gradient-to-r from-amber-100 to-orange-100 p-8 rounded-lg text-center">
              <h3 className="text-2xl font-semibold text-amber-800 mb-4">
                Want Personal Guidance?
              </h3>
              <p className="text-amber-800 mb-6 max-w-2xl mx-auto">
                While this video gives you the basics, nothing beats having a teacher guide you through proper finger placement and technique.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/lessons" 
                  className="bg-amber-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors"
                >
                  Book Your First Lesson
                </Link>
                <Link 
                  href="/blog/chord-transitions-common-fingers" 
                  className="bg-white text-amber-600 px-8 py-3 rounded-lg font-semibold border-2 border-amber-600 hover:bg-amber-50 transition-colors"
                >
                  Learn Chord Transitions
                </Link>
              </div>
            </section>

          </div>

          {/* Related Articles */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-amber-800 mb-4">Related Articles</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link 
                href="/blog/complete-beginners-guide-guitar" 
                className="block p-4 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors"
              >
                <h4 className="font-semibold text-amber-800 mb-2">Complete Beginner's Guide to Guitar</h4>
                <p className="text-amber-700 text-sm">Everything you need to start your guitar journey</p>
              </Link>
              
              <Link 
                href="/blog/chord-transitions-common-fingers" 
                className="block p-4 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors"
              >
                <h4 className="font-semibold text-amber-800 mb-2">Chord Transitions Using Common Fingers</h4>
                <p className="text-amber-700 text-sm">Smooth chord changes with efficient fingering</p>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
} 
 