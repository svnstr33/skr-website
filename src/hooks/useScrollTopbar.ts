import { useEffect } from 'react'

export function useScrollTopbar() {
  useEffect(() => {
    const updateTopbar = () => document.documentElement.classList.toggle('is-scrolled', window.scrollY > 24)
    updateTopbar()
    window.addEventListener('scroll', updateTopbar, { passive: true })
    return () => window.removeEventListener('scroll', updateTopbar)
  }, [])
}
