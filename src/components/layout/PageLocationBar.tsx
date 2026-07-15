type PageLocationBarProps = { page: string; title: string }

export function PageLocationBar({ page, title }: PageLocationBarProps) {
  if (page === 'home') return null

  return <div className="page-location-bar" aria-label={`You are viewing ${title}`}>
    <div><span>SKR Metal Industries</span><b>Home</b><i>/</i><strong>{title}</strong></div>
  </div>
}
