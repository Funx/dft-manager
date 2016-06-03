import {sortFn, makeSortPropFn, putEmptyRecipesLast} from './sortFn'
import {createGroup, assert} from 'painless'
import {sortBy, identity, compose, pipe} from 'ramda'
const test = createGroup('dashboard/sortFn')

test(`makeSortPropFn('benefits') should order by benefits asc`, () => {
  const sort = makeSortPropFn('benefits')
  const input = [
    {price: 4, cost: 2}, //benefits = 2
    {price: 1, cost: 2}, //benefits = -1
    {price: 4, cost: 3}, //benefits = 1
  ]
  const expected = [
    {price: 1, cost: 2}, //benefits = -1
    {price: 4, cost: 3}, //benefits = 1
    {price: 4, cost: 2}, //benefits = 2
  ]
  const output = sort(input)
  return assert.deepEqual(output, expected)
})
test(`makeSortPropFn('benefits') should consider benefits as infinite when price is 0, then order them by cost`, () => {
  const sort = makeSortPropFn('benefits')
  const input = [
    {price: 0, cost: 1, recipe: [{}]}, //benefits = Infinite -1
    {price: 102, cost: 2}, //benefits = 100
    {price: 0, cost: 2, recipe: [{}]}, //benefits = Infinite -2
    {price: 0, cost: 2, recipe: []}, //impossible -> -2
  ]
  const expected = [
    {price: 0, cost: 2, recipe: []}, //impossible -> -2
    {price: 102, cost: 2}, //benefits = 100
    {price: 0, cost: 2, recipe: [{}]}, //benefits = Infinite -2
    {price: 0, cost: 1, recipe: [{}]}, //benefits = Infinite -1
  ]
  const output = sort(input)
  return assert.deepEqual(output, expected)
})
test(`makeSortPropFn('benefitsRate') should order by benefits % asc`, () => {
  const sort = makeSortPropFn('benefitsRate')
  const input = [
    {price: 4, cost: 2}, //benefitsRate = x2.0
    {price: 1, cost: 2}, //benefitsRate = x0.5
    {price: 40, cost: 30}, //benefitsRate = x1.3
  ]
  const expected = [
    {price: 1, cost: 2}, //benefitsRate = x0.5
    {price: 40, cost: 30}, //benefitsRate = x1.3
    {price: 4, cost: 2}, //benefitsRate = x2.0
  ]
  const output = sort(input)
  return assert.deepEqual(output, expected)
})
test(`makeSortPropFn('price') should order by price`, () => {
  const sort = makeSortPropFn('price')
  const input = [
    {price: 4},
    {price: 1},
    {price: 40},
  ]
  const expected = [
    {price: 1},
    {price: 4},
    {price: 40},
  ]
  const output = sort(input)
  return assert.deepEqual(output, expected)
})
test(`makeSortPropFn('cost') should order by cost`, () => {
  const sort = makeSortPropFn('cost')
  const input = [
    {cost: 4},
    {cost: 1},
    {cost: 40},
  ]
  const expected = [
    {cost: 1},
    {cost: 4},
    {cost: 40},
  ]
  const output = sort(input)
  return assert.deepEqual(output, expected)
})
test(`makeSortPropFn('alphabetical') should order by name, caps and special chars agnostic`, () => {
  const sort = makeSortPropFn('alphabetical')
  const input = [
    {name: 'B'},
    {name: 'a'},
    {name: 'u2'},
    {name: 'u1'},
    {name: '8'},
    {name: 'é'},
    {name: '$'},
  ]
  const expected = [
    {name: '$'},
    {name: '8'},
    {name: 'a'},
    {name: 'B'},
    {name: 'é'},
    {name: 'u1'},
    {name: 'u2'},
  ]
  const output = sort(input)
  return assert.deepEqual(output, expected)
})
test('putEmptyRecipesLast', () => {
  const sort = makeSortPropFn('price')
  const input = [
    {name: '3', recipe: []},
    {name: '4'},
    {name: '1', recipe: [{}, {}]},
    {name: '2', recipe: [{}]},
    {name: '5', recipe: []},
  ]
  const expected = [
    {name: '1', recipe: [{}, {}]},
    {name: '2', recipe: [{}]},
    {name: '3', recipe: []},
    {name: '4'},
    {name: '5', recipe: []},
  ]
  const output = sort(input)
  return assert.deepEqual(output, expected)
})
