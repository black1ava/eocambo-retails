import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

function MenuItem(props){
  return (
    <View>
      <TouchableOpacity onPress={ props.onAction }>
        <View style={ styles.menuItem }>
          <Text 
            style={{ fontWeight: props.fontWeight }}
          >
            { props.text }
          </Text>
          <FontAwesome name="angle-right" size={24} color="#5FD068" />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  menuItem: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)'
  }
});

export default MenuItem;