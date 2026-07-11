import { useState } from 'react'
import { FiClock, FiFacebook, FiGlobe, FiInstagram, FiLinkedin, FiMail, FiMapPin, FiMessageCircle, FiPhone, FiSend } from 'react-icons/fi'

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  return (
    <main className="contact-detail-page" aria-labelledby="contact-page-title">
      <section className="contact-hero">
        <div><p className="eyebrow">Business Enquiries</p><h1 id="contact-page-title">Let’s discuss your manufacturing requirement.</h1><p>Tell us what you need—product, drawing, sample, material, quantity or delivery requirement. The right SKR team can then review your enquiry.</p></div>
        <div className="image-placeholder contact-image page-visual" role="img" aria-label="SKR factory team and reception"><span>SKR Metal Industries</span><strong>Let’s build the right production path.</strong><small>Our team will connect your enquiry with the appropriate specialist division.</small></div>
      </section>
      <section className="contact-info-grid" aria-label="Contact details">
        <article><FiMail /><div><span>Email us</span><a href="mailto:nrsuthar@suthargroup.com">nrsuthar@suthargroup.com</a><small>For product, technical and business enquiries</small></div></article>
        <article><FiMapPin /><div><span>Registered office</span><p>A-36, Rana Pratap Marg Industrial Area, Falna, Pali, Rajasthan 306116, India</p></div></article>
        <article><FiClock /><div><span>Response process</span><p>Share complete requirements for a faster review by the relevant division.</p></div></article>
      </section>
      <section className="contact-channel-section">
        <div className="contact-map" role="img" aria-label="Map location for SKR Metal Industries in Falna, Rajasthan"><div><FiMapPin /><strong>Falna, Rajasthan</strong><span>India</span></div><a href="https://www.google.com/maps/search/?api=1&query=A-36%2C%20Rana%20Pratap%20Marg%20Industrial%20Area%2C%20Falna%2C%20Pali%2C%20Rajasthan%20306116" target="_blank" rel="noreferrer">Open Google Maps</a></div>
        <div className="contact-channels"><p className="eyebrow">Connect with SKR</p><h2>Choose the right channel for your requirement.</h2><div><article><FiPhone /><span><b>Phone / WhatsApp</b><small>Share your enquiry by email to receive the appropriate contact channel.</small></span></article><article><FiClock /><span><b>Business hours</b><small>Monday–Saturday · Business enquiries responded to by the relevant team.</small></span></article><article><FiGlobe /><span><b>Export enquiries</b><small>Include your country, product details and expected quantity in the enquiry.</small></span></article></div><nav className="contact-socials" aria-label="SKR social channels"><a href="#contact" aria-label="LinkedIn"><FiLinkedin /></a><a href="#contact" aria-label="Facebook"><FiFacebook /></a><a href="#contact" aria-label="Instagram"><FiInstagram /></a><a href="mailto:nrsuthar@suthargroup.com" aria-label="Email SKR"><FiMessageCircle /></a></nav></div>
      </section>
      <section className="contact-enquiry-section">
        <div className="enquiry-copy"><p className="eyebrow">Request a Quote</p><h2>Send a clear enquiry.</h2><p>For the most useful response, include the division, item details, material, quantity, drawing or sample availability, delivery location and any quality requirement.</p><ul><li>Umbrella Manufacturing requirements</li><li>Vishwakarma Engineering requirements</li><li>Custom metal component or fabrication enquiries</li></ul></div>
        <form className="contact-form" onSubmit={(event) => { event.preventDefault(); setSubmitted(true) }}>
          <div className="form-row"><label>Name<input required name="name" type="text" placeholder="Your full name" /></label><label>Company<input required name="company" type="text" placeholder="Company name" /></label></div>
          <div className="form-row"><label>Email<input required name="email" type="email" placeholder="you@company.com" /></label><label>Phone<input name="phone" type="tel" placeholder="Phone number" /></label></div>
          <label>Enquiry type<select required name="type" defaultValue=""><option value="" disabled>Select a requirement</option><option>Umbrella Manufacturing</option><option>Vishwakarma Engineering</option><option>Products / Custom Requirement</option><option>General Business Enquiry</option></select></label>
          <label>Requirement details<textarea required name="requirement" placeholder="Product or component details, material, quantity, drawing/sample availability and delivery requirement" rows={6} /></label>
          <button type="submit"><FiSend /> Submit enquiry</button>
          {submitted && <p className="form-success" role="status">Thank you. Please email the same requirement to nrsuthar@suthargroup.com to submit it officially.</p>}
          <small>This form is not connected to a CRM yet. Email is the official enquiry channel.</small>
        </form>
      </section>
    </main>
  )
}
