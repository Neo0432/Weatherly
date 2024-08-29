<template>
  <div class="flex flex-col w-1/3 mx-auto">
    <img src="../assets/loading/loading.svg" alt="" />
    <div class="flex justify-between items-center w-full">
      <div
        class="w-2 h-2 rounded-full bg-[#f2bc58] border-0 border-[#051729] dot sm:border-[3px] sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6"
      ></div>
      <div
        class="w-2 h-2 rounded-full bg-[#f2bc58] border-0 border-[#051729] dot sm:border-[3px] sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6"
      ></div>
      <div
        class="w-5 h-5 rounded-full bg-[#f2bc58] border-0 border-[#051729] dot sm:border-[3px] sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9"
      ></div>
      <div
        class="w-2 h-2 rounded-full bg-[#f2bc58] border-0 border-[#051729] dot sm:border-[3px] sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6"
      ></div>
      <div
        class="w-2 h-2 rounded-full bg-[#f2bc58] border-0 border-[#051729] dot sm:border-[3px] sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6"
      ></div>
    </div>
  </div>
</template>

<style scoped>
body {
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background: #222;
}

.loading {
  display: flex;
}

.dot {
  position: relative;
}

.dot::before {
  position: absolute;
  content: '';
  width: 100%;
  height: 100%;
  background: inherit;
  border-radius: inherit;
  animation: pulse 2s ease-out infinite;
}

.dot:nth-child(1)::before {
  animation-delay: 1s;
}

.dot:nth-child(2)::before {
  animation-delay: 0.6s;
}

.dot:nth-child(3)::before {
  animation-delay: 0s;
}

.dot:nth-child(4)::before {
  animation-delay: 0.6s;
}

.dot:nth-child(5)::before {
  animation-delay: 1s;
}

@keyframes pulse {
  50%,
  75% {
    transform: scale(1.5);
  }

  80%,
  100% {
    opacity: 0;
  }
}
</style>
