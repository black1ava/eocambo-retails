import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

function Category(props){

  function handlePress(){
    props.navigation.navigate("Categories", { id: props.id, name: props.content });
  }

  return(
    <TouchableOpacity onPress={ handlePress } style={ styles.category }>
      <View style={ styles.categoryIcon }>
        { props.icon }
      </View>
      <Text>{ props.content }</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  category: {
    flexDirection: 'row',
    padding: 10,
    borderColor: '#333',
    borderWidth: 0.3,
    borderRadius: 5,
    alignItems: 'center'
  },
  categoryIcon: {
    marginRight: 5
  }
});

export default Category;