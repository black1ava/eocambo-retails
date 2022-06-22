import { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import ScreenFrame from './Component/ScreenFrame';
import { connect } from 'react-redux';

import CategoryProducts from './Component/CategoryProducts';

function Categories(props){

  const [products, setProducts] = useState([]);
  const { id } = props.route.params;
  const { name } = props.route.params;

  useEffect(function(){
    setProducts(props.products.filter(function(product){
      return product.categoryId === id;
    }));
  }, [props.products]);

  return(
    <View style={{ flex: 1 }}>
      <ScreenFrame navigation={ props.navigation } title={ name }>
        <CategoryProducts
          title="Hi" 
          products={ products }
          navigation={ props.navigation }
        />
      </ScreenFrame>
    </View>
  );
}

function mapStateToProps(state){
  return {
    products: state.products
  }
}

export default connect(mapStateToProps)(Categories);