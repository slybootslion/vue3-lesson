import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import ColumnDetail from '@/views/ColumnDetail.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/column-detail/:id',
      name: 'columnDetail',
      component: ColumnDetail
    }
  ]
})

createApp(App)
  .use(router)
  .mount('#app')
