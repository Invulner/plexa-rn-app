import React, { Component } from 'react'
import { View, StyleSheet, Image, ImageBackground } from 'react-native'
import { connect } from 'react-redux'
import { RegularText } from '../common/fonts'
import { BG_COLOR } from '../../assets/styles/colors'
import ScrollArea from '../common/ScrollArea'
import SafeArea from '../common/SafeArea'
import DrawerList from './DrawerList'

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
      title: 'Filter by Specialty',
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
      headerTitle={item.title} />
  ))

  render() {
    const { full_name, avatar_url } = this.props

    return (
      <SafeArea style={styles.container}>
        <ImageBackground 
          source={require('../../assets/images/nav-bg.png')}
          style={styles.imageBG}>
          <ImageBackground style={styles.bgOverlay}>

            <ScrollArea 
              showsVerticalScrollIndicator={false}>
              <View style={styles.userBox}>
                <Image 
                  source={{uri: avatar_url}} 
                  style={styles.userImage}/>
                <RegularText style={styles.userName}>
                  {full_name}
                </RegularText>
              </View>

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
  
  userImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    borderRadius: 7
  },

  imageBG: {
    flex: 1,
    resizeMode: 'contain'
  },

  userBox: {
    flexDirection: 'row',
    paddingVertical: 20,
    alignItems: 'center'
  },

  userName: {
    fontSize: 22,
    marginLeft: 10,
    marginTop: 10
  }
})

export default connect(mapStateToProps, null)(CustomDrawerComponent)
