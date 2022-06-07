import { View, StyleSheet } from 'react-native';
import NavItem from './NavItem';
import { menus } from '../../Shared/menus';

function NavBar(){

  const navItems = menus.map(function(item){
    return <NavItem 
        key={ item.id } 
        name={ item.id } 
        icon={ item.icon } 
        content={ item.content }
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
    marginTop: 5
  }
});

export default NavBar;