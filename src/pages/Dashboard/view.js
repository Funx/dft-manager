import {Observable as O} from 'rx'
import {div} from '@cycle/dom'
import dot from 'utils/dot'
import css from './dashboard.css'
import {k, percent as perc} from 'utils/currency'
import {sum, prop} from 'ramda'

export const view = (M, searchForm$, collection$, logger$, categories$) =>
  O.combineLatest(
    M, searchForm$, collection$, logger$, categories$,
    (searchResults, searchForm, collection, logger, categories) =>

      /* markup */
      div(dot(css.mainFrame), [
        div(dot(css.loggerWrapper), [logger]),
        div(dot(css.fixedUI), [
          searchForm,
        ]),
        div(dot(css.fixedUIplaceholder)),
        div(dot(css.contentWrapper), [
          categories,
          renderStatusBar(searchResults),
          collection,
          div(dot(css.overlay)),
        ]),
      ])
      /* /markup */
  )

export default view

function renderStatusBar (list) {
  const total = propName => list => sum(list.map(prop(propName)))

  const totalCost = total('cost')(list)
  const totalPrice = total('price')(list)
  const totalBenefits = totalPrice - totalCost
  const totalBenefitsRate = (totalPrice - totalCost) / totalCost

  /* markup */
  return div(dot(css.statusBar), [
    div('.left', []),
    div('.right', [
      `${list.length} résultat${list.length > 1 ? 's' : ''}`,
      ' | ',
      `${k(totalCost)} -> ${k(totalPrice)}`,
      ' | ',
      `${k(totalBenefits)} (${perc(totalBenefitsRate)})`,
    ]),
  ])
  /* /markup */
}
