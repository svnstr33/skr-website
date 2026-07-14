import { useGSAP } from '@gsap/react'
import type { RefObject } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'

export function usePageAnimations(scope: RefObject<HTMLDivElement | null>, currentPage: string) {
  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const pageRoots = gsap.utils.toArray<HTMLElement>(
      '.hero-panel:not(.page-hidden), .company-profile.profile-visible, .leadership-section.profile-visible, .detail-page, .contact-detail-page, .operations-page, .product-detail-page, .legal-page, .not-found-page',
    )
    gsap.fromTo(pageRoots, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: .58, ease: 'power3.out', stagger: .06, clearProps: 'transform' })

    const intro = gsap.utils.toArray<HTMLElement>('.hero-panel:not(.page-hidden), .page-intro, .contact-hero, .operations-hero, .product-detail-hero, .company-profile.profile-visible')
    intro.forEach((section) => {
      const copy = section.querySelectorAll<HTMLElement>('h1, h2, .eyebrow, .hero-text, .profile-intro, .hero-actions, .page-intro-actions, .product-actions')
      if (copy.length) gsap.from(copy, { autoAlpha: 0, y: 20, duration: .55, ease: 'power3.out', stagger: .07, delay: .05, clearProps: 'transform' })
    })

    const revealGroups = [
      '.reveal-section', '.content-section', '.factory-card', '.quality-strip',
      '.capability-card', '.product-grid article', '.operations-grid article',
      '.contact-info-grid article', '.leader-card', '.mission-vision article',
      '.values-section article', '.about-timeline article', '.detail-feature-grid article',
      '.related-products a', '.contact-channel-section', '.contact-enquiry-section',
    ]
    const revealed = new Set<HTMLElement>()
    gsap.utils.toArray<HTMLElement>(revealGroups.join(',')).forEach((element) => {
      if (revealed.has(element)) return
      revealed.add(element)
      gsap.from(element, {
        autoAlpha: 0,
        y: 30,
        duration: .65,
        ease: 'power3.out',
        clearProps: 'transform',
        scrollTrigger: { trigger: element, start: 'top 90%', once: true },
      })
    })

    const imagePanels = gsap.utils.toArray<HTMLElement>('.image-cover, .image-placeholder, .leader-photo, .product-main-visual')
    imagePanels.forEach((panel) => {
      gsap.fromTo(panel, { scale: .96 }, { scale: 1, duration: .85, ease: 'power2.out', clearProps: 'transform', scrollTrigger: { trigger: panel, start: 'top 90%', once: true } })
    })

    requestAnimationFrame(() => ScrollTrigger.refresh())
  }, { scope, dependencies: [currentPage] })
}
