import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Music } from 'lucide-react'

export const metadata: Metadata = {
  title: "Wellington's Music Stores Keep Disappearing - Kapiti Coast Now Has None | Mike Nelson Guitar Lessons",
  description: "The closure of Kapiti Music marks the end of an era for local music stores. Exploring what's left for Wellington region musicians and why independent stores struggle to survive.",
  keywords: "Wellington music stores, Kapiti Music, music shops Wellington, guitar stores, Kingdom Music, Rockshop, Music Planet"
}

export default function WellingtonMusicStoresPost() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <Link 
            href="/blog" 
            className="inline-flex items-center text-orange-600 hover:text-orange-700 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-bold text-amber-600 mb-4">
            Wellington's Music Stores Keep Disappearing - Kapiti Coast Now Has None
          </h1>
          
          <div className="text-gray-600 mb-8">
            <time>Published: June 2024</time>
          </div>
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-700 mb-8">
            Another one bites the dust. <strong>Kapiti Music</strong> in Paraparaumu has shut down, and with it goes the last music store serving the Kapiti Coast. The little shop on Amohia Street couldn't make it work anymore, with the owners saying "the recession finally got us" in their farewell post.
          </p>



          <h2 className="text-3xl font-bold text-amber-600 mt-12 mb-6">Kingdom Music's Short-Lived Experiment</h2>

          <p>
            Making things worse, Kingdom Musicworks tried to set up shop in North City shopping centre in Porirua over the Christmas holidays, but that lasted all of a few months before they pulled the pin.
          </p>

          <p>
            If a Musicworks store can't make it work in Porirua, it's pretty clear the writing's on the wall for regional music stores.
          </p>

          <h2 className="text-3xl font-bold text-amber-600 mt-12 mb-6">What's Left: Wellington City and the Hutt Valley</h2>

          <p>So where can you actually buy a guitar these days? Here's what's still operating:</p>

          <h3 className="text-xl font-semibold text-amber-700 mt-8 mb-4">Wellington Central</h3>
          <ul className="list-disc list-inside space-y-2 mb-6">
            <li>Music Planet on Vivian Street</li>
            <li>Rockshop on Cuba Street</li>
            <li>Music Works on Ghuznee Street</li>
            <li>The Guitar Gallery on Cuba Street (for higher-end instruments)</li>
          </ul>

          <h3 className="text-xl font-semibold text-amber-700 mt-8 mb-4">The Hutt Valley</h3>
          <ul className="list-disc list-inside space-y-2 mb-6">
            <li>Kingdom Musicworks on High Street, Lower Hutt</li>
            <li>Rockshop on Margaret Street, Lower Hutt</li>
          </ul>

          <h2 className="text-3xl font-bold text-amber-600 mt-12 mb-6">Why This Keeps Happening</h2>

          <p>Multiple factors are hurting music stores:</p>

          <h3 className="text-xl font-semibold text-amber-700 mt-8 mb-4">Online Takeover</h3>
          <ul className="list-disc list-inside space-y-3 mb-6">
            <li><strong>Online sales</strong> - The first and biggest hit to physical stores</li>
            <li><strong>Online product research</strong> - Videos and other online material make it easier to buy without testing products in person</li>
          </ul>

          <h3 className="text-xl font-semibold text-amber-700 mt-8 mb-4">Distribution Models</h3>
          <ul className="list-disc list-inside space-y-3 mb-6">
            <li><strong>Traditional distribution</strong> - Relies on exclusive agreements where distributors control which retailers get access to which brands, often excluding independent stores from premium brand partnerships</li>
          </ul>

          <h3 className="text-xl font-semibold text-amber-700 mt-8 mb-4">Market Changes</h3>
          <ul className="list-disc list-inside space-y-3 mb-6">
            <li><strong>Digital gear revolution</strong> - High quality amp and effect modulation units, plus software and audio interface + computer based rigs replacing physical hardware</li>
            <li><strong>Direct-to-consumer brands</strong> - Companies completely bypass the traditional distributor system, selling direct online and shipping worldwide without needing local dealers. NZ/Australian brands like Artist Guitars and Ormsby offer direct sales with lower shipping costs and no import duties, while international brands like Kiesel (US) and Solar (Spain) ship from overseas. For customers, you just order online, pay any applicable import duties, and often get better value than what local stores can offer</li>
          </ul>

          <h3 className="text-xl font-semibold text-amber-700 mt-8 mb-4">Economic Pressures</h3>
          <ul className="list-disc list-inside space-y-3 mb-6">
            <li><strong>Current economic pressures</strong> - People spending less on non-essentials</li>
            <li><strong>Geographic reality</strong> - Small towns don't have enough customers to keep independent shops alive. There's only enough demand for a few stores, and the chains have an advantage</li>
            <li><strong>Convenience factor</strong> - It's not that hard to drive into Wellington or the Hutt if you really need to try before you buy</li>
          </ul>

          <h2 className="text-3xl font-bold text-amber-600 mt-12 mb-6">The Barriers for Independent Stores</h2>

          <p>The big chains control everything, making it nearly impossible for independents to compete:</p>

          <h3 className="text-xl font-semibold text-amber-700 mt-8 mb-4">Distribution Control</h3>
          <ul className="list-disc list-inside space-y-2 mb-6">
            <li>Rockshop: 25 stores nationwide, market leader since 1986</li>
            <li>Music Works: 34 stores, controls exclusive distribution for brands like Yamaha</li>
            <li>Direct Imports (NZ) Ltd: Locked up Fender distribution for over 40 years</li>
            <li>These massive players aren't rushing to help independent shops compete with them</li>
          </ul>

          <p className="mb-6">
            But it gets worse - some brands are exclusively tied to specific retailers. Fender, for example, is exclusively distributed by Direct Imports (NZ) Ltd, and they only sell to Rockshop and The Guitar Gallery. So even if you had the money, you still couldn't get Fender guitars for your independent store because the distributor won't sell to you.
          </p>

          <h3 className="text-xl font-semibold text-amber-700 mt-8 mb-4">Massive Buy-In Costs</h3>
          <ul className="list-disc list-inside space-y-2 mb-6">
            <li>Music shops need to hold high amounts of inventory in general - guitars, amps, drums, accessories</li>
            <li>Want to sell Fender? That'll be 6 figures just to get started - for a small shop, that's basically betting the farm on one brand</li>
            <li>Big chains can spread that risk across dozens of stores</li>
          </ul>

          <h3 className="text-xl font-semibold text-amber-700 mt-8 mb-4">The Vicious Cycle</h3>
          <ul className="list-disc list-inside space-y-2 mb-6">
            <li>Half the customers ask for Fender Strats or Gibson Les Pauls</li>
            <li>Without dealer rights, you're constantly saying "nah, we don't stock those"</li>
            <li>Customers walk out the door</li>
            <li>After enough of those conversations, you can't justify dropping $100k+ on a dealer agreement</li>
          </ul>

          <h3 className="text-xl font-semibold text-amber-700 mt-8 mb-4">Pricing Disadvantage</h3>
          <ul className="list-disc list-inside space-y-2 mb-6">
            <li>Chains buy in huge volumes</li>
            <li>An independent might pay more wholesale than Rockshop sells for retail</li>
            <li>Impossible to compete on price</li>
          </ul>

          <p>
            So what's left? You're basically stuck selling whatever brands the big distributors don't want to push through their own stores, or trying to survive on repairs and accessories. No wonder so many independents have thrown in the towel - they're fighting with one hand tied behind their back from day one.
          </p>

          <p>
            It's pretty rough out there for anyone trying to run a proper independent music store these days.
          </p>

          <h2 className="text-3xl font-bold text-amber-600 mt-12 mb-6">What This Means for Kapiti Musicians</h2>

          <p>
            If you're living somewhere like Pukerua Bay, new guitar strings is a trip to Wellington or the Hutt Valley. There's also Kings Sound Centre in Levin, about a 30-minute drive north from Paraparaumu, but that's still a proper expedition for something as simple as picking up picks or strings.
          </p>

          <p>
            It's a real shame because music shops aren't just about buying stuff - they're where you'd bump into other musicians, get advice from someone who actually plays, and discover gear you didn't even know existed. Some of my best memories as a kid were in these stores.
          </p>

          <p>
            Whether this trend stops here or keeps going is anyone's guess, but for now, Kapiti Coast musicians are learning to live without a local music store.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mt-8">
          <Link 
            href="/blog" 
            className="inline-flex items-center text-orange-600 hover:text-orange-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
          
          <Link 
            href="/lessons" 
            className="inline-flex items-center bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors"
          >
            <Music className="w-4 h-4 mr-2" />
            View Lessons
          </Link>
        </div>

        <div className="mt-8 text-center text-gray-600 text-sm italic">
          <p>Mike Nelson teaches guitar lessons in Pukerua Bay, Plimmerton, Cambourne, Mana, Paremata, Papakowhai, and Whitby.</p>
        </div>
      </div>
    </div>
  )
}