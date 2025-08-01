import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Guitar Picking Technique: Complete Progressive Guide',
  description: 'Master guitar picking technique with this comprehensive progressive guide. Learn alternate picking, economy picking, and more.',
  alternates: {
    canonical: 'https://mikenelsonguitarlessons.co.nz/blog/guitar-picking-technique-guide',
  },
  openGraph: {
    title: 'Guitar Picking Technique: Complete Progressive Guide',
    description: 'Master guitar picking technique with this comprehensive progressive guide. Learn alternate picking, economy picking, and more.',
    type: 'article',
    url: 'https://mikenelsonguitarlessons.co.nz/blog/guitar-picking-technique-guide',
  },
};

export default function GuitarPickingTechniqueGuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 