import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Musical Terms for Guitarists: Complete A-Z Guide | Mike Nelson Guitar Lessons',
  description: 'Master essential musical terms with my complete A-Z guide for guitarists. Learn theory concepts, techniques, and terminology to improve your guitar playing.',
  keywords: 'musical terms, guitar terminology, music theory terms, guitar glossary, music vocabulary, guitar lessons, music theory for guitar',
  openGraph: {
    title: 'Musical Terms for Guitarists: Complete A-Z Guide',
    description: 'Master essential musical terms with complete A-Z guide for guitarists.',
    images: [
      {
        url: '/blog-thumbnail.svg',
        width: 1200,
        height: 630,
        alt: 'Musical Terms for Guitarists Guide',
      },
    ],
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Musical Terms for Guitarists: Complete A-Z Guide',
    description: 'Master essential musical terms with complete A-Z guide for guitarists.',
    images: ['/blog-thumbnail.svg'],
  },
  alternates: {
    canonical: 'https://mikenelsonguitarlessons.co.nz/blog/musical-terms-guitarists-guide',
  },
};

export default function MusicalTermsGuitaristsGuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 