import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { RegularText, SemiboldText } from '../components/common/fonts'
import { BRAND_LIGHT, BG_COLOR, GRAY } from '../assets/styles/colors'
import { connect } from 'react-redux'
import ChatsOperations from '../operations/ChatsOperations'

const mapStateToProps = (state) => {
  const { rooms } = state.chats

  return { rooms }
}

const mapDispatchToProps = (dispatch) => {
  const getChats = () => dispatch(ChatsOperations.getChats())

  return { getChats }
}

class MessagesScreen extends Component {
  renderDate = (time) => {
    const date = new Date(time).toString()
    console.log(date)
    const day = date.slice(8, 10)
    const month = date.slice(4, 7)

    return `${day} ${month}`
  }

  renderChatItems = () => {
    const { rooms } = this.props

    return rooms.map(item => {
      return (
        <View
          key={item.id} 
          style={styles.chatBox}>
          <View style={styles.leftBox}>
            <View style={styles.initialsBox}>
              <RegularText style={styles.initials}>
                IN
              </RegularText>
            </View>
            <View>
              <SemiboldText style={styles.text}>
                {item.title}
              </SemiboldText>
              <RegularText style={styles.textLight}>
                {item.last_message.text}
              </RegularText>
            </View>
          </View>
          <RegularText style={styles.textLight}>
            {this.renderDate(item.last_message_date)}
          </RegularText>
        </View>
      )
    })
  }

  componentDidMount() {
    this.props.getChats()
  }

  render() {
    const { rooms } = this.props

    return (
      <View style={styles.container}>
      {!!rooms && this.renderChatItems()}
        {/* <View style={styles.chatBox}>
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
        </View> */}
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
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(MessagesScreen)
