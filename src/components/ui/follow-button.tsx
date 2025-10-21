'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { UserPlus, UserCheck, Loader2 } from 'lucide-react'

interface FollowButtonProps {
  mentorId: string
  initialIsFollowing?: boolean
  initialFollowerCount?: number
  size?: 'sm' | 'md' | 'lg'
  showCount?: boolean
  className?: string
  onWhiteBackground?: boolean
}

export function FollowButton({
  mentorId,
  initialIsFollowing = false,
  initialFollowerCount = 0,
  size = 'md',
  showCount = false,
  className = '',
  onWhiteBackground = false,
}: FollowButtonProps) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing)
  const [followerCount, setFollowerCount] = useState(initialFollowerCount)
  const [isLoading, setIsLoading] = useState(false)

  const handleToggleFollow = async () => {
    setIsLoading(true)

    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/follow', {
      //   method: isFollowing ? 'DELETE' : 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ mentorId })
      // })

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))

      // Toggle follow status
      setIsFollowing(!isFollowing)
      setFollowerCount(prev => isFollowing ? prev - 1 : prev + 1)
    } catch (error) {
      console.error('Error toggling follow:', error)
      // Show error notification
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={handleToggleFollow}
        disabled={isLoading}
        variant={isFollowing ? 'ghost' : 'outline'}
        size={size}
        className={`${className} ${
          isFollowing
            ? 'bg-success/10 text-success hover:bg-success/20 border-2 border-success/30'
            : onWhiteBackground
              ? 'border-2'
              : 'border-2 border-white text-white hover:bg-white hover:text-vibrant-accent'
        }`}
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            {isFollowing ? 'Unfollowing...' : 'Following...'}
          </>
        ) : (
          <>
            {isFollowing ? (
              <>
                <UserCheck className="h-4 w-4 mr-2" />
                Following
              </>
            ) : (
              <>
                <UserPlus className="h-4 w-4 mr-2" />
                Follow
              </>
            )}
          </>
        )}
      </Button>
      {showCount && (
        <span className="text-sm font-semibold font-montserrat text-neutral-600">
          {followerCount} {followerCount === 1 ? 'follower' : 'followers'}
        </span>
      )}
    </div>
  )
}
