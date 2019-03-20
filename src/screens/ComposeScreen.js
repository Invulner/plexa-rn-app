import React, { Component } from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView, Alert } from 'react-native'
import { connect } from 'react-redux'
import SafeArea from '../components/common/SafeArea'
import ProfileAvatar from '../components/common/ProfileAvatar'
import { RegularText, SemiboldText, BoldText } from '../components/common/fonts'
import TopGreyLine from '../components/comment/TopGreyLine'
import { BRAND_LIGHT, GRAY, BRAND_DARK } from '../assets/styles/colors'
import Toggle from '../components/common/Toggle'
import FeedOperations from '../operations/FeedOperations'
import Spinner from 'react-native-loading-spinner-overlay'

const mapStateToProps = (state) => {
  const { user } = state

  return { user }
}

const mapDispatchToProps = (dispatch, { navigation }) => {
  const savePost = (post, cb) => dispatch(FeedOperations.savePost(post, navigation, cb))

  return { savePost }
}

class ComposeScreen extends Component {
  state = {
    message: '',
    topicIDs: [],
    commentsEnabled: true,
    isPublic: false,
    spinner: false
  }

  isEmptyInput = () => {
    const { message } = this.state

    return !message.trim().length
  }

  handleChangeText = (message) => {
    this.setState({ message })
  }

  sortAlphabetically = (a, b) => {
    return a.keyword < b.keyword ? -1 : 1
  }

  onTopicPress = (itemId) => {
    this.setState(prevState => {

      if (!prevState.topicIDs.filter(id => id === itemId).length)
        return {
          topicIDs: [
            ...prevState.topicIDs,
            itemId
          ]
        }
      else 
        return {
          topicIDs: prevState.topicIDs.filter(id => id !== itemId)
        }
    })
  }

  isTopicChosen = (itemId) => {
    const { topicIDs } = this.state

    return !!topicIDs.filter(id => id === itemId).length
  }

  toggleOverlay = () => {
    this.setState(prevState => ({ spinner: !prevState.spinner }))
  }

  onSubmit = () => {
    if(!this.isEmptyInput()) {

      if (this.state.topicIDs.length) {
        const { message, topicIDs, commentsEnabled, isPublic } = this.state
        const post = {
          content: message,
          topic_ids: topicIDs,
          comments_enabled: commentsEnabled,
          public: isPublic
        }

        this.toggleOverlay()
        this.props.savePost(post, this.toggleOverlay)
      } else {
        Alert.alert('Error', 'At least one topic has to be selected')
      }
    }
  }

  showHint = (key) => {
    const hints = {
      replies: {
        title: 'Replies',
        text: 'When enabled, other users are able to reply to your post. These replies are visible to others.'
      },
      privacy: {
        title: 'Privacy',
        text: 'When enabled your post will only show to other health providers. Disable to post also to patients.'
      }
    }
    Alert.alert(hints[key].title, hints[key].text)
  }

  renderTopics = () => {
    const { specialities, sub_specialities, conditions, interests } = this.props.user
    const allTopics = [...specialities, ...sub_specialities, ...conditions, ...interests]
    const sorted = allTopics.sort(this.sortAlphabetically)
    
    return sorted.map(item => {

      return (
        <TouchableOpacity
          activeOpacity={0.9}
          style={[styles.topic, this.isTopicChosen(item.id) && styles.topicActive]}
          key={item.id}
          onPress={() => this.onTopicPress(item.id)}>
          <RegularText style={styles.topicText}>
            {item.keyword}
          </RegularText>
        </TouchableOpacity>
      )
    })
  }

