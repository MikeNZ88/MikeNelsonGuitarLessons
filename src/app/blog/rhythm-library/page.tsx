import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Music, Target, Zap, Clock } from 'lucide-react';
import AlphaTabPlayerCDN from '@/components/AlphaTabPlayerCDN';

export const metadata: Metadata = {
  title: 'Rhythm Library - Guitar Lesson',
  description: 'Learn different rhythm patterns and techniques on guitar with interactive tablature examples.',
  openGraph: {
    title: 'Rhythm Library - Guitar Lesson',
    description: 'Learn different rhythm patterns and techniques on guitar with interactive tablature examples.',
    images: ['/rhythm-library-thumbnail.svg'],
  },
};

export default function RhythmLibraryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 overflow-x-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-700 text-white overflow-x-hidden">
        <div className="container mx-auto px-4 py-8 overflow-x-hidden">
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
      <div className="container mx-auto px-4 py-8 overflow-x-hidden">
        <div className="max-w-4xl mx-auto overflow-x-hidden">
          
          {/* Introduction */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <p className="text-lg text-amber-700 leading-relaxed mb-6">
              Rhythm is the foundation of all music. Whether you're strumming chords or playing lead lines, 
              understanding different rhythmic patterns will make your playing more dynamic and engaging. 
              This lesson will be expanded over time with various rhythms that you can apply to your own songs or use to help learn songs with similar rhythms.
            </p>
          </div>

          {/* How to Use the Exercises */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-amber-900 mb-4">How to Practice These Rhythm Exercises</h2>
            
            <div className="space-y-4 text-amber-700">
              <p className="leading-relaxed">
                Each exercise uses a <strong>riff designed to teach specific rhythm concepts</strong>. These examples show how different note types and their combinations create distinct rhythmic feels.
              </p>
              
              <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded">
                <h3 className="font-semibold text-amber-900 mb-2">Counting Rhythms Out Loud</h3>
                <p className="text-amber-800">
                  <strong>Essential tip:</strong> You will often need to count the rhythm out loud. For example, 16th notes are counted as "1 e & a 2 e & a 3 e & a 4 e & a". 
                  Try counting only the beats that start each note in the rhythm - this helps you internalize the timing.
                </p>
                <div className="mt-3 p-3 bg-amber-100 rounded border border-amber-300">
                  <p className="text-amber-900 font-medium mb-2">Example - Dotted 8th Note Rhythm:</p>
                  <p className="text-amber-800 font-mono text-lg">
                    <span className="font-bold text-amber-900">1</span> (e) (&) <span className="font-bold text-amber-900">a</span> (2) (e) <span className="font-bold text-amber-900">&</span> (a) (3) (e) (&) (a) (4) (e) <span className="font-bold text-amber-900">&</span> (a)
                  </p>
                  <p className="mt-2 text-amber-700 text-sm">Say out loud:</p>
                  <p className="font-mono text-lg text-amber-900 font-bold whitespace-pre">
                    <span>1</span><span className="invisible"> (e)</span><span className="invisible"> (&)</span><span> a</span><span className="invisible"> (2)</span><span className="invisible"> (e)</span><span> &</span><span className="invisible"> (a)</span><span className="invisible"> (3)</span><span className="invisible"> (e)</span><span className="invisible"> (&)</span><span className="invisible"> (a)</span><span className="invisible"> (4)</span><span className="invisible"> (e)</span><span> &</span><span className="invisible"> (a)</span>
                  </p>
                  <p className="text-amber-700 text-sm mt-2">Say the uncircled counts (shown without brackets) out loud, and count the bracketed counts silently in your head. Each note lasts until the next uncircled count. Learning standard music notation will make this even clearer.</p>
                </div>
              </div>
              
              <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded">
                <h3 className="font-semibold text-amber-900 mb-2">Muted Notes as Training Wheels</h3>
                <p className="text-amber-800">
                  Most examples include <strong>muted notes</strong> (marked with "X" in the tab) to help you count and feel the rhythm. 
                  Think of these as training wheels - they keep you on track while you're learning the pattern.
                </p>
              </div>
              
              <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded">
                <h3 className="font-semibold text-amber-900 mb-2">Musical Context with Drums</h3>
                <p className="text-amber-800">
                  The end of each exercise includes <strong>drums with the riff</strong> to give the rhythm more musical context. 
                  This helps you hear how the rhythm fits into a complete musical arrangement.
                </p>
              </div>
              
              <p className="leading-relaxed">
                Start slowly and focus on accuracy before speed. Use the tempo controls to practice at a comfortable pace, 
                then gradually increase the speed as you become more confident with each rhythm pattern.
              </p>
            </div>
          </div>

          {/* Tab Player */}
          <div className="bg-white rounded-lg shadow-lg p-5 mb-6 overflow-x-hidden">
            <h2 className="text-xl md:text-2xl font-bold text-amber-900 mb-2">Interactive Rhythm Examples</h2>
            <div className="overflow-x-auto">
              <AlphaTabPlayerCDN />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 