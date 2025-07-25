import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Circle of Fifths: A Complete Guide | Mike Nelson Guitar Lessons',
  description: 'Master the circle of fifths with my complete guide. Learn key signatures, chord progressions, and how to use this essential music theory tool for guitar.',
  keywords: 'circle of fifths, music theory, key signatures, chord progressions, guitar theory, guitar lessons, music theory for guitar',
  openGraph: {
    title: 'The Circle of Fifths: A Complete Guide',
    description: 'Master the circle of fifths with complete instructions and practical applications.',
    images: [
      {
        url: '/blog-thumbnail.svg',
        width: 1200,
        height: 630,
        alt: 'The Circle of Fifths Guide',
      },
    ],
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Circle of Fifths: A Complete Guide',
    description: 'Master the circle of fifths with complete instructions and practical applications.',
    images: ['/blog-thumbnail.svg'],
  },
  alternates: {
    canonical: 'https://mikenelsonguitarlessons.co.nz/blog/circle-of-fifths',
  },
};

export default function CircleOfFifthsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 