import { fetchPaperSummaries, fetchPaperAbstract } from '@/lib/pubmed'
import { getKoreanSummary } from '@/lib/translate'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface PaperPageProps {
  params: Promise<{ id: string }>
}

export default async function PaperPage({ params }: PaperPageProps) {
  const { id } = await params

  const [papers, abstractText] = await Promise.all([
    fetchPaperSummaries([id]),
    fetchPaperAbstract(id),
  ])

  const paper = papers[0]
  if (!paper) notFound()

  const koreanSummary = await getKoreanSummary(abstractText)

  const lines = abstractText
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 mb-8 transition-colors"
      >
        ← 홈으로
      </Link>

      <article className="space-y-6">
        {/* Title */}
        <div className="space-y-3">
          <h1 className="text-2xl font-bold text-slate-900 leading-snug">{paper.title}</h1>

          {paper.authors.length > 0 && (
            <p className="text-slate-600 text-sm">
              {paper.authors.map((a) => a.name).join(', ')}
            </p>
          )}

          <div className="flex flex-wrap gap-3 text-sm">
            {paper.journal && (
              <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-100 font-medium">
                {paper.journal}
              </span>
            )}
            {paper.pubDate && (
              <span className="text-slate-500 px-3 py-1 bg-slate-50 rounded-full border border-slate-100">
                {paper.pubDate}
              </span>
            )}
            <span className="text-slate-400 px-3 py-1 bg-slate-50 rounded-full border border-slate-100">
              PMID: {paper.pmid}
            </span>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-3 pb-6 border-b border-slate-200">
          <a
            href={`https://pubmed.ncbi.nlm.nih.gov/${paper.pmid}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            PubMed에서 보기 ↗
          </a>
          {paper.doi && (
            <a
              href={`https://doi.org/${paper.doi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              원문 보기 (DOI) ↗
            </a>
          )}
        </div>

        {/* Korean Summary */}
        {koreanSummary && (
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 space-y-2">
            <h2 className="text-sm font-bold text-blue-700 flex items-center gap-1.5">
              🇰🇷 한국어 요약 <span className="font-normal text-blue-400 text-xs">(AI 생성)</span>
            </h2>
            <p className="text-slate-700 text-sm leading-relaxed">{koreanSummary}</p>
          </div>
        )}

        {/* Abstract */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-800">원문 초록 (Abstract)</h2>
          {lines.length > 0 ? (
            <div className="space-y-3">
              {lines.map((line, i) => {
                const isLabel = /^[A-Z][A-Z\s]+:/.test(line)
                if (isLabel) {
                  const colonIdx = line.indexOf(':')
                  return (
                    <div key={i}>
                      <span className="font-semibold text-slate-700 text-sm">
                        {line.slice(0, colonIdx + 1)}
                      </span>
                      <p className="text-slate-600 text-sm leading-relaxed mt-1">
                        {line.slice(colonIdx + 1).trim()}
                      </p>
                    </div>
                  )
                }
                return (
                  <p key={i} className="text-slate-600 text-sm leading-relaxed">
                    {line}
                  </p>
                )
              })}
            </div>
          ) : (
            <p className="text-slate-400 text-sm italic">
              이 논문의 초록은 제공되지 않습니다.{' '}
              <a
                href={`https://pubmed.ncbi.nlm.nih.gov/${paper.pmid}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                PubMed에서 확인하세요 ↗
              </a>
            </p>
          )}
        </div>
      </article>
    </main>
  )
}
