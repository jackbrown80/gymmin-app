import React from 'react'
import { StyleSheet, Text, View, Alert, TouchableOpacity } from 'react-native'
import appStyles from '../styles'

const ExerciseCard = ({ name, sets, deleteExercise, id }) => {
  return (
    <TouchableOpacity
      onLongPress={() =>
        Alert.alert(
          'Delete Exercise',
          'Are you sure you want to delete this exercise? This cannot be undone',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Delete',
              onPress: () => deleteExercise(id),
              style: 'destructive',
            },
          ],
        )
      }
    >
      <View style={styles.container}>
        <Text style={styles.exerciseName}>{name}</Text>
        <View style={styles.border}></View>
        <Text style={styles.sets}>{sets}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 25,
    backgroundColor: appStyles.tertiaryColour,
    borderRadius: 10,
    height: 70,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 1,
    paddingHorizontal: 15,
  },
  exerciseName: {
    width: '70%',
    fontSize: 20,
    fontWeight: '500',
    color: '#333333',
  },
  sets: {
    width: '30%',
    fontSize: 20,
    fontWeight: '500',
    color: '#333333',
    textAlign: 'center',
  },
  border: {
    borderWidth: 1,
    height: '60%',
    borderRadius: 20,
    borderColor: '#e8e8e8',
  },
})

export default ExerciseCard
