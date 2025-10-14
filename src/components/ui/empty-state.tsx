import { LucideIcon } from 'lucide-react'
import { Button } from './button'
import { cn } from '@/lib/utils'

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
  className?: string
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-12 px-6 text-center', className)}>
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-neutral-100 mb-4">
        <Icon className="h-8 w-8 text-neutral-400" />
      </div>
      <h3 className="text-xl font-bold font-montserrat text-primary-dark mb-2">
        {title}
      </h3>
      <p className="text-neutral-600 font-montserrat max-w-md mb-6">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button variant="primary" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  )
}

export function EmptyStateCard({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="bg-neutral-50 border-2 border-dashed border-neutral-300 rounded-lg p-8">
      <EmptyState
        icon={Icon}
        title={title}
        description={description}
        actionLabel={actionLabel}
        onAction={onAction}
      />
    </div>
  )
}
