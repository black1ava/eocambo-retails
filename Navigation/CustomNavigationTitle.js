import { View, Text, StyleSheet } from 'react-native';

function CustomNavigationTitle(props){
  return(
    <View>
      <Text style={ styles.title }>{ props.title }</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: '500',
    borderBottomWidth: 1,
    borderBottomColor: 'black'
  }
});

export default CustomNavigationTitle;