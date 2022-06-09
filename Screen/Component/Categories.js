import { useState, useEffect } from 'react';
import { View, Text, FlatList, SafeAreaView } from 'react-native';
import 'react-native-get-random-values';
import Category from '../../Shared/Category';
import { categories } from '../../Shared/categories'
import { globalStyles } from '../../styles/globalStyles'
import Seperator from '../../Shared/Seperator';

function Categories(props){

  const [sortedCategories, setSortedCategories] = useState([]);

  useEffect(function(){
    const sortedCategories = categories.sort(function(current, next){
      return current.id[0].charCodeAt(0) - next.id[0].charCodeAt(0);
    })

    console.log(sortedCategories);
    
    setSortedCategories(sortedCategories);
  }, [categories]);

  // console.log(sortedCategories);

  function renderCategory({ item }){
    return(
      <Category 
      id={ item.id }
      icon={ item.icon } 
      content={ item.content } 
      navigation={ props.navigation } 
    />
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
          data={ sortedCategories }
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