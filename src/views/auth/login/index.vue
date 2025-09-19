<script setup>
import { onMounted } from 'vue'
import { useForm } from 'vee-validate'
import { useRouter, useRoute } from 'vue-router'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth, setupFirebase } from '@config/firebase.config'

import { useAuthStore } from '@store'
import { useToast } from '@composables/useToast'
import { authService } from '@service/auth.service'
import { setAuthToken, setStorage } from '@helpers/storage.helper'
import { USER_PROFILE_INFOR } from '@constants/storage.constant'
import { loginSchema } from './loginSchema'

import FormItemInput from '@components/form-item/FormItemInput.vue'
import InputPassword from '@components/InputPassword.vue'
import { Button } from '@common'
import Wrapper from '../Wrapper.vue'
import { apiClient } from '@helpers/fetch.helper'

const toast = useToast()
const route = useRoute()
const { mutateAsync: login, isLoading } = authService.login()
const router = useRouter()
const { login: loginStore } = useAuthStore()
const { handleSubmit } = useForm({
  validationSchema: loginSchema,
  initialValues: {
    user_email: '',
    user_password: ''
  }
})

onMounted(async () => {
  // Ensure Firebase is initialized
  if (!auth) {
    setupFirebase()
  }
  
  const token = route?.query?.token
  if (token) {
    setAuthToken(token)
    await apiClient
      .get('/api/account', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        setStorage(USER_PROFILE_INFOR, response.data?.data?.user)
        loginStore()
        router.push({ path: '/' })
      })
      .catch((error) => toast.danger(error?.data?.error || 'Failed to login'))
  }
})

const handleEmailPasswordLogin = handleSubmit(async (values) => {
  if (!auth) {
    toast.danger('Firebase authentication is not properly configured')
    return
  }
  
  const userCredential = await signInWithEmailAndPassword(
    auth,
    values.user_email,
    values.user_password
  )
  const idToken = await userCredential.user.getIdToken()
  login({ bodyPayload: { idToken } })
    .then((response) => {
      if (response.data?.data?.token) {
        setAuthToken(response.data.data.token, response.data.data.refresh_token)
        setStorage(USER_PROFILE_INFOR, response.data.data)
        loginStore()
        router.push({ path: '/' })
      }
    })
    .catch((error) => {
      toast.danger(error?.data?.error || 'Failed to login')
    })
})
</script>

<template>
  <Wrapper>
    <template #content>
      <form
        class="flex flex-col justify-center w-[520px] min-h-[650px] max-h-full px-[95px] gap-6 rounded-[32px] bg-background"
      >
        <p class="text-2xl font-bold mb-4 text-center">Log In</p>
        <FormItemInput
          class="border border-grey-400"
          name="user_email"
          placeholder="example@mail.com"
          clearable
        />
        <FormItemInput
          v-slot="{ componentField, errorMessage: passwordErrorMessage }"
          name="user_password"
        >
          <InputPassword
            placeholder="********"
            v-bind="componentField"
            :is-error="!!passwordErrorMessage"
          />
        </FormItemInput>
        <div class="flex items-center justify-end">
          <RouterLink to="/user/forgot-password" class="text-secondary underline mb-2">
            Forgot password?
          </RouterLink>
        </div>
        <Button
          type="submit"
          variant="destructive"
          class="h-[44px] text-center font-semibold"
          :loading="isLoading"
          :disabled="isLoading"
          @click="handleEmailPasswordLogin"
        >
          Log In
        </Button>
      </form>
    </template>
  </Wrapper>
</template>
