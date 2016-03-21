import { createGroup, assert } from 'painless'
import { getValues } from '../../test/testUtils'
import { mockDOMResponse } from '@cycle/dom'
import { Observable } from 'rx'


const test = createGroup()
const domSource = mockDOMResponse({
  '.tested': {
    'event1': Observable.of('event1'),
    'event2': Observable.of('event2'),
    'useless': Observable.of('useless'),
  },
  '.useless': {
    'scroll': Observable.of('scroll'),
  },
})

import { events } from './index'
test('utils/events with an array of event names', function testEvents () {
  const expected$ = Observable.from(['event1', 'event2'])
  const test$ = events(
    domSource.select('.tested'),
    ['event1', 'event2', 'inexistantEvent']
  )
  assert.deepEqual(getValues(test$), getValues(expected$))
})

test('utils/events with a string of event names separated by a space', function testEvents () {
  const expected$ = Observable.from(['event1', 'event2'])
  const test$ = events(
    domSource.select('.tested'),
    'event1 event2 inexistantEvent'
  )
  assert.deepEqual(getValues(test$), getValues(expected$))
})
