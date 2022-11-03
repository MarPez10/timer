import React from 'react'
import ReactDOM from 'react-dom/client'
import './normalize.css'
import './index.css'
import { App } from './App'
import { BrowserRouter } from 'react-router-dom'
// import firebase from 'firebase/app'
// import 'firebase/firestore'
// import 'firebase/auth'
// import { initializeApp } from 'firebase/app'
// // import { Provider } from 'react-redux'
// import { getAuth } from 'firebase/auth'

// import { store } from './redux'
// import { Provider } from 'react-redux'

// const firebaseConfig = {
//   apiKey: 'AIzaSyA2IRZaIKdpuTQtwtZh7aDCLtNnmntlJec',
//   authDomain: 'marpez-timer.firebaseapp.com',
//   projectId: 'marpez-timer',
//   storageBucket: 'marpez-timer.appspot.com',
//   messagingSenderId: '22608629878',
//   appId: '1:22608629878:web:d6259c30ddf3ebe3accf57'
// }
// const app = initializeApp(firebaseConfig)
// export const auth = getAuth(app)

export const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <BrowserRouter>
        {/* <Provider store={store}> */}
          <App />
        {/* </Provider> */}
    </BrowserRouter>
)
