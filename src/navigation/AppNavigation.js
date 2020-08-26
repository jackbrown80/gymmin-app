import { createStackNavigator } from 'react-navigation-stack'
import Workouts from '../screens/Workouts'

const AppNavigation = createStackNavigator(
  {
    Workouts: { screen: Workouts }
  },
  {
    initialRouteName: 'Workouts'
  }
)

export default AppNavigation  