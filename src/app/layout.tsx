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
  title: "Mike Nelson Guitar Lessons | Guitar Tuition in Wellington",
  description: "Guitar lessons in Pukerua Bay, Wellington with interactive scale explorer tool. Learn guitar theory, scales, modes, and chord progressions with visual fretboard diagrams.",
  keywords: "guitar lessons, Wellington, Pukerua Bay, guitar teacher, music lessons, guitar tuition, guitar scales, guitar modes, fretboard diagram, music theory, guitar chords, guitar learning, scale practice, guitar intervals, major scale, pentatonic scale, guitar education, music interval colours, music interval colors, chord theory, music theory for beginners, guitar theory confusion, music theory simplified, guitar scales explained, chord theory basics, fretboard memorization, guitar intervals explained, music theory made easy, guitar theory lessons, visual music theory, interactive guitar learning, guitar scale patterns, chord progression theory, guitar fretboard theory, guitar fretboard visualization, chord diagram generator, scale pattern tool, interval color coding, guitar mode explorer, enharmonic equivalents, diatonic chord theory, guitar interval training, modal interchange, guitar theory for dummies, understanding guitar modes, guitar chord construction",
  authors: [{ name: "Mike Nelson" }],
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', type: 'image/x-icon', sizes: '16x16' }
    ],
    apple: [
      { url: '/favicon.svg', sizes: '180x180', type: 'image/svg+xml' }
    ],
    shortcut: '/favicon.ico',
  },
  openGraph: {
    title: "Mike Nelson Guitar Lessons & Scale Explorer",
    description: "Guitar lessons in Pukerua Bay, Wellington with interactive scale explorer tool. Learn guitar theory, scales, modes, and chord progressions with visual fretboard diagrams.",
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
    title: "Mike Nelson Guitar Lessons & Scale Explorer",
    description: "Guitar lessons in Pukerua Bay, Wellington with interactive scale explorer tool. Learn guitar theory, scales, modes, and chord progressions with visual fretboard diagrams.",
    images: ['https://mikenelsonguitarlessons.co.nz/Mike%20Photo.jpg'],
  },
  robots: {
    index: true,
    follow: true,
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
  return (
    <html lang="en" className="scroll-smooth">
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
