// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://news.ycombinator.com/item?id=23435724
// @grant        none
// ==/UserScript==

; (function () {
  'use strict'

  // Your code here...
  pickTopN()
})()

import { defaults } from './defaults'
import { TopNSegment } from './segment'

export function pickTopN(
  n = 7,
  skipWords: string[] = defaults.skipWords,
  container = document.body,
) {
  const ps = container.querySelectorAll('p')
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
}

Object.assign(window, { pickTopN })
