import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Beginner Guide to Recording Guitar: Complete Free Software Setup (2025)',
  description: 'Complete free software setup for recording guitar at home. Learn Reaper DAW, free VST plugins, and organic production techniques.',
  alternates: {
    canonical: 'https://mikenelsonguitarlessons.co.nz/blog/free-vst-plugins-reaper-organic-production',
  },
  openGraph: {
    title: 'Beginner Guide to Recording Guitar: Complete Free Software Setup (2025)',
    description: 'Complete free software setup for recording guitar at home. Learn Reaper DAW, free VST plugins, and organic production techniques.',
    type: 'article',
    url: 'https://mikenelsonguitarlessons.co.nz/blog/free-vst-plugins-reaper-organic-production',
  },
};

export default function FreeVstPluginsReaperOrganicProductionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 