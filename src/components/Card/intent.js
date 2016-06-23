import {Observable as O} from 'rx'

export default intent
export function intent (DOM) {
  const $mainInfo = DOM.select('.mainInfo')
  const $mPrice = DOM.select('.m-price')
  const click$ = $mainInfo.events('click').share()

  const buffer$ = click$
    .buffer(() => click$.debounce(300))
    .map(x => x.length)
    .share()

  return {
    toggleBenefitsPrintMode$: buffer$.filter(x => x == 1),
    save$: $mPrice.events('blur').map(x => x.target.value)
      .distinctUntilChanged()
      .timestamp(),
    focus$: O.merge(
      $mPrice.events('focus').map(true),
      $mPrice.events('blur').map(false),
    ),
    startEdit$: O.merge(
      buffer$.filter(x => x >= 2),
      $mPrice.events('focus').map(true),
    ),
    endEdit$: O.merge(
      $mPrice.events('blur').map(false),
      $mPrice.events('keyup').filter(x => x.key == 'Escape'),
    ),
    toggleFavorites$: DOM.select('.m-favorites')
      .events('change')
      .pluck('target', 'checked'),
    craftBtnIntents: btnIntent(DOM, '.i-crafts'),
    stockBtnIntents: btnIntent(DOM, '.i-stocks'),
    sellBtnIntents: btnIntent(DOM, '.i-sold'),
  }
}

function btnIntent (DOM, className) {
  const $craftBtn = DOM.select(className)
  const mousedown$ = $craftBtn.events('mousedown')
    .flatMapLatest(() =>
      O.of('down').concat(
        O.merge(
          $craftBtn.events('mouseup').map(() => 'up'),
          O.interval(300).map(() => 'up'),
          $craftBtn.events('mouseleave').map(() => 'move'),
          $craftBtn.events('contextmenu').map(() => 'right')
        ).first()
      ),
    )
    .distinctUntilChanged()
    .timeInterval()
    .filter(x => x.value == 'up')
    .shareReplay(1)

  const shortClick$ = mousedown$
    .filter(x => x.interval < 300)
  const longClick$ = mousedown$
    .filter(x => x.interval >= 300)
  const rightClick$ = $craftBtn.events('contextmenu')
    .do(x => x.preventDefault())
    .debounce(1)

  return {
    increment$: shortClick$,
    decrement$: O.merge(
      rightClick$,
      longClick$,
    ),
  }
}
