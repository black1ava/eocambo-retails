import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { globalStyles } from '../styles/globalStyles';
import NavBar from './Component/NavBar';
import { MaterialIcons } from '@expo/vector-icons';

import Button from '../Shared/Button';
import { menus } from '../Shared/menus';
import ProfileMenuItem from './Component/ProfileMenuItem';

function Profile(props){

  const [menusProfile, setMenusProfile] = useState(menus);

  useEffect(function(){

    setMenusProfile(function(currentMenus){
      const removeProfileMenus = currentMenus.filter(function(menu){
        return menu.id !== 'profile'
      });
      const updateProfileMenus = [
        ...removeProfileMenus,
        { id: 'notifications', icon: 'notifications', content: 'Notifications' },
        { id: 'settings', icon: 'settings', content: 'Settings' },
        { id: 'logout', icon: 'logout', content: 'Logout' }
      ];

      return updateProfileMenus;
    });
  }, []);

  function renderMenu({ item }){
    return <ProfileMenuItem 
      icon={ item.icon } 
      content={ item.content }
      navigation={ props.navigation }
    />
  }

  function extractMenuId(menu){
    return menu.id
  }

  return (
    <View style={{ ...globalStyles.content, marginHorizontal: 0, backgroundColor: 'grey' }}>
      <View style={ styles.profileSection }>
        <View style={ styles.userProfile }>
          <View style={ styles.userProfileContent }>
            <View style={ styles.userInfo }>
              <View style={ styles.initial }>
                <Text style={ styles.initialText }>T</Text>
              </View>
            </View>
            <View style={ styles.settings }>
              <MaterialIcons name="settings" size={24} color="black" />
            </View>
            <Text style={{ color: '#fff'}}>roeunboratharath@gmail.com</Text>
            <Text style={ styles.userTextInfo }>Tharath Rbt</Text>
            <Button backgroundColor="#fff" title="Edit profiles" />
          </View>
        </View>
        <View style={{ ...globalStyles.content, ...styles.menuSection }}>
          <FlatList 
            data={ menusProfile }
            renderItem={ renderMenu }
            keyExtractor={ extractMenuId }
          />
          <View style={ styles.navbarSection }>
            <NavBar navigation={ props.navigation } screenName="profile"/>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileSection: {
    flex: 1,
  },
  userProfile: {
    height: '40%',
    alignItems: 'center',
    paddingTop: 30,
    backgroundColor: '#0AA1DD',
    position: 'relative',

  },
  initial: {
    width: 100,
    height: 100,
    backgroundColor: 'darkgreen',
    borderWidth: 4,
    borderColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  initialText: {
    fontSize: 50,
    color: '#fff'
  },
  userProfileContent: {
    alignItems: 'center',
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    paddingBottom: 20
  },
  settings: {
    position: 'absolute',
    right: 30
  },
  userTextInfo: {
    fontSize: 20,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#fff'
  },
  menuSection: {
    backgroundColor: '#fff',
    marginHorizontal: 0,
  },
  navbarSection: {
    paddingHorizontal: 15
  }
});

export default Profile;