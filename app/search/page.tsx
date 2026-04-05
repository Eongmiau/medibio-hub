import { searchPaperIds, fetchPaperSummaries } from '@/lib/pubmed'
import type { Paper } from '@/types/paper'
import PaperGrid from '@/components/PaperGrid'
import SearchBar from '@/components/SearchBar'

interface SearchPageProps {
  searchParams: Promise<{ q?: string; page?: string }>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q, page: pageStr } = await searchParams
  const query = q?.trim() ?? ''
  const page = Math.max(1, parseInt(pageStr ?? '1', 10))
  const perPage = 20

  let papers: Paper[] = []
  let total = 0

  if (query) {
    const result = await searchPaperIds(query, perPage, page)
    papers = await fetchPaperSummaries(result.ids)
    total = result.total
  }

  const totalPages = Math.ceil(total / perPage)

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-slate-800">논문 검색</h1>
        <SearchBar defaultValue={query} />
      </div>

      {query ? (
        <>
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">
              <span className="font-semibold text-slate-700">&ldquo;{query}&rdquo;</span> 검색 결과{' '}
              {total > 0 && <span className="text-blue-600 font-medium">{total.toLocaleString()}건</span>}
            </p>
          </div>

          {papers.length > 0 ? (
            <>
              <PaperGrid papers={papers} />

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 pt-4">
                  {page > 1 && (
                    <a
                      href={`/search?q=${encodeURIComponent(query)}&page=${page - 1}`}
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
                      href={`/search?q=${encodeURIComponent(query)}&page=${page + 1}`}
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
              <p className="text-4xl mb-4">🔍</p>
              <p className="font-medium">검색 결과가 없습니다</p>
              <p className="text-sm mt-1">다른 키워드로 검색해보세요</p>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-20 text-slate-400">
          <p className="text-4xl mb-4">🔬</p>
          <p className="font-medium">키워드를 입력하세요</p>
          <p className="text-sm mt-1">예: cancer immunotherapy, mRNA vaccine, CRISPR</p>
        </div>
      )}
    </main>
  )
}
