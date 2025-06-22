import Link from 'next/link';
import { Music, BookOpen, Target, Store, Wrench } from 'lucide-react';

export default function Blog() {
  const posts = [
    {
      id: '1',
      title: '6 Essential Practice Tips for Guitar Students',
      excerpt: 'Discover proven practice techniques that will accelerate your guitar learning and help you make the most of your practice time.',
      date: 'May 16, 2025',
      readTime: '8 min read',
      category: 'Practice Methods',
      image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      slug: 'essential-practice-tips',
      author: 'Mike Nelson'
    },
    {
      id: '4',
      title: 'Smoother Chord Changes: Identifying Common Fingers Between Chords',
      excerpt: 'Learn how to identify common fingers between chords for smoother transitions. Master chord changes with visual diagrams and essential fingering tips.',
      date: 'May 5, 2025',
      readTime: '7 min read',
      category: 'Guitar Basics',
      image: '/chord-transitions-thumbnail.svg',
      slug: 'chord-transitions-common-fingers',
      author: 'Mike Nelson'
    },
    {
      id: '2',
      title: 'Wellington\'s Vanishing Music Stores: What This Means for Guitar Students',
      excerpt: 'Exploring the impact of Wellington\'s changing music retail landscape on guitar students and where to find the gear and support you need.',
      date: 'June 22, 2025',
      readTime: '6 min read',
      category: 'Musical Instrument Retail',
      image: 'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      slug: 'wellington-music-stores',
      author: 'Mike Nelson'
    },

    {
      id: '5',
      title: 'Master Guitar Scales with the Interactive Scale Explorer Tool',
      excerpt: 'Discover how to use the Scale Explorer tool to visualize guitar scales, learn fretboard patterns, and understand music theory through interactive features.',
      date: 'June 18, 2025',
      readTime: '9 min read',
      category: 'Guitar Tools',
      image: '/scale-explorer-thumbnail.svg',
      slug: 'scale-explorer-tool',
      author: 'Mike Nelson'
    }
  ];

  // Sort posts by date (newest first)
  const sortedPosts = posts.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Practice Methods':
        return <Target className="w-5 h-5" />;
      case 'Getting Started':
        return <Music className="w-5 h-5" />;
      case 'Guitar Basics':
        return <BookOpen className="w-5 h-5" />;
      case 'Musical Instrument Retail':
        return <Store className="w-5 h-5" />;
      case 'Guitar Tools':
        return <Wrench className="w-5 h-5" />;
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
            {sortedPosts.map((post) => (
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