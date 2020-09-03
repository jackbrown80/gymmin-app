import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  Keyboard,
  Alert,
  Button,
  SafeAreaView,
} from 'react-native'
import HeaderBackButton from '@react-navigation/stack'
import appStyles from '../styles'
import { Ionicons } from '@expo/vector-icons'
import { firebase } from '../firebase/config'
import WorkoutCard from '../components/WorkoutCard'
import CreateHeader from '../components/CreateHeader'
import ExerciseCard from '../components/ExerciseCard'
import { withFirebaseHOC } from '../firebase'

const CreateWorkout = ({ navigation }) => {
  const [exercises, setExercises] = React.useState([])
  const [completeSets, setCompleteSets] = React.useState([])

  let setsRef
  let exerciseRef

  console.log('nav:', navigation)

  const savePressed = () => {
    Alert.prompt(
      'Enter workout name',
      `For example, "Chest & Triceps" or "Back & Biceps"`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Save',
          onPress: (workoutName) => {
            // const timestamp = firebase.firestore.FieldValue.serverTimestamp()
            const workout = {
              name: workoutName,
              exercises: exercises,
              created: timestamp,
            }
            workoutRef
              .add(workout)
              .then((_doc) => {
                navigation.navigate('Workouts')
              })
              .catch((error) => {
                alert(error)
              })
          },
        },
      ],
    )
  }

  const deleteExercise = (id) => {
    setExercises((prevExercises) => {
      return prevExercises.filter((exercise) => exercise.id != id)
    })
  }

  return (
    <View style={styles.container}>
      <CreateHeader setExercises={setExercises}></CreateHeader>
      <View style={styles.exercises}>
        <Text style={styles.subtitle}>Exercises</Text>
        <FlatList
          data={exercises}
          renderItem={({ item }) => (
            <ExerciseCard
              style={styles.exerciseCard}
              name={item.name}
              sets={item.sets.count}
              v
              deleteExercise={deleteExercise}
              id={item.id}
            ></ExerciseCard>
          )}
        />
      </View>
    </View>
  )
}

export default withFirebaseHOC(CreateWorkout)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appStyles.secondaryColour,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: appStyles.tertiaryColour,
    marginTop: 10,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: '600',
    color: appStyles.tertiaryColour,
    marginTop: 20,
    marginBottom: 10,
    color: 'black',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  exerciseNameInput: {
    height: 40,
    backgroundColor: 'white',
    width: '75%',
    borderRadius: 5,
    fontSize: 20,
    paddingHorizontal: 10,
  },
  setsInput: {
    height: 40,
    backgroundColor: 'white',
    width: '20%',
    borderRadius: 5,
    paddingHorizontal: 10,
    textAlign: 'center',
    fontSize: 20,
  },
  addButton: {
    marginTop: 10,
    backgroundColor: appStyles.ctaColour,
    borderRadius: 5,
    height: 40,
    justifyContent: 'center',
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 23,
    fontWeight: '700',
    marginLeft: 10,
  },
  exerciseNameLabel: {
    width: '75%',
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  setsLabel: { width: '20%', color: 'white', fontSize: 18, fontWeight: '600' },
  exerciseCard: {
    marginBottom: 15,
  },
  exercises: {
    paddingHorizontal: appStyles.leftHeaderPadding,
  },
})
