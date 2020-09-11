import React from 'react'
import { StyleSheet, Text, View, Alert, TouchableOpacity } from 'react-native'
import appStyles from '../styles'
import { AntDesign } from '@expo/vector-icons'
import ThreeDotMenu from './ThreeDotButton'

const WorkoutCard = ({ title, navigation, workoutId }) => {
  return (
    <TouchableOpacity
      onLongPress={() =>
        Alert.alert(
          'Delete Workout',
          'Are you sure you want to delete this workout? This cannot be undone',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Delete',
              onPress: () => console.log('OK Pressed'),
              style: 'destructive',
            },
          ],
        )
      }
      onPress={() => {
        navigation.navigate('RecordWorkout', { workoutId, title })
      }}
    >
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>Not yet started</Text>
        </View>
        <View style={styles.rightWrapper}></View>
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
    height: appStyles.cardHeight,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 1,
    paddingHorizontal: appStyles.cardTitlePadding,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'normal',
    color: '#333333',
  },
  rightWrapper: {
    justifyContent: 'flex-start',
    padding: 5,
    marginRight: -15,
    marginTop: -35,
  },
})

export default WorkoutCard
