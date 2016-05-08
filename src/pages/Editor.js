import {L} from 'stanga'
import {prop, complement, filter, take, pipe, either, identity, curry} from 'ramda'
import {Observable as O} from 'rx'
import {div} from '@cycle/dom'
import {dot} from 'utils/dot'
import css from './Editor.css'

// import Editor from 'components/editor'
import PricesForm from 'components/PricesForm'

export const EditorPage = ({M, DOM}) => {
  const itemsToEdit$ = getItemsToEdit(M.lens('items'))
  const outdatedPricesForm = PricesForm({DOM, M: itemsToEdit$})
  // const editor = Editor({M, DOM})

  return {
    DOM: O.combineLatest(
      outdatedPricesForm.DOM,
      outdatedPricesForm =>
        div(dot(css.page),
          div(dot(css.editor), 'editor'),
          div(dot(css.outdatedPricesForm), outdatedPricesForm),
        )
    ),
    M: outdatedPricesForm.M,
  }
}

export default EditorPage

const lensGetter = curry((fn, M) => M.lens(L.lens(fn, identity)))

const hasNoPrice = complement(prop('price'))
const needEdit = either(hasNoPrice, () => false)
const getItemsToEdit = lensGetter(pipe(filter(needEdit), take(200)))
