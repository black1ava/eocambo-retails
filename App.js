import { View, StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import 'react-native-get-random-values';

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

  // const [user, setUser] = useState();

  // const auth = getAuth();

  // useEffect(function(){
  //   const unsubscribeFromAuthStatusChanged = onAuthStateChanged(auth, function(user){
  //     if(user){
  //       setUser(user);
  //     }else{
  //       setUser(undefined);
  //     }
  //   });

  //   return unsubscribeFromAuthStatusChanged();
  // }, []);

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