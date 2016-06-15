import {Observable as O} from 'rx'

export default intent
export function intent (DOM) {
  const $mainInfo = DOM.select('.mainInfo')
  const $mPrice = DOM.select('.m-price')
  const click$ = $mainInfo.events('click')
  const buffer$ = click$
    .buffer(() => click$.debounce(250))
    .map(x => x.length)

  const intents = {
    toggleBenefitsPrintMode$: buffer$.filter(x => x == 1),
    save$: $mPrice.events('blur').map(x => x.target.value),
    focus$: O.merge(
      $mPrice.events('focus').map(true),
      $mPrice.events('blur').map(false),
    ),
    startEdit$: buffer$.filter(x => x == 2),
    endEdit$: O.merge(
      $mPrice.events('keyup').filter(x => x.key == 'Escape'),
    ),
    toggleFavorites$: DOM.select('.m-favorites')
      .events('change')
      .pluck('target', 'checked'),
  }

  return intents
}
