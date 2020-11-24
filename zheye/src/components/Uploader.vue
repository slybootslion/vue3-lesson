<template>
  <div class="file-upload">
    <button class="btn btn-primary" @click="triggerUpload">
      <span v-if="fileStatus === 'loading'">正在上传...</span>
      <span v-else-if="fileStatus === 'success'">上传成功</span>
      <span v-else-if="fileStatus === 'error'">上传失败</span>
      <span v-else>点击上传</span>
    </button>
    <input type="file" class="file-input d-none" ref="fileInput" @change="handleFileChange">
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import axios from 'axios'
type UploadStatus = 'ready' | 'loading' | 'success' | 'error'
export default defineComponent({
  props: {
    action: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const fileInput = ref<null | HTMLInputElement>(null)
    const fileStatus = ref<UploadStatus>('ready')
    const triggerUpload = () => {
      if (fileInput.value) fileInput.value.click()
    }
    const handleFileChange = (e: Event) => {
      const target = e.target as HTMLInputElement
      if (target.files) {
        fileStatus.value = 'loading'
        const files = Array.from(target.files)
        const formData = new FormData()
        formData.append('file', files[0])
        axios.post(props.action, formData, {
          headers: {
            'Content-Type': 'mutipart/form-data'
          }
        }).then(() => (fileStatus.value = 'success'))
          .catch(() => (fileStatus.value = 'error'))
          .finally(() => {
            if (fileInput.value) fileInput.value.value = ''
          })
      }
    }
    return {
      fileInput,
      fileStatus,
      triggerUpload,
      handleFileChange
    }
  }
})
</script>

<style scoped>

</style>
