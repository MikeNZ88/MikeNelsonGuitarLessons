import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Your First Guitar Chords: A Complete Beginner Guide',
  description: 'Learn your first guitar chords with this complete beginner guide. Master essential open chords.',
  alternates: {
    canonical: 'https://mikenelsonguitarlessons.co.nz/blog/your-first-guitar-chords',
  },
  openGraph: {
    title: 'Your First Guitar Chords: A Complete Beginner Guide',
    description: 'Learn your first guitar chords with this complete beginner guide. Master essential open chords.',
    type: 'article',
    url: 'https://mikenelsonguitarlessons.co.nz/blog/your-first-guitar-chords',
  },
};

export default function YourFirstGuitarChordsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 