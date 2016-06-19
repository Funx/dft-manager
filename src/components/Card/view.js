import {div, h2, small, span, input} from '@cycle/dom'
import {k, humanize} from 'utils/currency'

import css from './card.css'
import dot from 'utils/dot'
import iconFavorites from 'icons/icon_eye.svg'
import {Checkbox} from 'components/Checkbox'
import {renderStockStatus} from './stockStatus'

export const view = (M) => {
  return M.map(card =>
    div(dot(css.card), [
      div(dot(css.container),
        {
          dataVisible: card.visible,
          key: card.id,
          style: `background-color: hsl(${card.hue}, 44%, 50%);`,
        }, [
          div(dot(css.innerWrapper), [
            div(dot(css.priceInfos), {key: 'secondaryInfo'}, [
              `${invalidCost(card) ? '?' : k(card.cost)} -> ${infiniteProfit(card) ? '∞' : k(card.price)}${infiniteProfit(card) ? '' : ' | ' + card.secondaryInfo}`,
              Checkbox(
                dot(css.favorite), '.m-favorites',
                {checked: card.favorites, tabIndex: card.editing ? '-1' : ''},
                span({innerHTML: iconFavorites})
              ),
            ]),
            card.editing ? renderEditForm(card) : renderMainInfo(card),
            div(dot(css.identity), [
              small(dot(css.type), [card.type]),
              h2(dot(css.name), [card.name]),
            ]),
          ]),
        ]),
      renderStockStatus(card),
    ])
  )
}
export default view

function renderEditForm (item) {
  return div(dot(css.editForm), [
    input('.m-price', {
      type: 'text',
      value: humanize(item.price, false) + 'k',
    }),
  ])
}

function renderMainInfo (item) {
  const fontSize = isOverProfitable(item) || infiniteProfit(item) ? '4rem'
    : isSuperProfitable(item) ? '3rem'
    : isProfitable(item) ? '2rem'
    : '1rem'

  return div(
    '.mainInfo' + dot(css.mainInfo),
    {style: `font-size: ${fontSize};`, key: 'primaryInfo'},
    [
      infiniteProfit(item) ? '∞' : '',
      invalidCost(item) ? '?' : '',
      !infiniteProfit(item) && !invalidCost(item) ? item.primaryInfo : '',
    ]
  )
}

const profitability = (boundary, boundaryRate) =>
  ({benefits, benefitsRate}) =>
    (benefits >= boundary)
    || (benefitsRate >= boundaryRate && benefits >= boundary / 4)

const isProfitable = profitability(200000, .15)
const isSuperProfitable = profitability(400000, .30)
const isOverProfitable = profitability(800000, .50)
const infiniteProfit = x => (x.price == 0 && x.recipe.length)
const invalidCost = x => (x.cost == 0 && x.recipe.length)
