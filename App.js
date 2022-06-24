import { View, StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import 'react-native-get-random-values';
import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/es/integration/react'
import ReduxThunk from 'redux-thunk';

import reducer from './reducer';
import Navigation from './Navigation';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whiteList: ['root']
};

const rootReducer = combineReducers({
  root: reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({ 
  reducer: persistedReducer,
  middleware: [ReduxThunk]
});

const persistsStore = persistStore(store);

export default function App() {

  return (
    <Provider store={ store }>
      <PersistGate loading={ null } persistor={ persistsStore }>
        <View style={styles.container }>
          <StatusBar barStyle={'light-content'} backgroundColor='#0AA1DD' />
          <Navigation />
        </View>
      </PersistGate>
    </Provider>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});