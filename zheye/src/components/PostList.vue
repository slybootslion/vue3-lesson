<template>
  <div class="post-list">
    <article class="card mb-3 shadow-sm" v-for="post in list" :key="post.id">
      <div class="card-body">
        <h4>
          {{ post.title }}
        </h4>
        <div class="row my-3 align-items-center">
          <div class="col-4" v-if="post.image">
            <img :src="post.image" alt="" class="rounded-lg" />
          </div>
          <p :class="{ 'col-8': post.image }" class="text-muted">
            {{ post.content }}
          </p>
        </div>
        <span class="text-muted">{{ post.createdAt }}</span>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
export interface PostProps {
  id: number;
  title: string;
  content: string;
  image?: string;
  createdAt: string;
  columnId: number;
}
export default defineComponent({
  name: 'PostList',
  props: {
    list: {
      type: Array as PropType<PostProps[]>,
      required: true
    }
  },
  setup () {
    return {}
  }
})
</script>

<style scoped>
.post-list h4 a {
  text-decoration: none;
  color: #1a1a1a;
}
.post-list h4 a:hover {
  color: #0d6efd;
}
.rounded-lg {
  width: 100%;
}
</style>
