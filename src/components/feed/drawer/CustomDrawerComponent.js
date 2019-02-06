import React, { Component } from 'react'
import { View, StyleSheet, Image, ImageBackground, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { RegularText } from '../../common/fonts'
import { BG_COLOR, BRAND_DARK } from '../../../assets/styles/colors'
import ScrollArea from '../../common/ScrollArea'
import SafeArea from '../../common/SafeArea'
import DrawerListHeader from './DrawerListHeader'

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
        path: ''
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

  navigateTo = (route) => {
    const { navigate, closeDrawer } = this.props.navigation

    navigate(route)
    closeDrawer()
  }

  render() {
    const { full_name, avatar_url } = this.props
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

              <FlatList 
                data={plexaData}
                renderItem={({item}) => (
                  <RegularText 
                    onPress={() => this.navigateTo(item.path)}
                    style={styles.item}>
                    {item.title}
                  </RegularText>)}
                keyExtractor={item => item.title}
                ListHeaderComponent={<DrawerListHeader title={'Plexa'}/>} />

              <View style={[styles.line, styles.flatList]} />

              <FlatList 
                style={styles.flatList}
                data={groupsData}
                renderItem={({item}) => (
                  <RegularText 
                    onPress={() => this.navigateTo(item.path)}
                    style={styles.item}>
                    {item.title}
                  </RegularText>)}
                keyExtractor={item => item.title}
                ListHeaderComponent={<DrawerListHeader title={'Groups'}/>} />

              <FlatList 
                data={filterSpecialtyData}
                style={styles.flatList}
                renderItem={({item}) => (
                  <RegularText 
                    onPress={() => this.navigateTo(item.path)}
                    style={styles.item}>
                    {item.title}
                  </RegularText>)}
                keyExtractor={item => item.title}
                ListHeaderComponent={<DrawerListHeader title={'Filter by Specialty'}/>} />

              <FlatList 
                data={filterLocationData}
                style={styles.flatList}
                renderItem={({item}) => (
                  <RegularText 
                    onPress={() => this.navigateTo(item.path)}
                    style={styles.item}>
                    {item.title}
                  </RegularText>)}
                keyExtractor={item => item.title}
                ListHeaderComponent={<DrawerListHeader title={'Filter by Location'}/>} />
              
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

  item: {
    fontSize: 20,
    marginVertical: 5,
    marginLeft: 5
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
