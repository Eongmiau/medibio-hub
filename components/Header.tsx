import Link from 'next/link'
import SearchBar from './SearchBar'

export default function Header() {
  return (
    <header className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-6">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="text-2xl">🧬</span>
            <div>
              <span className="font-bold text-lg leading-none">MediBio</span>
              <span className="text-slate-400 text-xs block leading-none">Hub</span>
            </div>
          </Link>

          <div className="flex-1 max-w-xl hidden sm:block">
            <SearchBar compact />
          </div>

          <nav className="flex items-center gap-4 text-sm shrink-0">
            <Link href="/" className="text-slate-300 hover:text-white transition-colors">
              홈
            </Link>
            <Link href="/topic/medicine" className="text-slate-300 hover:text-white transition-colors">
              분야별
            </Link>
            <Link href="/search" className="text-slate-300 hover:text-white transition-colors">
              검색
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
