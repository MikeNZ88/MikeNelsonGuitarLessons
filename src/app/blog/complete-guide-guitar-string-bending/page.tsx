import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Music, Award, Target, Zap, Heart } from 'lucide-react';
import AlphaTabPlayerCDN from '@/components/AlphaTabPlayerCDN';

export const metadata: Metadata = {
  title: 'The Complete Guide to Guitar String Bending: Master the Art of Expressive Playing | Mike Nelson Guitar Lessons',
  description: 'Master guitar string bending with this comprehensive guide. Learn proper technique, build finger strength, develop pitch accuracy, and add emotion to your playing with interactive exercises and tab players.',
  keywords: "guitar string bending, bending technique, guitar bends, pitch accuracy, finger strength, blues bending, rock bending, guitar exercises, bending exercises, guitar technique, expressive playing",
  openGraph: {
    title: 'The Complete Guide to Guitar String Bending: Master the Art of Expressive Playing',
    description: 'Master guitar string bending with this comprehensive guide. Learn proper technique, build finger strength, develop pitch accuracy, and add emotion to your playing with interactive exercises and tab players.',
    type: 'article',
    url: 'https://mikenelsonguitarlessons.co.nz/blog/complete-guide-guitar-string-bending',
    images: [
      {
        url: 'https://mikenelsonguitarlessons.co.nz/guitar-bending-guide-thumbnail.webp',
        width: 1200,
        height: 630,
        alt: 'Complete Guide to Guitar String Bending - Master Expressive Playing',
      }
    ],
  },
  alternates: {
    canonical: 'https://mikenelsonguitarlessons.co.nz/blog/complete-guide-guitar-string-bending',
  },
};

