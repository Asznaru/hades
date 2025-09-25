<script setup lang="ts">
import {onMounted, watch} from "vue";
import { useRoute } from 'vue-router';
import { useGlobalStore } from "./store";
import Loading from './components/Loading.component.vue'
import {storeToRefs} from "pinia";

const route = useRoute();
const store = useGlobalStore()
const { routerPushWithLoading } = useGlobalStore()
const { visibleLoading } = storeToRefs(store)
watch(() => route.fullPath, () => {
  visibleLoading.value = true
})

onMounted(async() => {
  // window.addEventListener('keydown', playBeep)

  const cookies = document.cookie.split('; ')
  for(let cookie of cookies) {
    const [ key, value ] = cookie.split('=')
    if(key && key === 'hades' && value && value.length > 3) {
      await routerPushWithLoading('MainMenu')
    } else {
      await routerPushWithLoading('Login')
    }
  }
})
</script>

<template>
  <div>
    <Loading />
  </div>

  <RouterView />
</template>

<style scoped>
</style>
