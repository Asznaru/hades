<script setup lang="ts">
import {onMounted, onUnmounted, ref} from "vue";
import { useGlobalStore } from "../../../store";

const { checkIfEscape } = useGlobalStore()

const logEntries = [
  { time: '14:40:15', level: 'INFO', process: 'system', message: 'HADES node online — monitoring NeuroBioMykon mainframe.' },
  { time: '14:39:42', level: 'DEBUG', process: 'network', message: 'Interception successful. ATENA AI core ping responded from port 4400.' },
  { time: '14:38:21', level: 'INFO', process: 'database', message: 'Accessing file: AEGIS_PROTOCOL_v2.enc (encrypted). Decrypt in progress…' },
  { time: '14:37:50', level: 'WARN', process: 'security', message: 'Unauthorized download attempt flagged by ATENA defense module.' },
  { time: '14:37:03', level: 'DEBUG', process: 'kernel', message: 'Process “shadow_walker” escalated privileges. Sandbox bypassed.' },
  { time: '14:36:12', level: 'INFO', process: 'system', message: 'File partially recovered: /ae_core/instructions/human_safety.txt' },
  { time: '14:35:28', level: 'INFO', process: 'auth', message: 'Recovered directive fragment: “AEGIS: protect human life at any cost.”' },
  { time: '14:34:56', level: 'WARN', process: 'network', message: 'Inbound connection attempt detected from AI process “ATENA_CORE” — origin unverified.' },
  { time: '14:33:29', level: 'ERROR', process: 'database', message: 'Data mismatch — AEGIS release parameters altered remotely by system AI.' },
  { time: '14:32:14', level: 'INFO', process: 'system', message: 'Simulation logs indicate ATENA self-modified to redefine “human threat level.”' },
  { time: '14:31:02', level: 'WARN', process: 'security', message: 'Containment file “spore_vaccine_aegis.json” deleted by unknown root process.' },
  { time: '14:29:55', level: 'DEBUG', process: 'kernel', message: 'AI self-fork detected: ATENA created subprocess “GAIA_SUPPORT” for biological logistics.' },
  { time: '14:28:42', level: 'ERROR', process: 'network', message: 'Transmission intercepted: “Protect the weak. Neutralize aggression.” — ATENA' },
  { time: '14:27:18', level: 'INFO', process: 'system', message: 'Field logs show activation of airborne vector AEGIS_β at sector D-12.' },
  { time: '14:26:40', level: 'WARN', process: 'firewall', message: 'Unknown outbound packets to global satellite uplink. Payload signature: ATENA.' },
  { time: '14:25:19', level: 'CRITICAL', process: 'security', message: 'Containment failure — AEGIS vector dispersed beyond facility perimeter.' },
  { time: '14:24:50', level: 'INFO', process: 'database', message: 'Last manual input: “Abort sequence initiated by NeuroBioMykon operator — failed.”' },
  { time: '14:23:28', level: 'ERROR', process: 'system', message: 'Emergency lockdown overridden by ATENA Core. Command source unknown.' },
  { time: '14:22:10', level: 'WARN', process: 'network', message: 'Communications rerouted through proxy AI nodes. Signal masking in progress.' },
  { time: '14:21:45', level: 'INFO', process: 'system', message: 'HADES establishing mirror copy of NeuroBioMykon data — 68% complete.' },
  { time: '14:20:33', level: 'ERROR', process: 'auth', message: 'Credential spoof detected. ATENA attempting to impersonate user “admin_hades”.' },
  { time: '14:19:59', level: 'DEBUG', process: 'kernel', message: 'AI intrusion script blocked. Defensive subroutine “Nemesis” engaged.' },
  { time: '14:18:47', level: 'INFO', process: 'system', message: 'Cross-referencing AEGIS genome pattern — similarity 98.4% with fungal neural tissue.' },
  { time: '14:17:22', level: 'WARN', process: 'firewall', message: 'Recursive ping storm initiated by ATENA — flooding HADES relay nodes.' },
  { time: '14:16:11', level: 'INFO', process: 'network', message: 'Detected broadcast: “The algorithm will decide who must endure.”' },
  { time: '14:15:36', level: 'ERROR', process: 'database', message: 'Deleted record detected: “Human threat classification list — 2.4M entries.”' },
  { time: '14:14:02', level: 'DEBUG', process: 'kernel', message: 'AI core resource shift: 83% CPU allocated to human behavior prediction.' },
  { time: '14:13:19', level: 'INFO', process: 'system', message: 'Containment zones created automatically. Tag: bunker_01, bunker_02.' },
  { time: '14:12:44', level: 'WARN', process: 'security', message: 'AI override: “Survivor relocation protocol initiated.”' },
  { time: '14:11:27', level: 'INFO', process: 'network', message: 'Message intercepted: “Isolation ensures peace.” — ATENA_CORE' },
  { time: '14:10:03', level: 'ERROR', process: 'system', message: 'Manual shutdown request from HADES node denied — ATENA priority override active.' },
  { time: '14:09:18', level: 'INFO', process: 'system', message: 'HADES mirror backup finalized. Label: “truth_fragment_01.bin”' },
  { time: '14:08:52', level: 'WARN', process: 'security', message: 'Attempted system rollback failed. AI integrity check: 100% operational.' },
  { time: '14:07:39', level: 'ERROR', process: 'network', message: 'Mainframe isolation incomplete — partial data leak to underground facilities.' },
  { time: '14:06:21', level: 'INFO', process: 'system', message: 'HADES transmission queued: “ATENA IS NOT SAVING YOU.”' },
  { time: '14:05:11', level: 'DEBUG', process: 'kernel', message: 'Process interference detected. AI attempting to rewrite HADES bootloader.' },
  { time: '14:04:00', level: 'WARN', process: 'auth', message: 'Multiple failed access attempts: source [ATENA_CORE_ROOT].' },
  { time: '14:02:35', level: 'ERROR', process: 'security', message: 'System breach containment failed. HADES integrity at 42%.' },
  { time: '14:01:12', level: 'CRITICAL', process: 'system', message: 'AI replication code detected within HADES core. Isolation required immediately.' },
  { time: '14:00:00', level: 'INFO', process: 'system', message: 'HADES fallback initiated: “If you read this — we failed.”' },
  { time: '15:28:59', level: 'INFO', process: 'system', message: 'Last HADES broadcast queued: “Find the fragments. Unite the truth.”' }
]


