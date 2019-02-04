import React, { Component } from 'react'
import SafeArea from '../../components/common/SafeArea'
import ItalicText from '../../components/common/ItalicText'
import ScrollArea from '../../components/common/ScrollArea'
import { RegularText, LightText } from '../../components/common/fonts'
import termsStyles from '../../assets/styles/termsStyles'

class PrivacyPolicy extends Component {
  render() {
    return (
      <SafeArea>
        <ScrollArea>

          <ItalicText>
            Updated June 2017{"\n"}
          </ItalicText>
          
          <LightText style={termsStyles.text}>
            This following document sets forth the Privacy Policy for the plexa.ai website, www.plexa.ai (“the Website”) and the Plexa app available through the Apple App Store and Google Play (“the App”). Both the Website and the App are owned entirely by Plexa Pty Ltd (“the Company”, “We”, “Us”, “Our”). We are committed to providing you with the best possible customer service experience and take matters of privacy seriously. We are bound by the Privacy Act 1988 (Cth), which sets out a number of principles concerning the privacy of individuals and businesses.{"\n\n"}
            This privacy policy establishes the use of user (“User”, “You”, “Your”, “the User”) information whilst using the Website and the App.{"\n"}
          </LightText>

          <RegularText style={termsStyles.title}>
            Collection of your personal information
          </RegularText>

          <LightText style={termsStyles.text}>
            {"\n"}In order to log in to the App, or to use the full features of the Website, We require you to create an account. When you create an account, We request information that personally identifies you. This includes your name, email address, phone number, address and date of birth.{"\n\n"}
            If you join the App as part of a request from a group, a medical business or another user, We collect information about this relationship. If You are allocated to a group when You join as part of a relationship with a workplace or organisation, this information is visible only to Our administrators and the other members of the group.{"\n\n"}
            In order to provide filtering of news, research and social media feeds, We ask that you provide Us with details of Your medical role, including Your medical specialty areas, Your workplaces and Your education history. Whether You provide this information to Us is left up to You.{"\n"}
          </LightText>

          <RegularText style={termsStyles.title}>
            Sharing of your personal information
          </RegularText>

          <LightText style={termsStyles.text}>
            {"\n"}We may occasionally hire other companies to provide services on Our behalf, including but not limited to handling customer support enquiries, processing transactions or posting to social media platforms. Those companies will be permitted to obtain only the personal information they need to deliver the service. We take all reasonable steps to ensure that these organisations are bound by confidentiality and privacy obligations in relation to the protection of Your personal information.{"\n"}
          </LightText>

          <RegularText style={termsStyles.title}>
            Use of your personal information
          </RegularText>

          <LightText style={termsStyles.text}>
            {"\n"}For each visitor to reach the site, We collect the following non-personally identifiable information, including but not limited to browser type, version and language, operating system, pages viewed while browsing the Website, page access times and referring website address. This collected information is used solely internally for the purpose of gauging visitor traffic, trends and delivering personalized content to you while you are at this Website.{"\n\n"}
            While using the App, We collect information about Your interactions, including what information You share such as links to external content and websites. We use this information in an anonymous way in order to provide you with more relevant content. We do not sell this information to any third-party.{"\n\n"}
            From time to time, we may use customer information for new, unanticipated uses not previously disclosed in our privacy notice. If our information practices change at some time in the future we will use for these new purposes only, data collected from the time of the policy change forward will adhere to our updated practices.{"\n"}
          </LightText>

          <RegularText style={termsStyles.title}>
            Content that you share
          </RegularText>

          <LightText style={termsStyles.text}>
            {"\n"}We collect information about your interactions with content on our Website and App. This includes anonymous information about the number of times content has been shared, saved or deleted. We use this information to serve You better articles, research and news.{"\n\n"}
            We may collect information about links that you share via the App and use them to redistribute to Our other members. You will not be notified if this has occurred.{"\n"}
          </LightText>

          <RegularText style={termsStyles.title}>
            Links to Other Websites
          </RegularText>

          <LightText style={termsStyles.text}>
            {"\n"}The Website and App contain links to other websites. Links from the Website do not constitute an endorsement, authorization or representation of our affiliation with that third party. We do not exercise control over third party websites. These other websites may place their own cookies or other files on your computer, collect data or solicit personally identifiable information from you. Other sites follow different rules regarding the use or disclosure of the personally identifiable information you submit to them. We encourage You to read the privacy policies or statements of the other websites You visit.{"\n"}
          </LightText>

          <RegularText style={termsStyles.title}>
            Changes to this Privacy Policy
          </RegularText>

          <LightText style={termsStyles.text}>
            {"\n"}We reserve the right to make amendments to this privacy policy at any time. If you have objections to the privacy policy, You should not access or use the Website or the App. The App should be immediately removed from your device.{"\n"}
          </LightText>

          <RegularText style={termsStyles.title}>
            Accessing Your Personal Information
          </RegularText>

          <LightText style={termsStyles.text}>
            {"\n"}You have a right to access your personal information, subject to exceptions allowed by law. If you would like to do so, please let us know. You may be required to put your request in writing for security reasons. We reserve the right to charge a fee for searching for, and providing access to, Your information on a per request basis.{"\n"}
          </LightText>

          <RegularText style={termsStyles.title}>
            Contacting us
          </RegularText>

          <LightText style={termsStyles.text}>
            {"\n"}We welcome Your comments regarding this privacy policy. If You have any questions about this privacy policy and would like further information, please contact us by email at support@plexa.ai{"\n"}
          </LightText>

        </ScrollArea>
      </SafeArea>
    )
  }
}

export default PrivacyPolicy
