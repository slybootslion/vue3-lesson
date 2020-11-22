<template>
  <teleport to="#back">
    <div
      :style="{ backgroundColor: background }"
      class="d-flex justify-content-center align-items-center h-100 loading-container"
    >
      <div class="loading-content">
        <div class="spinner-border text-primary" role="status">
          <span class="sr-only" style="display: none">{{ text }}</span>
        </div>
        <p v-if="text" class="text-primary small">{{ text }}</p>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import useDOMCreate from '@/hooks/useDOMCreate'
import { defineComponent, onUnmounted } from 'vue'

export default defineComponent({
  props: {
    text: {
      type: String,
      default: 'loading...'
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    background: {
      type: String,
      default: 'rgba(255, 255, 255, 0.7)'
    }
  },
  setup () {
    useDOMCreate('back')
    return {}
  }
})
</script>

<style scoped>
.loading-container {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
}

.loading-content {
  text-align: center;
}
</style>
