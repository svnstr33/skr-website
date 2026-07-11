import { FiFacebook, FiInstagram, FiLinkedin, FiMail, FiMapPin, FiTwitter } from 'react-icons/fi'

type FooterProps = {
  onOpenPage: (page: string) => void
}

export function Footer({ onOpenPage }: FooterProps) {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-left">
          <div className="footer-section">
            <h3>SKR Metal Industries Pvt. Ltd.</h3>
            <p className="footer-desc">Precision engineering & dependable manufacturing solutions for modern industry.</p>
          </div>
          <div className="footer-section">
            <p className="footer-label"><FiMapPin className="footer-icon" /> Address</p>
            <p className="footer-text">A-36, Rana Pratap Marg Industrial Area, Falna, Pali, Rajasthan 306116</p>
          </div>
          <div className="footer-section">
            <p className="footer-label"><FiMail className="footer-icon" /> Email</p>
            <a href="mailto:nrsuthar@suthargroup.com" className="footer-link">nrsuthar@suthargroup.com</a>
          </div>
        </div>

        <div className="footer-right">
          <div className="footer-section">
            <p className="footer-label">Follow Us</p>
            <div className="footer-socials">
              <a href="#" rel="noopener noreferrer" className="social-link" title="LinkedIn"><FiLinkedin className="social-icon" /></a>
              <a href="#" rel="noopener noreferrer" className="social-link" title="Facebook"><FiFacebook className="social-icon" /></a>
              <a href="#" rel="noopener noreferrer" className="social-link" title="Twitter"><FiTwitter className="social-icon" /></a>
              <a href="#" rel="noopener noreferrer" className="social-link" title="Instagram"><FiInstagram className="social-icon" /></a>
            </div>
          </div>
          <div className="footer-section">
            <p className="footer-label">Quick Links</p>
            <div className="footer-links">
              <a href="#profile" className="footer-link" onClick={() => onOpenPage('profile')}>About</a>
              <a href="#products" className="footer-link" onClick={() => onOpenPage('products')}>Products</a>
              <a href="#umbrella-manufacturing" className="footer-link" onClick={() => onOpenPage('umbrella-manufacturing')}>Divisions</a>
              <a href="#contact" className="footer-link" onClick={() => onOpenPage('contact')}>Contact</a>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="footer-copyright">© 2026 SKR Metal Industries Pvt. Ltd. All Rights Reserved.</p>
      </div>
    </footer>
  )
}
