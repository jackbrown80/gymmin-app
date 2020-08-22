import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList
} from 'react-native'
import appStyles from '../styles'
import { Ionicons } from '@expo/vector-icons'
import WorkoutCard from '../components/WorkoutCard'
import { firebase } from '../firebase/config'
import Logo from '../components/Logo'

export default WorkoutsScreen = ({ user, navigation }) => {
  const [loading, setLoading] = React.useState(true)
  const [workouts, setWorkouts] = React.useState(null)

  console.log('-----------3-------------')
  console.log(workouts)

  const workoutRef = firebase
    .firestore()
    .collection(`/users/${user.id}/workouts`)

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        navigation.navigate('SignIn')
      })
      .catch((error) => {
        alert(error)
      })
  }

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
        setLoading(false)
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
      {loading && <Text>Loading...</Text>}
      {workouts && (
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
      )}
      <TouchableOpacity style={styles.addButton} onPress={() => signOut()}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appStyles.primaryColour,
    paddingTop: 44,
    paddingHorizontal: 16
  },
  title: {
    fontSize: 35,
    fontWeight: '600',
    color: appStyles.secondaryColour
  },
  row: {
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  logo: {
    alignSelf: 'center',
    marginTop: 25,
    width: '10%'
  },
  addButton: {
    marginTop: 10,
    backgroundColor: appStyles.ctaColour,
    borderRadius: 5,
    height: 40,
    justifyContent: 'center',
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center'
  }
})
