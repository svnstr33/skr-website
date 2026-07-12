import { useRef } from 'react'
import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { QuoteModal } from './components/layout/QuoteModal'
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
import { operations } from './data/operations'
import { StandardPage } from './components/pages/StandardPage'
import { pageContent } from './data/pageContent'
import { useHashRouter } from './hooks/useHashRouter'
import { usePageAnimations } from './hooks/usePageAnimations'
import { useScrollTopbar } from './hooks/useScrollTopbar'
import './styles/app.css'

function App() {
  const appScope = useRef<HTMLDivElement>(null)
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
  const standardContent = pageContent[currentPage]
  const productId = currentPage.startsWith('product-') ? currentPage.slice('product-'.length) : null
  const knownPage = isHomePage || isProfilePage || isContactPage || Boolean(standardContent) || Boolean(productId)
  const operationsPage = operations[currentPage] ? currentPage : null
  const pageExists = knownPage || Boolean(operationsPage)

  useScrollTopbar()
  usePageAnimations(appScope, currentPage)

  return (
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
      {operationsPage && <OperationsPage page={operationsPage} />}
      {!pageExists && <NotFoundPage />}
      </div>

      <Footer onOpenPage={openPage} />
      {quoteModalOpen && <QuoteModal onClose={closeQuoteModal} />}
    </div>
  )
}

export default App
