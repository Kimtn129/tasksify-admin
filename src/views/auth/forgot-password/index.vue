<script setup>
import { ref, onUnmounted, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useForm } from 'vee-validate'
import * as yup from 'yup'

import { authService } from '@service'
import { useToast } from '@composables/useToast'
import Icon from '@components/Icon.vue'
import Wrapper from '../Wrapper.vue'
import IconBack from '@assets/icons/icon-back.svg'
import InputText from '@components/inputText/index.vue'
import { Button } from '@common/ui/button'

const validationSchema = yup.object({
  user_email: yup.string().required('Required').email('Invalid email format')
})

const checkEmailReset = ref(false)
const countdownTime = ref()
const countdownTimer = ref(null)

const router = useRouter()
const route = useRoute()
const toast = useToast()

const { mutateAsync: forgotPassword, isLoading: isLoadingForgotPassword } =
  authService.forgotPassword()

const { handleSubmit, setFieldError } = useForm({
  validationSchema,
  initialValues: {
    user_email: ''
  }
})

onMounted(() => {
  if (route.query.checkEmailReset === 'true' && route.query.user_email) {
    checkEmailReset.value = true
    startCountdown()
  }
})

onUnmounted(() => {
  if (countdownTimer.value) {
    clearInterval(countdownTimer.value)
  }
})

const startCountdown = () => {
  countdownTime.value = 59
  countdownTimer.value = setInterval(() => {
    if (countdownTime.value > 0) {
      countdownTime.value -= 1
    } else {
      clearInterval(countdownTimer.value)
    }
  }, 1000)
}

const sendResetEmail = async (email) => {
  await forgotPassword({ bodyPayload: { user_email: email } })
    .then((response) => {
      toast.success(response?.data?.message || 'Success, please check your email')
      checkEmailReset.value = true
      router.push({
        query: {
          user_email: email,
          checkEmailReset: true
        }
      })
      startCountdown()
    })
    .catch((error) => {
      setFieldError('user_email', error?.data?.error)
    })
}

const onSubmit = handleSubmit(async (values) => {
  await sendResetEmail(values.user_email)
})

const resendLink = async () => {
  if (countdownTime.value === 0 && checkEmailReset.value) {
    await sendResetEmail(route.query.user_email)
  }
}
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
            {{ !checkEmailReset ? 'Reset Password' : 'Email Sent!' }}
          </h1>
          <p class="text-base font-medium max-w-[328px] text-center mt-4">
            {{
              !checkEmailReset
                ? 'Enter email address and we will send a link to reset your password'
                : 'Please check your inbox, we’ve sent password reset link to your email address'
            }}
          </p>
          <!-- Email -->
          <div class="w-[60%] mt-10 mb-8">
            <InputText v-if="!checkEmailReset" name="user_email" placeholder="example@mail.com" />
            <div class="text-sm text-[#313131] font-medium mx-auto text-center translate-y-5">
              <span v-if="checkEmailReset"> Didn’t receive email?</span>
              <span v-if="countdownTime > 0 && checkEmailReset">
                <span> Resend link in</span>
                <span class="text-red-400 font-bold ml-1"
                  >00:{{ countdownTime.toString().padStart(2, '0') }}</span
                ></span
              >
            </div>
          </div>
          <Button
            v-if="!checkEmailReset"
            :loading="isLoadingForgotPassword"
            type="submit"
            variant="destructive"
            class="w-[60%] h-[44px] text-center font-semibold"
          >
            Reset Password
          </Button>
          <Button
            v-else
            type="submit"
            variant="destructive"
            :class="countdownTime > 0 ? 'bg-gray-500 text-white' : ''"
            class="w-[60%] h-[44px] text-center font-semibold"
            :disabled="countdownTime > 0"
            @click="resendLink"
          >
            Resend Link
          </Button>
        </div>
        <RouterLink
          to="/user/login"
          class="text-destructive font-bold flex gap-2 items-center justify-center"
        >
          <IconBack />
          Back to Login
        </RouterLink>
      </form>
    </template>
  </Wrapper>
</template>
