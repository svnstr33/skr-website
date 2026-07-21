import { useSiteSettings } from '../../lib/siteSettings'

type LegalPageProps = { type: 'privacy' | 'terms' | 'disclaimer' }
type LegalSection = { title: string; paragraphs?: string[]; items?: string[] }

const privacySections: LegalSection[] = [
  { title: 'Company information', paragraphs: ['SKR Metal Industries Pvt. Ltd. operates this website. Our registered office is at A-36, Rana Pratap Marg Industrial Area, Falna, Pali, Rajasthan 306116, India. For privacy enquiries, contact skrfalna@suthargroup.com. Phone or WhatsApp contact details can be requested through email.'] },
  { title: 'Information we collect', paragraphs: ['We collect information you voluntarily provide when you contact us or submit a business enquiry. We may also receive limited technical information that is routinely sent by your browser.'], items: ['Name, email address, phone number and company name', 'Product enquiry, drawing, sample, material, quantity and delivery details', 'IP address, browser type, device information and pages visited', 'Cookie and preference information, where applicable'] },
  { title: 'How we use information', items: ['Reply to enquiries and prepare quotations', 'Review technical or manufacturing requirements', 'Provide customer support and relevant business communication', 'Maintain, protect and improve website performance', 'Send marketing communication only where you have allowed it or where permitted by law'] },
  { title: 'Cookies and third-party services', paragraphs: ['We may use essential session or preference cookies to operate the website. Analytics cookies, if enabled, help us understand website usage. You can manage or block cookies in your browser settings; some website features may then work differently.', 'Third-party services or links, such as Google Analytics, Google Maps, Gmail, WhatsApp, Cloudflare or Vercel, may process information under their own privacy policies when they are used.'] },
  { title: 'Data security and sharing', paragraphs: ['We use reasonable administrative, technical and organisational safeguards to protect information. No method of online transmission or electronic storage is completely secure.', 'We do not sell personal information. We may share information with authorised SKR personnel, service providers who help operate our business, or authorities where disclosure is legally required.'] },
  { title: 'Your rights', paragraphs: ['Subject to applicable law, you may request access to your information, correction of inaccurate information, a copy of your information, or deletion of information that is no longer required. Contact us using the details below to make a request.'] },
]

const termsSections: LegalSection[] = [
  { title: 'Acceptance of terms', paragraphs: ['By accessing or using this website, you agree to these Terms & Conditions. If you do not agree, please do not use the website.'] },
  { title: 'Permitted website use', items: ['Browse information about SKR Metal Industries Pvt. Ltd. and its capabilities', 'Contact the company for a legitimate business enquiry', 'Download brochures or documents made available for download'] },
  { title: 'Prohibited activities', items: ['Attempt to hack, disrupt or gain unauthorised access to the website or its systems', 'Scrape, harvest or misuse website data without written permission', 'Upload malware, send spam or submit false, misleading or fraudulent enquiries', 'Use the website in a way that breaches applicable law or infringes another person’s rights'] },
  { title: 'Intellectual property', paragraphs: ['The SKR name, logo, images, product photographs, content, documents, designs and other website materials are owned by SKR Metal Industries Pvt. Ltd. or their respective owners. They may not be copied, reproduced, published or used for commercial purposes without prior written permission.'] },
  { title: 'Product information, quotations and pricing', paragraphs: ['Website information is provided for general guidance only. Product specifications, material, availability, lead time and final scope are confirmed only in an official written quotation or agreement.', 'Prices, where applicable, may change without notice. Submitting an enquiry or receiving website information does not create a contract or obligation to supply.'] },
  { title: 'Third-party links and limitation of liability', paragraphs: ['This website may link to third-party websites or services for convenience. SKR does not control or endorse their content and is not responsible for their availability, privacy practices or accuracy.', 'To the maximum extent permitted by law, SKR is not liable for indirect, incidental or consequential loss arising from use of, or reliance on, this website.'] },
  { title: 'Changes and governing law', paragraphs: ['We may update these Terms & Conditions from time to time. Continued use of the website after an update means you accept the revised terms.', 'These Terms are governed by the laws of India. Any dispute relating to this website is subject to the jurisdiction of competent courts in Rajasthan, India.'] },
]

const disclaimerSections: LegalSection[] = [
  { title: 'General information only', paragraphs: ['The content on this website is provided for general information about SKR Metal Industries Pvt. Ltd., its manufacturing capabilities and its product range. It is not a binding offer, technical advice or a guarantee of suitability for a particular purpose.'] },
  { title: 'Product information', paragraphs: ['Product images, dimensions, materials, finishes, technical details and application examples are indicative and may vary. Final specifications, tolerances, availability, packaging and delivery requirements must be confirmed in an official written quotation or agreement.'] },
  { title: 'Website content and availability', paragraphs: ['We aim to keep website information accurate and current, but we do not guarantee that all content is complete, error-free or continuously available. We may change, remove or update content without notice.'] },
  { title: 'Third-party services and links', paragraphs: ['Links to third-party websites or services are provided for convenience. SKR does not control, endorse or take responsibility for their content, availability, privacy practices or security.'] },
  { title: 'Use of website materials', paragraphs: ['The SKR name, logo, photographs, product visuals, documents and written content may not be copied, reproduced or used for commercial purposes without prior written permission from SKR Metal Industries Pvt. Ltd.'] },
]

export function LegalPage({ type }: LegalPageProps) {
  const settings = useSiteSettings()
  const isPrivacy = type === 'privacy'
  const isDisclaimer = type === 'disclaimer'
  const title = isPrivacy ? 'Privacy Policy' : isDisclaimer ? 'Disclaimer' : 'Terms & Conditions'
  const intro = isPrivacy ? 'How we collect, use, protect and share information provided through this website and business enquiries.' : isDisclaimer ? 'Important information about using this website, its content and the information shown about our products and capabilities.' : 'The rules that apply when you access and use the SKR Metal Industries Pvt. Ltd. website.'
  const sections = isPrivacy ? privacySections : isDisclaimer ? disclaimerSections : termsSections

  return <main className="legal-page" aria-labelledby="legal-page-title">
    <header className="legal-page-header"><p className="eyebrow">SKR Metal Industries Pvt. Ltd.</p><h1 id="legal-page-title">{title}</h1><p>{intro}</p><small>Last updated: July 2026</small></header>
    <div className="legal-page-content">
      {sections.map((section, index) => <section key={section.title}><span>{String(index + 1).padStart(2, '0')}</span><div><h2>{section.title}</h2>{section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.items && <ul>{section.items.map((item) => <li key={item}>{item}</li>)}</ul>}</div></section>)}
    </div>
    <section className="legal-contact"><h2>Contact information</h2><p>For questions about this {title}, email <a href={`mailto:${settings.contact_email}`}>{settings.contact_email}</a> or write to {settings.contact_address}</p></section>
  </main>
}
