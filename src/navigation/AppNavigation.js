import { createStackNavigator } from 'react-navigation-stack'
import Workouts from '../screens/Workouts'
import RecordWorkout from '../screens/RecordWorkout'
import CreateWorkout from '../screens/CreateWorkout'

const AppNavigation = createStackNavigator(
  {
    Workouts: { screen: Workouts },
    RecordWorkout: { screen: RecordWorkout },
    CreateWorkout: { screen: CreateWorkout }
  },
  {
    initialRouteName: 'Workouts',
    headerMode: 'none'
  }
)

export default AppNavigation
