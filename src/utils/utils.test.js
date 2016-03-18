import { createGroup, assert } from 'painless'
const test = createGroup()

import { Rx } from '@cycle/core'

import { extractValue } from './index'
test('utils/extractValue', function testExtractValue () {
  const obs = Rx.Observable.just({ key: 'value' })
  extractValue('key', obs)
    .subscribe(value => assert.equal(value, 'value'))
})

import { dot } from './index'
test('utils/dot', function testDot () {
  assert.equal(dot('className'), '.className')
  assert.equal(dot('className1 className2'), '.className1 .className2')
  assert.equal(dot(null), '.null')
})

import { mockDOMResponse } from '@cycle/dom'
import { events } from './index'
test('utils/events', function testEvents () {
  const domSource = mockDOMResponse({
    '.foo': {
      'click': Rx.Observable.of({target: {}}),
      'mouseover': Rx.Observable.of({target: {}}),
    },
    '.bar': {
      'scroll': Rx.Observable.of({target: {}}),
      observable: Rx.Observable.of({tagName: 'div'}),
    },
  })

  const obs1 = events(domSource.select('.foo'), ['click'])
  const obs2 = events(domSource.select('.foo'), ['click'])

  assert.notEqual(true, obs1.sequenceEqual(obs2))
})
