import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Moveable Guitar Chord Shapes Library',
  description: 'Master moveable chord shapes for major, minor, diminished, seventh, extended, suspended, and altered chords.',
  openGraph: {
    title: 'Moveable Guitar Chord Shapes Library',
    description: 'Master moveable chord shapes for all chord types with interactive diagrams.',
    images: [
      {
        url: 'https://mikenelsonguitarlessons.co.nz/mike-nelson-guitar-logo.jpg',
        width: 1200,
        height: 630,
        alt: 'Moveable Guitar Chord Shapes Library',
      },
    ],
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Moveable Guitar Chord Shapes Library',
    description: 'Master moveable chord shapes for all chord types.',
    images: ['https://mikenelsonguitarlessons.co.nz/mike-nelson-guitar-logo.jpg'],
  },
  alternates: {
    canonical: 'https://mikenelsonguitarlessons.co.nz/blog/moveable-guitar-chord-shapes',
  },
};

export default function MoveableChordShapesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <h1 className="sr-only">Moveable Guitar Chord Shapes</h1>
      {children}
    </>
  );
} 