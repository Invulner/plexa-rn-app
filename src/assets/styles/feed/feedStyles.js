import { StyleSheet } from 'react-native'
import { PREVIEW_LIGHT } from '../colors'

export const feedStyles = StyleSheet.create({
  linkContainer: {
    borderColor: '#ddd',
    borderRadius: 7,
    borderWidth: 1,
    overflow: 'hidden',
    marginVertical: 7
  },

  linkCaption: {
    fontSize: 18
  },

  linkText: {
    fontSize: 16,
    letterSpacing: 0.3,
    lineHeight: 15,
    marginHorizontal: 10,
    marginTop: 10,
    paddingTop: 3
  },

  linkSource: {
    fontSize: 14,
    marginVertical: 5,
    marginLeft: 10
  },

  linkImage: {
    width: '100%',
    resizeMode: 'cover',
    height: 126
  },

  newsSourceBox: {
    backgroundColor: PREVIEW_LIGHT,
    flex: -1,
    padding: 10,
    paddingBottom: 5,
    marginLeft: 10,
    marginTop: -15,
    marginRight: 'auto'
  },

  sourceOnPostScreen: {
    fontSize: 16
  },

  textOnPostScreen: {
    fontSize: 18
  },

  postContainer: {
    paddingTop: 10,
    paddingHorizontal: 10,
    paddingBottom: 5,
    backgroundColor: '#fff',
    marginVertical: 5
  }
})
