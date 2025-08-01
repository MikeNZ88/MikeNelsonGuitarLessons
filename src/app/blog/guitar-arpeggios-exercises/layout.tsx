import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Guitar Arpeggio Exercises',
  description: 'Master guitar arpeggios with these essential exercises. Learn major, minor, and seventh chord arpeggios with interactive tabs.',
  alternates: {
    canonical: 'https://mikenelsonguitarlessons.co.nz/blog/guitar-arpeggios-exercises',
  },
  openGraph: {
    title: 'Guitar Arpeggio Exercises',
    description: 'Master guitar arpeggios with these essential exercises. Learn major, minor, and seventh chord arpeggios with interactive tabs.',
    type: 'article',
    url: 'https://mikenelsonguitarlessons.co.nz/blog/guitar-arpeggios-exercises',
  },
};

export default function GuitarArpeggiosExercisesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 