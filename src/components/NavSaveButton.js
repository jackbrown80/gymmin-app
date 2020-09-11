import * as React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import { withFirebaseHOC } from '../firebase'

const NavSaveButton = ({
  journey,
  exercises,
  recordedWorkout = {},
  firebase,
  navigation,
  workoutId,
}) => {
  const savePressed = () => {
    if (journey == 'record') {
      const exerciseKeys = exercises.map((exercise) => exercise.id)
      const recordedKeys = Object.keys(recordedWorkout)

      if (exerciseKeys.length == recordedKeys.length) {
        firebase.recordWorkout(recordedWorkout, workoutId)
        navigation.goBack()
      }
    } else {
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
              firebase.addWorkout(exercises, workoutName)
              navigation.goBack()
            },
          },
        ],
      )
    }
  }

  return (
    <TouchableOpacity onPress={savePressed}>
      <View style={styles.container}>
        <Text style={styles.save}>Save</Text>
      </View>
    </TouchableOpacity>
  )
}

export default withFirebaseHOC(NavSaveButton)

const styles = StyleSheet.create({
  container: {
    width: 65,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#27AE60',
    alignItems: 'center',
    justifyContent: 'center',
  },
  save: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
})
