import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
function Product(props){


  function handlePress(){
    props.navigation.navigate('Product details', props.product);
  }
  
  return(
    <TouchableOpacity style={ styles.product } onPress={ handlePress }>
      <Image style={ globalStyles.smallImage } source={{ uri: props.product.source }}/>
      <View style={{ ...globalStyles.mh5, ...styles.productInfo }}>
        <Text 
          style={{ ...globalStyles.textBold, ...globalStyles.mv10 }} 
          numberOfLines={ 1 } 
        >
          { props.product.name }
        </Text>
        <Text style={ globalStyles.textBold }>Starting at: 
          <Text style={{ ...globalStyles.textRed, marginLeft: 5 }}>
            ${ props.product.price }.00
          </Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  product: {
    backgroundColor: '#BDE6F1',
    paddingBottom: 10,
    borderRadius: 15,
    overflow: 'hidden',
    width: 150
  },
  productInfo: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 10
  }
});

export default Product;