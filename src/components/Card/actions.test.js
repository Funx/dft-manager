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
  const yesterday = 'yesterday'
  const now = 'now'

  assert.deepEqual(
    setPrice({value: '100', timestamp: now})
      ({latestUpdate: yesterday}),
    {latestUpdate: now, price: 100})

  assert.deepEqual(
    setPrice({value: '1M234k', timestamp: now})
      ({latestUpdate: yesterday}),
    {latestUpdate: now, price: 1234000})

  assert.deepEqual(
    setPrice({value: '0', timestamp: now})
      ({latestUpdate: yesterday, price: 10}),
    {latestUpdate: now, price: 0})

  assert.deepEqual(
    setPrice({value: 'invalid', timestamp: now})
      ({latestUpdate: yesterday, price: 10}),
    {latestUpdate: yesterday, price: 10}
  )
})
import {addToCrafts} from './actions'
test('addToCrafts', () => {
  const action = addToCrafts()
  assert.deepEqual(action({}), {crafts: 1})
  assert.deepEqual(action({crafts: 2}), {crafts: 3})
})

import {rmFromCrafts} from './actions'
test('rmFromCrafts', () => {
  const action = rmFromCrafts()
  assert.deepEqual(action({}), {crafts: 0})
  assert.deepEqual(action({crafts: 2}), {crafts: 1})
})

import {addToStocks} from './actions'
test('addToStocks', () => {
  const action = addToStocks()
  assert.deepEqual(action({}), {crafts: 0, stocks: 1})
  assert.deepEqual(action({stocks:2}), {crafts: 0, stocks: 3})
  assert.deepEqual(action({crafts: 2}), {crafts: 1, stocks: 1})
})

import {rmFromStocks} from './actions'
test('rmFromStocks', () => {
  const action = rmFromStocks()
  assert.deepEqual(action({}), {stocks: 0})
  assert.deepEqual(action({stocks: 2}), {stocks: 1})
})

import {sell} from './actions'
test('sell', () => {
  const action = sell()
  assert.deepEqual(
    action({}),
    {crafts: 0, stocks: 0, sold: 1})

  assert.deepEqual(
    action({crafts: 2, stocks: 2, sold: 0}),
    {crafts: 2, stocks: 1, sold: 1})

  assert.deepEqual(
    action({crafts: 2, stocks: 0, sold: 0}),
    {crafts: 1, stocks: 0, sold: 1})
})

import {unSell} from './actions'
test('unSell', () => {
  const action = unSell()
  assert.deepEqual(action({}), {sold: 0})
  assert.deepEqual(action({sold: 2}), {sold: 1})
})
