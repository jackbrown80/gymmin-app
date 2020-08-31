import React, { Component } from 'react'
import { AppLoading } from 'expo'
import { Asset } from 'expo-asset'
import * as Font from 'expo-font'
import * as Icon from '@expo/vector-icons'
import { withFirebaseHOC } from '../firebase'

const Initial = ({ firebase, navigation }) => {
  React.useEffect(() => {
    try {
      firebase.checkUserAuth((user) => {
        if (user) {
          // if the user has previously logged in
          navigation.navigate('App')
        } else {
          // if the user has previously signed out from the app
          navigation.navigate('Auth')
        }
      })
    } catch (error) {
      console.error(error)
    }
  }, [])

  return <AppLoading />
}

export default withFirebaseHOC(Initial)
