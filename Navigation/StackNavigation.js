import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Favorite from '../Screen/Favourite';
import Profile from '../Screen/Profile';
import ProductDetails from '../Screen/ProductDetails';
import Cart from '../Screen/Cart';
import Categories from '../Screen/Categories';
import Checkout from '../Screen/Checkout';
import DrawerNavigation from './DrawerNavigation';
import Search from '../Screen/Search';
import { connect } from 'react-redux';

const Stack = createNativeStackNavigator();

function StackNavigation(props){

  return (
    <Stack.Navigator
      screenOptions={{
        headerBackVisible: false,
        headerShown: false,
        headerStyle:{
          backgroundColor: '#0AA1DD',
        },
        headerTitleStyle: {
          color: '#fff'
        },
        animation: 'none'
      }}
    >
      <Stack.Screen 
        name="Root"
        component={ DrawerNavigation }
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="Favorite"
        component={ Favorite }
      />
      <Stack.Screen 
        name="Me"
        component={ Profile }
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen 
        name="Product details"
        component={ ProductDetails }
        options={{
          headerShown: false 
        }}
      />
      <Stack.Screen 
        name="Cart"
        component={ Cart }
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen 
        name="Categories"
        component={ Categories }
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen 
        name="Checkout"
        component={ Checkout }
      />
      <Stack.Screen 
        name="Search"
        component={ Search }
      />
    </Stack.Navigator>
  );
}

function mapStateToProps(state){
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(StackNavigation);