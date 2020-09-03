import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TextInput,
  Keyboard,
} from 'react-native'
import appStyles from '../styles'
import DotMenu from './DotMenu'
import NavBackButton from './NavBackButton'
import NavSaveButton from './NavSaveButton'
import { TouchableOpacity } from 'react-native-gesture-handler'
import WhiteAddButton from './WhiteAddButton'

const CreateHeader = ({ setExercises }) => {
  const [exerciseName, setExerciseName] = React.useState('')
  const [sets, setSets] = React.useState('')

  let setsRef
  let exerciseRef

  const addExercise = () => {
    const isSetsEmpty = sets === ''
    const isNameEmpty = exerciseName === ''
    const isBothEmpty = isSetsEmpty && isNameEmpty
    const isInvalid = isSetsEmpty || isNameEmpty

    if (isInvalid) {
      let alertTitle = ''
      let alertMessage = ''
      isBothEmpty
        ? (alertTitle = 'Details')
        : isSetsEmpty
        ? (alertTitle = 'Sets')
        : (alertTitle = 'Exercise Name')

      Alert.alert(
        `Missing ${alertTitle}`,
        'Ensure you have provide a name for the exercise and the number of sets',
        [
          {
            text: 'Ok',
            style: 'normal',
          },
        ],
      )
    } else {
      const completeSets = {
        sets: [],
      }

      for (let index = 0; index < sets; index++) {
        const data = {
          set: index + 1,
          prevWeight: null,
          reps: null,
        }

        completeSets.sets.push(data)
      }
      setExercises((prevExercises) => {
        return [
          {
            id: Date.now().toString(),
            name: exerciseName,
            sets: { count: sets, ...completeSets },
          },
          ...prevExercises,
        ]
      })
      setSets('')
      setExerciseName('')

      Keyboard.dismiss()
    }
  }

  return (
    <View style={styles.header}>
      <View style={styles.row}>
        <NavBackButton></NavBackButton>
        <NavSaveButton></NavSaveButton>
      </View>
      <TextInput
        style={styles.exerciseNameInput}
        autoFocus={true}
        placeholder="Exercise Name"
        placeholderTextColor="#ededed"
        returnKeyType="next"
        onSubmitEditing={() => {
          setsRef.focus()
        }}
        ref={(ref) => {
          exerciseRef = ref
        }}
        onChangeText={(value) => setExerciseName(value)}
        value={exerciseName}
      />
      <View style={styles.addRow}>
        <TextInput
          style={styles.setsNameInput}
          autoFocus={true}
          placeholder="Sets"
          placeholderTextColor="#ededed"
          returnKeyType="next"
          onSubmitEditing={() => {
            setsRef.focus()
          }}
          ref={(ref) => {
            setsRef = ref
          }}
          onChangeText={(value) => setSets(value)}
          value={sets}
        />
        <View style={styles.addContainer}>
          <TouchableOpacity style={styles.addButton} onPress={addExercise}>
            <WhiteAddButton></WhiteAddButton>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: appStyles.primaryColour,
    paddingHorizontal: appStyles.leftHeaderPadding,
    height: 250,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 52,
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
    height: 45,
    backgroundColor: '#364360',
    width: '100%',
    borderRadius: 10,
    fontSize: 18,
    paddingHorizontal: 15,
    marginTop: 22,
    color: '#ededed',
  },
  addRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  setsNameInput: {
    height: 45,
    backgroundColor: '#364360',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 18,
    marginTop: 22,
    width: '55%',
    color: '#ededed',
  },
  addContainer: {
    width: '38%',
  },
  addButton: {
    backgroundColor: appStyles.ctaColour,
    borderRadius: 10,
    height: 45,
    marginTop: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default CreateHeader
