<template>
  <div class="create-post-page container">
    <h4>新建文章</h4>
    <!-- <input type="file" @change="handleFileChange" /> -->
    <uploader-comp
      action="/upload"
      class="d-flex align-items-center justify-content-center bg-light text-secondary w-100 my-4"
      :beforeUpload="uploadCheck"
      @file-uploaded="handleFileUploaded"
      @file-uploaded-error="onFileUploadedError"
    >
      <h2>点击上传头图</h2>
      <template #loading>
        <div class="d-flex">
          <div class="spinner-border text-secondary" role="status">
            <span class="sr-only" style="display: none">Loading...</span>
          </div>
          <h2>正在上传</h2>
        </div>
      </template>
      <template #uploaded="dataProps">
        <img :src="dataProps.uploadedData.data.url" alt="" />
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
import { beforeUploadCheck } from '../helper'
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
    const store = useStore<GlobalDataProps>()
    let imgId = ''
    const titleRules: RulesProp = [
      { type: 'required', message: '文章标题不能为空' }
    ]

    const contentRules: RulesProp = [
      { type: 'required', message: '文章详情不能为空' }
    ]

    onMounted(() => {
      store.dispatch('fetchColumns')
    })

    const router = useRouter()

    const onFormSubmit = (result: boolean) => {
      if (result) {
        const { column, _id } = store.state.user
        if (column) {
          const newPost: PostProps = {
            title: titleVal.value,
            content: contentVal.value,
            column,
            author: _id
          }
          console.log(column)
          if (imgId) newPost.image = imgId
          store.dispatch('createPost', newPost).then(() => {
            createMessage('发表成功，2秒后跳转到文章', 'success', 2000)
            setTimeout(() => {
              router.push({ name: 'columnDetail', params: { id: column } })
            }, 2000)
          })
        }
      }
    }
    // http://192.168.1.102:10001/column-detail/5fbb2cecb558154f0392b304
    /*     const beforeUpload = (file: File): boolean => {
      const res = ['image/jpeg', 'image/jpg'].includes(file.type)
      if (!res) {
        createMessage('上传图片只能是JPG格式！', 'error', 1500)
      }
      return res
    } */

    const handleFileUploaded = (data: ResponseType<ImageProps>) => {
      // createMessage(`上传图片id：${data.data._id}`, 'success', 1000)
      if (data.data._id) imgId = data.data._id
    }

    const onFileUploadedError = (error: object) => {
      console.log(error)
      createMessage(`图片上传失败：${error.toString}`, 'error', 1000)
    }

    const uploadCheck = (file: File) => {
      const result = beforeUploadCheck(file, { size: 1, format: ['image/jpeg', 'image/png'] })
      const { passed, error } = result
      if (error === 'format') {
        createMessage('上传图片只能是JPG/PNG格式！', 'error', 1500)
        return
      }
      if (error === 'size') {
        createMessage('图片上传大小不能超过1mb', 'error', 1500)
        return
      }
      return passed
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
      // beforeUpload,
      handleFileUploaded,
      onFileUploadedError,
      uploadCheck
    }
  }
})
</script>

<style>
.create-post-page .file-upload-container {
  height: 200px;
  cursor: pointer;
}
.create-post-page .file-upload-container img{
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
