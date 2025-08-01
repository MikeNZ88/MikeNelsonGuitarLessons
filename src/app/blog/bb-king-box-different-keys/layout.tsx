import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BB King Box in Different Keys: Complete Blues Guitar Guide',
  description: 'Master the iconic BB King box pattern in keys A, C, D, E, and G with interactive fretboard diagrams and tabs. Learn the classic blues licks and positions.',
  keywords: 'BB King box, blues guitar, blues licks, guitar scales, blues scales, BB King style, blues guitar lessons, guitar fretboard, blues patterns',
  alternates: {
    canonical: 'https://mikenelsonguitarlessons.co.nz/blog/bb-king-box-different-keys',
  },
  openGraph: {
    title: 'BB King Box in Different Keys: Complete Blues Guitar Guide',
    description: 'Master the iconic BB King box pattern in keys A, C, D, E, and G with interactive fretboard diagrams and tabs. Learn the classic blues licks and positions.',
    type: 'article',
    url: 'https://mikenelsonguitarlessons.co.nz/blog/bb-king-box-different-keys',
    images: [
      {
        url: '/BB King.jpg',
        width: 500,
        height: 500,
        alt: 'BB King playing guitar',
      },
    ],
  },
};

export default function BBKingBoxLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 