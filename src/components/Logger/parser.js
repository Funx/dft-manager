export function splitLogs (str = '') {
  return str.trim()
    .split(/\r?\n/) // line breaks
    .map(x => x.trim())
    .filter(x => !!x)
}

export function parseLog (str = '') {
  // BUY
  const BUYregexp = /(\d+) x \[(.*)\] \(([\d ]*\d)/
  const BUY = str.match(BUYregexp)
  if (BUY) {
    return {
      type: 'BUY',
      quantity: BUY[1],
      name: BUY[2],
      price: BUY[3],
    }
  }
  // BUY
  const SELLregexp = /\+ ([\d ]*\d).* (\d+) \[(.*)\]/
  const SELL = str.match(SELLregexp)
  if (SELL) {
    return {
      type: 'SELL',
      price: SELL[1],
      quantity: SELL[2],
      name: SELL[3],
    }
  }
  // CRAFT
  const CRAFTregexp = /(\d+) × \[(.*)\]/
  const CRAFT = str.match(CRAFTregexp)
  if (CRAFT) {
    return {
      type: 'CRAFT',
      quantity: CRAFT[1],
      name: CRAFT[2],
    }
  }
}

export function parseLogs (str) {
  return splitLogs(str).map(parseLog)
}
