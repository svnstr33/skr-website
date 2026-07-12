import engineeringImage from '../../assets/eng.jpeg'
import umbrellaImage from '../../assets/umbrella.jpeg'

type FactoryOverviewProps = { onOpenPage: (page: string) => void }

export function FactoryOverview({ onOpenPage }: FactoryOverviewProps) {
  return <section className="factory-overview" aria-labelledby="factories-title">
    <div className="section-heading"><div><p className="eyebrow">Our Divisions</p><h2 id="factories-title">Manufacturing expertise for every requirement.</h2></div><p>Two focused divisions combine dependable umbrella-frame production with precision machining for industrial applications.</p></div>
    <div className="factory-grid">
      <article className="factory-card umbrella-factory"><img className="factory-card-image" src={umbrellaImage} alt="Umbrella frame components" /><span>Division 01</span><h3>Umbrella Division</h3><p>2 Fold, 3 Fold, Solid, Piano and Golf umbrella ribs and frames engineered for strength, flexibility and smooth functionality.</p><a href="#umbrella-manufacturing" onClick={() => onOpenPage('umbrella-manufacturing')}>Explore division →</a></article>
      <article className="factory-card engineering-factory"><img className="factory-card-image" src={engineeringImage} alt="Precision engineering components" /><span>Division 02</span><h3>Engineering &amp; Hardware</h3><p>CNC, VMC, EDM and specialised-machine production for precision metal components and custom engineered parts.</p><a href="#vishwakarma-engineering" onClick={() => onOpenPage('vishwakarma-engineering')}>Explore division →</a></article>
    </div>
  </section>
}
