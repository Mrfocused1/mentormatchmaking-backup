import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Card, CardContent } from '@/components/ui/card'
import { FileText } from 'lucide-react'

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-primary-dark pt-24 pb-12 sm:pt-32 sm:pb-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary-accent/20 mb-6">
            <FileText className="h-10 w-10 text-primary-accent" />
          </div>
          <h1 className="text-4xl font-black font-montserrat tracking-tight text-white sm:text-5xl mb-4">
            Terms of Service
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
                    <h2 className="text-2xl font-bold text-primary-dark mb-4">1. Acceptance of Terms</h2>
                    <p className="text-neutral-700 leading-relaxed mb-3">
                      By accessing and using MentorMatchmaking ("the Platform," "we," "us," or "our"), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our Platform.
                    </p>
                    <p className="text-neutral-700 leading-relaxed">
                      We reserve the right to modify these terms at any time. Continued use of the Platform after changes constitutes acceptance of the modified terms.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-primary-dark mb-4">2. Description of Service</h2>
                    <p className="text-neutral-700 leading-relaxed mb-3">
                      MentorMatchmaking is a platform that connects mentors and mentees for professional development and career guidance. We facilitate:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-neutral-700">
                      <li>Profile creation for mentors and mentees</li>
                      <li>Matching algorithms to connect compatible users</li>
                      <li>Communication tools for mentorship relationships</li>
                      <li>Resources and content related to career development</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-primary-dark mb-4">3. User Accounts</h2>
                    <h3 className="text-lg font-semibold text-primary-dark mb-2">3.1 Registration</h3>
                    <p className="text-neutral-700 leading-relaxed mb-3">
                      To use certain features, you must register for an account. You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate, current, and complete.
                    </p>

                    <h3 className="text-lg font-semibold text-primary-dark mb-2">3.2 Account Security</h3>
                    <p className="text-neutral-700 leading-relaxed mb-3">
                      You are responsible for safeguarding your account password and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
                    </p>

                    <h3 className="text-lg font-semibold text-primary-dark mb-2">3.3 Account Termination</h3>
                    <p className="text-neutral-700 leading-relaxed">
                      We reserve the right to suspend or terminate your account if you violate these Terms of Service or engage in behavior that we deem harmful to other users or the Platform.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-primary-dark mb-4">4. User Conduct</h2>
                    <p className="text-neutral-700 leading-relaxed mb-3">
                      You agree not to:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-neutral-700">
                      <li>Use the Platform for any illegal purposes or to violate any laws</li>
                      <li>Harass, abuse, threaten, or intimidate other users</li>
                      <li>Post false, inaccurate, misleading, or defamatory content</li>
                      <li>Impersonate another person or entity</li>
                      <li>Upload viruses, malware, or any harmful code</li>
                      <li>Scrape, spider, or harvest data from the Platform</li>
                      <li>Use the Platform for commercial solicitation without permission</li>
                      <li>Interfere with the proper functioning of the Platform</li>
                      <li>Share another user's private information without consent</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-primary-dark mb-4">5. Mentorship Relationships</h2>
                    <h3 className="text-lg font-semibold text-primary-dark mb-2">5.1 Platform Role</h3>
                    <p className="text-neutral-700 leading-relaxed mb-3">
                      MentorMatchmaking is a platform that facilitates connections. We do not employ mentors or control the mentorship relationships. All mentorship interactions are between users.
                    </p>

                    <h3 className="text-lg font-semibold text-primary-dark mb-2">5.2 No Guarantee</h3>
                    <p className="text-neutral-700 leading-relaxed mb-3">
                      We do not guarantee specific outcomes from mentorship relationships. Success depends on the commitment and compatibility of both parties.
                    </p>

                    <h3 className="text-lg font-semibold text-primary-dark mb-2">5.3 User Responsibility</h3>
                    <p className="text-neutral-700 leading-relaxed">
                      Users are responsible for conducting themselves professionally and ethically in all mentorship interactions.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-primary-dark mb-4">6. Intellectual Property</h2>
                    <h3 className="text-lg font-semibold text-primary-dark mb-2">6.1 Platform Content</h3>
                    <p className="text-neutral-700 leading-relaxed mb-3">
                      All content on the Platform, including text, graphics, logos, icons, images, and software, is the property of MentorMatchmaking or its licensors and is protected by copyright and intellectual property laws.
                    </p>

                    <h3 className="text-lg font-semibold text-primary-dark mb-2">6.2 User Content</h3>
                    <p className="text-neutral-700 leading-relaxed">
                      You retain ownership of content you upload to the Platform. By uploading content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and display the content in connection with operating the Platform.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-primary-dark mb-4">7. Privacy</h2>
                    <p className="text-neutral-700 leading-relaxed">
                      Your privacy is important to us. Please review our <a href="/privacy" className="text-primary-accent hover:underline">Privacy Policy</a> to understand how we collect, use, and protect your personal information.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-primary-dark mb-4">8. Platform Access and Features</h2>
                    <h3 className="text-lg font-semibold text-primary-dark mb-2">8.1 Free Service</h3>
                    <p className="text-neutral-700 leading-relaxed mb-3">
                      MentorMatchmaking is completely free to use. All features, including profile creation, matching, messaging, and connections, are available to all users at no cost. There are no premium tiers, subscriptions, or paid features.
                    </p>

                    <h3 className="text-lg font-semibold text-primary-dark mb-2">8.2 Future Changes</h3>
                    <p className="text-neutral-700 leading-relaxed">
                      While the Platform is currently free, we reserve the right to introduce optional paid features in the future. If we do so, we will provide advance notice and all existing core features will remain free.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-primary-dark mb-4">9. Disclaimers</h2>
                    <p className="text-neutral-700 leading-relaxed mb-3">
                      THE PLATFORM IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT THE PLATFORM WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE.
                    </p>
                    <p className="text-neutral-700 leading-relaxed">
                      WE ARE NOT RESPONSIBLE FOR THE CONDUCT OF USERS, THE QUALITY OF MENTORSHIP PROVIDED, OR ANY OUTCOMES FROM MENTORSHIP RELATIONSHIPS.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-primary-dark mb-4">10. Limitation of Liability</h2>
                    <p className="text-neutral-700 leading-relaxed">
                      TO THE MAXIMUM EXTENT PERMITTED BY LAW, MENTORMATCHMAKING SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-primary-dark mb-4">11. Indemnification</h2>
                    <p className="text-neutral-700 leading-relaxed">
                      You agree to indemnify and hold MentorMatchmaking harmless from any claims, damages, losses, liabilities, and expenses arising out of your use of the Platform, your violation of these Terms, or your violation of any rights of another user.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-primary-dark mb-4">12. Dispute Resolution</h2>
                    <h3 className="text-lg font-semibold text-primary-dark mb-2">12.1 Informal Resolution</h3>
                    <p className="text-neutral-700 leading-relaxed mb-3">
                      If you have a dispute with us, you agree to first contact us at support@mentormatchmaking.com to attempt to resolve it informally.
                    </p>

                    <h3 className="text-lg font-semibold text-primary-dark mb-2">12.2 Arbitration</h3>
                    <p className="text-neutral-700 leading-relaxed">
                      Any disputes that cannot be resolved informally shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-primary-dark mb-4">13. Governing Law</h2>
                    <p className="text-neutral-700 leading-relaxed">
                      These Terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-primary-dark mb-4">14. Changes to Terms</h2>
                    <p className="text-neutral-700 leading-relaxed">
                      We may update these Terms from time to time. We will notify users of material changes via email or Platform notification. Your continued use of the Platform after changes constitutes acceptance of the new Terms.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-primary-dark mb-4">15. Contact Information</h2>
                    <p className="text-neutral-700 leading-relaxed mb-3">
                      If you have questions about these Terms of Service, please contact us:
                    </p>
                    <div className="bg-neutral-100 rounded-lg p-4 text-neutral-700">
                      <p className="font-semibold mb-1">MentorMatchmaking</p>
                      <p>Email: legal@mentormatchmaking.com</p>
                      <p>Support: support@mentormatchmaking.com</p>
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
