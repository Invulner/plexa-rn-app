import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Linking, Image, Alert, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import userOperations from '../../operations/UserOperations'
import { SIGN_UP_URL, MIN_PASSWORD_LENGTH } from '../../constants'

const mapDispatchToProps = (dispatch, { navigation }) => {
  const login = (credentials) => dispatch(userOperations.auth(credentials, navigation))

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
    const { loading } = this.props
    
    return (
      <View style={styles.container}>

        <Text style={styles.welcomeText}>
          Welcome, please login!
        </Text>

        <TextInput
          style={styles.input}
          placeholder='Your e-mail'
          textContentType='emailAddress'
          value={email}
          onChangeText={(value) => { this.onEmailChange(value) }}
        />

        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder='Password'
          textContentType='password'
          value={password}
          onChangeText={(value) => { this.onPasswordChange(value) }}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={this.onSubmit}
          disabled={loading}>
          {loading ? 
            <ActivityIndicator /> 
            : 
            <Text style={styles.buttonText}>Log in</Text>
          }
        </TouchableOpacity>

        <View style={{alignItems: "center"}}>
          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>
              Not a member?
            </Text>
            <Text 
              style={styles.signUpLink} 
              onPress={() => { Linking.openURL(SIGN_UP_URL) }}>
              Sign up
            </Text>
          </View>

          <Text style={styles.serviceText}>
            By using our service you agree with
          </Text>
          <Text style={styles.termsAndPolicyText}>
            Terms of service
          </Text>
          <Text style={styles.termsAndPolicyText}>
            Privacy policy
          </Text>
        </View> 

        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/images/text-logo.png')}
            style={styles.logoImage}
          />
        </View>

      </View>
    )
  }
}

const backgroundColor = '#ededed'
const buttonColor = '#bcac85'
const textColor = '#7e7763'

const formControl = {
  paddingVertical: 17,
  borderColor: buttonColor,
  borderWidth: 1,
  borderRadius: 10,
  alignSelf: 'stretch'
}
const signUpText = {
  fontSize: 18,
  color: textColor,
  marginBottom: 15
}
const serviceText = {
  color: textColor,
  fontSize: 16,
  marginBottom: 5
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor,
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
    backgroundColor: buttonColor
  },

  buttonText: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center'
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