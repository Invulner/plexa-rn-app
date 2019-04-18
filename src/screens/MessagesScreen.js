import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { RegularText, SemiboldText } from '../components/common/fonts'
import { BRAND_LIGHT, BG_COLOR, GRAY, LIGHT_GRAY } from '../assets/styles/colors'
import { connect } from 'react-redux'
import ChatsOperations from '../operations/ChatsOperations'
import utils from '../utils'
import { LinearGradient } from 'expo'

const mapStateToProps = (state) => {
  const { rooms } = state.chats

  return { rooms }
}

const mapDispatchToProps = (dispatch) => {
  const getChats = () => dispatch(ChatsOperations.getChats())

  return { getChats }
}

class MessagesScreen extends Component {
  renderSeparator = () => {
    return (
      <LinearGradient
        colors={['#d3d3d3', 'transparent']}
        style={styles.separator}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }} />
    )
  }

  renderDate = (time) => {
    const date = new Date(time).toString()
    const day = date.slice(8, 10)
    const month = date.slice(4, 7)

    return `${day} ${month}`
  }

  renderChatItems = () => {
    const { rooms } = this.props
    const sortedRooms = rooms.sort(utils.sortByTime('last_message_date'))

    return sortedRooms.map((item, index, array) => {
      return (
        <React.Fragment key={item.id}>
          <View style={styles.chatBox}>
            <View style={styles.leftBox}>
              <View style={styles.initialsBox}>
                <RegularText style={styles.initials}>
                  {utils.getInitials(item.title)}
                </RegularText>
              </View>
              <View>
                <SemiboldText style={styles.text}>
                  {item.title}
                </SemiboldText>
                <RegularText style={styles.message}>
                  {item.last_message.text}
                </RegularText>
              </View>
            </View>
            <RegularText style={styles.date}>
              {this.renderDate(item.last_message_date)}
            </RegularText>
          </View>
          {index !== array.length - 1 && this.renderSeparator()}
        </React.Fragment>
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
        <View style={styles.chatsBox}>
          {!!rooms && this.renderChatItems()}
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

  chatsBox: {
    backgroundColor: '#fff',
    borderRadius: 5
  },

  text: {
    fontSize: 18
  },

  message: {
    color: GRAY
  },

  date: {
    color: LIGHT_GRAY
  },

  leftBox: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  chatBox: {
    height: 70, 
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between'
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

  separator: {
    height: 1,
    marginHorizontal: 10
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(MessagesScreen)
