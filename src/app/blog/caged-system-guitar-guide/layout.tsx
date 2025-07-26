import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The CAGED System: A Guitar Fretboard Guide | Mike Nelson Guitar Lessons',
  description: 'Master the CAGED system with my comprehensive guide. Learn how to navigate the guitar fretboard using the 5 essential chord shapes and scale patterns.',
  openGraph: {
    title: 'The CAGED System: A Guitar Fretboard Guide',
    description: 'Master the CAGED system with comprehensive instructions and interactive diagrams.',
    images: [
      {
        url: '/blog-thumbnail.svg',
        width: 1200,
        height: 630,
        alt: 'The CAGED System Guitar Guide',
      },
    ],
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The CAGED System: A Guitar Fretboard Guide',
    description: 'Master the CAGED system with comprehensive instructions and interactive diagrams.',
    images: ['/blog-thumbnail.svg'],
  },
  alternates: {
    canonical: 'https://mikenelsonguitarlessons.co.nz/blog/caged-system-guitar-guide',
  },
};

export default function CagedSystemGuitarGuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 