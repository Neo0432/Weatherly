<script setup>
import { ref, watch, computed, onBeforeMount, onMounted } from 'vue'
import { useWindowSize } from '@vueuse/core'
import Navigation from './components/NavigationSearchInput.vue'
import NoDataLoading from './components/NoDataLoading.vue'
import WeatherNow from './components/WeatherNow.vue'
import ScrollerHorizontal from './components/ScrollerHorizontal.vue'
import DayDetailed from './components/DayDetailed.vue'
import * as apiRequests from '@/scripts/apiRequests'
import { weatherFromWeatherCode } from '@/scripts/showWeatherPic'
import { currentApparentTemperature, getWeatherForDate } from '@/scripts/computationForecastData'

let cityInfo = ref(null)
let weatherDataJson = ref(null)
window.userPosition = {}

onBeforeMount(async () => {
  navigator.geolocation.getCurrentPosition(async (position) => {
    console.debug('Запрос геолокации пользователя')
    window.userPosition.currentUserPosition = {
      lat: position.coords.latitude,
      lon: position.coords.longitude
    }
    cityInfo.value = await apiRequests.getCityInfo(window.userPosition.currentUserPosition)
    if (cityInfo.value) {
      weatherDataJson.value = await apiRequests.getWeatherResponseFromAPI(cityInfo.value)
    }
  })
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

//Screen sizing
const { width } = useWindowSize()
const isSmallScreen = computed(() => width.value <= 768)

onMounted(() => {
  watch(weatherDataJson, (newWeatherDataJson) => {
    if (newWeatherDataJson == null || newWeatherDataJson == undefined) return
    const bgArea = document.querySelector('#bg-component')
    const firstBg = document.querySelector('#main-bg-gradient')
    const gradient =
      'radial-gradient(65% 96.3% at 50% 0%, ' +
      weatherFromWeatherCode(newWeatherDataJson.current.weather_code).weatherColor +
      ', rgba(3, 3, 6, 1) 100%)'
    firstBg.style.opacity = '0'
    let secondBg = firstBg.cloneNode()
    secondBg.id = 'main-bg-secong-gradient'
    secondBg.style.background = gradient
    bgArea.appendChild(secondBg)
    setTimeout(() => {
      firstBg.remove()
      secondBg.id = 'main-bg-gradient'
      secondBg.style.opacity = '1'
    }, 1250)
  })
})
</script>

<template>
  <div id="bg-component">
    <div
      id="main-bg-gradient"
      class="flex absolute bg-[radial-gradient(65%_96.3%_at_50%_0%,rgba(63,123,212,1.0)_0%,rgba(3,3,6,1.0)_100%)] w-full h-[49.125rem] -z-10"
    ></div>
  </div>
  <div
    class="flex flex-col min-h-screen items-center font-regular text-white px-4 md:px-6 py-8 gap-8"
  >
    <header class="w-full">
      <Navigation :callback-function="getCityInfoFromSearch" :is-small-screen="isSmallScreen" />
    </header>
    <main
      class="flex flex-col gap-8 justify-items-center w-full max-w-screen-2xl"
      v-if="weatherDataJson"
    >
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
        :is-small-screen="isSmallScreen"
      />
      <div class="flex flex-col gap-4 w-full overflow-hidden">
        <p v-memo="[]" class="font-medium text-2xl">Прогноз на 7 дней:</p>
        <ScrollerHorizontal :forecast-list="weatherDataJson" />
      </div>
      <DayDetailed
        :weatherToday="getWeatherForDate(weatherDataJson)"
        :is-small-screen="isSmallScreen"
      />
    </main>
    <main v-else class="w-full flex flex-1">
      <NoDataLoading />
    </main>
    <footer v-memo="[]" class="relative flex justify-start items-end w-full py-8 sm:justify-center">
      <p class="text-secondaryText opacity-60 w-fit pr-16 text-xs text-center md:text-sm">
        Forecast data provided by
        <a class="underline underline-offset-4 decoration-1" href="https://openweathermap.org/"
          >openweathermap.org</a
        >,
        <a class="underline underline-offset-4 decoration-1" href="https://open-meteo.com/"
          >open-meteo.com</a
        >
      </p>
      <a
        href="https://github.com/Neo0432"
        class="absolute opacity-50 right-4 bottom-4 md:right-6 md:bottom-6"
        ><img src="./assets/githubIcon.svg" alt=""
      /></a>
    </footer>
  </div>
</template>

<style scoped>
#main-bg-gradient {
  transition: opacity 1500ms ease-in-out;
}
</style>
