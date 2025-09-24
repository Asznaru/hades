import { ref } from 'vue'
import { defineStore } from 'pinia'
import beep from '@/assets/bip.mp3'
import router from "../router/index.ts";

export const useGlobalStore = defineStore('globalStore', () => {
  const audio = new Audio(beep)

  const hadesLogo = ref(`
██   ██  █████  ██████  ███████ ███████ 
██   ██ ██   ██ ██   ██ ██      ██      
███████ ███████ ██   ██ █████   ███████ 
██   ██ ██   ██ ██   ██ ██           ██ 
██   ██ ██   ██ ██████  ███████ ███████ 
                                        
████████ ███████ ██████  ███    ███ ██ ███    ██  █████  ██      
   ██    ██      ██   ██ ████  ████ ██ ████   ██ ██   ██ ██      
   ██    █████   ██████  ██ ████ ██ ██ ██ ██  ██ ███████ ██      
   ██    ██      ██   ██ ██  ██  ██ ██ ██  ██ ██ ██   ██ ██      
   ██    ███████ ██   ██ ██      ██ ██ ██   ████ ██   ██ ███████ 
`);

  const user = ref('Admin')

  const activeChannel = ref(0)

  const changeChannel = async (payload: KeyboardEvent) => {
    if(['s','c','e','d'].includes(payload.key)){
      switch(payload.key){
        case 's':
          activeChannel.value = 0
          break;
        case 'c':
          activeChannel.value = 1
          break;
        case 'e':
          activeChannel.value = 2
          break;
        case 'd':
          activeChannel.value = 3
          break;
      }
    } else if (payload.key === 'ArrowDown') {
      if (activeChannel.value < 3) {
        activeChannel.value++
      }
    } else if (payload.key === 'ArrowUp') {
      if (activeChannel.value > 0) {
        activeChannel.value--
      }
    } else if ( payload.key === 'Enter') {
      switch(activeChannel.value) {
        case 0:
          await router.push({name: 'Syslog'})
          break;
        case 1:
          await router.push({name: 'Chat'})
          break;
        case 2:
          await router.push({name: 'Echo'})
          break;
        case 3:
          await router.push({name: 'Darknet'})
          break;
      }
    } else if( payload.key === 'Esc') {
      await router.push({name: 'MainMenu'})
    }
  }

  const playBeep = () => {
    audio.play()
  }

  const checkIfEscape = async (payload: KeyboardEvent) => {
    if(payload.key === 'Escape') {
      await router.push({name: 'MainMenu'})
    }
  }
  return {
    playBeep,
    hadesLogo,
    user,
    activeChannel,
    changeChannel,
    checkIfEscape
  }
})