import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Complete Guide to Guitar String Bending: Master the Art of Expressive Playing',
  description: 'Master guitar string bending with this comprehensive guide. Learn proper technique, build finger strength, develop pitch accuracy, and add emotion to your playing with interactive exercises and tab players.',
  keywords: 'guitar string bending, bending technique, guitar bends, pitch accuracy, finger strength, blues bending, rock bending, guitar exercises, bending exercises, guitar technique',
  alternates: {
    canonical: 'https://mikenelsonguitarlessons.co.nz/blog/complete-guide-guitar-string-bending',
  },
  openGraph: {
    title: 'The Complete Guide to Guitar String Bending: Master the Art of Expressive Playing',
    description: 'Master guitar string bending with this comprehensive guide. Learn proper technique, build finger strength, develop pitch accuracy, and add emotion to your playing with interactive exercises and tab players.',
    type: 'article',
    url: 'https://mikenelsonguitarlessons.co.nz/blog/complete-guide-guitar-string-bending',
  },
};

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 