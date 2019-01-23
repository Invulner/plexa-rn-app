import React, { Component } from 'react'
import { View, Image, StyleSheet } from 'react-native'
import RNPickerSelect from 'react-native-picker-select'

class FeedPicker extends Component {
  state = {
    option: '',
    pickerItems: [
      {
        label: 'Send message',
        value: 'sendMessage'
      },
      {
        label: 'Hide post',
        value: 'hidePost'
      },
      {
        label: 'Report',
        value: 'report'
      },
      {
        label: 'Block user',
        value: 'blockUser'
      }
    ]
  }

  render() {
    return (
      <View style={styles.pickerContainer}>
        <RNPickerSelect
          items={this.state.pickerItems}
          placeholder={{
            label: 'Select option ...',
            value: null,
            color: '#9EA0A4'
          }}
          hideDoneBar={true}
          onValueChange={(value) => {
              this.setState({
                  option: value,
              }, () => console.log(this.state.option))
          }}>
          <Image
            source={require('../../assets/icons/arrow-down.png')}
            style={styles.pickerIcon} />
        </RNPickerSelect>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  pickerIcon: {
    width: 15,
    height: 15,
    resizeMode: 'contain' 
  },

  pickerContainer: {
    marginTop: 5,
    marginLeft: 'auto',
  }
})

export default FeedPicker
