<template>
  <div class="login-page mx-auto p-3 w-330">
    <h5 class="my-4 text-center">登录到者也</h5>
    <validate-form @form-submit="onFormSubmit" ref="formRef">
      <div class="mb-3">
        <label class="form-label">邮箱地址</label>
        <validate-input
          :rules="emailRules"
          v-model="emailVal"
          placeholder="请输入邮箱地址"
          type="text"
          ref="inputRef"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">密码</label>
        <validate-input
          type="password"
          placeholder="请输入密码"
          :rules="passwordRules"
          v-model="passwordVal"
        />
      </div>
      <template #submit>
        <button type="submit" class="btn btn-primary btn-block btn-large">
          登录
        </button>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import createMessage from '@/components/createMessage'
import ValidateForm from '@/components/ValidateForm.vue'
import ValidateInput, { RulesProp } from '@/components/ValidateInput.vue'

export default defineComponent({
  components: {
    ValidateInput,
    ValidateForm
  },
  setup () {
    const emailVal = ref('slybootslion@vip.qq.com')
    const router = useRouter()
    const emailRules: RulesProp = [
      { type: 'required', message: '电子邮箱地址不能为空' },
      { type: 'email', message: '请输入正确的电子邮箱格式' }
    ]
    const passwordVal = ref('123123')
    const passwordRules: RulesProp = [
      { type: 'required', message: '密码不能为空' }
    ]

    const store = useStore()
    const formRef = ref<null | Ref>(null)
    const onFormSubmit = (result: boolean) => {
      if (result) {
        formRef.value.clearInputsVal()
        // store.commit('login')
        store
          .dispatch('loginAndFetch', {
            email: emailVal.value,
            password: passwordVal.value
          })
          .then(() => {
            const timeTag = 1000
            createMessage(
              `登录成功, ${timeTag / 1000}秒后跳转首页`,
              'success',
              timeTag
            )
            setTimeout(() => router.push('/'), timeTag)
          })
          .catch(console.log)
      }
    }
    return {
      emailVal,
      emailRules,
      passwordVal,
      passwordRules,
      onFormSubmit,
      formRef
    }
  }
})
</script>

<style scoped>
.w-330 {
  width: 330px;
}
</style>
