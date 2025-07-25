import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Key Chords Explorer: Interactive Chord Library | Mike Nelson Guitar Lessons',
  description: 'Explore chords within different keys with my interactive chord library. Find major, minor, and seventh chords for any key with visual diagrams and audio playback.',
  keywords: 'key chords, chord progressions, guitar chords by key, major key chords, minor key chords, guitar chord explorer, guitar lessons',
  openGraph: {
    title: 'Key Chords Explorer: Interactive Chord Library',
    description: 'Explore chords within different keys with interactive diagrams and audio playback.',
    images: [
      {
        url: '/blog-thumbnail.svg',
        width: 1200,
        height: 630,
        alt: 'Key Chords Explorer',
      },
    ],
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Key Chords Explorer: Interactive Chord Library',
    description: 'Explore chords within different keys with interactive diagrams and audio.',
    images: ['/blog-thumbnail.svg'],
  },
};

export default function KeyChordsExplorerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 