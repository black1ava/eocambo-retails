import { View, Text, FlatList, StyleSheet } from 'react-native';

import Product from '../../Shared/Product';
import { globalStyles } from '../../styles/globalStyles';
import Seperator from '../../Shared/Seperator';

function Products(props){

  function renderProducts({ item }){
    return (<Product 
      product={ item }
      navigation={ props.navigation }
    />)
  }

  function extractProductKey(product){
    return product.id;
  }

  return(
    <View>
      <Text style={{ ...globalStyles.title, ...styles.title  }}>{ props.title }</Text>
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

const styles = StyleSheet.create({
  title: {
    marginVertical: 18
  }
});

export default Products;