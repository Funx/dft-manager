import {curry} from 'ramda'

export function k (val) {
  let isBigNumber = false
  if (Math.abs(val) >= 1000000) {
    val /= 1000000
    isBigNumber = true
  }
  let formatted = humanize(val)
  if (isBigNumber) {
    formatted.replace(',', 'M')
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

export function humanize (val) {
  const formatter = new Intl.NumberFormat(
    'fr-FR', {maximumSignificantDigits: 3})
  return formatter.format(val)
}
