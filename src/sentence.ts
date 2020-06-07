function splitBy(xs: string[], c: string) {
  const acc: string[] = []
  for (const x of xs) {
    const ys = x.split(c)
    const last = ys.pop()
    ys.forEach(y => acc.push(y + c))
    acc.push(last!)
  }
  return acc
}

export function splitSentence(segment: string): string[] {
  let acc: string[] = [segment]
  acc = splitBy(acc, '.')
  acc = splitBy(acc, '?')
  acc = splitBy(acc, '!')
  return acc.map(s => s.trim())
}
