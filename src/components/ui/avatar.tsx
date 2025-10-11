'use client'

import { useState } from 'react'
import Image from 'next/image'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { cva, type VariantProps } from 'class-variance-authority'

function cn(...inputs: (string | undefined | null | false | 0 | ''  | object)[]) {
  return twMerge(clsx(inputs))
}

const avatarVariants = cva(
  'relative inline-block overflow-hidden rounded-full bg-neutral-200 flex-shrink-0',
  {
    variants: {
      size: {
        xs: 'h-8 w-8',
        sm: 'h-10 w-10',
        md: 'h-12 w-12',
        lg: 'h-16 w-16',
        xl: 'h-20 w-20',
        '2xl': 'h-24 w-24',
        '3xl': 'h-32 w-32',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

export interface AvatarProps extends VariantProps<typeof avatarVariants> {
  src?: string | null
  alt?: string
  fallback?: string
  className?: string
  verified?: boolean
  online?: boolean
}

export function Avatar({ src, alt = 'Avatar', fallback, size, className, verified, online }: AvatarProps) {
  const [imageError, setImageError] = useState(false)

  const initials = fallback
    ? fallback
        .split(' ')
        .map((word) => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : '?'

  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl',
    xl: 'text-2xl',
    '2xl': 'text-3xl',
    '3xl': 'text-4xl',
  }

  const textSize = sizeClasses[size || 'md']

  return (
    <div className={cn(avatarVariants({ size }), className)}>
      {src && !imageError ? (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-soft-accent">
          <span className={cn('font-montserrat font-semibold text-primary-dark', textSize)}>
            {initials}
          </span>
        </div>
      )}

      {/* Verified Badge */}
      {verified && (
        <div className="absolute -bottom-0.5 -right-0.5 rounded-full bg-white p-0.5">
          <div className="flex h-4 w-4 items-center justify-center rounded-full bg-vibrant-accent">
            <svg
              className="h-3 w-3 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      )}

      {/* Online Indicator */}
      {online !== undefined && (
        <div className="absolute bottom-0 right-0 rounded-full bg-white p-0.5">
          <div
            className={cn(
              'h-3 w-3 rounded-full',
              online ? 'bg-success' : 'bg-neutral-400'
            )}
          />
        </div>
      )}
    </div>
  )
}

// Avatar Group Component
export interface AvatarGroupProps {
  avatars: AvatarProps[]
  max?: number
  size?: AvatarProps['size']
  className?: string
}

export function AvatarGroup({ avatars, max = 3, size = 'sm', className }: AvatarGroupProps) {
  const displayAvatars = avatars.slice(0, max)
  const remainingCount = avatars.length - max

  return (
    <div className={cn('flex -space-x-2', className)}>
      {displayAvatars.map((avatar, index) => (
        <div
          key={index}
          className="relative ring-2 ring-white rounded-full"
          style={{ zIndex: max - index }}
        >
          <Avatar {...avatar} size={size} />
        </div>
      ))}
      {remainingCount > 0 && (
        <div
          className={cn(
            avatarVariants({ size }),
            'relative ring-2 ring-white flex items-center justify-center bg-neutral-200'
          )}
          style={{ zIndex: 0 }}
        >
          <span className="text-xs font-montserrat font-semibold text-neutral-700">
            +{remainingCount}
          </span>
        </div>
      )}
    </div>
  )
}