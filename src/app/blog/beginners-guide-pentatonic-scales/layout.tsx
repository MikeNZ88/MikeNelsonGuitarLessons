import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Beginner\'s Guide to Pentatonic Scales | Mike Nelson Guitar Lessons',
  description: 'Learn pentatonic scales with my step-by-step guide. Master the 5 essential pentatonic patterns with interactive diagrams and practice tips for guitar.',
  keywords: 'pentatonic scales, guitar scales, minor pentatonic, major pentatonic, scale patterns, guitar lessons, beginner guitar scales',
  openGraph: {
    title: 'Beginner\'s Guide to Pentatonic Scales',
    description: 'Learn pentatonic scales with step-by-step instructions and interactive diagrams.',
    images: [
      {
        url: '/blog-thumbnail.svg',
        width: 1200,
        height: 630,
        alt: 'Beginner\'s Guide to Pentatonic Scales',
      },
    ],
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Beginner\'s Guide to Pentatonic Scales',
    description: 'Learn pentatonic scales with step-by-step instructions and interactive diagrams.',
    images: ['/blog-thumbnail.svg'],
  },
};

export default function BeginnersGuidePentatonicScalesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 