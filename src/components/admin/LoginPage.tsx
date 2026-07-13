import { useState } from 'react'
import { FiAlertCircle, FiLock, FiMail } from 'react-icons/fi'
import { isBackendConfigured, supabase } from '../../lib/supabase'

export function LoginPage({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const login = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!supabase) return setError('Backend is not configured yet. Add the Supabase environment variables to enable admin login.')
    setLoading(true); setError('')
    const { error: loginError } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (loginError) setError(loginError.message)
    else onSuccess()
  }
  return <main className="admin-auth-page"><a className="admin-back-link" href="/">← Back to website</a><section className="admin-auth-card"><div className="admin-auth-mark">SKR</div><p className="eyebrow">Secure access</p><h1>Admin dashboard</h1><p>Sign in to manage enquiries and website operations.</p>{!isBackendConfigured && <div className="admin-notice"><FiAlertCircle /> Supabase setup is required before login can be used.</div>}<form onSubmit={login}><label>Email<FiMail /><input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="admin@company.com" /></label><label>Password<FiLock /><input required type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Your password" /></label>{error && <p className="admin-form-error" role="alert">{error}</p>}<button disabled={loading} type="submit">{loading ? 'Signing in…' : 'Sign in securely'}</button></form><small>This page is intentionally not linked in the public navigation.</small></section></main>
}
