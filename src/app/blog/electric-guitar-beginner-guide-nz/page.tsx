import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Guitar, ShoppingCart, Zap, DollarSign, Star, CheckCircle, ArrowRight, Music, Volume2, Settings } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Beginner Electric Guitar Guide - New Zealand 2025 | Mike Nelson Guitar Lessons',
  description: 'Complete guide to buying your first electric guitar in New Zealand. Top recommendations, amp choices, pricing, and where to buy.',
  openGraph: {
    title: 'Beginner Electric Guitar Guide - New Zealand 2025',
    description: 'Complete guide to buying your first electric guitar in New Zealand. Top recommendations, amp choices, pricing, and where to buy.',
    images: [{ url: '/yamaha-pac112j.webp' }],
  },
  alternates: {
    canonical: 'https://mikenelsonguitarlessons.co.nz/blog/electric-guitar-beginner-guide-nz',
  },
}

export default function ElectricGuitarBeginnerGuide() {
  return (
    <div className="min-h-screen bg-amber-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-800 via-amber-700 to-amber-600 text-white section-padding">
        <div className="container-max">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Beginner Electric Guitar Guide - New Zealand 2025
            </h1>
            <p className="text-xl text-amber-100 mb-8 leading-relaxed">
              Complete guide to buying your first electric guitar in New Zealand. Updated with current pricing, 
              top recommendations, and where to find the best deals for beginners.
            </p>
            <div className="flex items-center justify-center space-x-4 text-amber-200">
              <Zap className="h-5 w-5" />
              <span>Updated June 24, 2025</span>
              <Star className="h-5 w-5" />
              <span>NZ-Specific Pricing</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <article className="section-padding bg-white">
        <div className="container-max">
          <div className="max-w-4xl mx-auto prose prose-lg prose-amber">
            
            {/* Top 3 Guitars */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-amber-800 mb-6 flex items-center">
                <Guitar className="h-8 w-8 mr-3" />
                Top 3 Beginner Electric Guitars
              </h2>
              
              <div className="grid gap-6 mb-8">
                {/* Yamaha PAC112JL */}
                <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <span className="text-2xl mr-3">🥇</span>
                    <h3 className="text-xl font-bold text-amber-800">Yamaha PAC112JL — $499 (was $575)</h3>
                  </div>
                  <div className="grid md:grid-cols-4 gap-6 items-start">
                    <div className="md:col-span-3">
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p><strong>Store:</strong> MusicWorks</p>
                          <p><strong>Pickups:</strong> HSS | <strong>Bridge:</strong> Tremolo | <strong>Frets:</strong> 22</p>
                          <p><strong>Left-Handed:</strong> Available (PAC112JL - same price at MusicWorks)</p>
                        </div>
                        <div>
                          <p><strong>Why Choose:</strong> Best build quality, most reliable long-term investment</p>
                          <p><strong>Best For:</strong> All genres, clean tones, blues, rock, pop</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center md:justify-end">
                      <div className="bg-white p-3 rounded-lg shadow-md border-2 border-amber-300">
                        <Image 
                          src="/yamaha-pac112j.webp" 
                          alt="Yamaha PAC112JL Electric Guitar - Lake Placid Blue" 
                          width={160} 
                          height={240} 
                          className="object-contain rounded border border-gray-200"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ibanez GRX70QA */}
                <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <span className="text-2xl mr-3">🥈</span>
                    <h3 className="text-xl font-bold text-amber-800">Ibanez GRX70QA — $495</h3>
                  </div>
                  <div className="grid md:grid-cols-4 gap-6 items-start">
                    <div className="md:col-span-3">
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p><strong>Store:</strong> Music Works</p>
                          <p><strong>Pickups:</strong> HSH | <strong>Bridge:</strong> Tremolo | <strong>Frets:</strong> 24</p>
                          <p><strong>Left-Handed:</strong> Available but $595 (GRX70QAL at Music Works - $100 more)</p>
                        </div>
                        <div>
                          <p><strong>Why Choose:</strong> Most versatile pickup configuration</p>
                          <p><strong>Best For:</strong> Rock, metal, funk, alternative, all-around use</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center md:justify-end">
                      <div className="bg-white p-3 rounded-lg shadow-md border-2 border-amber-300">
                        <Image 
                          src="/ibanez-grx70qa.webp" 
                          alt="Ibanez GRX70QA Electric Guitar - Transparent Black Sunburst" 
                          width={160} 
                          height={240} 
                          className="object-contain rounded border border-gray-200"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Artist AP59GT90 */}
                <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <span className="text-2xl mr-3">🥉</span>
                    <h3 className="text-xl font-bold text-amber-800">Artist AP59GT90 Gold Top — $449</h3>
                  </div>
                  <div className="grid md:grid-cols-4 gap-6 items-start">
                    <div className="md:col-span-3">
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p><strong>Store:</strong> Direct from artistguitars.co.nz only</p>
                          <p><strong>Pickups:</strong> Stacked P90s (coil-split) | <strong>Bridge:</strong> Fixed | <strong>Frets:</strong> 22</p>
                          <p><strong>Left-Handed:</strong> ❌ Not available in this model</p>
                        </div>
                        <div>
                          <p><strong>Why Choose:</strong> Best Les Paul-style value, excellent build quality, no tremolo hassles</p>
                          <p><strong>Best For:</strong> Classic rock, blues, indie, vintage tones</p>
                          <p><strong>Note:</strong> Online-only purchase - you cannot try before buying</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center md:justify-end">
                      <div className="bg-white p-3 rounded-lg shadow-md border-2 border-amber-300">
                        <Image 
                          src="/artist-guitars.png" 
                          alt="Artist AP59GT90 Electric Guitar - Gold Top" 
                          width={160} 
                          height={240} 
                          className="object-contain rounded border border-gray-200"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* What to Avoid */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-amber-800 mb-6 flex items-center">
                <Guitar className="h-8 w-8 mr-3" />
                Guitars to Avoid in This Price Range
              </h2>
              
              <div className="space-y-6">
                {/* Generic Starter Packs */}
                <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-red-800 mb-3">Generic "Starter Packs" from No-Name Brands</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p><strong>Examples:</strong> Enya, Aiersi, SX, Catalina, Glarry</p>
                      <p><strong>Price:</strong> ~$199–$449</p>
                      <p><strong>Where Found:</strong> Trade Me, AliExpress</p>
                    </div>
                    <div>
                      <p><strong>Problems:</strong> Poor factory setups, cheap electronics, necks warp easily</p>
                      <p><strong>Warning:</strong> Barely playable without major repairs, even if they look nice</p>
                    </div>
                  </div>
                </div>

                {/* Squier Issues */}
                <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-red-800 mb-3">Squier Bullet/Mini Strat (Older Models)</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p><strong>Price:</strong> ~$349–$469</p>
                      <p><strong>Available:</strong> Various NZ retailers</p>
                    </div>
                    <div>
                      <p><strong>Problems:</strong> Inconsistent quality, weak tuners, poor intonation, tremolo issues</p>
                      <p><strong>Note:</strong> Newer Squier Sonic Series is much better</p>
                    </div>
                  </div>
                </div>

                {/* Amazon Brands */}
                <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-red-800 mb-3">Random Online-Only Brands</h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p><strong>Examples:</strong> Donner, LyxPro, Pyle, Vangoa</p>
                      <p><strong>Where Found:</strong> Amazon, AliExpress imports</p>
                    </div>
                    <div>
                      <p><strong>Problems:</strong> No NZ service support, cheap parts, unstable necks</p>
                      <p><strong>Warning:</strong> May look flashy but sound and feel terrible</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* How to Spot Bad Guitars */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 mt-6">
                <h3 className="text-xl font-bold text-red-800 mb-4">Red Flags to Watch For:</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <ul className="space-y-2">
                    <li>• Too many "extras" bundled cheap (gig bag, tuner, amp, picks = red flag)</li>
                    <li>• Unknown brand with no NZ service support</li>
                    <li>• No wood specifications listed</li>
                  </ul>
                  <ul className="space-y-2">
                    <li>• Vague pickup descriptions like "dual pickup" or "sound-enhanced"</li>
                    <li>• Tremolo + bad tuners + no setup = unstable mess</li>
                    <li>• Price seems "too good to be true" for what's included</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Secondhand Options */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-amber-800 mb-6 flex items-center">
                <Guitar className="h-8 w-8 mr-3" />
                Secondhand Guitar Options
              </h2>
              
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-bold text-amber-800 mb-4">Good News: Quality Secondhand Guitars Are Available</h3>
                <p className="text-amber-700 mb-4">
                  You can find excellent deals on used guitars in New Zealand, often saving $100-200 off retail prices. 
                  Many guitars barely show wear and can be great value for beginners.
                </p>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-semibold text-amber-800 mb-2">Best Places to Look:</h4>
                    <ul className="space-y-1">
                      <li>• Trade Me (with caution)</li>
                      <li>• Music store trade-ins</li>
                      <li>• Local guitar groups/forums</li>
                      <li>• Guitar-specific classifieds</li>
                    </ul>
                    <p className="mt-3 text-red-700 font-semibold">
                      <strong>Avoid Facebook Marketplace</strong> - limited buyer protection and higher scam risk
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-amber-800 mb-2">What to Look For:</h4>
                    <ul className="space-y-1">
                      <li>• Yamaha, Ibanez, Fender brands</li>
                      <li>• Photos showing all angles</li>
                      <li>• Honest descriptions of condition</li>
                      <li>• Local pickup available</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-amber-800 mb-4">Secondhand Safety Tips</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-semibold text-amber-800 mb-2">Red Flags to Avoid:</h4>
                    <ul className="space-y-1">
                      <li>• No in-person inspection allowed</li>
                      <li>• Price seems too good to be true</li>
                      <li>• Seller won't provide more photos</li>
                      <li>• Vague or evasive answers about condition</li>
                      <li>• Pressure to buy immediately</li>
                      <li>• Facebook sellers with no ratings/reviews</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-amber-800 mb-2">Smart Buying Tips:</h4>
                    <ul className="space-y-1">
                      <li>• Always inspect in person before buying</li>
                      <li>• Test all electronics (pickups, knobs, jack)</li>
                      <li>• Check neck straightness and fret condition</li>
                      <li>• Meet in safe, public locations</li>
                      <li>• Research the guitar's retail price first</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Amps & Effects */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-amber-800 mb-6 flex items-center">
                <Volume2 className="h-8 w-8 mr-3" />
                Amps & Effects Options
              </h2>
              
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-bold text-amber-800 mb-4">What is an Amplifier?</h3>
                <p className="text-amber-700">
                  An amplifier (or "amp") is essential for electric guitars. Unlike acoustic guitars, electric guitars 
                  make almost no sound on their own. The amp takes the weak electrical signal from your guitar pickups 
                  and makes it loud enough to hear. All amps also shape your guitar's tone - from clean, clear sounds 
                  to distorted rock tones.
                </p>
              </div>

              <h3 className="text-xl font-bold text-amber-800 mb-4">Essential: Choose One Amp</h3>
              <div className="overflow-x-auto mobile-scroll-hint">
                <table className="w-full border-collapse border border-amber-300">
                  <thead>
                    <tr className="bg-amber-100">
                      <th className="border border-amber-300 p-3 text-center">Image</th>
                      <th className="border border-amber-300 p-3 text-left">Amp</th>
                      <th className="border border-amber-300 p-3 text-left">Price</th>
                      <th className="border border-amber-300 p-3 text-left">Where to Buy</th>
                      <th className="border border-amber-300 p-3 text-left">Power/Volume</th>
                      <th className="border border-amber-300 p-3 text-left">Features</th>
                      <th className="border border-amber-300 p-3 text-left">Best For</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-amber-300 p-3 text-center">
                        <div className="flex justify-center">
                          <div className="bg-white p-2 rounded border border-gray-200">
                            <Image 
                              src="/blackstar-debut-10e.webp" 
                              alt="Blackstar Debut 10E Amplifier" 
                              width={80} 
                              height={80} 
                              className="object-contain"
                            />
                          </div>
                        </div>
                      </td>
                      <td className="border border-amber-300 p-3 font-semibold">Blackstar Debut 10E</td>
                      <td className="border border-amber-300 p-3">$189</td>
                      <td className="border border-amber-300 p-3">Rockshop</td>
                      <td className="border border-amber-300 p-3">10W - practice to small jams</td>
                      <td className="border border-amber-300 p-3">Clean + light overdrive, tape delay, headphone out</td>
                      <td className="border border-amber-300 p-3">Lessons, practice, jazz/pop/light rock</td>
                    </tr>
                    <tr>
                      <td className="border border-amber-300 p-3 text-center">
                        <div className="flex justify-center">
                          <div className="bg-white p-2 rounded border border-gray-200">
                            <Image 
                              src="/boss-katana-mini.webp" 
                              alt="Boss Katana Mini Amplifier" 
                              width={80} 
                              height={80} 
                              className="object-contain"
                            />
                          </div>
                        </div>
                      </td>
                      <td className="border border-amber-300 p-3 font-semibold">Boss Katana Mini</td>
                      <td className="border border-amber-300 p-3">$199</td>
                      <td className="border border-amber-300 p-3">Rockshop</td>
                      <td className="border border-amber-300 p-3">7W - surprisingly loud</td>
                      <td className="border border-amber-300 p-3">Clean + 2 distortion levels, battery powered, headphone out</td>
                      <td className="border border-amber-300 p-3">Portable practice, travel, rock/metal</td>
                    </tr>
                    <tr>
                      <td className="border border-amber-300 p-3 text-center">
                        <div className="flex justify-center">
                          <div className="bg-white p-2 rounded border border-gray-200">
                            <Image 
                              src="/orange-crush-20rt.webp" 
                              alt="Orange Crush 20RT Amplifier" 
                              width={80} 
                              height={80} 
                              className="object-contain"
                            />
                          </div>
                        </div>
                      </td>
                      <td className="border border-amber-300 p-3 font-semibold">Orange Crush 20RT</td>
                      <td className="border border-amber-300 p-3">$269</td>
                      <td className="border border-amber-300 p-3">Rockshop</td>
                      <td className="border border-amber-300 p-3">20W - most headroom/volume</td>
                      <td className="border border-amber-300 p-3">Clean + heavy distortion, reverb, tuner, headphone out</td>
                      <td className="border border-amber-300 p-3">Rock/blues, regular jamming, built-in effects</td>
                    </tr>
                  </tbody>
                </table>
              </div>


            </section>

            {/* Essential Accessories */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-amber-800 mb-6 flex items-center">
                <Settings className="h-8 w-8 mr-3" />
                Essential Accessories — $30
              </h2>
              
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-4">
                <h3 className="text-xl font-bold text-amber-800 mb-4">Must Have (included in budget):</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <ul className="text-sm space-y-2">
                      <li><strong>Guitar Cable</strong> — $20 (3m instrument cable)</li>
                      <li><strong>Pick Set</strong> — $10 (4-5 picks, different thicknesses)</li>
                    </ul>
                    <p className="text-amber-800 font-semibold mt-2">Total: $30</p>
                  </div>
                  <div>
                    <p className="text-amber-700 text-sm">
                      These are the absolute essentials. The cable connects your guitar to the amp, 
                      and picks are needed for most playing styles. You literally cannot play electric 
                      guitar without these.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-amber-800 mb-4">Optional Extras (not in budget):</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <ul className="text-sm space-y-2">
                      <li><strong>Guitar Strap</strong> — $30 (if you want to play standing)</li>
                      <li><strong>Tuner</strong> — $20 (clip-on chromatic tuner)</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-amber-700 text-sm">
                      <strong>Strap:</strong> Only needed if you plan to play standing up. Most beginners start sitting down.<br/>
                      <strong>Tuner:</strong> Free smartphone tuner apps work just as well (Guitar Tuna, etc.).
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Guitar & Amp Setups */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-amber-800 mb-6 flex items-center">
                <Settings className="h-8 w-8 mr-3" />
                Guitar & Amp Setups
              </h2>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-amber-300">
                  <thead>
                    <tr className="bg-amber-100">
                      <th className="border border-amber-300 p-3 text-left">Price Level</th>
                      <th className="border border-amber-300 p-3 text-left">Guitar + Amp</th>
                      <th className="border border-amber-300 p-3 text-left">Ready to Play</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-amber-300 p-3 font-semibold">Cheapest</td>
                      <td className="border border-amber-300 p-3">Artist AP59GT90 + Blackstar Debut 10E<br/><span className="text-sm text-gray-600">($449 + $189 = $638)</span></td>
                      <td className="border border-amber-300 p-3 font-semibold">$668<br/><span className="text-sm text-gray-600">($638 + $30 accessories)</span></td>
                    </tr>
                    <tr>
                      <td className="border border-amber-300 p-3 font-semibold">Most Expensive</td>
                      <td className="border border-amber-300 p-3">Yamaha PAC112JL + Orange Crush 20RT<br/><span className="text-sm text-gray-600">($499 + $269 = $768)</span></td>
                      <td className="border border-amber-300 p-3 font-semibold">$798<br/><span className="text-sm text-gray-600">($768 + $30 accessories)</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-4">
                <p className="text-amber-700 text-sm">
                  <strong>Price Range:</strong> These recommended beginner setups range from <strong>$668 to $798</strong> ready to play with essential accessories included.
                </p>
              </div>
            </section>



            {/* Where to Buy */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-amber-800 mb-6 flex items-center">
                <ShoppingCart className="h-8 w-8 mr-3" />
                Where to Buy in New Zealand
              </h2>
              
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                <ul className="space-y-2">
                  <li><strong>MusicWorks</strong> (<a href="https://musicworks.co.nz" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:text-orange-800 underline">musicworks.co.nz</a>) — Stocks Yamaha and Ibanez guitars, Zoom effects, accessories</li>
                  <li><strong>Artist Guitars</strong> (<a href="https://artistguitars.co.nz" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:text-orange-800 underline">artistguitars.co.nz</a>) — Artist brand guitars, accessories, direct-to-consumer only (no physical stores)</li>
                  <li><strong>Rockshop</strong> (<a href="https://rockshop.co.nz" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:text-orange-800 underline">rockshop.co.nz</a>) — Stocks Blackstar, Boss, and Orange amps, Zoom effects, accessories</li>
                </ul>
              </div>
            </section>

            {/* Effects Section */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-amber-800 mb-6 flex items-center">
                <Zap className="h-8 w-8 mr-3" />
                Effects Unit — $249
              </h2>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-bold text-amber-800 mb-4">What is an Amp Modeler?</h3>
                <p className="text-amber-700 mb-4">
                  The Zoom G1X Four is an <strong>amp modeler</strong> - it digitally recreates the sound of famous amplifiers 
                  (like Fender, Marshall, Orange) plus effects pedals all in one unit. Instead of buying separate effects 
                  pedals that cost $100-200 each, you get 70+ effects AND 13 different amp sounds in a single device. 
                  It plugs between your guitar and amp, letting you access countless guitar tones.
                </p>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-bold text-amber-800 mb-4">Recommended Effects Unit:</h3>
                
                <div className="grid md:grid-cols-3 gap-6 mb-4">
                  <div className="md:col-span-2">
                    <div className="mb-4">
                      <ul className="text-sm space-y-1">
                        <li><strong>Zoom G1X Four</strong> — $229 (Available at: Rockshop, MusicWorks)</li>
                        <li><strong>Extra Guitar Cable</strong> — $20 (for Guitar → Zoom → Amp connection)</li>
                        <li className="font-semibold text-amber-800">Total: $249</li>
                      </ul>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-amber-800 mb-2">Features:</h4>
                        <ul className="text-sm space-y-1">
                          <li>70+ built-in effects (distortion, delay, reverb, wah, etc.)</li>
                          <li>13 amp models (Fender, Marshall, Orange styles)</li>
                          <li>Expression pedal for real-time control</li>
                          <li>30-second looper + 68 rhythm patterns</li>
                          <li>50 memory slots for custom patches</li>
                          <li>Built-in tuner + aux input for music</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-amber-800 mb-2">Setup:</h4>
                        <p className="text-amber-700 text-sm mb-2">
                          Guitar → Zoom G1X → Amp
                        </p>
                        <p className="text-amber-700 text-sm mb-2">
                          <strong>For amp modeling:</strong> Use the amp's clean channel and let the Zoom handle all amp sounds and effects.
                        </p>
                        <p className="text-amber-700 text-sm mb-2">
                          <strong>For effects only:</strong> Use the amp's dirty/distortion sound and add Zoom effects on top.
                        </p>
                        <p className="text-amber-700 text-sm">
                          <strong>Alternative:</strong> Can also be used with headphones (bypassing the amp entirely).
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center md:justify-end">
                    <div className="bg-white p-3 rounded-lg shadow-md border-2 border-amber-300">
                      <Image 
                        src="/zoom-g1x-four.webp" 
                        alt="Zoom G1X Four Multi-Effects Pedal" 
                        width={160} 
                        height={120} 
                        className="object-contain rounded border border-gray-200"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white border border-amber-300 rounded-lg p-4 mt-4">
                  <h4 className="font-semibold text-amber-800 mb-2">Why not just use the Zoom with headphones?</h4>
                  <p className="text-amber-700 text-sm mb-3">
                    Headphones are good for quiet practice, but you'll want a proper amp for the full guitar experience. 
                    Amps give you physical sound waves you can feel, better dynamics and response, and the ability to 
                    play with others or perform. Plus, many guitar techniques and playing styles are best learned 
                    through an amp's natural feedback and room sound.
                  </p>
                  <p className="text-amber-700 text-sm font-semibold">
                    <strong>Budget Priority:</strong> If you can only afford an amp OR the effects unit, I'd suggest the amp. 
                    You can always add effects later, but you need an amp to properly hear and develop your playing.
                  </p>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-bold text-amber-800 mb-4">Why the Zoom G1X Four Amp Modeler?</h3>
                <p className="text-amber-700">
                  This amp modeler is perfect for beginners because it gives you access to famous guitar sounds without 
                  buying expensive gear. You get Marshall stack distortion, Fender clean tones, Orange rock sounds, plus 
                  70+ effects all in one unit. Individual effect pedals cost $100-200 each, and different amps cost 
                  thousands - this gives you all those sounds for $229.
                </p>
              </div>

              <div className="bg-amber-100 border border-amber-300 rounded-lg p-4">
                <p className="text-amber-800 font-semibold text-center">
                  Complete setups with effects: <strong>$917</strong> (cheapest) to <strong>$1,047</strong> (most expensive) including the Zoom G1X Four and extra cable.
                </p>
              </div>
            </section>



            {/* Call to Action */}
            <div className="bg-amber-100 border border-amber-300 rounded-lg p-6 text-center">
              <h3 className="text-xl font-bold text-amber-800 mb-3">Questions about gear choices?</h3>
              <p className="text-amber-700 mb-4">
                Feel free to discuss these recommendations during your lesson or contact me for personalized 
                advice based on your musical goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/contact" 
                  className="bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors inline-flex items-center justify-center"
                >
                  Contact Me <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link 
                  href="/lessons" 
                  className="border-2 border-amber-600 text-amber-600 px-6 py-3 rounded-lg font-semibold hover:bg-amber-600 hover:text-white transition-colors inline-flex items-center justify-center"
                >
                  View Lessons <Music className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>

            <p className="text-sm text-gray-600 text-center mt-8 italic">
              Guide compiled from current NZ retailer pricing and student feedback - Updated June 2025
            </p>
          </div>
        </div>
      </article>
    </div>
  )
} 