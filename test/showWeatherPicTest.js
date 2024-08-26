import { assert } from 'chai'
import { describe, it } from 'mocha'
import { weatherFromWeatherCode } from '../src/scripts/showWeatherPic.js'

const test1 = {
  description: 'Облачно с проясн.',
  icon_path: '/src/assets/weatherPic/cloudyWC.svg',
  weatherColor: '#4682B4'
}

const test2 = {
  description: 'Дождь со снегом',
  icon_path: '/src/assets/weatherPic/snowWR.svg',
  weatherColor: '#4682B4'
}

describe('#weatherFromWeatherCode()', () => {
  it('Return object with info about weather cloudy with clarifications from weatherCode 2', () => {
    assert.deepEqual(weatherFromWeatherCode(2), test1)
  })
  it('Return object with info about weather rain with snow from weatherCode 66', () => {
    assert.deepEqual(weatherFromWeatherCode('66'), test2)
  })
  it('Return object with info about weather rain with snow from weatherCode 67 (same last test)', () => {
    assert.deepEqual(weatherFromWeatherCode('67'), test2)
  })
  it('Return an empty object when the weatherCode is not found', () => {
    assert.deepEqual(weatherFromWeatherCode(112), {})
  })
})
