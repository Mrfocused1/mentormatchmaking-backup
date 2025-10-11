'use client'

import { forwardRef, ButtonHTMLAttributes, ReactElement, cloneElement, isValidElement } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: (string | undefined | null | false | 0 | ''  | object)[]) {
  return twMerge(clsx(inputs))
}

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-montserrat font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'bg-primary-accent text-primary-dark hover:bg-primary-accent/90 focus-visible:ring-primary-accent',
        secondary:
          'bg-secondary-accent text-white hover:bg-secondary-accent/90 focus-visible:ring-secondary-accent',
        outline:
          'border-2 border-vibrant-accent text-vibrant-accent hover:bg-vibrant-accent hover:text-white focus-visible:ring-vibrant-accent',
        ghost:
          'text-primary-dark hover:bg-neutral-100 focus-visible:ring-primary-dark',
        danger:
          'bg-error text-white hover:bg-error/90 focus-visible:ring-error',
        success:
          'bg-success text-white hover:bg-success/90 focus-visible:ring-success',
        soft:
          'bg-soft-accent text-primary-dark hover:bg-soft-accent/80 focus-visible:ring-soft-accent',
      },
      size: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-11 px-6 text-base',
        lg: 'h-12 px-8 text-lg',
        xl: 'h-14 px-10 text-xl',
        icon: 'h-10 w-10',
        'icon-sm': 'h-8 w-8',
        'icon-lg': 'h-12 w-12',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  }
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, loading, children, disabled, asChild = false, ...props }, ref) => {
    const buttonClasses = cn(buttonVariants({ variant, size, fullWidth, className }))

    // If asChild is true and children is a valid React element, clone it with the button props
    if (asChild && isValidElement(children)) {
      // Extract props that shouldn't be passed to DOM elements
      const { asChild: _, ...childProps } = props as any

      return cloneElement(children as ReactElement<any>, {
        className: buttonClasses,
        ref,
        disabled: disabled || loading,
        ...childProps,
      })
    }

    // Otherwise render a regular button
    return (
      <button
        className={buttonClasses}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg
            className="mr-2 h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button, buttonVariants }