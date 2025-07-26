import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Interactive Rhythm Tool | Mike Nelson Guitar',
  description: 'Free interactive rhythm tool for learning time signatures, note values, and timing. Practice with audio playback and visual notation.',
  openGraph: {
    title: 'Interactive Rhythm Tool | Mike Nelson Guitar',
    description: 'Free interactive rhythm tool for learning time signatures, note values, and timing. Practice with audio playback and visual notation.',
    type: 'website',
    images: [
      {
        url: '/Mike Photo.jpg',
        width: 1200,
        height: 630,
        alt: 'Interactive Rhythm Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Interactive Rhythm Tool | Mike Nelson Guitar',
    description: 'Free interactive rhythm tool for learning time signatures, note values, and timing. Practice with audio playback and visual notation.',
    images: ['/Mike Photo.jpg'],
  },
  alternates: {
    canonical: 'https://mikenelsonguitarlessons.co.nz/rhythm-tool',
  },
};

export default function RhythmToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 