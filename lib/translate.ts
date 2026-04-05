import Anthropic from '@anthropic-ai/sdk'

function getClient(): Anthropic | null {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) return null
  return new Anthropic({ apiKey })
}

export async function translateTitlesBatch(
  papers: { id: string; title: string }[]
): Promise<Record<string, string>> {
  const client = getClient()
  if (!client || papers.length === 0) return {}

  try {
    const numbered = papers.map((p, i) => `${i + 1}. ${p.title}`).join('\n')
    const msg = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 2048,
      messages: [
        {
          role: 'user',
          content: `아래 의학 논문 제목들을 한국어로 번역하세요. 번호와 번역만 출력하고 설명은 하지 마세요:\n\n${numbered}`,
        },
      ],
    })

    const text = msg.content[0].type === 'text' ? msg.content[0].text : ''
    const lines = text
      .split('\n')
      .map((l) => l.replace(/^\d+\.\s*/, '').trim())
      .filter(Boolean)

    const result: Record<string, string> = {}
    papers.forEach((p, i) => {
      if (lines[i]) result[p.id] = lines[i]
    })
    return result
  } catch {
    return {}
  }
}

export async function getKoreanSummary(abstract: string): Promise<string> {
  const client = getClient()
  if (!client || !abstract.trim()) return ''

  try {
    const msg = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 600,
      messages: [
        {
          role: 'user',
          content: `다음 의학 논문 초록을 한국어로 3~5문장으로 핵심만 요약해주세요:\n\n${abstract}`,
        },
      ],
    })
    return msg.content[0].type === 'text' ? msg.content[0].text : ''
  } catch {
    return ''
  }
}
