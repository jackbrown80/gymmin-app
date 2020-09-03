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

function NavSaveButton(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.save}>Save</Text>
    </View>
  )
}

export default NavSaveButton

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#27AE60',
    alignItems: 'center',
    justifyContent: 'center',
  },
  save: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
})
