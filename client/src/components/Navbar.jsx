import { Link } from 'react-router-dom'

export default function Navbar({ user, onLogout }) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 text-sm text-slate-200">
        <Link to="/" className="text-xl font-semibold tracking-tight text-cyan-300">Master Paging</Link>
        <nav className="hidden gap-4 md:flex">
          <Link className="hover:text-white" to="/learn">Learn</Link>
          <Link className="hover:text-white" to="/address-translation">Translation</Link>
          <Link className="hover:text-white" to="/page-replacement">Simulator</Link>
          <Link className="hover:text-white" to="/quiz">Quiz</Link>
          <Link className="hover:text-white" to="/leaderboard">Leaderboard</Link>
        </nav>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="rounded-full bg-slate-800 px-3 py-1 text-xs uppercase tracking-[0.18em] text-slate-300">{user.username}</span>
              <button onClick={onLogout} className="rounded-full border border-cyan-500 px-4 py-2 text-cyan-300 transition hover:bg-cyan-500/10">Logout</button>
            </>
          ) : (
            <Link to="/auth" className="rounded-full bg-cyan-500 px-4 py-2 text-slate-950 transition hover:bg-cyan-400">Login / Register</Link>
          )}
        </div>
      </div>
    </header>
  )
}
