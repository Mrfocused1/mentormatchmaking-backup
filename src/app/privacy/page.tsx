import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Card, CardContent } from '@/components/ui/card'
import { Shield } from 'lucide-react'

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-primary-dark pt-24 pb-12 sm:pt-32 sm:pb-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary-accent/20 mb-6">
            <Shield className="h-10 w-10 text-primary-accent" />
          </div>
          <h1 className="text-4xl font-black font-montserrat tracking-tight text-white sm:text-5xl mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-white/90 font-montserrat">
            Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <Card className="shadow-lg border-neutral-200">
            <CardContent className="p-8 sm:p-12">
              <div className="prose prose-neutral max-w-none">
                <div className="space-y-8 font-montserrat">

                  <div>
                    <h2 className="text-2xl font-bold text-primary-dark mb-4">1. Introduction</h2>
                    <p className="text-neutral-700 leading-relaxed mb-3">
                      At MentorMatchmaking ("we," "us," or "our"), we are committed to protecting your privacy and personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
                    </p>
                    <p className="text-neutral-700 leading-relaxed">
                      By using MentorMatchmaking, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, please do not use our platform.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-primary-dark mb-4">2. Information We Collect</h2>
                    <h3 className="text-lg font-semibold text-primary-dark mb-2">2.1 Information You Provide to Us</h3>
                    <p className="text-neutral-700 leading-relaxed mb-3">
                      We collect information that you voluntarily provide when you:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-neutral-700 mb-3">
                      <li>Register for an account (name, email address, password)</li>
                      <li>Complete your profile (bio, career information, skills, interests)</li>
                      <li>Upload documents (CV, resume, profile pictures)</li>
                      <li>Communicate with other users through our platform</li>
                      <li>Contact our support team</li>
                      <li>Participate in surveys or provide feedback</li>
                    </ul>

                    <h3 className="text-lg font-semibold text-primary-dark mb-2">2.2 Information Collected Automatically</h3>
                    <p className="text-neutral-700 leading-relaxed mb-3">
                      When you access our platform, we automatically collect certain information, including:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-neutral-700 mb-3">
                      <li>Device information (IP address, browser type, operating system)</li>
                      <li>Usage data (pages viewed, time spent on platform, navigation patterns)</li>
                      <li>Location data (approximate location based on IP address)</li>
                      <li>Cookies and similar tracking technologies</li>
                    </ul>

                    <h3 className="text-lg font-semibold text-primary-dark mb-2">2.3 Information from Third Parties</h3>
                    <p className="text-neutral-700 leading-relaxed">
                      We may receive information about you from third-party services you connect to your account, such as LinkedIn or other professional networking platforms, with your permission.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-primary-dark mb-4">3. How We Use Your Information</h2>
                    <p className="text-neutral-700 leading-relaxed mb-3">
                      We use the information we collect to:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-neutral-700">
                      <li>Provide, operate, and maintain our platform</li>
                      <li>Create and manage your account</li>
                      <li>Match mentors and mentees based on compatibility</li>
                      <li>Facilitate communication between users</li>
                      <li>Send you important updates, notifications, and administrative messages</li>
                      <li>Improve our platform and develop new features</li>
                      <li>Analyze usage patterns and trends</li>
                      <li>Detect, prevent, and address technical issues or fraudulent activity</li>
                      <li>Comply with legal obligations</li>
                      <li>Send marketing communications (with your consent)</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-primary-dark mb-4">4. How We Share Your Information</h2>
                    <h3 className="text-lg font-semibold text-primary-dark mb-2">4.1 With Other Users</h3>
                    <p className="text-neutral-700 leading-relaxed mb-3">
                      Your profile information is visible to other users to facilitate mentorship connections. For mentees, we implement privacy protections including displaying only first names, age ranges, and general location information to mentors until a mutual match is established.
                    </p>

                    <h3 className="text-lg font-semibold text-primary-dark mb-2">4.2 With Service Providers</h3>
                    <p className="text-neutral-700 leading-relaxed mb-3">
                      We may share your information with third-party service providers who perform services on our behalf, such as:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-neutral-700 mb-3">
                      <li>Cloud hosting providers</li>
                      <li>Email service providers</li>
                      <li>Analytics providers</li>
                      <li>Customer support tools</li>
                    </ul>

                    <h3 className="text-lg font-semibold text-primary-dark mb-2">4.3 For Legal Purposes</h3>
                    <p className="text-neutral-700 leading-relaxed mb-3">
                      We may disclose your information if required to do so by law or in response to valid requests by public authorities, including to meet national security or law enforcement requirements.
                    </p>

                    <h3 className="text-lg font-semibold text-primary-dark mb-2">4.4 Business Transfers</h3>
                    <p className="text-neutral-700 leading-relaxed">
                      If we are involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction. We will notify you of any such change.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-primary-dark mb-4">5. Your Privacy Rights</h2>
                    <p className="text-neutral-700 leading-relaxed mb-3">
                      Depending on your location, you may have certain rights regarding your personal information:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-neutral-700 mb-3">
                      <li><strong>Access:</strong> You can request access to the personal information we hold about you</li>
                      <li><strong>Correction:</strong> You can update or correct your information through your account settings</li>
                      <li><strong>Deletion:</strong> You can request deletion of your account and personal information</li>
                      <li><strong>Data Portability:</strong> You can request a copy of your data in a structured, machine-readable format</li>
                      <li><strong>Opt-Out:</strong> You can opt out of marketing communications at any time</li>
                      <li><strong>Restrict Processing:</strong> You can request that we limit how we use your information</li>
                      <li><strong>Object:</strong> You can object to our processing of your information for certain purposes</li>
                    </ul>
                    <p className="text-neutral-700 leading-relaxed">
                      To exercise these rights, please contact us at privacy@mentormatchmaking.com.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-primary-dark mb-4">6. Data Security</h2>
                    <p className="text-neutral-700 leading-relaxed mb-3">
                      We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-neutral-700 mb-3">
                      <li>Encryption of data in transit and at rest</li>
                      <li>Regular security assessments and audits</li>
                      <li>Access controls and authentication procedures</li>
                      <li>Employee training on data protection</li>
                      <li>Incident response procedures</li>
                    </ul>
                    <p className="text-neutral-700 leading-relaxed">
                      However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee its absolute security.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-primary-dark mb-4">7. Data Retention</h2>
                    <p className="text-neutral-700 leading-relaxed mb-3">
                      We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
                    </p>
                    <p className="text-neutral-700 leading-relaxed">
                      When you delete your account, we will delete or anonymize your personal information within 30 days, except where we are required to retain certain information for legal, regulatory, or legitimate business purposes.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-primary-dark mb-4">8. Cookies and Tracking Technologies</h2>
                    <p className="text-neutral-700 leading-relaxed mb-3">
                      We use cookies and similar tracking technologies to track activity on our platform and store certain information. You can control the use of cookies through your browser settings.
                    </p>
                    <p className="text-neutral-700 leading-relaxed">
                      For more detailed information about how we use cookies, please see our <a href="/cookies" className="text-primary-accent hover:underline">Cookie Policy</a>.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-primary-dark mb-4">9. Third-Party Links</h2>
                    <p className="text-neutral-700 leading-relaxed">
                      Our platform may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties. We encourage you to read their privacy policies before providing any information to them.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-primary-dark mb-4">10. Children's Privacy</h2>
                    <p className="text-neutral-700 leading-relaxed">
                      Our platform is not intended for users under the age of 18. We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with personal information, please contact us, and we will delete such information.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-primary-dark mb-4">11. International Data Transfers</h2>
                    <p className="text-neutral-700 leading-relaxed">
                      Your information may be transferred to and maintained on servers located outside of your state, province, country, or other governmental jurisdiction where data protection laws may differ. By using our platform, you consent to such transfers.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-primary-dark mb-4">12. California Privacy Rights</h2>
                    <p className="text-neutral-700 leading-relaxed mb-3">
                      If you are a California resident, you have specific rights under the California Consumer Privacy Act (CCPA), including:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-neutral-700 mb-3">
                      <li>The right to know what personal information we collect, use, and disclose</li>
                      <li>The right to request deletion of your personal information</li>
                      <li>The right to opt out of the sale of your personal information (we do not sell personal information)</li>
                      <li>The right to non-discrimination for exercising your privacy rights</li>
                    </ul>
                    <p className="text-neutral-700 leading-relaxed">
                      To exercise these rights, please contact us at privacy@mentormatchmaking.com.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-primary-dark mb-4">13. European Privacy Rights (GDPR)</h2>
                    <p className="text-neutral-700 leading-relaxed mb-3">
                      If you are located in the European Economic Area (EEA), you have certain rights under the General Data Protection Regulation (GDPR), including:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-neutral-700 mb-3">
                      <li>The right to access your personal data</li>
                      <li>The right to rectification of inaccurate data</li>
                      <li>The right to erasure ("right to be forgotten")</li>
                      <li>The right to restrict processing</li>
                      <li>The right to data portability</li>
                      <li>The right to object to processing</li>
                      <li>Rights related to automated decision-making</li>
                    </ul>
                    <p className="text-neutral-700 leading-relaxed">
                      You also have the right to lodge a complaint with a supervisory authority in your jurisdiction.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-primary-dark mb-4">14. Changes to This Privacy Policy</h2>
                    <p className="text-neutral-700 leading-relaxed">
                      We may update our Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. We will also notify you via email or through a prominent notice on our platform.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-primary-dark mb-4">15. Contact Us</h2>
                    <p className="text-neutral-700 leading-relaxed mb-3">
                      If you have questions about this Privacy Policy or our privacy practices, please contact us:
                    </p>
                    <div className="bg-neutral-100 rounded-lg p-4 text-neutral-700">
                      <p className="font-semibold mb-1">MentorMatchmaking</p>
                      <p>Email: privacy@mentormatchmaking.com</p>
                      <p>Support: support@mentormatchmaking.com</p>
                      <p>Legal: legal@mentormatchmaking.com</p>
                    </div>
                  </div>

                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}
