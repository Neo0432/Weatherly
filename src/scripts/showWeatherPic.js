export function showWeatherPic(weather) {
  return `/src/assets/weatherPic/${weather}.svg`
}

const weather_code_info = {
  0: { description: 'Ясно', icon_path: '/src/assets/weatherPic/suny.svg', weatherColor: '#DAA520' },
  1: {
    description: 'В основном ясно',
    icon_path: '/src/assets/weatherPic/cloudyWC.svg',
    weatherColor: '#D2B48C'
  },
  2: {
    description: 'Облачно с прояс.',
    icon_path: '/src/assets/weatherPic/cloudyWC.svg',
    weatherColor: '#4682B4'
  },
  3: {
    description: 'Облачно',
    icon_path: '/src/assets/weatherPic/cloudy.svg',
    weatherColor: '#778899'
  },
  45: {
    description: 'Туман',
    icon_path: '/src/assets/weatherPic/fog.svg',
    weatherColor: '#A9A9A9'
  },
  48: {
    description: 'Осаждающий туман',
    icon_path: '/src/assets/weatherPic/fog.svg',
    weatherColor: '#696969'
  },
  '51, 53': {
    description: 'Морось',
    icon_path: '/src/assets/weatherPic/rain.svg',
    weatherColor: '#2F4F4F'
  },
  55: {
    description: 'Сильная морось',
    icon_path: '/src/assets/weatherPic/rain.svg',
    weatherColor: '#708090'
  },
  '56, 57': {
    description: 'Морось со снегом',
    icon_path: '/src/assets/weatherPic/snowWR.svg',
    weatherColor: '#5F9EA0'
  },
  61: {
    description: 'Легкий дождь',
    icon_path: '/src/assets/weatherPic/rain.svg',
    weatherColor: '#4169E1'
  },
  '63, 65': {
    description: 'Дождь',
    icon_path: '/src/assets/weatherPic/rain.svg',
    weatherColor: '#1E90FF'
  },
  '66, 67': {
    description: 'Дождь со снегом',
    icon_path: '/src/assets/weatherPic/snowWR.svg',
    weatherColor: '#4682B4'
  },
  71: {
    description: 'Слабый снег',
    icon_path: '/src/assets/weatherPic/snow.svg',
    weatherColor: '#B0C4DE'
  },
  73: {
    description: 'Снег',
    icon_path: '/src/assets/weatherPic/snow.svg',
    weatherColor: '#A9A9A9'
  },
  75: {
    description: 'Сильный снег',
    icon_path: '/src/assets/weatherPic/snow.svg',
    weatherColor: '#778899'
  },
  77: {
    description: 'Град',
    icon_path: '/src/assets/weatherPic/snow.svg',
    weatherColor: '#696969'
  },
  '80, 81, 82': {
    description: 'Ливень',
    icon_path: '/src/assets/weatherPic/rain.svg',
    weatherColor: '#00008B'
  },
  '85, 86': {
    description: 'Метель',
    icon_path: '/src/assets/weatherPic/snow.svg',
    weatherColor: '#4682B4'
  },
  95: {
    description: 'Гроза',
    icon_path: '/src/assets/weatherPic/storm.svg',
    weatherColor: '#483D8B'
  },
  '96, 99': {
    description: 'Гроза с градом',
    icon_path: '/src/assets/weatherPic/storm.svg',
    weatherColor: '#6A5ACD'
  }
}

export function weatherFromWeatherCode(weatherCode) {
  for (let key in weather_code_info) {
    if (key.split(', ').includes(weatherCode.toString())) {
      return weather_code_info[key]
    }
  }
  return {}
}
