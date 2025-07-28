import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '10 Easiest Beginner Guitar Riffs | Learn Classic Rock Songs',
  description: 'Master 10 iconic beginner guitar riffs from Deep Purple, Black Sabbath, AC/DC, Nirvana & more. Step-by-step tutorials with interactive tabs for new guitarists.',
  keywords: 'beginner guitar riffs, easy guitar songs, guitar tabs, learn guitar, smoke on the water, enter sandman, come as you are, guitar lessons, rock riffs',
  alternates: {
    canonical: 'https://mikenelsonguitarlessons.co.nz/blog/easiest-beginner-guitar-riffs/',
  },
  openGraph: {
    title: '10 Easiest Beginner Guitar Riffs | Learn Classic Rock Songs',
    description: 'Master 10 iconic beginner guitar riffs from Deep Purple, Black Sabbath, AC/DC, Nirvana & more. Step-by-step tutorials with interactive tabs for new guitarists.',
    url: 'https://mikenelsonguitarlessons.co.nz/blog/easiest-beginner-guitar-riffs/',
    type: 'article',
    images: [
      {
        url: '/mike_nelson_guitar_logo.jpg',
        width: 1200,
        height: 630,
        alt: 'Album covers of classic rock songs including Black Sabbath Paranoid, Aerosmith Toys in the Attic, Deep Purple Machine Head, Nirvana Nevermind, Metallica Black Album, Alice in Chains Facelift, AC/DC TNT, Red Hot Chili Peppers Californication, The Kingsmen Louie Louie, and Pearl Jam Ten',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '10 Easiest Beginner Guitar Riffs | Learn Classic Rock Songs',
    description: 'Master 10 iconic beginner guitar riffs from Deep Purple, Black Sabbath, AC/DC, Nirvana & more. Step-by-step tutorials with interactive tabs for new guitarists.',
          images: ['/mike_nelson_guitar_logo.jpg'],
  },
};

export default function EasiestBeginnerGuitarRiffsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: '10 Easiest Beginner Guitar Riffs',
    description: 'Master 10 iconic beginner guitar riffs from Deep Purple, Black Sabbath, AC/DC, Nirvana & more. Step-by-step tutorials with interactive tabs for new guitarists.',
    image: 'https://mikenelsonguitarlessons.co.nz/guitar-riff-blog.png',
    author: {
      '@type': 'Person',
      name: 'Mike Nelson',
      url: 'https://mikenelsonguitarlessons.co.nz/about'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Mike Nelson Guitar Lessons',
      url: 'https://mikenelsonguitarlessons.co.nz'
    },
    datePublished: '2025-01-18',
    dateModified: '2025-01-18',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://mikenelsonguitarlessons.co.nz/blog/easiest-beginner-guitar-riffs/'
    },
    articleSection: 'Guitar Lessons',
    keywords: ['beginner guitar riffs', 'easy guitar songs', 'guitar tabs', 'learn guitar', 'smoke on the water', 'enter sandman', 'come as you are', 'guitar lessons', 'rock riffs'],
    inLanguage: 'en-NZ',
    teaches: [
      'Guitar riffs for beginners',
      'Power chords',
      'Palm muting technique',
      'String bending',
      'Hammer-on technique',
      'Alternate picking',
      'Reading guitar tablature'
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
} 