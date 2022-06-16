import { 
  DrawerContentScrollView, 
  DrawerItem, 
  DrawerItemList 
} from '@react-navigation/drawer';
import { View, Image, StyleSheet } from 'react-native';

function CustomDrawerContent(props){

  return(
    <DrawerContentScrollView { ...props }>
      <View style={ styles.logoContainer }>
        <Image style={ styles.logo } source={require('../assets/eocambo.png')} />
      </View>
      <DrawerItemList { ...props }/>
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