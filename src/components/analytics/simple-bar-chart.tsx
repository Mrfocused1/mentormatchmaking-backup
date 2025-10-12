'use client'

interface DataPoint {
  label: string
  value: number
  color?: string
}

interface SimpleBarChartProps {
  data: DataPoint[]
  maxValue?: number
  height?: number
  showValues?: boolean
}

export function SimpleBarChart({
  data,
  maxValue,
  height = 200,
  showValues = true
}: SimpleBarChartProps) {
  const max = maxValue || Math.max(...data.map(d => d.value))

  return (
    <div className="space-y-4">
      <div
        className="flex items-end gap-3 px-4"
        style={{ height: `${height}px` }}
      >
        {data.map((item, index) => {
          const barHeight = (item.value / max) * 100
          const barColor = item.color || 'bg-primary-accent'

          return (
            <div key={index} className="flex-1 flex flex-col items-center gap-2">
              <div className="relative w-full flex items-end justify-center" style={{ height: '100%' }}>
                {showValues && item.value > 0 && (
                  <span className="absolute -top-6 text-xs font-bold font-montserrat text-primary-dark">
                    {item.value}
                  </span>
                )}
                <div
                  className={`w-full ${barColor} rounded-t-lg transition-all duration-500 hover:opacity-80`}
                  style={{ height: `${barHeight}%` }}
                ></div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="flex items-center gap-3 px-4">
        {data.map((item, index) => (
          <div key={index} className="flex-1 text-center">
            <span className="text-xs font-semibold font-montserrat text-neutral-600 break-words">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
