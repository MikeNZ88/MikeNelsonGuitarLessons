'use client';

import Link from 'next/link';
import { Music, BookOpen, Target, Store, Wrench, Star, User, Users, Award } from 'lucide-react';
import { useState } from 'react';

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('All Posts');
  const [sortOrder, setSortOrder] = useState('newest');
  const posts = [
    // BEGINNER LEVEL
    {
      id: '8',
      title: 'The Complete Beginner\'s Guide to Learning Guitar',
      excerpt: 'A comprehensive roadmap for absolute beginners, covering everything from first chords to single notes and picking techniques. Your complete starting guide.',
      date: 'April 20, 2025',
      readTime: '15 min read',
      category: 'Beginner',
      topicCategory: 'Guides',
      skillLevel: 'beginner',
      image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      slug: 'complete-beginners-guide-guitar',
      author: 'Mike Nelson'
    },
    {
      id: '7',
      title: 'When Should You Start Learning Guitar? What the Research Actually Says',
      excerpt: 'Discover the optimal age to start guitar based on neuroscience research. From children to seniors, learn the advantages and challenges at every life stage.',
      date: 'April 30, 2025',
      readTime: '12 min read',
      category: 'Beginner',
      topicCategory: 'Guides',
      skillLevel: 'beginner',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      slug: 'when-should-you-start-learning-guitar',
      author: 'Mike Nelson'
    },
    {
      id: '9',
      title: 'Beginner Electric Guitar Guide - New Zealand 2025',
      excerpt: 'Complete guide to buying your first electric guitar in New Zealand. Top recommendations, amp choices, current pricing, and where to buy for beginners.',
      date: 'June 24, 2025',
      readTime: '6 min read',
      category: 'Beginner',
      topicCategory: 'Guides',
      skillLevel: 'beginner',
      image: '/yamaha-pac112j.webp',
      slug: 'electric-guitar-beginner-guide-nz',
      author: 'Mike Nelson'
    },
    {
      id: '16',
      title: 'How to Read Chord Diagrams',
      excerpt: 'Master the fundamentals of reading guitar chord diagrams with this comprehensive video tutorial. Learn to interpret chord charts and start playing songs faster.',
      date: 'April 27, 2025',
      readTime: '3 min read',
      category: 'Beginner',
      topicCategory: 'Guides',
      skillLevel: 'beginner',
      image: '/youtube-logo.svg',
      slug: 'how-to-read-chord-diagrams',
      author: 'Mike Nelson'
    },
    {
      id: '4',
      title: 'Smoother Chord Changes: Identifying Common Fingers Between Chords',
      excerpt: 'Learn how to identify common fingers between chords for smoother transitions. Master chord changes with visual diagrams and essential fingering tips.',
      date: 'May 5, 2025',
      readTime: '7 min read',
      category: 'Beginner',
      topicCategory: 'Tips',
      skillLevel: 'beginner',
      image: '/chord-transitions-thumbnail.svg',
      slug: 'chord-transitions-common-fingers',
      author: 'Mike Nelson'
    },
    {
      id: '1',
      title: '6 Essential Practice Tips for Guitar Students',
      excerpt: 'Discover proven practice techniques that will accelerate your guitar learning and help you make the most of your practice time.',
      date: 'May 16, 2025',
      readTime: '8 min read',
      category: 'All',
      topicCategory: 'Tips',
      skillLevel: 'all',
      image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      slug: 'essential-practice-tips',
      author: 'Mike Nelson'
    },
    {
      id: '6',
      title: 'Introducing PracticeTrack: Your Musical Journey Companion',
      excerpt: 'Transform your practice sessions with deliberate tracking, goal setting, and analytics. A free tool to help you stay consistent and see your progress over time.',
      date: 'May 12, 2025',
      readTime: '6 min read',
      category: 'Beginner',
      topicCategory: 'Tips',
      skillLevel: 'beginner',
      image: '/practicetrack-thumbnail.svg',
      slug: 'introducing-practicetrack',
      author: 'Mike Nelson'
    },
    {
      id: '11',
      title: 'Beginner\'s Guide to Guitar Scales',
      excerpt: 'Everything you need to know about guitar scales, from the basics of notes and intervals to practical application and improvisation. Learn C major, pentatonic, and minor scales step by step.',
      date: 'April 28, 2025',
      readTime: '25 min read',
      category: 'Beginner',
      topicCategory: 'Guides',
      skillLevel: 'beginner',
      image: '/beginners-guide-scales-thumbnail.svg',
      slug: 'beginners-guide-guitar-scales',
      author: 'Mike Nelson'
    },

    // INTERMEDIATE LEVEL
    {
      id: '15',
      title: 'Major Scale Guitar Guide',
      excerpt: 'Master essential guitar shapes and patterns across the fretboard with this comprehensive guide to major scale modes and arpeggios. A different approach to scale learning.',
      date: 'April 4, 2025',
      readTime: '6 min read',
      category: 'Intermediate',
      topicCategory: 'Guides',
      skillLevel: 'intermediate',
      image: '/major-scale-guide-20-thumbnail.svg',
      slug: 'major-scale-guitar-guide',
      author: 'Mike Nelson'
    },
    {
      id: '13',
      title: 'Guitar Fretboard Navigation: Cross-String Interval Relationships (Part 2)',
      excerpt: 'Master practical techniques for finding notes and intervals across guitar strings. Complete with formulas, visual diagrams, and step-by-step examples. Contains beginner-friendly sections.',
      date: 'June 27, 2025',
      readTime: '15 min read',
      category: 'Intermediate',
      topicCategory: 'Guides',
      skillLevel: 'intermediate-advanced',
      image: '/guitar-tuning-thumbnail.svg',
      slug: 'guitar-fretboard-navigation',
      author: 'Mike Nelson'
    },
    {
      id: '12',
      title: 'Understanding the Guitar Fretboard: Why Strings Are Tuned This Way (Part 1)',
      excerpt: 'Why are guitar strings tuned E-A-D-G-B-E instead of something more logical? Discover the fascinating constraints and compromises that created this system. Contains beginner-friendly explanations.',
      date: 'June 27, 2025',
      readTime: '20 min read',
      category: 'Advanced',
      topicCategory: 'Guides',
      skillLevel: 'advanced',
      image: '/guitar-tuning-thumbnail.svg',
      slug: 'understanding-guitar-fretboard',
      author: 'Mike Nelson'
    },
    {
      id: '5',
      title: 'Master Guitar Scales with the Interactive Scale Explorer Tool',
      excerpt: 'Discover how to use the Scale Explorer tool to visualize guitar scales, learn fretboard patterns, and understand music theory through interactive features.',
      date: 'June 18, 2025',
      readTime: '9 min read',
      category: 'Intermediate',
      topicCategory: 'Tips',
      skillLevel: 'intermediate-advanced',
      image: '/scale-explorer-thumbnail.svg',
      slug: 'scale-explorer-tool',
      author: 'Mike Nelson'
    },

    // ADVANCED LEVEL
    {
      id: '10',
      title: 'My Kiesel A2 7-String',
      excerpt: 'In-depth review of the Kiesel A2 7-String guitar. From ordering process to playing experience, plus my complete studio setup for metal and extended range guitars.',
      date: 'June 25, 2025',
      readTime: '12 min read',
      category: 'All',
      topicCategory: 'Gear',
      skillLevel: 'all',
      image: '/Kiesel logo.jpg',
      slug: 'kiesel-a2-7-string-review',
      author: 'Mike Nelson'
    },

    // ALL POSTS (General/Informational - no specific skill level)
    {
      id: '2',
      title: 'Wellington\'s Vanishing Instrument Stores',
      excerpt: 'Exploring the impact of Wellington\'s changing music retail landscape on guitar students and where to find the gear and support you need.',
      date: 'June 22, 2025',
      readTime: '6 min read',
      category: 'All',
      topicCategory: 'Gear',
      skillLevel: 'all',
      image: 'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      slug: 'wellington-music-stores',
      author: 'Mike Nelson'
    }
  ];

  // Define categories with both skill levels and topic categories
  const categories = ['All Posts', 'Beginner', 'Intermediate', 'Advanced', 'Guides', 'Tips', 'Gear'];

  // Filter posts by category (check both category and topicCategory)
  const filteredPosts = selectedCategory === 'All Posts' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory || post.topicCategory === selectedCategory);

  // Sort posts
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    if (sortOrder === 'newest') {
      return dateB.getTime() - dateA.getTime();
    } else {
      return dateA.getTime() - dateB.getTime();
    }
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Beginner':
        return <User className="w-5 h-5" />;
      case 'Intermediate':
        return <Users className="w-5 h-5" />;
      case 'Advanced':
        return <Award className="w-5 h-5" />;
      case 'All':
        return <Music className="w-5 h-5" />;
      case 'Guides':
        return <BookOpen className="w-5 h-5" />;
      case 'Tips':
        return <Wrench className="w-5 h-5" />;
      case 'Gear':
        return <Store className="w-5 h-5" />;
      default:
        return <Music className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Beginner':
        return 'text-green-600';
      case 'Intermediate':
        return 'text-blue-600';
      case 'Advanced':
        return 'text-purple-600';
      case 'All':
        return 'text-amber-600';
      case 'Guides':
        return 'text-teal-600';
      case 'Tips':
        return 'text-yellow-600';
      case 'Gear':
        return 'text-pink-600';
      default:
        return 'text-amber-600';
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

      {/* Filters and Sorting */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Category Filter */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-gray-700 font-medium">Filter by category:</span>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-amber-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-amber-100 hover:text-amber-700'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort Options */}
            <div className="flex items-center gap-3">
              <span className="text-gray-700 font-medium">Sort by:</span>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-gray-600 text-sm">
            Showing {sortedPosts.length} of {posts.length} posts
            {selectedCategory !== 'All Posts' && (
              <span> in "{selectedCategory}"</span>
            )}
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {sortedPosts.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <Music className="w-16 h-16 mx-auto mb-4" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No posts found</h3>
              <p className="text-gray-500 mb-6">
                Try selecting a different category or adjusting your filters.
              </p>
              <button
                onClick={() => setSelectedCategory('All Posts')}
                className="bg-amber-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-amber-700 transition-colors"
              >
                Show All Posts
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedPosts.map((post) => (
                <article key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-48 object-cover object-right"
                  />
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <div className={`flex items-center mr-3 ${getCategoryColor(post.category)}`}>
                        {getCategoryIcon(post.category)}
                        <span className="ml-1 text-sm font-medium">{post.category}</span>
                      </div>
                      {post.category !== post.topicCategory && (
                        <div className={`flex items-center mr-3 ${getCategoryColor(post.topicCategory)}`}>
                          {getCategoryIcon(post.topicCategory)}
                          <span className="ml-1 text-sm font-medium">{post.topicCategory}</span>
                        </div>
                      )}
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
          )}
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