import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Barre Chord Library: Complete Guide | Mike Nelson Guitar Lessons',
  description: 'Master barre chords with comprehensive library. Interactive diagrams for E and A shape barre chords, major, minor, seventh chords.',
  openGraph: {
    title: 'Barre Chord Library: Complete Guide',
    description: 'Master barre chords with interactive diagrams for E and A shape patterns. Learn major, minor, seventh, and suspended chords.',
    images: [
      {
        url: '/blog-thumbnail.svg',
        width: 1200,
        height: 630,
        alt: 'Barre Chord Library Guide',
      },
    ],
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Barre Chord Library: Complete Guide',
    description: 'Master barre chords with interactive diagrams and step-by-step instructions.',
    images: ['/blog-thumbnail.svg'],
  },
  alternates: {
    canonical: 'https://mikenelsonguitarlessons.co.nz/blog/barre-chord-library',
  },
};

export default function BarreChordLibraryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <h1 className="sr-only">Barre Chord Library</h1>
      {children}
    </>
  );
} 