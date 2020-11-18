<template>
  <div class="column-detail-page w-75 mx-auto">
    <div
      class="column-info row mb-4 border-bottom pb-4 align-item-center"
      v-if="column"
    >
      <div class="col-3 text-center">
        <img :src="column.avatar" :alt="column.title" class="rounded-circle" />
      </div>
      <div class="col-9">
        <h4>{{ column.title }}</h4>
        <p class="text-muted">{{ column.description }}</p>
      </div>
    </div>
    <post-list :list="list"></post-list>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { testData } from '@/views/Home.vue'
import PostList from '@/components/PostList.vue'
interface PostProps {
  id: number;
  title: string;
  content: string;
  image?: string;
  createdAt: string;
  columnId: number;
}
const testPost: PostProps[] = [
  {
    id: 1,
    title: '这是我的第一篇文章',
    content:
      'Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。',
    image: 'https://img.mukewang.com/5face0250001d27618720764.jpg',
    createdAt: '2020-06-11 10:34:22',
    columnId: 1
  },
  {
    id: 2,
    title: '这是我的第2篇文章',
    content:
      'Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。',
    image: 'https://img.mukewang.com/5f9a70870001f4f918720764.jpg',
    createdAt: '2020-06-11 10:34:22',
    columnId: 1
  },
  {
    id: 3,
    title: '这是我的第3篇文章',
    content:
      'Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。',
    createdAt: '2020-06-11 10:34:22',
    columnId: 1
  },
  {
    id: 4,
    title: '这是我的第4篇文章',
    content:
      'Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。',
    image: 'https://img.mukewang.com/5ed9db4c0001b36418720764.jpg',
    createdAt: '2020-06-11 10:34:22',
    columnId: 2
  },
  {
    id: 5,
    title: '这是我的第4篇文章',
    content:
      'Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。',
    image: 'https://img.mukewang.com/5ed9db4c0001b36418720764.jpg',
    createdAt: '2020-06-11 10:34:22',
    columnId: 3
  },
  {
    id: 6,
    title: '这是我的第4篇文章',
    content:
      'Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。',
    image: 'https://img.mukewang.com/5face0250001d27618720764.jpg',
    createdAt: '2020-06-11 10:34:22',
    columnId: 3
  },
  {
    id: 7,
    title: '这是我的第4篇文章',
    content:
      'Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。',
    image: 'https://img.mukewang.com/5face0250001d27618720764.jpg',
    createdAt: '2020-06-11 10:34:22',
    columnId: 4
  }
]
export default defineComponent({
  name: 'ColumnDetail',
  components: {
    PostList
  },
  setup () {
    const route = useRoute()
    const { id: currentId } = route.params
    const column = testData.find((c) => c.id === +currentId)
    const list = testPost.filter((post) => post.columnId === +currentId)
    console.log(list)
    return {
      column,
      list
    }
  }
})
</script>

<style scoped>
</style>
