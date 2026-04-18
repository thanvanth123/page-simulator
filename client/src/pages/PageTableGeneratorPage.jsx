import { useMemo, useState } from 'react'

export default function PageTableGeneratorPage() {
  const [pages, setPages] = useState(5)
  const [pageSize, setPageSize] = useState(1024)
  const [startAddress, setStartAddress] = useState(0)
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false)

  const csv = useMemo(() => {
    const header = 'pageNo,frameNo,pageSize,startAddress\n'
    return header + rows.map((row) => `${row.pageNo},${row.frameNo},${row.pageSize},${row.startAddress}`).join('\n')
  }, [rows])

  const handleGenerate = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/paging/pageTableGenerator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ numberOfPages: Number(pages), pageSize: Number(pageSize), startAddress: Number(startAddress) })
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setRows(data.rows)
    } catch (error) {
      console.error('Error generating page table:', error)
      alert('Error generating page table. Please check the console for details.')
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(csv)
  }

  const handleDownload = () => {
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'page-table.csv'
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-10 space-y-3 text-center">
        <p className="text-cyan-300 uppercase tracking-[0.3em]">Page Table Generator</p>
        <h1 className="text-4xl font-bold text-white">Generate a page table and export CSV</h1>
      </div>
      <div className="grid gap-10 lg:grid-cols-[0.9fr_0.8fr]">
        <div className="space-y-6 rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-xl shadow-cyan-500/10">
          <label className="block text-slate-300">Number of Pages</label>
          <input type="number" value={pages} min="1" onChange={(e) => setPages(Number(e.target.value))} className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100" />
          <label className="block text-slate-300">Page Size</label>
          <input type="number" value={pageSize} min="1" onChange={(e) => setPageSize(Number(e.target.value))} className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100" />
          <label className="block text-slate-300">Starting Address</label>
          <input type="number" value={startAddress} min="0" onChange={(e) => setStartAddress(Number(e.target.value))} className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100" />
          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={handleGenerate} className="glow-button">{loading ? 'Generating...' : 'Generate Table'}</button>
            <button onClick={handleCopy} disabled={!rows.length} className="rounded-full border border-cyan-500 px-5 py-3 text-cyan-200 transition hover:bg-cyan-500/10 disabled:cursor-not-allowed disabled:opacity-50">Copy to Clipboard</button>
            <button onClick={handleDownload} disabled={!rows.length} className="rounded-full border border-cyan-500 px-5 py-3 text-cyan-200 transition hover:bg-cyan-500/10 disabled:cursor-not-allowed disabled:opacity-50">Download CSV</button>
          </div>
        </div>
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-xl shadow-cyan-500/10">
          <h2 className="text-2xl font-semibold text-white">Generated Table</h2>
          <div className="mt-6 space-y-3">
            {rows.length ? (
              rows.map((row) => (
                <div key={row.pageNo} className="grid grid-cols-4 gap-3 rounded-3xl bg-slate-950 p-4 text-sm text-slate-200">
                  <span>Page {row.pageNo}</span>
                  <span>Frame {row.frameNo}</span>
                  <span>{row.pageSize} bytes</span>
                  <span>Start {row.startAddress}</span>
                </div>
              ))
            ) : (
              <p className="rounded-3xl bg-slate-950 p-6 text-slate-400">Generate a table to preview rows and download CSV.</p>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
