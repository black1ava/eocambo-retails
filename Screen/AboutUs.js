import { View, Text, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import ScreenFrame from './Component/ScreenFrame';
import HomeSlide from './Component/HomeSlide';
import i18n from '../Translations';

const propTypes = {
  navigation: PropTypes.object
};

function AboutUs({ navigation }){
  const code = useSelector(state => state.root.code);

  i18n.locale = code;

  const slides = useSelector(state => state.root.slides);
  const { facebook_link, email, mobile, google_map_link } = useSelector(state => state.root.companyInfo);

  console.log(facebook_link, email, mobile, google_map_link);

  return (
    <ScreenFrame title={ i18n.t('drawer.About Us') } navigation={ navigation }>
      <View style={{ marginHorizontal: 15, marginVertical: 15 }}>
        <View>
          <HomeSlide images={ slides } />
        </View>
        <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}>
          < Text style={{ fontSize: 22, fontWeight: 'bold' }}>{ i18n.t('about.Contact') }:</Text>
          <Text style={{ color: 'rgba(0, 0, 0, 0.4)'}}>({ i18n.t('about.All clickable') })</Text>
        </View>
        <View>
          <TouchableOpacity onPress={ () => Linking.openURL(facebook_link).catch(() => alert('Failed to open'))}>
            <View style={ styles.contactInfo }>
              <Text style={{ fontWeight: 'bold' }}>{ i18n.t('about.Facebook') }: </Text>
              <Text style={{ fontWeight: 'bold', color: '#0AA1DD'}}>eOcambo</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={ () => Linking.openURL(`mailto:${ email }?subject=mailsubject&body=mailbody`).catch(() => alert('Failed to open')) }>
            <View style={ styles.contactInfo }>
              <Text style={{ fontWeight: 'bold' }}>{ i18n.t('about.Email') }: </Text>
              <Text style={{ fontWeight: 'bold', color: '#0AA1DD'}}>{ email }</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={ () => Linking.openURL(`tel:${ mobile }`).catch(() => alert('Failed to open')) }>
            <View style={ styles.contactInfo }>
              <Text style={{ fontWeight: 'bold' }}>{ i18n.t('about.Tel') }: </Text>
              <Text style={{ fontWeight: 'bold', color: '#0AA1DD'}}>{ mobile }</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={ () => Linking.openURL(google_map_link).catch(() => alert('Failed to open')) }>
            <View style={ styles.contactInfo }>
              <Text style={{ fontWeight: 'bold' }}>{ i18n.t('about.Address') }: </Text>
              <Text style={{ fontWeight: 'bold', color: '#0AA1DD'}}>{ google_map_link }</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenFrame>
  );
}

AboutUs.propTypes = propTypes;

const styles = StyleSheet.create({
  contactInfo: {
    flexDirection: 'row',
    marginVertical: 8
  }
});

export default AboutUs;