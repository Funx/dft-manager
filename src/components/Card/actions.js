// const leftPad = (n) => String("00000" + n).slice(-5)
const rightPad = (x) => String(x + '000000').slice(0, 6)

export function toggleBenefitsPrintMode () {
  return state => (state == '%') ? 'k' : '%'
}
export function setPrice (val = '') {
  return (prev) => {
    const value = val.split('M')
      .map(x => x.replace(/[^0-9]/gi, ''))
    const result = value.length == 2
      ? parseInt(value[0]) * 1000000 + parseInt(rightPad(value[1] || '0'))
      : parseInt(value[0])
    return Number.isNaN(result) ? prev : result
  }
}
