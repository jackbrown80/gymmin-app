import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import AuthNavigation from './AuthNavigation'
import AppNavigation from './AppNavigation'
import Initial from '../screens/Initial'

const SwitchNavigator = createSwitchNavigator(
  {
    Initial: Initial,
    Auth: AuthNavigation,
    App: AppNavigation
  },
  {
    initialRouteName: 'Initial'
  }
)

const AppContainer = createAppContainer(SwitchNavigator)

export default AppContainer
