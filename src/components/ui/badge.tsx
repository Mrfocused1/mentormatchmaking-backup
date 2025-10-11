import { HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: (string | undefined | null | false | 0 | ''  | object)[]) {
  return twMerge(clsx(inputs))
}

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold font-montserrat transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-primary-accent/10 text-primary-accent',
        secondary: 'bg-secondary-accent/10 text-secondary-accent',
        success: 'bg-success/10 text-success',
        error: 'bg-error/10 text-error',
        warning: 'bg-warning/10 text-warning',
        info: 'bg-info/10 text-info',
        verified: 'bg-vibrant-accent text-white',
        new: 'bg-secondary-accent text-white',
        premium: 'bg-secondary-accent text-white',
        outline: 'border border-neutral-300 text-neutral-700',
      },
      size: {
        sm: 'text-xs px-2 py-0.5',
        md: 'text-sm px-2.5 py-0.5',
        lg: 'text-base px-3 py-1',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

export interface BadgeProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode
}

function Badge({ className, variant, size, icon, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {icon && <span className="mr-1">{icon}</span>}
      {children}
    </div>
  )
}

// Status Badge Component
export interface StatusBadgeProps extends HTMLAttributes<HTMLDivElement> {
  status: 'active' | 'not-accepting' | 'paused' | 'private' | 'online' | 'offline'
}

function StatusBadge({ status, className, ...props }: StatusBadgeProps) {
  const statusConfig = {
    active: {
      variant: 'success' as const,
      label: 'Active',
      icon: '●',
    },
    'not-accepting': {
      variant: 'warning' as const,
      label: 'Not Accepting',
      icon: '⚠',
    },
    paused: {
      variant: 'secondary' as const,
      label: 'Paused',
      icon: '⏸',
    },
    private: {
      variant: 'outline' as const,
      label: 'Private',
      icon: '🔒',
    },
    online: {
      variant: 'success' as const,
      label: 'Online',
      icon: '●',
    },
    offline: {
      variant: 'outline' as const,
      label: 'Offline',
      icon: '○',
    },
  }

  const config = statusConfig[status]

  return (
    <Badge variant={config.variant} className={className} {...props}>
      <span className="mr-1 text-xs">{config.icon}</span>
      {config.label}
    </Badge>
  )
}

// Experience Badge Component
export interface ExperienceBadgeProps extends HTMLAttributes<HTMLDivElement> {
  level: 'entry' | 'mid' | 'senior' | 'executive'
}

function ExperienceBadge({ level, className, ...props }: ExperienceBadgeProps) {
  const levelConfig = {
    entry: {
      variant: 'info' as const,
      label: 'Entry (0-3 yrs)',
    },
    mid: {
      variant: 'default' as const,
      label: 'Mid (3-7 yrs)',
    },
    senior: {
      variant: 'secondary' as const,
      label: 'Senior (7-15 yrs)',
    },
    executive: {
      variant: 'premium' as const,
      label: 'Executive (15+ yrs)',
    },
  }

  const config = levelConfig[level]

  return (
    <Badge variant={config.variant} className={className} {...props}>
      {config.label}
    </Badge>
  )
}

// Notification Badge Component
export interface NotificationBadgeProps extends HTMLAttributes<HTMLDivElement> {
  count: number
}

function NotificationBadge({ count, className, ...props }: NotificationBadgeProps) {
  if (count === 0) return null

  const displayCount = count > 99 ? '99+' : count.toString()

  return (
    <div
      className={cn(
        'inline-flex items-center justify-center rounded-full bg-secondary-accent text-white',
        'min-w-[20px] h-[20px] px-1.5 text-xs font-bold font-montserrat',
        className
      )}
      {...props}
    >
      {displayCount}
    </div>
  )
}

export { Badge, badgeVariants, StatusBadge, ExperienceBadge, NotificationBadge }