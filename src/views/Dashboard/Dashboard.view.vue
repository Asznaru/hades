<script setup lang="ts">
import { useGlobalStore } from "../../store";
import { hadesLogo } from "../../store/helpers.ts";

const store = useGlobalStore()
</script>

<template>
  <div class="w-full flex flex-col self-stretch mx-auto justify-between">
    <div class="mt-14">
      <pre class="logo leading-[1.1] text-slate-600"> {{hadesLogo}} </pre>
      <div class="my-2 text-gray-500">
        System Status: <span class="text-emerald-700">ONLINE</span> | Access Level: <span class="text-emerald-700">AUTHORIZED</span> | Connection: <span class="text-emerald-700">SECURE</span>
      </div>
      <hr class="border-gray-600"/>
    </div>

    <div class="flex flex-col">
      <router-view />
    </div>

    <div class="border border-gray-600 text-gray-600 m-1 flex justify-between px-8 py-2">
      <div>
        <span class="mr-3">
          <span class="text-white">[↑↓]</span> - Navigate Menu
        </span>

        <span class="mx-3">
          <span class="text-white">[ENTER]</span> - Select/Confirm
        </span>

        <span class="mx-3">
          <span class="text-white">[ESC]</span> - Return to Main
        </span>

      </div>

      <span class="text-slate-300">HADES v2.1.0</span>
    </div>
  </div>
</template>

<style scoped>

</style>