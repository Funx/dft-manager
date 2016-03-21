import { createGroup, assert } from 'painless'
import { getUrlWith } from './getUrl'

const test = createGroup()
const event = {
  target: {
    href: 'http://domain.test/deep/link',
  },
}
const locationOrigin = 'http://domain.test'


test('getUrlWith', function testGetUrl() {
  const expected = '/deep/link'
  const result = getUrlWith(locationOrigin, event)

  assert.equal(result, expected)
})
