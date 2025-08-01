import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Smoother Chord Changes: Identifying Common Fingers Between Chords',
  description: 'Learn how to identify common fingers between chords to make smoother chord transitions and faster chord changes.',
  alternates: {
    canonical: 'https://mikenelsonguitarlessons.co.nz/blog/chord-transitions-common-fingers',
  },
  openGraph: {
    title: 'Smoother Chord Changes: Identifying Common Fingers Between Chords',
    description: 'Learn how to identify common fingers between chords to make smoother chord transitions and faster chord changes.',
    type: 'article',
    url: 'https://mikenelsonguitarlessons.co.nz/blog/chord-transitions-common-fingers',
  },
};

export default function ChordTransitionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 