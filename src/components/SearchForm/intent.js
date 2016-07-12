import {Observable as O} from 'rx'

export function intent (DOM) {
  const $input = DOM.select('.i-query')
  return {
    query: O.merge(
        $input.events('change'),
        $input.events('keyup').debounce(50),
      )
      .pluck('target', 'value')
      .distinctUntilChanged(),
    clear: O.merge(
      $input.events('keyup')
        .filter(x => x.key == 'Escape'),
      DOM.select('.i-clear')
        .events('click')
    ),
  }
}
export default intent
