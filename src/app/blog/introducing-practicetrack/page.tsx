import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Clock, Target, Music, BarChart3, Settings, Smartphone, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: "Introducing PracticeTrack - Your Musical Journey Companion | Mike Nelson Guitar Lessons",
  description: "Discover PracticeTrack, a free practice tracking app designed to help musicians improve through deliberate, structured practice with goals and analytics.",
  keywords: "practice tracking app, music practice, guitar practice, practice timer, music goals, practice analytics, deliberate practice",
};

export default function IntroducingPracticeTrack() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back to Blog */}
        <Link 
          href="/blog" 
          className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Link>

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>6 min read</span>
            </div>
            <div className="flex items-center gap-1">
              <Target className="w-4 h-4" />
              <span>Practice Tools</span>
            </div>

          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-amber-600 mb-6">
            Introducing PracticeTrack: The Practice Log That Actually Works
          </h1>
          
          <p className="text-xl text-gray-600 leading-relaxed">
            Transform your practice sessions with deliberate tracking, goal setting, and analytics. 
            PracticeTrack helps musicians of all levels practice more effectively and see real progress.
          </p>
        </header>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-orange-100 to-amber-100 rounded-xl p-8 mb-12 border border-orange-200">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-amber-600 mb-4">Track Your Music Practice</h2>
            <p className="text-lg text-gray-700 mb-6">
              PracticeTrack lets you log your practice sessions and see your progress over time. 
              Your data syncs across devices when you create an account.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold">
                100% Free
              </span>
              <a 
                href="https://practicetrack.netlify.app/landing.html" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-orange-600 text-white px-8 py-4 rounded-lg hover:bg-orange-700 transition-colors font-semibold"
              >
                Start Using PracticeTrack Now
              </a>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <article className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-8">
            As a guitar teacher, I've seen countless students struggle with inconsistent practice habits. 
            They practice sporadically, lack clear goals, and have no way to track their progress. 
            That's why I created PracticeTrack - a comprehensive practice companion designed to help 
            musicians practice more deliberately and effectively.
          </p>

          <h2 className="text-3xl font-bold text-amber-600 mb-6">Why Practice Tracking Matters</h2>
          
          <div className="bg-amber-50 border-l-4 border-amber-500 p-6 mb-8 rounded-r-lg">
            <h3 className="text-xl font-semibold text-amber-900 mb-2">Research-Backed Approach</h3>
            <p className="text-amber-800">
              Research shows that deliberate, structured practice with clear goals and regular feedback 
              is key to musical improvement. PracticeTrack is designed based on principles from music 
              education research to help you practice more effectively.
            </p>
          </div>

          <p className="mb-8">
            With tracking, you become more aware of your practice habits - whether you're spending 
            enough time on challenging sections, working on a variety of material, or practicing with 
            clear objectives. PracticeTrack helps make your practice more intentional and measurable.
          </p>

          <h2 className="text-3xl font-bold text-amber-600 mb-6">Key Features</h2>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-orange-200">
              <div className="flex items-center mb-4">
                <Clock className="w-6 h-6 text-orange-600 mr-3" />
                <h3 className="text-xl font-semibold text-orange-800">Practice Timer</h3>
              </div>
              <p className="text-gray-700">
                Track your practice time with our intuitive timer. Built-in metronome with multiple 
                time signatures and sounds helps you stay on beat during focused practice sessions.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-orange-200">
              <div className="flex items-center mb-4">
                <Music className="w-6 h-6 text-orange-600 mr-3" />
                <h3 className="text-xl font-semibold text-orange-800">Session Tracking</h3>
              </div>
              <p className="text-gray-700">
                Log and categorize your practice, add detailed notes, and review your history to 
                stay accountable and track your progress over time.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-orange-200">
              <div className="flex items-center mb-4">
                <Target className="w-6 h-6 text-orange-600 mr-3" />
                <h3 className="text-xl font-semibold text-orange-800">Goal Setting</h3>
              </div>
              <p className="text-gray-700">
                Set specific, measurable goals for your practice. Track progress toward time-based 
                targets and see your completion rates improve.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-orange-200">
              <div className="flex items-center mb-4">
                <BarChart3 className="w-6 h-6 text-orange-600 mr-3" />
                <h3 className="text-xl font-semibold text-orange-800">Detailed Statistics</h3>
              </div>
              <p className="text-gray-700">
                Analyze your practice patterns with comprehensive statistics. See total practice time, 
                frequency, category breakdowns, and goal completion rates.
              </p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-amber-600 mb-6">Smart Organization Features</h2>

          <div className="bg-orange-50 rounded-xl p-8 border border-orange-200 mb-8">
            <h3 className="text-xl font-semibold text-amber-900 mb-4">Smart Category System</h3>
            <p className="text-amber-800 mb-4">
              PracticeTrack organizes your practice into two main types: <strong>Songs</strong> and <strong>Exercises</strong>. 
              This simple but powerful distinction helps you balance repertoire building with technical development.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-white p-4 rounded-lg border border-orange-300">
                <h4 className="font-semibold text-amber-900 mb-2">Songs</h4>
                <p className="text-amber-800 text-sm">Track time spent learning and perfecting specific pieces of music</p>
              </div>
              <div className="bg-white p-4 rounded-lg border border-orange-300">
                <h4 className="font-semibold text-amber-900 mb-2">Exercises</h4>
                <p className="text-amber-800 text-sm">Log technical practice like scales, arpeggios, and technique drills</p>
              </div>
            </div>
            <div className="bg-amber-100 p-4 rounded-lg border border-amber-300">
              <h4 className="font-semibold text-amber-900 mb-2">Need Ideas?</h4>
              <p className="text-amber-800 text-sm">
                Visit the <strong>Resources</strong> tab to find pre-made practice categories for various instruments. 
                These give you structured ideas for organizing your practice sessions effectively.
              </p>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h4 className="font-semibold text-amber-600 mb-3">Powerful Search & Filtering</h4>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                All stats, sessions, goals, and media are searchable and filterable by date
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                Sessions and stats can be filtered by category
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                Access a comprehensive library of pre-made categories for various instruments
              </li>
            </ul>
          </div>

          <h2 className="text-3xl font-bold text-amber-600 mb-6">Media Storage & Documentation</h2>
          
          <p className="mb-6">
            PracticeTrack goes beyond simple time tracking. You can record audio, photos, and videos 
            directly in the app, or upload existing media files (photos, videos, audio, documents). 
            This lets you document your progress visually and audibly.
          </p>

          <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg mb-8">
            <h4 className="font-semibold text-blue-900 mb-3">Storage Details:</h4>
            <ul className="space-y-2 text-blue-800">
              <li><strong>Mobile browsers:</strong> Typically allow 250MB-1GB of media storage</li>
              <li><strong>Desktop browsers:</strong> Allow 500MB-2GB of media storage</li>
              <li><strong>Notes & Sessions:</strong> Automatically stored in the database, accessible across all devices</li>
            </ul>
          </div>

          <h2 className="text-3xl font-bold text-amber-600 mb-6">Install as a Progressive Web App</h2>
          
          <p className="mb-6">
            For the best experience, install PracticeTrack as a Progressive Web App (PWA). This gives you 
            a native app-like experience with offline capabilities and easy access from your home screen.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 border border-orange-200">
              <div className="flex items-center mb-4">
                <Smartphone className="w-6 h-6 text-orange-600 mr-3" />
                <h3 className="text-lg font-semibold text-orange-800">iOS Installation</h3>
              </div>
              <ol className="space-y-2 text-gray-700 text-sm">
                <li>1. Register for PracticeTrack and verify email</li>
                <li>2. Login to your account</li>
                <li>3. Tap the Share button at the bottom</li>
                <li>4. Scroll down and tap "Add to Home Screen"</li>
                <li>5. Tap "Add"</li>
              </ol>
            </div>
            
            <div className="bg-white rounded-lg p-6 border border-orange-200">
              <div className="flex items-center mb-4">
                <Settings className="w-6 h-6 text-orange-600 mr-3" />
                <h3 className="text-lg font-semibold text-orange-800">PC/Android Installation</h3>
              </div>
              <ol className="space-y-2 text-gray-700 text-sm">
                <li>1. Register for PracticeTrack and verify email</li>
                <li>2. Login to your account</li>
                <li>3. Tap the three-dot menu in top right</li>
                <li>4. Select "Add to Home screen" or "Install app"</li>
                <li>5. Confirm by tapping "Install"</li>
              </ol>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-amber-600 mb-6">How PracticeTrack Transforms Your Practice</h2>
          
          <p className="mb-6">
            I've seen the difference that structured practice makes in my students' progress. Those who 
            track their practice consistently show faster improvement, better technique development, 
            and stronger motivation to continue learning.
          </p>

          <div className="bg-amber-50 border border-amber-200 p-6 rounded-lg mb-8">
            <h4 className="font-semibold text-amber-900 mb-4">Real Benefits You'll Experience:</h4>
            <ul className="space-y-3 text-amber-800">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <span><strong>Increased Accountability:</strong> Seeing your practice time logged motivates consistency</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <span><strong>Clear Progress Tracking:</strong> Visual evidence of improvement over time</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <span><strong>Better Focus:</strong> Categorized practice sessions keep you on track</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <span><strong>Goal Achievement:</strong> Set and reach specific practice milestones</span>
              </li>
            </ul>
          </div>

          <p className="mb-8">
            PracticeTrack is simply a tool to help you track what you're working on and see your progress over time. 
            It works for any instrument and any skill level.
          </p>

          <div className="border-t pt-8">
            <p className="text-gray-600 italic">
              PracticeTrack was created by Mike Nelson, who teaches guitar lessons in Pukerua Bay, Plimmerton, 
              Cambourne, Mana, Paremata, Papakowhai, and Whitby.
            </p>
          </div>
        </article>

        {/* Call to Action */}
        <section className="text-center py-12 bg-gradient-to-r from-orange-100 to-amber-100 rounded-xl border border-orange-200 mt-12">
          <h2 className="text-3xl font-bold text-amber-600 mb-4">Want to Try PracticeTrack?</h2>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            It's completely free to use. Give it a try and see if tracking your practice helps you stay more consistent.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://practicetrack.netlify.app/landing.html" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-orange-600 text-white px-8 py-4 rounded-lg hover:bg-orange-700 transition-colors font-semibold"
            >
              <Music className="w-5 h-5 mr-2" />
              Start Using PracticeTrack (Free)
            </a>
            <Link 
              href="/contact" 
              className="inline-flex items-center bg-white text-orange-600 border-2 border-orange-600 px-8 py-4 rounded-lg hover:bg-orange-50 transition-colors font-semibold"
            >
              <Target className="w-5 h-5 mr-2" />
              Book a Lesson
            </Link>
          </div>
        </section>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mt-12 pt-8 border-t border-orange-200">
          <Link 
            href="/blog" 
            className="inline-flex items-center text-orange-600 hover:text-orange-700 transition-colors"
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