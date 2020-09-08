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

  getWorkouts: async () => {
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
  },

  getExercisesByWorkoutId: async (id) => {
    const ref = firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .collection('workouts')
      .doc(id)
      .collection('exercises')
    const snapshot = await ref.get()
    const exercises = []

    snapshot.forEach((doc) => {
      exercises.push({ id: doc.id, ...doc.data() })
    })

    return exercises
  },

  getSetsByWorkoutIdAndExerciseId: async (workoutId, exerciseId) => {
    const ref = firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .collection('workouts')
      .doc(workoutId)
      .collection('exercises')
      .doc(exerciseId)
      .collection('set-details')
    const snapshot = await ref.get()
    const sets = []

    snapshot.forEach((doc) => {
      sets.push({ id: doc.id, ...doc.data() })
    })

    return sets.sort(function (a, b) {
      var x = a.setIndex,
        y = b.setIndex

      return x < y ? -1 : x > y ? 1 : 0
    })
  },

  addWorkout: async (exercises, workoutName) => {
    const workoutRef = await firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .collection('workouts')
      .add({
        name: workoutName,
      })

    exercises.forEach(async (exercise) => {
      const exerciseRef = await firebase
        .firestore()
        .collection('users')
        .doc(firebase.auth().currentUser.uid)
        .collection('workouts')
        .doc(workoutRef.id)
        .collection('exercises')
        .add({
          name: exercise.name,
          sets: exercise.sets,
        })

      for (let index = 0; index < exercise.sets; index++) {
        firebase
          .firestore()
          .collection('users')
          .doc(firebase.auth().currentUser.uid)
          .collection('workouts')
          .doc(workoutRef.id)
          .collection('exercises')
          .doc(exerciseRef.id)
          .collection('set-details')
          .add({
            setIndex: index + 1,
            weight: 'NA',
            reps: 'NA',
          })
      }
    })
  },
}

export default Firebase
