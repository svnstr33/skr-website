import { useRef } from 'react'
import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { FactoryOverview } from './components/home/FactoryOverview'
import { Hero } from './components/home/Hero'
import { QualityStrip } from './components/home/QualityStrip'
import { PremiumHome } from './components/home/PremiumHome'
import { CompanyProfile } from './components/profile/CompanyProfile'
import { LeadershipSection } from './components/profile/LeadershipSection'
import { ContactPage } from './components/pages/ContactPage'
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
    menuOpen,
    openDropdown,
    openPage,
    toggleMenu,
    toggleDropdown,
    closeDropdown,
  } = useHashRouter()

  const isProfilePage = currentPage === 'profile'
  const isHomePage = currentPage === 'home'
  const standardContent = pageContent[currentPage]
  const productId = currentPage.startsWith('product-') ? currentPage.slice('product-'.length) : null
  const knownPage = isHomePage || isProfilePage || currentPage === 'contact' || Boolean(standardContent) || Boolean(productId)
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

      <Hero visible={isHomePage} onOpenPage={openPage} />

      {isHomePage && (
        <>
          <FactoryOverview onOpenPage={openPage} />
          <QualityStrip />
          <PremiumHome onOpenPage={openPage} />
        </>
      )}

      <CompanyProfile visible={isProfilePage} />
      <LeadershipSection visible={isProfilePage} />

      {standardContent && !operationsPage && <StandardPage content={standardContent} />}
      {productId && <ProductDetailPage productId={productId} />}
      {currentPage === 'contact' && <ContactPage />}
      {operationsPage && <OperationsPage page={operationsPage} />}
      {!pageExists && <NotFoundPage />}

      <Footer onOpenPage={openPage} />
    </div>
  )
}

export default App
