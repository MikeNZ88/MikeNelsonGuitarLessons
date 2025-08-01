import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Beginner Electric Guitar Guide - New Zealand 2025',
  description: 'Complete guide to buying your first electric guitar in New Zealand. What to look for, where to buy, and essential accessories.',
  alternates: {
    canonical: 'https://mikenelsonguitarlessons.co.nz/blog/electric-guitar-beginner-guide-nz',
  },
  openGraph: {
    title: 'Beginner Electric Guitar Guide - New Zealand 2025',
    description: 'Complete guide to buying your first electric guitar in New Zealand. What to look for, where to buy, and essential accessories.',
    type: 'article',
    url: 'https://mikenelsonguitarlessons.co.nz/blog/electric-guitar-beginner-guide-nz',
  },
};

export default function ElectricGuitarBeginnerGuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 