import { cn } from '@/lib/utils'

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const sizeClasses = {
  sm: 'h-4 w-4 border-2',
  md: 'h-8 w-8 border-2',
  lg: 'h-12 w-12 border-3',
  xl: 'h-16 w-16 border-4',
}

export function Spinner({ size = 'md', className }: SpinnerProps) {
  return (
    <div
      className={cn(
        'animate-spin rounded-full border-primary-accent border-t-transparent',
        sizeClasses[size],
        className
      )}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export function LoadingSpinner({
  text = 'Loading...',
  size = 'md'
}: {
  text?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <Spinner size={size} />
      <p className="text-sm font-montserrat text-neutral-600">{text}</p>
    </div>
  )
}

export function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <LoadingSpinner text="Loading..." size="lg" />
    </div>
  )
}

export function InlineLoader({ text }: { text?: string }) {
  return (
    <div className="flex items-center gap-3 py-2">
      <Spinner size="sm" />
      {text && <span className="text-sm font-montserrat text-neutral-600">{text}</span>}
    </div>
  )
}
