import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Guitar Learning Resources | Mike Nelson Guitar',
  description: 'Free guitar learning resources including interactive tools, practice guides, and educational content. Scale Explorer, Rhythm Tool, and comprehensive chord libraries.',
  keywords: 'guitar resources, free guitar tools, scale explorer, rhythm tool, chord library, guitar learning resources, interactive guitar tools',
  openGraph: {
    title: 'Guitar Learning Resources | Mike Nelson Guitar',
    description: 'Free guitar learning resources including interactive tools, practice guides, and educational content.',
    type: 'website',
    images: [
      {
        url: '/Mike Photo.jpg',
        width: 1200,
        height: 630,
        alt: 'Guitar Learning Resources',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Guitar Learning Resources | Mike Nelson Guitar',
    description: 'Free guitar learning resources including interactive tools, practice guides, and educational content.',
    images: ['/Mike Photo.jpg'],
  },
};

export default function ResourcesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 