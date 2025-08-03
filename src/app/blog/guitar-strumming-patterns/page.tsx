import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Guitar Strumming Patterns Guide',
  description: 'Learn essential guitar strumming patterns with interactive examples and practice exercises.',
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: 'Guitar Strumming Patterns Guide | Mike Nelson Guitar Lessons',
    description: 'Learn essential guitar strumming patterns with interactive examples and practice exercises.',
    images: ['/strumming-patterns-thumbnail.svg'],
  },
}

export default function GuitarStrummingPatternsPage() {
  // Redirect to 404 to completely hide the page
  notFound()
} 