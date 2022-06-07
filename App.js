import { View, StyleSheet, StatusBar } from 'react-native';
import Home from './Screen/Home';

export default function App() {
  return (
    <View style={ styles.container }>
      <StatusBar barStyle={'light-content'} backgroundColor='#0AA1DD' />
      <Home />
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});