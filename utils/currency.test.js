import {createGroup, assert} from 'painless'

const test = createGroup()
import {parseInputPrice} from './currency'
test('parseInputPrice', () => {
  assert.equal(parseInputPrice('100'), 100)
  assert.equal(parseInputPrice('1 000'), 1000)
  assert.equal(parseInputPrice('1k'), 1)
  assert.equal(parseInputPrice('1M'), 1000000)
  assert.equal(parseInputPrice('1M234'), 1234000)
  assert.equal(parseInputPrice('1M234k'), 1234000)
  assert.isNaN(parseInputPrice('yayayayya'))
  assert.isNaN(parseInputPrice(undefined))
})
