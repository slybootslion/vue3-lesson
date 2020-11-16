<template>
  <img :src="result && result.message" alt="" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
export default defineComponent({
  async setup() {
    const rowData = await axios.get("https://dog.ceo/api/breeds/image/random");
    console.log(rowData);
    return {
      result: rowData.data,
    };
  },
});
</script>

<style scoped>
</style>
