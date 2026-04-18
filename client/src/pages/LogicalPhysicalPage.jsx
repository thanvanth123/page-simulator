import { useState } from 'react'

export default function LogicalPhysicalPage() {
  const [logicalAddress, setLogicalAddress] = useState('4096')
  const [pageSize, setPageSize] = useState('1024')
  const pages = Math.ceil(Number(logicalAddress) / Number(pageSize))
  const pageNumber = Math.floor(Number(logicalAddress) / Number(pageSize))
  const offset = Number(logicalAddress) % Number(pageSize)

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <div className="mb-10 space-y-3 text-center">
        <p className="text-cyan-300 uppercase tracking-[0.3em]">Logical → Physical</p>
        <h1 className="text-4xl font-bold text-white">Translate logical addresses with a flowchart</h1>
      </div>
      <div className="grid gap-10 lg:grid-cols-[0.95fr_0.75fr]">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-xl shadow-cyan-500/10">
          <label className="block text-slate-300">Logical Address</label>
          <input type="number" value={logicalAddress} onChange={(e) => setLogicalAddress(e.target.value)} className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100" />
          <label className="mt-4 block text-slate-300">Page Size</label>
          <input type="number" value={pageSize} onChange={(e) => setPageSize(e.target.value)} className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100" />
          <div className="mt-6 space-y-3 rounded-3xl bg-slate-950/80 p-5 text-slate-200">
            <p><strong>Page Number:</strong> {pageNumber}</p>
            <p><strong>Offset:</strong> {offset}</p>
            <p><strong>Total Pages Needed:</strong> {pages}</p>
          </div>
        </div>
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-xl shadow-cyan-500/10">
          <div className="space-y-4">
            <div className="rounded-3xl bg-slate-950 p-6 text-center text-slate-200">
              <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">Logical address</p>
              <p className="mt-3 text-3xl font-semibold">{logicalAddress}</p>
            </div>
            <div className="grid gap-4">
              <div className="rounded-3xl bg-slate-950 p-5 text-slate-200">Split into Page Number and Offset</div>
              <div className="rounded-3xl bg-slate-950 p-5 text-slate-200">Lookup page number in page table</div>
              <div className="rounded-3xl bg-slate-950 p-5 text-slate-200">Combine frame base with offset</div>
            </div>
            <div className="rounded-3xl bg-cyan-500/10 p-5 text-cyan-200">Physical Address = FrameBase + Offset</div>
          </div>
        </div>
      </div>
    </main>
  )
}