  render() {
    const { full_name: name, avatar_url: url } = this.props.user
    const { message, spinner } = this.state

    return (
      <SafeArea>
        <Spinner visible={spinner} />
        <View style={styles.inputBox}>
          <TextInput
            placeholder='Enter your message ...'
            style={styles.input}
            multiline={true}
            value={message}
            onChangeText={message => this.handleChangeText(message)} />

          <ProfileAvatar
            url={url}
            name={name}
            newPost={true} />
        </View>
        <TopGreyLine boxStyle={styles.lineSolid} />
        <View style={styles.btnBox}>

          {/* <View style={styles.leftIconBox}>
            <TouchableOpacity>
              <Image
                source={require('../assets/icons/photo-upload.png')}
                style={styles.iconUpload} />
            </TouchableOpacity>

            <TouchableOpacity>
              <Image
                source={require('../assets/icons/link.png')}
                style={styles.iconUpload} />
            </TouchableOpacity>

            <TouchableOpacity>
              <Image
                source={require('../assets/icons/location.png')}
                style={styles.iconUpload} />
            </TouchableOpacity>

            <TouchableOpacity>
              <Image
                source={require('../assets/icons/users-group.png')}
                style={styles.iconUpload} />
            </TouchableOpacity>
          </View> */}

          <TouchableOpacity 
            style={[styles.postBtn, !this.isEmptyInput() && styles.btnActive]}
            onPress={this.onSubmit}
            disabled={this.isEmptyInput()}>
            <RegularText style={styles.postText}>
              Post
            </RegularText>
          </TouchableOpacity>
        </View>
        <TopGreyLine boxStyle={styles.lineSolid} />

        <View style={styles.repliesBox}>
          <SemiboldText style={styles.label}>
            Replies
          </SemiboldText>

          <TouchableOpacity 
            style={styles.questionBox}
            onPress={() => this.showHint('replies')}>
            <BoldText style={styles.question}>
              ?
            </BoldText>
          </TouchableOpacity>
          <View style={styles.switchBox}>
            <Toggle
              onToggle={value => this.setState({ commentsEnabled: value})}
              isOn />
          </View>
        </View>

        <View style={styles.privacyBox}>
          <SemiboldText style={styles.label}>
            Privacy
          </SemiboldText>

          <TouchableOpacity 
            style={styles.questionBox}
            onPress={() => this.showHint('privacy')}>
            <BoldText style={styles.question}>
              ?
            </BoldText>
          </TouchableOpacity>
          <View style={styles.switchBox}>
            <Toggle onToggle={value => this.setState({ isPublic: value})} />
          </View>
        </View>

        <ScrollView>
          <View style={styles.topicsBox}>
            {this.renderTopics()}
          </View>  
        </ScrollView>

      </SafeArea>
    )
  }
}

const controls = {
  flexDirection: 'row',
  paddingHorizontal: 10
}

const styles = StyleSheet.create({
  inputBox: {
    paddingTop: 20,
    paddingLeft: 10,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    minHeight: 325
  },

  input: {
    fontSize: 20,
    width: '80%'
  },

  btnBox: {
    alignItems: 'center',
    //The following line should take precedence when activating commented buttons.
    // justifyContent: 'space-between',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    paddingHorizontal: 10,
    height: 50,
  },

  postBtn: {
    width: 80,
    height: 35,
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor: 'rgba(188, 172, 133, 0.5)',
    borderRadius: 7
  },

  postText: {
    marginTop: 7,
    fontSize: 16,
    color: '#fff'
  },

  lineSolid: {
    paddingHorizontal: 0
  },

  iconUpload: {
    width: 23,
    height: 23,
    resizeMode: 'contain'
  },

  leftIconBox: {
    flexDirection: 'row',
    width: '45%',
    justifyContent: 'space-between'
  },

  btnActive: {
    backgroundColor: BRAND_LIGHT
  },

  repliesBox: {
    ...controls,
    marginTop: 20
  },

  privacyBox: {
    ...controls,
    marginTop: 3,
    marginBottom: 20
  },

  label: {
    fontSize: 20,
    color: GRAY,
    marginRight: 7,
    marginTop: 2
  },

  questionBox: {
    width: 20,
    height: 20,
    borderRadius: 20,
    backgroundColor: GRAY,
    justifyContent: 'center',
    alignItems: 'center'
  },

  question: {
    color: '#fff',
    fontSize: 20,
    marginTop: 2
  },

  switchBox: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row'
  },

  topicsBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    justifyContent: 'flex-start'
  },

  topic: {
    justifyContent: 'center',
    paddingHorizontal: 4,
    backgroundColor: BRAND_LIGHT,
    height: 25,
    borderRadius: 5,
    marginRight: 3,
    marginBottom: 3
  },

  topicActive: {
    backgroundColor: BRAND_DARK
  },

  topicText: {
    color: '#fff',
    marginTop: 5
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ComposeScreen)
