import { searchPaperIds, fetchPaperSummaries } from '@/lib/pubmed'
import { translateTitlesBatch } from '@/lib/translate'
import { TOPICS } from '@/types/paper'
import PaperCard from '@/components/PaperCard'
import TopicFilter from '@/components/TopicFilter'
import { notFound } from 'next/navigation'

interface TopicPageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ page?: string }>
}

export const revalidate = 3600

export async function generateStaticParams() {
  return TOPICS.map((t) => ({ slug: t.slug }))
}

export default async function TopicPage({ params, searchParams }: TopicPageProps) {
  const { slug } = await params
  const { page: pageStr } = await searchParams
  const page = Math.max(1, parseInt(pageStr ?? '1', 10))

  const topic = TOPICS.find((t) => t.slug === slug)
  if (!topic) notFound()

  const perPage = 20
  const { ids, total } = await searchPaperIds(topic.query, perPage, page)
  const papers = await fetchPaperSummaries(ids)
  const totalPages = Math.ceil(total / perPage)
  const koreanTitles = await translateTitlesBatch(papers.map((p) => ({ id: p.id, title: p.title })))

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
          <span className="text-4xl">{topic.icon}</span>
          <span>{topic.label} 논문</span>
        </h1>
        <p className="text-slate-500 text-sm">
          총 <span className="font-semibold text-slate-700">{total.toLocaleString()}건</span>의 논문
        </p>
        <TopicFilter activeSlug={slug} />
      </div>

      {papers.length > 0 ? (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {papers.map((p) => (
              <PaperCard key={p.pmid} paper={p} koreanTitle={koreanTitles[p.id]} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-4">
              {page > 1 && (
                <a
                  href={`/topic/${slug}?page=${page - 1}`}
                  className="px-4 py-2 rounded-lg border border-slate-200 text-sm hover:bg-slate-50 transition-colors"
                >
                  ← 이전
                </a>
              )}
              <span className="text-sm text-slate-500 px-3">
                {page} / {totalPages}
              </span>
              {page < totalPages && (
                <a
                  href={`/topic/${slug}?page=${page + 1}`}
                  className="px-4 py-2 rounded-lg border border-slate-200 text-sm hover:bg-slate-50 transition-colors"
                >
                  다음 →
                </a>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-20 text-slate-400">
          <p className="text-4xl mb-4">{topic.icon}</p>
          <p>논문을 불러오는 중입니다...</p>
        </div>
      )}
    </main>
  )
}
