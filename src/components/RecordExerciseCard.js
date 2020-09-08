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

const RecordExerciseCard = ({
  name,
  firebase,
  exerciseId,
  workoutId,
  setRecordedSets,
  recordedSets,
  item,
}) => {
  const [loading, setLoading] = React.useState(true)
  const [sets, setSets] = React.useState(null)

  React.useEffect(() => {
    firebase
      .getSetsByWorkoutIdAndExerciseId(workoutId, exerciseId)
      .then((response) => {
        setLoading(false)
        setSets(response)
      })
      .catch((error) => console.error(error))
  }, [])

  const recordValue = (value, i, name) => {
    console.log(i)
    let prevState = { ...recordedSets }
    if (!prevState[id]) prevState[id] = {}
    prevState[id][name] = value
    setRecordedSets(prevState)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.exerciseName}>{name}</Text>
      <View style={styles.headerRow}>
        <Text style={styles.header}>Set</Text>
        <Text style={styles.header}>Reps</Text>
        <Text style={styles.header2}>Weight</Text>
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
                    recordValue(value, item.id, 'prevWeight')
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
    width: '80%',
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
    marginBottom: 10,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  header: {
    flex: 2,
    textAlign: 'center',
  },
  header2: {
    flex: 3,
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
    flex: 2,
    textAlign: 'center',
  },
  reps: {
    flex: 2,
    textAlign: 'center',
  },
  newWeight: {
    flex: 3,
    textAlign: 'center',
  },
})
