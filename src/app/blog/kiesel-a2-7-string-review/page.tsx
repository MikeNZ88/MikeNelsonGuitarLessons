import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Music, DollarSign, Zap, Monitor, Settings } from 'lucide-react'

export const metadata: Metadata = {
  title: 'My Kiesel A2 7-String | Mike Nelson Guitar Lessons',
  description: 'Complete guide to importing a Kiesel A2 7-String to New Zealand. Real import costs ($4,385 NZD), customs process, GST fees, and honest review from a Wellington guitar teacher.',
  openGraph: {
    title: 'My Kiesel A2 7-String - NZ Import Guide & Review',
    description: 'Complete guide to importing a Kiesel A2 7-String to New Zealand. Real costs, customs process, and honest review.',
    images: [{ url: '/Kiesel logo.jpg' }],
    type: 'article',
    locale: 'en_NZ',
  },
  alternates: {
    canonical: 'https://mikenelsonguitarlessons.co.nz/blog/kiesel-a2-7-string-review',
  },
}

export default function KieselA2Review() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-zinc-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <Link 
            href="/blog" 
            className="inline-flex items-center text-zinc-600 hover:text-zinc-800 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-bold text-amber-600 mb-4">
            Kiesel A2 7-String Review: My Custom Guitar Experience
          </h1>
          
          <div className="text-gray-600 mb-8">
            <time>Published: June 25, 2025</time>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1 prose prose-lg max-w-none prose-p:mb-6">
            
            {/* Guitar Image - Mobile: full width, Desktop: floating */}
            <div className="mb-8 lg:float-right lg:ml-8 lg:mb-8 lg:mt-4 lg:w-72 lg:clear-right">
              <Image 
                src="/my-gear/Screenshot 2025-06-24 at 9.57.49 PM.png"
                alt="Kiesel A2 7-String Guitar"
                width={320}
                height={800}
                className="w-full max-w-sm mx-auto lg:max-w-none lg:mx-0 rounded-lg shadow-lg border border-gray-200"
              />
            </div>
          <p className="text-xl text-gray-700 mb-8">
            I've always been drawn to downtuned guitars. They're used heavily, no pun intended, in metal music. I'm a fan of many styles, but metal has been my go-to style of music since I was a teenager and it still is.
          </p>

          <p className="mb-6">
            With a few earlier exceptions, metal started experimenting with lower tunings in the '90s. Korn are often cited as the catalyst, using 7 strings tuned down a whole step (<strong>A, D, G, C, F, A, D (low to high)</strong>). They're also a band that had a big effect on me at around the age of 11.
          </p>

          <p className="mb-6">
            With the association of down tuning and bands like Korn, referred to as "Nu metal", it's common to see some metalheads criticize bands that use low tunings, and deem it not true metal. It also has an association with "Core" bands e.g. Metalcore (a metal subgenre) which is also regarded by some as "not metal". 
          </p>

          <p className="mb-6">
            Me? I agree that low-tuned guitars are overused and often poorly implemented in modern metal, but I still love them. Some bands use extended range guitars (like 7 and 8 string) in a way that relies on hitting the lowest notes all the time, instead of using the lower range to contrast with other sections of the songs. The impact is lost. 
          </p>

          <p className="mb-6">
            The trick, in my opinion is to not always use the lowest note available as your anchor point. Try writing a few frets higher and utilizing the lower notes for impact. This isn't any kind of rule, it's still great chugging on the lowest open string for most of a song, but that can't be every song.
          </p>

          <p className="mb-6">
            Anyway, about the guitar... After a few months of looking around for options in NZ, I finally pulled the trigger on a <strong>Kiesel A2 7-String</strong> last year. It took about 8 weeks to build and arrive, finally showing up in August.
          </p>

          <h2 className="text-3xl font-bold text-amber-600 mt-12 mb-6 flex items-center">
            <DollarSign className="h-8 w-8 mr-3" />
            Importing a Kiesel Guitar to New Zealand
          </h2>

          <p className="mb-6">The ordering process itself is pretty straightforward:</p>

          <ol className="list-decimal list-inside space-y-2 mb-6">
            <li><strong>Build Guitar on Kiesel website</strong> - Configure your specs using their online builder</li>
            <li><strong>Order and pay</strong> - Submit your order with payment</li>
            <li><strong>Wait</strong> - They say it takes 8-14 weeks to build and ship (mine took about 8 weeks)</li>
            <li><strong>Pay GST and Fees</strong> - Once it arrives in New Zealand, you'll get contacted to pay customs fees</li>
          </ol>

          <p className="mb-6">
            Kiesel uses FedEx for international shipping. Once my guitar arrived in Auckland, FedEx contacted me to pay the GST and import fees. After payment, I was told it would be transferred to NZ Couriers for final delivery. I even went to their depot in Ngauranga, Wellington to collect it, but then it arrived later that same day via a completely different courier company! The logistics handover between international and domestic couriers can be a bit unpredictable.
          </p>

          <p className="mb-6">The total cost came pretty close to what I was expecting:</p>

          <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-6 my-8">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-300">
                  <th className="text-left py-2 font-semibold">Item</th>
                  <th className="text-right py-2 font-semibold">Cost</th>
                </tr>
              </thead>
              <tbody className="space-y-2">
                <tr className="border-b border-zinc-200">
                  <td className="py-2">Guitar + shipping (USD $2,309)</td>
                  <td className="py-2 text-right">$3,765 NZD</td>
                </tr>
                <tr className="border-b border-zinc-200">
                  <td className="py-2">GST (15%)</td>
                  <td className="py-2 text-right">$527.25 NZD</td>
                </tr>
                <tr className="border-b border-zinc-200">
                  <td className="py-2">Import lodgement fee</td>
                  <td className="py-2 text-right">$93.44 NZD</td>
                </tr>
                <tr className="font-bold">
                  <td className="py-2"><strong>Total</strong></td>
                  <td className="py-2 text-right"><strong>$4,385.69 NZD</strong></td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mb-6">
            A significant investment, but it's exactly what I was looking for. While there are much more expensive guitars around, this represents excellent value for a custom-built, neck-through 7-string with these specifications. At the exchange rate when I bought it (0.6132) versus today's rate (0.6031), if I were buying the same guitar today it would cost about $115 more due to the weaker NZD.
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 my-8">
            <p className="text-amber-800">
              <strong>For New Zealand guitar imports:</strong> Be prepared for these additional costs when importing custom guitars from overseas manufacturers like Kiesel. The 15% GST, duty fees, and import lodgement fee added about 16% to my total order cost. Your guitar will go through New Zealand Customs clearance in Auckland, requiring additional paperwork and adding 3-5 days to the delivery timeline. Budget an extra $600-800 NZD for a guitar in this price range.
            </p>
          </div>

          <h2 className="text-3xl font-bold text-amber-600 mt-12 mb-6 flex items-center">
            <Music className="h-8 w-8 mr-3" />
            The Guitar
          </h2>

          <p className="mb-6">
            This guitar gives me access to that low B (5 semitones below standard low E), and when I want to go even lower, I can drop to Drop A tuning. I may add a Digitech Whammy pedal to my setup for those times when I need to go even "deeper".
          </p>

          <p className="mb-6">
            I had seriously considered a baritone guitar, but ultimately decided against it. With a baritone, I'd lose the higher range and compatibility with standard tuning. 
          </p>

          <p className="mb-6">
            This Kiesel lets me play everything from standard tuning material to the heaviest riffs, all on one instrument. It's perfect for what I want to play while still being versatile enough that I can practice lesson material on it when needed.
          </p>

          <p className="mb-6">
            What really sold me on this particular guitar is how familiar it feels. The neck doesn't feel much bigger than my 6-string guitars. Some 7-strings feel like completely different instruments—unwieldy and awkward—but this one maintains that comfortable, familiar feel that makes you want to pick it up and play.
          </p>

          <p className="mb-6">
            As guitarists, we all know how much the instrument itself affects our playing. Some guitars inspire you and make you want to explore new musical territories, while others feel restrictive and kill your creativity. This Kiesel definitely falls into the inspiring category.
          </p>

          <p className="mb-6">
            The neck-through construction provides incredible sustain and smooth access to those upper frets. The 25.5" scale length keeps things familiar, while the ebony fingerboard with stainless jumbo frets offers that smooth, fast feel that modern players expect. 
          </p>

          <p className="mb-6">
            I went with the passive Kiesel pickups (Thorium bridge, Empyrean neck) because I prefer the simplicity and dynamic response of passive electronics. My RG1550 has EMG active pickups that were installed by Weta Guitars back in around 2006, and I regretted that decision—I definitely prefer passive pickups now. 
          </p>

          <p className="mb-6">
            The finish looks stunning and showcases the natural wood grain underneath.
          </p>

          <h2 className="text-3xl font-bold text-amber-600 mt-12 mb-6 flex items-center">
            <Settings className="h-8 w-8 mr-3" />
            My Other Gear
          </h2>

          <p>
            This Kiesel joins my other guitars: my trusty <strong>Ibanez RG1550</strong>, which I purchased from Musicworks back in 2004 for $1700, and a <strong>Schecter KM7 7-string</strong> I got from Kingdom Music Works in 2019 for around $1800.
          </p>

          <div className="grid md:grid-cols-2 gap-6 my-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <Image 
                src="/my-gear/ibanez-rg550-genesis-collection-hsh-electric-guitar-black-rg550bk-0456808001720149787.webp"
                alt="Ibanez RG1550"
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">Ibanez RG1550</h3>
                <p className="text-gray-600 text-sm">Purchased from Musicworks in 2004 for $1700. A reliable workhorse for nearly two decades.</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <Image 
                src="/my-gear/KM7.jpg"
                alt="Schecter KM7 7-string"
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">Schecter KM7 7-string</h3>
                <p className="text-gray-600 text-sm">Got from Kingdom Music Works in 2019 for around $1800. Good guitar, but never quite felt right.</p>
              </div>
            </div>
          </div>

          <p>
            The RG1550 has been a reliable workhorse for nearly two decades. 
          </p>

          <p>
            The KM7 is a good guitar, but it never quite felt right to me—the neck is definitely bigger and it just doesn't have that familiar feel I was looking for in a 7-string.
          </p>

          <h3 className="text-2xl font-semibold text-amber-700 mt-8 mb-4 flex items-center">
            <Monitor className="h-6 w-6 mr-2" />
            Studio Setup
          </h3>

          <p>
            For my own music production, I use a relatively straightforward but effective setup: Reaper as my DAW (fantastic value and incredibly flexible), a Focusrite Scarlett 2i2 interface, MacBook Pro, and Yamaha HS8 monitors.
          </p>

          <div className="grid md:grid-cols-3 gap-4 my-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <Image 
                src="/my-gear/Macbook.jpeg"
                alt="MacBook Pro"
                width={300}
                height={200}
                className="w-full h-32 object-cover"
              />
              <div className="p-3">
                <h4 className="font-medium text-sm">MacBook Pro</h4>
                <p className="text-gray-600 text-xs">Running Reaper DAW</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <Image 
                src="/my-gear/51qJYqPV1YL._AC_SX679_.jpg"
                alt="Focusrite Scarlett 2i2"
                width={300}
                height={200}
                className="w-full h-32 object-cover"
              />
              <div className="p-3">
                <h4 className="font-medium text-sm">Focusrite Scarlett 2i2</h4>
                <p className="text-gray-600 text-xs">Audio interface</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <Image 
                src="/my-gear/yamaha-hs8-powered-studio-monitor-8-inch-matched-pair-limited-edition-1-hs8mp.webp"
                alt="Yamaha HS8 Monitors"
                width={300}
                height={200}
                className="w-full h-32 object-cover"
              />
              <div className="p-3">
                <h4 className="font-medium text-sm">Yamaha HS8 Monitors</h4>
                <p className="text-gray-600 text-xs">Studio monitors</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 my-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <Image 
                src="/my-gear/line-6-hx-stomp-xl-multi-effects-amp-modelling-floor-processor-aaf6527-gsus4-712284_994x994.webp"
                alt="Line 6 HX Stomp XL"
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">Line 6 HX Stomp XL</h3>
                <p className="text-gray-600 text-sm">Multi-effects and amp modeling processor for guitar tones.</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <Image 
                src="/my-gear/img_gallery_100_212_01.webp"
                alt="Boss Katana Amp"
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">Boss Katana</h3>
                <p className="text-gray-600 text-sm">Main practice and lesson amp. Also used for monitoring while recording through HX Stomp.</p>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-amber-700 mt-8 mb-4 flex items-center">
            <Zap className="h-6 w-6 mr-2" />
            Recording Setup
          </h3>

          <p>
            One interesting setup I've been using lately involves an aggregate device configuration on my Mac. I run my HX Stomp into the power amp input of my Boss Katana while simultaneously sending the signal to Reaper via USB. 
          </p>

          <p>
            This gives me the best of both worlds: I hear my guitar through the dedicated amp speaker (separate from the mix), while the recorded signal goes directly from the HX Stomp to my DAW completely uncolored by the Katana. The Focusrite handles playback from Reaper, creating a clean separation between my playing monitor and the studio monitors.
          </p>

          <p>
            Sure, the Katana colors the tone I'm hearing while playing, but it still sounds great for monitoring purposes, and most importantly, it doesn't affect the recorded signal at all.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 my-8">
            <h4 className="font-semibold text-blue-900 mb-3">Signal Chain Summary:</h4>
            <ol className="list-decimal list-inside space-y-1 text-blue-800">
              <li>Guitar → HX Stomp XL</li>
              <li>HX Stomp → Boss Katana (for monitoring)</li>
              <li>HX Stomp → USB → Reaper (for recording)</li>
              <li>Reaper → Focusrite → Yamaha HS8s (for playback)</li>
            </ol>
          </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mt-12">
          <Link 
            href="/blog" 
            className="inline-flex items-center text-zinc-600 hover:text-zinc-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
          
          <Link 
            href="/lessons" 
            className="inline-flex items-center bg-amber-700 text-white px-6 py-3 rounded-lg hover:bg-amber-800 transition-colors"
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