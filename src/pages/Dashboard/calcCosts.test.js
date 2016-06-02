import {createGroup, assert} from 'painless'
import {calcCosts, isRecipeValid, isIngredientValid} from './calcCosts'

const test = createGroup('dashboard/calcCosts')
test('isIngredientValid', () => {
  const db = new Map([
    ['validIngredient1', {recipe: [{id: 'validIngredient2'}]}],
    ['validIngredient2', {price: 1}],
    ['invalidIngredient1', {recipe: [{id: 'missingIngredient'}]}],
    ['invalidIngredient2', {}],
  ])
  assert.isNotOk(isIngredientValid(db, undefined,
    'should return false on undefined'))
  assert.isOk(isIngredientValid(db, db.get('validIngredient1'),
    'should return true if has valid recipe'))
  assert.isOk(isIngredientValid(db, db.get('validIngredient2'),
    'should return true if has price'))
  assert.isNotOk(isIngredientValid(db, db.get('invalidIngredient1'),
    'should return false otherway'))
  assert.isNotOk(isIngredientValid(db, db.get('invalidIngredient2'),
    'should return false otherway'))
})
test('isRecipeValid', () => {
  const db = new Map([
    ['validIngredient1', {recipe: [{id: 'validIngredient2'}]}],
    ['validIngredient2', {price: 1}],
    ['invalidIngredient', {}],
  ])
  assert.isNotOk(isRecipeValid(db, {}),
    'should be true on non array')
  assert.isNotOk(isRecipeValid(db, []),
    'should be false on empty array')
  assert.isNotOk(isRecipeValid(db, [{id: 'missingIngredient'}]),
    'should be false on missing ingredient')
  assert.isNotOk(isRecipeValid(db, [{id: 'invalidIngredient'}]),
    'should be false on invalid ingredient')
  assert.isOk(isRecipeValid(db, [
    {id: 'validIngredient1'},
    {id: 'validIngredient2'},
  ]),
    'should be true otherways')
})

test('calcCosts', () => {
  const input = new Map()
  const output = calcCosts(input)
  return assert(output instanceof Map, 'result is not instance of Map',
    'should return a Map object')
})
test('calcCosts should not alter the Map\'s structure', () => {
  const input = new Map([
    ['1', {}],
    ['2', {}],
  ])
  const output = calcCosts(input)
  return assert.deepEqual([...input.keys()], [...output.keys()])
})
test('calcCosts should add a \'cost\' property to each item', () => {
  const input = new Map([
    ['1', {}],
    ['2', {}],
  ])
  const output = calcCosts(input)
  return assert([...output.values()].every(x => x.hasOwnProperty('cost')))
})
test('calcCosts should set the cost to the item\'s price when recipe is empty', () => {
  const tested = {price: 42, recipe: []}
  const input = new Map([
    ['tested', tested],
  ])
  const output = calcCosts(input).get('tested')
  return assert.equal(output.cost, tested.price)
})
test('calcCosts should set the cost to the item\'s price when ingredient is missing', () => {
  const tested = {price: 42, recipe: [
    {quantity: 5, id: 'validIngredient'},
    {quantity: 3, id: 'missingIngredient'},
  ]}
  const input = new Map([
    ['tested', tested],
    ['validIngredient', {price: 1}],
  ])
  const output = calcCosts(input).get('tested')
  return assert.equal(output.cost, tested.price)
})
test('calcCosts should calc cost from its ingredients price when recipe is valid', () => {
  const tested = {
    price: 42,
    recipe: [
      {quantity: 5, id: 'ingredient1'},
      {quantity: 3, id: 'ingredient2'},
    ],
  }
  const input = new Map([
    ['tested', tested],
    ['ingredient1', {price: 1}],
    ['ingredient2', {price: 2}],
  ])
  const output = calcCosts(input).get('tested')
  return assert.equal(output.cost, (5 * 1) + (3 * 2))
})
