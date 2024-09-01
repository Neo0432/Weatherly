<script setup>
import { tempMark } from '@/scripts/tempMark'

const props = defineProps({
  weatherToday: Object,
  isSmallScreen: Boolean
})
const timesOfDayRU = ['Утром', 'Днем', 'Вечером', 'Ночью']
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

function displayBeautifulTime(time) {
  if (time < 10) return '0' + time
  else return time
}
</script>

<template>
  <div class="flex flex-col gap-4 w-full items-center font-medium">
    <p v-memo="[]" class="text-2xl self-start">Подробный прогноз:</p>
    <!--Mobile ver-->
    <div
      v-if="isSmallScreen"
      class="flex flex-col px-4 py-6 gap-5 rounded-2xl w-full shadow-based bg-grayblueT"
    >
      <div class="flex flex-col items-center gap-6">
        <div v-memo="[props.weatherToday]" class="flex items-center gap-2">
          <!--date-block-->
          <p class="text-4xl lg:text-5xl">{{ props.weatherToday.date.getDate() }}</p>
          <div class="flex flex-col justify-center text-sm lg:text-base">
            <!--month&"today"-block-->
            <p>{{ MONTH[props.weatherToday.date.getMonth()] }},</p>
            <p>сегодня</p>
          </div>
        </div>
        <!--Times of day-->
        <div
          v-memo="[timesOfDayRU]"
          class="grid grid-cols-4 w-full justify-items-center font-light text-base text-secondaryText"
        >
          <p v-for="time in timesOfDayRU" :key="time">{{ time }}</p>
        </div>
        <!--Temperature-->
        <div class="grid grid-cols-4 w-full justify-items-center font-medium text-xl">
          <p v-for="(time, index) in timesOfDayRU" :key="time">
            {{ tempMark(props.weatherToday[keysOfDay[index]].temperature_2m) }}
          </p>
        </div>
        <!--Weather-->
        <div class="grid grid-cols-4 w-full justify-items-center">
          <div v-for="(time, index) in timesOfDayRU" :key="time" class="flex flex-col items-center">
            <img
              :src="props.weatherToday[keysOfDay[index]].weather_code.icon_path"
              class="max-h-12"
              alt=""
            />
            <p class="text-wrap text-xs font-medium text-center">
              {{ props.weatherToday[keysOfDay[index]].weather_code.description }}
            </p>
          </div>
        </div>
        <!--Pressure-->
        <div class="grid grid-rows-2 w-full justify-items-center gap-1">
          <p v-memo="[]" class="text-sm text-secondaryText">Давление, мм.рт.ст.</p>
          <div class="grid grid-cols-4 w-full justify-items-center">
            <p v-for="(time, index) in timesOfDayRU" :key="time">
              {{ props.weatherToday[keysOfDay[index]].surface_pressure }}
            </p>
          </div>
        </div>
        <!--Humidity-->
        <div class="grid grid-rows-2 w-full justify-items-center gap-1">
          <p v-memo="[]" class="text-sm text-secondaryText">Влажность</p>
          <div class="grid grid-cols-4 w-full justify-items-center">
            <p v-for="(time, index) in timesOfDayRU" :key="time">
              {{ Math.round(props.weatherToday[keysOfDay[index]].relative_humidity_2m) + '%' }}
            </p>
          </div>
        </div>
        <!--WindSpeed-->
        <div class="grid grid-rows-2 w-full justify-items-center gap-1">
          <p v-memo="[]" class="text-sm text-secondaryText">Ветер, м/с</p>
          <div class="grid grid-cols-4 w-full justify-items-center">
            <p v-for="(time, index) in timesOfDayRU" :key="time">
              {{ props.weatherToday[keysOfDay[index]].wind_speed_10m }}
            </p>
          </div>
        </div>
        <!--Feels Like-->
        <div class="grid grid-rows-2 w-full justify-items-center gap-1">
          <p v-memo="[]" class="text-sm text-secondaryText">Ощущается как</p>
          <div class="grid grid-cols-4 w-full justify-items-center">
            <p v-for="(time, index) in timesOfDayRU" :key="time">
              {{ tempMark(props.weatherToday[keysOfDay[index]].apparent_temperature) }}
            </p>
          </div>
        </div>
      </div>
      <div class="w-full rounded-full border border-[#8491A2]"><!--separator--></div>
      <div class="grid grid-cols-2 gap-4 justify-items-center">
        <!--Sunrise&Sunset-->
        <div class="flex flex-wrap justify-start gap-4">
          <div class="flex items-center">
            <img src="../assets/dayDetailed/sunrise.svg" class="max-w-12" alt="" />
            <div class="flex flex-col gap-1 items-center">
              <p v-memo="[]" class="font-light text-xs text-secondaryText">Восход</p>
              <p class="text-lg">
                {{
                  displayBeautifulTime(new Date(props.weatherToday.sunrise * 1000).getHours()) +
                  ':' +
                  displayBeautifulTime(new Date(props.weatherToday.sunrise * 1000).getMinutes())
                }}
              </p>
            </div>
          </div>
          <div class="flex items-center">
            <img src="../assets//dayDetailed/sunset.svg" alt="" />
            <div class="flex flex-col gap-1 items-center">
              <p v-memo="[]" class="font-light text-xs text-secondaryText">Закат</p>
              <p class="text-lg lg:text-xl">
                {{
                  displayBeautifulTime(new Date(props.weatherToday.sunset * 1000).getHours()) +
                  ':' +
                  displayBeautifulTime(new Date(props.weatherToday.sunset * 1000).getMinutes())
                }}
              </p>
            </div>
          </div>
        </div>
        <!--Min&Max temp-->
        <div class="flex flex-wrap justify-start gap-2">
          <!--Min&Max temp-->
          <div class="flex items-center gap-1">
            <!--min temp-->
            <img src="../assets/dayDetailed/tempMin.svg" alt="" class="max-w-12" />
            <div class="flex flex-col w-fit">
              <p v-memo="[]" class="font-light text-nowrap text-xs text-secondaryText lg:text-base">
                Мин. темп.
              </p>
              <p class="text-lg">
                {{ tempMark(Math.round(props.weatherToday.temperature_2m_min)) }}
              </p>
            </div>
          </div>
          <div class="flex items-center gap-1">
            <!--temp max-->
            <img src="../assets/dayDetailed/tempMax.svg" alt="" class="max-w-12" />
            <div class="flex flex-col w-fit">
              <p v-memo="[]" class="font-light text-nowrap text-xs text-secondaryText">
                Макс. темп.
              </p>
              <p class="text-lg">
                {{ tempMark(Math.round(props.weatherToday.temperature_2m_max)) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--Desctop ver-->
    <div
      v-else
      class="flex text-base gap-x-1 px-6 py-6 rounded-2xl w-full shadow-based bg-grayblueT xl:px-9 md:gap-x-3"
    >
      <!--base-->
      <table class="flex flex-col gap-y-2 w-full">
        <!--block with info about temp, pressure, humidity, etc.-->
        <tr class="grid grid-cols-6 items-center lg:gap-6 w-full text-sm lg:text-base">
          <!--header-string-->
          <td v-memo="[props.weatherToday]" class="flex items-center gap-2">
            <!--date-block-->
            <p class="text-4xl lg:text-5xl">{{ props.weatherToday.date.getDate() }}</p>
            <div class="flex flex-col justify-center text-sm lg:text-base">
              <!--month&"today"-block-->
              <p>{{ MONTH[props.weatherToday.date.getMonth()] }},</p>
              <p>сегодня</p>
            </div>
          </td>
          <!--header-values-names-row-->
          <th></th>
          <th v-memo="[]" class="text-center font-medium text-secondaryText">
            Давление,<br />мм рт. ст.
          </th>
          <th v-memo="[]" class="text-center font-medium text-secondaryText">Влажность</th>
          <th v-memo="[]" class="text-center font-medium text-secondaryText">Ветер,<br />м/с</th>
          <th v-memo="[]" class="text-center font-medium text-secondaryText">Ощущается<br />как</th>
        </tr>
        <tr
          v-for="(time, index) in timesOfDayRU"
          :key="time"
          class="grid grid-cols-6 w-full md:gap-3 lg:gap-6 md:text-1xl lg:text-2xl"
        >
          <div class="flex flex-col gap-1 w-full">
            <p class="font-light text-sm text-secondaryText lg:text-base">{{ time }}</p>
            <p class="text-xl">
              {{ tempMark(props.weatherToday[keysOfDay[index]].temperature_2m) }}
            </p>
          </div>
          <div
            class="flex flex-col items-center w-full text-center lg:gap-1 lg:flex-row lg:justify-start lg:text-start"
          >
            <img
              :src="props.weatherToday[keysOfDay[index]].weather_code.icon_path"
              class="max-h-12"
              alt=""
            />
            <p class="text-wrap text-xs lg:text-base">
              {{ props.weatherToday[keysOfDay[index]].weather_code.description }}
            </p>
          </div>
          <div class="flex justify-center items-center w-full">
            {{ props.weatherToday[keysOfDay[index]].surface_pressure }}
          </div>
          <div class="flex justify-center items-center w-full">
            {{ Math.round(props.weatherToday[keysOfDay[index]].relative_humidity_2m) + '%' }}
          </div>
          <div class="flex justify-center items-center w-full">
            {{ props.weatherToday[keysOfDay[index]].wind_speed_10m }}
          </div>
          <div class="flex justify-center items-center w-full">
            {{ tempMark(props.weatherToday[keysOfDay[index]].apparent_temperature) }}
          </div>
        </tr>
      </table>
      <div class="rounded-full border border-[#8491A2]"><!--separator--></div>
      <div class="flex flex-col justify-center items-center gap-6 w-full max-w-44">
        <!--second block with sunrise, sunset, min&max temp-->
        <div class="flex justify-center gap-4">
          <!--Sunrise&Sunset-->
          <div class="flex flex-col items-center">
            <img src="../assets/dayDetailed/sunrise.svg" class="max-w-12" alt="" />
            <div class="flex flex-col gap-1 items-center">
              <p v-memo="[]" class="font-light text-xs text-secondaryText">Восход</p>
              <p class="text-lg lg:text-xl">
                {{
                  displayBeautifulTime(new Date(props.weatherToday.sunrise * 1000).getHours()) +
                  ':' +
                  displayBeautifulTime(new Date(props.weatherToday.sunrise * 1000).getMinutes())
                }}
              </p>
            </div>
          </div>
          <div class="flex flex-col items-center">
            <img src="../assets//dayDetailed/sunset.svg" alt="" />
            <div class="flex flex-col gap-1 items-center">
              <p v-memo="[]" class="font-light text-xs text-secondaryText">Закат</p>
              <p class="text-lg lg:text-xl">
                {{
                  displayBeautifulTime(new Date(props.weatherToday.sunset * 1000).getHours()) +
                  ':' +
                  displayBeautifulTime(new Date(props.weatherToday.sunset * 1000).getMinutes())
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
            <div class="flex flex-col lg:gap-1">
              <p v-memo="[]" class="font-light text-sm text-secondaryText lg:text-base">
                Мин. темп.
              </p>
              <p class="text-lg lg:text-xl">
                {{ tempMark(Math.round(props.weatherToday.temperature_2m_min)) }}
              </p>
            </div>
          </div>
          <div class="flex gap-1">
            <!--temp max-->
            <img src="../assets/dayDetailed/tempMax.svg" alt="" />
            <div class="flex flex-col lg:gap-1">
              <p v-memo="[]" class="font-light text-base text-secondaryText">Макс. темп.</p>
              <p class="text-lg lg:text-xl">
                {{ tempMark(Math.round(props.weatherToday.temperature_2m_max)) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
