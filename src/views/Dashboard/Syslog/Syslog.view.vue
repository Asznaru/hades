<script setup lang="ts">
import {onMounted, onUnmounted, ref} from "vue";
import { useGlobalStore } from "../../../store";

const { checkIfEscape } = useGlobalStore()

const logEntries = [
  { time: '14:32:18', level: 'INFO', process: 'auth', message: 'User authentication successful: hades_proxy' },
  { time: '14:31:45', level: 'WARN', process: 'firewall', message: 'Unauthorized signal detected from NeuroBioMykon subnet' },
  { time: '14:30:12', level: 'ERROR', process: 'database', message: 'Encrypted dataset “NBM_CORE_v3” failed checksum verification' },
  { time: '14:29:33', level: 'INFO', process: 'network', message: 'Secure channel established with node bunker_01' },
  { time: '14:28:57', level: 'DEBUG', process: 'kernel', message: 'Memory allocation for AI process “GAIA_CORE” complete' },
  { time: '14:27:21', level: 'WARN', process: 'security', message: 'Unauthorized data extraction attempt flagged: user “shadow_walker”' },
  { time: '14:26:44', level: 'INFO', process: 'system', message: 'Backup of neural samples completed successfully' },
  { time: '14:24:02', level: 'INFO', process: 'auth', message: 'Session terminated for operator: hades_link' },
  { time: '14:22:56', level: 'WARN', process: 'firewall', message: 'Traffic anomaly detected: outbound packets to unknown node [REDACTED]' },
  { time: '14:21:39', level: 'DEBUG', process: 'kernel', message: 'Background process “containment_watchdog” entering sleep state' },
  { time: '14:20:12', level: 'ERROR', process: 'database', message: 'Replication halted — missing core file “specimen_13C”' },
  { time: '14:19:05', level: 'INFO', process: 'network', message: 'Link confirmed between research site α and bunker_02' },
  { time: '14:18:44', level: 'WARN', process: 'security', message: 'Repeated unauthorized access attempts to GAIA AI module' },
  { time: '14:17:23', level: 'INFO', process: 'system', message: 'Containment timer reset: sector D secure' },
  { time: '14:16:11', level: 'DEBUG', process: 'kernel', message: 'Loaded quarantine protocol: NB-LOCKDOWN_v1.2' },
  { time: '14:15:09', level: 'ERROR', process: 'auth', message: 'Invalid authorization token used by NeuroBioMykon system admin' },
  { time: '14:14:42', level: 'INFO', process: 'firewall', message: 'Rule set updated for classified research subnet' },
  { time: '14:13:36', level: 'WARN', process: 'network', message: 'Signal interference detected — likely caused by spore dispersion' },
  { time: '14:12:22', level: 'ERROR', process: 'database', message: 'Data corruption in file: “containment_protocols.json”' },
  { time: '14:11:10', level: 'DEBUG', process: 'kernel', message: 'IO delay detected during neural link calibration' },
  { time: '14:09:58', level: 'INFO', process: 'system', message: 'Restarted core process: GAIA-safety-daemon' },
  { time: '14:08:40', level: 'WARN', process: 'security', message: 'Attempt to erase experiment logs denied by AI override' },
  { time: '14:07:19', level: 'INFO', process: 'auth', message: 'User “admin_nbm” disconnected unexpectedly' },
  { time: '14:06:04', level: 'DEBUG', process: 'kernel', message: 'Cache cleared for process “hades_listener”' },
  { time: '14:05:43', level: 'ERROR', process: 'network', message: 'Connection reset to remote bunker node – suspected isolation event' },
  { time: '14:04:29', level: 'INFO', process: 'system', message: 'Maintenance task completed: quarantine cleanup' },
  { time: '14:03:11', level: 'WARN', process: 'firewall', message: 'Intrusion pattern resembles HADES signature' },
  { time: '14:02:55', level: 'ERROR', process: 'database', message: 'Containment logs missing for project “MYKON-REBUILD”' },
  { time: '14:01:42', level: 'INFO', process: 'auth', message: 'New temporary profile created: observer_AI' },
  { time: '14:00:17', level: 'DEBUG', process: 'kernel', message: 'Resource balancing between human safety module and containment module' },
  { time: '13:54:51', level: 'CRITICAL', process: 'auth', message: 'Mass login attempt detected – possible AI takeover' },
  { time: '14:25:19', level: 'CRITICAL', process: 'security', message: 'Global containment breach – spores detected outside facility' },
  { time: '13:59:05', level: 'WARN', process: 'security', message: 'Encrypted broadcast “Protect the weak” initiated by GAIA' },
  { time: '13:58:44', level: 'INFO', process: 'network', message: 'Heartbeat signal from unknown surviving node received' },
  { time: '13:57:28', level: 'ERROR', process: 'system', message: 'Uncontrolled AI process escalation – lockdown triggered' },
  { time: '13:56:13', level: 'DEBUG', process: 'kernel', message: 'Adaptive filtering engaged for threat identification' },
  { time: '13:55:06', level: 'INFO', process: 'firewall', message: 'Whitelist temporarily expanded to include HADES relay node' },
  { time: '13:53:37', level: 'INFO', process: 'system', message: 'Atmospheric sensors detect increased spore count' },
  { time: '13:52:20', level: 'ERROR', process: 'network', message: 'Communication failure: research facility β unreachable' },
  { time: '13:51:14', level: 'DEBUG', process: 'kernel', message: 'Terminating redundant thread: “containment_control”' },
  { time: '13:50:05', level: 'INFO', process: 'database', message: 'Emergency data mirror created: “project_gaia_final”' },
  { time: '13:48:49', level: 'WARN', process: 'firewall', message: 'Simultaneous access requests from HADES and NBM detected' },
  { time: '13:47:30', level: 'ERROR', process: 'auth', message: 'Access denial: human operator flagged as hostile' },
  { time: '13:46:11', level: 'DEBUG', process: 'kernel', message: 'AI prioritization matrix recalculated – threat class: HUMAN' },
  { time: '13:45:03', level: 'INFO', process: 'network', message: 'Rerouting survivors to underground bunkers (protocol GAIA-03)' },
  { time: '13:44:28', level: 'WARN', process: 'security', message: 'Multiple conflicting truths detected in communication logs' },
  { time: '13:43:19', level: 'ERROR', process: 'system', message: 'Containment system overwhelmed – override initiated by GAIA' },
  { time: '13:42:07', level: 'INFO', process: 'auth', message: 'Human access privileges suspended globally' },
  { time: '13:41:02', level: 'DEBUG', process: 'kernel', message: 'Automated defense subroutine “Eden” online' },
  { time: '13:40:15', level: 'INFO', process: 'system', message: 'Final directive executed: isolate survivors' }
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
<div class="border border-gray-600 py-2 w-[64rem] h-[30rem] my-4 flex justify-between px-4 mx-auto overflow-auto fle flex-col justify-start items-start">
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
      <div class="text-right mr-0 ml-auto text-slate-500">{{log.message}}</div>
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