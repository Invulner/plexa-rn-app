import { StyleSheet } from 'react-native'

const detailBox = {
  backgroundColor: '#fff',
  marginBottom: 2,
  paddingHorizontal: 15,
  paddingTop: 15
}

const profileStyles = StyleSheet.create({
  userImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    borderRadius: 7
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

  heading: {
    fontSize: 16,
    marginTop: 25,
    marginLeft: 15,
    marginBottom: 5
  },

  detailBox,

  profileDetailBox: {
    ...detailBox,
    flexDirection: 'row'
  },

  text: {
    fontSize: 20,
    marginBottom: 10
  },

  initials: {
    color: '#fff',
    fontSize: 26,
    paddingTop: 10
  }
})

export default profileStyles
