import {createGroup, assert} from 'painless'
import fs from 'fs-promise'

import {idFromName} from './strings'


const test = createGroup()
test('idFromName', (done) => {
  fs.readJson(__dirname + '/../../storage/test-database.json')
    .then(db =>
      db.filter((x) => {
        assert.isDefined(x.id)
        assert.isDefined(x.name)
        if(!x.id || !x.name) return false

        assert.equal(idFromName(x.name), x.id)
        const id = idFromName(x.name)
        const fail = id != x.id
        return fail
      })
    ).then(() => done())
})
