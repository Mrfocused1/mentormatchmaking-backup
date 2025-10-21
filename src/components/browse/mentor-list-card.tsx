'use client'

import { useState } from 'react'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { FollowButton } from '@/components/ui/follow-button'
import {
  MapPin,
  Star,
  Briefcase,
  Users,
  Clock,
  Heart,
  Eye,
  UserPlus,
  CheckCircle,
  Loader2
} from 'lucide-react'

interface Mentor {
  id: number | string
  name: string
  title: string
  company?: string
  location: string
  industry?: string
  rating: number
  reviewCount: number
  mentees?: number
  yearsExperience?: number
  expertise: string[]
  availability: string | number
  bio: string
  avatar: string | null
  followers?: number
  isFollowing?: boolean
  connectionStatus?: 'none' | 'pending' | 'connected'
}

interface MentorListCardProps {
  mentor: Mentor
  onShowInterest?: (mentor: Mentor) => void
  onViewProfile: (mentor: Mentor) => void
  onConnect?: (mentorId: string) => Promise<void>
}

export function MentorListCard({ mentor, onShowInterest, onViewProfile, onConnect }: MentorListCardProps) {
  const [connecting, setConnecting] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState(mentor.connectionStatus || 'none')

  const handleConnect = async () => {
    if (!onConnect) return

    try {
      setConnecting(true)
      await onConnect(mentor.id.toString())
      setConnectionStatus('pending')
    } catch (error) {
      console.error('Failed to connect:', error)
    } finally {
      setConnecting(false)
    }
  }

  return (
    <Card className="shadow-lg hover:shadow-xl transition-all border-neutral-200 hover:border-primary-accent">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Avatar */}
          <div className="flex-shrink-0 mx-auto sm:mx-0">
            <div className="relative">
              <Avatar src={mentor.avatar} fallback={mentor.name} size="xl" className="shadow-md" />
              {/* Online Status Indicator */}
              <div className="absolute bottom-1 right-1 w-3 h-3 bg-success border-2 border-white rounded-full" />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-3">
              <div className="flex-1">
                <h3 className="text-xl font-bold font-montserrat text-primary-dark">
                  {mentor.name}
                </h3>
                <p className="text-sm font-semibold font-montserrat text-neutral-700 mt-1">
                  {mentor.title}
                </p>
                <p className="text-sm font-montserrat text-neutral-600">
                  @ {mentor.company}
                </p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-warning text-warning" />
                <span className="text-lg font-bold font-montserrat text-primary-dark">
                  {mentor.rating}
                </span>
                <span className="text-sm text-neutral-600 font-montserrat">
                  ({mentor.reviewCount})
                </span>
              </div>
            </div>

            {/* Info Tags */}
            <div className="flex flex-wrap gap-4 mb-4 text-sm text-neutral-600 font-montserrat">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {mentor.location}
              </div>
              <div className="flex items-center gap-1">
                <Briefcase className="h-4 w-4" />
                {mentor.yearsExperience} years exp.
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {mentor.mentees} mentees
              </div>
              <div className="flex items-center gap-1">
                <Clock
                  className={`h-4 w-4 ${
                    mentor.availability === 'Available' ? 'text-success' : 'text-warning'
                  }`}
                />
                <span
                  className={mentor.availability === 'Available' ? 'text-success' : 'text-warning'}
                >
                  {mentor.availability}
                </span>
              </div>
            </div>

            {/* Bio */}
            <p className="text-sm text-neutral-700 font-montserrat mb-4 leading-relaxed line-clamp-2">
              {mentor.bio}
            </p>

            {/* Expertise Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="outline" size="sm" className="border-secondary-accent text-secondary-accent">
                {mentor.industry}
              </Badge>
              {mentor.expertise.slice(0, 3).map((skill, index) => (
                <Badge key={index} className="bg-primary-accent/10 text-primary-accent" size="sm">
                  {skill}
                </Badge>
              ))}
              {mentor.expertise.length > 3 && (
                <Badge variant="secondary" size="sm">
                  +{mentor.expertise.length - 3} more
                </Badge>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              {connectionStatus === 'connected' ? (
                <Button
                  variant="primary"
                  size="md"
                  disabled
                  className="bg-success hover:bg-success/90 text-white"
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Connected
                </Button>
              ) : connectionStatus === 'pending' ? (
                <Button
                  variant="outline"
                  size="md"
                  disabled
                  className="border-warning text-warning"
                >
                  <Clock className="mr-2 h-4 w-4" />
                  Request Sent
                </Button>
              ) : (
                <Button
                  variant="primary"
                  size="md"
                  onClick={onConnect ? handleConnect : () => onShowInterest?.(mentor)}
                  disabled={connecting}
                  className="bg-secondary-accent hover:bg-secondary-accent/90 text-white disabled:opacity-50"
                >
                  {connecting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    <>
                      <UserPlus className="mr-2 h-4 w-4" />
                      {onConnect ? 'Connect' : 'Show Interest'}
                    </>
                  )}
                </Button>
              )}
              <FollowButton
                mentorId={mentor.id.toString()}
                initialIsFollowing={mentor.isFollowing || false}
                initialFollowerCount={mentor.followers || 0}
                size="md"
                onWhiteBackground={true}
              />
              <Button
                variant="outline"
                size="md"
                onClick={() => onViewProfile(mentor)}
                className="border-primary-accent text-primary-accent hover:bg-primary-accent/10"
              >
                <Eye className="mr-2 h-4 w-4" />
                View Profile
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
