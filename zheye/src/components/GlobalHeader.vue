<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
    <a class="navbar-brand" href="#">者也专栏</a>
    <ul class="list-inline mb-0" v-if="!user.isLogin">
      <li class="list-inline-item">
        <a class="btn btn-outline-light my-2" href="#">登录</a>
      </li>
      <li class="list-inline-item">
        <a class="btn btn-outline-light my-2" href="#">注册</a>
      </li>
    </ul>
    <ul class="list-inline mb-0" v-else>
      <li class="list-inline-item">
        <dropdown-comp :title="`你好 ${user.name}`">
          <dropdown-item v-for="item in dropItemData" :key="item.title" :disabled="item.disabled">
            <a href="#" class="dropdown-item">{{item.title}}</a>
          </dropdown-item>
        </dropdown-comp>
      </li>
    </ul>
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
  { title: '新建文章', disabled: false },
  { title: '编辑资料', disabled: false },
  { title: '退出登录', disabled: false }
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
