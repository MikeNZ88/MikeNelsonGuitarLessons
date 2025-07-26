import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Beginner\'s Guide to Guitar Notes | Mike Nelson Guitar Lessons',
  description: 'Learn guitar notes on the fretboard with interactive diagrams. Understand sharps, flats, and how notes repeat across the guitar neck.',
  openGraph: {
    title: 'Beginner\'s Guide to Guitar Notes',
    description: 'Learn guitar notes on the fretboard with interactive diagrams. Understand sharps, flats, and how notes repeat.',
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
    title: "Beginner's Guide to Guitar Notes",
    description: 'Learn guitar notes on the fretboard with interactive diagrams.',
    images: ['/blog-thumbnail.svg'],
  },
  alternates: {
    canonical: 'https://mikenelsonguitarlessons.co.nz/blog/beginners-guide-notes-guitar',
  },
};

export default function BeginnersGuideNotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 