<template>
  <div class="create-post-page container">
    <h4>新建文章</h4>
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
import { defineComponent, ref } from 'vue'
import { GlobalDataProps, PostProps } from '@/store'
import ValidateForm from '@/components/ValidateForm.vue'
import ValidateInput, { RulesProp } from '@/components/ValidateInput.vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

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
    const router = useRouter()

    const onFormSubmit = (result: number) => {
      if (result) {
        const { columnId } = store.state.user
        if (columnId) {
          const newPost: PostProps = {
            _id: '12345',
            title: titleVal.value,
            content: contentVal.value,
            columnId: columnId + '',
            createdAt: new Date().toLocaleString()
          }
          store.commit('createPost', newPost)
          router.push({ name: 'columnDetail', params: { id: columnId } })
        }
      }
    }

    return {
      titleVal,
      contentVal,
      titleRules,
      contentRules,
      onFormSubmit
    }
  }
})
</script>

<style scoped>
</style>
