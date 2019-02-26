import React from 'react'
import { View, Image } from 'react-native'
import { RegularText } from '../common/fonts'
import { feedStyles } from '../../assets/styles/feed/feedStyles'

function LinkPreview(props) {
  const { fullView, item: { link_url, link_details: { domain, image, title } } } = props

    return (
      <View>
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
      </View>
    )
}

export default LinkPreview
