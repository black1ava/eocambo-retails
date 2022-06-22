import { View, StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import 'react-native-get-random-values';
import 'react-native-gesture-handler';

import reducer from './reducer';
import Navigation from './Navigation';

const store = configureStore({ 
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
  })
});

export default function App() {

  return (
    <Provider store={ store }>
      <View style={styles.container }>
        <StatusBar barStyle={'light-content'} backgroundColor='#0AA1DD' />
        <Navigation />
      </View>
    </Provider>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});