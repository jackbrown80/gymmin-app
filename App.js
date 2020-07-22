import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Screens from './src/screens'
import appStyles from './src/styles'

const Stack = createStackNavigator()
const showWelcome = true

export default App = () => {
  const [workouts, setWorkouts] = React.useState([])
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {showWelcome ? (
          <Stack.Screen
            name="Welcome"
            component={Screens.WelcomeScreen}
            options={{ headerShown: false }}
          />
        ) : null}
        <Stack.Screen
          name="Workouts"
          component={Screens.WorkoutsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreateWorkout"
          component={Screens.CreateWorkoutScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
