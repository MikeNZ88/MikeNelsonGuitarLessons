import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Key Chords Explorer: Interactive Chord Library',
  description: 'Explore chords within different keys with interactive chord library. Find major, minor, and seventh chords for any key.',
  openGraph: {
    title: 'Key Chords Explorer: Interactive Chord Library',
    description: 'Explore chords within different keys with interactive diagrams.',
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
    description: 'Explore chords within different keys with interactive diagrams.',
    images: ['/blog-thumbnail.svg'],
  },
  alternates: {
    canonical: 'https://mikenelsonguitarlessons.co.nz/blog/key-chords-explorer',
  },
};

export default function KeyChordsExplorerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 