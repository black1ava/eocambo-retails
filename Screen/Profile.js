import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native'
import { globalStyles } from '../styles/globalStyles';
import NavBar from './Component/NavBar';
import { MaterialIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import Button from '../Shared/Button';
import { menus } from '../Shared/menus';
import ProfileMenuItem from './Component/ProfileMenuItem';
import NavBarScreenFrame from './Component/NavBarScreenFrame';

function Profile(props){

  const [menusProfile, setMenusProfile] = useState(menus);
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [initial, setInitial] = useState(null);
  const user = useSelector(state => state.user);

  useEffect(function(){
    if(user !== null){
      const { name, email } = user;
      setEmail(email);
      setUserName(name);
      
      const regExp = new RegExp('^[\+0-9]+');
  
      if(!regExp.test(name)){
        setInitial(name[0]?.toUpperCase());
      }
    }
  }, [user]);
  

  useEffect(function(){

    setMenusProfile(function(currentMenus){
      const removeProfileMenus = currentMenus.filter(function(menu){
        return menu.name !== 'profile'
      });
      const updateProfileMenus = [
        ...removeProfileMenus,
        { id: uuidv4(), name: 'notifications', icon: 'notifications', content: 'Notification' },
        { id: uuidv4(), name: 'settings', icon: 'settings', content: 'Settings' },
        { id: uuidv4(), name: 'logout', icon: 'logout', content: 'Logout' }
      ];

      return updateProfileMenus;
    });
  }, []);

  function handleNavigateToSettings(){
    props.navigation.navigate('Settings');
  }


  function renderMenu({ item }){
    return <ProfileMenuItem 
      icon={ item.icon } 
      content={ item.content }
      name={ item.name }
      navigation={ props.navigation }
    />
  }

  function extractMenuId(menu){
    return menu.id
  }

  function handleNavigateToSignin(){
    props.navigation.navigate('Login');
  }

  function handleEditProfile(){
    props.navigation.navigate('EditProfile');
  }

  const initialText = !!initial ? (
    <Text style={ styles.initialText }>{ initial }</Text>
    ) : (
    <Image style={ styles.logo } source={require('../assets/eocambo.png')} />
  );

  const profileMarkUp = (
    <View style={{ ...globalStyles.content, marginHorizontal: 0, backgroundColor: 'grey' }}>
      <View style={ styles.profileSection }>
        <View style={ styles.userProfile }>
          <View style={ styles.userProfileContent }>
            <View style={ styles.userInfo }>
              <View style={{ ...styles.initial, backgroundColor: !!initial ? 'darkgreen' : 'white' }}>
                { initialText }
              </View>
            </View>
            <View style={ styles.settings }>
              <TouchableOpacity onPress={ handleNavigateToSettings }>
                <MaterialIcons name="settings" size={24} color="white" />
              </TouchableOpacity>
            </View>
            <Text style={{ color: '#fff'}}>{ email }</Text>
            <Text style={ styles.userTextInfo }>{ userName }</Text>
            <Button backgroundColor="#fff" title="Edit profiles" onAction={ handleEditProfile }/>
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

  const noUserLoginMarkup = (
    <NavBarScreenFrame navigation={ props.navigation } showNavbar screenName="profile">
      <View style={ globalStyles.center }>
        <Text style={{ ...globalStyles.textBold, marginBottom: 10 }}>You are not signed in</Text>
        <Button title="SIGN IN" backgroundColor="#0AA1DD" color="white" onAction={ handleNavigateToSignin }/>
      </View>
    </NavBarScreenFrame>
  );

  return (
    <>
      { user === null ? noUserLoginMarkup : profileMarkUp }
    </>
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
    marginTop: 10
  },
  navbarSection: {
    paddingHorizontal: 15
  },
  logo: {
    width: 80,
    height: 30
  }
});

export default Profile;