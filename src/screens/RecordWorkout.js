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
  AsyncStorage,
} from 'react-native'
import HeaderBackButton from '@react-navigation/stack'
import appStyles from '../styles'
import { Ionicons } from '@expo/vector-icons'
import { firebase } from '../firebase/config'
import WorkoutCard from '../components/WorkoutCard'
import RecordExerciseCard from '../components/RecordExerciseCard'
import { withFirebaseHOC } from '../firebase'
import RecordHeader from '../components/RecordHeader'

const RecordWorkout = ({ firebase, navigation }) => {
  const { workoutId } = navigation.state.params
  const { title } = navigation.state.params

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

  return (
    <View style={styles.container}>
      <RecordHeader navigation={navigation}></RecordHeader>
      <Text style={styles.title}>{title}</Text>
      {exercises ? (
        <FlatList
          data={exercises}
          style={styles.list}
          renderItem={({ item }) => {
            return (
              <RecordExerciseCard
                key={item.id}
                workoutId={workoutId}
                exerciseId={item.id}
                name={item.name}
                item={item}
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
    backgroundColor: appStyles.secondaryColour,
  },
  title: {
    fontSize: 22,
    marginTop: 20,
    fontWeight: '700',
    color: appStyles.primaryColour,
    paddingLeft: appStyles.leftHeaderPadding,
  },
  subtitle: {
    fontSize: 30,
    fontWeight: '600',
    color: appStyles.tertiaryColour,
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
  list: {
    paddingHorizontal: appStyles.cardPadding,
  },
})
