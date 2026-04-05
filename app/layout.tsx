import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })

export const metadata: Metadata = {
  title: 'MediBio Hub — 의학·제약·바이오 최신 논문',
  description: '의학, 제약, 바이오 업계의 최신 동향과 논문을 한눈에. PubMed 기반 실시간 검색.',
  keywords: ['의학논문', '제약', '바이오테크', 'PubMed', '의과학', '최신연구'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${geist.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 antialiased">
        <Header />
        <div className="flex-1">{children}</div>
        <footer className="bg-slate-900 text-slate-400 text-center py-6 text-xs mt-10">
          <p>© 2025 MediBio Hub · PubMed (NCBI) 데이터 기반 · 의료 행위 대체 불가</p>
        </footer>
      </body>
    </html>
  )
}
