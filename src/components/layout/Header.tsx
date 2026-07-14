import { useEffect, useRef } from 'react'
import heroImg from '../../assets/hero.png'
import { navItems } from '../../data/navItems'
import { FiChevronDown, FiMail, FiMoreVertical, FiX } from 'react-icons/fi'
import { LanguageSelector } from './LanguageSelector'

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
                    <a href={item.href} className="dropdown-link dropdown-overview-link" onClick={() => onOpenPage(item.href.slice(1))}>
                      {item.label} Overview
                    </a>
                    {item.children.map((child) => (
                      <a
                        key={child.label}
                        href={child.href}
                        className="dropdown-link"
                        onClick={() => onOpenPage(child.href.slice(1))}
                      >
                        {child.label}
                      </a>
                    ))}
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
