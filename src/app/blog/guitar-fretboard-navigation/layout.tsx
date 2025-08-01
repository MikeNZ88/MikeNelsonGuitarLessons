import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Guitar Fretboard Navigation: Cross-String Interval Relationships (Part 2)',
  description: 'Learn advanced fretboard navigation techniques and cross-string interval relationships for better guitar playing.',
  alternates: {
    canonical: 'https://mikenelsonguitarlessons.co.nz/blog/guitar-fretboard-navigation',
  },
  openGraph: {
    title: 'Guitar Fretboard Navigation: Cross-String Interval Relationships (Part 2)',
    description: 'Learn advanced fretboard navigation techniques and cross-string interval relationships for better guitar playing.',
    type: 'article',
    url: 'https://mikenelsonguitarlessons.co.nz/blog/guitar-fretboard-navigation',
  },
};

export default function GuitarFretboardNavigationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 