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
    parseLog('[12:12] (Info) 10 x [Ailes de Moskito] (789 000 kamas)'),
    {
      type: 'BUY',
      quantity: 10,
      price: 789000,
      target: 'ailes-moskito',
    },
  )
  assert.deepEqual(
    parseLog('[12:13] (Info) Banque : + 100 000 Kamas (vente : 10 [Ailes de Moskito]).'),
    {
      type: 'SELL',
      quantity: 10,
      price: 100000,
      target: 'ailes-moskito',
    }
  )
  assert.deepEqual(
    parseLog('[12:19] (Info) Vous avez créé 1 × [Magnésite] !'),
    {
      type: 'CRAFT',
      quantity: 1,
      target: 'magnesite',
    }
  )
  assert.deepEqual(
    parseLog('blablablala'),
    undefined,
  )
})

import {parseLogs} from './parser'
test('parseLogs', () => {
  assert.deepEqual(
    parseLogs(`
      [12:12] (Info) 10 x [Ailes de Moskito] (789 000 kamas)
      [12:12] (Info) 1 x [Ailes de Moskito] (79 500 kamas)
      [12:13] (Info) Banque : + 100 000 Kamas (vente : 10 [Ailes de Moskito]).
      [12:13] (Info) Banque : + 149 000 Kamas (vente : 10 [Ailes de Moskito]).
      [12:13] (Info) Banque : + 150 000 Kamas (vente : 10 [Ailes de Moskito]).
      [14:33] Annonce de guilde : Semaine d'examen, je reviens bientôt bande de gay. - Rains,
      [14:33] (Info) Vous avez 2 ami(s) en ligne.
      [12:19] (Info) Vous avez créé 1 × [Magnésite] !
      [12:19] (Info) Vous avez créé 1 × [Magnésite] !
      [12:19] (Info) Vous avez créé 1 × [Caca] !
      [12:19] (Info) Vous avez créé 1 × [Magnésite] !
    `),
    [
      {
        type: 'BUY',
        quantity: 11,
        price: 868500,
        target: 'ailes-moskito',
      },
      {
        type: 'SELL',
        quantity: 10,
        price: 100000,
        target: 'ailes-moskito',
      },
      {
        type: 'SELL',
        quantity: 20,
        price: 299000,
        target: 'ailes-moskito',
      },
      {
        type: 'CRAFT',
        quantity: 2,
        target: 'magnesite',
      },
      {
        type: 'CRAFT',
        quantity: 1,
        target: 'caca',
      },
      {
        type: 'CRAFT',
        quantity: 1,
        target: 'magnesite',
      },
    ],
  )
})

import {arePricesCloseEnough} from './parser'
test('arePricesCloseEnough', () => {
  const a = {
    price: 100,
    quantity: 1,
  }
  const b = {
    price: 1000,
    quantity: 10,
  }
  assert.isTrue(arePricesCloseEnough(a, b))

  const c = {
    price: 104,
    quantity: 1,
  }
  const d = {
    price: 1000,
    quantity: 10,
  }
  assert.isTrue(arePricesCloseEnough(c, d))

  const e = {
    price: 106,
    quantity: 1,
  }
  const f = {
    price: 1000,
    quantity: 10,
  }
  assert.isFalse(arePricesCloseEnough(e, f))
})
