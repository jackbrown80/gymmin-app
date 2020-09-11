import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native'
import appStyles from '../styles'
import { withFirebaseHOC } from '../firebase'
import SaveRecordButton from './SaveRecordButton'

const RecordExerciseCard = ({
  name,
  firebase,
  exerciseId,
  workoutId,
  recordedWorkout,
  setRecordedWorkout,
}) => {
  const [loading, setLoading] = React.useState(true)
  const [doSave, setDoSave] = React.useState(false)
  const [sets, setSets] = React.useState(null)
  const [recordedSets, setRecordedSets] = React.useState(null)

  React.useEffect(() => {
    firebase
      .getSetsByWorkoutIdAndExerciseId(workoutId, exerciseId)
      .then((response) => {
        setLoading(false)
        setSets(response)
        setRecordedSets(response)
      })
      .catch((error) => console.error(error))
  }, [])

  const recordValue = (value, i, name) => {
    let prevState = [...recordedSets]
    prevState[i - 1][name] = value
    setRecordedSets(prevState)
  }

  React.useEffect(() => {
    if (doSave) {
      const prevRecordedWorkout = { ...recordedWorkout }
      prevRecordedWorkout[exerciseId] = [...recordedSets]
      setRecordedWorkout(prevRecordedWorkout)
    }
  }, [doSave])

  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <Text style={styles.exerciseName}>{name}</Text>
        <SaveRecordButton setDoSave={setDoSave}></SaveRecordButton>
      </View>
      <View style={styles.headerRow}>
        <Text style={styles.header}>Set</Text>
        <Text style={styles.header}>Reps</Text>
        <Text style={styles.header}>Weight</Text>
      </View>
      {sets && (
        <FlatList
          data={sets}
          renderItem={({ item }) => (
            <View key={item.setIndex} style={styles.setContainer}>
              <View style={styles.divider}></View>
              <View style={styles.setRow}>
                <Text style={styles.setIndex}>{item.setIndex}</Text>
                <TextInput
                  style={styles.reps}
                  placeholder={String(item.reps)}
                  keyboardType="number-pad"
                  onChangeText={(value) =>
                    recordValue(value, item.setIndex, 'reps')
                  }
                ></TextInput>
                <TextInput
                  style={styles.newWeight}
                  placeholder={String(item.weight)}
                  onChangeText={(value) =>
                    recordValue(value, item.setIndex, 'weight')
                  }
                ></TextInput>
              </View>
            </View>
          )}
        />
      )}
    </View>
  )
}

export default withFirebaseHOC(RecordExerciseCard)

const styles = StyleSheet.create({
  container: {
    backgroundColor: appStyles.tertiaryColour,
    borderRadius: 10,
    marginTop: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 1,
    paddingHorizontal: appStyles.cardTitlePadding,
    paddingVertical: 10,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: '600',
    color: appStyles.primaryColour,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  header: {
    flex: 1,
    textAlign: 'center',
  },
  divider: {
    borderBottomColor: '#EEEEEE',
    borderBottomWidth: 1,
  },
  setRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 9,
  },
  setIndex: {
    flex: 1,
    textAlign: 'center',
  },
  reps: {
    flex: 1,
    textAlign: 'center',
  },
  newWeight: {
    flex: 1,
    textAlign: 'center',
  },
  completeButton: {
    width: 50,
    height: 25,
    borderRadius: 10,
    backgroundColor: '#27AE60',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 13,
    fontWeight: '600',
    color: 'white',
  },
})
