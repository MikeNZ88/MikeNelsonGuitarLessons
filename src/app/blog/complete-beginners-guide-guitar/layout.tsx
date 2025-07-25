import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Complete Beginner\'s Guide to Learning Guitar | Mike Nelson Guitar Lessons',
  description: 'Everything you need to know to start learning guitar in New Zealand. What to buy, what you\'ll learn, practice tips, and beginner songs with interactive rhythm tools.',
  keywords: 'beginner guitar guide, learn guitar New Zealand, first guitar, guitar lessons for beginners, guitar practice tips, beginner guitar songs',
  openGraph: {
    title: 'Complete Beginner\'s Guide to Learning Guitar',
    description: 'Everything you need to know to start learning guitar in New Zealand. What to buy, what you\'ll learn, and beginner songs with interactive tools.',
    images: [
      {
        url: '/blog-thumbnail.svg',
        width: 1200,
        height: 630,
        alt: 'Complete Beginner\'s Guide to Learning Guitar',
      },
    ],
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Complete Beginner\'s Guide to Learning Guitar',
    description: 'Everything you need to know to start learning guitar in New Zealand with interactive practice tools.',
    images: ['/blog-thumbnail.svg'],
  },
};

export default function CompleteBeginnerGuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 