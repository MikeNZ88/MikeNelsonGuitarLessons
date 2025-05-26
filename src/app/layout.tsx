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
  metadataBase: new URL('https://mikenelsonguitar.com'),
  title: "Mike Nelson Guitar Lessons | Guitar Tuition in Wellington",
  description: "Guitar lessons in Wellington with 25+ years experience",
  keywords: "guitar lessons, Wellington, Pukerua Bay, guitar teacher, music lessons, guitar tuition",
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
    title: "Mike Nelson Guitar Lessons",
    description: "Guitar lessons in Wellington with 25+ years experience",
    type: "website",
    locale: "en_NZ",
    url: "https://mikenelsonguitar.com",
    siteName: "Mike Nelson Guitar Lessons",
    images: [
      {
        url: 'https://mikenelsonguitar.com/Mike%20Photo.jpg',
        width: 1200,
        height: 630,
        alt: 'Mike Nelson Guitar Teacher',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Mike Nelson Guitar Lessons",
    description: "Guitar lessons in Wellington with 25+ years experience",
    images: ['https://mikenelsonguitar.com/Mike%20Photo.jpg'],
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
