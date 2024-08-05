<script setup>
import { tempMark } from '@/scripts/tempMark'

const props = defineProps({
  weatherToday: Object
})
const timesOfDayRU = ['утром', 'днем', 'вечером', 'ночью']
const MONTH = [
  'Января',
  'Февраля',
  'Марта',
  'Апреля',
  'Мая',
  'Июня',
  'Июля',
  'Августа',
  'Сентября',
  'Октября',
  'Ноября',
  'Декабря'
]
const keysOfDay = ['morning', 'afternoon', 'evening', 'night']
</script>

<template>
  <div class="flex flex-col gap-4 w-full max-w-screen-2xl items-center font-medium">
    <p class="text-2xl self-start">Подробный прогноз:</p>
    <div class="flex text-base gap-x-3 px-9 py-6 rounded-2xl w-full shadow-based bg-grayblueT">
      <!--base-->
      <div class="flex flex-col gap-y-2 w-full">
        <!--block with info about temp, pressure, humidity, etc.-->
        <div class="grid grid-cols-6 items-center gap-6 w-full">
          <!--header-string-->
          <div class="flex items-center gap-2">
            <!--date-block-->
            <p class="text-5xl">{{ props.weatherToday.date.getDate() }}</p>
            <div class="flex flex-col justify-center">
              <!--month&"today"-block-->
              <p>{{ MONTH[props.weatherToday.date.getMonth()] }},</p>
              <p>сегодня</p>
            </div>
          </div>
          <!--header-values-names-row-->
          <p></p>
          <p class="text-center text-secondaryText">Давление,<br />мм рт. ст.</p>
          <p class="text-center text-secondaryText">Влажность</p>
          <p class="text-center text-secondaryText">Ветер,<br />м/с</p>
          <p class="text-center text-secondaryText">Ощущается<br />как</p>
        </div>
        <template v-for="(time, index) in timesOfDayRU" :key="time">
          <div class="grid grid-cols-6 gap-6 text-2xl w-full">
            <div class="flex flex-col gap-1 w-full">
              <p class="font-light text-base text-secondaryText">{{ time }}</p>
              <p class="text-xl">
                {{ tempMark(props.weatherToday[keysOfDay[index]].temperature_2m) }}
              </p>
            </div>
            <div class="flex gap-1 items-center w-full">
              <img
                :src="props.weatherToday[keysOfDay[index]].weather_code.icon_path"
                class="max-h-12"
                alt=""
              />
              <p class="text-wrap text-base">
                {{ props.weatherToday[keysOfDay[index]].weather_code.description }}
              </p>
            </div>
            <div class="flex justify-center items-center w-full">
              {{ props.weatherToday[keysOfDay[index]].surface_pressure }}
            </div>
            <div class="flex justify-center items-center w-full">
              {{ props.weatherToday[keysOfDay[index]].relative_humidity_2m + '%' }}
            </div>
            <div class="flex justify-center items-center w-full">
              {{ props.weatherToday[keysOfDay[index]].wind_speed_10m }}
            </div>
            <div class="flex justify-center items-center w-full">
              {{ tempMark(props.weatherToday[keysOfDay[index]].apparent_temperature) }}
            </div>
          </div>
        </template>
      </div>
      <div class="h-full rounded-full border border-[#8491A2]"><!--separator--></div>
      <div class="flex flex-col justify-center items-center gap-6 w-full max-w-44">
        <!--second block with sunrise, sunset, min&max temp-->
        <div class="flex justify-center gap-4">
          <!--Sunrise&Sunset-->
          <div class="flex flex-col items-center">
            <img src="../assets/dayDetailed/sunrise.svg" class="max-w-12" alt="" />
            <div class="flex flex-col gap-1 items-center">
              <p class="font-light text-xs text-secondaryText">Восход</p>
              <p class="text-xl">
                {{
                  new Date(props.weatherToday.sunrise * 1000).getHours() +
                  ':' +
                  new Date(props.weatherToday.sunrise * 1000).getMinutes()
                }}
              </p>
            </div>
          </div>
          <div class="flex flex-col items-center">
            <img src="../assets//dayDetailed/sunset.svg" alt="" />
            <div class="flex flex-col gap-1 items-center">
              <p class="font-light text-xs text-secondaryText">Закат</p>
              <p class="text-xl">
                {{
                  new Date(props.weatherToday.sunset * 1000).getHours() +
                  ':' +
                  new Date(props.weatherToday.sunset * 1000).getMinutes()
                }}
              </p>
            </div>
          </div>
        </div>
        <div class="flex flex-col justify-center gap-2">
          <!--Min&Max temp-->
          <div class="flex gap-1">
            <!--min temp-->
            <img src="../assets/dayDetailed/tempMin.svg" alt="" />
            <div class="flex flex-col gap-1">
              <p class="font-light text-base text-secondaryText">Мин. темп.</p>
              <p class="text-xl">
                {{ tempMark(Math.round(props.weatherToday.temperature_2m_min)) }}
              </p>
            </div>
          </div>
          <div class="flex gap-1">
            <!--temp max-->
            <img src="../assets/dayDetailed/tempMax.svg" alt="" />
            <div class="flex flex-col gap-1">
              <p class="font-light text-base text-secondaryText">Макс. темп.</p>
              <p class="text-xl">
                {{ tempMark(Math.round(props.weatherToday.temperature_2m_max)) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
