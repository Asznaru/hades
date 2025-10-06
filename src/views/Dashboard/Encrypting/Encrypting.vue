<script setup lang="ts">
import {nextTick, onMounted, onUnmounted, ref} from "vue";
import { useGlobalStore } from "../../../store";

const { checkIfEscape } = useGlobalStore()

const text = ref('')
const textInput = ref(null)
onMounted(async () => {
  window.addEventListener('keydown', checkIfEscape)

  await nextTick()
  //@ts-ignore
  textInput.value.focus()
})
onUnmounted(() => {
  window.removeEventListener('keydown', checkIfEscape)
})
</script>

<template>
  <div class="border border-gray-600 py-2 w-[60rem] h-[5.5rem] my-2 flex justify-between px-4 mx-auto overflow-auto fle flex-col justify-start items-start">
      <div class="mb-2 text-left text-white text-sm">Available Commands:</div>
      <p class="text-left text-sm text-slate-400">decrypt_io &lt;text&gt; <span class="text-neutral-500 pl-12">- Decrypt encrypted message</span></p>
      <p class="text-left text-sm text-slate-400">encrypt_io &lt;text&gt; <span class="text-neutral-500 pl-12">- Encrypt plain text message</span></p>
  </div>

  <div class="border border-gray-600 py-2 w-[60rem] h-[22rem] my-1 flex justify-between px-4 mx-auto overflow-auto fle flex-col justify-start items-start">
    <div class="text-[24px] mb-4 text-slate-400">
      [CRYPTO_IO MODULE] - Message Decryption System

    </div>
  </div>

  <div class="flex w-[60rem] mx-auto items-center justify-center mt-2">
    <input v-model="text"
           ref="textInput"
           placeholder="Enter command..."
           class="text-white shadow-hades p-2 border-[1px] border-gray-600 rounded-xs w-full focus:outline-hidden focus:border-white"/>

    <button class="p-2 !border w-[30%] ml-2 !rounded-xs !bg-neutral-950 focus:outline-none"
            @click="loginUser(login)"> [EXECUTE]
    </button>
  </div>
</template>

<style scoped>

</style>