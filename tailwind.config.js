import {
  fontSize,
  colors,
  borderRadius,
  keyframes,
  animation,
  fontFamily,
  container,
  boxShadow,
  screens
} from './src/config/theme.js'

const animate = require('tailwindcss-animate')

/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: '',

  content: ['./index.html', './src/**/*.{js,jsx,vue}'],

  theme: {
    container,
    screens,
    extend: {
      fontSize,
      fontFamily,
      colors,
      borderRadius,
      keyframes,
      animation,
      boxShadow
    }
  },
  plugins: [animate]
}
