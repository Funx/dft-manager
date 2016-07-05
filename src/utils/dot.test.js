import {createGroup, assert} from 'painless'
const test = createGroup()

import {dot} from './dot'
test('utils/dot with a single class name', function testDot () {
  assert.equal(dot('className'), '.className')
})
test('utils/dot with two classes separated by a space', function testDot () {
  assert.equal(dot('className1 className2'), '.className1 .className2')
})
test('utils/dot with a non string value', function testDot () {
  assert.equal(dot(null), 'null')
  assert.equal(dot({}), '[object Object]')
})
