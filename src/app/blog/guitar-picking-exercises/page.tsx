import AlphaTabPlayerCDN from '@/components/AlphaTabPlayerCDN';
import { Metadata } from 'next';



export default function GuitarPickingExercisesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <div className="container mx-auto px-4 py-12">
        <article className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          {/* Header */}
          <header className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Master Guitar Picking with Pentatonic Scale Exercises
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Develop precision, speed, and musical expression through focused pentatonic scale exercises. 
              These progressive exercises will transform your picking technique and fretboard knowledge.
            </p>
          </header>

          {/* Introduction */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
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

          {/* Interactive Exercise Player */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Interactive Exercise Player
            </h2>
            <p className="text-gray-600 mb-6">
              Use the dropdown below to select and practice different pentatonic exercises. Each exercise includes 
              professional tablature, audio playback, and detailed practice guidance.
            </p>
            
            <AlphaTabPlayerCDN key={Date.now()} />
          </section>

          {/* How to Practice */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-amber-800 mb-6">How to Practice</h2>
            <p className="mb-4 text-gray-700">
              The examples start at <strong>40 BPM</strong>. You can slow them down if you need to. Start at a speed that you can play the exercise comfortably and cleanly. Increase the tempo by 5–10 BPM at a time and stay at that speed until you can play it comfortably and cleanly. The 40 BPM point is suggested for beginners, but experienced players may wish to start at a higher tempo.
            </p>
          </section>

          {/* Next Steps */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-amber-800 mb-6">Next Steps in Your Picking Journey</h2>
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
  title: 'Essential Guitar Picking Exercises | Mike Nelson Guitar Lessons',
  description: 'Master guitar picking technique with progressive exercises featuring interactive tablature, audio playback, and expert practice tips.',
  keywords: 'guitar picking exercises, picking technique, pentatonic scale, guitar practice, alternate picking, legato, guitar lessons',
  openGraph: {
    title: 'Essential Guitar Picking Exercises',
    description: 'Master guitar picking technique with progressive exercises featuring interactive tablature, audio playback, and expert practice tips.',
    images: [
      {
        url: '/guitar-picking-exercises-thumbnail.png',
        width: 1200,
        height: 630,
        alt: 'Essential Guitar Picking Exercises Thumbnail',
      },
    ],
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Essential Guitar Picking Exercises',
    description: 'Master guitar picking technique with progressive exercises featuring interactive tablature, audio playback, and expert practice tips.',
    images: ['/guitar-picking-exercises-thumbnail.png'],
  },
}; 