import { useEffect } from 'react';
import { View, Text } from 'react-native';
import NavBar from './Component/NavBar';
import { globalStyles } from '../styles/globalStyles';
import { connect } from 'react-redux';
import { toggleFavoriteMenuActive, inactivateAllMenus } from '../action';

function Favorite(props){

  useEffect(function(){
    props.inactivateAllMenus();
    props.toggleFavoriteMenuActive();
  }, [props.toggleFavoriteMenuActive, props.inactivateAllMenus]);

  return(
    <View style={ globalStyles.content }>
      <View style={ globalStyles.center }>
        <Text style={ globalStyles.title }>No item found</Text>
      </View>
      <NavBar navigation={ props.navigation } screenName="favorite"/>
    </View>
  );
}

const mapDispatchToProps = {
  toggleFavoriteMenuActive,
  inactivateAllMenus
};

export default connect(null, mapDispatchToProps)(Favorite);