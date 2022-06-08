import { useState, useEffect } from 'react';
import { View, Text, FlatList, SafeAreaView } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import Product from '../../Shared/Product';
import Seperator from '../../Shared/Seperator';
import { connect } from 'react-redux';

function PopularProducts(props){

  const [popularProducts, setPopularProducts] = useState([]);

  useEffect(function(){
    const popularProducts = [...props.products].filter(function(product){
      return (
        product.name === 'Online Retail App' ||
        product.name === 'Online Mini Mart' ||
        product.name === 'Online Travel Agency' ||
        product.name === 'Online Electronic Store' ||
        product.name === 'Online Jewelry Store'
      );
    });

    setPopularProducts(popularProducts);

  }, [props.products]);

  function renderProducts({ item }){
    return (<Product 
      source={ item.source }
      name={ item.name }
      price={ item.price }
      id={ item.id }
      favorite={ item.favorite }
      navigation={ props.navigation }
    />)
  }

  function extractProductKey(product){
    return product.id;
  }

  return(
    <View>
      <Text style={ globalStyles.title }>Popular Products</Text>
      <SafeAreaView>
        <FlatList 
          data={ popularProducts }
          renderItem={ renderProducts }
          keyExtractor={ extractProductKey }
          horizontal
          showsHorizontalScrollIndicator={ false }
          ItemSeparatorComponent={ Seperator }
        />
      </SafeAreaView>
    </View>
  );
}

function mapStateToProps(state){
  return {
    products: state.products
  };
}

export default connect(mapStateToProps)(PopularProducts);