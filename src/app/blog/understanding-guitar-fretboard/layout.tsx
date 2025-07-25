import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Guitar Fretboard: String Tuning Guide | Mike Nelson',
  description: 'Learn why guitar strings are tuned the way they are. Understand the logic behind standard tuning and how it affects your playing.',
  keywords: 'guitar fretboard, guitar tuning, standard tuning, guitar strings, guitar theory, guitar lessons, fretboard understanding',
  openGraph: {
    title: 'Understanding the Guitar Fretboard: Why Strings Are Tuned This Way',
    description: 'Learn why guitar strings are tuned the way they are with comprehensive explanations.',
    images: [
      {
        url: '/blog-thumbnail.svg',
        width: 1200,
        height: 630,
        alt: 'Understanding the Guitar Fretboard',
      },
    ],
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Understanding the Guitar Fretboard: Why Strings Are Tuned This Way',
    description: 'Learn why guitar strings are tuned the way they are with comprehensive explanations.',
    images: ['/blog-thumbnail.svg'],
  },
};

export default function UnderstandingGuitarFretboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 