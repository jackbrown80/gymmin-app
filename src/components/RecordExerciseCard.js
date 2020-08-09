import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  TextInput,
} from 'react-native'
import appStyles from '../styles'

const RecordExerciseCard = ({ name, sets }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.exerciseName}>{name}</Text>
      <View style={styles.headerRow}>
        <Text style={styles.header}>Set</Text>
        <Text style={styles.header}>Reps</Text>
        <Text style={styles.header2}>Weight</Text>
      </View>
      {sets.sets.map((set) => (
        <View key={set.set} style={styles.setContainer}>
          <View style={styles.divider}></View>
          <View style={styles.setRow}>
            <Text style={styles.setIndex}>{set.set}</Text>
            <TextInput
              style={styles.reps}
              placeholder={!sets.reps ? 'NA' : sets.reps}
              keyboardType="number-pad"
            ></TextInput>
            <TextInput
              style={styles.newWeight}
              placeholder={!sets.prevWeight ? 'NA' : sets.prevWeight}
            ></TextInput>
          </View>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: appStyles.secondaryColour,
    borderRadius: 10,
    shadowColor: '#000',
    marginBottom: 20,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    paddingHorizontal: 15,
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

export default RecordExerciseCard
