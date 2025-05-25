'use client';

import Link from 'next/link';
import { BookOpen, Youtube, Download, ExternalLink, X } from 'lucide-react';
import { useState } from 'react';

export default function Resources() {
  const [showPracticeTrackGuide, setShowPracticeTrackGuide] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');

  const videos = [
    {
      id: "TuMh30hSxwA",
      title: "How to Read Chord Diagrams",
      description: "Learn the fundamentals of reading guitar chord diagrams"
    },
    {
      id: "rtZX7lOVlOw",
      title: "Scales and the Guitar",
      description: "Understanding scales and their application on guitar"
    },
    {
      id: "ekZch53EzIw",
      title: "Strumming Chords - The Basics of Staying in Time",
      description: "Learn essential strumming techniques and how to maintain steady timing"
    }
  ];

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-800 via-amber-700 to-amber-600 text-white section-padding">
        <div className="container-max text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-playfair mb-4">
            Resources
          </h1>
          <p className="text-xl text-amber-100 max-w-3xl mx-auto">
            Resources to accelerate your guitar learning journey
          </p>
        </div>
      </section>

      {/* PracticeTrack Section */}
      <section className="section-padding bg-gradient-to-br from-orange-600 via-orange-500 to-red-500 text-white">
        <div className="container-max">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <h2 className="text-4xl md:text-5xl font-bold font-playfair mb-4">
                Practice<span className="text-yellow-300">Track</span>
              </h2>
              <p className="text-xl text-orange-100 mb-2">
                Your Musical Journey Companion
              </p>
              <div className="inline-block bg-amber-800 text-white px-4 py-2 rounded-full text-lg font-bold mb-4">
                FREE
              </div>
            </div>
            
            <p className="text-lg text-orange-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform your guitar practice with PracticeTrack - a comprehensive practice management app designed to help musicians of all levels organize, track, and optimize their practice sessions. Whether you're working on scales, songs, or technique exercises, PracticeTrack keeps you focused and motivated.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="text-3xl mb-3">⏱️</div>
                <h3 className="font-bold mb-2">Practice Timer</h3>
                <p className="text-sm text-orange-100">Track your practice time with built-in timers and session management</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="text-3xl mb-3">🎯</div>
                <h3 className="font-bold mb-2">Goal Setting</h3>
                <p className="text-sm text-orange-100">Set and achieve practice goals with progress tracking and analytics</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="text-3xl mb-3">📊</div>
                <h3 className="font-bold mb-2">Progress Stats</h3>
                <p className="text-sm text-orange-100">Visualize your improvement with detailed practice statistics</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowPracticeTrackGuide(true)}
                className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-colors flex items-center justify-center"
              >
                <BookOpen className="h-5 w-5 mr-2" />
                View User Guide
              </button>
              <a
                href="https://practicetrackapp.com/landing.html"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors flex items-center justify-center"
              >
                <ExternalLink className="h-5 w-5 mr-2" />
                Visit PracticeTrack
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Guitar Shapes Guide Section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <BookOpen className="h-8 w-8 text-amber-600 mr-3" />
              <h2 className="text-3xl md:text-4xl font-bold font-playfair text-amber-800">
                Guitar Shapes Guide
              </h2>
            </div>
            
            <p className="text-lg text-amber-700 mb-6 text-center">
              I've created this comprehensive guide to major scale modes and arpeggios to help you master essential guitar shapes and patterns across the fretboard.
            </p>
            
            <div className="flex flex-col gap-4 mb-8 justify-center items-center">
              <a
                href="https://mikenelsonguitar.gumroad.com/l/fxzquj"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex items-center justify-center"
              >
                <Download className="h-5 w-5 mr-2" />
                Download the Guide
              </a>
              <span className="text-amber-600 text-sm">for NZ$20. Available at Gumroad.com.</span>
            </div>

            <p className="text-lg text-amber-700 mb-6 text-center">
              By building a solid foundation in guitar fundamentals and music theory, and by equipping you with transposition techniques, this guide will empower you to confidently explore and learn additional scales. In doing so, it opens up a world of musical possibilities. Here's what you'll discover:
            </p>
            
            <ul className="space-y-4 text-amber-700 mb-8">
              <li className="flex items-start">
                <span className="text-amber-600 mr-3 mt-1">•</span>
                <div>
                  <strong>A Different Approach to Scale Learning:</strong> Master one‑octave shapes and their core intervals—a departure from traditional methods that cover all six strings and multiple octaves. The guide shows how these shapes vary with different string sets, making them easier to visualize, transpose, and incorporate into your playing. You'll also see how these smaller building blocks combine to form larger shapes.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-3 mt-1">•</span>
                <div>
                  <strong>Scale Fundamentals and Shapes:</strong> Dive into the C Major scale as the foundation of Western music theory, and explore detailed one‑ and two‑octave, as well as 3 note‑per‑string shapes for both C Major and its relative, A Minor.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-3 mt-1">•</span>
                <div>
                  <strong>Fretboard Mastery:</strong> Gain practical insights into fret and string relationships, efficient left‑hand fingerings, and shifting techniques. Mastering these elements not only improves your technique but also makes it effortless to move familiar shapes across the fretboard.
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-amber-600 mr-3 mt-1">•</span>
                <div>
                  <strong>Modes, Chords, and Arpeggios:</strong> Explore the seven modes derived from the Major scale and understand that shifting the tonal centre creates the unique sound of each mode. This guide also covers chord construction with clear diagrams for Major, Minor, Diminished, and 7th chords, as well as arpeggio shapes. It further explains the essential Major and Minor Pentatonic Scales and their relationship with the Major and Minor.
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* YouTube Videos Section */}
      <section className="section-padding bg-amber-50">
        <div className="container-max">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Youtube className="h-8 w-8 text-red-600 mr-3" />
              <h2 className="text-3xl md:text-4xl font-bold font-playfair text-amber-800">
                YouTube Lessons
              </h2>
            </div>
            <p className="text-lg text-amber-700">
              Free video tutorials to help you learn guitar fundamentals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {videos.map((video, index) => (
              <div key={index} className="card">
                <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title}
                    className="w-full h-full"
                    frameBorder="0"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
                <h3 className="text-lg font-bold text-amber-800 mb-2">{video.title}</h3>
                <p className="text-amber-600 text-sm mb-4">{video.description}</p>
                <a
                  href={`https://www.youtube.com/watch?v=${video.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-600 hover:text-amber-800 text-sm flex items-center"
                >
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Watch on YouTube
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-amber-600 to-amber-700 text-white">
        <div className="container-max text-center">
          <h2 className="text-4xl md:text-6xl font-bold font-playfair mb-6">
            Ready to start your guitar journey?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary bg-white text-amber-800 hover:bg-amber-50">
              Book a Lesson
            </Link>
            <Link href="/lessons" className="btn-secondary bg-transparent text-white border-white hover:bg-white hover:text-amber-800">
              View Lesson Options
            </Link>
          </div>
        </div>
      </section>

      {/* PracticeTrack Guide Modal */}
      {showPracticeTrackGuide && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  Practice<span className="text-orange-600">Track</span> User Guide
                </h2>
                <button 
                  onClick={() => setShowPracticeTrackGuide(false)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="mb-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  <button 
                    onClick={() => setActiveSection('overview')} 
                    className={`px-4 py-2 rounded-md ${activeSection === 'overview' ? 'bg-orange-600' : 'bg-orange-600 bg-opacity-80'} text-white hover:bg-orange-700`}
                  >
                    Overview
                  </button>
                  <button 
                    onClick={() => setActiveSection('timer')} 
                    className={`px-4 py-2 rounded-md ${activeSection === 'timer' ? 'bg-orange-600' : 'bg-orange-600 bg-opacity-80'} text-white hover:bg-orange-700`}
                  >
                    Timer & Metronome
                  </button>
                  <button 
                    onClick={() => setActiveSection('sessions')} 
                    className={`px-4 py-2 rounded-md ${activeSection === 'sessions' ? 'bg-orange-600' : 'bg-orange-600 bg-opacity-80'} text-white hover:bg-orange-700`}
                  >
                    Sessions
                  </button>
                  <button 
                    onClick={() => setActiveSection('goals')} 
                    className={`px-4 py-2 rounded-md ${activeSection === 'goals' ? 'bg-orange-600' : 'bg-orange-600 bg-opacity-80'} text-white hover:bg-orange-700`}
                  >
                    Goals
                  </button>
                  <button 
                    onClick={() => setActiveSection('stats')} 
                    className={`px-4 py-2 rounded-md ${activeSection === 'stats' ? 'bg-orange-600' : 'bg-orange-600 bg-opacity-80'} text-white hover:bg-orange-700`}
                  >
                    Stats
                  </button>
                  <button 
                    onClick={() => setActiveSection('media')} 
                    className={`px-4 py-2 rounded-md ${activeSection === 'media' ? 'bg-orange-600' : 'bg-orange-600 bg-opacity-80'} text-white hover:bg-orange-700`}
                  >
                    Media
                  </button>
                  <button 
                    onClick={() => setActiveSection('resources')} 
                    className={`px-4 py-2 rounded-md ${activeSection === 'resources' ? 'bg-orange-600' : 'bg-orange-600 bg-opacity-80'} text-white hover:bg-orange-700`}
                  >
                    Resources
                  </button>
                  <button 
                    onClick={() => setActiveSection('lessontrack')} 
                    className={`px-4 py-2 rounded-md ${activeSection === 'lessontrack' ? 'bg-orange-600' : 'bg-orange-600 bg-opacity-80'} text-white hover:bg-orange-700`}
                  >
                    LessonTrack
                  </button>
                  <button 
                    onClick={() => setActiveSection('settings')} 
                    className={`px-4 py-2 rounded-md ${activeSection === 'settings' ? 'bg-orange-600' : 'bg-orange-600 bg-opacity-80'} text-white hover:bg-orange-700`}
                  >
                    Settings
                  </button>
                  <button 
                    onClick={() => setActiveSection('installation')} 
                    className={`px-4 py-2 rounded-md ${activeSection === 'installation' ? 'bg-orange-600' : 'bg-orange-600 bg-opacity-80'} text-white hover:bg-orange-700`}
                  >
                    Installation
                  </button>
                </div>
                
                <div className="space-y-6">
                  {activeSection === 'overview' && (
                    <div className="rounded-lg bg-orange-50 p-4">
                      <h3 className="text-xl font-bold mb-2">Overview</h3>
                      <ul className="list-disc list-inside space-y-1 ml-2 mb-4">
                        <li>Filter Sessions and Goals by date or category</li>
                        <li>Categories are split into Songs and Exercises for focused tracking</li>
                        <li>Switch between card and table views, search, and sort your data</li>
                      </ul>
                      <div className="bg-white rounded-md p-3 mb-3">
                        <h4 className="font-bold">Getting Started</h4>
                        <ol className="list-decimal list-inside space-y-1 ml-2">
                          <li>Set up your practice categories in the Settings tab</li>
                          <li>Explore predefined practice categories in the Resources tab</li>
                          <li>Set practice goals in the Goals tab (optional)</li>
                          <li>Track your practice using the Timer and Metronome</li>
                          <li>Review your history in the Sessions and Stats tabs</li>
                          <li>Add photos, videos, audio recordings, documents, or notes in the Media tab</li>
                        </ol>
                      </div>
                      <div className="mt-6 p-4 rounded-lg bg-yellow-50 border border-yellow-300 text-center">
                        <p className="font-semibold text-gray-800 mb-2">PracticeTrack was developed by Mike Nelson and is free for you to use.</p>
                        <p className="mb-2 text-gray-800">If you find it helpful and would like to support future development, you can <a href="https://buymeacoffee.com/mikenelsonnz" target="_blank" rel="noopener noreferrer" className="underline text-orange-600 hover:text-orange-700 font-bold">buy me a coffee</a>!</p>
                      </div>
                    </div>
                  )}
                  
                  {activeSection === 'timer' && (
                    <div className="rounded-lg bg-orange-50 p-4">
                      <h3 className="text-xl font-bold mb-2">Timer & Metronome</h3>
                      <p className="mb-3">The Timer page is your main practice tool:</p>
                      
                      <div className="bg-white rounded-md p-3 mb-3">
                        <h4 className="font-bold">Using the Timer</h4>
                        <ol className="list-decimal list-inside space-y-1 ml-2">
                          <li>Select a practice category from the dropdown (optional)</li>
                          <li>Click "Start" to begin your practice session</li>
                          <li>Use "Pause" to temporarily stop the timer</li>
                          <li>Click "Reset" to clear the timer and start over</li>
                          <li>Add notes about your session in the text area</li>
                          <li>Click "Save Session" to record your practice time</li>
                        </ol>
                        <p className="mt-2 text-sm">The timer continues to run even when your device screen is locked or you minimize the app.</p>
                      </div>
                      
                      <div className="bg-white rounded-md p-3 mb-3">
                        <h4 className="font-bold">Using the Metronome</h4>
                        <ol className="list-decimal list-inside space-y-1 ml-2">
                          <li>Adjust the BPM using the slider or +/- buttons</li>
                          <li>Select a time signature using the buttons</li>
                          <li>Choose different accent patterns for complex time signatures</li>
                          <li>Select a metronome sound</li>
                          <li>Click "Start Metronome" to begin</li>
                          <li>Watch the visual beat indicators as you practice</li>
                        </ol>
                      </div>
                      
                      <p className="text-sm italic">Use the "How to Practice" button to see research-based practice strategies that will help you make the most of your practice time.</p>
                    </div>
                  )}
                  
                  {activeSection === 'sessions' && (
                    <div className="rounded-lg bg-orange-50 p-4">
                      <h3 className="text-xl font-bold mb-2">Sessions</h3>
                      <p className="mb-3">Track and review your practice history with flexible filtering and views:</p>
                      <ul className="list-disc list-inside space-y-1 ml-2">
                        <li>Filter sessions by date, category, Songs, Exercises, or All</li>
                        <li>Switch between card and table views</li>
                        <li>Search and sort your sessions</li>
                        <li>Table view includes a total row for duration</li>
                        <li>Edit or delete existing sessions</li>
                      </ul>
                    </div>
                  )}
                  
                  {activeSection === 'goals' && (
                    <div className="rounded-lg bg-orange-50 p-4">
                      <h3 className="text-xl font-bold mb-2">Goals</h3>
                      <p className="mb-3">Set and track your practice goals with clear organization:</p>
                      <ul className="list-disc list-inside space-y-1 ml-2">
                        <li>Filter goals by date, category, Songs, Exercises, or All</li>
                        <li>Switch between card and table views</li>
                        <li>Search and sort your goals</li>
                        <li>Mark goals as completed when achieved</li>
                      </ul>
                    </div>
                  )}
                  
                  {activeSection === 'stats' && (
                    <div className="rounded-lg bg-orange-50 p-4">
                      <h3 className="text-xl font-bold mb-2">Stats</h3>
                      <p className="mb-3">Visualize your practice data:</p>
                      <ul className="list-disc list-inside space-y-1 ml-2">
                        <li>Filter stats by Songs, Exercises, date, or category</li>
                        <li>View practice time by day, week, or month</li>
                        <li>See distribution of practice across categories</li>
                        <li>Monitor progress toward goals</li>
                        <li>Interactive charts and visualizations</li>
                      </ul>
                    </div>
                  )}
                  
                  {activeSection === 'media' && (
                    <div className="rounded-lg bg-orange-50 p-4">
                      <h3 className="text-xl font-bold mb-2">Media Library</h3>
                      <p className="mb-3">Manage your practice media with folders:</p>
                      <ul className="list-disc list-inside space-y-1 ml-2">
                        <li>Create, rename, and manage folders to organize your media</li>
                        <li>Store photos, videos, audio recordings, documents, and notes</li>
                        <li>Give items names and descriptions for easy reference</li>
                        <li>Filter and search your media by type, date, or name</li>
                      </ul>

                      <div className="bg-white rounded-md p-3 mt-4">
                        <h4 className="font-bold mb-2">Storage Information</h4>
                        <p className="mb-2">Important: Notes, practice sessions, and goals are automatically stored in the database and are not affected by storage limits. The following information only applies to uploaded media files.</p>
                        
                        <h5 className="font-semibold mt-3 mb-1">Browser Storage Limits:</h5>
                        <ul className="list-disc list-inside space-y-1 ml-2">
                          <li>iPhone/iPad: Safari (1GB), Chrome/Firefox (~500MB)</li>
                          <li>Mac: Safari (1GB), Chrome/Firefox/Edge (~500MB-2GB)</li>
                          <li>Android: Chrome (~250-500MB), Firefox (~500MB)</li>
                          <li>Windows: Chrome/Edge/Firefox (~500MB-2GB)</li>
                        </ul>

                        <h5 className="font-semibold mt-3 mb-1">Average File Sizes:</h5>
                        <ul className="list-disc list-inside space-y-1 ml-2">
                          <li>1-minute audio: Low (~1MB), Standard (~1.5MB), High (~3MB)</li>
                          <li>5-minute video: 480p (~75MB), 720p (~150MB), 1080p (~300MB)</li>
                          <li>High-resolution photo: ~3-5MB</li>
                          <li>PDF document (1 page): ~100KB</li>
                        </ul>

                        <div className="mt-3 p-2 bg-yellow-50 rounded">
                          <p className="text-sm">Note: Audio and video recorded with PracticeTrack are saved to your device. You can search your device for the file name or details if needed.</p>
                          <p className="text-sm mt-1">Warning: Clearing your browser data will erase stored media files.</p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {activeSection === 'resources' && (
                    <div className="rounded-lg bg-orange-50 p-4">
                      <h3 className="text-xl font-bold mb-2">Resources</h3>
                      <p className="mb-3">The Resources tab provides a library of practice materials:</p>
                      
                      <div className="bg-white rounded-md p-3 mb-3">
                        <h4 className="font-bold">Available Features</h4>
                        <ul className="list-disc list-inside space-y-1 ml-2">
                          <li>Browse predefined practice categories by instrument</li>
                          <li>Filter by instrument family or search by keyword</li>
                          <li>Add categories to your personal list with the '+' button</li>
                        </ul>
                        <p className="mt-2">These categories are meant to give you ideas. You can modify any category after you've added it to your personal list using the Settings tab.</p>
                      </div>
                      
                      <p className="text-sm italic">Use the Resources tab to quickly set up a well-rounded practice routine for your instrument.</p>
                    </div>
                  )}
                  
                  {activeSection === 'lessontrack' && (
                    <div className="rounded-lg bg-orange-50 p-4">
                      <h3 className="text-xl font-bold mb-2">LessonTrack Integration</h3>
                      <p className="mb-3">If your teacher uses LessonTrack, you can receive lesson notes:</p>
                      
                      <div className="flex items-center justify-center my-4">
                        <div className="text-xl font-bold">
                          Lesson<span className="text-yellow-600">Track</span>
                        </div>
                      </div>
                      
                      <div className="bg-white rounded-md p-3 mb-3">
                        <h4 className="font-bold">How it works</h4>
                        <ul className="list-disc list-inside space-y-1 ml-2">
                          <li>Teacher notes are synchronized to your account</li>
                          <li>Notes appear in your Media Gallery with a LessonTrack tag</li>
                          <li>Use the same email for PracticeTrack that your teacher has on file</li>
                          <li>Internet connection required to receive new notes</li>
                        </ul>
                      </div>
                      
                      <p className="text-sm italic">If your teacher doesn't use LessonTrack yet, let them know they can find more information at <span className="font-medium">lessontrack.app</span></p>
                    </div>
                  )}
                  
                  {activeSection === 'settings' && (
                    <div className="rounded-lg bg-orange-50 p-4">
                      <h3 className="text-xl font-bold mb-2">Settings</h3>
                      <p className="mb-3">Customize your categories and app preferences:</p>
                      <ul className="list-disc list-inside space-y-1 ml-2">
                        <li>Add, edit, or delete custom practice categories</li>
                        <li>Use the <b>Song</b> checkbox to mark a category as a Song; otherwise, it will be treated as an Exercise</li>
                        <li>Categories are organized into Songs and Exercises in the Settings tab</li>
                        <li>Import and export your data</li>
                        <li>Manage your account settings</li>
                      </ul>
                    </div>
                  )}
                  
                  {activeSection === 'installation' && (
                    <div className="rounded-lg bg-orange-50 p-4">
                      <h3 className="text-xl font-bold mb-2">Installation</h3>
                      <p className="mb-3">For the best experience, add PracticeTrack to your home screen:</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white rounded-md p-3">
                          <h4 className="font-bold">On iPhone (Safari)</h4>
                          <ol className="list-decimal list-inside space-y-1 ml-2">
                            <li>Open PracticeTrack in Safari</li>
                            <li>Tap the share icon (square with arrow)</li>
                            <li>Scroll down and tap "Add to Home Screen"</li>
                            <li>Name it "PracticeTrack" and tap "Add"</li>
                          </ol>
                        </div>
                        
                        <div className="bg-white rounded-md p-3">
                          <h4 className="font-bold">On Android (Chrome)</h4>
                          <ol className="list-decimal list-inside space-y-1 ml-2">
                            <li>Open PracticeTrack in Chrome</li>
                            <li>Tap the three dots (⋮) menu in the top-right</li>
                            <li>Tap "Add to Home screen"</li>
                            <li>Confirm by tapping "Add"</li>
                          </ol>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="text-center mt-6">
                  <a
                    href="https://practicetrackapp.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-orange-600 to-red-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-orange-700 hover:to-red-600 transition-colors inline-flex items-center"
                  >
                    <ExternalLink className="h-5 w-5 mr-2" />
                    Launch PracticeTrack
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 