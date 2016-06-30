import {Model} from 'stanga'
import {makeDOMDriver} from '@cycle/dom'
import {makeHistoryDriver} from '@cycle/history'
import {createHistory} from 'history'
import {makeHTTPDriver} from '@cycle/http'
import {makeScreenDriver} from './drivers/screen'
import {makeSocketDriver} from './drivers/socket.io.js'

import {initialState} from './initialState'


export const drivers = {
  M: Model(initialState),
  DOM: makeDOMDriver(`.app`),
  History: makeHistoryDriver(createHistory(), {capture: true}),
  HTTP: makeHTTPDriver(),
  Screen: makeScreenDriver(),
  WS: makeSocketDriver(location.pathname),
}

export default drivers
