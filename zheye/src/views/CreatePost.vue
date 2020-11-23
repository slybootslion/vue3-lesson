<template>
  <div class="create-post-page container">
    <h4>新建文章</h4>
    <input type="file" @change="handleFileChange" />
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
import { GlobalDataProps, PostProps } from '@/store'
import ValidateForm from '@/components/ValidateForm.vue'
import ValidateInput, { RulesProp } from '@/components/ValidateInput.vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import axios from 'axios'

export default defineComponent({
  components: {
    ValidateForm,
    ValidateInput
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

    const handleFileChange = (e: Event) => {
      const target = e.target as HTMLInputElement
      const file = target.files && target.files[0]
      if (file) {
        const formData = new FormData()
        formData.append(file.name, file)
        axios.post('/upload', formData, {
          headers: {
            'Content-Type': 'mutipart/form-data'
          }
        }).then(console.log)
      }
    }

    return {
      titleVal,
      contentVal,
      titleRules,
      contentRules,
      onFormSubmit,
      handleFileChange
    }
  }
})
</script>

<style scoped>
</style>
