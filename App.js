import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { firebase } from './src/firebase/config'
import { createStackNavigator } from '@react-navigation/stack'
import Screens from './src/screens'
import appStyles from './src/styles'

const Stack = createStackNavigator()
const showWelcome = true

export default App = () => {
  const [loading, setLoading] = React.useState(true)
  const [user, setUser] = React.useState(null)

  const [workouts, setWorkouts] = React.useState([])

  React.useEffect(() => {
    const usersRef = firebase.firestore().collection('users')
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data()
            setLoading(false)
            setUser(userData)
          })
          .catch((error) => {
            setLoading(false)
          })
      } else {
        setLoading(false)
      }
    })
  }, [])

  if (loading) {
    return <Text>Hi</Text>
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SignIn"
          component={Screens.SignInScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={Screens.SignUpScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Workouts" options={{ headerShown: false }}>
          {(props) => <Screens.WorkoutsScreen {...props} user={user} />}
        </Stack.Screen>
        <Stack.Screen name="CreateWorkout">
          {(props) => <Screens.CreateWorkoutScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="RecordWorkout">
          {(props) => <Screens.RecordWorkoutScreen {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
