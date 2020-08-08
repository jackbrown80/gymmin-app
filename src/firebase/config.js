import * as firebase from 'firebase'
import '@firebase/auth'
import '@firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCKfD_kFjTD-Ofz7rv-3SWl01GbE4Nx1kU',
  authDomain: 'gymmin-app1.firebaseapp.com',
  databaseURL: 'https://gymmin-app1.firebaseio.com/',
  projectId: 'gymmin-app1',
  storageBucket: 'gymmin-app1.appspot.com',
  messagingSenderId: '244562203175',
  appId: '1:244562203175:ios:d7a3d0efc2b40191a9b402',
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export { firebase }
