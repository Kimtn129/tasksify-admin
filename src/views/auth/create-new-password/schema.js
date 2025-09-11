import * as yup from 'yup'

export const validationSchema = yup.object({
  password: yup.string().required('Required').min(6, 'Password must be at least 6 characters'),
  confirm_password: yup
    .string()
    .required('Required')
    .oneOf([yup.ref('password')], 'Passwords do not match')
})
