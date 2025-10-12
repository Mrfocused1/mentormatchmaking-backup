import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Card, CardContent } from '@/components/ui/card'
import { Heart } from 'lucide-react'

export default function CodeOfConductPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-primary-dark pt-24 pb-12 sm:pt-32 sm:pb-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary-accent/20 mb-6">
            <Heart className="h-10 w-10 text-primary-accent" />
          </div>
          <h1 className="text-4xl font-black font-montserrat tracking-tight text-white sm:text-5xl mb-4">
            Code of Conduct
          </h1>
          <p className="text-lg text-white/90 font-montserrat">
            Building a respectful and supportive mentorship community
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
                    <h2 className="text-2xl font-bold text-primary-dark mb-4">Our Commitment</h2>
                    <p className="text-neutral-700 leading-relaxed mb-3">
                      Look for Mentors is committed to providing a safe, inclusive, and respectful environment for all users. This Code of Conduct outlines the standards of behavior we expect from everyone in our community—mentors, mentees, and staff alike.
                    </p>
                    <p className="text-neutral-700 leading-relaxed">
                      By using our platform, you agree to uphold these principles and contribute to a positive mentorship experience for all.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-primary-dark mb-4">Core Values</h2>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold text-primary-dark mb-2">Respect</h3>
                        <p className="text-neutral-700 leading-relaxed">
                          Treat everyone with dignity and respect, regardless of their background, experience level, identity, or beliefs. Value diverse perspectives and approaches to learning and growth.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-primary-dark mb-2">Integrity</h3>
                        <p className="text-neutral-700 leading-relaxed">
                          Be honest, authentic, and transparent in all your interactions. Honor your commitments and communicate openly with your mentor or mentee.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-primary-dark mb-2">Support</h3>
                        <p className="text-neutral-700 leading-relaxed">
                          Foster a supportive environment where growth and learning are encouraged. Provide constructive feedback and celebrate successes together.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-primary-dark mb-2">Inclusivity</h3>
                        <p className="text-neutral-700 leading-relaxed">
                          Welcome and embrace diversity. Ensure that all members feel valued, heard, and included in our community.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-primary-dark mb-4">Expected Behavior</h2>
                    <p className="text-neutral-700 leading-relaxed mb-3">
                      All community members are expected to:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-neutral-700">
                      <li>Communicate respectfully and professionally at all times</li>
                      <li>Be punctual and honor scheduled meetings and commitments</li>
                      <li>Listen actively and give your full attention during mentorship sessions</li>
                      <li>Provide constructive, thoughtful feedback</li>
                      <li>Respect confidentiality and privacy</li>
                      <li>Be patient and understanding with different learning styles and paces</li>
                      <li>Acknowledge and give credit for others' ideas and contributions</li>
                      <li>Communicate clearly if you need to reschedule or end a mentorship relationship</li>
                      <li>Report any concerns or violations of this Code of Conduct</li>
                      <li>Use the platform for its intended purpose of professional development and mentorship</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-primary-dark mb-4">Prohibited Behavior</h2>
                    <p className="text-neutral-700 leading-relaxed mb-3">
                      The following behaviors are strictly prohibited on our platform:
                    </p>

                    <h3 className="text-lg font-semibold text-primary-dark mb-2">Harassment and Discrimination</h3>
                    <ul className="list-disc pl-6 space-y-2 text-neutral-700 mb-3">
                      <li>Harassment, bullying, or intimidation of any kind</li>
                      <li>Discrimination based on race, ethnicity, nationality, religion, gender, gender identity, sexual orientation, age, disability, or any other protected characteristic</li>
                      <li>Unwelcome sexual attention, advances, or inappropriate comments</li>
                      <li>Stalking or persistent unwanted contact</li>
                    </ul>

                    <h3 className="text-lg font-semibold text-primary-dark mb-2">Dishonest or Harmful Conduct</h3>
                    <ul className="list-disc pl-6 space-y-2 text-neutral-700 mb-3">
                      <li>Providing false or misleading information about your qualifications or experience</li>
                      <li>Impersonating another person or organization</li>
                      <li>Sharing confidential information without permission</li>
                      <li>Plagiarism or claiming others' work as your own</li>
                    </ul>

                    <h3 className="text-lg font-semibold text-primary-dark mb-2">Inappropriate Content</h3>
                    <ul className="list-disc pl-6 space-y-2 text-neutral-700 mb-3">
                      <li>Sharing offensive, hateful, or threatening content</li>
                      <li>Posting explicit, violent, or disturbing material</li>
                      <li>Spam, advertising, or unsolicited commercial messages</li>
                      <li>Content that promotes illegal activities</li>
                    </ul>

                    <h3 className="text-lg font-semibold text-primary-dark mb-2">Platform Abuse</h3>
                    <ul className="list-disc pl-6 space-y-2 text-neutral-700">
                      <li>Attempting to manipulate matching algorithms or game the system</li>
                      <li>Creating multiple accounts to circumvent restrictions</li>
                      <li>Scraping data or using automated tools without permission</li>
                      <li>Interfering with the platform's functionality or other users' access</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-primary-dark mb-4">Mentorship-Specific Guidelines</h2>

                    <h3 className="text-lg font-semibold text-primary-dark mb-2">For Mentors</h3>
                    <ul className="list-disc pl-6 space-y-2 text-neutral-700 mb-3">
                      <li>Provide honest, constructive guidance based on your genuine experience</li>
                      <li>Set clear expectations and boundaries for the mentorship relationship</li>
                      <li>Be reliable and communicate promptly if circumstances change</li>
                      <li>Respect your mentee's autonomy and personal decisions</li>
                      <li>Avoid conflicts of interest (e.g., recruiting mentees for your company without disclosure)</li>
                      <li>Do not leverage your position for personal gain or inappropriate relationships</li>
                      <li>Maintain appropriate professional boundaries at all times</li>
                    </ul>

                    <h3 className="text-lg font-semibold text-primary-dark mb-2">For Mentees</h3>
                    <ul className="list-disc pl-6 space-y-2 text-neutral-700">
                      <li>Come prepared to mentorship sessions with questions and goals</li>
                      <li>Be receptive to feedback and willing to learn</li>
                      <li>Respect your mentor's time and expertise</li>
                      <li>Take ownership of your own growth and development</li>
                      <li>Be honest about your progress and challenges</li>
                      <li>Do not expect your mentor to guarantee job placements or outcomes</li>
                      <li>Maintain professional boundaries and respect personal limits</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-primary-dark mb-4">Privacy and Confidentiality</h2>
                    <p className="text-neutral-700 leading-relaxed mb-3">
                      All users must respect the privacy of others:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-neutral-700">
                      <li>Do not share private conversations or personal information without explicit consent</li>
                      <li>Respect mentees' privacy protections (first names, age ranges, limited profile visibility)</li>
                      <li>Do not screenshot or record conversations without permission</li>
                      <li>Keep sensitive career information and personal details confidential</li>
                      <li>Report any privacy violations to our team immediately</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-primary-dark mb-4">Reporting Violations</h2>
                    <p className="text-neutral-700 leading-relaxed mb-3">
                      If you experience or witness behavior that violates this Code of Conduct, please report it immediately. We take all reports seriously and will investigate them promptly and confidentially.
                    </p>

                    <h3 className="text-lg font-semibold text-primary-dark mb-2">How to Report</h3>
                    <ul className="list-disc pl-6 space-y-2 text-neutral-700 mb-3">
                      <li>Use the "Report" button on user profiles or conversations</li>
                      <li>Email our Trust & Safety team at conduct@look4mentors.com</li>
                      <li>Contact support@look4mentors.com for general concerns</li>
                    </ul>

                    <h3 className="text-lg font-semibold text-primary-dark mb-2">What to Include</h3>
                    <p className="text-neutral-700 leading-relaxed mb-3">
                      When reporting a violation, please provide:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-neutral-700">
                      <li>A detailed description of the incident</li>
                      <li>The date and time it occurred</li>
                      <li>The username of the person involved</li>
                      <li>Any relevant screenshots or evidence (optional but helpful)</li>
                      <li>Any witnesses who may have observed the behavior</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-primary-dark mb-4">Investigation Process</h2>
                    <p className="text-neutral-700 leading-relaxed mb-3">
                      When we receive a report:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-neutral-700">
                      <li>We will acknowledge receipt within 24-48 hours</li>
                      <li>Our team will review the report and gather relevant information</li>
                      <li>We may contact the reporter and other parties for additional details</li>
                      <li>All investigations will be conducted confidentially</li>
                      <li>We will take appropriate action based on our findings</li>
                      <li>The reporter will be informed of the outcome (within confidentiality limits)</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-primary-dark mb-4">Consequences of Violations</h2>
                    <p className="text-neutral-700 leading-relaxed mb-3">
                      Violations of this Code of Conduct may result in the following actions, depending on the severity and frequency of the violation:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-neutral-700">
                      <li><strong>Warning:</strong> A formal warning and guidance on expected behavior</li>
                      <li><strong>Temporary Suspension:</strong> Temporary restriction of platform access</li>
                      <li><strong>Permanent Ban:</strong> Permanent removal from the platform</li>
                      <li><strong>Legal Action:</strong> In cases of illegal activity, we may involve law enforcement</li>
                    </ul>
                    <p className="text-neutral-700 leading-relaxed mt-3">
                      We reserve the right to take immediate action, including permanent bans, for severe violations such as harassment, threats, or illegal activity.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-primary-dark mb-4">Appeals</h2>
                    <p className="text-neutral-700 leading-relaxed">
                      If you believe a decision was made in error, you may appeal by contacting conduct@look4mentors.com within 14 days of the decision. Please provide any additional information or context that may be relevant to your appeal.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-primary-dark mb-4">Updates to This Code of Conduct</h2>
                    <p className="text-neutral-700 leading-relaxed">
                      We may update this Code of Conduct from time to time to reflect the evolving needs of our community. Material changes will be communicated via email or platform notification. Continued use of the platform constitutes acceptance of any updates.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-primary-dark mb-4">Contact Us</h2>
                    <p className="text-neutral-700 leading-relaxed mb-3">
                      If you have questions about this Code of Conduct, please contact us:
                    </p>
                    <div className="bg-neutral-100 rounded-lg p-4 text-neutral-700">
                      <p className="font-semibold mb-1">Look 4 Mentors Trust & Safety</p>
                      <p>Code of Conduct Inquiries: conduct@look4mentors.com</p>
                      <p>Report a Violation: conduct@look4mentors.com</p>
                      <p>General Support: support@look4mentors.com</p>
                    </div>
                  </div>

                  <div className="bg-primary-accent/10 rounded-lg p-6 mt-8">
                    <p className="text-neutral-800 leading-relaxed font-semibold mb-2">
                      Thank You
                    </p>
                    <p className="text-neutral-700 leading-relaxed">
                      Thank you for being part of the Look for Mentors community and for helping us maintain a safe, respectful, and supportive environment for everyone. Together, we can create meaningful mentorship experiences that transform careers and lives.
                    </p>
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
