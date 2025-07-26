import Link from 'next/link';
import { Music, Clock, MapPin, Monitor, BookOpen, Target } from 'lucide-react';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Mike Nelson | Guitar Teacher Wellington',
  description: 'Mike Nelson - Guitar teacher in Wellington North. Teaching beginners to intermediate players.',
  openGraph: {
    title: 'About Mike Nelson | Guitar Teacher Wellington',
    description: 'Mike Nelson - Guitar teacher in Wellington North. Teaching beginners to intermediate players.',
    type: 'website',
    images: [
      {
        url: '/Mike Photo.jpg',
        width: 1200,
        height: 630,
        alt: 'Mike Nelson Guitar Teacher',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Mike Nelson | Guitar Teacher Wellington',
    description: 'Mike Nelson - Guitar teacher in Wellington North. Teaching beginners to intermediate players.',
    images: ['/Mike Photo.jpg'],
  },
  alternates: {
    canonical: 'https://mikenelsonguitarlessons.co.nz/about/',
  },
};

export default function About() {
  return (
    <div className="min-h-screen bg-amber-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-800 via-amber-700 to-amber-600 text-white section-padding">
        <div className="container-max text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-playfair mb-6">
            About Mike Nelson
          </h1>
          <p className="text-xl text-amber-100 mb-8 max-w-3xl mx-auto">
            I am a guitarist with over 25 years of playing experience. I have taught students young and old, from complete beginners to intermediate level players who need to improve their technique or get out of a rut!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary bg-white text-amber-800 hover:bg-amber-50">
              Book a Lesson
            </Link>
            <Link href="/lessons" className="btn-secondary bg-transparent text-white border-white hover:bg-white hover:text-amber-800">
              View Lessons
            </Link>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-amber-700 mb-6 text-justify">
              I am a guitarist with over 25 years of playing experience. I have taught students young and old, from complete beginners to intermediate level players who need to improve their technique or get out of a rut! Guitar is my passion and it can be yours too! Experience the joy of learning with a teacher who provides organized lessons and utilizes modern educational resources.
            </p>
            
            <p className="text-lg text-amber-700 mb-8 text-justify">
              Before teaching, I worked as a risk consultant and auditor at a services firm before starting my teaching career in 2019. I hold a Bachelor of Commerce with a focus on Accounting and Commercial Law. My strong affinity for process and analysis enables me to break down complex musical concepts into manageable, step-by-step lessons.
            </p>

            {/* Lesson Types */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Pukerua Bay & Online */}
              <div className="card">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-amber-100 rounded-lg mr-3">
                    <MapPin className="h-6 w-6 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-bold text-amber-800">Pukerua Bay & Online Lessons</h3>
                </div>
                <p className="text-amber-700 mb-4"><strong>Available Hours:</strong></p>
                <ul className="space-y-1 text-amber-600">
                  <li>Monday: 2:00 PM – 8:00 PM</li>
                  <li>Tuesday: 2:00 PM – 5:30 PM</li>
                  <li>Wednesday: 5:30 PM – 8:00 PM</li>
                  <li>Thursday: 2:00 PM – 5:00 PM</li>
                  <li>Friday: 2:00 PM – 6:30 PM</li>
                </ul>
              </div>

              {/* Lessons Away */}
              <div className="card">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-amber-100 rounded-lg mr-3">
                    <MapPin className="h-6 w-6 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-bold text-amber-800">Lessons Away (Plimmerton, Cambourne, Mana, Paremata, Papakowhai, Whitby)</h3>
                </div>
                <p className="text-amber-700 mb-4"><strong>Available Hours:</strong></p>
                <ul className="space-y-1 text-amber-600">
                  <li>Tuesday: 6:00 PM – 8:30 PM</li>
                  <li>Thursday: 6:00 PM – 8:30 PM</li>
                  <li>Friday: 6:30 PM – 8:00 PM</li>
                </ul>
              </div>
            </div>

            {/* Online Lessons Info */}
            <div className="card">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-amber-100 rounded-lg mr-3">
                  <Monitor className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold text-amber-800">Online Lessons</h3>
              </div>
              <p className="text-amber-700 mb-4">
                Can't make it in person? No problem! I also offer online lessons via Zoom or Skype.
              </p>
              <p className="text-amber-700">
                Online lessons are suited for intermediate level players who are comfortable with basic guitar techniques and can maintain good posture and hand positioning independently.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* My Approach Section */}
      <section className="section-padding bg-amber-50">
        <div className="container-max">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-playfair text-amber-800 text-center mb-8">
              My Approach to Lessons
            </h2>
            
            <p className="text-lg text-amber-700 mb-8">
              Lessons usually focus on a specific song chosen by the student—or by me if it is useful to develop specific skills. Technique and theory are discussed in the context of the song. There are also dedicated lessons solely for technique and theory. The type of lesson and content depends on your goals and the style of playing you wish to develop.
            </p>

            {/* Song Lessons */}
            <div className="card mb-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mr-4">
                  <Music className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="text-2xl font-bold text-amber-800">Song Lessons</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="h-5 w-5 bg-green-500 rounded-full mr-3 mt-1 flex-shrink-0"></div>
                  <div>
                    <p className="text-amber-800"><strong>Quick Check-In:</strong> A brief chat to see how your song practice is going and identify any challenges.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-5 w-5 bg-green-500 rounded-full mr-3 mt-1 flex-shrink-0"></div>
                  <div>
                    <p className="text-amber-800"><strong>Song:</strong> We work on a specific section of your song where a key skill (like alternate picking or chord transitions) needs improvement. This helps with learning the song and developing your technical skills.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-5 w-5 bg-green-500 rounded-full mr-3 mt-1 flex-shrink-0"></div>
                  <div>
                    <p className="text-amber-800"><strong>Musical Ideas in Context:</strong> You'll learn how the musical ideas behind the song connect to underlying theory.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-5 w-5 bg-green-500 rounded-full mr-3 mt-1 flex-shrink-0"></div>
                  <div>
                    <p className="text-amber-800"><strong>Immediate Feedback:</strong> Targeted, hands-on corrections help you make quick progress.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-5 w-5 bg-green-500 rounded-full mr-3 mt-1 flex-shrink-0"></div>
                  <div>
                    <p className="text-amber-800"><strong>Practice Instructions:</strong> Dedicate focused time to practicing the song section, applying the techniques we worked on, and reviewing any theory concepts discussed.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Theory-Focused Lessons */}
            <div className="card mb-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mr-4">
                  <BookOpen className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="text-2xl font-bold text-amber-800">Theory-Focused Lessons</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="h-5 w-5 bg-green-500 rounded-full mr-3 mt-1 flex-shrink-0"></div>
                  <div>
                    <p className="text-amber-800"><strong>Music Theory Concepts:</strong> These sessions explore scales, chord structures, rhythmic concepts, and common forms (e.g., 12 bar blues) to build a solid foundation for your musical intuition.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="h-5 w-5 bg-green-500 rounded-full mr-3 mt-1 flex-shrink-0"></div>
                  <div>
                    <p className="text-amber-800"><strong>Application:</strong> Learn how to apply these concepts in your playing through songwriting and improvisation.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Technique-Focused Lessons */}
            <div className="card mb-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mr-4">
                  <Target className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="text-2xl font-bold text-amber-800">Technique-Focused Lessons</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="h-5 w-5 bg-green-500 rounded-full mr-3 mt-1 flex-shrink-0"></div>
                  <div>
                    <p className="text-amber-800">These sessions concentrate on refining your technical skills through targeted exercises and drills. These may be new techniques or ones you are developing.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Conclusion */}
            <div className="bg-amber-100 p-6 rounded-lg">
              <p className="text-lg text-amber-800 text-center">
                This comprehensive approach ensures that every lesson—whether focused on a song, theory, or technique—contributes to your overall development as a guitarist.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-amber-600 to-amber-700 text-white">
        <div className="container-max text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-4">
            Ready to start your guitar journey?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary bg-white text-amber-800 hover:bg-amber-50">
              Book Your First Lesson
            </Link>
            <Link href="/lessons" className="btn-secondary bg-transparent text-white border-white hover:bg-white hover:text-amber-800">
              View Lesson Options
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 