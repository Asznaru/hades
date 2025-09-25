<script setup>
import { ref, watch } from "vue";
import { useGlobalStore } from "../store/index.js";
import { storeToRefs } from "pinia";

const store = useGlobalStore()
const { visibleLoading } = storeToRefs(store)

const progress = ref(0);
const blink = ref(false);
const status = ref('LOADING');
const bar = ref("");

let blinkInterval;
let progressInterval;

watch(() => progress.value, (newValue) => {
  status.value = newValue >= 100 ? 'SUCCESS' : 'LOADING';
});

watch(() => status.value, (newValue) => {
  if (newValue === 'SUCCESS') {
    let toggle = false;
    blinkInterval = setInterval(() => {
      toggle = !toggle;
      blink.value = toggle;
    }, 100);

    setTimeout(() => {
      clearInterval(blinkInterval);
      blink.value = false;
      visibleLoading.value = false;
      progress.value = 0;
      bar.value = "";
      status.value = 'LOADING';
    }, 900);
  } else {
    blink.value = false;
  }
});

watch(() => visibleLoading.value, (newValue) => {
  if (newValue) {
    // reset
    progress.value = 0;
    bar.value = "";
    status.value = 'LOADING';

    const minTime = 200;
    const maxTime = 1200;
    const totalTime = Math.random() * (maxTime - minTime) + minTime;

    const intervalTime = 50; // ms
    const steps = totalTime / intervalTime;
    const increment = 100 / steps; // o ile zwiększać progress w każdym kroku

    progressInterval = setInterval(() => {
      if (progress.value < 100) {
        progress.value += increment;
        if (progress.value > 100) progress.value = 100;
        const filled = Math.floor(progress.value / 3);
        bar.value = "█".repeat(filled).padEnd(33, " ");
      } else {
        clearInterval(progressInterval);
      }
    }, intervalTime);
  } else {
    clearInterval(progressInterval);
  }
});
</script>

<template>
  <div v-if="visibleLoading"
       class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
    <div class="bg-black border border-gray-700 p-6 text-slate-400 font-mono shadow-lg w-[400px]">
      <h2 class="text-xl text-center mb-3 tracking-widest"
          :class="{ 'opacity-0': blink }">
        [ <span :class="{ 'text-emerald-500' : status === 'SUCCESS', 'text-rose-500' : status === 'ERROR' }">{{ status }}</span> ]
      </h2>

      <div class="flex justify-between w-[330px] mx-auto">
        <span class="block text-slate-400">
          {{ bar }}
        </span>
        <span class="block">
          {{ progress.toFixed(0) }}%
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
body {
  font-family: monospace;
}

.opacity-0 {
  opacity: 0;
  transition: opacity 0.1s linear;
}
</style>
