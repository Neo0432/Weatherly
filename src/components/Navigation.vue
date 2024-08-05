<script setup>
import { ref } from 'vue'
import { getCityInfo } from '@/scripts/apiRequests'
let cityName = ref({ name: '' })

function searchByCityName() {
  if (!cityName.value.name || cityName.value.name.length <= 2) {
    console.log(cityInfo.value.name)
    console.log('ОШИБКА')
  }
  console.log('СИТИНЕЙМ ' + cityName.value.name)
  console.log('функция выполняется')
  const cityInfo = getCityInfo(cityName.value)
  console.log(cityInfo)
  return cityInfo
}
</script>

<template>
  <div class="flex justify-between w-full px-10 py-4">
    <div class="flex gap-2">
      <input
        v-model="cityName.name"
        type="text"
        name="search"
        id="search"
        placeholder="Введите ваш город"
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
