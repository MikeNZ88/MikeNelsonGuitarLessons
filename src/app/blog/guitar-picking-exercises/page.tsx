import AlphaTabPlayerCDN from '@/components/AlphaTabPlayerCDN';

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
            <div className="mt-4 text-sm text-gray-500">
              Published on {new Date().toLocaleDateString()} | 8 min read
            </div>
          </header>

          {/* Introduction */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Why Pentatonic Scales Are Perfect for Picking Practice
            </h2>
            <div className="prose prose-lg text-gray-700 space-y-4">
              <p>
                The pentatonic scale is the backbone of rock, blues, and countless other musical styles. 
                But beyond its musical applications, it's also the perfect vehicle for developing picking technique. 
                Here's why:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Familiar patterns:</strong> Most guitarists already know basic pentatonic shapes</li>
                <li><strong>String crossing:</strong> Natural opportunities to practice crossing between strings</li>
                <li><strong>Position playing:</strong> Develops fretboard knowledge while improving technique</li>
                <li><strong>Musical context:</strong> Every exercise sounds musical, not just mechanical</li>
                <li><strong>Scalable difficulty:</strong> Works for beginners through advanced players</li>
              </ul>
            </div>
          </section>

          {/* Interactive Exercise Player */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              🎸 Interactive Exercise Player
            </h2>
            <p className="text-gray-600 mb-6">
              Use the dropdown below to select and practice different pentatonic exercises. Each exercise includes 
              professional tablature, audio playback, and detailed practice guidance.
            </p>
            
            <AlphaTabPlayerCDN key={Date.now()} />
          </section>

          {/* Practice Methodology */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              📚 Practice Methodology
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">⏰ Daily Practice Routine</h3>
                <ol className="list-decimal pl-6 space-y-2 text-gray-700">
                  <li>Warm up with slow, clean playing (5 minutes)</li>
                  <li>Work on one exercise at comfortable tempo (10 minutes)</li>
                  <li>Gradually increase tempo by 5-10 BPM (10 minutes)</li>
                  <li>Practice transitions between exercises (5 minutes)</li>
                  <li>Cool down with musical improvisation (5 minutes)</li>
                </ol>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">🎯 Goals and Milestones</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li><strong>Week 1-2:</strong> Master exercises at 80 BPM</li>
                  <li><strong>Week 3-4:</strong> Comfortable at 100 BPM</li>
                  <li><strong>Week 5-6:</strong> Clean execution at 120 BPM</li>
                  <li><strong>Week 7-8:</strong> Musical expression at 140+ BPM</li>
                  <li><strong>Advanced:</strong> Apply techniques to improvisation</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Technical Tips */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              🔧 Technical Tips for Success
            </h2>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-lg font-semibold mb-2">Pick Grip and Angle</h3>
                <p className="text-gray-700">
                  Hold the pick firmly but not rigidly. The tip should extend about 2-3mm from your fingers. 
                  Angle the pick slightly downward for a more controlled attack, especially during fast passages.
                </p>
              </div>
              
              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="text-lg font-semibold mb-2">Wrist vs. Arm Motion</h3>
                <p className="text-gray-700">
                  For these tempos, focus on wrist motion rather than arm motion. Your wrist should be the 
                  primary source of picking motion, with minimal arm movement. This allows for greater 
                  precision and reduced fatigue.
                </p>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="text-lg font-semibold mb-2">String Muting</h3>
                <p className="text-gray-700">
                  Use both your fretting hand and picking hand to mute unwanted string noise. 
                  The palm of your picking hand should lightly touch the strings behind the bridge, 
                  while unused fingers of your fretting hand should touch adjacent strings.
                </p>
              </div>

              <div className="border-l-4 border-yellow-500 pl-6">
                <h3 className="text-lg font-semibold mb-2">Metronome Practice</h3>
                <p className="text-gray-700">
                  Always practice with a metronome, even when using the audio playback. Start slow enough 
                  that you can play perfectly, then gradually increase the tempo. Consistency is more 
                  important than speed.
                </p>
              </div>
            </div>
          </section>

          {/* Exercise Progression */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              📈 Exercise Progression Guide
            </h2>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Recommended Practice Order:</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-semibold">1</span>
                  <span><strong>Ascending Pattern 16th Notes</strong> - Build your foundation with strict alternate picking</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-semibold">2</span>
                  <span><strong>Descending Pattern 16th Notes</strong> - Master the reverse direction</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-semibold">3</span>
                  <span><strong>Descending Pattern Eighth Note Triplets (Partial Legato)</strong> - Add rhythmic complexity with legato</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-semibold">4</span>
                  <span><strong>Descending Pattern 16th Notes (Hammer-ons & Pull-offs)</strong> - Master pure legato technique</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-semibold">5</span>
                  <span><strong>Descending Pattern 16th Note Triplets (Partial Legato)</strong> - Combine legato with triplets</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-semibold">6</span>
                  <span><strong>Descending Pattern 16th Note Triplets (Alternate Picking)</strong> - Master fast triplet picking</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-semibold">7</span>
                  <span><strong>Ascending Pattern 16th Note Triplets</strong> - Advanced triplet variation</span>
                </div>
              </div>
            </div>
          </section>

          {/* Next Steps */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              🚀 Next Steps in Your Picking Journey
            </h2>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-4">
                Once you've mastered these pentatonic exercises, you'll have built a solid foundation for:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Exploring other scale patterns (major scales, modes, exotic scales)</li>
                <li>Developing sweep picking and economy picking techniques</li>
                <li>Creating your own practice exercises and variations</li>
                <li>Applying these techniques to real musical situations</li>
                <li>Building repertoire with picking-focused pieces</li>
              </ul>
              <div className="mt-6 p-4 bg-white rounded border-l-4 border-indigo-500">
                <p className="font-semibold text-indigo-800">
                  Remember: Consistent daily practice with focused attention beats sporadic long sessions. 
                  Quality over quantity!
                </p>
              </div>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
} 