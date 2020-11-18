<template>
  <div class="row">
    <div class="col-4 mb-4" v-for="column in columnList" :key="column.id">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <img
            :src="column.avatar"
            :alt="column.title"
            class="rounded-circle border border-light w-25 my-3"
          />
          <h5 class="card-title">{{ column.title }}</h5>
          <p class="card-text text-left">{{ column.description }}</p>
          <span class="btn btn-outline-primary" @click="toDetail(column.id)">进入专栏</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { useRouter } from 'vue-router'

export interface ColumnProps {
  id: number;
  title: string;
  avatar?: string;
  description: string;
}

export default defineComponent({
  name: 'ColumnList',
  props: {
    list: {
      type: Array as PropType<ColumnProps[]>,
      required: true
    }
  },
  setup (props) {
    const router = useRouter()
    const columnList = computed(() => {
      return props.list.map(column => {
        if (!column.avatar) column.avatar = require('@/assets/column.jpg')
        return column
      })
    })
    const toDetail = (id: number) => {
      router.push({ name: 'columnDetail', params: { id } })
    }
    return {
      columnList,
      toDetail
    }
  }
})
</script>

<style scoped>
</style>
