import { 
  DrawerContentScrollView, 
  DrawerItem, 
  DrawerItemList 
} from '@react-navigation/drawer';
import { View, Image, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons'

import * as Firebase from '../firebase';
import { signOut } from 'firebase/auth';
import i18n from '../Translations';
import CustomNavigationTitle from './CustomNavigationTitle';

const auth = Firebase.auth;

function CustomDrawerContent(props){

  const user = useSelector(state => state.root.user);
  const code = useSelector(state => state.root.code);

  i18n.locale = code;

  const authDrawerItem = user === null ? (
    <DrawerItem 
      label={ () => <CustomNavigationTitle title={ i18n.t('drawer.Login') } icon={ <MaterialIcons name="login" size={24} color="#0AA1DD" /> } /> }
      onPress={ () => props.navigation.navigate("Login") }
    />
  ):(
    <DrawerItem 
      label={ () => <CustomNavigationTitle title={ i18n.t('drawer.Logout') } icon={ <MaterialIcons name="logout" size={24} color="#0AA1DD" /> } /> }
      onPress={ async () => {
        await signOut(auth);
        props.navigation.navigate('Me');
      } }
    />
  );

  return(
    <DrawerContentScrollView { ...props }>
      <View style={ styles.logoContainer }>
        <Image style={ styles.logo } source={require('../assets/eocambo.png')} />
      </View>
      <DrawerItemList { ...props }/>
      { authDrawerItem }
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
   alignItems: 'center' 
  },
  logo: {
    width: 150,
    height: 60
  },
});

export default CustomDrawerContent;