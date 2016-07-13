import {createClient} from 'then-redis'
import {Observable as O} from 'rx'
import {compose} from 'ramda'
import fs from 'fs-promise'

import {populateRandomData} from 'tools/populateRandomData'
import {prepareDatabase} from 'tools/prepareDatabase'
import {toMap} from 'utils/iterable'


export function makeDatabaseDriver (redisUrl, {fake = false}) {
  const db = redisUrl ? createClient(redisUrl) : null

  return function databaseDriver (sink$) {
    sink$.map(x =>x.toArray()).subscribe(writeState)
    return {
      initialState: () => readState().map(toMap),
    }
  }

  function readState () {
    if (db) {
      return O.fromPromise(
        db.get('state')
          .then(x => {
            if (!x) return (console.log('initializing db'), initializeDB({fake})) // eslint-disable-line no-console
            else return JSON.parse(x)
          })
          .catch(x => console.error('error while reading app state', x, x.stack)) // eslint-disable-line no-console
      )
    } else {
      return O.fromPromise(
        fs.readJson('./storage/db.json')
          .catch(err => {
            if(err.code == 'ENOENT') return (console.log('initializing db'), initializeDB({fake})) // eslint-disable-line no-console
            else throw err
          })
          .catch(x => console.error('error while reading app state from filesystem', x)) // eslint-disable-line no-console
      )
    }
  }

  function writeState (x) {
    if (db) {
      db.set('state', JSON.stringify(x))
        .then((x) => {
          if (x) console.log('successfully written state to redis') // eslint-disable-line no-console
          else console.log('error while writing state to redis', x) // eslint-disable-line no-console
        })
        .catch(x => console.error('error while writing state to redis:', x)) // eslint-disable-line no-console
    } else {
      fs.writeFile('./storage/db.json', JSON.stringify(x))
        .then(() => console.log('successfully written state to file')) // eslint-disable-line no-console
        .catch(x => console.error('error while writing state to file:', x)) // eslint-disable-line no-console
    }
  }

}
export default makeDatabaseDriver

function initializeDB ({fake}) {
  return fs.readJson('./storage/crawlerResults.json')
    .then(fake ? compose(populateRandomData, prepareDatabase) : prepareDatabase)
}
