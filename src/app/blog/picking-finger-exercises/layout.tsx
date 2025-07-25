import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Finger Picking Exercises | Mike Nelson Guitar',
  description: 'Master finger picking technique with progressive exercises. Learn thumb independence, finger coordination, and arpeggio patterns with interactive tabs and audio.',
  keywords: 'finger picking exercises, fingerstyle guitar, thumb independence, arpeggio patterns, guitar technique, finger coordination',
  openGraph: {
    title: 'Finger Picking Exercises | Mike Nelson Guitar',
    description: 'Master finger picking technique with progressive exercises. Learn thumb independence, finger coordination, and arpeggio patterns.',
    type: 'article',
    images: [
      {
        url: '/guitar-picking-exercises-thumbnail.svg',
        width: 1200,
        height: 630,
        alt: 'Finger Picking Exercises',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Finger Picking Exercises | Mike Nelson Guitar',
    description: 'Master finger picking technique with progressive exercises. Learn thumb independence, finger coordination, and arpeggio patterns.',
    images: ['/guitar-picking-exercises-thumbnail.svg'],
  },
};

export default function PickingFingerExercisesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 