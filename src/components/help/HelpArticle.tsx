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
          <div className="flex items-center gap-2 text-sm sm:text-sm font-montserrat text-neutral-600 mb-6 flex-wrap">
            <Link
              href="/help"
              className="hover:text-primary-accent active:text-primary-accent transition-colors py-2 px-1 -ml-1 rounded"
            >
              Help Center
            </Link>
            <span className="text-neutral-400">/</span>
            <span className="text-neutral-400 py-2 truncate max-w-[120px] sm:max-w-none">{category}</span>
            <span className="text-neutral-400">/</span>
            <span className="text-primary-dark font-semibold py-2 truncate max-w-[120px] sm:max-w-none">{title}</span>
          </div>

          {/* Back Button */}
          <Button
            variant="outline"
            size="md"
            onClick={() => router.back()}
            className="mb-6 sm:h-9 sm:px-3 sm:text-sm"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Help Center
          </Button>

          {/* Article Header */}
          <div className="mb-8">
            <div className="mb-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black font-montserrat text-primary-dark mb-3 leading-tight">
                {title}
              </h1>
              <p className="text-base sm:text-lg text-neutral-600 font-montserrat leading-relaxed">
                {description}
              </p>
            </div>
            {interactiveSteps && interactiveSteps.length > 0 && (
              <Button
                variant="primary"
                size="lg"
                onClick={startInteractiveTour}
                className="bg-secondary-accent hover:bg-secondary-accent/90 active:bg-secondary-accent/80 text-white w-full sm:w-auto"
              >
                <Play className="h-5 w-5 mr-2" />
                Start Interactive Guide
              </Button>
            )}
            <div className="flex items-center gap-2 mt-4">
              <span className="inline-block px-4 py-2 sm:px-3 sm:py-1 bg-primary-accent/10 text-primary-accent rounded-full text-sm sm:text-sm font-semibold font-montserrat">
                {category}
              </span>
            </div>
          </div>

          {/* Article Content */}
          <Card className="shadow-lg mb-8">
            <CardContent className="p-5 sm:p-6 md:p-8 prose prose-base sm:prose-lg max-w-none">
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
                    className="p-5 sm:p-4 border-2 sm:border border-neutral-200 rounded-lg hover:border-primary-accent hover:bg-primary-accent/5 active:bg-primary-accent/10 transition-colors group min-h-[72px] flex items-center"
                  >
                    <p className="font-semibold font-montserrat text-primary-dark group-hover:text-primary-accent text-sm sm:text-base">
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
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex gap-3 flex-1">
                <Button variant="outline" size="md" className="flex-1 sm:flex-none sm:h-9 sm:px-3 sm:text-sm">
                  👍 Yes
                </Button>
                <Button variant="outline" size="md" className="flex-1 sm:flex-none sm:h-9 sm:px-3 sm:text-sm">
                  👎 No
                </Button>
              </div>
              <Button
                variant="primary"
                size="md"
                asChild
                className="w-full sm:w-auto sm:h-9 sm:px-3 sm:text-sm bg-primary-accent hover:bg-primary-accent/90 active:bg-primary-accent/80 text-primary-dark"
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
