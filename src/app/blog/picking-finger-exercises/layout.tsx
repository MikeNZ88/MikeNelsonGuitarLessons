import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Picking and Finger Exercises',
  description: 'Develop both hands with focused picking and fretting drills. Build alternate picking accuracy, string crossing, and left-hand independence using varied finger sequences and string patterns.',
  openGraph: {
    title: 'Picking and Finger Exercises',
    description: 'Build alternate picking precision and left-hand independence with non-sequential finger patterns and string navigation drills.',
    images: [
      {
        url: '/Finger Exercise Blog Post.png',
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
    description: 'Improve picking hand precision and left-hand independence with focused chromatic drills.',
    images: ['/Finger Exercise Blog Post.png'],
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