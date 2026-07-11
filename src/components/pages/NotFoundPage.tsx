import { FiArrowLeft, FiHome } from 'react-icons/fi'

export function NotFoundPage() {
  return <main className="not-found-page"><p className="eyebrow">404 · Page Not Found</p><h1>This page is not available.</h1><p>The link may have changed, or the requested product page may not yet be published.</p><div><a href="#home" className="hero-btn hero-btn-primary"><FiHome /> Back to home</a><a href="#products" className="outline-button"><FiArrowLeft /> Browse products</a></div></main>
}
