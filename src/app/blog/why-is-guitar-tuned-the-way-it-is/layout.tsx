import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Understanding the Guitar Fretboard: Why Strings Are Tuned This Way (Part 1)',
  description: 'Learn why the guitar is tuned the way it is and how this affects fretboard navigation.',
  alternates: {
    canonical: 'https://mikenelsonguitarlessons.co.nz/blog/why-is-guitar-tuned-the-way-it-is',
  },
  openGraph: {
    title: 'Understanding the Guitar Fretboard: Why Strings Are Tuned This Way (Part 1)',
    description: 'Learn why the guitar is tuned the way it is and how this affects fretboard navigation.',
    type: 'article',
    url: 'https://mikenelsonguitarlessons.co.nz/blog/why-is-guitar-tuned-the-way-it-is',
  },
};

export default function WhyIsGuitarTunedTheWayItIsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 