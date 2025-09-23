<script setup lang="ts">
import {useGlobalStore} from "./store";
import {storeToRefs} from "pinia";
import {onMounted} from "vue";
import router from "./router";

const store = useGlobalStore()

const {user} = storeToRefs(store)
const { playBeep } = useGlobalStore()

onMounted(async() => {
  // window.addEventListener('keydown', playBeep)

  const cookies = document.cookie.split('; ')
  for(let cookie of cookies) {
    const [ key, value ] = cookie.split('=')
    if(key && key === 'hades' && value && value.length > 3) {
      await router.push({name: 'MainMenu'})
    } else {
      await router.push({name: 'login'})
    }
  }
})
</script>

<template>
  <RouterView/>
</template>

<style scoped>
</style>
