import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Complete Beginner\'s Guide to Learning Guitar',
  description: 'Everything you need to know to start learning guitar in New Zealand. What to buy, what you\'ll learn, practice tips, and beginner songs.',
  openGraph: {
    title: 'Complete Beginner\'s Guide to Learning Guitar',
    description: 'Everything you need to know to start learning guitar in New Zealand. What to buy, what you\'ll learn, and beginner songs.',
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
    description: 'Everything you need to know to start learning guitar in New Zealand.',
    images: ['/blog-thumbnail.svg'],
  },
  alternates: {
    canonical: 'https://mikenelsonguitarlessons.co.nz/blog/complete-beginners-guide-guitar',
  },
};

export default function CompleteBeginnerGuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 