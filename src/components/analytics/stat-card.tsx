import { LucideIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: LucideIcon
  iconColor?: string
  iconBgColor?: string
  trend?: {
    value: number
    isPositive: boolean
  }
  badge?: string
}

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor = 'text-primary-accent',
  iconBgColor = 'bg-primary-accent/10',
  trend,
  badge
}: StatCardProps) {
  return (
    <Card className="border-primary-accent/20 hover:border-primary-accent hover:shadow-lg transition-all">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 ${iconBgColor} rounded-full`}>
            <Icon className={`h-6 w-6 ${iconColor}`} />
          </div>
          {badge && (
            <Badge variant="secondary" size="sm">{badge}</Badge>
          )}
        </div>

        <div className="space-y-1">
          <p className="text-3xl font-black font-montserrat text-primary-dark">
            {value}
          </p>
          <p className="text-sm text-neutral-600 font-montserrat">
            {title}
          </p>

          {subtitle && (
            <p className="text-xs text-neutral-500 font-montserrat pt-1">
              {subtitle}
            </p>
          )}

          {trend && (
            <div className="flex items-center gap-1 pt-2">
              <span className={`text-xs font-semibold font-montserrat ${
                trend.isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              </span>
              <span className="text-xs text-neutral-500 font-montserrat">
                vs last month
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
