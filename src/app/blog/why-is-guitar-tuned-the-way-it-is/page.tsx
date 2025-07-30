import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Why is Guitar Tuned This Way? | Mike Nelson',
  description: 'Discover the fascinating history and logic behind standard guitar tuning. Learn why EADGBE became the standard and how it affects your playing.',
  openGraph: {
    title: 'Why is Guitar Tuned This Way?',
    description: 'Discover the fascinating history and logic behind standard guitar tuning. Learn why EADGBE became the standard.',
    type: 'article',
    images: [
      {
        url: '/blog-thumbnail.svg',
        width: 1200,
        height: 630,
        alt: 'Why is Guitar Tuned This Way?',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why is Guitar Tuned This Way?',
    description: 'Discover the fascinating history and logic behind standard guitar tuning. Learn why EADGBE became the standard.',
    images: ['/blog-thumbnail.svg'],
  },
  alternates: {
    canonical: 'https://mikenelsonguitarlessons.co.nz/blog/why-is-guitar-tuned-the-way-it-is',
  },
};

export default function WhyIsGuitarTunedThisWay() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Back to Blog */}
          <Link 
            href="/blog" 
            className="inline-flex items-center text-amber-600 hover:text-amber-800 mb-8 transition-colors"
          >
            ← Back to Blog
          </Link>

          {/* Header */}
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-4 leading-tight">
              Why is the Guitar Tuned the Way it is?
            </h1>
            <div className="flex items-center text-gray-600 text-sm">
              <span>8 min read</span>
            </div>
          </header>

          {/* Article Content */}
          <article className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Standard guitar tuning (EADGBE) might seem random at first, but there's fascinating history and logic behind why we tune our guitars this way. Understanding the reasoning can help you better understand the instrument and even inspire you to experiment with alternative tunings.
            </p>

            <h2 className="text-3xl font-bold text-amber-600 mt-12 mb-6">The Standard Tuning: EADGBE</h2>
            
            <p className="mb-6">
              From lowest (thickest) to highest (thinnest) string, standard tuning is:
            </p>

            <div className="bg-amber-100 border-l-4 border-amber-500 p-6 mb-8">
              <h3 className="font-semibold text-amber-800 mb-4">Standard Guitar Tuning:</h3>
              <div className="grid grid-cols-2 gap-4 text-lg">
                <div>
                  <strong>6th string (thickest):</strong> E<br/>
                  <strong>5th string:</strong> A<br/>
                  <strong>4th string:</strong> D
                </div>
                <div>
                  <strong>3rd string:</strong> G<br/>
                  <strong>2nd string:</strong> B<br/>
                  <strong>1st string (thinnest):</strong> E
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-amber-600 mt-12 mb-6">Historical Development</h2>
            
            <p className="mb-6">
              The guitar's tuning evolved over centuries, influenced by several factors:
            </p>

            <h3 className="text-2xl font-semibold text-amber-700 mt-8 mb-4">1. The Lute Connection</h3>
            <p className="mb-6">
              Early guitars were heavily influenced by the lute, which used a similar tuning system. The lute's tuning was designed to create harmonious intervals between adjacent strings, making it easier to play chords and melodies.
            </p>

            <h3 className="text-2xl font-semibold text-amber-700 mt-8 mb-4">2. Perfect Fourth Intervals</h3>
            <p className="mb-6">
              Most adjacent strings in standard tuning are tuned a perfect fourth apart (5 semitones). This creates a consistent interval pattern that makes chord shapes and scale patterns transferable across the fretboard.
            </p>

            <div className="bg-blue-100 border-l-4 border-blue-500 p-4 mb-6">
              <h4 className="font-semibold text-blue-800 mb-2">Perfect Fourth Intervals:</h4>
              <p className="text-blue-700">
                E to A = perfect fourth (5 semitones)<br/>
                A to D = perfect fourth (5 semitones)<br/>
                D to G = perfect fourth (5 semitones)<br/>
                G to B = major third (4 semitones) ← The exception!<br/>
                B to E = perfect fourth (5 semitones)
              </p>
            </div>

            <h2 className="text-3xl font-bold text-amber-600 mt-12 mb-6">Why the Major Third Between G and B?</h2>
            
            <p className="mb-6">
              The major third interval between the G and B strings is the key to understanding standard tuning. This "kink" in the pattern serves several important purposes:
            </p>

            <h3 className="text-2xl font-semibold text-amber-700 mt-8 mb-4">1. Easier Chord Shapes</h3>
            <p className="mb-6">
              The major third interval makes common chord shapes much easier to play. For example, the open C major chord would be nearly impossible to finger if the B string were tuned to C (a perfect fourth above G).
            </p>

            <h3 className="text-2xl font-semibold text-amber-700 mt-8 mb-4">2. Comfortable Hand Position</h3>
            <p className="mb-6">
              The major third creates a more natural hand position for playing chords and scales. It reduces the stretch required between fingers, making the instrument more accessible to players of all hand sizes.
            </p>

            <h3 className="text-2xl font-semibold text-amber-700 mt-8 mb-4">3. Harmonic Benefits</h3>
            <p className="mb-6">
              This tuning creates rich harmonic possibilities. The major third interval between G and B allows for beautiful open chord voicings and creates interesting harmonic relationships across the strings.
            </p>

            <h2 className="text-3xl font-bold text-amber-600 mt-12 mb-6">The Logic Behind Each String</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-amber-700 mb-3">Low E String</h3>
                <p className="mb-4">
                  The lowest string is tuned to E because it provides a solid foundation for bass lines and creates a full, rich sound. E is also a common key in many musical traditions.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-amber-700 mb-3">A String</h3>
                <p className="mb-4">
                  A perfect fourth above E, the A string provides the fifth of the E major scale and creates strong harmonic relationships with the low E.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-amber-700 mb-3">D String</h3>
                <p className="mb-4">
                  Another perfect fourth above A, the D string completes the lower register and provides the root for D major, a very common key in guitar music.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-amber-700 mb-3">G String</h3>
                <p className="mb-4">
                  The G string marks the transition to the higher register and provides the root for G major, another fundamental key in guitar playing.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-amber-700 mb-3">B String</h3>
                <p className="mb-4">
                  The major third above G creates the "kink" that makes standard tuning work. The B string provides the third of the G major scale and creates beautiful open chord possibilities.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-amber-700 mb-3">High E String</h3>
                <p className="mb-4">
                  The highest string, tuned to E, creates symmetry with the lowest string and provides the fifth of the A major scale, completing the harmonic circle.
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-amber-600 mt-12 mb-6">Alternative Tunings</h2>
            
            <p className="mb-6">
              While standard tuning is excellent for most music, alternative tunings can open up new creative possibilities:
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-green-100 border-l-4 border-green-500 p-4">
                <h4 className="font-semibold text-green-800 mb-2">Open Tunings</h4>
                <p className="text-green-700">
                  Tunings like Open G (DGDGBD) or Open D (DADF#AD) create full chords when all strings are strummed open, perfect for slide guitar and fingerpicking.
                </p>
              </div>
              <div className="bg-purple-100 border-l-4 border-purple-500 p-4">
                <h4 className="font-semibold text-purple-800 mb-2">Drop Tunings</h4>
                <p className="text-purple-700">
                  Drop D (DADGBE) lowers the sixth string to D, creating power chords that can be played with one finger across the bottom three strings.
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-amber-600 mt-12 mb-6">Why This Matters for Your Playing</h2>
            
            <p className="mb-6">
              Understanding the logic behind standard tuning can help you:
            </p>

            <ul className="list-disc pl-6 space-y-2 mb-8">
              <li><strong>Learn faster:</strong> Understanding the interval relationships helps you see patterns across the fretboard</li>
              <li><strong>Create better arrangements:</strong> Knowing which keys work well with open strings helps you choose the best keys for your songs</li>
              <li><strong>Experiment with tunings:</strong> Understanding the logic helps you create your own alternative tunings</li>
              <li><strong>Appreciate the instrument:</strong> The guitar's tuning is a beautiful example of form following function</li>
            </ul>

            <div className="bg-amber-100 border-l-4 border-amber-500 p-6 mb-8">
              <h3 className="font-semibold text-amber-800 mb-4">Key Takeaway:</h3>
              <p className="text-amber-700">
                Standard guitar tuning wasn't chosen arbitrarily - it's the result of centuries of musical evolution, designed to make the instrument as playable and harmonically rich as possible. The major third interval between G and B is the key innovation that makes everything work together.
              </p>
            </div>

            <h2 className="text-3xl font-bold text-amber-600 mt-12 mb-6">Conclusion</h2>
            
            <p className="mb-6">
              Standard guitar tuning is a masterpiece of musical engineering. It balances playability, harmonic richness, and practical considerations in a way that has served guitarists for generations. While alternative tunings can be exciting and creative, understanding the logic behind standard tuning will make you a more informed and versatile player.
            </p>

            <p className="mb-8">
              The next time you pick up your guitar, take a moment to appreciate the thoughtful design that went into its tuning. Every string, every interval, has been carefully chosen to make your musical journey as smooth and enjoyable as possible.
            </p>

            {/* Related Articles */}
            <div className="bg-gray-100 p-6 rounded-lg mt-12">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Related Articles:</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/blog/understanding-guitar-fretboard" className="text-amber-600 hover:text-amber-800 underline">
                    Understanding the Guitar Fretboard: Why Strings Are Tuned This Way
                  </Link>
                </li>
                <li>
                  <Link href="/blog/beginners-guide-notes-guitar" className="text-amber-600 hover:text-amber-800 underline">
                    Beginner's Guide to Notes on the Guitar
                  </Link>
                </li>
                <li>
                  <Link href="/blog/your-first-guitar-chords" className="text-amber-600 hover:text-amber-800 underline">
                    Your First Guitar Chords: A Complete Beginner's Guide
                  </Link>
                </li>
              </ul>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
} 