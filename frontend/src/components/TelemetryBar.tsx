interface TelemetryBarProps {
  label: string
  value: number
  max: number
  slots?: number
}

export default function TelemetryBar({ label, value, max, slots = 24 }: TelemetryBarProps) {
  const filled = Math.max(0, Math.min(slots, Math.round((value / max) * slots)))
  const empty = slots - filled

  return (
    <div className="flex items-center gap-4 font-mono text-xs">
      <span className="w-40 shrink-0 tracking-data text-fg-secondary uppercase truncate">{label}</span>
      <span aria-hidden="true" className="text-fg-primary">
        [{'█'.repeat(filled)}
        <span className="text-line-bright">{'░'.repeat(empty)}</span>]
      </span>
      <data value={value} className="text-fg-secondary tabular-nums">
        {String(value).padStart(2, '0')}/{max}
      </data>
    </div>
  )
}
