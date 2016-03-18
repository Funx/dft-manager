import inject from 'cyclejs-mock'
import { Observable } from 'rx'

import { createGroup, assert } from 'painless'
const test = createGroup()

function funcToTest(a$, b$) {
  return Observable.combineLatest(
    a$, b$,
    (a, b) => (a + b)
  )
}

test(
  'should add numbers from input',
  inject(
    (createObservable, onNext, getValues) => {
      let a$ = createObservable(onNext(100, 1), onNext(200, 2))
      let b$ = createObservable(onNext(150, 3), onNext(250, 4))

      let sum$ = funcToTest(a$, b$)

      assert.deepEqual(
        getValues(sum$),
        [ 4, 5, 6 ],
      )
    }
  )
)
