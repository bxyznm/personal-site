import WorkInProgress from '@/components/WorkInProgress'

export default function Blog() {
  return (
    <div className="min-h-screen py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <WorkInProgress
          title="Blog"
          description="I am still working on this section. Posts about SRE, DevOps, and cloud infrastructure are coming soon."
        />
      </div>
    </div>
  )
}
