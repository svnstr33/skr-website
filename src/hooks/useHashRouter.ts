import { useCallback, useEffect, useLayoutEffect, useState } from 'react'

export function useHashRouter() {
  const [currentPage, setCurrentPage] = useState(() => window.location.hash === '#contact-form' ? 'home' : window.location.hash.slice(1) || 'home')
  const [quoteModalOpen, setQuoteModalOpen] = useState(() => window.location.hash === '#contact-form')
  const [menuOpen, setMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  useEffect(() => {
    const syncHash = () => {
      const page = window.location.hash.slice(1) || 'home'
      if (page === 'contact-form') setQuoteModalOpen(true)
      else { setCurrentPage(page); setQuoteModalOpen(false) }
      setMenuOpen(false)
      setOpenDropdown(null)
    }
    window.addEventListener('hashchange', syncHash)
    window.addEventListener('popstate', syncHash)
    const previousScrollRestoration = window.history.scrollRestoration
    window.history.scrollRestoration = 'manual'
    return () => {
      window.removeEventListener('hashchange', syncHash)
      window.removeEventListener('popstate', syncHash)
      window.history.scrollRestoration = previousScrollRestoration
    }
  }, [])

  // Hash routes keep the previous scroll position by default. Every page change
  // should instead begin directly below the header, like a normal new page.
  useLayoutEffect(() => {
    const scrollToPageTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    }

    // Reset immediately, then again after browser/layout work has completed.
    scrollToPageTop()
    const frame = window.requestAnimationFrame(() => {
      scrollToPageTop()
    })
    const timeout = window.setTimeout(scrollToPageTop, 50)
    return () => {
      window.cancelAnimationFrame(frame)
      window.clearTimeout(timeout)
    }
  }, [currentPage])

  const openPage = useCallback((page: string) => {
    const route = `#${page}`
    if (window.location.hash !== route) window.history.pushState(null, '', route)
    if (page === 'contact-form') setQuoteModalOpen(true)
    else setCurrentPage(page)
    setMenuOpen(false)
    setOpenDropdown(null)
  }, [])

  const closeQuoteModal = useCallback(() => {
    window.history.replaceState(null, '', `#${currentPage}`)
    setQuoteModalOpen(false)
  }, [currentPage])

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev)
  }, [])

  const toggleDropdown = useCallback((label: string) => {
    setOpenDropdown((prev) => (prev === label ? null : label))
  }, [])

  const closeDropdown = useCallback(() => {
    setOpenDropdown(null)
  }, [])

  return {
    currentPage,
    quoteModalOpen,
    menuOpen,
    openDropdown,
    openPage,
    closeQuoteModal,
    toggleMenu,
    toggleDropdown,
    closeDropdown,
  }
}
