export function toggleBenefitsPrintMode () {
  return state => (state == '%') ? 'k' : '%'
}
export function append (update) {
  if (!Array.isArray()) { update = [update] }
  return updates => updates.concat(update)
}
