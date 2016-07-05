import {curry, pipe, range} from 'ramda'

export function k (x, simplifyNumber = true) {
  const isBigNumber = Math.abs(x) >= 1000000
  const format = x => humanize(x, simplifyNumber)
  const addMillionsUnit = pipe(
    x => x.replace(',', 'M'),
    x => (!x.includes('M')) ? (x + 'M') : x,
  )

  if (isBigNumber) {
    return `${addMillionsUnit(format(x / 1000000))}k`
  } else {
    return `${format(x)}k`
  }
}

export const boundSign = curry((boundary, minus, maximus, val) => {
  return (val < boundary) ? minus : maximus
})

export const sign = boundSign(0)

export function percent (x) {
  return `${humanize(x * 100)}%`
}

// simple wrapper around IntlNumberformat
export function humanize (val, simplifyNumber = true) {
  const formatter = new Intl.NumberFormat(
    'fr-FR', {maximumSignificantDigits: simplifyNumber ? 3 : 21})
  return formatter.format(val)
}

// parse an input string in the format '1M200' or '100 000' and returns the corresponding number
export function parseInputPrice (input = '') {
  const parts = input.split('M')
    .map(x => x.replace(/[^0-9]/gi, ''))
  if (parts.length == 2) {
    const millions = parseInt(parts[0] * 1000000)
    const rest = parseInt(rightPad(6, parts[1] || '0'))
    return millions + rest
  } else {
    return parseInt(parts[0])
  }
}

export function rightPad (length, x) {
  const rowOf0 = range(0, length).map(() => '0').join('')
  return String(x + rowOf0)
    .split('')
    .slice(0, length)
    .join('')
}
