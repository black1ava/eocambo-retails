import { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import NavItem from './NavItem';
import { menus } from '../../Shared/menus';
import i18n from '../../Translations';

function NavBar(props){

  const code = useSelector(state => state.root.code);
  i18n.locale = code

  const navItems = menus.map(function(item){
    return <NavItem 
        key={ item.id } 
        name={ item.name } 
        icon={ item.icon } 
        screenName={ props.screenName }
        content={ i18n.t(item.content) }
        route={ item.route }
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