import { useState, useEffect } from 'react'

export default function MemoryVisualization({ pages = 4, frames = 3, pageSize = 1024 }) {
  const [memory, setMemory] = useState([])
  const [pageTable, setPageTable] = useState([])
  const [currentAddress, setCurrentAddress] = useState('')
  const [translatedAddress, setTranslatedAddress] = useState(null)
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    initializeMemory()
  }, [pages, frames])

  const initializeMemory = () => {
    const newMemory = Array(frames * 4).fill(null).map((_, index) => ({
      id: index,
      allocated: false,
      pageId: null,
      data: `0x${(index * pageSize).toString(16).padStart(8, '0')}`
    }))

    const newPageTable = Array(pages).fill(null).map((_, index) => ({
      pageId: index,
      frameId: null,
      valid: false
    }))

    // Allocate some pages randomly
    const allocatedPages = [0, 2, 3]
    allocatedPages.forEach((pageId, frameIndex) => {
      newPageTable[pageId] = {
        pageId,
        frameId: frameIndex,
        valid: true
      }
      for (let i = 0; i < 4; i++) {
        newMemory[frameIndex * 4 + i] = {
          ...newMemory[frameIndex * 4 + i],
          allocated: true,
          pageId
        }
      }
    })

    setMemory(newMemory)
    setPageTable(newPageTable)
  }

  const translateAddress = async (logicalAddress) => {
    const address = parseInt(logicalAddress, 16)
    if (isNaN(address)) return

    setAnimating(true)
    setTranslatedAddress(null)

    const pageNumber = Math.floor(address / pageSize)
    const offset = address % pageSize

    // Highlight the page table lookup
    await new Promise(resolve => setTimeout(resolve, 1000))

    const pageEntry = pageTable[pageNumber]
    if (!pageEntry || !pageEntry.valid) {
      setTranslatedAddress({ error: 'Page fault! Page not in memory.' })
      setAnimating(false)
      return
    }

    const frameNumber = pageEntry.frameId
    const physicalAddress = frameNumber * pageSize + offset

    // Highlight the frame
    await new Promise(resolve => setTimeout(resolve, 1000))

    setTranslatedAddress({
      logical: `0x${address.toString(16).padStart(8, '0')}`,
      pageNumber,
      offset: `0x${offset.toString(16).padStart(4, '0')}`,
      frameNumber,
      physical: `0x${physicalAddress.toString(16).padStart(8, '0')}`
    })

    setAnimating(false)
  }

  const handleAddressSubmit = (e) => {
    e.preventDefault()
    translateAddress(currentAddress)
  }

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Interactive Memory Visualization</h3>

        <form onSubmit={handleAddressSubmit} className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="Enter logical address (e.g., 0x1000)"
            value={currentAddress}
            onChange={(e) => setCurrentAddress(e.target.value)}
            className="flex-1 rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none"
          />
          <button
            type="submit"
            disabled={animating}
            className="glow-button disabled:opacity-50"
          >
            {animating ? 'Translating...' : 'Translate'}
          </button>
        </form>

        {translatedAddress && (
          <div className="mb-6 p-4 bg-slate-950/80 rounded-2xl">
            {translatedAddress.error ? (
              <p className="text-red-400">{translatedAddress.error}</p>
            ) : (
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-slate-400">Logical Address:</p>
                  <p className="text-cyan-300 font-mono">{translatedAddress.logical}</p>
                </div>
                <div>
                  <p className="text-slate-400">Physical Address:</p>
                  <p className="text-green-300 font-mono">{translatedAddress.physical}</p>
                </div>
                <div>
                  <p className="text-slate-400">Page: {translatedAddress.pageNumber}</p>
                  <p className="text-slate-400">Offset: {translatedAddress.offset}</p>
                </div>
                <div>
                  <p className="text-slate-400">Frame: {translatedAddress.frameNumber}</p>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {/* Page Table */}
          <div>
            <h4 className="text-lg font-medium text-white mb-3">Page Table</h4>
            <div className="space-y-2">
              {pageTable.map((entry, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-2xl transition-all ${
                    animating && translatedAddress && !translatedAddress.error && index === translatedAddress.pageNumber
                      ? 'bg-cyan-500/20 border border-cyan-400 animate-pulse-gentle'
                      : entry.valid
                      ? 'bg-green-500/10 border border-green-500/20'
                      : 'bg-slate-800/50'
                  }`}
                >
                  <span className="text-slate-300">Page {index}</span>
                  <span className="text-slate-400">
                    {entry.valid ? `→ Frame ${entry.frameId}` : 'Not allocated'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Physical Memory */}
          <div>
            <h4 className="text-lg font-medium text-white mb-3">Physical Memory</h4>
            <div className="memory-visualization">
              {Array.from({ length: frames }, (_, frameIndex) => (
                <div key={frameIndex} className="mb-2">
                  <div className="text-xs text-slate-400 mb-1">Frame {frameIndex}</div>
                  <div className="grid grid-cols-4 gap-1">
                    {memory.slice(frameIndex * 4, (frameIndex + 1) * 4).map((cell) => (
                      <div
                        key={cell.id}
                        className={`memory-cell ${
                          cell.allocated
                            ? animating && translatedAddress && !translatedAddress.error && frameIndex === translatedAddress.frameNumber
                              ? 'allocated animate-bounce-subtle'
                              : 'allocated'
                            : ''
                        }`}
                        data-tooltip={`Address: ${cell.data}${cell.pageId !== null ? ` (Page ${cell.pageId})` : ''}`}
                      >
                        {cell.pageId !== null ? cell.pageId : ''}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}