import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'What is a Chord? Understanding Structure, Intervals, and Types',
  description: 'Learn what a chord is, how they\'re built, and the different types of chords used in music.',
  alternates: {
    canonical: 'https://mikenelsonguitarlessons.co.nz/blog/what-is-a-chord',
  },
  openGraph: {
    title: 'What is a Chord? Understanding Structure, Intervals, and Types',
    description: 'Learn what a chord is, how they\'re built, and the different types of chords used in music.',
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