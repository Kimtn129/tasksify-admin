import * as yup from 'yup'
export const schema = yup.object({
  notification_type: yup.string().required('Notification type is required'),
  message: yup.string().required('Notification message is required'),
  title: yup.string().required('Title is required'),
  remind_start: yup.string().required('Start date is required'),
  remind_end: yup.string().required('End date is required')
})
