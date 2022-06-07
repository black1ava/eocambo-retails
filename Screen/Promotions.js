import { View, Text } from 'react-native';
import { globalStyles } from '../styles/globalStyles';
import NavBar from './Component/NavBar';

function Promotions(props){
  return(
    <View style={ globalStyles.content}>
      <View style={ globalStyles.center}>
        <Text style={ globalStyles.title }>Empty</Text>
      </View>
      <NavBar navigation={ props.navigation } screenName="promotions"/>
    </View>
  );
}

export default Promotions;