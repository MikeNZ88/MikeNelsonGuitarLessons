import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Beginner\'s Guide to Guitar Notes | Mike Nelson Guitar Lessons',
  description: 'Learn guitar notes on the fretboard with interactive diagrams. Understand sharps, flats, octaves, and how notes repeat across the guitar neck.',
  keywords: 'guitar notes, fretboard notes, guitar note names, sharps and flats, guitar octaves, guitar theory for beginners',
  openGraph: {
    title: 'Beginner\'s Guide to Guitar Notes',
    description: 'Learn guitar notes on the fretboard with interactive diagrams. Understand sharps, flats, and octaves.',
    images: [
      {
        url: '/blog-thumbnail.svg',
        width: 1200,
        height: 630,
        alt: 'Beginner\'s Guide to Guitar Notes',
      },
    ],
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Beginner\'s Guide to Guitar Notes',
    description: 'Learn guitar notes on the fretboard with interactive diagrams and clear explanations.',
    images: ['/blog-thumbnail.svg'],
  },
};

export default function BeginnersGuideNotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 