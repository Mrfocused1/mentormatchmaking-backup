'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, Play, BookOpen } from 'lucide-react'

export interface HelpStep {
  element?: string
  popover: {
    title: string
    description: string
    side?: 'top' | 'right' | 'bottom' | 'left'
    align?: 'start' | 'center' | 'end'
  }
}

export interface HelpArticleProps {
  title: string
  category: string
  description: string
  content: React.ReactNode
  interactiveSteps?: HelpStep[]
  relatedArticles?: Array<{ title: string; href: string }>
}

export function HelpArticle({
  title,
  category,
  description,
  content,
  interactiveSteps,
  relatedArticles
}: HelpArticleProps) {
  const router = useRouter()

  const startInteractiveTour = () => {
    if (!interactiveSteps || interactiveSteps.length === 0) return

    const driverObj = driver({
      showProgress: true,
      steps: interactiveSteps.map(step => ({
        element: step.element,
        popover: {
          title: step.popover.title,
          description: step.popover.description,
          side: step.popover.side || 'bottom',
          align: step.popover.align || 'start'
        }
      })),
      onDestroyStarted: () => {
        driverObj.destroy()
      },
    })

    driverObj.drive()
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />

      <div className="pt-24 pb-16">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm font-montserrat text-neutral-600 mb-6">
            <Link href="/help" className="hover:text-primary-accent transition-colors">
              Help Center
            </Link>
            <span>/</span>
            <span className="text-neutral-400">{category}</span>
            <span>/</span>
            <span className="text-primary-dark font-semibold">{title}</span>
          </div>

          {/* Back Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.back()}
            className="mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Help Center
          </Button>

          {/* Article Header */}
          <div className="mb-8">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h1 className="text-4xl font-black font-montserrat text-primary-dark mb-3">
                  {title}
                </h1>
                <p className="text-lg text-neutral-600 font-montserrat">
                  {description}
                </p>
              </div>
              {interactiveSteps && interactiveSteps.length > 0 && (
                <Button
                  variant="primary"
                  size="lg"
                  onClick={startInteractiveTour}
                  className="bg-secondary-accent hover:bg-secondary-accent/90 text-white flex-shrink-0"
                >
                  <Play className="h-5 w-5 mr-2" />
                  Start Interactive Guide
                </Button>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-primary-accent/10 text-primary-accent rounded-full text-sm font-semibold font-montserrat">
                {category}
              </span>
            </div>
          </div>

          {/* Article Content */}
          <Card className="shadow-lg mb-8">
            <CardContent className="p-8 prose prose-lg max-w-none">
              {content}
            </CardContent>
          </Card>

          {/* Related Articles */}
          {relatedArticles && relatedArticles.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold font-montserrat text-primary-dark mb-6 flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-primary-accent" />
                Related Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {relatedArticles.map((article, index) => (
                  <Link
                    key={index}
                    href={article.href}
                    className="p-4 border border-neutral-200 rounded-lg hover:border-primary-accent hover:bg-primary-accent/5 transition-colors group"
                  >
                    <p className="font-semibold font-montserrat text-primary-dark group-hover:text-primary-accent">
                      {article.title}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Help Footer */}
          <div className="mt-12 p-6 bg-white border border-neutral-200 rounded-lg">
            <h3 className="text-lg font-bold font-montserrat text-primary-dark mb-2">
              Was this article helpful?
            </h3>
            <p className="text-sm text-neutral-600 font-montserrat mb-4">
              Let us know if you found this guide useful or if you need more help.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" size="sm">
                👍 Yes
              </Button>
              <Button variant="outline" size="sm">
                👎 No
              </Button>
              <Button
                variant="primary"
                size="sm"
                asChild
                className="ml-auto bg-primary-accent hover:bg-primary-accent/90 text-primary-dark"
              >
                <Link href="/contact">Contact Support</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
