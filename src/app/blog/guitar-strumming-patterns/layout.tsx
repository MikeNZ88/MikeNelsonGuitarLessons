import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Master Guitar Strumming Patterns',
  description: 'Learn essential guitar strumming patterns for beginners. Master rhythm and timing with these fundamental patterns.',
  alternates: {
    canonical: 'https://mikenelsonguitarlessons.co.nz/blog/guitar-strumming-patterns',
  },
  openGraph: {
    title: 'Master Guitar Strumming Patterns',
    description: 'Learn essential guitar strumming patterns for beginners. Master rhythm and timing with these fundamental patterns.',
    type: 'article',
    url: 'https://mikenelsonguitarlessons.co.nz/blog/guitar-strumming-patterns',
  },
};

export default function GuitarStrummingPatternsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 