import React from 'react'
import { firebase } from '../firebase/config'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native'
import appStyles from '../styles'
import Logo from '../components/Logo'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { withFirebaseHOC } from '../firebase'

const SignUp = ({ firebase, navigation }) => {
  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')

  const onFooterLinkPress = () => {
    navigation.navigate('SignIn')
  }

  const onSignUpPress = async () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match.")
      return
    }
    try {
      const response = await firebase.signUpWithEmail(
        email,
        password
      )

      if (response.user.uid) {
        const { uid } = response.user
        const userData = { email, firstName, lastName, uid }
        await firebase.createNewUser(userData)
        navigation.navigate('Workouts')
      }
    } catch (error) {
      console.error(error)
      // actions.setFieldError('general', error.message)
    } finally {
      // actions.setSubmitting(false)
    }

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
          <Text style={styles.title}>Sign Up</Text>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setFirstName(text)}
            value={firstName}
            autoCapitalize="words"
            autoCompleteType="name"
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setLastName(text)}
            value={lastName}
            autoCapitalize="words"
            autoCompleteType="name"
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#aaaaaa"
            onChangeText={(text) => setEmail(text)}
            value={email}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            autoCompleteType="email"
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholderTextColor="#aaaaaa"
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            value={password}
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholderTextColor="#aaaaaa"
            placeholder="Confirm Password"
            onChangeText={(text) => setConfirmPassword(text)}
            value={confirmPassword}
            autoCapitalize="none"
            secureTextEntry
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => onSignUpPress()}
          >
            <Text style={styles.buttonTitle}>Create account</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            Already have an account?{' '}
            <Text onPress={onFooterLinkPress} style={styles.footerLink}>
              Sign in
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  )
}

export default withFirebaseHOC(SignUp)

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
