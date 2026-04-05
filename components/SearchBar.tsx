'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface SearchBarProps {
  compact?: boolean
  defaultValue?: string
}

export default function SearchBar({ compact = false, defaultValue = '' }: SearchBarProps) {
  const [query, setQuery] = useState(defaultValue)
  const router = useRouter()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const q = query.trim()
    if (!q) return
    router.push(`/search?q=${encodeURIComponent(q)}`)
  }

  if (compact) {
    return (
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="논문 검색..."
          className="flex-1 bg-slate-800 text-white placeholder-slate-500 rounded-l-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 border border-slate-700"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-r-lg text-sm transition-colors"
        >
          🔍
        </button>
      </form>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="질병명, 약물명, 키워드로 검색하세요..."
        className="flex-1 border border-slate-300 rounded-xl px-5 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-base font-medium transition-colors shadow-sm"
      >
        검색
      </button>
    </form>
  )
}
