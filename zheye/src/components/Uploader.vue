<template>
  <div class="file-upload">
    <div class="file-upload-container">
      <slot v-if="fileStatus === 'loading'" name="loading">
        <button class="btn btn-primary" disabled>正在上传...</button>
      </slot>
      <slot v-else-if="fileStatus === 'success'" name="uploaded" :uploadedData="uploadedData">
        <button class="btn btn-primary">上传成功</button>
      </slot>
      <slot v-else-if="fileStatus === 'error'">上传失败</slot>
      <div v-else @click="triggerUpload">
        <slot name="default">
          <button class="btn btn-primary">点击上传</button>
        </slot>
      </div>
    </div>
    <input
      type="file"
      class="file-input d-none"
      ref="fileInput"
      @change="handleFileChange"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import axios from 'axios'
type UploadStatus = 'ready' | 'loading' | 'success' | 'error';
type CheckFn = (file: File) => boolean;
export default defineComponent({
  props: {
    action: {
      type: String,
      required: true
    },
    beforeUpload: {
      type: Function as PropType<CheckFn>
    }
  },
  emits: ['file-uploaded', 'file-uploaded-error'],
  setup (props, ctx) {
    const fileInput = ref<null | HTMLInputElement>(null)
    const fileStatus = ref<UploadStatus>('ready')
    const uploadedData = ref()
    const triggerUpload = () => {
      if (fileInput.value) fileInput.value.click()
    }
    const handleFileChange = (e: Event) => {
      const target = e.target as HTMLInputElement
      if (target.files) {
        const files = Array.from(target.files)
        const file = files[0]

        if (props.beforeUpload) {
          const result = props.beforeUpload(file)
          if (!result) return
        }

        fileStatus.value = 'loading'
        const formData = new FormData()
        formData.append('file', file)
        axios
          .post(props.action, formData, {
            headers: {
              'Content-Type': 'mutipart/form-data'
            }
          })
          .then(res => {
            ctx.emit('file-uploaded', res.data)
            uploadedData.value = res.data
            fileStatus.value = 'success'
          })
          .catch(error => {
            ctx.emit('file-uploaded-error', { error })
            fileStatus.value = 'error'
          })
          .finally(() => {
            if (fileInput.value) fileInput.value.value = ''
          })
      }
    }
    return {
      fileInput,
      fileStatus,
      triggerUpload,
      handleFileChange,
      uploadedData
    }
  }
})
</script>

<style scoped>
</style>
