import { Hammer } from '@phosphor-icons/react/dist/ssr'
import MagneticButton from '@/components/MagneticButton'
import { Reveal } from '@/components/Reveal'

interface WorkInProgressProps {
  title: string
  description: string
}

export default function WorkInProgress({ title, description }: WorkInProgressProps) {
  return (
    <Reveal className="max-w-2xl mx-auto w-full">
      <div className="bg-bg-panel border border-line rounded-2xl p-10 lg:p-14 text-center">
        <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
          <Hammer size={26} className="text-accent" />
        </div>
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-medium mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          Work in progress
        </span>
        <h1 className="font-display font-black text-3xl sm:text-4xl tracking-tightest mb-4">{title}</h1>
        <p className="text-fg-secondary text-lg leading-relaxed mb-8">{description}</p>
        <MagneticButton href="/contact" variant="primary">
          Get in touch
        </MagneticButton>
      </div>
    </Reveal>
  )
}
