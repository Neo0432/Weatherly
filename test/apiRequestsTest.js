import { assert } from 'chai'
import { describe, it } from 'mocha'
import { getCityInfo, getWeatherResponseFromAPI } from '../src/scripts/apiRequests.js'

describe('#getCityInfo', () => {
  it('Return null if cityInfo = null', async () => {
    assert.equal(await getCityInfo(''), null)
  })
  it('Return object from city API request by name', () => {
    assert.equal(typeof getCityInfo('London'), 'object')
  })
})

describe('#getWeatherResponseFromAPI', () => {
  it('Return nyll if cityInfo = null', async () => {
    assert.equal(await getWeatherResponseFromAPI(null), null)
  })
  it('Return object from city API request by name', () => {
    assert.equal(typeof getCityInfo('London'), 'object')
  })
})
