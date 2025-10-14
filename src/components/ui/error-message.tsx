import { AlertCircle, XCircle, AlertTriangle, RefreshCw } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from './button'

interface ErrorMessageProps {
  title?: string
  message: string
  variant?: 'error' | 'warning' | 'info'
  onRetry?: () => void
  className?: string
}

export function ErrorMessage({
  title,
  message,
  variant = 'error',
  onRetry,
  className,
}: ErrorMessageProps) {
  const Icon = variant === 'error' ? XCircle : variant === 'warning' ? AlertTriangle : AlertCircle

  const colorClasses = {
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
  }

  const iconColorClasses = {
    error: 'text-red-500',
    warning: 'text-yellow-500',
    info: 'text-blue-500',
  }

  return (
    <div
      className={cn(
        'rounded-lg border-2 p-4',
        colorClasses[variant],
        className
      )}
      role="alert"
    >
      <div className="flex items-start gap-3">
        <Icon className={cn('h-5 w-5 flex-shrink-0 mt-0.5', iconColorClasses[variant])} />
        <div className="flex-1">
          {title && (
            <h3 className="font-semibold font-montserrat mb-1">{title}</h3>
          )}
          <p className="text-sm font-montserrat">{message}</p>
          {onRetry && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onRetry}
              className="mt-3 h-8 px-3"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export function PageError({
  title = 'Something went wrong',
  message = 'An unexpected error occurred. Please try again.',
  onRetry,
}: {
  title?: string
  message?: string
  onRetry?: () => void
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-6">
          <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold font-montserrat text-primary-dark mb-2">
            {title}
          </h1>
          <p className="text-neutral-600 font-montserrat">{message}</p>
        </div>
        {onRetry && (
          <Button
            variant="primary"
            size="lg"
            onClick={onRetry}
            className="w-full"
          >
            <RefreshCw className="h-5 w-5 mr-2" />
            Try Again
          </Button>
        )}
      </div>
    </div>
  )
}

export function InlineError({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="flex items-center gap-2 text-sm text-red-600 font-montserrat py-2">
      <AlertCircle className="h-4 w-4 flex-shrink-0" />
      <span>{message}</span>
      {onRetry && (
        <button
          onClick={onRetry}
          className="ml-auto underline hover:no-underline"
        >
          Retry
        </button>
      )}
    </div>
  )
}
