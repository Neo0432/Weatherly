<script setup>
import WeatherDataCard from './WeatherDataCard.vue'
import { tempMark } from '@/scripts/tempMark'

const props = defineProps({
  city: String,
  temp: Number,
  weather: Object,
  feelsLike: Number,
  wind: Number,
  humidity: Number,
  pressure: Number
})
</script>

<template>
  <div class="flex flex-col items-center justify-center w-full py-6 gap-4">
    <p class="font-semibold text-3xl">{{ props.city }}</p>
    <div class="flex justify-center items-center gap-8">
      <p class="font-semibold text-8xl">{{ tempMark(props.temp) }}</p>
      <div class="flex gap-1 items-center">
        <img :src="props.weather.icon_path" alt="" class="h-[5.375rem]" />
        <div class="flex flex-col text-lg">
          <p class="text-2xl font-medium first-letter:capitalize">
            {{ props.weather.description }}
          </p>
          <p>Ощущается как {{ tempMark(props.feelsLike) }}</p>
        </div>
      </div>
    </div>
    <div class="flex gap-8 justify-center text-lg">
      <WeatherDataCard type="wind" :value="wind">Ветер</WeatherDataCard>
      <WeatherDataCard type="humidity" :value="humidity">Влажность</WeatherDataCard>
      <WeatherDataCard type="pressure" :value="pressure">Давление</WeatherDataCard>
    </div>
  </div>
</template>
