import AlphaTabPlayerCDN from '@/components/AlphaTabPlayerCDN';
import { Metadata } from 'next';

export default function GuitarArpeggiosExercisesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <div className="container mx-auto px-4 py-12">
        <article className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          {/* Header */}
          <header className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-amber-900 mb-4">
              Guitar Arpeggio Exercises
            </h1>
            <div className="inline-block mb-4 px-4 py-1 rounded-full bg-amber-100 text-amber-800 text-base font-semibold tracking-wide">
              Skill Level: Intermediate – Advanced
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Master arpeggios across the fretboard with focused exercises for major, minor, dominant, diminished, and more. Practice with interactive tabs, audio playback, and clear practice tips—perfect for building fretboard knowledge, finger independence, and musical fluency.
            </p>
          </header>

          {/* Introduction */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-amber-900 mb-4">
              Why Practice Guitar Arpeggios?
            </h2>
            <div className="prose prose-lg text-gray-700 space-y-4">
              <p>
                Arpeggios are the backbone of lead guitar, improvisation, and chord-based soloing. They help you visualize chord tones, connect scale shapes, and create melodic lines that outline harmony.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Fretboard mastery:</strong> Learn to see chord shapes and intervals everywhere</li>
                <li><strong>Improvisation:</strong> Target chord tones for more musical solos</li>
                <li><strong>Technique:</strong> Improve finger independence, string skipping, and sweep picking</li>
                <li><strong>Composition:</strong> Write stronger melodies and fills</li>
              </ul>
            </div>
          </section>

          {/* Tab Player */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-amber-900 mb-6">
              Arpeggio Tab Player
            </h2>
            <p className="text-gray-600 mb-6">
              Use the dropdown below to select and practice different arpeggio types and patterns.<br/>
              <span className="text-amber-700">Focus on clean transitions, even timing, and visualizing the chord shape as you play each arpeggio.</span>
            </p>
            <div className="mb-4 p-3 bg-amber-100 border-l-4 border-amber-400 rounded text-amber-900 text-sm">
              <strong>Note:</strong> All examples use arpeggios with the root note <strong>C</strong>. You can transpose these by moving the arpeggio up or down the neck—e.g., move Cmaj7 up 2 frets and it becomes Dmaj7. For the three-octave arpeggios, the tab highlights each C note so you can clearly see where each octave begins and ends. Practicing these arpeggios in smaller sections ("chunks") as well as the full pattern is highly effective—each octave is a useful arpeggio shape on its own and worth memorizing. The last two examples show a pattern of multiple arpeggios in one key (C major); these arpeggios are built from the C major scale. For more, see <a href="/blog/what-is-a-chord" className="underline text-amber-700 hover:text-amber-900">What is a Chord?</a> and <a href="/blog/key-chords-explorer" className="underline text-amber-700 hover:text-amber-900">Chords in Every Key</a>.
            </div>
            <AlphaTabPlayerCDN key={Date.now()} containerId="arpeggio-alphatab-container" showSlursAndSlides={false} />
          </section>

          {/* How to Practice */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-amber-900 mb-6">How to Practice Arpeggios</h2>
            <p className="mb-4 text-gray-700">
              The examples start at <strong>40 BPM</strong>. Start slow and focus on accuracy, finger placement, and smooth string transitions. Gradually increase the tempo as you gain confidence. For more on effective practice, see <a href="/blog/essential-practice-tips" className="underline text-amber-700 hover:text-amber-900">6 Essential Practice Tips for Guitar Students</a>.
            </p>
            <div className="bg-amber-50 border-l-4 border-amber-400 rounded p-4 mb-4">
              <h3 className="text-lg font-semibold text-amber-900 mb-2">Arpeggio Practice Tips</h3>
              <ul className="list-disc pl-6 space-y-1 text-amber-800">
                <li>Say the chord type out loud as you play ("C major seven", "C minor seven flat five", etc.)</li>
                <li>Visualize the chord shape on the fretboard</li>
                <li>Use alternate picking, sweep picking, or hybrid picking as appropriate</li>
                <li>Practice both ascending and descending patterns</li>
                <li>Apply arpeggios to real chord progressions and songs</li>
              </ul>
            </div>
          </section>

          {/* Next Steps */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-amber-900 mb-6">Next Steps in Your Arpeggio Journey</h2>
            <ul className="list-disc pl-6 space-y-2 text-amber-800 mb-4">
              <li>Explore arpeggios in other keys and positions</li>
              <li>Combine arpeggios with scale runs and licks</li>
              <li>Practice arpeggios over backing tracks and chord progressions</li>
              <li>Learn arpeggios for extended chords (9th, 11th, 13th)</li>
              <li>Apply arpeggios to improvisation and songwriting</li>
            </ul>
            <div className="mb-4 text-gray-800">
              <strong>Unlock More with the <a href="/blog/scale-explorer-tool" className="underline text-amber-700 hover:text-amber-900">Scale Explorer Tool</a>:</strong> The Scale Explorer lets you visualize fretboard diagrams for chords and arpeggios generated from a wide variety of scales—not just the basics. Use it to discover new arpeggio shapes, experiment with unusual scales, and create your own unique fingerings and patterns. It's a powerful way to expand your fretboard knowledge and develop your own musical voice.
            </div>
            <span className="text-amber-700 mb-8 block">
              Remember: Consistent, focused practice is the key to mastering arpeggios and unlocking new creative possibilities on the guitar!
            </span>
          </section>
        </article>
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: 'Guitar Arpeggio Exercises | Mike Nelson Guitar Lessons',
  description: 'Master arpeggios across the fretboard with focused exercises for major, minor, dominant, and diminished chords. Practice with interactive tabs.',
  alternates: {
    canonical: 'https://mikenelsonguitarlessons.co.nz/blog/guitar-arpeggios-exercises/',
  },
  openGraph: {
    title: 'Guitar Arpeggio Exercises',
    description: 'Master arpeggios across the fretboard with focused exercises for major, minor, dominant, and diminished chords. Practice with interactive tabs.',
    images: [{
      url: 'https://mikenelsonguitarlessons.co.nz/mike-nelson-guitar-logo.jpg',
      width: 1200,
      height: 630,
      alt: 'Guitar Arpeggios Exercises'
    }],
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Guitar Arpeggio Exercises',
    description: 'Master arpeggios across the fretboard with focused exercises for major, minor, dominant, and diminished chords. Practice with interactive tabs.',
          images: [{
        url: '/arpeggio-social.jpg',
        width: 1200,
        height: 662,
        alt: 'Guitar Arpeggios Exercises'
      }],
  },
}; 