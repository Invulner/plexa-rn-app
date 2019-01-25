import React from 'react'
import { View, Image } from 'react-native'
import { RegularText } from '../common/fonts'
import { feedStyles } from '../../assets/styles/feed/feedStyles'

function LinkPreview(props) {
  const { domain, image, title } = props.linkDetails

    return (
      <View>
        <View style={feedStyles.linkContainer}>
          {image &&
            <Image 
              source={{uri: image}}
              style={feedStyles.linkImage} />
          }
          {!!title &&
            <RegularText style={feedStyles.linkText}>
              {title.trim()}
            </RegularText>
          }
          <RegularText style={feedStyles.linkSource}>
            {domain}
          </RegularText>
        </View>
      </View>
    )
}

export default LinkPreview
