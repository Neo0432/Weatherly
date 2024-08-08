<script setup>
import { ref, defineProps } from 'vue'
import { getCityInfo } from '@/scripts/apiRequests'

const props = defineProps({
  callbackFunction: {
    type: Function,
    required: true
  }
})

let cityName = ref({ name: '' })

const searchByCityName = () => {
  if (!cityName.value.name || cityName.value.name.length <= 2) {
    console.log(cityInfo.value.name)
    return
  }
  const cityInfo = getCityInfo(cityName.value)
  props.callbackFunction(cityInfo)
}
</script>

<template>
  <div class="flex justify-between items-center w-full h-fit max-w-screen-2xl px-10 py-4 mx-auto">
    <div class="flex gap-2 items-center w-fit h-10">
      <div class="w-28">
        <img src="/src/assets/logo.svg" alt="" class="w-full h-auto" />
      </div>
      <p class="font-bold text-4xl">Weatherly</p>
    </div>
    <div class="flex gap-2 max-h-9">
      <input
        v-model="cityName.name"
        type="text"
        name="search"
        id="search"
        placeholder="Введите ваш город"
        autocomplete="off"
        class="p-2 font-regular w-[27.5rem] bg-grayblue shadow-based outline-none rounded-lg placeholder:text-white placeholder:text-base placeholder:focus:text-sm placeholder:focus:text-secondaryText placeholder:transition-all"
      />
      <button
        @click="searchByCityName"
        class="flex justify-between items-center w-[6.5rem] py-1 pl-2 pr-3 rounded-lg bg-grayblue shadow-based text-lg leading-18 hover:bg-[#2E415F] active:bg-[#375179] active:scale-95 transition-all disabled:opacity-75"
      >
        <img src="../assets/navigation/search.svg" alt="" />
        <p>Найти</p>
      </button>
    </div>
  </div>
</template>
