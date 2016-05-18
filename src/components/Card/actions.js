export function toggleBenefitsPrintMode () {
  console.log('yo')
  return state => (state == '%') ? 'k' : '%'
}
