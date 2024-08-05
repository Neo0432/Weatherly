import { weatherFromWeatherCode } from './showWeatherPic'

export function currentApparentTemperature(hourlyApparentTemperature, timeNow) {
  let hourNow = new Date(timeNow * 1000).getHours()
  //   console.warn(`ЧАС: ${hourNow}`)
  //   console.warn(`ОЩУЩАЕТСЯ СЕЙЧАС КАК ${hourlyApparentTemperature[hourNow]}`)
  return Math.round(hourlyApparentTemperature[hourNow])
}

export function showAvrOfParameter(parametr, day) {
  const dayStart = day * 24 + 5
  const dayEnd = day * 24 + 22
  const avg = (array) => array.reduce((a, b) => a + b) / array.length
  return +avg(parametr.slice(dayStart, dayEnd)).toFixed(1)
}

export function getWeatherForDate(dataArray, index = 0) {
  const morning = [index * 24 + 5, index * 24 + 11]
  const afternoon = [index * 24 + 11, index * 24 + 17]
  const evening = [index * 24 + 17, index * 24 + 23]
  const night = [(index + 1) * 24, (index + 1) * 24 + 5]

  let weatherToday = {}

  weatherToday.date = new Date(dataArray.hourly.time[index] * 1000)
  weatherToday.morning = getDataAboutTimeOfDay(morning, dataArray.hourly)
  weatherToday.afternoon = getDataAboutTimeOfDay(afternoon, dataArray.hourly)
  weatherToday.evening = getDataAboutTimeOfDay(evening, dataArray.hourly)
  weatherToday.night = getDataAboutTimeOfDay(night, dataArray.hourly)
  weatherToday.sunrise = dataArray.daily.sunrise[index]
  weatherToday.sunset = dataArray.daily.sunset[index]
  weatherToday.temperature_2m_min = dataArray.daily.temperature_2m_min[index]
  weatherToday.temperature_2m_max = dataArray.daily.temperature_2m_max[index]
  return weatherToday
}

function getDataAboutTimeOfDay(timing, dataArray) {
  const avg = (array) => array.reduce((a, b) => a + b) / array.length
  let data = {}
  data.temperature_2m = Math.round(avg(dataArray.temperature_2m.slice(timing[0], timing[1])))
  data.surface_pressure = avg(dataArray.surface_pressure.slice(timing[0], timing[1])).toFixed(1)
  data.relative_humidity_2m = avg(
    dataArray.relative_humidity_2m.slice(timing[0], timing[1])
  ).toFixed(1)
  data.wind_speed_10m = avg(dataArray.wind_speed_10m.slice(timing[0], timing[1])).toFixed(1)
  data.apparent_temperature = Math.round(
    avg(dataArray.apparent_temperature.slice(timing[0], timing[1]))
  )
  data.weather_code = weatherFromWeatherCode(
    getTheMostFrequentWeatherCode(timing, dataArray.weather_code.slice(timing[0], timing[1]))
  )

  // console.table(data)

  return data
}

function getTheMostFrequentWeatherCode(timing, weatherCodesArray) {
  const mostFrequentNum = Object.entries(
    weatherCodesArray.reduce((acc, n) => ((acc[n] = (acc[n] ?? 0) + 1), acc), {})
  )
    .reduce((acc, n) => ((acc[n[1]] = +n[0]), acc), [])
    .pop()
  return mostFrequentNum
}
