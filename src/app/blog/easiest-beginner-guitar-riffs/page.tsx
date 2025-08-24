'use client';

import AlphaTabPlayerCDN from '@/components/AlphaTabPlayerCDN';

export default function EasiestBeginnerGuitarRiffsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        {/* Hero */}
        <section className="bg-gradient-to-br from-amber-800 via-amber-700 to-amber-600 text-white py-8 sm:py-10 mb-6 rounded-xl">
          <div className="max-w-6xl mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold font-playfair mb-2">10 Easiest Beginner Guitar Riffs</h1>
              <p className="text-base sm:text-lg text-amber-100 mb-3 leading-relaxed">Learn 10 iconic riffs with interactive tabs to build timing, coordination, and expression.</p>
              <div className="flex items-center justify-center gap-3 text-amber-200 text-sm">
                <span>Beginner</span>
              </div>
            </div>
          </div>
        </section>
        <article className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-4 sm:p-8">
          {/* Header moved to hero */}
          {/* Album Covers Image */}
          <div className="mt-2 mb-6 text-center">
            <img 
              src="/guitar-riff-blog.png" 
              alt="Album covers of classic rock songs including Black Sabbath Paranoid, Aerosmith Toys in the Attic, Deep Purple Machine Head, Nirvana Nevermind, Metallica Black Album, Alice in Chains Facelift, AC/DC TNT, Red Hot Chili Peppers Californication, The Kingsmen Louie Louie, and Pearl Jam Ten"
              className="max-w-full h-auto rounded-lg shadow-md mx-auto"
              style={{ maxHeight: '300px' }}
            />
          </div>

          {/* Introduction */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-amber-900 mb-4 text-center">
              Why Learn These Classic Guitar Riffs?
            </h2>
            <div className="prose prose-lg text-gray-700">
              <p>
                These 10 riffs represent some of the most recognizable guitar parts in rock history. Learning them will not only make you sound great but also teach you fundamental techniques that apply to countless other songs.
              </p>
            </div>
          </section>



          {/* Tab Player */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-amber-900 mb-6">
              Interactive Guitar Riffs Tab Player
            </h2>
            <p className="text-gray-600 mb-6">
              Use the dropdown below to select and practice each of the 10 beginner guitar riffs. The player includes standard notation and guitar tablature. All riffs use all downstrokes except for Come As You Are and Walk This Way (they include upstrokes). Come As You Are and Enter Sandman both start at the end of a bar - press the metronome button to hear this timing. Remember that the top staff (the one with musical symbols, not the tab with fret numbers) includes the fingers on the left hand for you to use.
            </p>
                        <div className="mb-4 p-3 bg-amber-100 border-l-4 border-amber-400 rounded text-amber-900 text-sm">
              <strong>Practice Tips:</strong> You can slow down the riffs if you want. Pay attention to the rhythm and try to feel the groove of each riff. All riffs use an overdriven/distorted tone except for Come As You Are, Otherside, and Jeremy which use a clean tone.
            </div>
            <AlphaTabPlayerCDN key="beginner-riffs-player" containerId="beginner-riffs-alphatab-container" showSlursAndSlides={true} />
          </section>

          {/* Riff Descriptions */}
          <section className="mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold text-amber-900 mb-4">Complete Guide to 10 Easy Guitar Riffs</h2>
            <p className="text-gray-600 mb-6">Each riff below is carefully selected to progressively build your guitar skills, from absolute beginner to more challenging techniques.</p>
            <div className="space-y-4">
              <div className="bg-amber-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-amber-800 mb-2">1. Smoke On The Water - Deep Purple</h3>
                <p className="text-gray-700 text-sm leading-relaxed">From the album "Machine Head" (1972) - The quintessential beginner riff. Uses the same two strings with easy fingering.</p>
              </div>
              
              <div className="bg-amber-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-amber-800 mb-2">2. TNT - AC/DC</h3>
                <p className="text-gray-700 text-sm leading-relaxed">From the album "T.N.T." (1975) - A driving rock riff that introduces string bending and moving between different string sets.</p>
              </div>
              
              <div className="bg-amber-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-amber-800 mb-2">3. Otherside - Red Hot Chili Peppers</h3>
                <p className="text-gray-700 text-sm leading-relaxed">From the album "Californication" (1999) - A clean, melodic riff that's slightly faster with more movement around the fretboard.</p>
              </div>
              
              <div className="bg-amber-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-amber-800 mb-2">4. Come As You Are - Nirvana</h3>
                <p className="text-gray-700 text-sm leading-relaxed">From the album "Nevermind" (1991) - Features more movement back and forth between strings with a distinctive grunge sound.</p>
              </div>
              
              <div className="bg-amber-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-amber-800 mb-2">5. Jeremy - Pearl Jam</h3>
                <p className="text-gray-700 text-sm leading-relaxed">From the album "Ten" (1991) - Introduces hammer-ons and requires faster speed with melodic playing.</p>
              </div>

              <div className="bg-amber-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-amber-800 mb-2">6. Man In The Box - Alice In Chains</h3>
                <p className="text-gray-700 text-sm leading-relaxed">From the album "Facelift" (1990) - Introduces dead notes and string damping techniques.</p>
              </div>
              
              <div className="bg-amber-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-amber-800 mb-2">7. Louie Louie - The Kingsmen</h3>
                <p className="text-gray-700 text-sm leading-relaxed">A classic three-chord progression (1963) that requires moving power chords on different string sets.</p>
              </div>
              
              <div className="bg-amber-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-amber-800 mb-2">8. Walk This Way - Aerosmith</h3>
                <p className="text-gray-700 text-sm leading-relaxed">From the album "Toys in the Attic" (1975) - Requires alternate picking and is quite fast.</p>
              </div>
              
              <div className="bg-amber-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-amber-800 mb-2">9. Iron Man - Black Sabbath</h3>
                <p className="text-gray-700 text-sm leading-relaxed">From the album "Paranoid" (1970) - Requires sliding power chords and more movement across the fretboard.</p>
              </div>
              
              <div className="bg-amber-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-amber-800 mb-2">10. Enter Sandman - Metallica</h3>
                <p className="text-gray-700 text-sm leading-relaxed">From "The Black Album" (1991) - Requires palm muting, more difficult timing, and covers a wider fret range.</p>
              </div>
            </div>
            
            {/* Difficulty Note */}
            <div className="mt-6 p-4 bg-amber-50 border-l-4 border-amber-400 rounded">
              <p className="text-sm text-gray-700 leading-relaxed">
                <strong>Note on Difficulty Order:</strong> These riffs are arranged in order of increasing difficulty, starting with the most accessible techniques and progressing to more challenging elements. However, difficulty is subjective and varies from player to player. Some may find certain riffs easier or harder based on their individual strengths, hand size, or previous experience. Don't be discouraged if you struggle with a "lower" number riff - focus on what feels comfortable for you and gradually work your way up at your own pace.
              </p>
            </div>
          </section>

          {/* Practice Tips Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-amber-900 mb-4">How to Practice These Guitar Riffs Effectively</h2>
            
            <h3 className="text-xl font-semibold text-amber-800 mb-3">Essential Practice Tips</h3>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-amber-50 rounded-lg p-4">
                <h4 className="font-semibold text-amber-800 mb-2">Start Slow</h4>
                <p className="text-gray-700 text-sm">Begin at a comfortable tempo and gradually increase speed. Accuracy is more important than speed.</p>
              </div>
              <div className="bg-amber-50 rounded-lg p-4">
                <h4 className="font-semibold text-amber-800 mb-2">Use a Metronome</h4>
                <p className="text-gray-700 text-sm">Practice with a steady beat to develop proper timing and rhythm.</p>
              </div>
              <div className="bg-amber-50 rounded-lg p-4">
                <h4 className="font-semibold text-amber-800 mb-2">Focus on Clean Notes</h4>
                <p className="text-gray-700 text-sm">Ensure each note rings clearly without buzzing or muting adjacent strings.</p>
              </div>
              <div className="bg-amber-50 rounded-lg p-4">
                <h4 className="font-semibold text-amber-800 mb-2">Practice Daily</h4>
                <p className="text-gray-700 text-sm">Short, consistent practice sessions are more effective than long, infrequent ones.</p>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-amber-800 mb-3">Common Techniques You'll Learn</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
              <li><strong>Power Chords</strong> - Foundation of rock music (5th and root notes)</li>
              <li><strong>1/4 Bends</strong> - Adds expression and blues feel</li>
              <li><strong>Hammer-ons and Slides</strong> - Smooth note transitions</li>
              <li><strong>Dead Notes/Muting</strong> - Rhythmic percussive effects</li>
              <li><strong>Alternate Picking</strong> - Efficient picking technique</li>
              <li><strong>Palm Muting</strong> - Creates tight, percussive sound</li>
            </ul>
          </section>

          {/* Conclusion and Next Steps */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-amber-900 mb-4">Next Steps in Your Guitar Journey</h2>
            
            <h3 className="text-xl font-semibold text-amber-800 mb-3">After Mastering These Riffs</h3>
            <div className="prose prose-lg text-gray-700 space-y-4">
              <p>
                Once you've learned these 10 classic riffs, you'll have a solid foundation in rock guitar playing. These songs use fundamental techniques that appear in thousands of other songs.
              </p>
              
              <h4 className="text-lg font-semibold text-amber-800">Recommended Next Steps:</h4>
              <ul className="list-disc list-inside space-y-2">
                <li>Learn complete songs, not just the main riffs</li>
                <li>Practice chord progressions and rhythm guitar</li>
                <li>Explore blues scales and lead guitar techniques</li>
                <li>Study more advanced rock and metal riffs</li>
                <li>Work on improvisation and creating your own riffs</li>
              </ul>

              <h4 className="text-lg font-semibold text-amber-800 mt-6 mb-3">Continue Your Learning Journey</h4>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                  <h5 className="font-semibold text-amber-800 mb-2">Master Rhythm Guitar</h5>
                  <p className="text-gray-700 text-sm mb-3">
                    Build on these riffs by learning essential strumming patterns that work with thousands of songs.
                  </p>
                  <a 
                    href="/blog/guitar-strumming-patterns" 
                    className="inline-block bg-amber-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-amber-700 transition-colors"
                  >
                    Learn Strumming Patterns →
                  </a>
                </div>
                
                <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                  <h5 className="font-semibold text-amber-800 mb-2">Develop Finger Technique</h5>
                  <p className="text-gray-700 text-sm mb-3">
                    Strengthen your fingers and improve dexterity with targeted exercises for better guitar playing.
                  </p>
                  <a 
                    href="/blog/picking-finger-exercises" 
                    className="inline-block bg-amber-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-amber-700 transition-colors"
                  >
                    Practice Finger Exercises →
                  </a>
                </div>
              </div>
              
              <p className="mt-4">
                Remember, consistent practice is key to improvement. These classic riffs will serve as building blocks for your entire guitar-playing journey. Each technique you master here will make learning new songs easier and more enjoyable.
              </p>
            </div>
          </section>

        </article>
      </div>
    </div>
  );
} 