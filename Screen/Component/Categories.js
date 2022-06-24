import { useState, useEffect } from 'react';
import { View, Text, FlatList, SafeAreaView, StyleSheet } from 'react-native';
import 'react-native-get-random-values';
import i18n from '../../Translations';

import Category from '../../Shared/Category';
import { globalStyles } from '../../styles/globalStyles'
import Seperator from '../../Shared/Seperator';

function Categories(props){

  const [sortedCategories, setSortedCategories] = useState([]);

  useEffect(function(){

    const sortedCategories = props.categories.sort(function(current, next){
      return current.name[0].charCodeAt(0) - next.name[0].charCodeAt(0);
    })
    
    setSortedCategories(sortedCategories);
  }, [props.categories]);

  function renderCategory({ item }){
    return(
      <Category 
      id={ item.id }
      uri={ item.uri } 
      name={ item.name } 
      navigation={ props.navigation } 
    />
    );
  }

  function extractCategoryId(category){
    return category.id;
  }

  return(
    <View>
      <Text style={{ ...globalStyles.title, ...styles.title }}>{ i18n.t('home.Categories') }</Text>
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

const styles = StyleSheet.create({
  title: {
    marginVertical: 18
  }
});


export default Categories;