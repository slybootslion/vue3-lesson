<template>
  <global-header :user="user"></global-header>
  <loader-comp v-if="isLoading" :isLoading="isLoading" text="加载中..."></loader-comp>
  <div class="content">
    <router-view></router-view>
  </div>
  <footer class="text-center py-4 text-secondary bg-light mt-6">
    <small>
      <ul class="list-inline mb-0">
        <li class="list-inline-item">® 2020 者也专栏</li>
        <li class="list-inline-item">课程</li>
        <li class="list-inline-item">文档</li>
        <li class="list-inline-item">联系</li>
        <li class="list-inline-item">更多</li>
      </ul>
    </small>
  </footer>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import GlobalHeader from '@/components/GlobalHeader.vue'
import Loader from '@/components/Loader.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
    LoaderComp: Loader
  },
  setup () {
    const store = useStore()
    const user = computed(() => store.state.user)
    const isLoading = computed(() => store.state.loading)
    return {
      user,
      isLoading
    }
  }
})
</script>

<style scoped>
.content {
  min-height: calc(100vh - 163px);
}
</style>
