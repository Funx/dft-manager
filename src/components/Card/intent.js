import {Observable as O} from 'rx'

export default intent
export function intent (DOM) {
  const $mainInfo = DOM.select('.mainInfo')
  const $mPrice = DOM.select('.m-price')
  const click$ = $mainInfo.events('click')
  const buffer$ = click$
    .buffer(() => click$.debounce(250))
    .map(x => x.length)

  const $craftBtn = DOM.select('.i-crafts')
  const mousedown$ = $craftBtn.events('mousedown')
    .flatMapLatest(() =>
      O.of('down').concat(
        O.merge(
          $craftBtn.events('mouseup').map(() => 'up'),
          O.interval(250).map(() => 'up'),
          $craftBtn.events('mousemove').map(() => 'move'),
          $craftBtn.events('contextmenu').map(() => 'right')
        ).first()
      ),
    )
  .distinctUntilChanged()
  .timeInterval()
  .filter(x => x.value == 'up')

  const shortClick$ = mousedown$
    .filter(x => x.interval < 250)
  const longClick$ = mousedown$
    .filter(x => x.interval >= 250)
  const rightClick$ = $craftBtn.events('contextmenu')
    .do(x => x.preventDefault())
    .debounce(1)


  const intents = {
    toggleBenefitsPrintMode$: buffer$.filter(x => x == 1),
    save$: $mPrice.events('blur').map(x => x.target.value),
    focus$: O.merge(
      $mPrice.events('focus').map(true),
      $mPrice.events('blur').map(false),
    ),
    startEdit$: O.merge(
      buffer$.filter(x => x == 2),
      $mPrice.events('focus').map(true),
    ),
    endEdit$: O.merge(
      $mPrice.events('blur').map(false),
      $mPrice.events('keyup').filter(x => x.key == 'Escape'),
    ),
    toggleFavorites$: DOM.select('.m-favorites')
      .events('change')
      .pluck('target', 'checked'),
    incrementCrafts$: shortClick$,
    decrementCrafts$: O.merge(
      rightClick$,
      longClick$,
    ),
  }
  intents.incrementCrafts$.subscribe(x => console.log('increment'))
  intents.decrementCrafts$.subscribe(x => console.log('decrement'))

  return intents
}
