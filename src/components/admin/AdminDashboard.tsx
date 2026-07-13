import { useEffect, useState } from 'react'
import { FiArrowLeft, FiCheckCircle, FiClock, FiFileText, FiLogOut, FiMail, FiRefreshCw, FiUsers } from 'react-icons/fi'
import { supabase } from '../../lib/supabase'
import { SiteContentManager } from './SiteContentManager'

type Enquiry = { id: string; created_at: string; name: string; company: string; email: string; type: string; status: string; requirement: string; attachment_url: string | null }
const statusOptions = ['new', 'in_review', 'replied', 'closed']
const prettyStatus = (value: string) => value.replace('_', ' ')

export function AdminDashboard({ onExit }: { onExit: () => void }) {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [authorised, setAuthorised] = useState(false)
  const [error, setError] = useState('')
  const load = async () => {
    if (!supabase) return
    setLoading(true); setError('')
    const { data, error: queryError } = await supabase.from('enquiries').select('*').order('created_at', { ascending: false })
    if (queryError) setError(queryError.message); else setEnquiries((data ?? []) as Enquiry[])
    setLoading(false)
  }
  useEffect(() => { void supabase?.auth.getSession().then(async ({ data }) => { if (!data.session) { onExit(); return }; setAuthorised(true); await load() }) }, [])
  const updateStatus = async (id: string, status: string) => { if (!supabase) return; const { error: updateError } = await supabase.from('enquiries').update({ status }).eq('id', id); if (updateError) setError(updateError.message); else setEnquiries((items) => items.map((item) => item.id === id ? { ...item, status } : item)) }
  const logout = async () => { await supabase?.auth.signOut(); onExit() }
  const openAttachment = async (filePath: string) => { if (!supabase) return; const { data, error: fileError } = await supabase.storage.from('enquiry-files').createSignedUrl(filePath, 60); if (fileError || !data) { setError(fileError?.message ?? 'Could not open the attachment.'); return }; window.open(data.signedUrl, '_blank', 'noopener,noreferrer') }
  const newCount = enquiries.filter((item) => item.status === 'new').length
  const reviewCount = enquiries.filter((item) => item.status === 'in_review').length
  if (!authorised) return <main className="admin-auth-page"><p className="admin-loading">Checking secure session…</p></main>
  return <main className="admin-dashboard">
    <aside className="admin-sidebar"><a className="admin-brand" href="/">SKR <span>Admin</span></a><nav><a href="#overview"><FiUsers /> Overview</a><a href="#enquiries"><FiMail /> Enquiries <b>{newCount}</b></a><a href="#content"><FiFileText /> Website content</a></nav><button onClick={logout}><FiLogOut /> Sign out</button></aside>
    <section className="admin-content">
      <header><div><p className="eyebrow">Admin workspace</p><h1>Business overview</h1><p>Review incoming manufacturing enquiries and update your public website.</p></div><div className="admin-header-actions"><a href="/" title="View public website"><FiArrowLeft /> Website</a><button onClick={() => void load()}><FiRefreshCw /> Refresh</button></div></header>
      <section id="overview" className="admin-stats"><article><FiMail /><span>All enquiries<b>{enquiries.length}</b></span></article><article><FiClock /><span>New leads<b>{newCount}</b></span></article><article><FiCheckCircle /><span>In review<b>{reviewCount}</b></span></article></section>
      <section id="enquiries" className="admin-panel"><div className="admin-panel-heading"><div><p className="eyebrow">Lead inbox</p><h2>Recent enquiries</h2></div><span>{loading ? 'Loading…' : `${enquiries.length} total`}</span></div>{error && <p className="admin-form-error">{error}</p>}{!loading && !enquiries.length && !error && <p className="admin-empty">No enquiries yet. New quote requests will appear here automatically.</p>}<div className="admin-enquiry-list">{enquiries.map((item) => <article key={item.id}><div className="admin-enquiry-main"><b>{item.name}</b><span>{item.company || 'Individual enquiry'} · {item.type}</span><a href={`mailto:${item.email}`}>{item.email}</a><p>{item.requirement}</p></div><div className="admin-enquiry-meta"><time>{new Date(item.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</time><select value={item.status} onChange={(event) => void updateStatus(item.id, event.target.value)} aria-label={`Status for ${item.name}`}>{statusOptions.map((status) => <option key={status} value={status}>{prettyStatus(status)}</option>)}</select>{item.attachment_url && <button type="button" onClick={() => void openAttachment(item.attachment_url!)}>Open attachment</button>}</div></article>)}</div></section>
      <SiteContentManager />
    </section>
  </main>
}
