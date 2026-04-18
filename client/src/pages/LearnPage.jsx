import { useState } from 'react'
import MemoryVisualization from '../components/MemoryVisualization'
import Tooltip from '../components/Tooltip'

const steps = [
  {
    title: 'Paging Overview',
    detail: 'Paging breaks memory into fixed-size pages and frames to simplify allocation.',
    icon: '📄'
  },
  {
    title: 'Page Table',
    detail: 'A page table maps logical page numbers to physical frame numbers.',
    icon: '📊'
  },
  {
    title: 'Address Translation',
    detail: 'Logical addresses are split into page number and offset before translation.',
    icon: '🔄'
  },
  {
    title: 'Page Replacement',
    detail: 'When memory is full, algorithms decide which page to replace.',
    icon: '🔄'
  }
]

const tabs = ['What is Paging', 'How it Works', 'Advantages', 'Disadvantages']
const tabContent = {
  'What is Paging': 'Paging is a memory management scheme that eliminates external fragmentation and allows non-contiguous memory allocation. It divides logical memory into fixed-size pages and physical memory into same-size frames.',
  'How it Works': 'The CPU generates logical addresses. The MMU converts the page number using a page table and adds the offset to create a physical address. If a page is not in memory, a page fault occurs.',
  'Advantages': 'Paging improves memory utilization and protects processes from each other by isolating address spaces. It supports virtual memory and efficient memory allocation.',
  'Disadvantages': 'It can introduce internal fragmentation and page-table overhead in large address spaces. Page faults can cause performance issues.'
}

export default function LearnPage() {
  const [activeTab, setActiveTab] = useState('What is Paging')
  const [showVisualization, setShowVisualization] = useState(false)

  return (
    <main className="mx-auto max-w-6xl px-6 py-14">
      <div className="mb-10 space-y-3 text-center">
        <p className="text-cyan-300 uppercase tracking-[0.3em]">Paging Fundamentals</p>
        <h1 className="text-4xl font-bold text-white">Learn Paging in operating systems step by step</h1>
        <p className="mx-auto max-w-2xl text-slate-400">Explore the timeline, diagrams, and examples that make paging intuitive and memorable.</p>
      </div>

      <section className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
        <div className="space-y-6">
          {steps.map((step, idx) => (
            <div key={step.title} className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-cyan-600/5 animate-slideIn glass-card" style={{ animationDelay: `${idx * 100}ms` }}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{step.icon}</span>
                <span className="text-sm uppercase tracking-[0.24em] text-cyan-300">Step {idx + 1}</span>
              </div>
              <h2 className="text-2xl font-semibold text-white">{step.title}</h2>
              <p className="mt-3 text-slate-300">{step.detail}</p>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-cyan-600/10 glass-card">
            <h3 className="text-xl font-semibold text-white mb-4">Visual Diagram</h3>
            <div className="space-y-4">
              <div className="rounded-3xl bg-slate-950/80 p-4 text-slate-300">
                <div className="flex items-center justify-center gap-4 text-sm">
                  <span>Pages</span>
                  <Tooltip content="Page table maps logical pages to physical frames">
                    <span className="text-cyan-400">→</span>
                  </Tooltip>
                  <span>Page Table</span>
                  <Tooltip content="Page table maps logical pages to physical frames">
                    <span className="text-cyan-400">→</span>
                  </Tooltip>
                  <span>Frames</span>
                </div>
              </div>
              <div className="grid gap-3 text-sm">
                <div className="rounded-2xl bg-slate-800 p-4 flex justify-between">
                  <span>Page 0</span>
                  <Tooltip content="Maps to Frame 2 in physical memory">
                    <span className="text-cyan-300">→ Frame 2</span>
                  </Tooltip>
                </div>
                <div className="rounded-2xl bg-slate-800 p-4 flex justify-between">
                  <span>Page 1</span>
                  <span className="text-slate-500">Not allocated</span>
                </div>
                <div className="rounded-2xl bg-slate-800 p-4 flex justify-between">
                  <span>Page 2</span>
                  <Tooltip content="Maps to Frame 5 in physical memory">
                    <span className="text-cyan-300">→ Frame 5</span>
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-cyan-600/10 glass-card">
            <h3 className="text-xl font-semibold text-white mb-4">Key Concepts</h3>
            <div className="space-y-3">
              <Tooltip content="The address generated by the CPU">
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-950/50 hover:bg-slate-950/80 transition-colors cursor-help">
                  <span className="text-cyan-400">🎯</span>
                  <div>
                    <div className="font-medium text-white">Logical Address</div>
                    <div className="text-sm text-slate-400">CPU-generated address</div>
                  </div>
                </div>
              </Tooltip>

              <Tooltip content="The actual address in physical memory">
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-950/50 hover:bg-slate-950/80 transition-colors cursor-help">
                  <span className="text-green-400">📍</span>
                  <div>
                    <div className="font-medium text-white">Physical Address</div>
                    <div className="text-sm text-slate-400">Real memory location</div>
                  </div>
                </div>
              </Tooltip>

              <Tooltip content="Error when requested page is not in memory">
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-950/50 hover:bg-slate-950/80 transition-colors cursor-help">
                  <span className="text-red-400">⚠️</span>
                  <div>
                    <div className="font-medium text-white">Page Fault</div>
                    <div className="text-sm text-slate-400">Page not in memory</div>
                  </div>
                </div>
              </Tooltip>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-12 rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-cyan-600/10 glass-card">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          {tabs.map((tab) => (
            <button key={tab} type="button" onClick={() => setActiveTab(tab)} className={`rounded-full border px-4 py-2 text-sm transition ${activeTab === tab ? 'border-cyan-400 bg-cyan-500/10 text-white' : 'border-slate-700 bg-slate-950 text-slate-200 hover:border-cyan-400 hover:text-white'}`}>
              {tab}
            </button>
          ))}
        </div>
        <div className="rounded-3xl bg-slate-950/80 p-6 text-slate-300">
          {tabContent[activeTab]}
        </div>
      </section>

      <section className="mt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-white">Interactive Memory Visualization</h2>
          <button
            onClick={() => setShowVisualization(!showVisualization)}
            className="glow-button"
          >
            {showVisualization ? 'Hide' : 'Show'} Visualization
          </button>
        </div>

        {showVisualization && (
          <div className="animate-fadeIn">
            <MemoryVisualization />
          </div>
        )}
      </section>

      <section className="mt-12 rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-cyan-600/10 glass-card">
        <h2 className="text-2xl font-semibold text-white mb-6">Address translation flow</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { title: 'Logical Address', desc: 'CPU generates address', color: 'from-blue-500/20 to-blue-600/20' },
            { title: 'Page Table Lookup', desc: 'Find frame number', color: 'from-cyan-500/20 to-cyan-600/20' },
            { title: 'Physical Address', desc: 'Calculate final address', color: 'from-green-500/20 to-green-600/20' }
          ].map((item, index) => (
            <div key={item.title} className={`rounded-3xl bg-gradient-to-br ${item.color} border border-slate-700 p-6 text-center text-slate-200 relative`}>
              <div className="text-3xl mb-2">
                {index === 0 ? '🎯' : index === 1 ? '🔍' : '📍'}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-slate-300">{item.desc}</p>
              {index < 2 && (
                <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 text-cyan-400 text-2xl hidden sm:block">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
