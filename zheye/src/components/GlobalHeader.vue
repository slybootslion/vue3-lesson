<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
    <div class="container">
      <router-link class="navbar-brand" to="/">者也专栏</router-link>
      <ul class="list-inline mb-0" v-if="!user.isLogin">
        <li class="list-inline-item">
          <router-link class="btn btn-outline-light my-2" to="/login">登录</router-link>
        </li>
        <li class="list-inline-item">
          <router-link class="btn btn-outline-light my-2" to="/login">注册</router-link>
        </li>
      </ul>
      <ul class="list-inline mb-0" v-else>
        <li class="list-inline-item">
          <dropdown-comp :title="`你好 ${user.name}`">
            <dropdown-item
              v-for="item in dropItemData"
              :key="item.title"
              :disabled="item.disabled"
            >
              <router-link :to="item.link" class="dropdown-item">{{ item.title }}</router-link>
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
export interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
}
const dropItemData = [
  { title: '新建文章', disabled: false, link: '/create' },
  { title: '编辑资料', disabled: false, link: '/' },
  { title: '退出登录', disabled: false, link: '/' }
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
    return {
      dropItemData
    }
  }
})
</script>

<style scoped>
</style>
