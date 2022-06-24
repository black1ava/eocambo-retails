import { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';

import NavBar from './Component/NavBar';
import { globalStyles } from '../styles/globalStyles';
import { addToFavoriteInactive } from '../action/index';
import NavBarScreenFrame from './Component/NavBarScreenFrame';
import FavoriteProduct from './Component/FavoriteProduct';
import i18n from '../Translations';


function Favorite(props){
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(function(){
    const favoriteProducts = props.products.filter(function(product){
      return product.favorite;
    });

    setFavoriteProducts(favoriteProducts);
  }, [props.products]);

  const noItemMarkup = (
    <View style={ globalStyles.center }>
      <Text style={ globalStyles.title }>{ i18n.t('favorite.No Items Found!')}</Text>
    </View>
  );

  async function handleRemoveFavoriteProduct(id){
    setLoading(true);
    await axios.post(`https://pos.eocambo.com/api/favourites/create/${ uid }/${ id }`);

    setFavoriteProducts(function(products){
      return products.filter(function(product){
        return product.id !== id;
      });
    });

    const { uid } = props.user;


    props.addToFavoriteInactive(id);
    setLoading(false);
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
    <View style={{ padding: 10, flex: 1 }}>
      <FlatList
        data={ favoriteProducts } 
        renderItem={ renderFavoriteProduct }
        keyExtractor={ extractFavoriteProductId }
        showsVerticalScrollIndicator={ false }
      />
    </View>
  );

  return(
    <NavBarScreenFrame 
      navigation={ props.navigation } 
      title={ i18n.t('favorite.Favorite') } 
      screenName="favorite" showNavbar
      loading={ loading }
    >
      { favoriteProducts.length === 0 ? noItemMarkup : favoriteProductsMarkup }
    </NavBarScreenFrame>
  );
}

function mapStateToProps(state){
  return {
    products: state.root.products,
    user: state.root.user
  }
}

const mapDispatchToProps  = {
  addToFavoriteInactive 
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorite);