import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Linking, Image } from 'react-native';
import { signUpUrl } from '../../constants';

class LoginScreen extends Component {
  render() {
    return (
      <View style={styles.container}>

        <Text style={styles.welcomeText}>
          Welcome, please login!
        </Text>

        <TextInput 
          style={styles.input}
          placeholder='Your e-mail'
          textContentType='emailAddress'>
        </TextInput>

        <TextInput
          style={styles.input}
          placeholder='Password'
          textContentType='password'>
        </TextInput>

        <TouchableOpacity style={styles.button}>
          <View>
            <Text 
              style={styles.buttonText}>
              Log in
            </Text>
          </View>
        </TouchableOpacity>

        <View style={{alignItems: "center"}}>
          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>Not a member?</Text>
            <Text 
              style={styles.signUpLink} 
              onPress={ () => {Linking.openURL(signUpUrl)}}>Sign up
            </Text>
          </View>

          <Text style={styles.serviceText}>By using our service you agree with</Text>
          <Text style={styles.termsAndPolicyText}>Terms of service</Text>
          <Text style={styles.termsAndPolicyText}>Privacy policy</Text>
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
const backgroundColor = '#ededed';
const buttonColor = '#bcac85';
const textColor = '#7e7763';

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

export default LoginScreen