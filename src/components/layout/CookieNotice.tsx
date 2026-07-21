import { useEffect, useState } from 'react'

const cookiePreferenceKey = 'skr-cookie-preference'

export function CookieNotice() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      setVisible(!window.localStorage.getItem(cookiePreferenceKey))
    } catch {
      setVisible(true)
    }
  }, [])

  const savePreference = (preference: 'accepted' | 'essential') => {
    try {
      window.localStorage.setItem(cookiePreferenceKey, preference)
    } catch {
      // The notice can still be dismissed when browser storage is unavailable.
    }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <section className="cookie-notice" role="dialog" aria-label="Cookie preferences">
      <div>
        <strong>Your privacy matters</strong>
        <p>We use essential cookies to keep this website working. With your permission, optional cookies may help us improve it.</p>
        <a href="#privacy-policy">Read our privacy policy</a>
      </div>
      <div className="cookie-notice-actions">
        <button type="button" className="cookie-essential" onClick={() => savePreference('essential')}>Only essential</button>
        <button type="button" className="cookie-accept" onClick={() => savePreference('accepted')}>Accept all</button>
      </div>
    </section>
  )
}
