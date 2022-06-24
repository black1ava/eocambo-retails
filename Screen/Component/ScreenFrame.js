import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons, AntDesign, Feather } from '@expo/vector-icons';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { MaterialIcons } from '@expo/vector-icons';

import { globalStyles } from '../../styles/globalStyles';
import Spinner from './Spinner';


function ScreenFrame({
  productsInCart,
  navigation,
  hasGoToCart,
  title,
  hasSearch,
  hasSearchField,
  children,
  searchText,
  onSearchTextChange,
  backgroundColor = '#FFCC8F',
  loading,
  hasOrderType,
  onOrderTypePress
}){

  const [_productsInCart, set_ProductsInCart] = useState(0);

  useEffect(function(){
    set_ProductsInCart(productsInCart.filter(product => !product.order).length);
  }, [productsInCart]);

  function handleBackButton(){
    navigation.goBack();
  }

  function handleGoToSearchButton(){
    navigation.navigate('Search');
  }

  const searchButtonMarkup = (
    <TouchableOpacity onPress={ handleGoToSearchButton }>
      <AntDesign style={ styles.mr10 } name="search1" size={30} color="#4B7BE5" />
    </TouchableOpacity>
  );
  
  function handleToCartPress(){
    navigation.navigate('Cart');
  }

  const inCartTextMarkeup = (
    <View style={ styles.inCartContainer }>
      <Text style={ styles.inCartText }>{ _productsInCart }</Text>
    </View>
  );

  const goToCartMarkUp = hasGoToCart && (
    <TouchableOpacity onPress={ handleToCartPress }>
      <Feather name="shopping-cart" size={30} color="#4B7BE5" />
      { productsInCart > 0 && inCartTextMarkeup }
    </TouchableOpacity>
  );

  const titleMarkup = !!title && (
    <Text 
      style={{ ...globalStyles.title, ...styles.title }}
    >
      { title }
    </Text>
  );

  const searchFieldMarkUp = hasSearchField && (
    <View style={ styles.textInput }>
      <TextInput 
        placeholder="Search" 
        value={ searchText }
        onChangeText={ onSearchTextChange }
      />
    </View>
  );

  const orderTypeMarkup = hasOrderType && (
    <TouchableOpacity onPress={ onOrderTypePress }>
      <MaterialIcons name="location-pin" size={24} color="#0AA1DD" />
    </TouchableOpacity>
  )

  return(
    <View style={{ height: '100%' }}>
      <View style={{ ...styles.header, backgroundColor }}>
        <TouchableOpacity style={ styles.mr10 } onPress={ handleBackButton }>
          <Ionicons  name="chevron-back-circle-outline" size={ 38 } color="#4B7BE5" />
        </TouchableOpacity>
          { titleMarkup }
          { searchFieldMarkUp }
        <View style={ styles.row }>
          { hasSearch && searchButtonMarkup }
          { goToCartMarkUp }
          { orderTypeMarkup }
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <Spinner visible={ loading } />
        { children }
      </View>
    </View>
  );
}

ScreenFrame.propTypes = {
  productsInCart: PropTypes.array.isRequired,
  navigation: PropTypes.object.isRequired,
  hasGoToCart: PropTypes.bool,
  title: PropTypes.string,
  hasSearch: PropTypes.bool,
  children: PropTypes.element,
  hasSearchField: PropTypes.bool,
  searchText: PropTypes.string,
  onSearchTextChange: PropTypes.func,
  backgroundColor: PropTypes.string,
  loading: PropTypes.bool,
  hasOrderType: PropTypes.bool,
  onOrderTypePress: PropTypes.func
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingVertical: 10,
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
  },
  textInput: {
    backgroundColor: '#fff',
    width: '70%',
    borderRadius: 5,
    paddingVertical: 3,
    paddingHorizontal: 10
  }
});

function mapStateToProps(state){
  return {
    productsInCart: state.root.productsInCart
  };
}

export default connect(mapStateToProps)(ScreenFrame);