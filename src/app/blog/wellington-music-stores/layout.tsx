import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wellington\'s Vanishing Instrument Stores',
  description: 'Explore Wellington\'s music stores and instrument shops. Find guitars, amps, and gear in New Zealand\'s capital.',
  alternates: {
    canonical: 'https://mikenelsonguitarlessons.co.nz/blog/wellington-music-stores',
  },
  openGraph: {
    title: 'Wellington\'s Vanishing Instrument Stores',
    description: 'Explore Wellington\'s music stores and instrument shops. Find guitars, amps, and gear in New Zealand\'s capital.',
    type: 'article',
    url: 'https://mikenelsonguitarlessons.co.nz/blog/wellington-music-stores',
  },
};

export default function WellingtonMusicStoresLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 