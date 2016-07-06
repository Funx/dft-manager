
export function intent ({Screen}) {
  // body
  const screenHeight$ = Screen.height()
  const scrollTop$ = Screen.events('scroll', 'body')
    .map(x => x[0])
    .pluck('scrollTop')
    .startWith(0)

  // item
  const item$ = Screen.events('resize', '.virtualListContainer .card')
    .map(x => x[0])

  const itemWidth$ = item$.pluck('clientWidth')
    .filter(x => x)
    .startWith(300)
    .distinctUntilChanged()

  const itemHeight$ = item$.pluck('clientHeight')
    .filter(x => x)
    .startWith(300)
    .distinctUntilChanged()

  // container
  const container$ = Screen.events('resize', '.virtualListContainer')
    .map(x => x[0])
  const containerTop$ = container$.pluck('offsetTop')
    .startWith(0)
    .distinctUntilChanged()

  const containerWidth$ = container$.pluck('offsetWidth')
    .startWith(900)
    .distinctUntilChanged()

  return {
    screenHeight$,
    scrollTop$,
    itemHeight$,
    itemWidth$,
    containerWidth$,
    containerTop$,
  }
}
export default intent
