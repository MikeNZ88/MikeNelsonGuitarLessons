import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Learn Rhythm with the Interactive Rhythm Tool',
  description: 'Master rhythm and timing with our interactive rhythm tool. Practice essential rhythmic patterns.',
  alternates: {
    canonical: 'https://mikenelsonguitarlessons.co.nz/blog/rhythm-tool',
  },
  openGraph: {
    title: 'Learn Rhythm with the Interactive Rhythm Tool',
    description: 'Master rhythm and timing with our interactive rhythm tool. Practice essential rhythmic patterns.',
    type: 'article',
    url: 'https://mikenelsonguitarlessons.co.nz/blog/rhythm-tool',
  },
};

export default function RhythmToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 