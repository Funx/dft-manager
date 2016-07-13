import {createGroup, assert} from 'painless'
import {queryPredicate} from './makeFilterer'
import {filter} from 'ramda'

const test = createGroup('dashboard/makeSorter')
test(`queryPredicate: empty query`, () => {
  const filterer = filter(queryPredicate())
  const input = [
    {name: 'Acrobate mineur', type: 'Trophée'},
    {name: 'Acrobate', type: 'Trophée'},
    {name: 'Acrobate majeur', type: 'Trophée'},
    {name: 'Bihilète mineure', type: 'Idole'},
  ]
  return assert.deepEqual(filterer(input), input)
})
test(`queryPredicate: filter by name`, () => {
  const filterer = filter(queryPredicate('mineur'))
  const input = [
    {name: 'Acrobate mineur', type: 'Trophée'},
    {name: 'Acrobate', type: 'Trophée'},
    {name: 'Acrobate majeur', type: 'Trophée'},
    {name: 'Bihilète mineure', type: 'Idole'},
  ]
  const output = [
    {name: 'Acrobate mineur', type: 'Trophée'},
    {name: 'Bihilète mineure', type: 'Idole'},
  ]
  return assert.deepEqual(filterer(input), output)
})
test(`queryPredicate: filter by type`, () => {
  const filterer = filter(queryPredicate('trophée'))
  const input = [
    {name: 'Acrobate mineur', type: 'Trophée'},
    {name: 'Acrobate', type: 'Trophée'},
    {name: 'Acrobate majeur', type: 'Trophée'},
    {name: 'Bihilète mineure', type: 'Idole'},
  ]
  const output = [
    {name: 'Acrobate mineur', type: 'Trophée'},
    {name: 'Acrobate', type: 'Trophée'},
    {name: 'Acrobate majeur', type: 'Trophée'},
  ]
  return assert.deepEqual(filterer(input), output)
})
test(`queryPredicate: multiple filters`, () => {
  const filterer = filter(queryPredicate('trophée mine'))
  const input = [
    {name: 'Acrobate mineur', type: 'Trophée'},
    {name: 'Acrobate', type: 'Trophée'},
    {name: 'Acrobate majeur', type: 'Trophée'},
    {name: 'Bihilète mineure', type: 'Idole'},
  ]
  const output = [
    {name: 'Acrobate mineur', type: 'Trophée'},
  ]
  return assert.deepEqual(filterer(input), output)
})
test(`queryPredicate: negative filters`, () => {
  const filterer = filter(queryPredicate('!mine'))
  const input = [
    {name: 'Acrobate mineur', type: 'Trophée'},
    {name: 'Acrobate', type: 'Trophée'},
    {name: 'Acrobate majeur', type: 'Trophée'},
    {name: 'Bihilète mineure', type: 'Idole'},
  ]
  const output = [
    {name: 'Acrobate', type: 'Trophée'},
    {name: 'Acrobate majeur', type: 'Trophée'},
  ]
  return assert.deepEqual(filterer(input), output)
})
test(`queryPredicate: multiple negative filters`, () => {
  const filterer = filter(queryPredicate('!maj !mine'))
  const input = [
    {name: 'Acrobate mineur', type: 'Trophée'},
    {name: 'Acrobate', type: 'Trophée'},
    {name: 'Acrobate majeur', type: 'Trophée'},
    {name: 'Bihilète mineure', type: 'Idole'},
  ]
  const output = [
    {name: 'Acrobate', type: 'Trophée'},
  ]
  return assert.deepEqual(filterer(input), output)
})
test(`queryPredicate: multiple negative and positive filters`, () => {
  const filterer = filter(queryPredicate('mine !mine'))
  const input = [
    {name: 'Acrobate mineur', type: 'Trophée'},
    {name: 'Acrobate', type: 'Trophée'},
    {name: 'Acrobate majeur', type: 'Trophée'},
    {name: 'Bihilète mineure', type: 'Idole'},
  ]
  const output = []
  return assert.deepEqual(filterer(input), output)
})
test(`queryPredicate: property scoped search`, () => {
  const filterer = filter(queryPredicate('type:trophee description:amazing'))
  const input = [
    {name: 'Acrobate mineur', type: 'Trophée', description: 'Amazing too'},
    {name: 'Acrobate', type: 'Trophée', description: 'Bof bof'},
    {name: 'Acrobate majeur', type: 'Trophée'},
    {name: 'Bihilète mineure', type: 'Idole', description: 'Amazing too'},
  ]
  const output = [
    {name: 'Acrobate mineur', type: 'Trophée', description: 'Amazing too'},
  ]
  return assert.deepEqual(filterer(input), output)
})
