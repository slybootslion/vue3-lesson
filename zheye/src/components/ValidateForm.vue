<template>
  <form class="validate-form-container">
    <slot name="default"></slot>
    <div class="submit-area" @click.prevent="submitForm">
      <slot name="submit">
        <button type="submit" class="btn btn-primary">提交</button>
      </slot>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'
import mitt from 'mitt'
export const emitter = mitt()

type ValidateFunc = () => boolean
type ClearFun = () => void

export default defineComponent({
  emits: ['form-submit'],
  setup (props, ctx) {
    let funArr: ValidateFunc[] = []
    const funArr2: ClearFun[] = []
    const submitForm = () => {
      const result = funArr.map(fn => fn()).every(res => res)
      ctx.emit('form-submit', result)
    }
    const clearInputsVal = () => {
      funArr2.forEach(fn => fn())
    }
    const callback = (fn?: ValidateFunc) => {
      fn && funArr.push(fn)
    }
    const callback2 = (fn?: ClearFun) => {
      fn && funArr2.push(fn)
    }
    emitter.on('form-item-created', callback)
    emitter.on('value-clear', callback2)
    onUnmounted(() => {
      emitter.off('form-item-created', callback)
      emitter.off('value-clear', callback2)
      funArr = []
    })
    return {
      submitForm,
      clearInputsVal
    }
  }
})
</script>

<style scoped>
.submit-area {
  text-align: center;
}
</style>
