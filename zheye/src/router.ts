import { createRouter, createWebHistory } from 'vue-router'

import axios from 'axios'

import store from './store'

import Login from '@/views/Login.vue'
import SingUp from '@/views/SingUp.vue'
import Home from '@/views/Home.vue'
import ColumnDetail from '@/views/ColumnDetail.vue'
import CreatePost from '@/views/CreatePost.vue'

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
      component: Login,
      meta: {
        redirectAlreadyLogin: true
      }
    },
    {
      path: '/singup',
      name: 'singup',
      component: SingUp,
      meta: {
        redirectAlreadyLogin: true
      }
    },
    {
      path: '/column-detail/:id',
      name: 'columnDetail',
      component: ColumnDetail
    },
    {
      path: '/create',
      name: 'create',
      component: CreatePost,
      meta: {
        requiredLogin: true
      }
    }
  ]
})

const getUserInfo = async (token: string) => {
  if (token && !store.state.user.isLogin) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`
    return store.dispatch('fetchCurrentUser')
  }
}

router.beforeEach(async (to, from, next) => {
  const token = store.getters.token || localStorage.getItem('token')
  await getUserInfo(token)

  if (to.meta.requiredLogin && !store.state.user.isLogin) {
    next({ name: 'login' })
    return
  }
  if (to.meta.redirectAlreadyLogin && store.state.user.isLogin) {
    next({ name: 'home' })
    return
  }
  next()
})

export default router
