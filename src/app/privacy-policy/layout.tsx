import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy - Mike Nelson Guitar Lessons',
  description: 'Privacy Policy for Mike Nelson Guitar Lessons. Learn how personal information is collected, used, and protected in compliance with New Zealand Privacy Act 2020.',
  alternates: {
    canonical: 'https://mikenelsonguitarlessons.co.nz/privacy-policy/',
  },
  openGraph: {
    title: 'Privacy Policy - Mike Nelson Guitar Lessons',
    description: 'Privacy Policy for Mike Nelson Guitar Lessons. Learn how personal information is collected, used, and protected in compliance with New Zealand Privacy Act 2020.',
    url: 'https://mikenelsonguitarlessons.co.nz/privacy-policy/',
    type: 'website',
  },
}

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  )
} 