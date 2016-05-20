import {Observable as O} from 'rx'

import view from './view'
import {k, percent as perc, sign} from 'utils/currency'
import {toggleBenefitsPrintMode} from './actions'

export const Card = ({M, viewParam$, DOM}) => {
  const state$ = O.combineLatest(
    M, viewParam$.distinctUntilChanged(),
    (card, param) => ({
      ...card,
      benefits: benefits(card),
      benefitsRate: printBenefitsRate(card),
      secondaryInfo: (param == '%')
        ? printBenefits(card)
        : printBenefitsRate(card),
      primaryInfo: (param == '%')
        ? printBenefitsRate(card)
        : printBenefits(card),
    })
  )

  const vtree$ = view(state$)
  const intents = intent(DOM)
  const mod$ = O.merge(
    viewParam$.mod(
      intents.toggleBenefitsPrintMode$.map(toggleBenefitsPrintMode)),
    M.lens('lol').set(intents.toggleFavorites$),
  )
  return {
    DOM: vtree$,
    M: mod$,
  }
}

function intent (DOM) {
  const mainInfo = DOM.select('.mainInfo')
  return {
    toggleBenefitsPrintMode$: mainInfo.events('click')
      .debounce(10),
    toggleFavorites$: DOM.select('.m-favorites')
      .events('change')
      .pluck('target', 'checked')
      .debounce(10),
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
