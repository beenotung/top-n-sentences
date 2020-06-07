import { incMap } from '@beenotung/tslib/map'
import { WordCounter } from 'word-counter-ts'
import { splitSentence } from './sentence'

type Segment = {
  segment: string
  sentences: Sentence[]
}
type Sentence = {
  text: string
  words: string[]
  score: number
}

export class TopNSegment {
  segments: Segment[] = []
  words = new WordCounter()

  constructor() {}

  addSegment(segment: string) {
    this.segments.push({
      segment,
      sentences: splitSentence(segment).map(sentence => {
        const words = this.words
          .splitWords(sentence)
          .map(word => this.words.collapseWord(word))
        words.forEach(word => incMap(this.words.wordCounts, word))
        return {
          text: sentence,
          words,
          score: 0,
        }
      }),
    })
  }

  filterTopNSentences(n: number, _skipWords: string[]) {
    const skipWords = new Set(_skipWords)
    const sentences: Sentence[] = []
    for (const segment of this.segments) {
      for (const sentence of segment.sentences) {
        sentence.score = 0
        for (const word of sentence.words) {
          if (skipWords.has(word)) {
            continue
          }
          sentence.score += this.words.wordCounts.get(word) || 0
        }
        sentences.push(sentence)
      }
    }
    const topNSentences = sentences.sort((a, b) => b.score - a.score)
    const topWords = new Map<string, number>()
    for (const sentence of topNSentences) {
      for (const word of sentence.words) {
        if (skipWords.has(word)) {
          continue
        }
        incMap(topWords, word)
      }
    }
    console.log(
      'top words:',
      Array.from(topWords).sort((a, b) => b[1] - a[1]),
    )
    console.log(
      'sentences:',
      sentences.map(sentence => [sentence.score, sentence.text]),
    )
    return topNSentences.slice(0, n).map(x => x.text)
  }
}
