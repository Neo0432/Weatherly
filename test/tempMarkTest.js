import { assert } from 'chai'
import { describe, it } from 'mocha'
import { tempMark } from '../src/scripts/tempMark.js'

describe('#tempMark()', () => {
  it('Show temp with correct mark + \u00B0 for 5 deg', () => {
    assert.equal(tempMark(5), '+5\u00B0')
  })
  it('Show temp with correct mark + \u00B0 for -2 deg', () => {
    assert.equal(tempMark(-2), '-2\u00B0')
  })
})
