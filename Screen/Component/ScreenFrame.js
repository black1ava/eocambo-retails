import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, AntDesign, Feather } from '@expo/vector-icons';
import { connect } from 'react-redux';

import { globalStyles } from '../../styles/globalStyles';


function ScreenFrame(props){

  const [productsInCart, setProductsInCart] = useState(0);

  useEffect(function(){
    setProductsInCart(props.productsInCart.filter(product => !product.order).length);
  }, [props.productsInCart]);

  function handleBackButton(){
    props.navigation.goBack();
  }

  const searchButtonMarkup = (
    <AntDesign style={ styles.mr10 } name="search1" size={30} color="#4B7BE5" />
  );
  
  function handleToCartPress(){
    props.navigation.navigate('Cart');
  }

  const inCartTextMarkeup = (
    <View style={ styles.inCartContainer }>
      <Text style={ styles.inCartText }>{ productsInCart }</Text>
    </View>
  );

  return(
    <View style={{ height: '100%' }}>
      <View style={ styles.header }>
        <TouchableOpacity style={ styles.mr10 } onPress={ handleBackButton }>
          <Ionicons  name="chevron-back-circle-outline" size={ 38 } color="#4B7BE5" />
        </TouchableOpacity>
        <Text style={{ ...globalStyles.title, ...styles.title }}>{ props.title }</Text>
        <View style={ styles.row }>
          { props.hasSearch && searchButtonMarkup }
          <TouchableOpacity onPress={ handleToCartPress }>
            <Feather name="shopping-cart" size={30} color="#4B7BE5" />
            { productsInCart > 0 && inCartTextMarkeup }
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        { props.children }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFCC8F'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  mr10: {
    marginRight: 10
  },
  title: {
    fontSize: 22
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
  inCartText: {
    fontSize: 10,
    color: '#fff'
  }
});

function mapStateToProps(state){
  return {
    productsInCart: state.productsInCart
  };
}

export default connect(mapStateToProps)(ScreenFrame);