'use client';

import { useEffect } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Guitar Scale Explorer | Interactive Fretboard Tool | Mike Nelson Guitar Lessons",
  description: "Interactive guitar scale explorer with visual fretboard diagrams. Learn guitar scales, modes, intervals, and chord theory with color-coded interval display. Perfect for guitarists struggling with music theory.",
  keywords: "guitar scale explorer, interactive fretboard, guitar scales, guitar modes, music theory tool, fretboard visualization, guitar intervals, scale patterns, guitar chord theory, music theory simplified, guitar theory confusion, fretboard memorization, interval color coding, guitar mode explorer, guitar scale patterns, chord diagram generator, diatonic chord theory, guitar interval training, music theory for beginners, guitar theory made easy, visual music theory, guitar fretboard theory, understanding guitar modes, guitar chord construction, enharmonic equivalents, modal interchange",
  openGraph: {
    title: "Guitar Scale Explorer | Interactive Fretboard Tool",
    description: "Interactive guitar scale explorer with visual fretboard diagrams. Learn guitar scales, modes, intervals, and chord theory with color-coded interval display.",
    type: "website",
    url: "https://mikenelsonguitarlessons.co.nz/scale-explorer",
  },
  twitter: {
    card: 'summary_large_image',
    title: "Guitar Scale Explorer | Interactive Fretboard Tool",
    description: "Interactive guitar scale explorer with visual fretboard diagrams. Learn guitar scales, modes, intervals, and chord theory with color-coded interval display.",
  },
};

export default function ScaleExplorerPage() {
  useEffect(() => {
    // Redirect to the standalone Scale Explorer
    window.location.replace('/scale-explorer/');
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-lg">Redirecting to Scale Explorer...</p>
    </div>
  );
} 