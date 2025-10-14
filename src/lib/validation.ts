// Form validation utilities for frontend validation

export interface ValidationResult {
  isValid: boolean
  errors: Record<string, string>
}

// Email validation
export function validateEmail(email: string): string | null {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!email || email.trim() === '') {
    return 'Email is required'
  }

  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address'
  }

  return null
}

// Password validation
export function validatePassword(password: string): string | null {
  if (!password || password.trim() === '') {
    return 'Password is required'
  }

  if (password.length < 8) {
    return 'Password must be at least 8 characters'
  }

  if (!/(?=.*[a-z])/.test(password)) {
    return 'Password must contain at least one lowercase letter'
  }

  if (!/(?=.*[A-Z])/.test(password)) {
    return 'Password must contain at least one uppercase letter'
  }

  if (!/(?=.*\d)/.test(password)) {
    return 'Password must contain at least one number'
  }

  return null
}

// Name validation
export function validateName(name: string, fieldName = 'Name'): string | null {
  if (!name || name.trim() === '') {
    return `${fieldName} is required`
  }

  if (name.trim().length < 2) {
    return `${fieldName} must be at least 2 characters`
  }

  if (name.trim().length > 50) {
    return `${fieldName} must be less than 50 characters`
  }

  return null
}

// Phone number validation (basic)
export function validatePhone(phone: string): string | null {
  if (!phone || phone.trim() === '') {
    return null // Phone is optional in most cases
  }

  // Remove all non-numeric characters
  const cleanPhone = phone.replace(/\D/g, '')

  if (cleanPhone.length < 10) {
    return 'Please enter a valid phone number'
  }

  return null
}

// URL validation
export function validateUrl(url: string, fieldName = 'URL'): string | null {
  if (!url || url.trim() === '') {
    return null // URLs are usually optional
  }

  try {
    new URL(url)
    return null
  } catch {
    return `Please enter a valid ${fieldName}`
  }
}

// Required field validation
export function validateRequired(value: string, fieldName = 'This field'): string | null {
  if (!value || value.trim() === '') {
    return `${fieldName} is required`
  }
  return null
}

// Text length validation
export function validateLength(
  value: string,
  min: number,
  max: number,
  fieldName = 'This field'
): string | null {
  if (!value) return null

  const length = value.trim().length

  if (length < min) {
    return `${fieldName} must be at least ${min} characters`
  }

  if (length > max) {
    return `${fieldName} must be less than ${max} characters`
  }

  return null
}

// Number range validation
export function validateNumberRange(
  value: number | string,
  min: number,
  max: number,
  fieldName = 'Value'
): string | null {
  const num = typeof value === 'string' ? parseFloat(value) : value

  if (isNaN(num)) {
    return `${fieldName} must be a valid number`
  }

  if (num < min) {
    return `${fieldName} must be at least ${min}`
  }

  if (num > max) {
    return `${fieldName} must be at most ${max}`
  }

  return null
}

// File size validation
export function validateFileSize(file: File, maxSizeMB: number): string | null {
  const maxSizeBytes = maxSizeMB * 1024 * 1024

  if (file.size > maxSizeBytes) {
    return `File size must be less than ${maxSizeMB}MB`
  }

  return null
}

// File type validation
export function validateFileType(file: File, allowedTypes: string[]): string | null {
  const fileType = file.type

  if (!allowedTypes.some(type => fileType.startsWith(type))) {
    return `File type not allowed. Allowed types: ${allowedTypes.join(', ')}`
  }

  return null
}

// LinkedIn URL validation
export function validateLinkedInUrl(url: string): string | null {
  if (!url || url.trim() === '') {
    return null
  }

  if (!url.includes('linkedin.com')) {
    return 'Please enter a valid LinkedIn URL'
  }

  return validateUrl(url, 'LinkedIn URL')
}

// Twitter handle validation
export function validateTwitterHandle(handle: string): string | null {
  if (!handle || handle.trim() === '') {
    return null
  }

  // Remove @ if present
  const cleanHandle = handle.replace('@', '')

  if (cleanHandle.length < 1 || cleanHandle.length > 15) {
    return 'Twitter handle must be 1-15 characters'
  }

  if (!/^[a-zA-Z0-9_]+$/.test(cleanHandle)) {
    return 'Twitter handle can only contain letters, numbers, and underscores'
  }

  return null
}

// Facebook URL validation
export function validateFacebookUrl(url: string): string | null {
  if (!url || url.trim() === '') {
    return null
  }

  if (!url.includes('facebook.com') && !url.includes('fb.com')) {
    return 'Please enter a valid Facebook URL'
  }

  return validateUrl(url, 'Facebook URL')
}

// Generic form validation helper
export function validateForm<T extends Record<string, any>>(
  data: T,
  validators: Record<keyof T, (value: any) => string | null>
): ValidationResult {
  const errors: Record<string, string> = {}
  let isValid = true

  for (const field in validators) {
    const error = validators[field](data[field])
    if (error) {
      errors[field] = error
      isValid = false
    }
  }

  return { isValid, errors }
}
