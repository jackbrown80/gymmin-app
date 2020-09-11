import * as React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

const SaveRecordButton = ({ setDoSave }) => {
  const [mode, setMode] = React.useState(0)

  const handleClick = () => {
    if (mode == 0) setMode(1)
    if (mode == 1) {
      setMode(2)
      setDoSave(true)
    }
    if (mode == 2) setMode(3)
    if (mode == 3) setMode(0)
  }

  return (
    <TouchableWithoutFeedback onPress={() => handleClick()}>
      {mode == 0 ? (
        <View style={styles.new}>
          <Text style={styles.black}>✓</Text>
        </View>
      ) : mode == 1 ? (
        <View style={styles.save}>
          <Text style={styles.black}>Save</Text>
        </View>
      ) : mode == 2 ? (
        <View style={styles.saved}>
          <Text style={styles.white}>✓</Text>
        </View>
      ) : (
        <View style={styles.edit}>
          <Text style={styles.white}>Edit</Text>
        </View>
      )}
    </TouchableWithoutFeedback>
  )
}

export default SaveRecordButton

const styles = StyleSheet.create({
  new: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'black',
  },
  save: {
    width: 55,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'black',
  },
  saved: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#27AE60',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#27AE60',
  },
  edit: {
    width: 55,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#27AE60',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#27AE60',
  },
  white: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
  },
  black: {
    fontSize: 14,
    fontWeight: '500',
    color: 'black',
  },
})
