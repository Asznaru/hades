<script setup lang="ts">
import {onMounted, onUnmounted} from "vue";
import { useGlobalStore } from "../../../store";

const { checkIfEscape } = useGlobalStore()

onMounted(() => {
  window.addEventListener('keydown', checkIfEscape)
})

onUnmounted(() => {
  window.removeEventListener('keydown', checkIfEscape)
})
</script>

<template>
echo
</template>

<style scoped>

</style>