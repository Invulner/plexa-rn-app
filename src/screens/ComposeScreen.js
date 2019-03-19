import React, { Component } from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux'
import SafeArea from '../components/common/SafeArea'
import ProfileAvatar from '../components/common/ProfileAvatar'
import { RegularText, SemiboldText, BoldText } from '../components/common/fonts'
import TopGreyLine from '../components/comment/TopGreyLine'
import { BRAND_LIGHT, GRAY, BRAND_DARK } from '../assets/styles/colors'
import Toggle from '../components/common/Toggle'

const mapStateToProps = (state) => {
  const { user } = state

  return { user }
}

class ComposeScreen extends Component {
  state = {
    message: ''
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

  renderTopics = () => {
    const { specialities, sub_specialities, conditions, interests } = this.props.user
    let allTopics = [...specialities, ...sub_specialities, ...conditions, ...interests]
    const sorted = allTopics.sort(this.sortAlphabetically)
    
    return sorted.map(item => {

      return (
        <View 
          style={styles.topic}
          key={item.id}>
          <RegularText style={styles.topicText}>
            {item.keyword}
          </RegularText>
        </View>
      )
    })
  }

  render() {
    const { full_name: name, avatar_url: url } = this.props.user
    const { message } = this.state

    return (
      <SafeArea>
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

        <View style={styles.leftIconBox}>
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
        </View>

          <TouchableOpacity>
            <View style={[styles.postBtn, !this.isEmptyInput() && styles.btnActive]}>
              <RegularText style={styles.postText}>
                Post
              </RegularText>
            </View>
          </TouchableOpacity>
        </View>
        <TopGreyLine boxStyle={styles.lineSolid} />

        <View style={styles.repliesBox}>
          <SemiboldText style={styles.label}>
            Replies
          </SemiboldText>

          <View style={styles.questionBox}>
            <BoldText style={styles.question}>
              ?
            </BoldText>
          </View>
          <View style={styles.switchBox}>
            <Toggle />
          </View>
        </View>

        <View style={styles.privacyBox}>
          <SemiboldText style={styles.label}>
            Privacy
          </SemiboldText>

          <View style={styles.questionBox}>
            <BoldText style={styles.question}>
              ?
            </BoldText>
          </View>
          <View style={styles.switchBox}>
            <Toggle />
          </View>
        </View>

        <View style={styles.topicsBox}>
          {this.renderTopics()}
        </View>

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
    justifyContent: 'space-between',
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

  topicText: {
    color: '#fff',
    marginTop: 5
  }
})

export default connect(mapStateToProps, null)(ComposeScreen)
