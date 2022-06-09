import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import { MaterialIcons } from '@expo/vector-icons';

function FavoriteProduct(props){

  function handlePress(){
    props.navigation.navigate('Product details', props.product);
  }

  return (
    <TouchableOpacity onPress={ handlePress }>
      <View style={ styles.favoriteProductContent }>
        <Image style={ styles.smallImage } source={{ uri: props.product.source }}/>
        <View style={ styles.productInfo }>
          <View style={ styles.favoriteContainer }>
            <TouchableOpacity onPress={ props.onRemove }>
              <MaterialIcons name="favorite-border"  size={ 28 } color='red' />
            </TouchableOpacity>
          </View>
          <View style={ styles.productDetails}>
            <Text style={ globalStyles.title }>{ props.product.name }</Text>
            <Text style={{ ...globalStyles.title, ...globalStyles.textRed }}>{ props.product.price }</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  favoriteProductContent: {
    flexDirection: 'row',
    borderWidth: 2,
    padding: 1,
    borderColor: 'lightgrey',
    borderRadius: 10,
    marginBottom: 5
  },
  productDetails: {
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  smallImage: {
    width: 140,
    height: 140,
    borderRadius: 10,
    marginRight: 10
  },
  favoriteContainer: {
    alignItems: 'flex-end'
  },
  productInfo: {
    flex: 1
  }
});

export default FavoriteProduct;