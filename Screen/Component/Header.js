import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Entypo, Feather } from '@expo/vector-icons'; 
import SearchButton from '../../Shared/SearchButton';

function Header(props){

  function handleGoToCardClick(){
    props.navigation.navigate("Cart");
  }

  const cartMarkup = (
    <View style={ styles.inCartContainer }>
      <Text style={ styles.inCart }>{ props.numberInCart }</Text>
    </View>
  );

  return(
    <View style={ styles.header }>
      <View style={ styles.headerSection }>
        <Entypo name="menu" size={28} color="#4B7BE5" />
        <Image style={ styles.logo } source={require('../../assets/eocambo.png')} />
        <TouchableOpacity onPress={ handleGoToCardClick }>
          <Feather name="shopping-cart" size={28} color="#4B7BE5" />
          { props.numberInCart > 0 && cartMarkup }
        </TouchableOpacity>
      </View>
      <SearchButton />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FFCC8F',
    paddingVertical: 5,
    paddingHorizontal: 15
  },
  logo: {
    width: 150,
    height: 60
  },
  headerSection: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 5
  },
  inCartContainer: {
    backgroundColor: '#FF5D5D',
    alignItems: 'center',
    justifyContent:'center',
    borderRadius: 300,
    width: 15,
    height: 15,
    position: 'absolute',
    right: -5,
    top: 0
  },
  inCart: {
    color: '#ffffff',
    fontSize: 10,
  }
});

export default Header;