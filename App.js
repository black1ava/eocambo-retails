import { View, StyleSheet, StatusBar } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import reducer from './reducer';
import Home from './Screen/Home';
import Favorite from './Screen/Favourite';
import Orders from './Screen/Orders';
import Promotions from './Screen/Promotions';
import Profile from './Screen/Profile';
import ProductDetails from './Screen/ProductDetails';


const Stack = createNativeStackNavigator();
const store = configureStore({ reducer });

export default function App() {
  return (
    <Provider store={ store }>
      <View style={styles.container }>
        <StatusBar barStyle={'light-content'} backgroundColor='#0AA1DD' />
        <NavigationContainer>
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
                headerBackVisible: true
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </Provider>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});