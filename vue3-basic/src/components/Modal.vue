<template>
  <teleport to="#modal">
    <div id="center">
      <h2><slot>this is a modal</slot></h2>
    </div>
  </teleport>
</template>

<script>
import {defineComponent} from 'vue'
export default defineComponent({
  name: 'modal',
  setup () {
    return {}
  } 
})
</script>

<style scoped>
#center {
  width: 200px;
  height: 200px;
  border: 2px solid black;
  background-color: #fff;
  position: fixed;
  left: 50%;
  top: 50%;
  margin-left: -100px;
  margin-top: -100px;
}
</style>
