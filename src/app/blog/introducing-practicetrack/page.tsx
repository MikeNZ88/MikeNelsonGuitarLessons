import Link from 'next/link';
import { ArrowLeft, Clock, User, Music } from 'lucide-react';

export default function IntroducingPracticeTrackPost() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-800 to-orange-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <Link href="/blog" className="inline-flex items-center text-amber-200 hover:text-white transition-colors mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
          <h1 className="text-4xl font-bold mb-2">Introducing PracticeTrack</h1>
          <div className="flex items-center text-amber-200 space-x-4">
            <div className="flex items-center">
              <User className="w-4 h-4 mr-1" />
              Mike Nelson
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              6 min read
            </div>
            <div className="flex items-center">
              <Music className="w-4 h-4 mr-1" />
              Practice Tools
            </div>
            <span>May 25, 2025</span>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <img 
              src="/blog-thumbnail.svg" 
              alt="PracticeTrack app interface - comprehensive practice tool for musicians" 
              className="w-full h-48 object-cover rounded-lg mb-8"
            />
            
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-600 mb-8">
                I'm excited to introduce you to PracticeTrack, a comprehensive online practice tool designed to help musicians of all levels improve their skills through structured, effective practice sessions.
              </p>

              <h2 className="text-2xl font-bold text-gray-800 mb-4">What is PracticeTrack?</h2>
              <p className="mb-6">
                PracticeTrack is an online platform that combines a practice timer, session tracking, goal setting, and educational resources all in one place. Whether you're a beginner learning your first chords or an advanced player working on complex pieces, PracticeTrack helps you practice more effectively.
              </p>

              <h2 className="text-2xl font-bold text-gray-800 mb-4">Key Features</h2>
              
              <h3 className="text-xl font-semibold text-gray-700 mb-3">Practice Timer</h3>
              <p className="mb-4">
                Track your practice time with our intuitive timer. Switch between regular timing and countdown modes, and use the built-in metronome to keep perfect time during your sessions.
              </p>

              <h3 className="text-xl font-semibold text-gray-700 mb-3">Session Management</h3>
              <p className="mb-4">
                Log and review your practice sessions. See what you've worked on, track your progress over time, and identify patterns in your practice habits.
              </p>

              <h3 className="text-xl font-semibold text-gray-700 mb-3">Goal Setting & Stats</h3>
              <p className="mb-4">
                Set practice goals and monitor your progress with detailed statistics. Visualize your improvement and stay motivated with clear metrics.
              </p>

              <h3 className="text-xl font-semibold text-gray-700 mb-3">Media Recording</h3>
              <p className="mb-4">
                Record your practice sessions and track your progress over time. Hearing yourself play is one of the most effective ways to identify areas for improvement.
              </p>

              <h3 className="text-xl font-semibold text-gray-700 mb-3">Educational Resources</h3>
              <p className="mb-6">
                Access our comprehensive guide on "How to Practice Effectively," featuring research-backed strategies and techniques used by musicians.
              </p>

              <div className="bg-blue-50 border-l-4 border-blue-400 p-6 my-8">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">Research-Based Approach</h3>
                <p className="text-blue-700 mb-4">
                  PracticeTrack is built on decades of research into effective practice methods. Our "How to Practice" guide includes findings from studies on deliberate practice, showing that quality of practice matters more than quantity.
                </p>
                <ul className="text-blue-700 space-y-2">
                  <li>• Top performers practice deliberately for 3-4 hours daily in distributed sessions</li>
                  <li>• Successful students use distinctive strategies: immediate error identification and problem isolation</li>
                  <li>• Interleaved practice leads to better long-term retention than blocked practice</li>
                </ul>
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mb-4">How to Get Started</h2>
              <p className="mb-4">
                Getting started with PracticeTrack is simple:
              </p>
              <ol className="mb-6 space-y-2">
                <li>1. Sign up for your free account</li>
                <li>2. Set your practice goals</li>
                <li>3. Start your first timed practice session</li>
                <li>4. Use the built-in resources to structure effective practice</li>
                <li>5. Track your progress and adjust your approach as needed</li>
              </ol>

              <div className="bg-amber-50 border-l-4 border-amber-400 p-6 my-8">
                <h3 className="text-lg font-semibold text-amber-800 mb-2">Perfect for Guitar Students</h3>
                <p className="text-amber-700">
                  As a guitar instructor, I've integrated PracticeTrack into my teaching methodology. My students who use the platform consistently show faster progress and better practice habits. The combination of timing, goal-setting, and self-reflection creates a powerful learning environment.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mb-4">The Science of Effective Practice</h2>
              <p className="mb-4">
                PracticeTrack incorporates proven principles from music education research:
              </p>
              <ul className="mb-6 space-y-2">
                <li><strong>Deliberate Practice:</strong> Focused, goal-oriented practice with immediate feedback</li>
                <li><strong>Chunking:</strong> Breaking complex skills into manageable sections</li>
                <li><strong>Distributed Practice:</strong> Regular, shorter sessions are more effective than marathon sessions</li>
                <li><strong>Self-Monitoring:</strong> Recording and reviewing your playing for objective feedback</li>
              </ul>

              <h2 className="text-3xl font-bold mb-4">Ready to start your guitar journey?</h2>

              <div className="text-center">
                <a 
                  href="https://practicetrackapp.com/landing.html" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-amber-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors"
                >
                  Learn More About PracticeTrack
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 