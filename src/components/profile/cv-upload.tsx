'use client'

import { useState, useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Upload, Loader2, X, Check, FileText, Download, ExternalLink } from 'lucide-react'

interface CVUploadProps {
  currentCVUrl?: string
  userId: string
  userName: string
  onUploadSuccess?: (url: string | null) => void
}

export function CVUpload({
  currentCVUrl,
  userId,
  userName,
  onUploadSuccess,
}: CVUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [cvUrl, setCvUrl] = useState<string | null>(currentCVUrl || null)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const supabase = createClient()

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type - accept PDF, DOC, DOCX
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ]

    if (!allowedTypes.includes(file.type)) {
      alert('Please upload a PDF, DOC, or DOCX file')
      return
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB')
      return
    }

    try {
      setUploading(true)
      setUploadSuccess(false)

      // Upload to Supabase Storage
      const fileExt = file.name.split('.').pop()
      const fileName = `${userId}-${Date.now()}.${fileExt}`
      const filePath = `cvs/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('cv-documents')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        })

      if (uploadError) {
        throw uploadError
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('cv-documents')
        .getPublicUrl(filePath)

      // Update user profile in database with direct Supabase query
      const { error: updateError } = await supabase
        .from('Profile')
        .update({
          cvUrl: publicUrl,
        })
        .eq('userId', userId)

      if (updateError) {
        console.error('Profile update error:', updateError)
        throw new Error('Failed to update profile')
      }

      setCvUrl(publicUrl)
      setUploadSuccess(true)
      onUploadSuccess?.(publicUrl)

      // Hide success message after 3 seconds
      setTimeout(() => setUploadSuccess(false), 3000)
    } catch (error) {
      console.error('Error uploading CV:', error)
      alert(error instanceof Error ? error.message : 'Failed to upload CV')
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

  const handleRemoveCV = async () => {
    if (!confirm('Are you sure you want to remove your CV?')) {
      return
    }

    try {
      setUploading(true)

      // Update profile to remove CV with direct Supabase query
      const { error: updateError } = await supabase
        .from('Profile')
        .update({
          cvUrl: null,
        })
        .eq('userId', userId)

      if (updateError) {
        console.error('Profile update error:', updateError)
        throw new Error('Failed to update profile')
      }

      setCvUrl(null)
      onUploadSuccess?.(null)
      alert('CV removed successfully')
    } catch (error) {
      console.error('Error removing CV:', error)
      alert('Failed to remove CV')
    } finally {
      setUploading(false)
    }
  }

  const handleDownloadCV = () => {
    if (cvUrl) {
      window.open(cvUrl, '_blank')
    }
  }

  const getFileName = () => {
    if (!cvUrl) return null
    const parts = cvUrl.split('/')
    const fullFileName = parts[parts.length - 1]
    // Remove timestamp from filename for display
    const cleanName = fullFileName.split('-').slice(1).join('-') || fullFileName
    return cleanName
  }

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="h-20 w-20 rounded-lg bg-primary-accent/20 flex items-center justify-center border-4 border-neutral-200">
            {uploading ? (
              <Loader2 className="h-8 w-8 text-primary-accent animate-spin" />
            ) : cvUrl ? (
              <FileText className="h-8 w-8 text-primary-accent" />
            ) : (
              <Upload className="h-8 w-8 text-neutral-400" />
            )}
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-bold font-montserrat text-primary-dark mb-2">
            CV / Resume
          </h3>

          {cvUrl && (
            <div className="mb-3 p-3 bg-neutral-50 rounded-lg border border-neutral-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary-accent" />
                  <span className="text-sm font-montserrat text-primary-dark font-medium">
                    {getFileName()}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDownloadCV}
                  className="text-primary-accent hover:text-primary-accent/80"
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          <p className="text-sm text-neutral-600 font-montserrat mb-2">
            Upload your CV or resume to help mentors/mentees learn more about your background and experience.
          </p>
          <p className="text-xs text-neutral-500 font-montserrat mb-3">
            Accepted formats: PDF, DOC, DOCX. Max size: 10MB
          </p>

          <div className="flex gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
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
                  {cvUrl ? 'Replace CV' : 'Upload CV'}
                </>
              )}
            </Button>

            {cvUrl && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDownloadCV}
                  disabled={uploading}
                  className="text-primary-accent hover:bg-primary-accent/10"
                >
                  <Download className="mr-2 h-4 w-4" />
                  View
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRemoveCV}
                  disabled={uploading}
                  className="text-red-600 hover:bg-red-50"
                >
                  <X className="mr-2 h-4 w-4" />
                  Remove
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
