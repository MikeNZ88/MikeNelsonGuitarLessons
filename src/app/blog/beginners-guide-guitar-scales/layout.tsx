import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Beginner\'s Guide to Guitar Scales',
  description: 'Learn the fundamentals of guitar scales. Understand major scales, minor scales, and how to use them in your playing.',
  alternates: {
    canonical: 'https://mikenelsonguitarlessons.co.nz/blog/beginners-guide-guitar-scales',
  },
  openGraph: {
    title: 'Beginner\'s Guide to Guitar Scales',
    description: 'Learn the fundamentals of guitar scales. Understand major scales, minor scales, and how to use them in your playing.',
    type: 'article',
    url: 'https://mikenelsonguitarlessons.co.nz/blog/beginners-guide-guitar-scales',
  },
};

export default function BeginnersGuideGuitarScalesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 