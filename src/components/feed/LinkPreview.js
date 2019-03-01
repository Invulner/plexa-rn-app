import React from 'react'
import { View, Image, TouchableOpacity, Linking } from 'react-native'
import { RegularText } from '../common/fonts'
import { feedStyles } from '../../assets/styles/feed/feedStyles'

function LinkPreview(props) {
  const { fullView, item } = props
  const { link_url, link_details } = item
  const { domain, image, title } = link_details

    return (
      <TouchableOpacity onPress={() => Linking.openURL(link_url)}>
        <View style={feedStyles.linkContainer}>
          {image &&
            <Image 
              source={{uri: image}}
              style={feedStyles.linkImage} />
          }
          <RegularText style={[feedStyles.linkText, fullView && feedStyles.textOnPostScreen]}>
            {!!title ? 
              title.trim()
              :
              link_url.trim()
            }
          </RegularText>
          <RegularText style={[feedStyles.linkSource, fullView && feedStyles.sourceOnPostScreen]}>
            {domain}
          </RegularText>
        </View>
      </TouchableOpacity>
    )
}

export default LinkPreview
