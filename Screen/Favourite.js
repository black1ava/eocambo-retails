import { View, Text } from 'react-native';
import NavBar from './Component/NavBar';
import { globalStyles } from '../styles/globalStyles';
import { connect } from 'react-redux';

function Favorite(props){

  return(
    <View style={ globalStyles.content }>
      <View style={ globalStyles.center }>
        <Text style={ globalStyles.title }>No item found</Text>
      </View>
      <NavBar navigation={ props.navigation } screenName="favorite"/>
    </View>
  );
}

const mapDispatchToProps = {
  
};

export default connect(null, mapDispatchToProps)(Favorite);