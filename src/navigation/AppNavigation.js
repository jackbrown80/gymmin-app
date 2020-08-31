import { createStackNavigator } from 'react-navigation-stack'
import Workouts from '../screens/Workouts'
import RecordWorkout from '../screens/RecordWorkout'
import CreateWorkout from '../screens/CreateWorkout'

const AppNavigation = createStackNavigator(
  {
    Workouts: {
      screen: Workouts,
      navigationOptions: {
        headerShown: false
      }
    },
    RecordWorkout: {
      screen: RecordWorkout,
      navigationOptions: {
        title: 'Record Workout',
        headerBackTitle: 'Cancel',
        headerRightTitle: 'Cancel',
        gestureEnabled: false
      }
    },
    CreateWorkout: {
      screen: CreateWorkout,
      navigationOptions: { title: 'Create Workout' }
    }
  },
  {
    initialRouteName: 'Workouts',
    headerMode: 'float'
  }
)

export default AppNavigation