export default function StringBendingGuide() {
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
              The Complete Guide to Guitar String Bending
            </h1>
            
            <p className="text-xl text-amber-200 mb-6">
              Master the art of expressive playing with comprehensive technique, exercises, and interactive tab players
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Music className="w-4 h-4" />
                <span>Interactive Exercises</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4" />
                <span>Pitch Accuracy Training</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                <span>Advanced Techniques</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Navigation Menu */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h3 className="text-xl font-bold text-amber-800 mb-4">Table of Contents</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <a href="#what-is-bending" className="block text-amber-700 hover:text-amber-900 transition-colors">• What is String Bending?</a>
                <a href="#types-of-bends" className="block text-amber-700 hover:text-amber-900 transition-colors">• Types of Bends</a>
                <a href="#bending-direction" className="block text-amber-700 hover:text-amber-900 transition-colors">• Bending Direction Guide</a>
                <a href="#proper-technique" className="block text-amber-700 hover:text-amber-900 transition-colors">• Proper Bending Technique</a>
              </div>
              <div className="space-y-2">
                <a href="#vibrato-technique" className="block text-amber-700 hover:text-amber-900 transition-colors">• Vibrato Technique</a>
                <a href="#interactive-exercises" className="block text-amber-700 hover:text-amber-900 transition-colors">• Interactive Bending Exercises</a>
                <a href="#pitch-accuracy" className="block text-amber-700 hover:text-amber-900 transition-colors">• Pitch Accuracy Training</a>
              </div>
            </div>
          </div>

          {/* Introduction */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <p className="text-lg text-amber-700 leading-relaxed mb-6">
              String bending is one of the most expressive techniques in guitar playing, allowing you to add emotion, soul, and vocal-like qualities to your playing. Whether you're playing blues, rock, country, or jazz, mastering string bending will take your guitar skills to the next level.
            </p>
          </div>

          {/* What is String Bending */}
          <div id="what-is-bending" className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-3xl font-bold text-amber-800 mb-6">What is String Bending?</h2>
            <p className="text-amber-700 leading-relaxed mb-4">
              String bending involves pushing or pulling a guitar string across the fretboard to raise its pitch. This technique mimics the human voice's ability to slide between notes and adds incredible expressiveness to your playing.
            </p>
            <p className="text-amber-700 leading-relaxed">
              When you bend a string, you're essentially stretching it to increase its tension, which raises the pitch. This creates a smooth, vocal-like transition between notes that's impossible to achieve with just fretting.
            </p>
          </div>

          {/* Types of Bends */}
          <div id="types-of-bends" className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-3xl font-bold text-amber-800 mb-6">Types of Bends</h2>
            
                     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
           {/* Basic Pitch Bends */}
           <div className="bg-amber-50 p-6 rounded-lg">
             <h3 className="text-lg font-bold text-amber-800 mb-4 border-b-2 border-amber-200 pb-2">Bend Amount</h3>
             <div className="space-y-3">
               <div>
                 <h4 className="font-semibold text-amber-700">Quarter-Tone Bend (Microbend)</h4>
                 <p className="text-sm text-amber-600">Subtle pitch raise, adds blues "dirt" and expression</p>
               </div>
               <div>
                 <h4 className="font-semibold text-amber-700">Half-Step Bend (Semitone)</h4>
                 <p className="text-sm text-amber-600">Raises pitch by one fret, most common and easiest to control</p>
               </div>
               <div>
                 <h4 className="font-semibold text-amber-700">Whole-Step Bend (Full Tone)</h4>
                 <p className="text-sm text-amber-600">Raises pitch by two frets, most frequently used in lead guitar</p>
               </div>
               <div>
                 <h4 className="font-semibold text-amber-700">Step-and-a-Half Bend</h4>
                 <p className="text-sm text-amber-600">Raises pitch by three frets, challenging but powerful</p>
               </div>
             </div>
           </div>

           {/* Release & Motion Techniques */}
           <div className="bg-amber-50 p-6 rounded-lg">
             <h3 className="text-lg font-bold text-amber-800 mb-4 border-b-2 border-amber-200 pb-2">Release & Motion Techniques</h3>
             <div className="space-y-3">
               <div>
                 <h4 className="font-semibold text-amber-700">Bend and Release</h4>
                 <p className="text-sm text-amber-600">Bend up to target pitch, then release smoothly back to original note</p>
               </div>
               <div>
                 <h4 className="font-semibold text-amber-700">Pre-bend</h4>
                 <p className="text-sm text-amber-600">Silently bend string first, then pick for instant target pitch</p>
               </div>
               <div>
                 <h4 className="font-semibold text-amber-700">Pre-bend and Release</h4>
                 <p className="text-sm text-amber-600">Pre-bend silently, pick at target pitch, then release down</p>
               </div>
               <div>
                 <h4 className="font-semibold text-amber-700">Bend with Vibrato</h4>
                 <p className="text-sm text-amber-600">Hold the bend at target pitch while adding vibrato for sustain</p>
               </div>
             </div>
           </div>

           {/* Multi-String Techniques */}
           <div className="bg-amber-50 p-6 rounded-lg">
             <h3 className="text-lg font-bold text-amber-800 mb-4 border-b-2 border-amber-200 pb-2">Multi-String Techniques</h3>
             <div className="space-y-3">
               <div>
                 <h4 className="font-semibold text-amber-700">Unison Bends</h4>
                 <p className="text-sm text-amber-600">Play fretted note on one string, bend adjacent string to match pitch</p>
               </div>
               <div>
                 <h4 className="font-semibold text-amber-700">Parallel Bends</h4>
                 <p className="text-sm text-amber-600">Bend multiple strings simultaneously for thick, harmonized sound</p>
               </div>
               <div>
                 <h4 className="font-semibold text-amber-700">Double Stop Bends</h4>
                 <p className="text-sm text-amber-600">Bend two strings together while maintaining their harmonic relationship</p>
               </div>
             </div>
           </div>
         </div>
            

          </div>

          {/* Bending Direction Guide */}
          <div id="bending-direction" className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-3xl font-bold text-amber-800 mb-6">Bending Direction Guide</h2>
            
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-4 rounded-lg text-center">
                <h3 className="font-bold text-amber-800 mb-2">High Strings</h3>
                <p className="text-sm text-amber-700 mb-2">E (1st) & B (2nd)</p>
                <p className="text-amber-600 font-semibold">Push UP ↑</p>
                <p className="text-xs text-amber-600 italic mt-1">Toward ceiling</p>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg text-center">
                <h3 className="font-bold text-green-800 mb-2">Middle Strings</h3>
                <p className="text-sm text-green-700 mb-2">G (3rd) & D (4th)</p>
                <p className="text-green-600 font-semibold">Either Direction</p>
                <p className="text-xs text-green-600 italic mt-1">Player preference</p>
              </div>
              
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg text-center">
                <h3 className="font-bold text-orange-800 mb-2">Low Strings</h3>
                <p className="text-sm text-orange-700 mb-2">A (5th) & E (6th)</p>
                <p className="text-orange-600 font-semibold">Pull DOWN ↓</p>
                <p className="text-xs text-orange-600 italic mt-1">Toward floor</p>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-amber-800 mb-4 text-center">Finger Guide</h3>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg text-center">
                <h4 className="font-bold text-blue-800 mb-2">1st Finger</h4>
                <p className="text-blue-600 font-semibold">Mostly Downward</p>
                <p className="text-xs text-blue-600 italic mt-1">Can't use other fingers for support</p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg text-center">
                <h4 className="font-bold text-purple-800 mb-2">2nd Finger</h4>
                <p className="text-purple-600 font-semibold">Both Directions</p>
                <p className="text-xs text-purple-600 italic mt-1">Support with 1st finger</p>
              </div>
              
              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-4 rounded-lg text-center">
                <h4 className="font-bold text-indigo-800 mb-2">3rd Finger</h4>
                <p className="text-indigo-600 font-semibold">Both Directions</p>
                <p className="text-xs text-indigo-600 italic mt-1">Support with 1st & 2nd fingers</p>
              </div>
              
              <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-4 rounded-lg text-center">
                <h4 className="font-bold text-teal-800 mb-2">4th Finger</h4>
                <p className="text-teal-600 font-semibold">Both Directions</p>
                <p className="text-xs text-teal-600 italic mt-1">Support with 1st, 2nd & 3rd fingers</p>
              </div>
            </div>
          </div>

          {/* Proper Bending Technique */}
          <div id="proper-technique" className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-3xl font-bold text-amber-800 mb-6">Proper Bending Technique</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-amber-800 mb-4">Essential Setup</h3>
                <ul className="space-y-3 text-amber-700">
                  <li><strong>Thumb Position:</strong> Place thumb on back of neck (traditional) or wrap over top (thumb-over technique) for support</li>
                  <li><strong>Finger Support:</strong> Always back up your bending finger with fingers behind it to distribute force and prevent injury</li>
                  <li><strong>Hand & Arm:</strong> Use your entire hand and forearm to generate bending force, not just fingers. Keep wrist neutral</li>
                  <li><strong>String Muting:</strong> Use unused fretting fingers to lightly touch adjacent strings, and rest your picking hand palm on the bridge to control sympathetic vibrations</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-amber-800 mb-4">Execution & Control</h3>
                <ul className="space-y-3 text-amber-700">
                  <li><strong>Smooth Motion:</strong> Execute bends as one continuous, controlled movement - avoid jerky or hesitant motions</li>
                  <li><strong>Controlled Release:</strong> The release should be just as smooth and controlled as the initial bend</li>
                  <li><strong>Pitch Accuracy:</strong> Train your ear by practicing target pitches and checking accuracy with reference notes</li>
                  <li><strong>Direction:</strong> Follow the Bending Direction Guide above for proper push/pull technique</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500 mt-6">
              <h3 className="font-bold text-red-800 mb-3">Common Mistakes to Avoid</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <ul className="text-red-700 space-y-1 text-sm">
                  <li>• Using only finger strength</li>
                  <li>• Excessive wrist movement</li>
                  <li>• Not supporting bending finger</li>
                  <li>• Wrong bending direction</li>
                </ul>
                <ul className="text-red-700 space-y-1 text-sm">
                  <li>• Inconsistent pitch accuracy</li>
                  <li>• Abrupt or uncontrolled releases</li>
                  <li>• Poor timing in musical context</li>
                  <li>• Unwanted string noise</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Vibrato Technique Section */}
          <div id="vibrato-technique" className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-3xl font-bold text-amber-800 mb-6">Vibrato Technique</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-amber-800 mb-4">What is Vibrato?</h3>
                <p className="text-amber-700 mb-4">
                  Vibrato is a controlled oscillation of pitch that adds warmth, expression, and sustain to bent notes. 
                  It's created by repeatedly and subtly bending and releasing the string, varying the pitch above and below the target note.
                </p>
                
                <h3 className="text-xl font-bold text-amber-800 mb-4">Vibrato Motion</h3>
                <ul className="space-y-3 text-amber-700">
                  <li><strong>Wrist-Based:</strong> Use gentle wrist rotation rather than finger movement alone</li>
                  <li><strong>Consistent Speed:</strong> Maintain steady, even oscillations - typically 4-6 cycles per second</li>
                  <li><strong>Controlled Width:</strong> Keep pitch variations subtle, usually within a quarter-tone range</li>
                  <li><strong>Smooth Transitions:</strong> Start and end vibrato gradually, not abruptly</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-amber-800 mb-4">Application Tips</h3>
                <ul className="space-y-3 text-amber-700">
                  <li><strong>After the Bend:</strong> Apply vibrato once you've reached the target pitch</li>
                  <li><strong>Sustain Enhancement:</strong> Use vibrato to maintain interest on longer held notes</li>
                  <li><strong>Musical Context:</strong> Adjust vibrato speed and width to match the musical style</li>
                  <li><strong>Practice Slowly:</strong> Start with slow, exaggerated vibrato before developing subtlety</li>
                </ul>
                
                <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-500 mt-6">
                  <h4 className="font-bold text-amber-800 mb-2">Practice Method</h4>
                  <p className="text-amber-700 text-sm">
                    Practice vibrato separately from bending first. Fret a note normally, then add vibrato without changing the pitch. 
                    Once comfortable, combine with bends.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Exercises Section */}
          <div id="interactive-exercises" className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-3xl font-bold text-amber-800 mb-6 flex items-center">
              <Music className="w-8 h-8 mr-3 text-amber-600" />
              Interactive Bending Exercises
            </h2>
            
            <p className="text-amber-700 mb-6">
              Use the interactive tab player below to practice these essential bending exercises. Each exercise focuses on different aspects of string bending technique.
            </p>
            
            <div className="bg-amber-50 p-6 rounded-lg mb-6">
              <h3 className="font-bold text-amber-800 mb-3">How to Use These Exercises</h3>
              <ul className="text-amber-700 space-y-2">
                <li>• Begin with basic bends, then progress through vibrato, release techniques, and multi-string combinations</li>
                <li>• Most exercises use the 3rd finger to bend - practice with your 4th finger as well for variety</li>
                <li>• The last two exercises use your 1st and 2nd fingers</li>
                <li>• Focus on accuracy and control rather than speed when starting each new technique</li>
                <li>• Beginners may wish to start at a tempo of 60 bpm or slower</li>
                <li>• All exercises are written around the 5th fret, but practice them on higher and lower frets too - string tension varies significantly across the neck</li>
                <li>• If bending feels too difficult, try moving to a higher fret where string tension is lower, then gradually work your way down the neck</li>
              </ul>
            </div>
            
            <AlphaTabPlayerCDN />
          </div>



          {/* Pitch Accuracy Training */}
          <div id="pitch-accuracy" className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-3xl font-bold text-amber-800 mb-6">Pitch Accuracy Training</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold text-amber-800 mb-4">Use Reference Notes</h3>
                <ul className="space-y-2 text-amber-700">
                  <li>• Always know your target pitch before bending</li>
                  <li>• Play the target note first, then attempt to match it with your bend</li>
                  <li>• Use your ear to develop muscle memory</li>
                  <li>• The tab player above provides audio reference for all exercises</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-amber-800 mb-4">Tuner Practice</h3>
                <ul className="space-y-2 text-amber-700">
                  <li>• Use a tuner while practicing bends</li>
                  <li>• Watch the needle to see exactly how far you're bending</li>
                  <li>• This builds visual and muscle memory for accurate bends</li>
                </ul>
              </div>
            </div>
            

          </div>



          {/* Conclusion */}
          <div className="bg-gradient-to-br from-amber-600 to-orange-700 text-white rounded-lg p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Happy Bending!</h2>
            <p className="text-xl mb-6">
              Every great guitarist started with their first awkward bend. Keep practicing, and soon you'll be adding soul and emotion to every note you play!
            </p>
            <div className="flex justify-center">
              <Link href="/blog" className="bg-white text-amber-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Explore More Guitar Lessons
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
} 