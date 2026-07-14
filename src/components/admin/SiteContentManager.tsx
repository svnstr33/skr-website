import { useEffect, useState } from 'react'
import { FiSave } from 'react-icons/fi'
import { defaultSiteSettings, type SiteSettings } from '../../lib/siteSettings'
import { supabase } from '../../lib/supabase'

export function SiteContentManager() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSiteSettings)
  const [state, setState] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  useEffect(() => { void supabase?.from('site_settings').select('*').eq('id', 'main').maybeSingle().then(({ data }) => { if (data) setSettings({ ...defaultSiteSettings, ...data }) }) }, [])
  const update = (key: keyof SiteSettings, value: string) => setSettings((current) => ({ ...current, [key]: value }))
  const save = async (event: React.FormEvent) => { event.preventDefault(); if (!supabase) return; setState('saving'); const { error } = await supabase.from('site_settings').upsert({ id: 'main', ...settings, updated_at: new Date().toISOString() }); setState(error ? 'error' : 'saved') }

  return <section id="content" className="admin-panel admin-content-manager"><div className="admin-panel-heading"><div><p className="eyebrow">Website CMS</p><h2>Edit live website content</h2></div><span>Changes show after refresh</span></div><form onSubmit={save}><div className="admin-content-grid"><label>Hero label<input value={settings.hero_eyebrow} onChange={(event) => update('hero_eyebrow', event.target.value)} /></label><label>Hero heading<input value={settings.hero_title} onChange={(event) => update('hero_title', event.target.value)} /></label><label className="admin-field-wide">Hero description<textarea rows={3} value={settings.hero_description} onChange={(event) => update('hero_description', event.target.value)} /></label><label>Contact email<input type="email" value={settings.contact_email} onChange={(event) => update('contact_email', event.target.value)} /></label><label>Business hours<input value={settings.business_hours} onChange={(event) => update('business_hours', event.target.value)} /></label><label className="admin-field-wide">Registered address<textarea rows={2} value={settings.contact_address} onChange={(event) => update('contact_address', event.target.value)} /></label><label className="admin-field-wide">Enquiry response text<textarea rows={2} value={settings.contact_response} onChange={(event) => update('contact_response', event.target.value)} /></label></div><button type="submit" disabled={state === 'saving'}><FiSave /> {state === 'saving' ? 'Saving…' : 'Save website changes'}</button>{state === 'saved' && <span className="admin-save-success">Saved successfully.</span>}{state === 'error' && <span className="admin-form-error">Could not save. Confirm the updated SQL has been run.</span>}</form></section>
}
