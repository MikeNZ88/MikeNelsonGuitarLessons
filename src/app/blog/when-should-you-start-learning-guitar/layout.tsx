import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'When Should You Start Learning Guitar? What the Research Actually Says',
  description: 'Discover the best age to start learning guitar based on research and expert advice.',
  alternates: {
    canonical: 'https://mikenelsonguitarlessons.co.nz/blog/when-should-you-start-learning-guitar',
  },
  openGraph: {
    title: 'When Should You Start Learning Guitar? What the Research Actually Says',
    description: 'Discover the best age to start learning guitar based on research and expert advice.',
    type: 'article',
    url: 'https://mikenelsonguitarlessons.co.nz/blog/when-should-you-start-learning-guitar',
  },
};

export default function WhenShouldYouStartLearningGuitarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 