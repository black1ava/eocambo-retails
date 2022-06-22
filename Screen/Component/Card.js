import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { v4 as uuidv4 } from 'uuid';
import { AntDesign } from '@expo/vector-icons';

import { globalStyles } from '../../styles/globalStyles';

function Card(props){

  const componentMarkp = props.data.map(function(item){

    const contentMarkup = item.items.map(function(item){
      const dropdownIcon = props.bottomSheetActive ? (
        <AntDesign name="up" size={18} color="red" />
      ) : (
        <AntDesign name="down" size={18} color="red" />
      );

      return item.text.dropdown ? (
        <TouchableOpacity key={ uuidv4() } onPress={ props.onBottomSheetToggle }>
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

  return (
    <View style={ styles.container }>
      <View style={ styles.card }>
        <ScrollView>
          { componentMarkp }
        </ScrollView>
      </View>
    </View>
  );
}

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