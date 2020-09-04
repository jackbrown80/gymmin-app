import React from 'react'
import { StyleSheet, Text, View, FlatList, Alert } from 'react-native'
import appStyles from '../styles'
import CreateHeader from '../components/CreateHeader'
import ExerciseCard from '../components/ExerciseCard'
import { withFirebaseHOC } from '../firebase'

const CreateWorkout = ({ navigation }) => {
  const [exercises, setExercises] = React.useState([])

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
      <CreateHeader
        setExercises={setExercises}
        exercises={exercises}
        navigation={navigation}
      ></CreateHeader>
      <Text style={styles.title}>Exercises</Text>
      <FlatList
        data={exercises}
        style={styles.list}
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
    marginTop: 20,
    fontWeight: '700',
    color: appStyles.primaryColour,
    paddingLeft: appStyles.leftHeaderPadding,
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
  list: {
    paddingHorizontal: appStyles.cardPadding,
  },
})
