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

const RecordHeader = ({ setExercises, exercises, navigation }) => {
  return (
    <View style={styles.header}>
      <View style={styles.row}>
        <NavBackButton navigation={navigation}></NavBackButton>
        <NavSaveButton
          exercises={exercises}
          navigation={navigation}
        ></NavSaveButton>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: appStyles.primaryColour,
    paddingHorizontal: appStyles.leftHeaderPadding,
    height: 115,
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

export default RecordHeader
