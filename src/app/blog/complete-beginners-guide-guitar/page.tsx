'use client';
import { Metadata } from 'next'
import Link from 'next/link'
import { Guitar, Clock, CheckCircle, Star, ArrowRight, Music, Users, BookOpen, Target } from 'lucide-react'
import SongStrummingPattern from '@/components/rhythm/SongStrummingPattern'
import SongStructurePlayer from '@/components/rhythm/SongStructurePlayer'
import { GuitarStrumEngine } from '@/utils/audio/guitarStrumEngine'
import React, { useState } from 'react'

export default function CompleteBeginnerGuide() {
  const patterns = GuitarStrumEngine.PATTERNS;

  // BAD MOON RISING TOGGLE
  const [badMoonSection, setBadMoonSection] = useState<'full' | 'verse' | 'chorus'>('full');
  const badMoonSections = [
    {
      name: 'Verse',
      measures: [
        { chord: 'D', pattern: patterns[6], beats: 4 },
        { chord: 'A (1-2), G (3-4)', pattern: patterns[0], beats: 4 },
        { chord: 'D', pattern: patterns[6], beats: 4 },
        { chord: 'D', pattern: patterns[6], beats: 4 }
      ]
    },
    {
      name: 'Chorus',
      measures: [
        { chord: 'G', pattern: patterns[6], beats: 4 },
        { chord: 'G', pattern: patterns[6], beats: 4 },
        { chord: 'D', pattern: patterns[6], beats: 4 },
        { chord: 'D', pattern: patterns[6], beats: 4 },
        { chord: 'A', pattern: patterns[6], beats: 4 },
        { chord: 'G', pattern: patterns[6], beats: 4 },
        { chord: 'D', pattern: patterns[6], beats: 4 },
        { chord: 'D', pattern: patterns[6], beats: 4 }
      ]
    }
  ];
  const badMoonPlayerSections =
    badMoonSection === 'full' ? badMoonSections :
    badMoonSection === 'verse' ? [badMoonSections[0]] : [badMoonSections[1]];

  // BROWN EYED GIRL TOGGLE
  const [begSection, setBegSection] = useState<'full' | 'verse' | 'chorus'>('full');
  const begSections = [
    {
      name: 'Verse',
      measures: [
        { chord: 'G', pattern: patterns[3], beats: 4 },
        { chord: 'C', pattern: patterns[3], beats: 4 },
        { chord: 'G', pattern: patterns[3], beats: 4 },
        { chord: 'D', pattern: patterns[3], beats: 4 }
      ]
    },
    {
      name: 'Chorus',
      measures: [
        { chord: 'C', pattern: patterns[3], beats: 4 },
        { chord: 'D', pattern: patterns[3], beats: 4 },
        { chord: 'G', pattern: patterns[3], beats: 4 },
        { chord: 'Em', pattern: patterns[3], beats: 4 },
        { chord: 'C', pattern: patterns[3], beats: 4 },
        { chord: 'D', pattern: patterns[3], beats: 4 },
        { chord: 'G', pattern: patterns[3], beats: 4 },
        { chord: 'D', pattern: patterns[3], beats: 4 }
      ]
    }
  ];
  const begPlayerSections =
    begSection === 'full' ? begSections :
    begSection === 'verse' ? [begSections[0]] : [begSections[1]];

  return (
    <div className="min-h-screen bg-amber-50" style={{ scrollBehavior: 'smooth' }}>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-800 via-amber-700 to-amber-600 text-white section-padding">
        <div className="container-max">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-playfair mb-6">
              Complete Beginner's Guide to Learning Guitar
            </h1>
            <p className="text-xl text-amber-100 mb-8 leading-relaxed">
              A simple guide on what to buy and what you'll learn as a beginner guitarist in NZ
            </p>
            <div className="flex items-center justify-center space-x-4 text-amber-200">
              <Clock className="h-5 w-5" />
              <span>35 minute read</span>
            </div>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="bg-amber-100 border-b border-amber-200">
        <div className="container-max section-padding">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-amber-800 mb-6 text-center">What You'll Learn</h2>
            {/* Responsive layout: pyramid on desktop, stacked/grid on mobile */}
            <div className="w-full flex flex-col items-center">
              {/* Mobile: 2-2-1 grid, Desktop: pyramid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl mb-4">
                <a href="#choosing-guitar" className="bg-white p-4 rounded-xl border border-amber-200 shadow-sm hover:shadow-lg transition-all duration-200 text-center w-full min-w-[180px]">
                  <h3 className="font-semibold text-amber-800 mb-1">Choosing Your First Guitar</h3>
                  <p className="text-amber-700 text-sm">How to pick the right guitar for you</p>
                </a>
                <a href="#holding-pick" className="bg-white p-4 rounded-xl border border-amber-200 shadow-sm hover:shadow-lg transition-all duration-200 text-center w-full min-w-[180px]">
                  <h3 className="font-semibold text-amber-800 mb-1">How to Hold the Pick</h3>
                  <p className="text-amber-700 text-sm">Get a relaxed, confident grip</p>
                </a>
                <a href="#first-chords" className="bg-white p-4 rounded-xl border border-amber-200 shadow-sm hover:shadow-lg transition-all duration-200 text-center w-full min-w-[180px]">
                  <h3 className="font-semibold text-amber-800 mb-1">First Essential Chords</h3>
                  <p className="text-amber-700 text-sm">The chords every beginner should know</p>
                </a>
                <a href="#essential-gear" className="bg-white p-4 rounded-xl border border-amber-200 shadow-sm hover:shadow-lg transition-all duration-200 text-center w-full min-w-[180px]">
                  <h3 className="font-semibold text-amber-800 mb-1">Essential Gear</h3>
                  <p className="text-amber-700 text-sm">What you need (and what you don't)</p>
                </a>
                <a href="#learning-roadmap" className="bg-white p-4 rounded-xl border border-amber-200 shadow-sm hover:shadow-lg transition-all duration-200 text-center w-full min-w-[180px]">
                  <h3 className="font-semibold text-amber-800 mb-1">Learning Roadmap</h3>
                  <p className="text-amber-700 text-sm">Your step-by-step path to progress</p>
                </a>
                <a href="#your-first-songs" className="bg-white p-4 rounded-xl border border-amber-200 shadow-sm hover:shadow-lg transition-all duration-200 text-center w-full min-w-[180px]">
                  <h3 className="font-semibold text-amber-800 mb-1">Your First 3 Songs</h3>
                  <p className="text-amber-700 text-sm">Learn with simple strumming patterns and interactive diagrams</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="section-padding bg-white">
        <div className="container-max">
          <div className="max-w-4xl mx-auto prose prose-lg prose-amber">
            
            {/* Introduction */}
            <div className="bg-amber-50 border-l-4 border-amber-400 p-6 mb-8">
              <h2 className="text-2xl font-bold text-amber-800 mb-3 flex items-center">
                <Guitar className="h-6 w-6 mr-2" />
                Welcome to Your Guitar Journey
              </h2>
              <p className="text-amber-700 mb-0">
                Learning guitar is one of the most rewarding skills you can develop. Whether you dream of playing 
                around the campfire, jamming with friends, or performing on stage, this guide will give you 
                everything you need to get started on the right foot.
              </p>
            </div>

            {/* Teaching Style Note */}
            <section className="mb-12">
              <div className="bg-orange-50 border-l-4 border-orange-400 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-orange-800 mb-3">About My Teaching Approach</h3>
                <p className="text-orange-700 mb-3">
                  While I teach a variety of musical styles, I can loosely be categorised as a "rock" guitar teacher. Classical guitar has a different approach, predominantly due to the use of fingers in the plucking/picking hand rather than a pick.
                </p>
                <p className="text-orange-700">
                  I do teach some fingerstyle playing when requested, however my method is rooted in playing with a pick. If you're specifically interested in classical guitar technique, you may want to seek out a teacher who specializes in that approach.
                </p>
              </div>
            </section>

            {/* Choosing Your First Guitar Section */}
            <section className="mb-12" id="choosing-guitar" style={{ scrollMarginTop: '2rem' }}>
              <h2 className="text-3xl font-bold text-amber-800 mb-6">Choosing Your First Guitar</h2>
              
              <p className="text-lg mb-6">
                Selecting the right guitar is crucial for your learning success. The type of guitar you choose 
                will affect how easy it is to learn and how much you enjoy practicing.
              </p>

              {/* For Children */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-bold text-amber-800 mb-4">For Children</h3>
                <p className="text-amber-700 mb-4">
                  I recommend <strong>nylon string classical guitars</strong> for children. These guitars are easier 
                  on small fingers and have a gentler touch that makes learning more comfortable.
                </p>
                <p className="text-amber-700">
                  For the best value in New Zealand, I recommend <strong>Valencia brand guitars</strong>. You can 
                  purchase these from Music Works (Wellington and Lower Hutt), Music Planet (Wellington), or TradeMe.
                </p>
              </div>

              {/* For Teenagers and Adults */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-bold text-amber-800 mb-4">For Teenagers and Adults</h3>
                <p className="text-amber-700">
                  Teenagers and adults can use any type of guitar - acoustic, classical, or electric. The choice 
                  depends on your musical preferences and learning goals.
                </p>
              </div>

              {/* Guitar Size Guide */}
              <h3 className="text-xl font-bold text-amber-800 mb-4">Guitar Size Guide</h3>
              <p className="mb-4">
                It's best to visit a store and have staff assess which size is best for you or your child. 
                These aren't the only options available, but they should provide an idea and are my personal 
                recommendations for nylon string beginners:
              </p>

              {/* 3/4 Size Guitars */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-amber-700 mb-3">3/4 Size Guitars (for smaller players):</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="https://www.musicworks.co.nz/valencia-vc203-3-4-size-classical-guitar-classic-sunburst-gccvc203csb" 
                       className="text-amber-600 hover:text-amber-800 underline" target="_blank" rel="noopener noreferrer">
                      Valencia VC203 3/4 Size Classical Guitar - Music Works
                    </a>
                  </li>
                  <li>
                    <a href="https://www.musicplanet.co.nz/valencia-203-series-3-4-classical-guitar-hybrid-csb-vale-gcc-vc203-h-csb" 
                       className="text-amber-600 hover:text-amber-800 underline" target="_blank" rel="noopener noreferrer">
                      Valencia 203 Series 3/4 Classical Guitar - Music Planet
                    </a>
                  </li>

                </ul>
              </div>

              {/* Full Size Guitars */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-amber-700 mb-3">Full Size Guitars:</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="https://www.musicplanet.co.nz/valencia-series-204-classical-guitar-hybrid-neck-in-su-vale-gcc-vc204-h-csb" 
                       className="text-amber-600 hover:text-amber-800 underline" target="_blank" rel="noopener noreferrer">
                      Valencia Series 204 Classical Guitar - Music Planet
                    </a>
                  </li>
                  <li>
                    <a href="https://www.musicworks.co.nz/valencia-vc264h-4-4-full-size-hybrid-classical-guitar-thin-neck-nylon-string-natural-high-gloss-finish-gccvc264h" 
                       className="text-amber-600 hover:text-amber-800 underline" target="_blank" rel="noopener noreferrer">
                      Valencia VC264H Full Size Hybrid Classical Guitar - Music Works
                    </a>
                  </li>
                </ul>
              </div>

              {/* Electric Guitars */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-bold text-amber-800 mb-4">Electric Guitars for Beginners</h3>
                <p className="text-amber-700 mb-3">
                  Electric guitars can be easier to play due to lower string tension and are great for 
                  amplified performances. They require an amplifier to make sound, but this also gives 
                  you access to a wide range of tones and effects.
                </p>
                <p className="text-amber-700 mb-4">
                  Current pricing in New Zealand ranges from $668-$798 for a complete beginner setup 
                  including guitar, amp, and essential accessories.
                </p>
                <p className="text-amber-700 mb-4">
                  It is more expensive to purchase an electric guitar + amp than an acoustic. This is another reason that it's often best to start on an acoustic until you're really sure that learning the guitar is for you.
                </p>
                <div className="bg-white border border-amber-300 rounded-lg p-4">
                  <p className="text-amber-800 font-semibold mb-2">
                    📖 Complete Electric Guitar Guide Available
                  </p>
                  <p className="text-amber-700 text-sm mb-3">
                    For my detailed recommendations, current NZ pricing, and where to buy, check out my 
                    comprehensive electric guitar guide with specific guitar models, amp comparisons, 
                    and complete setup pricing based on my teaching experience.
                  </p>
                  <Link 
                    href="/blog/electric-guitar-beginner-guide-nz" 
                    className="inline-flex items-center text-amber-600 hover:text-amber-800 font-semibold underline"
                  >
                    Read the Electric Guitar Guide <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </section>

            {/* Essential Gear */}
            <section className="mb-12" id="essential-gear" style={{ scrollMarginTop: '2rem' }}>
              <h2 className="text-3xl font-bold text-amber-800 mb-6">Essential Gear You'll Need</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-amber-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-amber-800 mb-3">Must-Have Items</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                      Guitar picks (medium thickness)
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                      Guitar tuner (or tuning app)
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                      Comfortable chair or stool
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                      Music stand (optional but helpful)
                    </li>
                  </ul>
                </div>
                
                <div className="bg-amber-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-amber-800 mb-3">Nice-to-Have Items</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-amber-600 mr-2" />
                      Metronome
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-amber-600 mr-2" />
                      Guitar strap
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-amber-600 mr-2" />
                      Extra strings
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-amber-600 mr-2" />
                      Guitar case or gig bag
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Holding the Pick */}
            <section className="mb-12" id="holding-pick" style={{ scrollMarginTop: '2rem' }}>
              <h2 className="text-3xl font-bold text-amber-800 mb-6">How to Hold the Pick</h2>
              
              <p className="text-lg mb-6">
                Before learning chords, it's essential to master the basic technique of holding and using a pick. 
                Proper pick grip and hand position will make everything easier as you progress.
              </p>

              <div className="bg-amber-50 border-l-4 border-amber-500 p-6 mb-6">
                <h3 className="text-xl font-bold text-amber-800 mb-4">Pick Grip Setup</h3>
                <ol className="list-decimal list-inside space-y-2 text-amber-700">
                  <li><strong>Pick placement:</strong> Rest pick on the side pad of your index finger (not the fingertip)</li>
                  <li><strong>Thumb position:</strong> Place thumb on top of pick, covering about half of it</li>
                  <li><strong>Angle:</strong> The pick should not be angled excessively side-to-side—aim for a neutral, centered position</li>
                  <li><strong>Pressure:</strong> Firm enough that pick won't slip, loose enough to allow flexibility</li>
                </ol>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-bold text-orange-800 mb-4">Visual Check</h3>
                <ul className="list-disc list-inside space-y-2 text-orange-700">
                  <li>Look at your hand from the side - you should see about 2-3mm of pick extending beyond your fingers</li>
                  <li>From above, the pick should appear centered between thumb and finger</li>
                  <li>No white knuckles or excessive tension visible</li>
                </ul>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-bold text-red-800 mb-4">Common Beginner Mistakes</h3>
                <ul className="list-disc list-inside space-y-2 text-red-700">
                  <li>❌ Holding pick with fingertip instead of finger pad</li>
                  <li>❌ Gripping too tightly (causes fatigue and poor tone)</li>
                  <li>❌ Too much pick exposed (reduces control)</li>
                  <li>❌ Pick angled incorrectly (causes string catching)</li>
                </ul>
              </div>

              <h3 className="text-xl font-bold text-amber-800 mb-4">Basic Hand Position</h3>

              <div className="bg-amber-50 border-l-4 border-amber-500 p-6 mb-6">
                <h4 className="font-semibold text-amber-800 mb-3">Where to Position Your Hand:</h4>
                <ol className="list-decimal list-inside space-y-3 text-amber-700">
                  <li><strong>Bridge area:</strong> Rest the heel of your palm lightly on the bridge/saddles</li>
                  <li><strong>Pick angle:</strong> Hold the pick at a slight angle so the edge (not the flat face) makes first contact with the string</li>
                  <li><strong>Wrist position:</strong> Slight arch - not completely flat, not extremely bent</li>
                  <li><strong>Arm position:</strong> Let your arm hang naturally from your shoulder</li>
                </ol>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
                <h4 className="font-semibold text-yellow-800 mb-3">Understanding Edge Picking</h4>
                <p className="text-yellow-700 mb-3">
                  When you hold the pick at a slight angle, you're not hitting the string with the flat face of the pick. 
                  Instead, the pick's <strong>edge</strong> makes first contact.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-yellow-100 p-4 rounded-lg">
                    <div className="font-semibold text-yellow-800 mb-2">❌ Flat Pick Attack</div>
                    <div className="text-sm text-yellow-700">The full face of the pick hits the string directly - creates more resistance and a harsher tone</div>
                  </div>
                  <div className="bg-yellow-100 p-4 rounded-lg">
                    <div className="font-semibold text-yellow-800 mb-2">✅ Angled Pick Attack</div>
                    <div className="text-sm text-yellow-700">The pick contacts the string like a knife slicing at an angle - smoother, cleaner tone</div>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 border-l-4 border-amber-400 p-6 mb-6">
                <h4 className="font-semibold text-amber-800 mb-3">Ready to Learn More?</h4>
                <p className="text-amber-700 mb-3">
                  This covers the essential picking fundamentals you need to get started. For advanced picking techniques, 
                  string crossing, and detailed motion mechanics, check out my comprehensive picking guide.
                </p>
                <Link 
                  href="/blog/guitar-picking-technique-guide" 
                  className="inline-flex items-center text-amber-600 hover:text-amber-800 font-semibold underline"
                >
                  Master Guitar Picking Technique <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>

              <div className="bg-orange-50 border-l-4 border-orange-400 p-6">
                <h4 className="font-semibold text-orange-800 mb-3">Strumming Pattern Practice</h4>
                <p className="text-orange-700 mb-3">
                  Once you're comfortable with basic pick technique, you'll want to develop your strumming patterns 
                  for chord playing. Proper strumming technique builds directly on these picking fundamentals.
                </p>
                <Link 
                  href="/blog/guitar-strumming-patterns" 
                  className="inline-flex items-center text-orange-600 hover:text-orange-800 font-semibold underline"
                >
                  Master Guitar Strumming Patterns <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </section>

            {/* First Essential Chords */}
            <section className="mb-12" id="first-chords" style={{ scrollMarginTop: '2rem' }}>
              <h2 className="text-3xl font-bold text-amber-800 mb-6">First Essential Chords</h2>
              
              <p className="text-lg mb-6">
                These eight chords form the foundation of thousands of songs. Master these, and you'll be 
                able to play countless popular songs:
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {['A', 'Am', 'C', 'D', 'Dm', 'E', 'Em', 'G'].map((chord) => (
                  <div key={chord} className="bg-amber-100 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-amber-800">{chord}</div>
                    <div className="text-sm text-amber-600">
                      {chord.includes('m') ? 'Minor' : 'Major'}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-amber-50 border-l-4 border-amber-400 p-6 mb-6">
                <h3 className="text-xl font-bold text-amber-800 mb-3">Learning Tip</h3>
                <p className="text-amber-700">
                  Start with the easiest chords first: <strong>A and E</strong>. These two chords alone will 
                  let you play your first song! Once you're comfortable with these, gradually add the others.
                </p>
              </div>

              <div className="bg-white border border-amber-300 rounded-lg p-6">
                <h3 className="text-xl font-bold text-amber-800 mb-4">Chord Resources</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-amber-800 mb-2">📚 How to Read Chord Diagrams</h4>
                    <p className="text-amber-700 text-sm mb-3">
                      Learn to read chord charts with this comprehensive video tutorial.
                    </p>
                    <Link 
                      href="/blog/how-to-read-chord-diagrams" 
                      className="inline-flex items-center text-amber-600 hover:text-amber-800 font-semibold underline"
                    >
                      Watch Tutorial <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-amber-800 mb-2">🎸 Open Chord Library</h4>
                    <p className="text-amber-700 text-sm mb-3">
                      Interactive chord reference with visual diagrams and fingering patterns.
                    </p>
                    <Link 
                      href="/blog/guitar-chord-reference-tool" 
                      className="inline-flex items-center text-amber-600 hover:text-amber-800 font-semibold underline"
                    >
                      View Library <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* Song Recommendations / Your First 3 Songs */}
            <section className="mb-12" id="your-first-songs" style={{ scrollMarginTop: '2rem' }}>
              <h2 className="text-3xl font-bold text-amber-800 mb-6">Your First 3 Songs</h2>
              
              {/* Strumming Patterns Guide Callout */}
              <div className="bg-amber-100 border-l-4 border-amber-400 p-4 mb-6 rounded flex items-center gap-3">
                <span className="text-2xl">🎸</span>
                <div>
                  <span className="font-semibold text-amber-800">New to strumming?</span> Check out the{' '}
                  <Link href="/blog/guitar-strumming-patterns" className="text-amber-700 underline font-semibold hover:text-amber-900 transition-colors">
                    10 Strumming Patterns & Technique Guide
                  </Link>
                  {' '}for essential tips and patterns every beginner should know.
                </div>
              </div>
              <p className="text-lg mb-6">
                Learning songs is the most enjoyable way to practice your chords. Here's your progression 
                of first songs, carefully chosen to build your skills step by step:
              </p>
              
              <div className="bg-amber-50 border-l-4 border-amber-400 p-6 mb-6">
                <h3 className="text-xl font-bold text-amber-800 mb-3">Essential Learning Tip</h3>
                <p className="text-amber-700">
                  <strong>Always start by learning songs at a slow tempo</strong> - sometimes quite a lot slower depending on your skill level. 
                  It's essential that you first learn to play accurately at slow speed before gradually increasing the tempo. 
                  Clean, accurate playing at slow speed will naturally develop into smooth playing at full speed.
                </p>
              </div>

              <div className="space-y-6">
                {/* Song 1 */}
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-amber-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4">1</div>
                    <h3 className="text-xl font-bold text-amber-800">Achy Breaky Heart - Billy Ray Cyrus</h3>
                  </div>
                  <p className="text-amber-700 mb-3">
                    <strong>Chords used:</strong> A and E
                  </p>
                  <p className="text-amber-700 text-sm mb-3">
                    This song uses a Down Down Up Down Down Up pattern throughout.
                  </p>
                  <p className="text-amber-700 mb-3">
                    <strong>What you'll learn:</strong> Basic chord changes and steady strumming rhythm.
                  </p>
                  
                  {/* Interactive Song Structure Player */}
                  <SongStructurePlayer
                    songTitle="Achy Breaky Heart"
                    artist="Billy Ray Cyrus"
                    sections={[
                      {
                        name: "Verse",
                        measures: [
                          { chord: "A", pattern: patterns[2], beats: 4 },
                          { chord: "A", pattern: patterns[2], beats: 4 },
                          { chord: "A", pattern: patterns[2], beats: 4 },
                          { chord: "E", pattern: patterns[2], beats: 4 },
                          { chord: "E", pattern: patterns[2], beats: 4 },
                          { chord: "E", pattern: patterns[2], beats: 4 },
                          { chord: "E", pattern: patterns[2], beats: 4 },
                          { chord: "A", pattern: patterns[2], beats: 4 }
                        ]
                      }
                    ]}
                    bpm={120}
                    initialTempo={60}
                    forcePercussion
                    hideSoundModeToggle
                  />
                </div>

                {/* Song 2 */}
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-amber-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4">2</div>
                    <h3 className="text-xl font-bold text-amber-800">Bad Moon Rising - Creedence Clearwater Revival</h3>
                  </div>
                  <p className="text-amber-700 mb-3">
                    <strong>Chords used:</strong> D, A, G
                  </p>
                  <p className="text-amber-700 text-sm mb-3">
                    This song mostly uses a Down Down Up Down Up pattern, but uses a pattern of all downs on beats 1, 2, 3, 4 for the A and G chords in the verse. You can think of the A and G chords as taking up half of this all-down pattern, or as them changing half way through this pattern.
                  </p>
                  <p className="text-amber-700 mb-3">
                    <strong>What you'll learn:</strong> Three-chord progressions and more complex chord changes.
                  </p>
                  <div className="flex gap-2 mb-4">
                    <button onClick={() => setBadMoonSection('full')} className={`px-3 py-1 rounded ${badMoonSection==='full'?'bg-amber-600 text-white':'bg-amber-100 text-amber-800'}`}>Verse & Chorus</button>
                    <button onClick={() => setBadMoonSection('verse')} className={`px-3 py-1 rounded ${badMoonSection==='verse'?'bg-amber-600 text-white':'bg-amber-100 text-amber-800'}`}>Verse</button>
                    <button onClick={() => setBadMoonSection('chorus')} className={`px-3 py-1 rounded ${badMoonSection==='chorus'?'bg-amber-600 text-white':'bg-amber-100 text-amber-800'}`}>Chorus</button>
                  </div>
                  <SongStructurePlayer
                    songTitle="Bad Moon Rising"
                    artist="Creedence Clearwater Revival"
                    sections={badMoonPlayerSections}
                    bpm={150}
                    initialTempo={75}
                    forcePercussion
                    hideSoundModeToggle
                  />
                </div>

                {/* Song 3 */}
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-amber-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4">3</div>
                    <h3 className="text-xl font-bold text-amber-800">Brown Eyed Girl - Van Morrison</h3>
                  </div>
                  <p className="text-amber-700 mb-3">
                    <strong>Chords used:</strong> G, C, D, Em
                  </p>
                  <p className="text-amber-700 text-sm mb-3">
                    This song uses a Down Down Up Down Up pattern throughout.
                  </p>
                  <p className="text-amber-700 mb-3">
                    <strong>What you'll learn:</strong> Four-chord progressions and more chord transitions.
                  </p>
                  
                  {/* Interactive Song Structure Player */}
                  <div className="flex gap-2 mb-4">
                    <button onClick={() => setBegSection('full')} className={`px-3 py-1 rounded ${begSection==='full'?'bg-amber-600 text-white':'bg-amber-100 text-amber-800'}`}>Verse & Chorus</button>
                    <button onClick={() => setBegSection('verse')} className={`px-3 py-1 rounded ${begSection==='verse'?'bg-amber-600 text-white':'bg-amber-100 text-amber-800'}`}>Verse</button>
                    <button onClick={() => setBegSection('chorus')} className={`px-3 py-1 rounded ${begSection==='chorus'?'bg-amber-600 text-white':'bg-amber-100 text-amber-800'}`}>Chorus</button>
                  </div>
                  <SongStructurePlayer
                    songTitle="Brown Eyed Girl"
                    artist="Van Morrison"
                    sections={begPlayerSections}
                    bpm={148}
                    initialTempo={75}
                    forcePercussion
                    hideSoundModeToggle
                  />
                </div>
              </div>

              {/* Link to 10 Strumming Patterns Guide */}
              <div className="flex justify-center my-8">
                <Link
                  href="/blog/guitar-strumming-patterns"
                  className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-semibold px-6 py-3 rounded-lg shadow transition-colors text-lg"
                >
                  Explore More Strumming Patterns: 10 Strumming Patterns Guide
                </Link>
              </div>
            </section>

            {/* Practice Schedule */}
            <section className="mb-12" id="practice-sessions" style={{ scrollMarginTop: '2rem' }}>
              <h2 className="text-3xl font-bold text-amber-800 mb-6">Effective Practice Sessions</h2>
              
              <p className="text-lg mb-6">
                Consistent practice is more important than long practice sessions. Here's how to structure 
                your practice time for maximum progress:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-amber-50 p-6 rounded-lg text-center">
                  <div className="text-3xl font-bold text-amber-800 mb-2">15</div>
                  <div className="text-amber-600">Minutes daily for beginners</div>
                </div>
                <div className="bg-amber-50 p-6 rounded-lg text-center">
                  <div className="text-3xl font-bold text-amber-800 mb-2">30</div>
                  <div className="text-amber-600">Minutes after first month</div>
                </div>
                <div className="bg-amber-50 p-6 rounded-lg text-center">
                  <div className="text-3xl font-bold text-amber-800 mb-2">5</div>
                  <div className="text-amber-600">Days per week minimum</div>
                </div>
              </div>

              <div className="bg-amber-50 border-l-4 border-amber-400 p-6">
                <h3 className="text-xl font-bold text-amber-800 mb-3">Sample 15-Minute Practice Session</h3>
                <ul className="space-y-2 text-amber-700">
                  <li><strong>5 minutes:</strong> Chord practice and finger exercises</li>
                  <li><strong>5 minutes:</strong> Work on chord changes</li>
                  <li><strong>5 minutes:</strong> Play through your current song</li>
                </ul>
              </div>

              {/* Practice Tips Guide Callout */}
              <div className="bg-amber-100 border-l-4 border-amber-400 p-4 my-8 rounded flex items-center gap-3">
                <span className="text-2xl">💡</span>
                <div>
                  <span className="font-semibold text-amber-800">Want more practice advice?</span> Check out the{' '}
                  <Link href="/blog/essential-practice-tips" className="text-amber-700 underline font-semibold hover:text-amber-900 transition-colors">
                    Practice Tips Guide
                  </Link>
                  {' '}for actionable tips to make your practice more effective.
                </div>
              </div>
            </section>

            {/* Learning Roadmap */}
            <section className="mb-12" id="learning-roadmap" style={{ scrollMarginTop: '2rem' }}>
              <h2 className="text-3xl font-bold text-amber-800 mb-6 text-center">Learning Roadmap</h2>
              
              <p className="text-lg mb-6 text-center">
                Follow this structured approach to build your skills progressively. Each stage builds on 
                the previous one, ensuring solid foundations:
              </p>

              <div className="max-w-3xl mx-auto">
              <div className="space-y-6">
                {/* Stage 1 */}
                <div className="bg-white border border-amber-200 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-amber-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4">1</div>
                    <h3 className="text-xl font-bold text-amber-800">Master A and E Chords</h3>
                  </div>
                  <p className="text-amber-700 mb-3">
                    Focus entirely on getting clean, clear sounds from these two chords and practice changing between them smoothly.
                  </p>
                  <p className="text-amber-600">
                    <strong>Song to learn:</strong> Achy Breaky Heart - Billy Ray Cyrus
                  </p>
                </div>

                {/* Stage 2 */}
                <div className="bg-white border border-amber-200 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-amber-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4">2</div>
                    <h3 className="text-xl font-bold text-amber-800">Add G and D Chords</h3>
                  </div>
                  <p className="text-amber-700 mb-3">
                    Learn the G and D chords and practice three-chord progressions. This opens up hundreds of songs.
                  </p>
                  <p className="text-amber-600 mb-2">
                    <strong>Song to learn:</strong> Bad Moon Rising - Creedence Clearwater Revival
                  </p>
                  <p className="text-amber-600">
                    <strong>Strumming:</strong> Combines <Link href="/blog/guitar-strumming-patterns" className="text-amber-600 hover:text-amber-800 underline">Pattern 6: Down Beats and Syncopated Ending</Link> with all downstrokes
                  </p>
                </div>

                {/* Stage 3 */}
                <div className="bg-white border border-amber-200 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-amber-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4">3</div>
                    <h3 className="text-xl font-bold text-amber-800">Expand to C and Em</h3>
                  </div>
                  <p className="text-amber-700 mb-3">
                    Add C and Em chords to your repertoire. Now you can play the famous four-chord progression found in countless songs.
                  </p>
                  <p className="text-amber-600 mb-2">
                    <strong>Song to learn:</strong> Brown Eyed Girl - Van Morrison
                  </p>
                  <p className="text-amber-600">
                    <strong>Strumming:</strong> <Link href="/blog/guitar-strumming-patterns" className="text-amber-600 hover:text-amber-800 underline">Pattern 4: Skipping an Up and a Down</Link>
                  </p>
                </div>

                {/* Stage 4 */}
                <div className="bg-white border border-amber-200 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-amber-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4">4</div>
                    <h3 className="text-xl font-bold text-amber-800">Single Notes and Picking</h3>
                  </div>
                  <p className="text-amber-700 mb-3">
                    Before completing your chord foundation, learn to play single notes and develop your picking technique. 
                    This builds finger independence and prepares you for more advanced playing.
                  </p>
                  <div className="space-y-2 text-amber-600">
                    <p><strong>Simple melodies to learn:</strong></p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>Mary Had a Little Lamb (great for finger positioning)</li>
                      <li>Achy Breaky Heart vocal melody (connects to your first chord song)</li>
                      <li>Any familiar song melody - taking melodies from songs you know makes practice fun and musical</li>
                    </ul>
                    <p><strong>Important:</strong> Always start by learning songs at a slow tempo, sometimes quite a lot slower depending on your skill level. It's essential that you first learn to play accurately at slow speed before gradually increasing the tempo.</p>
                    <p><strong>Picking exercises:</strong></p>
                    <ul className="list-disc list-inside ml-4 space-y-1 mb-3">
                      <li>Play simple rhythms on one string - practice steady picking motion</li>
                      <li>Use my <Link href="/rhythm-tool" className="text-amber-600 hover:text-amber-800 underline">Rhythm Tool</Link> for single string rhythm exercises</li>
                      <li>Learn to pick individual chord notes (arpeggios) for smooth, controlled motion</li>
                    </ul>
                    <p><strong>Major scales on one string:</strong></p>
                    <ul className="list-disc list-inside ml-4 space-y-1 mb-3">
                      <li>Learn major scale patterns on individual strings to understand the sound of the scale</li>
                      <li>Understand where the whole and half steps are (W = 2 frets, H = 1 fret)</li>
                      <li>Major scale pattern: W-W-H-W-W-W-H (e.g., C major: C-D-E-F-G-A-B-C)</li>
                                             <li>See my comprehensive <Link href="/blog/beginners-guide-guitar-scales" className="text-amber-600 hover:text-amber-800 underline">Beginner's Guide to Guitar Scales</Link> for detailed scale learning</li>
                    </ul>
                    <p><strong>Finger exercises:</strong></p>
                    <ul className="list-disc list-inside ml-4 space-y-1">
                      <li>One finger per fret patterns on one string (e.g., frets 1-2-3-4 using fingers 1-2-3-4)</li>
                      <li>Expand to two strings for coordination between picking and fretting hands</li>
                      <li>Focus on clean notes and steady timing rather than speed</li>
                    </ul>
                  </div>
                </div>

                {/* Stage 5 */}
                <div className="bg-white border border-amber-200 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-amber-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4">5</div>
                    <h3 className="text-xl font-bold text-amber-800">Complete Your Foundation</h3>
                  </div>
                  <p className="text-amber-700 mb-3">
                    Learn the remaining foundation chords: Am and Dm. These complete your essential chord vocabulary.
                  </p>
                  <p className="text-amber-600">
                    <strong>Achievement:</strong> You can now play hundreds of popular songs!
                  </p>
                </div>
                </div>
              </div>
            </section>

            {/* Common Mistakes */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-amber-800 mb-6">Common Beginner Mistakes to Avoid</h2>
              
              <div className="space-y-4">
                <div className="bg-red-50 border-l-4 border-red-400 p-6">
                  <h3 className="text-lg font-bold text-red-800 mb-2">Pressing Too Hard</h3>
                  <p className="text-red-700">
                    Many beginners press the strings much harder than necessary, causing hand fatigue and poor tone. 
                    Use just enough pressure to get a clear, clean note - you'll be surprised how little force is actually needed.
                  </p>
                </div>

                <div className="bg-red-50 border-l-4 border-red-400 p-6">
                  <h3 className="text-lg font-bold text-red-800 mb-2">Pulling Down on Strings Instead of Pressing</h3>
                  <p className="text-red-700">
                    Press straight down on the strings rather than pulling them towards the floor. Pulling down 
                    bends the strings out of tune and makes clean notes impossible to achieve.
                  </p>
                </div>
                
                <div className="bg-red-50 border-l-4 border-red-400 p-6">
                  <h3 className="text-lg font-bold text-red-800 mb-2">Inconsistent Practice Schedule</h3>
                  <p className="text-red-700">
                    Practicing for 2 hours once a week is far less effective than 15 minutes every day. 
                    Regular, consistent practice builds muscle memory and finger strength much more efficiently.
                  </p>
                </div>
                
                <div className="bg-red-50 border-l-4 border-red-400 p-6">
                  <h3 className="text-lg font-bold text-red-800 mb-2">Poor Posture and Hand Position</h3>
                  <p className="text-red-700">
                    Slouching or awkward hand positions create unnecessary tension and make playing more difficult. 
                    Sit up straight, keep your shoulders relaxed, and position the guitar comfortably against your body.
                  </p>
                </div>
                
                <div className="bg-red-50 border-l-4 border-red-400 p-6">
                  <h3 className="text-lg font-bold text-red-800 mb-2">Rushing Through the Fundamentals</h3>
                  <p className="text-red-700">
                    Trying to learn too many chords too quickly leads to sloppy technique. Master each chord completely 
                    before moving to the next - solid foundations will accelerate your progress in the long run.
                  </p>
                </div>
              </div>
            </section>



            {/* Call to Action */}
            <section className="bg-gradient-to-r from-amber-600 to-amber-700 text-white p-8 rounded-lg text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Start Your Guitar Journey?</h2>
              <p className="text-xl text-amber-100 mb-6">
                Get personalized guidance from an experienced teacher and accelerate your learning.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="bg-white text-amber-800 px-8 py-3 rounded-lg font-semibold hover:bg-amber-50 transition-colors">
                  Book Your First Lesson
                </Link>
                <Link href="/lessons" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-amber-800 transition-colors">
                  View Lesson Options
                </Link>
              </div>
            </section>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      <section className="section-padding bg-amber-50">
        <div className="container-max">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-amber-800 mb-8 text-center">Continue Your Learning Journey</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link href="/blog/essential-practice-tips" className="group">
                <div className="card hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold text-amber-800 mb-2 group-hover:text-amber-600">
                    Essential Practice Tips for Guitar Success
                  </h3>
                  <p className="text-amber-700 mb-4">
                    Discover proven practice techniques that will accelerate your guitar learning and keep you motivated.
                  </p>
                  <div className="flex items-center text-amber-600">
                    <span>Read more</span>
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </div>
                </div>
              </Link>
              
              <Link href="/blog/chord-transitions-common-fingers" className="group">
                <div className="card hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold text-amber-800 mb-2 group-hover:text-amber-600">
                    Master Chord Transitions with Common Fingers
                  </h3>
                  <p className="text-amber-700 mb-4">
                    Learn the secret to smooth chord changes by identifying and using common finger positions.
                  </p>
                  <div className="flex items-center text-amber-600">
                    <span>Read more</span>
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 