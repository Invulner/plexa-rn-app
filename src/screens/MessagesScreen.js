import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { RegularText, SemiboldText } from '../components/common/fonts'
import { BRAND_LIGHT, BG_COLOR, GRAY } from '../assets/styles/colors'

class MessagesScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.chatBox}>
          <View style={styles.leftBox}>
            <View style={styles.initialsBox}>
              <RegularText style={styles.initials}>
                IN
              </RegularText>
            </View>
            <View>
              <SemiboldText style={styles.text}>
                Name
              </SemiboldText>
              <RegularText style={styles.textLight}>
                Last message
              </RegularText>
            </View>
          </View>
          <RegularText style={styles.textLight}>
            Date
          </RegularText>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
    paddingTop: 15,
    paddingHorizontal: 10
  },

  text: {
    fontSize: 18
  },

  textLight: {
    color: GRAY
  },

  leftBox: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  chatBox: {
    height: 70,
    backgroundColor: '#fff',
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    borderRadius: 5
  },

  initials: {
    color: '#fff',
    marginTop: 7
  },

  initialsBox: {
    height: 40,
    width: 40,
    borderRadius: 40,
    backgroundColor: BRAND_LIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },

  date: {

  }
})

export default MessagesScreen
