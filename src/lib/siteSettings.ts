import { useEffect, useState } from 'react'
import { supabase } from './supabase'

export type SiteSettings = {
  hero_eyebrow: string; hero_title: string; hero_description: string
  contact_email: string; contact_phone: string; contact_address: string
  contact_response: string; business_hours: string
}

export const defaultSiteSettings: SiteSettings = {
  hero_eyebrow: 'SKR Metal Industries Pvt. Ltd.',
  hero_title: 'Precision metal products & engineering solutions.',
  hero_description: 'Manufacturing umbrella ribs and frames along with precision-machined metal components for industrial applications—driven by accuracy, consistency and reliable performance.',
  contact_email: 'skrfalna@suthargroup.com',
  contact_phone: '',
  contact_address: 'A-36, Rana Pratap Marg Industrial Area, Falna, Pali, Rajasthan 306116, India',
  contact_response: 'Share complete requirements for a faster review by the relevant division.',
  business_hours: 'Monday–Saturday · Business enquiries responded to by the relevant team.',
}

export function useSiteSettings() {
  const [settings, setSettings] = useState(defaultSiteSettings)
  useEffect(() => { void supabase?.from('site_settings').select('*').eq('id', 'main').maybeSingle().then(({ data }) => { if (data) setSettings({ ...defaultSiteSettings, ...data }) }) }, [])
  return settings
}
