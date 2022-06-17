import { createDrawerNavigator } from '@react-navigation/drawer'
import { connect } from 'react-redux';

import Home from '../Screen/Home';
import Orders from '../Screen/Orders';
import Promotions from '../Screen/Promotions';
import Login from '../Screen/Login';
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
        name="Login"
        component={ Login }
        options={{
          headerShown: false
        }}
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

function mapStateToProps(state){
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(DrawerNavigation);