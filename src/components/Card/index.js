import {Observable as O} from 'rx'

import view from './view'
import {k, percent as perc, sign} from 'utils/currency'
import {
  toggleBenefitsPrintMode,
  setPrice,
  addToCrafts, rmFromCrafts,
  addToStocks, rmFromStocks,
  sell, unSell,
} from './actions'
import intent from './intent'

export const Card = ({M, viewParam$, DOM}) => {
  const state$ = O.combineLatest(
    M, viewParam$,
    (card = {}, params) => ({
      ...card,
      editing: params.editing,
      benefits: benefits(card),
      benefitsRate: printBenefitsRate(card),
      secondaryInfo: (params.benefits == '%')
        ? printBenefits(card)
        : printBenefitsRate(card),
      primaryInfo: (params.benefits == '%')
        ? printBenefitsRate(card)
        : printBenefits(card),
    })
  )

  const vtree$ = view(state$)
  const intents = intent(DOM)
  const mod$ = O.merge(
    viewParam$.lens('benefits').mod(
      intents.toggleBenefitsPrintMode$.map(toggleBenefitsPrintMode)),
    viewParam$.lens('editing').set(intents.startEdit$.map(() => true)),
    viewParam$.lens('editing').set(intents.endEdit$.map(() => false)),
    M.lens('price').mod(intents.save$.map(setPrice)),
    M.lens('favorites').set(intents.toggleFavorites$),
    M.lens('focused').set(intents.focus$),
    M.mod(intents.craftBtnIntents.increment$.map(addToCrafts)),
    M.mod(intents.craftBtnIntents.decrement$.map(rmFromCrafts)),
    M.mod(intents.stockBtnIntents.increment$.map(addToStocks)),
    M.mod(intents.stockBtnIntents.decrement$.map(rmFromStocks)),
    M.mod(intents.sellBtnIntents.increment$.map(sell)),
    M.mod(intents.sellBtnIntents.decrement$.map(unSell)),
  )

  return {
    DOM: vtree$,
    M: mod$,
  }
}

const benefits = ({price, cost}) => price - cost
const benefitsRate = ({price, cost}) => benefits({price, cost}) / cost
const prettyPrint = (signFn, formatFn, x) =>
  `${signFn(x) + formatFn(x).replace('-', '')}`

const printBenefits = x =>
  prettyPrint(sign('-', '+'), k, benefits(x))
const printBenefitsRate = x =>
  prettyPrint(sign('⨉', '⨉'), x => perc(x + 1), benefitsRate(x))
