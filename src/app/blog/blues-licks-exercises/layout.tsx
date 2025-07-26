import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blues Licks Exercises | Mike Nelson Guitar Lessons',
  description: 'Master blues guitar licks with comprehensive exercise collection. Learn essential blues phrases, techniques, and improvisation skills.',
  openGraph: {
    title: 'Blues Licks Exercises',
    description: 'Master blues guitar licks with comprehensive exercise collection and interactive tabs.',
    images: [
      {
        url: '/blog-thumbnail.svg',
        width: 1200,
        height: 630,
        alt: 'Blues Licks Exercises',
      },
    ],
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blues Licks Exercises',
    description: 'Master blues guitar licks with comprehensive exercise collection and interactive tabs.',
    images: ['/blog-thumbnail.svg'],
  },
  alternates: {
    canonical: 'https://mikenelsonguitarlessons.co.nz/blog/blues-licks-exercises',
  },
};

export default function BluesLicksExercisesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 