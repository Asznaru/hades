<script setup lang="ts">
import { useGlobalStore } from "../../store";
import {computed, nextTick, onMounted, ref} from "vue";
import { hadesLogo } from "../../store/helpers.ts";

const loginInput = ref(null)
const login = ref('')
const password = ref('')
const btnClass = computed(() => (login.value.length > 3 && password.value.length > 3) ? 'text-white !border-white !cursor-pointer' : 'text-gray-500 !border-gray-500 !cursor-not-allowed')

const status = computed(() => (login.value.length > 3 && password.value.length > 3) ? 'READY' : 'NOT_READY' )

const statusClass = computed(() => (login.value.length > 3 && password.value.length > 3) ? 'text-emerald-500' : 'text-rose-500')

const store = useGlobalStore()

const { loginUser, routerPushWithLoading } = useGlobalStore()

onMounted(async() => {
  const cookies = document.cookie.split('; ')
  for(let cookie of cookies) {
    const [ key, value ] = cookie.split('=')
    if(key && key === 'hades' && value && value.length > 3) {
      await routerPushWithLoading('MainMenu')
    }
  }

  await nextTick()
  //@ts-ignore
  loginInput.value.focus()
})


</script>

<template>
  <div class="w-[600px] mx-auto self-center">
        <pre class="logo leading-[1.1] text-slate-600">
      {{ hadesLogo }}
    </pre>
    <div class="mb-12 font-light">[SYSTEM ACCESS CONTROL] - Authentication Required</div>
    <div class="text-[#7fa6ff] font-mono p-6 border border-gray-600 rounded-xs shadow-lg flex flex-col items-start">
      <div class="font-light"> > [NICKNAME]</div>
      <input ref="loginInput"
             v-model="login"
             @keydown.enter="loginUser"
             placeholder="Enter nick name..."
             class="text-white shadow-hades p-2 border-[1px] border-gray-600 rounded-xs w-full mt-2 mb-8 focus:outline-hidden focus:border-white"/>

      <div class="font-light"> > [PASSWORD]</div>
      <input v-model="password"
             type="password"
             @keydown.enter="loginUser"
             placeholder="Enter password..."
             class="text-white shadow-hades p-2 border-[1px] border-gray-600 rounded-xs w-full mt-2 mb-8 focus:outline-hidden focus:border-white"/>


      <button class="mt-4 p-2 !border w-full !rounded-xs !bg-neutral-950 focus:outline-none"
              @click="loginUser(login, password)"
              :class="[btnClass]">> [CONNECT TO SYSTEM]
      </button>

      <div class="flex flex-col items-start mt-4 text-neutral-600 text-xs">
        <p>ENTER to connect</p>
        <p>Status: <span :class="[statusClass]">{{ status }}</span></p>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>