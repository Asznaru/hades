<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';

interface Props {
  opacity?: number;
  frequency?: number;
  duration?: number;
  hacked?: boolean;
  installing?: number;
  time?: number;
}

const props = withDefaults(defineProps<Props>(), {
  opacity: 0.8,
  frequency: 2000,
  duration: 300,
  hacked: false,
  installing: 0,
  time: 10000
});

const glitchIntensity = ref(0);
const scanlinePosition = ref(0);
const rgbSplit = ref({ x: 0, y: 0 });
const blockGlitch = ref({ active: false, blocks: [] as Array<{ x: number; y: number; width: number; height: number }> });
const shake = ref({ x: 0, y: 0 });
const flashColor = ref('transparent');
const neonPulse = ref(0);
const matrixRain = ref<Array<{ x: number; speed: number; offset: number }>>([]);

const effectMultiplier = computed(() => props.hacked ? 3 : 1);
const effectFrequency = computed(() => props.frequency / effectMultiplier.value);
const neonIntensity = computed(() => props.hacked ? 0.8 : 0.3);

const barLength = 20

const currentBars = ref(0)

let intervalId: number | null = null


const overlayStyle = computed(() => ({
  opacity: props.opacity,
  transform: `translate(${shake.value.x}px, ${shake.value.y}px)`,
  pointerEvents: (props.hacked ? 'auto' : 'none') as 'auto' | 'none'
}));

const rgbStyle = computed(() => {
  const multiplier = props.hacked ? 3 : 1;
  return {
    textShadow: `
      ${rgbSplit.value.x * multiplier}px ${rgbSplit.value.y * multiplier}px 0 rgba(255, 0, 0, ${neonIntensity.value}),
      ${-rgbSplit.value.x * multiplier}px ${-rgbSplit.value.y * multiplier}px 0 rgba(0, 255, 255, ${neonIntensity.value}),
      0 0 ${props.hacked ? 20 : 10}px rgba(255, 0, 0, ${neonIntensity.value}),
      0 0 ${props.hacked ? 40 : 20}px rgba(0, 255, 255, ${neonIntensity.value})
    `
  };
});

const neonGlowStyle = computed(() => ({
  boxShadow: `
    0 0 ${10 + neonPulse.value * 20}px rgba(255, 0, 0, ${neonIntensity.value}),
    0 0 ${20 + neonPulse.value * 40}px rgba(0, 255, 255, ${neonIntensity.value}),
    inset 0 0 ${30 + neonPulse.value * 60}px rgba(255, 0, 0, ${neonIntensity.value * 0.5})
  `
}));

let glitchInterval: number;
let scanlineInterval: number;
let intensityInterval: number;
let rgbInterval: number;
let blockInterval: number;
let shakeInterval: number;
let flashInterval: number;
let neonPulseInterval: number;
let matrixInterval: number;

const randomGlitch = () => {
  const intensity = props.hacked ? 1.5 : 1;
  glitchIntensity.value = Math.random() * intensity;

  rgbSplit.value = {
    x: (Math.random() - 0.5) * 10 * intensity,
    y: (Math.random() - 0.5) * 10 * intensity
  };

  shake.value = {
    x: (Math.random() - 0.5) * 20 * intensity,
    y: (Math.random() - 0.5) * 20 * intensity
  };

  const blockThreshold = props.hacked ? 0.4 : 0.7;
  if (Math.random() > blockThreshold) {
    const blockCount = Math.floor(Math.random() * (props.hacked ? 30 : 15)) + (props.hacked ? 10 : 5);
    blockGlitch.value.blocks = Array.from({ length: blockCount }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      width: Math.random() * (props.hacked ? 50 : 30) + 5,
      height: Math.random() * (props.hacked ? 20 : 10) + 2
    }));
    blockGlitch.value.active = true;

    setTimeout(() => {
      blockGlitch.value.active = false;
    }, props.duration / (props.hacked ? 1.5 : 2));
  }

  if (Math.random() > (props.hacked ? 0.5 : 0.8)) {
    const colors = ['rgba(255, 0, 0, 0.5)', 'rgba(0, 255, 255, 0.5)'];
    flashColor.value = colors[Math.floor(Math.random() * colors.length)];
    setTimeout(() => {
      flashColor.value = 'transparent';
    }, props.hacked ? 100 : 50);
  }

  setTimeout(() => {
    glitchIntensity.value = 0;
    if (!props.hacked) {
      rgbSplit.value = { x: 0, y: 0 };
      shake.value = { x: 0, y: 0 };
    }
  }, props.duration);
};

