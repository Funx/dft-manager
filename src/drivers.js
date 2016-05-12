import {Model} from 'stanga'
import {makeDOMDriver} from '@cycle/dom'
import {makeHistoryDriver} from '@cycle/history'
import {createHistory} from 'history'
import {makeHTTPDriver} from '@cycle/http'

import {initialState} from './initialState'


export const drivers = {
  M: Model(initialState),
  DOM: makeDOMDriver(`.app`),
  History: makeHistoryDriver(createHistory(), {capture: true}),
  HTTP: makeHTTPDriver(),
}

export default drivers
