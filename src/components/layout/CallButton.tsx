import { FiPhone } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
export function CallButton() {
  const phone = '1234567890'
  if (!phone) return null

  return <>
    <a className="whatsapp-fab" href="#contact-form" aria-label="Open WhatsApp enquiry form" title="WhatsApp enquiry"><FaWhatsapp /></a>
    <a className="call-fab" href={`tel:${phone.replace(/[^+\d]/g, '')}`} aria-label={`Call SKR at ${phone}`}><FiPhone /><span>Call us</span></a>
  </>
}
