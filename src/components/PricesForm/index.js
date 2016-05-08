import {ul} from '@cycle/dom'
import {dot} from 'utils/dot'
import css from './styles.css'
import PriceInput from './priceInput'
import {liftComponentAsList} from 'utils/liftComponentAsList'

export const PricesForm = ({M, DOM}) => {
  const ItemForms = liftComponentAsList(PriceInput, M, {DOM})

  return {
    DOM: ItemForms.DOM.map(children => ul(dot(css.container), children)),
    M: ItemForms.M,
  }
}

export default PricesForm
