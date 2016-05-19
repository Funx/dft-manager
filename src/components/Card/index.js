import {Observable as O} from 'rx'

import view from './view'
import {k, percent as perc, sign} from 'utils/currency'
import {toggleBenefitsPrintMode} from './actions'

export const Card = ({M, viewParam$, DOM}) => {
  // viewParam$.subscribe(x => console.log(Date.now(), x))
  // M.subscribe(x => console.log(Date.now(), x))
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
  const mod$ = viewParam$.mod(intents.toggleBenefitsPrintMode
    .map(toggleBenefitsPrintMode))

  return {
    DOM: vtree$,
    M: mod$,
  }
}

function intent (DOM) {
  const mainInfo = DOM.select('.mainInfo')
  return {
    toggleBenefitsPrintMode: mainInfo.events('click'),
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
