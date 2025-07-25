import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Target, Users, Award } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Guitar Picking Technique: Complete Progressive Guide | Mike Nelson Guitar Lessons',
  description: 'Master guitar picking from basic grip to advanced motion mechanics. Progressive guide covering pick slanting, string crossing, and escape techniques.',
  keywords: 'guitar picking technique, pick grip, alternate picking, string crossing, pick slanting, guitar lessons',
  openGraph: {
    title: 'Guitar Picking Technique: Complete Progressive Guide',
    description: 'Master guitar picking from basic grip to advanced motion mechanics. Progressive guide covering pick slanting, string crossing, and escape techniques.',
    images: [{ url: '/artist-guitars.png' }],
  },
  alternates: {
    canonical: 'https://mikenelsonguitarlessons.co.nz/blog/guitar-picking-technique-guide',
  },
};

export default function GuitarPickingTechniquePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      {/* Navigation */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Link 
            href="/blog" 
            className="inline-flex items-center text-amber-600 hover:text-amber-700 font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-800 to-orange-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="flex items-center mr-4">
                <Target className="w-6 h-6 mr-2 text-amber-200" />
                <span className="text-amber-200 font-medium">All Levels</span>
              </div>
              <span className="text-amber-200">•</span>
              <span className="text-amber-200 ml-4">30 min read</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Guitar Picking Technique: Complete Progressive Guide
            </h1>
            <p className="text-xl text-amber-200 mb-8">
              From basic pick grip to advanced motion mechanics. Master the fundamentals that will transform your playing.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <div className="flex items-center bg-amber-600 px-3 py-1 rounded-full">
                <Users className="w-4 h-4 mr-2" />
                <span className="text-sm">All Levels</span>
              </div>
              <div className="flex items-center bg-orange-600 px-3 py-1 rounded-full">
                <Award className="w-4 h-4 mr-2" />
                <span className="text-sm">Progressive Structure</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <article className="bg-white rounded-lg shadow-lg p-8 md:p-12">
              
              {/* Table of Contents */}
              <div className="bg-amber-50 border-l-4 border-amber-500 p-6 mb-8">
                <h2 className="text-xl font-bold text-amber-800 mb-4">Guide Overview</h2>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h3 className="font-semibold text-amber-700 mb-2">Fundamentals (Levels 1-3)</h3>
                    <ul className="space-y-1 text-amber-600">
                      <li>• <a href="#level-1" className="hover:text-amber-800 underline">Fundamentals - Getting Started Right</a></li>
                      <li>• <a href="#level-2" className="hover:text-amber-800 underline">Building Motion - Alternate Picking Basics</a></li>
                      <li>• <a href="#level-3" className="hover:text-amber-800 underline">String Crossing - The Real Challenge</a></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-amber-700 mb-2">Advanced Techniques</h3>
                    <ul className="space-y-1 text-amber-600">
                      <li>• <a href="#level-4" className="hover:text-amber-800 underline">Pick Slanting</a></li>
                      <li>• <a href="#other-techniques" className="hover:text-amber-800 underline">Other Picking Techniques</a></li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="prose max-w-none">
                <h2 id="level-1" className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
                  Level 1: Fundamentals - Getting Started Right
                </h2>

                <h3 className="text-xl font-semibold text-gray-700 mb-4">How to Hold the Pick</h3>
                
                <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6">
                  <h4 className="font-semibold text-amber-800 mb-2">Basic Grip Setup:</h4>
                  <ol className="list-decimal list-inside space-y-2 text-amber-700">
                    <li><strong>Pick placement:</strong> Rest pick on the side pad of your index finger (not the fingertip)</li>
                    <li><strong>Thumb position:</strong> Place thumb on top of pick, covering about half of it</li>
                    <li><strong>Angle:</strong> The pick should not be angled excessively side-to-side—aim for a neutral, centered position unless slanting is intentional</li>
                    <li><strong>Pressure:</strong> Firm enough that pick won't slip, loose enough to allow flexibility</li>
                  </ol>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded p-4 mb-6">
                  <h4 className="font-semibold text-orange-800 mb-2">Visual Check:</h4>
                  <ul className="list-disc list-inside space-y-1 text-orange-700">
                    <li>Look at your hand from the side - you should see about 2-3mm of pick extending beyond your fingers</li>
                    <li>From above, the pick should appear centered between thumb and finger</li>
                    <li>No white knuckles or excessive tension visible</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded p-4 mb-6">
                  <h4 className="font-semibold text-yellow-800 mb-2">Common Beginner Mistakes:</h4>
                  <ul className="list-disc list-inside space-y-1 text-yellow-700">
                    <li>❌ Holding pick with fingertip instead of finger pad</li>
                    <li>❌ Gripping too tightly (causes fatigue and poor tone)</li>
                    <li>❌ Too much pick exposed (reduces control)</li>
                    <li>❌ Pick angled incorrectly (causes string catching)</li>
                  </ul>
                </div>

                <h3 className="text-xl font-semibold text-gray-700 mb-4">Basic Hand Position</h3>

                <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6">
                  <h4 className="font-semibold text-amber-800 mb-2">Where to Position Your Hand:</h4>
                  <ol className="list-decimal list-inside space-y-2 text-amber-700">
                    <li><strong>Bridge area:</strong> Rest the heel of your palm lightly on the bridge/saddles</li>
                    <li><strong>Pick angle:</strong> Hold the pick at a slight angle so the edge (not the flat face) makes first contact with the string. Think of two scenarios: <em>Flat pick attack</em> = the full face hits the string directly vs. <em>Angled pick attack</em> = the pick contacts the string like a knife slicing at an angle. The angled approach reduces resistance and improves tone</li>
                    <li><strong>Wrist position:</strong> Slight arch - not completely flat, not extremely bent</li>
                    <li><strong>Arm position:</strong> Let your arm hang naturally from your shoulder</li>
                  </ol>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded p-4 mb-6">
                  <h4 className="font-semibold text-amber-800 mb-2">The "Neutral" Starting Position:</h4>
                  <ul className="list-disc list-inside space-y-1 text-amber-700">
                    <li>Hand positioned over the area between the bridge pickup and bridge</li>
                    <li>Wrist has a gentle curve (like holding a small ball)</li>
                    <li>Pick contacts strings at roughly 90-degree angle</li>
                    <li>Relaxed but stable - no excessive tension anywhere</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded p-4 mb-6">
                  <h4 className="font-semibold text-yellow-800 mb-2">Understanding Edge Picking:</h4>
                  <div className="text-yellow-700 space-y-2">
                    <p>When you hold the pick at a slight angle, you're not hitting the string with the flat face of the pick. Instead, the pick's <strong>edge</strong> (the leading edge that hits the string first) makes first contact.</p>
                    <div className="grid md:grid-cols-2 gap-4 mt-3">
                      <div className="bg-yellow-100 p-3 rounded">
                        <div className="font-semibold text-yellow-800">❌ Flat Pick Attack</div>
                        <div className="text-sm">The full face of the pick hits the string directly - creates more resistance and a harsher tone</div>
                      </div>
                      <div className="bg-yellow-100 p-3 rounded">
                        <div className="font-semibold text-yellow-800">✅ Angled Pick Attack</div>
                        <div className="text-sm">The pick contacts the string like a knife slicing at an angle - smoother, cleaner tone</div>
                      </div>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-700 mb-4">First Picking Motions</h3>

                <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6">
                  <h4 className="font-semibold text-amber-800 mb-2">Single String Practice:</h4>
                  <ol className="list-decimal list-inside space-y-2 text-amber-700">
                    <li>Start on the low E string (6th string)</li>
                    <li>Use only <strong>downstrokes</strong> initially</li>
                    <li>Motion comes from your <strong>wrist</strong>, not your whole arm</li>
                    <li>Think "flicking" the string rather than "stabbing" it</li>
                  </ol>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded p-4 mb-6">
                  <h4 className="font-semibold text-gray-800 mb-2">The Motion:</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Small wrist movement - like gently shaking water off your hand</li>
                    <li>Pick should "brush" through the string, not get stuck</li>
                    <li>Return to starting position after each stroke</li>
                    <li>Keep the motion consistent and relaxed</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded p-4 mb-6">
                  <h4 className="font-semibold text-yellow-800 mb-2">Why Picks Get "Trapped" (Even on Single Strings):</h4>
                  <div className="text-yellow-700 space-y-2">
                    <p>Even when playing single strings, many beginners struggle with the pick feeling "stuck" or resistant. This happens because:</p>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li><strong>Excessive follow-through:</strong> Pick travels too far past the string</li>
                      <li><strong>Poor return path:</strong> Pick has to fight back through the string for the next stroke</li>
                    </ul>
                    <p className="text-sm mt-2"><strong>The solution:</strong> Small, efficient motions where the pick naturally "escapes" past the string after each stroke. This concept becomes crucial as you progress to faster playing and string crossing.</p>
                  </div>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded p-4 mb-8">
                  <h4 className="font-semibold text-orange-800 mb-3">Practice Pattern:</h4>
                  <div className="bg-white border-2 border-orange-300 rounded-lg p-4">
                    <div className="text-lg font-bold text-orange-800 mb-3">Exercise 1A: Single Downstrokes</div>
                    <div className="grid gap-3">
                      <div className="flex items-center">
                        <span className="text-orange-700 font-medium w-20">String:</span>
                        <span>Low E (6th string)</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-orange-700 font-medium w-20">Pattern:</span>
                        <div className="flex gap-2 items-center">
                          <span className="bg-orange-200 px-2 py-1 rounded text-orange-800">↓</span>
                          <span className="bg-orange-200 px-2 py-1 rounded text-orange-800">↓</span>
                          <span className="bg-orange-200 px-2 py-1 rounded text-orange-800">↓</span>
                          <span className="bg-orange-200 px-2 py-1 rounded text-orange-800">↓</span>
                          <span className="text-gray-400">...</span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="text-orange-700 font-medium w-20">Count:</span>
                        <span>"1, 2, 3, 4" (one downstroke per beat)</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-orange-700 font-medium w-20">Tempo:</span>
                        <span>Very slow - about 60 BPM</span>
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="my-8 border-gray-200" />

                <h2 id="level-2" className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
                  Level 2: Building Motion - Alternate Picking Basics
                </h2>

                <h3 className="text-xl font-semibold text-gray-700 mb-4">Adding Upstrokes</h3>

                <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6">
                  <h4 className="font-semibold text-amber-800 mb-2">Understanding the Motion:</h4>
                  <ul className="list-disc list-inside space-y-2 text-amber-700">
                    <li><strong>Downstroke:</strong> Wrist moves down, pick travels toward the floor</li>
                    <li><strong>Upstroke:</strong> Wrist moves up, pick travels toward the ceiling</li>
                    <li>Both motions should feel equally easy and natural</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded p-4 mb-6">
                  <h4 className="font-semibold text-yellow-800 mb-2">The Key Insight:</h4>
                  <p className="text-yellow-700">
                    Most beginners think picking is "up and down" - but it's actually <strong>side-to-side wrist motion</strong>. 
                    Your wrist tilts slightly left and right (radial/ulnar deviation), which creates the up/down pick movement.
                  </p>
                </div>

                <h3 className="text-xl font-semibold text-gray-700 mb-4">Combining Down and Up</h3>

                <div className="bg-orange-50 border border-orange-200 rounded p-4 mb-6">
                  <h4 className="font-semibold text-orange-800 mb-3">The Alternate Pattern:</h4>
                  <div className="bg-white border-2 border-orange-300 rounded-lg p-4">
                    <div className="text-lg font-bold text-orange-800 mb-3">Exercise 2A: Basic Alternating</div>
                    <div className="grid gap-3">
                      <div className="flex items-center">
                        <span className="text-orange-700 font-medium w-20">String:</span>
                        <span>Low E (6th string)</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-orange-700 font-medium w-20">Pattern:</span>
                        <div className="flex gap-1 items-center">
                          <span className="bg-orange-200 px-2 py-1 rounded text-orange-800">↓</span>
                          <span className="bg-amber-200 px-2 py-1 rounded text-amber-800">↑</span>
                          <span className="bg-orange-200 px-2 py-1 rounded text-orange-800">↓</span>
                          <span className="bg-amber-200 px-2 py-1 rounded text-amber-800">↑</span>
                          <span className="bg-orange-200 px-2 py-1 rounded text-orange-800">↓</span>
                          <span className="bg-amber-200 px-2 py-1 rounded text-amber-800">↑</span>
                          <span className="text-gray-400">...</span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="text-orange-700 font-medium w-20">Count:</span>
                        <div className="flex gap-1 items-center">
                          <span className="text-orange-800 font-bold">"1</span>
                          <span className="text-amber-700">-&-</span>
                          <span className="text-orange-800 font-bold">2</span>
                          <span className="text-amber-700">-&-</span>
                          <span className="text-orange-800 font-bold">3</span>
                          <span className="text-amber-700">-&-</span>
                          <span className="text-orange-800 font-bold">4</span>
                          <span className="text-amber-700">-&"</span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="text-orange-700 font-medium w-20">Tempo:</span>
                        <span>Start slow - 50-60 BPM</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded p-4 mb-6">
                  <h4 className="font-semibold text-yellow-800 mb-2">Critical Points:</h4>
                  <ul className="list-disc list-inside space-y-1 text-yellow-700">
                    <li>Keep the motion small and efficient</li>
                    <li>Don't lift your hand away from the strings between strokes</li>
                    <li>Both strokes should sound equally loud and clear</li>
                    <li>If one direction sounds weak, practice that direction alone</li>
                  </ul>
                </div>

                <hr className="my-8 border-gray-200" />

                <h2 id="level-3" className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
                  Level 3: String Crossing - The Real Challenge
                </h2>

                <h3 className="text-xl font-semibold text-gray-700 mb-4">Moving Between Strings</h3>

                <div className="bg-amber-50 border border-amber-200 rounded p-4 mb-6">
                  <h4 className="font-semibold text-amber-800 mb-2">Why String Crossing Matters:</h4>
                  <p className="text-amber-700">
                    This is where most players struggle. Moving the pick cleanly from one string to another requires understanding <strong>pick escape mechanics</strong>.
                  </p>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded p-4 mb-6">
                  <h4 className="font-semibold text-orange-800 mb-3">Basic String Crossing:</h4>
                  <div className="bg-white border-2 border-orange-300 rounded-lg p-4">
                    <div className="text-lg font-bold text-orange-800 mb-3">Exercise 3A: Two-String Pattern</div>
                    <div className="grid gap-3">
                      <div className="flex items-center">
                        <span className="text-orange-700 font-medium w-20">Focus:</span>
                        <span>Clean movement between strings</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <span className="text-orange-700 font-medium w-20">Pattern:</span>
                          <div className="space-y-2">
                            <div className="flex gap-1 items-center justify-center">
                              <span className="text-gray-600 w-16">E string:</span>
                              <span className="bg-orange-200 px-2 py-1 rounded text-orange-800">↓</span>
                              <span className="bg-amber-200 px-2 py-1 rounded text-amber-800">↑</span>
                              <span className="text-gray-600 ml-6 w-16">A string:</span>
                              <span className="bg-orange-200 px-2 py-1 rounded text-orange-800">↓</span>
                              <span className="bg-amber-200 px-2 py-1 rounded text-amber-800">↑</span>
                            </div>
                            <div className="text-gray-500 text-sm text-center">
                              <span>Repeat pattern continuously</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="text-orange-700 font-medium w-20">Tempo:</span>
                        <span>Very slow initially - focus on clean transitions</span>
                      </div>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-700 mb-4">Understanding Pick Escape</h3>

                <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6">
                  <h4 className="font-semibold text-amber-800 mb-2">What is Pick Escape?</h4>
                  <p className="text-amber-700 mb-3">
                    After you play a note, the pick needs to "escape" past the string to prepare for the next stroke. There are three ways this can happen:
                  </p>
                  <ol className="list-decimal list-inside space-y-1 text-amber-700">
                    <li><strong>Upstroke Escape:</strong> Pick naturally clears strings after upstrokes</li>
                    <li><strong>Downstroke Escape:</strong> Pick naturally clears strings after downstrokes</li>
                    <li><strong>Double Escape:</strong> Pick can clear in both directions (also known as DBX - not covered here. Another Troy Grady term.)</li>
                  </ol>
                </div>

                <hr className="my-8 border-gray-200" />

                <h2 id="level-4" className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
                  Level 4: Pick Slanting
                </h2>

                <h3 className="text-xl font-semibold text-gray-700 mb-4">Introduction to Pick Slanting</h3>

                <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6">
                  <h4 className="font-semibold text-amber-800 mb-2">What is Pick Slanting?</h4>
                  <p className="text-amber-700 mb-4">
                    Instead of holding the pick perfectly flat against the strings, you angle it slightly. This builds on the pick escape concept from Level 1 - slanting helps the pick naturally escape past the string for both single-string playing and string crossing. The key is knowing which way to slant depending on your next move.
                  </p>
                  <div className="text-sm text-amber-600 italic mb-4">
                    <strong>Note:</strong> The pick slanting concepts and DWPS/UWPS terminology were developed by <a href="https://troygrady.com/" target="_blank" rel="noopener noreferrer" className="text-amber-700 underline hover:text-amber-900">Troy Grady</a> through his groundbreaking "Cracking the Code" research into guitar picking mechanics.
                  </div>
                  
                  <div className="bg-white border-2 border-amber-300 rounded-lg p-4 mb-4">
                    <h5 className="font-bold text-amber-800 mb-3">How to Describe It (Using Pick Tip Direction)</h5>
                    
                    <div className="bg-gray-50 border border-gray-200 rounded p-3 mb-4">
                      <div className="font-semibold text-gray-800 mb-1">Key Terms:</div>
                      <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                        <li><strong>Pick tip:</strong> The pointed end of the pick that you use to strike the strings</li>
                        <li><strong>String plane:</strong> The flat surface formed by all the guitar strings together</li>
                      </ul>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="border-l-4 border-orange-500 pl-4">
                        <h6 className="font-semibold text-orange-700 mb-2">Downward Pick Slanting (DWPS)</h6>
                        <p className="text-gray-700 mb-2">
                          The pick tip points slightly toward the <strong>low string side</strong> of the guitar (where the thickest strings are).
                        </p>
                        <p className="text-gray-600 text-sm italic">
                          <strong>Visual tip:</strong> Looking down at your picking hand, the pick tip points slightly toward you.
                        </p>
                        <div className="bg-orange-50 border border-orange-200 rounded p-3">
                          <div className="font-semibold text-orange-800 mb-2">What it does:</div>
                          <ul className="list-disc list-inside space-y-1 text-orange-700 text-sm mb-3">
                            <li><strong>Upstrokes escape</strong> above the string plane</li>
                            <li><strong>Downstrokes stay trapped</strong> between strings</li>
                            <li>Great for phrases that <strong>change strings after an upstroke</strong></li>
                          </ul>
                          <div className="font-semibold text-orange-800 mb-1">When you need DWPS:</div>
                          <div className="text-orange-700 text-sm space-y-1">
                            <div><strong>Example:</strong> Down-up on A string, moving to low E string</div>
                            <div className="text-xs">• Without slanting: The pick may get caught on the string, making it hard to move cleanly</div>
                            <div className="text-xs">• With DWPS: Upstroke escapes cleanly, you can play downstroke on low E</div>
                          </div>
                          <div className="bg-orange-100 border border-orange-300 rounded p-2 mt-2">
                            <div className="font-semibold text-orange-800 text-xs mb-1">DWPS Rule:</div>
                            <div className="text-orange-700 text-xs">
                              <div>Use DWPS when <strong>you're changing strings after an upstroke</strong></div>
                            </div>
                          </div>
                          <div className="text-xs text-orange-600 mt-2">
                            <a href="https://www.youtube.com/watch?v=7TnddE2k598" target="_blank" rel="noopener noreferrer" className="underline hover:text-orange-800">Watch Troy Grady's DWPS video: "Get Down for the Upstroke" →</a>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border-l-4 border-amber-500 pl-4">
                        <h6 className="font-semibold text-amber-700 mb-2">Upward Pick Slanting (UWPS)</h6>
                        <p className="text-gray-700 mb-2">
                          The pick tip points slightly toward the <strong>high string side</strong> of the guitar (where the thinnest strings are).
                        </p>
                        <p className="text-gray-600 text-sm italic">
                          <strong>Visual tip:</strong> Looking down at your picking hand, the pick tip points slightly away from you.
                        </p>
                        <div className="bg-amber-50 border border-amber-200 rounded p-3">
                          <div className="font-semibold text-amber-800 mb-2">What it does:</div>
                          <ul className="list-disc list-inside space-y-1 text-amber-700 text-sm mb-3">
                            <li><strong>Downstrokes escape</strong> above the string plane</li>
                            <li><strong>Upstrokes stay trapped</strong> between strings</li>
                            <li>Great for phrases that <strong>change strings after a downstroke</strong></li>
                          </ul>
                          <div className="font-semibold text-amber-800 mb-1">When you need UWPS:</div>
                          <div className="text-amber-700 text-sm space-y-1">
                            <div><strong>Example:</strong> Down-up on low E string, moving to A string</div>
                            <div className="text-xs">• Without slanting: The pick may get caught on the string, making it hard to move cleanly</div>
                            <div className="text-xs">• With UWPS: Downstroke escapes cleanly, you can play upstroke on A string</div>
                          </div>
                          <div className="bg-amber-100 border border-amber-300 rounded p-2 mt-2">
                            <div className="font-semibold text-amber-800 text-xs mb-1">UWPS Rule:</div>
                            <div className="text-amber-700 text-xs">
                              <div>Use UWPS when <strong>you're changing strings after a downstroke</strong></div>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-4">
                    <h5 className="font-bold text-yellow-800 mb-2">The Logic Behind Pick Slanting</h5>
                    <div className="text-yellow-700 text-sm space-y-2">
                      <div>If you're about to <strong>change strings after an upstroke</strong>, you need that upstroke to escape → <strong>DWPS</strong></div>
                      <div>If you're about to <strong>change strings after a downstroke</strong>, you need that downstroke to escape → <strong>UWPS</strong></div>
                    </div>
                    <p className="text-yellow-600 text-xs mt-2 italic">
                      Remember: Each slanting technique makes one stroke type escape cleanly while the other stays trapped.
                    </p>
                  </div>
                </div>

                <hr className="my-8 border-gray-200" />

                <h2 id="other-techniques" className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
                  Other Picking Techniques
                </h2>

                <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6">
                  <h4 className="font-semibold text-amber-800 mb-2">Beyond Alternate Picking</h4>
                  <p className="text-amber-700 mb-3">
                    While this guide focuses on alternate picking (strict down-up-down-up), there are other picking approaches that use the same fundamental mechanics we've covered. Once you master alternate picking and pick slanting, these techniques become much easier to understand.
                  </p>
                </div>

                <h3 className="text-xl font-semibold text-gray-700 mb-4">Economy Picking</h3>

                <div className="bg-orange-50 border border-orange-200 rounded p-4 mb-6">
                  <h4 className="font-semibold text-orange-800 mb-2">What it is:</h4>
                  <p className="text-orange-700 mb-3">
                    Economy picking still uses alternate picking <strong>on the same string</strong>, but when changing strings, it continues in the same direction instead of forcing strict alternation. When moving to a higher-pitched string (toward your body), use downward motion. When moving to a lower-pitched string (away from your body), use upward motion.
                  </p>
                  
                  <div className="bg-white border-2 border-orange-300 rounded p-3 mb-3">
                    <h5 className="font-semibold text-orange-800 mb-2">Example Pattern:</h5>
                    <div className="text-sm text-orange-700">
                      <table className="w-full">
                        <tbody>
                          <tr>
                            <td className="font-semibold pr-4">String sequence:</td>
                            <td className="text-center px-2">Low E</td>
                            <td className="text-center px-1">→</td>
                            <td className="text-center px-2">A</td>
                            <td className="text-center px-1">→</td>
                            <td className="text-center px-2">D</td>
                            <td className="text-center px-1">→</td>
                            <td className="text-center px-2">G</td>
                          </tr>
                          <tr>
                            <td className="font-semibold pr-4">Alternate picking:</td>
                            <td className="text-center px-2">↓</td>
                            <td className="text-center px-1">|</td>
                            <td className="text-center px-2">↑ ↓</td>
                            <td className="text-center px-1">|</td>
                            <td className="text-center px-2">↑ ↓</td>
                            <td className="text-center px-1">|</td>
                            <td className="text-center px-2">↑</td>
                          </tr>
                          <tr>
                            <td className="font-semibold pr-4">Economy picking:</td>
                            <td className="text-center px-2"><span className="bg-amber-200 px-1 rounded text-amber-800">↓</span></td>
                            <td className="text-center px-1">|</td>
                            <td className="text-center px-2"><span className="bg-amber-200 px-1 rounded text-amber-800">↓</span> ↑</td>
                            <td className="text-center px-1">|</td>
                            <td className="text-center px-2">↓ ↑</td>
                            <td className="text-center px-1">|</td>
                            <td className="text-center px-2">↓</td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="text-xs mt-2 italic">Economy picking: <span className="bg-amber-200 px-1 rounded text-amber-800">highlighted strokes</span> are from the same continuous downward motion</div>
                    </div>
                  </div>

                  <div className="text-orange-700 text-sm">
                    <p><strong>Different from alternate picking:</strong> Economy picking avoids the escape challenges of strict alternation by following the natural direction of string crossing, making it more efficient for certain passages.</p>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-700 mb-4">Sweep Picking</h3>

                <div className="bg-amber-50 border border-amber-200 rounded p-4 mb-6">
                  <h4 className="font-semibold text-amber-800 mb-2">What it is:</h4>
                  <p className="text-amber-700 mb-3">
                    Sweep picking involves playing one note per string while "sweeping" the pick across multiple strings in the same direction. Common in arpeggios and chord-based passages.
                  </p>

                  <div className="bg-white border-2 border-amber-300 rounded p-3 mb-3">
                    <h5 className="font-semibold text-amber-800 mb-2">Example Pattern:</h5>
                    <div className="text-sm text-amber-700">
                      <table className="w-full">
                        <tbody>
                          <tr>
                            <td className="font-semibold pr-4">5-string arpeggio:</td>
                            <td className="text-center px-2">Low E</td>
                            <td className="text-center px-1">→</td>
                            <td className="text-center px-2">A</td>
                            <td className="text-center px-1">→</td>
                            <td className="text-center px-2">D</td>
                            <td className="text-center px-1">→</td>
                            <td className="text-center px-2">G</td>
                            <td className="text-center px-1">→</td>
                            <td className="text-center px-2">B</td>
                          </tr>
                          <tr>
                            <td className="font-semibold pr-4">Pick pattern:</td>
                            <td className="text-center px-2">↓</td>
                            <td className="text-center px-1"></td>
                            <td className="text-center px-2">↓</td>
                            <td className="text-center px-1"></td>
                            <td className="text-center px-2">↓</td>
                            <td className="text-center px-1"></td>
                            <td className="text-center px-2">↓</td>
                            <td className="text-center px-1"></td>
                            <td className="text-center px-2">↓</td>
                          </tr>
                          <tr>
                            <td className="font-semibold pr-4">Return sweep:</td>
                            <td className="text-center px-2">B</td>
                            <td className="text-center px-1">→</td>
                            <td className="text-center px-2">G</td>
                            <td className="text-center px-1">→</td>
                            <td className="text-center px-2">D</td>
                            <td className="text-center px-1">→</td>
                            <td className="text-center px-2">A</td>
                            <td className="text-center px-1">→</td>
                            <td className="text-center px-2">Low E</td>
                          </tr>
                          <tr>
                            <td className="font-semibold pr-4">Pick pattern:</td>
                            <td className="text-center px-2">↑</td>
                            <td className="text-center px-1"></td>
                            <td className="text-center px-2">↑</td>
                            <td className="text-center px-1"></td>
                            <td className="text-center px-2">↑</td>
                            <td className="text-center px-1"></td>
                            <td className="text-center px-2">↑</td>
                            <td className="text-center px-1"></td>
                            <td className="text-center px-2">↑</td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="text-xs mt-2 italic">Pick "sweeps" across strings like a brush stroke</div>
                    </div>
                  </div>

                  <div className="text-amber-700 text-sm">
                    <p><strong>Different from alternate picking:</strong> Sweep picking is essentially the economy motion applied across multiple strings - one continuous motion in the same direction, creating a smooth "sweeping" effect that eliminates escape challenges entirely.</p>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded p-4 mb-8">
                  <h4 className="font-semibold text-yellow-800 mb-2">Key Insight:</h4>
                  <p className="text-yellow-700 text-sm">
                    While alternate picking requires mastering pick escape and slanting techniques, economy picking and sweep picking actually avoid these challenges by following natural motion paths. Understanding alternate picking first gives you the foundation to appreciate why these alternative techniques can be more efficient for certain musical passages.
                  </p>
                </div>

                <hr className="my-8 border-gray-200" />

                <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
                  Key Principles to Remember
                </h2>

                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-amber-50 border border-amber-200 rounded p-4">
                    <h4 className="font-semibold text-amber-800 mb-2">Core Fundamentals</h4>
                    <ul className="list-disc list-inside space-y-1 text-amber-700 text-sm">
                      <li>Technique serves music</li>
                      <li>Consistency beats speed</li>
                      <li>Small motions are efficient</li>
                      <li>Wrist deviation is primary</li>
                    </ul>
                  </div>
                  <div className="bg-orange-50 border border-orange-200 rounded p-4">
                    <h4 className="font-semibold text-orange-800 mb-2">Practice Guidelines</h4>
                    <ul className="list-disc list-inside space-y-1 text-orange-700 text-sm">
                      <li>Practice slowly and deliberately</li>
                      <li>Record yourself regularly</li>
                      <li>Rest and recovery matter</li>
                      <li>Coordinate with fretting hand</li>
                    </ul>
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
                  Progressive Practice Plan
                </h2>

                <div className="space-y-4 mb-8">
                  <div className="bg-amber-50 border-l-4 border-amber-500 p-4">
                    <h4 className="font-semibold text-amber-800">Week 1-2: Foundations</h4>
                    <p className="text-amber-700 text-sm">Master pick grip and basic hand position. Develop clean downstrokes and upstrokes. Focus: Tone quality and relaxation.</p>
                  </div>
                  <div className="bg-orange-50 border-l-4 border-orange-500 p-4">
                    <h4 className="font-semibold text-orange-800">Week 3-4: Basic Alternating</h4>
                    <p className="text-orange-700 text-sm">Combine down-up motions smoothly. Practice on single strings until automatic. Focus: Consistency and timing.</p>
                  </div>
                  <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                    <h4 className="font-semibold text-yellow-800">Week 5-8: String Crossing</h4>
                    <p className="text-yellow-700 text-sm">Learn basic string crossing principles. Understand upstroke escape concepts. Focus: Clean transitions between strings.</p>
                  </div>

                </div>

                <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">
                  Player Examples by Technique
                </h2>

                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  <div className="bg-gray-50 border border-gray-200 rounded p-4">
                    <h4 className="font-semibold text-gray-800 mb-2">Strict Alternate Picking</h4>
                    <p className="text-gray-600 text-sm">Paul Gilbert, John Petrucci</p>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded p-4">
                    <h4 className="font-semibold text-gray-800 mb-2">Downward Pick Slanting (DWPS)</h4>
                    <p className="text-gray-600 text-sm">Yngwie Malmsteen, Al Di Meola</p>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded p-4">
                    <h4 className="font-semibold text-gray-800 mb-2">Upward Pick Slanting (UWPS)</h4>
                    <p className="text-gray-600 text-sm">Steve Morse, Shawn Lane</p>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded p-4">
                    <h4 className="font-semibold text-gray-800 mb-2">Double Escape (DBX)</h4>
                    <p className="text-gray-600 text-sm">Andy Wood, Molly Miller, many jazz players</p>
                    <p className="text-xs text-gray-500 mt-1 italic">Another Troy Grady term - not covered here</p>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded p-6 mb-8">
                  <h3 className="font-semibold text-amber-800 mb-2">Remember</h3>
                  <p className="text-amber-700">
                    The goal is to develop a picking technique that allows you to express your musical ideas clearly and efficiently, 
                    without strain or limitation. Master the fundamentals first, then gradually add complexity as needed for your musical goals.
                  </p>
                </div>


              </div>
            </article>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-amber-800 to-orange-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Ready to practice picking?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/lessons" 
              className="bg-white text-amber-800 px-8 py-3 rounded-lg font-semibold hover:bg-amber-50 transition-colors"
            >
              Book a Lesson
            </Link>
            <Link 
              href="/blog" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-amber-800 transition-colors"
            >
              More Guides
            </Link>
            <Link
              href="/blog/pentatonic-scale-exercises"
              className="bg-amber-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-600 transition-colors"
            >
              Pentatonic Scale Exercises
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 