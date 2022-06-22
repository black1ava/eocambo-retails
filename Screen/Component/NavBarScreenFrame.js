import { View, Text, StyleSheet } from 'react-native';

import NavBar from './NavBar';
import Spinner from './Spinner';

function NavBarScreenFrame(props){

  const headerMarkup = (
    <View style={ styles.header }>
      <Text style={ styles.headerText }>{ props.title }</Text>
    </View>
  );

  return(
    <View style={ styles.content }>
      <Spinner visible={ props.loading }/>
      { props.title ? headerMarkup : <View></View> }
      {/* { headerMarkup} */}
      { props.children }
      { props.showNavbar && <NavBar navigation={ props.navigation } screenName={ props.screenName }/> }
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  header: {
    backgroundColor: '#0AA1DD'
  },
  headerText: {
    color: 'white',
    margin: 10,
    fontSize: 20,
    fontWeight: '600'
  }
});

export default NavBarScreenFrame;