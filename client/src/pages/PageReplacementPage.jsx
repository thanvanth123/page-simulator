import { useEffect, useState } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

const algorithms = ['FIFO', 'LRU', 'Optimal']

export default function PageReplacementPage() {
  const [reference, setReference] = useState('7,0,1,2,0,3,0,4,2,3,0,3,2')
  const [frames, setFrames] = useState(3)
  const [algorithm, setAlgorithm] = useState('FIFO')
  const [result, setResult] = useState({ table: [], faults: 0, hits: 0 })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true)
      try {
        const response = await fetch('/api/paging/pageReplacement', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ referenceString: reference, frames: Number(frames), algorithm })
        })
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setResult(data)
      } catch (error) {
        console.error('Error fetching page replacement results:', error)
        setResult({ table: [], faults: 0, hits: 0 })
      } finally {
        setLoading(false)
      }
    }
    fetchResults()
  }, [reference, frames, algorithm])

  const total = result.table.length
  const hitCount = result.hits
  const faultCount = result.faults

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-10 space-y-3 text-center">
        <p className="text-cyan-300 uppercase tracking-[0.3em]">Page Replacement Simulator</p>
        <h1 className="text-4xl font-bold text-white">Compare FIFO, LRU, and Optimal behavior</h1>
      </div>
      <section className="grid gap-10 lg:grid-cols-[0.9fr_0.7fr]">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-xl shadow-cyan-500/10">
          <div className="mb-6 flex flex-wrap items-center gap-4">
            {algorithms.map((option) => (
              <button key={option} onClick={() => setAlgorithm(option)} className={`rounded-full px-4 py-2 text-sm transition ${algorithm === option ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}>{option}</button>
            ))}
          </div>
          <label className="block text-slate-300">Reference String</label>
          <input value={reference} onChange={(e) => setReference(e.target.value)} className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none" />
          <label className="mt-4 block text-slate-300">Number of Frames</label>
          <input type="number" value={frames} onChange={(e) => setFrames(e.target.value)} min="1" max="10" className="mt-2 w-32 rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none" />
          <div className="mt-6 rounded-3xl bg-slate-950/70 p-5 text-slate-200">
            <p><strong>Total Hits:</strong> {hitCount}</p>
            <p><strong>Total Faults:</strong> {faultCount}</p>
            <p><strong>Hit Ratio:</strong> {total ? (hitCount / total).toFixed(2) : '0.00'}</p>
            <p><strong>Fault Ratio:</strong> {total ? (faultCount / total).toFixed(2) : '0.00'}</p>
            {loading ? <p className="mt-3 text-sm text-slate-400">Recalculating...</p> : null}
          </div>
        </div>
        <div className="grid gap-4">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-cyan-500/10">
            <h2 className="text-xl font-semibold text-white">Chart</h2>
            <div className="mt-4 h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={[{ name: 'Hit', value: hitCount }, { name: 'Fault', value: faultCount }]} dataKey="value" innerRadius={40} outerRadius={80}>
                    <Cell fill="#22d3ee" />
                    <Cell fill="#0f766e" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-cyan-500/10 overflow-x-auto">
            <table className="min-w-full text-left text-sm text-slate-200">
              <thead>
                <tr>
                  <th className="pb-3">Step</th>
                  <th className="pb-3">Reference</th>
                  <th className="pb-3">Frames</th>
                  <th className="pb-3">Result</th>
                </tr>
              </thead>
              <tbody>
                {result.table.map((row) => (
                  <tr key={row.step} className={row.hit ? 'bg-slate-900/80' : 'bg-slate-950/70'}>
                    <td className="py-3 pr-4">{row.step}</td>
                    <td className="py-3 pr-4">{row.reference}</td>
                    <td className="py-3 pr-4">{row.frames.join(', ')}</td>
                    <td className="py-3 pr-4 text-sm uppercase tracking-[0.18em] text-cyan-300">{row.hit ? 'Hit' : 'Fault'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  )
}
