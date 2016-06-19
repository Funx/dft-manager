// const leftPad = (n) => String("00000" + n).slice(-5)
const rightPad = (x) => String(x + '000000').slice(0, 6)
const min0 = x => Math.max((x || 0), 0)
const add1 = x => (x || 0) + 1
const rm1 = x => (x || 0) - 1
const decrement = x => min0(rm1(x))

export function toggleBenefitsPrintMode () {
  return state => (state == '%') ? 'k' : '%'
}
export function setPrice (val = '') {
  return (prev) => {
    const value = val.split('M')
      .map(x => x.replace(/[^0-9]/gi, ''))
    const result = (value.length == 2)
      ? parseInt(value[0]) * 1000000 + parseInt(rightPad(value[1] || '0'))
      : parseInt(value[0])
    return Number.isNaN(result) ? prev : result
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
