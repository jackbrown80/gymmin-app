import React from 'react'
import { StyleSheet, Text, View, Alert, TouchableOpacity } from 'react-native'
import appStyles from '../styles'
import DotMenu from './DotMenu'

const WorkoutHeader = ({ name, sets, deleteExercise, id }) => {
  return (
    <View style={styles.header}>
      <View style={styles.row}>
        <View>
          <Text style={styles.greeting}>Good Afternoon,</Text>
          <Text style={styles.name}>Jack</Text>
        </View>
        <DotMenu></DotMenu>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: appStyles.primaryColour,
    paddingHorizontal: appStyles.leftHeaderPadding,
    height: 135
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 55
  },
  greeting: {
    fontSize: 22,
    fontWeight: '600',
    color: '#6D7992'
  },
  name: {
    fontSize: 22,
    fontWeight: '600',
    color: appStyles.tertiaryColour
  }
})

export default WorkoutHeader
