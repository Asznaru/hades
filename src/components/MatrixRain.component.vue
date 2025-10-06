<template>
  <canvas ref="canvas" class="matrix-rain"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

interface Props {
  speed?: number;
  color?: string;
  opacity?: number;
}

const props = withDefaults(defineProps<Props>(), {
  speed: 1,
  color: '#0F0',
  opacity: 1
});

const canvas = ref<HTMLCanvasElement | null>(null);
let animationFrameId: number;
let ctx: CanvasRenderingContext2D | null = null;
let columns: number[] = [];
let fontSize = 14;
let frameCount = 0;

const characters = '0123456789ABCDEFabcdefαβγδεζηθικλμνξοπρστυφχψωΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюяأبتثجحخدذرزسشصضطظعغفقكلمنهويىئءةؤإآ가나다라마바사아자차카타파하';

const initCanvas = () => {
  if (!canvas.value) return;

  ctx = canvas.value.getContext('2d');
  if (!ctx) return;

  canvas.value.width = canvas.value.offsetWidth;
  canvas.value.height = canvas.value.offsetHeight;

  const columnCount = Math.floor(canvas.value.width / fontSize);
  columns = Array(columnCount).fill(1);
};

const draw = () => {
  if (!ctx || !canvas.value) return;

  frameCount++;
  const skipFrames = Math.max(1, Math.round(10 / props.speed));

  if (frameCount % skipFrames === 0) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.value.width, canvas.value.height);

    ctx.fillStyle = props.color;
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < columns.length; i++) {
      const char = characters[Math.floor(Math.random() * characters.length)];
      const x = i * fontSize;
      const y = columns[i] * fontSize;

      ctx.fillText(char, x, y);

      if (y > canvas.value.height && Math.random() > 0.975) {
        columns[i] = 0;
      }

      columns[i]++;
    }
  }

  animationFrameId = requestAnimationFrame(draw);
};

const handleResize = () => {
  initCanvas();
};

onMounted(() => {
  initCanvas();
  draw();
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  cancelAnimationFrame(animationFrameId);
  window.removeEventListener('resize', handleResize);
});
</script>

<style scoped>
.matrix-rain {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000;
  z-index: -1;
  opacity: v-bind(opacity);
}
</style>
