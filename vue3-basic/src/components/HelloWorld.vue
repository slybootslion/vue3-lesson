<template>
  <div class="hello">
    <h3>{{ msg }}</h3>
    <h1>count:{{ count }}</h1>
    <h1>double:{{ double }}</h1>
    <button class="btn" @click="increase">👍+1</button>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, computed} from 'vue';

export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  setup() {
    const count = ref(0)
    const double = computed(() => {
      return count.value * 2
    })

    function increase() {
      count.value++
    }

    return {
      count,
      double,
      increase
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btn {
  padding: 5px 10px;
  border-radius: 3px;
  background-color: transparent;
  border: 1px solid #ededed;
  outline: none;
  cursor: pointer;
}
</style>
