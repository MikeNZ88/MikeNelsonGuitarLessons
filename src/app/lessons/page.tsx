import Link from 'next/link';
import { Clock, MapPin, Monitor, Guitar, CheckCircle } from 'lucide-react';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Guitar Lessons & Curriculum | Mike Nelson',
  description: 'Structured guitar lessons from beginner to advanced. Home studio in Pukerua Bay, mobile lessons, and online options.',
  openGraph: {
    title: 'Guitar Lessons & Curriculum | Mike Nelson',
    description: 'Structured guitar lessons from beginner to advanced. Home studio in Pukerua Bay, mobile lessons, and online options.',
    type: 'website',
    images: [
      {
        url: '/Mike Photo.jpg',
        width: 1200,
        height: 630,
        alt: 'Mike Nelson Guitar Lessons',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Guitar Lessons & Curriculum | Mike Nelson',
    description: 'Structured guitar lessons from beginner to advanced. Home studio in Pukerua Bay, mobile lessons, and online options.',
    images: ['https://mikenelsonguitarlessons.co.nz/mike-nelson-guitar-logo.jpg'],
  },
  alternates: {
    canonical: 'https://mikenelsonguitarlessons.co.nz/lessons',
  },
};

export default function Lessons() {
  const curriculumLevels = [
    {
      level: "Beginner Level One",
      title: "First Time Strummer",
      description: "You've just started learning to strum basic chords.",
      skills: [
        "Chord Fundamentals: Learn open major and minor chords (A, Am, C, D, Dm, E, Em, and G).",
        "Melodic/Single Note Playing: Use simple melodies on one or two strings to build finger strength and accuracy.",
        "Rhythmic Development: Use basic strumming patterns (quarter notes and simple eighth notes) while tapping your foot to maintain a steady internal pulse.",
        "Music Theory: Learn note names and understand how the third interval differentiates major from minor chords.",
        "Fretboard & Reading Skills: Use targeted exercises and basic fretboard diagrams to identify note names along the E string, and develop the ability to interpret chord charts and lyric sheets.",
        "Technique: Develop an effective, comfortable pick grip and incorporate proper hand placement."
      ],
      color: "bg-white border-amber-300 text-amber-800"
    },
    {
      level: "Beginner Level Two",
      title: "Campfire Crooner",
      description: "You've learned a few songs and can serenade friends around a campfire.",
      skills: [
        "Chord Fundamentals: Continue working with open chords and introduce additional chords—including Major 7, Minor 7, and Dominant 7—while developing chord changes.",
        "Melodic/Single Note Playing: Refine single‑note melodies and begin integrating simple multi‑string riffs. Develop clarity and precision in your playing.",
        "Rhythmic Development: Explore varied strumming patterns that incorporate subtle syncopation and develop your rhythmic feel.",
        "Music Theory: Expand your understanding of chord construction using chord charts and fretboard diagrams. Begin exploring foundational forms like the 12‑bar blues.",
        "Fretboard & Reading Skills: Reinforce note identification along the E string, extend familiarity to other strings, and develop your ability to read chord and lyric sheets.",
        "Technique: Continue developing a comfortable pick grip and incorporate proper hand placement."
      ],
      color: "bg-white border-amber-300 text-amber-800"
    },
    {
      level: "Intermediate Level One",
      title: "Barre Chord King",
      description: "You've mastered barre chords and are now integrating scales into your playing.",
      skills: [
        "Chord Fundamentals: Use barre chords (with E string and A string roots) while refining overall chord transitions.",
        "Melodic/Single Note Playing: Develop scale proficiency by using single‑note patterns covering the Pentatonic, Major, and relative Minor scales.",
        "Rhythmic Development: Use varied rhythmic patterns—eighth notes, sixteenth notes, and triplets—and use a metronome to improve timing and precision.",
        "Music Theory: Explore the concepts of intervals and diatonic harmony with hands-on, tab-based activities and written guides to deepen your comprehension of chord progressions, scales, and harmony.",
        "Fretboard & Reading Skills: Develop your skills in reading chord, lyric, and tablature sheets.",
        "Technique: Incorporate hammer‑ons, pull‑offs, slides, palm muting, ghost notes to add rhythmic and tonal variation, and further develop these techniques."
      ],
      color: "bg-white border-amber-300 text-amber-800"
    },
    {
      level: "Intermediate Level Two",
      title: "The Improvisor",
      description: "You can craft improvisations, jam with others, and write your own songs.",
      skills: [
        "Chord Fundamentals: Continue refining chord transitions with increased speed and precision. Introduce shell voicings, voicings on different string sets, and expand your chord vocabulary to include diminished, augmented, m7b5, and triad forms.",
        "Melodic/Single Note Playing: Expand your use of scales and modes—including the diminished scale—and incorporate their corresponding arpeggios. Develop your improvisational skills.",
        "Rhythmic Development: Use varied rhythmic patterns—such as eighth notes, sixteenth notes, and triplets—and use a metronome to enhance your timing. Integrate complex rhythmic patterns and syncopation to develop expressive timing and rhythmic complexity.",
        "Music Theory: Study intervals and diatonic harmony through practical, tab‑based examples and written material to deepen your understanding of modal concepts and chord substitutions, and to enhance your theoretical insights.",
        "Fretboard & Reading Skills: Develop your skills in reading chord, lyric, and tablature sheets, and further develop your knowledge of notes on the fretboard.",
        "Technique: Continue developing hammer‑ons, pull‑offs, slides, and palm muting with ghost notes; and introduce advanced techniques such as tapping, string muting, alternate picking, and pinch harmonics."
      ],
      color: "bg-white border-amber-300 text-amber-800"
    },
    {
      level: "Advanced",
      title: "Better Than The Teacher",
      description: "You craft sophisticated solos that apply advanced techniques and theoretical concepts.",
      skills: [
        "Chord Mastery: Learn advanced chord shapes, including extended, altered, inverted, and drop voicings on multiple string sets.",
        "Scale Mastery: Explore advanced scales—including diminished, whole tone, harmonic minor, melodic minor, and their modes—and integrate them and their corresponding arpeggios into solos and improvisations. Develop your soloing, improvisational, and arpeggio skills.",
        "Musical Expression: Develop a nuanced performance style with dynamic variation, precise technique, and expressive phrasing.",
        "Advanced Rhythmic Development: Use intricate subdivisions—such as complex sixteenth note passages, triplets, and dotted rhythms—within sophisticated arrangements to improve your rhythmic precision.",
        "Advanced Music Theory: Study harmonic analysis, modulation, voice leading, and advanced chord substitutions using comprehensive written materials and diagrams to deepen your theoretical insights.",
        "Fretboard & Reading Skills: Continue advancing your ability to read complex tablature and chord charts.",
        "Technique: Incorporate advanced picking techniques such as sweep picking and pick slanting for fluid, expressive lead playing, and further develop your advanced technical skills."
      ],
      color: "bg-white border-amber-300 text-amber-800"
    }
  ];

  const lessonTypes = [
    {
      title: "In-Person at Mike's Place",
      location: "Pukerua Bay",
      price: "$30",
      duration: "30 minutes",
      icon: <MapPin className="h-6 w-6" />,
      features: [
        "Face-to-face instruction",
        "Use of equipment",
        "Comfortable learning environment",
        "Immediate hands-on corrections"
      ],
      hours: [
        "Monday: 2:00 PM – 8:00 PM",
        "Tuesday: 2:00 PM – 5:30 PM",
        "Wednesday: 5:30 PM – 8:00 PM",
        "Thursday: 2:00 PM – 7:00 PM",
        "Friday: 2:00 PM – 5:00 PM"
      ]
    },
    {
      title: "In-Person at Your Place",
      location: "Plimmerton, Cambourne, Mana, Paremata, Papakowhai, Whitby",
      price: "$45",
      duration: "30 minutes",
      icon: <MapPin className="h-6 w-6" />,
      features: [
        "Convenience of home learning",
        "Familiar environment",
        "No travel required",
        "Personalized setup advice"
      ],
      hours: [
        "Tuesday: 6:00 PM – 8:30 PM",
        "Wednesday: 2:00 PM – 5:00 PM",
        "Thursday: 7:30 PM – 9:30 PM",
        "Friday: 5:00 PM – 8:00 PM"
      ]
    },
    {
      title: "Online Lessons",
      location: "Zoom/Skype",
      price: "$30",
      duration: "30 minutes",
      icon: <Monitor className="h-6 w-6" />,
      features: [
        "Learn from anywhere",
        "Scheduling options",
        "Screen sharing for tabs/theory",
        "Recorded sessions available"
      ],
      hours: [
        "Monday: 2:00 PM – 8:00 PM",
        "Tuesday: 2:00 PM – 5:30 PM",
        "Wednesday: 5:30 PM – 8:00 PM",
        "Thursday: 2:00 PM – 7:00 PM",
        "Friday: 2:00 PM – 5:00 PM"
      ],
      note: "Suited for intermediate level players comfortable with basic techniques"
    }
  ];

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-800 via-amber-700 to-amber-600 text-white section-padding">
        <div className="container-max text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-playfair mb-4">
            Guitar Lessons & Curriculum
          </h1>
          <p className="text-xl text-amber-100 max-w-3xl mx-auto">
            Structured learning paths designed to take you from complete beginner to advanced player, 
            with lesson options to suit your schedule and learning style.
          </p>
        </div>
      </section>

      {/* Lesson Types Section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-playfair text-amber-800 mb-4">
              Lesson Options
            </h2>
            <p className="text-lg text-amber-700 mb-4">
              Choose the lesson format that works best for you - you come to me (Pukerua Bay), I come to you. Online lessons also available.
            </p>
            <p className="text-amber-600">
              Serving Wellington's northern suburbs: Pukerua Bay, Plimmerton, Cambourne, Mana, Paremata, Papakowhai, and Whitby
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {lessonTypes.map((type, index) => (
              <div key={index} className="card h-full">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-amber-100 rounded-lg mr-3">
                    {type.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-amber-800">{type.title}</h3>
                    <p className="text-amber-600">{type.location}</p>
                  </div>
                </div>
                
                <div className="flex items-center mb-4">
                  <span className="text-2xl font-bold text-amber-800">{type.price}</span>
                  <span className="text-amber-600 ml-2">/ {type.duration}</span>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-amber-800 mb-2 flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    Available Hours:
                  </h4>
                  <ul className="space-y-1">
                    {type.hours.map((hour, hourIndex) => (
                      <li key={hourIndex} className="text-amber-600 text-sm">{hour}</li>
                    ))}
                  </ul>
                </div>

                {type.note && (
                  <p className="text-amber-500 text-sm italic">{type.note}</p>
                )}
              </div>
            ))}
          </div>
          
          {/* Book Lesson Button */}
          <div className="text-center mt-12">
            <Link 
              href="/contact" 
              className="inline-flex items-center bg-amber-600 text-white px-8 py-4 rounded-lg hover:bg-amber-700 transition-colors font-semibold text-lg"
            >
              <Guitar className="w-5 h-5 mr-2" />
              Book Your First Lesson
            </Link>
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section className="section-padding bg-amber-50">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-playfair text-amber-800 mb-4">
              Guitar Curriculum
            </h2>
            <p className="text-lg text-amber-700 max-w-3xl mx-auto">
              A structured progression from beginner to advanced, with clear milestones 
              and skill development at each level.
            </p>
          </div>

          <div className="space-y-8">
            {curriculumLevels.map((level, index) => (
              <div key={index} className={`card border-l-4 ${level.color}`}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-3xl font-black font-playfair mb-1">{level.level}: "{level.title}"</h3>
                    <p className="text-lg">{level.description}</p>
                  </div>
                  <div className="flex">
                    {[...Array(index + 1)].map((_, i) => (
                      <Guitar key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3">Key Skills:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {level.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-amber-600 mr-3 mt-1 flex-shrink-0" />
                        <span className="text-lg leading-relaxed">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-amber-600 to-amber-700 text-white">
        <div className="container-max text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-4">
            Ready to start your guitar journey?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Link href="/contact" className="btn-primary bg-white text-amber-800 hover:bg-amber-50">
              Book Your First Lesson
            </Link>
            <Link href="/about" className="btn-secondary bg-transparent text-white border-white hover:bg-white hover:text-amber-800">
              Learn About Mike's Approach
            </Link>
          </div>
          <div className="text-center">
            <Link href="/policy.html" className="text-amber-200 hover:text-white underline transition-colors">
              View Lesson Payment & Cancellation Policy
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 