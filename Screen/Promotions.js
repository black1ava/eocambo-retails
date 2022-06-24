import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { globalStyles } from '../styles/globalStyles';
import NavBarScreenFrame from './Component/NavBarScreenFrame';
import Promotion from './Component/Promotion';
import i18n from '../Translations'

function Promotions({ navigation, route }){

  const fromDrawer = route.params?.fromDrawer;
  const promotions = useSelector(state => state.root.promotions);
  const code = useSelector(state => state.root.code);

  i18n.locale = code;

  function renderPromotions({ item }){
    return (
      <Promotion 
        name={ item.name } 
        start={ item.starts_at } 
        end={ item.ends_at } 
        image={ item.image }
        description={ item.description }
        navigation={ navigation }
      />
    )
  }

  function extractPromotionsKey(promotion){
    return promotion.id;
  }

  const promotionsMarkup = promotions.length > 0 ? (
    <View style={ styles.container }>
      <FlatList 
        data={ promotions }
        renderItem={ renderPromotions }
        keyExtractor={ extractPromotionsKey }
      />
    </View>
  ):(
    <View style={ globalStyles.center}>
      <Text style={ globalStyles.title }>Empty</Text>
    </View>
  );

  return(
    <View style={ styles.container }>
      <NavBarScreenFrame navigation={ navigation } title={ i18n.t('promotion.Promotion') } screenName="promotions" showNavbar={ !fromDrawer }>
        { promotionsMarkup }
      </NavBarScreenFrame>
    </View>
  );
}

Promotions.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default Promotions;