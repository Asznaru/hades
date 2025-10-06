<script setup lang="ts">
import {onUnmounted, onMounted} from "vue";
import {useGlobalStore} from "../../../store";

const {checkIfEscape} = useGlobalStore()

onMounted(() => {
  window.addEventListener('keydown', checkIfEscape)
})

onUnmounted(() => {
  window.removeEventListener('keydown', checkIfEscape)
})
</script>

<template>
  <div class="border border-gray-600 px-8 my-8 w-[75%] m-auto">
    <div class="my-2 text-slate-400 text-xl text-left">[HADES EYE] - Camera Network</div>
    <div class="mb-2 text-left text-gray-500">Network Status: <span class="text-emerald-500">ACTIVE</span> | Encryption:
      AES-256 | Active Feeds: <span class="text-yellow-500">3/4</span></div>
    <div class="grid grid-rows-2 grid-cols-2 gap-1 mb-8">
      <!-- CAM-001 (OFFLINE) -->
      <div class="mx-auto border border-gray-600 bg-black w-[40rem] my-1 overflow-hidden">
        <div class="relative w-full pt-[56.25%]">
          <!-- Czarny ekran zamiast iframe -->
          <div class="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <!--              <span class="text-red-500 font-mono text-lg">⚠ OFFLINE</span>-->
            <img class="relative w-full"
                 alt="noise"
                 src="@/assets/noisegif.gif"/>
          </div>

          <div class="absolute top-0 left-0 w-full h-[300px] z-10 my-6  bg-black/50"></div>

          <!-- Overlay: górny pasek -->
          <div class="absolute top-0 left-0 w-full flex justify-between items-center bg-black px-4 py-1 text-xs">
            <span class="font-mono text-slate-100">CAM-001</span>
            <span class="text-emerald-500 font-mono">ONLINE</span>
          </div>

          <!-- Overlay: dolny opis -->
          <div class="absolute bottom-0 left-0 w-full bg-black px-4 py-1 text-xs font-mono text-left">
            <p>Location: Storage Gamma</p>
            <p>Signal: <span class="text-yellow-500">CORRUPTED</span></p>
          </div>
        </div>
      </div>

      <!-- CAM-002 (OFFLINE) -->
      <div class="mx-auto border border-gray-600 bg-black w-[40rem] my-1 overflow-hidden">
        <div class="relative w-full pt-[56.25%]">
          <div class="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <span class="text-red-500 font-mono text-lg">⚠ OFFLINE</span>
          </div>

          <div class="absolute top-0 left-0 w-full h-full z-10"></div>


          <div class="absolute top-0 left-0 w-full flex justify-between items-center bg-black px-4 py-1 text-xs">
            <span class="font-mono  text-slate-100">CAM-002</span>
            <span class="text-red-500 font-mono">OFFLINE</span>
          </div>

          <div class="absolute bottom-0 left-0 w-full bg-black px-4 py-1 text-xs font-mono text-left">
            <p>Location: Storage Gamma</p>
            <p>Signal: <span class="text-red-500">NO SIGNAL</span></p>
          </div>
        </div>
      </div>

      <!-- CAM-003 (OFFLINE) -->
      <div class="mx-auto border border-gray-600 bg-black w-[40rem] my-1 overflow-hidden">
        <div class="relative w-full pt-[56.25%]">
          <div class="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          </div>

          <div class="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <!--              <span class="text-red-500 font-mono text-lg">⚠ OFFLINE</span>-->
            <img class="relative w-full"
                 alt="noise"
                 src="@/assets/noisegif.gif"/>
          </div>

          <div class="absolute top-0 left-0 w-full h-[300px] z-10 my-6  bg-black/35"></div>

          <div class="absolute top-0 left-0 w-full flex justify-between items-center bg-black px-4 py-1 text-xs">
            <span class="font-mono text-slate-100">CAM-003</span>
            <span class="text-emerald-500 font-mono">ONLINE</span>
          </div>

          <div class="absolute bottom-0 left-0 w-full bg-black px-4 py-1 text-xs font-mono text-left">
            <p>Location: Storage Gamma</p>
            <p>Signal: <span class="text-yellow-500">CORRUPTED</span></p>
          </div>
        </div>
      </div>

      <!-- CAM-004 (ONLINE) -->
      <div class="mx-auto border border-gray-600 bg-black w-[40rem] my-1 overflow-hidden">
        <div class="relative w-full pt-[56.25%]">
          <!-- iframe -->
          <iframe
              class="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/ccvBttXrGB8?autoplay=1&mute=1"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen>
          </iframe>

          <div class="absolute top-0 left-0 w-full h-full z-10"></div>

          <!-- Overlay: górny pasek -->
          <div class="absolute top-0 left-0 w-full flex justify-between items-center bg-black px-4 py-1 text-xs">
            <span class="font-mono text-slate-100">CAM-004</span>
            <span class="text-emerald-500 font-mono">ONLINE</span>
          </div>

          <!-- Overlay: dolny opis -->
          <div class="absolute bottom-0 left-0 w-full bg-black px-4 py-1 text-xs font-mono text-left">
            <p>Location: Storage Gamma</p>
            <p>Signal: <span class="text-emerald-500">LIVE</span></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>