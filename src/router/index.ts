import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login/Login.view.vue'
import Dashboard from '../views/Dashboard/Dashboard.view.vue'
import MainMenu from '../views/Dashboard/MainMenu/MainMenu.view.vue'
import Syslog from '../views/Dashboard/Syslog/Syslog.view.vue'
import Chat from '../views/Dashboard/Chat/Chat.view.vue'
import Echo from '../views/Dashboard/Echo/Echo.view.vue'
import Darknet from '../views/Dashboard/Darknet/Darknet.view.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    children: [
      {
        path: '/dashboard/main-menu',
        name: 'MainMenu',
        component: MainMenu
      },
      {
        path: '/dashboard/syslog',
        name: 'Syslog',
        component: Syslog
      },
      {
        path: '/dashboard/echo',
        name: 'Echo',
        component: Echo
      },
      {
        path: '/dashboard/darknet',
        name: 'Darknet',
        component: Darknet
      },
      {
        path: '/dashboard/chat',
        name: 'Chat',
        component: Chat
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router