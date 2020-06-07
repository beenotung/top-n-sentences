import { defaults } from './defaults'
import { TopNSegment } from './segment'

export function pickTopN(
  n = 7,
  selector = 'p',
  skipWords: string[] = defaults.skipWords,
  container = document.body,
) {
  const ps = container.querySelectorAll(selector)
  const topN = new TopNSegment()
  ps.forEach(p => topN.addSegment(p.textContent || ''))
  const topNSentences = topN.filterTopNSentences(n, skipWords)
  console.log('top N sentences:', topNSentences)
  let removed = 0
  ps.forEach(p => {
    const matchedSentences = topNSentences.filter(sentence =>
      p.textContent!.includes(sentence),
    )
    if (matchedSentences.length === 0) {
      p.remove()
      removed++
    } else {
      p.textContent = matchedSentences.join(' ')
    }
  })
  console.log('removed', removed, 'segments')
  // HN cleanup
  document.querySelectorAll('tr').forEach(e => {
    if (!e.textContent!.trim()) {
      e.remove()
    }
  })
}

Object.assign(window, { pickTopN })
