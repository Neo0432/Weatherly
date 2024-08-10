<script setup>
import { ref, onMounted } from 'vue'
import { getCityInfo } from '@/scripts/apiRequests'

const props = defineProps({
  callbackFunction: {
    type: Function,
    required: true
  }
})

//Just like a plug
const dontTouchMe = () => alert('Dont touch me plz')

let cityName = ref({ name: '' })

const searchByCityName = () => {
  if (!cityName.value.name || cityName.value.name.length <= 2) {
    return
  }
  const cityInfo = getCityInfo(cityName.value)
  props.callbackFunction(cityInfo)
}

onMounted(() => {
  console.log('element updated')
  const searchForm = document.getElementById('searchForm')
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault()
    searchByCityName()
    console.log('Функция формы выполнилась')
    searchForm.children[0].blur() //removes the focus from input
  })
})
</script>

<template>
  <div
    class="flex justify-between items-center w-full h-fit max-w-screen-2xl gap-12 px-10 py-4 mx-auto"
  >
    <div @click="dontTouchMe" class="flex gap-2 items-center w-fit h-10 hover:cursor-pointer">
      <div class="w-28">
        <img src="/src/assets/logo.svg" alt="" class="w-full h-auto" />
      </div>
      <p class="font-bold text-4xl">Weatherly</p>
    </div>
    <form
      method="post"
      id="searchForm"
      class="flex justify-between gap-2 w-full max-w-xl max-h-9 min-w-96"
    >
      <input
        v-model="cityName.name"
        type="text"
        name="search"
        id="search"
        placeholder="Введите ваш город"
        autocomplete="off"
        class="flex p-2 font-regular w-4/5 bg-grayblue shadow-based outline-none rounded-lg placeholder:text-white placeholder:text-base placeholder:focus:text-sm placeholder:focus:text-secondaryText placeholder:transition-all"
      />
      <button
        type="submit"
        class="flex items-center gap-1 py-1 pl-2 pr-3 rounded-lg bg-grayblue shadow-based text-lg leading-18 hover:bg-[#2E415F] active:bg-[#375179] active:scale-95 transition-all disabled:opacity-75"
      >
        <img src="../assets/navigation/search.svg" alt="" />
        <p>Найти</p>
      </button>
    </form>
  </div>
</template>

<script></script>
