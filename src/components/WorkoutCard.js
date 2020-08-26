import React from 'react'
import { StyleSheet, Text, View, Alert, TouchableOpacity } from 'react-native'
import appStyles from '../styles'
import { AntDesign } from '@expo/vector-icons'

const WorkoutCard = ({ title, navigation, workout }) => {
  const exerciseId = workout.id
  return (
    <TouchableOpacity
      onLongPress={() =>
        Alert.alert(
          'Delete Workout',
          'Are you sure you want to delete this workout? This cannot be undone',
          [
            {
              text: 'Cancel',
              style: 'cancel'
            },
            {
              text: 'Delete',
              onPress: () => console.log('OK Pressed'),
              style: 'destructive'
            }
          ]
        )
      }
      onPress={() => {
        navigation.navigate('RecordWorkout', { workout })
      }}
    >
      <View style={styles.container}>
        <View style={styles.leftWrapper}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>Not yet started</Text>
        </View>
        <View style={styles.rightWrapper}>
          <AntDesign name="right" size={50} color="#e8e8e8" />
        </View>
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
    backgroundColor: appStyles.secondaryColour,
    borderRadius: 10,
    height: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    paddingHorizontal: 15
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 5
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'normal',
    color: '#333333'
  },
  rightWrapper: {
    marginRight: 20
  }
})

export default WorkoutCard
