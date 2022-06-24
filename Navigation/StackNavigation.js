import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Favorite from '../Screen/Favourite';
import Profile from '../Screen/Profile';
import ProductDetails from '../Screen/ProductDetails';
import Cart from '../Screen/Cart';
import Categories from '../Screen/Categories';
import Checkout from '../Screen/Checkout';
import DrawerNavigation from './DrawerNavigation';
import Search from '../Screen/Search';
import Login from '../Screen/Login';
import PromotionDetails from '../Screen/PromotionDetails';
import EditProfile from '../Screen/EditProfile';
import OrderDetails from '../Screen/OrderDetails';

const Stack = createNativeStackNavigator();
function StackNavigation(){

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
      <Stack.Screen 
        name="Login"
        component={ Login }
      />
      <Stack.Screen 
        name="PromotionDetails"
        component={ PromotionDetails }
      />
      <Stack.Screen 
        name="EditProfile"
        component={ EditProfile }
      />
      <Stack.Screen 
        name="OrderDetails"
        component={ OrderDetails }
      />
    </Stack.Navigator>
  );
}

export default StackNavigation;