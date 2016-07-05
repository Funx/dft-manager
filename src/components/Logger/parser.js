import {last, slice} from 'ramda'

import {parseInputPrice} from 'utils/currency'
import {nameToDofusId} from 'utils/strings'
const pop = arr => slice(0, arr.length - 1, arr)

export function splitLogs (str = '') {
  return str.trim()
    .split(/\r?\n/) // line breaks
    .map(x => x.trim())
    .filter(x => !!x)
}

export function parseLog (str = '') {
  // BUY
  const BUYregexp = /(\d+) x \[(.*)\] \(([\d ]*\d)/
  const BUY = str.match(BUYregexp)
  if (BUY) {
    const name = BUY[2]
    return {
      type: 'BUY',
      quantity: parseInt(BUY[1]),
      price: parseInputPrice(BUY[3]),
      id: nameToDofusId(name),
      name,
    }
  }
  // SELL
  const SELLregexp = /\+ ([\d ]*\d).* (\d+) \[(.*)\]/
  const SELL = str.match(SELLregexp)
  if (SELL) {
    const name = SELL[3]
    return {
      type: 'SELL',
      price: parseInputPrice(SELL[1]),
      quantity: parseInt(SELL[2]),
      id: nameToDofusId(name),
      name,
    }
  }
  // CRAFT
  const CRAFTregexp = /(\d+) × \[(.*)\]/
  const CRAFT = str.match(CRAFTregexp)
  if (CRAFT) {
    const name = CRAFT[2]
    return {
      type: 'CRAFT',
      quantity: parseInt(CRAFT[1]),
      id: nameToDofusId(name),
      name,
    }
  }
}

export function parseLogs (str) {
  return groupSimilarActions(splitLogs(str)
    .map(parseLog)
    .filter(x => !!x))
}

export function arePricesCloseEnough (x, y) {
  return Math.abs((x.price / x.quantity) / (y.price / y.quantity) - 1) < 0.05 // less than 5% price difference
}

export function groupSimilarActions (actions) {
  return actions
    .reduce((acc, x) => {
      const prev = last(acc)
      const areSameAction = prev && prev.type == x.type && prev.target == x.target

      // group same SELL or BUY actions
      if(('price' in x) && areSameAction && arePricesCloseEnough(x, prev)) {
        const action = {
          ...prev,
          quantity: prev.quantity + x.quantity,
          price: prev.price + x.price,
        }
        return [...pop(acc), action]
      }

      if(!('price' in x) && areSameAction) {
        const action = {
          ...prev,
          quantity: prev.quantity + x.quantity,
        }
        return [...pop(acc), action]
      }

      // DEFAULT
      return [...acc, x]
    }, [])
}
