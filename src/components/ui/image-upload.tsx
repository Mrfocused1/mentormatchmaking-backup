'use client'

import { useState, useRef, ChangeEvent } from 'react'
import { Upload, X, Image as ImageIcon, Camera } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from './button'

interface ImageUploadProps {
  value?: string
  onChange: (file: File | null, preview: string | null) => void
  maxSizeMB?: number
  className?: string
  variant?: 'avatar' | 'banner' | 'document'
  disabled?: boolean
}

export function ImageUpload({
  value,
  onChange,
  maxSizeMB = 5,
  className,
  variant = 'avatar',
  disabled = false,
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(value || null)
  const [error, setError] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const maxSizeBytes = maxSizeMB * 1024 * 1024

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    processFile(file)
  }

  const processFile = (file?: File) => {
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file')
      return
    }

    // Validate file size
    if (file.size > maxSizeBytes) {
      setError(`File size must be less than ${maxSizeMB}MB`)
      return
    }

    setError(null)

    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      const previewUrl = reader.result as string
      setPreview(previewUrl)
      onChange(file, previewUrl)
    }
    reader.readAsDataURL(file)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    if (!disabled) setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (disabled) return

    const file = e.dataTransfer.files[0]
    processFile(file)
  }

  const handleRemove = () => {
    setPreview(null)
    setError(null)
    onChange(null, null)
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  const handleClick = () => {
    if (!disabled) {
      inputRef.current?.click()
    }
  }

  // Avatar variant (circular, small)
  if (variant === 'avatar') {
    return (
      <div className={cn('flex flex-col items-center gap-4', className)}>
        <div className="relative">
          <div
            onClick={handleClick}
            className={cn(
              'relative w-32 h-32 rounded-full border-2 border-dashed cursor-pointer overflow-hidden transition-all',
              isDragging ? 'border-primary-accent bg-primary-accent/10' : 'border-neutral-300 hover:border-primary-accent',
              disabled && 'opacity-50 cursor-not-allowed',
              preview && 'border-solid'
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-neutral-400">
                <Camera className="h-8 w-8 mb-2" />
                <span className="text-xs font-montserrat">Upload</span>
              </div>
            )}
          </div>
          {preview && !disabled && (
            <button
              onClick={handleRemove}
              className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              type="button"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          disabled={disabled}
        />
        {error && (
          <p className="text-sm text-red-600 font-montserrat">{error}</p>
        )}
        <p className="text-xs text-neutral-500 font-montserrat text-center">
          Max {maxSizeMB}MB • JPG, PNG, GIF
        </p>
      </div>
    )
  }

  // Banner variant (wide, rectangular)
  if (variant === 'banner') {
    return (
      <div className={cn('w-full', className)}>
        <div
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            'relative w-full h-48 rounded-lg border-2 border-dashed cursor-pointer overflow-hidden transition-all',
            isDragging ? 'border-primary-accent bg-primary-accent/10' : 'border-neutral-300 hover:border-primary-accent',
            disabled && 'opacity-50 cursor-not-allowed',
            preview && 'border-solid'
          )}
        >
          {preview ? (
            <>
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
              {!disabled && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleRemove()
                  }}
                  className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  type="button"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-neutral-400">
              <ImageIcon className="h-12 w-12 mb-2" />
              <p className="text-sm font-montserrat mb-1">Click to upload or drag and drop</p>
              <p className="text-xs text-neutral-500 font-montserrat">Max {maxSizeMB}MB • JPG, PNG, GIF</p>
            </div>
          )}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          disabled={disabled}
        />
        {error && (
          <p className="text-sm text-red-600 font-montserrat mt-2">{error}</p>
        )}
      </div>
    )
  }

  // Document variant (compact, with filename)
  return (
    <div className={cn('w-full', className)}>
      <div
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          'relative w-full p-6 rounded-lg border-2 border-dashed cursor-pointer transition-all',
          isDragging ? 'border-primary-accent bg-primary-accent/10' : 'border-neutral-300 hover:border-primary-accent',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      >
        {preview ? (
          <div className="flex items-center gap-4">
            <img
              src={preview}
              alt="Preview"
              className="w-16 h-16 rounded object-cover"
            />
            <div className="flex-1">
              <p className="text-sm font-medium font-montserrat text-primary-dark">Image uploaded</p>
              <p className="text-xs text-neutral-500 font-montserrat">Click to change</p>
            </div>
            {!disabled && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleRemove()
                }}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                type="button"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center text-center">
            <Upload className="h-10 w-10 text-neutral-400 mb-2" />
            <p className="text-sm font-montserrat text-neutral-700 mb-1">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-neutral-500 font-montserrat">
              Max {maxSizeMB}MB • JPG, PNG, GIF
            </p>
          </div>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        disabled={disabled}
      />
      {error && (
        <p className="text-sm text-red-600 font-montserrat mt-2">{error}</p>
      )}
    </div>
  )
}
