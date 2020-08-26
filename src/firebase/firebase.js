import * as firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import firebaseConfig from './config'

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const Firebase = {
  // auth
  signInWithEmail: (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
  },
  signUpWithEmail: (email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
  },
  signOut: () => {
    return firebase.auth().signOut()
  },
  checkUserAuth: (user) => {
    return firebase.auth().onAuthStateChanged(user)
  },

  // firestore
  createNewUser: (userData) => {
    return firebase
      .firestore()
      .collection('users')
      .doc(`${userData.uid}`)
      .set(userData)
  },

  getWorkouts: async (uid) => {
    const ref = firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .collection('workouts')
    const snapshot = await ref.get()
    const workouts = []

    snapshot.forEach((doc) => {
      workouts.push({ id: doc.id, ...doc.data() })
    })

    return workouts
  }
}

export default Firebase
