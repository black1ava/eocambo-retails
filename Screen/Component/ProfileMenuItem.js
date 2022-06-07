import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';

function ProfileMenuItem(props){

  function handlePress(){
    props.navigation.navigate(props.content);
  }

  return (
    <TouchableOpacity style={{ ...styles.menuItem, ...styles.menu }} onPress={ handlePress }>
      <View style={ styles.menuItem }>
        <MaterialIcons name={ props.icon } size={24} color='#4B7BE5' />
        <Text style={ styles.content }>{ props.content }</Text>
      </View>
      <AntDesign name="right" size={24} color="#4B7BE5" />
    </TouchableOpacity>
  );
}

const styles= StyleSheet.create({
  menu: {
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    color: '#4B7BE5',
    marginLeft: 5
  }
});

export default ProfileMenuItem;