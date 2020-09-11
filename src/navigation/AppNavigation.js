import { createStackNavigator } from 'react-navigation-stack'
import Workouts from '../screens/Workouts'
import RecordWorkout from '../screens/RecordWorkout'
import CreateWorkout from '../screens/CreateWorkout'

const AppNavigation = createStackNavigator(
  {
    Workouts: {
      screen: Workouts,
      navigationOptions: {
        headerShown: false,
      },
    },
    RecordWorkout: {
      screen: RecordWorkout,
      navigationOptions: {
        headerShown: false,
      },
    },
    CreateWorkout: {
      screen: CreateWorkout,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: 'Workouts',
    headerMode: 'float',
  },
)

export default AppNavigation
