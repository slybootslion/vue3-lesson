<template>
  <div>{{ result }}</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return new Promise((resolve) => {
      setTimeout(() => {
        return resolve({ result: 42 });
      }, 2000);
    });
  },
});
</script>

<style scoped>
</style>
