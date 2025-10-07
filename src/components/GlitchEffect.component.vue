<template>
  <div class="fixed top-0 left-0 w-screen h-screen pointer-events-none z-[9999] overflow-hidden">
    <div
        class="absolute top-0 left-0 w-full h-full opacity-0 mix-blend-screen"
        :class="{ 'glitch-layer-1': isGlitching }"
        :style="{ animationDuration: `${duration}ms` }"
    ></div>
    <div
        class="absolute top-0 left-0 w-full h-full opacity-0 mix-blend-screen"
        :class="{ 'glitch-layer-2': isGlitching }"
        :style="{ animationDuration: `${duration}ms` }"
    ></div>
    <div
        class="absolute top-0 left-0 w-full h-full opacity-0"
        :class="{ 'scanlines-active': isGlitching }"
        :style="{
        animationDuration: `${scanlineSpeed}s`,
        background: 'repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15) 1px, transparent 1px, transparent 2px)'
      }"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';

interface Props {
  minInterval?: number;
  maxInterval?: number;
  duration?: number;
  scanlineSpeed?: number;
}

const props = withDefaults(defineProps<Props>(), {
  minInterval: 1500,
  maxInterval: 4500,
  duration: 700,
  scanlineSpeed: 500
});

const isGlitching = ref(false);
let glitchTimeout: number;
let glitchDurationTimeout: number;

const triggerGlitch = () => {
  isGlitching.value = true;

  glitchDurationTimeout = window.setTimeout(() => {
    isGlitching.value = false;
  }, props.duration);

  const nextInterval = Math.random() * (props.maxInterval - props.minInterval) + props.minInterval;
  glitchTimeout = window.setTimeout(triggerGlitch, nextInterval);
};

watch(isGlitching, (newValue) => {
  if (newValue) {
    document.body.classList.add('glitch-shake');
  } else {
    document.body.classList.remove('glitch-shake');
  }
});

onMounted(() => {
  const initialDelay = Math.random() * (props.maxInterval - props.minInterval) + props.minInterval;
  glitchTimeout = window.setTimeout(triggerGlitch, initialDelay);
});

onUnmounted(() => {
  clearTimeout(glitchTimeout);
  clearTimeout(glitchDurationTimeout);
  document.body.classList.remove('glitch-shake');
});
</script>

<style scoped>
.glitch-layer-1 {
  animation: glitch-anim-1 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite;
  background: rgba(255, 0, 0, 0.1);
}

.glitch-layer-2 {
  animation: glitch-anim-2 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) reverse both infinite;
  background: rgba(0, 255, 255, 0.1);
}

.scanlines-active {
  animation: scanlines-move 2s linear infinite;
  opacity: 0.7;
}

@keyframes glitch-anim-1 {
  0% {
    opacity: 1;
    transform: translate3d(-10px, 0, 0);
    clip-path: polygon(0 2%, 100% 2%, 100% 5%, 0 5%);
  }
  10% {
    clip-path: polygon(0 15%, 100% 15%, 100% 15%, 0 15%);
  }
  20% {
    clip-path: polygon(0 10%, 100% 10%, 100% 20%, 0 20%);
  }
  30% {
    clip-path: polygon(0 1%, 100% 1%, 100% 2%, 0 2%);
  }
  40% {
    clip-path: polygon(0 33%, 100% 33%, 100% 33%, 0 33%);
  }
  50% {
    clip-path: polygon(0 44%, 100% 44%, 100% 44%, 0 44%);
  }
  60% {
    clip-path: polygon(0 50%, 100% 50%, 100% 20%, 0 20%);
  }
  70% {
    clip-path: polygon(0 70%, 100% 70%, 100% 70%, 0 70%);
  }
  80% {
    clip-path: polygon(0 80%, 100% 80%, 100% 80%, 0 80%);
  }
  90% {
    clip-path: polygon(0 50%, 100% 50%, 100% 55%, 0 55%);
  }
  100% {
    opacity: 1;
    transform: translate3d(-10px, 0, 0);
    clip-path: polygon(0 70%, 100% 70%, 100% 80%, 0 80%);
  }
}

@keyframes glitch-anim-2 {
  0% {
    opacity: 1;
    transform: translate3d(10px, 0, 0);
    clip-path: polygon(0 25%, 100% 25%, 100% 30%, 0 30%);
  }
  10% {
    clip-path: polygon(0 3%, 100% 3%, 100% 3%, 0 3%);
  }
  20% {
    clip-path: polygon(0 5%, 100% 5%, 100% 20%, 0 20%);
  }
  30% {
    clip-path: polygon(0 20%, 100% 20%, 100% 20%, 0 20%);
  }
  40% {
    clip-path: polygon(0 40%, 100% 40%, 100% 40%, 0 40%);
  }
  50% {
    clip-path: polygon(0 52%, 100% 52%, 100% 59%, 0 59%);
  }
  60% {
    clip-path: polygon(0 60%, 100% 60%, 100% 60%, 0 60%);
  }
  70% {
    clip-path: polygon(0 75%, 100% 75%, 100% 75%, 0 75%);
  }
  80% {
    clip-path: polygon(0 65%, 100% 65%, 100% 40%, 0 40%);
  }
  90% {
    clip-path: polygon(0 45%, 100% 45%, 100% 50%, 0 50%);
  }
  100% {
    opacity: 1;
    transform: translate3d(10px, 0, 0);
    clip-path: polygon(0 14%, 100% 14%, 100% 33%, 0 33%);
  }
}

@keyframes scanlines-move {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(10px);
  }
}
</style>

<style>
body.glitch-shake {
  animation: shake 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite;
}

@keyframes shake {
  0%, 100% {
    transform: translate(0, 0) rotate(0deg);
  }
  10% {
    transform: translate(-2px, 1px) rotate(-0.5deg);
  }
  20% {
    transform: translate(2px, -1px) rotate(0.5deg);
  }
  30% {
    transform: translate(-1px, 2px) rotate(-0.3deg);
  }
  40% {
    transform: translate(1px, -2px) rotate(0.3deg);
  }
  50% {
    transform: translate(-2px, 1px) rotate(-0.5deg);
  }
  60% {
    transform: translate(2px, 1px) rotate(0.5deg);
  }
  70% {
    transform: translate(-1px, -1px) rotate(-0.3deg);
  }
  80% {
    transform: translate(1px, 2px) rotate(0.3deg);
  }
  90% {
    transform: translate(-1px, -2px) rotate(-0.5deg);
  }
}
</style>
