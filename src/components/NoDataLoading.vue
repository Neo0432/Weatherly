<script setup></script>
<template>
  <div class="flex flex-col w-1/3 mx-auto">
    <img src="../assets/loading/loading.svg" alt="" />
    <div class="flex justify-center items-center w-full gap-14">
      <div class="w-6 h-6 rounded-full bg-[#f2bc58] border-[3px] border-[#051729] dot"></div>
      <div class="w-6 h-6 rounded-full bg-[#f2bc58] border-[3px] border-[#051729] dot"></div>
      <div class="w-9 h-9 rounded-full bg-[#f2bc58] border-[3px] border-[#051729] dot"></div>
      <div class="w-6 h-6 rounded-full bg-[#f2bc58] border-[3px] border-[#051729] dot"></div>
      <div class="w-6 h-6 rounded-full bg-[#f2bc58] border-[3px] border-[#051729] dot"></div>
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
