<script setup lang="ts">
import {ref} from "vue";
import { useGlobalStore } from "../../../store";
import {storeToRefs} from "pinia";
import {onMounted, onUnmounted} from "vue";

const store = useGlobalStore()
const { activeChannel } = storeToRefs(store)
const { changeChannel } = useGlobalStore()

const menu = ref([
  { name: '[s] SYSLOG', description: 'System logs and monitoring' },
  { name: '[c] CHAT', description: 'Secure Communications' },
  { name: '[e] ECHO', description: 'Network Diagnostics' },
  { name: '[n] CRYPTO_IO', description: 'Encryption and decryption' },
  { name: '[y] HADES EYE', description: 'Real-time behavioral monitoring' }
])

onMounted(() => {
  window.addEventListener('keydown', changeChannel)
})

onUnmounted(() => {
  window.removeEventListener('keydown', changeChannel)
})
</script>

<template>
  <div class="text-[24px] mb-4 text-slate-400">
  [MAIN MENU] - Select Module
  </div>

  <div class="flex flex-col m-auto">
    <template v-for="(item, index) in menu">
      <div class="border border-gray-600 py-2 w-[40rem] my-1 flex justify-between px-4"
           :class="{'bg-slate-100 text-gray-900' : activeChannel === index}">
        <span>
          <span v-if="activeChannel === index">> </span> {{ item.name }}
        </span>
        <span class="text-gray-600">{{ item.description }}</span>
      </div>
    </template>
  </div>

</template>

<style scoped>

</style>