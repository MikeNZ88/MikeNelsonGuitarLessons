import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Triads on 3-String Sets | Mike Nelson Guitar Lessons',
  description: 'Master triads on 3-string sets with my comprehensive guide. Learn major, minor, diminished, and augmented triads with interactive diagrams and practice exercises.',
  keywords: 'triads, 3-string triads, guitar triads, chord construction, guitar theory, guitar lessons, triad shapes',
  openGraph: {
    title: 'Triads on 3-String Sets',
    description: 'Master triads on 3-string sets with comprehensive guide and interactive diagrams.',
    images: [
      {
        url: '/blog-thumbnail.svg',
        width: 1200,
        height: 630,
        alt: 'Triads on 3-String Sets',
      },
    ],
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Triads on 3-String Sets',
    description: 'Master triads on 3-string sets with comprehensive guide and interactive diagrams.',
    images: ['/blog-thumbnail.svg'],
  },
};

export default function TriadsOn3StringSetsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 