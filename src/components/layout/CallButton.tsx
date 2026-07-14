import { FiPhone } from 'react-icons/fi'
import { useSiteSettings } from '../../lib/siteSettings'

export function CallButton() {
  const { contact_phone: phone } = useSiteSettings()
  if (!phone.trim()) return null

  return <a className="call-fab" href={`tel:${phone.replace(/[^+\d]/g, '')}`} aria-label={`Call SKR at ${phone}`}><FiPhone /><span>Call us</span></a>
}
