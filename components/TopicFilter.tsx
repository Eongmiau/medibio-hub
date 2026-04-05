import Link from 'next/link'
import { TOPICS } from '@/types/paper'

interface TopicFilterProps {
  activeSlug?: string
}

export default function TopicFilter({ activeSlug }: TopicFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {TOPICS.map((topic) => {
        const isActive = topic.slug === activeSlug
        return (
          <Link
            key={topic.slug}
            href={`/topic/${topic.slug}`}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              isActive
                ? 'bg-blue-600 text-white shadow-md scale-105'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50'
            }`}
          >
            <span>{topic.icon}</span>
            <span>{topic.label}</span>
          </Link>
        )
      })}
    </div>
  )
}
