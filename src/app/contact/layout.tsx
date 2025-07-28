import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Mike Nelson | Guitar Lessons Wellington',
  description: 'Book guitar lessons in Wellington North. Available in Pukerua Bay, Plimmerton, Cambourne, Mana, Paremata, Papakowhai, Whitby. Get in touch today.',
  openGraph: {
    title: 'Contact Mike Nelson | Guitar Lessons Wellington',
    description: 'Book guitar lessons in Wellington North. Available in Pukerua Bay, Plimmerton, Cambourne, Mana, Paremata, Papakowhai, Whitby.',
    type: 'website',
    images: [
      {
        url: '/Mike Photo.jpg',
        width: 1200,
        height: 630,
        alt: 'Mike Nelson Guitar Teacher',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Mike Nelson | Guitar Lessons Wellington',
    description: 'Book guitar lessons in Wellington North. Available in Pukerua Bay, Plimmerton, Cambourne, Mana, Paremata, Papakowhai, Whitby.',
    images: ['https://mikenelsonguitarlessons.co.nz/mike-nelson-guitar-logo.jpg'],
  },
  alternates: {
    canonical: 'https://mikenelsonguitarlessons.co.nz/contact',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 