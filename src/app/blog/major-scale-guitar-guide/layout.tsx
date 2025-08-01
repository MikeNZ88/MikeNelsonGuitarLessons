import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Major Scale Guitar Guide',
  description: 'Learn the major scale on guitar. Understand scale patterns, positions, and how to use them in your playing.',
  alternates: {
    canonical: 'https://mikenelsonguitarlessons.co.nz/blog/major-scale-guitar-guide',
  },
  openGraph: {
    title: 'Major Scale Guitar Guide',
    description: 'Learn the major scale on guitar. Understand scale patterns, positions, and how to use them in your playing.',
    type: 'article',
    url: 'https://mikenelsonguitarlessons.co.nz/blog/major-scale-guitar-guide',
  },
};

export default function MajorScaleGuitarGuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 