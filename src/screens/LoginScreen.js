import React, { Component } from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity, Linking, Image, Alert, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import UserOperations from '../operations/UserOperations'
import { SIGN_UP_URL, MIN_PASSWORD_LENGTH } from '../constants'
import { TEXT_COLOR, BG_COLOR, BTN_COLOR } from '../assets/styles/colors'
import SafeArea from '../components/common/SafeArea'
import { LightText } from '../components/common/fonts'

const mapDispatchToProps = (dispatch, { navigation }) => {
  const login = (credentials) => dispatch(UserOperations.auth(credentials, navigation))

  return { login }
}

const mapStateToProps = (state) => {
  const { loading } = state.user

  return { loading }
}

class LoginScreen extends Component {
  state = {
    email: '',
    password: ''
  }

  onEmailChange = (email) => {
    this.setState({ email: email.toLowerCase() })
  }

  onPasswordChange = (password) => {
    this.setState({ password })
  }

  isEmailValid() {
    const re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/

    return re.test(this.state.email)
  }

  isPasswordValid() {
    return this.state.password.length >= MIN_PASSWORD_LENGTH
  }

  isFormValid() {
    return this.isEmailValid() && this.isPasswordValid()
  }

  login() {
    const credentials = this.state
    this.props.login(credentials)
  }

  showValidationMessage() {
    let title = 'Incorrect password'
    let message = 'Please, enter correct password'

    if (!this.isEmailValid() && !this.isPasswordValid()) {
      title = 'Incorrect email and password'
      message = 'Please, enter correct email and password'
    } else if (!this.isEmailValid()) {
      title = 'Incorrect email'
      message = 'Please, enter correct email'
    }

    Alert.alert(title, message)
  }

  onSubmit = () => {
    if (this.isFormValid()) 
      this.login()
    else 
      this.showValidationMessage()
  }

  render() {
    const { email, password } = this.state
    const { loading, navigation } = this.props
    
    return (
      <SafeArea>
        <View style={styles.container}>
          <LightText style={styles.welcomeText}>
            Welcome, please login!
          </LightText>

          <TextInput
            style={styles.input}
            placeholder='Your e-mail'
            textContentType='emailAddress'
            value={email}
            onChangeText={(value) => this.onEmailChange(value)} />

          <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder='Password'
            textContentType='password'
            value={password}
            onChangeText={(value) => this.onPasswordChange(value)} />

          <TouchableOpacity
            style={[styles.button, loading ? styles.buttonActive : null]}
            onPress={this.onSubmit}
            disabled={loading}>
            {loading ? 
              <ActivityIndicator color="#fff"/> 
              : 
              <LightText style={styles.buttonText}>
                Log in
              </LightText>
            }
          </TouchableOpacity>

          <View style={styles.signUpOuterContainer}>
            <View style={styles.signUpContainer}>
              <LightText style={styles.signUpText}>
                Not a member?
              </LightText>
              <LightText 
                style={styles.signUpLink} 
                onPress={() => Linking.openURL(SIGN_UP_URL)}>
                Sign up
              </LightText>
            </View>

            <LightText style={styles.serviceText}>
              By using our service you agree with
            </LightText>
            <LightText 
              style={styles.termsAndPolicyText}
              onPress={()=> navigation.navigate('Terms')}>
              Terms of service
            </LightText>
            <LightText 
              style={styles.termsAndPolicyText}
              onPress={() => navigation.navigate('Policy')}>
              Privacy policy
            </LightText>
          </View> 

          <View style={styles.imageContainer}>
            <Image
              source={require('../assets/images/text-logo.png')}
              style={styles.logoImage} />
          </View>

        </View>
      </SafeArea>
    )
  }
}

const formControl = {
  paddingVertical: 17,
  borderColor: BTN_COLOR,
  borderWidth: 1,
  borderRadius: 10,
  alignSelf: 'stretch'
}
const signUpText = {
  fontSize: 18,
  color: TEXT_COLOR,
  marginBottom: 15
}
const serviceText = {
  color: TEXT_COLOR,
  fontSize: 16,
  marginBottom: 5
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BG_COLOR,
    paddingHorizontal: 45
  },

  welcomeText: {
    color: '#000',
    fontSize: 26,
    marginBottom: 20
  },

  input: {
    ...formControl,
    marginBottom: 17,
    fontSize: 20,
    textAlign: 'center'
  },

  button: {
    ...formControl,
    marginBottom: 20,
    backgroundColor: BTN_COLOR
  },

  buttonActive: {
    paddingVertical: 19
  },

  buttonText: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    marginBottom: -5,
    marginTop: 2
  },

  signUpOuterContainer: {
    alignItems: 'center'
  },

  signUpContainer: {
    flexDirection: "row"
  },

  signUpText: {
    ...signUpText
  },

  signUpLink: {
    ...signUpText,
    textDecorationLine: "underline",
    marginLeft: 10
  },

  serviceText: {
    ...serviceText
  },

  termsAndPolicyText: {
    ...serviceText,
    textDecorationLine: "underline"
  },

  imageContainer: {
    position: 'absolute',
    bottom: 10,
    width: 175,
    height: 42,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },

  logoImage: {
    width: 175,
    height: 42
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
