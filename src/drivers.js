import {makeSocketDriver} from './drivers/socket.io.client.js'
import {makeScreenDriver} from './drivers/screen'
import {makeHistoryDriver} from '@cycle/history'
import {makeHTTPDriver} from '@cycle/http'
import {makeKeysDriver} from 'cycle-keys'
import {makeDOMDriver} from '@cycle/dom'
import {createHistory} from 'history'
import {Model} from 'stanga'

import {initialState} from './initialState'


export const drivers = {
  M: Model(initialState),
  DOM: makeDOMDriver(`.app`),
  History: makeHistoryDriver(createHistory(), {capture: true}),
  HTTP: makeHTTPDriver(),
  Screen: makeScreenDriver(),
  Keys: makeKeysDriver(),
  WS: makeSocketDriver(location.pathname),
}

export default drivers
