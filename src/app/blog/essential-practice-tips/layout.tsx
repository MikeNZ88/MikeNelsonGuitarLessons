import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '6 Essential Practice Tips for Guitar Students',
  description: 'Master these 6 essential practice tips to accelerate your guitar learning and make the most of your practice time.',
  alternates: {
    canonical: 'https://mikenelsonguitarlessons.co.nz/blog/essential-practice-tips',
  },
  openGraph: {
    title: '6 Essential Practice Tips for Guitar Students',
    description: 'Master these 6 essential practice tips to accelerate your guitar learning and make the most of your practice time.',
    type: 'article',
    url: 'https://mikenelsonguitarlessons.co.nz/blog/essential-practice-tips',
  },
};

export default function EssentialPracticeTipsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 