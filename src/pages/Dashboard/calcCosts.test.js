import {createGroup, assert} from 'painless'
import {calcCosts} from './calcCosts'

const test = createGroup('dashboard/calcCosts')
test('function exists', function testEvents () {
  assert.isFunction(calcCosts)
})
