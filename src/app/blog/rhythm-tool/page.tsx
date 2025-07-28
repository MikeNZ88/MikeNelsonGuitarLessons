import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, BarChart3, Music } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Learn Rhythm with the Interactive Rhythm Tool | Mike Nelson Guitar Lessons',
  description: 'Explore rhythm fundamentals, time signatures, and note values with interactive audio and notation. Try the free Rhythm Tool.',
  alternates: {
    canonical: 'https://mikenelsonguitarlessons.co.nz/blog/rhythm-tool//',
  },
};

export default function RhythmToolBlogPost() {
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
        <header className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-600 text-white rounded-full mb-4">
            <BarChart3 className="h-8 w-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-amber-700 mb-4">
            Learn Rhythm with the Interactive Rhythm Tool
          </h1>
          <p className="text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto">
            The Rhythm Tool is designed to help you understand rhythm and rhythm notation—not just timing or patterns. Explore time signatures, note values, and how rhythms are written and counted, all with interactive audio and visual notation. Try the free Rhythm Tool to build real rhythmic understanding.
          </p>
        </header>

        {/* What is the Rhythm Tool */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-amber-600 mb-6">What is the Rhythm Tool?</h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 mb-6">
              The Rhythm Tool is a free, interactive resource designed to help you understand rhythm and rhythm notation through hands-on examples. You can explore different time signatures, note values, and rhythm patterns, all with audio playback and visual notation. Whether you're a beginner or looking to read and write rhythms, or just want to sharpen your timing, this tool makes rhythm concepts easy to grasp.
            </p>
            <p className="text-gray-700 mb-6">
              Each example is playable and adjustable, so you can slow down or loop patterns to practice along. The tool is tuned to the open B string, but you can apply the rhythms to any string or instrument.
            </p>
          </div>
        </section>

        {/* How It Helps */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-amber-600 mb-6">How the Rhythm Tool Helps You</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-amber-200">
              <h3 className="text-xl font-semibold text-amber-800 mb-4">Visual & Audio Learning</h3>
              <p className="text-gray-700">
                See and hear how rhythms are constructed. The combination of notation and sound helps you internalize timing and subdivisions.
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-amber-200">
              <h3 className="text-xl font-semibold text-amber-800 mb-4">Practice at Your Own Pace</h3>
              <p className="text-gray-700">
                Adjust the tempo, loop patterns, and play along. Perfect for building confidence and accuracy with rhythm.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center py-12 bg-gradient-to-r from-orange-100 to-amber-100 rounded-xl border border-orange-200">
          <h2 className="text-3xl font-bold text-amber-600 mb-4">Try the Rhythm Tool Now</h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Ready to improve your rhythm skills? Explore the tool and start practicing with interactive examples.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/rhythm-tool" 
              className="inline-flex items-center bg-amber-600 text-white px-8 py-4 rounded-lg hover:bg-amber-700 transition-colors font-semibold"
            >
              <BarChart3 className="w-5 h-5 mr-2" />
              Open Rhythm Tool (Free)
            </a>
            <Link 
              href="/contact" 
              className="inline-flex items-center bg-white text-amber-600 border-2 border-amber-600 px-8 py-4 rounded-lg hover:bg-orange-50 transition-colors font-semibold"
            >
              <Music className="w-5 h-5 mr-2" />
              Book a Lesson
            </Link>
          </div>
        </section>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mt-12 pt-8 border-t border-amber-200">
          <Link 
            href="/blog" 
            className="inline-flex items-center text-amber-600 hover:text-amber-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
          <Link 
            href="/lessons" 
            className="inline-flex items-center bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors"
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