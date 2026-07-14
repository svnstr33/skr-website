import { useEffect, useRef, useState } from 'react'
import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { QuoteModal } from './components/layout/QuoteModal'
import { SiteLoader } from './components/layout/SiteLoader'
import { CallButton } from './components/layout/CallButton'
import { LoginPage } from './components/admin/LoginPage'
import { AdminDashboard } from './components/admin/AdminDashboard'
import { FactoryOverview } from './components/home/FactoryOverview'
import { Hero } from './components/home/Hero'
import { QualityStrip } from './components/home/QualityStrip'
import { PremiumHome } from './components/home/PremiumHome'
import { CompanyProfile } from './components/profile/CompanyProfile'
import { ContactPage } from './components/pages/ContactPage'
import { GalleryPage } from './components/pages/GalleryPage'
import { ProductDetailPage } from './components/pages/ProductDetailPage'
import { NotFoundPage } from './components/pages/NotFoundPage'
import { OperationsPage } from './components/pages/OperationsPage'
import { LegalPage } from './components/pages/LegalPage'
import { operations } from './data/operations'
import { StandardPage } from './components/pages/StandardPage'
import { pageContent } from './data/pageContent'
import { useHashRouter } from './hooks/useHashRouter'
import { usePageAnimations } from './hooks/usePageAnimations'
import { useScrollTopbar } from './hooks/useScrollTopbar'
import './styles/app.css'

function App() {
  const appScope = useRef<HTMLDivElement>(null)
  const [pathname, setPathname] = useState(() => window.location.pathname)
  const [pageLoading, setPageLoading] = useState(true)
  useEffect(() => {
    const syncPath = () => setPathname(window.location.pathname)
    window.addEventListener('popstate', syncPath)
    return () => window.removeEventListener('popstate', syncPath)
  }, [])
  const navigateAdmin = (path: '/login' | '/dashboard') => {
    window.history.pushState(null, '', path)
    setPathname(path)
  }
  if (pathname === '/login') return <LoginPage onSuccess={() => navigateAdmin('/dashboard')} />
  if (pathname === '/dashboard') return <AdminDashboard onExit={() => navigateAdmin('/login')} />
  const {
    currentPage,
    quoteModalOpen,
    menuOpen,
    openDropdown,
    openPage,
    closeQuoteModal,
    toggleMenu,
    toggleDropdown,
    closeDropdown,
  } = useHashRouter()

  const isProfilePage = currentPage === 'profile'
  const isHomePage = currentPage === 'home'
  const isContactPage = currentPage === 'contact'
  const isGalleryPage = currentPage === 'gallery'
  const isPrivacyPage = currentPage === 'privacy-policy'
  const isTermsPage = currentPage === 'terms-and-conditions'
  const standardContent = pageContent[currentPage]
  const productId = currentPage.startsWith('product-') ? currentPage.slice('product-'.length) : null
  const knownPage = isHomePage || isProfilePage || isContactPage || isPrivacyPage || isTermsPage || Boolean(standardContent) || Boolean(productId)
  const operationsPage = operations[currentPage] ? currentPage : null
  const pageExists = knownPage || Boolean(operationsPage)

  useEffect(() => {
    setPageLoading(true)
    const timeout = window.setTimeout(() => setPageLoading(false), 520)
    return () => window.clearTimeout(timeout)
  }, [currentPage])

  useScrollTopbar()
  usePageAnimations(appScope, currentPage)

  return (
    <>
      <div ref={appScope} className="site-shell">
      <Header
        currentPage={currentPage}
        menuOpen={menuOpen}
        openDropdown={openDropdown}
        onToggleMenu={toggleMenu}
        onToggleDropdown={toggleDropdown}
        onCloseDropdown={closeDropdown}
        onOpenPage={openPage}
      />

      <a className="skip-link" href="#main-content">Skip to main content</a>
      <Hero visible={isHomePage} onOpenPage={openPage} />

      <div id="main-content" tabIndex={-1}>
      {isHomePage && (
        <>
          <FactoryOverview onOpenPage={openPage} />
          <QualityStrip />
          <PremiumHome onOpenPage={openPage} />
        </>
      )}

      <CompanyProfile visible={isProfilePage} />

      {standardContent && !operationsPage && !isGalleryPage && <StandardPage content={standardContent} />}
      {isGalleryPage && <GalleryPage />}
      {productId && <ProductDetailPage productId={productId} />}
      {isContactPage && <ContactPage />}
      {isPrivacyPage && <LegalPage type="privacy" />}
      {isTermsPage && <LegalPage type="terms" />}
      {operationsPage && <OperationsPage page={operationsPage} />}
      {!pageExists && <NotFoundPage />}
      </div>

      </div>
      <Footer onOpenPage={openPage} />
      <CallButton />
      {quoteModalOpen && <QuoteModal onClose={closeQuoteModal} />}
      <SiteLoader visible={pageLoading} />
    </>
  )
}

export default App
