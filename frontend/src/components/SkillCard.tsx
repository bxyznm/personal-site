import type { Icon } from '@phosphor-icons/react'

interface SkillCardProps {
  title: string
  skills: { name: string }[]
  icon: Icon
}

export default function SkillCard({ title, skills, icon: IconComponent }: SkillCardProps) {
  return (
    <div className="bg-bg-panel border border-line rounded-2xl panel-hover p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
          <IconComponent size={18} className="text-accent" />
        </div>
        <h3 className="font-semibold text-sm text-fg-primary">{title}</h3>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {skills.map((skill) => (
          <span
            key={skill.name}
            className="px-2.5 py-1 bg-bg-secondary text-fg-secondary text-xs rounded-full"
          >
            {skill.name}
          </span>
        ))}
      </div>
    </div>
  )
}
