import { Metadata } from 'next';
import StrummingPattern from '@/components/rhythm/StrummingPattern';
import { GuitarStrumEngine } from '@/utils/audio/guitarStrumEngine';

export const metadata: Metadata = {
  title: 'Guitar Strumming Patterns Guide | Mike Nelson Guitar',
  description: 'Learn guitar strumming patterns with interactive audio examples. Master timing and rhythm with 10 progressive patterns from beginner to advanced.',
  keywords: 'guitar strumming patterns, guitar rhythm, learn guitar strumming, guitar timing, guitar lessons Wellington, guitar chords strumming',
      openGraph: {
      title: 'Master Guitar Strumming Patterns: Interactive Guide with Audio',
      description: 'Learn guitar strumming patterns with playable examples. Progressive lessons from basic downstrokes to advanced 16th note patterns.',
    type: 'article',
    images: [
      {
        url: '/strumming-patterns-thumbnail.svg',
        width: 1200,
        height: 630,
        alt: 'Guitar Strumming Patterns Guide'
      }
    ]
  },
  alternates: {
    canonical: 'https://mikenelsonguitarlessons.co.nz/blog/guitar-strumming-patterns',
  }
};

export default function GuitarStrummingPatternsPage() {
  const patterns = GuitarStrumEngine.PATTERNS;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Master Guitar Strumming Patterns
          </h1>
          <p className="text-xl text-gray-600 mb-6 leading-relaxed">
            The secret to solid timing and rhythm with 10 progressive patterns every guitarist needs
          </p>
          <a href="#patterns" className="inline-block bg-amber-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-amber-700 transition-colors mb-8">
            Go Straight to Strumming Patterns
          </a>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-amber-800 text-sm mb-3">
              <strong>Interactive Audio Guide:</strong> Each pattern below includes playable audio examples.
              Click the play button to hear how each pattern sounds with an Em chord.
            </p>
            <p className="text-amber-800 text-sm">
              <strong>Use the metronome</strong> to hear the pulse of each beat - especially helpful for 
              patterns that don't start on beat one.
            </p>
          </div>
        </div>

        {/* Introduction */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            The Secret to Strumming
          </h2>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              Strumming patterns are the heartbeat of guitar playing and one of the most crucial skills for 
              beginners to master. But here's the secret that many guitarists miss: <strong>great strumming 
              isn't about which strings you hit—it's about maintaining consistent hand movement.</strong>
            </p>

            <div className="bg-amber-50 border-l-4 border-amber-400 p-6 my-8">
              <h3 className="text-lg font-semibold text-amber-900 mb-3">The Golden Rule of Strumming</h3>
              <p className="text-amber-800 mb-4">
                Your strumming hand should move up and down in a steady, continuous motion, like a metronome. 
                This constant movement is what keeps you perfectly in time.
              </p>
              <p className="text-amber-800">
                The magic happens when you realize that <strong>not every movement needs to connect with the strings</strong>.
              </p>
            </div>

            <p className="text-gray-700 leading-relaxed mb-6">
              Think of it this way: every strumming pattern is built on a foundation of down-up-down-up movements. 
              Sometimes your hand moves down but doesn't touch the strings (a "ghost" downstroke), and sometimes 
              it moves up without making contact (a "ghost" upstroke). Your hand never stops its rhythmic motion—it 
              just chooses when to make sound.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mb-4">Why This Approach Works</h3>
            <ul className="space-y-2 text-gray-700 mb-6">
              <li className="flex items-start">
                <span className="text-amber-500 mr-2">•</span>
                <strong>Consistent timing: </strong>Your hand becomes a natural metronome
              </li>
              <li className="flex items-start">
                <span className="text-amber-500 mr-2">•</span>
                <strong>Easier transitions: </strong>Moving between patterns becomes seamless
              </li>
              <li className="flex items-start">
                <span className="text-amber-500 mr-2">•</span>
                <strong>Better feel: </strong>You develop an internal sense of rhythm
              </li>
              <li className="flex items-start">
                <span className="text-amber-500 mr-2">•</span>
                <strong>Faster learning: </strong>Complex patterns become combinations of simple movements
              </li>
            </ul>

            <p className="text-gray-700 leading-relaxed">
              The patterns below will teach you this fundamental concept, starting with basic movements and 
              building to more complex rhythms. Focus on keeping your hand moving constantly—that's the key 
              to mastering every strumming pattern you'll ever encounter.
            </p>
          </div>
        </div>

        {/* How to Strum */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            How to Strum: The Fundamentals
          </h2>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">
              Before diving into patterns, let's cover the essential strumming technique that will make 
              all the difference in your playing.
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-6">
              <div className="bg-amber-50 rounded-lg p-6 border border-amber-200">
                <h3 className="text-lg font-semibold text-amber-900 mb-3 flex items-center">
                  <svg className="w-6 h-6 mr-3 text-amber-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L12 20M5 13L12 20L19 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  </svg>
                  Downstrokes
                </h3>
                <ul className="space-y-2 text-sm text-amber-800">
                  <li>• <strong>Hit all strings</strong> unless specifically avoiding one (like the low E string)</li>
                  <li>• Use your wrist, not your whole arm</li>
                  <li>• Strike firmly and consistently</li>
                  <li>• These create the strong, accented beats</li>
                </ul>
              </div>

              <div className="bg-amber-50 rounded-lg p-6 border border-amber-200">
                <h3 className="text-lg font-semibold text-amber-900 mb-3 flex items-center">
                  <svg className="w-6 h-6 mr-3 text-amber-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 22L12 4M5 11L12 4L19 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  </svg>
                  Upstrokes
                </h3>
                <ul className="space-y-2 text-sm text-amber-800">
                  <li>• <strong>Often only hit 3-4 higher strings</strong> (D, G, B, high E strings)</li>
                  <li>• Lighter touch than downstrokes</li>
                  <li>• It's natural to miss some strings - this is correct!</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Why This Technique Works
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                This natural difference between downstrokes (fuller, all strings) and upstrokes (lighter, fewer strings) 
                automatically creates musical accent and rhythm. The downstrokes emphasize the strong beats (1, 3) 
                while upstrokes provide the lighter "and" beats. Don't fight this - embrace it! It's what makes 
                strumming sound musical rather than mechanical.
              </p>
            </div>
          </div>
        </div>

        {/* Beat Subdivisions Explanation */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-amber-900 mb-6">
            🎵 Understanding Beat Subdivisions
          </h2>
          
          <p className="text-amber-800 mb-4">
            Before diving into patterns, it's crucial to understand how beats are divided and how this affects your hand movement:
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-4 border border-amber-200">
              <h4 className="font-semibold text-amber-900 mb-3">8th Note Patterns (Most Common)</h4>
              <ul className="space-y-2 text-sm text-amber-800">
                <li>• Count: <strong>1 & 2 & 3 & 4 &</strong></li>
                <li>• Hand: <strong>D U D U D U D U</strong></li>
                <li>• Beats 1,2,3,4 = Downstrokes</li>
                <li>• "&" beats = Upstrokes</li>
                <li>• Used in Patterns 1-8</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-amber-200">
              <h4 className="font-semibold text-amber-900 mb-3">16th Note Patterns</h4>
              <ul className="space-y-2 text-sm text-amber-800">
                <li>• Count: <strong>1 e & a 2 e & a 3 e & a 4 e & a</strong></li>
                <li>• Hand: <strong>D U D U D U D U D U D U D U D U</strong></li>
                <li>• 1,&,2,&,3,&,4,& = Downstrokes</li>
                <li>• e,a,e,a,e,a,e,a = Upstrokes</li>
                <li>• Used in Patterns 9 & 10</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-amber-100 rounded-lg">
            <p className="text-amber-800 text-sm">
              <strong>Key Point:</strong> In 16th note patterns, the "&" beats become <strong>downstrokes</strong>, 
              not upstrokes! This is because your hand maintains its continuous down-up motion, but over faster subdivisions.
            </p>
          </div>
        </div>

        {/* Pattern 1: Basic Alternating */}
        <div className="mb-12">
          <div className="mb-6">
            <h2 id="patterns" className="text-2xl font-bold text-gray-900 mb-3">
              Pattern 1: Basic Alternating - The Foundation
            </h2>
            <p className="text-gray-600">
              Start here! This establishes the continuous down-up-down-up hand movement that forms the 
              foundation of all strumming. Your hand never stops moving - this is the core principle.
            </p>
          </div>
          <StrummingPattern pattern={patterns[1]} bpm={70} forcePercussion hideSoundModeToggle />
          

        </div>

        {/* Pattern 2: All Downstrokes */}
        <div className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Pattern 2: All Downstrokes - Ghost Upstrokes
            </h2>
            <p className="text-gray-600">
              Your hand still moves down-up-down-up, but now the upstrokes become "ghost strums" - 
              your hand moves up without hitting the strings. This creates strong downbeat emphasis.
            </p>
          </div>
          <StrummingPattern pattern={patterns[0]} bpm={60} forcePercussion hideSoundModeToggle />
          

        </div>

        {/* Pattern 3: Folk Pattern */}
        <div className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Pattern 3: Folk Pattern - Your First Real Pattern
            </h2>
            <p className="text-gray-600">
              This classic folk/country pattern introduces the concept of "missing" strums. Your hand still 
              moves down-up-down-up, but some movements don't hit the strings.
            </p>
          </div>
          <StrummingPattern pattern={patterns[2]} bpm={100} forcePercussion hideSoundModeToggle />
          

        </div>

        {/* Pattern 4: Popular/Rock */}
        <div className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Pattern 4: Skipping an Up and a Down
            </h2>
            <p className="text-gray-600">
              This pattern is everywhere in pop and rock music! It has a distinctive rhythm that's both 
              driving and musical. Notice the double upstroke that gives it character.
            </p>
          </div>
          <StrummingPattern pattern={patterns[3]} bpm={120} forcePercussion hideSoundModeToggle />
          

        </div>

        {/* Pattern 5: Skip the Down */}
        <div className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Pattern 5: Skip the Down
            </h2>
            <p className="text-gray-600">
              This pattern creates a unique syncopated feel by skipping the downstroke on beat 2. 
              Your hand still moves down, but doesn't hit the strings - it's a ghost strum!
            </p>
          </div>
          <StrummingPattern pattern={patterns[5]} bpm={100} forcePercussion hideSoundModeToggle />
          

        </div>

        {/* Pattern 6: Down Beats and Syncopated Ending */}
        <div className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Pattern 6: Down Beats and Syncopated Ending
            </h2>
            <p className="text-gray-600">
              This pattern emphasizes the strong downbeats (1 and 2) with a syncopated ending that 
              creates forward momentum. Great for driving rock and pop songs.
            </p>
          </div>
          <StrummingPattern pattern={patterns[6]} bpm={150} forcePercussion hideSoundModeToggle />
          

        </div>

        {/* Pattern 7: Upstroke Emphasis */}
        <div className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Pattern 7: Upstroke Emphasis
            </h2>
            <p className="text-gray-600">
              This syncopated pattern heavily features upstrokes, creating a lighter, more flowing 
              feel. The emphasis on off-beats gives it a distinctive rhythmic character.
            </p>
          </div>
          <StrummingPattern pattern={patterns[7]} bpm={120} forcePercussion hideSoundModeToggle />
          

        </div>

        {/* Pattern 8: Skank Pattern */}
        <div className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Pattern 8: Skank Pattern
            </h2>
            <p className="text-gray-600">
              The classic skank rhythm emphasizes beats 2 and 4 along with their off-beats. 
              This creates a distinctive rhythmic feel used in ska, reggae, and punk music.
            </p>
          </div>
          <StrummingPattern pattern={patterns[8]} bpm={150} forcePercussion hideSoundModeToggle />
          

        </div>

        {/* Pattern 9: 16th Note Pattern */}
        <div className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Pattern 9: 16th Note Pattern
            </h2>
            <p className="text-gray-600">
              Ready for a challenge? This pattern uses 16th note subdivisions. Each beat is divided into 
              four parts: "1-e-&-a". This creates a more complex, flowing rhythm.
            </p>
          </div>
          <StrummingPattern pattern={patterns[4]} bpm={60} />
          

        </div>

        {/* Pattern 10: Funk 16th Note Pattern */}
        <div className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Pattern 10: Funk 16th Note Pattern
            </h2>
            <p className="text-gray-600">
              This advanced funk pattern uses complex 16th note syncopation. It's all about the groove - 
              the strategic placement of strums and ghost strums creates that infectious funk rhythm.
            </p>
          </div>
          <StrummingPattern pattern={patterns[9]} bpm={120} />
          

        </div>

        {/* Common Mistakes */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Common Mistakes to Avoid
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <span className="text-red-500 text-xl">❌</span>
              <div>
                <h4 className="font-semibold text-gray-900">Stopping hand movement</h4>
                <p className="text-gray-700 text-sm">Your hand should never stop moving, even when not hitting strings</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <span className="text-red-500 text-xl">❌</span>
              <div>
                <h4 className="font-semibold text-gray-900">Tense arm/wrist</h4>
                <p className="text-gray-700 text-sm">Keep your wrist relaxed - tension kills rhythm and causes fatigue</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <span className="text-red-500 text-xl">❌</span>
              <div>
                <h4 className="font-semibold text-gray-900">Rushing the tempo</h4>
                <p className="text-gray-700 text-sm">Start slow and gradually increase speed - accuracy before speed</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <span className="text-red-500 text-xl">❌</span>
              <div>
                <h4 className="font-semibold text-gray-900">Heavy upstrokes</h4>
                <p className="text-gray-700 text-sm">Upstrokes should be lighter and often hit fewer strings</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <span className="text-red-500 text-xl">❌</span>
              <div>
                <h4 className="font-semibold text-gray-900">Picking too hard (digging into strings)</h4>
                <p className="text-gray-700 text-sm">Use a lighter touch - let the pick glide across the strings rather than digging in</p>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-amber-900 mb-6">
            Ready for Your Next Challenge?
          </h2>
          
          <p className="text-amber-800 mb-6">
            Once you've mastered these strumming patterns, you're ready to tackle full songs and more 
            advanced techniques. These patterns form the foundation for most of popular music!
          </p>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <span className="text-amber-500">🎸</span>
              <span className="text-amber-800">Apply these patterns to your favorite songs</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-amber-500">📚</span>
              <span className="text-amber-800">Learn more chord progressions to practice with</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-amber-500">🎵</span>
              <span className="text-amber-800">Experiment with dynamics and expression</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-amber-500">🤝</span>
              <span className="text-amber-800">Play along with other musicians</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 