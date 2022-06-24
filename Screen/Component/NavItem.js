import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';

function NavItem(props){

  function handleNavigate(){
    
    if(props.root){
      props.navigation.navigate('Root', { screen: props.route });
      return;
    }

    props.navigation.navigate(props.route);
  }

  return(
    <TouchableOpacity onPress={ handleNavigate }>
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
    menu: state.root.menusActive
  };
}

export default connect(mapStateToProps)(NavItem);