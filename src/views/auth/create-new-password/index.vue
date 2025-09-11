<script setup>
import { onMounted, ref } from 'vue'
import { useForm } from 'vee-validate'
import { useRoute, useRouter } from 'vue-router'

import { authService } from '@service'
import { useToast } from '@composables/useToast'
import Icon from '@components/Icon.vue'
import Wrapper from '../Wrapper.vue'
import InputText from '@components/inputText/index.vue'
import { Button } from '@common/ui/button'
import { validationSchema } from './schema'

const successSetPassword = ref(false)

const route = useRoute()
const router = useRouter()
const toast = useToast()
const token = route.query.token

const { mutateAsync: setPassword, isLoading } = authService.setPassword()

const { handleSubmit } = useForm({
  validationSchema,
  initialValues: {
    password: '',
    confirm_password: ''
  }
})

const onSubmit = handleSubmit(async (values) => {
  await setPassword({ bodyPayload: { password: values?.password, token } })
    .then((response) => {
      toast.success(response?.data?.message || 'Password has been set successfully')
      successSetPassword.value = true
      router.push({ path: '/user/login' })
    })
    .catch((error) => {
      toast.danger(error?.data?.error || 'Failed to set password')
    })
})
</script>

<template>
  <Wrapper>
    <template #content>
      <form
        @submit="onSubmit"
        class="flex flex-col w-[520px] min-h-[650px] gap-2 rounded-[32px] bg-background py-10 justify-between"
      >
        <div class="flex flex-col items-center">
          <h1 class="text-[24px] font-bold">
            {{ !successResetPassword ? 'Create New Password' : 'Password Updated!' }}
          </h1>
          <p class="text-base font-medium max-w-[328px] text-center mt-4">
            {{ !successResetPassword ? '' : 'Please sign in to your account' }}
          </p>
          <!-- Email -->
          <div v-if="!successResetPassword" class="w-[60%] mt-10 mb-8 flex flex-col gap-5">
            <InputText type="password" name="password" placeholder="Enter new password" />
            <InputText type="password" name="confirm_password" placeholder="Confirm new password" />
          </div>
          <Button
            v-if="!successResetPassword"
            :loading="isLoading"
            type="submit"
            variant="destructive"
            class="w-[60%] h-[44px] text-center font-semibold"
          >
            Create Password
          </Button>
          <Button
            v-else
            type="button"
            variant="destructive"
            class="w-[60%] h-[44px] text-center font-semibold mt-10"
            @click="() => router.push({ path: '/user/login' })"
          >
            Go to Sign In
          </Button>
        </div>
        <div></div>
      </form>
    </template>
  </Wrapper>
</template>
