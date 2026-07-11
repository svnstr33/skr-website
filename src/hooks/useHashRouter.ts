import { useCallback, useEffect, useLayoutEffect, useState } from 'react'

export function useHashRouter() {
  const [currentPage, setCurrentPage] = useState(() => window.location.hash.slice(1) || 'home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  useEffect(() => {
    const syncHash = () => {
      setCurrentPage(window.location.hash.slice(1) || 'home')
      setMenuOpen(false)
      setOpenDropdown(null)
    }
    window.addEventListener('hashchange', syncHash)
    return () => window.removeEventListener('hashchange', syncHash)
  }, [])

  // Hash routes keep the previous scroll position by default. Every page change
  // should instead begin directly below the header, like a normal new page.
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [currentPage])

  const openPage = useCallback((page: string) => {
    window.location.hash = page
    setCurrentPage(page)
    setMenuOpen(false)
    setOpenDropdown(null)
  }, [])

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
    menuOpen,
    openDropdown,
    openPage,
    toggleMenu,
    toggleDropdown,
    closeDropdown,
  }
}
