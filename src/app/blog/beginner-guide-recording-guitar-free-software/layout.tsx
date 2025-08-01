import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Beginner Guide to Recording Guitar: Complete Free Software Setup (2025)',
  description: 'Learn how to record guitar using completely free software - Reaper DAW, free VST plugins, and audio interface setup. Complete beginner-friendly guide with no expensive gear required.',
  keywords: 'guitar recording, free software, Reaper DAW, VST plugins, audio interface, beginner guide, home recording, guitar setup',
  alternates: {
    canonical: 'https://mikenelsonguitarlessons.co.nz/blog/beginner-guide-recording-guitar-free-software',
  },
  openGraph: {
    title: 'Beginner Guide to Recording Guitar: Complete Free Software Setup (2025)',
    description: 'Learn how to record guitar using completely free software - Reaper DAW, free VST plugins, and audio interface setup. Complete beginner-friendly guide with no expensive gear required.',
    type: 'article',
    url: 'https://mikenelsonguitarlessons.co.nz/blog/beginner-guide-recording-guitar-free-software',
  },
};

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 