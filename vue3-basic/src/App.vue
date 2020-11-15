<template>
  <track-mouse />
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Vue.js + TypeScript" />
  <Modal />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import TrackMouse from "@/components/TrackMouse.vue";
import Modal from "@/components/Modal.vue";
export default defineComponent({
  name: "App",
  components: {
    TrackMouse,
    HelloWorld,
    Modal,
  },
});
</script>

<style>
#app {
  width: 100%;
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
