import { View, Text, FlatList } from 'react-native';

import Product from '../../Shared/Product';
import { globalStyles } from '../../styles/globalStyles';
import Seperator from '../../Shared/Seperator';

function Products(props){

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
      <Text style={ globalStyles.title }>{ props.title }</Text>
        <FlatList 
          data={ props.products }
          renderItem={ renderProducts }
          keyExtractor={ extractProductKey }
          horizontal
          showsHorizontalScrollIndicator={ false }
          ItemSeparatorComponent={ Seperator }
        />
    </View>
  );
}

export default Products;