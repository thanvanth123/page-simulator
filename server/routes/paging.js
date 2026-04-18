import express from 'express'

const router = express.Router()

router.post('/addressTranslation', (req, res) => {
  const { pageNumber, offset, pageSize } = req.body
  if (pageNumber == null || offset == null || pageSize == null) {
    return res.status(400).json({ message: 'Missing fields' })
  }
  const frame = pageNumber
  const physicalAddress = frame * pageSize + offset
  res.json({ frame, physicalAddress })
})

router.post('/pageReplacement', (req, res) => {
  const { referenceString, frames, algorithm } = req.body
  const refs = referenceString.split(',').map((item) => Number(item.trim())).filter((n) => !Number.isNaN(n))
  const frameSet = []
  const table = []
  let faultCount = 0

  refs.forEach((ref, index) => {
    const hit = frameSet.includes(ref)
    if (!hit) {
      faultCount++
      if (frameSet.length < frames) {
        frameSet.push(ref)
      } else if (algorithm === 'FIFO' || algorithm === 'LRU') {
        frameSet.shift()
        frameSet.push(ref)
      } else {
        const futureDistances = frameSet.map((frame) => {
          const nextIndex = refs.slice(index + 1).indexOf(frame)
          return nextIndex < 0 ? Infinity : nextIndex
        })
        const removeIndex = futureDistances.indexOf(Math.max(...futureDistances))
        frameSet.splice(removeIndex, 1)
        frameSet.push(ref)
      }
    }
    table.push({ step: index + 1, reference: ref, frames: [...frameSet], hit })
  })

  res.json({ table, faults: faultCount, hits: refs.length - faultCount })
})

router.post('/pageTableGenerator', (req, res) => {
  const { numberOfPages, pageSize, startAddress } = req.body
  const rows = Array.from({ length: numberOfPages }, (_, index) => ({
    pageNo: index,
    frameNo: index + 1,
    pageSize,
    startAddress: startAddress + index * pageSize
  }))
  res.json({ rows })
})

export default router
