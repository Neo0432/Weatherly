<script setup>
let city = ''
</script>

<template>
  <div class="flex justify-between w-full px-10 py-4">
    <div class="flex gap-2">
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Введите ваш город"
        class="p-2 font-regular w-[27.5rem] bg-grayblue shadow-based outline-none rounded-lg placeholder:text-white"
      />
      <button
        class="flex justify-between items-center w-[6.5rem] py-1 pl-2 pr-3 rounded-lg bg-grayblue shadow-based text-lg leading-18"
      >
        <img src="../assets/navigation/search.svg" alt="" />
        <p>Найти</p>
      </button>
    </div>
  </div>
</template>
