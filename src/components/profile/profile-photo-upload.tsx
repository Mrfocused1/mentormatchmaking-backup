'use client'

import { useState, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Upload, Loader2, X, Check } from 'lucide-react'

interface ProfilePhotoUploadProps {
  currentPhotoUrl?: string
  userId: string
  userName: string
  onUploadSuccess?: (url: string) => void
}

export function ProfilePhotoUpload({
  currentPhotoUrl,
  userId,
  userName,
  onUploadSuccess,
}: ProfilePhotoUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentPhotoUrl || null)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const supabase = createClient()

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB')
      return
    }

    try {
      setUploading(true)
      setUploadSuccess(false)

      // Create a preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string)
      }
      reader.readAsDataURL(file)

      // Upload to Supabase Storage
      const fileExt = file.name.split('.').pop()
      const fileName = `${userId}-${Date.now()}.${fileExt}`
      const filePath = `profile-pictures/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('profile-photos')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        })

      if (uploadError) {
        throw uploadError
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('profile-photos')
        .getPublicUrl(filePath)

      // Update user profile in database
      const response = await fetch('/api/profile/me', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profilePicture: publicUrl,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update profile')
      }

      setUploadSuccess(true)
      onUploadSuccess?.(publicUrl)

      // Hide success message after 3 seconds
      setTimeout(() => setUploadSuccess(false), 3000)
    } catch (error) {
      console.error('Error uploading photo:', error)
      alert(error instanceof Error ? error.message : 'Failed to upload photo')
      setPreviewUrl(currentPhotoUrl || null) // Revert to original
    } finally {
      setUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleRemovePhoto = async () => {
    if (!confirm('Are you sure you want to remove your profile photo?')) {
      return
    }

    try {
      setUploading(true)

      // Update profile to remove photo
      const response = await fetch('/api/profile/me', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profilePicture: null,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update profile')
      }

      setPreviewUrl(null)
      onUploadSuccess?.(null as any)
      alert('Profile photo removed successfully')
    } catch (error) {
      console.error('Error removing photo:', error)
      alert('Failed to remove photo')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="flex items-center gap-6">
      <div className="relative h-24 w-24 flex-shrink-0">
        {previewUrl ? (
          <img
            src={previewUrl}
            alt={userName}
            className="h-24 w-24 rounded-full object-cover border-4 border-primary-accent"
          />
        ) : (
          <div className="h-24 w-24 rounded-full bg-primary-accent/20 flex items-center justify-center text-2xl font-bold text-primary-dark border-4 border-neutral-200">
            {userName?.charAt(0).toUpperCase() || 'U'}
          </div>
        )}
        {uploading && (
          <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
            <Loader2 className="h-8 w-8 text-white animate-spin" />
          </div>
        )}
      </div>

      <div className="flex-1">
        <p className="text-sm text-neutral-600 font-montserrat mb-3">
          Upload a professional photo that represents you well. This will be visible to all users.
        </p>
        <p className="text-xs text-neutral-500 font-montserrat mb-3">
          Recommended: Square image, at least 400x400px, max 5MB. Formats: JPG, PNG, GIF
        </p>

        <div className="flex gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />

          <Button
            variant="outline"
            size="sm"
            onClick={handleButtonClick}
            disabled={uploading}
          >
            {uploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : uploadSuccess ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Uploaded!
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload New Photo
              </>
            )}
          </Button>

          {previewUrl && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRemovePhoto}
              disabled={uploading}
              className="text-red-600 hover:bg-red-50"
            >
              <X className="mr-2 h-4 w-4" />
              Remove
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
