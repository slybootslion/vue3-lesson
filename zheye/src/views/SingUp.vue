<template>
  <div class="login-page mx-auto p-3 w-330">
    <h5 class="my-4 text-center">注册新用户</h5>
    <validate-form @form-submit="onFormSubmit" ref="formRef">
      <div class="mb-3">
        <label class="form-label">邮箱地址</label>
        <validate-input
          :rules="emailRules"
          v-model="formData.email"
          placeholder="请输入邮箱地址"
          type="text"
          ref="inputRef"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">昵称</label>
        <validate-input
          :rules="requiredRules('昵称')"
          v-model="formData.nickName"
          placeholder="请输入昵称"
          type="text"
          ref="inputRef"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">密码</label>
        <validate-input
          type="password"
          v-model="formData.password"
          placeholder="请输入密码"
          :rules="requiredRules('密码')"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">确认密码</label>
        <validate-input
          type="password"
          v-model="formData.repeatPassword"
          placeholder="请输入确认密码"
          :rules="repeatPasswordRules"
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
import { defineComponent, reactive, Ref, ref } from 'vue'
import ValidateForm from '@/components/ValidateForm.vue'
import ValidateInput, { RulesProp } from '@/components/ValidateInput.vue'
import axios from 'axios'
import createMessage from '@/components/createMessage'
import { useRouter } from 'vue-router'

export default defineComponent({
  components: {
    ValidateInput, ValidateForm
  },
  setup () {
    const formData = reactive({
      email: 'slybootslion@vip.qq.com',
      nickName: 'SlybootsLion',
      password: '123123',
      repeatPassword: '123123'
    })
    // const refFormData = toRefs(formData)
    const emailRules: RulesProp = [
      { type: 'required', message: '电子邮箱地址不能为空' },
      { type: 'email', message: '请输入正确的电子邮箱格式' }
    ]
    const requiredRules = (label: string) => {
      return [{ type: 'required', message: `${label}不能为空` }]
    }

    const repeatPasswordRules: RulesProp = [
      { type: 'required', message: '确认密码不能为空' },
      { type: 'custom', message: '两遍密码不一致', validator: () => formData.password === formData.repeatPassword }
    ]
    const formRef = ref<null | Ref>(null)
    const router = useRouter()
    const onFormSubmit = (result: boolean) => {
      if (result) {
        const data = { ...formData }
        axios.post('/users', data).then(res => {
          if (res.data._id) createMessage('注册成功', 'success', 1500)
          router.push('/login')
        }).catch(err => {
          createMessage(err, 'error', 150000)
        })
      }
    }
    return {
      formData,
      emailRules,
      requiredRules,
      repeatPasswordRules,
      formRef,
      onFormSubmit
    }
  }
})
</script>

<style scoped>
.w-330 {
  width: 330px;
}
</style>
