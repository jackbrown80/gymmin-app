import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native'
import appStyles from '../styles'
import { Ionicons } from '@expo/vector-icons'
import WorkoutCard from '../components/WorkoutCard'
import { firebase } from '../firebase/config'
import Logo from '../components/Logo'

export default WorkoutsScreen = ({ user, navigation }) => {
  const [workouts, setWorkouts] = React.useState([])

  const workoutRef = firebase
    .firestore()
    .collection(`/users/${user.id}/workouts`)

  React.useEffect(() => {
    workoutRef.orderBy('created', 'desc').onSnapshot(
      (querySnapshot) => {
        const newWorkouts = []
        querySnapshot.forEach((doc) => {
          const workout = doc.data()
          workout.id = doc.id
          newWorkouts.push(workout)
        })
        setWorkouts(newWorkouts)
      },
      (error) => {
        console.log(error)
      }
    )
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.title}>Workouts</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('CreateWorkout', { user })}
        >
          <Ionicons name="md-add-circle-outline" size={35} color="white" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={workouts}
        renderItem={({ item }) => (
          <WorkoutCard
            title={item.name}
            key={item.id}
            navigation={navigation}
            workout={item}
          ></WorkoutCard>
        )}
      />
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
