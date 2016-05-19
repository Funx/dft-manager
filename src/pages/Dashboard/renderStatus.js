import {div} from '@cycle/dom'
import dot from 'utils/dot'
import css from './searchable.css'
import {k, percent as perc} from 'utils/currency'
import {sum, prop} from 'ramda'

export const renderStatus = (list) => {
  const totalCost = total('cost')(list)
  const totalPrice = total('price')(list)
  const totalBenefits = totalPrice - totalCost
  const totalBenefitsRate = (totalPrice - totalCost) / totalCost

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
}

export default renderStatus

const total = propName => list => sum(list.map(prop(propName)))
