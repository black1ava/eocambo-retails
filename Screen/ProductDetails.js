import { View, Text, Image, StyleSheet, TouchableOpacity, LogBox } from 'react-native';
import { Ionicons, Feather, MaterialIcons } from '@expo/vector-icons';
import { globalStyles } from '../styles/globalStyles';

function ProductDetails(props){
  const product = props.route.params;

  LogBox.ignoreAllLogs();

  function handlePress(){
    if(props.navigation.canGoBack()){
      props.navigation.goBack();
    }
  }

  return(
    <View style={ globalStyles.content }>
      <Image style={ styles.image } source={{ uri: product.source }}/>
      <TouchableOpacity onPress={ handlePress } style={ styles.backButton } >
        <Ionicons  name="chevron-back-circle-outline" size={ 38 } color="#4B7BE5" />
      </TouchableOpacity>
      <TouchableOpacity style={  styles.goToCartButton }>
        <Feather name="shopping-cart" size={28} color="#4B7BE5" />
      </TouchableOpacity>
      <View style={ styles.productInfo }>
        <View style={ styles.productHeader }>
          <Text style={{ ...styles.productName, ...globalStyles.title }}>{ product.name }</Text>
          <MaterialIcons name="favorite-border"  size={ 38 } color="#4B7BE5" />
        </View>
        <View style={ styles.productBody }>
          <Text style={{ ...globalStyles.title, color: "#4B7BE5" }}>{ product.price }.00</Text>
          <View style={ styles.addToCartButtonContainer }>
            <TouchableOpacity style={ styles.addToCartButton }>
              <Text style={ styles.addToCartButtonText }>Add To Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  image: {
    width: '100%',
    height: '50%'
  },
  backButton: {
    position: 'absolute',
    left: 0,
    top: 32
  },
  goToCartButton: {
    position: 'absolute',
    right: 0,
    top: 32
  },
  productInfo: {
    flex: 1,
    marginTop: 10  
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'  
  },
  productBody: {
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: 15
  },
  addToCartButtonContainer: {
    alignItems: 'center'
  },
  addToCartButton: {
    paddingVertical: 5,
    alignItems: 'center',
    width: '65%',
    backgroundColor: "#4B7BE5",
    borderRadius: 10
  },
  addToCartButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  }
});

export default ProductDetails;