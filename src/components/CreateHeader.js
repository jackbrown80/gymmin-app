import React from 'react'
import { StyleSheet, Text, View, Alert, TextInput } from 'react-native'
import appStyles from '../styles'
import DotMenu from './DotMenu'
import NavBackButton from './NavBackButton'
import NavSaveButton from './NavSaveButton'

const CreateHeader = ({ name, sets, deleteExercise, id }) => {
  return (
    <View style={styles.header}>
      <View style={styles.row}>
        <NavBackButton></NavBackButton>
        <NavSaveButton></NavSaveButton>
        <TextInput
          style={styles.exerciseNameInput}
          autoFocus={true}
          placeholder="Exercise Name"
          returnKeyType="next"
          // onSubmitEditing={() => {
          //   setsRef.focus()
          // }}
          // ref={(ref) => {
          //   exerciseRef = ref
          // }}
          // onChangeText={(value) => setExerciseName(value)}
          // value={exerciseName}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: appStyles.primaryColour,
    paddingHorizontal: appStyles.leftHeaderPadding,
    height: 135,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 55,
  },
  greeting: {
    fontSize: 22,
    fontWeight: '600',
    color: '#6D7992',
  },
  name: {
    fontSize: 22,
    fontWeight: '600',
    color: appStyles.tertiaryColour,
  },
  exerciseNameInput: {
    height: 40,
    backgroundColor: 'white',
    width: '75%',
    borderRadius: 5,
    fontSize: 20,
    paddingHorizontal: 10,
  },
})

export default CreateHeader
