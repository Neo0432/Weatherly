import axios from 'axios'

export async function getCityInfo(cityInfo) {
  if (!cityInfo) return null
  let city = {}
  if ('name' in cityInfo) {
    try {
      await axios
        .get(
          `http://api.openweathermap.org/geo/1.0/direct?q=${cityInfo.name},ru&limit=1&appid=fa6f91685ac74aafa5a5554ee81859ca`
        )
        .then((res) => (city = res.data[0]))

      //powered by OPEN-METEO API (same that forecast API)
      // await axios
      //   .get(
      //     `https://geocoding-api.open-meteo.com/v1/search?name=${cityInfo.name}&count=1&language=ru&format=json`
      //   )
      //   .then((res) => (city = res.data[0]))

      console.table(city)
      console.log('Функция поиска города по названию выполнена удачно')
    } catch {
      console.error('The allowed number of requests has been exceeded. API for city name')
      return null
    }
  } else {
    try {
      await axios
        .get(
          `http://api.openweathermap.org/geo/1.0/reverse?lat=${cityInfo.lat}&lon=${cityInfo.lon}&limit=1&appid=fa6f91685ac74aafa5a5554ee81859ca`
        )
        .then((res) => (city = res.data[0]))
      console.table(city)
      console.log('Функция поиска города по названию выполнена удачно')
    } catch {
      console.error(
        'The allowed number of requests has been exceeded. API for city name by coordinates'
      )
      return null
    }
  }
  return city
}
export async function getWeatherResponseFromAPI(city) {
  if (!city) return
  let data = null
  try {
    console.log('OK')
    await axios
      .get(
        `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m,relative_humidity_2m,weather_code,surface_pressure,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,surface_pressure,wind_speed_10m,temperature_1000hPa,relative_humidity_1000hPa&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset&wind_speed_unit=ms&timeformat=unixtime&timezone=auto`
      )
      .then((res) => (data = res.data))

    console.log('Функиця Запроса погоды выполнена удачно')
  } catch {
    console.error('The allowed number of requests has been exceeded. Weather forecast API')
  }
  return data
}
