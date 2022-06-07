import { View, StyleSheet } from 'react-native';

function Seperator(){
  return (
    <View style={ styles.seperator }>

    </View>
  );
}

const styles = StyleSheet.create({
  seperator: {
    paddingHorizontal: 5
  }
});

export default Seperator;