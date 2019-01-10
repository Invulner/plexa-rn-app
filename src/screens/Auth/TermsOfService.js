import React, { Component } from 'react'
import { ScrollView, Text, SafeAreaView } from 'react-native'
import { TEXT_COLOR, BG_COLOR } from '../../constants'

export default class TermsOfService extends Component {
  static navigationOptions = {
    title: 'Terms of Service',
    headerTintColor: TEXT_COLOR,
    headerBackTitle: null,
    headerTitleStyle: {
      fontWeight: '400',
    },
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: BG_COLOR }}>
        <ScrollView style={{ padding: 15 }}>

          <Text 
            style={{ fontStyle: 'italic' }}>
            Last updated: 6 March 2017{"\n"}
          </Text>

          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt assumenda laborum dolorum voluptate, dolorem exercitationem commodi vitae hic nam quasi rerum explicabo. Natus numquam, ratione enim culpa magni nobis officiis fugiat quidem aut quasi illum, aspernatur accusamus sapiente eum assumenda suscipit laudantium! Illum quo dolor officiis ipsam eius! Numquam quam animi vitae quod, recusandae perspiciatis nesciunt labore ad? Voluptatibus temporibus, beatae adipisci quidem consequuntur earum sit magnam aperiam esse vitae nemo sint, nam quaerat repudiandae.{"\n"}{"\n"}
            
            Atque ullam fugiat officiis quibusdam vitae doloribus nobis dolor molestias, dolores cupiditate ab magnam tempore ipsa accusantium veniam? Consequatur amet possimus dignissimos, veritatis earum alias! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et molestiae recusandae voluptatem esse tempora aut consequuntur iusto non incidunt placeat impedit quia, ut nisi tempore possimus doloribus deserunt at quaerat corrupti ducimus praesentium, ullam itaque porro? Soluta esse veritatis possimus necessitatibus illo enim, distinctio molestias placeat, ullam nesciunt sequi ipsa minus alias autem quas consequatur! {"\n"}{"\n"}
            
            Quae cupiditate, reiciendis distinctio quos fuga eos mollitia quia magnam nulla nisi dolor repudiandae nobis vero cumque impedit aperiam magni quaerat veritatis a? Inventore deleniti totam maxime, sunt cum voluptatem tempora labore alias incidunt quisquam veniam qui facere quidem odit officiis eum quasi velit mollitia repellendus amet sapiente explicabo vitae ipsa expedita! Id soluta excepturi facere reiciendis, quos necessitatibus assumenda pariatur esse nulla itaque possimus architecto. {"\n"}{"\n"}
            
            Ut assumenda, blanditiis laudantium aut perferendis quas tempora sapiente unde quam maxime facere ipsam quaerat, officiis architecto? Animi temporibus laborum rem, quas, natus fugit maiores necessitatibus consequuntur obcaecati sequi possimus sapiente, distinctio deleniti consequatur officiis! Inventore tempora voluptatum libero voluptatibus possimus dicta dolor natus, explicabo quo minus ea sequi labore. Aliquid commodi perferendis in quas, saepe error maxime eaque adipisci nostrum, velit aut aperiam ad nobis eum. Blanditiis nostrum nesciunt expedita quis exercitationem earum necessitatibus sunt libero, consequuntur natus.
        </Text>
        
        </ScrollView>
      </SafeAreaView>
    )
  }
}
