import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Kiesel A2 7-String',
  description: 'Review of the Kiesel A2 7-string guitar. Features, sound, and playing experience of this premium instrument.',
  alternates: {
    canonical: 'https://mikenelsonguitarlessons.co.nz/blog/kiesel-a2-7-string-review',
  },
  openGraph: {
    title: 'My Kiesel A2 7-String',
    description: 'Review of the Kiesel A2 7-string guitar. Features, sound, and playing experience of this premium instrument.',
    type: 'article',
    url: 'https://mikenelsonguitarlessons.co.nz/blog/kiesel-a2-7-string-review',
  },
};

export default function KieselA27StringReviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 