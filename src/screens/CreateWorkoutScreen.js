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
} from 'react-native'
import HeaderBackButton from '@react-navigation/stack'
import appStyles from '../styles'
import { Ionicons } from '@expo/vector-icons'
import { firebase } from '../firebase/config'
import WorkoutCard from '../components/WorkoutCard'
import ExerciseCard from '../components/ExerciseCard'

export default CreateWorkoutScreen = ({ route, navigation }) => {
  const [exercises, setExercises] = React.useState([])
  const [exerciseName, setExerciseName] = React.useState('')
  const [sets, setSets] = React.useState('')
  const [completeSets, setCompleteSets] = React.useState([])

  const { user } = route.params

  let setsRef
  let exerciseRef

  const workoutRef = firebase
    .firestore()
    .collection(`/users/${user.id}/workouts`)

  React.useEffect(() => {
    navigation.setOptions({
      title: 'Create Workout',
      headerStyle: {
        backgroundColor: appStyles.primaryColour,
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTintColor: '#fff',
      headerRight: () => <Button onPress={() => savePressed()} title="Save" />,
    })

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
              const timestamp = firebase.firestore.FieldValue.serverTimestamp()
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
        ]
      )
    }
  })

  const deleteExercise = (id) => {
    setExercises((prevExercises) => {
      return prevExercises.filter((exercise) => exercise.id != id)
    })
  }

  const addExercise = () => {
    const isSetsEmpty = sets === ''
    const isNameEmpty = exerciseName === ''
    const isBothEmpty = isSetsEmpty && isNameEmpty
    const isInvalid = isSetsEmpty || isNameEmpty

    if (isInvalid) {
      let alertTitle = ''
      let alertMessage = ''
      isBothEmpty
        ? (alertTitle = 'Details')
        : isSetsEmpty
        ? (alertTitle = 'Sets')
        : (alertTitle = 'Exercise Name')

      Alert.alert(
        `Missing ${alertTitle}`,
        'Ensure you have provide a name for the exercise and the number of sets',
        [
          {
            text: 'Ok',
            style: 'normal',
          },
        ]
      )
    } else {
      const completeSets = {
        sets: [],
      }

      for (let index = 0; index < sets; index++) {
        const data = {
          set: index + 1,
          prevWeight: null,
          reps: null,
        }

        completeSets.sets.push(data)
      }
      setExercises((prevExercises) => {
        return [
          {
            id: Date.now().toString(),
            name: exerciseName,
            sets: { count: sets, ...completeSets },
          },
          ...prevExercises,
        ]
      })
      setSets('')
      setExerciseName('')

      Keyboard.dismiss()
    }
  }

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Create Workout</Text> */}
      <View style={styles.row}>
        <TextInput
          style={styles.exerciseNameInput}
          autoFocus={true}
          placeholder="Exercise Name"
          returnKeyType="next"
          onSubmitEditing={() => {
            setsRef.focus()
          }}
          ref={(ref) => {
            exerciseRef = ref
          }}
          onChangeText={(value) => setExerciseName(value)}
          value={exerciseName}
        />
        <TextInput
          style={styles.setsInput}
          keyboardType="number-pad"
          placeholder="Sets"
          ref={(ref) => {
            setsRef = ref
          }}
          returnKeyType="next"
          onChangeText={(value) => setSets(value)}
          value={sets}
        />
      </View>
      <TouchableOpacity style={styles.addButton} onPress={() => addExercise()}>
        <Ionicons name="ios-add" size={40} color="black" />
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>
      <Text style={styles.subtitle}>Exercises</Text>
      <FlatList
        data={exercises}
        renderItem={({ item }) => (
          <ExerciseCard
            style={styles.exerciseCard}
            name={item.name}
            sets={item.sets.count}
            deleteExercise={deleteExercise}
            id={item.id}
          ></ExerciseCard>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appStyles.primaryColour,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
    color: appStyles.secondaryColour,
    marginTop: 10,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 30,
    fontWeight: '600',
    color: appStyles.secondaryColour,
    marginTop: 20,
    marginBottom: 10,
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
})
