import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Master Guitar Scales with the Interactive Scale Explorer Tool',
  description: 'Explore guitar scales with this interactive scale explorer tool. Visualize scales across the fretboard.',
  alternates: {
    canonical: 'https://mikenelsonguitarlessons.co.nz/blog/scale-explorer-tool',
  },
  openGraph: {
    title: 'Master Guitar Scales with the Interactive Scale Explorer Tool',
    description: 'Explore guitar scales with this interactive scale explorer tool. Visualize scales across the fretboard.',
    type: 'article',
    url: 'https://mikenelsonguitarlessons.co.nz/blog/scale-explorer-tool',
  },
};

export default function ScaleExplorerToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 