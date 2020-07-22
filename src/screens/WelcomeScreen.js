import React from 'react'
import { StyleSheet, Text, View, Button, Image } from 'react-native'
import Logo from '../components/Logo'
import WelcomeModal from '../components/WelcomeModal'
import appStyles from '../styles'

export default WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.bottom}>
        <WelcomeModal navigation={navigation}></WelcomeModal>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appStyles.primaryColour,
    padding: 3,
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    alignSelf: 'stretch',
  },
})
