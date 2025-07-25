'use client';

import AlphaTabPlayerCDN from '@/components/AlphaTabPlayerCDN';

export default function PickingFingerExercisesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <div className="container mx-auto px-4 py-12">
        <article className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          {/* Header */}
          <header className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-amber-900 mb-4">
              Picking and Finger Exercises
            </h1>
            <div className="inline-block mb-4 px-4 py-1 rounded-full bg-amber-100 text-amber-800 text-base font-semibold tracking-wide">
              Skill Level: Beginner – Advanced
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Master finger independence, string navigation, and alternate picking with focused chromatic exercises. These exercises target non-sequential finger patterns, string skipping, and precise fret-hand coordination—essential skills for advanced guitar technique.
            </p>
          </header>

          {/* Introduction */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-amber-900 mb-4">
              Why Practice Chromatic Finger Exercises?
            </h2>
            <div className="prose prose-lg text-gray-700 space-y-4">
              <p>
                Most guitarists practice finger exercises in predictable patterns: 1-2-3-4 or 4-3-2-1. While these are valuable, real music demands more complex finger combinations and string movements. These chromatic exercises break you out of sequential patterns and develop true finger independence.
              </p>
              <h3 className="text-xl font-semibold text-amber-800 mb-3">Key Benefits:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Finger Independence:</strong> Use all fingers in non-sequential patterns (1-4-2-3, 2-4-1-3, etc.)</li>
                <li><strong>String Navigation:</strong> Practice moving between adjacent strings and string skipping</li>
                <li><strong>Alternate Picking:</strong> Develop consistent down-up picking patterns across all strings</li>
                <li><strong>Fret-Hand Coordination:</strong> Improve synchronization between fretting and picking hands</li>
                <li><strong>Musical Application:</strong> Build technique that translates directly to real songs and solos</li>
              </ul>
            </div>
          </section>

          {/* Tab Player */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-amber-900 mb-6">
              Interactive Tab Player
            </h2>
            <p className="text-gray-600 mb-6">
              Use the dropdown below to select and practice each of the 10 chromatic finger exercises.<br/>
              <span className="text-amber-700">Start slow and focus on clean fretting, consistent picking, and smooth string transitions. Each exercise targets different finger combinations and string patterns.</span>
            </p>
            <div className="mb-4 p-3 bg-amber-100 border-l-4 border-amber-400 rounded text-amber-900 text-sm">
              <strong>Important:</strong> These exercises use <strong>strict alternate picking</strong> (down-up-down-up). Start at slow tempos to ensure clean execution. You can also practice these exercises using hammer-ons and pull-offs for legato technique - just pick the first note and each time you change strings. However, the main focus is developing picking precision and finger independence.
            </div>
            <AlphaTabPlayerCDN key="finger-exercises-player" containerId="finger-exercises-alphatab-container" showSlursAndSlides={false} />
          </section>

          {/* Practice Guidelines */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-amber-900 mb-4">Practice Guidelines</h2>
            <div className="bg-amber-50 rounded-lg p-4 mb-4">
              <p className="text-gray-700 mb-3">Start at 60 BPM. Focus on accuracy before speed. See <a href="/blog/essential-practice-tips" className="underline text-amber-700">Essential Practice Tips</a> for more strategies.</p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Strict alternate picking (down-up-down-up)</li>
                <li>• Clean fretting with no buzzing</li>
                <li>• Keep unused fingers relaxed</li>
                <li>• Target strings precisely during skips</li>
              </ul>
            </div>
          </section>





          {/* Next Steps */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-amber-900 mb-4">Next Steps</h2>
            <div className="bg-amber-50 rounded-lg p-4">
              <ul className="text-sm text-amber-800 space-y-1 mb-3">
                <li>• Practice at different positions up and down the neck</li>
                <li>• Apply patterns to scales and arpeggios</li>
                <li>• Use in real musical contexts</li>
              </ul>
              <p className="text-sm text-amber-700">
                Continue with <a href="/blog/guitar-arpeggios-exercises" className="underline">Arpeggio Exercises</a> and <a href="/blog/pentatonic-scale-exercises" className="underline">Pentatonic Scale Exercises</a> to apply these skills.
              </p>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}

 