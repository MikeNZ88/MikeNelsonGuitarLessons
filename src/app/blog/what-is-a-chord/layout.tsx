import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'What is a Chord? Understanding Structure, Intervals, and Types',
  description: 'Learn what guitar chords are, how they are built from intervals, and the differences between major, minor and seventh chords. Understand open vs moveable shapes with clear examples.',
  alternates: {
    canonical: 'https://mikenelsonguitarlessons.co.nz/blog/what-is-a-chord',
  },
  openGraph: {
    title: 'What is a Chord? Understanding Structure, Intervals, and Types',
    description: 'Learn what guitar chords are, how they are built from intervals, and the differences between major, minor and seventh chords. Understand open vs moveable shapes with clear examples.',
    type: 'article',
    url: 'https://mikenelsonguitarlessons.co.nz/blog/what-is-a-chord',
  },
};

export default function WhatIsAChordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 