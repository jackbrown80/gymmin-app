import React from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native'
import appStyles from '../styles'

const WelcomeModal = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to GYMMIN'!</Text>
      <Text style={styles.subtitle}>
        Making sure you're always making progress
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Workouts')}
      >
        <Text style={styles.buttonText}>Let's Go!</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 35,
    height: 375,
    paddingTop: 25,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 50,
    fontWeight: '800',
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 35,
    textAlign: 'center',
    fontSize: 25,
    fontWeight: '500',
  },
  button: {
    marginTop: 35,
    backgroundColor: appStyles.ctaColour,
    borderRadius: 5,
    height: 50,
    justifyContent: 'center',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: '800',
  },
})

export default WelcomeModal
