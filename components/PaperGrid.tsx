'use client'

import { useEffect, useState } from 'react'
import type { Paper } from '@/types/paper'
import PaperCard from './PaperCard'

interface PaperGridProps {
  papers: Paper[]
}

export default function PaperGrid({ papers }: PaperGridProps) {
  const [koreanTitles, setKoreanTitles] = useState<Record<string, string>>({})

  useEffect(() => {
    if (papers.length === 0) return
    fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(papers.map((p) => ({ id: p.id, title: p.title }))),
    })
      .then((r) => r.json())
      .then(setKoreanTitles)
      .catch(() => {})
  }, [papers])

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {papers.map((p) => (
        <PaperCard key={p.pmid} paper={p} koreanTitle={koreanTitles[p.id]} />
      ))}
    </div>
  )
}
