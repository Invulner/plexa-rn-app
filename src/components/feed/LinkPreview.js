import React from 'react'
import { View, Image } from 'react-native'
import { RegularText } from '../common/fonts'
import { feedStyles } from '../../assets/styles/feed/feedStyles'
import utils from '../../utils'

function LinkPreview(props) {
  const { type, item: { link_url, link_details: { domain, image, title } } } = props

    return (
      <View>
        <View style={feedStyles.linkContainer}>
          {image &&
            <Image 
              source={{uri: image}}
              style={feedStyles.linkImage} />
          }
          <RegularText style={[feedStyles.linkText, utils.addStyleForPostScreen(type, feedStyles.textOnPostScreen)]}>
            {!!title ? 
              title.trim()
              :
              link_url.trim()
            }
          </RegularText>
          <RegularText style={[feedStyles.linkSource, utils.addStyleForPostScreen(type, feedStyles.sourceOnPostScreen)]}>
            {domain}
          </RegularText>
        </View>
      </View>
    )
}

export default LinkPreview
