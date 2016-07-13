import {div, h2, small, span, input} from '@cycle/dom'
import {k, humanize} from 'utils/currency'

import css from './card.css'
import dot from 'utils/dot'
import iconFavorites from 'icons/icon_eye.svg'
import {renderCheckbox} from 'components/Checkbox'
import {renderStockStatus} from './stockStatus'

export const view = (M) => {
  return M.map(card => {
    const attributes = {
      key: 'card-' + card.id,
      attrs: {style: `background-color: hsl(${card.hue}, 44%, 50%);`},
    }

    /* markup */
    return div(dot(css.card), attributes, [
      div(dot(css.container), [
        div(dot(css.innerWrapper), [
          renderPriceInfos(card),
          card.editing ? renderEditForm(card) : renderMainInfo(card),
          renderIdentity(card),
        ]),
      ]),
      renderStockStatus(card),
    ])
    /* /markup */
  })
}
export default view

function renderPriceInfos (x) {
  const cost = invalidCost(x) ? '?' : k(x.cost)
  const price = infiniteProfit(x) ? '∞' : k(x.price)
  const displaySecondaryInfo = !infiniteProfit(x) && !invalidCost(x)
  const secondaryInfo = displaySecondaryInfo
    ? `| ${x.secondaryInfo}`
    : ''

  return div(dot(css.priceInfos), [
    `${cost} -> ${price} ${secondaryInfo}`,
    renderFavoritesIcon(x),
  ])
}

function renderFavoritesIcon (x) {
  const attributes = {
    checked: x.favorites,
    tabIndex: x.editing ? '-1' : '',
  }
  return renderCheckbox(
    dot(css.favorite), '.m-favorites', attributes, [
      span({props: {innerHTML: iconFavorites}}),
    ],
  )
}

function renderEditForm ({id, price, editing}) {
  return div(dot(css.editForm), [
    input('.m-price', {
      key: id + 'priceInput',
      attrs: {
        type: 'text',
        value: `${humanize(price, false)}k`,
      },
      hook: {
        update: (_, vnode) => (editing == id)
          ? setTimeout(vnode.elm.focus(), 100)
          : 'noop',
      },
    }),
  ])
}

function renderIdentity (x) {
  return div(dot(css.identity), [
    small(dot(css.type), [x.type]),
    h2(dot(css.name), [x.name]),
  ])
}

function renderMainInfo (x) {
  const classNames = '.mainInfo' + dot(css.mainInfo)
  const fontSize = isOverProfitable(x) ? '4rem'
    : infiniteProfit(x) ? '4rem'
    : isSuperProfitable(x) ? '3rem'
    : isProfitable(x) ? '2rem'
    : '1rem'
  const style = `font-size: ${fontSize};`
  const attributes = {
    key: x.id + '-mainInfo',
    attrs: {style},
  }
  const infinitySymbol = infiniteProfit(x) ? '∞' : ''
  const questionMark = invalidCost(x) ? '?' : ''
  const displayPrimaryInfo = !infinitySymbol && !questionMark
  const primaryInfo = displayPrimaryInfo ? x.primaryInfo : ''

  return div(classNames, attributes, [
    `${infinitySymbol}${questionMark}${primaryInfo}`,
  ])
}

const profitability = (boundary, boundaryRate) =>
  ({benefits, benefitsRate}) =>
    (benefits >= boundary)
    || (benefitsRate >= boundaryRate && benefits >= boundary / 4)

const isProfitable = profitability(200000, .15)
const isSuperProfitable = profitability(400000, .30)
const isOverProfitable = profitability(800000, .50)
const infiniteProfit = x => (x.price == 0 && x.recipe.length)
const invalidCost = x => (x.cost == 0)
