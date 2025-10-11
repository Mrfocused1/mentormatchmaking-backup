'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronDown, ChevronUp } from 'lucide-react'

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [openCategories, setOpenCategories] = useState<string[]>(['general'])
  const [openQuestions, setOpenQuestions] = useState<number[]>([])

  const faqCategories = [
    {
      id: 'general',
      title: 'General Questions',
      questions: [
        {
          id: 1,
          question: 'What is MentorMatchmaking?',
          answer: 'MentorMatchmaking is a platform that connects ambitious individuals with experienced mentors across various industries. Whether you\'re navigating career transitions, seeking life guidance, or looking to grow personally and professionally, we use a matching system to help you find the perfect mentor or mentee based on your goals, interests, and where you are in your journey.'
        },
        {
          id: 2,
          question: 'How does MentorMatchmaking work?',
          answer: 'Our platform works through a mutual matching system. Mentees can browse mentor profiles and show interest, while mentors can browse mentee profiles (with privacy protection) and offer mentorship. When both parties express interest, you\'re matched and can begin your mentorship journey together.'
        },
        {
          id: 3,
          question: 'Is MentorMatchmaking free?',
          answer: 'Yes! MentorMatchmaking is 100% free to use. All features are available to everyone at no cost, including profile creation, unlimited browsing, matching, connections, messaging, and all platform resources. There are no premium tiers, subscriptions, or paid features.'
        },
        {
          id: 4,
          question: 'How do I get started?',
          answer: 'Getting started is easy! Click "Get Started" to create your account, then complete your profile as either a mentor or mentee (or both!). Tell us about your experience, goals, and what you\'re looking for. Once your profile is complete, you can start browsing and connecting with potential matches.'
        }
      ]
    },
    {
      id: 'mentees',
      title: 'For Mentees',
      questions: [
        {
          id: 5,
          question: 'How do I find the right mentor?',
          answer: 'Use our search and filter tools to find mentors in your industry of interest. Look for mentors with expertise in areas you want to develop. Read their profiles carefully, check their experience, and pay attention to their mentorship style. When you find someone who aligns with your goals, show interest by sending a personalized message.'
        },
        {
          id: 6,
          question: 'What should I include in my mentee profile?',
          answer: 'Be honest and specific about your aspirations, why you\'re seeking mentorship, and what areas you want to grow in. Share where you are in your journey—whether you\'re exploring new paths, navigating transitions, seeking motivation, or looking for life guidance. Your preferred mentorship style helps too. The more detailed and authentic you are, the better matches you\'ll receive.'
        },
        {
          id: 7,
          question: 'Can I have multiple mentors?',
          answer: 'Yes! You can connect with multiple mentors who have expertise in different areas. Many successful professionals have had multiple mentors throughout their careers. However, we recommend starting with one or two to ensure you can maintain meaningful relationships.'
        },
        {
          id: 8,
          question: 'How does communication work with my mentor?',
          answer: 'Communication happens entirely through text messaging on our platform. You can exchange messages with your mentor at scheduled times that work for both of you. Come prepared with specific questions and goals. Research your mentor\'s background, prepare talking points about your aspirations, and be ready to discuss your challenges through thoughtful messages. Most importantly, be open to feedback and willing to take action on their advice.'
        },
        {
          id: 9,
          question: 'What if a mentorship isn\'t working out?',
          answer: 'Not every match is perfect, and that\'s okay! If you feel the mentorship isn\'t beneficial, communicate openly with your mentor first. If it still doesn\'t work, you can politely end the relationship and search for a better fit. Our platform makes it easy to connect with other mentors.'
        }
      ]
    },
    {
      id: 'mentors',
      title: 'For Mentors',
      questions: [
        {
          id: 10,
          question: 'Why should I become a mentor?',
          answer: 'Mentoring is incredibly rewarding! You\'ll help shape someone\'s career, give back to your industry, develop your leadership skills, gain fresh perspectives, and expand your professional network. Many mentors find that teaching others reinforces their own knowledge and expertise.'
        },
        {
          id: 11,
          question: 'How much time does mentoring require?',
          answer: 'You decide your availability! Most mentors commit to regular messaging exchanges with their mentees, typically responding within 24-48 hours. Some prefer daily quick check-ins, while others have weekly scheduled messaging sessions. Set clear expectations upfront about your availability, response times, and communication style.'
        },
        {
          id: 12,
          question: 'What makes a good mentor?',
          answer: 'Good mentors are active listeners, ask thoughtful questions, share honest feedback, and are genuinely invested in their mentee\'s success. You don\'t need to have all the answers—sometimes the best mentoring is helping someone think through problems themselves. Consistency, empathy, and willingness to share both successes and failures are key.'
        },
        {
          id: 13,
          question: 'Can I see mentee profiles before they contact me?',
          answer: 'Yes! Mentors can browse mentee profiles with privacy-protected information (first names, age ranges, general location). You can see their career aspirations, why they\'re seeking mentorship, and skills they want to develop. This allows you to proactively offer mentorship to mentees who align with your expertise.'
        },
        {
          id: 14,
          question: 'How do I decline a mentorship request?',
          answer: 'If you receive a mentorship request that isn\'t a good fit, you can politely decline through the platform. We provide templates for respectful responses. Remember, it\'s better to decline than to commit to a mentorship you can\'t fully support.'
        }
      ]
    },
    {
      id: 'matching',
      title: 'Matching & Connections',
      questions: [
        {
          id: 15,
          question: 'How does the matching system work?',
          answer: 'Our matching system is mutual—both mentor and mentee must express interest to connect. Mentees can browse mentors and send interest requests. Mentors can browse mentees (with privacy protection) and offer mentorship. Once both parties match, you can begin messaging through the platform.'
        },
        {
          id: 16,
          question: 'What is the swipe feature?',
          answer: 'On mobile, we offer a swipe interface (like Tinder!) for browsing potential matches. Swipe left to pass, swipe right to express interest or offer mentorship. It\'s a quick, intuitive way to browse through profiles and find your perfect match.'
        },
        {
          id: 17,
          question: 'Can I unmatch with someone?',
          answer: 'Yes, if a mentorship relationship isn\'t working out, you can unmatch through your dashboard. We encourage open communication first, but understand that sometimes relationships don\'t align. Unmatching removes the connection and you won\'t see each other\'s profiles again.'
        },
        {
          id: 18,
          question: 'How long does it take to find a match?',
          answer: 'Match timing varies based on your profile completeness, industry, and activity level. Some users find matches within days, while others take a few weeks. Keep your profile updated, be specific about your goals, and actively engage with the platform to increase your chances of finding the right match.'
        }
      ]
    },
    {
      id: 'privacy',
      title: 'Privacy & Safety',
      questions: [
        {
          id: 19,
          question: 'How is my personal information protected?',
          answer: 'We take privacy seriously. Mentee profiles shown to mentors are privacy-protected (first names only, age ranges, no photos initially, no contact info). We use industry-standard encryption for all data. You control what information you share and when. Personal contact information is only shared after both parties agree to connect.'
        },
        {
          id: 20,
          question: 'Why can\'t mentors see my full profile initially?',
          answer: 'To protect all mentees and provide a safe, judgment-free space, we limit the information mentors can see before matching. Mentors see your goals, interests, and aspirations, but not your photo, CV, social media, or full name. This prevents bias and protects your identity until you choose to connect.'
        },
        {
          id: 21,
          question: 'Can I report inappropriate behavior?',
          answer: 'Absolutely. We have zero tolerance for harassment, discrimination, or inappropriate behavior. Every profile has a report button. Our team reviews all reports within 24 hours and takes appropriate action, including warnings, suspension, or permanent bans. Your safety is our priority.'
        },
        {
          id: 22,
          question: 'Should I share my contact information?',
          answer: 'We recommend keeping initial communications within the platform. Once you\'ve established trust and rapport, you can decide to share external contact information. Never feel pressured to share personal details. Professional platforms like LinkedIn are generally safer for external connections.'
        }
      ]
    },
    {
      id: 'sessions',
      title: 'Communication & Messaging',
      questions: [
        {
          id: 23,
          question: 'How does messaging-based mentorship work?',
          answer: 'All communication happens through text messaging on our platform. Start with clear goals and expectations. Set a regular cadence for message exchanges (daily check-ins, weekly conversations, etc.). Mentees should drive the conversation with questions and topics. Conclude message threads with action items and next steps. The asynchronous nature allows both parties to think through responses thoughtfully.'
        },
        {
          id: 24,
          question: 'How long are typical message exchanges?',
          answer: 'Message exchanges vary based on your preferences and availability. Some mentorship pairs prefer brief daily check-ins, while others have longer, more in-depth weekly conversations. The platform is text-based only - there are no video calls, phone calls, or voice messages. You can schedule specific times to exchange messages that work for both schedules.'
        },
        {
          id: 25,
          question: 'What should we discuss in our messages?',
          answer: 'Common topics include career development, life guidance, skill building, personal growth, navigating transitions, building confidence, work-life balance, overcoming challenges, and long-term planning. Whether you need professional advice or life support, mentees should come with specific questions. Mentors should share experiences, ask thoughtful questions through their messages, and provide honest, empathetic feedback.'
        },
        {
          id: 26,
          question: 'How do I track progress?',
          answer: 'Set specific, measurable goals at the start of your mentorship. Review progress regularly through your message history. Use our platform\'s notes feature to document key discussions and action items. Celebrate wins together and adjust goals as needed. Schedule periodic review conversations to assess if the mentorship is meeting expectations.'
        }
      ]
    },
    {
      id: 'technical',
      title: 'Technical Support',
      questions: [
        {
          id: 27,
          question: 'What browsers are supported?',
          answer: 'MentorMatchmaking works on all modern browsers including Chrome, Firefox, Safari, and Edge. We recommend keeping your browser updated for the best experience. Our mobile app is available on iOS and Android.'
        },
        {
          id: 28,
          question: 'I\'m having trouble logging in. What should I do?',
          answer: 'First, try resetting your password using the "Forgot Password" link. Clear your browser cache and cookies. Make sure you\'re using the correct email address. If problems persist, contact our support team at support@mentormatchmaking.com.'
        },
        {
          id: 29,
          question: 'Can I delete my account?',
          answer: 'Yes, you can delete your account at any time from your account settings. This will permanently remove your profile, matches, and messages. Active mentorship relationships will be notified. Please note that deletion is permanent and cannot be undone.'
        },
        {
          id: 30,
          question: 'How do I update my profile?',
          answer: 'Click on your profile icon and select "Edit Profile" to update your information. Keep your profile current with your latest experience, goals, and availability. Regular updates help improve match quality and show active engagement on the platform.'
        }
      ]
    }
  ]

  const toggleCategory = (categoryId: string) => {
    setOpenCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const toggleQuestion = (questionId: number) => {
    setOpenQuestions(prev =>
      prev.includes(questionId)
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId]
    )
  }

  // Filter FAQs based on search
  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(q =>
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0)

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-primary-dark pt-24 pb-16 sm:pt-32 sm:pb-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-black font-montserrat tracking-tight text-white sm:text-5xl mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-white/90 font-montserrat mb-8">
            Everything you need to know about MentorMatchmaking
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-4 rounded-lg border-0 font-montserrat text-primary-dark placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-accent shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          {searchQuery && filteredCategories.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-2">
                  No results found
                </h3>
                <p className="text-neutral-600 font-montserrat mb-6">
                  We couldn't find any FAQs matching "{searchQuery}"
                </p>
                <Button
                  variant="outline"
                  onClick={() => setSearchQuery('')}
                  className="border-primary-accent text-primary-accent hover:bg-primary-accent hover:text-primary-dark"
                >
                  Clear Search
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-8">
              {filteredCategories.map((category) => (
                <Card key={category.id} className="shadow-lg border-neutral-200 overflow-hidden">
                  <button
                    onClick={() => toggleCategory(category.id)}
                    className="w-full px-6 py-5 flex items-center justify-between hover:bg-neutral-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <h2 className="text-xl font-bold font-montserrat text-primary-dark">
                        {category.title}
                      </h2>
                      <span className="text-sm font-semibold font-montserrat text-neutral-500">
                        ({category.questions.length})
                      </span>
                    </div>
                    {openCategories.includes(category.id) ? (
                      <ChevronUp className="h-6 w-6 text-neutral-600" />
                    ) : (
                      <ChevronDown className="h-6 w-6 text-neutral-600" />
                    )}
                  </button>

                  {openCategories.includes(category.id) && (
                    <CardContent className="px-6 pb-6 pt-0">
                      <div className="space-y-3">
                        {category.questions.map((faq) => (
                          <Card
                            key={faq.id}
                            className="border border-neutral-200 hover:border-primary-accent transition-colors"
                          >
                            <button
                              onClick={() => toggleQuestion(faq.id)}
                              className="w-full px-5 py-4 flex items-start justify-between text-left hover:bg-neutral-50 transition-colors"
                            >
                              <h3 className="text-base font-semibold font-montserrat text-primary-dark pr-4 flex-1">
                                {faq.question}
                              </h3>
                              {openQuestions.includes(faq.id) ? (
                                <ChevronUp className="h-5 w-5 text-primary-accent flex-shrink-0 mt-0.5" />
                              ) : (
                                <ChevronDown className="h-5 w-5 text-neutral-600 flex-shrink-0 mt-0.5" />
                              )}
                            </button>

                            {openQuestions.includes(faq.id) && (
                              <div className="px-5 pb-4 pt-0">
                                <p className="text-sm text-neutral-700 font-montserrat leading-relaxed">
                                  {faq.answer}
                                </p>
                              </div>
                            )}
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          )}

          {/* Still Have Questions Section */}
          <Card className="mt-12 bg-primary-dark border-0 shadow-xl">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold font-montserrat text-white mb-3">
                Still Have Questions?
              </h3>
              <p className="text-white/90 font-montserrat mb-6 max-w-2xl mx-auto">
                Can't find the answer you're looking for? Our support team is here to help you with any questions or concerns.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  variant="primary"
                  className="bg-white text-primary-dark hover:bg-neutral-100"
                  asChild
                >
                  <a href="/contact">Contact Support</a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-primary-dark"
                  asChild
                >
                  <a href="mailto:support@mentormatchmaking.com">Email Us</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}
