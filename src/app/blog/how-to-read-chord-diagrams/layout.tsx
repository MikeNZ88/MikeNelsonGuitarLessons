import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How to Read Chord Diagrams',
  description: 'Learn how to read guitar chord diagrams and chord charts. Essential knowledge for every guitarist.',
  alternates: {
    canonical: 'https://mikenelsonguitarlessons.co.nz/blog/how-to-read-chord-diagrams',
  },
  openGraph: {
    title: 'How to Read Chord Diagrams',
    description: 'Learn how to read guitar chord diagrams and chord charts. Essential knowledge for every guitarist.',
    type: 'article',
    url: 'https://mikenelsonguitarlessons.co.nz/blog/how-to-read-chord-diagrams',
  },
};

export default function HowToReadChordDiagramsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 