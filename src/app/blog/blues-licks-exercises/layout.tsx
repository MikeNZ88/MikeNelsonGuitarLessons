import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Major 12 Bar Blues Scales and Licks | Blues Guitar Exercises",
  description: "Master essential blues licks with interactive tab player. Practice classic blues phrases, bends, slides, and vibrato techniques over a 12-bar blues progression.",
  alternates: {
    canonical: '/blog/blues-licks-exercises/',
  },
  openGraph: {
    title: "Major 12 Bar Blues Scales and Licks | Blues Guitar Exercises",
    description: "Master essential blues licks with interactive tab player. Practice classic blues phrases, bends, slides, and vibrato techniques over a 12-bar blues progression.",
    url: "https://mikenelsonguitarlessons.co.nz/blog/blues-licks-exercises/",
  },
};

export default function BluesLicksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 