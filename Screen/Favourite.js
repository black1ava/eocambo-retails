import { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';

import NavBar from './Component/NavBar';
import { globalStyles } from '../styles/globalStyles';
import { addToFavoriteInactive } from '../action/index';
import NavBarScreenFrame from './Component/NavBarScreenFrame';

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
    <NavBarScreenFrame navigation={ props.navigation } title="Favorites" screenName="favorite" showNavbar>
      { favoriteProducts.length === 0 ? noItemMarkup : favoriteProductsMarkup }
    </NavBarScreenFrame>
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