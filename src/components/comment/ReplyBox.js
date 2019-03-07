import React, { Component } from 'react'
import { View, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native'
import { BRAND_LIGHT } from '../../assets/styles/colors'
import TopGreyLine from './TopGreyLine'

class ReplyBox extends Component {
  state = {
    reply: ''
  }

  onReplyChange = (reply) => {
    this.setState({reply})
  }

  isEmptyInput = () => {
    const { reply } = this.state
    return !!reply.length
  }
  
  render() {
    const placeholder = `Reply to ${this.props.author}`
    const { reply } = this.state

    return (
      <React.Fragment>
          <TopGreyLine boxStyle={styles.lineBox}/>
  
          <View style={styles.container}>
            <View style={styles.inputBox}>

              <TextInput 
                placeholder={placeholder}
                multiline={true}
                onChangeText={(reply) => this.onReplyChange(reply)}
                style={styles.input}
                value={reply} />

                <TouchableOpacity style={styles.iconBox}>
                  <View style={[styles.icon, this.isEmptyInput() && styles.inputFocused]}>
                    <Image
                      style={styles.iconImage} 
                      source={require('../../assets/icons/send-button.png')} />
                  </View>
                </TouchableOpacity>
            </View>
          </View>   
      </React.Fragment>
    )
  }
} 

const styles = StyleSheet.create({
  inputBox: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    backgroundColor: '#f2eee7',
    borderRadius: 7,
    minHeight: 40
  },

  container: {
    backgroundColor: '#fff',
    padding: 10
  },

  input: {
    fontSize: 16,
    width: '85%'
  },

  iconBox: {
    position: 'absolute',
    top: 7,
    right: 10
  },

  icon: {
    width: 25,
    height: 25,
    borderRadius: 25,
    backgroundColor: 'rgba(188, 172, 133, 0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  inputFocused: {
    backgroundColor: BRAND_LIGHT
  },

  iconImage: {
    resizeMode: 'contain',
    width: 15,
    marginTop: 3
  },

  lineBox: {
    paddingHorizontal: 0
  }
})

export default ReplyBox
