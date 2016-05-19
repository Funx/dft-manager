export function toggleBenefitsPrintMode () {
  return state => (state == '%') ? 'k' : '%'
}