const animateScanline = () => {
  const speed = props.hacked ? 4 : 2;
  scanlinePosition.value = (scanlinePosition.value + speed) % 100;
};

const animateNeonPulse = () => {
  neonPulse.value = Math.sin(Date.now() / (props.hacked ? 200 : 500)) * 0.5 + 0.5;
};

const initMatrixRain = () => {
  const count = props.hacked ? 30 : 0;
  matrixRain.value = Array.from({ length: count }, () => ({
    x: Math.random() * 100,
    speed: Math.random() * 2 + 1,
    offset: Math.random() * 100
  }));
};

const animateMatrix = () => {
  matrixRain.value = matrixRain.value.map(rain => ({
    ...rain,
    offset: (rain.offset + rain.speed) % 100
  }));
};

const setupIntervals = () => {
  clearAllIntervals();

  glitchInterval = window.setInterval(randomGlitch, effectFrequency.value);
  scanlineInterval = window.setInterval(animateScanline, 30);
  neonPulseInterval = window.setInterval(animateNeonPulse, 50);

  intensityInterval = window.setInterval(() => {
    if (Math.random() > (props.hacked ? 0.3 : 0.5)) {
      randomGlitch();
    }
  }, effectFrequency.value / 3);

  rgbInterval = window.setInterval(() => {
    const threshold = props.hacked ? 0.5 : 0.8;
    if (glitchIntensity.value === 0 && Math.random() > threshold) {
      const intensity = props.hacked ? 8 : 5;
      rgbSplit.value = {
        x: (Math.random() - 0.5) * intensity,
        y: (Math.random() - 0.5) * intensity
      };
      setTimeout(() => {
        if (!props.hacked) {
          rgbSplit.value = { x: 0, y: 0 };
        }
      }, props.hacked ? 200 : 100);
    }
  }, props.hacked ? 300 : 500);

  blockInterval = window.setInterval(() => {
    const threshold = props.hacked ? 0.6 : 0.85;
    if (Math.random() > threshold) {
      const blockCount = Math.floor(Math.random() * (props.hacked ? 20 : 8)) + (props.hacked ? 8 : 3);
      blockGlitch.value.blocks = Array.from({ length: blockCount }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        width: Math.random() * (props.hacked ? 60 : 40) + 10,
        height: Math.random() * (props.hacked ? 10 : 5) + 1
      }));
      blockGlitch.value.active = true;

      setTimeout(() => {
        blockGlitch.value.active = false;
      }, props.hacked ? 250 : 150);
    }
  }, props.hacked ? 400 : 800);

  shakeInterval = window.setInterval(() => {
    const threshold = props.hacked ? 0.7 : 0.9;
    if (Math.random() > threshold) {
      const intensity = props.hacked ? 2 : 1;
      shake.value = {
        x: (Math.random() - 0.5) * 15 * intensity,
        y: (Math.random() - 0.5) * 15 * intensity
      };
      setTimeout(() => {
        if (!props.hacked) {
          shake.value = { x: 0, y: 0 };
        }
      }, 80);
    }
  }, props.hacked ? 150 : 300);

  flashInterval = window.setInterval(() => {
    const threshold = props.hacked ? 0.7 : 0.92;
    if (Math.random() > threshold) {
      flashColor.value = props.hacked ? 'rgba(255, 0, 255, 0.25)' : 'rgba(255, 0, 0, 0.15)';
      setTimeout(() => {
        flashColor.value = 'transparent';
      }, props.hacked ? 100 : 50);
    }
  }, props.hacked ? 200 : 400);

  if (props.hacked) {
    matrixInterval = window.setInterval(animateMatrix, 50);
  }
};

const clearAllIntervals = () => {
  clearInterval(glitchInterval);
  clearInterval(scanlineInterval);
  clearInterval(intensityInterval);
  clearInterval(rgbInterval);
  clearInterval(blockInterval);
  clearInterval(shakeInterval);
  clearInterval(flashInterval);
  clearInterval(neonPulseInterval);
  clearInterval(matrixInterval);
};

