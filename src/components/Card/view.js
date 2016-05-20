import {div, h2, small, img, span} from '@cycle/dom'
import {k} from 'utils/currency'

import css from './card.css'
import dot from 'utils/dot'
import iconFavorites from 'icons/icon-eye.svg'
import {Checkbox} from 'components/Checkbox'

export const view = (M) => {
  return M.map(card =>
    div('.card' + dot(css.container),
      {
        dataVisible: card.visible,
        key: card.id,
        style: `background-color: hsl(${card.hue}, 44%, 50%);`,
      }, [
        div(dot(css.innerWrapper), [
          div(dot(css.priceInfos), {key: 'secondaryInfo'}, [
            `${k(card.cost)} -> ${k(card.price)} | ${card.secondaryInfo}`,
            Checkbox(
              dot(css.favorite), '.m-favorites',
              {checked: card.favorites},
              span({innerHTML: iconFavorites})
            ),
          ]),
          renderMainInfo(card),
          div(dot(css.identity), [
            small(dot(css.type), [card.type]),
            h2(dot(css.name), [card.name]),
          ]),
        ]),
      ])
  )
}
export default view

function renderMainInfo (item) {
  const fontSize = isOverProfitable(item) ? '4rem'
    : isSuperProfitable(item) ? '3rem'
    : isProfitable(item) ? '2rem'
    : '1rem'

  return div(
    '.mainInfo' + dot(css.mainInfo),
    {style: `font-size: ${fontSize};`, key: 'primaryInfo'},
    [item.primaryInfo]
  )
}

const profitability = (boundary, boundaryRate) =>
  ({benefits, benefitsRate}) =>
    (benefits >= boundary)
    || (benefitsRate >= boundaryRate && benefits >= boundary / 4)

const isProfitable = profitability(200000, .15)
const isSuperProfitable = profitability(400000, .30)
const isOverProfitable = profitability(800000, .50)
