import { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons';

function CartProduct(props){
  const [amount, setAmount] = useState(props.amount);
  const [totalPrice, setTotalPrice] = useState(1);

  useEffect(function(){
    setTotalPrice(parseFloat(props.product.price) * amount);
  }, [amount]);

  function handleAmountDecrease(){
    if(amount > 1){
      setAmount(amount => amount - 1 );
    }
  }

  function handleAmountIncrease(){
    setAmount(amount => amount + 1 );
  }

  return (
    <View style={ styles.container }>
      <Image style={ styles.smallImage } source={{ uri: props.product.uri }}/>
      <View style={{ width: '30%', justifyContent: 'space-between', paddingVertical: 20  }}>
        <Text numberOfLines={ 3 } style={ styles.name }>{ props.product.name }</Text>
        <Text style={ styles.price }>${ parseInt(totalPrice) }.00</Text>
      </View>
      <View style={{ alignItems: 'flex-end', flex: 1, justifyContent: 'space-between' }}>
        <AntDesign name="closecircle" size={24} color="red" />
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
  );
}

const styles = StyleSheet.create({
  smallImage: {
    width: 140,
    height: 140,
    borderRadius: 5,
    marginRight: 10
  },
  container: {
    flexDirection: 'row',
    borderWidth: 1.5,
    borderColor: 'lightgrey',
    marginBottom: 10,
    padding: 2,
    borderRadius: 5,
  },
  name: {
    fontWeight: 'bold'
  },
  price: {
    fontWeight: 'bold',
    color: 'red'
  },
  setAmount: {
    flexDirection: 'row'
  },
  amountText: {
    marginHorizontal: 5,
    fontSize: 18,
    fontWeight: 'bold'
  }
});

export default CartProduct;