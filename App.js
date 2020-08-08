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
        {user ? (
          <Stack.Screen
            name="Workouts"
            component={Screens.WorkoutsScreen}
            options={{ headerShown: false }}
          />
        ) : (
          <>
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
          </>
        )}
        {/* {showWelcome ? (
          <Stack.Screen
            name="Welcome"
            component={Screens.WelcomeScreen}
            options={{ headerShown: false }}
          />
        ) : null} */}
        <Stack.Screen
          name="CreateWorkout"
          component={Screens.CreateWorkoutScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
