import { useEffect, useMemo, useRef, useState } from 'react'
import { FiArrowUpRight, FiBox, FiFileText, FiHome, FiMail, FiSearch, FiX } from 'react-icons/fi'

type CommandPaletteProps = {
  onOpenPage: (page: string) => void
}

const commands = [
  { label: 'Home', description: 'Return to the SKR overview', page: 'home', icon: FiHome },
  { label: 'Company Profile', description: 'Our story, leadership and values', page: 'profile', icon: FiFileText },
  { label: 'Explore Products', description: 'Browse manufacturing product categories', page: 'products', icon: FiBox },
  { label: 'Capabilities', description: 'Processes, quality and engineering support', page: 'capabilities', icon: FiArrowUpRight },
  { label: 'Gallery', description: 'View SKR facilities and work', page: 'gallery', icon: FiFileText },
  { label: 'Contact SKR', description: 'Office details and business enquiries', page: 'contact', icon: FiMail },
  { label: 'Request a Quote', description: 'Share your product or component requirement', page: 'contact-form', icon: FiMail },
]

export function CommandPalette({ onOpenPage }: CommandPaletteProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setOpen((current) => !current)
      }
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [])

  useEffect(() => {
    if (open) {
      setQuery('')
      window.setTimeout(() => searchRef.current?.focus(), 0)
    }
  }, [open])

  const results = useMemo(() => {
    const value = query.trim().toLowerCase()
    return value ? commands.filter((command) => `${command.label} ${command.description}`.toLowerCase().includes(value)) : commands
  }, [query])

  const choose = (page: string) => {
    setOpen(false)
    onOpenPage(page)
  }

  return <>
    <button className="command-launcher" type="button" onClick={() => setOpen(true)} aria-label="Search SKR website">
      <FiSearch /> <span>Quick search</span><kbd>Ctrl K</kbd>
    </button>
    {open && <div className="command-backdrop" role="presentation" onMouseDown={() => setOpen(false)}>
      <section className="command-palette" role="dialog" aria-modal="true" aria-labelledby="command-title" onMouseDown={(event) => event.stopPropagation()}>
        <div className="command-search"><FiSearch /><input ref={searchRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search pages or actions..." aria-label="Search pages or actions" /><button type="button" onClick={() => setOpen(false)} aria-label="Close search"><FiX /></button></div>
        <p id="command-title">Quick navigation <span>Use Ctrl K anytime</span></p>
        <div className="command-results">{results.length ? results.map(({ label, description, page, icon: Icon }) => <button type="button" key={page} onClick={() => choose(page)}><Icon /><span><b>{label}</b><small>{description}</small></span><FiArrowUpRight /></button>) : <p className="command-empty">No matching page found. Try “quote”, “products” or “contact”.</p>}</div>
      </section>
    </div>}
  </>
}
