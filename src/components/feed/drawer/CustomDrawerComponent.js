import React, { Component } from 'react'
import { View, StyleSheet, Image, ImageBackground } from 'react-native'
import { connect } from 'react-redux'
import { RegularText } from '../../common/fonts'
import { BG_COLOR, BRAND_DARK } from '../../../assets/styles/colors'
import ScrollArea from '../../common/ScrollArea'
import SafeArea from '../../common/SafeArea'
import DrawerList from './DrawerList'

const mapStateToProps = (state) => {
  const { full_name, avatar_url } = state.user

  return {
    full_name,
    avatar_url
  }
}

class CustomDrawerComponent extends Component {
  state = {
    plexaData: [{
        title: 'Create new post',
        path: ''
      },
      {
        title: 'View your feed',
        path: 'Feed'
      },
      {
        title: 'Research',
        path: ''
      },
      {
        title: 'Messages',
        path: '',
        messages: 3
      }],

    groupsData: [{
      title: 'Group one',
      path: ''
    },
    {
      title: 'Test group',
      path: ''
    }],

    filterSpecialtyData: [{
      title: 'Addiction Medicine',
      path: ''
    },
    {
      title: 'Applied Dermatology',
      path: ''
    },
    {
      title: 'Cardiology',
      path: ''
    },
    {
      title: 'Women\'s Health' ,
      path: ''
    }],

    filterLocationData: [{
      title: 'United Kingdom',
      path: ''
    }, 
    {
      title: 'England',
      path: ''
    }, 
    {
      title: 'London',
      path: ''
    }]
  }

  render() {
    const { full_name, avatar_url, navigation } = this.props
    const { plexaData, groupsData, filterSpecialtyData, filterLocationData } = this.state

    return (
      <SafeArea style={styles.container}>
        <ImageBackground 
          source={require('../../../assets/images/nav-bg.png')}
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

              <DrawerList 
                data={plexaData}
                navigation={navigation}
                headerTitle={'Plexa'} />

              <View style={[styles.line, styles.flatList]} />

              <DrawerList
                style={styles.flatList} 
                data={groupsData}
                navigation={navigation}
                headerTitle={'Groups'} />

              <DrawerList 
                style={styles.flatList} 
                data={filterSpecialtyData}
                navigation={navigation}
                headerTitle={'Filter by Specialty'} />

              <DrawerList 
                style={styles.flatList} 
                data={filterLocationData}
                navigation={navigation}
                headerTitle={'Filter by Location'} />

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
  },

  line: {
    height: 1,
    width: '100%',
    backgroundColor: BRAND_DARK
  },

  flatList: {
    marginBottom: 35
  }
})

export default connect(mapStateToProps, null)(CustomDrawerComponent)
