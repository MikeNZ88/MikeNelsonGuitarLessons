import Link from 'next/link';
import Image from 'next/image';
import { Star, Guitar, Users, Clock, Award, Music, Play, ArrowRight } from 'lucide-react';

export default function Home() {
  const testimonials = [
    {
      text: "Mike is brilliant. He is authentic, patient, and he knows his stuff. I am learning guitar later in life and was worried I couldn't do it. Mike has given me the confidence and structure to practise and persevere.",
      author: "Greg Le'Maire",
      rating: 5
    },
    {
      text: "The progress my son has made since starting lessons with Mike has been fantastic. Mike took the time to find out what he wanted to learn and has taught him not just practical skills but also music theory which has really increased his song writing confidence.",
      author: "Clare Knighton",
      rating: 5
    },
    {
      text: "Mike is an excellent teacher with a great understanding of the level you are at and how best to help you improve your playing skills. He also provides very helpful follow up notes or videos to help you practice.",
      author: "Nigel Smith",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-amber-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-amber-800 via-amber-700 to-amber-600 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        <div className="container-max section-padding relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold font-playfair leading-tight">
                  Learn Guitar with
                  <span className="block text-amber-200 bg-gradient-to-r from-amber-200 to-yellow-200 bg-clip-text text-transparent">
                    Mike Nelson
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-amber-100 leading-relaxed max-w-2xl">
                  Master guitar with structured lessons and modern educational resources.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="btn-primary bg-white text-amber-800 hover:bg-amber-50 group">
                  Book Your First Lesson
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/about" className="btn-secondary bg-transparent text-white border-white hover:bg-white hover:text-amber-800">
                  Learn More About Mike
                </Link>
              </div>
              
              <div className="flex items-center space-x-6 text-amber-200">
                <div className="flex items-center space-x-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-sm font-medium">5.0</span>
                </div>
                <div className="h-4 w-px bg-amber-300"></div>
                <span className="text-sm">Google Reviews</span>
              </div>
              
              {/* Social media icons below Google Reviews */}
              <div className="flex justify-start space-x-4">
                <a
                  href="https://www.facebook.com/MikeNelsonGuitarLessonsNZ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-all duration-200 hover:scale-110"
                >
                  <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/ill_teach_you_a_lesson"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-all duration-200 hover:scale-110"
                >
                  <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative w-full max-w-sm mx-auto">
                {/* Main image container */}
                <div className="relative aspect-square rounded-full overflow-hidden shadow-2xl border-4 border-white/20">
                  <Image
                    src="/Mike Photo.jpg"
                    alt="Mike Nelson - Guitar Teacher"
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-playfair text-amber-800 mb-6">
              What Students Say
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card group hover:scale-105 transition-all duration-300">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-amber-700 mb-6 italic text-lg leading-relaxed">&ldquo;{testimonial.text}&rdquo;</p>
                <div className="flex items-center">
                  <p className="font-semibold text-amber-800">— {testimonial.author}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-amber-600 mb-4">
              Reviews from{' '}
              <a
                href="https://g.co/kgs/CCrZMti"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-800 hover:text-amber-600 underline font-semibold"
              >
                Google Reviews
              </a>
            </p>
            <div className="flex items-center justify-center space-x-2 text-amber-700">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current text-yellow-400" />
                ))}
              </div>
              <span className="font-semibold">5.0 out of 5</span>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="section-padding bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="container-max">
          <div className="text-center mb-12">
            <p className="text-xl text-amber-700 max-w-2xl mx-auto">
              Watch this tutorial on reading chord diagrams and get a taste of Mike&apos;s teaching style
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl bg-amber-800 group">
              <iframe
                src="https://www.youtube.com/embed/TuMh30hSxwA"
                title="How to Read Chord Diagrams"
                className="w-full h-full"
                frameBorder="0"
                allowFullScreen
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-amber-900/20 to-transparent pointer-events-none"></div>
            </div>
            <div className="text-center mt-8">
              <Link href="/resources" className="inline-flex items-center text-amber-700 hover:text-amber-800 font-semibold group">
                <Play className="mr-2 h-5 w-5" />
                Watch More Tutorials
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-amber-600 via-amber-700 to-amber-800 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        <div className="container-max text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold font-playfair mb-6">
            Ready to start your guitar journey?
          </h2>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/contact" className="btn-primary bg-white text-amber-800 hover:bg-amber-50 text-lg px-8 py-4 group">
              Book Your First Lesson
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/lessons" className="btn-secondary bg-transparent text-white border-white hover:bg-white hover:text-amber-800 text-lg px-8 py-4">
              View Lesson Options
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
