import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

// Check if Firebase is properly configured
const isFirebaseConfigured = () => {
  const requiredVars = [
    'VITE_API_KEY',
    'VITE_AUTH_DOMAIN', 
    'VITE_PROJECT_ID',
    'VITE_STORAGE_BUCKET',
    'VITE_MESSAGING_SENDER_ID',
    'VITE_APP_ID'
  ]
  
  return requiredVars.every(varName => {
    const value = import.meta.env[varName]
    return value && value !== 'your_firebase_api_key_here' && value !== 'your_project.firebaseapp.com'
  })
}

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID
}

let app = null
let auth = null

export const setupFirebase = () => {
  if (!isFirebaseConfigured()) {
    console.warn('Firebase configuration is incomplete. Please update your environment variables.')
    return null
  }
  
  try {
    app = initializeApp(firebaseConfig)
    auth = getAuth(app)
    return app
  } catch (error) {
    console.error('Firebase initialization failed:', error)
    return null
  }
}

export { auth }
