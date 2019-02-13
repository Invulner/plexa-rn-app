import React, { Component } from 'react'
import { StyleSheet, Image, ImageBackground, TouchableWithoutFeedback, View } from 'react-native'
import { connect } from 'react-redux'
import { RegularText } from '../common/fonts'
import { BG_COLOR } from '../../assets/styles/colors'
import ScrollArea from '../common/ScrollArea'
import SafeArea from '../common/SafeArea'
import DrawerList from './DrawerList'
import profileStyles from '../../assets/styles/profileStyles'

const mapStateToProps = (state) => {
  const { full_name, avatar_url } = state.user

  return {
    full_name,
    avatar_url
  }
}

class CustomDrawerComponent extends Component {
  menuBlocks = [
    {
      title: 'Plexa',
      iconType: 'plexa',
      items: [
        {
          option: 'Create new post',
          path: ''
        },
        {
          option: 'View your feed',
          path: 'Feed'
        },
        {
          option: 'Research',
          path: ''
        },
        {
          option: 'Messages',
          path: '',
          messages: 3
        }
      ]
    },
    {
      title: 'Groups',
      iconType: 'groups',
      items: [
        {
          option: 'Group one',
          path: ''
        },
        {
          option:  'Test group',
          path: ''
        }
      ]
    },
    {
      title: 'Filter by Speciality',
      iconType: 'speciality',
      items: [
        {
          option: 'Addiction Medicine',
          path: ''
        },
        {
          option: 'Applied Dermatology',
          path: ''
        },
        {
          option: 'Cardiology',
          path: ''
        },
        {
          option: 'Women\'s Health' ,
          path: ''
        }
      ]
    },
    {
      title: 'Filter by Location',
      iconType: 'location',
      items: [
        {
          option: 'United Kingdom',
          path: ''
        },
        {
          option: 'England',
          path: ''
        },
        {
          option: 'London',
          path: ''
        }
      ]
    }
  ]

  menuElements = this.menuBlocks.map((item) => (
    <DrawerList 
      key={item.title}
      data={item.items}
      headerTitle={item.title}
      iconType={item.iconType} />
  ))

  render() {
    const { full_name, avatar_url, navigation } = this.props

    return (
      <SafeArea style={styles.container}>
        <ImageBackground 
          source={require('../../assets/images/nav-bg.png')}
          style={styles.imageBG}>
          <ImageBackground style={styles.bgOverlay}>

            <ScrollArea 
              showsVerticalScrollIndicator={false}>

              <TouchableWithoutFeedback onPress={() => navigation.navigate('OwnProfile')}>
                <View style={profileStyles.userBox}>
                  <Image 
                    source={{uri: avatar_url}} 
                    style={profileStyles.userImage} />
                  <RegularText style={profileStyles.userName}>
                    {full_name}
                  </RegularText>
                </View>
              </TouchableWithoutFeedback>

              {this.menuElements}

            </ScrollArea>
          </ImageBackground>
        </ImageBackground>
      </SafeArea>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: BG_COLOR
  },

  bgOverlay: {
    backgroundColor: 'rgba(237,237,237,0.8)',
    flex: 1
  },
  
  imageBG: {
    flex: 1,
    resizeMode: 'contain'
  }
})

export default connect(mapStateToProps, null)(CustomDrawerComponent)
