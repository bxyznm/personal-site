interface SkillCategory {
  title: string
  count: number
}

interface SkillsChartProps {
  categories: SkillCategory[]
}

export default function SkillsChart({ categories }: SkillsChartProps) {
  const max = Math.max(...categories.map((c) => c.count))
  const sorted = [...categories].sort((a, b) => b.count - a.count)

  return (
    <div className="bg-bg-panel border border-line rounded-2xl p-6 sm:p-8">
      <p className="text-sm text-fg-secondary mb-6">Tools per category</p>
      <div className="space-y-4">
        {sorted.map((category) => (
          <div key={category.title} className="flex items-center gap-4">
            <span className="w-44 shrink-0 text-sm text-fg-primary truncate">{category.title}</span>
            <div className="flex-grow h-2 rounded-full overflow-hidden bg-transparent">
              <div
                className="h-full rounded-full bg-accent"
                style={{ width: `${(category.count / max) * 100}%` }}
              />
            </div>
            <data value={category.count} className="w-6 text-right text-sm text-fg-secondary font-mono tabular-nums">
              {category.count}
            </data>
          </div>
        ))}
      </div>
    </div>
  )
}
