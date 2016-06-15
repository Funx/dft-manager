import {createGroup, assert} from 'painless'

const test = createGroup()
import {toggleBenefitsPrintMode} from './actions'
test('toggleBenefitsPrintMode', () => {
  const fn = toggleBenefitsPrintMode()
  assert.equal(fn('k'), '%')
  assert.equal(fn('%'), 'k')
})

import {setPrice} from './actions'
test('setPrice', () => {
  assert.equal(setPrice('100')(), 100)
  assert.equal(setPrice('1 000')(), 1000)
  assert.equal(setPrice('1k')(), 1)
  assert.equal(setPrice('1M')(), 1000000)
  assert.equal(setPrice('1M234')(), 1234000)
  assert.equal(setPrice('1M234k')(), 1234000)
  assert.equal(setPrice('0')(10), 0)
  assert.equal(setPrice('invalid')(10), 10)
})
