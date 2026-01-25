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
    <div className="bg-bg-card border border-bg-card hover:border-accent-primary/50 rounded-lg p-6 card-hover">
      <div className="flex items-center space-x-3 mb-4">
        <div className="p-2 bg-accent-primary/10 rounded-lg">
          <Icon className="w-6 h-6 text-accent-primary" />
        </div>
        <h3 className="font-mono font-semibold text-text-primary">{title}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill.name}
            className="px-3 py-1 bg-bg-secondary text-text-secondary text-sm font-mono rounded-full border border-bg-card hover:border-accent-primary/30 hover:text-accent-secondary transition-colors"
          >
            {skill.name}
          </span>
        ))}
      </div>
    </div>
  )
}
