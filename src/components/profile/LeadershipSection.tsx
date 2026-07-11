import { leadership, teamMembers } from '../../data/company'

type LeadershipSectionProps = { visible: boolean }

type PersonCardProps = { name: string; role: string; initials: string }
function PersonCard({ name, role, initials }: PersonCardProps) {
  return <article className="leader-card">
    <div className="leader-photo" aria-label={`${name} photo placeholder`}><span>{initials}</span><small>Photo</small></div>
    <div className="leader-content"><p>{role}</p><h3>{name}</h3><span>SKR Metal Industries Pvt. Ltd.</span></div>
  </article>
}

export function LeadershipSection({ visible }: LeadershipSectionProps) {
  return <section className={`leadership-section ${visible ? 'profile-visible' : 'profile-hidden'}`} aria-labelledby="leadership-title">
    <div className="leadership-heading"><div><p className="eyebrow">People Behind SKR</p><h2 id="leadership-title">Leadership &amp; Team</h2></div><p>Meet the people supporting SKR’s manufacturing operations, coordination and quality-focused delivery.</p></div>
    <div className="leadership-grid">{leadership.map(([name, role, initials]) => <PersonCard key={name} name={name} role={role} initials={initials} />)}</div>
    <div className="team-section-heading"><p className="eyebrow">Operations Team</p><h3>Working together for reliable production.</h3></div>
    <div className="leadership-grid team-grid">{teamMembers.map(([name, role, initials]) => <PersonCard key={name} name={name} role={role} initials={initials} />)}</div>
    <p className="photo-note">Profile placeholders are ready for actual team photographs.</p>
  </section>
}
