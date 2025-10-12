import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LucideIcon } from 'lucide-react'

interface MetricItem {
  label: string
  value: string | number
  icon?: LucideIcon
  color?: string
}

interface MetricComparisonProps {
  title: string
  metrics: MetricItem[]
}

export function MetricComparison({ title, metrics }: MetricComparisonProps) {
  return (
    <Card className="shadow-lg">
      <CardHeader className="border-b border-neutral-200">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-2 gap-4">
          {metrics.map((metric, index) => {
            const Icon = metric.icon

            return (
              <div
                key={index}
                className="bg-neutral-50 rounded-lg p-4 hover:bg-neutral-100 transition-colors"
              >
                {Icon && (
                  <div className={`p-2 ${metric.color || 'bg-primary-accent/10'} rounded-lg w-fit mb-3`}>
                    <Icon className={`h-5 w-5 ${metric.color ? 'text-white' : 'text-primary-accent'}`} />
                  </div>
                )}
                <div className="text-2xl font-black font-montserrat text-primary-dark mb-1">
                  {metric.value}
                </div>
                <div className="text-sm font-montserrat text-neutral-600">
                  {metric.label}
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
