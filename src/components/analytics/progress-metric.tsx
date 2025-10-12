interface ProgressMetricProps {
  label: string
  current: number
  total: number
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'vibrant'
  showPercentage?: boolean
}

const colorMap = {
  primary: 'bg-primary-accent',
  secondary: 'bg-secondary-accent',
  success: 'bg-green-600',
  warning: 'bg-yellow-600',
  vibrant: 'bg-vibrant-accent'
}

export function ProgressMetric({
  label,
  current,
  total,
  color = 'primary',
  showPercentage = true
}: ProgressMetricProps) {
  const percentage = Math.round((current / total) * 100)
  const barColor = colorMap[color]

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold font-montserrat text-neutral-700">
          {label}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold font-montserrat text-primary-dark">
            {current}/{total}
          </span>
          {showPercentage && (
            <span className="text-xs text-neutral-500 font-montserrat">
              ({percentage}%)
            </span>
          )}
        </div>
      </div>
      <div className="w-full bg-neutral-200 rounded-full h-2 overflow-hidden">
        <div
          className={`${barColor} h-2 rounded-full transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  )
}
