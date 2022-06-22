import { createDrawerNavigator } from '@react-navigation/drawer'

import Home from '../Screen/Home';
import Orders from '../Screen/Orders';
import Promotions from '../Screen/Promotions';
import Settings from '../Screen/Settings';
import CustomDrawerContent from './CustomDrawerContent';


const Drawer = createDrawerNavigator();

function DrawerNavigation(){

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

      />
      <Drawer.Screen 
        name="Orders"
        component={ Orders }
      />
      <Drawer.Screen 
        name="Promotions"
        component={ Promotions }
      />
      <Drawer.Screen 
        name="Settings"
        component={ Settings }
        options={{
          headerShown:false
        }}
      />
    </Drawer.Navigator>
  );
}


export default DrawerNavigation;