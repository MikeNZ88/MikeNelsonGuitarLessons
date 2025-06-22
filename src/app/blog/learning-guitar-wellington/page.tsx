import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Clock, Music } from 'lucide-react';

export const metadata: Metadata = {
  title: "Wellington's Music Stores Keep Disappearing - Kapiti Coast Now Has None | Mike Nelson Guitar Lessons",
  description: "Another music store closes in the Wellington region. Kapiti Music shuts down, leaving the Kapiti Coast without any music stores for the first time in years.",
  keywords: "wellington music stores, kapiti music store closed, guitar shops wellington, music stores closing, wellington music scene",
};

export default function WellingtonMusicStores() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back to Blog */}
        <Link 
          href="/blog" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Link>

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>7 min read</span>
            </div>
            <div className="flex items-center gap-1">
              <Music className="w-4 h-4" />
              <span>Music Industry</span>
            </div>
            <span>January 22, 2025</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Wellington's Music Stores Keep Disappearing - Kapiti Coast Now Has None
          </h1>
          
          <p className="text-xl text-gray-600 leading-relaxed">
            Another one bites the dust. Kapiti Music in Paraparaumu has shut down, and with it goes the last music store serving the Kapiti Coast.
          </p>
        </header>

        {/* Featured Image */}
        <div className="mb-12">
          <img 
            src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
            alt="Financial market downward trend"
            className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Article Content */}
        <article className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-700 mb-8">
            Another one bites the dust. Kapiti Music in Paraparaumu has shut down, and with it goes the last music store serving the Kapiti Coast. The little shop on Amohia Street that many local musos relied on for gear couldn't make it work anymore, with the owners saying "the recession finally got us" in their farewell post.
          </p>

          <p className="mb-8">
            It's pretty gutting, really. This isn't just another shop closing - it's another sign that if you want to buy a guitar or drum kit in the Wellington region, you're going to have to trek into the city or order online like everyone else.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mb-6">Kingdom Music's Short-Lived Experiment</h2>
          
          <p className="mb-6">
            Making things worse, Kingdom Music tried to set up shop in Porirua over the Christmas holidays, but that lasted all of a few months before they pulled the pin. Everyone was pretty hopeful when they opened - finally, someone filling the gap! But nope, turned out the numbers just didn't stack up.
          </p>

          <p className="mb-8">
            If an established chain like Kingdom Music can't make it work in Porirua, it's pretty clear the writing's on the wall for regional music stores.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mb-6">What's Left: Wellington City and the Hutt Valley</h2>
          
          <p className="mb-6">
            So where can you actually buy a guitar these days? Basically, you've got two options:
          </p>

          <p className="mb-4">
            <strong>Wellington Central</strong> still has a few options. Musicworks on Ghuznee Street, Rockshop on Cuba Street, and Music Planet on Vivian Street are the main players, with The Guitar Gallery covering the higher-end stuff. KBB Music handles brass and woodwind.
          </p>

          <p className="mb-8">
            <strong>The Hutt Valley</strong> has Kingdom MusicWorks on High Street in Lower Hutt and Rockshop on Margaret Street in Lower Hutt.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mb-6">Why This Keeps Happening</h2>
          
          <p className="mb-8">
            It's the same story everywhere - online shopping is killing physical stores, people are spending less money on non-essentials, and small towns just don't have enough customers to keep specialized shops alive. Plus, it's not that hard to drive into Wellington or the Hutt if you really need to try before you buy.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mb-6">What This Means for Kapiti Musicians</h2>
          
          <p className="mb-6">
            If you're living somewhere like Pukerua Bay, new guitar strings is a trip to Wellington or the Hutt Valley.
          </p>

          <p className="mb-8">
            It's a real shame because music shops aren't just about buying stuff - they're where you'd bump into other musicians, get advice from someone who actually plays, and discover gear you didn't even know existed. Some of my best memories as a kid were in these stores. That community vibe is pretty hard to replace with a website.
          </p>

          <p className="mb-8">
            Wellington's music scene is still buzzing, but the infrastructure supporting it keeps shrinking back toward the city center. Whether this trend stops here or keeps going is anyone's guess, but for now, Kapiti Coast musicians are learning to live without a local music store for the first time in ages.
          </p>
        </article>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t">
          <Link 
            href="/blog" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
          <Link 
            href="/lessons" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            View Lessons
            <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  );
} 