import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Picking and Finger Exercises | Guitar Technique Development',
  description: 'Master finger independence, string navigation, and alternate picking with 8 focused chromatic exercises. Develop advanced guitar technique through non-sequential finger patterns and precise string work.',
  alternates: {
    canonical: '/blog/picking-finger-exercises/',
  },
  keywords: 'guitar finger exercises, chromatic exercises, alternate picking, finger independence, string skipping, guitar technique, fret hand coordination, picking exercises',
  openGraph: {
    title: 'Picking and Finger Exercises | Guitar Technique Development',
    description: 'Master finger independence, string navigation, and alternate picking with 8 focused chromatic exercises. Develop advanced guitar technique through non-sequential finger patterns and precise string work.',
    url: "https://mikenelsonguitarlessons.co.nz/blog/picking-finger-exercises/",
    images: [
      {
        url: '/picking-finger-exercises-thumbnail.png',
        width: 1200,
        height: 630,
        alt: 'Picking and Finger Exercises Thumbnail',
      },
    ],
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Picking and Finger Exercises | Guitar Technique Development',
    description: 'Master finger independence, string navigation, and alternate picking with 8 focused chromatic exercises. Develop advanced guitar technique through non-sequential finger patterns and precise string work.',
    images: ['/picking-finger-exercises-thumbnail.png'],
  },
};

export default function PickingFingerExercisesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 