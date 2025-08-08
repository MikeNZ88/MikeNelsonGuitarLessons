import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Music, Target, Zap, Clock } from 'lucide-react';
import AlphaTabPlayerCDN from '@/components/AlphaTabPlayerCDN';

export const metadata: Metadata = {
  title: 'Rhythm Library - Guitar Lesson | Mike Nelson Guitar Lessons',
  description: 'Learn different rhythm patterns and techniques on guitar with interactive tablature examples.',
  openGraph: {
    title: 'Rhythm Library - Guitar Lesson',
    description: 'Learn different rhythm patterns and techniques on guitar with interactive tablature examples.',
    images: ['/rhythm-library-thumbnail.svg'],
  },
};

export default function RhythmLibraryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-700 text-white">
        <div className="container mx-auto px-4 py-8">
          <Link href="/blog" className="inline-flex items-center text-amber-200 hover:text-white mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
          
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-medium">All Levels</span>
              <span className="text-amber-200">•</span>
              <span className="text-amber-200">Interactive Guide</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Rhythm Library
            </h1>
            
            <p className="text-xl text-amber-200 mb-6">
              Master essential rhythm patterns and techniques that will transform your guitar playing
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Music className="w-4 h-4" />
                <span>Interactive Examples</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4" />
                <span>Rhythm Patterns</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Timing Techniques</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Introduction */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <p className="text-lg text-amber-700 leading-relaxed mb-6">
              Rhythm is the foundation of all music. Whether you're strumming chords or playing lead lines, 
              understanding different rhythmic patterns will make your playing more dynamic and engaging. 
              This lesson will be expanded over time with various rhythms that you can apply to your own songs or use to help learn songs with similar rhythms.
            </p>
          </div>

          {/* Tab Player */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-amber-900 mb-4">Interactive Rhythm Examples</h2>
            <AlphaTabPlayerCDN />
          </div>
        </div>
      </div>
    </div>
  );
} 