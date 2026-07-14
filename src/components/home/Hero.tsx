import { useSiteSettings } from '../../lib/siteSettings'
import taglineImage from '../../assets/tagline.jpeg'

type HeroProps = { visible: boolean; onOpenPage: (page: string) => void }

export function Hero({ visible, onOpenPage }: HeroProps) {
  const settings = useSiteSettings()
  return <>
    <main id="home" className={`hero-panel ${!visible ? 'page-hidden' : ''}`}>
      <section className="hero-copy hero-premium-copy">
        <p className="eyebrow">{settings.hero_eyebrow}</p>
        <h1>{settings.hero_title}</h1>
        <p className="hero-text">{settings.hero_description}</p>
        <div className="hero-actions"><a href="#contact-form" className="hero-btn hero-btn-primary" onClick={() => onOpenPage('contact-form')}>Get a Quote</a><a href="#products" className="hero-btn hero-btn-secondary" onClick={() => onOpenPage('products')}>Explore Products</a></div>
        <div className="hero-footnote"><span>01</span> Accuracy-led manufacturing for reliable industrial output.</div>
      </section>
      <aside className="hero-card hero-visual-card"><div className="hero-visual image-cover" role="img" aria-label="Industrial engineering facility" /><div><p className="hero-card-label">Our Advantage</p><h2>Technical clarity. Reliable execution.</h2></div><ul className="info-list"><li>Precision-controlled production</li><li>Two specialist manufacturing divisions</li><li>Consistent batch quality</li></ul></aside>
    </main>

    {visible && <section className="brand-tagline" aria-label="SKR Metal Industries brand tagline">
      <div className="brand-tagline-copy"><p className="eyebrow">SKR Metal Industries</p><h2>Where Quality Meets Innovation</h2><p>Our commitment to precision manufacturing, dependable quality and practical engineering solutions.</p></div>
      <img src={taglineImage} alt="SKR Metal Industries Private Limited, Suthar Group — Where Quality Meets Innovation" />
    </section>}
  </>
}
