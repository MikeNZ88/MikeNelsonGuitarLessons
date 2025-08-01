#!/bin/bash

# Array of blog posts with their titles and descriptions
declare -A posts=(
  ["free-vst-plugins-reaper-organic-production"]="Beginner Guide to Recording Guitar: Complete Free Software Setup (2025)|Complete free software setup for recording guitar at home. Learn Reaper DAW, free VST plugins, and organic production techniques."
  ["guitar-arpeggios-exercises"]="Guitar Arpeggio Exercises|Master guitar arpeggios with these essential exercises. Learn major, minor, and seventh chord arpeggios with interactive tabs."
  ["guitar-fretboard-navigation"]="Guitar Fretboard Navigation: Cross-String Interval Relationships (Part 2)|Learn advanced fretboard navigation techniques and cross-string interval relationships for better guitar playing."
  ["guitar-picking-technique-guide"]="Guitar Picking Technique: Complete Progressive Guide|Master guitar picking technique with this comprehensive progressive guide. Learn alternate picking, economy picking, and more."
  ["guitar-strumming-patterns"]="Master Guitar Strumming Patterns|Learn essential guitar strumming patterns for beginners. Master rhythm and timing with these fundamental patterns."
  ["how-to-read-chord-diagrams"]="How to Read Chord Diagrams|Learn how to read guitar chord diagrams and chord charts. Essential knowledge for every guitarist."
  ["introducing-practicetrack"]="Introducing PracticeTrack: Your Musical Journey Companion|Discover PracticeTrack, your musical journey companion. Track your progress and stay motivated in your guitar learning."
  ["kiesel-a2-7-string-review"]="My Kiesel A2 7-String|Review of the Kiesel A2 7-string guitar. Features, sound, and playing experience of this premium instrument."
  ["major-scale-guitar-guide"]="Major Scale Guitar Guide|Learn the major scale on guitar. Understand scale patterns, positions, and how to use them in your playing."
  ["pentatonic-scale-exercises"]="Pentatonic Scale Exercises|Master pentatonic scales with these essential exercises. Learn major and minor pentatonic patterns."
  ["rhythm-tool"]="Learn Rhythm with the Interactive Rhythm Tool|Master rhythm and timing with our interactive rhythm tool. Practice essential rhythmic patterns."
  ["scale-explorer-tool"]="Master Guitar Scales with the Interactive Scale Explorer Tool|Explore guitar scales with our interactive scale explorer tool. Visualize scales across the fretboard."
  ["wellington-music-stores"]="Wellington's Vanishing Instrument Stores|Explore Wellington's music stores and instrument shops. Find guitars, amps, and gear in New Zealand's capital."
  ["what-is-a-chord"]="What is a Chord? Understanding Structure, Intervals, and Types|Learn what a chord is, how they're built, and the different types of chords used in music."
  ["when-should-you-start-learning-guitar"]="When Should You Start Learning Guitar? What the Research Actually Says|Discover the best age to start learning guitar based on research and expert advice."
  ["why-is-guitar-tuned-the-way-it-is"]="Understanding the Guitar Fretboard: Why Strings Are Tuned This Way (Part 1)|Learn why the guitar is tuned the way it is and how this affects fretboard navigation."
  ["your-first-guitar-chords"]="Your First Guitar Chords: A Complete Beginner Guide|Learn your first guitar chords with this complete beginner guide. Master essential open chords."
)

# Create layout files for each blog post
for slug in "${!posts[@]}"; do
  IFS='|' read -r title description <<< "${posts[$slug]}"
  
  cat > "src/app/blog/$slug/layout.tsx" << LAYOUT
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '$title',
  description: '$description',
  alternates: {
    canonical: 'https://mikenelsonguitarlessons.co.nz/blog/$slug',
  },
  openGraph: {
    title: '$title',
    description: '$description',
    type: 'article',
    url: 'https://mikenelsonguitarlessons.co.nz/blog/$slug',
  },
};

export default function ${slug//-/_}Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
LAYOUT

  echo "Created layout for: $slug"
done

echo "All layout files created!"
