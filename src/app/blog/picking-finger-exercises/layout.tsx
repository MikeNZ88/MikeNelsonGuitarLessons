import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Finger Picking Exercises | Mike Nelson',
  description: 'Master finger picking technique with progressive exercises. Learn thumb independence, finger coordination, and arpeggio patterns.',
  openGraph: {
    title: 'Finger Picking Exercises | Mike Nelson',
    description: 'Master finger picking technique with progressive exercises. Learn thumb independence, finger coordination, and arpeggio patterns.',
    type: 'article',
    images: [
      {
        url: '/mike_nelson_guitar_logo.jpg',
        width: 1200,
        height: 630,
        alt: 'Finger Picking Exercises',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Finger Picking Exercises | Mike Nelson',
    description: 'Master finger picking technique with progressive exercises. Learn thumb independence, finger coordination, and arpeggio patterns.',
          images: [{
        url: '/mike_nelson_guitar_logo.jpg',
        width: 1200,
        height: 662,
        alt: 'Guitar Picking Finger Exercises'
      }],
  },
  alternates: {
    canonical: 'https://mikenelsonguitarlessons.co.nz/blog/picking-finger-exercises',
  },
};

export default function PickingFingerExercisesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 