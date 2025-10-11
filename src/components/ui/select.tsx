'use client'

import { forwardRef, SelectHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  helperText?: string
  options: SelectOption[]
  placeholder?: string
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, helperText, options, placeholder, id, ...props }, ref) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="mb-1.5 block text-sm font-medium font-montserrat text-primary-dark"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            id={selectId}
            className={cn(
              'flex h-11 w-full appearance-none rounded-md border border-neutral-300 bg-white px-3 py-2 pr-10 text-base font-montserrat transition-colors duration-200',
              'focus:border-vibrant-accent focus:outline-none focus:ring-2 focus:ring-vibrant-accent/20',
              'disabled:cursor-not-allowed disabled:opacity-50',
              error && 'border-error focus:border-error focus:ring-error/20',
              !props.value && !props.defaultValue && 'text-neutral-400',
              className
            )}
            ref={ref}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
                className="text-primary-dark"
              >
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
        </div>
        {error && (
          <p className="mt-1.5 text-sm text-error font-montserrat">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1.5 text-sm text-neutral-600 font-montserrat">{helperText}</p>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'

// Multi-Select Component (using checkboxes)
export interface MultiSelectProps {
  label?: string
  error?: string
  helperText?: string
  options: SelectOption[]
  value: string[]
  onChange: (value: string[]) => void
  className?: string
}

export function MultiSelect({
  label,
  error,
  helperText,
  options,
  value,
  onChange,
  className,
}: MultiSelectProps) {
  const handleChange = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter((v) => v !== optionValue))
    } else {
      onChange([...value, optionValue])
    }
  }

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label className="mb-2 block text-sm font-medium font-montserrat text-primary-dark">
          {label}
        </label>
      )}
      <div className="space-y-2 rounded-md border border-neutral-300 p-3">
        {options.map((option) => (
          <label
            key={option.value}
            className={cn(
              'flex items-center space-x-2 cursor-pointer hover:bg-neutral-50 p-1 rounded',
              option.disabled && 'cursor-not-allowed opacity-50'
            )}
          >
            <input
              type="checkbox"
              value={option.value}
              checked={value.includes(option.value)}
              onChange={() => handleChange(option.value)}
              disabled={option.disabled}
              className="h-4 w-4 rounded border-neutral-300 text-vibrant-accent focus:ring-vibrant-accent"
            />
            <span className="text-sm font-montserrat text-primary-dark">
              {option.label}
            </span>
          </label>
        ))}
      </div>
      {error && (
        <p className="mt-1.5 text-sm text-error font-montserrat">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1.5 text-sm text-neutral-600 font-montserrat">{helperText}</p>
      )}
    </div>
  )
}

export { Select }