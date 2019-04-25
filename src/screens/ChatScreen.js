import React, { Component } from 'react'
import { View, StyleSheet, SafeAreaView, FlatList } from 'react-native'
import SafeArea from '../components/common/SafeArea'
import { connect } from 'react-redux'
import ChatOperations from '../operations/ChatOperations'
import utils from '../utils'
import { RegularText } from '../components/common/fonts'
import { BG_COLOR, GRAY } from '../assets/styles/colors'
import RoundAvatar from '../components/common/RoundAvatar'
import ChatActions from '../actions/ChatActions'
import { getChatMessages } from '../selectors/ChatMessages'

const mapStateToProps = (state) => {

  return { data: getChatMessages(state) }
}

const mapDispatchToProps = (dispatch) => {
  const getMessages = (id) => dispatch(ChatOperations.getMessages(id))
  const deleteMessages = () => dispatch(ChatActions.deleteMessages())

  return { 
    getMessages,
    deleteMessages
  }
}

class ChatScreen extends Component {
  renderItem = ({ item }) => {
    if (item.isUser)
      return (
        <View style={[styles.userMessage, item.isNextMessage && styles.nextUserMessage]}>
          {this.renderMessage(item.text)}
          {this.renderTime(item.created_at)}
        </View>
      )
    else
      return (
        <View style={styles.publicOuterBox}>
        {!item.isNextMessage &&
          <RoundAvatar
            src={item.author.avatar}
            title='User'
            size='small'
            boxStyle={{ marginRight: 5 }} />
        }
          <View style={[styles.publicUserMessage, item.isNextMessage && styles.nextPublicUserMessage]}>
            {this.renderMessage(item.text)}
            {this.renderTime(item.created_at)}
          </View>
        </View>
      )
  }

  renderMessage = (text) => {
    return (
      <RegularText style={styles.text}>
        {text}
      </RegularText>
    )
  }

  renderTime = (time) => {
    return (
      <RegularText style={styles.time}>
        {utils.formatTime(time)}
      </RegularText>
    )
  }

  componentDidMount() {
    const { navigation, getMessages } = this.props
    const chatId = navigation.getParam('chatId')

    getMessages(chatId)
  }

  componentWillUnmount() {
    this.props.deleteMessages()
  }
  
  render() {
    const { data } = this.props

    return (
      <SafeAreaView>
        <View style={styles.container}>

        <RegularText style={styles.chatDate}>
          25 February 2019
        </RegularText>

        {!!data && 
          <FlatList
            data={data}
            keyExtractor={item => item.id + ''}
            renderItem={this.renderItem} />
        }
 

{/*          <View style={styles.userMessage}>
            <RegularText style={styles.text}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae iste modi excepturi et, eligendi eaque.
            </RegularText>
            <RegularText style={styles.time}>
              16:43
            </RegularText>
          </View>

          <View style={styles.publicOuterBox}>
            <RoundAvatar
              src={'https://www.reduceimages.com/img/image-after.jpg'}
              title='User'
              size='small'
              boxStyle={{ marginRight: 5 }} />
            <View style={styles.publicUserMessage}>
              <RegularText style={styles.text}>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate est ipsa provident?
              </RegularText>
              <RegularText style={styles.time}>
                16:48
              </RegularText>
            </View>
          </View>

          <View style={styles.publicOuterBox}>
            <View style={[styles.publicUserMessage, styles.nextPublicUserMessage]}>
              <RegularText style={styles.text}>
                Lorem?
              </RegularText>
              <RegularText style={styles.time}>
                16:48
              </RegularText>
            </View>
          </View>

          <View style={styles.userMessage}>
            <RegularText style={styles.text}>
              Lorem ipsum dolor sit amet consectetur adipisicing.
            </RegularText>
            <RegularText style={styles.time}>
              17:02
            </RegularText>
          </View>

          <View style={[styles.userMessage, styles.nextUserMessage]}>
            <RegularText style={styles.text}>
              Lorem, ipsum dolor.
            </RegularText>
            <RegularText style={styles.time}>
              17:02
            </RegularText>
          </View> */}

        </View>

      </SafeAreaView>
    )
  }
}

const time = {
  fontSize: 12,
  color: GRAY
}

const messageBox = {
  borderRadius: 10,
  paddingVertical: 5,
  paddingHorizontal: 10,
  marginBottom: 10,
  maxWidth: '80%'
}

const styles = StyleSheet.create({
  userMessage: {
    ...messageBox,
    backgroundColor: '#ece8dd',
    borderTopRightRadius: 0,
    alignSelf: 'flex-end'
  },

  publicUserMessage: {
    ...messageBox,
    backgroundColor: BG_COLOR,
    borderTopLeftRadius: 0
  },

  text: {
    fontSize: 16,
    marginTop: 5
  },

  container: {
    padding: 10
  },

  time: {
    alignSelf: 'flex-end',
    ...time
  },

  publicOuterBox: {
    alignSelf: 'flex-start',
    flexDirection: 'row'
  },

  nextPublicUserMessage: {
    marginLeft: 35,
    borderTopLeftRadius: 10,
    marginTop: -7
  },

  nextUserMessage: {
    borderTopRightRadius: 10,
    marginTop: -7
  },

  chatDate: {
    alignSelf: 'center',
    marginBottom: 10,
    ...time
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen)
