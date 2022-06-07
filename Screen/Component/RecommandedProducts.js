import { View, Text, FlatList, SafeAreaView } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import Product from '../../Shared/Product';
import { recommandedProducts } from '../../Shared/recommandedProducts';
import Seperator from '../../Shared/Seperator';

function RecommandedProducts(){

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

export default RecommandedProducts;