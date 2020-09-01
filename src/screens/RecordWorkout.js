import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  Keyboard,
  ScrollView,
  Button,
  AsyncStorage
} from 'react-native'
import HeaderBackButton from '@react-navigation/stack'
import appStyles from '../styles'
import { Ionicons } from '@expo/vector-icons'
import { firebase } from '../firebase/config'
import WorkoutCard from '../components/WorkoutCard'
import RecordExerciseCard from '../components/RecordExerciseCard'
import { withFirebaseHOC } from '../firebase'

const RecordWorkout = ({ firebase, navigation }) => {
  const { workoutId } = navigation.state.params

  const [loading, setLoading] = React.useState(true)
  const [exercises, setExercises] = React.useState(null)
  const [recordedSets, setRecordedSets] = React.useState({})

  React.useEffect(() => {
    firebase
      .getExercisesByWorkoutId(workoutId)
      .then((response) => {
        setLoading(false)
        setExercises(response)
      })
      .catch((error) => console.error(error))
  }, [])

  React.useEffect(() => {
    console.log(recordedSets)
  }, [recordedSets])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Test</Text>
      {exercises ? (
        <FlatList
          data={exercises}
          renderItem={({ item }) => {
            return (
              <RecordExerciseCard
                key={item.id}
                workoutId={workoutId}
                exerciseId={item.id}
                name={item.name}
                setRecordedSets={setRecordedSets}
                recordedSets={recordedSets}
              ></RecordExerciseCard>
            )
          }}
        />
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  )
}

export default withFirebaseHOC(RecordWorkout)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appStyles.primaryColour,
    paddingHorizontal: 16
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
    color: appStyles.tertiaryColour,
    marginTop: 10,
    marginBottom: 20
  },
  subtitle: {
    fontSize: 30,
    fontWeight: '600',
    color: appStyles.tertiaryColour,
    marginTop: 20,
    marginBottom: 10
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  exerciseNameInput: {
    height: 40,
    backgroundColor: 'white',
    width: '75%',
    borderRadius: 5,
    fontSize: 20,
    paddingHorizontal: 10
  },
  setsInput: {
    height: 40,
    backgroundColor: 'white',
    width: '20%',
    borderRadius: 5,
    paddingHorizontal: 10,
    textAlign: 'center',
    fontSize: 20
  },
  addButton: {
    marginTop: 10,
    backgroundColor: appStyles.ctaColour,
    borderRadius: 5,
    height: 40,
    justifyContent: 'center',
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center'
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 23,
    fontWeight: '700',
    marginLeft: 10
  },
  exerciseNameLabel: {
    width: '75%',
    color: 'white',
    fontSize: 18,
    fontWeight: '600'
  },
  setsLabel: { width: '20%', color: 'white', fontSize: 18, fontWeight: '600' },
  exerciseCard: {
    marginBottom: 15
  }
})
