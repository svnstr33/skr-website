import { FiHome, FiRefreshCw, FiWifiOff } from 'react-icons/fi'

export function OfflinePage() {
  return (
    <main className="offline-page">
      <FiWifiOff aria-hidden="true" />
      <p className="eyebrow">Connection unavailable</p>
      <h1>You are offline.</h1>
      <p>Check your internet connection, then try again. Pages you have already visited may still be available.</p>
      <div>
        <button type="button" className="hero-btn hero-btn-primary" onClick={() => window.location.reload()}><FiRefreshCw /> Try again</button>
        <a href="#home" className="outline-button"><FiHome /> Back to home</a>
      </div>
    </main>
  )
}
