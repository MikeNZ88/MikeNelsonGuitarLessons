import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Open Chord Library: Essential Guitar Chords | Mike Nelson Guitar Lessons',
  description: 'Master essential open chords with my comprehensive library. Interactive diagrams for major, minor, seventh, and suspended chords perfect for beginners.',
  keywords: 'open chords, guitar chords, beginner guitar chords, chord diagrams, guitar chord library, guitar lessons',
  openGraph: {
    title: 'Open Chord Library: Essential Guitar Chords',
    description: 'Master essential open chords with interactive diagrams perfect for beginners.',
    images: [
      {
        url: '/blog-thumbnail.svg',
        width: 1200,
        height: 630,
        alt: 'Open Chord Library',
      },
    ],
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Open Chord Library: Essential Guitar Chords',
    description: 'Master essential open chords with interactive diagrams for beginners.',
    images: ['/blog-thumbnail.svg'],
  },
};

export default function OpenChordLibraryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 