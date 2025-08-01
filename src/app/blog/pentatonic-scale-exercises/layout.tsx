import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pentatonic Scale Exercises',
  description: 'Master pentatonic scales with these essential exercises. Learn major and minor pentatonic patterns.',
  alternates: {
    canonical: 'https://mikenelsonguitarlessons.co.nz/blog/pentatonic-scale-exercises',
  },
  openGraph: {
    title: 'Pentatonic Scale Exercises',
    description: 'Master pentatonic scales with these essential exercises. Learn major and minor pentatonic patterns.',
    type: 'article',
    url: 'https://mikenelsonguitarlessons.co.nz/blog/pentatonic-scale-exercises',
  },
};

export default function PentatonicScaleExercisesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 