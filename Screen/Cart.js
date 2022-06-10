import { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import ScreenFrame from './Component/ScreenFrame';
import { connect } from 'react-redux';

import CartProduct from './Component/CartProduct';

function Cart(props){

  const [products, setProducts] = useState([]);

  useEffect(function(){
    setProducts(props.productsInCart.map(function(cart){
      return {
        id: cart.id,
        product: props.products.find(product => product.id === cart.productId),
        amount: cart.amount
      }
    }));
  }, [props.productsInCart, props.products]);

  function renderProducts({ item }){
    return <CartProduct product={ item.product } amount={ item.amount} />
  }

  function extractProductId(product){
    return product.id
  }

  return(
    <View style={{ flex: 1 }}>
      <ScreenFrame navigation={ props.navigation } title="Cart"  hasSearch>
        <FlatList 
          data={ products }
          renderItem={ renderProducts }
          keyExtractor={ extractProductId }
        />
      </ScreenFrame>
    </View>
  );
}

function mapStateToProps(state){
  return {
    productsInCart: state.productsInCart,
    products: state.products
  };
}

export default connect(mapStateToProps)(Cart);