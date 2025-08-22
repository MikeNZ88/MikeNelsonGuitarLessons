import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blues Licks Exercises',
  description: 'Master b3 - 3 - 1 and b3 - 3 - b7 licks, and apply major/minor pentatonic and other scales to a 12-bar blues progression with interactive tabs.',
  openGraph: {
    title: 'Blues Licks Exercises',
    description: 'Master b3 - 3 - 1 and b3 - 3 - b7 licks, and apply pentatonic and other scales to a 12-bar blues progression with interactive tabs.',
    images: [
      {
        url: 'https://mikenelsonguitarlessons.co.nz/mike-nelson-guitar-logo.jpg',
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
    description: 'Master b3 - 3 - 1 and b3 - 3 - b7 licks, and apply pentatonic and other scales to a 12-bar blues progression with interactive tabs.',
    images: ['https://mikenelsonguitarlessons.co.nz/mike-nelson-guitar-logo.jpg'],
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