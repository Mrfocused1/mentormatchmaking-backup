import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Get counts for various stats
    const [
      totalMentors,
      totalMentees,
      totalUsers,
      totalMatches,
      totalMessages,
      totalSessions,
    ] = await Promise.all([
      prisma.user.count({ where: { role: 'MENTOR' } }),
      prisma.user.count({ where: { role: 'MENTEE' } }),
      prisma.user.count(),
      prisma.match.count({ where: { status: 'ACTIVE' } }),
      prisma.message.count(),
      prisma.session.count({ where: { status: 'COMPLETED' } }),
    ])

    return NextResponse.json({
      success: true,
      stats: {
        totalMentors,
        totalMentees,
        totalUsers,
        totalMatches,
        totalMessages,
        totalSessions,
        successfulMatches: totalMatches, // For homepage stat
      },
    })
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}
