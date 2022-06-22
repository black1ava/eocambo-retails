import { View, StyleSheet, StatusBar } from 'react-native';
import Home from './Screen/Home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'
import reducer from './reducer';


const Stack = createNativeStackNavigator();
const store = configureStore({ reducer });

export default function App() {
  return (
    <Provider store={ store }>
      <View style={ styles.container }>
        <StatusBar barStyle={'light-content'} backgroundColor='#0AA1DD' />
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false
            }}
          >
            <Stack.Screen 
              name="Home"
              component={ Home }
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