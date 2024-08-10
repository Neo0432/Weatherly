<script setup>
import { tempMark } from '@/scripts/tempMark'
import WeatherData from './WeatherDataCard.vue'

const props = defineProps({
  date: Date,
  temp: Number,
  weather: Object,
  min_temp: Number,
  max_temp: Number,
  wind: Number,
  humidity: Number,
  pressure: Number
})

const DAYS = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']

function getDayOfWeek(date) {
  if (date >= 7) date -= 7
  return DAYS[date]
}
function getMonthNumberPretty(month) {
  if (month.toString().length >= 2) return month
  else return '0' + month
}
</script>

<template>
  <div
    class="flex flex-col justify-between gap-2 p-4 rounded-2xl w-full min-w-[11.8rem] max-w-[12.5rem] font-medium bg-grayblueT shadow-based"
  >
    <p class="text-sm">
      {{
        getDayOfWeek(props.date.getDay()) +
        ', ' +
        props.date.getDate() +
        '.' +
        getMonthNumberPretty(props.date.getMonth() + 1)
      }}
    </p>
    <div class="flex justify-center gap-3 items-center w-full">
      <img :src="props.weather.icon_path" alt="" />
      <div class="flex flex-col items-center">
        <p class="font-bold text-[2rem]">{{ tempMark(props.temp) }}</p>
        <p class="text-base break-word">{{ props.weather.description }}</p>
      </div>
    </div>
    <div class="grid grid-cols-2 justify-center text-center">
      <div class="w-full font-medium text-base">
        <p class="font-regular text-sm text-secondaryText">мин.темп.</p>
        <p>{{ tempMark(Math.round(props.min_temp)) }}</p>
      </div>
      <div class="w-full font-medium text-base">
        <p class="font-regular text-sm text-secondaryText">макс.темп.</p>
        <p>{{ tempMark(Math.round(props.max_temp)) }}</p>
      </div>
    </div>
    <div class="grid grid-cols-3 w-full justify-between gap-2">
      <WeatherData :isSmallVer="true" type="wind" :value="wind" />
      <WeatherData :isSmallVer="true" type="humidity" :value="humidity" />
      <WeatherData :isSmallVer="true" type="pressure" :value="pressure" />
    </div>
  </div>
</template>
