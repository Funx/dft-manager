import {createGroup, assert} from 'painless'
const YESTERDAY = 'time_yesterday'
const NOW = 'time_now'

const test = createGroup()
import {setPrice} from './actions'
test('setPrice', () => {
  assert.deepEqual(
    setPrice({price: 100, timestamp: NOW})
      ({latestUpdate: YESTERDAY}),
    {latestUpdate: NOW, price: 100})
})
import {plan} from './actions'
test('plan', () => {
  const action = plan()
  assert.deepEqual(action({}), {crafts: 1})
  assert.deepEqual(action({crafts: 2}), {crafts: 3})
})

import {rmPlanned} from './actions'
test('rmPlanned', () => {
  const action = rmPlanned()
  assert.deepEqual(action({}), {crafts: 0})
  assert.deepEqual(action({crafts: 2}), {crafts: 1})
})

import {craft} from './actions'
test('craft', () => {
  const action = craft()
  assert.deepEqual(action({}), {crafts: 0, stocks: 1})
  assert.deepEqual(action({stocks:2}), {crafts: 0, stocks: 3})
  assert.deepEqual(action({crafts: 2}), {crafts: 1, stocks: 1})
})

import {buy} from './actions'
test('buy', () => {
  assert.deepEqual(buy({})
    ({price: 1, latestUpdate: YESTERDAY}),
    {price: 1, latestUpdate: YESTERDAY, stocks: 1},
  )
  assert.deepEqual(buy({timestamp: NOW, price: undefined})
    ({price: 1, latestUpdate: YESTERDAY, stocks: 2}),
    {price: 1, latestUpdate: YESTERDAY, stocks: 3},
  )
  assert.deepEqual(buy({timestamp: NOW, price: 2})
    ({price: 1, latestUpdate: YESTERDAY, stocks: 2}),
    {price: 2, latestUpdate: NOW, stocks: 3},
  )
})

import {rmStored} from './actions'
test('rmStored', () => {
  const action = rmStored()
  assert.deepEqual(action({}), {stocks: 0})
  assert.deepEqual(action({stocks: 2}), {stocks: 1})
})

import {sell} from './actions'
test('sell', () => {
  assert.deepEqual(sell({})
    ({price: 1, latestUpdate: YESTERDAY}),
    {price: 1, latestUpdate: YESTERDAY, crafts: 0, stocks: 0, sold: 1})

  assert.deepEqual(sell({timestamp: NOW, price: undefined})
    ({price: 1, latestUpdate: YESTERDAY, crafts: 2, stocks: 2, sold: 0}),
    {price: 1, latestUpdate: YESTERDAY, crafts: 2, stocks: 1, sold: 1})

  assert.deepEqual(sell({timestamp: NOW, price: 2})
    ({price: 1, latestUpdate: YESTERDAY, crafts: 2, stocks: 0, sold: 0}),
    {price: 2, latestUpdate: NOW, crafts: 1, stocks: 0, sold: 1})
})

import {rmSold} from './actions'
test('rmSold', () => {
  const action = rmSold()
  assert.deepEqual(action({}), {sold: 0})
  assert.deepEqual(action({sold: 2}), {sold: 1})
})
