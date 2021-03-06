import { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { removeFromCart, setTotal } from '../action';

import ScreenFrame from './Component/ScreenFrame';
import CartProduct from './Component/CartProduct';
import { globalStyles } from '../styles/globalStyles';
import Spinner from './Component/Spinner';
import i18n from '../Translations';

function Cart(props){

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  i18n.locale = props.code;

  useEffect(function(){
    
    setLoading(true);

    const products = props.productsInCart
      .filter(product => !product.order)
      .map(function(productInCart){
      return {
        id: productInCart.id,
        product: props.products.find(function(product){
          return product.id === productInCart.productId;
        }),
        amount: productInCart.amount
      };
    });

    setProducts(products);

    const total = products.map(function(item){
      return { price: item.product.price, amount: item.amount }
    }).reduce(function(acc, curr){
      return acc + parseInt(curr.price) * curr.amount;
    }, 0);

    props.setTotal(total);
    setLoading(false);
  
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
      navigation={ props.navigation }
      id={ item.id }
    />
  }

  function extractProductId(product){
    return product.id
  }

  const cartScreenMarkup = (
    <View style={{ flex: 1 }}>
      <ScreenFrame navigation={ props.navigation } title={ i18n.t('cart.Your Cart') }  hasSearch loading={ loading }>
        <View style={{ flex: 1 }}>
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
                { i18n.t('cart.Total') }: 
              </Text>
              <Text style={ styles.totalPrice }>
                ${ props.total }.00
              </Text>
            </View>
            <View style={ styles.checkoutButton }>
              <TouchableOpacity>
                <Text style={ styles.checkoutButtonText } onPress={ handleContinueToCart }>{ i18n.t('cart.Check Out')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScreenFrame>
    </View>
  );

  return(
    <>
    {
      products.length === 0 ? (
        <ScreenFrame navigation={ props.navigation } title={ i18n.t('cart.Your Cart') }  hasSearch hasGoToCart>
          <View style={ globalStyles.center }>
            <Text style={{ ...globalStyles.textBold, ...globalStyles.title }}>{ i18n.t('cart.No items in cart') }</Text>
          </View>
        </ScreenFrame>
      ) :(
        cartScreenMarkup
      )
    }
    </>
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
    productsInCart: state.root.productsInCart,
    products: state.root.products,
    total: state.root.total,
    code: state.root.code
  };
}

const mapDispatchToProps = {
  removeFromCart,
  setTotal
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);