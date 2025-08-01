import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Introducing PracticeTrack: Your Musical Journey Companion',
  description: 'Discover PracticeTrack, your musical journey companion. Track your progress and stay motivated in your guitar learning.',
  alternates: {
    canonical: 'https://mikenelsonguitarlessons.co.nz/blog/introducing-practicetrack',
  },
  openGraph: {
    title: 'Introducing PracticeTrack: Your Musical Journey Companion',
    description: 'Discover PracticeTrack, your musical journey companion. Track your progress and stay motivated in your guitar learning.',
    type: 'article',
    url: 'https://mikenelsonguitarlessons.co.nz/blog/introducing-practicetrack',
  },
};

export default function IntroducingPracticetrackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 