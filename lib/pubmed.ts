import type { Paper } from '@/types/paper'

const BASE_URL = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils'

function buildParams(params: Record<string, string | number>): string {
  return new URLSearchParams({
    tool: 'medibio-hub',
    email: 'info@medibio-hub.com',
    retmode: 'json',
    ...Object.fromEntries(Object.entries(params).map(([k, v]) => [k, String(v)])),
  }).toString()
}

export async function searchPaperIds(
  query: string,
  maxResults = 20,
  page = 1
): Promise<{ ids: string[]; total: number }> {
  const retstart = (page - 1) * maxResults
  const url = `${BASE_URL}/esearch.fcgi?${buildParams({
    db: 'pubmed',
    term: query,
    retmax: maxResults,
    retstart,
    sort: 'date',
  })}`

  const res = await fetch(url, { next: { revalidate: 3600 } })
  if (!res.ok) return { ids: [], total: 0 }

  const data = await res.json()
  return {
    ids: data.esearchresult?.idlist ?? [],
    total: parseInt(data.esearchresult?.count ?? '0', 10),
  }
}

interface EsummaryAuthor {
  name: string
  authtype: string
}

interface EsummaryItem {
  title?: string
  authors?: EsummaryAuthor[]
  fulljournalname?: string
  source?: string
  pubdate?: string
  elocationid?: string
  articleids?: { idtype: string; value: string }[]
}

export async function fetchPaperSummaries(ids: string[]): Promise<Paper[]> {
  if (ids.length === 0) return []

  const url = `${BASE_URL}/esummary.fcgi?${buildParams({
    db: 'pubmed',
    id: ids.join(','),
  })}`

  const res = await fetch(url, { next: { revalidate: 3600 } })
  if (!res.ok) return []

  const data = await res.json()

  return ids
    .filter((id) => data.result?.[id])
    .map((id) => {
      const item: EsummaryItem = data.result[id]
      const doiId = item.articleids?.find((a) => a.idtype === 'doi')
      return {
        id,
        pmid: id,
        title: item.title ?? '',
        authors: (item.authors ?? []).map((a) => ({ name: a.name, authtype: a.authtype })),
        journal: item.fulljournalname ?? item.source ?? '',
        pubDate: item.pubdate ?? '',
        doi: doiId?.value ?? item.elocationid?.replace('doi: ', '') ?? undefined,
      }
    })
}

export async function fetchPaperAbstract(id: string): Promise<string> {
  const url = `${BASE_URL}/efetch.fcgi?db=pubmed&id=${id}&rettype=abstract&retmode=text`
  const res = await fetch(url, { next: { revalidate: 86400 } })
  if (!res.ok) return ''
  return res.text()
}

export async function getLatestPapers(query: string, count = 12): Promise<Paper[]> {
  const { ids } = await searchPaperIds(query, count)
  return fetchPaperSummaries(ids)
}
