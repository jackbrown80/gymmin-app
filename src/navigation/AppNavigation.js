import { createStackNavigator } from 'react-navigation-stack'
import Workouts from '../screens/Workouts'
import RecordWorkout from '../screens/RecordWorkout'

const AppNavigation = createStackNavigator(
  {
    Workouts: { screen: Workouts },
    RecordWorkout: { screen: RecordWorkout }
  },
  {
    initialRouteName: 'Workouts'
  }
)

export default AppNavigation
