<script setup>
import { ref } from 'vue'
import { getCityInfo } from '@/scripts/apiRequests'

const props = defineProps({
  callbackFunction: {
    type: Function,
    required: true
  },
  isSmallScreen: Boolean
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

let isSearchVisible = ref(false)

const searchForSmallScreen = (e) => {
  if (!props.isSmallScreen) isSearchVisible.value = true
  console.log(props.isSmallScreen)
  e.preventDefault()
  const searchInput = document.querySelector('#searchInput')
  if (isSearchVisible.value) {
    searchByCityName()
    searchInput.blur() //removes the focus from input
    isSearchVisible.value = false
    console.log(isSearchVisible.value)

    return
  }
  // searchInput.focus()
  setTimeout(() => searchInput.focus(), 0)
  isSearchVisible.value = true
  console.log(isSearchVisible.value)
}

const clearSearchInput = () => {
  document.querySelector('#searchInput').value = ''
}
</script>

<template>
  <div
    class="flex justify-between items-center transition-all w-full h-fit max-w-screen-2xl mx-auto md:gap-6 md:px-10 md:py-4"
    :class="{ 'flex-col gap-2': isSearchVisible }"
  >
    <div @click="dontTouchMe" class="flex gap-2 items-center w-fit h-10 hover:cursor-pointer">
      <div class="w-14 sm:w-16 md:w-20 lg:w-28">
        <img src="/src/assets/logo.svg" alt="" class="w-full h-auto" />
      </div>
      <p class="font-bold text-base sm:text-2xl md:text-3xl lg:text-4xl">Weatherly</p>
    </div>
    <form
      @submit.prevent="searchForSmallScreen"
      method="post"
      id="searchForm"
      class="flex justify-end gap-2 w-full max-h-9 md:max-w-xl md:min-w-96"
      :class="{ 'justify-center': isSearchVisible }"
    >
      <input
        @focus="clearSearchInput"
        v-model="cityName.name"
        type="text"
        name="search"
        id="searchInput"
        placeholder="Введите ваш город"
        autocomplete="off"
        class="p-2 w-4/5 font-regular bg-grayblue shadow-based outline-none rounded-lg placeholder:text-white placeholder:text-base placeholder:focus:text-sm placeholder:focus:text-secondaryText placeholder:transition-all md:flex md:w-60 lg:w-[27.5rem]"
        :class="isSearchVisible ? 'flex' : 'hidden'"
      />
      <button
        type="button"
        @click="searchForSmallScreen"
        class="flex items-center p-2 gap-1 rounded-lg bg-grayblue shadow-based text-lg leading-18 hover:bg-[#2E415F] active:bg-[#375179] active:scale-95 transition-all disabled:opacity-75"
      >
        <img src="../assets/navigation/search.svg" alt="" />
        <p class="hidden sm:block">Найти</p>
      </button>
    </form>
  </div>
</template>