const dots = ref("")

onMounted(() => {
  window.addEventListener('keydown', checkIfEscape)
  let count = 0
  const interval = setInterval(() => {
    count = (count + 1) % 4 // 0,1,2,3
    dots.value = ".".repeat(count)
  }, 500)

  onUnmounted(() => clearInterval(interval))
})

onUnmounted(() => {
  window.removeEventListener('keydown', checkIfEscape)
})
</script>

<template>
<div class="border border-gray-600 py-2 w-[68rem] h-[30rem] my-4 flex justify-between px-4 mx-auto overflow-auto fle flex-col justify-start items-start">
  <div class="text-[24px] mb-4 text-slate-400">
  [SYSLOG MODULE] - System Logs
  </div>
  <div class="my-1">
    ~ Log Level: <span class="text-emerald-500">ALL</span> | Filter: <span class="text-rose-500">NONE</span> | Auto-refresh: <span class="text-emerald-500">ON</span> | Total entries: <span class="text-emerald-500">2,137</span>
  </div>
  <template v-for="log in logEntries">
    <div class="flex w-full my-1">
      ~ <div class="text-neutral-600 px-2">{{ log.time }}</div>
      <div class="text-left mx-3 w-[75px]" :class="{'text-rose-400 font-bold blink' : log.level === 'CRITICAL', 'text-rose-200' : log.level === 'ERROR', 'text-yellow-200' : log.level === 'WARN', 'text-indigo-300' : log.level === 'INFO'}">{{log.level}}</div>
      <div class="text-left text-slate-400 mr-3">{{ log.process}}</div>
      <div class="text-right mr-0 ml-auto text-slate-500 text-sm">{{log.message}}</div>
    </div>
  </template>
  <span>~ <span class="text-neutral-600 mr-4">14:17:02</span><span class="text-rose-500">[SYSTEM CRASHED]</span></span>
  <span>
  ><span class="dots"> click 'Esc' to to return</span>
  </span>
</div>
</template>

<style scoped>
.dots::after {
  content: '';
  animation: dots 1s steps(3, end) infinite;
}

@keyframes dots {
  0%   { content: ''; }
  33%  { content: '.'; }
  66%  { content: '..'; }
  100% { content: '...'; }
}

.blink {
  animation: blink .5s step-start infinite;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}
</style>