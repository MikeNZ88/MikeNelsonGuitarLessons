import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Clock, Target, Music, BookOpen, Users, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: "6 Essential Practice Tips for Guitar Students | Mike Nelson Guitar Lessons",
  description: "Master these fundamental practice techniques to accelerate your guitar learning journey. Expert advice from a Wellington guitar teacher with years of experience.",
  keywords: "guitar practice tips, learn guitar wellington, guitar teacher advice, effective practice, guitar lessons",
  openGraph: {
    title: "6 Essential Practice Tips for Guitar Students",
    description: "Master these fundamental practice techniques to accelerate your guitar learning journey. Expert advice from a Wellington guitar teacher with years of experience.",
    images: [
      {
        url: '/blog-thumbnail.svg',
        width: 1200,
        height: 630,
        alt: '6 Essential Practice Tips for Guitar Students',
      },
    ],
    type: 'article',

  },
  twitter: {
    card: 'summary_large_image',
    title: "6 Essential Practice Tips for Guitar Students",
    description: "Master these fundamental practice techniques to accelerate your guitar learning journey. Expert advice from a Wellington guitar teacher with years of experience.",
    images: ['/blog-thumbnail.svg'],
  },
};

export default function EssentialPracticeTips() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back to Blog */}
        <Link 
          href="/blog" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Link>

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>8 min read</span>
            </div>
            <div className="flex items-center gap-1">
              <Target className="w-4 h-4" />
              <span>Practice Methods</span>
            </div>

          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-amber-600 mb-6">
            6 Essential Practice Tips for Guitar Students
          </h1>
          
          <p className="text-xl text-gray-600 leading-relaxed">
            Master these fundamental practice techniques to accelerate your guitar learning journey. 
            From proper technique to effective practice routines.
          </p>
        </header>

        {/* Featured Image */}
        <div className="mb-12">
          <img 
            src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
            alt="Guitar practice session"
            className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Article Content */}
        <article className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-8">
            As a guitar teacher in Wellington, I've worked with hundreds of students over the years. 
            I've noticed that the students who progress fastest all share certain practice habits. 
            Here are my top 6 essential practice tips that will transform your guitar learning experience.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8 rounded-r-lg">
            <h3 className="text-xl font-semibold text-blue-900 mb-2">Why These Tips Matter</h3>
            <p className="text-blue-800">
              These aren't just theoretical concepts – they're practical strategies I use with my students 
              in Pukerua Bay, Plimmerton, and throughout the Wellington region. Every tip has been tested 
              and proven effective in real-world guitar lessons.
            </p>
          </div>

          <h2 className="text-3xl font-bold text-amber-600 mb-6 flex items-center gap-3">
            <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold">1</span>
            Start Slow, Build Speed Gradually
          </h2>
          
          <p className="mb-6">
            This is the most important advice I give to all my students. When learning a new song, chord progression, 
            or technique, always start at a tempo where you can play it perfectly. This might feel frustratingly slow 
            at first, but it's the fastest way to build muscle memory correctly.
          </p>

          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h4 className="font-semibold text-amber-600 mb-3">Practical Application:</h4>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                Use a metronome and start at 60 BPM for new material
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                Only increase tempo by 5-10 BPM once you can play perfectly 3 times in a row
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                If you make mistakes, slow down rather than pushing through
              </li>
            </ul>
          </div>

          <h2 className="text-3xl font-bold text-amber-600 mb-6 flex items-center gap-3">
            <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold">2</span>
            Challenge Yourself with Speed Bursts
          </h2>
          
          <p className="mb-6">
            While starting slow is essential, occasionally practicing beyond your current ability can accelerate progress. 
            Once you can play something correctly at a comfortable tempo, try short bursts at faster speeds. 
            This pushes your neural pathways, reveals weak spots, and makes your target tempo feel easier.
          </p>

          <div className="bg-orange-50 border border-orange-200 p-6 rounded-lg mb-8">
            <h4 className="font-semibold text-orange-900 mb-3">How to Practice Speed Safely:</h4>
            <ul className="space-y-2 text-orange-800">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                Only attempt after you can play the piece perfectly at a slower tempo
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                Practice in short 30-60 second bursts
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                Focus on keeping the rhythm going, don't worry about perfection
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                Always return to your solid tempo afterward
              </li>
            </ul>
          </div>

          <h2 className="text-3xl font-bold text-amber-600 mb-6 flex items-center gap-3">
            <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold">3</span>
            Practice in Short, Focused Sessions
          </h2>
          
          <p className="mb-6">
            Quality beats quantity every time. I'd rather see a student practice for 15 minutes with complete 
            focus than spend an hour mindlessly strumming. Your brain needs time to process and consolidate 
            what you've learned.
          </p>

          <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg mb-8">
            <h4 className="font-semibold text-yellow-900 mb-4">Recommended Practice Schedule:</h4>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg border border-yellow-300">
                <h5 className="font-semibold text-yellow-900 mb-2">Daily Practice:</h5>
                <p className="text-yellow-800">15-30 minutes of focused practice</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-yellow-300">
                <h5 className="font-semibold text-yellow-900 mb-2">Weekly Goal:</h5>
                <p className="text-yellow-800">1.75-3.5 hours total (consistent daily sessions beat longer sporadic ones)</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-yellow-300">
                <h5 className="font-semibold text-yellow-900 mb-2">Fastest Progress:</h5>
                <p className="text-yellow-800">45-60 minutes daily with deliberate practice (5.25-7 hours weekly)</p>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-amber-600 mb-6 flex items-center gap-3">
            <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold">4</span>
            Focus on Problem Areas
          </h2>
          
          <p className="mb-6">
            Don't just play through songs from start to finish. Identify the specific bars, chord changes, 
            or techniques that are giving you trouble and isolate them. This targeted practice approach 
            will solve problems much faster than repeated run-throughs.
          </p>

          <h2 className="text-3xl font-bold text-amber-600 mb-6 flex items-center gap-3">
            <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold">5</span>
            Use Proper Posture and Hand Position
          </h2>
          
          <p className="mb-6">
            Bad habits formed early are incredibly difficult to break later. Make sure you're sitting or 
            standing correctly, holding the guitar properly, and using correct hand positions. If you're 
            not sure, book a lesson – even one session can save you months of struggling with poor technique.
          </p>

          <h2 className="text-3xl font-bold text-amber-600 mb-6 flex items-center gap-3">
            <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold">6</span>
            Record Yourself Playing
          </h2>
          
          <p className="mb-6">
            This tip often surprises students, but recording yourself is incredibly valuable. You'll hear 
            timing issues, missed notes, and areas for improvement that you might not notice while playing. 
            Use your phone's voice recorder – it doesn't need to be fancy.
          </p>

          <h2 className="text-3xl font-bold text-amber-600 mb-6">How PracticeTrack Supports Your Practice Journey</h2>
          
          <p className="mb-6">
            Each of these 6 tips becomes more effective when you track your progress consistently. 
            PracticeTrack helps you implement these strategies by providing:
          </p>

          <div className="bg-amber-50 border border-amber-200 p-6 rounded-lg mb-8">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="bg-amber-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">1</span>
                <div>
                  <h4 className="font-semibold text-amber-900">Tempo Tracking</h4>
                  <p className="text-amber-800">Log your practice tempos and watch your speed progress over time</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="bg-amber-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">2</span>
                <div>
                  <h4 className="font-semibold text-amber-900">Speed Burst Records</h4>
                  <p className="text-amber-800">Note when you attempt faster speeds and track breakthrough moments</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="bg-amber-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">3</span>
                <div>
                  <h4 className="font-semibold text-amber-900">Session Duration</h4>
                  <p className="text-amber-800">Track your focused practice time and maintain consistency</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="bg-amber-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">4</span>
                <div>
                  <h4 className="font-semibold text-amber-900">Problem Area Notes</h4>
                  <p className="text-amber-800">Document specific challenges and track your progress on difficult sections</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="bg-amber-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">5</span>
                <div>
                  <h4 className="font-semibold text-amber-900">Technique Development</h4>
                  <p className="text-amber-800">Record posture and technique improvements in your practice log</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-amber-200">
              <p className="text-amber-800 mb-4">
                Ready to supercharge your practice routine? Start tracking your progress today.
              </p>
              <a 
                href="https://practicetrackapp.com/landing.html" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors font-semibold"
              >
                Get Started with PracticeTrack (free)
              </a>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-amber-600 mb-6">Putting It All Together</h2>
          
          <p className="mb-6">
            Remember, effective practice is about consistency and quality, not just time spent with the guitar. 
            Start implementing these tips gradually – don't try to change everything at once. Pick one or two 
            tips to focus on this week, then add more as they become habits.
          </p>

          <p className="mb-8">
            Every student's journey is different, and what works best can vary from person to person. That's 
            why I offer personalized lessons throughout the Wellington region, helping students develop 
            practice routines that work for their lifestyle and goals.
          </p>

          <div className="border-t pt-8">
            <p className="text-gray-600 italic">
              Mike Nelson teaches guitar lessons in Pukerua Bay, Plimmerton, Cambourne, Mana, Paremata, Papakowhai, and Whitby.
            </p>
          </div>
        </article>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t">
          <Link 
            href="/blog" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
          
          <Link 
            href="/lessons" 
            className="inline-flex items-center bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors"
          >
            <Music className="w-4 h-4 mr-2" />
            View Lessons
          </Link>
        </div>
      </div>
    </div>
  );
} 