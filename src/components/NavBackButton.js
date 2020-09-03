import * as React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  Keyboard,
  Alert,
  Button,
  SafeAreaView,
} from 'react-native'
import NavBackArrow from './NavBackArrow'

function NavBackButton(props) {
  return (
    <View style={styles.container}>
      <NavBackArrow style={styles.middle}></NavBackArrow>
    </View>
  )
}

export default NavBackButton

const styles = StyleSheet.create({
  container: {
    width: 36,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#364360',
    alignItems: 'center',
    justifyContent: 'center',
  },
  middle: {
    marginRight: 3,
  },
})
