import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Entypo, Feather } from '@expo/vector-icons'; 
import SearchButton from '../../Shared/SearchButton';

function Header(props){

  function handleGoToCardClick(){
    props.navigation.navigate("Cart");
  }

  return(
    <View style={ styles.header }>
      <View style={ styles.headerSection }>
        <Entypo name="menu" size={28} color="#4B7BE5" />
        <Image style={ styles.logo } source={require('../../assets/eocambo.png')} />
        <TouchableOpacity onPress={ handleGoToCardClick }>
          <Feather name="shopping-cart" size={28} color="#4B7BE5" />
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
  }
});

export default Header;