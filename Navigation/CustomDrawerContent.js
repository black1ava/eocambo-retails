import { 
  DrawerContentScrollView, 
  DrawerItem, 
  DrawerItemList 
} from '@react-navigation/drawer';
import { View, Image, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import * as Firebase from '../firebase';
import { signOut } from 'firebase/auth';

const auth = Firebase.auth;

function CustomDrawerContent(props){

  const user = useSelector(state => state.user);


  console.log(user);

  const authDrawerItem = user === null ? (
    <DrawerItem 
      label="Login"
      onPress={ () => props.navigation.navigate("Login") }
    />
  ):(
    <DrawerItem 
      label="Log out"
      onPress={ async () => {
        await signOut(auth);
        props.navigation.navigate('Home');
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