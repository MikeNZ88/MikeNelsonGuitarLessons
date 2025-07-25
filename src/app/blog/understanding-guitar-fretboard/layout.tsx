import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Understanding the Guitar Fretboard: Why Strings Are Tuned This Way | Mike Nelson Guitar Lessons',
  description: 'Learn why guitar strings are tuned the way they are with my comprehensive guide. Understand the logic behind standard tuning and how it affects your playing.',
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