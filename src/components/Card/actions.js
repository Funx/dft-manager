const min0 = x => Math.max((x || 0), 0)
const add1 = x => (x || 0) + 1
const rm1 = x => (x || 0) - 1
const decrement = x => min0(rm1(x))

export function toggleBenefitsPrintMode () {
  return state => (state == '%') ? 'k' : '%'
}

import {parseInputPrice} from 'utils/currency'
export function setPrice (val, now) {
  return prev => {
    const price = parseInputPrice(val)
    return Number.isNaN(price)
      ? prev
      : {
        ...prev,
        latestUpdate: now,
        price,
      }
  }
}
export function addToCrafts () {
  return (x) => ({
    ...x,
    crafts: add1(x.crafts),
  })
}
export function rmFromCrafts () {
  return (x) => ({
    ...x,
    crafts: decrement(x.crafts),
  })
}
export function addToStocks () {
  return (x) => ({
    ...x,
    crafts: decrement(x.crafts),
    stocks: add1(x.stocks),
  })
}
export function rmFromStocks () {
  return (x) => ({
    ...x,
    stocks: decrement(x.stocks),
  })
}
export function sell () {
  return (x) => ({
    ...x,
    crafts: (!x.stocks) ? decrement(x.crafts) : (x.crafts || 0),
    stocks: decrement(x.stocks),
    sold: add1(x.sold),
  })
}
export function unSell () {
  return (x) => ({
    ...x,
    sold: decrement(x.sold),
  })
}
