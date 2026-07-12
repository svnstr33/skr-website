import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { FiPaperclip, FiSend, FiX } from 'react-icons/fi'

const officialEmail = 'skrfalna@suthargroup.com'

export function QuoteModal({ onClose }: { onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false)
  const firstInput = useRef<HTMLInputElement>(null)
  const previousFocus = useRef<HTMLElement | null>(null)

  useEffect(() => {
    previousFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    firstInput.current?.focus()
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose() }
    document.addEventListener('keydown', closeOnEscape)
    return () => { document.removeEventListener('keydown', closeOnEscape); previousFocus.current?.focus() }
  }, [onClose])

  const submitQuote = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const values = new FormData(event.currentTarget)
    const attachment = values.get('attachment')
    const fileNote = attachment instanceof File && attachment.name ? `\nAttachment selected: ${attachment.name} (please attach this file manually to the email).` : ''
    const body = `Name: ${values.get('name')}\nCompany: ${values.get('company')}\nEmail: ${values.get('email')}\nPhone: ${values.get('phone') || 'Not provided'}\nEnquiry type: ${values.get('type')}\nQuantity: ${values.get('quantity') || 'To be discussed'}\nMaterial: ${values.get('material') || 'To be discussed'}\nFinish: ${values.get('finish') || 'To be discussed'}\nTarget delivery: ${values.get('delivery') || 'To be discussed'}\nLocation: ${values.get('location') || 'Not provided'}\n\nRequirement details:\n${values.get('requirement')}${fileNote}`
    setSubmitted(true)
    window.location.href = `mailto:${officialEmail}?subject=${encodeURIComponent(`Quote request from ${values.get('name')}`)}&body=${encodeURIComponent(body)}`
  }

  return <div className="quote-modal-backdrop" role="presentation" onMouseDown={onClose}><section className="quote-modal" role="dialog" aria-modal="true" aria-labelledby="quote-modal-title" onMouseDown={(event) => event.stopPropagation()}><button type="button" className="quote-modal-close" onClick={onClose} aria-label="Close quote form"><FiX /></button><p className="eyebrow">Request a Quote</p><h2 id="quote-modal-title">Send your requirement.</h2><p className="quote-modal-intro">Complete the brief below. Your email application will open with the enquiry ready to send to SKR.</p><form id="contact-form" className="contact-form quote-modal-form" onSubmit={submitQuote}><div className="form-row"><label>Name<input ref={firstInput} required name="name" type="text" placeholder="Your full name" /></label><label>Company<input required name="company" type="text" placeholder="Company name" /></label></div><div className="form-row"><label>Email<input required name="email" type="email" placeholder="you@company.com" /></label><label>Phone<input name="phone" type="tel" placeholder="Phone number" /></label></div><div className="form-row"><label>Enquiry type<select required name="type" defaultValue=""><option value="" disabled>Select a requirement</option><option>Umbrella Manufacturing</option><option>Engineering Components</option><option>Custom Manufacturing</option><option>General Business Enquiry</option></select></label><label>Quantity<input name="quantity" type="text" placeholder="Example: 5,000 pieces" /></label></div><div className="form-row"><label>Material<input name="material" type="text" placeholder="Example: SS 304 / Aluminium" /></label><label>Finish<input name="finish" type="text" placeholder="Example: powder coated" /></label></div><div className="form-row"><label>Target delivery<input name="delivery" type="text" placeholder="Required delivery date" /></label><label>Delivery location<input name="location" type="text" placeholder="City, state, country" /></label></div><label>Requirement details<textarea required name="requirement" placeholder="Product or component details, dimensions, tolerances, application and any quality requirement" rows={5} /></label><label className="file-upload-label"><span><FiPaperclip /> Drawing or PDF (optional)</span><input name="attachment" type="file" accept=".pdf,.dwg,.dxf,.step,.stp,.jpg,.jpeg,.png" /><small>The selected file cannot be attached automatically; attach it manually when your email app opens.</small></label><label className="form-consent"><input required name="consent" type="checkbox" /> <span>I agree that SKR may use these details to respond to this business enquiry.</span></label><button type="submit"><FiSend /> Open email and send enquiry</button>{submitted && <p className="form-success" role="status">Your email application should now be open. Attach the selected file if needed, then send the message.</p>}</form></section></div>
}
