<template>
  <track-mouse />
  <div>
    <Suspense>
      <template #default>
        <div>
          <async-show></async-show>
          <dog-show></dog-show>
        </div>
      </template>
      <template #fallback> loading ... </template>
    </Suspense>
    <p>{{ error }}</p>
  </div>

  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Vue.js + TypeScript" />
  <button @click="openModal">open modal</button>
  <Modal :isOpen="modalIsOpen" @close-modal="onModalClose">my modal ...</Modal>
</template>

<script lang="ts">
import { defineComponent, ref, onErrorCaptured } from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import TrackMouse from "@/components/TrackMouse.vue";
import AsyncShow from "@/components/AsyncShow.vue";
import DogShow from "@/components/DogShow.vue";
import Modal from "@/components/Modal.vue";

export default defineComponent({
  name: "App",
  components: {
    TrackMouse,
    HelloWorld,
    Modal,
    AsyncShow,
    DogShow,
  },
  setup() {
    const error = ref(null);
    onErrorCaptured((err: any) => {
      error.value = err;
      return true;
    });
    const modalIsOpen = ref(false);
    const openModal = () => {
      modalIsOpen.value = true;
    };
    const onModalClose = () => {
      modalIsOpen.value = false;
    };
    return {
      modalIsOpen,
      openModal,
      onModalClose,
      error,
    };
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
