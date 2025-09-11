import { useBreakpoints } from '@vueuse/core'

export const useScreen = () => {
  const breakpoints = useBreakpoints({
    sm: 375,
    md: 768,
    lg: 1024
  })

  const current = breakpoints.current()
  const sm = breakpoints.greaterOrEqual('sm')
  const md = breakpoints.greaterOrEqual('md')
  const lg = breakpoints.greaterOrEqual('lg')

  return {
    current,
    sm,
    md,
    lg
  }
}
