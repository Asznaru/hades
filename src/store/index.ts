import { ref } from 'vue'
import { defineStore } from 'pinia'
import beep from '@/assets/bip.mp3'
import router from "../router/index.ts";
import axios from "axios";

type LoadingType = 'API' | 'ROUTER' | null
type ApiStatus = 'LOADING' | 'SUCCESS' | 'FORBIDDEN'

export const useGlobalStore = defineStore('globalStore', () => {
  const audio = new Audio(beep)
  const activeChannel = ref(-1)

  // Modal & progress
  const visibleLoading = ref(false)
  const progress = ref(0)
  const apiStatus = ref<ApiStatus>('LOADING')
  const loadingType = ref<LoadingType>(null)
  const pendingStatus = ref<ApiStatus | null>(null)
  let progressInterval: number | undefined

  // -----------------------------
  // Animacja progressbaru z synchronizacją statusu
  const animateProgress = (target: number, duration = 500, onComplete?: () => void) => {
    if (progressInterval) clearInterval(progressInterval)
    const intervalTime = 50
    const steps = duration / intervalTime
    const increment = (target - progress.value) / steps

    progressInterval = window.setInterval(() => {
      progress.value = Math.min(progress.value + increment, target)

      // Aktualizacja status dopiero przy ≥99%
      if (progress.value >= 99 && pendingStatus.value) {
        apiStatus.value = pendingStatus.value
        pendingStatus.value = null
      }

      if (progress.value >= target) {
        clearInterval(progressInterval)
        onComplete?.()
      }
    }, intervalTime)
  }

  // -----------------------------
  // Router navigation z animowanym progressbarem
  const routerPushWithLoading = async (routeName: string) => {
    loadingType.value = 'ROUTER'
    visibleLoading.value = true
    apiStatus.value = 'LOADING'
    pendingStatus.value = null
    progress.value = 0

    // Animacja do 95%
    animateProgress(95, Math.random() * 700 + 800)

    await router.push({ name: routeName })

    // Doganiamy do 100% + ustawiamy SUCCESS
    pendingStatus.value = 'SUCCESS'
    animateProgress(100, 300, () => {
      setTimeout(() => {
        visibleLoading.value = false
        progress.value = 0
        apiStatus.value = 'LOADING'
        loadingType.value = null
        pendingStatus.value = null
      }, 750)
    })
  }

  // -----------------------------
  // Logowanie użytkownika
  const loginUser = async (login: string) => {
    loadingType.value = 'API'
    visibleLoading.value = true
    apiStatus.value = 'LOADING'
    pendingStatus.value = null
    progress.value = 0

    // Animacja do 99% w trakcie requestu
    animateProgress(99, 1500)

    try {
      const { data } = await axios.get(`api/info-api/user/${login}/channels`, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      pendingStatus.value = 'SUCCESS'

      const date = new Date()
      date.setTime(date.getTime() + 24 * 60 * 60 * 1000)
      document.cookie = `hades=${login}; expires=${date.toUTCString()}; path=/`

      await routerPushWithLoading('MainMenu')
    } catch (e) {
      pendingStatus.value = 'FORBIDDEN'
    } finally {
      animateProgress(100, 300, () => {
        setTimeout(() => {
          visibleLoading.value = false
          progress.value = 0
          apiStatus.value = 'LOADING'
          loadingType.value = null
          pendingStatus.value = null
        }, 500)
      })
    }
  }

  // -----------------------------
  // Obsługa zmiany kanału i klawiszy
  const channelMap: Record<string, number> = { s: 0, c: 1, e: 2, n: 3, y: 4 }
  const routeMap = ['Syslog', 'Chat', 'Echo', 'Encrypting', 'Hades eye']

  const changeChannel = async (payload: KeyboardEvent) => {
    if (payload?.key && channelMap[payload.key] !== undefined) {
      //@ts-ignore
      activeChannel.value = channelMap[payload.key]
    } else if (payload.key === 'ArrowDown' && activeChannel.value < routeMap.length - 1) {
      activeChannel.value++
    } else if (payload.key === 'ArrowUp' && activeChannel.value > 0) {
      activeChannel.value--
    } else if (payload.key === 'Enter') {
      if (activeChannel.value >= 0 && activeChannel.value < routeMap.length) {
        //@ts-ignore
        await routerPushWithLoading(routeMap[activeChannel.value])
      }
    } else if (payload.key === 'Escape') {
      await routerPushWithLoading('MainMenu')
    }
  }

  // -----------------------------
  const playBeep = () => audio.play()

  const checkIfEscape = async (payload: KeyboardEvent) => {
    if(payload.key === 'Escape') {
      await routerPushWithLoading('MainMenu')
    }
  }

  return {
    checkIfEscape,
    playBeep,
    activeChannel,
    changeChannel,
    visibleLoading,
    progress,
    apiStatus,
    loadingType,
    loginUser,
    routerPushWithLoading
  }
})
