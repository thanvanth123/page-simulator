import { useEffect, useState } from 'react'

export default function LeaderboardPage({ user }) {
  const [scores, setScores] = useState([])

  useEffect(() => {
    fetch('/api/leaderboard/getScores')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        return res.json()
      })
      .then((data) => setScores(data))
      .catch((error) => {
        console.error('Error fetching leaderboard:', error)
        setScores([])
      })
  }, [])

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-10 space-y-3 text-center">
        <p className="text-cyan-300 uppercase tracking-[0.3em]">Leaderboard</p>
        <h1 className="text-4xl font-bold text-white">See the top paging performers</h1>
      </div>
      <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 shadow-xl shadow-cyan-500/10">
        <div className="grid grid-cols-4 gap-4 border-b border-slate-800 bg-slate-950 px-6 py-4 text-sm uppercase tracking-[0.2em] text-slate-400">
          <div>Rank</div>
          <div>User</div>
          <div>Score</div>
          <div>Time</div>
        </div>
        <div className="divide-y divide-slate-800">
          {scores.map((row, index) => (
            <div key={`${row.userId}-${index}`} className={`grid grid-cols-4 gap-4 px-6 py-5 text-slate-200 ${user?.id === row.userId ? 'bg-cyan-500/10' : ''}`}>
              <div className="font-semibold">{index + 1 <= 3 ? `🏅 ${index + 1}` : index + 1}</div>
              <div>{row.username}</div>
              <div>{row.score}%</div>
              <div className="text-sm text-slate-400">{new Date(row.timestamp).toLocaleString()}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
