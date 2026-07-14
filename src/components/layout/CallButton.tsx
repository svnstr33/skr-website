import { FiPhone } from 'react-icons/fi'
export function CallButton() {
  const phone = '1234567890'
  if (!phone) return null

  return <a className="call-fab" href={`tel:${phone.replace(/[^+\d]/g, '')}`} aria-label={`Call SKR at ${phone}`}><FiPhone /><span>Call us</span></a>
}
