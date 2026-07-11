import { useMemo, useState } from 'react'
import { FiArrowUpRight, FiSearch, FiSliders } from 'react-icons/fi'
import type { PageContent } from '../../types'

type ProductCard = [string, string, string, 'Umbrella' | 'Engineering']
const products: ProductCard[] = [
  ['UF-201', '2 Fold Umbrella Frame', 'Strength, flexibility and smooth operation for compact umbrellas.', 'Umbrella'],
  ['UF-301', '3 Fold Umbrella Frame', 'Precision-made folding frame for dependable daily use.', 'Umbrella'],
  ['UF-401', 'Solid Umbrella Frame', 'Durable rigid-frame construction for reliable performance.', 'Umbrella'],
  ['UF-501', 'Piano Umbrella Frame', 'Smooth functional frame designed for consistent production.', 'Umbrella'],
  ['UF-601', 'Golf Umbrella Frame', 'Large-format frame engineered for strength and stability.', 'Umbrella'],
  ['EH-101', 'ATM Machine Parts', 'Precision-machined components for ATM machine applications.', 'Engineering'],
  ['EH-201', 'Printer Components', 'Accurate metal components for printer assemblies.', 'Engineering'],
  ['EH-301', 'Valve Fittings', 'Machined valve and fitting components made to specification.', 'Engineering'],
  ['EH-401', 'Control Panel Components', 'Custom metal components for electrical and control panels.', 'Engineering'],
  ['EH-501', 'Pressure Gauge Meter Parts', 'Precision parts for pressure instrumentation assemblies.', 'Engineering'],
  ['EH-601', 'Hardware Joineries', 'Reliable hardware and joinery components for industrial use.', 'Engineering'],
  ['EH-701', 'Custom Engineered Components', 'Manufactured from technical drawings, samples or custom specifications.', 'Engineering'],
]

export function StandardPage({ content }: { content: PageContent }) {
  const isProducts = content.eyebrow === 'Manufacturing Range'
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<'All' | ProductCard[3]>('All')
  const visibleProducts = useMemo(() => products.filter(([code, name, description, group]) => (filter === 'All' || group === filter) && `${code} ${name} ${description}`.toLowerCase().includes(query.toLowerCase())), [filter, query])

  return <main className="detail-page" aria-labelledby="detail-page-title">
    <section className="page-intro">
      <div className="page-intro-copy"><p className="eyebrow">{content.eyebrow}</p><p className="breadcrumb">Home <span>/</span> {content.title}</p><h1 id="detail-page-title">{content.title}</h1><p>{content.description}</p><div className="page-intro-actions"><a className="hero-btn hero-btn-primary" href="#contact">Get a Quote <FiArrowUpRight /></a></div></div>
      <div className="image-placeholder image-placeholder-large page-visual" role="img" aria-label={content.imageLabel}><span>SKR Metal Industries</span><strong>{content.imageLabel}</strong><small>{content.imageNote}</small></div>
    </section>
    <section className="page-stats" aria-label="Page highlights">{content.stats.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</section>
    <section className="content-section overview-section"><div><p className="eyebrow">Overview</p><h2>{content.overviewTitle}</h2></div><p>{content.overview}</p></section>

    {isProducts && <section className="content-section product-explorer"><div className="section-title explorer-title"><div><p className="eyebrow">Product Explorer</p><h2>Find the right product.</h2></div><span><FiSliders /> Filter by division</span></div><div className="explorer-controls"><label><FiSearch /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search product or application" /></label><div>{(['All', 'Umbrella', 'Engineering'] as const).map((item) => <button className={filter === item ? 'active' : ''} onClick={() => setFilter(item)} key={item}>{item}</button>)}</div></div><div className="product-grid">{visibleProducts.map(([code, name, description, group]) => <article key={code}><div className="product-thumb"><span>{group === 'Umbrella' ? 'Umbrella Division' : 'Engineering & Hardware'}</span></div><small>{code}</small><h3>{name}</h3><p>{description}</p><a className="product-quote-link" href="#contact">Request a Quote <FiArrowUpRight /></a></article>)}{!visibleProducts.length && <p className="empty-state">No matching product found. Please send us your drawing or requirement.</p>}</div></section>}

    <section className="content-section"><div className="section-title"><p className="eyebrow">{isProducts ? 'Product Support' : 'What We Offer'}</p><h2>{isProducts ? 'Manufactured to meet your requirement.' : 'Built around your requirement.'}</h2></div><div className={`capability-grid ${content.cards.length > 3 ? 'capability-grid-gallery' : ''}`}>{content.cards.map((card) => <article className="capability-card" key={card.title}><p>{card.meta}</p><h3>{card.title}</h3><span>{card.body}</span><a href="#contact">Discuss your requirement <FiArrowUpRight /></a></article>)}</div></section>
    <section className="content-section process-section"><div className="section-title"><p className="eyebrow">Working Method</p><h2>{content.processTitle}</h2></div><div className="process-grid">{content.process.map((step) => <article key={step.title}><span>{step.meta}</span><h3>{step.title}</h3><p>{step.body}</p></article>)}</div></section>
    <section className="page-cta"><div><p className="eyebrow">Talk to SKR</p><h2>{content.cta}</h2></div><a href="#contact" className="hero-btn hero-btn-primary">Contact our team <FiArrowUpRight /></a></section>
  </main>
}
