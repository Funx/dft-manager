import {Observable as O} from 'rx'

export function intents ({DOM}) {
  const $submitBtn = DOM.select('.i-submitLogs')
  const $input = DOM.select('.m-logs')
  const keyup$ = $input.events('keyup')
  const draft$ = O.merge(
      $input.events('change'),
      $input.events('keyup'),
    )
    .pluck('target', 'value')
    .distinctUntilChanged()
    .shareReplay(1)

  const submit$ = draft$.sample(O.merge(
      $submitBtn.events('click'),
      keyup$.filter(evt => evt.key == 'Enter'),
    ))
    .map(x => x.trim())
    .filter(x => !!x)

  const clear$ = O.merge(
    keyup$.filter(evt => evt.key == 'Escape'),
    submit$,
  )

  return {
    draft$: draft$.merge(clear$.map('')),
    submit$,
  }
}
export default intents
