import React from 'react'
import { View, Image } from 'react-native'
import { RegularText } from '../common/fonts'
import { feedStyles } from '../../assets/styles/feed/feedStyles'

function LinkPreview(props) {
  const { link_url, link_details: { domain, image, title } } = props.item

    return (
      <View>
        <View style={feedStyles.linkContainer}>
          {image &&
            <Image 
              source={{uri: image}}
              style={feedStyles.linkImage} />
          }
          <RegularText style={feedStyles.linkText}>
            {!!title ? 
              title.trim()
              :
              link_url.trim()
            }
          </RegularText>
          <RegularText style={feedStyles.linkSource}>
            {domain}
          </RegularText>
        </View>
      </View>
    )
}

export default LinkPreview
