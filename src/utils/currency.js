import {curry} from 'ramda'

export function k (val, simplifyNumber = true) {
  let isBigNumber = false
  if (Math.abs(val) >= 1000000) {
    val /= 1000000
    isBigNumber = true
  }
  let formatted = humanize(val, simplifyNumber)
  if (isBigNumber) {
    formatted = formatted.replace(',', 'M')
    if(formatted.indexOf('M') == -1) formatted += 'M'
  }
  return `${formatted}k`
}

export const boundSign = curry((boundary, minus, plus, val) => {
  return (val < boundary) ? minus : plus
})

export const sign = boundSign(0)

export function percent (val) {
  const format = val => humanize(val * 100)
  return `${format(val)}%`
}

export function humanize (val, simplifyNumber = true) {
  const formatter = new Intl.NumberFormat(
    'fr-FR', {maximumSignificantDigits: simplifyNumber ? 3 : 21})
  return formatter.format(val)
}

// const leftPad = (n) => String("00000" + n).slice(-5)
const rightPad = (x) => String(x + '000000').slice(0, 6)
export function parseInputPrice (val = '') {
  const value = val.split('M')
    .map(x => x.replace(/[^0-9]/gi, ''))
  return (value.length == 2)
    ? parseInt(value[0]) * 1000000 + parseInt(rightPad(value[1] || '0'))
    : parseInt(value[0])
}
