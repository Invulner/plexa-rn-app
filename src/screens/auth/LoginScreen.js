import React, { Component } from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity, Linking, Image, Alert, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import UserOperations from '../../operations/UserOperations'
import { SIGN_UP_URL, MIN_PASSWORD_LENGTH, PASSWORD_URL } from '../../constants'
import { BRAND_DARK, BG_COLOR, BRAND_LIGHT } from '../../assets/styles/colors'
import SafeArea from '../../components/common/SafeArea'
import { LightText } from '../../components/common/fonts'
import utils from '../../utils'

const mapDispatchToProps = (dispatch, { navigation }) => {
  const login = (credentials) => dispatch(UserOperations.auth(credentials, navigation))

  return { login }
}

const mapStateToProps = (state) => {
  const { user: { loading }, network: { isConnected } } = state

  return { 
    loading,
    isConnected
  }
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
    const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/

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

  loginIfConnected = () => {
    this.props.isConnected ? this.login() : utils.showConnectivityError()
  }

  onSubmit = () => {
    if (this.isFormValid())
      this.loginIfConnected()
    else 
      this.showValidationMessage()
  }

  getURL = () => {
    const baseUrl = utils.getBaseURL()

    return {
      singUp: baseUrl + SIGN_UP_URL,
      pass: baseUrl + PASSWORD_URL
    }
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
            value={email}
            textContentType='emailAddress'
            keyboardType='email-address'
            onChangeText={(value) => this.onEmailChange(value)} />

          <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder='Password'
            textContentType='password'
            value={password}
            onChangeText={(value) => this.onPasswordChange(value)} />

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonActive]}
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
                style={styles.externalLink} 
                onPress={() => Linking.openURL(this.getURL().singUp)}>
                Sign up
              </LightText>
            </View>

            <LightText
              style={styles.externalLink}
              onPress={() => Linking.openURL(this.getURL().pass)}>
              Forgot password?
            </LightText>

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
              source={require('../../assets/images/text-logo.png')}
              style={styles.logoImage} />
          </View>

        </View>
      </SafeArea>
    )
  }
}

const formControl = {
  paddingVertical: 17,
  borderColor: BRAND_LIGHT,
  borderWidth: 1,
  borderRadius: 10,
  alignSelf: 'stretch'
}
const signUpText = {
  fontSize: 18,
  color: BRAND_DARK,
  marginBottom: 15
}
const serviceText = {
  color: BRAND_DARK,
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
    backgroundColor: BRAND_LIGHT
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

  externalLink: {
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
    bottom: 20,
    width: 150,
    height: 37,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },

  logoImage: {
    width: 150,
    height: 37
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
