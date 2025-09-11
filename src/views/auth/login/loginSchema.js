import * as yup from 'yup'

export const loginSchema = yup.object({
  user_email: yup.string().required('User email is required').email('Email format is not correct'),
  user_password: yup.string().required('User password is required')
})
