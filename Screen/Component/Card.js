import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { v4 as uuidv4 } from 'uuid';
import { AntDesign } from '@expo/vector-icons';
import PropTypes from 'prop-types';

import { globalStyles } from '../../styles/globalStyles';

const propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
          text: PropTypes.shape({
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            color: PropTypes.string
          })
        })
      )
    })
  ),
  touchable: PropTypes.bool,
  onPress: PropTypes.func,
  onBottomSheetToggle: PropTypes.func,
  bottomSheetActive: PropTypes.bool
};

function Card({ data, touchable, onPress, onBottomSheetToggle, bottomSheetActive }){

  const componentMarkp = data.map(function(item){

    const contentMarkup = item.items.map(function(item){
      const dropdownIcon = bottomSheetActive ? (
        <AntDesign name="up" size={18} color="red" />
      ) : (
        <AntDesign name="down" size={18} color="red" />
      );

      return item.text.dropdown ? (
        <TouchableOpacity key={ uuidv4() } onPress={ onBottomSheetToggle }>
          <View style={ styles.cardItem }>
            <Text>{ item.name }</Text>
            <View style={ styles.dropdown }>
              <Text style={{ ...globalStyles.textBold, color: item.text.color }}>{ item.text.value }</Text>
              { dropdownIcon }
            </View>
          </View>
        </TouchableOpacity>
      ) : (
        <View style={ styles.cardItem } key={ uuidv4() }>
          <Text>{ item.name }</Text>
          <Text style={{ ...globalStyles.textBold, color: item.text.color }}>{ item.text.value }</Text>
        </View>
      );
    });

    return (
      <View style={ styles.cardBody } key={ uuidv4() }>
        { item.title !== '' && <Text style={ styles.cardTitle }>{ item.title }</Text> }
        <View>
          { contentMarkup }
        </View>
      </View>
    )
  });

  const cartMarkup = touchable ? (
    <TouchableOpacity onPress={ onPress }>
      <View style={ styles.card }>
        <ScrollView>
          { componentMarkp }
        </ScrollView>
      </View>
    </TouchableOpacity>
  ):(
    <View style={ styles.card }>
        <ScrollView>
          { componentMarkp }
        </ScrollView>
      </View>
  );

  return (
    <View style={ styles.container }>
      { cartMarkup }
    </View>
  );
}

Card.propTypes = propTypes;

const styles = StyleSheet.create({
  card: {
    margin: 15,
    paddingHorizontal: 15,
    paddingBottom: 15,
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 5
  },
  container: {
    flex: 1
  },
  cardBody: {
    paddingBottom: 15,
    marginTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)'
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 18
  },
  cardItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10 
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export default Card;