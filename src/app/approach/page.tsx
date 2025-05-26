import Link from 'next/link';
import { Music, BookOpen, Target, CheckCircle } from 'lucide-react';

export default function Approach() {
  return (
    <div className="min-h-screen bg-amber-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-800 via-amber-700 to-amber-600 text-white section-padding">
        <div className="container-max text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-playfair mb-4">
            My Approach to Lessons
          </h1>
          <p className="text-xl text-amber-100 max-w-3xl mx-auto">
            Lessons usually focus on a specific song chosen by the student—or by me if it is useful to develop specific skills. Technique and theory are discussed in the context of the song.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-amber-700 mb-8">
              Lessons usually focus on a specific song chosen by the student—or by me if it is useful to develop specific skills. Technique and theory are discussed in the context of the song. There are also dedicated lessons solely for technique and theory. The type of lesson and content depends on your goals and the style of playing you wish to develop.
            </p>

            {/* Song Lessons */}
            <div className="card mb-8">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mr-4">
                  <Music className="h-6 w-6 text-amber-600" />
                </div>
                <h2 className="text-2xl font-bold text-amber-800">Song Lessons</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-amber-800"><strong>Quick Check-In:</strong> A brief chat to see how your song practice is going and identify any challenges.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-amber-800"><strong>Song:</strong> We work on a specific section of your song where a key skill (like alternate picking or chord transitions) needs improvement. This helps with learning the song and developing your technical skills.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-amber-800"><strong>Musical Ideas in Context:</strong> You'll learn how the musical ideas behind the song connect to underlying theory.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-amber-800"><strong>Immediate Feedback:</strong> Targeted, hands-on corrections help you make quick progress.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
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
                <h2 className="text-2xl font-bold text-amber-800">Theory-Focused Lessons</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-amber-800"><strong>Music Theory Concepts:</strong> These sessions explore scales, chord structures, rhythmic concepts, and common forms (e.g., 12 bar blues) to build a solid foundation for your musical intuition.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
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
                <h2 className="text-2xl font-bold text-amber-800">Technique-Focused Lessons</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-amber-800">These sessions concentrate on refining your technical skills through targeted exercises and drills. These may be new techniques or ones you are developing.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Conclusion */}
            <div className="bg-amber-50 p-6 rounded-lg">
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