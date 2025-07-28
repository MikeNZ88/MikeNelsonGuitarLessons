import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Interactive Guitar Tools | Mike Nelson',
  description: 'Free interactive guitar tools including Scale Explorer, Rhythm Tool, and chord libraries. Learn guitar theory with visual fretboard diagrams.',
  openGraph: {
    title: 'Interactive Guitar Tools | Mike Nelson',
    description: 'Free interactive guitar tools including Scale Explorer, Rhythm Tool, and chord libraries. Learn guitar theory with visual fretboard diagrams.',
    type: 'website',
    images: [
      {
        url: '/Mike Photo.jpg',
        width: 1200,
        height: 630,
        alt: 'Interactive Guitar Tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Interactive Guitar Tools | Mike Nelson',
    description: 'Free interactive guitar tools including Scale Explorer, Rhythm Tool, and chord libraries. Learn guitar theory with visual fretboard diagrams.',
    images: ['https://mikenelsonguitarlessons.co.nz/mike-nelson-guitar-logo.jpg'],
  },
  alternates: {
    canonical: 'https://mikenelsonguitarlessons.co.nz/tools/',
  },
};

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 