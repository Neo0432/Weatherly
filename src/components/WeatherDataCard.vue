<script setup>
const props = defineProps({
  isSmallVer: Boolean,
  type: String,
  value: Number
})

function measureUnit(type, value) {
  switch (type) {
    case 'wind':
      return value + ' м/с'
    case 'humidity':
      return value + ' %'
    case 'pressure':
      return value + ' мм.рт.ст.'
    default:
      return undefined
  }
}
</script>

<template>
  <div v-if="isSmallVer" class="flex flex-col items-center w-full text-xs">
    <p class="flex justify-center text-wrap text-center w-full text-secondaryText">
      {{ measureUnit(props.type, '') }}
    </p>
    <div
      class="flex flex-col justify-center items-center p-2 gap-1 rounded-lg w-full h-full bg-grayblueT shadow-based"
    >
      <img v-if="props.type == 'wind'" src="../assets/weatherData/wind.svg" class="w-4" alt="" />
      <img
        v-else-if="props.type == 'humidity'"
        src="../assets/weatherData/humidity.svg"
        class="w-4"
        alt=""
      />
      <img
        v-else-if="props.type == 'pressure'"
        src="../assets/weatherData/pressure.svg"
        class="w-4"
        alt=""
      />
      <p>{{ props.value }}</p>
    </div>
  </div>
  <div v-else class="flex gap-2 max-h-12 font-regular text-lg">
    <div
      class="flex justify-center items-center p-3 rounded-lg h-full w-12 bg-grayblueT shadow-based"
    >
      <img v-if="props.type == 'wind'" src="../assets/weatherData/wind.svg" class="w-full" alt="" />
      <img
        v-else-if="props.type == 'humidity'"
        src="../assets/weatherData/humidity.svg"
        class="w-full"
        alt=""
      />
      <img
        v-else-if="props.type == 'pressure'"
        src="../assets/weatherData/pressure.svg"
        class="w-full"
        alt=""
      />
    </div>
    <div class="flex flex-col justify-center gap-1 text-lg leading-18">
      <p><slot></slot></p>
      <p>{{ measureUnit(props.type, props.value) }}</p>
    </div>
  </div>
</template>
