'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  ArrowLeft,
  UserPlus,
  Check,
  X,
  Loader2,
  AlertCircle,
  Users,
  Clock
} from 'lucide-react'

export default function ConnectionsPage() {
  const [activeTab, setActiveTab] = useState<'received' | 'sent'>('received')
  const [connections, setConnections] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [processingId, setProcessingId] = useState<string | null>(null)

  // Fetch connections
  useEffect(() => {
    fetchConnections()
  }, [activeTab])

  const fetchConnections = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/connections?type=${activeTab}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch connections')
      }

      setConnections(data.connections)
    } catch (err) {
      console.error('Error fetching connections:', err)
      setError(err instanceof Error ? err.message : 'Failed to load connections')
    } finally {
      setLoading(false)
    }
  }

  const handleAccept = async (connectionId: string) => {
    try {
      setProcessingId(connectionId)
      const response = await fetch(`/api/connections/${connectionId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'accept' }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to accept connection')
      }

      // Refresh connections
      await fetchConnections()
      alert('Connection accepted!')
    } catch (err) {
      console.error('Error accepting connection:', err)
      alert(err instanceof Error ? err.message : 'Failed to accept connection')
    } finally {
      setProcessingId(null)
    }
  }

  const handleDecline = async (connectionId: string) => {
    try {
      setProcessingId(connectionId)
      const response = await fetch(`/api/connections/${connectionId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'decline' }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to decline connection')
      }

      // Refresh connections
      await fetchConnections()
    } catch (err) {
      console.error('Error declining connection:', err)
      alert(err instanceof Error ? err.message : 'Failed to decline connection')
    } finally {
      setProcessingId(null)
    }
  }

  const handleCancel = async (connectionId: string) => {
    try {
      setProcessingId(connectionId)
      const response = await fetch(`/api/connections/${connectionId}`, {
        method: 'DELETE',
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to cancel connection')
      }

      // Refresh connections
      await fetchConnections()
    } catch (err) {
      console.error('Error cancelling connection:', err)
      alert(err instanceof Error ? err.message : 'Failed to cancel connection')
    } finally {
      setProcessingId(null)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />

      {/* Page Header */}
      <section className="bg-primary-dark pt-24 pb-8 sm:pt-32 sm:pb-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-primary-accent hover:text-primary-accent/80 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm font-semibold font-montserrat">Back to Dashboard</span>
            </Link>
          </div>
          <div>
            <h1 className="text-3xl font-black font-montserrat text-white sm:text-4xl">
              Connection Requests
            </h1>
            <p className="mt-2 text-white/80 font-montserrat">
              Manage your pending connection requests
            </p>
          </div>
        </div>
      </section>

      {/* Tabs and Content */}
      <section className="py-8">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            <Button
              variant={activeTab === 'received' ? 'primary' : 'outline'}
              onClick={() => setActiveTab('received')}
              className={activeTab === 'received' ? 'bg-primary-accent text-primary-dark' : ''}
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Received
            </Button>
            <Button
              variant={activeTab === 'sent' ? 'primary' : 'outline'}
              onClick={() => setActiveTab('sent')}
              className={activeTab === 'sent' ? 'bg-primary-accent text-primary-dark' : ''}
            >
              <Clock className="mr-2 h-4 w-4" />
              Sent
            </Button>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary-accent" />
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <Card className="p-6">
              <div className="flex items-center gap-3 text-red-600">
                <AlertCircle className="h-5 w-5" />
                <p>{error}</p>
              </div>
            </Card>
          )}

          {/* Empty State */}
          {!loading && !error && connections.length === 0 && (
            <Card className="p-12">
              <div className="text-center">
                <Users className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
                <h3 className="text-lg font-bold font-montserrat text-neutral-700 mb-2">
                  No {activeTab} requests
                </h3>
                <p className="text-neutral-600 font-montserrat">
                  {activeTab === 'received'
                    ? 'You don\'t have any pending connection requests.'
                    : 'You haven\'t sent any connection requests yet.'}
                </p>
                <Button asChild className="mt-4 bg-primary-accent text-primary-dark">
                  <Link href="/browse-mentors">Browse Mentors</Link>
                </Button>
              </div>
            </Card>
          )}

          {/* Connections List */}
          {!loading && connections.length > 0 && (
            <div className="space-y-4">
              {connections.map((connection) => (
                <Card key={connection.id} className="shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="h-16 w-16 rounded-full bg-primary-accent/20 flex items-center justify-center text-2xl font-bold text-primary-dark">
                          {connection.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold font-montserrat text-primary-dark">
                            {connection.name}
                          </h3>
                          <p className="text-sm text-neutral-600 font-montserrat">
                            {connection.title}
                          </p>
                          <p className="text-xs text-neutral-500 font-montserrat mt-1">
                            {connection.location}
                          </p>
                          <Badge variant="secondary" size="sm" className="mt-2">
                            {connection.role === 'MENTOR' ? 'Mentor' : 'Mentee'}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        {activeTab === 'received' ? (
                          <>
                            <Button
                              onClick={() => handleAccept(connection.id)}
                              disabled={processingId === connection.id}
                              className="bg-success hover:bg-success/90 text-white"
                            >
                              {processingId === connection.id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <>
                                  <Check className="mr-2 h-4 w-4" />
                                  Accept
                                </>
                              )}
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => handleDecline(connection.id)}
                              disabled={processingId === connection.id}
                              className="border-red-500 text-red-500 hover:bg-red-50"
                            >
                              {processingId === connection.id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <>
                                  <X className="mr-2 h-4 w-4" />
                                  Decline
                                </>
                              )}
                            </Button>
                          </>
                        ) : (
                          <Button
                            variant="outline"
                            onClick={() => handleCancel(connection.id)}
                            disabled={processingId === connection.id}
                            className="border-neutral-300 text-neutral-700"
                          >
                            {processingId === connection.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <>
                                <X className="mr-2 h-4 w-4" />
                                Cancel Request
                              </>
                            )}
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
