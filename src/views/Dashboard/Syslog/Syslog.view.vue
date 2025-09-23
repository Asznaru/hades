<script setup lang="ts">
import {onMounted, onUnmounted, ref} from "vue";
import { useGlobalStore } from "../../../store";

const { checkIfEscape } = useGlobalStore()

const logEntries = [
  { time: '14:32:18', level: 'INFO', process: 'auth', message: 'User authentication successful: shadow_walker' },
  { time: '14:31:45', level: 'WARN', process: 'firewall', message: 'Suspicious connection attempt from 203.45.67.89' },
  { time: '14:30:12', level: 'ERROR', process: 'database', message: 'Connection timeout to backup server db02' },
  { time: '14:29:33', level: 'INFO', process: 'network', message: 'Packet encryption enabled for session 0x4A3B' },
  { time: '14:28:57', level: 'DEBUG', process: 'kernel', message: 'Memory allocation: 2048KB allocated to process hades_core' },
  { time: '14:27:21', level: 'WARN', process: 'security', message: 'Failed login attempt detected from unknown host' },
  { time: '14:26:44', level: 'INFO', process: 'system', message: 'Backup process completed successfully' },
  { time: '14:24:02', level: 'INFO', process: 'auth', message: 'Session terminated for user: root' },
  { time: '14:22:56', level: 'WARN', process: 'firewall', message: 'Inbound traffic exceeded threshold: 5000 packets/sec' },
  { time: '14:21:39', level: 'DEBUG', process: 'kernel', message: 'Thread 0x0023 sleeping for 120ms' },
  { time: '14:20:12', level: 'ERROR', process: 'database', message: 'Replication error on primary node db01' },
  { time: '14:19:05', level: 'INFO', process: 'network', message: 'Tunnel established with remote node 10.0.0.45' },
  { time: '14:18:44', level: 'WARN', process: 'security', message: 'Multiple failed login attempts from 192.168.0.33' },
  { time: '14:17:23', level: 'INFO', process: 'system', message: 'System uptime: 1023 hours' },
  { time: '14:16:11', level: 'DEBUG', process: 'kernel', message: 'Loaded module: netfilter_v2' },
  { time: '14:15:09', level: 'ERROR', process: 'auth', message: 'Invalid password attempt for user: guest' },
  { time: '14:14:42', level: 'INFO', process: 'firewall', message: 'Rule set updated successfully' },
  { time: '14:13:36', level: 'WARN', process: 'network', message: 'Packet loss detected on interface eth0' },
  { time: '14:12:22', level: 'ERROR', process: 'database', message: 'Query execution failed: timeout' },
  { time: '14:11:10', level: 'DEBUG', process: 'kernel', message: 'IO wait at 12%' },
  { time: '14:09:58', level: 'INFO', process: 'system', message: 'Service restart completed: hades-daemon' },
  { time: '14:08:40', level: 'WARN', process: 'security', message: 'Unauthorized access to restricted file /etc/shadow' },
  { time: '14:07:19', level: 'INFO', process: 'auth', message: 'User logout: admin' },
  { time: '14:06:04', level: 'DEBUG', process: 'kernel', message: 'Cache flushed: 32MB released' },
  { time: '14:05:43', level: 'ERROR', process: 'network', message: 'Connection reset by peer: 172.16.5.23' },
  { time: '14:04:29', level: 'INFO', process: 'system', message: 'Scheduled task completed: cleanup.temp' },
  { time: '14:03:11', level: 'WARN', process: 'firewall', message: 'Port scan detected on interface eth1' },
  { time: '14:02:55', level: 'ERROR', process: 'database', message: 'Disk I/O error on db03' },
  { time: '14:01:42', level: 'INFO', process: 'auth', message: 'New user created: operator' },
  { time: '14:00:17', level: 'DEBUG', process: 'kernel', message: 'IRQ latency within normal range' },
  { time: '13:54:51', level: 'CRITICAL', process: 'auth', message: 'Brute force login attempt detected' },
  { time: '14:25:19', level: 'CRITICAL', process: 'security', message: 'rgrzybicki credential leak detected: privileged accounts exposed' },
  { time: '13:59:05', level: 'WARN', process: 'security', message: 'Malware signature detected in upload stream' },
  { time: '13:58:44', level: 'INFO', process: 'network', message: 'Heartbeat received from node 0x7F2A' },
  { time: '13:57:28', level: 'ERROR', process: 'system', message: 'Kernel panic detected: system reboot required' },
  { time: '13:56:13', level: 'DEBUG', process: 'kernel', message: 'Context switch frequency: 3400/s' },
  { time: '13:55:06', level: 'INFO', process: 'firewall', message: 'Whitelist updated for 192.168.1.10' },
  { time: '13:53:37', level: 'INFO', process: 'system', message: 'Temperature sensor reading: 62°C' },
  { time: '13:52:20', level: 'ERROR', process: 'network', message: 'SSL handshake failed with client 10.10.1.3' },
  { time: '13:51:14', level: 'DEBUG', process: 'kernel', message: 'Process cleanup: pid=453 terminated' },
  { time: '13:50:05', level: 'INFO', process: 'database', message: 'Backup snapshot created: snapshot_2025_09_23' },
  { time: '13:48:49', level: 'WARN', process: 'firewall', message: 'DDoS pattern detected from multiple sources' },
  { time: '13:47:30', level: 'ERROR', process: 'auth', message: 'Expired token used for API request' },
  { time: '13:46:11', level: 'DEBUG', process: 'kernel', message: 'Opened socket descriptor fd=1024' },
  { time: '13:45:03', level: 'INFO', process: 'network', message: 'IPv6 route established with fe80::1' },
  { time: '13:44:28', level: 'WARN', process: 'security', message: 'Unusual activity detected in process monitor' },
  { time: '13:43:19', level: 'ERROR', process: 'system', message: 'High memory usage: 95% consumption' },
  { time: '13:42:07', level: 'INFO', process: 'auth', message: 'Password updated successfully for user: rgrzybicki' },
  { time: '13:41:02', level: 'DEBUG', process: 'kernel', message: 'DMA channel 3 engaged for transfer' },
  { time: '13:40:15', level: 'INFO', process: 'system', message: 'Log rotation completed for /var/log/syslog' }
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
<div class="border border-gray-600 py-2 w-[60rem] h-[30rem] my-1 flex justify-between px-4 mx-auto overflow-auto fle flex-col justify-start items-start">
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