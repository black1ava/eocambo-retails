import { View, Text, FlatList, SafeAreaView } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import { popularProducts } from '../../Shared/popularProducts';
import Product from '../../Shared/Product';
import Seperator from '../../Shared/Seperator';

function PopularProducts(props){

  function renderProducts({ item }){
    return (<Product 
      source={ item.source }
      name={ item.name }
      price={ item.price }
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

export default PopularProducts;