import { IconType } from 'react-icons'

interface SkillCardProps {
  title: string
  skills: {
    name: string
    icon?: IconType
  }[]
  icon: IconType
}

export default function SkillCard({ title, skills, icon: Icon }: SkillCardProps) {
  return (
    <div className="bg-bg-panel border border-line panel-hover p-6">
      <div className="flex items-center space-x-3 mb-4 pb-4 border-b border-line">
        <Icon className="w-5 h-5 text-accent shrink-0" />
        <h3 className="font-mono font-semibold text-xs tracking-data text-fg-primary uppercase">{title}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <kbd
            key={skill.name}
            className="px-2 py-1 bg-bg-secondary text-fg-secondary text-xs font-mono border border-line hover:border-accent hover:text-accent transition-colors"
          >
            {skill.name}
          </kbd>
        ))}
      </div>
    </div>
  )
}
