import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

function CategoryProduct(props){

  function handlePress(){
    const { product } = props;
    props.navigation.navigate('Product details', product);
  }

  return (
    <View>
      <TouchableOpacity onPress={ handlePress }>
        <View style={ styles.product }>
          <Image style={ globalStyles.smallImage } source={{ uri: props.product.source }} />
          <View style={ styles.productInfoContainer }>
            <Text 
              style={{ ...globalStyles.textBold, ...globalStyles.mv10 }}
              numberOfLines={ 1 }
            >
              { props.product.name }
            </Text>
            <Text style={ globalStyles.textBold }>
              Starting at: 
              <Text style={{ ...globalStyles.textBold, ...globalStyles.textRed }}>
                ${ props.product.price }.00
              </Text>
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  product: {
    marginHorizontal: 5,
    marginVertical: 10,
    width: 150,
    backgroundColor: '#BDE6F1',
    paddingBottom: 8,
    borderRadius: 15,
    overflow: 'hidden'
  },
  productInfoContainer: {
    padding: 8
  }
});

export default CategoryProduct;