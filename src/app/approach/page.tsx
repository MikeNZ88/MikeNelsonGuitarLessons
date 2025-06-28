import Link from 'next/link';
import { Music, Target, Heart, Trophy } from 'lucide-react';

export default function Approach() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-800 to-orange-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">My Teaching Approach</h1>
          <p className="text-xl text-amber-200 max-w-2xl mx-auto">
            Personalized, practical, and fun guitar lessons designed to get you playing the music you love
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="flex items-center mb-4">
                  <Target className="h-8 w-8 text-amber-600 mr-3" />
                  <h2 className="text-2xl font-bold text-amber-800">Goal-Oriented Learning</h2>
                </div>
                <p className="text-gray-700">
                  Every lesson is tailored to your musical goals. Whether you want to play your favorite songs, 
                  understand music theory, or develop specific techniques, we'll create a clear path to get you there.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="flex items-center mb-4">
                  <Heart className="h-8 w-8 text-amber-600 mr-3" />
                  <h2 className="text-2xl font-bold text-amber-800">Learn Songs You Love</h2>
                </div>
                <p className="text-gray-700">
                  Music should be enjoyable! I believe the best way to stay motivated is by learning songs you're 
                  passionate about, while building solid technique and understanding along the way.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="flex items-center mb-4">
                  <Music className="h-8 w-8 text-amber-600 mr-3" />
                  <h2 className="text-2xl font-bold text-amber-800">Practical Theory</h2>
                </div>
                <p className="text-gray-700">
                  Theory should enhance your playing, not overwhelm it. I teach music theory in practical, 
                  digestible pieces that directly apply to the songs and styles you want to play.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="flex items-center mb-4">
                  <Trophy className="h-8 w-8 text-amber-600 mr-3" />
                  <h2 className="text-2xl font-bold text-amber-800">Build Confidence</h2>
                </div>
                <p className="text-gray-700">
                  Every student progresses at their own pace. I focus on celebrating achievements and building 
                  confidence through positive reinforcement and achievable milestones.
                </p>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white p-8 rounded-lg text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Start Your Guitar Journey?</h2>
              <p className="text-xl text-amber-100 mb-6">
                Experience a personalized approach to guitar learning that works for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="bg-white text-amber-800 px-8 py-3 rounded-lg font-semibold hover:bg-amber-50 transition-colors">
                  Book Your First Lesson
                </Link>
                <Link href="/lessons" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-amber-800 transition-colors">
                  View Lesson Options
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 