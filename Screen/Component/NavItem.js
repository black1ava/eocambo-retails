import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';

function NavItem(props){

  const [isActive, setIsActive] = useState(false);
  
  useEffect(function(){
    setIsActive(props.menu[props.name])
  }, [props.menu, props.name]);

  return(
    <TouchableOpacity>
      <View style={ styles.navItem }>
        <MaterialIcons name={ props.icon } size={24} color={ isActive ? '#4B7BE5' : 'black' } />
        <Text style={{ color: isActive ? '#4B7BE5' : 'black' }}>{ props.content }</Text>
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