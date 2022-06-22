import { useState } from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';
import SettingsMenu, { MenuList, MenuItem } from './Component/SettingsMenu';
import { useSelector } from 'react-redux';
import Modal from 'react-native-modal';

import ScreenFrame from './Component/ScreenFrame';
import RadioButton from './Component/RadioButton';
import Button from '../Shared/Button'

function Settings(props){
  const [modalVisible, setModalVisible] = useState(false);

  const [englishLanguageIsActive, setEnglishLanguateActive] = useState(true);

  const companyInfo = useSelector(state => state.companyInfo);
  const { facebook_link, contact_us_link, company_website } = companyInfo;

  function handleSetEnglishLanguageActive(){
    setEnglishLanguateActive(true);
  }

  function handleSetEnglishLanguageInActive(){
    setEnglishLanguateActive(false);
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

  function handleModalVisibleToggle(){
    setModalVisible(state => !state);
  }

  return (
    <View style={ styles.container }>
      <ScreenFrame navigation={ props.navigation } title="Settings">
          <SettingsMenu>
            <MenuList title="App Settings" fontWeight="600">
              <MenuItem 
                text="Notifications" 
                fontWeight="500" 
                onAction={ handleOpenNotificationPress }
              />
              <MenuItem 
                text="Languages" 
                fontWeight="500" 
                onAction={ handleModalVisibleToggle }
              />
            </MenuList>
            <MenuList title="More Settings" fontWeight="600">
              <MenuItem 
                text="Follow us on facebook" 
                fontWeight="400" 
                onAction={ handleOpenFacebookPress }
              />
              <MenuItem 
                text="Visit our website" 
                fontWeight="400" 
                onAction={ handleOpenWebSitePress }
              />
              <MenuItem 
                text="Contact us" 
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
            active={ !englishLanguageIsActive }  
            onAction={ handleSetEnglishLanguageInActive }
          />
          <RadioButton 
            title="English"
            active={ englishLanguageIsActive }
            onAction={ handleSetEnglishLanguageActive }
          />
          <Button 
            title="Apply" 
            backgroundColor="#0AA1DD" 
            color="#fff" 
            onAction={ handleModalVisibleToggle }
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