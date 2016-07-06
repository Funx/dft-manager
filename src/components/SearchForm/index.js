import {Observable as O} from 'rx'

import {view} from './view'
import {intent} from './intent'

export const SearchForm = ({DOM, M}) => {
  const intents = intent(DOM)
  const mod$ = O.merge(
    M.set(intents.query),
    M.set(intents.clear.map(() => '')),
  )
  return {
    DOM: view(M),
    M: mod$,
  }
}
export default SearchForm
