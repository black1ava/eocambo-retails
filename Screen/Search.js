import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { useState } from 'react';

import ScreenFrame from './Component/ScreenFrame';
import CategoryProduct from '../Shared/CategoryProduct';

function Search({ navigation }){
  const productsInCart = useSelector(state => state.productsInCart);
  const [searchText, setSearchText] = useState('');
  const [searchProducts, setSearchProducts] = useState([]);
  const products = useSelector(state => state.products);

  

  function handleSearchTextChange(value){
    setSearchText(value);

    if(value === ''){
      setSearchProducts([])
      return;
    }

    setSearchProducts(products.filter(function(product){
      return product.name.toLowerCase().includes(value.toLowerCase());
    }));
  }

  function renderCategoryProduct({ item }){
    return <CategoryProduct product={ item } navigation={ navigation }/>
  }

  function extractCategoryProductId(product){
    return product.id;
  }

  return (
    <View style={ styles.container }>
      <View>
        <ScreenFrame 
          navigation={ navigation } 
          hasGoToCart 
          productsInCart={ productsInCart } 
          hasSearchField
          searchText={ searchText }
          onSearchTextChange={ handleSearchTextChange }
        >
          <View style={ styles.center }>
            <FlatList 
              data={ searchProducts }
              renderItem={ renderCategoryProduct }
              keyExtractor={ extractCategoryProductId }
              numColumns={ 2 }
              showsVerticalScrollIndicator={ false }
            />
          </View>
        </ScreenFrame>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  center: {
    alignItems: 'center'
  }
});

export default Search;