import * as React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import { withFirebaseHOC } from '../firebase'

const NavSaveButton = ({ exercises, firebase, navigation }) => {
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
            firebase.addWorkout(exercises, workoutName)
            navigation.goBack()
          },
        },
      ],
    )
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
    width: 60,
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
