import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Triads on 3-String Sets',
  description: 'Master triads on 3-string sets with comprehensive guide. Learn major, minor, diminished, and augmented triads with interactive diagrams.',
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
  alternates: {
    canonical: 'https://mikenelsonguitarlessons.co.nz/blog/triads-on-3-string-sets',
  },
};

export default function TriadsOn3StringSetsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <h1 className="sr-only">Triads on 3-String Sets</h1>
      {children}
    </>
  );
} 