import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, AntDesign, Feather } from '@expo/vector-icons';
import { globalStyles } from '../../styles/globalStyles';

function ScreenFrame(props){

  function handleBackButton(){
    props.navigation.goBack();
  }

  const searchButtonMarkup = (
    <AntDesign style={ styles.mr10 } name="search1" size={30} color="#4B7BE5" />
  );

  return(
    <View style={{ height: '100%' }}>
      <View style={ styles.header }>
        <TouchableOpacity style={ styles.mr10 } onPress={ handleBackButton }>
          <Ionicons  name="chevron-back-circle-outline" size={ 38 } color="#4B7BE5" />
        </TouchableOpacity>
        <Text style={{ ...globalStyles.title, ...styles.title }}>{ props.title }</Text>
        <View style={ styles.row }>
          { props.hasSearch && searchButtonMarkup }
          <Feather name="shopping-cart" size={30} color="#4B7BE5" />
        </View>
      </View>
      <View style={{ flex: 1 }}>
        { props.children }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFCC8F'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  mr10: {
    marginRight: 10
  },
  title: {
    fontSize: 22
  }
});

export default ScreenFrame;