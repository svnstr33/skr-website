import { FiArrowUpRight, FiCompass, FiTarget } from 'react-icons/fi'
import { directors } from '../../data/company'

type CompanyProfileProps = { visible: boolean }
const values = [
  ['Structured Manufacturing', 'A process-oriented approach from raw material processing to finishing.'],
  ['Machining Accuracy', 'Precision-focused production for demanding industrial applications.'],
  ['Production Efficiency', 'Controlled workflows that support consistent output and timely delivery.'],
  ['Long-Term Partnership', 'Practical engineering solutions and dependable client collaboration.'],
]

export function CompanyProfile({ visible }: CompanyProfileProps) {
  return <section id="profile" className={`company-profile about-rich ${visible ? 'profile-visible' : 'profile-hidden'}`} aria-labelledby="company-profile-title">
    <div className="profile-heading"><div><p className="eyebrow">About SKR Metal Industries Pvt. Ltd.</p><p className="breadcrumb">Home <span>/</span> About SKR</p><h2 id="company-profile-title">Precision manufacturing for dependable industrial performance.</h2></div><div className="company-status"><span className="status-dot" /> Active</div></div>
    <p className="profile-intro">SKR METAL INDUSTRIES PVT. LTD. is a manufacturing-driven organisation engaged in the production of umbrella ribs and frames along with precision-machined metal components for industrial applications.</p>
    <section className="about-story"><div className="about-story-image"><span>SKR</span></div><div><p className="eyebrow">Who We Are</p><h3>Accuracy, consistency and technical excellence.</h3><p>Our operations are driven by structured manufacturing, process-oriented production, machining accuracy and production efficiency. We support both standardised production and customised manufacturing requirements.</p><p>Every production stage—from raw material processing and machining through inspection and finishing—is monitored for process control, repeatability and consistent quality.</p><a href="#contact">Discuss your requirement <FiArrowUpRight /></a></div></section>
    <div className="mission-vision"><article><FiTarget /><p className="eyebrow">Our Mission</p><h3>Deliver high-quality metal products through efficient manufacturing, continuous improvement, client-focused production, on-time delivery and strict quality standards.</h3></article><article><FiCompass /><p className="eyebrow">Our Vision</p><h3>Be a trusted and scalable manufacturing partner recognised for precision machining, consistent quality and long-term reliability.</h3></article></div>
    <section className="values-section"><div><p className="eyebrow">Our Approach</p><h3>Controlled production at every stage.</h3></div><div>{values.map(([title, copy], index) => <article key={title}><b>0{index + 1}</b><h4>{title}</h4><p>{copy}</p></article>)}</div></section>
    <section className="timeline-section"><div><p className="eyebrow">Manufacturing Focus</p><h3>Capabilities designed around customer requirements.</h3></div><div className="about-timeline"><article><b>01</b><h4>Understand</h4><p>Review technical drawings, customer samples and custom specifications.</p></article><article><b>02</b><h4>Manufacture</h4><p>Use controlled machining and specialised production processes.</p></article><article><b>03</b><h4>Verify</h4><p>Monitor dimensional accuracy, surface finish and consistent quality.</p></article></div></section>
    <div className="directors-card"><p className="card-kicker">Leadership</p><h3>Directors / Signatory Details</h3><div className="directors-grid">{directors.map(([din, name, date]) => <article key={din} className="director-profile-card"><div className="director-photo-placeholder" role="img" aria-label={`${name} photo placeholder`}><span>{name.split(' ').map((part) => part[0]).join('')}</span><small>Photo</small></div><div className="director-profile-content"><h4>{name}</h4><p>Director / Signatory</p><dl><div><dt>DIN / PAN</dt><dd>{din}</dd></div><div><dt>Begin Date</dt><dd>{date}</dd></div></dl></div></article>)}</div></div>
  </section>
}
