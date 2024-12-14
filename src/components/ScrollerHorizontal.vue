<script setup>
import { ref, computed, watch } from 'vue'
import { useWindowSize } from '@vueuse/core'
import { Splide, SplideSlide } from '@splidejs/vue-splide'
import SmallWeatherCard from './SmallWeatherCard.vue'
import { showAvrOfParameter } from '@/scripts/computationForecastData'
import { weatherFromWeatherCode } from '@/scripts/showWeatherPic'
import '@splidejs/vue-splide/css'

const props = defineProps({
  forecastList: Object
})

const { width } = useWindowSize()
const slidesOnPage = computed(() => {
  let count = Math.round(width.value / 260)
  if (width.value < 750) count = Math.round(width.value / 370)
  if (count > 7) return 7
  return count
})

watch(slidesOnPage, (newSlideOnPage) => {
  SplideOptions.value.perPage = newSlideOnPage
  SplideOptions.value.gap = newSlideOnPage > 3 ? '1rem' : '0.5rem'
})

let SplideOptions = ref({
  type: 'slide',
  perPage: slidesOnPage.value,
  trimSpace: true,
  gap: '1rem',
  pagination: false,
  rewind: false
})
</script>

<template>
  <Splide class="flex w-full" :options="SplideOptions">
    <SplideSlide v-for="(weather, index) in 7" :key="index" class="flex justify-center">
      <SmallWeatherCard
        :date="new Date(props.forecastList.daily.time[index] * 1000)"
        :temp="Math.round(props.forecastList.daily.temperature_2m_max[index])"
        :weather="weatherFromWeatherCode(props.forecastList.daily.weather_code[index])"
        :min_temp="props.forecastList.daily.temperature_2m_min[index]"
        :max_temp="props.forecastList.daily.temperature_2m_max[index]"
        :wind="showAvrOfParameter(props.forecastList.hourly.wind_speed_10m, index)"
        :humidity="showAvrOfParameter(props.forecastList.hourly.relative_humidity_2m, index)"
        :pressure="showAvrOfParameter(props.forecastList.hourly.surface_pressure, index)"
      />
    </SplideSlide>
  </Splide>
</template>
