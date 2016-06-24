import {createGroup, assert} from 'painless'

const test = createGroup()
import {splitLogs} from './parser'
test('splitLogs', () => {
  assert.deepEqual(splitLogs(
    `
      line 1

      line 2
    `),
    [
      'line 1',
      'line 2',
    ])
})

import {parseLog} from './parser'
test('parseLog', () => {
  assert.deepEqual(
    parseLog('[12:12] (Info) 10 x [Ailes de Moskito] (789 kamas)'),
    {
      type: 'BUY',
      quantity: '10',
      price: '789',
      name: 'Ailes de Moskito',
    },
  )
  assert.deepEqual(
    parseLog('[12:13] (Info) Banque : + 100 Kamas (vente : 10 [Ailes de Moskito]).'),
    {
      type: 'SELL',
      quantity: '10',
      price: '100',
      name: 'Ailes de Moskito',
    }
  )
  assert.deepEqual(
    parseLog('[12:19] (Info) Vous avez créé 1 × [Magnésite] !'),
    {
      type: 'CRAFT',
      quantity: '1',
      name: 'Magnésite',
    }
  )
})
