import { View, Text, StyleSheet, Image } from 'react-native';
import ScreenFrame from './Component/ScreenFrame';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useSelector } from 'react-redux';

import i18n from '../Translations';

const propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired
};

function PromotionDetails({ navigation, route }){

  const promotion = route.params;
  const code = useSelector(state => state.root.code);

  i18n.locale = code;

  return (
    <ScreenFrame navigation={ navigation } title={ i18n.t('promotion.Promotion Detail') }>
      <View style={ styles.promotionContainer }>
        <View style={ styles.imageContainer }>
          <Image style={ styles.image } source={{ 
            uri: promotion.image
          }} />
          <View style={ styles.promotionDate }>
            <Text style={ styles.date }>
              Start: { moment(promotion.start).format('YYYY Do MMM') }
            </Text>
            <Text style={ styles.date }>
              End: { moment(promotion.end).format('YYYY Do MMM') }
            </Text>
          </View>
        </View>
        <View>
          <Text style={ styles.description }>{ i18n.t('productdetail.Description') }</Text>
          <Text>{ promotion.description }</Text>
        </View>
      </View>
    </ScreenFrame>
  );
}

PromotionDetails.propTypes = propTypes;

const styles = StyleSheet.create({
  promotionContainer: {
    flex: 1,
    padding: 20
  },
  imageContainer: {
    height: '50%',
    position:'relative',
    borderRadius: 10,
    overflow: 'hidden'
  },
  image: {
    height: '100%'
  },
  promotionDate: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
  date: {
    color: '#fff'
  },
  description: {
    marginVertical: 10,
    fontWeight: 'bold',
    fontSize: 18
  }
});

export default PromotionDetails;