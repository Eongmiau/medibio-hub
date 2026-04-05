import { getLatestPapers } from '@/lib/pubmed'
import { TOPICS } from '@/types/paper'
import PaperGrid from '@/components/PaperGrid'
import SearchBar from '@/components/SearchBar'
import TopicFilter from '@/components/TopicFilter'
import Link from 'next/link'

export const revalidate = 3600

export default async function HomePage() {
  const [medicinePapers, pharmaPapers, bioPapers] = await Promise.all([
    getLatestPapers('internal medicine clinical treatment', 4),
    getLatestPapers('pharmaceutical drug therapy', 4),
    getLatestPapers('biotechnology bioinformatics bioengineering', 4),
  ])


  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-blue-800/40 text-blue-300 text-sm px-4 py-1.5 rounded-full border border-blue-700/50">
            <span>🔬</span>
            <span>PubMed 기반 실시간 논문 검색</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
            의학·제약·바이오
            <br />
            <span className="text-blue-400">최신 동향 & 논문</span>
          </h1>
          <p className="text-slate-400 text-lg">
            전 세계 의과학 연구의 최전선을 한눈에 확인하세요
          </p>
          <div className="max-w-xl mx-auto">
            <SearchBar />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-14">
        {/* Topics */}
        <section>
          <h2 className="text-lg font-semibold text-slate-700 mb-4">분야별 탐색</h2>
          <TopicFilter />
        </section>

        {/* Medicine */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              🏥 <span>의학 최신 논문</span>
            </h2>
            <Link
              href="/topic/medicine"
              className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              더보기 →
            </Link>
          </div>
          {medicinePapers.length > 0 ? (
            <PaperGrid papers={medicinePapers} />
          ) : (
            <p className="text-slate-400 text-sm">논문을 불러오는 중...</p>
          )}
        </section>

        {/* Pharma */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              💊 <span>제약 최신 논문</span>
            </h2>
            <Link
              href="/topic/pharmaceutical"
              className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              더보기 →
            </Link>
          </div>
          {pharmaPapers.length > 0 ? (
            <PaperGrid papers={pharmaPapers} />
          ) : (
            <p className="text-slate-400 text-sm">논문을 불러오는 중...</p>
          )}
        </section>

        {/* Biotech */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              🧬 <span>바이오테크 최신 논문</span>
            </h2>
            <Link
              href="/topic/biotechnology"
              className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              더보기 →
            </Link>
          </div>
          {bioPapers.length > 0 ? (
            <PaperGrid papers={bioPapers} />
          ) : (
            <p className="text-slate-400 text-sm">논문을 불러오는 중...</p>
          )}
        </section>

        {/* All topics promo */}
        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 text-center border border-blue-100">
          <h2 className="text-xl font-bold text-slate-800 mb-2">더 많은 분야 탐색하기</h2>
          <p className="text-slate-500 text-sm mb-5">종양학, 신경과학, 유전체학 등 6개 분야의 최신 논문</p>
          <div className="flex flex-wrap justify-center gap-2">
            {TOPICS.slice(3).map((t) => (
              <Link
                key={t.slug}
                href={`/topic/${t.slug}`}
                className="flex items-center gap-1.5 bg-white px-4 py-2 rounded-full text-sm font-medium text-slate-700 border border-slate-200 hover:border-blue-300 hover:text-blue-600 transition-all"
              >
                {t.icon} {t.label}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
