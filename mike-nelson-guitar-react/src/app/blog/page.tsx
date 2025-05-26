import Link from 'next/link';
import { Music, BookOpen, Target } from 'lucide-react';

export default function Blog() {
  const posts = [
    {
      id: 1,
      title: "How to Practice Effectively",
      excerpt: "Discover research-backed strategies for effective practice using PracticeTrack's comprehensive approach to musical improvement.",
      content: "At PracticeTrack, we've compiled decades of research and practical experience into a comprehensive guide for effective practice. Learn about deliberate practice, session structuring, and the science behind effective musical improvement.",
      date: "May 24, 2025",
      readTime: "12 min read",
      category: "Practice Methods",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      slug: "practicetrack-effective-practice",
      author: "PracticeTrack"
    },
    {
      id: 2,
      title: "Introducing PracticeTrack",
      excerpt: "A comprehensive online practice tool designed to help musicians of all levels improve their skills through structured, effective practice sessions.",
      content: "I'm excited to introduce you to PracticeTrack, a comprehensive online practice tool designed to help musicians of all levels improve their skills through structured, effective practice sessions. Whether you're a beginner learning your first chords or an advanced player working on complex pieces, PracticeTrack helps you practice more effectively.",
      date: "May 25, 2025",
      readTime: "6 min read",
      category: "Practice Tools",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      slug: "introducing-practicetrack",
      author: "Mike Nelson"
    },
    {
      id: 3,
      title: "Reading Guitar Tab",
      excerpt: "Learn guitar tablature through a structured 4-level approach, from basic fret notation to advanced playing techniques and symbols.",
      content: "Guitar tablature (or 'tab') is a simple way to read music specifically written for guitar. Unlike traditional sheet music, tab shows you exactly where to place your fingers on the fretboard. This guide covers four levels of tab reading, from basic notation to advanced techniques and symbols.",
      date: "March 20, 2024",
      readTime: "8 min read",
      category: "Guitar Basics",
      image: "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      slug: "reading-guitar-tab",
      author: "Mike Nelson"
    }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Practice Methods':
        return <Target className="w-5 h-5" />;
      case 'Practice Tools':
        return <Music className="w-5 h-5" />;
      case 'Guitar Basics':
        return <BookOpen className="w-5 h-5" />;
      default:
        return <Music className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-800 to-orange-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Guitar Learning Blog</h1>
          <p className="text-xl text-amber-200 max-w-2xl mx-auto">
            Tips, techniques, and insights to accelerate your guitar journey
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <div className="flex items-center text-amber-600 mr-4">
                      {getCategoryIcon(post.category)}
                      <span className="ml-1 text-sm font-medium">{post.category}</span>
                    </div>
                    <span className="text-gray-500 text-sm">{post.readTime}</span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-800 mb-3">{post.title}</h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      <span>By {post.author}</span>
                      <span className="mx-2">•</span>
                      <span>{post.date}</span>
                    </div>
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="text-amber-600 hover:text-amber-700 font-medium"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-amber-800 to-orange-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to start your guitar journey?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/lessons" 
              className="bg-white text-amber-800 px-8 py-3 rounded-lg font-semibold hover:bg-amber-50 transition-colors"
            >
              View Lessons
            </Link>
            <Link 
              href="/contact" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-amber-800 transition-colors"
            >
              Book a Lesson
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 