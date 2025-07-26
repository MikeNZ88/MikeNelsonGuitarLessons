import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Guitar Blog | Mike Nelson Guitar Lessons',
  description: 'Explore guitar lessons, theory, and practice tips. Learn chords, scales, technique, and more.',
  alternates: {
    canonical: 'https://mikenelsonguitarlessons.co.nz/blog/',
  },
  openGraph: {
    title: 'Guitar Blog | Mike Nelson Guitar Lessons',
    description: 'Explore guitar lessons, theory, and practice tips on the Mike Nelson Guitar Lessons blog.',
    type: 'website',
    images: [
      {
        url: '/blog-thumbnail.svg',
        width: 1200,
        height: 630,
        alt: 'Guitar Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Guitar Blog | Mike Nelson Guitar Lessons',
    description: 'Explore guitar lessons, theory, and practice tips on the Mike Nelson Guitar Lessons blog.',
    images: ['/blog-thumbnail.svg'],
  },
  // Individual blog posts will define their own canonical URLs
  // This prevents the global canonical from overriding individual post canonicals
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 