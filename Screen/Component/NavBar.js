import { View, StyleSheet } from 'react-native';
import NavItem from './NavItem';
import { menus } from '../../Shared/menus';

function NavBar(props){

  const navItems = menus.map(function(item){
    return <NavItem 
        key={ item.id } 
        name={ item.name } 
        icon={ item.icon } 
        screenName={ props.screenName }
        content={ item.content }
        navigation={ props.navigation }
        root={ item.root }
      />
  });

  return(
    <View style={ styles.navbar }>
      { navItems }
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    paddingHorizontal: 15
  }
});

export default NavBar;