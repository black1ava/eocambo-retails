import { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-native-modal';
import i18n from '../Translations';

import ScreenFrame from './Component/ScreenFrame';
import RadioButton from './Component/RadioButton';
import SettingsMenu, { MenuList, MenuItem } from './Component/SettingsMenu';
import Button from '../Shared/Button';
import { changeLanguage } from '../action';

function Settings(props){

  const [modalVisible, setModalVisible] = useState(false);
  const [languageCode, setLanguageCode] = useState('en');

  const dispatch = useDispatch();

  const companyInfo = useSelector(state => state.root.companyInfo);
  const { facebook_link, contact_us_link, company_website } = companyInfo;

  const code = useSelector(state => state.root.code);
  i18n.locale = code;

  useEffect(function(){
    setLanguageCode(code);
  },  [code]);

  function handleSetEnglishLanguageActive(){
    setLanguageCode('en');
  }

  function handleSetKhmerLanguageActive(){
    setLanguageCode('kh');
  }
  
  function handleOpenNotificationPress(){
    Linking.openSettings();
  }

  function handleOpenFacebookPress(){
    Linking.openURL(`fb://page/${ facebook_link}`);
  }

  function handleOpenWebSitePress(){
    Linking.openURL(company_website);
  }

  function handleOpenContactUsPress(){
    Linking.openURL(contact_us_link);
  }

  function handleModalVisibleOpen(){
    setModalVisible(true);
  }

  function handleApplyLanguageChange(){
    if(languageCode !== code){
      dispatch(changeLanguage(languageCode));
    }

    setModalVisible(false);
  }

  return (
    <View style={ styles.container }>
      <ScreenFrame navigation={ props.navigation } title={ i18n.t('settings.Setting') }>
          <SettingsMenu>
            <MenuList title={ i18n.t('settings.App Settings') } fontWeight="600">
              <MenuItem 
                text={ i18n.t('settings.Notifications') }
                fontWeight="500" 
                onAction={ handleOpenNotificationPress }
              />
              <MenuItem 
                text={ i18n.t('settings.Languages') }
                fontWeight="500" 
                onAction={ handleModalVisibleOpen }
              />
            </MenuList>
            <MenuList title={ i18n.t('settings.More Settings') } fontWeight="600">
              <MenuItem 
                text={ i18n.t('settings.Follow us on facebook')} 
                fontWeight="400" 
                onAction={ handleOpenFacebookPress }
              />
              <MenuItem 
                text={ i18n.t('settings.Visit our website') } 
                fontWeight="400" 
                onAction={ handleOpenWebSitePress }
              />
              <MenuItem 
                text={ i18n.t('settings.Contact us') }
                fontWeight="400" 
                onAction={ handleOpenContactUsPress }
              />
            </MenuList>
          </SettingsMenu>
      </ScreenFrame>
      <Modal
        animationIn="fadeInUp"
        animationOut="fadeOutDown"
        isVisible={ modalVisible }
      >
        <View style={ styles.modal }>
          <RadioButton 
            title="ភាសារខ្មែរ" 
            active={ languageCode === 'kh' }  
            onAction={ handleSetKhmerLanguageActive }
          />
          <RadioButton 
            title="English"
            active={ languageCode === 'en' }
            onAction={ handleSetEnglishLanguageActive }
          />
          <Button 
            title="Apply" 
            backgroundColor="#0AA1DD" 
            color="#fff" 
            onAction={ handleApplyLanguageChange }
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  menuTitle: {
    padding: 15,
    backgroundColor:'rgba(0, 0, 0, 0.1)'
  },
  menuTitleText: {
    fontWeight: 'bold'
  },
  modal: {
    padding: 15,
    backgroundColor: 'white'
  }
});

export default Settings;