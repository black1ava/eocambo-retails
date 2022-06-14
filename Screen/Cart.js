import { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { removeFromCart } from '../action';

import ScreenFrame from './Component/ScreenFrame';
import CartProduct from './Component/CartProduct';

function Cart(props){

  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(function(){

    const products = props.productsInCart.map(function(productInCart){
      return {
        id: productInCart.id,
        product: props.products.find(function(product){
          return product.id === productInCart.productId;
        }),
        amount: productInCart.amount
      };
    });

    setProducts(products);

    setTotal(products.map(function(item){
      return { price: item.product.price, amount: item.amount }
    }).reduce(function(acc, curr){
      return acc + parseInt(curr.price) * curr.amount;
    }, 0));
  
  }, [props.productsInCart, props.products, props.productsInCart.amount]);

  function handleClose(id){
    props.removeFromCart(id);
  }

  function handleContinueToCart(){
    props.navigation.navigate("Checkout");
  }

  function renderProducts({ item }){
    return <CartProduct 
      product={ item.product } 
      amount={ item.amount } 
      onClose={ () => handleClose(item.id) } 
      id={ item.id }
    />
  }

  function extractProductId(product){
    return product.id
  }

  return(
    <View style={{ flex: 1 }}>
      <ScreenFrame navigation={ props.navigation } title="Cart"  hasSearch>
        <View style={{ padding: 15, flex: 1 }}>
          <FlatList 
            data={ products }
            renderItem={ renderProducts }
            keyExtractor={ extractProductId }
          />
        </View>
        <View style={ styles.priceContainer }>
          <View style={ styles.totalContainer }>
            <Text style={ styles.total }>
              Total: 
            </Text>
            <Text style={ styles.totalPrice }>
              ${ total }.00
            </Text>
          </View>
          <View style={ styles.checkoutButton }>
            <TouchableOpacity>
              <Text style={ styles.checkoutButtonText } onPress={ handleContinueToCart }>Continue To Checkout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScreenFrame>
    </View>
  );
  }

const styles = StyleSheet.create({
  total: {
    fontWeight: 'bold',
    fontSize: 20
  },
  totalPrice: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'red'
  },
  totalContainer: {
    marginHorizontal: 15,
    alignItems: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    shadowColor: 'black',
    backgroundColor: '#F9F9F9',
    padding: 25,
    elevation: 10,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    width: '100%'
  },
  checkoutButton: {
    backgroundColor: '#0AA1DD',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    borderRadius: 5,
    elevation: 4,
    borderWidth:3,
    borderColor: '#fff'
  },
  checkoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18
  }
});

function mapStateToProps(state){
  return {
    productsInCart: state.productsInCart,
    products: state.products
  };
}

const mapDispatchToProps = {
  removeFromCart
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);