import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyA2IRZaIKdpuTQtwtZh7aDCLtNnmntlJec',
  authDomain: 'marpez-timer.firebaseapp.com',
  projectId: 'marpez-timer',
  storageBucket: 'marpez-timer.appspot.com',
  messagingSenderId: '22608629878',
  appId: '1:22608629878:web:d6259c30ddf3ebe3accf57'
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const storage = getStorage(app)
export const auth = getAuth(app)
