import {Observable as O} from 'rx'
import {div, ul, li} from '@cycle/dom'

import css from './collection.css'
import dot from 'utils/dot'

export function view (cards$, M) {
  return O.combineLatest(
    cards$,
    M,
    (cards, {height, paddingTop}) => {
      const containerAttributes = {attrs: {style: `height: ${height}px;`}}
      const collectionAttributes = {attrs: {style: `transform: translateY(${paddingTop}px);`}}

      /* markup */
      return div('.virtualListContainer', containerAttributes, [
        ul(dot(css.collection), collectionAttributes, [
          ...cards.map(listItem),
        ]),
      ])
      /* /markup */
    }
  )
}

function listItem (card) {
  const attributes = {
    key: card.data.key,
    style: {
      opacity: '0',
      transform: 'translateY(-10px)',
      transition: 'all .1s',
      delayed: {opacity: '1', transform: 'translateY(0)'},
      destroy: {opacity: '0', transform: 'translateY(10px)'},
    },
  }

  /* markup */
  return li('.card' + dot(css.children), attributes, [
    card,
  ])
  /* /markup */
}
