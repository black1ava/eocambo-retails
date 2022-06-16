import { useState, useEffect } from 'react'; 
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';

import NavBarScreenFrame from './Component/NavBarScreenFrame';
import { globalStyles } from '../styles/globalStyles';
import Card from './Component/Card';

function Orders(props){

  const [orderProducts, setOrderProducts] = useState([]);

  const fromDrawer = props.route.params?.fromDrawer;
  const productsInCart = useSelector(state => state.productsInCart);
  const products = useSelector(state => state.products);
  const total  = useSelector(state => state.total);

  useEffect(function(){
    const _products = productsInCart
      .filter(product => product.order)
      .map(function(productInCart){
        return {
          ...productInCart,
          product: products.find(product => product.id === productInCart.productId)
        }
      });

    const orderProdcts = _products.map(function(product){
      return {
        name: `${ product.amount}x ${ product.product.name }`,
        text: {
          value: `$${ parseInt(product.product.price * product.amount) }.00`,
          color: 'red'
        }
      }
    });

    setOrderProducts(orderProdcts);

  }, [productsInCart, products]);

  const orderScreenMarkup = (
    <Card 
      data={[
        {
          title: '',
          items: [
            {
              name: 'Your order status',
              text: {
                value: 'Requesting',
              }
            },
            {
              name: 'Date',
              text: {
                value: `${ String((new Date()).getDate()).padStart(2, '0') } / ${ String((new Date() ).getMonth() + 1).padStart(2, '0') } / ${ (new Date()).getFullYear() }`
              }
            },
            {
              name: 'ID Number',
              text: {
                value: Math.floor(Math.random() * 1000000 + 1),
              }
            },
          ]
        },
        {
          title: 'Order items',
          items: orderProducts
        },
        {
          title: '',
          items: [
            {
              name: 'Delivery fee',
              text: {
                value: '$2.00',
                color: 'red'
              }
            },
            {
              name: 'Total(US)',
              text: {
                value: `${ total + 2 }.00`,
                color: 'red'
              }
            }
          ]
        }
      ]}
    />
  );

  return(
    <NavBarScreenFrame 
      navigation={ props.navigation } 
      screenName="orders" 
      showNavbar={ !fromDrawer }
      title="My orders"
    >
      { orderProducts.length > 0 ? orderScreenMarkup : (
        <View style={ globalStyles.center}>
          <Text style={ globalStyles.title }>No order history yet</Text>
        </View>
      ) }
    </NavBarScreenFrame>
  );
}

export default Orders;