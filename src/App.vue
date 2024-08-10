<script setup>
import { ref, onBeforeMount } from 'vue'
import Navigation from './components/Navigation.vue'
import NoDataLoading from './components/NoDataLoading.vue'
import WeatherNow from './components/WeatherNow.vue'
import SmallWeatherCard from './components/SmallWeatherCard.vue'
import DayDetailed from './components/DayDetailed.vue'
import * as apiRequests from '@/scripts/apiRequests'
import { weatherFromWeatherCode } from '@/scripts/showWeatherPic'
import {
  currentApparentTemperature,
  showAvrOfParameter,
  getWeatherForDate
} from '@/scripts/computationForecastData'

let weatherDataJson = ref(null)
let cityInfo = ref({})

onBeforeMount(async () => {
  navigator.geolocation.getCurrentPosition((position) => {
    //мб и бесполезная проверка, можно оптимизировать
    if (
      !(position.coords.latitude == localStorage.getItem('userLatitude')) ||
      !(position.coords.longitude == localStorage.getItem('userLongitude'))
    ) {
      console.log('Запрос геолокации пользователя')
      console.log(position.coords.latitude, position.coords.longitude)
      localStorage.setItem('userLatitude', position.coords.latitude)
      localStorage.setItem('userLongitude', position.coords.longitude)
    }
  })
  let currentUserPosition = {
    lat: localStorage.getItem('userLatitude'),
    lon: localStorage.getItem('userLongitude')
  }
  cityInfo.value = await apiRequests.getCityInfo(currentUserPosition)
  if (cityInfo.value) {
    weatherDataJson.value = await apiRequests.getWeatherResponseFromAPI(cityInfo.value)
  }
})

const getCityInfoFromSearch = (searchResult) => {
  searchResult.then(async (value) => {
    try {
      cityInfo.value = value
      const response = await apiRequests.getWeatherResponseFromAPI(value)
      weatherDataJson.value = response
    } catch (error) {
      console.error('Error fetching weather data:', error)
    }
  })
}
</script>

<template>
  <div
    class="flex absolute bg-[radial-gradient(65%_96.3%_at_50%_0%,rgba(63,123,212,1.0)_0%,rgba(3,3,6,1.0)_100%)] w-full h-[49.125rem] -z-10"
  ></div>
  <div class="flex flex-col items-center font-regular text-white px-6 py-8 gap-8">
    <header class="w-full">
      <Navigation :callback-function="getCityInfoFromSearch" />
    </header>
    <main class="grid gap-8" v-if="weatherDataJson">
      <WeatherNow
        :city="cityInfo.local_names.ru"
        :temp="Math.round(weatherDataJson.current.temperature_2m)"
        :weather="weatherFromWeatherCode(weatherDataJson.current.weather_code)"
        :feelsLike="
          currentApparentTemperature(
            weatherDataJson.hourly.apparent_temperature,
            weatherDataJson.current.time
          )
        "
        :wind="weatherDataJson.current.wind_speed_10m"
        :humidity="weatherDataJson.current.relative_humidity_2m"
        :pressure="weatherDataJson.current.surface_pressure"
      />
      <!-- <div v-else class="w-full text-center text-6xl">Нет данных</div> -->
      <div class="flex flex-col gap-4 w-full">
        <p class="font-medium text-2xl">Прогноз на 7 дней:</p>
        <div class="flex gap-4 w-full flex-nowrap">
          <SmallWeatherCard
            v-for="(weather, index) in 7"
            :key="index"
            :date="new Date(weatherDataJson.daily.time[index] * 1000)"
            :temp="Math.round(weatherDataJson.daily.temperature_2m_max[index])"
            :weather="weatherFromWeatherCode(weatherDataJson.daily.weather_code[index])"
            :min_temp="weatherDataJson.daily.temperature_2m_min[index]"
            :max_temp="weatherDataJson.daily.temperature_2m_max[index]"
            :wind="showAvrOfParameter(weatherDataJson.hourly.wind_speed_10m, index)"
            :humidity="showAvrOfParameter(weatherDataJson.hourly.relative_humidity_2m, index)"
            :pressure="showAvrOfParameter(weatherDataJson.hourly.surface_pressure, index)"
          />
        </div>
      </div>
      <DayDetailed :weatherToday="getWeatherForDate(weatherDataJson)" />
    </main>
    <main v-else class="w-full">
      <NoDataLoading />
    </main>
  </div>
</template>
