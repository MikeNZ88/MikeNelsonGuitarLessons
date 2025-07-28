import AlphaTabPlayerCDN from '@/components/AlphaTabPlayerCDN';
import { Metadata } from 'next';



export default function GuitarPickingExercisesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <div className="container mx-auto px-4 py-12">
        <article className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          {/* Header */}
          <header className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-amber-900 mb-4">
              Pentatonic Scale Exercises
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Unlock your picking technique with focused pentatonic scale exercises. Practice alternate picking, triplets, and legato patterns with interactive tabs, audio playback, and clear practice tips—perfect for building speed, accuracy, and fretboard mastery.
            </p>
          </header>

          {/* Introduction */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-amber-900 mb-4">
              Why Pentatonic Scales Are Good for Picking Practice
            </h2>
            <div className="prose prose-lg text-gray-700 space-y-4">
              <p>
                The pentatonic scale is the backbone of rock, blues, and countless other musical styles. 
                But beyond its musical applications, it's also the perfect vehicle for developing picking technique. 
                Here's why:
              </p>
              <p className="mb-2 text-amber-700 font-medium">
                All of these examples use the Am pentatonic shape 1.{' '}
                <a href="/blog/beginners-guide-pentatonic-scales" className="underline hover:text-amber-800">See the pentatonic scale diagram.</a>
              </p>
              <p className="mb-2 text-gray-700">
                Left-hand fingering is shown above the standard notation staff. Note that some patterns require a finger to be barred, either the first or third finger.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>2 notes per string:</strong> Easy to remember shapes and perfect for alternate picking (even number of notes per string means you always play a downstroke when changing strings)</li>
                <li><strong>String crossing:</strong> Natural opportunities to practice crossing between strings</li>
                <li><strong>Position playing:</strong> Develops fretboard knowledge while improving technique</li>
                <li><strong>Scalable difficulty:</strong> Works for beginners through advanced players</li>
              </ul>
            </div>
          </section>

          {/* Tab Player */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-amber-900 mb-6">
              Pentatonic Scale Tab Player
            </h2>
            <p className="text-gray-600 mb-6">
              Use the dropdown below to select and practice different pentatonic exercises.<br/>
              <span className="text-amber-700">Partial legato exercises involve hammer-ons and pull-offs with picked notes, as opposed to pure legato which only picks the first note on every string.</span>
            </p>
            
            <AlphaTabPlayerCDN key={Date.now()} containerId="pentatonic-alphatab-container" showSlides={false} />
          </section>

          {/* How to Practice */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-amber-900 mb-6">How to Practice Pentatonic Scales</h2>
            <p className="mb-4 text-gray-700">
              The examples start at <strong>20 BPM</strong>. This is a beginner speed—since these are 16th notes and 16th note triplets, we're slowing down significantly to ensure clean execution. Players with a bit more experience may prefer to start at 40 BPM. Start at a speed that you can play the exercise comfortably and cleanly. Increase the tempo by 5–10 BPM at a time and stay at that speed until you can play it comfortably and cleanly. 
              <br/>
              It's also beneficial to occasionally push above your comfortable speed in short bursts—this can help break through plateaus and build confidence. For more on this approach, see <a href="/blog/essential-practice-tips" className="underline text-amber-700 hover:text-amber-900">6 Essential Practice Tips for Guitar Students</a>.
            </p>
            <div className="bg-amber-50 border-l-4 border-amber-400 rounded p-4 mb-4">
              <h3 className="text-lg font-semibold text-amber-900 mb-2">Tempo Reference Guide</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold text-amber-900 mb-1">16th Notes:</h4>
                  <ul className="space-y-1 text-amber-800">
                    <li><strong>Medium/Intermediate:</strong> 100-130 BPM</li>
                    <li><strong>Fast/Advanced:</strong> 130-160 BPM</li>
                    <li><strong>Very Fast/Professional:</strong> 160-180+ BPM</li>
                    <li><strong>Elite/Virtuoso:</strong> 200+ BPM</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-amber-900 mb-1">16th Note Triplets:</h4>
                  <ul className="space-y-1 text-amber-800">
                    <li><strong>Medium:</strong> 70-100 BPM</li>
                    <li><strong>Fast:</strong> 100-130 BPM</li>
                    <li><strong>Very Fast:</strong> 130-160+ BPM</li>
                  </ul>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-amber-200">
                <p className="text-amber-700 text-sm">
                  <strong>Note:</strong> Average rock/pop songs are typically 80-140 BPM. At 120 BPM, 16th notes become quite challenging for most players, which is why we start much slower for practice.
                </p>
                <p className="text-amber-700 text-sm mt-2">
                  <strong>Important:</strong> 16th note triplets are faster than 16th notes at the same tempo (6 notes per beat vs 4 notes per beat), making them significantly harder to play cleanly at the same BPM.
                </p>
                <p className="text-amber-700 text-sm mt-2">
                  <strong>Practice Wisdom:</strong> Most players are tempted to practice faster than they can play cleanly. Remember: fast players get that way by practicing slowly and with intention. If you stick to the method above, you will see results!
                </p>
              </div>
            </div>
          </section>

          {/* Next Steps */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-amber-900 mb-6">Next Steps in Your Picking Journey</h2>
            <ul className="list-disc pl-6 space-y-2 text-amber-800 mb-4">
              <li><a href="/blog/scale-explorer-tool" className="underline text-amber-600 hover:text-amber-800">Exploring other scale patterns</a> (major scales, modes, exotic scales)</li>
              <li>Developing sweep picking and economy picking techniques</li>
              <li>Creating your own practice exercises and variations</li>
              <li>Applying these techniques to real musical situations</li>
              <li>Building repertoire with picking-focused pieces</li>
              <li>Apply these exercises to the other pentatonic shapes (<a href="/blog/beginners-guide-pentatonic-scales" className="underline text-amber-600 hover:text-amber-800">see the guide</a>) and different keys</li>
            </ul>
            <p className="text-amber-700 mb-8">
              Remember: Consistent daily practice with focused attention beats sporadic long sessions. Quality over quantity!
            </p>
          </section>
        </article>
      </div>
    </div>
  );
} 

export const metadata: Metadata = {
  title: 'Pentatonic Scale Exercises | Mike Nelson Guitar Lessons',
  description: 'Unlock your picking technique with focused pentatonic scale exercises. Practice alternate picking, triplets, and legato patterns with interactive tabs.',
  openGraph: {
    title: 'Pentatonic Scale Exercises',
    description: 'Unlock your picking technique with focused pentatonic scale exercises and interactive tabs.',
    images: [
      {
        url: 'https://mikenelsonguitarlessons.co.nz/mike-nelson-guitar-logo.jpg',
        width: 1200,
        height: 630,
        alt: 'Pentatonic Scale Exercises',
      },
    ],
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pentatonic Scale Exercises',
    description: 'Unlock your picking technique with focused pentatonic scale exercises and interactive tabs.',
    images: ['https://mikenelsonguitarlessons.co.nz/mike-nelson-guitar-logo.jpg'],
  },
  alternates: {
    canonical: 'https://mikenelsonguitarlessons.co.nz/blog/pentatonic-scale-exercises',
  },
}; 