import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

function Category(props){

  function handlePress(){
    const { id, name } = props;
    props.navigation.navigate("Categories", { id, name });
  }

  return(
    <TouchableOpacity onPress={ handlePress } style={ styles.category }>
      <View style={ styles.categoryIcon }>
        <Image style={ styles.icon } source={{ uri: props.uri }}/>
      </View>
      <Text>{ props.name }</Text>
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
  },
  icon: {
    width: 30,
    height: 30
  }
});

export default Category;