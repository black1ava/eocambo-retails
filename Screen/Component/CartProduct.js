import { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';

import { increaseProductInCart, decreaseProductInCart } from '../../action/';

function CartProduct(props){
  const [amount, setAmount] = useState(props.amount);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(function(){
    setTotalPrice(parseInt(props.product.price) * amount);
  }, [amount]);

  function handleAmountDecrease(){
    if(amount > 1){
      props.decreaseProductInCart(props.id);
      setAmount(amount => amount - 1 );
    }
  }

  function handleAmountIncrease(){
    props.increaseProductInCart(props.id);
    setAmount(amount => amount + 1 );
  }

  function handlePress(){
    props.navigation.navigate('Product details', props.product);
  }

  return (
    <TouchableOpacity onPress={ handlePress }>
      <View style={ styles.container }>
          <Image style={ styles.smallImage } source={{ uri: props.product.uri }}/>
          <View style={{ width: '30%', justifyContent: 'space-between', paddingVertical: 20  }}>
            <Text numberOfLines={ 3 } style={ styles.name }>{ props.product.name }</Text>
            <Text style={ styles.price }>${ parseInt(totalPrice) }.00</Text>
          </View>
          <View style={{ alignItems: 'flex-end', flex: 1, justifyContent: 'space-between' }}>
            <View style={ styles.closeButton }>
              <TouchableOpacity onPress={ props.onClose }>
              <Ionicons name="close" size={22} color="white" />
              </TouchableOpacity>
            </View>
            <View style={ styles.setAmount }>
              <TouchableOpacity onPress={ handleAmountDecrease }>
                <AntDesign name="minuscircleo" size={24} color="black" />
              </TouchableOpacity>
              <Text style={ styles.amountText }>{ amount }</Text>
              <TouchableOpacity onPress={ handleAmountIncrease }>
                <AntDesign name="pluscircleo"  size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  smallImage: {
    width: 140,
    height: 140,
    borderRadius: 5,
    marginRight: 10,
    marginVertical: 2,
    marginLeft: 2
  },
  container: {
    flexDirection: 'row',
    borderWidth: 1.5,
    borderColor: 'lightgrey',
    marginBottom: 10,
    borderRadius: 5,
    position: 'relative',
    padding: 5
  },
  name: {
    fontWeight: 'bold'
  },
  price: {
    fontWeight: 'bold',
    color: 'red'
  },
  setAmount: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    right: 5
  },
  amountText: {
    marginHorizontal: 5,
    fontSize: 18,
    fontWeight: 'bold'
  },
  closeButton: {
    backgroundColor: 'red',
    borderRadius: 100,
    position: 'absolute'
  }
});

const mapDispatchToProps = {
  increaseProductInCart,
  decreaseProductInCart
};

export default connect(null, mapDispatchToProps)(CartProduct);