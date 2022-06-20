import { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { BottomSheet } from 'react-native-btr';
import { Ionicons,AntDesign } from '@expo/vector-icons';

import Card from './Component/Card';
import ScreenFrame from './Component/ScreenFrame';


function Checkout(props){
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [payByCash, setPayBayCash] = useState(true);

  const productsInCart = useSelector(state => state.productsInCart);
  const products = useSelector(state => state.products);
  const user = useSelector(state => state.user);
  const total = useSelector(state => state.total);

  const _productsInCart = productsInCart.filter(function(productInCart){
    return !productInCart.order;
  });

  const dispatch = useDispatch();

  const userInfo = [
    {
      key: 'Name',
      value: user.name || user.name
    },
    {
      key: 'Phone number',
      value: user.mobile || ''
    },
    {
      key: 'Email',
      value: user.email || ''
    }
  ];

  const userInfoItemsMarkUp = userInfo.map(function(info){
    return {
      name: info.key,
      text: {
        value: info.value,
        color: 'black'
      }
    };
  });

  function handleBottomSheetVisible(){
    setBottomSheetVisible(state => !state);
  }

  function handlePayByCashPress(){
    setPayBayCash(true);
  }

  function handlePayByCardPress(){
    setPayBayCash(false);
  }

  function handleNavigateToOrder(){
    dispatch({ type: 'ORDER_PRODUCTS_IN_CART' });
    props.navigation.navigate('Orders');
  }

  const checkOutProducts = _productsInCart.map(function(productInCart){
    return {
      ...productInCart,
      product: products.find(product => product.id === productInCart.productId)
    }
  });

  const productItems = checkOutProducts.map(function(product){
    return {
      name: `${ product.amount}x ${ product.product.name }`,
      text: {
        value: `$${ parseInt(product.product.price * product.amount) }.00`,
        color: 'red'
      }
    }
  });

  const payByCashRadioButton = payByCash ? (
    <Ionicons name="radio-button-on" size={24} color="#0AA1DD" />
  ) : (
    <Ionicons name="radio-button-off" size={24} color="#0AA1DD" onPress={ () => alert('hi') } />
  );

  const payByCardRadioButton = payByCash ? (
    <Ionicons name="radio-button-off" size={24} color="#0AA1DD" />
  ) : (
    <Ionicons name="radio-button-on" size={24} color="#0AA1DD" onPress={ () => alert('hi') } />
  );


  return (
    <View>
      <ScreenFrame title="Check-Out" navigation={ props.navigation }>
        <Card 
          onBottomSheetToggle={ handleBottomSheetVisible }
          bottomSheetActive={ bottomSheetVisible }
          data={[
            {
              title: 'Your order item',
              items: productItems
            },
            {
              title: 'Customer info',
              items: userInfoItemsMarkUp
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
                    value: `$${ parseInt(total) + 2}.00`,
                    color: 'red',
                  },
                }
              ]
            },
            {
              title: 'Payment method',
              items: [
                {
                  name: payByCash ? 'Pay by cash' : 'Pay by card',
                  text: {
                    value: `$${ parseInt(total) + 2}.00`,
                    color: 'red',
                    dropdown: true
                  }
                }
              ]
            }
          ]}
        />
        <View style={ styles.buttonContainer }>
          <TouchableOpacity style={ styles.button } onPress={ handleNavigateToOrder }>
            <Text style={ styles.buttonText }>Order Now</Text>
          </TouchableOpacity>
        </View>
      </ScreenFrame>
      <BottomSheet 
        visible={ bottomSheetVisible } 
        onBackdropPress={ handleBottomSheetVisible }
        onBackButtonPress={ handleBottomSheetVisible }
      >
        <View style={ styles.bottomSheet }>
          <TouchableOpacity onPress={ handlePayByCashPress }>
            <View style={ styles.paymentSelection }>
              <View style={ styles.payment }>
                <Ionicons style={ styles.paymentIcon } name="cash-outline" size={24} color="black" />
                <View>
                  <Text style={ styles.paymentText }>Pay by cash</Text>
                  <Text>Give cash to our cashier</Text>
                </View>
              </View>
              { payByCashRadioButton }
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={ handlePayByCardPress }>
            <View style={ styles.paymentSelection }>
              <View style={ styles.payment }>
                <AntDesign style={ styles.paymentIcon } name="creditcard" size={24} color="black" />
                <View>
                  <Text style={ styles.paymentText }>Pay by card</Text>
                  <Text>Give online</Text>
                </View>
              </View>
              { payByCardRadioButton }
            </View>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomSheet: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  paymentSelection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  payment: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  paymentIcon: {
    marginRight: 10
  },
  paymentText: {
    fontSize: 17
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30
  },
  button: {
    backgroundColor: '#0AA1DD',
    width: '65%',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 3,
    borderColor: 'white',
    elevation: 3
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18
  }
});

export default Checkout;