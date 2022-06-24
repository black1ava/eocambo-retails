import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import { MaterialCommunityIcons } from '@expo/vector-icons';

function Promotion({ name, start, end, image, description, navigation }){

  function handlePress(){
    navigation.navigate('PromotionDetails', { start, end, description, image });
  }

  return (
    <TouchableOpacity style={ styles.promotionContainer } onPress={ handlePress }>
      <View style={ styles.promotionIconContainer }>
        <View style={ styles.promotionIcon }>
        <MaterialCommunityIcons name="brightness-percent" size={24} color="#0AA1DD" />
        </View>
      </View>
      <View>
        <Text style={ styles.promotionName }>{ name }</Text>
        <View style={ styles.promotionDate }>
          <Text>Start from: { moment(start).format('MMMM Do YYYY') }</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

Promotion.propTypes = {
  name: PropTypes.string.isRequired,
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
  image: PropTypes.string,
  description: PropTypes.string.isRequired,
  navigation: PropTypes.object.isRequired
}

const styles = StyleSheet.create({
  promotionContainer: {
    marginVertical: 10,
    marginHorizontal: 20,
    backgroundColor: '#FFCC8F',
    padding: 20,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#fff',
    elevation: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  promotionName: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10
  },
  promotionDate: {
    flexDirection: 'row'
  },
  promotionIcon: {
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 10,
    marginRight: 15
  }
});

export default Promotion;