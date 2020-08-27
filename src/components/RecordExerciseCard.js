import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  FlatList,
  TextInput
} from 'react-native'
import appStyles from '../styles'
import { withFirebaseHOC } from '../firebase'

const RecordExerciseCard = ({ name, firebase, exerciseId, workoutId }) => {
  const refObj = {}
  const [loading, setLoading] = React.useState(true)
  const [sets, setSets] = React.useState()

  React.useEffect(() => {
    firebase
      .getSetsByWorkoutIdAndExerciseId(workoutId, exerciseId)
      .then((response) => {
        setLoading(false)
        setSets(response)
      })
      .catch((error) => console.log(error))
  }, [])

  React.useEffect(() => {
    if (sets) {
      sets.forEach((key) => {
        refObj[`reps${key.set}`] = null
        refObj[`weight${key.set}`] = null
      })
    }
  }, [sets])

  // const recordValue = (value, set, name) => {
  //   const i = set - 1
  //   let prevNewSetsArr = [...newSetsArr]
  //   prevNewSetsArr[i][name] = value
  //   setNewSetsArr(prevNewSetsArr)
  // }

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
            <View key={item.set} style={styles.setContainer}>
              <View style={styles.divider}></View>
              <View style={styles.setRow}>
                <Text style={styles.setIndex}>{item.setIndex}</Text>
                <TextInput
                  style={styles.reps}
                  placeholder={String(item.reps)}
                  keyboardType="number-pad"
                  ref={(ref) => {
                    refObj[`reps${item.set}`] = ref
                  }}
                  onChangeText={(value) => recordValue(value, item.set, 'reps')}
                ></TextInput>
                <TextInput
                  style={styles.newWeight}
                  placeholder={String(item.prevWeight)}
                  onChangeText={(value) =>
                    recordValue(value, item.set, 'prevWeight')
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
    backgroundColor: appStyles.secondaryColour,
    borderRadius: 10,
    shadowColor: '#000',
    marginBottom: 20,
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  exerciseName: {
    width: '80%',
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
    marginBottom: 10
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  header: {
    flex: 2,
    textAlign: 'center'
  },
  header2: {
    flex: 3,
    textAlign: 'center'
  },
  divider: {
    borderBottomColor: '#EEEEEE',
    borderBottomWidth: 1
  },
  setRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 9
  },
  setIndex: {
    flex: 2,
    textAlign: 'center'
  },
  reps: {
    flex: 2,
    textAlign: 'center'
  },
  newWeight: {
    flex: 3,
    textAlign: 'center'
  }
})
