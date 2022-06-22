import { View, FlatList, StyleSheet } from 'react-native';

import CategoryProduct from '../../Shared/CategoryProduct';

function CategoryProducts(props){

  function renderCategoryProduct({ item }){
    return <CategoryProduct product={ item } navigation={ props.navigation }/>
  }

  function extractCategoryProductId(product){
    return product.id;
  }

  return(
    <View style={{ flex: 1, alignItems: 'center' }}>
      <FlatList 
        data={ props.products }
        renderItem={ renderCategoryProduct }
        keyExtractor={ extractCategoryProductId }
        numColumns={ 2 }
        showsVerticalScrollIndicator={ false }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  list: {

  }
});

export default CategoryProducts;