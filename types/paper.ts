export interface Author {
  name: string
  authtype: string
}

export interface Paper {
  id: string
  pmid: string
  title: string
  authors: Author[]
  journal: string
  pubDate: string
  doi?: string
  abstract?: string
}

export interface SearchResult {
  papers: Paper[]
  total: number
}

export const TOPICS = [
  { slug: 'medicine', label: '의학', query: 'internal medicine clinical treatment', icon: '🏥' },
  { slug: 'pharmaceutical', label: '제약', query: 'pharmaceutical drug therapy approval', icon: '💊' },
  { slug: 'biotechnology', label: '바이오테크', query: 'biotechnology bioinformatics bioengineering', icon: '🧬' },
  { slug: 'oncology', label: '종양학', query: 'cancer oncology tumor immunotherapy', icon: '🔬' },
  { slug: 'neuroscience', label: '신경과학', query: 'neuroscience brain neural cognitive', icon: '🧠' },
  { slug: 'genomics', label: '유전체학', query: 'genomics genetics genome sequencing', icon: '🧪' },
] as const

export type TopicSlug = (typeof TOPICS)[number]['slug']
