import { createDrawerNavigator } from '@react-navigation/drawer'
import { useSelector } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';

import Home from '../Screen/Home';
import Orders from '../Screen/Orders';
import Promotions from '../Screen/Promotions';
import Settings from '../Screen/Settings';
import CustomDrawerContent from './CustomDrawerContent';
import i18n from '../Translations';
import CustomNavigationTitle from './CustomNavigationTitle';
import Notification from '../Screen/Notification/';
import AboutUs from '../Screen/AboutUs';


const Drawer = createDrawerNavigator();

function DrawerNavigation(){

  const code = useSelector(state => state.root.code);
  i18n.locale = code;

  return (
    <Drawer.Navigator
      drawerContent={ CustomDrawerContent } 
      screenOptions={{
        drawerActiveBackgroundColor: 'none',
        drawerActiveTintColor: 'black',
        drawerIcon: false,
        headerShown: false,
      }}
    >
      <Drawer.Screen 
        name="Home"
        component={ Home }
        options={{
          title: () => <CustomNavigationTitle title={ i18n.t('home.Home') } icon={ <MaterialIcons name="home" size={24} color="#0AA1DD" /> } />
        }}

      />
      <Drawer.Screen 
        name="Orders"
        component={ Orders }
        options={{
          title: () => <CustomNavigationTitle title={ i18n.t('drawer.My Orders') } icon={ <MaterialIcons name="shopping-cart" size={24} color="#0AA1DD" /> } />
        }}
      />
      <Drawer.Screen 
        name="Promotions"
        component={ Promotions }
        options={{
          title: () => <CustomNavigationTitle title={ i18n.t('promotion.Promotion') }  icon={ <MaterialIcons name="attach-money" size={24} color="#0AA1DD" />}/>
        }}
      />
      <Drawer.Screen 
        name="Notification"
        component={ Notification }
        options={{
          title: () => <CustomNavigationTitle title={ i18n.t('settings.Notifications') } icon={ <MaterialIcons name="notifications" size={24} color="#0AA1DD" /> } />
        }}
      />
      <Drawer.Screen 
        name="Settings"
        component={ Settings }
        options={{
          headerShown:false,
          title: () => <CustomNavigationTitle title={ i18n.t('settings.Setting') } icon={ <MaterialIcons name="settings" size={24} color="#0AA1DD" />}/>
        }}
      />
      <Drawer.Screen 
        name="AboutUs"
        component={ AboutUs }
        options={{
          title: () => <CustomNavigationTitle title={ i18n.t('drawer.About Us') } icon={ <MaterialIcons name="groups" size={24} color="#0AA1DD" /> } />
        }}
      />
    </Drawer.Navigator>
  );
}


export default DrawerNavigation;