<template>
  <div class="create-post-page container">
    <h4>新建文章</h4>
    <!-- <input type="file" @change="handleFileChange" /> -->
    <uploader-comp
      action="/upload"
      :beforeUpload="beforeUpload"
      @file-uploaded="onFileUploaded"
      @file-uploaded-error="onFileUploadedError"
    >
      <h1>点击上传</h1>
      <template #loading>
        <div class="spinner-border" role="status">
          <span class="sr-only" style="display: none">Loading...</span>
        </div>
      </template>
      <template #uploaded="dataProps">
        <img :src="dataProps.uploadedData.data.url" width="500" alt="">
      </template>
    </uploader-comp>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">文章标题：</label>
        <validate-input
          :rules="titleRules"
          v-model="titleVal"
          placeholder="文章标题"
          type="text"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">文章详情</label>
        <validate-input
          :rules="contentRules"
          v-model="contentVal"
          placeholder="文章详情"
          tag="textarea"
          rows="10"
        />
      </div>
      <template #submit>
        <button class="btn btn-primary btn-large">创建</button>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { GlobalDataProps, PostProps, ResponseType, ImageProps } from '@/store'
import ValidateForm from '@/components/ValidateForm.vue'
import ValidateInput, { RulesProp } from '@/components/ValidateInput.vue'
import Uploader from '@/components/Uploader.vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import createMessage from '@/components/createMessage'
// import axios from 'axios'

export default defineComponent({
  components: {
    ValidateForm,
    ValidateInput,
    UploaderComp: Uploader
  },
  setup () {
    const titleVal = ref('')
    const contentVal = ref('')

    const titleRules: RulesProp = [
      { type: 'required', message: '文章标题不能为空' }
    ]

    const contentRules: RulesProp = [
      { type: 'required', message: '文章详情不能为空' }
    ]

    const store = useStore<GlobalDataProps>()

    onMounted(() => {
      store.dispatch('fetchColumns')
    })

    const router = useRouter()

    const onFormSubmit = (result: boolean) => {
      if (result) {
        const { column } = store.state.user
        if (column) {
          const newPost: PostProps = {
            title: titleVal.value,
            content: contentVal.value,
            column
          }
          store.commit('createPost', newPost)
          router.push({ name: 'columnDetail', params: { id: column } })
        }
      }
    }

    const beforeUpload = (file: File): boolean => {
      const res = ['image/jpeg', 'image/jpg'].includes(file.type)
      if (!res) {
        createMessage('上传图片只能是JPG格式！', 'error', 1500)
      }
      return res
    }

    const onFileUploaded = (data: ResponseType<ImageProps>) => {
      createMessage(`上传图片id：${data.data._id}`, 'success', 1000)
    }

    const onFileUploadedError = (error: object) => {
      console.log(error)
      createMessage(`图片上传失败：${error.toString}`, 'error', 1000)
    }

    // const handleFileChange = (e: Event) => {
    //   const target = e.target as HTMLInputElement
    //   const file = target.files && target.files[0]
    //   if (file) {
    //     const formData = new FormData()
    //     formData.append(file.name, file)
    //     axios.post('/upload', formData, {
    //       headers: {
    //         'Content-Type': 'mutipart/form-data'
    //       }
    //     }).then(console.log)
    //   }
    // }

    return {
      titleVal,
      contentVal,
      titleRules,
      contentRules,
      onFormSubmit,
      // handleFileChange,
      beforeUpload,
      onFileUploaded,
      onFileUploadedError
    }
  }
})
</script>

<style scoped>
</style>
