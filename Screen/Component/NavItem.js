import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';

function NavItem(props){

  return(
    <TouchableOpacity onPress={ () => props.navigation.navigate(props.content)}>
      <View style={ styles.navItem }>
        <MaterialIcons name={ props.icon } size={24} color={ props.screenName === props.name ? '#4B7BE5' : 'black' } />
        <Text style={{ color: props.screenName === props.name ? '#4B7BE5' : 'black' }}>{ props.content }</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  navItem: {
    alignItems: 'center'
  }
});

function mapStateToProps(state){
  return {
    menu: state.menusActive
  };
}

export default connect(mapStateToProps)(NavItem);