import {Observable as O} from 'rx'
import {parseInputPrice} from 'utils/currency'

export default intent
export function intent (DOM, M) {
  const $mainInfo = DOM.select('.mainInfo')
  const $mPrice = DOM.select('.m-price')
  const click$ = $mainInfo.events('click').share()

  const clicks$ = click$
    .buffer(() => click$.debounce(300))
    .map(x => x.length)
    .share()

  return {
    toggleBenefitsPrintMode$: clicks$.filter(count => count == 1),
    save$: O.merge(
        // $mPrice.events('focusout'),
        $mPrice.events('keyup').filter(x => x.key == 'Enter'),
      )
      .pluck('target', 'value')
      .map(parseInputPrice)
      .filter(x => !!x)
      .merge(M.pluck('price').delay(1))
      .distinctUntilChanged()
      .skip(1),
    focus$: O.merge(
      $mPrice.events('focus').map(true),
      $mPrice.events('focusout').map(false),
    ),
    startEdit$: O.merge(
      clicks$.filter(count => count >= 2),
      $mPrice.events('focus'),
    ),
    endEdit$: O.merge(
      $mPrice.events('keyup').filter(x => x.key == 'Escape'),
      $mPrice.events('focusout'),
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
  const $btn = DOM.select(className)
  const mousedown$ = $btn.events('mousedown')
    .flatMapLatest(() =>
      O.of('down').concat(
        O.merge(
          $btn.events('mouseup').map(() => 'up'),
          O.interval(300).map(() => 'up'),
          $btn.events('mouseleave').map(() => 'move'),
          $btn.events('contextmenu').map(() => 'right')
        ).first()
      ),
    )
    .distinctUntilChanged()
    .timeInterval()
    .filter(x => x.value == 'up')
    .shareReplay(1)

  const shortClick$ = mousedown$.filter(x => x.interval < 300)
  const longClick$ = mousedown$.filter(x => x.interval >= 300)
  const rightClick$ = $btn.events('contextmenu')
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
