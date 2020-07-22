import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from 'react-native'
import appStyles from '../styles'
import { Ionicons } from '@expo/vector-icons'
import WorkoutCard from '../components/WorkoutCard'
import Logo from '../components/Logo'

export default WorkoutsScreen = ({ navigation }) => {
  
  return (
    <View style={styles.container}>
      <Logo style={styles.logo}></Logo>
      <View style={styles.row}>
        <Text style={styles.title}>Workouts</Text>
        <TouchableOpacity onPress={() => navigation.navigate('CreateWorkout')}>
          <Ionicons name="md-add-circle-outline" size={35} color="white" />
        </TouchableOpacity>
      </View>
      <WorkoutCard title="Chest & Tris"></WorkoutCard>
      <WorkoutCard title="Back & Bis"></WorkoutCard>
      <WorkoutCard title="Legs"></WorkoutCard>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appStyles.primaryColour,
    paddingTop: 44,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 35,
    fontWeight: '600',
    color: appStyles.secondaryColour,
  },
  row: {
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  logo: {
    alignSelf: 'center',
    marginTop: 25,
    width: '10%',
  },
})
