import React from 'react'
import { firebase } from '../firebase/config'
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
  AsyncStorage,
  Image,
  Vibration,
} from 'react-native'
import HeaderBackButton from '@react-navigation/stack'
import appStyles from '../styles'
import { Ionicons } from '@expo/vector-icons'
import WorkoutCard from '../components/WorkoutCard'
import ExerciseCard from '../components/ExerciseCard'
import Logo from '../components/Logo'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { apps } from 'firebase'

export default SignInScreen = ({ navigation }) => {
  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')

  const onFooterLinkPress = () => {
    navigation.navigate('SignUp')
  }

  const onSignInPress = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid
        const usersRef = firebase.firestore().collection('users')
        usersRef
          .doc(uid)
          .get()
          .then((firestoreDocument) => {
            if (!firestoreDocument.exists) {
              alert('User does not exist anymore.')
              return
            }
            const user = firestoreDocument.data()
            navigation.navigate('Workouts', { user })
          })
          .catch((error) => {
            alert(error)
          })
      })
      .catch((error) => {
        alert(error)
      })
  }

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView style={{ flex: 1, width: '100%' }}>
        {/* <Image
          style={styles.logo}
          //   source={require('../../../assets/icon.png')}
        /> */}
        <Logo style={styles.logo}></Logo>
        <Text style={styles.tagline}>
          Making sure you are always making progress!
        </Text>
        <View style={styles.formWrapper}>
          <Text style={styles.title}>Sign In</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setEmail(text)}
            value={email}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholderTextColor="#aaaaaa"
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            value={password}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => onSignInPress()}
          >
            <Text style={styles.buttonTitle}>Let's Go!</Text>
          </TouchableOpacity>
          <Text style={styles.or}>OR</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => onRegisterPress()}
          >
            <Text style={styles.buttonTitle}>Continue with Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => onRegisterPress()}
          >
            <Text style={styles.buttonTitle}>Continue with Apple</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            Don't have an account?{' '}
            <Text onPress={onFooterLinkPress} style={styles.footerLink}>
              Sign up
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appStyles.primaryColour,
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 30,
    paddingTop: 30,
  },
  tagline: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 30,
  },
  formWrapper: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#f7f7f7',
    borderRadius: 15,
    paddingVertical: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
  },
  or: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 20,
  },
  logo: {
    flex: 1,
    height: 120,
    width: 90,
    alignSelf: 'center',
    margin: 30,
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
    alignSelf: 'stretch',
  },
  button: {
    backgroundColor: appStyles.ctaColour,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  buttonTitle: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerView: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    fontSize: 16,
    color: 'white',
  },
  footerLink: {
    color: appStyles.ctaColour,
    fontWeight: 'bold',
    fontSize: 16,
  },
})
