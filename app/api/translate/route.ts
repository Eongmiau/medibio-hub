import { translateTitlesBatch } from '@/lib/translate'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const papers: { id: string; title: string }[] = await req.json()
  const result = await translateTitlesBatch(papers)
  return NextResponse.json(result)
}
