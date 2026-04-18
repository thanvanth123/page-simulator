import { useState } from 'react'
import Tooltip from '../components/Tooltip'

export default function AddressTranslationPage() {
  const [pageNumber, setPageNumber] = useState('')
  const [offset, setOffset] = useState('')
  const [pageSize, setPageSize] = useState('1024')
  const [result, setResult] = useState(null)
  const [busy, setBusy] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)

  const examples = [
    { page: 0, offset: 100, size: 1024, desc: 'First page, small offset' },
    { page: 2, offset: 512, size: 1024, desc: 'Middle page, half page offset' },
    { page: 5, offset: 0, size: 2048, desc: 'Different page size' }
  ]

  const handleCalculate = async (event) => {
    event.preventDefault()
    setBusy(true)
    try {
      const response = await fetch('/api/paging/addressTranslation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pageNumber: Number(pageNumber), offset: Number(offset), pageSize: Number(pageSize) })
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error('Error calculating address:', error)
      alert('Error calculating address. Please check the console for details.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <div className="mb-10 space-y-3 text-center">
        <p className="text-cyan-300 uppercase tracking-[0.3em]">Address Translation</p>
        <h1 className="text-4xl font-bold text-white">Convert logical addresses to physical addresses</h1>
        <p className="text-slate-400 max-w-2xl mx-auto">
          See how the Memory Management Unit (MMU) translates logical addresses to physical addresses using page tables.
        </p>
      </div>
      <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <form onSubmit={handleCalculate} className="space-y-6 rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-xl shadow-cyan-500/10">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-slate-300 mb-2">
                  <Tooltip content="The page number from the logical address">
                    Page Number 🎯
                  </Tooltip>
                </label>
                <input
                  value={pageNumber}
                  onChange={(e) => setPageNumber(e.target.value)}
                  required
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-cyan-400 transition-colors"
                  type="number"
                  min="0"
                  placeholder="e.g., 2"
                />
              </div>
              <div>
                <label className="block text-slate-300 mb-2">
                  <Tooltip content="The offset within the page (0 to pageSize-1)">
                    Offset 📍
                  </Tooltip>
                </label>
                <input
                  value={offset}
                  onChange={(e) => setOffset(e.target.value)}
                  required
                  className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-cyan-400 transition-colors"
                  type="number"
                  min="0"
                  placeholder="e.g., 100"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 mb-2">
                <Tooltip content="Size of each page/frame in bytes">
                  Page Size 📏
                </Tooltip>
              </label>
              <select
                value={pageSize}
                onChange={(e) => setPageSize(e.target.value)}
                className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-cyan-400 transition-colors"
              >
                <option value="256">256 bytes</option>
                <option value="512">512 bytes</option>
                <option value="1024">1024 bytes (1 KB)</option>
                <option value="2048">2048 bytes (2 KB)</option>
                <option value="4096">4096 bytes (4 KB)</option>
              </select>
            </div>

            <button className="glow-button inline-flex w-full items-center justify-center gap-2" type="submit">
              {busy ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white"></span>
              ) : (
                <span>🔄</span>
              )}
              {busy ? 'Translating...' : 'Translate Address'}
            </button>
          </form>

          {/* Quick Examples */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-cyan-500/10">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Examples</h3>
            <div className="space-y-3">
              {examples.map((example, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setPageNumber(example.page.toString())
                    setOffset(example.offset.toString())
                    setPageSize(example.size.toString())
                  }}
                  className="w-full text-left p-3 rounded-2xl bg-slate-950/50 hover:bg-slate-950/80 transition-colors border border-slate-700/50 hover:border-cyan-400/50"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white font-medium">Page {example.page}, Offset {example.offset}, Size {example.size}</div>
                      <div className="text-slate-400 text-sm">{example.desc}</div>
                    </div>
                    <span className="text-cyan-400">→</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-xl shadow-cyan-500/10">
            <h2 className="text-2xl font-semibold text-white mb-4">Translation Result</h2>
            {result ? (
              <div className="space-y-4 text-slate-200">
                <div className="rounded-3xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20 p-4 border border-blue-400/30">
                  <div className="text-sm text-blue-300 mb-1">Logical Address</div>
                  <div className="text-lg font-mono text-white">{pageNumber} × {pageSize} + {offset}</div>
                  <div className="text-sm text-slate-400">({parseInt(pageNumber) * parseInt(pageSize) + parseInt(offset)} in decimal)</div>
                </div>

                <div className="flex items-center justify-center text-cyan-400 text-2xl">↓</div>

                <div className="rounded-3xl bg-gradient-to-r from-cyan-500/20 to-green-500/20 p-4 border border-cyan-400/30">
                  <div className="text-sm text-cyan-300 mb-1">Physical Address</div>
                  <div className="text-lg font-mono text-white">{result.frame} × {pageSize} + {offset}</div>
                  <div className="text-xl font-bold text-green-300">= {result.physicalAddress}</div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="rounded-2xl bg-slate-950 p-3">
                    <div className="text-slate-400">Frame #</div>
                    <div className="text-cyan-300 font-bold">{result.frame}</div>
                  </div>
                  <div className="rounded-2xl bg-slate-950 p-3">
                    <div className="text-slate-400">Offset</div>
                    <div className="text-cyan-300 font-bold">{offset}</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-4xl mb-4">🎯</div>
                <p className="text-slate-400">Enter values above to see the address translation in action</p>
              </div>
            )}
          </div>

          <button
            onClick={() => setShowExplanation(!showExplanation)}
            className="w-full rounded-2xl border border-slate-700 bg-slate-950/50 px-4 py-3 text-slate-300 hover:bg-slate-950/80 transition-colors"
          >
            {showExplanation ? 'Hide' : 'Show'} How It Works
          </button>

          {showExplanation && (
            <div className="animate-fadeIn rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-cyan-500/10">
              <h3 className="text-lg font-semibold text-white mb-4">How Address Translation Works</h3>
              <div className="space-y-4 text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold">1.</span>
                  <div>CPU generates a logical address (page number + offset)</div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold">2.</span>
                  <div>MMU uses page number as index in page table</div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold">3.</span>
                  <div>Page table returns corresponding frame number</div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold">4.</span>
                  <div>Physical address = (frame × page size) + offset</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      <section className="mt-12 rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-cyan-500/5">
        <h3 className="text-xl font-semibold text-white">Page table grid</h3>
        <div className="mt-6 grid grid-cols-3 gap-3 text-sm text-slate-300">
          <div className="rounded-2xl bg-slate-950 p-4">Page #</div>
          <div className="rounded-2xl bg-slate-950 p-4">Frame #</div>
          <div className="rounded-2xl bg-slate-950 p-4">Valid</div>
          {[0, 1, 2, 3, 4, 5].map((page) => (
            <>
              <div key={`page-${page}`} className="rounded-2xl bg-slate-900 p-4">{page}</div>
              <div className="rounded-2xl bg-slate-900 p-4">{(page + 2) % 6}</div>
              <div className="rounded-2xl bg-slate-900 p-4">✔</div>
            </>
          ))}
        </div>
      </section>
    </main>
  )
}
