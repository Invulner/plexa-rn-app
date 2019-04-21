import React, { Component } from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { RegularText, SemiboldText } from '../components/common/fonts'
import { BRAND_LIGHT, BG_COLOR, GRAY, LIGHT_GRAY } from '../assets/styles/colors'
import { connect } from 'react-redux'
import ChatsOperations from '../operations/ChatsOperations'
import utils from '../utils'
import { LinearGradient } from 'expo'
import Loader from '../components/common/Loader'
import RoundAvatar from '../components/common/RoundAvatar'

const mapStateToProps = (state) => {
  const { items, loading } = state.chats
  const sortedChats = !!items && items.sort(utils.sortByTime('last_message_date'))

  return { 
    sortedChats,
    loading
  }
}

const mapDispatchToProps = (dispatch) => {
  const getChats = () => dispatch(ChatsOperations.getChats())

  return { getChats }
}

class ChatsScreen extends Component {
  isUserChat = (item) => {
    return item.type === 'user'
  }

  renderAvatar = (item, title) => {
    return 
    // if (this.isUserChat(item) && item.members[0].avatar)
    //   return (
    //     <Image
    //       style={styles.avatar}
    //       source={{uri: item.members[0].avatar}} />
    //   )
    // else
    //   return (
    //     <RegularText style={styles.initials}>
    //       {this.isUserChat(item) ? utils.getInitials(title) : 'G'}
    //     </RegularText>
    //   )
  }

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
    const date = new Date(time)
    const day = date.getDate()
    const month = date.toString().slice(4, 7)

    return `${day} ${month}`
  }

  renderChats = () => {
    const { sortedChats } = this.props

    return sortedChats.map((item, index, array) => {
      const { title } = this.isUserChat(item) ? item : item.group
      const src = item.members ? item.members[0].avatar : null

      return (
        <React.Fragment key={item.id}>
          <View style={styles.chatBox}>
            <View style={styles.leftBox}>
              <RoundAvatar 
                isUserChat={this.isUserChat(item)}
                title={title}
                src={src} />
              <View>
                <SemiboldText style={styles.text}>
                  {utils.truncate(title, 25)}
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
    const { loading } = this.props

    return (
      <View style={styles.container}>
        {loading ?
          <Loader />
          :
          <View style={styles.chatsBox}>
            {this.renderChats()}
          </View>
      }
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

  // avatar: {
  //   height: 40,
  //   width: 40,
  //   resizeMode: 'contain'
  // },

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

  // initials: {
  //   color: '#fff',
  //   marginTop: 7
  // },

  separator: {
    height: 1,
    marginHorizontal: 10
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatsScreen)