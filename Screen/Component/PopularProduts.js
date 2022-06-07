import { useContext } from 'react';
import { View, Text, FlatList, SafeAreaView } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import { popularProducts } from '../../Shared/popularProducts';
import Product from '../../Shared/Product';
import Seperator from '../../Shared/Seperator';

function PopularProducts(){

  function renderProducts(props){
    return (<Product 
      source={ props.item.source }
      name={ props.item.name }
      price={ props.item.price }
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