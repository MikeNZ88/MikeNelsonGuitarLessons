import Link from 'next/link';
import { Music, Clock, MapPin, Monitor } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-amber-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-800 via-amber-700 to-amber-600 text-white section-padding">
        <div className="container-max text-center">
          <h1 className="text-4xl md:text-6xl font-bold font-playfair mb-6">
            Mike Nelson Guitar Lessons
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

            {/* Pricing Section */}
            <div className="card mb-8">
              <h2 className="text-2xl font-bold text-amber-800 mb-4">Pricing</h2>
              <p className="text-lg text-amber-700 mb-6 text-justify">
                Lessons are priced at $30 for 30 minutes at my address in Pukerua Bay (or online), or $45 for 30 minutes at your place (Paremata, Whitby, Plimmerton).
              </p>
            </div>

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
                  <h3 className="text-xl font-bold text-amber-800">Lessons Away (Paremata, Whitby, Plimmerton)</h3>
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
            <Link href="/approach" className="btn-secondary bg-transparent text-white border-white hover:bg-white hover:text-amber-800">
              Learn About My Approach
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 