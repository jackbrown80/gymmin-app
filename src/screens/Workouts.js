import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native'
import appStyles from '../styles'
import { Ionicons } from '@expo/vector-icons'
import WorkoutCard from '../components/WorkoutCard'
import { withFirebaseHOC } from '../firebase'
import WorkoutHeader from '../components/WorkoutHeader'
import BlueAddButton from '../components/BlueAddButton'

const Workouts = ({ firebase, user, navigation }) => {
  const [loading, setLoading] = React.useState(true)
  const [workouts, setWorkouts] = React.useState(null)

  React.useEffect(() => {
    firebase
      .getWorkouts()
      .then((response) => {
        setLoading(false)
        setWorkouts(response)
      })
      .catch((error) => console.error(error))
  }, [])

  const signOut = () => {
    firebase.signOut()
    navigation.navigate('Auth')
  }

  return (
    <View style={styles.container}>
      <WorkoutHeader></WorkoutHeader>
      <View style={styles.row}>
        <Text style={styles.title}>Workouts</Text>
      </View>
      {loading && <Text>Loading...</Text>}
      {workouts && (
        <FlatList
          data={workouts}
          style={styles.list}
          renderItem={({ item }) => (
            <WorkoutCard
              title={item.name}
              navigation={navigation}
              workoutId={item.id}
            ></WorkoutCard>
          )}
        />
      )}
      <TouchableOpacity
        style={styles.add}
        onPress={() => navigation.navigate('CreateWorkout', { user })}
      >
        <BlueAddButton></BlueAddButton>
      </TouchableOpacity>
    </View>
  )
}

export default withFirebaseHOC(Workouts)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appStyles.secondaryColour,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: appStyles.primaryColour,
    paddingLeft: appStyles.leftHeaderPadding,
  },
  row: {
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  add: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  list: {
    paddingHorizontal: appStyles.cardPadding,
  },
})
