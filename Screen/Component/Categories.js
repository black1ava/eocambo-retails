import { View, Text, FlatList, SafeAreaView } from 'react-native';
import 'react-native-get-random-values';
import Category from '../../Shared/Category';
import { categories } from '../../Shared/categories'
import { globalStyles } from '../../styles/globalStyles'
import Seperator from '../../Shared/Seperator';

function Categories(){

  function renderCategory(props){
    return(
      <Category icon={ props.item.icon } content={ props.item.content } />
    );
  }

  function extractCategoryId(category){
    return category.id;
  }

  return(
    <View>
      <Text style={ globalStyles.title }>Categories</Text>
      <SafeAreaView>
        <FlatList 
          data={ categories }
          renderItem={ renderCategory }
          keyExtractor={ extractCategoryId }
          horizontal
          showsHorizontalScrollIndicator={ false }
          ItemSeparatorComponent={ Seperator }
        />
      </SafeAreaView>
    </View>
  );
}


export default Categories;