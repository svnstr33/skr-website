export type NavItem = {
  label: string
  href: string
  children?: { label: string; href: string }[]
}

export type ContentCard = { title: string; body: string; meta?: string }

export type PageContent = {
  eyebrow: string
  title: string
  description: string
  imageLabel: string
  imageNote: string
  stats: [string, string][]
  overviewTitle: string
  overview: string
  cards: ContentCard[]
  processTitle: string
  process: ContentCard[]
  cta: string
}

export type PageContentMap = Record<string, PageContent>
