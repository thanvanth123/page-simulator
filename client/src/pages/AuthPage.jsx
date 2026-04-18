import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AuthPage({ setUser }) {
  const [mode, setMode] = useState('login')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setBusy(true)
    const url = mode === 'login' ? '/api/auth/login' : '/api/auth/register'
    const payload = mode === 'login' ? { email, password } : { username, email, password }
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    const data = await response.json()
    setBusy(false)
    if (response.ok) {
      localStorage.setItem('mpio_token', data.token)
      localStorage.setItem('mpio_user', JSON.stringify(data.user))
      setUser(data.user)
      navigate('/learn')
    } else {
      setMessage(data.message || 'Authentication failed')
    }
  }

  return (
    <main className="mx-auto flex min-h-[calc(100vh-80px)] items-center justify-center px-6 py-16">
      <div className="relative w-full max-w-3xl overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-cyan-500/10 backdrop-blur-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-slate-950/0" />
        <div className="relative z-10 grid gap-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-white">{mode === 'login' ? 'Welcome Back' : 'Create Account'}</h1>
            <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')} className="rounded-full border border-cyan-500 px-4 py-2 text-cyan-200 transition hover:bg-cyan-500/10">
              {mode === 'login' ? 'Register' : 'Login'}
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4 text-slate-200">
            {mode === 'register' ? (
              <label className="block">
                <span className="text-sm text-slate-300">Username</span>
                <input value={username} onChange={(e) => setUsername(e.target.value)} className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none" required />
              </label>
            ) : null}
            <label className="block">
              <span className="text-sm text-slate-300">Email</span>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none" required />
            </label>
            <label className="block">
              <span className="text-sm text-slate-300">Password</span>
              <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none" required />
            </label>
            <button type="submit" className="glow-button w-full" disabled={busy}>{busy ? 'Processing...' : mode === 'login' ? 'Login' : 'Register'}</button>
            {message ? <p className="text-sm text-rose-400">{message}</p> : null}
          </form>
        </div>
      </div>
    </main>
  )
}
