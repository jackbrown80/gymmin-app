import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import AuthNavigation from './AuthNavigation'
import AppNavigation from './AppNavigation'

const SwitchNavigator = createSwitchNavigator(
  {
    // Initial: Initial,
    Auth: AuthNavigation,
    App: AppNavigation,
  },
  {
    initialRouteName: 'Auth'
  }
)

const AppContainer = createAppContainer(SwitchNavigator)

export default AppContainer