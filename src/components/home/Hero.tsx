type HeroProps = { visible: boolean; onOpenPage: (page: string) => void }

export function Hero({ visible, onOpenPage }: HeroProps) {
  return <main id="home" className={`hero-panel ${!visible ? 'page-hidden' : ''}`}>
    <section className="hero-copy hero-premium-copy">
      <p className="eyebrow">SKR Metal Industries Pvt. Ltd.</p>
      <h1>Precision metal products &amp; engineering solutions.</h1>
      <p className="hero-text">Manufacturing umbrella ribs and frames along with precision-machined metal components for industrial applications—driven by accuracy, consistency and reliable performance.</p>
      <div className="hero-actions"><a href="#contact" className="hero-btn hero-btn-primary" onClick={() => onOpenPage('contact')}>Get a Quote</a><a href="#products" className="hero-btn hero-btn-secondary" onClick={() => onOpenPage('products')}>Explore Products</a></div>
      <div className="hero-footnote"><span>01</span> Accuracy-led manufacturing for reliable industrial output.</div>
    </section>
    <aside className="hero-card hero-visual-card"><div className="hero-visual image-cover" role="img" aria-label="Industrial engineering facility" /><div><p className="hero-card-label">Our Advantage</p><h2>Technical clarity. Reliable execution.</h2></div><ul className="info-list"><li>Precision-controlled production</li><li>Two specialist manufacturing divisions</li><li>Consistent batch quality</li></ul></aside>
  </main>
}
