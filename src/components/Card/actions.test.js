import {createGroup, assert} from 'painless'

const test = createGroup()
import {toggleBenefitsPrintMode} from './actions'
test('toggleBenefitsPrintMode', () => {
  const fn = toggleBenefitsPrintMode()
  assert.equal(fn('k'), '%')
  assert.equal(fn('%'), 'k')
})
