<template>
  <div class="content">
    <p>x: {{ x }}</p>
    <p>y: {{ y }}</p>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import useMosePosition from "@/hooks/useMousePosition";

export default defineComponent({
  name: 'TrackMouse',
  setup() {
    return {
      ...useMosePosition()
    }
  }
})
</script>

<style scoped>
.content {
  width: 100%;
  height: 100%;
  background-color: #ededed;
  text-align: start;
}
</style>