watch(() => props.hacked, (newVal) => {
  if (newVal) {
    initMatrixRain();
  } else {
    matrixRain.value = [];
  }
  setupIntervals();
});

onMounted(() => {
  if (props.hacked) {
    initMatrixRain();
  }
  setupIntervals();
  intervalId = window.setInterval(() => {
    currentBars.value = (currentBars.value + 1) % (barLength + 1)
  }, 500)
});

onUnmounted(() => {
  clearAllIntervals();
});
</script>

<template>
  <div
      class="fixed inset-0 z-50 overflow-hidden transition-all duration-300"
      :class="{ 'cursor-not-allowed': hacked }"
      :style="overlayStyle"
  >
    <div
        class="absolute inset-0 transition-all duration-500"
        :class="{ 'animate-pulse': hacked }"
        :style="{
          backgroundColor: flashColor,
          background: 'linear-gradient(to bottom, rgba(220, 38, 38, 0.1) 0%, transparent 50%, rgba(6, 182, 212, 0.1) 100%)'
        }"
    ></div>

    <div
        class="absolute inset-0"
        :style="{
        background: `repeating-linear-gradient(
          0deg,
          rgba(0, 0, 0, ${hacked ? 0.25 : 0.15}),
          rgba(0, 0, 0, ${hacked ? 0.25 : 0.15}) 1px,
          transparent 1px,
          transparent 2px
        )`
      }"
    ></div>

    <div
        class="absolute w-full transition-all duration-150"
        :class="hacked ? 'h-2 blur-md' : 'h-1 blur-sm'"
        :style="{
          top: `${scanlinePosition}%`,
          background: 'linear-gradient(to right, transparent, rgba(6, 182, 212, 0.8) 30%, rgba(0, 255, 255, 0.8) 70%, transparent)',
          boxShadow: hacked ? '0 0 20px rgba(6, 182, 212, 0.8), 0 0 40px rgba(0, 255, 255, 0.6)' : 'none'
        }"
    ></div>

    <div
        class="absolute w-full h-2"
        :style="{
          top: `${(scanlinePosition + 50) % 100}%`,
          background: 'linear-gradient(to right, transparent, rgba(239, 68, 68, 0.6) 30%, rgba(220, 38, 38, 0.6) 70%, transparent)',
          boxShadow: hacked ? '0 0 15px rgba(239, 68, 68, 0.6)' : 'none'
        }"
    ></div>

    <div
        v-if="hacked"
        class="absolute inset-0"
    >
      <div
          v-for="(rain, index) in matrixRain"
          :key="index"
          class="absolute w-1 h-20 opacity-60"
          :style="{
          left: `${rain.x}%`,
          top: `${rain.offset}%`,
          background: 'linear-gradient(to bottom, transparent, rgba(0, 255, 255, 0.8), transparent)',
          boxShadow: '0 0 10px rgba(0, 255, 255, 0.8)'
        }"
      ></div>
    </div>

    <div
        v-if="blockGlitch.active"
        class="absolute inset-0"
    >
      <div
          v-for="(block, index) in blockGlitch.blocks"
          :key="index"
          class="absolute transition-opacity duration-100"
          :style="{
          left: `${block.x}%`,
          top: `${block.y}%`,
          width: `${block.width}%`,
          height: `${block.height}%`,
          backgroundColor: (Math.random() > 0.5 ? 'rgba(255, 0, 0, 0.7)' : 'rgba(0, 255, 255, 0.7)'),
          mixBlendMode: 'screen',
          boxShadow: hacked ? '0 0 20px currentColor' : 'none'
        }"
      ></div>
    </div>

    <div
        class="absolute inset-0"
        :style="{
        background: `linear-gradient(
          90deg,
          transparent 0%,
          rgba(255, 0, 0, ${glitchIntensity * (hacked ? 0.4 : 0.2)}) 25%,
          transparent 50%,
          rgba(0, 255, 255, ${glitchIntensity * (hacked ? 0.4 : 0.2)}) 75%,
          transparent 100%
        )`,
        transform: `translateX(${glitchIntensity * 100}%)`
      }"
    ></div>

    <div
        v-if="glitchIntensity > 0"
        class="absolute inset-0 grid gap-0"
        :class="hacked ? 'grid-cols-16 grid-rows-16' : 'grid-cols-12 grid-rows-12'"
    >
      <div
          v-for="i in (hacked ? 256 : 144)"
          :key="i"
          class="border border-red-500/20"
          :style="{
          opacity: Math.random() > (hacked ? 0.6 : 0.8) ? glitchIntensity : 0,
          backgroundColor: Math.random() > (hacked ? 0.8 : 0.9) ? 'rgba(255, 0, 0, 0.2)' : 'transparent',
          boxShadow: hacked && Math.random() > 0.9 ? '0 0 10px rgba(255, 0, 0, 0.8)' : 'none'
        }"
      ></div>
    </div>

    <div
        class="absolute inset-0 flex items-center justify-center font-bold transition-all duration-300"
        :class="[
          hacked ? 'text-7xl md:text-8xl' : 'text-6xl',
          { 'animate-ping': glitchIntensity > 0.7 }
        ]"
        :style="{
        opacity: glitchIntensity > (hacked ? 0.5 : 0.8) ? (hacked ? 0.6 : 0.3) : 0,
        color: '#ffffff',
        ...rgbStyle,
        ...(hacked ? neonGlowStyle : {})
      }"
    >
      <div class="text-center px-4">
        <div>[ HADES KERNEL REBOOT ]</div>
        <div
            v-if="hacked"
            class="text-white text-3xl md:text-4xl mt-4 animate-pulse"
            :style="rgbStyle"
        >
          SYSTEM COMPROMISED
        </div>
      </div>
    </div>

    <div
        class="absolute top-4 right-4 font-mono transition-all duration-300"
        :class="hacked ? 'text-base md:text-lg' : 'text-sm'"
        :style="rgbStyle"
    >
      <div class="text-red-500 animate-pulse">
        {{ hacked ? '⚠ CRITICAL BREACH DETECTED ⚠' : 'SYSTEM BREACH DETECTED' }}
      </div>
      <div class="text-cyan-400 mt-1">
        {{ hacked ? 'HADES://TERMINAL//LOCKDOWN' : 'HADES://TERMINAL//COMPROMISED' }}
      </div>
      <div
          v-if="hacked"
          class="text-red-500 mt-2 text-sm animate-pulse"
      >
        ACCESS DENIED
      </div>
    </div>

    <div
        v-if="hacked"
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
    >
      <div class="flex flex-col items-center gap-8">
        <div
            class="text-9xl font-bold opacity-20 animate-pulse"
            :style="{
            color: '#ffffff',
            textShadow: `
              0 0 30px rgba(255, 0, 0, 0.8),
              0 0 60px rgba(0, 255, 255, 0.8),
              0 0 90px rgba(255, 0, 0, 0.6)
            `
          }"
        >
          ⚠
        </div>

        <div
            v-if="installing > 0"
            class="font-mono text-lg text-white"
            :style="{
            textShadow: `
              0 0 10px rgba(255, 0, 0, 0.8),
              0 0 20px rgba(0, 255, 255, 0.6)
            `
          }"
        >
          <div class="flex items-center gap-3">
            <span class="text-red-500 animate-pulse">INSTALLING</span>
            <div class="flex items-center gap-1">
              <span>[</span>
              <div class="flex">
        <span
            v-for="i in barLength"
            :key="i"
            class="transition-all duration-150"
            :class="i <= currentBars ? 'text-cyan-400' : 'text-gray-600'"
        >
          {{ i <= currentBars ? '|' : '.' }}
        </span>
              </div>
              <span>]</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
        v-if="hacked || Math.random() > 0.95"
        class="absolute bottom-0 left-0 right-0 transition-all duration-500"
        :class="hacked ? 'h-1/2' : 'h-1/3'"
        :style="{
        background: 'linear-gradient(to top, rgba(220, 38, 38, 0.3) 0%, rgba(6, 182, 212, 0.2) 50%, transparent 100%)',
        animation: 'flicker 0.1s infinite'
      }"
    ></div>

    <div
        v-if="hacked"
        class="absolute inset-0 border-4 border-red-500/30 animate-pulse pointer-events-none"
        :style="neonGlowStyle"
    ></div>
  </div>
</template>

<style scoped>
@keyframes flicker {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
</style>
