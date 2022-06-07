import { useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import { NavigationContext } from '../Screen/Home';

function Product(props){

  const navigation = useContext(NavigationContext);

  function handlePress(){
    navigation.navigation.navigate('Product details', { product: props });
  }

  return(
    <TouchableOpacity style={ styles.product } onPress={ handlePress }>
      <Image style={ globalStyles.smallImage } source={{ uri: props.source }}/>
      <View style={ globalStyles.mh5 }>
        <Text style={{ ...globalStyles.textBold, ...globalStyles.mv10 }}>{ props.name }</Text>
        <Text style={ globalStyles.textBold }>Starting at: 
          <Text style={{ ...globalStyles.textRed, marginLeft: 5 }}>
            { props.price }
          </Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  product: {
    backgroundColor: '#BDE6F1',
    paddingBottom: 10,
    borderRadius: 15,
    overflow: 'hidden',
    width: 150
  }
});

export default Product;