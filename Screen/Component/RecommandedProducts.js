import { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import Product from '../../Shared/Product';
import { connect } from 'react-redux';
import Seperator from '../../Shared/Seperator';

function RecommandedProducts(props){

  const [recommandedProducts, setRecommandedProducts] = useState([]);

  useEffect(function(){
    const recommandedProducts =[...props.products].filter(function(product){
      return (
        product.name === 'Online Retail App' ||
        product.name === 'Online Mini Mart' ||
        product.name === 'Furniture Online Store' ||
        product.name === 'Fashion Design and Shopping App' ||
        product.name === 'Parking App'
      );
    });

    setRecommandedProducts(recommandedProducts);
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
      <Text style={ globalStyles.title }>Recommanded Products</Text>
      <FlatList 
        data={ recommandedProducts }
        renderItem={ renderProducts }
        keyExtractor={ extractProductKey }
        horizontal
        ItemSeparatorComponent={ Seperator }
      />
    </View>
  );
}

function mapStateToProps(state){
  return {
    products: state.products
  };
}

export default connect(mapStateToProps)(RecommandedProducts);