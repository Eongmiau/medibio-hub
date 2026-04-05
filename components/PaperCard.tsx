import Link from 'next/link'
import type { Paper } from '@/types/paper'

interface PaperCardProps {
  paper: Paper
  koreanTitle?: string
}

function formatDate(dateStr: string): string {
  if (!dateStr) return ''
  const parts = dateStr.split(' ')
  const months: Record<string, string> = {
    Jan: '1월', Feb: '2월', Mar: '3월', Apr: '4월',
    May: '5월', Jun: '6월', Jul: '7월', Aug: '8월',
    Sep: '9월', Oct: '10월', Nov: '11월', Dec: '12월',
  }
  if (parts.length >= 2) {
    const year = parts[0]
    const month = months[parts[1]] ?? parts[1]
    return `${year} ${month}`
  }
  return dateStr
}

export default function PaperCard({ paper, koreanTitle }: PaperCardProps) {
  const authorNames = paper.authors.slice(0, 3).map((a) => a.name).join(', ')
  const hasMoreAuthors = paper.authors.length > 3

  return (
    <article className="bg-white rounded-2xl border border-slate-200 p-5 hover:shadow-md hover:border-blue-300 transition-all duration-200 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <Link href={`/paper/${paper.pmid}`} className="group flex-1">
          {koreanTitle && (
            <p className="text-sm font-semibold text-slate-800 group-hover:text-blue-600 leading-snug transition-colors line-clamp-3 mb-1.5">
              {koreanTitle}
            </p>
          )}
          <h3 className={`leading-snug ${koreanTitle ? 'text-xs text-slate-500 line-clamp-2' : 'text-sm font-semibold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-3'}`}>
            {paper.title}
          </h3>
        </Link>
      </div>

      <div className="space-y-1">
        {authorNames && (
          <p className="text-xs text-slate-500 line-clamp-1">
            {authorNames}{hasMoreAuthors ? ' 외' : ''}
          </p>
        )}
        <div className="flex items-center gap-2 flex-wrap">
          {paper.journal && (
            <span className="text-xs text-blue-700 font-medium bg-blue-50 px-2 py-0.5 rounded-full">
              {paper.journal}
            </span>
          )}
          {paper.pubDate && (
            <span className="text-xs text-slate-400">{formatDate(paper.pubDate)}</span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 pt-1 border-t border-slate-100">
        <Link
          href={`/paper/${paper.pmid}`}
          className="text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          초록 보기 →
        </Link>
        {paper.doi && (
          <a
            href={`https://doi.org/${paper.doi}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-slate-400 hover:text-slate-600 transition-colors"
          >
            원문 ↗
          </a>
        )}
        <a
          href={`https://pubmed.ncbi.nlm.nih.gov/${paper.pmid}/`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-slate-400 hover:text-slate-600 transition-colors ml-auto"
        >
          PubMed ↗
        </a>
      </div>
    </article>
  )
}
