<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
    <div class="container">
      <router-link class="navbar-brand" to="/">者也专栏</router-link>
      <ul class="list-inline mb-0" v-if="!user || !user.isLogin">
        <li class="list-inline-item">
          <router-link class="btn btn-outline-light my-2" to="/login"
            >登录</router-link
          >
        </li>
        <li class="list-inline-item">
          <router-link class="btn btn-outline-light my-2" to="/singup"
            >注册</router-link
          >
        </li>
      </ul>
      <ul class="list-inline mb-0" v-else>
        <li class="list-inline-item">
          <dropdown-comp :title="`你好 ${user && user.nickName}`">
            <dropdown-item
              v-for="item in dropItemData"
              :key="item.title"
              :disabled="item.disabled"
            >
              <router-link
                v-if="!item.method"
                :to="item.link"
                class="dropdown-item"
              >{{ item.title }}</router-link>
              <router-link
                v-else
                :to="item.link"
                class="dropdown-item"
                @click="logout"
              >{{ item.title }}</router-link>
            </dropdown-item>
          </dropdown-comp>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import Dropdown from '@/components/Dropdown.vue'
import DropdownItem from '@/components/DropdownItem.vue'
import store, { UserProps } from '@/store'

const dropItemData = [
  { title: '新建文章', disabled: false, link: '/create' },
  { title: '编辑资料', disabled: false, link: '/' },
  { title: '退出登录', disabled: false, link: '/', method: true }
]
export default defineComponent({
  name: 'GlobalHeader',
  components: {
    DropdownComp: Dropdown,
    DropdownItem
  },
  props: {
    user: {
      type: Object as PropType<UserProps>,
      requierd: true
    }
  },
  setup () {
    const logout = () => {
      localStorage.clear()
      store.commit('logout')
    }
    return {
      dropItemData,
      logout
    }
  }
})
</script>

<style scoped>
</style>
