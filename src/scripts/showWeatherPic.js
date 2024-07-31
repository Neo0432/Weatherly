export function showWeatherPic(weather) {
  return `/src/assets/weatherPic/${weather}.svg`
}

const weather_code_info = {
  0: { description: 'Ясно', icon_path: '/src/assets/weatherPic/suny.svg' },
  1: { description: 'В основном ясно', icon_path: '/src/assets/weatherPic/cloudyWC.svg' },
  2: { description: 'Облачно с прояс.', icon_path: '/src/assets/weatherPic/cloudyWC.svg' },
  3: { description: 'Облачно', icon_path: '/src/assets/weatherPic/cloudy.svg' },
  45: { description: 'Туман', icon_path: '/src/assets/weatherPic/fog.svg' },
  48: { description: 'Осаждающий туман', icon_path: '/src/assets/weatherPic/fog.svg' },
  '51, 53': { description: 'Морось', icon_path: '/src/assets/weatherPic/rain.svg' },
  55: { description: 'Сильная морось', icon_path: '/src/assets/weatherPic/rain.svg' },
  '56, 57': { description: 'Морось со снегом', icon_path: '/src/assets/weatherPic/snowWR.svg' },
  61: { description: 'Легкий дождь', icon_path: '/src/assets/weatherPic/rain.svg' },
  '63, 65': { description: 'Дождь', icon_path: '/src/assets/weatherPic/rain.svg' },
  '66, 67': { description: 'Дождь со снегом', icon_path: '/src/assets/weatherPic/snowWR.svg' },
  71: { description: 'Слабый снег', icon_path: '/src/assets/weatherPic/snow.svg' },
  73: { description: 'Снег', icon_path: '/src/assets/weatherPic/snow.svg' },
  75: { description: 'Сильный снег', icon_path: '/src/assets/weatherPic/snow.svg' },
  77: { description: 'Град', icon_path: '/src/assets/weatherPic/snow.svg' },
  '80, 81, 82': { description: 'Ливень', icon_path: '/src/assets/weatherPic/rain.svg' },
  '85, 86': { description: 'Метель', icon_path: '/src/assets/weatherPic/snow.svg' },
  95: { description: 'Гроза', icon_path: '/src/assets/weatherPic/storm.svg' },
  '96, 99': { description: 'Гроза с градом', icon_path: '/src/assets/weatherPic/storm.svg' }
}

export function weatherFromWeatherCode(weatherCode) {
  for (let key in weather_code_info) {
    if (key.split(', ').includes(weatherCode.toString())) {
      return weather_code_info[key]
    }
  }
  return {}
}
