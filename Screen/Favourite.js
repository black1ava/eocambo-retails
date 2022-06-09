import { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import NavBar from './Component/NavBar';
import { globalStyles } from '../styles/globalStyles';
import { connect } from 'react-redux';
import { addToFavoriteInactive } from '../action/index';

import FavoriteProduct from './Component/FavoriteProduct';

function Favorite(props){
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  useEffect(function(){
    const favoriteProducts = props.products.filter(function(product){
      return product.favorite;
    });

    setFavoriteProducts(favoriteProducts);
  }, [props.products]);

  const noItemMarkup = (
    <View style={ globalStyles.center }>
      <Text style={ globalStyles.title }>No item found</Text>
    </View>
  );

  function handleRemoveFavoriteProduct(id){
    setFavoriteProducts(function(products){
      return products.filter(function(product){
        return product.id !== id;
      });
    });

    props.addToFavoriteInactive(id);
  }

  function renderFavoriteProduct({ item }){
    return <FavoriteProduct 
      product={ item }
      navigation={ props.navigation }
      onRemove={ () => handleRemoveFavoriteProduct(item.id) }
    />
  }

  function extractFavoriteProductId(product){
    return product.id;
  }

  const favoriteProductsMarkup = (
    <FlatList
      data={ favoriteProducts } 
      renderItem={ renderFavoriteProduct }
      keyExtractor={ extractFavoriteProductId }
      showsVerticalScrollIndicator={ false }
    />
  );

  return(
    <View style={ globalStyles.content }>
      { favoriteProducts.length === 0 ? noItemMarkup : favoriteProductsMarkup }
      <NavBar navigation={ props.navigation } screenName="favorite"/>
    </View>
  );
}

function mapStateToProps(state){
  return {
    products: state.products
  }
}

const mapDispatchToProps  = {
  addToFavoriteInactive 
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorite);