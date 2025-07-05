'use client';

import Link from 'next/link';
import { Music } from 'lucide-react';
import { useState } from 'react';

export default function Blog() {
  const [selectedTopicCategory, setSelectedTopicCategory] = useState('All Posts');
  const [selectedSkillLevel, setSelectedSkillLevel] = useState('All Levels');
  
  const posts = [
    // GETTING STARTED
    {
      id: '8',
      title: 'The Complete Beginner\'s Guide to Learning Guitar',
      excerpt: 'A comprehensive roadmap for absolute beginners, covering everything from first chords to single notes and picking techniques. Your complete starting guide.',
      readTime: '35 min read',
      category: 'Beginner',
      primaryCategory: 'Getting Started',
      categories: ['Getting Started'],
      skillLevel: 'beginner',
      image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      slug: 'complete-beginners-guide-guitar',
      author: 'Mike Nelson'
    },
    {
      id: '7',
      title: 'When Should You Start Learning Guitar? What the Research Actually Says',
      excerpt: 'Discover the optimal age to start guitar based on neuroscience research. From children to seniors, learn the advantages and challenges at every life stage.',
      readTime: '12 min read',
      category: 'Beginner',
      primaryCategory: 'Getting Started',
      categories: ['Getting Started'],
      skillLevel: 'beginner',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      slug: 'when-should-you-start-learning-guitar',
      author: 'Mike Nelson'
    },
    {
      id: '9',
      title: 'Beginner Electric Guitar Guide - New Zealand 2025',
      excerpt: 'Complete guide to buying your first electric guitar in New Zealand. Top recommendations, amp choices, current pricing, and where to buy for beginners.',
      readTime: '6 min read',
      category: 'Beginner',
      primaryCategory: 'Getting Started',
      categories: ['Getting Started', 'Gear'],
      skillLevel: 'beginner',
      image: '/yamaha-pac112j.webp',
      slug: 'electric-guitar-beginner-guide-nz',
      author: 'Mike Nelson'
    },

    // CHORDS
    {
      id: '16',
      title: 'How to Read Chord Diagrams',
      excerpt: 'Master the fundamentals of reading guitar chord diagrams with this comprehensive video tutorial. Learn to interpret chord charts and start playing songs faster.',
      readTime: '',
      category: 'Beginner',
      primaryCategory: 'Chords',
      categories: ['Chords'],
      skillLevel: 'beginner',
      image: '/youtube-logo.svg',
      slug: 'how-to-read-chord-diagrams',
      author: 'Mike Nelson'
    },
    {
      id: '18',
      title: 'Open Chord Library',
      excerpt: 'Master guitar chords with my comprehensive interactive reference tool featuring visual diagrams, fingering patterns, and chord variations. Perfect for beginners and advanced players.',
      readTime: '',
      category: 'Beginner',
      primaryCategory: 'Chords',
      categories: ['Chords'],
      skillLevel: 'beginner',
      image: '/open-chord-library-thumbnail.svg',
      slug: 'guitar-chord-reference-tool',
      author: 'Mike Nelson'
    },
    {
      id: '17',
      title: 'Master Guitar Strumming Patterns',
      excerpt: 'Learn guitar strumming patterns with interactive audio examples. Master the secret to solid timing and rhythm with 10 progressive patterns from beginner to advanced.',
      readTime: '12 min read',
      category: 'Beginner',
      primaryCategory: 'Rhythm',
      categories: ['Rhythm', 'Chords', 'Technique'],
      skillLevel: 'beginner',
      image: '/strumming-patterns-thumbnail.svg',
      slug: 'guitar-strumming-patterns',
      author: 'Mike Nelson'
    },
    {
      id: '20',
      title: 'Learn Rhythm with the Interactive Rhythm Tool',
      excerpt: 'Explore rhythm fundamentals, time signatures, and note values with interactive audio and notation. Try the free Rhythm Tool to improve your timing and understanding.',
      readTime: '3 min read',
      category: 'Beginner',
      primaryCategory: 'Rhythm',
      categories: ['Rhythm', 'Technique'],
      skillLevel: 'beginner',
      image: '/rhythm-tool-thumbnail.svg',
      slug: 'rhythm-tool',
      author: 'Mike Nelson'
    },
    {
      id: '4',
      title: 'Smoother Chord Changes: Identifying Common Fingers Between Chords',
      excerpt: 'Learn how to identify common fingers between chords for smoother transitions. Master chord changes with visual diagrams and essential fingering tips.',
      readTime: '7 min read',
      category: 'Beginner',
      primaryCategory: 'Chords',
      categories: ['Chords', 'Technique'],
      skillLevel: 'beginner',
      image: '/chord-transitions-thumbnail.svg',
      slug: 'chord-transitions-common-fingers',
      author: 'Mike Nelson'
    },

    // SCALES AND FRETBOARD
    {
      id: '11',
      title: 'Beginner\'s Guide to Guitar Scales',
      excerpt: 'A simple introduction to guitar scales covering the basics of notes, intervals, and the C major scale. Perfect starting point for beginners.',
      readTime: '15 min read',
      category: 'Beginner',
      primaryCategory: 'Scales and Fretboard',
      categories: ['Scales and Fretboard'],
      skillLevel: 'beginner',
      image: '/beginners-guide-scales-thumbnail.svg',
      slug: 'beginners-guide-guitar-scales',
      author: 'Mike Nelson'
    },
    {
      id: '15',
      title: 'Major Scale Guitar Guide',
      excerpt: 'Master essential guitar shapes and patterns across the fretboard with this comprehensive guide to major scale modes and arpeggios. A different approach to scale learning.',
      readTime: 'PDF',
      category: 'Intermediate',
      primaryCategory: 'Scales and Fretboard',
      categories: ['Scales and Fretboard'],
      skillLevel: 'intermediate',
      image: '/major-scale-guide.png',
      slug: 'major-scale-guitar-guide',
      author: 'Mike Nelson'
    },
    {
      id: '13',
      title: 'Guitar Fretboard Navigation: Cross-String Interval Relationships (Part 2)',
      excerpt: 'Master practical techniques for finding notes and intervals across guitar strings. Complete with formulas, visual diagrams, and step-by-step examples. Contains beginner-friendly sections.',
      readTime: '15 min read',
      category: 'Intermediate',
      primaryCategory: 'Scales and Fretboard',
      categories: ['Scales and Fretboard'],
      skillLevel: 'intermediate',
      image: '/guitar-tuning-thumbnail.svg',
      slug: 'guitar-fretboard-navigation',
      author: 'Mike Nelson'
    },
    {
      id: '12',
      title: 'Understanding the Guitar Fretboard: Why Strings Are Tuned This Way (Part 1)',
      excerpt: 'Why are guitar strings tuned E-A-D-G-B-E instead of something more logical? Discover the fascinating constraints and compromises that created this system. Contains beginner-friendly explanations.',
      readTime: '20 min read',
      category: 'Advanced',
      primaryCategory: 'Scales and Fretboard',
      categories: ['Scales and Fretboard'],
      skillLevel: 'advanced',
      image: '/guitar-tuning-thumbnail.svg',
      slug: 'understanding-guitar-fretboard',
      author: 'Mike Nelson'
    },
    {
      id: '5',
      title: 'Master Guitar Scales with the Interactive Scale Explorer Tool',
      excerpt: 'Discover how to use the Scale Explorer tool to visualize guitar scales, learn fretboard patterns, and understand music theory through interactive features.',
      readTime: '5 min read',
      category: 'Intermediate',
      primaryCategory: 'Scales and Fretboard',
      categories: ['Scales and Fretboard'],
      skillLevel: 'intermediate',
      image: '/scale-explorer-thumbnail.svg',
      slug: 'scale-explorer-tool',
      author: 'Mike Nelson'
    },

    // TECHNIQUE
    {
      id: '19',
      title: 'Guitar Picking Technique: Complete Progressive Guide',
      excerpt: 'Master guitar picking from basic grip to advanced motion mechanics. Progressive guide covering pick slanting, string crossing, and escape techniques.',
      readTime: '30 min read',
      category: 'All',
      primaryCategory: 'Technique',
      categories: ['Technique'],
      skillLevel: 'all',
      image: '/guitar-picking-thumbnail.svg',
      slug: 'guitar-picking-technique-guide',
      author: 'Mike Nelson'
    },
    {
      id: '1',
      title: '6 Essential Practice Tips for Guitar Students',
      excerpt: 'Discover proven practice techniques that will accelerate your guitar learning and help you make the most of your practice time.',
      readTime: '8 min read',
      category: 'All',
      primaryCategory: 'Technique',
      categories: ['Technique'],
      skillLevel: 'all',
      image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      slug: 'essential-practice-tips',
      author: 'Mike Nelson'
    },
    {
      id: '6',
      title: 'Introducing PracticeTrack: Your Musical Journey Companion',
      excerpt: 'Transform your practice sessions with deliberate tracking, goal setting, and analytics. A free tool to help you stay consistent and see your progress over time.',
      readTime: '6 min read',
      category: 'Beginner',
      primaryCategory: 'Technique',
      categories: ['Technique'],
      skillLevel: 'beginner',
      image: '/practicetrack-thumbnail.svg',
      slug: 'introducing-practicetrack',
      author: 'Mike Nelson'
    },

    // GEAR
    {
      id: '10',
      title: 'My Kiesel A2 7-String',
      excerpt: 'In-depth review of the Kiesel A2 7-String guitar. From ordering process to playing experience, plus my complete studio setup for metal and extended range guitars.',
      date: 'June 25, 2025',
      readTime: '12 min read',
      category: 'All',
      primaryCategory: 'Gear',
      categories: ['Gear'],
      skillLevel: 'all',
      image: '/Kiesel logo.jpg',
      slug: 'kiesel-a2-7-string-review',
      author: 'Mike Nelson'
    },
    {
      id: '2',
      title: 'Wellington\'s Vanishing Instrument Stores',
      excerpt: 'Exploring the impact of Wellington\'s changing music retail landscape on guitar students and where to find the gear and support you need.',
      date: 'June 22, 2025',
      readTime: '6 min read',
      category: 'All',
      primaryCategory: 'Gear',
      categories: ['Gear'],
      skillLevel: 'all',
      image: 'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      slug: 'wellington-music-stores',
      author: 'Mike Nelson'
    }
  ];

  // Define new lesson topic categories
  const topicCategories = ['All Posts', 'Getting Started', 'Chords', 'Scales and Fretboard', 'Technique', 'Rhythm', 'Gear'];
  const skillLevels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];

  // Smart display logic for categories
  const getDisplayCategory = (post: any, selectedFilter: string) => {
    if (selectedFilter === 'All Posts') {
      return post.primaryCategory;
    }
    return post.categories.includes(selectedFilter) ? selectedFilter : post.primaryCategory;
  };

  // Filter posts by both topic category and skill level
  const filteredPosts = posts.filter(post => {
    const matchesTopicCategory = selectedTopicCategory === 'All Posts' || post.categories.includes(selectedTopicCategory);
    const matchesSkillLevel = selectedSkillLevel === 'All Levels' || 
                             post.skillLevel === selectedSkillLevel.toLowerCase() || 
                             post.skillLevel === 'all' ||
                             (post.skillLevel === 'intermediate' && selectedSkillLevel === 'Intermediate') ||
                             (post.skillLevel === 'beginner' && selectedSkillLevel === 'Beginner') ||
                             (post.skillLevel === 'advanced' && selectedSkillLevel === 'Advanced');
    
    return matchesTopicCategory && matchesSkillLevel;
  });

  // Use filtered posts without sorting by date
  const sortedPosts = filteredPosts;



  const getCategoryColor = (category: string) => {
    // Use different colors only for skill levels
    switch (category) {
      case 'Beginner':
        return 'bg-amber-100 text-amber-800';
      case 'Intermediate':
        return 'bg-orange-100 text-orange-800';
      case 'Advanced':
        return 'bg-amber-200 text-amber-900';
      case 'All':
        return 'bg-orange-200 text-orange-900';
      default:
        // All topic categories use amber
        return 'bg-amber-100 text-amber-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-800 to-orange-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Guitar Learning Blog</h1>
          <p className="text-xl text-amber-200 max-w-2xl mx-auto">
            Comprehensive guides and interactive tools for all guitarists
          </p>
        </div>
      </section>

      {/* Hierarchical Filters */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-6">
            {/* Topic Category Filter */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-gray-700 font-medium">Topic:</span>
              <div className="flex flex-wrap gap-2">
                {topicCategories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedTopicCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedTopicCategory === category
                        ? 'bg-amber-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-amber-100 hover:text-amber-700'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Skill Level Filter */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-gray-700 font-medium">Level:</span>
              <div className="flex flex-wrap gap-2">
                {skillLevels.map((level) => (
                  <button
                    key={level}
                    onClick={() => setSelectedSkillLevel(level)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedSkillLevel === level
                        ? 'bg-orange-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-orange-100 hover:text-orange-700'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-6 text-gray-600 text-sm">
            Showing {sortedPosts.length} of {posts.length} posts
            {(selectedTopicCategory !== 'All Posts' || selectedSkillLevel !== 'All Levels') && (
              <span>
                {selectedTopicCategory !== 'All Posts' && ` in "${selectedTopicCategory}"`}
                {selectedSkillLevel !== 'All Levels' && ` for "${selectedSkillLevel}"`}
              </span>
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
                Try selecting different filters or reset to see all posts.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => {
                    setSelectedTopicCategory('All Posts');
                    setSelectedSkillLevel('All Levels');
                  }}
                  className="bg-amber-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-amber-700 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedPosts.map((post) => {
                const displayCategory = getDisplayCategory(post, selectedTopicCategory);
                return (
                  <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                    <article className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                      <div className={`aspect-video relative overflow-hidden ${
                        post.image === '/major-scale-guide.png' 
                          ? 'bg-amber-800' 
                          : 'bg-gray-200'
                      }`}>
                        <img
                          src={post.image}
                          alt={post.title}
                          className={`w-full h-full transition-transform duration-300 ${
                            post.image === '/major-scale-guide.png' 
                              ? 'object-contain scale-110 group-hover:scale-115' 
                              : 'object-cover group-hover:scale-105'
                          }`}
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`text-xs font-medium px-3 py-1 rounded ${getCategoryColor(displayCategory)}`}>
                              {displayCategory}
                            </span>
                            <span className={`text-xs font-medium px-3 py-1 rounded ${getCategoryColor(post.category === 'All' ? 'All' : post.category)}`}>
                              {post.category === 'All' ? 'All Levels' : post.category}
                            </span>
                          </div>
                          {post.readTime && (
                            <span className="text-gray-500 text-sm flex-shrink-0">{post.readTime}</span>
                          )}
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-amber-600 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">By {post.author}</span>
                          <span className="text-amber-600 font-medium text-sm group-hover:text-amber-700">
                            Read More →
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                );
              })}
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