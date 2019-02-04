import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import SafeArea from '../components/common/SafeArea'
import ItalicText from '../components/common/ItalicText'
import ScrollArea from '../components/common/ScrollArea'
import { LightText, RegularText } from '../components/common/fonts'
import termsAndPolicyStyles from '../assets/styles/termsAndPolicy'

class TermsOfService extends Component {
  render() {
    return (
      <SafeArea>
        <ScrollArea>

          <ItalicText>
            Last updated: 6 March 2017{"\n"}
          </ItalicText>

          <LightText style={termsAndPolicyStyles.paragraph}>
            The following terms of service (“the Terms”) apply to use of all the tools available through Plexa Pty Ltd (“the Company”, “us”, “our”, “we”) distributed through the Plexa website ("the Website"). The Company offers a number of social media, research, aggregation and optimization tools for the medical sector (collectively, “the Services”) to registered users (“the User”, “you”) on the basis of monthly and annual subscriptions (“the Subscriptions”). The User is able to generate content (“User Content”) and distribute it through use of the Website. {"\n\n"}
            The Website is offered subject to your acceptance without modification of all of the terms and conditions contained herein and all other operating rules, policies (including Plexa’s Privacy Policy) published on the Website (collectively, "the Agreement"). {"\n\n"}
            Please read the Agreement carefully before accessing or using the Website. By accessing or using any part of the web site, you agree to become bound by the terms and conditions of all elements of the Agreement. {"\n\n"}
            By accessing or using the Website and the Services you agree to be bound by these Terms. If the terms of the Agreement are considered an offer, then acceptance is expressly limited to such terms. If you disagree with any part of the Agreement, you may not access the Website. {"\n"}
          </LightText>

          <RegularText style={termsAndPolicyStyles.heading}>
            Services & Acceptable Use 
          </RegularText>

          <LightText style={termsAndPolicyStyles.paragraph}>
            {"\n"}You shall:
          </LightText>

          <View style={styles.listItemBox}>
            <LightText style={[styles.listItemNumber, termsAndPolicyStyles.paragraph]}>
              1.
            </LightText>
            <LightText style={termsAndPolicyStyles.paragraph}>
              Be responsible for your, and any Authorised Users’ compliance with these Terms.
            </LightText>
          </View>

          <View style={styles.listItemBox}>
            <LightText style={[styles.listItemNumber, termsAndPolicyStyles.paragraph]}>
              2.
            </LightText>
            <LightText style={termsAndPolicyStyles.paragraph}>
              Be responsible for the content that you create and distribute using the Services including the accuracy, quality and legality of this content.
            </LightText>
          </View>

          <View style={styles.listItemBox}>
            <LightText style={[styles.listItemNumber, termsAndPolicyStyles.paragraph]}>
              3.
            </LightText>
            <LightText style={termsAndPolicyStyles.paragraph}>
              Make efforts to avoid unauthorized access to the Services by any person other than yourself, other than Authorised Users. Your efforts should including securing your password and username.
            </LightText>
          </View>

          <View style={styles.listItemBox}>
            <LightText style={[styles.listItemNumber, termsAndPolicyStyles.paragraph]}>
              4.
            </LightText>
            <LightText style={termsAndPolicyStyles.paragraph}>
              Notify the Company immediately if you believe your account has been compromised or is in use by another party.
            </LightText>
          </View>

          <View style={styles.listItemBox}>
            <LightText style={[styles.listItemNumber, termsAndPolicyStyles.paragraph]}>
              5.
            </LightText>
            <LightText style={termsAndPolicyStyles.paragraph}>
              Ensure you are aware of and stay up to date with any laws and regulations regarding your position as a medical professional and your responsibilities with respect to what content you distribute and the advice that you give.
            </LightText>
          </View>

          <View style={styles.listItemBox}>
            <LightText style={[styles.listItemNumber, termsAndPolicyStyles.paragraph]}>
              6.
            </LightText>
            <LightText style={termsAndPolicyStyles.paragraph}>
              Ensure that you have read and agree to the terms of service, privacy policy and copyright documents relating to the third-party services that connect to the Website. This includes services such as Google, Facebook and Twitter.{"\n"}
            </LightText>
          </View>

          <RegularText style={termsAndPolicyStyles.heading}>
            Content
          </RegularText>

          <LightText style={termsAndPolicyStyles.paragraph}>
            {"\n"}As between you and the Company, we retain all right, title, and interest in and to the Services. Nothing within the Terms shall be construed to restrict, impair, encumber, alter, deprive, or adversely affect the Services or any of the Company’s rights or interests of the Services or any other intellectual property, brands, information, content, processes, methodologies, products, goods, services, materials, or rights, tangible or intangible. {"\n\n"}
            All rights, title, and interest in and to the Services not expressly granted in this Agreement are reserved by the Company.{"\n"}
          </LightText>

          <RegularText style={termsAndPolicyStyles.heading}>
            Your content on the Website
          </RegularText>

          <LightText style={termsAndPolicyStyles.paragraph}>
            {"\n"}You grant the Company limited, worldwide, non-exclusive, non-transferable license, without a right of sublicense, to access, use, reproduce, electronically distribute, transmit, perform, format, display, store, archive, and index User Content for the purpose of supporting your use of the Services and providing Services to you. {"\n\n"}
            The Company may also use User Content for the purpose of building, developing and creating new Services, or personalizing the Website to your profile. We will only make use of User Content in an anonymized way. {"\n\n"}
            Subject only to the limited license expressly granted herein, Users shall retain all rights, title and interest in and to the User Content and all associated intellectual property rights. {"\n\n"}
            The Company retains no right of ownership or interest in your content or the intellectual property rights to it. {"\n"}
          </LightText>

          <RegularText style={termsAndPolicyStyles.heading}>
            Responsibility for your content
          </RegularText>

          <LightText style={termsAndPolicyStyles.paragraph}>
            {"\n"}You are solely responsible for the User Content that is uploaded, published, displayed, linked to, or otherwise made available via the Services.{"\n\n"}
            The User agrees that the Company is only acting as a passive conduit for the online distribution and publication of the User Content the aggregated display of third-party content. At the sole discretion of the Company, we reserve the right to remove User Content uploaded that is deemed in violation of this Agreement. Users will be notified if any of their content is removed, and reasons provided.{"\n"}
          </LightText>

          <RegularText style={termsAndPolicyStyles.heading}>
            Links to Other Web Sites
          </RegularText>

          <LightText style={termsAndPolicyStyles.paragraph}>
            {"\n"}Many of the Services provided via the Website provide links to content created by, hosted and supplied by third-parties (“Third-Party Content”). {"\n\n"}
            The Company has no say over the production of Third-Party Content, and merely provides a system by which the user is able to view and distribute that content. Should you have any complaints with respect to copyright issues, appropriateness, truthfulness or quality of the content on the Website, please contact us with details of the offending content and the Company will make a determination and choose to remove or retain the Third-Party Content in question. {"\n\n"}
            Notwithstanding the foregoing, the Company takes no responsibility for any content delivered to you via the Services. {"\n"}
          </LightText>

          <RegularText style={termsAndPolicyStyles.heading}>
            Subscriptions
          </RegularText>

          <LightText style={termsAndPolicyStyles.paragraph}>
            {"\n"}The Website operates by receiving monthly or annual subscription, as well as free services, to professionals in the healthcare sector.{"\n"}
          </LightText>

          <RegularText style={termsAndPolicyStyles.heading}>
            Free Trial Period
          </RegularText>

          <LightText style={termsAndPolicyStyles.paragraph}>
            {"\n"}We offer customers a 14-day free trial period of any package of their choice. When the free trial period is over, you will be automatically downgraded to the free package. In order to upgrade once again, you will need to provide a valid credit card and accept a monthly or annual deduction.{"\n\n"}
            The free trial is only available to first time users.{"\n"}
          </LightText>

          <RegularText style={termsAndPolicyStyles.heading}>
            Subscription services and auto-renewal
          </RegularText>

          <LightText style={termsAndPolicyStyles.paragraph}>
            {"\n"}Purchase of an annual or monthly subscription by providing credit card details gives the Company the right to deduct the agreed price per subscription cycle. The Company will bill your approved credit card automatically at the end of each cycle, in advance, for the following subscription period.{"\n"}
          </LightText>

          <RegularText style={termsAndPolicyStyles.heading}>
            Credits and referral bonuses
          </RegularText>

          <LightText style={termsAndPolicyStyles.paragraph}>
            {"\n"}We offer a referral system that issues credits to Users who refer another party to join the Website. Referral bonuses are distributed only upon the referee signing up to, and completing their first payment of the Professional or Elite package.{"\n\n"}
            The Company reserves the right to rescind referral credits that have been issued, or to cancel the referral system entirely without any prior notice.{"\n\n"}
            Credits issued by the Company to Users are valid only for use against valid subscription packages, and are never redeemable for cash or for use outside of the service.{"\n"}
          </LightText>

          <RegularText style={termsAndPolicyStyles.heading}>
            Refunds
          </RegularText>

          <LightText style={termsAndPolicyStyles.paragraph}>
            {"\n"}Once billed, subscription fees are non-refundable, except on a case by case basis. It is in the Company’s sole discretion whether or not to issue a refund, or credit for future months.{"\n"}
          </LightText>

          <RegularText style={termsAndPolicyStyles.heading}>
            Termination
          </RegularText>

          <LightText style={termsAndPolicyStyles.paragraph}>
            {"\n"}We may terminate or suspend your access to all or any part of the Website at any time, with or without cause, with or without notice, effective immediately.{"\n\n"}
            For Users with paid accounts, your access to the Services will be terminated by the Company if you materially breach this Agreement and do not remedy this breach within fourteen (14) days of receiving notice from the Company.{"\n\n"}
            The company can terminate the Website immediately as part of a general shut down of our service. All provisions of this Agreement which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.{"\n\n"}
            The Company may suspend your use of the Website if your practices lead in any way to the degradation of performance of the Services for you or any other customer of the Company.{"\n"}
          </LightText>

          <RegularText style={termsAndPolicyStyles.heading}>
            No warranties
          </RegularText>

          <LightText style={termsAndPolicyStyles.paragraph}>
            {"\n"}This Website is provided °as is, with all faults, and the Company makes no express or implied representations or warranties, of any kind related to this Website or the materials contained on this Website.{"\n"}
          </LightText>

          <RegularText style={termsAndPolicyStyles.heading}>
            Copyright
          </RegularText>

          <LightText style={termsAndPolicyStyles.paragraph}>
            {"\n"}All content included on the Website, such as text, logos, images, audio, data compilations, databases and software, is the property of the Company or, where applicable, third-party copyright holders, and are protected by Australian and international copyright laws.{"\n\n"}
            Each third-party provider that is connected to the Website, such as Facebook, Twitter and Google, have their own terms of service, privacy policy and conditions of use that should be read and understood prior to using them through the Website. {"\n\n"}
            The compilation of all content on the Website is the exclusive property of the Company and protected by Australian and international copyright laws. All software, ideas and code used on the Website, are the property of the Company and are protected by Australian and international copyright laws.{"\n"}
          </LightText>

          <RegularText style={termsAndPolicyStyles.heading}>
            Limitation of liability
          </RegularText>

          <LightText style={termsAndPolicyStyles.paragraph}>
            {"\n"}In no event shall the Company, nor any of its officers, directors and employees, be liable to you for anything arising out of or in any way connected with your use of this Website, whether such liability is under contract, tort, negligence, strict liability or otherwise, and the Company, including its officers, directors and employees shall not be liable for any indirect, consequential or special liability arising out of or in any way related to your use of this Website.{"\n"}
          </LightText>

          <RegularText style={termsAndPolicyStyles.heading}>
            Severability
          </RegularText>

          <LightText style={termsAndPolicyStyles.paragraph}>
            {"\n"}If any provision of these Terms is found to be unenforceable or invalid under any applicable law, such unenforceability or invalidly shall not render these Terms unenforceable or invalid as a whole, and such provisions shall be deleted without affecting the remaining provisions herein.{"\n"}
          </LightText>

          <RegularText style={termsAndPolicyStyles.heading}>
            Assignment
          </RegularText>

          <LightText style={termsAndPolicyStyles.paragraph}>
            {"\n"}The Company shall be permitted to assign, transfer, and subcontract its rights and/or obligations under these Terms without any notification or consent required. However, you shall not be permitted to assign, transfer, or subcontract any of your rights and/or obligations under these Terms.{"\n"}
          </LightText>

           <RegularText style={termsAndPolicyStyles.heading}>
            Indemnification
          </RegularText>

          <LightText style={termsAndPolicyStyles.paragraph}>
            {"\n"}To the fullest extent possible by local laws, you agree to indemnify the Company and any service providers linked to through the Website against any and all claims and expenses arising out of your use of the Website.{"\n"}
          </LightText>

          <RegularText style={termsAndPolicyStyles.heading}>
            Changes
          </RegularText>

          <LightText style={termsAndPolicyStyles.paragraph}>
            {"\n"}We reserve the right, at our sole discretion, to modify or replace these Terms at any time. In the case of any material change, we will provide at least 30 days’ notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.{"\n"}
          </LightText>

          <RegularText style={termsAndPolicyStyles.heading}>
            Entire Agreement
          </RegularText>

          <LightText style={termsAndPolicyStyles.paragraph}>
            {"\n"}These Terms, including any legal notices and disclaimers contained on this Website, constitute the entire agreement between the Company and you in relation to your use of this Website, and supersede all prior agreements and understandings with respect to the same.{"\n"}
          </LightText>

          <RegularText style={termsAndPolicyStyles.heading}>
            Governing Law & Jurisdiction.
          </RegularText>

          <LightText style={termsAndPolicyStyles.paragraph}>
            {"\n"}These Terms and any disputes or claims arising out of or in connection with it or its subject matter or formation (including without limitation non-contractual disputes or claims) are governed by and construed in accordance with the laws of Australia. Each Party irrevocably agrees that the courts of Australia shall have exclusive jurisdiction to settle any dispute or claim arising out of or in connection with the Contract or its subject matter or formation (including non-contractual disputes or claims).{"\n"}
          </LightText>

        </ScrollArea>
      </SafeArea>
    )
  }
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 26
  },

  paragraph: {
    fontSize: 16
  },

  listItemNumber: {
    marginRight: 2,
    width: 15
  },

  listItemBox: {
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 20,
    flex: 1,
    width: '100%'
  }
})

export default TermsOfService
