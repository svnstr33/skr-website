import { useEffect, useRef } from 'react'
import heroImg from '../../assets/hero.png'
import { navItems } from '../../data/navItems'
import { FiChevronDown, FiMail, FiMoreVertical, FiX } from 'react-icons/fi'
import { LanguageSelector } from './LanguageSelector'

const megaMenuContent: Record<string, { kicker: string; title: string; summary: string; focus: string[]; groups: { title: string; links: { label: string; href: string }[] }[] }> = {
  Division: { kicker: 'Specialist divisions', title: 'Find the right SKR production team.', summary: 'Two focused teams for component programmes, drawings and repeat manufacturing requirements.', focus: ['Drawing-led review', 'Repeat production', 'Quality checkpoints'], groups: [{ title: 'Umbrella Components', links: [{ label: 'Umbrella manufacturing', href: '#umbrella-manufacturing' }, { label: 'Components & materials', href: '#umbrella-components' }] }, { title: 'Engineering', links: [{ label: 'Engineering', href: '#vishwakarma-engineering' }, { label: 'Engineering services', href: '#engineering-services' }] }] },
  Capabilities: { kicker: 'Factory capability', title: 'From material flow to inspected dispatch.', summary: 'A practical look at production readiness, process equipment and quality control.', focus: ['Production flow', 'Machine support', 'Inspection planning'], groups: [{ title: 'Production', links: [{ label: 'Manufacturing facility', href: '#manufacturing' }, { label: 'Infrastructure', href: '#infrastructure' }, { label: 'Machinery & tooling', href: '#machinery' }] }, { title: 'Assurance', links: [{ label: 'Quality assurance', href: '#quality' }, { label: 'Certifications', href: '#certifications' }, { label: 'Industries served', href: '#industries' }] }] },
  Resources: { kicker: 'Knowledge & updates', title: 'Practical material for sourcing teams.', summary: 'Approved company material, manufacturing knowledge and current opportunity updates.', focus: ['Company documents', 'Technical insights', 'Official updates'], groups: [{ title: 'Explore', links: [{ label: 'Client partnerships', href: '#clients' }, { label: 'Manufacturing insights', href: '#blog' }, { label: 'News & events', href: '#news' }] }, { title: 'Work with us', links: [{ label: 'Careers', href: '#careers' }, { label: 'Download centre', href: '#downloads' }, { label: 'Request a quote', href: '#contact-form' }] }] },
}

type HeaderProps = {
  currentPage: string
  menuOpen: boolean
  openDropdown: string | null
  onToggleMenu: () => void
  onToggleDropdown: (label: string) => void
  onCloseDropdown: () => void
  onOpenPage: (page: string) => void
}

export function Header({
  currentPage,
  menuOpen,
  openDropdown,
  onToggleMenu,
  onToggleDropdown,
  onCloseDropdown,
  onOpenPage,
}: HeaderProps) {
  const navigationRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const closeWhenClickedAway = (event: PointerEvent) => {
      if (navigationRef.current && !navigationRef.current.contains(event.target as Node)) onCloseDropdown()
    }
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onCloseDropdown()
    }

    document.addEventListener('pointerdown', closeWhenClickedAway)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('pointerdown', closeWhenClickedAway)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [onCloseDropdown])

  return (
    <header ref={navigationRef} className="topbar">
      <div className="topbar-inner">
        <a className="brand-block" href="#home" onClick={() => onOpenPage('home')}>
          <img src={heroImg} alt="SKR logo" className="brand-logo" />
          <div className="brand-text">
            <span className="brand-name">SKR Metal Industries Pvt. Ltd.</span>
            <span className="brand-subtitle">Suthar Group</span>
          </div>
        </a>

        <button
          type="button"
          className="menu-toggle"
          aria-label={`${menuOpen ? 'Close' : 'Open'} navigation menu`}
          aria-expanded={menuOpen}
          aria-controls="primary-nav"
          onClick={onToggleMenu}
        >
          {menuOpen ? <FiX className="button-icon" /> : <FiMoreVertical className="button-icon" />}
        </button>

        <nav id="primary-nav" className={`nav ${menuOpen ? 'nav-open' : ''}`} aria-label="Primary navigation" onClick={(event) => {
          const link = (event.target as Element).closest<HTMLAnchorElement>('a[href^="#"]')
          if (link) event.preventDefault()
        }}>
          {navItems.map((item) => (
            <div key={item.label} className="nav-item">
              {item.children ? (
                <>
                  <div className={`nav-dropdown-trigger ${openDropdown === item.label ? 'active' : ''}`}>
                    <button type="button" className={`nav-link nav-link-button ${currentPage === item.href.slice(1) ? 'active' : ''}`} aria-expanded={openDropdown === item.label} aria-controls={`${item.label.toLowerCase().replaceAll(' ', '-')}-menu`} onClick={() => onToggleDropdown(item.label)}>{item.label}</button>
                    <button type="button" className="nav-chevron-button" aria-label={`${openDropdown === item.label ? 'Close' : 'Open'} ${item.label} menu`} aria-expanded={openDropdown === item.label} onClick={() => onToggleDropdown(item.label)}><FiChevronDown className="nav-icon" /></button>
                  </div>
                  <div id={`${item.label.toLowerCase().replaceAll(' ', '-')}-menu`} className={`dropdown ${openDropdown === item.label ? 'dropdown-open' : ''}`}>
                    <div className="mega-menu">
                      <div className="mega-menu-intro"><span>{megaMenuContent[item.label].kicker}</span><strong>{megaMenuContent[item.label].title}</strong><p>{megaMenuContent[item.label].summary}</p><div>{megaMenuContent[item.label].focus.map((item) => <small key={item}>{item}</small>)}</div></div>
                      <div className="mega-menu-groups">{megaMenuContent[item.label].groups.map((group) => <section key={group.title}><h3>{group.title}</h3>{group.links.map((link) => <a key={link.label} href={link.href} onClick={() => onOpenPage(link.href.slice(1))}>{link.label}</a>)}</section>)}</div>
                    </div>
                  </div>
                </>
              ) : (
                <a
                  href={item.href}
                  className={`nav-link ${currentPage === item.href.slice(1) ? 'active' : ''}`}
                  onClick={() => onOpenPage(item.href.slice(1))}
                >
                  {item.label}
                </a>
              )}
            </div>
          ))}
          <a href="#contact-form" className="menu-quote-link" onClick={() => onOpenPage('contact-form')} aria-label="Request a Quote" title="Request a Quote">
            <FiMail />
          </a>
          <LanguageSelector />
        </nav>
      </div>
    </header>
  )
}
