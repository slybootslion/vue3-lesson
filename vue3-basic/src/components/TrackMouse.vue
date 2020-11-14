<template>
  <div class="content">
    <p>x: {{ x }}</p>
    <p>y: {{ y }}</p>

    <div class="loading">
      <h1 v-if="loading">loading...</h1>
      <h1 v-if="loaded">
        <img :src="result.message" :alt="result.status">
      </h1>
      <h1 v-if="cLing">cat loading...</h1>
      <h1 v-if="cLd">
        <img :src="cRes[0].url" :alt="cRes[0].id">
      </h1>
    </div>


  </div>
</template>

<script lang="ts">
import {defineComponent, watch} from 'vue'
import useMosePosition from "@/hooks/useMousePosition";
import useURLLoader from "@/hooks/useURLLoader";

interface DogResult {
  message: string;
  status: string;
}

interface CatResult {
  id: number;
  url: string;
  width: number;
  height: number;
}

export default defineComponent({
  name: 'TrackMouse',
  setup() {

    const {loaded, loading, result} = useURLLoader<DogResult>('https://dog.ceo/api/breeds/image/random')

    const {loaded: cLd, loading: cLing, result: cRes} = useURLLoader<CatResult[]>('https://api.thecatapi.com/v1/images/search?limit=1')

    watch(result, () => {
      if (result.value) {
        console.log(result.value.message)
      }
    })

    watch(cRes, () => {
      if (cRes.value) {
        console.log(cRes.value[0].url)
      }
    })

    return {
      ...useMosePosition(),
      ...{loaded, loading, result},
      ...{cLd, cLing, cRes}
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

.loading {
  width: 300px;
  position: absolute;
  left: 50%;
  margin-left: -150px;
}

.loading img {
  width: 100%;
  height: auto;
}
</style>
