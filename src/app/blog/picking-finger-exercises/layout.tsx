import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Picking and Finger Exercises | Mike Nelson Guitar Lessons',
  description: 'Master guitar picking and finger exercises with my comprehensive guide. Improve your technique with progressive exercises for speed, accuracy, and control.',
  keywords: 'guitar picking exercises, finger exercises, guitar technique, picking technique, guitar practice, guitar lessons, guitar exercises',
  openGraph: {
    title: 'Picking and Finger Exercises',
    description: 'Master guitar picking and finger exercises with progressive technique building.',
    images: [
      {
        url: '/blog-thumbnail.svg',
        width: 1200,
        height: 630,
        alt: 'Picking and Finger Exercises',
      },
    ],
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Picking and Finger Exercises',
    description: 'Master guitar picking and finger exercises with progressive technique building.',
    images: ['/blog-thumbnail.svg'],
  },
};

export default function PickingFingerExercisesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 