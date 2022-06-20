import { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  TouchableOpacity, 
  LogBox, 
  TextInput, 
  ScrollView,
  Alert
} from 'react-native';
import { Ionicons, Feather, MaterialIcons, AntDesign } from '@expo/vector-icons';
import { globalStyles } from '../styles/globalStyles';
import  { connect } from 'react-redux';
import { 
  addToFavoriteActive, 
  addToFavoriteInactive, 
  addToCart,
  updateToCart
} from '../action';

function ProductDetails(props){
  const product = props.route.params;
  // console.log(props.productsInCart);

  const [isFavorite, setIsFavorite] = useState(product.favorite);
  const [productsInCart, setProductsInCart] = useState(0);
  const [amount, setAmount] = useState(1);
  const [isSelected, setIsSelected] = useState(false);
  const [productInCartId, setProductInCartId] = useState(null);

  LogBox.ignoreAllLogs();

  function handleIsSelected(){
    setIsSelected(true);
  }

  useEffect(function(){
    setProductsInCart(props.productsInCart.filter(product => !product.order).length);

    const productInCart = props.productsInCart.find(function(productInCart){
      return productInCart.productId === product.id;
    });

    setAmount(!!productInCart ? productInCart.amount : 1);
    setProductInCartId(productInCart?.id);
    setIsSelected(!!productInCart);
  }, [props.productsInCart]);

  function handleAmountIncrease(){
    setAmount(amount => amount + 1);
  }

  function handleAmountDecrease(){
    if(amount > 1){
      setAmount(amount => amount - 1);
    }
  }


  function handlePress(){
    if(props.navigation.canGoBack()){
      props.navigation.goBack();
    }
  }

  function handleAddToFavoritePress(){

    if(props.user === null){
      Alert.alert(
        'Sign In Required!',
        'Please sign in before you can add this item to your favorite',
        [
          {
            text: 'Sign in',
            onPress: () => props.navigation.navigate('Login')
          }
        ]
      );

      return;
    }

    if(product.favorite){
      props.addToFavoriteInactive(product.id);
    }else{
      props.addToFavoriteActive(product.id);
    }

    setIsFavorite(current => !current);
  }

  function handleAddToCart(){

    if(props.user === null){
      Alert.alert(
        'Sign In Required!',
        'Please sign in before you can add this item to your favorite',
        [
          {
            text: 'Sign in',
            onPress: () => props.navigation.navigate('Login')
          }
        ]
      );

      return;
    }

    if(!isSelected){
      alert('Please select an option price');
      return;
    }

    if(!!productInCartId){
      props.updateToCart({ id: productInCartId, amount });
    }else{
      props.addToCart({ productId: product.id, amount });
    }

    props.navigation.navigate('Cart');
  }

  function handleNavigateToCart(){
    props.navigation.navigate('Cart');
  }

  const numberInCartMarkup = (
    <View style={ styles.inCartContainer }>
      <Text style={ styles.inCart }>{ productsInCart }</Text>
    </View>
  );

  const radioButtonMarkup = isSelected ? (
    <Ionicons name="radio-button-on" size={24} color="#0AA1DD" />
    ) : (
    <Ionicons name="radio-button-off" size={24} color="#0AA1DD" />
  );

  return(
    <View style={ globalStyles.content }>
      <Image style={ styles.image } source={{ uri: product.uri }}/>
      <TouchableOpacity onPress={ handlePress } style={ styles.backButton } >
        <Ionicons  name="chevron-back-circle-outline" size={ 38 } color="#4B7BE5" />
      </TouchableOpacity>
      <TouchableOpacity style={ styles.goToCartButton } onPress={ handleNavigateToCart }>
        <Feather name="shopping-cart" size={28} color="#4B7BE5" />
        { productsInCart > 0 && numberInCartMarkup }
      </TouchableOpacity>
      <View style={ styles.productInfo }>
        <View style={ styles.productHeader }>
          <Text style={{ ...styles.productName, ...globalStyles.title, marginRight: 10 }}>
            { product.name }
          </Text>
          <TouchableOpacity onPress={ handleAddToFavoritePress }>
            <MaterialIcons name="favorite-border"  size={ 38 } color={ isFavorite ? 'red' : '#4B7BE5' } />
          </TouchableOpacity>
        </View>
        <View style={ styles.productBody }>
          <Text style={{ ...globalStyles.title, ...globalStyles.textRed }}>${ parseInt(product.price) }.00</Text>
          <Text style={ globalStyles.textBold }>Description</Text>
          <ScrollView showsVerticalScrollIndicator={ false }>
            <Text>{ product.description || 'null' }</Text>
          </ScrollView>
          <View>
            <View style={ styles.selectedOptionsHeader}>
              <Text style={ globalStyles.textBold }>Select options</Text>
              <Text style={ globalStyles.textBold}>01 required</Text>
            </View>
            <View style={ styles.radioButton }>
              <TouchableOpacity onPress={ handleIsSelected }>
                <View style={ styles.radioContent }>
                    <View style={ styles.selectedName }>
                      { radioButtonMarkup }
                      <Text>Normal</Text>
                    </View>
                    <Text style={ globalStyles.textRed }>${ parseInt(product.price) }.00</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <View style={ styles.instructions }>
              <Text>Special instructions:</Text>
              <View style={{ borderBottomWidth: 1, borderBottomColor: '#7F8487' }}>
                <TextInput style={{ fontSize: 14}}/>
              </View>
            </View>
            <View style={ styles.buttonGroup }>
            <View style={ styles.setAmount }>
              <TouchableOpacity onPress={ handleAmountDecrease }>
                <View>
                  <AntDesign name="minuscircleo" size={28} color="black" />
                </View>
              </TouchableOpacity>
              <Text style={ styles.amountText }>{ amount }</Text>
              <TouchableOpacity onPress={ handleAmountIncrease }>
                <AntDesign name="pluscircleo"  size={28} color="black" />
              </TouchableOpacity>
            </View>
              <TouchableOpacity style={ styles.addToCartButton } onPress={ handleAddToCart }>
                <Text style={ styles.addToCartButtonText }>
                  { !!productInCartId ? 'Update To Cart' : 'Add To Cart' }
                </Text>
              </TouchableOpacity>
            </View>
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
    height: '40%'
  },
  backButton: {
    position: 'absolute',
    left: 10,
    top: 32
  },
  goToCartButton: {
    position: 'absolute',
    right: 10,
    top: 35
  },
  productInfo: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 8
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productBody: {
    flex: 1,
    justifyContent: 'space-between',
    marginBottom: 15
  },
  buttonGroup: {
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
  },
  instructionsInput: {
    shadowColor: 'rgba(0, 0, 0, 1)',
    shadowOpacity: 1,
    elevation: 3,
    padding: 5,
    fontSize: 18,
  },
  inCartContainer: {
    backgroundColor: '#FF5D5D',
    alignItems: 'center',
    justifyContent:'center',
    borderRadius: 300,
    width: 15,
    height: 15,
    position: 'absolute',
    right: -5,
    top: 0
  },
  inCart: {
    color: '#ffffff',
    fontSize: 10,
  },
  setAmount: {
    flexDirection: 'row',
    marginVertical: 15,
    alignItems: 'center'
  },
  amountText: {
    marginHorizontal: 5,
    fontSize: 22, 
    fontWeight: 'bold'
  },
  selectedOptionsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 10
  },
  radioButton: {
    paddingVertical: 10
  },
  radioContent: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  selectedName: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});

function mapStateToProps(state){
  return {
    productsInCart: state.productsInCart,
    user: state.user
  };
}

const mapDispatchToProps = {
  addToFavoriteActive,
  addToFavoriteInactive,
  addToCart,
  updateToCart
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);