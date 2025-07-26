import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy - Mike Nelson Guitar Lessons',
  description: 'Privacy Policy for Mike Nelson Guitar Lessons. Learn how personal information is collected, used, and protected.',
  alternates: {
    canonical: 'https://mikenelsonguitarlessons.co.nz/privacy-policy/',
  },
  openGraph: {
    title: 'Privacy Policy - Mike Nelson Guitar Lessons',
    description: 'Privacy Policy for Mike Nelson Guitar Lessons. Learn how personal information is collected, used, and protected.',
    url: 'https://mikenelsonguitarlessons.co.nz/privacy-policy/',
    type: 'website',
  },
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-8 sm:px-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
              Privacy Policy – Mike Nelson Guitar Lessons
            </h1>
            
            <div className="prose prose-lg max-w-none">
              <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-8">
                <p className="text-sm text-amber-800">
                  <strong>Effective Date:</strong> 26 July 2025<br />
                  <strong>Last Updated:</strong> 26 July 2025
                </p>
              </div>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">About This Policy</h2>
                <p className="text-gray-700 mb-4">
                  This Privacy Policy outlines how Mike Nelson Guitar Lessons ("I," "me," "my") collects, uses, and protects your personal information when you use my services or visit{' '}
                  <a href="https://mikenelsonguitarlessons.co.nz" className="text-amber-600 hover:text-amber-800 underline">
                    https://mikenelsonguitarlessons.co.nz
                  </a>.
                </p>
                <p className="text-gray-700">
                  I respect your privacy and am committed to complying with the New Zealand Privacy Act 2020.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information I Collect</h2>
                <p className="text-gray-700 mb-4">I may collect the following personal information:</p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li><strong>Contact Details:</strong> Name, email address, phone number</li>
                  <li><strong>Student Address:</strong> Collected only if you request mobile lessons at your location</li>
                  <li><strong>Lesson Information:</strong> Instrument, musical experience, learning goals, and scheduling preferences</li>
                  <li><strong>Communications:</strong> Any emails, messages, or feedback you send</li>
                  <li><strong>Payment Information:</strong> I do not store credit card or banking information. Payments are handled securely through third-party processors</li>
                  <li><strong>Website Usage:</strong> See "Cookies and Website Tracking" below</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">How I Use Your Information</h2>
                <p className="text-gray-700 mb-4">I use your personal information to:</p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li><strong>Provide Guitar Lessons:</strong> Schedule lessons, maintain progress records, and deliver a personalized learning experience</li>
                  <li><strong>Communicate With You:</strong> Send lesson reminders, respond to inquiries, and notify you of important updates or changes</li>
                  <li><strong>Legal Compliance:</strong> Fulfil legal obligations under New Zealand law (e.g., tax records)</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information Sharing</h2>
                <p className="text-gray-700 mb-4">
                  I <strong>do not sell</strong> or rent your personal information to anyone.
                </p>
                <p className="text-gray-700 mb-4">I may share your information <strong>only</strong>:</p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>When required by law (e.g., court order, tax obligation)</li>
                  <li>To protect my rights or respond to legal claims</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Protection</h2>
                <p className="text-gray-700 mb-4">I protect your personal information through:</p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li><strong>Secure Storage:</strong> Password-protected systems and encrypted communications</li>
                  <li><strong>Limited Access:</strong> Only I have access to your personal information</li>
                  <li><strong>Regular Security Reviews:</strong> I update security practices regularly</li>
                  <li><strong>Trusted Third Parties:</strong> I use only reputable service providers with strong privacy and security policies</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Rights Under the New Zealand Privacy Act 2020</h2>
                <p className="text-gray-700 mb-4">You have the right to:</p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li><strong>Access:</strong> Request a copy of your personal information</li>
                  <li><strong>Correction:</strong> Ask me to correct inaccurate or outdated information</li>
                  <li><strong>Deletion:</strong> Request deletion of your data (unless I am legally required to retain it)</li>
                  <li><strong>Data Portability:</strong> Request your information in a machine-readable format</li>
                  <li><strong>Complaint:</strong> Lodge a complaint with the Office of the Privacy Commissioner if you have concerns about how your data is handled</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Retention</h2>
                <p className="text-gray-700 mb-4">I retain information for the following periods:</p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li><strong>Active and Former Students:</strong> Indefinitely, to maintain business records and support potential future lessons</li>
                  <li><strong>Inquiries:</strong> Retained for 1 year to allow follow-up</li>
                  <li><strong>Financial Records:</strong> Retained for 7 years, as required by New Zealand tax law</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Cookies and Website Tracking</h2>
                <p className="text-gray-700 mb-4">My website uses the following types of cookies:</p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li><strong>Essential Cookies:</strong> Required for site functionality</li>
                  <li><strong>Analytics Cookies:</strong> Google Analytics is used (with privacy-friendly settings enabled) to understand how visitors use the site</li>
                  <li><strong>Performance Cookies:</strong> Help improve website speed and user experience</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  A cookie banner appears when you visit the site, allowing you to accept or manage your cookie preferences. You can also control or disable cookies through your browser settings.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Third-Party Services</h2>
                <p className="text-gray-700 mb-4">I use the following third-party services, each with its own privacy policy:</p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li><strong>Google Analytics:</strong> Website traffic analysis</li>
                  <li><strong>Payment Processor:</strong> Stripe (secure online payment)</li>
                  <li><strong>Email Services:</strong> Gmail</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  I configure these services with privacy settings that limit data collection to what's necessary for business operations.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">International Data Transfers</h2>
                <p className="text-gray-700">
                  Your data is primarily stored in New Zealand. If I use international service providers, I ensure that your information is protected by appropriate safeguards in accordance with New Zealand privacy law.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Children's Privacy</h2>
                <p className="text-gray-700 mb-4">
                  My services are available to both adults and children, with additional safeguards in place for minors.
                </p>
                <p className="text-gray-700 mb-4">For students under the age of 18:</p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>I require consent from a parent or legal guardian</li>
                  <li>Parents/guardians may access and control their child's personal information</li>
                  <li>I collect only the information necessary to provide guitar lessons</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Changes to This Policy</h2>
                <p className="text-gray-700 mb-4">I may update this Privacy Policy from time to time. When I do:</p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>I will update the "Last Updated" date at the top of this page</li>
                  <li>Significant changes will be posted on the website or communicated via email</li>
                  <li>Continued use of my services after a policy change means you accept the updated policy</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Me</h2>
                <p className="text-gray-700 mb-4">
                  If you have questions, concerns, or would like to exercise your privacy rights, please contact:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 font-semibold">Mike Nelson Guitar Lessons</p>
                  <p className="text-gray-700">
                    Email: <a href="mailto:mikenelsonguitarlessonsnz@gmail.com" className="text-amber-600 hover:text-amber-800 underline">
                      mikenelsonguitarlessonsnz@gmail.com
                    </a>
                  </p>
                  <p className="text-gray-700">Phone: 022 127 2154</p>
                  <p className="text-gray-700">
                    Website: <a href="https://mikenelsonguitarlessons.co.nz" className="text-amber-600 hover:text-amber-800 underline">
                      https://mikenelsonguitarlessons.co.nz
                    </a>
                  </p>
                </div>
                <p className="text-gray-700 mt-4">
                  You can also contact the Office of the Privacy Commissioner:<br />
                  Website: <a href="https://privacy.org.nz" className="text-amber-600 hover:text-amber-800 underline">https://privacy.org.nz</a><br />
                  Phone: 0800 803 909
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Legal Notice</h2>
                <p className="text-gray-700">
                  By using my services, you agree to the terms outlined in this Privacy Policy.<br />
                  This policy is governed by the laws of New Zealand.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 