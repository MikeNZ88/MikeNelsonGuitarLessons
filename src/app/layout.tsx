import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter"
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair"
});

export const metadata: Metadata = {
  metadataBase: new URL('https://mikenelsonguitarlessons.co.nz'),
  title: "Mike Nelson Guitar Lessons | Guitar Teacher Wellington",
  description: "Mike Nelson Guitar Lessons - Guitar teacher with 25+ years of playing experience in Wellington. Home studio and mobile lessons in Pukerua Bay, Plimmerton, Cambourne, Mana, Paremata, Papakowhai, Whitby. Learn guitar theory, scales, and chord progressions.",
  keywords: "guitar lessons near me, guitar teacher near me, Wellington guitar lessons, Pukerua Bay guitar lessons, Plimmerton guitar lessons, Cambourne guitar lessons, Mana guitar lessons, Paremata guitar lessons, Papakowhai guitar lessons, Whitby guitar lessons, guitar teacher Wellington, music lessons near me, guitar tuition near me, mobile guitar lessons, home guitar lessons, guitar teacher, music lessons, guitar tuition, guitar scales, guitar modes, fretboard diagram, music theory, guitar chords, guitar learning, scale practice, guitar intervals, major scale, pentatonic scale, guitar education, music interval colours, music interval colors, chord theory, music theory for beginners, guitar theory confusion, music theory simplified, guitar scales explained, chord theory basics, fretboard memorization, guitar intervals explained, music theory made easy, guitar theory lessons, visual music theory, interactive guitar learning, guitar scale patterns, chord progression theory, guitar fretboard theory, guitar fretboard visualization, chord diagram generator, scale pattern tool, interval color coding, guitar mode explorer, enharmonic equivalents, diatonic chord theory, guitar interval training, modal interchange, guitar theory for dummies, understanding guitar modes, guitar chord construction, online guitar lessons",
  authors: [{ name: "Mike Nelson" }],
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/favicon.svg', sizes: '180x180', type: 'image/svg+xml' }
    ],
    shortcut: '/favicon.svg',
  },
  openGraph: {
    title: "Mike Nelson Guitar Lessons | Guitar Teacher Wellington",
    description: "Guitar lessons in Wellington North with Mike Nelson, a guitar teacher with 25+ years of playing experience. Home studio and mobile lessons in Pukerua Bay, Plimmerton, Cambourne, Mana, Paremata, Papakowhai, Whitby.",
    type: "website",
    locale: "en_NZ",
    url: "https://mikenelsonguitarlessons.co.nz",
    siteName: "Mike Nelson Guitar Lessons",
    images: [
      {
        url: 'https://mikenelsonguitarlessons.co.nz/Mike%20Photo.jpg',
        width: 1200,
        height: 630,
        alt: 'Mike Nelson Guitar Teacher with Scale Explorer Tool',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Mike Nelson Guitar Lessons | Guitar Teacher Wellington",
    description: "Guitar lessons in Wellington North with Mike Nelson, a guitar teacher with 25+ years of playing experience. Home studio and mobile lessons in Pukerua Bay, Plimmerton, Cambourne, Mana, Paremata, Papakowhai, Whitby.",
    images: ['https://mikenelsonguitarlessons.co.nz/Mike%20Photo.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://mikenelsonguitarlessons.co.nz',
  },
  manifest: '/manifest.json',
  other: {
    'msapplication-TileColor': '#d97706',
    'theme-color': '#d97706',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    "name": "Mike Nelson Guitar Lessons",
    "description": "Guitar lessons in Pukerua Bay, Wellington. Learn guitar theory, scales, modes, and chord progressions with Mike Nelson, a guitar teacher with 25+ years of playing experience.",
    "url": "https://mikenelsonguitarlessons.co.nz",
    "telephone": "022-127-2154",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Pukerua Bay",
      "addressRegion": "Wellington",
      "addressCountry": "NZ"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "-41.026",
      "longitude": "174.890"
    },
    "areaServed": [
      "Pukerua Bay",
      "Plimmerton", 
      "Cambourne",
      "Mana",
      "Paremata",
      "Papakowhai",
      "Whitby",
      "Wellington"
    ],
    "serviceType": "Music Lessons",
    "priceRange": "$30-$45",
    "instructor": {
      "@type": "Person",
      "name": "Mike Nelson",
      "jobTitle": "Guitar Teacher"
    }
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-M01QMM0HQL"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-M01QMM0HQL');
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-amber-50 text-amber-900`}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
