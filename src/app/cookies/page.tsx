import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Card, CardContent } from '@/components/ui/card'
import { Cookie } from 'lucide-react'

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-primary-dark pt-24 pb-12 sm:pt-32 sm:pb-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary-accent/20 mb-6">
            <Cookie className="h-10 w-10 text-primary-accent" />
          </div>
          <h1 className="text-4xl font-black font-montserrat tracking-tight text-white sm:text-5xl mb-4">
            Cookie Policy
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
                    <h2 className="text-2xl font-bold text-primary-dark mb-4">1. What Are Cookies?</h2>
                    <p className="text-neutral-700 leading-relaxed mb-3">
                      Cookies are small text files that are placed on your device (computer, smartphone, or tablet) when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.
                    </p>
                    <p className="text-neutral-700 leading-relaxed">
                      Cookies help us recognize your device and store information about your preferences or past actions on our platform, enabling us to provide you with a better, more personalized experience.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-primary-dark mb-4">2. How We Use Cookies</h2>
                    <p className="text-neutral-700 leading-relaxed mb-3">
                      MentorMatchmaking uses cookies to:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-neutral-700">
                      <li>Keep you signed in to your account</li>
                      <li>Remember your preferences and settings</li>
                      <li>Understand how you use our platform</li>
                      <li>Improve our services and user experience</li>
                      <li>Analyze site traffic and usage patterns</li>
                      <li>Personalize content and recommendations</li>
                      <li>Protect against fraud and security threats</li>
                      <li>Deliver relevant advertisements (with your consent)</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-primary-dark mb-4">3. Types of Cookies We Use</h2>

                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-primary-dark mb-2">3.1 Strictly Necessary Cookies</h3>
                        <p className="text-neutral-700 leading-relaxed mb-2">
                          <strong>Purpose:</strong> These cookies are essential for the platform to function properly. They enable core functionality such as security, authentication, and accessibility.
                        </p>
                        <p className="text-neutral-700 leading-relaxed mb-2">
                          <strong>Examples:</strong>
                        </p>
                        <ul className="list-disc pl-6 space-y-1 text-neutral-700 mb-2">
                          <li>Session cookies that keep you logged in</li>
                          <li>Security cookies that detect authentication issues</li>
                          <li>Load balancing cookies that ensure site performance</li>
                        </ul>
                        <p className="text-neutral-700 leading-relaxed">
                          <strong>Can you disable them?</strong> No. These cookies are essential for the platform to work. Without them, you won't be able to use key features.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-primary-dark mb-2">3.2 Performance Cookies</h3>
                        <p className="text-neutral-700 leading-relaxed mb-2">
                          <strong>Purpose:</strong> These cookies collect information about how visitors use our platform, such as which pages are visited most often and if error messages are received.
                        </p>
                        <p className="text-neutral-700 leading-relaxed mb-2">
                          <strong>Examples:</strong>
                        </p>
                        <ul className="list-disc pl-6 space-y-1 text-neutral-700 mb-2">
                          <li>Google Analytics cookies that track page views and user behavior</li>
                          <li>Cookies that measure site performance and speed</li>
                          <li>Error tracking cookies that help us fix technical issues</li>
                        </ul>
                        <p className="text-neutral-700 leading-relaxed">
                          <strong>Can you disable them?</strong> Yes. Disabling these cookies won't affect your ability to use the platform, but it will limit our ability to improve your experience.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-primary-dark mb-2">3.3 Functionality Cookies</h3>
                        <p className="text-neutral-700 leading-relaxed mb-2">
                          <strong>Purpose:</strong> These cookies allow the platform to remember choices you make (such as your username, language, or region) and provide enhanced, personalized features.
                        </p>
                        <p className="text-neutral-700 leading-relaxed mb-2">
                          <strong>Examples:</strong>
                        </p>
                        <ul className="list-disc pl-6 space-y-1 text-neutral-700 mb-2">
                          <li>Cookies that remember your display preferences</li>
                          <li>Cookies that save your filter settings</li>
                          <li>Cookies that remember if you've dismissed notifications</li>
                        </ul>
                        <p className="text-neutral-700 leading-relaxed">
                          <strong>Can you disable them?</strong> Yes. Disabling these cookies may cause some features to not work as expected, and you may need to re-enter preferences each time you visit.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-primary-dark mb-2">3.4 Targeting/Advertising Cookies</h3>
                        <p className="text-neutral-700 leading-relaxed mb-2">
                          <strong>Purpose:</strong> These cookies are used to deliver advertisements that are relevant to you and your interests. They also limit the number of times you see an ad and help measure the effectiveness of advertising campaigns.
                        </p>
                        <p className="text-neutral-700 leading-relaxed mb-2">
                          <strong>Examples:</strong>
                        </p>
                        <ul className="list-disc pl-6 space-y-1 text-neutral-700 mb-2">
                          <li>Cookies from advertising platforms (e.g., Google Ads, Facebook Pixel)</li>
                          <li>Retargeting cookies that show you relevant ads on other sites</li>
                          <li>Cookies that track ad performance and conversions</li>
                        </ul>
                        <p className="text-neutral-700 leading-relaxed">
                          <strong>Can you disable them?</strong> Yes. You can opt out of targeted advertising through your cookie preferences or browser settings. You'll still see ads, but they won't be personalized to your interests.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-primary-dark mb-2">3.5 Social Media Cookies</h3>
                        <p className="text-neutral-700 leading-relaxed mb-2">
                          <strong>Purpose:</strong> These cookies are set by social media platforms (e.g., LinkedIn, Twitter) and allow you to share content from our platform on social networks.
                        </p>
                        <p className="text-neutral-700 leading-relaxed mb-2">
                          <strong>Examples:</strong>
                        </p>
                        <ul className="list-disc pl-6 space-y-1 text-neutral-700 mb-2">
                          <li>LinkedIn share button cookies</li>
                          <li>Twitter integration cookies</li>
                          <li>Social login authentication cookies</li>
                        </ul>
                        <p className="text-neutral-700 leading-relaxed">
                          <strong>Can you disable them?</strong> Yes. Disabling these cookies will prevent you from sharing content on social media directly from our platform.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-primary-dark mb-4">4. Third-Party Cookies</h2>
                    <p className="text-neutral-700 leading-relaxed mb-3">
                      We use several third-party services that may set cookies on your device. These include:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-neutral-700 mb-3">
                      <li><strong>Google Analytics:</strong> Tracks user behavior and site performance</li>
                      <li><strong>Email Service Providers:</strong> Track email opens and clicks</li>
                      <li><strong>Customer Support Tools:</strong> Provide live chat and help desk functionality</li>
                      <li><strong>Advertising Platforms:</strong> Deliver targeted advertisements</li>
                    </ul>
                    <p className="text-neutral-700 leading-relaxed">
                      These third parties have their own privacy policies and cookie policies. We encourage you to review them to understand how they use cookies.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-primary-dark mb-4">5. How Long Do Cookies Last?</h2>
                    <p className="text-neutral-700 leading-relaxed mb-3">
                      Cookies can be either session cookies or persistent cookies:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-neutral-700">
                      <li><strong>Session Cookies:</strong> Temporary cookies that are deleted when you close your browser. We use these to keep you logged in during your session.</li>
                      <li><strong>Persistent Cookies:</strong> Cookies that remain on your device for a set period (ranging from days to years) or until you delete them. We use these to remember your preferences and settings.</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-primary-dark mb-4">6. Managing Your Cookie Preferences</h2>
                    <p className="text-neutral-700 leading-relaxed mb-3">
                      You have several options to manage or disable cookies:
                    </p>

                    <h3 className="text-lg font-semibold text-primary-dark mb-2">6.1 Cookie Consent Banner</h3>
                    <p className="text-neutral-700 leading-relaxed mb-3">
                      When you first visit our platform, you'll see a cookie consent banner where you can choose which types of cookies to accept. You can update your preferences at any time through the "Cookie Settings" link in the footer.
                    </p>

                    <h3 className="text-lg font-semibold text-primary-dark mb-2">6.2 Browser Settings</h3>
                    <p className="text-neutral-700 leading-relaxed mb-3">
                      Most web browsers allow you to control cookies through their settings. You can:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-neutral-700 mb-3">
                      <li>Block all cookies</li>
                      <li>Accept only first-party cookies</li>
                      <li>Delete cookies when you close your browser</li>
                      <li>Clear all existing cookies</li>
                    </ul>
                    <p className="text-neutral-700 leading-relaxed mb-3">
                      Here's how to manage cookies in popular browsers:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-neutral-700">
                      <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
                      <li><strong>Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data</li>
                      <li><strong>Safari:</strong> Preferences → Privacy → Cookies and website data</li>
                      <li><strong>Edge:</strong> Settings → Cookies and site permissions → Cookies and site data</li>
                    </ul>

                    <h3 className="text-lg font-semibold text-primary-dark mb-2 mt-4">6.3 Opt-Out Tools</h3>
                    <p className="text-neutral-700 leading-relaxed mb-3">
                      You can opt out of targeted advertising through:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-neutral-700">
                      <li><a href="http://www.aboutads.info/choices" target="_blank" className="text-primary-accent hover:underline">Digital Advertising Alliance (DAA)</a></li>
                      <li><a href="http://www.networkadvertising.org/choices" target="_blank" className="text-primary-accent hover:underline">Network Advertising Initiative (NAI)</a></li>
                      <li><a href="http://www.youronlinechoices.eu" target="_blank" className="text-primary-accent hover:underline">European Interactive Digital Advertising Alliance (EDAA)</a></li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-primary-dark mb-4">7. Impact of Disabling Cookies</h2>
                    <p className="text-neutral-700 leading-relaxed mb-3">
                      If you disable cookies, some features of our platform may not function properly:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-neutral-700">
                      <li>You may need to log in every time you visit</li>
                      <li>Your preferences and settings won't be saved</li>
                      <li>Some personalized features may not work</li>
                      <li>You may see less relevant content and recommendations</li>
                      <li>We won't be able to track and fix technical issues as effectively</li>
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-primary-dark mb-4">8. Do Not Track Signals</h2>
                    <p className="text-neutral-700 leading-relaxed">
                      Some browsers have a "Do Not Track" (DNT) feature that signals to websites that you don't want to be tracked. Currently, there is no industry standard for how to respond to DNT signals, so our platform does not respond to DNT browser settings at this time.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-primary-dark mb-4">9. Updates to This Cookie Policy</h2>
                    <p className="text-neutral-700 leading-relaxed">
                      We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our business practices. We will notify you of any material changes by posting the updated policy on this page with a new "Last Updated" date.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-primary-dark mb-4">10. More Information</h2>
                    <p className="text-neutral-700 leading-relaxed mb-3">
                      For more information about how we handle your personal data, please see our <a href="/privacy" className="text-primary-accent hover:underline">Privacy Policy</a>.
                    </p>
                    <p className="text-neutral-700 leading-relaxed">
                      To learn more about cookies in general, visit <a href="https://www.allaboutcookies.org" target="_blank" className="text-primary-accent hover:underline">www.allaboutcookies.org</a>.
                    </p>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-primary-dark mb-4">11. Contact Us</h2>
                    <p className="text-neutral-700 leading-relaxed mb-3">
                      If you have questions about our use of cookies, please contact us:
                    </p>
                    <div className="bg-neutral-100 rounded-lg p-4 text-neutral-700">
                      <p className="font-semibold mb-1">MentorMatchmaking</p>
                      <p>Email: privacy@mentormatchmaking.com</p>
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
