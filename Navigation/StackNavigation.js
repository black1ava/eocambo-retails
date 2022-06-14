import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../Screen/Home';
import Favorite from '../Screen/Favourite';
import Orders from '../Screen/Orders';
import Promotions from '../Screen/Promotions';
import Profile from '../Screen/Profile';
import ProductDetails from '../Screen/ProductDetails';
import Cart from '../Screen/Cart';
import Categories from '../Screen/Categories';
import Checkout from '../Screen/Checkout';
import Login from '../Screen/Login';

const Stack = createNativeStackNavigator();

function StackNavigation(){
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackVisible: false,
        headerStyle:{
          backgroundColor: '#0AA1DD',
        },
        headerTitleStyle: {
          color: '#fff'
        }
      }}
    >
      <Stack.Screen 
        name="Home"
        component={ Home }
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen 
        name="Favorite"
        component={ Favorite }
      />
      <Stack.Screen 
        name="Orders"
        component={ Orders }
      />
      <Stack.Screen 
        name="Promotions"
        component={ Promotions }
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
    </Stack.Navigator>
  );
}

export default StackNavigation;