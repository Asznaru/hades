<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useGlobalStore } from '../store/index.ts'
import { storeToRefs } from 'pinia'

const store = useGlobalStore()
const { visibleLoading, progress, apiStatus } = storeToRefs(store)

// Pasek wypełnienia w postaci znaków
const bar = computed(() => {
  const filled = Math.floor(progress.value / 3)
  return '█'.repeat(filled).padEnd(33, ' ')
})

// --- Blink dla SUCCESS lub FORBIDDEN ---
const blink = ref(false)
let blinkInterval: number | undefined

watch(apiStatus, (newStatus) => {
  if (newStatus === 'SUCCESS' || newStatus === 'FORBIDDEN') {
    let toggle = false
    if (blinkInterval) clearInterval(blinkInterval)
    blinkInterval = window.setInterval(() => {
      toggle = !toggle
      blink.value = toggle
    }, 100)

    setTimeout(() => {
      if (blinkInterval) clearInterval(blinkInterval)
      blink.value = false
    }, 900) // czas migotania 0.9s
  }
})
</script>

<template>
  <div v-if="visibleLoading"
       class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-2">

    <div class="bg-black border border-gray-700 p-6 text-slate-400 font-mono shadow-lg w-[400px]">
      <h2 class="text-xl text-center mb-3 tracking-widest"
          :class="{ 'opacity-0': blink }">
        <template v-if="apiStatus === 'LOADING'">
          [ <span>LOADING...</span> ]
        </template>
        <template v-else>
          [ <span :class="{ 'text-emerald-500': apiStatus === 'SUCCESS', 'text-rose-500': apiStatus === 'FORBIDDEN' }">
            {{ apiStatus }}
          </span> ]
        </template>
      </h2>

      <div class="flex justify-between w-[330px] mx-auto">
        <span class="block text-slate-400">{{ bar }}</span>
        <span class="block">{{ progress.toFixed(0) }}%</span>
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
